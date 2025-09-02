import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState} from "react"; 


export default function ModalSolucionarCard({ closeModal }) {
  const [contratoProposta, contratoPropostaChange, contratoPropostaRef] =  UseInputMask(null, "text");
  const [protocoloAns, protocoloAnsChange, protocoloAnsRef] =  UseInputMask("999999.9999.99.9999.999999", "number");
  const [fases, fasesChange, fasesRef] =  UseInputMask(null, "text");
  const [usuarioDesignado, usuarioDesignadoChange, usuarioDesignadoRef] =  UseInputMask(null, "text");
  const [dataDeRetorno, dataDeRetornoChange, dataDeRetornoRef] =  UseInputMask(null, "number");
  const [departamentoDesignado, departamentoDesignadoChange, departamentoDesignadoRef] =  UseInputMask(null, "text");

  const [cargos, setCargos] = useState([]);

  const fase = [
    { value: "teste", label: "teste" }, 
  ];
  const ordem = [
    { value: "01", label: "01" }, 
  ];
  const usuarios = [
    { value:"teste" , label:"teste"}
  ];

  const InputStyle = {
    appearance: 'none',
    border: 'none',
  }

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Solucionar card</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Protocolo" disable readOnly  InputStyle={InputStyle} type="text"  identifier="protocoloAns" value={protocoloAns} onChange={protocoloAnsChange} inputRef={protocoloAnsRef}/>
                        <UseInputPadrao label="Texto de solucação" required type="textarea" identifier="contratoProposta" value={contratoProposta} onChange={contratoPropostaChange} inputRef={contratoPropostaRef}/>
                        <UseInputPadrao label="Fase"  required type="select" options={fase} identifier="fases" value={fases} onChange={fasesChange} inputRef={fasesRef}/>
                        <UseInputPadrao label="Data do Retorno" type="date" identifier="dataDeRetorno" value={dataDeRetorno} onChange={dataDeRetornoChange} inputRef={dataDeRetornoRef}/>
                        <UseInputPadrao label="Departamento Designado" required options={ordem} type="select" identifier="departamentoDesignado" value={departamentoDesignado} onChange={departamentoDesignadoChange} inputRef={departamentoDesignadoRef}/>
                        <UseInputPadrao label="Usuario Designado" options={usuarios} type="select" identifier="usuarioDesignado" value={usuarioDesignado} onChange={usuarioDesignadoChange} inputRef={usuarioDesignadoRef}/>
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