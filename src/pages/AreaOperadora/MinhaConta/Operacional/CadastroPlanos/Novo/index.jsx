import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styles from './styles.module.css';
import TooltipPadrao from '../../../../../../components/TooltipPadrao';
import Plano from '../TelasStepper/Plano/index.jsx';
import FaixaTitular from '../TelasStepper/FaixaTitular/index.jsx';
import FaixaDependente from '../TelasStepper/FaixaDependente/index.jsx';
import ProdutoServico from '../TelasStepper/ProdutoServico/index.jsx';
import VigenciaLimite from '../TelasStepper/VigenciaLimite/index.jsx';
import Comissionamento from '../TelasStepper/Comissionamento/index.jsx';
import Pontuacao from '../TelasStepper/Pontuacao/index.jsx';
import Campanhas from '../TelasStepper/Campanhas/index.jsx';
import ValorTaxas from '../TelasStepper/ValorTaxas/index.jsx';
import Mensagens from '../TelasStepper/Mensagens/index.jsx';
import FormContrato from '../TelasStepper/FormContrato/index.jsx';
import Especialidade from '../TelasStepper/Especialidade/index.jsx';
import { handleResizeTabela  } from '../../../../../../utils/functions.js';
import toastMessage from '../../../../../../assets/toast-ui/toast';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import LogAuditoria from './ModalsNav/LogAuditoria/index.jsx';
import DuplicarComb from './ModalsNav/DuplicarComb/index.jsx';
import ReajusteGeral from './ModalsNav/ReajusteGeral/index.jsx';
import TReajusteIdade from './ModalsNav/TReajusteIdade/index.jsx';
import TReajusteAnual from './ModalsNav/TReajusteAnual/index.jsx';

