import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import StepperPadrao from '../../../../../../components/StepperPadrao';
import { UseInputPadrao } from '../../../../../../components/InputPadrao';
import TogglePadrao from '../../../../../../components/TogglePadrao';
import toastMessage from '../../../../../../assets/toast-ui/toast';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';

const STEPS_CONFIG = [
  { id: 0, name: 'Em Preenchimento', icon: 'fa-solid fa-clipboard-list', area: 'empresa', color: '#3b82f6' },
  { id: 1, name: 'Encaminhado para o Portal Interno', icon: 'fa-solid fa-upload', area: 'cliente', color: '#2563eb' },
  { id: 2, name: 'Aguardando Assinatura do Cliente', icon: 'fa-solid fa-signature', area: 'representante', color: '#10b981' },
  { id: 3, name: 'Proposta em Análise', icon: 'fa-solid fa-magnifying-glass', area: 'representante-pai', color: '#059669' },
  { id: 4, name: 'Pendente', icon: 'fa-solid fa-triangle-exclamation', area: 'empresa', color: '#f59e0b' },
  { id: 5, name: 'Recusado', icon: 'fa-solid fa-ban', area: 'cliente', color: '#ef4444' },
  { id: 6, name: 'Aguardando Vigência', icon: 'fa-solid fa-hourglass-half', area: 'representante', color: '#6b7280' },
  { id: 7, name: 'Validade', icon: 'fa-solid fa-calendar-check', area: 'representante-pai', color: '#7c3aed' },
  { id: 8, name: 'Reanálise da Proposta', icon: 'fa-solid fa-rotate-left', area: 'empresa', color: '#d97706' },
  { id: 9, name: 'Fora do Limite de Transmissão', icon: 'fa-solid fa-cloud-arrow-down', area: 'cliente', color: '#9ca3af' },
];

const initialStepData = {
  inputsGerais: {
    ativar: false,
    qtdMensagemLote: '',
    tempoPorSegundo: '',
  },
  areaEmpresa: {
    ativar: false,
    email1: '',
    email2: '',
    email3: '',
    mensagemSMS: '',
    mensagemEmail: '',
    mensagemWhatsapp: '',
  },
  areaCliente: {
    ativar: false,
    mensagemSMS: '',
    mensagemEmail: '',
    mensagemMobile: '',
    mensagemWhatsapp: '',
  },
  areaRepresentante: {
    ativar: false,
    mensagemSMS: '',
    mensagemEmail: '',
    mensagemMobile: '',
    mensagemWhatsapp: '',
  },
  representantePai: {
    ativar: false,
    mensagemSMS: '',
    mensagemEmail: '',
    mensagemMobile: '',
    mensagemWhatsapp: '',
  },
};

