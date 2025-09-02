import { useNavigate } from "react-router";
import { useState, useEffect, useContext, useMemo } from "react";
import { limparFiltros } from "../../../../../utils/functions";
import { UseInputMask } from "../../../../../components";
import { UseInputPadrao } from "../../../../../components";
import { TabelaPadrao } from "../../../../../components";
import { useCallback } from "react";
import styles from "./styles.module.css";
import GrupoBotoes from "../../../../../components/GrupoBotoes";
import ActionButtons from "../../../../../components/ActionButtonsPadrao"
import { jsonRoute } from "../../../../../utils/json";
import { BackscreenContext, useLoader } from "../../../../../context";
import ModalPadrao from "../../../../../components/ModalPadrao";
import AlterarNumero from "./Navegacoes/AlterarNumero";
import VincularRepresentante from "./Navegacoes/VincularRepresentante";
import AlterarVigencia from "./Navegacoes/AlterarVigencia";
import AlterarFormaPagamento from "./Navegacoes/AlterarFormaPagamento";
import AlterarValorContrato from "./Navegacoes/AlterarValorContrato";
import ReajustarValorContrato from "./Navegacoes/ReajustarValorContrato";
import DuplicarProposta from "./Navegacoes/DuplicarProposta";
import TrocaPlano from "./Navegacoes/TrocaPlano";
import ValidarContrato from "./modals/Acoes/ValidarContrato";
import RecusarContrato from "./modals/Acoes/RecusarContrato";
import PendenciarContrato from "./modals/Acoes/PendenciarContrato";
import DeletarContrato from "./modals/Acoes/DeletarContrato";
import AtivarContrato from "./modals/Acoes/AtivarContrato";
import StatusContrato from "./modals/Status";
import PendenciasContrato from "./modals/Pendencia";
import TransferenciaSegmento from "./Navegacoes/TransferenciaSegmento";
import InformacoesComplementares from "./Navegacoes/InformacoesComplementares";
import VisualizarBeneficiarios from "./Navegacoes/VisualizarBeneficiarios";
import DemonstrativoAnalitico from "./Navegacoes/DemonstrativoAnalitico";
import VisualizarUltimaChamada from "./Navegacoes/VisualizarUltimaChamada";
import CriarUmaChamada from "./Navegacoes/CriarUmaChamada";
import VisualizarPerguntasRespostas from "./Navegacoes/VisualizarPerguntasRespostas";
import VisualizarLog from "./Navegacoes/VisualizarLog";
import VisualizarCobertura from "./Navegacoes/VisualizarCobertura";
import InativarContrato from "./modals/Acoes/InativarContrato";
import toastMessage from "../../../../../assets/toast-ui/toast";
import { tableCollumns } from "./data/tableCollumns";
import { opAcompanhamento } from "./data/opAcompanhamento";
import { opPesquisar } from "./data/opPesquisar";
import { opTipoChamada } from "./data/opTipoChamada";
import { opStatus } from "./data/opStatus";

