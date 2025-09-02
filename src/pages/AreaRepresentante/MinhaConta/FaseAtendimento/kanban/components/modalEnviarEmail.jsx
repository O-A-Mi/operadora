import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import Editor from "react-simple-wysiwyg";
import { useState } from "react";

export default function ModalEnviarEmail({ closeModal }) {
  const [protocolo, protocoloChange, protocoloRef] =  UseInputMask(null, "text");
  const [mensagens, mensagensChange, mensagensRef] =  UseInputMask(null, "text");
  const [assunto, assuntoChange, assuntoRef] =  UseInputMask(null, "text");
  const [mensagem, setMensagem] = useState("");

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Enviar E-mail</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Email"  type="text" identifier="email" value={email} onChange={emailChange} inputRef={emailRef}/>
                        <UseInputPadrao label="Mensagem"  type="select" identifier="mensagens" value={mensagens} onChange={mensagensChange} inputRef={mensagensRef}/>
                        <UseInputPadrao label="Assunto"  type="text" identifier="assunto" value={assunto} onChange={assuntoChange} inputRef={assuntoRef}/>
                        <div className={styles.inputGroup}>
                            <label>Texto</label>
                            <Editor
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            className={styles.wysiwyg}
                            />
                        </div>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Salvar
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}