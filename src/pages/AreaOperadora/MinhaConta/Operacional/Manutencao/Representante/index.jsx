import styles from "./styles.module.css"
import { UseInputPadrao, UseInputMask } from "../../../../../../components/InputPadrao"
import TabelaPadrao from "../../../../../../components/TabelaPadrao"
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../utils/json";
import { useState, useEffect, useCallback } from "react";
import { handleResizeTabela } from "../../../../../../utils/functions";
import { limparFiltros } from "../../../../../../utils/functions";
import { useLoader } from "../../../../../../context";

const tipoOptions = [
  {value: "corretora", label: "Corretora"},
  {value: "administradora", label: "Administradora"},
  {value: "geral", label: "Geral"},
  {value: "interno", label: "Interno"},
  {value: "vendedor", label: "Vendedor"},
]

const statusOptions = [
  {value: "ativo", label: "Ativo"},
  {value: "cancelado", label: "Cancelado"},
  {value: "inativo", label: "Inativo"},
  {value: "suspenso", label: "Suspenso"},
  {value: "recisao", label: "Reicisão Contratual"},
]

const pesquisarOptions = [
  {value: "representante", label: "Representante Pai"},
  {value: "cnpj", label: "CNPJ"},
  {value: "contato", label: "Contato"},
  {value: "cidade", label: "Cidade"},
  {value: "estado", label: "Estado"},
]

/*
const filtrarBeneficiarios = () => {
  try {
    showLoader();
    const filtro = {
      beneficiario: beneficiario || "",
      formaPagamento: formaPagamento || "",
      dataInicio: dataInicio || "",
      dataFinal: dataFinal || "",
    };

    const inicioDate = parseBrazilianDateTime(filtro.dataInicio);
    const finalDate = parseBrazilianDateTime(filtro.dataFinal);

    const dadosFiltrados = dadosTabela.filter((row) => {
      const nome = row.beneficiario.toLowerCase();
      const cpf = row.cpf_beneficiario;
      const formaDePagamento = row.descr_forma_pagto;
      const solicitacaoDate = parseBrazilianDateTime(row.dtsolicitacao);

      const dataDentroDoIntervalo =
        (!inicioDate || solicitacaoDate >= inicioDate) &&
        (!finalDate || solicitacaoDate <= finalDate);

      return (
        (filtro.beneficiario === "" || (nome.includes(filtro.beneficiario.toLowerCase()) || cpf.includes(filtro.beneficiario))) &&
        (filtro.formaPagamento.length === 0 || filtro.formaPagamento.includes(formaDePagamento)) &&
        dataDentroDoIntervalo
      );
    });

    setDadosFiltrados(dadosFiltrados);
  } catch (error) {
    hideLoader();
    console.error("Erro ao filtrar beneficiários:", error);
    dialogMessage("Ocorreu um erro inesperado ao tentar filtrar dados. Tente novamente.", "error", { confirmButton: false });
  } finally {
    hideLoader();
  }
};
*/

