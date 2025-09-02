
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao"
import styles from "./styles.module.css";
import { useState } from "react";
import TabelaPadrao from "../../../../../components/TabelaPadrao";
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../utils/json";

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


  const InputStyle = {
    height: 'auto',
    appearance: 'none',
    border: 'none',
    padding: '0.25rem',
    fontSize: '0.85rem',
    lineHeight: 'unset',
    background: 'transparent',
    color: 'var(--cinza-escuro)',
    transition: 'border 0.2s ease-in-out',
    cursor: 'default',
    width: '50'
  }

  // Função para navegação usando o valor do jsonRoute
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (

    <main>
      
      <h2 className={styles.titulo}>Usuário</h2>
      <form className={styles.loginForm}>
        <div className={styles.divContainer}>
          <div className={styles.InputContainerSeguranca}>

            <div className={styles.Option}>
              <UseInputPadrao label="Status:" type="select" options={optionsStatus} identifier="tipo-cliente-signin" value={status} onChange={setStatus} inputRef={statusRef} InputStyle={InputStyle} autoComplete="tipo-cliente" />
            </div>

            <div className={styles.Option}>
              <UseInputPadrao label="Tipo:" type="select" options={optionsTipo} identifier="tipo-cliente-signin" value={tipo} onChange={setTipo} inputRef={tipoRef} InputStyle={InputStyle} autoComplete="tipo-cliente" />
            </div>

            <div className={styles.Option}>
              <p></p>
              <UseInputPadrao label="Função:" type="select" options={optionsFuncao} identifier="tipo-cliente-signin" value={funcao} onChange={setFuncao} inputRef={funcaoRef} InputStyle={InputStyle} autoComplete="tipo-cliente" />
            </div>

            <div className={styles.Option}>
              <p></p>
              <UseInputPadrao label="Condição:" type="select" options={optionsCondicao} identifier="tipo-cliente-signin" value={condicao} onChange={setCondicao} inputRef={condicaoRef} InputStyle={InputStyle} autoComplete="tipo-cliente" />
            </div>

          </div>

          <div className={styles.areaPesquisa}>
            <div className={styles.pesquisarOption}>
              <UseInputPadrao label="Pesquisar:" type="select" options={optionsPesquisar} identifier="tipo-cliente-signin" value={pesquisar} onChange={setPesquisar} inputRef={pesquisarRef} InputStyle={InputStyle} autoComplete="tipo-cliente" />
            </div>

            <div className={styles.textAreaSeguranca}>
              <UseInputPadrao label="Texto:" type="text" identifier="tipo-cliente-signin" value={texto} onChange={setTexto} inputRef={textoRef} InputStyle={InputStyle} autoComplete="tipo-cliente" />
            </div>

          </div>

          <div className={styles.tabelaHeader}>
            <div className={styles.tabelaPadrao}>
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
                  rowOnClick: (row, rowIndex) => handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.InfoTabela}`),
                }}
              />
            </div>
          </div>

        </div>

        <div className={styles.formActions}>
          <a className={styles.formActionsLink} onClick={() => openModal("modalTexto", { titulo: "Termos de Serviço", texto: TermosDeServico })}>
          </a>
        </div>
      </form>
    </main>
  )
}

export default Seguranca