import styles from './styles.module.css';
import { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { createPortal } from 'react-dom';
import { UseInputMask } from '../../../../components/InputPadrao';
import { BackscreenContext, useLoader } from '../../../../context';
import TabelaPadrao from '../../../../components/TabelaPadrao';
import { carregarInfos } from '../../../../db/carregarGeral';
import { levenshteinDistance } from '../../../../utils/functions';
import { Empresarial_Relatorios_Json } from '../../../../utils/json';
import { useAtom } from 'jotai';
import { idAtom } from '../../../../context/jotai';
import FiltroModal from './FiltroModal';

const Relatorios = () => {
    const [tokenEmpresa] = useAtom(idAtom);
    const { showLoader, hideLoader } = useLoader();
    const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
    const [modalState, setModalState] = useState(false);

    // Estados para pesquisa e dados
    const [pesquisaRelatorio] = UseInputMask();
    const [relatoriosOriginais] = useState(Empresarial_Relatorios_Json);
    const [relatoriosFiltrados, setRelatoriosFiltrados] = useState([]);

    // Estados para responsividade
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1280);
    const [isRelatoriosCollapsed, setIsRelatoriosCollapsed] = useState(() => window.innerWidth < 768);
    const [isRelatoriosOpen, setIsRelatoriosOpen] = useState(true);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [isRelatoriosMinimized, setIsRelatoriosMinimized] = useState(false);

    // Refs para acesso síncrono aos estados e elementos
    const stateRef = useRef({
        isMobile,
        isRelatoriosOpen,
        isRelatoriosCollapsed,
        isRelatoriosMinimized
    });
    const itemRefs = useRef([]);
    const resizeTimeout = useRef(null);

    // Configuração da tabela
    const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);
    const [tabelaOptions, setTabelaOptions] = useState({});
    const [tabelaColumns, setTabelaColumns] = useState([]);
    const [tabelaDados, setTabelaDados] = useState([]);
    const [filtroDados, setFiltroDados] = useState([]);
    const [filtroValores, setFiltroValores] = useState({});

    const openFiltro = useCallback(() => {
        setModalState(true);
        showBackscreen();
    },[showBackscreen]);

    const closeFiltro = useCallback(() => {
        setModalState(false);
        hideBackscreen();
    },[hideBackscreen]);

    useEffect(() => {
        stateRef.current = {
            isMobile,
            isRelatoriosOpen,
            isRelatoriosCollapsed,
            isRelatoriosMinimized
        };
    }, [isMobile, isRelatoriosOpen, isRelatoriosCollapsed, isRelatoriosMinimized]);

    const debounce = useCallback((func, delay) => {
        return function (...args) {
            clearTimeout(resizeTimeout.current);
            resizeTimeout.current = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }, []);

    const handleResize = useMemo(() => debounce((e) => {
        const newIsMobile = window.innerWidth < 1280;
        const newIsCollapsed = window.innerWidth < 768;
        
        setIsMobile(newIsMobile);
        setIsRelatoriosCollapsed(newIsCollapsed);
        if(e?.detail){
            setIsSidebarHidden(e?.detail?.isSidebarHidden || false);
        }

        const tabelaContainer = document.getElementById("tabelaContainer-empresa-relatorios");
        if (!tabelaContainer || window.innerWidth <= 768) return;

        const relatoriosContainer = document.querySelector(`.${styles.relatoriosContainer}`);
        if (!relatoriosContainer) return;

        const relatoriosField = relatoriosContainer.querySelector(`.${styles.relatoriosField}`);
        const relatoriosContent = relatoriosContainer.querySelector(`.${styles.relatoriosContent}`);

        const fullScreenWidth = relatoriosContainer.parentElement.offsetWidth - 16;

        if (newIsMobile) {
            tabelaContainer.style.maxWidth = `${fullScreenWidth}px`;
        } else {
            if (stateRef.current.isRelatoriosOpen) {
                relatoriosContent.style.gap = '1rem';
                tabelaContainer.style.maxWidth = `${fullScreenWidth * 0.70}px`;
                relatoriosField.style.maxWidth = `${fullScreenWidth * 0.30}px`;
                relatoriosField.classList.remove(styles.relatoriosFieldMinimized);
                setIsRelatoriosMinimized(false);
            } else {
                relatoriosField.classList.add(styles.relatoriosFieldMinimized);
                relatoriosField.style.maxWidth = '';
                tabelaContainer.style.maxWidth = `${fullScreenWidth - 50}px`;
                setIsRelatoriosMinimized(true);
            }
        }
    }, 250), [debounce]);

    const handleToggleRelatoriosMenu = useCallback(() => {
        setIsRelatoriosOpen(prev => {
            const newValue = !prev;
            stateRef.current.isRelatoriosOpen = newValue;
            handleResize();
            return newValue;
        });
    }, [handleResize]);

    // Filtragem da lista de relatórios
    useEffect(() => {
        if (pesquisaRelatorio.trim() === '') {
            setRelatoriosFiltrados(relatoriosOriginais);
            return;
        }

        const searchTerm = pesquisaRelatorio.toLowerCase();
        const filtered = relatoriosOriginais.filter(relatorio => {
            const nome = relatorio.nome_relatorio.toLowerCase();
            return nome.includes(searchTerm) || isSimilar(nome, searchTerm);
        });
        
        setRelatoriosFiltrados(filtered);
    }, [pesquisaRelatorio, relatoriosOriginais]);

    // Efeitos de inicialização e limpeza
    useEffect(() => {
        const resizeHandler = handleResize;
        window.addEventListener("resize", resizeHandler);
        window.addEventListener("layout-resize", (e) => resizeHandler(e));

        const areaEmpresarialContent = document.getElementById('areaEmpresarialContent');
        if (areaEmpresarialContent) {
            areaEmpresarialContent.style.maxWidth = `${window.innerWidth - 28 * 2}px`;
        }
        
        requestAnimationFrame(() => {
            handleResize();
        });

        return () => {
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("layout-resize", resizeHandler);
            if (areaEmpresarialContent) {
                areaEmpresarialContent.style.maxWidth = '';
            }
            clearTimeout(resizeTimeout.current);
        };
    }, [handleResize]);

    const isSimilar = (word1, word2) => {
        const distance = levenshteinDistance(word1, word2);
        const maxDistance = Math.max(word1.length, word2.length) / 2;
        return distance <= maxDistance;
    };

    // Animação de hover
    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, relatoriosFiltrados.length);
    }, [relatoriosFiltrados]);

    const handleMouseEnter = useCallback((index) => {
        const span = itemRefs.current[index]?.querySelector(`.${styles.relatoriosFieldItemText}`);
        if (!span) return;
        
        span.style.maxWidth = 'unset';
        span.style.overflow = 'unset';
        
        requestAnimationFrame(() => {
            const containerWidth = span.parentElement.offsetWidth;
            const spanWidth = span.scrollWidth;
            
            if (spanWidth > containerWidth) {
                const distance = spanWidth - containerWidth;
                const tempo = distance / 70;
                span.style.transition = `transform ${tempo}s linear`;
                span.style.transform = `translateX(-${distance}px)`;
            }
        });
    }, []);

    const handleMouseLeave = useCallback((index) => {
        const span = itemRefs.current[index]?.querySelector(`.${styles.relatoriosFieldItemText}`);
        if (span) {
            span.style.maxWidth = '';
            span.style.overflow = '';
            span.style.transition = 'transform 0.5s ease-out';
            span.style.transform = 'translateX(0)';
        }
    }, []);

    // Função para buscar dados no banco (sem filtros)
    const buscarDadosRelatorio = useCallback((relatorio) => {
        showLoader();
        window.exibirRelatorio = exibirRelatorio;
        const params = {
            campo: '*',
            tabela: `VW_SITE_REL_${relatorio.view_relatorio.toUpperCase()}`,
            condicao: `TOKEN_CLIENTE = '${tokenEmpresa}'`,
            nbanco: '*',
        };
    
        carregarInfos('exibirRelatorio', params, 'exibirRelatorio');
    
        return () => delete window.exibirRelatorio;
    }, [tokenEmpresa]);

    // Callback para receber os dados do banco
    const exibirRelatorio = useCallback((dados) => {
        const dadosParseados = JSON.parse(dados);
        setTabelaDados(dadosParseados); // Armazena os dados completos
    }, []);

    // Função para aplicar filtros localmente
    const aplicarFiltros = useCallback((novosFiltros = {}) => {
        if (!relatorioSelecionado || !tabelaDados.length) {
            setFiltroDados(tabelaDados);
            return;
        }
    
        const dadosFiltrados = tabelaDados.filter((row) => {
            return relatorioSelecionado.filtros.every((filtro) => {
                // Verificação segura do valor do filtro
                const valorFiltro = novosFiltros ? novosFiltros[filtro.value] : null;
                
                if (!valorFiltro || valorFiltro === '') return true;
    
                const campo = filtro.value.replace(/_inicio|_fim/g, '');
                // Verificação segura do valor da célula
                const valorCelula = row ? row[campo] : null;
                
                if (!valorCelula) return false;
    
                // Restante da lógica de filtro permanece igual
                if (filtro.value.includes('_inicio')) {
                    const dataInicio = new Date(valorFiltro);
                    const dataCelula = new Date(valorCelula);
                    return dataCelula >= dataInicio;
                }
                
                if (filtro.value.includes('_fim')) {
                    const dataFim = new Date(valorFiltro);
                    const dataCelula = new Date(valorCelula);
                    return dataCelula <= dataFim;
                }
                
                return valorCelula.toString().toLowerCase().includes(valorFiltro.toLowerCase());
            });
        });
    
        setFiltroDados(dadosFiltrados);
    }, [relatorioSelecionado, tabelaDados]);

    // Aplica filtros quando os dados ou filtros mudam
    useEffect(() => {
        aplicarFiltros(filtroValores);
        hideLoader();
    }, [tabelaDados, relatorioSelecionado]);

    // Função para carregar um relatório
    const carregarRelatorio = useCallback((relatorio) => {
        setRelatorioSelecionado(relatorio);
        setFiltroValores({});
        if(isRelatoriosOpen) handleToggleRelatoriosMenu();
        
        setTabelaOptions({
            showSearch: () => buscarDadosRelatorio(relatorio),
            showFilter: openFiltro,
            ...relatorio.options
        });
        setTabelaColumns(relatorio.columns);
        setTabelaDados([]);
    }, [buscarDadosRelatorio, openFiltro, isRelatoriosOpen, handleToggleRelatoriosMenu]);

    useEffect(() => {
        if(!isRelatoriosOpen) handleToggleRelatoriosMenu();
        setFiltroValores({});
        hideLoader();
        
        // Carrega automaticamente o relatório de Clientes
        const relatorioClientes = relatoriosOriginais.find(rel => rel.view_relatorio === "clientes");
        if (relatorioClientes) {
            setRelatorioSelecionado(relatorioClientes);
            setTabelaOptions({
                showSearch: () => buscarDadosRelatorio(relatorioClientes),
                showFilter: openFiltro,
                ...relatorioClientes.options
            });
            setTabelaColumns(relatorioClientes.columns);
            setTabelaDados([]);
        }
    }, [])

    useEffect(() => {
        handleResize();
    }, [isRelatoriosMinimized]);

    return (
        <>
            <div className={styles.relatoriosContainer}>
                <h2 className={styles.relatoriosTitleTela}>
                    <i className="fa-solid fa-chart-bar"></i>
                    Relatórios
                </h2>
                <p className={styles.relatoriosDescriptionTela}>
                    <i className="fa-solid fa-info-circle"></i>
                    Faça o filtro de dados relacionados à utilização dos serviços e exporte relatórios em planilhas.
                </p>
                
                <div className={styles.relatoriosContent}>
                    {!isMobile && (
                        <>
                            <button 
                                className={`${styles.relatoriosFieldSlider} ${isSidebarHidden ? styles.sliderWithoutSideBar : styles.sliderWithSideBar}`} 
                                onClick={handleToggleRelatoriosMenu}
                                aria-label={isRelatoriosOpen ? "Recolher relatórios" : "Expandir relatórios"}
                            >
                                <div className={styles.relatoriosFieldSliderButton}>
                                    <i className='fas fa-circle-chevron-left' style={{ transform: isRelatoriosOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s ease-in-out'}}/>
                                </div>
                            </button>
                            <span className={`${styles.relatoriosFieldSliderSpan} ${isSidebarHidden ? styles.sliderSpanWithoutSideBar : styles.sliderSpanWithSideBar}`}></span>
                        </>
                    )}
                    <section className={styles.relatoriosField}>
                        <ul 
                            className={styles.relatoriosFieldList} 
                            style={isRelatoriosCollapsed ? { maxHeight: 'unset' } : { maxHeight: `${(itemRefs.current[0]?.offsetHeight + 8) * 8}px` }}
                        >
                            {relatoriosFiltrados.map((relatorio, index) => (
                                <li 
                                    key={`${relatorio.id}-${index}`}
                                    className={styles.relatoriosFieldItem}
                                    ref={el => itemRefs.current[index] = el}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    onClick={() => carregarRelatorio(relatorio)}
                                >
                                    <button className={styles.relatoriosFieldItemIcon} aria-label="Abrir relatório">
                                        <i className="fas fa-file" />
                                    </button>
                                    <div className={styles.relatoriosFieldItemTextContainer}>
                                        <span className={styles.relatoriosFieldItemText}>
                                            {relatorio.nome_relatorio}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                    
                    <section className={styles.tabelaField}>
                        <div className={styles.tabelaHeader}>
                            <h3 className={styles.tabelaHeaderTitle}>
                                <i className="fa-solid fa-file-alt"></i>
                                {relatorioSelecionado?.nome_relatorio}
                            </h3>
                        </div>
                        
                        <TabelaPadrao
                            tabelaId="empresa-relatorios"
                            columns={tabelaColumns}
                            data={filtroDados}
                            options={tabelaOptions}
                        />
                    </section>
                </div>
            </div>
            {modalState && relatorioSelecionado && createPortal(
                <FiltroModal
                    relatorio={relatorioSelecionado}
                    tabelaDados={tabelaDados}
                    filtroValores={filtroValores}
                    setFiltroValores={setFiltroValores}
                    onFiltrar={aplicarFiltros}
                    onClose={closeFiltro}
                />,
                document.getElementById('modal-root') 
            )}
        </>
    );
};

export default Relatorios;