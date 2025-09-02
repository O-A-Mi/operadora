import React from 'react';
import { InputPadrao } from '../../../../../../components/InputPadrao';
import styles from "./styles.module.css"
import { useState, useCallback } from 'react';
import { UseInputMask } from '../../../../../../components/InputPadrao';
import { UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useEffect } from 'react';
import { TabelaPadrao } from '../../../../../../components';
import { useNavigate } from 'react-router';
import { jsonRoute } from '../../../../../../utils/json';

function ComboProduto() {
  //variaveis
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [status, setStatus, statusRef] = UseInputMask();
  const [tipoPlano, setTipoPlano, tipoPlanoRef] = UseInputMask();
  const [operadora,setOperadora, operadoraRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  //funcoes
  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const limparFiltro = () => {
      limparFiltros([
          {setter: setStatus, statusRef},
          {setter: setPesquisar, pesquisarRef},
          {setter: setTexto, textoRef},
      ]);
  };

  const handleNavigate = useCallback((route) => {
    navigate(route);
  }, [navigate]);
  
  const handleRowClick = useCallback((row, rowIndex) => {
    handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Manutencao}/${jsonRoute.ComboProduto}/${jsonRoute.NovoComboProdutoServico}`);
  }, [handleNavigate]);
  //listas
  const opStatus = [
    {label: "ATIVO", value: "ativo"},
    {label: "CANCELADO", value: "cancelado"},
    {label: "EM ANÁLISE PELA OPERADORA", value: "em analise pela operadora"},
    {label: "IBBCA SUSPENSO", value: "ibbca suspenso"},
    {label: "INADIMPLENTE IBBCA", value: "inadimplente ibbca"},
    {label: "INATIVO", value: "inativo"},
    {label: "INATIVO POR INADIMPLÊNCIA",value: "inativo por inadimplencia"},
    {label: "RESCISÃO CONTRATUAL", value: "rescisao contratual"},
    {label: "SUSPENSO", value: "suspenso"}
  ];

  const opPlanos = [
    {label: "Plano Odonto", value: "planoOdonto"},
    {label: "Plano Saúde", value: "planoSaude"},
    {label: "Seguro/Assistência", value: "seguroAssistencia"},
    {label: "Opcionais", value: "opcionais"},
    {label: "Saúde", value: "saude"},
    {label: "Plano Pet", value: "planoPet"},

  ];

  const opGrupoContratual = [
    { label: "Todos", value: "todos" },
    { label: "Individual", value: "individual" },
    { label: "Familiar", value: "familiar" },
    { label: "Empresarial", value: "empresarial" },
    { label: "Coletivo por Adesão", value: "coletivo_adesao" },
    { label: "Coletivo Empresarial", value: "coletivo_empresarial" },
    { label: "Servidor Público", value: "servidor_publico" },
    { label: "Autônomo", value: "autonomo" },
    { label: "Estudante", value: "estudante" },
    { label: "Outros", value: "outros" },
  ];

  const opPesquisar = [
    {label:"Abreviação", value:"abreviacao"},
    {label:"Código", value:"codigo"},
    {label:"Descrição", value:"descricao"},
  ]
  

  const opOperadora = [
    { label: "Todos", value: "todos" },
    { label: "Unimed", value: "unimed" },
    { label: "Amil", value: "amil" },
    { label: "Bradesco Saúde", value: "bradesco" },
    { label: "SulAmérica", value: "sulamerica" },
    { label: "NotreDame Intermédica", value: "notredame" },
    { label: "Porto Seguro Saúde", value: "porto" },
    { label: "Hapvida", value: "hapvida" },
    { label: "São Cristóvão Saúde", value: "saocristovao" },
    { label: "Prevent Senior", value: "prevent" },
    { label: "Allianz Saúde", value: "allianz" },
    { label: "Intermédica", value: "intermedica" },
    { label: "Golden Cross", value: "goldencross" },
    { label: "Medial Saúde", value: "medial" },
  ];
  
  const tableCollumns = [
    {value: "codigo", name: "Código", align: "center", sortable: true},
    {value: "tipoPlano", name: "Tipo de Plano", align:"center", sortable: true},
    {value: "operadora", name: "Operadora", align:"center", sortable: true},
    {value: "grupoContrato", name: "Grupo de Contrato", align:"center", sortable: true},
    {value: "descricao", name: "Descrição", align:"center", sortable: true},
    {value: "abreviacao", name: "Abreviação", align:"center", sortable: true},
    {value: "entidade", name: "Entidade", align:"center", sortable: true},
    {value: "codigoExternoF", name: "Codigo Externo Fornecedor", align:"center", sortable: true},
    {value: "codigoExternoE", name: "Codigo Externo Empresa", align:"center", sortable: true},
    {value: "ordemVisualizacao", name: "Ordem Visualização", align:"center", sortable: true},
    {value: "vrCusto", name: "Vr. Custo", align:"center", sortable: true},
    {value: "vrVenda", name: "Vr. Venda", align:"center", sortable: true},
    {value: "carencia", name: "Carência", align:"center", sortable: true},
    {value: "mesAniReajuste", name: "Mês de Aniversário do Reajuste", align:"center", sortable: true},
    {value: "tipoReajuste", name: "Tipo de Reajuste", align:"center", sortable: true},
    
];

const tableData = [
    {
      codigo: "001",
      tipoPlano: "SAÚDE",
      operadora: "CONVSAUDE",
      grupoContrato: "GRUPO A",
      descricao: "PLANO BÁSICO DE SAÚDE",
      abreviacao: "BASICO",
      entidade: "HOSPITAL VIDA",
      codigoExternoF: "EXTF001",
      codigoExternoE: "EXTE001",
      ordemVisualizacao: "1",
      vrCusto: "150,00",
      vrVenda: "250,00",
      carencia: "30",
      mesAniReajuste: "03",
      tipoReajuste: "ANUAL",
    },
    {
      codigo: "002",
      tipoPlano: "ODONTO",
      operadora: "SORRISO",
      grupoContrato: "GRUPO B",
      descricao: "PLANO ODONTOLÓGICO PREMIUM",
      abreviacao: "ODONTOPREM",
      entidade: "CLÍNICA SORRISO",
      codigoExternoF: "EXTF002",
      codigoExternoE: "EXTE002",
      ordemVisualizacao: "2",
      vrCusto: "50,00",
      vrVenda: "89,90",
      carencia: "15",
      mesAniReajuste: "06",
      tipoReajuste: "ANUAL",
    },
    {
      codigo: "003",
      tipoPlano: "VIDA",
      operadora: "SEGUROVIDA",
      grupoContrato: "GRUPO C",
      descricao: "SEGURO DE VIDA FAMILIAR",
      abreviacao: "VIDAFAM",
      entidade: "SEGURADORA BRASIL",
      codigoExternoF: "EXTF003",
      codigoExternoE: "EXTE003",
      ordemVisualizacao: "3",
      vrCusto: "70,00",
      vrVenda: "120,00",
      carencia: "10",
      mesAniReajuste: "12",
      tipoReajuste: "ANUAL",
    },
    {
      codigo: "004",
      tipoPlano: "ACADEMIA",
      operadora: "FITNESSPLUS",
      grupoContrato: "GRUPO D",
      descricao: "PLANO ACADEMIA ILIMITADO",
      abreviacao: "FITILIM",
      entidade: "GYM WORLD",
      codigoExternoF: "EXTF004",
      codigoExternoE: "EXTE004",
      ordemVisualizacao: "4",
      vrCusto: "100,00",
      vrVenda: "180,00",
      carencia: "0",
      mesAniReajuste: "01",
      tipoReajuste: "ANUAL",
    },
    {
      codigo: "005",
      tipoPlano: "ENTRETENIMENTO",
      operadora: "CINEMAX",
      grupoContrato: "GRUPO E",
      descricao: "STREAMING DE FILMES PREMIUM",
      abreviacao: "CINEMAXPREM",
      entidade: "CINEMAX ONLINE",
      codigoExternoF: "EXTF005",
      codigoExternoE: "EXTE005",
      ordemVisualizacao: "5",
      vrCusto: "25,00",
      vrVenda: "49,90",
      carencia: "0",
      mesAniReajuste: "07",
      tipoReajuste: "ANUAL",
    },
];

  return (
    <>
    <main>
      <div>
      <h2 className={styles.TitleRepresentante}>
          <i className="fa-solid fa-bags-shopping"></i>
          Combo Produto/Serviço
      </h2>
      </div>
      <div className={styles.beneficiariosContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                  Buscar por
              </h5>
              <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                <i className="fa-solid fa-filter-slash"></i> Limpar filtro
              </button>
            </div>
            <div className={styles.divConteudo}>
                <UseInputPadrao
                  label="Status" 
                  type="select"
                  identifier="status"
                  value={status}
                  onChange={setStatus}
                  inputRef={statusRef}
                  options={opStatus}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao
                  label="Tipo de plano" 
                  type="select"
                  identifier="tipoPlano"
                  value={tipoPlano}
                  onChange={setTipoPlano}
                  inputRef={tipoPlanoRef}
                  options={opPlanos}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao
                  label="Operadora" 
                  type="select"
                  identifier="operadora"
                  value={operadora}
                  onChange={setOperadora}
                  inputRef={operadoraRef}
                  options={opOperadora}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao
                  label="Grupo Contratual" 
                  type="select"
                  identifier="grupoContratual"
                  value={grupoContratual}
                  onChange={setGrupoContratual}
                  inputRef={grupoContratualRef}
                  options={opGrupoContratual}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                />
            </div>
            <div className={styles.divConteudo}>
              <UseInputPadrao
                label="Pesquisar" 
                type="select"
                identifier="pesquisar"
                value={pesquisar}
                onChange={setPesquisar}
                inputRef={pesquisarRef}
                options={opPesquisar}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
              />
              <UseInputPadrao
                label="Texto" 
                identifier="texto"
                value={texto}
                onChange={setTexto}
                inputRef={textoRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0.5}
              />
            </div>
            <div className={styles.tabela} id="tabelaPadrao-container">
              <TabelaPadrao 
                id="statusAssociado"
                columns={tableCollumns}
                data={tableData}
                options={{
                  cardsPerPage: 10,
                  fileName: "Produto_Servico",
                  rowOnClick: handleRowClick,
                  showPagination: true,
                  showHeader: true,
                  showFooter: true,
                  toolbar: true,
                  toolbarPosition: "right",
                  showPaginationSwitch: true,
                  showSearch: () => filtrarDados(),
                  showRefresh: true,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showExport: true,
                  showFilter: true,
                  showGuardaCampos: true,
                  paginationEnabled: true,
                  additionalButtons: [{
                    title: "Adicionar Produto/Serviço",
                    icon: "fa-regular fa fa-plus",
                    onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Manutencao}/${jsonRoute.ComboProduto}/${jsonRoute.NovoComboProdutoServico}`)
                  }]
                  }}
                />
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  )
}

export default ComboProduto;