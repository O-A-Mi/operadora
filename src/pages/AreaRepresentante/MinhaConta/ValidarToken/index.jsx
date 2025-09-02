import styles from './styles.module.css';
import { useAtom } from 'jotai';
import toastMessage from '../../../../assets/toast-ui/toast';
import TabelaPadrao from '../../../../components/TabelaPadrao';
import { carregarInfos } from "../../../../db/carregarGeral.jsx";
import { useEffect, useState, useCallback, useContext } from 'react';
import ModalAgendaAtendimento from './components/modalAtendimento.jsx';
import ModalValidacao from './components/modalValidacao.jsx';
import { BackscreenContext, useLoader } from "../../../../context";
import { idAtom } from '../../../../context/jotai';
import { InputField, InputPadrao, UseInputMask } from '../../../../components/InputPadrao';
import { converterParaData } from '../../../../utils/functions.js';

export default function ValidarToken() {
    const [token, tokenChange, tokenRef] = UseInputMask(null, "text");
    const [tokenTabela, setTokenTabela] = useState("");
    const [pedido, pedidoChange, pedidoRef] = UseInputMask(null, "text");
    const [pesquisar, pesquisarChange, pesquisarRef] = UseInputMask(null, "text");
    const [paciente, pacienteChange, pacienteRef] = UseInputMask(null, "text");
    const [dataInicio, setDataInicio] = useState("")
    const [dataFinal, setDataFinal] = useState("")
    const [status, statusChange, statusRef] = UseInputMask(null, "text");
    const [modalState, setModalState] = useState(false);
    const [modalValidacaoState, setModalValidacaoState] = useState(false);
    const [initialData, setInitialData] = useState({paciente:"", procedimento:"", tipo:"", pedido:"", estabelecimento:""});
    const [id] =  useAtom(idAtom);
    const [pacientes, setPaciente] = useState([])
    const [tokenModal, setTokenModal] = useState(null);
    const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
    const { showLoader, hideLoader } = useLoader();
    const [atualizarDados, setAtualizarDados] = useState(false);

    function carregarPacientes(dados) {
        let resp = JSON.parse(dados);
        //console.log('carregarPacientes', resp);
        const dadosFormatados = resp.map((item) => ({
            paciente: {
                value: buildPaciente(item.nome, item.cpf),
                sortableValue: item.nome,
                searchableValue: {
                    nome: item.nome,
                    cpf: item.cpf,
                },
            },
            token: buildToken(item.nome, item.numero_pedido, item.tipo_consulta,item.token_consulta, item.token_compra, item.token_estabelecimento, item.status_andamento, item.data_agendamento),
            status: {
                value: buildStatus(item.status_andamento, item.status_andamento == 'Pendente' ? item.data_compra : item.data_agendamento),
                sortableValue: item.status_andamento,
            },
            data_acao:{
                value:buildDataAcao(item.status_andamento, item.data_compra, item.data_agendamento),
                sortableValue: item.status_andamento == 'Pendente' ? item.data_compra : item.data_agendamento
            },
            atendimento:{
                value:buildAtendimento(item.codigo_externo, item.tipo_consulta),
                sortableValue: item.codigo_externo
            }
        }));
        setTabelaDados(dadosFormatados);
        setPaciente(dadosFormatados);
        hideLoader();
    }

    const openModal = useCallback(() => {
        setModalState(true);
        showBackscreen();
    }, [showBackscreen]);

    const closeModal = useCallback(() => {
          setModalState(false);
          hideBackscreen();
    }, [hideBackscreen]);

     const closeModalValidacao = useCallback(() => {
        setModalValidacaoState(false);
        hideBackscreen();
    }, [hideBackscreen]);
    
    const openModalValidacao = useCallback(() => {
        setModalValidacaoState(true);
        showBackscreen();
    }, [showBackscreen]);

    const limparFiltro = () => {
        tokenChange({ target: { value: "" } });
        pedidoChange({ target: { value: "" } });
        pesquisarChange({ target: { value: "" } });
        pacienteChange({ target: { value: "" } });
        statusChange({ target: { value: "" } });
        setDataInicio("");
        setDataFinal("");
    
        if (tokenRef.current) tokenRef.current.value = "";
        if (pedidoRef.current) pedidoRef.current.value = "";
        if (pesquisarRef.current) pesquisarRef.current.value = "";
        if (pacienteRef.current) pacienteRef.current.value = "";
        if (statusRef.current) statusRef.current.value = "";
    };

    const [stateBusca, setStateBusca] = useState({
        token: true,
        pedido: false
    });

    const handleStateBusca = (action, e) => {
        e.preventDefault();

        if (stateBusca[action]) return;

        setStateBusca((prev) => ({
            token: action === "token",
            pedido: action === "pedido"
        }));
    };

    const [responsive, setResponsive] = useState(window.innerWidth < 991);

    useEffect(() => {
        const handleResize = () => setResponsive(window.innerWidth < 991);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const buildPaciente = (name, cpf) => {
        return (
            <div className={styles.tabelaPaciente}>
                <div className={styles.pacienteInfo}>
                    <span className={styles.pacienteName}>{name}</span>
                    <span className={styles.pacienteCNPJ}>{cpf}</span>
                </div>
            </div>
        );
    }
     useEffect(() => {
  }, [tokenTabela]);

    const buildToken = (paciente, pedido, tipo, token_consulta, token, token_estabelecimento, status_andamento, data_agendamento ) => {
        let data = {
            paciente: paciente, 
            pedido: pedido, 
            tipo: tipo, 
            token:token, 
            token_estabelecimento:token_estabelecimento, 
            status_andamento:status_andamento,
            data_agendamento:data_agendamento
        }
     
        const handleValidarToken = (e) => {
            const input = e.target.parentElement.querySelector("input");
            const valorAtual = input.value;
            if(valorAtual == token_consulta) {
                e.preventDefault();
                setInitialData(data);
                openModal();
            }else{
                toastMessage("Token inválido", "error");
            }
        }

        const handleReagendar = (e) => {
            e.preventDefault();
            setInitialData(data);
            openModal();
        }

        const handleFinalizar = (e) => {
            e.preventDefault();
            openModalValidacao();
            setTokenModal(token)
        }

        const handleButtonAllowed = (e) => {
            setTokenTabela(e.target.value.toUpperCase());
            const valor = e.target.value.toUpperCase();
            const button = e.target.parentElement.parentElement.querySelector(`.${styles.tabelaTokenButton}`);

            if(e.target.value.length > 0) {
                button.classList.add(styles.allowed);
            } else {
                button.classList.remove(styles.allowed);
            }
        }
        
        if(status_andamento=='Agendado'){
            return (
                <div className={styles.tabelaToken}>
                    <button className={styles.tabelaTokenButtonReagendar} onClick={(e) =>handleReagendar(e) }>
                        Reagendar
                    </button>
                    <button className={styles.tabelaTokenButtonReagendar} onClick={(e) =>handleFinalizar(e) }>
                        Finalizar
                    </button>
                </div>
            );
        } else{
            return (
                <div className={styles.tabelaToken}>
                    <div className={styles.tabelaTokenInput}>
                        <input type="text" placeholder="Token" onChange={(e) => handleButtonAllowed(e)}/>
                        <i className="fas fa-key" />
                    </div>
                    <button className={styles.tabelaTokenButton} onClick={(e) =>handleValidarToken(e) }>
                        Validar Token
                    </button>
                </div>
            );
        }
    }

    const buildStatus = (status, date) => {
        const formatDate = (date) => {
            if(date =='-' || date == null) return ''
            return (
                `${date?.split(' ')[0]} às ${date?.split(' ')[1]}`
            )
        }

        return (
            <div className={styles.tabelaStatusField} style={
                status == 'Finalizado' ? { '--cor-dinamica': 'var(--green-500)'} : status == 'Pendente' ? { '--cor-dinamica': 'var(--orange-500)'} : status == 'Agendado' ? { '--cor-dinamica': 'var(--blue-500)'}:{ '--cor-dinamica': 'var(--red-500)'}
            }>
                <span className={styles.tabelaStatus}>{status}</span>
                {formatDate(date) != '' && <span className={styles.tabelaStatusDate}>{`${status == 'Pendente' ? 'Pago em ' : ''}${formatDate(date)}`}</span>}
            </div>
        );
    }

    const buildDataAcao = (status, dtcompra, dtagendamento) => {
        return (
            <div className={styles.tabelaAtendimento}>
                <section className={styles.tabelaAtendimentoField}>
                    <span>Compra:</span>
                    {status == 'Agendado' && <span>Agendamento:</span>}
                </section>
                <section className={styles.tabelaAtendimentoField}>
                    <span dangerouslySetInnerHTML={{ __html: `${dtcompra}`}} />
                    {status == 'Agendado' && <span dangerouslySetInnerHTML={{ __html: `${dtagendamento}`}} />}
                </section>
            </div>
        );
    }

    const buildAtendimento = (codigo, tipo) => {
        return (
            <div className={styles.tabelaAtendimento}>
                <section className={styles.tabelaAtendimentoField}>
                    <span>Tipo:</span>
                    <span>Código:</span>
                </section>
                <section className={styles.tabelaAtendimentoField}>
                    <span dangerouslySetInnerHTML={{ __html: `${tipo}`}} />
                    <span dangerouslySetInnerHTML={{ __html: `${codigo}`}} />
                </section>
            </div>
        );
    }

    useEffect(() => {
        window.carregarPacientes = carregarPacientes;
        carregarInfos('carregarValidacaoToken', {
            campo: '*',
            tabela: 'VW_SITE_VALIDAR_TOKEN',
            condicao: `TOKEN_ESTABELECIMENTO =  '${id}'`}, 'carregarPacientes');
    },[atualizarDados]);

    const tabelaColumns = [
        {
            value: "paciente",
            name: "Paciente",
        },
        {
            value: "token",
            name: "Token / Autorização",
            sortable: false,
        },
        {
            value: "status",
            name: "Status",
        },
        {
            value: "atendimento",
            name: "Atendimento",
        },
        {
            value: "data_acao",
            name: "Data",
            visible: false
        },
    ];



    const statusApoio = [
        { value: "pendente", label: "Pendente" },
        { value: "agendado", label: "Agendado" },
    ];

    const [tabelaDados, setTabelaDados] = useState([]);
    const [filtroDados, setFiltroDados] = useState([]);
    const [pacientesArray, setPacientesArray] = useState([]);
    const [statusOptions, setStatusOptions] = useState([])

    useEffect(() => {
        //setTabelaDados(dadosTabela);
    }, []);
    
    useEffect(() => {
        let arrayPacientes = [];
        tabelaDados.map((row) => {
            let flag = true;
            arrayPacientes.map(item => {
                if(item.value == row.paciente.sortableValue && flag){
                flag = false;
                }
            });
            if(flag){
                arrayPacientes.push({
                value: row.paciente.sortableValue,
                label: row.paciente.sortableValue
                });
            }
        });
    
        setPacientesArray(arrayPacientes);
        setStatusOptions(statusApoio);
        handleBuscar();
    }, [tabelaDados]);

    const handleBuscar = () => {
        const filtro = {
            pesquisar: pesquisarRef.current?.value || "",
            paciente: pacienteRef.current?.value || "",
            status: statusRef.current?.value || "",
            dataInicio: dataInicio || "",
            dataFinal: dataFinal || "",
        };

        const dataInicioFiltro = filtro.dataInicio;
        const dataFinalFiltro = filtro.dataFinal;
        const dadosFiltrados = pacientes.filter((row) => {
            const nomePaciente = row.paciente.searchableValue.nome.toLowerCase();
            const cpfPaciente = row.paciente.searchableValue.cpf.toLowerCase();
            const statusPaciente = row.status.sortableValue.toLowerCase();
            const dataAtendimento = converterParaData(row.data_acao.sortableValue.split(' ')[0]);

            const dataDentroDoIntervalo =
                (!dataInicioFiltro || dataAtendimento >= dataInicioFiltro) &&
                (!dataFinalFiltro || dataAtendimento <= dataFinalFiltro);

            return (
                (filtro.pesquisar === "" || nomePaciente.includes(filtro.pesquisar.toLowerCase()) || cpfPaciente.includes(filtro.pesquisar.toLowerCase())) &&
                (filtro.paciente === "" || nomePaciente === filtro.paciente.toLowerCase()) &&
                (filtro.status === "" || statusPaciente === filtro.status.toLowerCase()) &&
                dataDentroDoIntervalo 
            );
        })
    
        setFiltroDados(dadosFiltrados);
    };

    useEffect(() => {
        const handleResize = () => {
            const tabelaContainer = document.getElementById("tabelaContainer-tabela-validar-token");
            
            if (tabelaContainer && window.innerWidth > 768) {
                const validarTokenContainer = document.querySelector(`.${styles.validarTokenContainer}`);
                const sidebarColumn = validarTokenContainer.parentElement.previousElementSibling;
                
                tabelaContainer.style.maxWidth = `${window.innerWidth - 28 - sidebarColumn.offsetWidth - 24 - 28 - 8}px`;
            }
        };
    
        const debouncedHandleResize = debounce(handleResize, 250);
    
        window.addEventListener("resize", debouncedHandleResize);
    
        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, []);
    
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const handleBuscarToken = () => {
        if(token == "") {
            toastMessage("insira um token", "warning");
            return
        }

        handleBuscar();
        toastMessage(`buscando token ${token}`, "info");
    };

    const handleBuscarPedido = () => {
        if(pedido == "") {
            toastMessage("insira um pedido", "warning");
            return
        }
        
        handleBuscar();
        toastMessage(`buscando pedido ${pedido}`, "info");
    };

    return (
        <>

            <div className={styles.validarTokenContainer}>
                {modalValidacaoState && 
                    <ModalValidacao 
                        isOpen={modalValidacaoState}
                        closeModal={closeModalValidacao}
                        token={tokenModal}
                        setAtualizarDados={setAtualizarDados}
                    />
                }
                  {modalState &&
                    <ModalAgendaAtendimento
                        isOpen={modalState}
                        closeModal={closeModal}
                        initialData={initialData}
                        setAtualizarDados={setAtualizarDados}
                    />}
                <h2 className={styles.validarTokenTitleTela}>Token</h2>
                <p className={styles.validarTokenDescriptionTela}> Faça aqui a validação do Token e acompanhe o agendamento.</p>
                <div className={styles.validarTokenContent}>
                    {/* <section className={styles.buscarTokenField}>
                        <div className={styles.buscarTokenAction}>
                            <button
                                className={`${styles.buscarTokenButton} ${stateBusca.token ? styles.active : ""}`}
                                onClick={(e) => handleStateBusca("token", e)}
                            >
                                <i className="fas fa-key" /> Por Token
                            </button>
                            <button
                                className={`${styles.buscarTokenButton} ${stateBusca.pedido ? styles.active : ""}`}
                                onClick={(e) => handleStateBusca("pedido", e)}
                            >
                                <i className="fas fa-clipboard-list" /> Por Pedido
                            </button>
                        </div>
                        <div className={styles.buscarToken}>
                            <div className={styles.buscarTokenContent}>
                                <img src={ValidarTokenSVG} className={styles.validarTokenSVG} alt="Validar Token"/>
                                {stateBusca.token ? (
                                    <div className={styles.buscarTokenInputField}>
                                        <InputField label="Token" identifier="buscar-token">
                                            <InputPadrao icon="fas fa-key" value={token} onChange={tokenChange} inputRef={tokenRef} placeholder="Digite o token de 4 ou 6 digitos" identifier="buscar-token"/>
                                        </InputField>
                                        <button className={styles.buscarTokenSubmit} onClick={handleBuscarToken}>Buscar</button>
                                    </div>
                                ) : (
                                    <div className={styles.buscarTokenInputField}>
                                        <InputField label="Pedido" identifier="buscar-pedido">
                                            <InputPadrao icon="fas fa-key" value={pedido} onChange={pedidoChange} inputRef={pedidoRef} placeholder="Pedido" identifier="buscar-pedido"/>
                                        </InputField>
                                        <button className={styles.buscarTokenSubmit} onClick={handleBuscarPedido}>Buscar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section> */}
                    
                    <section className={styles.filtroTabelaField}>
                        <div className={styles.filtroTabelaContent}>
                            
                            <div className={styles.filtroTabelaHeader}>
                                <h3 className={styles.filtroTabelaTitle}>Buscar por:</h3>
                                <button className={styles.filtroTabelaButton} onClick={limparFiltro}>Limpar filtro</button>
                            </div>
                            <div className={styles.filtroTabelaBody}>
                                {responsive ? (
                                    <>
                                        <InputField label="Pesquisar" identifier="pesquisar">
                                            <InputPadrao icon="fas fa-magnifying-glass" value={pesquisar} onChange={pesquisarChange} inputRef={pesquisarRef} placeholder="Digite nome ou CPF" identifier="pesquisar" upperCase/>
                                        </InputField>

                                        <InputField label="Paciente" identifier="paciente">
                                            <InputPadrao type='select' value={paciente} onChange={pacienteChange} inputRef={pacienteRef} placeholder="Paciente" identifier="paciente" options={pacientesArray}/>
                                        </InputField>

                                        <InputField label="Status" identifier="status">
                                            <InputPadrao type='select' value={status} onChange={statusChange} inputRef={statusRef} placeholder="Status" identifier="status" options={statusOptions}/>
                                        </InputField>

                                        <InputField label="Data Inicial" identifier="data-inicial">
                                            <InputPadrao type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} identifier="data-inicial" />
                                        </InputField>

                                        <InputField label="Data Final" identifier="data-final">
                                            <InputPadrao type='date' value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} identifier="data-final" />
                                        </InputField>
                                    </>
                                ) : (
                                    <>
                                        <InputField label="Pesquisar" identifier="pesquisar" width={50}>
                                            <InputPadrao icon="fas fa-magnifying-glass" value={pesquisar} onChange={pesquisarChange} inputRef={pesquisarRef} placeholder="Digite nome ou CPF" identifier="pesquisar" upperCase/>
                                        </InputField>

                                        <InputField label="Paciente" identifier="paciente" width={50}>
                                            <InputPadrao type='select' value={paciente} onChange={pacienteChange} inputRef={pacienteRef} placeholder="Paciente" identifier="paciente" options={pacientesArray} containerStyle = {{ height: '100%' }} />
                                        </InputField>

                                        <InputField label="Data Inicial" identifier="data-inicial" width={33.33333333333333} gap={0.6666666666666667}>
                                            <InputPadrao type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} identifier="data-inicial" />
                                        </InputField>

                                        <InputField label="Data Final" identifier="data-final" width={33.33333333333333} gap={0.6666666666666667}>
                                            <InputPadrao type='date' value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} identifier="data-final" />
                                        </InputField>

                                        <InputField label="Status" identifier="status" width={33.33333333333333} gap={0.6666666666666667}>
                                            <InputPadrao type='select' value={status} onChange={statusChange} inputRef={statusRef} placeholder="Status" identifier="status" options={statusOptions} containerStyle = {{ height: '100%' }}  />
                                        </InputField>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                    <section className={styles.tabelaField}>
                        <TabelaPadrao 
                            tabelaId="tabela-validar-token"
                            columns={tabelaColumns}
                            data={filtroDados}
                            options={{
                                cardsPerPage: 5,
                                showSearch: handleBuscar,
                                showToggleView: true,
                                showColumnsSelector: true,
                                showPaginationSwitch: true,
                            }}
                        />
                    </section>
          
                </div>
            
            </div>
        </>
    );
}