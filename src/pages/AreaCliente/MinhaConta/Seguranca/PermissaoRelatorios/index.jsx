import { useState } from "react";
import { UseInputPadrao, UseInputMask, } from "../../../../../components/InputPadrao";
import styles from "./styles.module.css";
import TabelaPadrao from "../../../../../components/TabelaPadrao";
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../utils/json";

function PermissaoRelatorios() {
  const [tabelaDados, setTabelaDados] = useState([]);
  const tabelaColumns = [
    {
      value: "codigo",
      name: "Codigo",
    },
    {
      value: "descricao",
      name: "Descrição",
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
      codigo: "009",
      descricao: "Gerente",
    },
    {
      codigo: "010",
      descricao: "Vendas",
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
    <form className={styles.formRelatorios}>
      <div className={styles.divContainer}>
        <div className={styles.InputContainer}>
          <div className={styles.Option}>
            <h3>Pesquisar</h3>
            <UseInputPadrao
              type="text"
              identifier="tipo-cliente-signin"
              onChange={(e) => setTipoCliente(e.target.value)}
              autoComplete="tipo-cliente"
            />
          </div>

          <div className={styles.textAreaPermissao}>
            <h3>Texto</h3>
            <UseInputPadrao
              type="text"
              identifier="tipo-cliente-signin"
              onChange={(e) => setTipoCliente(e.target.value)}
              autoComplete="tipo-cliente"
            />
          </div>
        </div>

        <div className={styles.tabelaHeaderPermissao}>
          <div className={styles.tabelaRelatorios}>
            <TabelaPadrao
              tabelaId="tabelaPadrao"
              columns={tabelaColumns}
              data={dadosTabela}
              options={{
                showSearch: true,
                showToggleView: true,
                showColumnsSelector: true,
                showPaginationSwitch: true,
                showRefresh: true,
                showExport: false,
                showPrint: false,
                showFilter: false,
                rowOnClick: (row, rowIndex) => handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.RelatoriosTab}`),
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
export default PermissaoRelatorios;
