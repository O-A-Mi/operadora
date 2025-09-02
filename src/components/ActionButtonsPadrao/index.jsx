import React, { useRef, useEffect } from 'react';
import styles from './styles.module.css';

const ActionButtons = ({ 
  buttons = {},
  handlers = {},
  isFirstStep = () => false,
  isLastStep = () => false,
  navegadorOptions = [],
  showNavegador = false,
  onNavegadorClick = () => {},
  onNavegadorOption = () => {},
  onNavegadorClose = () => {}
}) => {
  const navegadorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navegadorRef.current && !navegadorRef.current.contains(event.target)) {
        onNavegadorClose();
      }
    };

    if (showNavegador) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNavegador, onNavegadorClose]);

  const defaultButtons = {
    novo: {
      name: 'Novo',
      icon: 'fa-solid fa-plus',
      color: '#3b82f6',
      hoverColor: '#2563eb'
    },
    gravar: {
      name: 'Gravar',
      icon: 'fa-solid fa-save',
      color: '#10b981',
      hoverColor: '#059669'
    },
    remover: {
      name: 'Remover',
      icon: 'fa-solid fa-trash',
      color: '#ef4444',
      hoverColor: '#dc2626'
    },
    voltar: {
      name: 'Voltar',
      icon: 'fa-solid fa-arrow-left',
      color: '#6b7280',
      hoverColor: '#4b5563'
    },
    anterior: {
      name: 'Anterior',
      icon: 'fa-solid fa-chevron-left',
      color: '#dc2626',
      hoverColor: '#b91c1c'
    },
    proximo: {
      name: 'Próximo',
      icon: 'fa-solid fa-chevron-right',
      color: '#059669',
      hoverColor: '#047857',
      iconPosition: 'right'
    },
    navegador: {
      name: 'Navegador',
      icon: 'fa-solid fa-caret-up',
      color: '#7c3aed',
      hoverColor: '#6d28d9',
      iconPosition: 'right'
    }
  };

  const getButtonConfig = (buttonKey) => {
    const defaultConfig = defaultButtons[buttonKey];
    const customConfig = buttons[buttonKey];

    if (!customConfig || customConfig === false) return null;
    if (customConfig === true) return defaultConfig;

    return { ...defaultConfig, ...customConfig };
  };

  const renderButton = (buttonKey, config, handler) => {
    if (!config) return null;

    const buttonStyle = {
      backgroundColor: config.color,
      '--hover-color': config.hoverColor
    };

    const content = config.iconPosition === 'right' ? (
      <>
        {config.name}
        {config.icon && <i className={config.icon}></i>}
      </>
    ) : (
      <>
        {config.icon && <i className={config.icon}></i>}
        {config.name}
      </>
    );

    return (
      <button
        key={buttonKey}
        className={`${styles.actionButton} ${styles[`actionButton${buttonKey.charAt(0).toUpperCase() + buttonKey.slice(1)}`]}`}
        onClick={handler}
        style={buttonStyle}
      >
        {content}
      </button>
    );
  };

  const renderNavegadorDropdown = () => {
    if (!showNavegador || !navegadorOptions.length) return null;

    return (
      <div className={styles.navegadorDropdown}>
        {navegadorOptions.map((option) => (
          <div
            key={option.id}
            className={styles.navegadorOption}
            onClick={() => {
              onNavegadorOption(option);
              onNavegadorClose();
            }}
          >
            {option.icon && <i className={option.icon}></i>}
            {option.label}
          </div>
        ))}
      </div>
    );
  };

  const buttonConfigs = {
    novo: getButtonConfig('novo'),
    gravar: getButtonConfig('gravar'),
    remover: getButtonConfig('remover'),
    voltar: getButtonConfig('voltar'),
    anterior: getButtonConfig('anterior'),
    proximo: getButtonConfig('proximo'),
    navegador: getButtonConfig('navegador')
  };

  const firstGroupButtons = [
    buttonConfigs.novo && renderButton('novo', buttonConfigs.novo, handlers.handleNovo),
    buttonConfigs.gravar && renderButton('gravar', buttonConfigs.gravar, handlers.handleGravar),
    buttonConfigs.remover && renderButton('remover', buttonConfigs.remover, handlers.handleDeletar),
    buttonConfigs.voltar && renderButton('voltar', buttonConfigs.voltar, handlers.handleVoltar)
  ].filter(Boolean);

  const secondGroupButtons = [];
  if (!isFirstStep() && buttonConfigs.anterior) {
    secondGroupButtons.push(renderButton('anterior', buttonConfigs.anterior, handlers.handleAnterior));
  }
  if (!isLastStep() && buttonConfigs.proximo) {
    secondGroupButtons.push(renderButton('proximo', buttonConfigs.proximo, handlers.handleProximo));
  }

  const navegadorContainer = buttonConfigs.navegador && (
    <div className={styles.navegadorContainer} ref={navegadorRef}>
      {renderButton('navegador', buttonConfigs.navegador, onNavegadorClick)}
      {renderNavegadorDropdown()}
    </div>
  );

  return (
    <div className={styles.actionButtons}>
      {firstGroupButtons.length > 0 && (
        <div className={styles.actionButtonsGroup}>
          {firstGroupButtons}
        </div>
      )}

      {(secondGroupButtons.length > 0 || navegadorContainer) && (
        <div className={styles.actionButtonsGroup}>
          {secondGroupButtons}
          {navegadorContainer}
        </div>
      )}
    </div>
  );
};

export default ActionButtons;