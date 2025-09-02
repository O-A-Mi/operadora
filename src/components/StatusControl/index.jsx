import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import TooltipPadrao from '../TooltipPadrao';

const StatusControl = ({ iconOnly = false, className = '', onStatusChange, compact = false, variant = 'cards' }) => {
  const [status, setStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('userStatus');
      if (saved === 'online' || saved === 'invisivel') return saved;
      if (saved === 'ativo') return 'online';
      if (saved === 'inativo') return 'invisivel';
      return 'invisivel';
    } catch {
      return 'invisivel';
    }
  }); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const StatusIcon = ({ type }) => {
    if (type === 'online') {
      return (
        <div className={styles.statusIconAtivo}>
          <i className="fa-solid fa-circle-check"></i>
        </div>
      );
    } else {
      return (
        <div className={styles.statusIconInativo}>
          <i className="fa-duotone fa-solid fa-circle-minus"></i>
        </div>
      );
    }
  };

  const statusOptions = [
    { value: 'online', label: 'Online', tooltip: 'Disponível para atendimento' },
    { value: 'invisivel', label: 'Invisivel', tooltip: 'Indisponível para atendimento' }
  ];

  const currentStatus = statusOptions.find(option => option.value === status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsMenuOpen(false);
    try {
      localStorage.setItem('userStatus', newStatus);
    } catch {}
    try {
      const evt = new CustomEvent('userStatusChanged', { detail: { status: newStatus } });
      window.dispatchEvent(evt);
    } catch {}
    if (typeof onStatusChange === 'function') onStatusChange(newStatus);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.statusContainer}`)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (iconOnly) {
    return (
      <div className={`${styles.statusContainer} ${className}`}>
        <button
          className={`${styles.statusButton}`}
          onClick={toggleMenu}
          aria-label={`Status atual: ${currentStatus.label}`}
          type="button"
          tabIndex={0}
          title={currentStatus.tooltip}
        >
          <StatusIcon type={currentStatus.value} />
        </button>
        
        {isMenuOpen && (
          <div className={styles.statusMenu}>
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.statusOption} ${status === option.value ? styles.active : ''}`}
                onClick={() => handleStatusChange(option.value)}
              >
                <StatusIcon type={option.value} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (compact) {
    if (variant === 'select') {
      const [isOpen, setIsOpen] = useState(false);
      const selectRef = useRef(null);

      useEffect(() => {
        const onClickOutside = (e) => {
          if (!selectRef.current) return;
          if (!selectRef.current.contains(e.target)) setIsOpen(false);
        };
        if (isOpen) document.addEventListener('click', onClickOutside);
        return () => document.removeEventListener('click', onClickOutside);
      }, [isOpen]);

      return (
        <div className={styles.selectGroup}>
          <label className={styles.selectLabel} htmlFor="status-select-btn">Selecione seu status de disponibilidade</label>
          <div className={styles.customSelect} ref={selectRef}>
            <button
              id="status-select-btn"
              type="button"
              className={styles.customSelectButton}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              <span className={`${styles.statusSelectIcon} ${status === 'online' ? styles.statusSelectIconAtivo : styles.statusSelectIconInativo}`} aria-hidden="true"></span>
              <span className={styles.customSelectValue}>{currentStatus.label}</span>
              <i className={`fas fa-chevron-down ${styles.customSelectChevron}`}></i>
            </button>
            {isOpen && (
              <div className={styles.customSelectMenu} role="listbox">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={status === option.value}
                    className={`${styles.customSelectOption} ${status === option.value ? styles.active : ''}`}
                    onClick={() => {
                      handleStatusChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <span className={`${styles.statusSelectIcon} ${option.value === 'online' ? styles.statusSelectIconAtivo : styles.statusSelectIconInativo}`} aria-hidden="true"></span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={styles.optionsGrid}>
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.statusCard} ${status === option.value ? styles.active : ''}`}
              onClick={() => handleStatusChange(option.value)}
            >
              <StatusIcon type={option.value} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Controle de Status</h1>
      <p className={styles.description}>
        Gerencie seu status de disponibilidade para atendimento.
      </p>
      
      <div className={styles.statusSection}>
        <h2>Status Atual</h2>
        <div className={styles.currentStatus}>
          <StatusIcon type={currentStatus.value} />
          <span>{currentStatus.label}</span>
        </div>
        
        <div className={styles.statusOptions}>
          <h3>Alterar Status</h3>
          <div className={styles.optionsGrid}>
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.statusCard} ${status === option.value ? styles.active : ''}`}
                onClick={() => handleStatusChange(option.value)}
              >
                <StatusIcon type={option.value} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusControl; 