function Representante() {
  const [tabelaDados, setTabelaDados] = useState([
    {
      codigo: "12345",
      superior: "Jorge Marcelo Neto",
      representante_pai: "Joao Silva",
      nome: "Alexandre Magno Abrão",
      tipo: "Vendedor",
      cpf_cnpj: "192.645.345-04",
      endereco: "Rua logo ali",
      numero: "20",
      complemento: "Casa",
      bairro: "Tijuca",
      cidade: "Itú",
      cep: "23454-420",
      uf: "SP",
      telefone_1: "(12)93456-4533",
      telefone_2: "",
      email_1: "email@email.com",
      email_2: "joao_emails@gmail.com",
      celular_1: "(11) 11111-1111",
      celular_2: "",
      celular_3: "",
      contato: "zap zap",
      data_cadastro: '09/02/1304',
    },
    {
      codigo: "2957",
      superior: "João dos Campos",
      representante_pai: "Maria Rita",
      nome: "Paulo Fernando",
      tipo: "Administradora",
      cpf_cnpj: "798.211.396-99",
      endereco: "Av. Dr. João das Curas",
      numero: "69",
      complemento: "Ap 54 Bl D",
      bairro: "Parque das Araras",
      cidade: "Ubatuba",
      cep: "23454-420",
      uf: "PR",
      telefone_1: "(12)93456-4533",
      telefone_2: "",
      email_1: "email@email.com",
      email_2: "joao_emails@gmail.com",
      celular_1: "(11) 11111-1111",
      celular_2: "(81) 98937-3844",
      celular_3: "",
      contato: "Email",
      data_cadastro: '09/02/1304',
    },
    {
      codigo: "9172",
      superior: "Maria Carolina",
      representante_pai: "Stefanny Borges",
      nome: "Maria Mariazinha",
      tipo: "Corretora",
      cpf_cnpj: "192.645.345-04",
      endereco: "Rua Dr. Pererira Barros",
      numero: "55",
      complemento: "Casa",
      bairro: "Vila Marly",
      cidade: "Taubaté",
      cep: "23454-420",
      uf: "SP",
      telefone_1: "(12)93456-4533",
      telefone_2: "",
      email_1: "email@email.com",
      email_2: "joao_emails@gmail.com",
      celular_1: "(11) 11111-1111",
      celular_2: "",
      celular_3: "",
      contato: "zap zap",
      data_cadastro: '09/02/1304',
    },
  ]);

  const tabelaColumns = [
    {
      value: "codigo",
      name: "Código",
    },
    {
      value: "superior",
      name: "Superior",
    },
    {
      value: "representante_pai",
      name: "Representante Pai",
    },
    {
      value: "nome",
      name: "Nome",
    },
    {
      value: "tipo",
      name: "Tipo",
    },
    {
      value: "cpf_cnpj",
      name: "CPF/CNPJ",
    },
    {
      value: "endereco",
      name: "Endereço",
    },
    {
      value: "numero",
      name: "Número",
    },
    {
      value: "complemento",
      name: "Complemento",
    },
    {
      value: "bairro",
      name: "Bairro"
    },
    {
      value: "cidade",
      name: "Cidade",
    },
    {
      value: "cep",
      name: "CEP",
    },
    {
      value: "uf",
      name: "UF",
    },
    {
      value: "telefone_1",
      name: "Telefone N° 1",
    },
    {
      value: "telefone_2",
      name: "Telefone N° 1",
    },
    {
      value: "email_1",
      name: "Email N° 1",
    },
    {
      value: "email_2",
      name: "Email N° 2",
    },
    {
      value: "celular_1",
      name: "Celular N° 1",
    },
    {
      value: "celular_2",
      name: "Celular N° 2",
    },
    {
      value: "celular_3",
      name: "Celular N° 3",
    },
    {
      value: "contato",
      name: "Contato",
    },
    {
      value: "data_cadastro",
      name: "Data Cadastro",
    },

  ];

  const limparFiltro = () => {
    limparFiltros([
      { setter: setTipo, TipoRef },
      { setter: setStatus, StatusRef },
      { setter: setSegmento, SegmentoRef },
      { setter: setPesquisar, PesquisarRef },
      { setter: setTexto, TextoRef },
    ]);
  };

  const navigate = useNavigate();
  const handleNavigate = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  const [Tipo, setTipo, TipoRef] = UseInputMask();
  const [Status, setStatus, StatusRef] = UseInputMask();

  const [Segmento, setSegmento, SegmentoRef] = UseInputMask();
  const [Pesquisar, setPesquisar, PesquisarRef] = UseInputMask();
  const [Texto, setTexto, TextoRef] = UseInputMask();

  const { showLoader, hideLoader } = useLoader();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleRowClick = useCallback((row, rowIndex) => {
    showLoader();
    handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/manutencao/${jsonRoute.Representante}/${jsonRoute.RepresentanteCadastro}`);

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
    <main className={styles.beneficiariosContainer}>
      <h2 className={styles.TitleRepresentante}>
        <i className="fa-solid fa-people-arrows"></i>
        Representante
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
            <div className={styles.divConteudo}>
              <UseInputPadrao
                label="Tipo"
                type="select"
                searchable={false}
                identifier="tipo-cliente-signin"
                options={tipoOptions}
                value={Tipo}
                onChange={setTipo}
                inputRef={TipoRef}
                width={isMobile ? 100 : 20}
                gap={isMobile ? 0 : 0.5}
                
              />
              <UseInputPadrao
                label="Status"
                type="select"
                searchable={false}
                identifier="tipo-cliente-signin"
                options={statusOptions}
                value={Segmento}
                onChange={setSegmento}
                inputRef={SegmentoRef}
                width={isMobile ? 100 : 20}
                gap={isMobile ? 0 : 0.5}
              />
            </div>

            <div className={styles.divConteudo}>
              <UseInputPadrao
                label="Pesquisar"
                type="select"
                identifier="tipo-cliente-signin"
                options={pesquisarOptions}
                value={Pesquisar}
                onChange={setPesquisar}
                inputRef={PesquisarRef}
                width={isMobile ? 100 : 20}
                gap={isMobile ? 0 : 0.5}
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
                    onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/manutencao/${jsonRoute.Representante}/${jsonRoute.RepresentanteCadastro}`)
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

export default Representante
