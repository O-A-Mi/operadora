import styles from './styles.module.css';
import Tooltip from '../../../../../components/TooltipPadrao/index';
import { useState, useRef, createRef, useEffect } from 'react';
import TabelaPadrao from '../../../../../components/TabelaPadrao/index';
import Draggable from 'react-draggable';
import ModalVizualizarCard from './components/modalVizualizarCard';
import ModalFiltrar from './components/modalFiltrar';
import ModalNovaFase from './components/modalNovaFase';
import ModalNovoCard from './components/modalNovoCard';
import ModalOrdenacao from './components/modalOrdenacao';
import ModalAnexo from './components/modalAnexo';
import ModalHistorico from './components/modalHistorico';
import ModalEncaminhar from './components/modalEncaminhar';
import ModalMoverFase from './components/modalMoverFase';
import ModalOcorrencia from './components/modalOcorrencia';
import ModalCancelar from './components/modalCancelar';
import ModalSolucionarCard from './components/modalSolucionarCard';
import ModalEnviarEmail from './components/modalEnviarEmail';
import ModalEnviarWhatsapp from './components/modalEnviarWhatsapp';
import { useModal } from '../../../../../context';

const arrayFase = [
    {
        id: 1,
        corFase: '#f87171',
        titulo: 'concluido',
        boxCard: [
            {
                idBox: 1,
                corBox: '#f6c799c4',
                status: 'nd', //nao designado
                etiqueta: 'Frio',
                assunto: 'testeAssunto',
                dataHora: '11/00/2025 10:00',
                protocolo: '17012023000490',
                protocoloANS: '',
                nomeCliente: 'Fabricio Santos Almeida',
                contrato: '00012200',
                tempoAbertura: '34444',
                tempoFase: '34444',
                abertoPor: '',
            }
        ],
    },
    {
        id: 2,
        corFase: '#289891',
        titulo: 'testando',
        boxCard: [
            {
                idBox: 2,
                corBox: '#f1f699a1',
                status: 'do', //designado
                etiqueta: 'Morno',
                assunto: 'testeAssunto',
                dataHora: '11/00/2025 10:00',
                protocolo: '17012023000490',
                protocoloANS: '',
                nomeCliente: 'Miguel Ribeiro',
                contrato: '0001223',
                tempoAbertura: '333333',
                tempoFase: '333333',
                abertoPor: '',
            }
        ],
    },
    {
        id: 3,
        corFase: '#23441d',
        titulo: 'andamento',
        boxCard: [
            {
                idBox: 3,
                corBox: '#b9d1e9cc',
                status: 'oc', //ocorrencia
                etiqueta: 'Quente',
                assunto: 'testeAssunto',
                dataHora: '11/00/2025 10:00',
                protocolo: '17012023000490',
                protocoloANS: '',
                nomeCliente: 'Adam Sandler',
                contrato: '0006666',
                tempoAbertura: '22222',
                tempoFase: '22222',
                abertoPor: '',
            }
        ],
    },
    {
        id: 4,
        corFase: '#d046daff',
        titulo: 'excluido',
        boxCard: [
            {
                idBox: 4,
                corBox: '#cecece',
                status: 'nd', //nao designado
                etiqueta: 'Expirado',
                assunto: 'testeAssunto',
                dataHora: '11/00/2025 10:00',
                protocolo: '17012023000490',
                protocoloANS: '',
                nomeCliente: 'Alex',
                contrato: '0001221',
                tempoAbertura: '11111',
                tempoFase: '11111',
                abertoPor: '',
            }
        ],
    },
]
const tabelaColumns = [
    { value: "info", name: " " },
    { value: "acao", name: "Ação" },
    { value: "protocolo", name: "Protocolo" },
    { value: "status", name: "Status do Card" },
    { value: "dataAbertura", name: "Data de Abertura" },
    { value: "dataRetorno", name: "Data de Retorno" },
    { value: "nomeDoCliente", name: "Nome do Cliente" },
    { value: "contrato", name: "Contrato" },
    { value: "operadora", name: "Operadora" },
    { value: "entidade", name: "Entidade" },
    { value: "etiqueta", name: "Ações" },
    { value: "slo", name: "Slo (hora)" },
    { value: "sloPrazo", name: "Slo prazo maximo (hora)" },
    { value: "prazo", name: "Prazo" },
    { value: "abertoPor", name: "Aberto por" },
    { value: "assunto", name: "Assunto" },
    { value: "textoDeAbertura", name: "Texto de Abertura" },
    { value: "departamentoDesignado", name: "Ações" },
    { value: "usuarioDesignado", name: "Usuario Designado" }
];
const dadosTabela = [
    {
        info: <i className="fa-solid fa-circle-user"></i>,
        acao: "Visualizar",
        protocolo: "17012023000490",
        status: "COBRANÇA",
        dataAbertura: "17/01/2023 10:00",
        dataRetorno: "17/01/2023 10:00",
        nomeDoCliente: "Teste Fabricio",
        contrato: "0004443",
        operadora: "Unimed",
        entidade: "Unimed",
        etiqueta: "Expirado",
        slo: "24",
        sloPrazo: "48",
        prazo: "48",
        abertoPor: "Teste Fabricio",
        assunto: "Cobrança de Procedimento",
        textoDeAbertura: "Solicitação de cobrança de procedimento realizado em 17/01/2023.",
        departamentoDesignado: "Financeiro",
        usuarioDesignado: "Teste Fabricio"
    },
]
const tabelaColumnsRelatorio = [
    { value: "acao", name: "Ação" },
    { value: "fase", name: "Fase" },
    { value: "protocolo", name: "Protocolo" },
    { value: "nomeDoCliente", name: "Nome do Cliente" },
    { value: "contrato", name: "Contrato" },
    { value: "operadora", name: "Operadora" },
    { value: "etiqueta", name: "Ações" },
    { value: "abertoPor", name: "Aberto por" },
    { value: "abertoEm", name: "Aberto em" },
    { value: "fechadoPor", name: "Fechado por" },
    { value: "fechadoEm", name: "Fechado em" },
    { value: "assunto", name: "Assunto" },
    { value: "textoDeAbertura", name: "Texto de Abertura" },
    { value: "textoDeFechamento", name: "Texto de Fechamento" },
    { value: "departamentoDesignado", name: "Ações" },
    { value: "usuarioDesignado", name: "Usuario Designado" },
];
const dadosTabelaRelatorio = [
    {
        acao: "Visualizar",
        fase: "Cobrança",
        protocolo: "17012023000490",
        nomeDoCliente: "Teste Fabricio",
        contrato: "0004443",
        operadora: "Unimed",
        etiqueta: "Expirado",
        abertoPor: "Teste Fabricio",
        abertoEm: "Aberto em",
        fechadoPor: "Teste Fabricio",
        fechadoEm: "Fechado em",
        assunto: "Cobrança de Procedimento",
        textoDeAbertura: "Solicitação de cobrança de procedimento realizado em 17/01/2023.",
        textoDeFechamento: "Cobrança realizada com sucesso.",
        departamentoDesignado: "Financeiro",
        usuarioDesignado: "Teste Fabricio"
    },
]


