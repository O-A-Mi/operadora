import React from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../components';
import styles from "./styles.module.css"
import { TabelaPadrao } from '../../../../../../components';
import { jsonRoute } from '../../../../../../utils/json';
import { useNavigate } from 'react-router';
import { useEffect, useState, useCallback } from 'react';
import { limparFiltros } from '../../../../../../utils/functions';

function PlanoSaude() {
  //variaveis
  const [status, setStatus, statusRef] = UseInputMask();
  const [pesquisar,setPesquisar,pesquisarRef] = UseInputMask();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [texto, setTexto, textoRef] = UseInputMask();
  const navigate = useNavigate();


  //funções
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
    handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.PlanoSaude}/${jsonRoute.NovoPlanoSaude}`);
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

  const opPesquisar = [
    {label:"Matricula", value:"matricula"},
    {label:"Associado", value:"associado"},
    {label:"Proposta", value:"proposta"},
    {label:"CPF/CNPJ", value:"cpf"},
    {label:"Contato", value:"contato"},
    {label:"Bairro", value:"bairro"},
    {label:"Endereço", value:"endereco"},
    {label:"Cidade", value:"Cidade"},
    {label:"Estado", value:"estado"},
    {label:"E-mail", value:"email"},
  ];

  const tableCollumns = [
    {value: "descricao", name: "Descrição", align: "center", sortable: true},
    {value: "genero", name: "Gênero", align:"center",sortable: true},
    {value: "vrCusto", name: "Vr. Custo", align:"center",sortable: true},
    {value: "vrVenda", name: "Vr. Venda", align:"center",sortable: true},
    {value: "carencia", name: "Carência", align:"center",sortable: true},
    {value: "carenciaPromo", name: "Carência Promocional", align:"center",sortable: true},
    {value: "carenciaOp", name: "Carência advindo de outras operadoras", align:"center",sortable: true},
    {value: "fornecedor", name: "Fornecedor", align:"center",sortable: true},
];

const tableData = [
    {
      descricao: "CLUBE DE COMPRAS",
      genero: "FAMILIA",
      vrCusto: "120,50",
      vrVenda: "199,90",
      carencia: "30",
      carenciaPromo: "15",
      carenciaOp: "45",
      fornecedor: "JULIA E SILVANA LOCAÇÕES",
    },
    {
      descricao: "PLANO DE SAÚDE",
      genero: "ADULTO",
      vrCusto: "300,00",
      vrVenda: "450,00",
      carencia: "60",
      carenciaPromo: "30",
      carenciaOp: "90",
      fornecedor: "SAÚDE MAIS LTDA",
    },
    {
      descricao: "SEGURO RESIDENCIAL",
      genero: "FAMILIA",
      vrCusto: "80,00",
      vrVenda: "120,00",
      carencia: "10",
      carenciaPromo: "10",
      carenciaOp: "30",
      fornecedor: "SEGURANÇA TOTAL BRASIL",
    },
    {
      descricao: "CURSO DE INGLÊS ONLINE",
      genero: "EDUCACAO",
      vrCusto: "50,00",
      vrVenda: "99,90",
      carencia: "15",
      carenciaPromo: "7",
      carenciaOp: "30",
      fornecedor: "GLOBAL LANGUAGES",
    },
    {
      descricao: "STREAMING DE FILMES",
      genero: "ENTRETENIMENTO",
      vrCusto: "25,00",
      vrVenda: "49,90",
      carencia: "0",
      carenciaPromo: "0",
      carenciaOp: "0",
      fornecedor: "CINEMAX ONLINE",
    }, 
];



  return (
    <>
      <main className={styles.beneficiariosContainer}>
        <div>
          <h2 className={styles.TitleRepresentante}>
              <i className="fa-solid fa-bag-shopping"></i>
              Plano de Saúde               
          </h2>
        </div>
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
                    label="Status" 
                    type="select"
                    identifier="status"
                    value={status}
                    onChange={setStatus}
                    inputRef={statusRef}
                    options={opStatus}
                    width={isMobile ? 100 : 20}
                    gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                    label="Pesquisar"
                    type="select"
                    identifier="pesquisar"
                    value={pesquisar}
                    onChange={setPesquisar}
                    inputRef={pesquisarRef}
                    options={opPesquisar}
                    width={isMobile ? 100 : 20}
                    gap={isMobile ? 0 : 0.5}
                  />
                
                  <UseInputPadrao
                    label="Texto" 
                    identifier="texto"
                    value={texto}
                    onChange={setTexto}
                    inputRef={textoRef}
                    width={isMobile ? 100 : 80}
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
                        onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.PlanoSaude}/${jsonRoute.NovoPlanoSaude}`)
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

export default PlanoSaude;