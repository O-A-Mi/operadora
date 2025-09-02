import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import TooltipPadrao from '../TooltipPadrao';

const StepperPadrao = ({ 
  steps = [], 
  currentStep = 0, 
  onStepChange, 
  showStepper = true,
  stepConditions = {}, // Nova prop para condições { stepId: 'disabled' | 'invisible' }
  children 
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const stepperElement = document.querySelector(`.${styles.mobileStepper}`);
      if (stepperElement && !stepperElement.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, styles.mobileStepper]);

  // Filtrar steps baseado nas condições
  const getVisibleSteps = () => {
    return steps.filter(step => stepConditions[step.id] !== 'invisible');
  };

  // Verificar se um step está desabilitado
  const isStepDisabled = (stepId) => {
    return stepConditions[stepId] === 'disabled';
  };

  // Verificar se um step é clicável
  const isStepClickable = (stepId) => {
    return !isStepDisabled(stepId) && stepConditions[stepId] !== 'invisible';
  };

  const visibleSteps = getVisibleSteps();

  const getCurrentStepIndex = () => {
    return visibleSteps.findIndex(step => step.id === currentStep);
  };

  const handleStepClick = (stepId) => {
    if (!isStepClickable(stepId)) {
      return; // Não permite clique em steps desabilitados ou invisíveis
    }
    
    if (onStepChange) {
      onStepChange(stepId);
    }
    if (isMobile) {
      setShowDropdown(false);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0 && onStepChange) {
      // Encontrar o step anterior válido (não invisível)
      let prevIndex = currentIndex - 1;
      while (prevIndex >= 0 && !isStepClickable(visibleSteps[prevIndex].id)) {
        prevIndex--;
      }
      if (prevIndex >= 0) {
        onStepChange(visibleSteps[prevIndex].id);
      }
    }
  };

  const handleNextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < visibleSteps.length - 1 && onStepChange) {
      // Encontrar o próximo step válido (não invisível)
      let nextIndex = currentIndex + 1;
      while (nextIndex < visibleSteps.length && !isStepClickable(visibleSteps[nextIndex].id)) {
        nextIndex++;
      }
      if (nextIndex < visibleSteps.length) {
        onStepChange(visibleSteps[nextIndex].id);
      }
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  if (!showStepper) {
    return <div className={styles.stepperContent}>{children}</div>;
  }

  const currentStepData = visibleSteps.find(step => step.id === currentStep);
  const currentIndex = getCurrentStepIndex();
  
  // Verificar se é o primeiro/último step válido
  const isFirstValidStep = () => {
    for (let i = 0; i < visibleSteps.length; i++) {
      if (isStepClickable(visibleSteps[i].id)) {
        return visibleSteps[i].id === currentStep;
      }
    }
    return true;
  };

  const isLastValidStep = () => {
    for (let i = visibleSteps.length - 1; i >= 0; i--) {
      if (isStepClickable(visibleSteps[i].id)) {
        return visibleSteps[i].id === currentStep;
      }
    }
    return true;
  };

  return (
    <div className={styles.stepperWrapper}>
      <div className={styles.stepperContainer}>
        {isMobile ? (
          <div className={styles.mobileStepper}>
            <div className={styles.mobileStepSelector}>
              <button 
                className={`${styles.mobileNavButton} ${isFirstValidStep() ? styles.disabled : ''}`}
                onClick={handlePreviousStep}
                disabled={isFirstValidStep()}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              <div 
                className={styles.mobileStepContent}
                onClick={handleDropdownToggle}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className={styles.mobileStepIcon}
                  style={{ 
                    backgroundColor: currentStepData?.color || '#3b82f6',
                    borderColor: currentStepData?.color || '#3b82f6'
                  }}
                >
                  <i 
                    className={currentStepData?.icon || 'fa-solid fa-clipboard-list'} 
                    style={{ color: 'white' }}
                  ></i>
                </div>
                <span className={styles.mobileStepName}>
                  {currentStepData?.name || 'Selecione uma etapa'}
                </span>
              </div>
              
              <button 
                className={`${styles.mobileNavButton} ${isLastValidStep() ? styles.disabled : ''}`}
                onClick={handleNextStep}
                disabled={isLastValidStep()}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            
            {showDropdown && (
              <div className={styles.mobileDropdown}>
                {visibleSteps.map((step) => {
                  const disabled = isStepDisabled(step.id);
                  return (
                    <div 
                      key={step.id}
                      className={`
                        ${styles.mobileDropdownItem} 
                        ${currentStep === step.id ? styles.activeItem : ''} 
                        ${disabled ? styles.disabledItem : ''}
                      `}
                      onClick={() => handleStepClick(step.id)}
                      style={{ 
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled ? 0.6 : 1
                      }}
                    >
                      <div 
                        className={styles.mobileDropdownIcon}
                        style={{ 
                          backgroundColor: currentStep === step.id ? step.color : (disabled ? '#d1d5db' : '#e5e7eb'),
                          borderColor: disabled ? '#d1d5db' : step.color
                        }}
                      >
                        <i 
                          className={step.icon} 
                          style={{ color: currentStep === step.id ? 'white' : (disabled ? '#9ca3af' : '#9ca3af') }}
                        ></i>
                      </div>
                      <span className={styles.mobileDropdownLabel}>{step.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.stepper}>
            {visibleSteps.map((step, index) => {
              const disabled = isStepDisabled(step.id);
              return (
                <React.Fragment key={step.id}>
                  <TooltipPadrao 
                    text={disabled ? `${step.name}` : step.name} 
                    position="bottom"
                  >
                    <div 
                      className={`
                        ${styles.step} 
                        ${currentStep === step.id ? styles.activeStep : ''} 
                        ${disabled ? styles.disabledStep : ''}
                      `}
                      onClick={() => handleStepClick(step.id)}
                      style={{ 
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled ? 0.6 : 1
                      }}
                    >
                      <div 
                        className={styles.stepIcon}
                        style={{ 
                          backgroundColor: currentStep === step.id ? step.color : (disabled ? '#d1d5db' : '#e5e7eb'),
                          borderColor: disabled ? '#d1d5db' : step.color
                        }}
                      >
                        <i 
                          className={step.icon} 
                          style={{ color: currentStep === step.id ? 'white' : (disabled ? '#9ca3af' : '#9ca3af') }}
                        ></i>
                      </div>
                    </div>
                  </TooltipPadrao>
                  {index < visibleSteps.length - 1 && (
                    <div className={styles.stepLine}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
      
      <div className={styles.stepperContent}>
        {children}
      </div>
    </div>
  );
};

export default StepperPadrao;