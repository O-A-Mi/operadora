import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../components/InputPadrao';
import TabelaPadrao from '../../../../../components/TabelaPadrao';
import { useNavigate, Outlet, useLocation } from 'react-router';
import { MensagemForm } from "../../../../../utils/mockConf";
import { handleResizeTabela } from '../../../../../utils/functions';
import { useLoader } from '../../../../../context';

const Mensagem = () => {
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    const location = useLocation();

    const [currentTab, setCurrentTab] = useState('email');
    const [tabelaDadosCompletos, setTabelaDadosCompletos] = useState([]);
    const [tabelaDadosFiltrados, setTabelaDadosFiltrados] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [status, handleStatusChange] = useState('');
    const [pesquisar, handlePesquisarChange] = useState('');
    const [texto, handleTextoChange] = useState('');
    
    const TITULO_MENSAGENS = {
        text: 'Mensagens',
        icon: 'fa-solid fa-comment-dots'
    };

    const tabs = [
        { id: 'email', name: 'Email', icon: 'fa-solid fa-envelope' },
        { id: 'sms', name: 'SMS', icon: 'fa-solid fa-comment' },
        { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp' }
    ];

    const statusOptions = [
        { value: "enviado", label: "Enviado" },
        { value: "erro", label: "Erro" },
        { value: "lida", label: "Lida" },
        { value: "entregue", label: "Entregue" }
    ];

    const carregarDados = useCallback(() => {
        showLoader();
        try {
            const dados = MensagemForm.Mensagens.tabela || [];
            setTabelaDadosCompletos(dados);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            hideLoader();
        }
    }, [showLoader, hideLoader]);

    const aplicarFiltros = useCallback(() => {
        showLoader();
        try {
            const dadosBase = tabelaDadosCompletos.filter(item => item.tipo === currentTab);
            
            const dadosFiltrados = dadosBase.filter(item => {
                const statusMatch = !status || String(item.status).toLowerCase().includes(status.toLowerCase());
                const pesquisarMatch = !pesquisar || String(item.destinatario || '').toLowerCase().includes(pesquisar.toLowerCase());
                const textoMatch = !texto || String(item.mensagem || item.assunto || '').toLowerCase().includes(texto.toLowerCase());
                
                return statusMatch && pesquisarMatch && textoMatch;
            });
            
            setTabelaDadosFiltrados(dadosFiltrados);
        } catch (error) {
            console.error("Erro ao filtrar dados:", error);
        } finally {
            hideLoader();
        }
    }, [tabelaDadosCompletos, currentTab, status, pesquisar, texto, showLoader, hideLoader]);

    const limparFiltros = () => {
        handleStatusChange('');
        handlePesquisarChange('');
        handleTextoChange('');
    };

    const handleNovoCadastroClick = () => {
        navigate('cadastro', { state: { tipo: currentTab } });
    };

    const handleRowClick = (linha) => {
        const id = linha.id;
        if (!id) return;
        navigate('cadastro', { state: { id, tipo: currentTab } });
    };


    useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('mensagens-ferramenta-tabela', 'mensagens-ferramenta-tabela-container');
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('mensagens-ferramenta-tabela', 'mensagens-ferramenta-tabela-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    useEffect(() => {
        aplicarFiltros();
    }, [currentTab, aplicarFiltros]);

    // useEffect(() => {
    //     const resizeHandler = () => {
    //         handleResizeTabela('mensagens-ferramenta-tabela', 'mensagens-ferramenta-container');
    //     };
    //     window.addEventListener("resize", resizeHandler);
    //     requestAnimationFrame(resizeHandler);
    //     return () => window.removeEventListener("resize", resizeHandler);
    // }, []);

    const columns = MensagemForm.Mensagens.colunasTabela[currentTab] || [];
    const options = MensagemForm.Mensagens.optionsTabela;

    const isCadastroRoute = location.pathname.includes('/cadastro');

    const isActiveTab = (tab) => {
        return currentTab === tab.id;
    };

    const getActiveTabName = () => {
    const activeTabObj = tabs.find(tab => isActiveTab(tab));
        if (activeTabObj) return activeTabObj.name;
        return tabs[0].name;
    };

    return (
        <div id='mensagens-ferramenta-container' className={styles.configuracaoPadraoContainer}>
            {!isCadastroRoute && (
                <>  
                    <section className={styles.filtroTabelaField}>
                        <div className={styles.filtroTabelaContent}>
                            <div className={styles.beneficiariosTitleTela}>
                                <h2 className='titlePadrao'>
                                    <p className={styles.title}><i className={TITULO_MENSAGENS.icon}></i></p>
                                    {TITULO_MENSAGENS.text}
                                </h2>
                            <div className={styles.tesourariaHeader}>
                                <div className={styles.subsectionButtons}>
                                    {tabs.map((tab) => (
                                        <button
                                        key={tab.id}
                                        className={`${styles.buttonPage} ${
                                            isActiveTab(tab) ? styles.active : ''
                                        }`}
                                        onClick={() => setCurrentTab(tab.id)}
                                        >
                                            <i className={tab.icon} />
                                            {tab.name} 
                                        </button>
                                    ))}
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                    <section className='molduraTab'>
                        <div className={styles.TabelaField} id='mensagens-ferramenta-tabela-container'>
                            <div className={styles.filtroTabelaHeader}>
                                <h5 className={styles.filtroTabelaTitle}>
                                    <i className="fa-solid fa-filter"></i>
                                    Buscar Por:
                                </h5>
                                <button className={styles.filtroTabelaButton} onClick={limparFiltros}>
                                    <i className="fa-solid fa-filter-slash"></i> Limpar filtro
                                </button>
                            </div>
                            <div className={styles.centerInputs}>
                                <div className={styles.rowInputs}>
                                    <UseInputPadrao 
                                        label="Status"
                                        identifier="status" 
                                        value={status}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        type="select"
                                        options={statusOptions}
                                        width={isMobile ? 100 : 25}
                                        gap={isMobile ? 0 : 0.333}
                                    />
                                    <UseInputPadrao
                                        label="Pesquisar"
                                        identifier="pesquisar"
                                        value={pesquisar}
                                        onChange={(e) => handlePesquisarChange(e.target.value)}
                                        type="text"
                                        width={isMobile ? 100 : 25}
                                        gap={isMobile ? 0 : 0.333}

                                    />
                                    <UseInputPadrao
                                        label="Texto"
                                        identifier="texto"
                                        value={texto}
                                        onChange={(e) => handleTextoChange(e.target.value)}
                                        type="text"
                                        width={isMobile ? 100 : 50}
                                        gap={isMobile ? 0 : 0.333}

                                    />
                                </div>
                            </div>

                            <TabelaPadrao
                                tabelaId="mensagens-ferramenta-tabela"
                                columns={columns}
                                data={tabelaDadosFiltrados}
                                options={{
                                    ...options,
                                    showSearch: aplicarFiltros,
                                    additionalButtons: [
                                        {
                                            title: 'Novo Cadastro',
                                            icon: 'fa fa-plus',
                                            onClick: handleNovoCadastroClick,
                                        }
                                    ],
                                    rowOnClick: handleRowClick,
                                }}
                            />
                        </div>
                    </section>
                </>
            )}
            <Outlet />
        </div>
    );
};

export default Mensagem;