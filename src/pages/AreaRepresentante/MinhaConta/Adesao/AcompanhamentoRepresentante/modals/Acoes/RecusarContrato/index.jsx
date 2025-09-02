import ActionButtons from "../../../../../../../../components/ActionButtonsPadrao"
import { UseInputMask, UseInputPadrao } from "../../../../../../../../components/InputPadrao"
import styles from "../../../styles.module.css"

const tipoChamadas = [
  { value: "sugestoes", label: "Sugestões" },
  { value: "reclamacoes", label: "Reclamações" },
  { value: "segundaviaboleto", label: "2ª Via Boleto" },
  { value: "rescisaocontratual", label: "Rescição Contratual" },
  { value: "cobranca", label: "Cobrança" },
  { value: "boleto", label: "Boleto" },
]

function RecusarContrato() {

  const [data, setData, dataRef] = UseInputMask();
  const [tipoChamada, setTipoChamada, tipoChamadaRef] = UseInputMask();
  const [mensagem, setMensagem, mensagemRef] = UseInputMask();


  return (
    <>
      <div className={styles.Content}>
        <UseInputPadrao
          label="Data"
          type="date"
          value={data}
          onChange={setData}
          inputRef={dataRef}
        />
        <UseInputPadrao
          label="Tipo de Chamada"
          options={tipoChamadas}
          type="select"
          value={tipoChamada}
          onChange={setTipoChamada}
          inputRef={tipoChamadaRef}
        />
        <UseInputPadrao
          label="Mensagem"
          type="textarea"
          value={mensagem}
          onChange={setMensagem}
          inputRef={mensagemRef}
        />
      </div>
    </>
  )
}

export default RecusarContrato