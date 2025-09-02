import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';

export default function ModalAnexo({ closeModal }) {
  const [protocolo, protocoloChange, protocoloRef] =  UseInputMask("(99)99999-9999", "number");
  const [anexo, anexoChange, anexoRef] =  UseInputMask(null, "number");

  const mensagem = [
    {value:"teste", label:"teste"}
  ]

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Anexo card</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Protocolo"  type="text" identifier="protocolo" value={protocolo} onChange={protocoloChange} inputRef={protocoloRef}/>
                        <UseInputPadrao label="Anexo" type="file" identifier="anexo" className={styles.inputStyle} value={anexo} onChange={anexoChange} inputRef={anexoRef}/> 
                        <div className={styles.containerAnexo}>
                            <div className={styles.centerInfo}>
                                <div><p>Fase - Captura de Leads</p></div>
                                <div>24/07/2025</div>
                            </div>
                            <div className={styles.centerInfo}>
                                <div className={styles.capturas}><i className="fa-solid fa-image"></i>Capturadetela2025_04_14142204.png</div>
                                <div className={styles.iconHover}><i class="fa-solid fa-arrow-down"></i></div>
                            </div>
                            <div>DIRETORIA - VITOR TESTE</div>
                        </div>       
                        <div className={styles.containerAnexo}>
                            <div className={styles.centerInfo}>
                                <div><p>Fase - Captura de Leads</p></div>
                                <div>24/07/2025</div>
                            </div>
                            <div className={styles.centerInfo}>
                                <div className={styles.capturas}><i className="fa-solid fa-image"></i>Capturadetela2025_04_14142204.png</div>
                                <div className={styles.iconHover}><i class="fa-solid fa-arrow-down"></i></div>
                            </div>
                            <div>DIRETORIA - VITOR TESTE</div>
                        </div>       
                        <div className={styles.containerAnexo}>
                            <div className={styles.centerInfo}>
                                <div><p>Fase - Captura de Leads</p></div>
                                <div>24/07/2025</div>
                            </div>
                            <div className={styles.centerInfo}>
                                <div className={styles.capturas}><i className="fa-solid fa-image"></i>Capturadetela2025_04_14142204.png</div>
                                <div className={styles.iconHover}><i class="fa-solid fa-arrow-down"></i></div>
                            </div>
                            <div>DIRETORIA - VITOR TESTE</div>
                        </div>       
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Fechar
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}