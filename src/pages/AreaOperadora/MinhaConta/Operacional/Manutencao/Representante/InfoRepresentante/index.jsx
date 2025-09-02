import { useState, useEffect } from "react";
import styles from './styles.module.css';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog.jsx';

import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../../utils/json.js";
import StepperPadrao from '../../../../../../../components/StepperPadrao/index.jsx';
import { useLoader, useModal } from '../../../../../../../context/index.jsx';
import { handleResizeTabela } from "../../../../../../../utils/functions.js";
import InformacoesBasicas from "./telasStepper/informacoesBasicas.jsx";
import EnderecoResidencial from "./telasStepper/EnderecoResidencial.jsx";
import Contato from "./telasStepper/Contato.jsx";
import Remuneracao from "./telasStepper/Remuneracao.jsx";
import RegiaoDeAtuacao from "./telasStepper/RegiaoDeAtuacao.jsx";
import InformacaoAdicional from "./telasStepper/InformacaoAdicional.jsx";
import toastMessage from "../../../../../../../assets/toast-ui/toast.js";

const InfoRepresentante = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { showLoader, hideLoader } = useLoader();



  const steps = [
    { id: 1, name: 'Informações Básicas', icon: 'fa-solid fa-user', color: '#22c222' },
    { id: 2, name: 'Endereço Residencial', icon: 'fa-solid fa-location-dot', color: '#3e5e9a' },
    { id: 3, name: 'Contato', icon: 'fa-solid fa-phone', color: '#db1b1bff' },
    { id: 4, name: 'Remuneração', icon: 'fa-solid fa-dollar-sign', color: '#eefd1dff' },
    { id: 5, name: 'Região de Atuação', icon: 'fa-solid fa-bars', color: '#931be2ff' },
    { id: 6, name: 'Informações Adicionais', icon: 'fa-solid fa-info', color: '#1bd5e2ff' },
  ];

  const [screenState, setScreenState] = useState({
    voltar: false,
  });
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };


  const handleConfirmGravar = () => {
    showLoader()
    toastMessage("Representante adicionado!", "success")
    navigate(-1)
  }
  
  const handleConfirmDeletar = () => {
    showLoader()
    toastMessage("Representante deletado!", "success")
    navigate(-1)
  }
  const handleVoltarPagina = () => {
    setScreenState({ voltar: true });
  };

  const isFirstStep = () => {
    return currentStep === 1;
  };

  const isLastStep = () => {
    return currentStep === steps.length;
  };

  const handleAnterior = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProximo = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (screenState.voltar) {
    showLoader();
    handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/manutencao/${jsonRoute.Representante}`);
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('tabela-remuneracao', 'tabela-remuneracao-container');
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('tabela-remuneracao', 'tabela-remuneracao-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      >
        {/* ----------------- TITULOS DE CADA STEP ----------------- */}

        {/* ----------------- INFORMAÇÕES BÁSICAS ----------------- */}
        {currentStep === 1 && (<InformacoesBasicas />)}

        {/* ----------------- ENDEREÇO ----------------- */}
        {currentStep === 2 && (<EnderecoResidencial />)}

        {/* ----------------- CONTATO ----------------- */}
        {currentStep === 3 && (<Contato />)}

        {/* ----------------- REMUNERAÇÃO ----------------- */}
        {currentStep === 4 && (<Remuneracao />)}

        {/* ----------------- REGIÃO DE ATUAÇÃO ----------------- */}
        {currentStep === 5 && (<RegiaoDeAtuacao />)}

        {/* ----------------- INFORMAÇÕES ADICIONAIS ----------------- */}
        {currentStep === 6 && (<InformacaoAdicional />)}

      </StepperPadrao>

      <div className={styles.actionButtons}>
        <div className={styles.actionButtonsGroup}>
          <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={() => {
            dialogMessage(
              "Tem certeza que deseja gravar este registro?",
              "info",
              {
                buttonsText: {
                  confirm: "Sim",
                  cancel: "Não"
                }
              },
              (result) => {
                if (result === true) {
                  handleConfirmGravar();
                }
              }
            );
          }}>
            <i className="fa-solid fa-save"></i>
            Gravar
          </button>
          <button className={`${styles.actionButton} ${styles.actionButtonDeletar}`} onClick={() => {
            dialogMessage(
              "Tem certeza que deseja remover este registro?",
              "info",
              {
                buttonsText: {
                  confirm: "Sim",
                  cancel: "Não"
                }
              },
              (result) => {
                if (result === true) {
                  handleConfirmDeletar();
                }
              }
            );
          }}>
            <i className="fa-solid fa-trash"></i>
            Remover
          </button>
          <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleVoltarPagina}>
            <i className="fa-solid fa-arrow-left"></i>
            Voltar
          </button>
        </div>
        <div className={styles.actionButtonsGroup}>
          {!isFirstStep() && (
            <button className={`${styles.actionButton} ${styles.actionButtonAnterior}`} onClick={handleAnterior}>
              <i className="fa-solid fa-chevron-left"></i>
              Anterior
            </button>
          )}
          {!isLastStep() && (
            <button className={`${styles.actionButton} ${styles.actionButtonProximo}`} onClick={handleProximo}>
              Próximo
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default InfoRepresentante;


