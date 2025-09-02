import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import TabelaPadrao from "../../../../../../components/TabelaPadrao";
import { jsonRoute } from "../../../../../../utils/json";
import { useNavigate } from "react-router";
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';

function RelatoriosTab() {
  const initialReports = [
    { id: 1, name: "Faturamento" },
    { id: 2, name: "Funcionário" },
    { id: 3, name: "Representante" },
    { id: 4, name: "Estabelecimento" },
    { id: 5, name: "Movimentação Financeira" },
    { id: 6, name: "Declaração IR Sintético" },
    { id: 7, name: "Inconsistência Endereço" },
    { id: 8, name: "Conciliação Crédito" },
    { id: 9, name: "Declaração IR Analítico" },

  ];

  const [reports, setReports] = useState(
    initialReports.map((report) => ({
      ...report,
      visivel: true,
      exportar: true,
      imprimir: true,
      // disabledVisivel: false,
      // disabledExportar: false,
      // disabledImprimir: false,
    }))
  );

  const handleToggleAll = (field) => {
    const allSelected = reports.every((report) => report[field]);
    setReports((prev) =>
      prev.map((report) => ({ ...report, [field]: !allSelected }))
    );
  };

  const handleToggleField = (field, id) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, [field]: !report[field] } : report
      )
    );
  };

  const columns = [
    {
      name: "Relatorios",
      value: "name",
      sortable: false,
      formatter: (value) => (
        <div className={styles.linhaTab}>
          <i className="fas fa-file-alt" style={{ marginRight: "0.5rem" }}></i>
          {value}
        </div>
      ),
    },
    {
      name: "Visível",
      value: "visivel",
      sortable: false,
      type: "select",
    },
    {
      name: "Exportar",
      value: "exportar",
      sortable: false,
      type: "select",
    },
    {
      name: "Imprimir",
      value: "imprimir",
      sortable: false,
      type: "select",
    },
  ];

  const [screenState, setScreenState] = useState({
    voltar: false,
  })

  const handleDataChange = (newData) => {
    console.log('Dados da tabela alterados:', newData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.moldura}>
      <section className={styles.tabela}>
        <TabelaPadrao
          tabelaId="permissaoRelatorios"
          columns={columns}
          data={reports}
          options={{
            paginationEnabled: false,
            showSearch: false,
            showExport: false,
            showColumnsSelector: false,
            showToggleView: false,
            showFilter: false,
            toolbar: false,
            onDataChange: handleDataChange,
          }}
        />
      </section>
      </div>
      {screenState.voltar && <NavigateToPermissao setScreenState={setScreenState} />}

      <div className={styles.actionButtons}>
        <div className={styles.actionButtonsGroup}>
          <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={() => setScreenState((prev) => ({ ...prev, novo: false, gravar: false, deletar: false, voltar: true }))}>
            <i className="fa-solid fa-arrow-left"></i>
            Voltar
          </button>
        </div>


        <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={() => {
          dialogMessage(
            "Tem certeza que deseja gravar este registro?",
            "info",
            { buttonsText: { confirm: "Sim", cancel: "Não" } },
            (result) => { if (result === true) { handleConfirmGravar(); } }
          );
        }}><i className="fa-solid fa-save" />Gravar</button>
      </div>
    </div>


  );
}

function NavigateToPermissao({ setScreenState }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${jsonRoute.PermissaoRelatorios}`);
    setScreenState((prev) => ({ ...prev, voltar: false }));
  }, [navigate, setScreenState]);

  return null;
}

export default RelatoriosTab;
