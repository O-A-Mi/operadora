import styles from "./styles.module.css";
import TabelaPadrao from "../../../../../../components/TabelaPadrao";


export default function ModalOcorrencia({ closeModal }) {

  const tabelaColumns = [
    {
        value: "acao",
        name: "Ação",
    },
    {
        value: "fase",
        name: "Fase",
    },
    {
        value: "data",
        name: "Data",
    },
    {
        value: "mensagem",
        name: "Mensagem",
    },
    {
        value: "enviadoPara",
        name: "Enviado para",
    },
    {
        value: "respondidoPor",
        name: "Respondido por",
    },
  ];
  const dadosTabela = [
    {
      acao: "001",
      fase: "Diretoria",
      data: "00/00/0000",
      mensagem: "Diretoria",
      enviadoPara: "Diretoria",
      respondidoPor: "Diretoria",
    },
  ];

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
                <h2>Ocorrências</h2>
                <button className={styles.backButton} onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </header>
            <button className={styles.buttonNewmessage}><i className="fa-solid fa-plus"></i>Nova Mensagem</button>
            
            <section className={styles.tabelaField}>
                <TabelaPadrao 
                  tabelaId="cliente-cobranca"
                  columns={tabelaColumns}
                  data={dadosTabela}
                  options={{
                    showPaginationSwitch: true,
                    showToggleView: true,
                    showColumnsSelector: true,
                  }}
                />
            </section>
            <p>Exibindo 1 até 3 de 3 linhas</p>
        </div>
    </div>
  );
}