const AcompanhamentoClienteRepresentante = () => {
    //variaveis
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [transmissaoInicial, setTransmissaoInicial, transmissaoInicialRef] = UseInputMask();
    const [transmissaoFinal, setTransmissaoFinal, transmissaoFinalRef] = UseInputMask();
    const [opcoesPesquisa, setOpcoesPesquisa, opcoesPesquisaRef] = UseInputMask();
    const [texto, setTexto, textoRef] = UseInputMask();
    const [acompanhamento, setAcompanhamento, acompanhamentoRef] = UseInputMask();
    const [tipoChamada, setTipoChamada, tipoChamadaRef] = UseInputMask();
    const [status, setStatus, statusRef] = UseInputMask();

    const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
    const { showLoader, hideLoader } = useLoader();
    const [openModal, setOpenModal] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dataValidar, setDataValidar, dataValidarRef] = UseInputMask();
    const [filtro, setFiltro] = useState("");
    const [pesquisa, setPesquisa] = useState("todos");

    //Funções
    const handleNavigate = useCallback((route) => {
        navigate(route);
    }, [navigate]);

    const handleOpen = useCallback((type, item) => { 
        setSelectedItem(item); 
        setOpenModal(type); 
        showBackscreen(); 
    }, [showBackscreen]);


    const handleClose = useCallback(() => {
        setOpenModal(null);
        hideBackscreen();
    }, [hideBackscreen]);

    const copiarLinkContratante = () => {
        navigator.clipboard.writeText("sistema.hermanosti.com/operadora")
        toastMessage("Link copiado para a área de transferência!", "success")
    }


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const limparFiltro = () => {
        limparFiltros([
            { setter: setTransmissaoInicial, transmissaoInicialRef },
            { setter: setTransmissaoFinal, transmissaoFinalRef },
            { setter: setAcompanhamento, acompanhamentoRef },
            { setter: setOpcoesPesquisa, opcoesPesquisaRef },
            { setter: setTexto, textoRef }
        ]);
    };


    const handleRowClick = useCallback((row, rowIndex) => {
        showLoader();
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Representante_Area}/${jsonRoute.Venda_Representante}`);

    }, [handleNavigate]);

    const modalActions = [
        {
            text: "Voltar",
            onClick: () => handleClose(),
            className: styles.backButton,
            icon: "fas fa-arrow-left"
        },
        {
            text: "Gravar",
            onClick: () => handleClose(),
            className: styles.confirmButton,
            icon: "fas fa-save"
        }
    ];

    const modalActionsBen = [
        {
            text: "Voltar",
            onClick: () => handleClose(),
            className: styles.backButton,
            icon: "fas fa-arrow-left"
        },
    ]

    const parseData = (str) => {
        const [dia, mes, ano] = str.split("/").map(Number);
        return new Date(ano, mes - 1, dia); // mês em JS começa do 0
    };


    const tableData = [
        {
            acao: <GrupoBotoes
                actions={[
                    { title: "Status", icon: "fa-solid fa-user", color: "var(--cor-padrao)", onClick: () => handleOpen("status") },
                    { title: "Pendência", icon: "fa-solid fa-warning", color: "#970700", onClick: () => handleOpen("pendencia") },
                    {
                        title: "Notificação",
                        icon: "fa-solid fa-paper-plane",
                        color: "#00A8FF",
                        dropdown: [
                            { label: "Enviar Email para o Contratante", onClick: () => toastMessage("Enviado com sucesso!", "success") },
                            { label: "Enviar WhatsApp para o Contratante", onClick: () => toastMessage("Enviado com sucesso!", "success") },
                            { label: "Hotlink do Contratante para Assinatura Digital", onClick: () => copiarLinkContratante() },
                        ]
                    },
                    {
                        title: "Impressão",
                        icon: "fa-solid fa-print",
                        color: "#A57A0F",
                        dropdown: [
                            { label: "Imprimir PDF do Contrato", onClick: () => alert("Imprimir PDF contrato") },
                            { label: "Imprimir Informe do Rendimento", onClick: () => alert("Imprimir informe do rendimento") },
                            { label: "Imprimir Demonstrativo Pagamento por Segurado", onClick: () => alert("Imprimir demontrativo pagamento por segurado") },
                            { label: "Imprimir Demonstrativo Pagamento", onClick: () => alert("Imprimir demontrativo pagamento") },
                        ]
                    },
                    {
                        title: "Ações",
                        icon: "fa-solid fa-list",
                        color: "#000",
                        dropdown: [
                            { label: "Validar Contrato", onClick: () => handleOpen("validar") },
                            { label: "Recusar Contrato", onClick: () => handleOpen("recusar") },
                            { label: "Pendenciar Contrato", onClick: () => handleOpen("pendenciar") },
                            { label: "Deletar Contrato", onClick: () => handleOpen("deletar") },
                            { label: "Ativar Contrato", onClick: () => handleOpen("ativar") },
                            { label: "Suspender Contrato", onClick: () => handleOpen("suspender") },
                            { label: "Inativar Contrato", onClick: () => handleOpen("inativar") },
                        ]
                    },
                    { title: "Forma de Pagamento: Boleto", icon: "fa-solid fa-money-bill-1-wave", color: "#005200", onClick: () => handleOpen("validar") },
                    {
                        title: "Mais Opções",
                        icon: "fa-solid fa-ellipsis-vertical",
                        color: "#000",
                        dropdown: [
                            { label: "Alterar Número da Proposta", onClick: () => handleOpen("AlterarNumProposta") },
                            { label: "Vincular Representante", onClick: () => handleOpen("VinRepresentante") },
                            { label: "Alterar Vigência", onClick: () => handleOpen("AltVingencia") },
                            { label: "Alterar Forma de Pagamento", onClick: () => handleOpen("AltFormaPag") },
                            { label: "Alterar Valor do Contrato", onClick: () => handleOpen("AltValCont") },
                            { label: "Reajustar Valor do Contrato", onClick: () => handleOpen("ReaValCont") },
                            { label: "Duplicar Proposta", onClick: () => handleOpen("DupPro") },
                            { label: "Troca de Plano", onClick: () => handleOpen("TrocaPlano") },
                            { label: "Transferência de Segmento/Grade", onClick: () => handleOpen("TranSegm") },
                            { label: "Informações Complementares", onClick: () => handleOpen("InfoCom") },
                            { label: "Visualizar Beneficiários", onClick: () => handleOpen("VisBen") },
                            { label: "Demonstrativo Analitico", onClick: () => handleOpen("Demons") },
                            { label: "Visualizar Última Chamada", onClick: () => handleOpen("VisChamada") },
                            { label: "Criar uma Chamada", onClick: () => handleOpen("criaChamada") },
                            { label: "Visualizar Perguntas e Respostas", onClick: () => handleOpen("visPergResp") },
                            { label: "Visualizar Log", onClick: () => handleOpen("log") },
                            //{ label: "Visualizar Parcelas", onClick: () => handleOpen("edit") },
                            { label: "Visualizar Cobertura Geral", onClick: () => handleOpen("visCober") },
                        ]
                    },
                ]}
            />,
            referencia: "0017999",
            vidas: "2",
            cadastro: "15/08/2025",
            transmissao: "15/08/2025",
            tipo: "-",
            contratado: "HERMANOS EMP",
            nome: "TESTE",
            cpfCnpj: "99.999.999/9999-99",
            email: "teste@teste.com",
            corretora: "teste",
            supervisor: "teste",
            consultor: "teste"
        },
    ]
    const [dadosFiltrados, setDadosFiltrados] = useState(tableData); 
    const filtrarDados = () => {
        const filtroTexto = texto.toLowerCase();

        const resultado = tableData.filter((item) => {
            let ok = true;

            // Filtro por texto e campo selecionado
            if (texto) {
            if (opcoesPesquisa === "todos") {
                ok =
                item.referencia.toLowerCase().includes(filtro) ||
                item.nome.toLowerCase().includes(filtro) ||
                item.cpfCnpj.toLowerCase().includes(filtro) ||
                item.cadastro.toLowerCase().includes(filtro) ||
                item.vidas.toLowerCase().includes(filtro) ||
                item.transmissao.toLowerCase().includes(filtro) ||
                item.tipo.toLowerCase().includes(filtro) ||
                item.email.toLowerCase().includes(filtro) ||
                item.contratado.toLowerCase().includes(filtro) ||
                item.corretora.toLowerCase().includes(filtro) ||
                item.supervisor.toLowerCase().includes(filtro) ||
                item.consultor.toLowerCase().includes(filtro);
            } else {
                ok = item[opcoesPesquisa]?.toLowerCase().includes(filtroTexto);
            }
            }

            // Filtro por datas (Transmissão Inicial e Final)
            if (ok && transmissaoInicial) {
            ok = parseData(item.transmissao) >= new Date(transmissaoInicial);
            }
            if (ok && transmissaoFinal) {
            ok = parseData(item.transmissao) <= new Date(transmissaoFinal);
            }

            // Filtro por Acompanhamento (select)
            if (ok && acompanhamento && acompanhamento !== "todos") {
            ok = item.acompanhamento === acompanhamento;
            }

            return ok;
        });

        setDadosFiltrados(resultado);
    };
    return (
        <>
            <main>
                <h2 className={styles.TitleRepresentante}>
                    <i className="fa-solid fa-address-card"></i>
                    Acompanhamento
                </h2>
                <div className={styles.beneficiariosContent}>
                    <section className={styles.filtroTabelaField}>
                        <div className={styles.filtroTabelaContent}>
                            <div className={styles.filtroTabelaHeader}>
                                <h5 className={styles.filtroTabelaTitle}>
                                    <i className="fa-solid fa-filter"></i>
                                    Buscar por
                                </h5>
                                <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                                    <i className="fa-solid fa-filter-slash"></i> Limpar filtro
                                </button>
                            </div>
                            <div className={styles.divConteudo}>
                                <UseInputPadrao
                                    label="Transmissão - Inicial"
                                    identifier="transmissaoInicial"
                                    value={transmissaoInicial}
                                    onChange={setTransmissaoInicial}
                                    inputRef={transmissaoInicialRef}
                                    type="date"
                                    width={isMobile ? 100 : 15}
                                    gap={isMobile ? 0 : 0.5}
                                />
                                <UseInputPadrao
                                    label="Transmissão - Final"
                                    identifier="trasmissaoFinal"
                                    value={transmissaoFinal}
                                    onChange={setTransmissaoFinal}
                                    inputRef={transmissaoFinalRef}
                                    type="date"
                                    width={isMobile ? 100 : 15}
                                    gap={isMobile ? 0 : 0.5}
                                />
                                <UseInputPadrao
                                    label="Acompanhamento"
                                    identifier="acompanhamento"
                                    type="select"
                                    value={acompanhamento}
                                    onChange={setAcompanhamento}
                                    inputRef={acompanhamentoRef}
                                    options={opAcompanhamento}
                                    width={isMobile ? 100 : 35}
                                    gap={isMobile ? 0 : 0.5}
                                />
                                <UseInputPadrao
                                    label="Status"
                                    identifier="status"
                                    type="select"
                                    value={status}
                                    onChange={setStatus}
                                    inputRef={statusRef}
                                    options={opStatus}
                                    width={isMobile ? 100 : 35}
                                    gap={isMobile ? 0 : 0.5}
                                />
                            </div>
                            
                            <div className={styles.tabela} id="tabelaPadrao-container">
                                <TabelaPadrao
                                    id="statusAssociado"
                                    columns={tableCollumns}
                                    data={dadosFiltrados}
                                    options={{
                                        cardsPerPage: 10,
                                        showPagination: true,
                                        showExport: true,
                                        fileName: "Acompanhamento",
                                        showHeader: true,
                                        showFooter: true,
                                        toolbar: true,
                                        toolbarPosition: "right",
                                        showPaginationSwitch: true,
                                        showSearch: true,
                                        showRefresh: true,
                                        showToggleView: true,
                                        showColumnsSelector: true,
                                        showFilter: true,
                                        showGuardaCampos: true,
                                        paginationEnabled: true,
                                        /*rowOnClick: handleRowClick,*/
                                        toolbarComponent: () => (
                                            <div className={styles.filtroTabelaBody}>
                                                <UseInputPadrao
                                                    label="Opções de Pesquisa"
                                                    identifier="opcoesPesquisa"
                                                    value={opcoesPesquisa}
                                                    onChange={setOpcoesPesquisa}
                                                    inputRef={opcoesPesquisaRef}
                                                    type="select"
                                                    options={opPesquisar}
                                                    width={isMobile ? 100 : 33}
                                                    gap={isMobile ? 0 : 0.5}
                                                />
                                                <UseInputPadrao
                                                    label="Texto"
                                                    identifier="texto"
                                                    value={texto}
                                                    onChange={setTexto}
                                                    inputRef={textoRef}
                                                    width={isMobile ? 100 : 40}
                                                    gap={isMobile ? 0 : 0.5}
                                                    upperCase
                                                    inputButtonRight={[{
                                                         onClick: () => filtrarDados(),
                                                         text: 'Pesquisar',
                                                         className: styles.searchButton,
                                                    }]}
                                                />
                                            </div>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {openModal && (
                <>
                    {openModal === "status" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Histórico de Andamento"
                                contentOverflowY={true}
                            >
                                <StatusContrato />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "pendencia" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Histórico de Pendência"
                                contentOverflowY={true}
                            >
                                <PendenciasContrato />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "validar" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Validar Contrato"
                                actions={modalActions}

                            >
                                <ValidarContrato />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "recusar" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Recusar Contrato"
                                actions={modalActions}
                            >
                                <RecusarContrato />
                            </ModalPadrao>
                        </>
                    )}


                    {openModal === "pendenciar" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Pendenciar Contrato"
                                actions={modalActions}
                            >
                                <PendenciarContrato />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "deletar" && (

                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Deletar Contrato"
                                actions={modalActions}
                            >
                                <DeletarContrato />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "ativar" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Ativar Contrato"
                                actions={modalActions}
                            >
                                <AtivarContrato />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "inativar" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Inativar Contrato"
                                actions={modalActions}
                            >
                                <InativarContrato />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "TrocaPlano" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Troca de Plano"
                                actions={modalActions}
                            >
                                <TrocaPlano />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "AlterarNumProposta" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Número da Proposta"
                                actions={modalActions}
                            >
                                <AlterarNumero />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "VinRepresentante" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Vincular Representante"
                                actions={modalActions}
                            >
                                <VincularRepresentante />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "AltVingencia" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Vigência"
                                actions={modalActions}
                            >
                                <AlterarVigencia />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "AltFormaPag" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Forma de Pagamento"
                                actions={modalActions}
                            >
                                <AlterarFormaPagamento />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "AltValCont" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Forma de Pagamento"
                                actions={modalActions}
                            >
                                <AlterarValorContrato />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "ReaValCont" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Forma de Pagamento"
                                actions={modalActions}
                            >
                                <ReajustarValorContrato />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "AlterarNumProposta" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Número da Proposta"
                                actions={modalActions}
                            >
                                <AlterarNumero />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "VinRepresentante" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Vincular Representante"
                                actions={modalActions}
                            >
                                <VincularRepresentante />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "AltVingencia" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Vigência"
                                actions={modalActions}
                            >
                                <AlterarVigencia />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "AltFormaPag" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Forma de Pagamento"
                                actions={modalActions}
                            >
                                <AlterarFormaPagamento />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "AltValCont" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Alterar Valor Contrato"
                                actions={modalActions}
                            >
                                <AlterarValorContrato />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "ReaValCont" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Reajustar Valor Contrato"
                                actions={modalActions}
                            >
                                <ReajustarValorContrato />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "DupPro" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Duplicar Proposta"
                                actions={modalActions}
                                contentOverflowY={true}
                            >
                                <DuplicarProposta />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "TranSegm" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Transferência de Segmento/Grade"
                                actions={modalActions}
                            >
                                <TransferenciaSegmento />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "InfoCom" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Informações Complementares"
                                actions={modalActions}
                            >
                                <InformacoesComplementares />
                            </ModalPadrao>
                        </>
                    )}

                    {openModal === "VisBen" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Beneficiários"
                                actions={modalActionsBen}
                            >
                                <VisualizarBeneficiarios />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "Demons" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Competencia"
                                actions={modalActions}
                            >
                                <DemonstrativoAnalitico />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "VisChamada" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Competencia"
                                actions={modalActions}
                            >
                                <VisualizarUltimaChamada />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "criaChamada" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Criar Chamada"
                                actions={modalActions}
                            >
                                <CriarUmaChamada />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "visPergResp" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Visualizar Perguntas e Respostas"
                                actions={modalActions}
                            >
                                <VisualizarPerguntasRespostas />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "log" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Log de Auditoria"
                                actions={modalActions}
                            >
                                <VisualizarLog />
                            </ModalPadrao>
                        </>
                    )}
                    {openModal === "visCober" && (
                        <>
                            <ModalPadrao
                                isOpen={openModal}
                                onClose={handleClose}
                                title="Cobertura(s)"
                                actions={modalActionsBen}
                            >
                                <VisualizarCobertura />
                            </ModalPadrao>
                        </>
                    )}
                </>
            )}

        </>
    )
}


export default AcompanhamentoClienteRepresentante;