const AndamentoProposta = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsData, setStepsData] = useState(Array(10).fill(initialStepData));
  const [expandedSections, setExpandedSections] = useState(['inputsGerais']);
  const [activeSubsection, setActiveSubsection] = useState('areaEmpresa');

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  const handleInputChange = (section, field, value) => {
    setStepsData(prev => {
      const newStepsData = [...prev];
      newStepsData[currentStep] = {
        ...newStepsData[currentStep],
        [section]: {
          ...newStepsData[currentStep][section],
          [field]: value,
        },
      };
      return newStepsData;
    });
  };

  const handleToggleChange = (section, field) => {
    handleInputChange(section, field, !stepsData[currentStep][section][field]);
  };

  const handleTextChange = (section, field, e) => {
    handleInputChange(section, field, e.target.value);
  };

  const handleSelectChange = (section, field, e) => {
    handleInputChange(section, field, e.target.value);
  };

  const handleNovo = () => {
    toastMessage('Nova proposta criada com sucesso!', 'success');
  };

  const handleGravar = () => {
    toastMessage('Proposta salva com sucesso!', 'success');
  };

  const handleDeletar = () => {
    dialogMessage(
      'Tem certeza que deseja deletar esta proposta?',
      'warning',
      {
        confirmButton: true,
        cancelButton: true,
        buttonsText: {
          confirm: 'Sim, Deletar',
          cancel: 'Cancelar'
        },
        onConfirm: () => {
          console.log('Função de deletar será implementada posteriormente');
          toastMessage('Proposta deletada com sucesso!', 'success');
        }
      }
    );
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleAnterior = () => {
    if (currentStep > 0) {
      handleStepChange(currentStep - 1);
    }
  };

  const handleProximo = () => {
    if (currentStep < STEPS_CONFIG.length - 1) {
      handleStepChange(currentStep + 1);
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS_CONFIG.length - 1;

  const renderStepForm = () => {
    const currentData = stepsData[currentStep];

    return (
      <div className={styles.passoForm}>
        <div className={styles.ConfSection}>
          <h3 className={styles.subtitle}>
            <i className="fa-solid fa-gear"></i>
            Configurações Gerais
          </h3>
            <div className={styles.sectionContent}>
                <div className={styles.inputGrid}>
                <TogglePadrao
                    label="Ativar"
                    checked={currentData.inputsGerais.ativar}
                    onChange={() => handleToggleChange('inputsGerais', 'ativar')}
                    option1="Sim"
                    option2="Não"
                    size="small"
                />
                <div className={styles.InputAfterToggle}>
                <UseInputPadrao
                    label="Quantidade de Mensagem por Lote"
                    value={currentData.inputsGerais.qtdMensagemLote}
                    onChange={(e) => handleTextChange('inputsGerais', 'qtdMensagemLote', e)}
                    type="number"
                    />
                <UseInputPadrao
                    label="Tempo por Segundo"
                    value={currentData.inputsGerais.tempoPorSegundo}
                    onChange={(e) => handleTextChange('inputsGerais', 'tempoPorSegundo', e)}
                    type="number"
                    />
                    </div>
                </div>
          </div>
        </div>

        <div className={styles.sideBySideTabs}>
          <div className={styles.subsectionButtons}>
            <button
              className={`${styles.subsectionButton} ${activeSubsection === 'areaEmpresa' ? styles.active : ''}`}
              onClick={() => setActiveSubsection('areaEmpresa')}
            >
              <i className="fa-solid fa-building"></i>
              Área Empresa
            </button>
            <button
              className={`${styles.subsectionButton} ${activeSubsection === 'areaCliente' ? styles.active : ''}`}
              onClick={() => setActiveSubsection('areaCliente')}
            >
              <i className="fa-solid fa-user"></i>
              Área Cliente
            </button>
            <button
              className={`${styles.subsectionButton} ${activeSubsection === 'areaRepresentante' ? styles.active : ''}`}
              onClick={() => setActiveSubsection('areaRepresentante')}
            >
              <i className="fa-solid fa-handshake"></i>
              Área Representante
            </button>
            <button
              className={`${styles.subsectionButton} ${activeSubsection === 'representantePai' ? styles.active : ''}`}
              onClick={() => setActiveSubsection('representantePai')}
            >
              <i className="fa-solid fa-user-tie"></i>
              Representante Pai
            </button>
          </div>

          <div className={styles.subsectionContent}>
            {activeSubsection === 'areaEmpresa' && (
              <>
                <div className={styles.toggleLine}>
                  <TogglePadrao
                    label="Ativar"
                    checked={currentData.areaEmpresa.ativar}
                    onChange={() => handleToggleChange('areaEmpresa', 'ativar')}
                    option1="Sim"
                    option2="Não"
                    size="small"
                  />
                </div>
                <div className={styles.subsectionGrid}>
                  <UseInputPadrao
                    label="Email 1"
                    type="select"
                    value={currentData.areaEmpresa.email1}
                    onChange={(e) => handleSelectChange('areaEmpresa', 'email1', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Email 2"
                    type="select"
                    value={currentData.areaEmpresa.email2}
                    onChange={(e) => handleSelectChange('areaEmpresa', 'email2', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Email 3"
                    type="select"
                    value={currentData.areaEmpresa.email3}
                    onChange={(e) => handleSelectChange('areaEmpresa', 'email3', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem SMS"
                    type="select"
                    value={currentData.areaEmpresa.mensagemSMS}
                    onChange={(e) => handleSelectChange('areaEmpresa', 'mensagemSMS', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Email"
                    type="select"
                    value={currentData.areaEmpresa.mensagemEmail}
                    onChange={(e) => handleSelectChange('areaEmpresa', 'mensagemEmail', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Whatsapp"
                    type="select"
                    value={currentData.areaEmpresa.mensagemWhatsapp}
                    onChange={(e) => handleSelectChange('areaEmpresa', 'mensagemWhatsapp', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                </div>
              </>
            )}
            {activeSubsection === 'areaCliente' && (
              <>
                <div className={styles.toggleLine}>
                  <TogglePadrao
                    label="Ativar"
                    checked={currentData.areaCliente.ativar}
                    onChange={() => handleToggleChange('areaCliente', 'ativar')}
                    option1="Sim"
                    option2="Não"
                    size="small"
                  />
                </div>
                <div className={styles.subsectionGrid}>
                  <UseInputPadrao
                    label="Mensagem SMS"
                    type="select"
                    value={currentData.areaCliente.mensagemSMS}
                    onChange={(e) => handleSelectChange('areaCliente', 'mensagemSMS', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Email"
                    type="select"
                    value={currentData.areaCliente.mensagemEmail}
                    onChange={(e) => handleSelectChange('areaCliente', 'mensagemEmail', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Mobile"
                    type="select"
                    value={currentData.areaCliente.mensagemMobile}
                    onChange={(e) => handleSelectChange('areaCliente', 'mensagemMobile', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Whatsapp"
                    type="select"
                    value={currentData.areaCliente.mensagemWhatsapp}
                    onChange={(e) => handleSelectChange('areaCliente', 'mensagemWhatsapp', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                </div>
              </>
            )}
            {activeSubsection === 'areaRepresentante' && (
              <>
                <div className={styles.toggleLine}>
                  <TogglePadrao
                    label="Ativar"
                    checked={currentData.areaRepresentante.ativar}
                    onChange={() => handleToggleChange('areaRepresentante', 'ativar')}
                    option1="Sim"
                    option2="Não"
                    size="small"
                  />
                </div>
                <div className={styles.subsectionGrid}>
                  <UseInputPadrao
                    label="Mensagem SMS"
                    type="select"
                    value={currentData.areaRepresentante.mensagemSMS}
                    onChange={(e) => handleSelectChange('areaRepresentante', 'mensagemSMS', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Email"
                    type="select"
                    value={currentData.areaRepresentante.mensagemEmail}
                    onChange={(e) => handleSelectChange('areaRepresentante', 'mensagemEmail', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Mobile"
                    type="select"
                    value={currentData.areaRepresentante.mensagemMobile}
                    onChange={(e) => handleSelectChange('areaRepresentante', 'mensagemMobile', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Whatsapp"
                    type="select"
                    value={currentData.areaRepresentante.mensagemWhatsapp}
                    onChange={(e) => handleSelectChange('areaRepresentante', 'mensagemWhatsapp', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                </div>
              </>
            )}
            {activeSubsection === 'representantePai' && (
              <>
                <div className={styles.toggleLine}>
                  <TogglePadrao
                    label="Ativar"
                    checked={currentData.representantePai.ativar}
                    onChange={() => handleToggleChange('representantePai', 'ativar')}
                    option1="Sim"
                    option2="Não"
                    size="small"
                  />
                </div>
                <div className={styles.subsectionGrid}>
                  <UseInputPadrao
                    label="Mensagem SMS"
                    type="select"
                    value={currentData.representantePai.mensagemSMS}
                    onChange={(e) => handleSelectChange('representantePai', 'mensagemSMS', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Email"
                    type="select"
                    value={currentData.representantePai.mensagemEmail}
                    onChange={(e) => handleSelectChange('representantePai', 'mensagemEmail', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Mobile"
                    type="select"
                    value={currentData.representantePai.mensagemMobile}
                    onChange={(e) => handleSelectChange('representantePai', 'mensagemMobile', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                  <UseInputPadrao
                    label="Mensagem Whatsapp"
                    type="select"
                    value={currentData.representantePai.mensagemWhatsapp}
                    onChange={(e) => handleSelectChange('representantePai', 'mensagemWhatsapp', e)}
                  >
                    <option value="">Selecione...</option>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                  </UseInputPadrao>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.andamentoPropostaContainer}>
      <div className={styles.andamentoPropostaHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            <i className="fa-solid fa-clipboard-list"></i>
            Andamento da Proposta - {STEPS_CONFIG[currentStep].name}
          </h1>
        </div>
      </div>

      <div className={styles.stepperContainer}>
        <StepperPadrao
          steps={STEPS_CONFIG}
          currentStep={currentStep}
          onStepChange={handleStepChange}
        >
          {renderStepForm()}
        </StepperPadrao>
      </div>

      <div className={styles.actionButtons}>
        <div className={styles.actionButtonsGroup}>
          <button className={`${styles.actionButton} ${styles.actionButtonGravar}`}>
            <i className="fa-solid fa-save"></i>
            Gravar
          </button>
          <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`}>
            <i className="fa-solid fa-arrow-left"></i>
            Voltar
          </button>
        </div>

        <div className={styles.actionButtonsGroup}>
          {/* {!isFirstStep && (
            <button className={`${styles.actionButton} ${styles.actionButtonAnterior}`} onClick={handleAnterior}>
              <i className="fa-solid fa-chevron-left"></i>
              Anterior
            </button>
          )}
          {!isLastStep && (
            <button className={`${styles.actionButton} ${styles.actionButtonProximo}`} onClick={handleProximo}>
              Próximo
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AndamentoProposta;