const ComboNovo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const planoParaEdicao = location.state?.planoParaEdicao;
  const modoEdicao = location.state?.modoEdicao || false;
  
  const [isMobileInputs, setIsMobileInputs] = useState(window.innerWidth < 1024);
  const [isMobileStepper, setIsMobileStepper] = useState(window.innerWidth < 768);
  const [currentStepId, setCurrentStepId] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNavegador, setShowNavegador] = useState(false);
  const [showLogAuditoriaModal, setShowLogAuditoriaModal] = useState(false);
  const [showDuplicarCombModal, setShowDuplicarCombModal] = useState(false);
  const [showReajusteGeralModal, setShowReajusteGeralModal] = useState(false);
  const [showTReajusteIdadeModal, setShowTReajusteIdadeModal] = useState(false);
  const [showTReajusteAnualModal, setShowTReajusteAnualModal] = useState(false);
  
  const [utilizaFaixaIdade, setUtilizaFaixaIdade] = useState(false);
  const [adicionaDependentes, setAdicionaDependentes] = useState(true);
  const [cobraDependentes, setCobraDependentes] = useState(false);
  const [utilizaVigencia, setUtilizaVigencia] = useState(false);
  
  const allSteps = [
    { id: 0, name: 'Plano', icon: 'fa-solid fa-clipboard-list', color: '#3b82f6' },
    { id: 1, name: 'Faixa do Titular por Idade', icon: 'fa-solid fa-user', color: '#10b981' },
    { id: 2, name: 'Faixa do Dependente por Idade', icon: 'fa-solid fa-child', color: '#8b5cf6' },
    { id: 3, name: 'Produto/Serviço', icon: 'fa-solid fa-wrench', color: '#ef4444' },
    { id: 4, name: 'Vigência/Limite de Transmissão', icon: 'fa-solid fa-calendar', color: '#8b5cf6' },
    { id: 5, name: 'Comissionamento', icon: 'fa-solid fa-dollar-sign', color: '#f59e0b' },
    { id: 6, name: 'Pontuação', icon: 'fa-solid fa-coins', color: '#f59e0b' },
    { id: 7, name: 'Campanhas', icon: 'fa-solid fa-bullhorn', color: '#f59e0b' },
    { id: 8, name: 'Valor Taxas', icon: 'fa-solid fa-percentage', color: '#000000' },
    { id: 9, name: 'Mensagens', icon: 'fa-solid fa-comment-dots', color: '#eab308' },
    { id: 10, name: 'Formulários de Contrato', icon: 'fa-solid fa-file-contract', color: '#ec4899' },
    { id: 11, name: 'Especialidade', icon: 'fa-solid fa-stethoscope', color: '#8b5cf6' }
  ];

  const getFilteredSteps = () => {
    const filteredSteps = [allSteps[0]];
    
    if (utilizaFaixaIdade) {
      filteredSteps.push(allSteps[1]);
    }
    
    if (adicionaDependentes && cobraDependentes) {
      filteredSteps.push(allSteps[2]);
    }
    
    filteredSteps.push(allSteps[3]);
    
    if (utilizaVigencia) {
      filteredSteps.push(allSteps[4]);
    }
    
    filteredSteps.push(allSteps[5]);
    filteredSteps.push(allSteps[6]);
    filteredSteps.push(allSteps[7]);
    filteredSteps.push(allSteps[8]);
    filteredSteps.push(allSteps[9]);
    filteredSteps.push(allSteps[10]);
    filteredSteps.push(allSteps[11]);
    
    return filteredSteps;
  };

  const steps = getFilteredSteps();

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStepId);
  };

  const getCurrentStepData = () => {
    return steps.find(step => step.id === currentStepId);
  };

  const navegadorOptions = [
    { id: 'logAuditoria', label: 'Log Auditoria', icon: 'fa-solid fa-bookmark' },
    { id: 'duplicarComb', label: 'Duplicar Combo', icon: 'fa-solid fa-copy' },
    { id: 'reajusteGeral', label: 'Reajuste Geral Proposta', icon: 'fa-solid fa-pen' },
    { id: 'tReajusteIdade', label: 'TESTE Reajuste Idade', icon: 'fa-solid fa-users' },
    { id: 'tReajusteAnual', label: 'TESTE Reajuste Anual 5%', icon: 'fa-solid fa-chart-line' }
  ];

  const handleToggleChange = (toggleName, value) => {
    switch (toggleName) {
      case 'utilizaFaixaIdade':
        setUtilizaFaixaIdade(value);
        break;
      case 'adicionaDependentes':
        setAdicionaDependentes(value);
        break;
      case 'cobraDependentes':
        setCobraDependentes(value);
        break;
      case 'utilizaVigencia':
        setUtilizaVigencia(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const newSteps = getFilteredSteps();
    const currentStepExists = newSteps.some(step => step.id === currentStepId);
    
    if (!currentStepExists) {
      const lastStep = newSteps[newSteps.length - 1];
      if (lastStep) {
        setCurrentStepId(lastStep.id);
      }
    }
  }, [utilizaFaixaIdade, adicionaDependentes, cobraDependentes, utilizaVigencia]);

  useEffect(() => {
    const currentStepIndex = getCurrentStepIndex();
    const cleanupHandler = () => handleResizeTabela(`cadastro-plano-${currentStepId}`, `cadastro-plano-container-${currentStepId}`);
    
    window.addEventListener("resize", () => {
      cleanupHandler;
      setIsMobileInputs(window.innerWidth < 1024);
      setIsMobileStepper(window.innerWidth < 768);
    });

    requestAnimationFrame(() => {
      handleResizeTabela(`cadastro-plano-${currentStepId}`, `cadastro-plano-container-${currentStepId}`);
    });

    return () => {
      window.removeEventListener("resize", cleanupHandler);
    };
  }, [currentStepId]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navegadorElement = document.querySelector(`.${styles.navegadorContainer}`);
      if (navegadorElement && !navegadorElement.contains(event.target)) {
        setShowNavegador(false);
      }
    };

    if (showNavegador) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNavegador, styles.navegadorContainer]);

  const handleStepClick = (stepId) => {
    setCurrentStepId(stepId);
    if (isMobileStepper) {
      setShowDropdown(false);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePreviousStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStepId(steps[currentIndex - 1].id);
    }
  };

  const handleNextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStepId(steps[currentIndex + 1].id);
    }
  };

  const handleNovo = () => {
  };

  const handleGravar = () => {
    dialogMessage(
      'Tem certeza que deseja gravar este plano?',
      'warning',
      {
        confirmButton: true,
        cancelButton: true,
        buttonsText: {
          confirm: 'Sim',
          cancel: 'Não'
        },
        onConfirm: () => {
          console.log('Função de gravar será implementada posteriormente');
          toastMessage('Plano gravado com sucesso!', 'success');
        }
      }
    );
  }

  const handleDeletar = () => {
    dialogMessage(
      'Tem certeza que deseja remover este plano?',
      'warning',
      {
        confirmButton: true,
        cancelButton: true,
        buttonsText: {
          confirm: 'Sim',
          cancel: 'Não'
        },
        onConfirm: () => {
          console.log('Função de remover será implementada posteriormente');
          toastMessage('Plano deletado com sucesso!', 'success');
        }
      }
    );
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleAnterior = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStepId(steps[currentIndex - 1].id);
    }
  };

  const handleProximo = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStepId(steps[currentIndex + 1].id);
    }
  };

  const handleNavegadorClick = () => {
    setShowNavegador(!showNavegador);
  };

  const handleNavegadorOption = (option) => {
    setShowNavegador(false);
    
    switch (option.id) {
      case 'logAuditoria':
        setShowLogAuditoriaModal(true);
        break;
      case 'duplicarComb':
        setShowDuplicarCombModal(true);
        break;
      case 'reajusteGeral':
        setShowReajusteGeralModal(true);
        break;
      case 'tReajusteIdade':
        setShowTReajusteIdadeModal(true);
        break;
      case 'tReajusteAnual':
        setShowTReajusteAnualModal(true);
        break;
      default:
        break;
    }
  };

  const handleDuplicarCombSubmit = (data) => {
    console.log('Dados do combo duplicado:', data);
    console.log('Descrição:', data.descricao);
    console.log('Abreviação:', data.abreviacao);
    console.log('Duplica Faixa Idade Titular:', data.duplicaFaixaIdadeTitular);
    console.log('Duplica Faixa Idade Dependente:', data.duplicaFaixaIdadeDependente);
    console.log('Duplica Produto/Serviço:', data.duplicaProdutoServico);
    console.log('Duplica Vigência:', data.duplicaVigencia);
    console.log('Duplica Comissionamento:', data.duplicaComissionamento);
    console.log('Duplica Valor Taxas:', data.duplicaValorTaxas);
    console.log('Duplica Campanha:', data.duplicaCampanha);
  };

  const isFirstStep = () => {
    return getCurrentStepIndex() === 0;
  };

  const isLastStep = () => {
    return getCurrentStepIndex() === steps.length - 1;
  };

  const currentStepData = getCurrentStepData();

  const getStepComponent = (stepId) => {
    switch (stepId) {
      case 0:
        return (
          <Plano 
            modoEdicao={modoEdicao}
            planoParaEdicao={planoParaEdicao}
            isMobile={isMobileInputs}
            currentStep={0}
            onToggleChange={handleToggleChange}
            utilizaFaixaIdade={utilizaFaixaIdade}
            adicionaDependentes={adicionaDependentes}
            cobraDependentes={cobraDependentes}
            utilizaVigencia={utilizaVigencia}
          />
        );
      case 1:
        return <FaixaTitular isMobile={isMobileInputs} currentStep={1} />;
      case 2:
        return <FaixaDependente isMobile={isMobileInputs} currentStep={2} />;
      case 3:
        return <ProdutoServico isMobile={isMobileInputs} currentStep={3} />;
      case 4:
        return <VigenciaLimite isMobile={isMobileInputs} currentStep={4} />;
      case 5:
        return <Comissionamento isMobile={isMobileInputs} currentStep={5} />;
      case 6:
        return <Pontuacao isMobile={isMobileInputs} currentStep={6} />;
      case 7:
        return <Campanhas isMobile={isMobileInputs} currentStep={7} />;
      case 8:
        return <ValorTaxas isMobile={isMobileInputs} currentStep={8} />;
      case 9:
        return <Mensagens isMobile={isMobileInputs} currentStep={9} />;
      case 10:
        return <FormContrato isMobile={isMobileInputs} currentStep={10} />;
      case 11:
        return <Especialidade isMobile={isMobileInputs} currentStep={11} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.comboNovoContainer}>
      {modoEdicao && (
        <div className={styles.comboNovoHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>
              <i className="fa-solid fa-clipboard-list"></i>
              Edição de Plano/Serviço
            </h1>
          </div>
        </div>
      )}

      {modoEdicao && (
        <div className={styles.stepperContainer}>
          {isMobileStepper ? (
            <div className={styles.mobileStepper}>
              <div className={styles.mobileStepSelector}>
                <button 
                  className={`${styles.mobileNavButton} ${isFirstStep() ? styles.disabled : ''}`}
                  onClick={handlePreviousStep}
                  disabled={isFirstStep()}
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
                  className={`${styles.mobileNavButton} ${isLastStep() ? styles.disabled : ''}`}
                  onClick={handleNextStep}
                  disabled={isLastStep()}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
              
              {showDropdown && (
                <div className={styles.mobileDropdown}>
                  {steps.map((step) => (
                    <div 
                      key={step.id}
                      className={`${styles.mobileDropdownItem} ${currentStepId === step.id ? styles.activeItem : ''}`}
                      onClick={() => handleStepClick(step.id)}
                    >
                      <div 
                        className={styles.mobileDropdownIcon}
                        style={{ 
                          backgroundColor: currentStepId === step.id ? step.color : '#e5e7eb',
                          borderColor: step.color
                        }}
                      >
                        <i 
                          className={step.icon} 
                          style={{ color: currentStepId === step.id ? 'white' : '#9ca3af' }}
                        ></i>
                      </div>
                      <span className={styles.mobileDropdownLabel}>{step.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.stepper}>
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <TooltipPadrao text={step.name} position="bottom">
                    <div 
                      className={`${styles.step} ${currentStepId === step.id ? styles.activeStep : ''}`}
                      onClick={() => handleStepClick(step.id)}
                    >
                      <div 
                        className={styles.stepIcon}
                        style={{ 
                          backgroundColor: currentStepId === step.id ? step.color : '#e5e7eb',
                          borderColor: step.color
                        }}
                      >
                        <i className={step.icon} style={{ color: currentStepId === step.id ? 'white' : '#9ca3af' }}></i>
                      </div>
                    </div>
                  </TooltipPadrao>
                  {index < steps.length - 1 && (
                    <div className={styles.stepLine}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.comboNovoContent}>
        {modoEdicao ? (
          <div className={styles.stepContent}>
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`${styles.stepScreen} ${currentStepId === step.id ? styles.activeScreen : styles.hiddenScreen}`} 
                id={`cadastro-plano-container-${step.id}`}
              >
                {getStepComponent(step.id)}
              </div>
            ))}
          </div>
        ) : (
          <Plano 
            modoEdicao={modoEdicao}
            planoParaEdicao={planoParaEdicao}
            isMobile={isMobileInputs}
            onToggleChange={handleToggleChange}
            utilizaFaixaIdade={utilizaFaixaIdade}
            adicionaDependentes={adicionaDependentes}
            cobraDependentes={cobraDependentes}
            utilizaVigencia={utilizaVigencia}
          />
        )}
      </div>

      <div className={styles.actionButtons}>
        <div className={styles.actionButtonsGroup}>
          <button className={`${styles.actionButton} ${styles.actionButtonNovo}`} onClick={handleNovo}>
            <i className="fa-solid fa-plus"></i>
            Novo
          </button>
          <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={handleGravar}>
            <i className="fa-solid fa-save"></i>
            Gravar
          </button>
          <button className={`${styles.actionButton} ${styles.actionButtonDeletar}`} onClick={handleDeletar}>
            <i className="fa-solid fa-trash"></i>
            Remover
          </button>
          <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleVoltar}>
            <i className="fa-solid fa-arrow-left"></i>
            Voltar
          </button>
        </div>
        
        <div className={styles.actionButtonsGroup}>
          {modoEdicao && !isFirstStep() && (
            <button className={`${styles.actionButton} ${styles.actionButtonAnterior}`} onClick={handleAnterior}>
              <i className="fa-solid fa-chevron-left"></i>
              Anterior
            </button>
          )}
          {modoEdicao && !isLastStep() && (
            <button className={`${styles.actionButton} ${styles.actionButtonProximo}`} onClick={handleProximo}>
              Próximo
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
          <div className={styles.navegadorContainer}>
            <button className={`${styles.actionButton} ${styles.actionButtonNavegador}`} onClick={handleNavegadorClick}>
              Navegador
              <i className="fa-solid fa-caret-up"></i>
            </button>
            {showNavegador && (
              <div className={styles.navegadorDropdown}>
                {navegadorOptions.map((option) => (
                  <div
                    key={option.id}
                    className={styles.navegadorOption}
                    onClick={() => handleNavegadorOption(option)}
                  >
                    {option.icon && <i className={option.icon}></i>}
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <LogAuditoria 
        isOpen={showLogAuditoriaModal}
        onClose={() => setShowLogAuditoriaModal(false)}
      />

      <DuplicarComb 
        isOpen={showDuplicarCombModal}
        onClose={() => setShowDuplicarCombModal(false)}
        onSubmit={handleDuplicarCombSubmit}
      />

      <ReajusteGeral 
        isOpen={showReajusteGeralModal}
        onClose={() => setShowReajusteGeralModal(false)}
      />

      <TReajusteIdade 
        isOpen={showTReajusteIdadeModal}
        onClose={() => setShowTReajusteIdadeModal(false)}
      />

      <TReajusteAnual 
        isOpen={showTReajusteAnualModal}
        onClose={() => setShowTReajusteAnualModal(false)}
      />
    </div>
  );
};

export default ComboNovo; 