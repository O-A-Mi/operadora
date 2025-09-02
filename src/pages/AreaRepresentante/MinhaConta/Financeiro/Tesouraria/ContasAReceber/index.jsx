import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import dadosFinanceiro from '../../dados-financeiro.json';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import ModalConfirmarRecebimento from './ModalConfirmarRecebimento';

const ContasAReceber = () => {
  const { showLoader, hideLoader } = useLoader();
  const [expandedTabs, setExpandedTabs] = useState(['pesquisa']);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [showModalConfirmarRecebimento, setShowModalConfirmarRecebimento] = useState(false);

  const [banco, setBanco, bancoRef] = UseInputMask();
  const [faturamento, setFaturamento, faturamentoRef] = UseInputMask();
  const [dataInicial, setDataInicial, dataInicialRef] = UseInputMask();
  const [dataFinal, setDataFinal, dataFinalRef] = UseInputMask();
  const [tipoParcela, setTipoParcela, tipoParcelaRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const footerColumns = useMemo(() => [
    {
      name: "Tx.Associativa",
      value: "txAssociativa",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.txAssociativaOriginal === 'number' ? item.txAssociativaOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Tx.Administrativa",
      value: "txAdministrativa",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.txAdministrativaOriginal === 'number' ? item.txAdministrativaOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Vr.Reajuste Anual",
      value: "vrReajusteAnual",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.vrReajusteAnualOriginal === 'number' ? item.vrReajusteAnualOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Vr.Inclusão Retroativa",
      value: "vrInclusaoRetroativa",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.vrInclusaoRetroativaOriginal === 'number' ? item.vrInclusaoRetroativaOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Vr.Reajuste Fx.Idade",
      value: "vrReajusteFxIdade",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.vrReajusteFxIdadeOriginal === 'number' ? item.vrReajusteFxIdadeOriginal : 0;
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

  const tabs = useMemo(() => [
    { id: 'pesquisa', label: 'Pesquisa', icon: 'fa-solid fa-search' },
    { id: 'configuracoes', label: 'Configurações', icon: 'fa-solid fa-cog' },
    { id: 'datas', label: 'Datas', icon: 'fa-solid fa-calendar-days' }
  ], []);

  const toggleTab = useCallback((tabId) => {
    setExpandedTabs(prev => 
      prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  }, []);

  const bancoOptions = useMemo(() => dadosFinanceiro.opcoes.bancos.map(banco => ({
    value: banco,
    label: banco === 'todos' ? 'Todos' : banco
  })), []);

  const faturamentoOptions = useMemo(() => dadosFinanceiro.opcoes.faturamento.map(fat => ({
    value: fat,
    label: fat === 'todos' ? 'Todos' : fat.charAt(0).toUpperCase() + fat.slice(1)
  })), []);

  const tipoParcelaOptions = useMemo(() => dadosFinanceiro.opcoes.tiposParcela.map(tipo => ({
    value: tipo,
    label: tipo.charAt(0).toUpperCase() + tipo.slice(1)
  })), []);

  const grupoContratualOptions = useMemo(() => dadosFinanceiro.opcoes.gruposContratuais.map(grupo => ({
    value: grupo,
    label: grupo
  })), []);

  const pesquisarOptions = useMemo(() => dadosFinanceiro.opcoes.pesquisarOpcoes.map(opcao => ({
    value: opcao,
    label: opcao.charAt(0).toUpperCase() + opcao.slice(1)
  })), []);

  const tabelaColumns = useMemo(() => [
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
        { value: "txAssociativa", name: "Tx.Associativa" },
        { value: "txAdministrativa", name: "Tx.Administrativa" },
        { value: "vrReajusteAnual", name: "Vr.Reajuste Anual" },
        { value: "juros", name: "Juros" },
        { value: "multa", name: "Multa" },
        { value: "acrescimo", name: "Acréscimo" },
        { value: "desconto", name: "Desconto" },
        { value: "vrInclusaoRetroativa", name: "Vr.Inclusão Retroativa" },
        { value: "vrReajusteFxIdade", name: "Vr.Reajuste Fx.Idade" },
        { value: "liquido", name: "Líquido" }
      ]
    }
  ], []);

  useEffect(() => {
  }, []);

  const handleResize = useCallback(() => {
    handleResizeTabela('contas-receber', 'contas-receber-container');
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
      
      const dados = dadosFinanceiro.tesouraria.contasAReceber.map(item => ({
        ...item,
        valorNominalFormatado: `R$ ${item.valorNominal.toFixed(2).replace('.', ',')}`,
        coparticipacaoFormatada: `R$ ${item.coparticipacao.toFixed(2).replace('.', ',')}`,
        txAssociativaFormatada: `R$ ${item.txAssociativa.toFixed(2).replace('.', ',')}`,
        txAdministrativaFormatada: `R$ ${item.txAdministrativa.toFixed(2).replace('.', ',')}`,
        vrReajusteAnualFormatado: `R$ ${item.vrReajusteAnual.toFixed(2).replace('.', ',')}`,
        jurosFormatado: `R$ ${item.juros.toFixed(2).replace('.', ',')}`,
        multaFormatada: `R$ ${item.multa.toFixed(2).replace('.', ',')}`,
        acrescimoFormatado: `R$ ${item.acrescimo.toFixed(2).replace('.', ',')}`,
        descontoFormatado: `R$ ${item.desconto.toFixed(2).replace('.', ',')}`,
        vrInclusaoRetroativaFormatada: `R$ ${item.vrInclusaoRetroativa.toFixed(2).replace('.', ',')}`,
        vrReajusteFxIdadeFormatada: `R$ ${item.vrReajusteFxIdade.toFixed(2).replace('.', ',')}`,
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

    if (banco && banco !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.banco.toLowerCase().includes(banco.toLowerCase())
      );
    }

    if (faturamento && faturamento !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.faturamento === faturamento
      );
    }

    if (dataInicial && dataFinal) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        const vencimento = new Date(item.vencimento + 'T00:00:00');
        const inicial = new Date(dataInicial + 'T00:00:00');
        const final = new Date(dataFinal + 'T00:00:00');
        return vencimento >= inicial && vencimento <= final;
      });
    }

    if (tipoParcela && tipoParcela !== 'Todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.tipoParcela.toLowerCase().includes(tipoParcela.toLowerCase())
      );
    }

    if (grupoContratual) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.grupoContratual === grupoContratual
      );
    }

    if (texto) {
      const textoLower = texto.toLowerCase();
      
      if (pesquisar === 'parceiro') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.parceiro.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'referencia') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.referencia.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'historico') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.historico.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'numero_boleto') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.numeroBoleto.toLowerCase().includes(textoLower)
        );
      }
    }

    setFiltroDados(dadosFiltrados);
  }, [tabelaDados, banco, faturamento, dataInicial, dataFinal, tipoParcela, grupoContratual, texto, pesquisar]);

  const limparFiltro = useCallback(() => {
    limparFiltros([
      { setter: setBanco, ref: bancoRef },
      { setter: setFaturamento, ref: faturamentoRef },
      { setter: setDataInicial, ref: dataInicialRef },
      { setter: setDataFinal, ref: dataFinalRef },
      { setter: setTipoParcela, ref: tipoParcelaRef },
      { setter: setGrupoContratual, ref: grupoContratualRef },
      { setter: setPesquisar, ref: pesquisarRef },
      { setter: setTexto, ref: textoRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  }, [tabelaDados, dadosCarregados]);

  const handleConfirmarRecebimento = useCallback(() => {
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
      "Tem certeza que deseja efetuar o recebimento desse registro?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },
      (result) => {
        if (result) {
          setShowModalConfirmarRecebimento(true);
        }
      }
    );
  }, [selecionados]);

  const handleCloseModal = useCallback(() => {
    setShowModalConfirmarRecebimento(false);
  }, []);

  const renderTabContent = useCallback((tabId) => {
    switch (tabId) {
      case 'configuracoes':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao 
              label="Banco"
              identifier="banco" 
              value={banco}
              onChange={setBanco}
              inputRef={bancoRef}
              type='select'
              options={bancoOptions} 
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao 
              label="Faturamento"
              identifier="faturamento" 
              value={faturamento}
              onChange={setFaturamento}
              inputRef={faturamentoRef}
              type='select'
              options={faturamentoOptions} 
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao 
              label="Tipo de Parcela"
              identifier="tipo-parcela" 
              value={tipoParcela}
              onChange={setTipoParcela}
              inputRef={tipoParcelaRef}
              type='select'
              options={tipoParcelaOptions} 
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao 
              label="Grupo Contratual"
              identifier="grupo-contratual" 
              value={grupoContratual}
              onChange={setGrupoContratual}
              inputRef={grupoContratualRef}
              type='select'
              options={grupoContratualOptions} 
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
              multiple={true}
            />
          </div>
        );

      case 'datas':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao 
              label="Data Inicial"
              identifier="data-inicial" 
              type='date' 
              value={dataInicial}
              onChange={setDataInicial}
              inputRef={dataInicialRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao 
              label="Data Final"
              identifier="data-final" 
              type='date'
              value={dataFinal}
              onChange={setDataFinal}
              inputRef={dataFinalRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      case 'pesquisa':
        return (
          <div className={styles.tabContent}>
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
              placeholder="Digite o texto para pesquisar..."
              upperCase
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      default:
        return null;
    }
  }, [banco, faturamento, tipoParcela, grupoContratual, dataInicial, dataFinal, pesquisar, texto, isMobile, bancoOptions, faturamentoOptions, tipoParcelaOptions, grupoContratualOptions, pesquisarOptions]);

  const dadosTabela = useMemo(() => dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
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
    txAssociativa: item.txAssociativaFormatada,
    txAdministrativa: item.txAdministrativaFormatada,
    vrReajusteAnual: item.vrReajusteAnualFormatado,
    juros: item.jurosFormatado,
    multa: item.multaFormatada,
    acrescimo: item.acrescimoFormatado,
    desconto: item.descontoFormatado,
    vrInclusaoRetroativa: item.vrInclusaoRetroativaFormatada,
    vrReajusteFxIdade: item.vrReajusteFxIdadeFormatada,
    liquido: item.liquidoFormatado,
    txAssociativaOriginal: item.txAssociativa,
    txAdministrativaOriginal: item.txAdministrativa,
    vrReajusteAnualOriginal: item.vrReajusteAnual,
    vrInclusaoRetroativaOriginal: item.vrInclusaoRetroativa,
    vrReajusteFxIdadeOriginal: item.vrReajusteFxIdade,
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
    fileName: "contas-a-receber",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
    additionalButtons: [
      {
        title: 'Confirmar Recebimento',
        icon: 'fa-solid fa-check-circle',
        onClick: handleConfirmarRecebimento
      }
    ]
  }), [handleGetDadosConfirmar, handleConfirmarRecebimento]);

  return (
    <div className={styles.contasReceberContainer} id="contas-receber-container">
      <h2 className={styles.contasReceberTitle}>
        <i className="fa-solid fa-hand-holding-dollar"></i>
        Contas a Receber
      </h2>
      <div className={styles.contasReceberContent}>
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
            
            <div className={styles.tabsContainer}>
              <div className={styles.tabsHeader}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${
                      expandedTabs.includes(tab.id) ? styles.active : ""
                    }`}
                    onClick={() => toggleTab(tab.id)}
                  >
                    <i className={tab.icon} />
                    {tab.label}
                    <i className={`fa-solid fa-chevron-down`} />
                  </button>
                ))}
              </div>

              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`${styles.tabPanel} ${
                    expandedTabs.includes(tab.id)
                      ? styles.expanded
                      : styles.collapsed
                  }`}
                >
                  {renderTabContent(tab.id)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.tabelaSection}>
          <TabelaPadrao
            tabelaId="contas-receber"
            columns={tabelaColumns}
            data={dadosTabela}
            footer={footerColumns}
            options={tabelaOptions}
          />
        </div>
      </div>
      
      <ModalConfirmarRecebimento 
        isOpen={showModalConfirmarRecebimento}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ContasAReceber;