import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';

export default function ModalCancelar({ closeModal }) {
  const [protocolo, protocoloChange, protocoloRef] =  UseInputMask(null, "text");
  const [textoCancelamento, textoCancelamentoChange, textoCancelamentoRef] =  UseInputMask(null, "text");

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Cancelar card</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Protocolo"  type="text"identifier="protocolo" value={protocolo} onChange={protocoloChange} inputRef={protocoloRef}/>
                        <UseInputPadrao label="Texto de cancelamento" required  type="textarea" identifier="textoCancelamento" value={textoCancelamento} onChange={textoCancelamentoChange} inputRef={textoCancelamentoRef}/>
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