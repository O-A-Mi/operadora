import styles from "./styles.module.css"
import { UseInputPadrao, UseInputMask } from "../../../../../../components/InputPadrao"
import TabelaPadrao from "../../../../../../components/TabelaPadrao"
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../utils/json";
import { useState, useEffect, useCallback } from "react";
import { handleResizeTabela } from "../../../../../../utils/functions";
import { limparFiltros } from "../../../../../../utils/functions";

function Funcionario() {
  const [tabelaDados, setTabelaDados] = useState([
    { 
      codigo: "1029",
      nome: "Pedro Neto Adalberto",
      cpf: "102.293.445-30",
      rg: "96.104.394-2",
      data_nascimento: "23/10/2005",
      endereco: "Av. 9 de Julho",
      numero: "266",
      complemento: "Casa",
      bairro: "Inguarapé",
      cidade: "Taubaté",
      cep: "12060-382",
      uf: "SP",
      telefone_1: "11111",
      telefone_2: "22222",
      celular_1: "11-11-1111111",
      celular_2: "22-22-2222222",
      celular_3: "33-33-3333333",
      contato: "",
    },
    { 
      codigo: "595",
      nome: "Lucas Juan dos Santos",
      cpf: "293.993.203-29",
      rg: "93.492.304-2",
      data_nascimento: "15/06/1999",
      endereco: "Rua da União",
      numero: "39",
      complemento: "Ap. 02 Bl. A",
      bairro: "Areão",
      cidade: "Pindamonhangaba",
      cep: "40370-100",
      uf: "SP",
      telefone_1: "11111",
      telefone_2: "22222",
      celular_1: "11-11-1111111",
      celular_2: "22-22-2222222",
      celular_3: "33-33-3333333",
      contato: "",
    },
  ]);

  const tabelaColumns = [
    {
      value: "codigo",
      name: "Código",
      sortable: true,
    },
    {
      value: "nome",
      name: "Nome",
      sortable: true,
    },
    {
      value: "cpf",
      name: "CPF",
      sortable: false,
    },
    {
      value: "rg",
      name: "RG",
      sortable: false,
    },
    {
      value: "data_nascimento",
      name: "Dt.Nasc.",
      sortable: false,
    },
    {
      value: "endereco",
      name: "Endereço",
      sortable: false,
    },
    {
      value: "numero",
      name: "Número",
      sortable: false,
    },
    {
      value: "complemento",
      name: "Complemento",
      sortable: false,
    },
    {
      value: "bairro",
      name: "Bairro",
      sortable: false,
    },
    {
      value: "cidade",
      name: "Cidade",
      sortable: false,
    },
    {
      value: "cep",
      name: "CEP",
      sortable: false,
    },
    {
      value: "uf",
      name: "UF",
      sortable: false,
    },
    {
      value: "telefone_1",
      name: "Telefone N° 1",
      sortable: false,
    },
    {
      value: "telefone_2",
      name: "Telefone N° 2",
      sortable: false,
    },
    {
      value: "celular_1",
      name: "Celular N° 1",
      sortable: false,
    },
    {
      value: "celular_2",
      name: "Celular N° 2",
      sortable: false,
    },
    {
      value: "celular_3",
      name: "Celular N° 3",
      sortable: false,
    },
    {
      value: "contato",
      name: "Contato",
      sortable: false,
    },
  ];

  const limparFiltro = () => {
    limparFiltros([
      { setter: setTipo, TipoRef },
      { setter: setStatus, StatusRef },
    ]);
  };

  const navigate = useNavigate();
  const handleNavigate = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  const [Tipo, setTipo, TipoRef] = UseInputMask();
  const [Status, setStatus, StatusRef] = UseInputMask();

  const [Pesquisar, setPesquisar, PesquisarRef] = UseInputMask();
  const [Texto, setTexto, TextoRef] = UseInputMask();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleRowClick = useCallback((row, rowIndex) => {
    handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/manutencao/${jsonRoute.Funcionario}/${jsonRoute.FuncionarioCadastro}`);
  }, [handleNavigate]);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('tabelaPadrao', 'tabelaPadrao-container');
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('tabelaPadrao', 'tabelaPadrao-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  return (
    <main>
      <h2 className={styles.TitleRepresentante}>
        <i className="fa-solid fa-id-card"></i>
        Funcionário
      </h2>
      <div className={styles.beneficiariosContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtragem
              </h5>
              <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                <i className="fa-solid fa-filter-slash"></i> Limpar filtro
              </button>
            </div>
            <div className={styles.divConteudo}>
              <UseInputPadrao
                label="Pesquisar"
                type="select"
                identifier="tipo-cliente-signin"
                value={Pesquisar}
                onChange={setPesquisar}
                inputRef={PesquisarRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0.33}
              />
              <UseInputPadrao
                label="Texto"
                type="text"
                identifier="tipo-cliente-signin"
                value={Texto}
                onChange={setTexto}
                inputRef={TextoRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0}
              />
            </div>

            <div className={styles.tabela} id="tabelaPadrao-container">
              <TabelaPadrao
                tabelaId="tabelaPadrao"
                columns={tabelaColumns}
                data={tabelaDados}
                options={{
                  showSearch: false,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showPaginationSwitch: true,
                  showRefresh: true,
                  showExport: true,
                  showPrint: true,
                  showFilter: false,
                  rowOnClick: handleRowClick,
                  additionalButtons: [{
                    title: 'Novo',
                    icon: 'fa-regular fa fa-plus',
                    onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/manutencao/${jsonRoute.Funcionario}/${jsonRoute.FuncionarioCadastro}`)
                  }]
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Funcionario
