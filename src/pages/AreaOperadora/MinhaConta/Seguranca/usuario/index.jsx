
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao"
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import TabelaPadrao from "../../../../../components/TabelaPadrao";
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../utils/json";
import { limparFiltros } from "../../../../../utils/functions";

function Seguranca() {

  const navigate = useNavigate();

  const optionsStatus = [
    { value: 'A', label: 'Ativo' },
    { value: 'C', label: 'Cancelado' },
    { value: 'E', label: 'Em Analíse pela operadora' },
    { value: 'IS', label: 'IBBCA Suspenso' },
    { value: 'IB', label: 'Inadiplente IBBCA' },
    { value: 'I', label: 'Inativo' },
    { value: 'IN', label: 'Inativo por Inadiplência' },
    { value: 'R', label: 'Recisão Contratual' },
    { value: 'S', label: 'Suspenso' },
  ]

  const optionsTipo = [
    { value: 'A', label: 'Associado' },
    { value: 'S', label: 'Segurado' },
    { value: 'D', label: 'Dependente' },
    { value: 'E', label: 'Estabelecimento' },
    { value: 'T', label: 'Todos' },
    { value: 'F', label: 'Funcionario/Representante' },
  ]

  const optionsFuncao = [
    { value: 'T', label: 'Todos' },
    { value: 'D', label: 'Diretoria' },
    { value: 'R', label: 'Representante' },
    { value: 'F', label: 'Financeiro' },
    { value: 'C', label: 'Cobrança' },
    { value: 'G', label: 'Gerente' },
    { value: 'V', label: 'Vendas' }
  ]

  const optionsCondicao = [
    { value: 'V', label: 'Vinculado' },
    { value: 'N', label: 'Não Vinculado' },
    { value: 'T', label: 'Todos' }
  ]

  const optionsPesquisar = [
    { value: 'N', label: 'Nome' },
    { value: 'L', label: 'Login' },
    { value: 'F', label: 'Função' }
  ]

  const [status, setStatus, statusRef] = UseInputMask();
  const [tipo, setTipo, tipoRef] = UseInputMask();
  const [funcao, setFuncao, funcaoRef] = UseInputMask();
  const [condicao, setCondicao, condicaoRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const tabelaColumns = [
    {
      value: "login",
      name: "Login",

    },
    {
      value: "nome",
      name: "Nome",
    },
    {
      value: "email",
      name: "Email",
    },
    {
      value: "status",
      name: "Status",
    },
    {
      value: "departamento",
      name: "Departamento",
    },
    {
      value: "funcao",
      name: "Funcao",
    },
    {
      value: "tipo",
      name: "Tipo"
    }
  ];

  const dadosTabela = [
    {
      login: "73924490953R",
      nome: "Rodrigo",
      email: "Rodrigo@gmail.com",
      status: "Ativo",
      departamento: "Produção",
      funcao: "Diretoria",
      tipo: "Funcionario/Representante",
    },

    {
      login: "73923490953R",
      nome: "Osvaldo",
      email: "Osvaldo@gmail.com",
      status: "Ausente",
      departamento: "RH",
      funcao: "Representante",
      tipo: "Funcionario/Representante",
    },

    {
      login: "13924490953R",
      nome: "Otavio",
      email: "otavio@gmail.com",
      status: "Inativo",
      departamento: "TI",
      funcao: "Representante",
      tipo: "Funcionario/Representante",
    },

    {
      login: "23924490953R",
      nome: "Nicole",
      email: "nicole@gmail.com",
      status: "Ativo",
      departamento: "DP",
      funcao: "Analista",
      tipo: "Funcionario/Representante",
    },
  ]

    const limparFiltro = () => {
      limparFiltros([
        { setter: setStatus, ref: statusRef },
        { setter: setTipo, ref: tipoRef },
        { setter: setFuncao, ref: funcaoRef },
        { setter: setCondicao, ref: condicaoRef },
        { setter: setPesquisar, ref: pesquisarRef },
        { setter: setTexto, ref: textoRef },
      ]);
      if (dadosCarregados) {
        setDados(dadosOriginais);
      }
    };

  const handleNavigate = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (

    <main>
      <div className={styles.beneficiariosContainer}>
        <h2 className={styles.beneficiariosTitleTela}>
          <i className="fa-solid fa-user"></i>
          Usuário
        </h2>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContent}>
              <div className={styles.filtroTabelaHeader}>
                <h5 className={styles.filtroTabelaTitle}>
                  <i className="fa-solid fa-filter"></i>
                  Buscar por:
                </h5>
                <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                  <i className="fa-solid fa-filter-slash"></i> Limpar filtro
                </button>
              </div>

              <div className={styles.filtroTabelaBody}>
                <div className={styles.InputContainerSeguranca}>
                  <UseInputPadrao
                    label="Status:"
                    type="select"
                    options={optionsStatus}
                    identifier="tipo-cliente-signin"
                    value={status}
                    onChange={setStatus}
                    inputRef={statusRef}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5}
                  />
                  <UseInputPadrao
                    label="Tipo:"
                    type="select"
                    options={optionsTipo}
                    identifier="tipo-cliente-signin"
                    value={tipo} onChange={setTipo}
                    inputRef={tipoRef}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5}
                  />
                  <UseInputPadrao
                    label="Função:"
                    type="select"
                    options={optionsFuncao}
                    identifier="tipo-cliente-signin"
                    value={funcao}
                    onChange={setFuncao}
                    inputRef={funcaoRef}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5}
                  />
                  <UseInputPadrao
                    label="Condição:"
                    type="select"
                    options={optionsCondicao}
                    identifier="tipo-cliente-signin"
                    value={condicao}
                    onChange={setCondicao}
                    inputRef={condicaoRef}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0}
                  />
                </div>
                <div className={styles.areaPesquisa}>
                  <UseInputPadrao
                    label="Pesquisar:"
                    type="select"
                    options={optionsPesquisar}
                    identifier="tipo-cliente-signin"
                    value={pesquisar}
                    onChange={setPesquisar}
                    inputRef={pesquisarRef}
                    width={isMobile ? 100 : 50}
                    gap={isMobile ? 0 : 0.5}
                  />
                  <UseInputPadrao
                    label="Texto:"
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={texto}
                    onChange={setTexto}
                    inputRef={textoRef}
                    width={isMobile ? 100 : 50}
                    gap={isMobile ? 0 : 0}
                  />
                </div>
              </div>
            </div>
          </section>

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
              showExport: true,
              showPrint: true,
              showFilter: true,
               additionalButtons: 
               [{
                title: 'Novo',
                icon: 'fa-regular fa fa-plus',
                onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${jsonRoute.InfoTabela}`)
              }],
              rowOnClick: (row, rowIndex) => handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${jsonRoute.InfoTabela}`),
            }}
          />
        </div>
      </div>
    </main>
  )
}

export default Seguranca