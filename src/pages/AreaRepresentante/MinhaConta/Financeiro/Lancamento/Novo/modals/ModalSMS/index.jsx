import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { UseInputPadrao, UseInputMask } from "../../../../../../../../components/InputPadrao";
import toastMessage from "../../../../../../../../assets/toast-ui/toast";
import { validarCampos } from "../../../../../../../../utils/functions.js";

const ModalSMS = ({ isOpen, onClose, destinatario }) => {
  const [telefone, setTelefone, telefoneRef] = UseInputMask();
  const [nome, setNome, nomeRef] = UseInputMask();
  const [modeloSelecionado, setModeloSelecionado, modeloSelecionadoRef] = UseInputMask();
  const [mensagem, setMensagem, mensagemRef] = UseInputMask();
  const [caracteresRestantes, setCaracteresRestantes] = useState(156);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleSetTelefone = (value) => {
    if (typeof value === 'string') {
      setTelefone({ target: { value } });
    } else {
      setTelefone(value);
    }
  };

  const handleSetNome = (value) => {
    if (typeof value === 'string') {
      setNome({ target: { value } });
    } else {
      setNome(value);
    }
  };

  const handleSetModeloSelecionado = (value) => {
    if (typeof value === 'string') {
      setModeloSelecionado({ target: { value } });
    } else {
      setModeloSelecionado(value);
    }
  };

  const handleSetMensagem = (value) => {
    if (typeof value === 'string') {
      setMensagem({ target: { value } });
    } else {
      setMensagem(value);
    }
  };

  const modelosSMS = [
    {
      id: "modelo1",
      nome: "Lembrete de Pagamento",
      mensagem: "Prezado(a) [NOME], seu boleto vence em [DIAS] dias. Evite a suspensão dos serviços. Hermanos Saúde."
    },
    {
      id: "modelo2", 
      nome: "Confirmação de Agendamento",
      mensagem: "Olá [NOME]! Sua consulta foi agendada para [DATA] às [HORA]. Confirme sua presença. Hermanos Saúde."
    },
    {
      id: "modelo3",
      nome: "Boas-vindas",
      mensagem: "Bem-vindo(a) à Hermanos Saúde, [NOME]! Seu plano está ativo. Acesse sua carteirinha digital."
    }
  ];

  useEffect(() => {
    if (destinatario) {
      handleSetTelefone(destinatario.telefone || "");
      handleSetNome(destinatario.nome || "");
    }
  }, [destinatario]);

  useEffect(() => {
    if (modeloSelecionado) {
      const modelo = modelosSMS.find((m) => m.id === modeloSelecionado);
      if (modelo) {
        handleSetMensagem(modelo.mensagem);
      }
    }
  }, [modeloSelecionado]);

  useEffect(() => {
    const restantes = 156 - mensagem.length;
    setCaracteresRestantes(restantes);
  }, [mensagem]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validarCamposObrigatorios = () => {
    const arrayCamposObrigatorios = [
      { valor: telefone, nome: "Telefone" },
      { valor: mensagem, nome: "Mensagem" }
    ];

    return validarCampos(arrayCamposObrigatorios);
  };

  const handleEnviar = () => {
    if (!validarCamposObrigatorios()) {
      return;
    }

    const payload = {
      tipo: "sms",
      telefone,
      nome,
      mensagem,
      modelo: modeloSelecionado
    };


    toastMessage("SMS enviado com sucesso!", "success");
    onClose();
  };

  const handleFechar = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-comment"></i>
            <h2 className={styles.modalTitle}>SMS</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Telefone(s)"
              identifier="telefone"
              type="tel"
              value={telefone}
              onChange={setTelefone}
              inputRef={telefoneRef}
              placeholder="(12)99182-7172"
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
              required
            />
            <UseInputPadrao
              label="Nome"
              identifier="nome"
              type="text"
              value={nome}
              onChange={setNome}
              inputRef={nomeRef}
              placeholder="Nome do destinatário"
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
              readOnly
            />

            <UseInputPadrao
              label="Modelo da Mensagem"
              identifier="modelo"
              type="select"
              value={modeloSelecionado}
              onChange={setModeloSelecionado}
              inputRef={modeloSelecionadoRef}
              options={[
                { value: "", label: "SELECIONE..." },
                ...modelosSMS.map((modelo) => ({
                  value: modelo.id,
                  label: modelo.nome
                }))
              ]}
              width={100}
              gap={0}
            />

            <UseInputPadrao
              label="Mensagem"
              identifier="mensagem"
              type="textarea"
              value={mensagem}
              onChange={setMensagem}
              inputRef={mensagemRef}
              placeholder="Digite sua mensagem..."
              width={100}
              gap={0}
              required
            />
            
            <div className={styles.contadorCaracteres}>
              {caracteresRestantes} Caracter(es) Restantes...
            </div>
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.modalButtonEnviar} onClick={handleEnviar}>
            <i className="fa-solid fa-paper-plane"></i>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSMS; 