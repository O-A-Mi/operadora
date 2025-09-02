import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect, useCallback } from "react"; 


export default function ModalFiltrar({ closeModal }) {
  const [filtarPor, filtarPorChange, filtarPorRef] =  UseInputMask(null, "text");
  const [dataincial, dataincialChange, dataincialRef] =  UseInputMask(null, "number");
  const [dataFinal, dataFinalChange, dataFinalRef] =  UseInputMask(null, "number");
  const [porAssunto, porAssuntoChange, porAssuntoRef] =  UseInputMask(null, "text");
  const [porDepartamento, porDepartamentoChange, porDepartamentoRef] =  UseInputMask(null, "text");
  const [porPessoa, porPessoaChange, porPessoaRef] =  UseInputMask(null, "text");

  const [cargos, setCargos] = useState([]);

  const filtrar = [
    { value: "dataDeAbertura", label: "Data de Abertura" }, 
    {value : "dataDeFechamento", label: "Data de Fechamento"},
    {value : "dataDeCadastro", label: "Data de Cadastro"}
  ];

  const assunto = [
    { value: "backoffice", label: "BACK OFFICE 1ºNIVEL" }, 
    {value : "boleto", label: "Boleto"},
    {value : "cobrança", label: "Cobranças"},
    {value : "duvidas", label: "Duvidas"},
    {value : "elogios", label: "Elogios"}
  ];

  const departamento = [
    { value: "adm", label: "ADM" }, 
    {value : "diretoria", label: "Diretoria"},
    {value : "empresarial", label: "Empresarial"},
    {value : "financeiro", label: "Financeiro"},
    {value : "juridico", label: "Juridico"},
  ];

  const pessoa = [
    { value: "fabricio", label: "Fabricio" }, 
    {value : "lucas", label: "Lucas"},
    {value : "vitor", label: "vitor"},
    {value : "matheus", label: "Matheus"},
  ];

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Filtrar Cards</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Filtrar por:" type="select" options={filtrar} identifier="filtarPor" value={filtarPor} onChange={filtarPorChange} inputRef={filtarPorRef}/>
                        <UseInputPadrao label="Data Incial:" type="date"  identifier="dataincial" value={dataincial} onChange={dataincialChange} inputRef={dataincialRef}/>
                        <UseInputPadrao label="Data Final:" type="date" identifier="dataFinal" value={dataFinal} onChange={dataFinalChange} inputRef={dataFinalRef}/>
                    </form>
                </div>
                <div className={styles.sectionLista}>
                    <h5>Por Etiqueta</h5>
                    <div>
                        <ul className={styles.spaceLista}>
                            <li className={styles.sizeSpace}><span className={styles.circleColor}></span>Frio</li>
                            <li className={styles.sizeSpace}><span className={styles.circleColorMorno}></span>Morno</li>
                            <li className={styles.sizeSpace}><span className={styles.circleColorQuente}></span>Quente</li>
                            <li className={styles.sizeSpace}><span className={styles.circleColorExpirado}></span>Expirado</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className={styles.modalBody}>
                        <form className={styles.modalForm}>
                            <UseInputPadrao label="Por assunto:" options={assunto} type="select" identifier="porAssunto" value={porAssunto} onChange={porAssuntoChange} inputRef={porAssuntoRef}/>
                            <UseInputPadrao label="Por Departamento:" options={departamento} type="select" identifier="porDepartamento" value={porDepartamento} onChange={porDepartamentoChange} inputRef={porDepartamentoRef}/>
                            <UseInputPadrao label="Por Pessoa:" options={pessoa} type="select" identifier="porPessoa" value={porPessoa} onChange={porPessoaChange} inputRef={porPessoaRef}/>
                        </form>
                    </div>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButton} >
                        Limpar Filtro
                    </button>
                    <button className={styles.confirmButton} >
                        Filtrar
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}