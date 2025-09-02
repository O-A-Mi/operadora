import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState} from "react"; 


export default function ModalOrdenacao({ closeModal }) {
  const [contratoProposta, contratoPropostaChange, contratoPropostaRef] =  UseInputMask(null, "text");
  const [protocoloAns, protocoloAnsChange, protocoloAnsRef] =  UseInputMask("999999.9999.99.9999.999999", "number");

  const filtrar = [
    { value: "dataDeAbertura", label: "Data de Abertura" }, 
 
  ];

  const InputStyle = {
    // height: 'auto',
    appearance: 'none',
    border: 'none',
    // padding: '0.25rem',
    // fontSize: '0.85rem',
    // lineHeight: 'unset',
    // background: 'transparent',
    // color: 'var(--cinza-escuro)',
    // transition: 'border 0.2s ease-in-out',
    // cursor: 'default'
  }
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Ordenação Cards</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Campo" required type="select" options={filtrar} identifier="contratoProposta" value={contratoProposta} onChange={contratoPropostaChange} inputRef={contratoPropostaRef}/>
                        <UseInputPadrao label="Tipo" disable  type="select" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Ordenar
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}