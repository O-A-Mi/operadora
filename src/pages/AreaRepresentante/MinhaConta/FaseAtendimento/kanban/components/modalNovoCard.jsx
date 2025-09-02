import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState} from "react"; 


export default function ModalNovoCard({ closeModal }) {
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
                <h2>Novo Card</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Contrato / Proposta" required type="text" options={filtrar} identifier="contratoProposta" value={contratoProposta} onChange={contratoPropostaChange} inputRef={contratoPropostaRef}/>
                        <UseInputPadrao label="Protocolo ANS" disable readOnly  InputStyle={InputStyle} type="text"  identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Prioridade"  required type="select" identifier="prior idade" value={prioridade} onChange={prioridadeChange} inputRef={prioridadeRef}/> 
                        <UseInputPadrao label="Assunto" required type="select" identifier="assunto" value={assunto} onChange={assuntoChange} inputRef={assuntoRef}/>
                        <UseInputPadrao label="Fase"  required type="select" identifier="fases" value={fases} onChange={fasesChange} inputRef={fasesRef}/>
                        <UseInputPadrao label="Texto de Abertura"  required type="textarea" identifier="porPessoa" value={porPessoa} onChange={porPessoaChange} inputRef={porPessoaRef}/>
                        <UseInputPadrao label="Data de Abertura" options={fase} type="date" identifier="porPessoa" value={porPessoa} onChange={porPessoaChange} inputRef={porPessoaRef}/>
                        <UseInputPadrao label="Data de Retorno" required options={pessoa} type="date" identifier="porPessoa" value={porPessoa} onChange={porPessoaChange} inputRef={porPessoaRef}/>
                        <UseInputPadrao label="Departamento Designado" required options={ordem} type="select" identifier="porPessoa" value={porPessoa} onChange={porPessoaChange} inputRef={porPessoaRef}/>
                        <UseInputPadrao label="Usuario Designado" required options={assuntoDisponivel} type="select" identifier="porPessoa" value={porPessoa} onChange={porPessoaChange} inputRef={porPessoaRef}/>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Criar Card
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}