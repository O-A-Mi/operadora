import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState} from "react"; 


export default function ModalVizualizarCard({ closeModal }) {
  const [contratoProposta, contratoPropostaChange, contratoPropostaRef] =  UseInputMask(null, "text");
  const [protocoloAns, protocoloAnsChange, protocoloAnsRef] =  UseInputMask("999999.9999.99.9999.999999", "number");


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
                <h2>Visualizar Cards</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Protocolo" disable required type="text" options={filtrar} identifier="contratoProposta" value={contratoProposta} onChange={contratoPropostaChange} inputRef={contratoPropostaRef}/>
                        <UseInputPadrao label="Protocolo ANS" disable required  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Prioridade" required type="select" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Contrato / Proposta" required disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Cliente" required  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Plano" required disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Entidade" required disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Valor" required disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Qtd Beneficiários" required disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Assunto" required disable  type="select" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Texto de Abertura" required type="textarea" identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Data de Abertura" required disable  type="date" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Data de Retorno" required  type="date"   InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Fase" required disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Departamento Designado" required disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Usuário Designado" disable  type="text" readOnly  InputStyle={InputStyle}   identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} onClick={closeModal}>
                        Fechar
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}