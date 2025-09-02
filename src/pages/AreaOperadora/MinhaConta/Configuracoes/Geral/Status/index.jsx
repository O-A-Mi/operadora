import React, { useEffect, useState, useCallback } from 'react';
import styles from "./styles.module.css";
import { useNavigate, Outlet, useLocation } from 'react-router';
import TabelaPadrao from '../../../../../../components/TabelaPadrao';
import { StatusMock } from "../../../../../../utils/mockConf";
import { handleResizeTabela } from '../../../../../../utils/functions';
import { useLoader } from '../../../../../../context';
import { UseInputPadrao } from "../../../../../../components/InputPadrao";

function StatusGeral(){
     const { showLoader, hideLoader } = useLoader();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const navigate = useNavigate();
    const location = useLocation();

    const [tabelaDadosCompletos, setTabelaDadosCompletos] = useState([]);
    const [tabelaDadosFiltrados, setTabelaDadosFiltrados] = useState([]);

    const [descricaoFiltro, setDescricaoFiltro] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('');

    const TITULO_STATUS = {
        text: 'Status',
        icon: 'fa-solid fa-circle-check'
    };

    const carregarDados = useCallback(() => {
        showLoader();
        try {
            const dados = StatusMock.Status.tabela || [];
            setTabelaDadosCompletos(dados);
            setTabelaDadosFiltrados(dados);
        } catch (error) {
            console.error("Erro ao carregar dados dos status:", error);
        } finally {
            hideLoader();
        }
    }, [showLoader, hideLoader]);

    const aplicarFiltros = useCallback(() => {
        showLoader();
        try {
            const dadosFiltrados = tabelaDadosCompletos.filter(item => {
                const descricaoMatch = !descricaoFiltro || String(item.descricao || '').toLowerCase().includes(descricaoFiltro.toLowerCase());
                const tipoMatch = !tipoFiltro || String(item.tipo || '').toLowerCase().includes(tipoFiltro.toLowerCase());
                return descricaoMatch && tipoMatch;
            });
            setTabelaDadosFiltrados(dadosFiltrados);
        } catch (error) {
            console.error("Erro ao filtrar dados dos status:", error);
        } finally {
            hideLoader();
        }
    }, [tabelaDadosCompletos, descricaoFiltro, tipoFiltro, showLoader, hideLoader]);

    const limparFiltros = () => {
        setDescricaoFiltro('');
        setTipoFiltro('');
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
        const resizeHandler = () => {
            handleResizeTabela('status-tabela-padrao', 'status-container');
        };
        window.addEventListener("resize", resizeHandler);
        requestAnimationFrame(resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const columns = StatusMock.Status.colunasTabela.Descrição || [];
    const options = StatusMock.Status.optionsTabela || {};
    const isCadastroRoute = location.pathname.endsWith('/cadastro');

    return (
        <div id='status-container' className={styles.configuracaoPadraoContainer}>
            {!isCadastroRoute && (
                <>
                    <section className={styles.filtroTabelaField}>
                        <div className={styles.filtroTabelaContent}>
                            <div className={styles.beneficiariosTitleTela}>
                                <h2 className='titlePadrao'>
                                    <p className={styles.title}><i className={TITULO_STATUS.icon}></i>{TITULO_STATUS.text}</p>
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className='moldura'>
                        <div className={styles.TabelaField}>
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
                                    label="Descrição"
                                    identifier="descricaoFiltro"
                                    value={descricaoFiltro}
                                    onChange={(e) => setDescricaoFiltro(e.target.value)}
                                    type="text"
                                    width={isMobile ? 100 : 50}
                                    gap={isMobile ? 0 : 0.5}
                                    placeholder="Digite a descrição para buscar..."
                                />
                                <UseInputPadrao
                                    label="Tipo"
                                    identifier="tipoFiltro"
                                    value={tipoFiltro}
                                    onChange={(e) => setTipoFiltro(e.target.value)}
                                    type="text"
                                    width={isMobile ? 100 : 50}
                                    gap={isMobile ? 0 : 0.5}
                                    placeholder="Digite o tipo para buscar..."
                                />
                            </div>
                            <TabelaPadrao
                                tabelaId="status-tabela-padrao"
                                columns={columns}
                                data={tabelaDadosFiltrados}
                                options={{
                                    ...options,
                                    showSearch: aplicarFiltros,
                                    fileName: 'Relatório_Status',
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
                        </div>
                    </section>
                </>
            )}
            <Outlet />
        </div>
    );
  
};


export default StatusGeral