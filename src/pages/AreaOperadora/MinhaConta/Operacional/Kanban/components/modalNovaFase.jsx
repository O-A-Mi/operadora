import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState} from "react"; 
import TogglePadrao from "../../../../../../components/TogglePadrao"

export default function ModalNovaFase({ closeModal }) {
  const [nome, nomeChange, nomeRef] =  UseInputMask(null, "text");
  const [abreviacao, abreviacaoChange, abreviacaoRef] =  UseInputMask(null, "text");
  const [checkBox, checkBoxChange, checkBoxRef] =  UseInputMask(null, "text");
  const [sloFrio, sloFrioChange, sloFrioRef] =  UseInputMask(null, "text");
  const [sloMorno, sloMornoChange, sloMornoRef] =  UseInputMask(null, "text");
  const [sloQuente, sloQuenteChange, sloQuenteRef] =  UseInputMask(null, "text");
  const [sloExpirado, sloExpiradoChange, sloExpiradoRef] =  UseInputMask(null, "text");
  const [checkFase, checkFaseChange, checkFaseRef] =  UseInputMask(null, "text");
  const [proximaFase, proximaFaseChange, proximaFaseRef] =  UseInputMask(null, "text");
  const [corDaFase, corDaFaseChange, corDaFaseRef] =  UseInputMask(null, "number");
  const [ordemVisualizacao, ordemVisualizacaoChange, ordemVisualizacaoRef] =  UseInputMask(null, "number");
  const [listaAssuntos, listaAssuntosChange, listaAssuntosRef] =  UseInputMask(null, "text");
  const [listaDepartamentos, listaDepartamentosChange, listaDepartamentosRef] =  UseInputMask(null, "text");
  const [departamentoDesignado, departamentoDesignadoChange, departamentoDesignadoRef] =  UseInputMask(null, "text");
  const [usuarioDesignado, usuarioDesignadoChange, usuarioDesignadoRef] =  UseInputMask(null, "text");
  const [pagou, setPagou] = useState("Não");
  const [fechado, setFechado] = useState("Não");

  const [cargos, setCargos] = useState([]);

  const filtrar = [
    { value: "dataDeAbertura", label: "Data de Abertura" }, 
    {value : "dataDeFechamento", label: "Data de Fechamento"},
    {value : "dataDeCadastro", label: "Data de Cadastro"}
  ];

  const fase = [
    { value: "fase1", label: "Fase 1" }, 
    {value : "fase2", label: "Fase 2"},
    {value : "fase3", label: "Fase 3"},
    {value : "fase4", label: "Fase 4"},
  ];

  const ordem = [
    { value: "01", label: "01" }, 
    {value : "02", label: "02"},
    {value : "03", label: "03"},
    {value : "04", label: "04"},
    {value : "05", label: "05"},
  ];

  const pessoa = [
    { value: "fabricio", label: "Fabricio" }, 
    {value : "lucas", label: "Lucas"},
    {value : "vitor", label: "vitor"},
    {value : "matheus", label: "Matheus"},
  ];

  const assuntoDisponivel = [
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

//   const InputStyle = {
//     height: 'auto',
//     appearance: 'none',
//     border: 'none',
//     padding: '0.25rem',
//     fontSize: '0.85rem',
//     lineHeight: 'unset',
//     background: 'transparent',
//     color: 'var(--cinza-escuro)',
//     transition: 'border 0.2s ease-in-out',
//     cursor: 'default'
//   }
  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Nova Fase</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>

            <div className={styles.scrollBox}>
                <div className={styles.modalBody}>
                    <form className={styles.modalForm}>
                        <UseInputPadrao label="Nome" required type="text" identifier="nome" value={nome} onChange={nomeChange} inputRef={nomeRef}/>
                        <UseInputPadrao label="Abreviação" required type="text"  identifier="abreviacao" value={abreviacao} onChange={abreviacaoChange} inputRef={abreviacaoRef}/>
                        <TogglePadrao
                          label="Aparece no Painel"
                          checked={pagou === 'Sim'}
                          onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                          value={checkBox}
                          inputRef={checkBoxRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                        <UseInputPadrao label="SLO Frio (em horas)" readOnly icon={false} disabled  required type="number" identifier="sloFrio" value={sloFrio} onChange={sloFrioChange} inputRef={sloFrioRef}/>
                        <UseInputPadrao label="SLO Morno (em horas)" required icon={false} type="number" identifier="sloMorno" value={sloMorno} onChange={sloMornoChange} inputRef={sloMornoRef}/>
                        <UseInputPadrao label="SLO Quente (em horas)"  required icon={false} type="number" identifier="sloQuente" value={sloQuente} onChange={sloQuenteChange} inputRef={sloQuenteRef}/>
                        <UseInputPadrao label="SLO Expirado (em horas)"  required icon={false} type="number" identifier="porPessoa" value={sloExpirado} onChange={sloExpiradoChange} inputRef={sloExpiradoRef}/>
                        <TogglePadrao
                          label="Fase Final"
                          checked={pagou === 'Sim'}
                          onChange={(checkFaseChange) => setPagou(checkFaseChange ? 'Sim' : 'Não')}
                          value={checkFase}
                          inputRef={checkFaseRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                      
                        {/* so aparece se o fase final for nao */}
                        <UseInputPadrao label="Próxima Fase - Automática" options={fase} type="select" identifier="proximaFase" value={proximaFase} onChange={proximaFaseChange} inputRef={proximaFaseRef}/>
                        <UseInputPadrao label="Cor da Fase" required  type="color" identifier="corDaFase" value={corDaFase} onChange={corDaFaseChange} inputRef={corDaFaseRef}/>
                        <UseInputPadrao label="Ordem de Visualização" required options={ordem} type="select" identifier="ordemVisualizacao" value={ordemVisualizacao} onChange={ordemVisualizacaoChange} inputRef={ordemVisualizacaoRef}/>
                        <UseInputPadrao label="Lista de Assuntos Disponíveis" required options={assuntoDisponivel} type="select" identifier="listaAssuntos" value={listaAssuntos} onChange={listaAssuntosChange} inputRef={listaAssuntosRef}/>
                        <UseInputPadrao label="Lista de Departamentos Designados Disponíveis " required options={departamento} type="select" identifier="listaDepartamentos" value={listaDepartamentos} onChange={listaDepartamentosChange} inputRef={listaDepartamentosRef}/>
                        <UseInputPadrao label="Departamento Designado Padrão" required options={pessoa} type="select" identifier="departamentoDesignado" value={departamentoDesignado} onChange={departamentoDesignadoChange} inputRef={departamentoDesignadoRef}/>
                        <UseInputPadrao label="Usuário Designado" options={pessoa} type="select" identifier="usuarioDesignado" value={usuarioDesignado} onChange={usuarioDesignadoChange} inputRef={usuarioDesignadoRef}/>
                    </form>
                </div>
            </div>
            
            <footer>
                <div className={styles.modalFooter}>
                    <button className={styles.confirmButtonNovaFase} >
                        Criar Fase
                    </button>
                </div>
            </footer>
        </div>
    </div>
  );
}