import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import dadosFinanceiro from '../../dados-financeiro.json';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import ModalEfetuarPagamento from './ModalEfetuarPagamento';

const ContasAPagar = () => {
  const { showLoader, hideLoader } = useLoader();

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [showModalEfetuarPagamento, setShowModalEfetuarPagamento] = useState(false);

  const [dataInicial, setDataInicial, dataInicialRef] = UseInputMask();
  const [dataFinal, setDataFinal, dataFinalRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const pesquisarOptions = useMemo(() => [
    { value: 'parceiro', label: 'Parceiro' },
    { value: 'boleto', label: 'Boleto' },
    { value: 'historico', label: 'Histórico' },
    { value: 'referencia', label: 'Referência' }
  ], []);

  const bancoOptions = useMemo(() => dadosFinanceiro.opcoes.bancos.map(banco => ({
    value: banco,
    label: banco === 'todos' ? 'Todos' : banco
  })), []);

  const footerColumns = useMemo(() => [
    {
      name: "Valor Nominal",
      value: "valorNominal",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.valorNominalOriginal === 'number' ? item.valorNominalOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Coparticipação",
      value: "coparticipacao",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.coparticipacaoOriginal === 'number' ? item.coparticipacaoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Juros",
      value: "juros",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.jurosOriginal === 'number' ? item.jurosOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Multa",
      value: "multa",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.multaOriginal === 'number' ? item.multaOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Acréscimo",
      value: "acrescimo",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.acrescimoOriginal === 'number' ? item.acrescimoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Desconto",
      value: "desconto",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.descontoOriginal === 'number' ? item.descontoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Líquido",
      value: "liquido",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.liquidoOriginal === 'number' ? item.liquidoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    }
  ], []);

  const tabelaColumns = useMemo(() => [
    { value: "situacao", name: "Situação" },
    { value: "parceiro", name: "Parceiro" },
    { value: "referencia", name: "Referência" },
    { value: "historico", name: "Histórico" },
    { value: "tipoParcela", name: "Tipo de Parcela" },
    { value: "numeroBoleto", name: "Numero Boleto" },
    { value: "parcela", name: "Parcela" },
    { value: "centroCusto", name: "Centro Custo" },
    { 
      value: "datas", 
      name: "Datas",
      subColumns: [
        { value: "dataDocumento", name: "Documento" },
        { value: "venctoOriginal", name: "Vencto Original" },
        { value: "vencimento", name: "Vencimento" },
        { value: "pagamento", name: "Pagamento" }
      ]
    },
    {
      value: "valores",
      name: "Valores",
      subColumns: [
        { value: "valorNominal", name: "Nominal" },
        { value: "coparticipacao", name: "Coparticipação" },
        { value: "juros", name: "Juros" },
        { value: "multa", name: "Multa" },
        { value: "acrescimo", name: "Acréscimo" },
        { value: "desconto", name: "Desconto" },
        { value: "liquido", name: "Líquido" }
      ]
    }
  ], []);

  useEffect(() => {
  }, []);

  const handleResize = useCallback(() => {
    handleResizeTabela('contas-pagar', 'contas-pagar-container');
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
      
      const dados = dadosFinanceiro.tesouraria.contasAPagar.map(item => ({
        ...item,
        valorNominalFormatado: `R$ ${item.valorNominal.toFixed(2).replace('.', ',')}`,
        coparticipacaoFormatada: `R$ ${item.coparticipacao.toFixed(2).replace('.', ',')}`,
        jurosFormatado: `R$ ${item.juros.toFixed(2).replace('.', ',')}`,
        multaFormatada: `R$ ${item.multa.toFixed(2).replace('.', ',')}`,
        acrescimoFormatado: `R$ ${item.acrescimo.toFixed(2).replace('.', ',')}`,
        descontoFormatado: `R$ ${item.desconto.toFixed(2).replace('.', ',')}`,
        liquidoFormatado: `R$ ${item.liquido.toFixed(2).replace('.', ',')}`,
        dataDocumentoFormatada: item.dataDocumento ? new Date(item.dataDocumento + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        venctoOriginalFormatado: item.venctoOriginal ? new Date(item.venctoOriginal + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        vencimentoFormatado: item.vencimento ? new Date(item.vencimento + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        pagamentoFormatado: item.pagamento ? new Date(item.pagamento + 'T00:00:00').toLocaleDateString('pt-BR') : '-'
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

    if (dataInicial && dataFinal) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        const vencimento = new Date(item.vencimento + 'T00:00:00');
        const inicial = new Date(dataInicial + 'T00:00:00');
        const final = new Date(dataFinal + 'T00:00:00');
        return vencimento >= inicial && vencimento <= final;
      });
    }

    if (banco && banco !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.banco.toLowerCase().includes(banco.toLowerCase())
      );
    }

    if (texto) {
      const textoLower = texto.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(item => {
        if (pesquisar === 'parceiro') {
          return item.parceiro?.toLowerCase().includes(textoLower);
        } else if (pesquisar === 'boleto') {
          return item.numeroBoleto?.includes(texto);
        } else if (pesquisar === 'historico') {
          return item.historico?.toLowerCase().includes(textoLower);
        } else if (pesquisar === 'referencia') {
          return item.referencia?.toLowerCase().includes(textoLower);
        }
        return false;
      });
    }

    setFiltroDados(dadosFiltrados);
  }, [tabelaDados, dataInicial, dataFinal, banco, pesquisar, texto]);

  const limparFiltro = useCallback(() => {
    limparFiltros([
      { setter: setDataInicial, ref: dataInicialRef },
      { setter: setDataFinal, ref: dataFinalRef },
      { setter: setBanco, ref: bancoRef },
      { setter: setPesquisar, ref: pesquisarRef },
      { setter: setTexto, ref: textoRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  }, [tabelaDados, dadosCarregados]);

  const handleEfetuarPagamento = useCallback(() => {
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
      "Tem certeza que deseja efetuar o pagamento deste registro?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },
      (result) => {
        if (result) {
          setShowModalEfetuarPagamento(true);
        }
      }
    );
  }, [selecionados]);

  const handleCloseModalPagamento = useCallback(() => {
    setShowModalEfetuarPagamento(false);
  }, []);

  const dadosTabela = useMemo(() => dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    situacao: item.situacao,
    parceiro: item.parceiro,
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
    valorNominal: item.valorNominalFormatado,
    coparticipacao: item.coparticipacaoFormatada,
    juros: item.jurosFormatado,
    multa: item.multaFormatada,
    acrescimo: item.acrescimoFormatado,
    desconto: item.descontoFormatado,
    liquido: item.liquidoFormatado,
    valorNominalOriginal: item.valorNominal,
    coparticipacaoOriginal: item.coparticipacao,
    jurosOriginal: item.juros,
    multaOriginal: item.multa,
    acrescimoOriginal: item.acrescimo,
    descontoOriginal: item.desconto,
    liquidoOriginal: item.liquido
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
    fileName: "contas-a-pagar",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
    additionalButtons: [
      {
        title: 'Efetuar Pagamento',
        icon: 'fa-solid fa-money-bill-transfer',
        onClick: handleEfetuarPagamento
      }
    ]
  }), [handleGetDadosConfirmar, handleEfetuarPagamento]);

  return (
    <div className={styles.contasPagarContainer} id="contas-pagar-container">
      <h2 className={styles.contasPagarTitle}>
        <i className="fa-solid fa-credit-card"></i>
        Contas a Pagar
      </h2>
      
      <div className={styles.contasPagarContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h5>
              <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                Limpar filtro
              </button>
            </div>
            <div className={styles.filtroTabelaBody}>
              <UseInputPadrao 
                label="Data Vencimento Inicial"
                identifier="data-inicial" 
                type='date' 
                value={dataInicial}
                onChange={setDataInicial}
                inputRef={dataInicialRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Data Vencimento Final"
                identifier="data-final" 
                type='date'
                value={dataFinal}
                onChange={setDataFinal}
                inputRef={dataFinalRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Banco"
                identifier="banco" 
                value={banco}
                onChange={setBanco}
                inputRef={bancoRef}
                type='select'
                options={bancoOptions} 
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0} 
              />
              <UseInputPadrao 
                label="Pesquisar"
                identifier="pesquisar" 
                value={pesquisar}
                onChange={setPesquisar}
                inputRef={pesquisarRef}
                type='select'
                options={pesquisarOptions}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Texto"
                identifier="texto"
                icon="fa-solid fa-search"
                value={texto}
                onChange={setTexto}
                inputRef={textoRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0} 
                upperCase
              />
            </div>
          </div>
        </section>

        <TabelaPadrao
          tabelaId="contas-pagar"
          columns={tabelaColumns}
          data={dadosTabela}
          footer={footerColumns}
          options={tabelaOptions}
        />
        
        <ModalEfetuarPagamento 
          isOpen={showModalEfetuarPagamento}
          onClose={handleCloseModalPagamento}
        />
      </div>
    </div>
  );
};

export default ContasAPagar; 