import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros } from '../../../../../../utils/functions';
import { jsonRoute } from '../../../../../../utils/json';

function Operadora() {
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
    {value: "Codigo", name: "Codigo", align: "center", sortable: true},
    {value: "Descricao", name: "Descrição", align:"center",sortable: true},

  ];

  const tableData = [
    { Codigo: "101", Descricao: "Unimed" },
    { Codigo: "202", Descricao: "Amil" },
    { Codigo: "303", Descricao: "Bradesco Saúde" },
    { Codigo: "404", Descricao: "SulAmérica" },
    { Codigo: "505", Descricao: "NotreDame Intermédica" },
    { Codigo: "606", Descricao: "Porto Seguro Saúde" },
    { Codigo: "707", Descricao: "Golden Cross" },
    { Codigo: "808", Descricao: "Hapvida" },
    { Codigo: "909", Descricao: "São Francisco Saúde" },
    { Codigo: "1001", Descricao: "Allianz Saúde" }
  ];
  
  return (
    <>
      <main className={styles.beneficiariosContainer}>
        <div>
          <h2 className={styles.TitleRepresentante}>
              <i className="fa-solid fa-user-plus"></i>
                Operadora
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
                                showPagination: true,
                                fileName: "Produto_Servico",
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
                                  onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.Operadora}/${jsonRoute.NovaOperadora}`)
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

export default Operadora;