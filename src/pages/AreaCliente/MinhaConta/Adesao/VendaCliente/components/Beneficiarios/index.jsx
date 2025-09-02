import { StepperPadrao, TogglePadrao, TabelaPadrao } from "../../../../../../../components/index.jsx";
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { UseInputPadrao, InputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao/index.jsx'
import React from 'react';
import { handleResizeTabela } from '../../../../../../../utils/functions.js';
import arrayEstadosComCidades from '../../../../../../../utils/estados-com-cidades.js';

function Beneficiarios() {

    const [textoBusca, textoBuscaChange, textoBuscaRef] = UseInputMask();
    const [matricula, matriculaChange, matriculaRef] = UseInputMask();
    const [closeModal, setCloseModal] = useState(false);
    const [filtroDados, setFiltroDados] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [dadosCarregados, setDadosCarregados] = useState(true);
    const [currentTab, setCurrentTab] = useState("Titular");
    const [displayedData, setDisplayedData] = useState([]);


    const showLoader = () => console.log('Loader visível');
    const hideLoader = () => console.log('Loader invisível');
    const carregarDados = () => {
        console.log('Carregando dados...');
        setDadosCarregados(true);
    };


    const limparFiltros = (filtrosParaLimpar) => {
        filtrosParaLimpar.forEach(({ setter, ref }) => {
            setter("");
            if (ref && ref.current) {
                ref.current.value = "";
            }
        });
    };


    const [tableData, setTableData] = useState([
        {
            tipo: "Titular",
            carteirinha: "123456",
            beneficiario: "João Silva",
            cpf: "123.456.789-00",
            idade: 30,
            valor: "150,00",
            dt_inclusao: "2023-01-15",
            dt_inativacao: null,
            dt_bloqueio: null,
            acao_judicial: false,
        },
        {
            tipo: "Dependente",
            carteirinha: "654321",
            beneficiario: "Maria Santos",
            cpf: "987.654.321-11",
            idade: 25,
            valor: "100,00",
            dt_inclusao: "2023-02-20",
            dt_inativacao: null,
            dt_bloqueio: null,
            acao_judicial: true,
        },
    ]);


    const tableColumns = [
        { value: "tipo", name: "Tipo", align: "left", sortable: true },
        { value: "carteirinha", name: "Carteirinha", align: "left", sortable: true },
        { value: "beneficiario", name: "Beneficiário", align: "left", sortable: true },
        { value: "cpf", name: "CPF", align: "center", sortable: true },
        { value: "idade", name: "Idade", align: "center", sortable: true },
        { value: "valor", name: "R$", align: "right", sortable: true },
        { value: "dt_inclusao", name: "Dt. Inclusão", align: "center", sortable: true },
        { value: "dt_inativacao", name: "Dt. Inativação", align: "center", sortable: true },
        { value: "dt_bloqueio", name: "Dt. Bloqueio", align: "center", sortable: true },
        { value: "acao_judicial", name: "Ação Judicial", align: "center", sortable: false },
        { value: "acoes", name: "Ações", align: "center", sortable: false },
    ];

 
    const matriculasOptions = [
        { value: "", label: "Todas" },
        { value: "123456", label: "123456" },
        { value: "654321", label: "654321" },
    ];


    const filtrarBeneficiarios = () => {
        if (!dadosCarregados) {
            carregarDados();
            return;
        }
        try {
            showLoader();
            const filtro = {
                texto: textoBuscaRef.current?.value || "",
                matricula: matriculaRef.current?.value || "",
            };

            const dadosFiltrados = tableData.filter((row) => {
                const nome = row.beneficiario?.toLowerCase() || "";
                const cpf = row.cpf?.toLowerCase() || "";
                const matriculaRow = row.carteirinha?.toLowerCase() || "";
                const tipo = row.tipo?.toLowerCase() || "";
                
               
                const tipoMatch = tipo === currentTab.toLowerCase();
                
          
                const textoMatch = filtro.texto === "" || nome.includes(filtro.texto.toLowerCase()) || cpf.includes(filtro.texto.toLowerCase());
                
                
                const matriculaMatch = filtro.matricula === "" || matriculaRow === filtro.matricula.toLowerCase();
                
                return tipoMatch && textoMatch && matriculaMatch;
            });
            
            
            setDisplayedData(dadosFiltrados);
            setFiltroDados(dadosFiltrados);
        } catch (error) {
            hideLoader();
            console.error("Erro ao filtrar beneficiários:", error);
            alert("Ocorreu um erro inesperado ao tentar filtrar dados.");
        } finally {
            hideLoader();
        }
    };


    const limparFiltro = () => {
        limparFiltros([
            { setter: textoBuscaChange, ref: textoBuscaRef },
            { setter: matriculaChange, ref: matriculaRef },
        ]);
       
        setDisplayedData(tableData);
        setFiltroDados([]);
    };

 
    useEffect(() => {
        const cleanupHandler = () => handleResizeTabela('cliente-adesao', 'cliente-adesao-container');
        window.addEventListener("resize", cleanupHandler);
        
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);

       
        setDisplayedData(tableData);

        return () => {
            window.removeEventListener("resize", cleanupHandler);
            window.removeEventListener("resize", handleResize);
        };
    }, [tableData]); 

    // const closeModalBeneficiario = () => {
    //     setCloseModal(false);
    // }

    // const handleDataReturn = (data) => {
    //     console.log(data);
    // }

    return (
        <>
            <div className={styles.vendaClienteContent}>
                <p className={`${styles.vendaClienteTitleTela} ${styles.active}`}>
                    <i className="fa-solid fa-user"></i> 
                    Beneficiários
                </p>
            </div>
            <div className={styles.vendaClienteContainer} style={{ maxWidth: '100%' }}>
                {/* <div className={styles.vendaClienteContentButton}>
                    <p className={styles.vendaClienteDescriptionTela}>
                        Adicione Beneficiários
                    </p>
                    <button className={styles.infoButton} onClick={() => { setCloseModal(!closeModal) }} value={closeModal} >
                        <div>
                            <i className="fa fa-plus"></i>
                        </div>
                        Adicionar
                    </button>
                </div> */}
                
                <div className={styles.ClienteVenda}    id='cliente-adesao-container'>
                        <div>
                            <div className={styles.filtroTabelaHeader}>
                                <h5 className={styles.filtroTabelaTitle}>
                                    <i className="fa-solid fa-filter"></i>
                                    Buscar por:
                                </h5>
                                <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                                    <i className="fa-solid fa-filter-slash"></i>Limpar filtro
                                </button>
                            </div>
                        <TabelaPadrao
                            columns={tableColumns}
                            data={displayedData}
                            tabelaId={'cliente-adesao'}
                            options={{
                                toolbar: true,
                                showPaginationSwitch: true,
                                showSearch: true,
                                showRefresh: true,
                                showToggleView: true,
                                showColumnsSelector: true,
                                showExport: true,
                                showFilter: true,
                                showGuardaCampos: true,
                                additionalButtons: [],
                                toolbarComponent: () => (
                                    <div className={styles.filtroTabelaBody}>
                                        <UseInputPadrao
                                            label="Pesquisar"
                                            identifier="pesquisar"
                                            value={matricula}
                                            onChange={matriculaChange}
                                            inputRef={matriculaRef}
                                            type="select"
                                            options={matriculasOptions}
                                            width={isMobile ? 100 : 30}
                                            gap={isMobile ? 0 : 0.333}
                                        />
                                        <UseInputPadrao
                                            label="Texto"
                                            identifier="texto"
                                            value={textoBusca}
                                            onChange={textoBuscaChange}
                                            inputRef={textoBuscaRef}
                                            width={isMobile ? 100 : 35}
                                            gap={isMobile ? 0 : 0.333}
                                            inputButtonRight={[{
                                                text: 'Pesquisar',
                                                className: styles.searchButton,
                                                onClick: filtrarBeneficiarios,
                                            }]}
                                        />
                                        <button className={styles.advancedSearchButton}>
                                            Busca Avançada <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Beneficiarios;
{/* {closeModal &&(
    <div style={{ position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', zIndex: '3', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div style={{ width: '80vw', height: '90vh', backgroundColor: 'var(--branco)', borderRadius: '1rem', overflow: 'auto', padding: '2rem' }}>
            <ModalCadastroBeneficiario closeModal={closeModalBeneficiario} onDataReturn={handleDataReturn} />
        </div>
    </div>
)} */}



// function ModalCadastroBeneficiario({ closeModal, onDataReturn }){
//         const [sexo, setSexo] = useState('');
//         const [vigencia, setVigencia] = useState('');
//     const [aditivoCarencia, setAditivoCarencia] = useState('');
//     const [cpf, setCpf] = UseInputMask('999.999.999-99', 'number');
//     const [nome, setNome] = useState('');
//     const [email, setEmail] = useState('');
//     const [confirmacaoEmail, setConfirmacaoEmail] = useState('');
//     const [dtNascimento, setDtNascimento] = useState('');
//     const [nomeMae, setNomeMae] = useState('');
//     const [telefone, setTelefone] = UseInputMask('(99) 9999-9999', 'number');
//     const [celular, setCelular] = UseInputMask('(99) 99999-9999', 'number');
//     const [estadoCivil, setEstadoCivil] = useState('');
//     const [cns, setCns] = UseInputMask('999 9999 9999 9999', 'number');
//     const [numDocumento, setNumDocumento] = useState('');
//     const [orgaoEmissor, setOrgaoEmissor] = useState('');
//     const [municipioNascimento, setMunicipioNascimento] = useState('');
//     const [reducaoCarencia, setReducaoCarencia] = useState('');
//     const [carteirinha, setCarteirinha] = useState('');
//     const [enviarDeclaracao, setEnviarDeclaracao] = useState('');
//     const [cep, setCep] = UseInputMask('99999-999', 'number');
//     const [endereco, setEndereco] = useState('');
//     const [numero, setNumero] = useState('');
//     const [complemento, setComplemento] = useState('');
//     const [bairro, setBairro] = useState('');
//     const [cidade, setCidade] = useState('');
//     const [uf, setUf] = useState('');
//     const [tipoDocumento, setTipoDocumento] = useState('');
//     const [arquivo, setArquivo] = useState(null);
//     const [listaCidades, setListaCidades] = useState([]);

//     const handleSearch = () => alert('Botão de busca clicado!');
//     const optionsSexo = [ { value: 'M', label: 'Masculino' }, { value: 'F', label: 'Feminino' } ];
//     const optionsSimNao = [ { value: 'S', label: 'Sim' }, { value: 'N', label: 'Não' } ];
//     const optionsEstadoCivil = [ { value: 'solteiro', label: 'Solteiro(a)' }, { value: 'casado', label: 'Casado(a)' } ];

//     const sendData = () => {
//         const dadosBeneficiario = {
//             tipo: 'Titular',
//             carteirinha: carteirinha,
//             beneficiario: nome,
//             cpf: cpf,
//             idade: null,
//             valor: null,
//             dataInclusao: new Date().toISOString().split('T')[0],
//             dataInativacao: null,
//             dataBloqueio: null,
//             acaoJudicial: false,
//         };

//         onDataReturn(dadosBeneficiario);
//     }

//     const estadosArray = arrayEstadosComCidades.map((estado) => ({
//         label: estado.nomeEstado,
//         value: estado.sigla,
//         id: estado.id
//     }));

//     useEffect(() => {
//         if (uf) {
//             const estadoSelecionado = arrayEstadosComCidades.find(e => e.sigla === uf);
//             if (estadoSelecionado) {
//                 const cidades = estadoSelecionado.cidades.map(cidade => ({
//                     label: cidade.nomeCidade,
//                     value: cidade.nomeCidade,
//                     id: cidade.id_cidade
//                 }));
//                 setListaCidades(cidades);
//             }
//         } else {
//             setListaCidades([]);
//         }
//     }, [uf]);

//     return (
//         <div className={styles.vendaClienteContainer}>
//             <div className={styles.planRow}>
//                 <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                     <h1 className={styles.vendaClienteTitleTela}>Beneficiário Titular</h1>
//                 </div>
//                 <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)', justifyContent: 'center', alignItems: 'end' }}>
//                     <button type="submit" className={styles.closeButton} onClick={closeModal}>
//                         <i className='fa fa-xmark-circle'></i>
//                     </button>
//                 </div>
//             </div>
//             <div className={styles.vendaClienteContentBorder}>
//                 <div className={styles.planContent}>
//                     <h2 className={styles.vendaClienteTitleTela} style={{ margin: '0 0 1rem 0', width: '100%' }}>Dados Cadastrais</h2>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell}>
//                             <UseInputPadrao label="Sexo" type='select' options={optionsSexo} value={sexo} onChange={(e) => setSexo(e.target.value)} required={true} />
//                         </div>
//                         <div className={styles.planCell}>
//                             <UseInputPadrao label="Vigência" type='date' value={vigencia} onChange={(e) => setVigencia(e.target.value)} required={true} />
//                         </div>
//                         <div className={styles.planCell}>
//                             <UseInputPadrao label="Aditivo de Redução de Carência" type='select' options={optionsSimNao} value={aditivoCarencia} onChange={(e) => setAditivoCarencia(e.target.value)} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="CPF" type='text' value={cpf} onChange={setCpf} required={true} inputButtonRight={[{ icon: 'fas fa-search', onClick: handleSearch }]} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Nome" type='text' value={nome} onChange={(e) => setNome(e.target.value)} required={true} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="E-mail" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Confirmação do E-mail" type='email' value={confirmacaoEmail} onChange={(e) => setConfirmacaoEmail(e.target.value)} required={true} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Dt. Nascimento" type='date' value={dtNascimento} onChange={(e) => setDtNascimento(e.target.value)} required={true} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Nome da Mãe" type='text' value={nomeMae} onChange={(e) => setNomeMae(e.target.value)} required={true} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Telefone" type='tel' value={telefone} onChange={setTelefone} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Celular" type='tel' value={celular} onChange={setCelular} required={true} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Estado civil" type='select' options={optionsEstadoCivil} value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Nº Cadastro Nacional de Saúde" type='text' value={cns} onChange={setCns} required={true} inputButtonRight={[{ icon: 'fas fa-external-link-alt', onClick: () => window.open('about:blank', '_blank') }]} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Número Doc. Identificação" type='text' value={numDocumento} onChange={(e) => setNumDocumento(e.target.value)} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Orgão Emissor" type='text' value={orgaoEmissor} onChange={(e) => setOrgaoEmissor(e.target.value)} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Município de Nascimento / UF" type='text' value={municipioNascimento} onChange={(e) => setMunicipioNascimento(e.target.value)} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Redução de carência" type='select' options={optionsSimNao} value={reducaoCarencia} onChange={(e) => setReducaoCarencia(e.target.value)} required={true} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Carteirinha" type='text' value={carteirinha} onChange={(e) => setCarteirinha(e.target.value)} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Enviar Declaração de Saúde?" type='select' options={optionsSimNao} value={enviarDeclaracao} onChange={(e) => setEnviarDeclaracao(e.target.value)} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className={styles.vendaClienteContentBorder}>
//                 <div className={styles.planContent} style={{ marginTop: 0 }}>
//                     <h2 className={styles.vendaClienteTitleTela} style={{ margin: '0 0 1rem 0', width: '100%' }}>Endereço Residencial</h2>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(30% - 1rem)' }}>
//                             <UseInputPadrao label="CEP" type='text' value={cep} onChange={setCep} required={true} inputButtonRight={[{ icon: 'fas fa-search', onClick: handleSearch }]} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(70% - 1rem)' }}>
//                             <UseInputPadrao label="Endereço" type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} required={true} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(30% - 1rem)' }}>
//                             <UseInputPadrao label="Número" type='text' value={numero} onChange={(e) => setNumero(e.target.value)} required={true} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(70% - 1rem)' }}>
//                             <UseInputPadrao label="Complemento" type='text' value={complemento} onChange={(e) => setComplemento(e.target.value)} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Bairro" type='text' value={bairro} onChange={(e) => setBairro(e.target.value)} required={true} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Cidade" type='text' value={cidade} onChange={(e) => setCidade(e.target.value)} required={true} />
//                         </div>
//                     </div>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell}>
//                             <UseInputPadrao label="UF" type='select' options={[]} value={uf} onChange={(e) => setUf(e.target.value)} required={true} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <div className={styles.planContent} style={{ marginTop: 0 }}>
//                     <h2 className={styles.vendaClienteTitleTela} style={{ margin: '0 0 1rem 0', width: '100%' }}>Documentação</h2>
//                     <div className={styles.planRow}>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Tipo de Documento" type='select' options={[]} value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} />
//                         </div>
//                         <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
//                             <UseInputPadrao label="Arquivo" type='file' onChange={(e) => setArquivo(e.target.files[0])} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className={styles.vendaClienteContentButton}>
//                 <button onClick={sendData} className={styles.infoButton}>
//                     GRAVAR
//                 </button>
//             </div>
//         </div>
//     );
// }
