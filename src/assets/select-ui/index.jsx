import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../components/InputPadrao';
import { normalizeString } from '../../utils/functions';

const Select = forwardRef(({
  value,
  onChange,
  options,
  placeholder = "Selecionar...",
  disabled = false,
  identifier,
  inputStyle = {},
  fieldStyle = {},
  icon,
  iconStyle = {},
  defaultSelect = true,
  searchable = true,
  multiple = false,
  multipleButtons = true,
  onBlur,
  inputButtonRight,
  inputButtonLeft,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [optionsPositionStyle, setOptionsPositionStyle] = useState({});

  const containerWrapperRef = useRef(null);
  const optionsContainerRef = useRef(null);
  const displayInputRef = useRef(null);
  const [searchTerm, setSearchTerm, searchInputRef] = UseInputMask();

  const allOptions = defaultSelect && !multiple
    ? [{ value: "", label: "Selecionar..." }, ...options]
    : options;

  const filteredOptions = allOptions.filter(option => {
    const normalizedLabel = normalizeString(option.label).toLowerCase();
    const normalizedSearchTerm = normalizeString(searchTerm).toLowerCase();
    return normalizedLabel.includes(normalizedSearchTerm);
  });

  const selectedOptions = multiple && Array.isArray(value)
    ? allOptions.filter(option => value.includes(option.value))
    : [];

  const selectedOptionLabel = !multiple
    ? allOptions.find(option => option.value === value)?.label || placeholder
    : '';

  useImperativeHandle(ref, () => {
    if (multiple) {
      return {
        value: Array.isArray(value) ? value : [],
        label: selectedOptions.map(o => o.label),
        focus: () => {
          if (displayInputRef.current) {
            displayInputRef.current.focus();
          }
        },
        blur: () => {
          if (displayInputRef.current) {
            displayInputRef.current.blur();
          }
        }
      };
    } else {
      const singleSelectedOption = allOptions.find(option => option.value === value);
      return {
        value: singleSelectedOption ? singleSelectedOption.value : "",
        label: singleSelectedOption?.label || placeholder,
        focus: () => {
          if (displayInputRef.current) {
            displayInputRef.current.focus();
          }
        },
        blur: () => {
          if (displayInputRef.current) {
            displayInputRef.current.blur();
          }
        }
      };
    }
  }, [multiple, value, allOptions, selectedOptions, placeholder]);

  useEffect(() => {
    if (displayInputRef.current) {
      if (inputButtonLeft) {
        displayInputRef.current.style.borderTopLeftRadius = '0';
        displayInputRef.current.style.borderBottomLeftRadius = '0';
      } else {
        displayInputRef.current.style.borderTopLeftRadius = '';
        displayInputRef.current.style.borderBottomLeftRadius = '';
      }

      if (inputButtonRight) {
        displayInputRef.current.style.borderTopRightRadius = '0';
        displayInputRef.current.style.borderBottomRightRadius = '0';
      } else {
        displayInputRef.current.style.borderTopRightRadius = '';
        displayInputRef.current.style.borderBottomRightRadius = '';
      }
    }
  }, [inputButtonLeft, inputButtonRight]);

  const calculatePositionAndWidth = useCallback(() => {
    if (displayInputRef.current) {
      const displayRect = displayInputRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const optionsEstimatedHeight = Math.min(200, filteredOptions.length * 40 + (searchable ? 50 : 0));
      const spaceBelow = viewportHeight - displayRect.bottom;
      const spaceAbove = displayRect.top;

      let top, bottom, maxHeight;
      let newBorderRadius, newBorderBottom, newBorderTop;
      let newBoxShadow;
      
      const hasLeftButton = inputButtonLeft && inputButtonLeft.length > 0;
      const hasRightButton = inputButtonRight && inputButtonRight.length > 0;

      let borderLeft = hasLeftButton ? 'none' : '1px solid var(--cinza-claro)';
      let borderRight = hasRightButton ? 'none' : '1px solid var(--cinza-claro)';
      let borderLeftRadius = hasLeftButton ? '0px' : '8px';
      let borderRightRadius = hasRightButton ? '0px' : '8px';

      if (spaceBelow >= optionsEstimatedHeight || spaceBelow > spaceAbove) {
        top = `${displayRect.bottom}px`;
        bottom = 'auto';
        maxHeight = `${spaceBelow - 20}px`;
        newBorderRadius = `0px 0px ${borderLeftRadius} ${borderRightRadius}`;
        newBorderBottom = '1px solid var(--cinza-claro)';
        newBorderTop = 'none';
        newBoxShadow = '2px 4px 8px rgba(0, 0, 0, 0.1)';
      } else {
        top = 'auto';
        bottom = `${viewportHeight - displayRect.top}px`;
        maxHeight = `${spaceAbove - 20}px`;
        newBorderRadius = `${borderRightRadius} ${borderLeftRadius} 0px 0px`;
        newBorderBottom = 'none';
        newBorderTop = '1px solid var(--cinza-claro)';
        newBoxShadow = '2px -4px 8px rgba(0, 0, 0, 0.1)';
      }

      setOptionsPositionStyle({
        position: 'fixed',
        top: top,
        bottom: bottom,
        left: `${displayRect.left}px`,
        width: `${displayRect.width}px`,
        maxHeight: maxHeight,
        borderRadius: newBorderRadius,
        borderBottom: newBorderBottom,
        borderTop: newBorderTop,
        borderLeft: borderLeft,
        borderRight: borderRight,
        boxShadow: newBoxShadow,
        boxSizing: 'border-box',
        overflowY: 'auto'
      });
    }
  }, [filteredOptions.length, searchable, inputButtonLeft, inputButtonRight]);

  useEffect(() => {
    if (isOpen) {
      let debouncedCalculatePositionAndWidth = null;

      const handleResizeAndScroll = () => {
        if (debouncedCalculatePositionAndWidth) {
          clearTimeout(debouncedCalculatePositionAndWidth);
        }
        debouncedCalculatePositionAndWidth = setTimeout(() => {
          calculatePositionAndWidth();
        }, 0);
      };

      window.addEventListener('resize', handleResizeAndScroll);
      window.addEventListener('scroll', handleResizeAndScroll, true);

      return () => {
        if (debouncedCalculatePositionAndWidth) {
          clearTimeout(debouncedCalculatePositionAndWidth);
        }
        window.removeEventListener('resize', handleResizeAndScroll);
        window.removeEventListener('scroll', handleResizeAndScroll, true);
      };
    }
  }, [isOpen, calculatePositionAndWidth]);

  useEffect(() => {
    if (multiple) return;
    if (!isOpen && displayInputRef.current) {
      displayInputRef.current.style.borderRadius = '';
      displayInputRef.current.style.boxShadow = '';
      displayInputRef.current.style.borderColor = '';
    }
  }, [isOpen, multiple]);

  const toggleOpen = (e) => {
    e.stopPropagation();
    if (!disabled) {
      if (!isOpen) {
        setSearchTerm({ target: { value: "" } });
        setHighlightedIndex(-1);
        calculatePositionAndWidth();
      }
      setIsOpen(prev => !prev);
    }
  };

  const handleRemoveOption = (optionValue) => {
    if (multiple && Array.isArray(value)) {
      const newValue = value.filter(v => v !== optionValue);
      onChange({ target: { value: newValue } });
    }
  };

  const handleOptionClick = (optionValue) => {
    if (multiple) {
      if (Array.isArray(value) && value.includes(optionValue)) {
        const newValue = value.filter(v => v !== optionValue);
        onChange({ target: { value: newValue } });
      } else {
        const newValue = [...(Array.isArray(value) ? value : []), optionValue];
        onChange({ target: { value: newValue } });
      }
    } else {
      onChange({ target: { value: optionValue } });
      setIsOpen(false);
      setSearchTerm({ target: { value: "" } });

      if (displayInputRef.current) {
        const blurEvent = new Event('blur', { bubbles: true });
        displayInputRef.current.dispatchEvent(blurEvent);
        if (onBlur) {
          onBlur(blurEvent);
        }
      }
    }
  };

  const handleSelectAll = () => {
    const newValue = allOptions.map(option => option.value);
    onChange({ target: { value: newValue } });
  };

  const handleClearAll = () => {
    onChange({ target: { value: [] } });
  };

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;

    const currentOptions = searchable ? filteredOptions : allOptions;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && currentOptions[highlightedIndex]) {
          handleOptionClick(currentOptions[highlightedIndex].value);
        } else if (!isOpen) {
          toggleOpen();
          if (isOpen && filteredOptions.length > 0 && highlightedIndex === -1) {
            handleOptionClick(filteredOptions[0].value);
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm({ target: { value: "" } });
        if (displayInputRef.current) {
          const blurEvent = new Event('blur', { bubbles: true });
          displayInputRef.current.dispatchEvent(blurEvent);
          if (onBlur) {
            onBlur(blurEvent);
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          toggleOpen();
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex(prev => {
            const nextIndex = prev + 1;
            return nextIndex >= currentOptions.length ? 0 : nextIndex;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          toggleOpen();
          setHighlightedIndex(currentOptions.length - 1);
        } else {
          setHighlightedIndex(prev => {
            const nextIndex = prev - 1;
            return nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
          });
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchTerm({ target: { value: "" } });
        if (displayInputRef.current) {
          const blurEvent = new Event('blur', { bubbles: true });
          displayInputRef.current.dispatchEvent(blurEvent);
          if (onBlur) {
            onBlur(blurEvent);
          }
        }
        break;
      default:
        if (searchable && isOpen && e.key.length === 1 && /[a-zA-Z0-9\s]/.test(e.key)) {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        } else if (!searchable) {
          const lowerCaseKey = e.key.toLowerCase();
          const startIndex = highlightedIndex !== -1 ? highlightedIndex + 1 : 0;
          const foundIndex = currentOptions.findIndex((option, idx) =>
            idx >= startIndex && normalizeString(option.label).toLowerCase().startsWith(normalizeString(lowerCaseKey))
          );

          if (foundIndex !== -1) {
            setHighlightedIndex(foundIndex);
          } else {
            const foundFromStart = currentOptions.findIndex(option =>
              normalizeString(option.label).toLowerCase().startsWith(normalizeString(lowerCaseKey))
            );
            if (foundFromStart !== -1) {
              setHighlightedIndex(foundFromStart);
            }
          }
        }
        break;
    }
  }, [isOpen, highlightedIndex, filteredOptions, allOptions, disabled, onChange, toggleOpen, handleOptionClick, searchable, setSearchTerm, searchInputRef, onBlur, multiple, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerWrapperRef.current && !containerWrapperRef.current.contains(event.target) &&
        optionsContainerRef.current && !optionsContainerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm({ target: { value: "" } });
        if (displayInputRef.current) {
          const blurEvent = new Event('blur', { bubbles: true });
          displayInputRef.current.dispatchEvent(blurEvent);
          if (onBlur) {
            onBlur(blurEvent);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchTerm, onBlur]);

  useEffect(() => {
    if (searchable) {
      setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
    } else {
      setHighlightedIndex(-1);
    }
    if (isOpen) {
      calculatePositionAndWidth();
    }
  }, [searchTerm, searchable, filteredOptions.length, isOpen, calculatePositionAndWidth]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable, searchInputRef]);

  return (
    <div
      ref={containerWrapperRef}
      className={`${styles.customSelectContainer} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
      style={fieldStyle}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby={identifier}
      role="combobox"
      {...props}
    >
      {multiple ? (
        <div
          className={`${styles.selectDisplay} ${styles.multipleDisplay}`}
          onClick={toggleOpen}
          ref={displayInputRef}
          style={inputStyle}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map(option => (
              <span key={option.value} className={styles.selectedChip}>
                {option.label}
                <i className="fas fa-times-circle" onClick={(e) => { e.stopPropagation(); handleRemoveOption(option.value); }} />
              </span>
            ))
          ) : (
            <span className={styles.placeholderLabel}>{placeholder}</span>
          )}
        </div>
      ) : (
        <input
          type="text"
          readOnly={true}
          disabled={disabled}
          ref={displayInputRef}
          className={`${styles.selectDisplay} ${inputButtonLeft ? styles.inputButtonLeft : ''} ${inputButtonRight ? styles.inputButtonRight : ''}`}
          onClick={toggleOpen}
          value={selectedOptionLabel}
          placeholder={placeholder}
          id={identifier}
          aria-controls={`${identifier}-listbox`}
          aria-activedescendant={isOpen && highlightedIndex >= 0 ? `${identifier}-option-${highlightedIndex}` : undefined}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          style={inputStyle}
        />
      )}

      {icon && <i className={`${icon} ${styles.selectIcon}`} style={iconStyle} />}

      {isOpen && createPortal(
        <div
          className={styles.optionsContainer}
          style={optionsPositionStyle}
          ref={optionsContainerRef}
          role="listbox"
          id={`${identifier}-listbox`}
          aria-labelledby={identifier}
        >
          {searchable && (
            <div className={styles.searchContainer}>
              <UseInputPadrao
                type="text"
                label={false}
                className={styles.searchInput}
                value={searchTerm}
                onChange={setSearchTerm}
                inputRef={searchInputRef}
                placeholder="Pesquisar..."
                icon="fas fa-search"
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    if (filteredOptions.length > 0 && highlightedIndex !== -1) {
                      handleOptionClick(filteredOptions[highlightedIndex].value);
                    } else if (filteredOptions.length > 0) {
                      handleOptionClick(filteredOptions[0].value);
                    }
                  }
                  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          )}
          {(multiple && multipleButtons) && (
            <div className={styles.multipleButtonsContainer}>
              <button className={styles.multipleButtons} onClick={handleSelectAll}>
                Selecionar todos <i className="fas fa-check" />
              </button>
              <button className={styles.multipleButtons} onClick={handleClearAll}>
                Limpar todos <i className="fas fa-times" />
              </button>
            </div>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.key || index}
                className={`${styles.optionItem} ${value.includes(option.value) ? styles.selected : ''} ${highlightedIndex === index ? styles.highlighted : ''}`}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={value.includes(option.value)}
                id={`${identifier}-option-${index}`}
              >
                {option.label}
                {multiple && value.includes(option.value) && (
                  <i className="fas fa-check" style={{ marginLeft: 'auto', color: 'var(--azul-padrao)' }} />
                )}
              </div>
            ))
          ) : (
            <div className={styles.noResults}>Nenhum resultado encontrado.</div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
});

export default Select;