import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from "./styles.module.css";
import { useNavigate, Outlet, useLocation } from 'react-router';
import TabelaPadrao from '../../../../../components/TabelaPadrao';
import { PerguntaMock } from "../../../../../utils/mockConf";
import { handleResizeTabela } from '../../../../../utils/functions';
import { useLoader } from '../../../../../context';
import { UseInputPadrao } from "../../../../../components/InputPadrao";

const PerguntaDeclaracao = () => {
    const { showLoader, hideLoader } = useLoader();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);    
    const navigate = useNavigate();
    const location = useLocation();
    const didUpdate = useRef(false)

    const [tabelaDadosCompletos, setTabelaDadosCompletos] = useState([]);
    const [tabelaDadosFiltrados, setTabelaDadosFiltrados] = useState([]);

    const [statusFiltro, setStatusFiltro] = useState('');
    const [declaracaoFiltro, setDeclaracaoFiltro] = useState('');
    const [textoFiltro, setTextoFiltro] = useState('');
    
    const TITULO_PERGUNTAS = {
        text: 'Perguntas da Declaração',
        icon: 'fa-solid fa-question-circle'
    };

    const carregarDados = useCallback(() => {
        showLoader();
        try {
            const dados = PerguntaMock.PerguntasDaDeclaracao.tabela || [];
            setTabelaDadosCompletos(dados);
            setTabelaDadosFiltrados(dados);
        } catch (error) {
            console.error("Erro ao carregar dados das perguntas:", error);
        } finally {
            hideLoader();
        }
    }, [showLoader, hideLoader]);

    const aplicarFiltros = useCallback(() => {
        showLoader();
        try {
            const dadosFiltrados = tabelaDadosCompletos.filter(item => {
                const statusMatch = !statusFiltro || String(item.status || '').toLowerCase().includes(statusFiltro.toLowerCase());
                const declaracaoMatch = !declaracaoFiltro || String(item.declaracao || '').toLowerCase().includes(declaracaoFiltro.toLowerCase());
                const textoMatch = !textoFiltro || String(item.pergunta || '').toLowerCase().includes(textoFiltro.toLowerCase());
                return statusMatch && declaracaoMatch && textoMatch; 
            });
            setTabelaDadosFiltrados(dadosFiltrados);
        } catch (error) {
            console.error("Erro ao filtrar dados das perguntas:", error);
        } finally {
            hideLoader();
        }
    }, [tabelaDadosCompletos, statusFiltro, declaracaoFiltro, textoFiltro, showLoader, hideLoader]);

    const limparFiltros = () => {
        setStatusFiltro('');
        setDeclaracaoFiltro('');
        setTextoFiltro('');
        setTabelaDadosFiltrados(tabelaDadosCompletos);
    };

    const handleNovoCadastroClick = () => {
        navigate('cadastro');
    };

    const handleRowClick = (linha) => {
        const id = linha.id;
        if (!id) return;
        navigate('cadastro', { state: { id } });
    };

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    useEffect(() => {
        if (location.state?.newQuestion && !didUpdate.current) {
            const newQuestion = location.state.newQuestion;
            didUpdate.current = true;
            
            setTabelaDadosCompletos(prevData => [...prevData, newQuestion]);
            setTabelaDadosFiltrados(prevData => [...prevData, newQuestion]);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        const resizeHandler = () => {
            handleResizeTabela('perguntas-tabela-padrao', 'perguntas-container');
        };
        window.addEventListener("resize", resizeHandler);
        requestAnimationFrame(resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const columns = PerguntaMock.PerguntasDaDeclaracao.colunasTabela.Descrição || [];
    const options = PerguntaMock.PerguntasDaDeclaracao.optionsTabela || {};
    const isCadastroRoute = location.pathname.includes('/cadastro');
    
    return (
       <div id='perguntas-container' className={styles.configuracaoPadraoContainer}>
            {!isCadastroRoute && (
                <>
                    <section className={styles.filtroTabelaField}>
                        <div className={styles.filtroTabelaContent}>
                            <div className={styles.beneficiariosTitleTela}>
                                <h2 className={styles.title}>
                                    <i className={TITULO_PERGUNTAS.icon}></i>
                                    {TITULO_PERGUNTAS.text}
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className={styles.TabelaField}>
                        <div className={styles.filtroTabelaHeader}>
                            <h5 className={styles.filtroTabelaTitle}>
                                <i className="fa-solid fa-filter"></i>
                                Buscar Por:
                            </h5>
                            <button className={styles.filtroTabelaButton} onClick={limparFiltros}>
                                <i className=" fas fa-filter-slash"></i> Limpar Filtros
                            </button>
                        </div>
                        <div className={styles.filtroTabelaBody}>
                            <UseInputPadrao
                                label="Status"
                                identifier="statusFiltro"
                                value={statusFiltro}
                                onChange={(e) => setStatusFiltro(e.target.value)}
                                type="select"
                                width={isMobile ? 100 : 33.3}
                                gap={isMobile ? 0 : 0.333}
                                options={[
                                    { value: 'ATIVO', label: 'ATIVO' },
                                    { value: 'INATIVO', label: 'INATIVO' },
                                ]}
                            />
                            <UseInputPadrao
                                label="Declaração"
                                identifier="declaracaoFiltro"
                                value={declaracaoFiltro}
                                onChange={(e) => setDeclaracaoFiltro(e.target.value)}
                                type="select"
                                width={isMobile ? 100 : 33.3}
                                gap={isMobile ? 0 : 0.333}
                                options={[
                                    { value: 'DECLARACAO DE SAUDE', label: 'DECLARACAO DE SAUDE' },
                                ]}
                                
                            />
                            <UseInputPadrao
                                label="Texto"
                                identifier="textoFiltro"
                                value={textoFiltro}
                                onChange={(e) => setTextoFiltro(e.target.value)}
                                type="text"
                                width={isMobile ? 100 : 33.3}
                                gap={isMobile ? 0 : 0.333}
                                placeholder="Digite a Pergunta para buscar..."
                            />
                        </div>
                        <TabelaPadrao
                            tabelaId="perguntas-tabela-padrao"
                            columns={columns}
                            data={tabelaDadosFiltrados}
                            options={{
                                ...options,
                                showSearch: aplicarFiltros,
                                fileName: 'Relatório_Perguntas_e_Respostas',
                                showExport: true, 
                                additionalButtons: [
                                    ...(options.additionalButtons || []),
                                    {
                                        title: 'Novo Cadastro',
                                        icon: 'fa fa-plus',
                                        onClick: handleNovoCadastroClick,
                                    },
                                ],
                                rowOnClick: handleRowClick,
                            }}
                        />
                    </section>
                </>
            )}
            <Outlet />
        </div>
    );
};

export default PerguntaDeclaracao;