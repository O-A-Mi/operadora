import React from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../components';
import styles from "../Dependente/styles.module.css"
import { TabelaPadrao } from '../../../../../../components';
import { jsonRoute } from '../../../../../../utils/json';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

function Dependente() {
  //Variaveis
  const [status, setStatus, statusRef] = UseInputMask();
  const [pesquisar,setPesquisar,pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const navigate = useNavigate();
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
    {value: "status", name: "Status", align: "center", sortable: true},
    {value: "nome", name: "Nome", align:"center",sortable: true},
    {value: "cpfCnpj", name:"CPF/CNPJ", align: "center", sortable: true},
    {value: "associado", name: "Associado", align: "center", sortable: true},
    {value: "proposta", name: "Proposta"},
    {value: "carteirinha", name:"Carteirinha", align: "center", sortable: true},
    {value: "rg", name:"RG", align: "center", sortable: true},
    {value: "idade segurado", name:"Idade Segurado", align: "center", sortable: true},
    {value: "estado civil", name:"Estado Civil", align: "center", sortable: true},
    {value: "profissao/categoria", name:"Profissão/Categoria", align: "center", sortable: true},
    {value: "sexo", name:"Sexo", align: "center", sortable: true},
    {value: "cep", name:"CEP", align: "center", sortable: true},
    {value: "endereco", name:"Endereço", align: "center", sortable: true},
    {value: "num", name:"Nº", align: "center", sortable: true},
    {value: "complemento", name:"Complemento", align: "center", sortable: true},
    {value: "bairro", name:"Bairro", align: "center", sortable: true},
    {value: "cidade", name:"Cidade", align: "center", sortable: true},
    {value: "uf", name:"UF", align: "center", sortable: true},
    {value: "telefone1", name:"Telefone 1", align: "center", sortable: true},
    {value: "telefone2", name:"Telefone 2", align: "center", sortable: true},
    {value: "celular1", name:"Celular 1", align: "center", sortable: true},
    {value: "celular2", name:"Celular 2", align: "center", sortable: true},
    {value: "email1", name:"E-mail 1", align: "center", sortable: true},
    {value: "email2", name:"E-mail 2", align: "center", sortable: true},
    {value: "dtCriacao", name:"Dt. Criação", align: "center", sortable: true},

];

const tableData = [
  {
    status: "Ativo",
    nome: "João da Silva",
    cpfCnpj: "479.241.250-19",
    associado: "Sim",
    proposta: "12345",
    carteirinha: "987654",
    rg: "12.345.678-9",
    "idade segurado": 35,
    "estado civil": "Solteiro",
    "profissao/categoria": "Engenheiro",
    sexo: "Masculino",
    cep: "27110-260",
    endereco: "Rua Angélica",
    num: "21",
    complemento: "Apto 101",
    bairro: "Nossa Senhora de Santana",
    cidade: "Barra do Piraí",
    uf: "RJ",
    telefone1: "8831582442",
    telefone2: "7921105625",
    celular1: "7921105625",
    celular2: "9427836126",
    email1: "joao.silva@teste.com",
    email2: "joao2@teste.com",
    dtCriacao: "2025-08-19"
  },
  {
    status: "Inativo",
    nome: "Maria Oliveira",
    cpfCnpj: "123.456.789-00",
    associado: "Não",
    proposta: "54321",
    carteirinha: "654321",
    rg: "98.765.432-1",
    "idade segurado": 28,
    "estado civil": "Casada",
    "profissao/categoria": "Professora",
    sexo: "Feminino",
    cep: "27200-000",
    endereco: "Av. Central",
    num: "150",
    complemento: "",
    bairro: "Centro",
    cidade: "Volta Redonda",
    uf: "RJ",
    telefone1: "9922113344",
    telefone2: "9911223344",
    celular1: "9988776655",
    celular2: "9977665544",
    email1: "maria.oliveira@teste.com",
    email2: "",
    dtCriacao: "2024-11-15"
  },
  {
    status: "Ativo",
    nome: "Carlos Pereira",
    cpfCnpj: "987.654.321-00",
    associado: "Sim",
    proposta: "67890",
    carteirinha: "112233",
    rg: "11.222.333-4",
    "idade segurado": 42,
    "estado civil": "Divorciado",
    "profissao/categoria": "Advogado",
    sexo: "Masculino",
    cep: "27050-123",
    endereco: "Rua das Flores",
    num: "50",
    complemento: "Sala 2",
    bairro: "Vila Nova",
    cidade: "Resende",
    uf: "RJ",
    telefone1: "9888776655",
    telefone2: "9877665544",
    celular1: "9966554433",
    celular2: "",
    email1: "carlos.pereira@teste.com",
    email2: "c.pereira2@teste.com",
    dtCriacao: "2025-01-10"
  },
  {
    status: "Ativo",
    nome: "Ana Souza",
    cpfCnpj: "321.654.987-11",
    associado: "Não",
    proposta: "11122",
    carteirinha: "445566",
    rg: "22.333.444-5",
    "idade segurado": 30,
    "estado civil": "Solteira",
    "profissao/categoria": "Médica",
    sexo: "Feminino",
    cep: "27120-500",
    endereco: "Av. das Américas",
    num: "300",
    complemento: "Bloco B",
    bairro: "Jardim das Palmeiras",
    cidade: "Itatiaia",
    uf: "RJ",
    telefone1: "9911223344",
    telefone2: "",
    celular1: "9988776655",
    celular2: "9977665544",
    email1: "ana.souza@teste.com",
    email2: "",
    dtCriacao: "2025-03-05"
  },
  {
    status: "Inativo",
    nome: "Pedro Lima",
    cpfCnpj: "456.789.123-22",
    associado: "Sim",
    proposta: "33344",
    carteirinha: "778899",
    rg: "33.444.555-6",
    "idade segurado": 50,
    "estado civil": "Casado",
    "profissao/categoria": "Engenheiro Civil",
    sexo: "Masculino",
    cep: "27250-400",
    endereco: "Rua do Sol",
    num: "75",
    complemento: "",
    bairro: "Vila Rica",
    cidade: "Barra Mansa",
    uf: "RJ",
    telefone1: "9922334455",
    telefone2: "9911442233",
    celular1: "9988445566",
    celular2: "9977554433",
    email1: "pedro.lima@teste.com",
    email2: "p.lima2@teste.com",
    dtCriacao: "2024-09-20"
  }
];



  return (
    <>
    <main className={styles.beneficiariosContainer}>
    <div>
      <h2 className={styles.TitleRepresentante}>
            <i className="fa-solid fa-users"></i>
            Dependente   
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
                      />

                      <UseInputPadrao 
                      label="Pesquisar"
                      type="select"
                      identifier="pesquisar"
                      value={pesquisar}
                      onChange={setPesquisar}
                      inputRef={pesquisarRef}
                      options={opPesquisar}
                      />

                      <UseInputPadrao
                      label="Texto" 
                      identifier="texto"
                      value={texto}
                      onChange={setTexto}
                      inputRef={textoRef}
                      /> 
            </div>
          <TabelaPadrao 
                id="statusAssociado"
                columns={tableCollumns}
                data={tableData}
                options={{
                    cardsPerPage: 10,
                    fileName: "Segurado",
                    showPagination: true,
                    showHeader: true,
                    showFooter: true,
                    toolbar: true,
                    toolbarPosition: "right",
                    showPaginationSwitch: true,
                    showSearch: true,
                    showRefresh: true,
                    showToggleView: true,
                    showColumnsSelector: true,
                    showExport: true,
                    showFilter: true,
                    showGuardaCampos: true,
                    paginationEnabled: true,
                    
                    
                }}
            />
        </div>
      </section>
      </div>
    </main>
    </>
    
  )
}

export default Dependente;