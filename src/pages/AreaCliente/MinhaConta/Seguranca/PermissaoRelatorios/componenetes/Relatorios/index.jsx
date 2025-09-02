import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import TabelaPadrao from "../../../../../../../components/TabelaPadrao";
import CheckboxPadrao from "../../../../../../../components/CheckboxPadrao";
import { jsonRoute } from "../../../../../../../utils/json";
import { useNavigate } from "react-router";

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
    { id: 10, name: "Contrato Sintético" },
    { id: 11, name: "DRE" },
    { id: 12, name: "Rentabilidade" },
    { id: 13, name: "Combo" },
    { id: 14, name: "Dependente" },
    { id: 15, name: "Contrato Analítico" },
    { id: 16, name: "Fluxo de Caixa" },
    { id: 17, name: "Relatório Vidas - GS" },
    { id: 18, name: "Contrato Financeiro Sintético" },
    { id: 19, name: "Contrato Financeiro Analítico" },
    { id: 20, name: "Sinistralidade" },
    { id: 21, name: "Demonstrativo de Contrato" },
    { id: 22, name: "Inconsistência lançamento x Beneficiário" },
    { id: 23, name: "Indicação" },
    { id: 24, name: "Fornecedor" },
    { id: 25, name: "Associado" },
    { id: 26, name: "Proposta" },
    { id: 27, name: "Financeiro" },
    { id: 28, name: "Segurado" },

  ];

  const [reports, setReports] = useState(
    initialReports.map((report) => ({
      ...report,
      visivel: true,
      exportar: true,
      imprimir: true,
      disabledVisivel: false,
      disabledExportar: false,
      disabledImprimir: false,
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
      formatter: (value, row) => (
        <CheckboxPadrao
          id={`visivel-${row.id}`}
          checked={value}
          disabled={row.disabledVisivel}
          onClick={() => {
            setReports((prev) =>
              prev.map((report) =>
                report.id === row.id ? { ...report, disabledVisivel: true } : report
              )
            );
          }}
          onChange={() => handleToggleField("visivel", row.id)}
        />
      ),
      align: "center",
    },
    {
      name: "Exportar",
      value: "exportar",
      sortable: false,
      formatter: (value, row) => (
        <CheckboxPadrao
          id={`exportar-${row.id}`}
          checked={value}
          disabled={row.disabledExportar}
          onClick={() => {
            setReports((prev) =>
              prev.map((report) =>
                report.id === row.id ? { ...report, disabledExportar: true } : report
              )
            );
          }}
          onChange={() => handleToggleField("exportar", row.id)}
        />
      ),
      align: "center",
    },
    {
      name: "Imprimir",
      value: "imprimir",
      sortable: false,
      formatter: (value, row) => (
        <CheckboxPadrao
          id={`imprimir-${row.id}`}
          checked={value}
          disabled={row.disabledImprimir}
          onClick={() => {
            setReports((prev) =>
              prev.map((report) =>
                report.id === row.id ? { ...report, disabledImprimir: true } : report
              )
            );
          }}
          onChange={() => handleToggleField("imprimir", row.id)}
        />
      ),
      align: "center",
    },
  ];

  const [screenState, setScreenState] = useState({
    informacoesUsuario: true,
    novo: false,
    gravar: false,
    deletar: false,
    voltar: false,

  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>
          Permissão: <strong>REPRESENTANTE</strong>
        </span>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.visualizaTodos}`}
            onClick={() => handleToggleAll("visivel")}
          >
            Visualiza Todos
          </button>
          <button
            className={`${styles.button} ${styles.exportarTodos}`}
            onClick={() => handleToggleAll("exportar")}
          >
            Exportar todos
          </button>
          <button
            className={`${styles.button} ${styles.imprimirTodos}`}
            onClick={() => handleToggleAll("imprimir")}
          >
            Imprimir todos
          </button>
        </div>
      </div>
      
      <section className={styles.tabela}>
        <TabelaPadrao
          tabelaId="permissaoRelatorios"
          columns={columns}
          data={reports}
          options={{
            showPagination: true,
            showSearch: false,
            showExport: false,
            showColumnsSelector: false,
            showToggleView: false,
            showFilter: false,
            toolbar: false,
          }}
        />
      </section>

      <section className={styles.BotaoVoltar}>
        {screenState.voltar && <NavigateToPermissao setScreenState={setScreenState} />}

        <button
          className={`${styles.botaoVoltar} ${screenState.tabela ? styles.checked : ''}`}
          onClick={() => setScreenState((prev) => ({ ...prev, novo: false, gravar: false, deletar: false, voltar: true }))}
        >
          <i className="fa-solid fa-circle-arrow-left"></i>voltar
        </button>
      </section>
    </div>
  );
}

function NavigateToPermissao({ setScreenState }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.PermissaoRelatorios}`);
    setScreenState((prev) => ({ ...prev, voltar: false }));
  }, [navigate, setScreenState]);

  return null;
}

export default RelatoriosTab;
