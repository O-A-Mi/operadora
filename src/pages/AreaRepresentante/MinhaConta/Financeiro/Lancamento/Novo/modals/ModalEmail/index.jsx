import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { UseInputPadrao, UseInputMask } from "../../../../../../../../components/InputPadrao";
import Editor from "react-simple-wysiwyg";
import toastMessage from "../../../../../../../../assets/toast-ui/toast";
import { validarCampos } from "../../../../../../../../utils/functions.js";

const ModalEmail = ({ isOpen, onClose, destinatario }) => {
  const [emailDestinatario, setEmailDestinatario, emailDestinatarioRef] = UseInputMask();
  const [nome, setNome, nomeRef] = UseInputMask();
  const [modeloSelecionado, setModeloSelecionado, modeloSelecionadoRef] = UseInputMask();
  const [assunto, setAssunto, assuntoRef] = UseInputMask();
  const [mensagem, setMensagem] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleSetEmailDestinatario = (value) => {
    if (typeof value === 'string') {
      setEmailDestinatario({ target: { value } });
    } else {
      setEmailDestinatario(value);
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

  const handleSetAssunto = (value) => {
    if (typeof value === 'string') {
      setAssunto({ target: { value } });
    } else {
      setAssunto(value);
    }
  };

  const listaModelos = [
    {
      id: "modelo1",
      nome: "Cobrança de Boleto em Aberto",
      assunto: "Lembrete de Pagamento - Boleto em Aberto",
      mensagem: "Prezado(a) [NOME],\n\nDetectamos que existe um boleto em aberto referente ao seu contrato com a Hermanos Saúde. Solicitamos a gentileza de efetuar o pagamento para evitar a suspensão dos serviços.\n\nCaso já tenha efetuado o pagamento, por favor, desconsidere esta mensagem.\n\nAtenciosamente,\nEquipe Hermanos Saúde."
    },
    {
      id: "modelo2",
      nome: "Boas-vindas ao Plano",
      assunto: "Bem-vindo(a) à Hermanos Saúde!",
      mensagem: "Olá [NOME],\n\nÉ um prazer tê-lo(a) como nosso(a) cliente! A partir de agora, você pode contar com toda a qualidade e segurança da Hermanos Saúde.\n\nEm anexo, enviamos o manual do beneficiário e a sua carteirinha digital.\n\nEstamos à disposição para qualquer dúvida.\n\nCordialmente,\nEquipe Hermanos Saúde."
    },
    {
      id: "modelo3",
      nome: "Confirmação de Cancelamento",
      assunto: "Confirmação de Cancelamento do Contrato",
      mensagem: "Prezado(a) [NOME],\n\nConfirmamos o cancelamento do seu contrato com a Hermanos Saúde, conforme solicitado.\n\nSe precisar de novos serviços ou quiser voltar a ser nosso(a) cliente, estaremos sempre à disposição.\n\nAtenciosamente,\nEquipe Hermanos Saúde."
    }
  ];

  useEffect(() => {
    if (destinatario) {
      handleSetEmailDestinatario(destinatario.email || "");
      handleSetNome(destinatario.nome || "");
    }
  }, [destinatario]);

  useEffect(() => {
    if (modeloSelecionado) {
      const modelo = listaModelos.find((m) => m.id === modeloSelecionado);
      if (modelo) {
        setMensagem(modelo.mensagem);
        if (!assunto) handleSetAssunto(modelo.assunto);
      }
    }
  }, [modeloSelecionado, assunto]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validarCamposObrigatorios = () => {
    const mensagemLimpa = mensagem.replace(/<[^>]*>/g, '').trim();
    
    const arrayCamposObrigatorios = [
      { valor: emailDestinatario, nome: "Email" },
      { valor: assunto, nome: "Assunto" },
      { valor: mensagemLimpa, nome: "Texto" }
    ];

    return validarCampos(arrayCamposObrigatorios);
  };

  const handleEnviar = () => {
    if (!validarCamposObrigatorios()) {
      return;
    }

    const payload = {
      tipo: "email",
      destinatario: emailDestinatario,
      nome,
      assunto,
      mensagem,
      modelo: modeloSelecionado
    };


    toastMessage("Email enviado com sucesso!", "success");
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
            <i className="fa-solid fa-envelope"></i>
            <h2 className={styles.modalTitle}>Email</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Email(s)"
              identifier="email"
              type="email"
              value={emailDestinatario}
              onChange={setEmailDestinatario}
              inputRef={emailDestinatarioRef}
              placeholder="suporte1.hermanosti@gmail.com"
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
                ...listaModelos.map((modelo) => ({
                  value: modelo.id,
                  label: modelo.nome
                }))
              ]}
              width={100}
              gap={0}
            />

            <UseInputPadrao
              label="Assunto"
              identifier="assunto"
              type="text"
              value={assunto}
              onChange={setAssunto}
              inputRef={assuntoRef}
              placeholder="Digite o assunto do email..."
              width={100}
              gap={0}
              required
            />

            <div className={styles.mensagemContainer}>
              <label className={styles.label}>
                Texto <span className={styles.obrigatorio}>*</span>
              </label>
              <Editor
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className={styles.wysiwyg}
              />
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

export default ModalEmail; 