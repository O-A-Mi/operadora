import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../components/InputPadrao';
import TabelaPadrao from '../../../../../components/TabelaPadrao';
import { useNavigate, Outlet, useLocation } from 'react-router';
import { DepartamentoForm } from "../../../../../utils/mockConf"; 
import { handleResizeTabela } from '../../../../../utils/functions';
import { useLoader } from '../../../../../context';

const Departamento = () => {
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    const location = useLocation();

    const [tabelaDadosCompletos, setTabelaDadosCompletos] = useState([]);
    const [tabelaDadosFiltrados, setTabelaDadosFiltrados] = useState([]);

    const [pesquisa, setPesquisa] = useState('');
    const [status, setStatus] = useState('');
    const [descricao, setDescricao] = useState('');
    
    const TITULO_DEPARTAMENTO = {
        text: 'Departamentos',
        icon: 'fa-solid fa-sitemap'
    };

    const carregarDados = useCallback(() => {
        showLoader();
        try {
            const dados = DepartamentoForm.Departamento.tabela || [];
            setTabelaDadosCompletos(dados);
            setTabelaDadosFiltrados(dados);
        } catch (error) {
            console.error("Erro ao carregar dados dos departamentos:", error);
        } finally {
            hideLoader();
        }
    }, [showLoader, hideLoader]);

    const aplicarFiltros = useCallback(() => {
        showLoader();
        try {
            const dadosFiltrados = tabelaDadosCompletos.filter(item => {
                const descricaoMatch = !pesquisa || String(item.descricao || '').toLowerCase().includes(pesquisa.toLowerCase());
                return descricaoMatch;
            });
            
            setTabelaDadosFiltrados(dadosFiltrados);
        } catch (error) {
            console.error("Erro ao filtrar dados dos departamentos:", error);
        } finally {
            hideLoader();
        }
    }, [tabelaDadosCompletos, pesquisa, descricao, status, showLoader, hideLoader]);

    const limparFiltros = () => {
        setPesquisa('');
        setDescricao('');
        setStatus('');
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
            handleResizeTabela('departamento-ferramenta-tabela', 'departamento-ferramenta-container');
        };
        window.addEventListener("resize", resizeHandler);
        requestAnimationFrame(resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const columns = DepartamentoForm.Departamento.colunasTabela.Descrição || [];
    const options = DepartamentoForm.Departamento.optionsTabela;

    const isCadastroRoute = location.pathname.includes('/cadastro');

    return (
        <div id='departamento-ferramenta-container' className={styles.configuracaoPadraoContainer}>
            {!isCadastroRoute && (
                <>
                    <section className={styles.filtroTabelaField}>
                        <div className={styles.filtroTabelaContent}>
                            <div className={styles.beneficiariosTitleTela}>
                                <h2 className={styles.title}>
                                    <i className={TITULO_DEPARTAMENTO.icon}></i>
                                    {TITULO_DEPARTAMENTO.text}
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
                                identifier="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                type="select"
                                options={[
                                    { value: 'ativo', label: 'ATIVO' },
                                    { value: 'cancelado', label: 'CANCELADO' },
                                    { value: 'emAnalisePelaOperadora', label: 'EM ANÁLISE PELA OPERADORA' },
                                    { value: 'ibbcaSuspenso', label: 'IBBCA SUSPENSO' },
                                    { value: 'inativo', label: 'INATIVO' },
                                    { value: 'inativoPorInadimplencia', label: 'INATIVO POR INADIMPLÊNCIA' },
                                    { value: 'rescisaoContratual', label: 'RESCISÃO CONTRATUAL' },
                                    { value: 'suspenso', label: 'SUSPENSO' },
                                ]}
                                placeholder="Selecione o status..."
                            />
                            <UseInputPadrao
                                label="Pesquisar"
                                identifier="pesquisa"
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                                type="select"
                            />
                            <UseInputPadrao
                                label="Pesquisar Descrição"
                                identifier="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                type="text"
                                placeholder="Digite a descrição para buscar..."
                            />
                        </div>
                        <TabelaPadrao
                            tabelaId="departamento-ferramenta-tabela"
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
                    </section>
                </>
            )}
            <Outlet />
        </div>
    );
};

export default Departamento;