import { useAtomValue, useAtom } from 'jotai';
import styles from './styles.module.css'
import ModalStatus from './components/ModalStatus';
import { BackscreenContext, useLoader } from '../../../../context';
import { idAtom, userInfoAtom } from '../../../../context/jotai.jsx';
import TabelaPadrao from '../../../../components/TabelaPadrao';
import { carregarInfos } from "../../../../db/carregarGeral.jsx";
import { useEffect, useState, useContext, useCallback } from 'react';
import { InputField, InputPadrao, UseInputMask } from '../../../../components/InputPadrao';
import { converterParaData } from '../../../../utils/functions.js';
import { INTERNAL_returnAtomValue } from 'jotai/vanilla/internals';

const Atendimentos = () => {
    const { showLoader, hideLoader } = useLoader();
    const [pesquisar, pesquisarChange, pesquisarRef] = UseInputMask();
    const [paciente, pacienteChange, pacienteRef] = UseInputMask();
    const [dataInicio, setDataInicio] = useState("")
    const [dataFinal, setDataFinal] = useState("")
    const userInfo = useAtomValue(userInfoAtom);
    const [status, statusChange, statusRef] = UseInputMask();
    const [id] =  useAtom(idAtom);

    const limparFiltro = () => {
        pesquisarChange({ target: { value: "" } });
        pacienteChange({ target: { value: "" } });
        statusChange({ target: { value: "" } });
        setDataInicio("");
        setDataFinal("");

        if (pesquisarRef.current) pesquisarRef.current.value = "";
        if (pacienteRef.current) pacienteRef.current.value = "";
        if (statusRef.current) statusRef.current.value = "";
    };

    const [responsive] = useState(false);

    function carregarAtendimentos(dados) {
        let resp = JSON.parse(dados);
        //console.log(resp);
            const dadosFormatados = resp.map((item,index) => ({
            numero: index+1,
            paciente: {
                        value: buildPaciente(item.nome, item.cpf),
                        sortableValue: item.nome,
                        searchableValue: {
                            nome: item.nome,
                            cpf: item.cpf,
                        },
                    },
                    status: {
                        value: buildStatus(item.status_andamento, item.data_agendamento, item.data_execucao),
                        sortableValue: item.status_andamento,
                    },
                        profissional: { 
                        value: buildProfissional(item.nome_profissional, item.numero_conselho, "Clínico geral"),
                        sortableValue: item.nome_profissional, 
                    },
                    atendimento:{
                        value: buildAtendimento(item.tipo_consulta,item.codigo_externo ),
                        sortableValue: item.codigo_externo
                    },
                    data_acao:{
                        value: buildDataAcao(item.data_execucao),
                        sortableValue: item.data_execucao
                    }
                }));
        setTabelaDados(dadosFormatados);
        hideLoader();
    } 

    useEffect(() => {
        const handleResize = () => {
            const tabelaContainer = document.getElementById("tabelaContainer-representante-atendimentos");
            
            if (tabelaContainer && window.innerWidth > 768) {
                const atendimentosContainer = document.querySelector(`.${styles.atendimentosContainer}`);
                const sidebarColumn = atendimentosContainer.parentElement.previousElementSibling;
                
                tabelaContainer.style.maxWidth = `${window.innerWidth - 28 - sidebarColumn.offsetWidth - 24 - 28 - 8}px`;
            }
        };
    
        const debouncedHandleResize = debounce(handleResize, 250);
    
        window.addEventListener("resize", debouncedHandleResize);
    
        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, []);

    useEffect(() => {
        window.carregarAtendimentos = carregarAtendimentos;
        carregarInfos('carregarValidacaoToken', {
            campo: '*',
            tabela: 'VW_SITE_ATENDIMENTO',
            condicao: `TOKEN_ESTABELECIMENTO =  '${id}'`}, 'carregarAtendimentos');
    },[]);
    
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);

    const [modalState, setModalState] = useState(false);
    const [modalData] = useState(null);

    const openModal = useCallback(() => {
        setModalState(true);
        showBackscreen();
    }, [showBackscreen]);

    const closeModal = useCallback(() => {
        setModalState(false);
        hideBackscreen();
    }, [hideBackscreen]);

    const buildPaciente = (name, cpf) => {
        return (
            <div className={styles.tabelaPaciente}>
                <div className={styles.avatar}>
                    <img src="/img/Avatar.png" alt="Avatar do usuário" />
                </div>
                <div className={styles.pacienteInfo}>
                    <span className={styles.pacienteName}>{name}</span>
                    <span className={styles.pacienteCNPJ}>{cpf}</span>
                </div>
            </div>
        );
    }

    const buildDataAcao = (date) => {
        return (
            <div className={styles.tabelaAtendimento}>
                <section className={styles.tabelaAtendimentoField}>
                    <span>{date}</span>
                </section>
            </div>
        );
    }

    const buildAtendimento = (tipo, codigo) => {
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

    const buildProfissional = (nome, registro) => {
        return (
            <div className={styles.tabelaAtendimento}>
                <section className={styles.tabelaProfissionalField}>
                    <span>Nome:</span>
                    <span>Registro:</span>
                </section>
                <section className={styles.tabelaProfissionalField}>
                    <span dangerouslySetInnerHTML={{ __html: `${nome}`}} />
                    <span dangerouslySetInnerHTML={{ __html: `${registro}`}} />
                </section>
            </div>
        );
    }

    const buildStatus = (status, date, date_fim) => {
        const formatDate = (date) => {
            return (
                `${date.split(' ')[0]} às ${date.split(' ')[1]}`
            )
        }

        return (
            <div className={styles.tabelaStatusField} style={
                status == 'Finalizado' ? { '--cor-dinamica': 'var(--green-500)'} : status == 'Pendente' ? { '--cor-dinamica': 'var(--orange-500)'} : status == 'Agendado' ? { '--cor-dinamica': 'var(--blue-500)'}:{ '--cor-dinamica': 'var(--red-500)'}
            }>
                <span className={styles.tabelaStatus}>{status}</span>
                {formatDate(date) != '' && <span className={styles.tabelaStatusDate}>{`${status == 'Pendente' ? 'Pago em ' : ''}${formatDate((status == 'Pendente' || status == 'Agendado') ? date : date_fim)}`}</span>}
            </div>
        );
    }

    const tabelaColumns = [
        {
            value: "numero",
            name: "N°",
        },
        {
            value: "paciente",
            name: "Paciente",
        },
        {
            value: "atendimento",
            name: "Atendimento",
        },
        {
            value: "profissional",
            name: "Profissional",
        },
        {
            value: "status",
            name: "Status",
        },
        {
            value: "data_acao",
            name: "Data",
            visible: false
        },
    ];

    const statusApoio = [
        { value: "agendado", label: "Agendado" },
        { value: "finalizado", label: "Finalizado" },
        { value: "cancelado", label: "Cancelado" },
    ];

    const [tabelaDados, setTabelaDados] = useState([]);
    const [filtroDados, setFiltroDados] = useState([]);
    const [pacientesArray, setPacientesArray] = useState([]);
    const [statusOptions, setStatusOptions] = useState([])

  
    
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
    
        const dadosFiltrados = tabelaDados.filter((row) => {
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

    return (
        <>
            <div className={styles.atendimentosContainer}>
                <h2 className={styles.atendimentosTitleTela}>Atendimentos</h2>
                <p className={styles.atendimentosDescriptionTela}>Acompanhe e busque todos os atendimentos detalhados.</p>
                <div className={styles.atendimentosContent}>    
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
                            tabelaId="representante-atendimentos"
                            columns={tabelaColumns}
                            data={filtroDados}
                            options={{
                                showSearch: handleBuscar,
                                showToggleView: true,
                                showColumnsSelector: true,
                                showPaginationSwitch: true,
                            }}
                        />
                    </section>
                </div>
            </div>
            {modalState &&
                <ModalStatus
                    isOpen={modalState}
                    closeModal={closeModal}
                    data={modalData}
                />
            }
        </>
    )
};

export default Atendimentos