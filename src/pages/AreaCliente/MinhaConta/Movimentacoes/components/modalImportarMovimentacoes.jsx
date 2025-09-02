import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../components/InputPadrao';
import { useState} from "react"; 


export default function ModalMovimentacoes({ closeModal }) {
  const [contratoProposta, contratoPropostaChange, contratoPropostaRef] =  UseInputMask(null, "text");
  const [protocoloAns, protocoloAnsChange, protocoloAnsRef] =  UseInputMask("999999.9999.99.9999.999999", "number");
  const [prioridade, prioridadeChange, prioridadeRef] =  UseInputMask(null, "number");
  const [assunto, assuntoChange, assuntoRef] =  UseInputMask(null, "text");
  const [fases, fasesChange, fasesRef] =  UseInputMask(null, "text");
  const [porPessoa, porPessoaChange, porPessoaRef] =  UseInputMask(null, "text");

  const [cargos, setCargos] = useState([]);

  const filtrar = [
    { value: "dataDeAbertura", label: "Data de Abertura" }, 
 
  ];

  const fase = [
    { value: "fase1", label: "Fase 1" }, 

  ];

  const ordem = [
    { value: "01", label: "01" }, 

  ];

  const pessoa = [
    { value: "fabricio", label: "Fabricio" }, 

  ];

  const assuntoDisponivel = [

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
                <h2>Importar Movimentações</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <p>Assinatura selecionada</p>
                        <label className={styles.campoLabel}>Saúde <strong>Integral</strong> (000000158)</label>
                        <UseInputPadrao label="Escolher arquivo" disable  type="file" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Confirmar Importação
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}