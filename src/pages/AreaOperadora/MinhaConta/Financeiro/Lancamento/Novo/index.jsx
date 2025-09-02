import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../../../utils/json.js';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import toastMessage from '../../../../../../assets/toast-ui/toast';
import DuplicarLancamento from './modals/DuplicarLancamento';
import DetalhamentoCoparticipacao from './modals/DetalhamentoCoparticipacao';
import DetalhamentoBeneficiario from './modals/DetalhamentoBeneficiario';
import DemonstrativoAnalitico from './modals/DemonstrativoAnalitico';
import LogAuditoria from './modals/LogAuditoria';
import LogFechamento from './modals/LogFechamento';
import ModalAnexos from './modals/ModalAnexos';
import ModalFormularios from './modals/ModalFormularios';
import ModalEmail from './modals/ModalEmail';
import ModalSMS from './modals/ModalSMS';
import ModalWhatsapp from './modals/ModalWhatsapp';
import ModalGerarBoleto from './modals/ModalGerarBoleto';
import DadosFinanceiro from './DadosFinanceiro/index.jsx';
import OrigemLancamento from './OrigemLancamento/index.jsx';
import FormaPagamento from './FormaPagamento/index.jsx';
import Informacoes from './Informacoes/index.jsx';

const LancamentoNovo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSubsection, setCurrentSubsection] = useState('dadosFinanceiro');
  const [showNavegador, setShowNavegador] = useState(false);
  const dadosFinanceiroRef = useRef();
  const origemLancamentoRef = useRef();
  const formaPagamentoRef = useRef();
  const informacoesRef = useRef();
  const [showDuplicarModal, setShowDuplicarModal] = useState(false);
  const [showCoparticipacaoModal, setShowCoparticipacaoModal] = useState(false);
  const [showBeneficiarioModal, setShowBeneficiarioModal] = useState(false);
  const [showDemonstrativoModal, setShowDemonstrativoModal] = useState(false);
  const [showLogAuditoriaModal, setShowLogAuditoriaModal] = useState(false);
  const [showLogFechamentoModal, setShowLogFechamentoModal] = useState(false);
  const [showAnexosModal, setShowAnexosModal] = useState(false);
  const [showFormulariosModal, setShowFormulariosModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [showGerarBoletoModal, setShowGerarBoletoModal] = useState(false);

  const lancamentoParaEdicao = location.state?.lancamentoParaEdicao;
  const modoEdicao = location.state?.modoEdicao || false;

  const destinatarioExemplo = {
    nome: "MIGUEL ANTONIO",
    email: "suporte1.hermanosti@gmail.com",
    telefone: "(12)99182-7172"
  };

  const subsections = [
    { id: 'dadosFinanceiro', name: 'Dados Financeiro', icon: 'fa-solid fa-money-bill-wave' },
    { id: 'origemLancamento', name: 'Origem do Lançamento', icon: 'fa-solid fa-bank' },
    { id: 'formaPagamento', name: 'Forma de Pagamento', icon: 'fa-solid fa-credit-card' },
    { id: 'informacoes', name: 'Informações', icon: 'fa-solid fa-info-circle' }
  ];

  const navegadorOptions = [
    { id: 'email', label: 'Email', icon: 'fa-solid fa-envelope' },
    { id: 'sms', label: 'SMS', icon: 'fa-solid fa-comment' },
    { id: 'whatsapp', label: 'Whatsapp', icon: 'fa-brands fa-whatsapp' },
    { id: 'duplicar', label: 'Duplicar Lançamento', icon: 'fa-solid fa-copy' },
    { id: 'boleto', label: 'Gerar Boleto', icon: 'fa-solid fa-receipt' },
    { id: 'formularios', label: 'Formulários', icon: 'fa-solid fa-file-alt' },
    { id: 'anexo', label: 'Anexos', icon: 'fa-solid fa-paperclip' },
    { id: 'coparticipacao', label: 'Detalhamento Coparticipação', icon: 'fa-solid fa-users' },
    { id: 'beneficiarios', label: 'Detalhamento Beneficiários', icon: 'fa-solid fa-user-friends' },
    { id: 'demonstrativo', label: 'Demonstrativo Analitico', icon: 'fa-solid fa-chart-line' },
    { id: 'recalcular', label: 'Recalcular Lançamento', icon: 'fa-solid fa-redo' },
    { id: 'logAuditoria', label: 'Log Auditoria', icon: 'fa-solid fa-bookmark' },
    { id: 'logFechamento', label: 'Log Fechamento', icon: 'fa-solid fa-file-alt' }
  ];

  const isActiveSubsection = (subsection) => {
    return currentSubsection === subsection.id;
  };

  const handleSubsectionClick = (subsection) => {
    setCurrentSubsection(subsection.id);
  };

  const getCurrentSubsectionIndex = () => {
    return subsections.findIndex(subsection => subsection.id === currentSubsection);
  };

  const handleNovo = () => {
    // Botão Novo sem funcionalidade
  };

  const handleGravar = () => {
    if (dadosFinanceiroRef.current) {
      const camposValidos = dadosFinanceiroRef.current.validarCamposObrigatorios();
      if (!camposValidos) {
        if (currentSubsection !== 'dadosFinanceiro') {
          toastMessage("Existem campos obrigatórios não preenchidos na seção 'Dados Financeiro'. Navegando para a seção.", "warning", {
            timeOut: 4000,
          });
          setCurrentSubsection('dadosFinanceiro');
        }
        return;
      }
    } else {
      if (currentSubsection !== 'dadosFinanceiro') {
        toastMessage("Existem campos obrigatórios não preenchidos na seção 'Dados Financeiro'. Navegando para a seção.", "warning", {
          timeOut: 4000,
        });
        setCurrentSubsection('dadosFinanceiro');
      }
      return;
    }
    
    dialogMessage("Tem certeza que deseja gravar este registro?", "info", {}, (result) => {});
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleProximo = () => {
    const currentIndex = getCurrentSubsectionIndex();
    if (currentIndex < subsections.length - 1) {
      setCurrentSubsection(subsections[currentIndex + 1].id);
    }
  };

  const handleAnterior = () => {
    const currentIndex = getCurrentSubsectionIndex();
    if (currentIndex > 0) {
      setCurrentSubsection(subsections[currentIndex - 1].id);
    }
  };

  const handleNavegadorClick = () => {
    setShowNavegador(!showNavegador);
  };

  const handleNavegadorOption = (option) => {
    setShowNavegador(false);
    
    switch (option.id) {
      case 'email':
        setShowEmailModal(true);
        break;
      case 'sms':
        setShowSMSModal(true);
        break;
      case 'whatsapp':
        setShowWhatsappModal(true);
        break;
      case 'duplicar':
        setShowDuplicarModal(true);
        break;
      case 'boleto':
        setShowGerarBoletoModal(true);
        break;
      case 'formularios':
        setShowFormulariosModal(true);
        break;
      case 'anexo':
        setShowAnexosModal(true);
        break;
      case 'coparticipacao':
        setShowCoparticipacaoModal(true);
        break;
      case 'beneficiarios':
        setShowBeneficiarioModal(true);
        break;
      case 'demonstrativo':
        setShowDemonstrativoModal(true);
        break;
      case 'logAuditoria':
        setShowLogAuditoriaModal(true);
        break;
      case 'logFechamento':
        setShowLogFechamentoModal(true);
        break;
      case 'recalcular':
        dialogMessage(
          "Tem certeza que deseja recalcular os valores deste boleto?",
          "info",
          {
            buttonsText: {
              confirm: "Sim",
              cancel: "Não"
            }
          },
          (result) => {
            if (result) {
              toastMessage("Boleto recalculado com sucesso!", "success");
            }
          }
        );
        break;
      default:
        break;
    }
  };

  const handleDuplicarSubmit = (data) => {
    setShowDuplicarModal(false);
  };

  const isFirstSubsection = () => {
    return getCurrentSubsectionIndex() === 0;
  };

  const isLastSubsection = () => {
    return getCurrentSubsectionIndex() === subsections.length - 1;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navegadorContainer = event.target.closest(`.${styles.navegadorContainer}`);
      if (!navegadorContainer && showNavegador) {
        setShowNavegador(false);
      }
    };

    if (showNavegador) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNavegador]);

  return (
    <div className={styles.tesourariaContainer}>
      <h2 className={styles.tesourariaTitle}>
        <i className="fa-solid fa-plus"></i>
        {modoEdicao ? 'Editar Lançamento' : 'Novo Lançamento'}
      </h2>
      <div className={styles.tesourariaHeader}>
        <div className={styles.subsectionButtons}>
          {subsections.map((subsection) => (
            <button
              key={subsection.id}
              className={`${styles.subsectionButton} ${
                isActiveSubsection(subsection) ? styles.active : ''
              }`}
              onClick={() => handleSubsectionClick(subsection)}
            >
              <i className={subsection.icon} />
              {subsection.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.subsectionContent}>
        <div className={styles.subsectionPanel}>
          <div className={`${styles.subsectionScreen} ${currentSubsection === 'dadosFinanceiro' ? styles.activeScreen : styles.hiddenScreen}`}>
            <DadosFinanceiro 
              ref={dadosFinanceiroRef} 
              lancamentoParaEdicao={lancamentoParaEdicao}
              modoEdicao={modoEdicao}
            />
          </div>
          <div className={`${styles.subsectionScreen} ${currentSubsection === 'origemLancamento' ? styles.activeScreen : styles.hiddenScreen}`}>
            <OrigemLancamento 
              ref={origemLancamentoRef}
              lancamentoParaEdicao={lancamentoParaEdicao}
              modoEdicao={modoEdicao}
            />
          </div>
          <div className={`${styles.subsectionScreen} ${currentSubsection === 'formaPagamento' ? styles.activeScreen : styles.hiddenScreen}`}>
            <FormaPagamento 
              ref={formaPagamentoRef}
              lancamentoParaEdicao={lancamentoParaEdicao}
              modoEdicao={modoEdicao}
            />
          </div>
          <div className={`${styles.subsectionScreen} ${currentSubsection === 'informacoes' ? styles.activeScreen : styles.hiddenScreen}`}>
            <Informacoes 
              ref={informacoesRef}
              lancamentoParaEdicao={lancamentoParaEdicao}
              modoEdicao={modoEdicao}
            />
          </div>
        </div>
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
          <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleVoltar}>
            <i className="fa-solid fa-arrow-left"></i>
            Voltar
          </button>
        </div>
        
        <div className={styles.actionButtonsGroup}>
          {!isFirstSubsection() && (
            <button className={`${styles.actionButton} ${styles.actionButtonAnterior}`} onClick={handleAnterior}>
              <i className="fa-solid fa-chevron-left"></i>
              Anterior
            </button>
          )}
          {!isLastSubsection() && (
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

      
      <DuplicarLancamento 
        isOpen={showDuplicarModal}
        onClose={() => setShowDuplicarModal(false)}
        onSubmit={handleDuplicarSubmit}
      />

      <DetalhamentoCoparticipacao 
        isOpen={showCoparticipacaoModal}
        onClose={() => setShowCoparticipacaoModal(false)}
      />

      <DetalhamentoBeneficiario 
        isOpen={showBeneficiarioModal}
        onClose={() => setShowBeneficiarioModal(false)}
      />

      <DemonstrativoAnalitico 
        isOpen={showDemonstrativoModal}
        onClose={() => setShowDemonstrativoModal(false)}
      />

      <LogAuditoria 
        isOpen={showLogAuditoriaModal}
        onClose={() => setShowLogAuditoriaModal(false)}
      />

      <LogFechamento 
        isOpen={showLogFechamentoModal}
        onClose={() => setShowLogFechamentoModal(false)}
      />

      <ModalAnexos 
        isOpen={showAnexosModal}
        onClose={() => setShowAnexosModal(false)}
      />

      <ModalFormularios 
        isOpen={showFormulariosModal}
        onClose={() => setShowFormulariosModal(false)}
      />

      <ModalEmail 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        destinatario={destinatarioExemplo}
      />

      <ModalSMS 
        isOpen={showSMSModal}
        onClose={() => setShowSMSModal(false)}
        destinatario={destinatarioExemplo}
      />

      <ModalWhatsapp 
        isOpen={showWhatsappModal}
        onClose={() => setShowWhatsappModal(false)}
        destinatario={destinatarioExemplo}
      />

      <ModalGerarBoleto 
        isOpen={showGerarBoletoModal}
        onClose={() => setShowGerarBoletoModal(false)}
      />
    </div>
  );
};

export default LancamentoNovo; 