import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';

export default function ModalEnviarWhatsapp({ closeModal }) {
  const [telefone, telefoneChange, telefoneRef] =  UseInputMask("(99)99999-9999", "number");
  const [mensagens, mensagensChange, mensagensRef] =  UseInputMask(null, "text");
  const [texto, textoChange, textoRef] =  UseInputMask(null, "text");

  const mensagem = [
    {value:"teste", label:"teste"}
  ]
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Enviar via Web Whatsapp</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Telefone"  type="text" identifier="telefone" value={telefone} onChange={telefoneChange} inputRef={telefoneRef}/>
                        <UseInputPadrao label="Mensagem"  type="select" identifier="mensagens" options={mensagem} value={mensagens} onChange={mensagensChange} inputRef={mensagensRef}/>
                        <UseInputPadrao label="texto"  type="textarea" identifier="texto" value={texto} onChange={textoChange} inputRef={textoRef}/>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Enviar
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}