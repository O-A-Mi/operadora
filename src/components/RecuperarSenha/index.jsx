import React, { useState } from "react";
import styles from "./styles.module.css";
//import { carregarGeral } from "../../db/carregarGeral";
import { carregarLinks } from "../../db/carregarGeral.jsx";
import { devBaseInf, prodBaseInf, baseInf } from "../../utils/json";

const PasswordRecovery = ({ isOpen, messageModal, onClose }) => {
    const [email, setEmail] = useState("");

    const recSenhaQ = ( e) => {
        e.preventDefault();
        //let resp = carregarGeral("http://localhost:8080/sge/gravarEsqueciSenha.jsp", {usuario: String(email).toLocaleUpperCase(), cd_empresa: 'DRHOJE'},true);
        let resp = carregarLinks('recuperarSenha', (baseInf.appMode === "dev" ? devBaseInf.baselink : prodBaseInf.baselink) + baseInf.endpoints.gravarEsqueciSenha, {usuario: String(email).toLocaleUpperCase(), cd_empresa: (baseInf.appMode === "dev" ? devBaseInf.cd_empresa : prodBaseInf.cd_empresa)});
        if (resp) {
            if (resp.status == 200) {
                alert("Recuperado com sucesso");
            } else {
                alert("Erro ao Recuperar");
            }
        } else {
            alert("Erro ao Recuperar");
        }
        onClose();
        messageModal();
    };

    if (!isOpen) return null; 

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h1 className={styles.title}>Recuperação de Senha</h1>
                <button className={styles.closeButton} aria-label="Fechar" onClick={onClose}>
                    <i className='fas fa-xmark'></i>
                </button>
            </div>

            <p className={styles.description}>
                Digite o seu e-mail cadastrado para recuperar sua senha.
            </p>

            <form className={styles.form}>
                <input
                    className={styles.formInput}
                    label="E-mail cadastrado na assinatura"
                    type="email"
                    id="recoveryEmail"
                        onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                />

                <button onClick={recSenhaQ} className={styles.submitButton}>
                    Enviar
                </button>
            </form>
        </div>
    );
};

function Background() {
  return <div className={styles.backgroundBox}></div>;
}

function Message() {
  return (
    <div className={styles.message}>
      Enviamos um e-mail com uma nova senha.
      <br />
      Após fazer o login, você poderá cadastrar uma nova senha em Minha Conta.
      <Background />
      <Background />
    </div>
  );
}

function PasswordRecoveryConfirmation({ isOpen, onClose }) {
  if (!isOpen) return null; 

  return (
    <div className={styles.modalRecuperacaoDeSenha}>
      <div className={styles.header}>
        <div className={styles.title}>Recuperação de Senha</div>
        <div
          className={styles.closeButton}
          tabIndex="0"
          role="button"
          aria-label="Close modal"
          style={{ cursor: "pointer" }}
          onClick={onClose}
        >
        </div>
        <Background />
        <Background />
      </div>
      <Message />
      <div className={styles.button}>Entendi!</div>
      <Background />
      <Background />
    </div>
  );
}

export { PasswordRecovery, PasswordRecoveryConfirmation };