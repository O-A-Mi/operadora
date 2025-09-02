import styles from "./styles.module.css"
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog.jsx';
import { jsonRoute } from "../../../../../../../utils/json.js";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

function CartaCancelamento() {
  const [QuantidadeMensagens, setQuantidadeMensagens, QuantidadeMensagensRef] = UseInputMask();
  const [TempoSeg, setTempoSeg, TempoSegRef] = UseInputMask();

  const [selectedSMS, setSelectedSMS, selectedSMSRef] = UseInputMask();
  const [selectedEmail, setSelectedEmail,selectedEmailRef] = UseInputMask();
  const [selectedMobile, setSelectedMobile, selectedMobileRef] = UseInputMask();
  const [selectedWhatsapp, setSelectedWhatsapp, selectedWhatssapRef] = UseInputMask();

  const smsOptions = [
    { value: "Mensagem SMS 1", label: "Mensagem SMS 1" },
    { value: "Mensagem SMS 2", label: "Mensagem SMS 2" },
  ];

  const emailOptions = [
    { value: "Mensagem Email 1", label: "Mensagem Email 1" },
    { value: "Mensagem Email 2", label: "Mensagem Email 2" },
  ];

  const mobileOptions = [
    { value: "Mensagem Mobile 1", label: "Mensagem Mobile 1" },
    { value: "Mensagem Mobile 2", label: "Mensagem Mobile 2" },
  ];

  const whatsappOptions = [
    { value: "Mensagem Whatsapp 1", label: "Mensagem Whatsapp 1" },
    { value: "Mensagem Whatsapp 2", label: "Mensagem Whatsapp 2" },
  ];



  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  const [screenState, setScreenState] = useState({
    voltar: false,
  });
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleBackClick = () => {
    setScreenState({ voltar: true });
  };


  if (screenState.voltar) {
    handleNavigate(`/${jsonRoute.AreaOperadora}`);
  }


const handlePreviewImage = (messageType) => {
    let messageContent;

    switch (messageType) {
      case 'sms':
        messageContent = selectedSMS;
        break;
      case 'email':
        messageContent = selectedEmail;
        break;
      case 'mobile':
        messageContent = selectedMobile;
        break;
      case 'whatsapp':
        messageContent = selectedWhatsapp;
        break;
      default:
        messageContent = '';
    }

    if (!messageContent) {
      dialogMessage(
        'Nenhuma mensagem carregada para visualização.',
        'warning',
        {
          confirmButton: false,
          buttonsText: {
            close: 'OK'
          }
        }
      );
      return;
    }

    // Cria um modal customizado para visualização da mensagem
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';

    modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; max-width: 90%; max-height: 90%;">
                <h3 style="margin-bottom: 15px; color: #333;">Visualização da Mensagem</h3>
                <p>${messageContent}</p>
                <button style="margin-top: 15px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Fechar
                </button>
            </div>
        `;

    const closeButton = modal.querySelector('button');
    closeButton.onclick = () => {
      document.body.removeChild(modal);
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };

    document.body.appendChild(modal);
  };


  return (
    <>
      <h2 className={styles.title}>Carta de Cancelamento</h2>

      <main className={styles.container}>
        <div className={styles.InputContent}>

          <UseInputPadrao
            label="Quantidade de Mensagens por lote"
            identifier="tipo-QuantidadeMensagens"
            type="text"
            value={QuantidadeMensagens}
            inputRef={QuantidadeMensagensRef}
            onChange={setQuantidadeMensagens}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />

          <UseInputPadrao
            label="Tempo por segundo (mínimo de 30seg)"
            identifier="tipo-QuantidadeMensagens"
            type="text"
            value={TempoSeg}
            inputRef={TempoSegRef}
            onChange={setTempoSeg}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
        </div>

        <div className={styles.InputContent}>

          <UseInputPadrao
            label="Mensagem - SMS"
            identifier="tipo-QuantidadeMensagens"
            type="select"
            value={selectedSMS}
            onChange={setSelectedSMS}
            inputRef={selectedSMSRef}
            options={smsOptions}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 33.33}
            inputButtonRight={[
              {
                icon: 'fa-solid fa-eye',
                text: 'Visualizar',
                onClick: () => handlePreviewImage('sms'),
                tooltip: 'Clique para visualizar',
              },
            ]}
          />

          <UseInputPadrao
            label="Mensagem - Email"
            identifier="tipo-QuantidadeMensagens"
            type="select"
            value={selectedEmail}
            onChange={setSelectedEmail}
            inputRef={selectedEmailRef}
            options={emailOptions}
            required={true}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 33.33}
            inputButtonRight={[
              {
                icon: 'fa-solid fa-eye',
                text: 'Visualizar',
                onClick: () => handlePreviewImage('email'),
                tooltip: 'Clique para visualizar',
              },
            ]}
          />
        </div>

        <div className={styles.InputContent}>

          <UseInputPadrao
            label="Mensagem - Mobile"
            identifier="tipo-QuantidadeMensagens"
            type="select"
            value={selectedMobile}
            onChange={setSelectedMobile}
            inputRef={selectedMobileRef}
            options={mobileOptions}
             required={true}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 33.33}
            inputButtonRight={[
              {
                icon: 'fa-solid fa-eye',
                text: 'Visualizar',
                onClick: () => handlePreviewImage('mobile'),
                tooltip: 'Clique para visualizar',
              },
            ]}
          />

          <UseInputPadrao
            label="Mensagem - Whatsapp"
            identifier="tipo-QuantidadeMensagens"
            type="select"
            value={selectedWhatsapp}
            onChange={setSelectedWhatsapp}
            inputRef={selectedWhatssapRef}
            options={whatsappOptions}          
            required={true}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 33.33}
            inputButtonRight={[
              {
                icon: 'fa-solid fa-eye',
                text: 'Visualizar',
                onClick: () => handlePreviewImage('whatsapp'),
                tooltip: 'Clique para visualizar',
              },
            ]}
          />

        </div>

      </main>

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

          <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleBackClick}>
            <i className="fa-solid fa-arrow-left"></i>
            Voltar
          </button>
        </div>
      </div>
    </>
  )
}

export default CartaCancelamento