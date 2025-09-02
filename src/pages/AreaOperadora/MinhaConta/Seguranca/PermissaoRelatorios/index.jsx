import { useState, useEffect } from "react";
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao";
import styles from "./styles.module.css";
import TabelaPadrao from "../../../../../components/TabelaPadrao";
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../utils/json";
import { handleResizeTabela } from "../../../../../utils/functions.js";

function PermissaoRelatorios() {
  const [tabelaDados, setTabelaDados] = useState([]);
  const [tipoCliente, setTipoCliente] = useState('');
  const [isMobile, setIsMobile] = useState(handleResizeTabela());

  useEffect(() => {
    setIsMobile(handleResizeTabela());
  }, []);

  const tabelaColumns = [

    {
      value: "descricao",
      name: "Descrição",
      cellStyle: {
        textAlign: "left",
      },
    },
  ];

  const dadosTabela = [
    {
      codigo: "001",
      descricao: "Diretoria",
    },
    {
      codigo: "002",
      descricao: "Representante",
    },
    {
      codigo: "003",
      descricao: "Financeiro",
    },
    {
      codigo: "004",
      descricao: "Cobrança",
    },
    {
      codigo: "005",
      descricao: "Adesão",
    },
    {
      codigo: "006",
      descricao: "Empresarial",
    },
    {
      codigo: "007",
      descricao: "Representante Empresarial",
    },
    {
      codigo: "008",
      descricao: "Supervisor",
    },
    {
      codigo: "011",
      descricao: "RH",
    },
    {
      codigo: "012",
      descricao: "DP",
    },
  ];

  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <main>
      <div className={styles.beneficiariosContainer}>
          <div>
              <h2 className={styles.TitleRepresentante}>
                <i className="fa-solid fa-chart-bar"></i>
                Permissões de Relatórios
              </h2>
          </div>   
          <div className={styles.beneficiariosContent}>
              <section className={styles.filtroTabelaField}>
                  <div className={styles.filtroTabelaContent}>
                    <UseInputPadrao
                      label="Texto"
                      type="text"
                      icon="fa-solid fa-search"
                      identifier="texto"
                      value={tipoCliente}
                      onChange={(e) => setTipoCliente(e.target.value)}
                      width={isMobile ? 100 : 50}
                      gap={isMobile ? 0 : 0}
                      autoComplete="tipo-cliente"
                    />
                  </div>
                  <TabelaPadrao
                    tabelaId="tabelaPadrao"
                    columns={tabelaColumns}
                    data={dadosTabela}
                    options={{
                      showSearch: true,
                      showToggleView: true,
                      showColumnsSelector: true,
                      showPaginationSwitch: true,
                      rowOnClick: (row, rowIndex) => handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${jsonRoute.RelatoriosTab}`),
                    }}
                  />
              </section>
          </div>
        </div>
    </main>
  );
}

export default PermissaoRelatorios;
