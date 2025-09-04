import { InputPadrao, UseInputMask } from "../../../../../../components/InputPadrao";
import { TabelaPadrao } from "../../../../../../components";
import { useState, useEffect } from "react";
import { UseInputPadrao } from "../../../../../../components/InputPadrao";
import styles from "../Contratante/styles.module.css"
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../utils/json";
import { limparFiltros } from "../../../../../../utils/functions";

const Contratante = () => {
    //Variaveis
    const navigate = useNavigate();
    const [status, setStatus, statusRef] = UseInputMask();
    const [situacao, setSituacao, situacaoRef] = UseInputMask();
    const [tipoAssocioado, setTipoAssocioado, tipoAssocioadoRef] = UseInputMask();
    const [formaEnvioBoleto, setFormaEnvioBoleto, formaEnvioBoletoRef] = UseInputMask();
    const [texto, setTexto, textoRef] = UseInputMask();
    const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    //Funções
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


    //Listas
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

    const opSituacao = [
        {label: "Todos", value: "todos"},
        {label: "Com Proposta Adesão", value: "com proposta adesao"},
        {label: "Sem Proposta Adesão", value: "sem proposta adesao"}
    ];
    
    const opTipoAssocioado = [
        {label: "Todos", value: "todos"},
        {label: "Pessoa Fisica", value: "pessoa fisica"},
        {label: "Pessoa Juridica", value: "pessoa juridica"}
    ];

    const opFormaEnvioBoleto = [
        {label: "Todos", value: "todos"},
        {label: "Correio", value: "correio"},
        {label: "Motoqueiro", value: "motoqueiro"},
        {label: "SMS", value:"sms"},
        {label: "E-mail", value:"e-mail"},
        {label: "WhatsApp", value: "whatsapp"}
    ];

    const opPesquisar = [
        {label: "ID", value: "id"},
        {label: "Matricula", value: "matricula"},
        {label: "Tipo Pessoa", value: "tipoPessoa"},
        {label: "Nome", value: "nome"},
        {label: "CPF/CNPJ", value: "cpfCnpj"},
        {label: "Endereço", value: "endereco"},
        {label: "Número", value: "numero"},
        {label: "Complemento", value: "complemento"},
        {label: "Bairro", value: "bairro"},
        {label: "Cidade", value: "cidade"},
        {label: "CEP", value: "cep"},
        {label: "UF", value: "uf"},
        {label: "Telefone 1", value: "telefone1"},
        {label: "Telefone 2", value: "telefone2"},
        {label: "Celular 1", value: "celular1"},
        {label: "Celular 2", value: "celular2"},
        {label: "E-mail 1", value: "email1"},
        {label: "E-mail 2", value: "email2"},
        {label: "Representante", value: "representante"},
        {label: "Contato", value: "contato"},
        {label: "Forma de envio boleto ", value: "formaEnvioBoleto"},
    ]

    const tableCollumns = [
        {value: "id", name: "ID", align: "center", sortable: true},
        {value: "matricula", name: "Matricula", align: "center", sortable: true},
        {value: "tipoPessoa", name: "Tipo Pessoa"},
        {value: "nome", name: "Nome", align:"center",sortable: true},
        {value: "cpfCnpj", name:"CPF/CNPJ", align: "center", sortable: true},
        {value: "endereco", name:"Endereço", align: "center", sortable: true},
        {value: "numero", name:"Nº", align: "center", sortable: true},
        {value: "complemento", name:"Complemento", align: "center", sortable: true},
        {value: "bairro", name:"Bairro", align: "center", sortable: true},
        {value: "cidade", name:"Cidade", align: "center", sortable: true},
        {value: "cep", name:"CEP", align: "center", sortable: true},
        {value: "uf", name:"UF", align: "center", sortable: true},
        {value: "telefone1", name:"Telefone 1", align: "center", sortable: true},
        {value: "telefone2", name:"Telefone 2", align: "center", sortable: true},
        {value: "celular1", name:"Celular 1", align: "center", sortable: true},
        {value: "celular2", name:"Celular 2", align: "center", sortable: true},
        {value: "email1", name:"E-mail 1", align: "center", sortable: true},
        {value: "email2", name:"E-mail 2", align: "center", sortable: true},
        {value: "representante", name:"Representante", align: "center", sortable: true},
        {value: "contato", name:"Contato", align: "center", sortable: true},
        {value: "formaEnvioBoleto", name:"Forma envio boleto", align: "center", sortable: true},
    ];

    const tableData = [
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "183711",
            matricula: "0012342",
            tipoPessoa: "",
            nome: "",
            cpfCnpj: "992.753.400-05",
            endereco: "Rua Minha",
            numero: "100",
            complemento:"",
            bairro:"Andrade Araujo",
            cidade:"Belford Roxo",
            cep:"26135-580",
            uf:"RJ",
            telefone1:"9226049743",
            telefone2:"9525500929",
            celular1:"6826666337",
            celular2:"",
            email1:"email.email@email.com",
            email2:"",
            representante:"",
            contato:"",
            formaEnvioBoleto:""
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
        {
            id: "1",
            matricula: "0012462",
            tipoPessoa: "Pessoa Fisica",
            nome: "João",
            cpfCnpj: "479.241.250-19",
            endereco: "Rua Angélica",
            numero: "21",
            complemento:"",
            bairro:"Nossa Senhora de Santana",
            cidade:"Barra do Piraí",
            cep:"27110-260",
            uf:"RJ",
            telefone1:"8831582442",
            telefone2:"7921105625",
            celular1:"7921105625",
            celular2:"9427836126",
            email1:"teste.teste@teste.com",
            email2:"",
            representante:"TESTE",
            contato:"TESTE",
            formaEnvioBoleto:"Correio"
        },
    ]


    return(
        <>
        <div className={styles.beneficiariosContainer}>
            <div>
                <h2 className={styles.TitleRepresentante}>
                    <i className="fa-solid fa-address-card"></i>
                    Contratante
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
                            label ="Status"
                            identifier="status"
                            value={status}
                            onChange={setStatus}
                            inputRef={statusRef}
                            type="select"
                            options={opStatus}
                            width={isMobile ? 100 : 33}
                            gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                            label="Situacao" 
                            type="select"
                            identifier="situacao" 
                            value={situacao}
                            onChange={setSituacao}
                            inputRef={situacaoRef}
                            options={opSituacao}
                            width={isMobile ? 100 : 33}
                            gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                            label="Tipo Associado" 
                            type="select"
                            identifier="tipoAssocioado"
                            value={tipoAssocioado}
                            onChange={setTipoAssocioado}
                            inputRef={tipoAssocioadoRef}
                            options={opTipoAssocioado}
                            width={isMobile ? 100 : 33}
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
                            width={isMobile ? 100 : 33}
                            gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                            label="Texto" 
                            identifier="texto"
                            value={texto}
                            onChange={setTexto}
                            inputRef={textoRef}
                            width={isMobile ? 100 : 33}
                            gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                            label="Forma Envio Boleto" 
                            type="select"
                            identifier="formaEnvioBoleto"
                            value={formaEnvioBoleto}
                            onChange={setFormaEnvioBoleto}
                            inputRef={formaEnvioBoletoRef}
                            options={opFormaEnvioBoleto}
                            width={isMobile ? 100 : 33}
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
                                    showExport: true,
                                    fileName: "Associados",
                                    showHeader: true,
                                    showFooter: true,
                                    toolbar: true,
                                    toolbarPosition: "right",
                                    showPaginationSwitch: true,
                                    showSearch: true,
                                    showRefresh: true,
                                    showToggleView: true,
                                    showColumnsSelector: true,
                                    showFilter: true,
                                    showGuardaCampos: true,
                                    paginationEnabled: true,
                                    additionalButtons: [{
                                        title: "Adicionar Associado",
                                        icon: "fa-regular fa fa-plus",
                                        onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.Contratante}/${jsonRoute.NovoContratante}`)
                                    }]
                                    
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}

export default Contratante;
