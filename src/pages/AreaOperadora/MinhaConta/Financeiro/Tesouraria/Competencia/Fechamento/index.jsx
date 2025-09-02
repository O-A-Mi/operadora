import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../../components/InputPadrao';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoader } from '../../../../../../../context';
import { TabelaPadrao } from '../../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../../utils/functions';
import dadosFinanceiro from '../../../dados-financeiro.json';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';
import ModalMotivoFechamento from './ModalMotivoFechamento';

const Fechamento = () => {
  const { showLoader, hideLoader } = useLoader();

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [showModalMotivoFechamento, setShowModalMotivoFechamento] = useState(false);

  const [periodoInicial, setPeriodoInicial, periodoInicialRef] = UseInputMask();
  const [chave, setChave, chaveRef] = UseInputMask();
  const [tipoParcela, setTipoParcela, tipoParcelaRef] = UseInputMask();

  const footerColumns = useMemo(() => [
    {
      name: "Valor Pago",
      value: "valorPago",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.pagoOriginal === 'number' ? item.pagoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    }
  ], []);

  const chaveOptions = useMemo(() => [
    { value: 'Crédito', label: 'Crédito' },
    { value: 'Débito', label: 'Débito' },
    { value: 'Todos', label: 'Todos' }
  ], []);

  const tipoParcelaOptions = useMemo(() => [
    { value: 'Todos', label: 'Todos' },
    { value: 'adesão', label: 'Adesão' },
    { value: 'adesão serv. adicional', label: 'Adesão serv. adicional' },
    { value: 'Mensalidade', label: 'Mensalidade' }
  ], []);

  const tabelaColumns = useMemo(() => [
    { value: "parceiro", name: "Parceiro" },
    { value: "chave", name: "Chave" },
    { value: "referencia", name: "Referência" },
    { value: "historico", name: "Histórico" },
    { value: "tipoParcela", name: "Tipo de Parcela" },
    { value: "numeroBoleto", name: "Nº Boleto" },
    { value: "parcela", name: "Parcela" },
    { value: "centroCusto", name: "Centro Custo" },
    { 
      value: "datas", 
      name: "Datas",
      subColumns: [
        { value: "dataDocumento", name: "Documento" },
        { value: "venctoOriginal", name: "Vencto Original" },
        { value: "vencimento", name: "Vencimento" },
        { value: "pagamento", name: "Pagamento" },
        { value: "credito", name: "Crédito" },
        { value: "arquivoRetorno", name: "Arquivo Retorno" }
      ]
    },
    {
      value: "valores",
      name: "Valores",
      subColumns: [
        { value: "valorNominal", name: "Nominal" },
        { value: "coparticipacao", name: "Coparticipação" },
        { value: "txAssociativa", name: "Tx.Associativa" },
        { value: "txAdministrativa", name: "Tx.Administrativa" },
        { value: "juros", name: "Juros" },
        { value: "multa", name: "Multa" },
        { value: "acrescimo", name: "Acréscimo" },
        { value: "desconto", name: "Desconto" },
        { value: "liquido", name: "Líquido" },
        { value: "pago", name: "Pago" }
      ]
    }
  ], []);

  useEffect(() => {
  }, []);

  const handleResize = useCallback(() => {
    handleResizeTabela('fechamento-competencia', 'fechamento-competencia-container');
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("layout-resize", handleResize);

    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("layout-resize", handleResize);
      clearTimeout(timer);
    };
  }, [handleResize]);

  const carregarDados = useCallback(async () => {
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const dados = dadosFinanceiro.tesouraria.competencia.fechamento.map(item => ({
        ...item,
        valorNominalFormatado: `R$ ${item.valorNominal.toFixed(2).replace('.', ',')}`,
        coparticipacaoFormatada: `R$ ${item.coparticipacao.toFixed(2).replace('.', ',')}`,
        txAssociativaFormatada: `R$ ${item.txAssociativa.toFixed(2).replace('.', ',')}`,
        txAdministrativaFormatada: `R$ ${item.txAdministrativa.toFixed(2).replace('.', ',')}`,
        jurosFormatado: `R$ ${item.juros.toFixed(2).replace('.', ',')}`,
        multaFormatada: `R$ ${item.multa.toFixed(2).replace('.', ',')}`,
        acrescimoFormatado: `R$ ${item.acrescimo.toFixed(2).replace('.', ',')}`,
        descontoFormatado: `R$ ${item.desconto.toFixed(2).replace('.', ',')}`,
        liquidoFormatado: `R$ ${item.liquido.toFixed(2).replace('.', ',')}`,
        pagoFormatado: `R$ ${item.pago.toFixed(2).replace('.', ',')}`,
        dataDocumentoFormatada: item.dataDocumento ? new Date(item.dataDocumento + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        venctoOriginalFormatado: item.venctoOriginal ? new Date(item.venctoOriginal + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        vencimentoFormatado: item.vencimento ? new Date(item.vencimento + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        pagamentoFormatado: item.pagamento ? new Date(item.pagamento + 'T00:00:00').toLocaleDateString('pt-BR') : '-',
        creditoFormatado: item.credito ? new Date(item.credito + 'T00:00:00').toLocaleDateString('pt-BR') : '-',
        arquivoRetornoFormatado: item.arquivoRetorno ? new Date(item.arquivoRetorno + 'T00:00:00').toLocaleDateString('pt-BR') : '-'
      }));
      
      setTabelaDados(dados);
      setFiltroDados(dados);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  const filtrarDados = useCallback(() => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let dadosFiltrados = [...tabelaDados];

    if (periodoInicial) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        const pagamento = new Date(item.pagamento + 'T00:00:00');
        const inicial = new Date(periodoInicial + 'T00:00:00');
        return pagamento >= inicial;
      });
    }

    if (chave && chave !== 'Todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.chave === chave
      );
    }

    if (tipoParcela && tipoParcela !== 'Todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.tipoParcela.toLowerCase().includes(tipoParcela.toLowerCase())
      );
    }

    setFiltroDados(dadosFiltrados);
  }, [tabelaDados, periodoInicial, chave, tipoParcela]);

  const limparFiltro = useCallback(() => {
    limparFiltros([
      { setter: setPeriodoInicial, ref: periodoInicialRef },
      { setter: setChave, ref: chaveRef },
      { setter: setTipoParcela, ref: tipoParcelaRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  }, [tabelaDados, dadosCarregados]);

  const handleEfetuarFechamento = useCallback(() => {
    if (!selecionados || selecionados.length === 0) {
      dialogMessage("Selecione ao menos um registro para prosseguir", "warning", { 
        confirmButton: false,
        buttonsText: {
          close: "OK"
        }
      });
      return;
    }
    
    dialogMessage(
      "Tem certeza que deseja efetuar o fechamento deste registro?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },
      (result) => {
        if (result) {
          setShowModalMotivoFechamento(true);
        }
      }
    );
  }, [selecionados]);

  const handleCloseModalFechamento = useCallback(() => {
    setShowModalMotivoFechamento(false);
  }, []);

  const dadosTabela = useMemo(() => dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    parceiro: item.parceiro,
    chave: item.chave,
    referencia: item.referencia,
    historico: item.historico,
    tipoParcela: item.tipoParcela,
    numeroBoleto: item.numeroBoleto,
    parcela: item.parcela,
    centroCusto: item.centroCusto,
    dataDocumento: item.dataDocumentoFormatada,
    venctoOriginal: item.venctoOriginalFormatado,
    vencimento: item.vencimentoFormatado,
    pagamento: item.pagamentoFormatado,
    credito: item.creditoFormatado,
    arquivoRetorno: item.arquivoRetornoFormatado,
    valorNominal: item.valorNominalFormatado,
    coparticipacao: item.coparticipacaoFormatada,
    txAssociativa: item.txAssociativaFormatada,
    txAdministrativa: item.txAdministrativaFormatada,
    juros: item.jurosFormatado,
    multa: item.multaFormatada,
    acrescimo: item.acrescimoFormatado,
    desconto: item.descontoFormatado,
    liquido: item.liquidoFormatado,
    pago: item.pagoFormatado,
    pagoOriginal: item.pago
  })) : [], [filtroDados, dadosCarregados]);

  const handleGetDadosConfirmar = useCallback((selectedData) => {
    setSelecionados(selectedData || []);
  }, []);

  const tabelaOptions = useMemo(() => ({
    showPaginationSwitch: true,
    showSearch: () => filtrarDados(),
    showToggleView: true,
    showColumnsSelector: true,
    showPrint: false,
    showExport: true,
    showFooter: true,
    fileName: "fechamento-competencia",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
    additionalButtons: [
      {
        title: 'Efetuar Fechamento',
        icon: 'fa-solid fa-lock',
        onClick: handleEfetuarFechamento
      }
    ]
  }), [handleGetDadosConfirmar, handleEfetuarFechamento]);

  return (
    <div className={styles.fechamentoContainer} id="fechamento-competencia-container">
      <h2 className={styles.fechamentoTitle}>
        <i className="fa-solid fa-lock"></i>
        Fechamento por Competência
      </h2>
      
      <div className={styles.fechamentoContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h6 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h6>
              <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                Limpar filtro
              </button>
            </div>
            <div className={styles.filtroTabelaBody}>
              <UseInputPadrao 
                label="Período Pagamento"
                identifier="periodo-inicial" 
                type='date' 
                value={periodoInicial}
                onChange={setPeriodoInicial}
                inputRef={periodoInicialRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Chave"
                identifier="chave" 
                value={chave}
                onChange={setChave}
                inputRef={chaveRef}
                type='select'
                options={chaveOptions} 
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Tipo de Parcela"
                identifier="tipo-parcela" 
                value={tipoParcela}
                onChange={setTipoParcela}
                inputRef={tipoParcelaRef}
                type='select'
                options={tipoParcelaOptions} 
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0} 
              />
            </div>
          </div>
        </section>

        <TabelaPadrao
          tabelaId="fechamento-competencia"
          columns={tabelaColumns}
          data={dadosTabela}
          footer={footerColumns}
          options={tabelaOptions}
        />
        
        <ModalMotivoFechamento 
          isOpen={showModalMotivoFechamento}
          onClose={handleCloseModalFechamento}
        />
      </div>
    </div>
  );
};

export default Fechamento; 