const Kanban = () => {
    const styleStatus = status_andamento => {
        let statusStyle;
        if (status_andamento == 'Frio') {
            statusStyle = '#4c76c2e3';
        } else if (status_andamento == 'Morno') {
            statusStyle = '#ff9101ab';
        } else if (status_andamento == 'Quente') {
            statusStyle = '#e40101a6';
        } else if (status_andamento == 'Expirado') {
            statusStyle = '#79559bdb';
        } else {
            statusStyle = 'var(--red-500)';
        }
        return statusStyle;
    }

    const [screenState, setScreenState] = useState({
        kanban: true,
        lista: false,
        relatorio: false
    })

    const ClickBox = (e) => {
        document.querySelectorAll('.checkboxButton').forEach((box) => {
            box.classList.add(styles.activeButton);
        });
    }

    const [estaAtivo, setEstaAtivo] = useState(false);
    const handleToggleAtivo = () => {
        setEstaAtivo(prevState => !prevState);
    };

    const { openModal, closeModal, isModalOpen } = useModal();
    const [fases, setFases] = useState(arrayFase);
    const columnRefs = useRef(fases.map(() => createRef()));

    // NOVO: Estado para controlar o placeholder
    const [placeholderInfo, setPlaceholderInfo] = useState({ faseId: null, index: null });

    // ALTERADO: Lógica de arrastar para calcular a posição do placeholder
    const handleDrag = (e, data, faseIdOrigem, cardArrastado) => {
        const finalX = e.clientX;
        const finalY = e.clientY;

        const colunaDestinoRef = columnRefs.current.find(ref => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                return finalX >= rect.left && finalX <= rect.right && finalY >= rect.top && finalY <= rect.bottom;
            }
            return false;
        });

        if (colunaDestinoRef && colunaDestinoRef.current) {
            const faseDestinoId = Number(colunaDestinoRef.current.id);
            setColunaAtivaId(faseDestinoId);

            const faseDestino = fases.find(f => f.id === faseDestinoId);
            let newIndex = faseDestino.boxCard.length;

            const cardsNaColuna = Array.from(colunaDestinoRef.current.querySelectorAll(`.${styles.boxCard}:not(.${styles.cardSendoArrastado})`));

            for (let i = 0; i < cardsNaColuna.length; i++) {
                const cardNode = cardsNaColuna[i];
                const rect = cardNode.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;

                if (finalY < midY) {
                    newIndex = i;
                    break;
                }
            }
            setPlaceholderInfo({ faseId: faseDestinoId, index: newIndex });

        } else {
            setColunaAtivaId(null);
            setPlaceholderInfo({ faseId: null, index: null });
        }
    };

    // ALTERADO: Lógica para soltar o card, usando a info do placeholder
    const handleStop = (e, data, faseOrigemId, cardArrastado) => {
        if (placeholderInfo.faseId !== null) {
            setFases(prevFases => {
                const faseDestinoId = placeholderInfo.faseId;
                const indexDestino = placeholderInfo.index;

                const novasFases = JSON.parse(JSON.stringify(prevFases));
                const faseOrigem = novasFases.find(f => f.id === faseOrigemId);
                let faseDestino = novasFases.find(f => f.id === faseDestinoId);

                const cardIndexOrigem = faseOrigem.boxCard.findIndex(c => c.idBox === cardArrastado.idBox);
                let cardMovido;

                if (cardIndexOrigem > -1) {
                    cardMovido = faseOrigem.boxCard.splice(cardIndexOrigem, 1)[0];
                } else {
                    return prevFases; 
                }
                
                // Se a fase de destino é a mesma que a de origem, precisamos pegar a referência atualizada após o splice.
                if (faseOrigemId === faseDestinoId) {
                    faseDestino = faseOrigem;
                }

                let adjustedIndex = indexDestino;
                if (faseOrigemId === faseDestinoId && cardIndexOrigem > -1 && cardIndexOrigem < indexDestino) {
                    adjustedIndex = indexDestino - 1;
                }

                faseDestino.boxCard.splice(adjustedIndex, 0, cardMovido);

                return novasFases;
            });
        }
        
        // Reseta os estados visuais
        setColunaAtivaId(null);
        setPlaceholderInfo({ faseId: null, index: null });

        // Remove a classe de arrasto manualmente
        const allDraggables = document.querySelectorAll(`.${styles.cardSendoArrastado}`);
        allDraggables.forEach(el => el.classList.remove(styles.cardSendoArrastado));
    };


    const [colunaAtivaId, setColunaAtivaId] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [cardSelecionado, setCardSelecionado] = useState(null);
    const [menuMensagensAberto, setMenuMensagensAberto] = useState(false);
    const [menuMensagensPosition, setMenuMensagensPosition] = useState({ top: 0, left: 0 });
    const [cardMensagensSelecionado, setCardMensagensSelecionado] = useState(null);

    const menuFlutuante = (e, card) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuPosition({
            top: rect.top - 100,
            left: rect.left + 20,
        });
        setCardSelecionado(card);
        setMenuAberto(true);
    }

    const fecharMenu = () => {
        setMenuAberto(false);
        setCardSelecionado(null);
    }

    const menuMensagensFlutuante = (e, card) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuMensagensPosition({
            top: rect.top - 100,
            left: rect.left + 20,
        });
        setCardMensagensSelecionado(card);
        setMenuMensagensAberto(true);
    }

    const fecharMenuMensagens = () => {
        setMenuMensagensAberto(false);
        setCardMensagensSelecionado(null);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuAberto) {
                const menuElement = document.querySelector(`.${styles.menuDropdown}`);
                if (menuElement && !menuElement.contains(event.target)) {
                    fecharMenu();
                }
            }
            if (menuMensagensAberto) {
                const menuElement = document.querySelector(`.${styles.menuMensagensDropdown}`);
                if (menuElement && !menuElement.contains(event.target)) {
                    fecharMenuMensagens();
                }
            }
        };

        if (menuAberto || menuMensagensAberto) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuAberto, menuMensagensAberto]);


    return (
        <>
            {/* header cabeçalho */}
            <main className={styles.containerPrincipal}>
                <header className={styles.containerApresentacao}>
                    <div className={styles.buttonsHeader}>
                        <button className={`${styles.titulo} ${screenState.kanban && styles.active}`} onClick={() => setScreenState({ kanban: true, lista: false, relatorio: false })}>
                            <i className="fa-solid fa-chart-kanban"></i>Fluxo de Trabalho
                        </button>

                        <button className={`${styles.titulo} ${screenState.lista && styles.active}`} onClick={() => setScreenState({ kanban: false, lista: true, relatorio: false })}>
                            <i className="fa-solid fa-list"></i>Lista
                        </button>

                        <button className={`${styles.titulo} ${screenState.relatorio && styles.active}`} onClick={() => setScreenState({ kanban: false, lista: false, relatorio: true })}>
                            <i className="fa-solid fa-file-chart-column"></i>Relatórios
                        </button>
                    </div>

                    <div className={styles.buttonsHeaderRight}>
                        <div className={styles.ancorasHeader}>
                            <a className={styles.ancoras} onClick={() => openModal("ModalNovaFase")}><i className="fa-solid fa-rectangle-history-circle-plus"></i>Nova Fase</a>

                            <a className={styles.ancoras} onClick={() => openModal("ModalNovoCard")}><i className="fa-solid fa-grid-2-plus"></i> Novo Card</a>

                            <a className={styles.ancoras} ><i className="fa-solid fa-arrows-rotate"></i> Atualizar</a>
                        </div>

                        <div className={styles.inputSearch}>
                            <input
                                type="text"
                                placeholder='Procurar Registro'
                                className={styles.inputSearchField}
                            />

                            <button className={styles.inputSearchField} onClick={() => openModal("modalFiltroKanban")} >
                                <a className={styles.ancoras}> Filtrar <i className="fa-solid fa-filter"></i></a>
                            </button>
                        </div>
                    </div>
                </header>
                {/* renderização do kanban */}
                {screenState.kanban && (
                    <section className={styles.containerKanban}>
                        {/* conteudo coluna */}
                        {fases.map((fase, faseIndex) => {
                            // ALTERADO: Lógica para injetar o placeholder
                            const itemsToRender = [...fase.boxCard];
                            if (placeholderInfo.faseId === fase.id) {
                                const placeholder = <div key="placeholder" className={styles.placeholder}></div>;
                                itemsToRender.splice(placeholderInfo.index, 0, placeholder);
                            }

                            return (
                                <div className={styles.MainColumn} key={fase.id} id={fase.id} ref={columnRefs.current[faseIndex]} >
                                    {/* Conteudo do titulo card */}
                                    <header className={styles.headerKanban} style={{ borderTop: `0.3rem solid ${fase.corFase}` }}>
                                        <h5 className={styles.tituloCards} style={{ color: `${fase.corFase}` }}>{fase.titulo}<span className={styles.totalCards} id='totalCards'>({fase.boxCard.length})</span></h5>
                                        <div className={styles.headerKanbanIcons}>
                                            <a onClick={() => openModal("ModalOrdenacao")} className={styles.phaseMenu}>
                                                <Tooltip className={styles.tooltip} text="Ordenação" position="bottom">
                                                    <i className="fa-solid fa-bars"></i>
                                                </Tooltip>
                                            </a>
                                            <a className={styles.phaseMenu}>
                                                <Tooltip className={styles.tooltip} text="Atualização" position="bottom">
                                                    <i className="fa-solid fa-arrows-rotate"></i>
                                                </Tooltip>
                                            </a>
                                            <Tooltip className={styles.tooltip} text="Novo Card" position="bottom">
                                                <div onClick={() => openModal("ModalNovoCard")} className={styles.IconAdd}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </header>

                                    {/* Conteudo do card */}
                                    <div className={`${styles.containerCards} ${fase.id === colunaAtivaId ? styles.colunaAtiva : ''}`}>
                                        {itemsToRender.map((item) => {
                                             // Se for o placeholder, renderiza-o e para.
                                            if (item.key === 'placeholder') {
                                                return item;
                                            }
                                            // Se for um card normal, renomeia para 'card' para manter o resto do código
                                            const card = item; 

                                            return (
                                                <Draggable
                                                    key={card.idBox}
                                                    axis="both"
                                                    handle=".handle"
                                                    defaultPosition={{ x: 0, y: 0 }}
                                                    position={{x: 0, y: 0}} // Força a posição para o layout do CSS
                                                    scale={1}
                                                    // ALTERADO: Passando os parâmetros corretos para os handlers
                                                    onDrag={(e, data) => handleDrag(e, data, fase.id, card)}
                                                    onStart={(e) => {
                                                        e.currentTarget.classList.add(styles.cardSendoArrastado);
                                                    }}
                                                    onStop={(e, data) => handleStop(e, data, fase.id, card)}
                                                >
                                                    <div id={card.idBox} className={`${styles.boxCard} handle`} style={{ backgroundColor: `${card.corBox}` }} onDoubleClick={() => openModal("ModalVizualizarCard")} >
                                                        <div>
                                                            <div className={styles.iconsSize}>
                                                                <Tooltip className={styles.tooltip} text="Card Designado" position="bottom">
                                                                    <i className="fa-solid fa-circle-user"></i>
                                                                </Tooltip>
                                                                <Tooltip className={styles.tooltip} text="Prioridade Média" position="bottom">
                                                                    <i className="fa-solid fa-circle-exclamation"></i>
                                                                </Tooltip>
                                                                <Tooltip className={styles.tooltip} text="Prioridade Alta" position="bottom">
                                                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className={styles.situacaoCard}>
                                                            <button id='Etiqueta' className={styles.etiqueta} style={{ background: styleStatus(card.etiqueta) }}>{card.etiqueta}</button>
                                                            <p id='status' className={styles.status}>{card.assunto}</p>
                                                        </div>
                                                        <span className={styles.aviso} id='aviso'>Expirou em {card.dataHora}</span>
                                                        <div className={styles.actions}>
                                                            <p id='Protocolo'>{card.protocolo}</p>
                                                            <div className={styles.actionsIcons}>
                                                                <Tooltip className={styles.tooltip} text="Ações" position="bottom">
                                                                    <a className={styles.hoverIcons} onClick={(e) => menuFlutuante(e, card)} ><i className="fa-solid fa-ellipsis-vertical"></i></a>
                                                                </Tooltip>
                                                                <Tooltip className={styles.tooltip} text="Ferramenta" position="bottom">
                                                                    <a className={styles.hoverIcons} onClick={(e) => menuMensagensFlutuante(e, card)}><i className="fa-solid fa-message"></i></a>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        {/* informações do cliente */}
                                                        <div id='cliente' className={styles.infoCliente}>
                                                            <div className={styles.iconCliente}>
                                                                <div className={styles.spaceInfos}>
                                                                    <div className={styles.userAlinhado}>
                                                                        <i className="fa-solid fa-user-doctor"></i>
                                                                    </div>
                                                                    <div className={styles.spaceName}>
                                                                        <p>NOME DO CLIENTE</p>
                                                                        <span className={styles.nomeCliente} id='nomeCliente'>{card.nomeCliente}</span>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.spaceInfos}>
                                                                    <div className={styles.userAlinhado}>
                                                                        <i className="fa-solid fa-id-card-clip"></i>
                                                                    </div>
                                                                    <div className={styles.spaceName}>
                                                                        <p>CONTRATO</p>
                                                                        <span className={styles.nomeCliente} id='numeroDoContrato'>{card.contrato}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.iconsTime}>
                                                            <div id='dataAbertura' className={styles.dataAbertura}>
                                                                <Tooltip className={styles.tooltip} text="Tempo de Abertura" position="bottom">
                                                                    <a className={styles.colorWatch}><i className="fa-regular fa-clock-two"></i></a>
                                                                </Tooltip>
                                                                <p>{card.tempoAbertura}h</p>
                                                            </div>
                                                            <div id='tempoDaFase' className={styles.dataAbertura}>
                                                                <Tooltip className={styles.tooltip} text="Tempo da Fase" position="bottom">
                                                                    <a className={styles.colorWatchFase}><i className="fa-regular fa-clock-two"></i></a>
                                                                </Tooltip>
                                                                <p>{card.tempoFase}h</p>
                                                            </div>
                                                            <div className={styles.iconsSize}>
                                                                <Tooltip className={styles.tooltip} text="Aberto por Teste Fabricio" position="bottom">
                                                                    <a><i className="fa-solid fa-user"></i></a>
                                                                </Tooltip>
                                                                <Tooltip className={styles.tooltip} text="Diretoria" position="bottom">
                                                                    <a><i className="fa-solid fa-user-tie"></i></a>
                                                                </Tooltip>
                                                                <Tooltip className={styles.tooltip} text="Privado" position="bottom">
                                                                    <a><i className="fa-solid fa-lock"></i></a>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Draggable>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                )}

                {/* renderização da lista */}
                {screenState.lista && (
                    <>
                        <header className={styles.headerLista}>
                            <div>
                                <h4 className={styles.textoRegistro} >661 registro(s) na Lista</h4>
                            </div>

                            <div className={styles.buttonsHeaderRightLista}>
                                <div className={styles.ocorrencias}>
                                    <button className={`${styles.checkboxButton}${estaAtivo ? styles.activeButton : ''}`} onClick={handleToggleAtivo} ></button>
                                    <h5>Vizualizar Ocorrencias</h5>
                                </div>
                                <div className={styles.ocorrencias}>
                                    <i class="fa-solid fa-arrow-down-to-line"></i>
                                    <h5>Exportar</h5>
                                </div>
                            </div>
                        </header>

                        <div className={styles.containerTabela}>
                            <TabelaPadrao
                                tabelaId="lista"
                                columns={tabelaColumns}
                                data={dadosTabela}
                                options={{
                                    showPaginationSwitch: true,
                                    showToggleView: true,
                                    showColumnsSelector: true,
                                    showExport: true,
                                    fileName: "cobranca",
                                }}
                            />
                        </div>
                    </>
                )}

                {/* renderização do relatorio */}
                {screenState.relatorio && (
                    <>
                        <header className={styles.headerLista}>
                            <div>
                                <h4 className={styles.textoRegistro} >661 registro(s) no Relatório</h4>
                            </div>

                            <div className={styles.buttonsHeaderRightLista}>
                                <div className={styles.ocorrencias}>
                                    <button className={`${styles.checkboxButton}${estaAtivo ? styles.activeButton : ''}`} onClick={handleToggleAtivo} ></button>
                                    <h5>Cards Finalizados</h5>
                                </div>
                                <div className={styles.ocorrencias}>
                                    <button className={`${styles.checkboxButton}${estaAtivo ? styles.activeButton : ''}`} onClick={handleToggleAtivo} ></button>
                                    <h5>Cards Cancelados</h5>
                                </div>
                                <div className={styles.ocorrencias}>
                                    <i class="fa-solid fa-arrow-down-to-line"></i>
                                    <h5>Exportar</h5>
                                </div>
                            </div>
                        </header>

                        <div className={styles.containerTabela}>
                            <TabelaPadrao
                                tabelaId="lista"
                                columns={tabelaColumnsRelatorio}
                                data={dadosTabelaRelatorio}
                                options={{
                                    showPaginationSwitch: true,
                                    showToggleView: true,
                                    showColumnsSelector: true,
                                    showExport: true,
                                    fileName: "cobranca",
                                }}
                            />
                        </div>
                    </>
                )}

            </main>
            {/* ...Seu código de Modais e Menus continua aqui sem alterações... */}
            {isModalOpen("modalFiltroKanban") && ( <ModalFiltrar closeModal={() => closeModal("modalFiltroKanban")} /> )}
            {isModalOpen("ModalNovaFase") && ( <ModalNovaFase closeModal={() => closeModal("ModalNovaFase")} /> )}
            {isModalOpen("ModalNovoCard") && ( <ModalNovoCard closeModal={() => closeModal("ModalNovoCard")} /> )}
            {isModalOpen("ModalOrdenacao") && ( <ModalOrdenacao closeModal={() => closeModal("ModalOrdenacao")} /> )}
            {isModalOpen("ModalVizualizarCard") && ( <ModalVizualizarCard closeModal={() => closeModal("ModalVizualizarCard")} /> )}
            {isModalOpen("ModalEncaminhar") && ( <ModalEncaminhar closeModal={() => closeModal("ModalEncaminhar")} /> )}
            {isModalOpen("ModalMoverFase") && ( <ModalMoverFase closeModal={() => closeModal("ModalMoverFase")} /> )}
            {isModalOpen("ModalOcorrencia") && ( <ModalOcorrencia closeModal={() => closeModal("ModalOcorrencia")} /> )}
            {isModalOpen("ModalHistorico") && ( <ModalHistorico closeModal={() => closeModal("ModalHistorico")} /> )}
            {isModalOpen("ModalAnexo") && ( <ModalAnexo closeModal={() => closeModal("ModalAnexo")} /> )}
            {isModalOpen("ModalCancelar") && ( <ModalCancelar closeModal={() => closeModal("ModalCancelar")} /> )}
            {isModalOpen("ModalSolucionarCard") && ( <ModalSolucionarCard closeModal={() => closeModal("ModalSolucionarCard")} /> )}
            {isModalOpen("ModalEnviarEmail") && ( <ModalEnviarEmail closeModal={() => closeModal("ModalEnviarEmail")} /> )}
            {isModalOpen("ModalEnviarWhatsapp") && ( <ModalEnviarWhatsapp closeModal={() => closeModal("ModalEnviarWhatsapp")} /> )}

            {/* Menu dropdown de ações */}
            {menuAberto && (
                <div className={styles.menuDropdown} style={{ position: 'fixed', top: menuPosition.top, left: menuPosition.left, zIndex: 1000 }}>
                    <section className={styles.sectionMenu}>
                        <div className={styles.separatorActions}>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-arrow-right'></i>
                                <p onClick={() => {
                                    openModal("ModalEncaminhar");
                                    setMenuAberto(false);
                                }}>Encaminhar para usuário</p>
                            </div>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-arrows-up-down-left-right'></i>
                                <p onClick={() => {
                                    openModal("ModalMoverFase");
                                    setMenuAberto(false);
                                }}> Mover para outra fase</p>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.separatorActions}>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-comment'></i>
                                <p onClick={() => {
                                    openModal('ModalOcorrencia');
                                    setMenuAberto(false);
                                }}>Ocorrencias</p>
                            </div>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-list-ul'></i>
                                <p onClick={() => {
                                    openModal("ModalHistorico");
                                    setMenuAberto(false);
                                }}>Histórico das fases</p>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.separatorActions}>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-paperclip'></i>
                                <p onClick={() => {
                                    openModal("ModalAnexo");
                                    setMenuAberto(false);
                                }}>Anexo</p>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.separatorActions}>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-xmark'></i>
                                <p onClick={() => {
                                    openModal("ModalCancelar");
                                    setMenuAberto(false);
                                }}>Cancelar card</p>
                            </div>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-lock'></i>
                                <p onClick={() => {
                                    openModal("ModalSolucionarCard");
                                    setMenuAberto(false);
                                }}>Solucionar card</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Menu dropdown de mensagens */}
            {menuMensagensAberto && (
                <div
                    className={styles.menuMensagensDropdown}
                    style={{
                        position: 'fixed',
                        top: menuMensagensPosition.top,
                        left: menuMensagensPosition.left,
                        zIndex: 1000
                    }}
                >
                    <section className={styles.sectionMenu}>
                        <div className={styles.separatorActions}>
                            <div className={styles.floatingTitles}>
                                <i className='fa-solid fa-envelope'></i>
                                <p onClick={() => {
                                    openModal("ModalEnviarEmail");
                                    setMenuMensagensAberto(false);
                                }}>Enviar E-mail</p>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.separatorActions}>
                            <div className={styles.floatingTitles}>
                                <i className='fa-brands fa-whatsapp'></i>
                                <p onClick={() => {
                                    openModal("ModalEnviarWhatsapp");
                                    setMenuMensagensAberto(false);
                                }}>Enviar via Web Whatsapp</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}

export default Kanban;