import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState} from "react"; 


export default function ModalMoverFase({ closeModal }) {

  const [protocolo, protocoloChange, protocoloRef] =  UseInputMask(null, "number");
  const [fases, fasesChange, fasesRef] =  UseInputMask(null, "text");
  const [datatRetorno, datatRetornoChange, datatRetornoRef] =  UseInputMask(null, "number");
  const [departamentoDesignado, departamentoDesignadoChange, departamentoDesignadoRef] =  UseInputMask(null, "text");
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
                <h2>Mover para Outra Fase</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Protocolo" required disable readOnly  InputStyle={InputStyle} type="text"  identifier="protocolo" value={protocolo} onChange={protocoloChange} inputRef={protocoloRef}/>
                        <UseInputPadrao label="Próxima Fase " required type="select" options={filtrar} identifier="fases" value={fases} onChange={fasesChange} inputRef={fasesRef}/>
                        <UseInputPadrao label="Data de Retorno" options={pessoa} type="date" identifier="datatRetorno" value={datatRetorno} onChange={datatRetornoChange} inputRef={datatRetornoRef}/>
                        <UseInputPadrao label="Departamento Designado" required options={ordem} type="select" identifier="departamentoDesignado" value={departamentoDesignado} onChange={departamentoDesignadoChange} inputRef={departamentoDesignadoRef}/>
                        <UseInputPadrao label="Usuario Designado" required options={assuntoDisponivel} type="select" identifier="porPessoa" value={porPessoa} onChange={porPessoaChange} inputRef={porPessoaRef}/>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Mover
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}