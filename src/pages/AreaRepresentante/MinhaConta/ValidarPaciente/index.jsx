import styles from './styles.module.css';
import { useAtomValue, useAtom } from 'jotai';
import Carteirinha from './components/Carteirinha';
import { BackscreenContext, useLoader } from '../../../../context';
import { idAtom, userInfoAtom } from '../../../../context/jotai.jsx';
import TabelaPadrao from '../../../../components/TabelaPadrao';
import { carregarInfos } from "../../../../db/carregarGeral.jsx";
import { useEffect, useState, useContext, useCallback } from 'react';
import { InputField, InputPadrao, UseInputMask } from '../../../../components/InputPadrao';

export default function ValidarPaciente () {
    const [pacientes, setPacientes] = useState([]);
    const [plano, setPlano] = useState(null);
    const [id] =  useAtom(idAtom);

    const [pesquisar, pesquisarChange, pesquisarRef] = UseInputMask("", null, "");
    
    const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
    const { showLoader, hideLoader } = useLoader();
    const [modalState, setModalState] = useState(false);
   
    const [responsive, setResponsive] = useState(window.innerWidth < 768);
    const [token, setToken] = useState(null);
    const [tabelaDados, setTabelaDados] = useState([]);
    const [filtroDados, setFiltroDados] = useState([]);
    
    const openModal = useCallback(() => {
        setModalState(true);
        showBackscreen();
    }, [showBackscreen]);


    const closeModal = useCallback(() => {
        setModalState(false);
        hideBackscreen();
    }, [hideBackscreen]);

    const tabelaColumns = [
        { value: "paciente", name: "Paciente" },
        { value: "plano", name: "Plano" },
        { value: "status", name: "Status" }
    ];

    useEffect(() => {
    window.carregarPacientes = carregarPacientes;
        carregarInfos('carregarPacientes', {
        campo: '*',
        tabela: 'VW_SITE_BUSCAR_PACIENTE',
        condicao:`TOKEN_ESTABELECIMENTO =  '${id}'`}, 'carregarPacientes'
    );
    },[]);

    function carregarPacientes(dados) {
        let resp = JSON.parse(dados);
        //console.log("carregou validar",resp);
        resp = resp.map((item) => {
            return {
                paciente: {
                    value: buildPaciente(item.nome, item.cpf,item.token_proposta,item.plano),
                    sortableValue: item.nome,
                    searchableValue: {
                        nome: item.nome,
                        cpf: item.cpf,
                    },
                },
                plano: {
                    value: buildPlano(item.plano),
                    sortableValue: item.plano,
                },
                status: {
                    value: buildStatus(item.status),
                    sortableValue: item.status,
                },
            };
        })
        setPacientes(resp)
        hideLoader();
    }

    
    useEffect(() => {
        const handleResize = debounce(() => {
            setResponsive(window.innerWidth < 768);
            const tabelaContainer = document.getElementById("tabelaContainer-representante-validar-pacientes");
                
            if (tabelaContainer && window.innerWidth > 768) {
                const validarPacienteContainer = document.querySelector(`.${styles.validarPacienteContainer}`);
                const sidebarColumn = validarPacienteContainer.parentElement.previousElementSibling;
                
                tabelaContainer.style.maxWidth = `${window.innerWidth - 28 - sidebarColumn.offsetWidth - 24 - 28 - 8}px`;
            }
        }, 250);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleBuscar = () => {
        const termoBusca = pesquisarRef.current?.value?.toLowerCase() || "";
        
        const pacientesFiltrados = pacientes.filter((paciente) => {
            const nome = paciente.paciente.searchableValue.nome.toLowerCase();
            const cpf = paciente.paciente.searchableValue.cpf.toLowerCase();
            
            return nome.includes(termoBusca) || cpf.includes(termoBusca);
        });
        
        setFiltroDados(pacientesFiltrados);
    };

    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    };

    useEffect(() => {
        const todosModaisFechados = !modalState
    
        if (todosModaisFechados) {
          hideBackscreen();
        }
    }, [responsive]);

    const buildPaciente = (name, cpf, token_proposta,plano) => {
        return (
            <div className={styles.tabelaPaciente}>
                <div className={styles.tabelaPacienteInfo}>
                    <div className={styles.avatar}>
                        <img src="/img/Avatar.png" alt="Avatar do usuário" />
                    </div>
                    <div className={styles.pacienteInfo}>
                        <span className={styles.pacienteName}>{name}</span>
                        <span className={styles.pacienteCNPJ}>{cpf}</span>
                    </div>
                </div>
                <button
                    className={styles.carteirinhaButton}
                    onClick={() => {
                        // trocar pelo id do paciente ou outro dado mais apropriado
                        setToken(token_proposta);
                        setPlano(plano);
                        openModal();
                    }}
                >
                    <i className="fas fa-id-card"></i>
                    <span>Carteirinha</span>
                </button>
            </div>
        );
    }

    const buildPlano = (plano) => {
        return (
            <div className={styles.tabelaPlano}>
                <span className={styles.tabelaPlanoTitle}>
                    Assinatura Atual
                </span>
                <span className={styles.tabelaPlanoValue} dangerouslySetInnerHTML={{ __html: `${plano.replace('Saúde', 'Saúde <strong>')} </strong>` }} />
            </div>
        );
    }

    const buildStatus = (status) => {
        return (
            <div className={styles.tabelaStatusField} style={
                status == 'ATIVO' ? { '--cor-dinamica': 'var(--green-500'} : status == 'SUSPENSO' ? { '--cor-dinamica': 'var(--orange-400'} : { '--cor-dinamica': 'var(--red-400'}
            }>
                <span className={styles.tabelaStatus}>{status}</span>
            </div>
        );
    }

    useEffect(() => {
        setTabelaDados(pacientes);
    }, []);
    
    return (
        <>
           
            <div className={styles.validarPacienteContainer}>
                <h2 className={styles.validarPacienteTitleTela}>Validar Paciente</h2>
                <p className={styles.validarPacienteDescriptionTela}>Validar se o paciente está cadastrado na base da Dr. Hoje.</p>
                <div className={styles.validarPacienteContent}>
                    <section className={styles.filtroTabelaField}>
                        <div className={styles.filtroTabelaContent}>
                            <div className={styles.filtroTabelaHeader}>
                                <h3 className={styles.filtroTabelaTitle}>Buscar por:</h3>
                            </div>
                            <div className={styles.filtroTabelaBody}>
                                <InputField label="Pesquisar" identifier="pesquisar" width={responsive ? 100 : 70} gap={1}>
                                    <InputPadrao icon="fas fa-magnifying-glass"value={pesquisar} onChange={pesquisarChange} placeholder="Digite nome ou CPF" className={styles.textInput} identifier="pesquisar" inputRef={pesquisarRef} />
                                </InputField>
                            </div>
                        </div>
                    </section>
                    
                    <section className={styles.tabelaField}>
                        <TabelaPadrao 
                            tabelaId="representante-validar-pacientes"
                            columns={tabelaColumns}
                            data={filtroDados}
                            options={{
                                showSearch: handleBuscar,
                                cardsPerPage: 10,
                                showPagination: true,
                                showHeader: true,
                                showToggleView: true,
                                showColumnsSelector: true,
                                showPaginationSwitch: true,
                            }}
                        />
                    </section>
                </div>
            </div>
            
            {modalState && 
                <Carteirinha 
                    isOpen={modalState}
                    token={token}
                    plano={plano}
                    closeModal={closeModal}
                />
            }
            
        </>
    )
};