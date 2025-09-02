import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import dadosFinanceiro from '../../dados-financeiro.json';
import dadosRemessaDigital from './dados-remessa-digital.json';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import toastMessage from '../../../../../../assets/toast-ui/toast';

const RemessaBancoDigital = () => {
  const { showLoader, hideLoader } = useLoader();

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState(['pesquisa']);

  const [dtVencimentoInicial, setDtVencimentoInicial, dtVencimentoInicialRef] = UseInputMask();
  const [dtVencimentoFinal, setDtVencimentoFinal, dtVencimentoFinalRef] = UseInputMask();
  const [dtDocumentoInicial, setDtDocumentoInicial, dtDocumentoInicialRef] = UseInputMask();
  const [dtDocumentoFinal, setDtDocumentoFinal, dtDocumentoFinalRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
  const [tipoContratante, setTipoContratante, tipoContratanteRef] = UseInputMask();
  const [formaEnvioBoleto, setFormaEnvioBoleto, formaEnvioBoletoRef] = UseInputMask();
  const [statusLancamento, setStatusLancamento, statusLancamentoRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const bancoOptions = useMemo(() => dadosFinanceiro.opcoes.bancos.map(banco => ({
    value: banco,
    label: banco === 'todos' ? 'Todos' : banco
  })), []);

  const grupoContratualOptions = useMemo(() => dadosFinanceiro.opcoes.gruposContratuais.map(grupo => ({
    value: grupo,
    label: grupo === 'todos' ? 'Todos' : grupo
  })), []);

  const tipoContratanteOptions = useMemo(() => [
    { value: 'todos', label: 'Todos' },
    { value: 'pessoa_fisica', label: 'Pessoa Física' },
    { value: 'pessoa_juridica', label: 'Pessoa Jurídica' }
  ], []);

  const formaEnvioBoletoOptions = useMemo(() => [
    { value: 'todos', label: 'Todos' },
    { value: 'correio', label: 'Correio' },
    { value: 'motoqueiro', label: 'Motoqueiro' },
    { value: 'sms', label: 'SMS' },
    { value: 'email', label: 'E-mail' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ], []);

  const statusLancamentoOptions = useMemo(() => [
    { value: 'todos', label: 'TODOS' },
    { value: 'ativo', label: 'ATIVO' },
    { value: 'cancelado', label: 'CANCELADO' },
    { value: 'em_analise', label: 'EM ANÁLISE PELA OPERADORA' },
    { value: 'ibbca_suspenso', label: 'IBBCA SUSPENSO' },
    { value: 'inadimplente_ibbca', label: 'INADIMPLENTE IBBCA' },
    { value: 'inativo', label: 'INATIVO' },
    { value: 'inativo_inadimplencia', label: 'INATIVO POR INADIMPLÊNCIA' },
    { value: 'rescisao_contratual', label: 'RESCISÃO CONTRATUAL' },
    { value: 'suspenso', label: 'SUSPENSO' }
  ], []);

  const pesquisarOptions = useMemo(() => [
    { value: 'parceiro', label: 'Parceiro' },
    { value: 'boleto', label: 'Boleto' },
    { value: 'historico', label: 'Histórico' },
    { value: 'referencia', label: 'Referência' }
  ], []);

  const tabs = useMemo(() => [
    { id: 'pesquisa', label: 'Pesquisa', icon: 'fa-solid fa-search' },
    { id: 'datas', label: 'Datas', icon: 'fa-solid fa-calendar-days' },
    { id: 'configuracoes', label: 'Configurações', icon: 'fa-solid fa-cog' },
  ], []);

  const tabelaColumns = useMemo(() => [
    { value: "parceiro", name: "Parceiro" },
    { value: "referencia", name: "Referência" },
    { value: "historico", name: "Histórico" },
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

  const handleResize = useCallback(() => {
    handleResizeTabela('remessa-banco-digital', 'remessa-banco-digital-container');
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
      
      const dados = dadosRemessaDigital.map(item => ({
        ...item,
        parceiro: item.representante,
        centroCusto: item.convenio,
        dataDocumento: item.dtVencto ? new Date(item.dtVencto.split('/').reverse().join('-') + 'T00:00:00').toISOString().split('T')[0] : '',
        venctoOriginal: item.dtVencto ? new Date(item.dtVencto.split('/').reverse().join('-') + 'T00:00:00').toISOString().split('T')[0] : '',
        vencimento: item.dtVencto ? new Date(item.dtVencto.split('/').reverse().join('-') + 'T00:00:00').toISOString().split('T')[0] : '',
        pagamento: null,
        valorNominal: parseFloat(item.valor.replace('R$ ', '').replace(',', '.')),
        coparticipacao: 0.00,
        juros: 0.00,
        multa: 0.00,
        acrescimo: 0.00,
        desconto: 0.00,
        liquido: parseFloat(item.valor.replace('R$ ', '').replace(',', '.')),
        valorNominalFormatado: item.valor,
        coparticipacaoFormatada: 'R$ 0,00',
        jurosFormatado: 'R$ 0,00',
        multaFormatada: 'R$ 0,00',
        acrescimoFormatado: 'R$ 0,00',
        descontoFormatado: 'R$ 0,00',
        liquidoFormatado: item.valor,
        dataDocumentoFormatada: item.dtVencto,
        venctoOriginalFormatado: item.dtVencto,
        vencimentoFormatado: item.dtVencto,
        pagamentoFormatado: '-'
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

  const aplicarFiltros = useCallback(() => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let dadosFiltrados = [...tabelaDados];

    if (dtVencimentoInicial && dtVencimentoFinal) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        if (!item.vencimento) return false;
        const vencimento = new Date(item.vencimento + 'T00:00:00');
        const inicial = new Date(dtVencimentoInicial + 'T00:00:00');
        const final = new Date(dtVencimentoFinal + 'T00:00:00');
        return vencimento >= inicial && vencimento <= final;
      });
    }

    if (banco && banco !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.banco.toLowerCase().includes(banco.toLowerCase())
      );
    }

    if (grupoContratual && grupoContratual !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.grupoContratual === grupoContratual
      );
    }

    if (tipoContratante && tipoContratante !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.tipoContratante === tipoContratante
      );
    }

    if (formaEnvioBoleto && formaEnvioBoleto !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.formaEnvioBoleto === formaEnvioBoleto
      );
    }

    if (statusLancamento && statusLancamento !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.statusLancamento === statusLancamento
      );
    }

    if (dtDocumentoInicial && dtDocumentoFinal) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        if (!item.dataDocumento) return false;
        const dataDocumento = new Date(item.dataDocumento + 'T00:00:00');
        const inicial = new Date(dtDocumentoInicial + 'T00:00:00');
        const final = new Date(dtDocumentoFinal + 'T00:00:00');
        return dataDocumento >= inicial && dataDocumento <= final;
      });
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
  }, [tabelaDados, dadosCarregados, dtVencimentoInicial, dtVencimentoFinal, dtDocumentoInicial, dtDocumentoFinal, banco, grupoContratual, tipoContratante, formaEnvioBoleto, statusLancamento, texto, pesquisar, carregarDados]);

  useEffect(() => {
    if (dadosCarregados && tabelaDados.length > 0) {
      aplicarFiltros();
    }
  }, [aplicarFiltros, dadosCarregados, tabelaDados.length]);

  const limparFiltrosHandler = useCallback(() => {
    limparFiltros([
      { setter: setDtVencimentoInicial, ref: dtVencimentoInicialRef },
      { setter: setDtVencimentoFinal, ref: dtVencimentoFinalRef },
      { setter: setDtDocumentoInicial, ref: dtDocumentoInicialRef },
      { setter: setDtDocumentoFinal, ref: dtDocumentoFinalRef },
      { setter: setBanco, ref: bancoRef, defaultValue: 'todos' },
      { setter: setGrupoContratual, ref: grupoContratualRef, defaultValue: 'todos' },
      { setter: setTipoContratante, ref: tipoContratanteRef, defaultValue: 'todos' },
      { setter: setFormaEnvioBoleto, ref: formaEnvioBoletoRef, defaultValue: 'todos' },
      { setter: setStatusLancamento, ref: statusLancamentoRef, defaultValue: 'todos' },
      { setter: setPesquisar, ref: pesquisarRef, defaultValue: 'parceiro' },
      { setter: setTexto, ref: textoRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  }, [tabelaDados, dadosCarregados]);

  const handleLiberarRegistro = useCallback(() => {
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
      "Tem certeza que deseja liberado esse registro?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },
      (result) => {
        if (result) {
          toastMessage("Registro liberado com sucesso", "success");
        }
      }
    );
  }, [selecionados]);



  const toggleTab = useCallback((tabId) => {
    setExpandedTabs(prev =>
      prev.includes(tabId)
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  }, []);

  const renderTabContent = useCallback((tabId) => {
    switch (tabId) {
      case 'datas':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Dt. Vencimento - Inicial"
              type="date"
              value={dtVencimentoInicial}
              onChange={setDtVencimentoInicial}
              inputRef={dtVencimentoInicialRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Dt. Vencimento - Final"
              type="date"
              value={dtVencimentoFinal}
              onChange={setDtVencimentoFinal}
              inputRef={dtVencimentoFinalRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Dt. Documento - Inicial"
              type="date"
              value={dtDocumentoInicial}
              onChange={setDtDocumentoInicial}
              inputRef={dtDocumentoInicialRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Dt. Documento - Final"
              type="date"
              value={dtDocumentoFinal}
              onChange={setDtDocumentoFinal}
              inputRef={dtDocumentoFinalRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );
      case 'configuracoes':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Banco Digital"
              type="select"
              value={banco}
              onChange={setBanco}
              inputRef={bancoRef}
              options={bancoOptions}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Grupo Contratual"
              type="select"
              value={grupoContratual}
              onChange={setGrupoContratual}
              inputRef={grupoContratualRef}
              options={grupoContratualOptions}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Tipo Contratante"
              type="select"
              value={tipoContratante}
              onChange={setTipoContratante}
              inputRef={tipoContratanteRef}
              options={tipoContratanteOptions}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Forma Envio Boleto"
              type="select"
              value={formaEnvioBoleto}
              onChange={setFormaEnvioBoleto}
              inputRef={formaEnvioBoletoRef}
              options={formaEnvioBoletoOptions}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Status Lancamento"
              type="select"
              value={statusLancamento}
              onChange={setStatusLancamento}
              inputRef={statusLancamentoRef}
              options={statusLancamentoOptions}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0}
              multiple={true}
            />
          </div>
        );
      case 'pesquisa':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Pesquisar"
              type="select"
              value={pesquisar}
              onChange={setPesquisar}
              inputRef={pesquisarRef}
              options={pesquisarOptions}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Texto"
              type="text"
              icon="fa-solid fa-search"
              value={texto}
              onChange={setTexto}
              inputRef={textoRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
              upperCase
            />
          </div>
        );
      default:
        return null;
    }
  }, [dtVencimentoInicial, dtVencimentoFinal, dtDocumentoInicial, dtDocumentoFinal, banco, grupoContratual, tipoContratante, formaEnvioBoleto, statusLancamento, texto, pesquisar, isMobile, bancoOptions, grupoContratualOptions, tipoContratanteOptions, formaEnvioBoletoOptions, statusLancamentoOptions]);

  const dadosTabela = useMemo(() => dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    parceiro: item.parceiro,
    referencia: item.referencia,
    historico: item.historico,
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
    valorOriginal: item.valorNominal
  })) : [], [filtroDados, dadosCarregados]);

  const handleGetDadosConfirmar = useCallback((selectedData) => {
    setSelecionados(selectedData || []);
  }, []);

  const tabelaOptions = useMemo(() => ({
    showPaginationSwitch: true,
    showSearch: () => aplicarFiltros(),
    showToggleView: true,
    showColumnsSelector: true,
    showPrint: false,
    showExport: true,
    showFooter: true,
    fileName: "remessa-banco-digital",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
    additionalButtons: [
      {
        title: 'Liberar Registro',
        icon: 'fa-solid fa-unlock',
        onClick: handleLiberarRegistro
      }
    ]
  }), [handleGetDadosConfirmar, handleLiberarRegistro]);

  return (
    <div className={styles.remessaBancoDigitalContainer} id="remessa-banco-digital-container">
      <h2 className={styles.remessaBancoDigitalTitle}>
        <i className="fa-solid fa-digital-tachograph"></i>
        Remessa Banco Digital
      </h2>
      
      <div className={styles.remessaBancoDigitalContent}>
        <div className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h5>
              <button className={styles.filtroTabelaButton} onClick={limparFiltrosHandler}>
                Limpar filtro
              </button>
            </div>
            <div className={styles.tabsContainer}>
              <div className={styles.tabsHeader}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${expandedTabs.includes(tab.id) ? styles.active : ''}`}
                    onClick={() => toggleTab(tab.id)}
                  >
                    <i className={tab.icon} />
                    {tab.label}
                    <i className="fa-solid fa-chevron-down" />
                  </button>
                ))}
              </div>
              {tabs.map(tab => (
                <div
                  key={tab.id}
                  className={`${styles.tabPanel} ${expandedTabs.includes(tab.id) ? styles.expanded : styles.collapsed}`}
                >
                  {renderTabContent(tab.id)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.tabelaSection}>
          <TabelaPadrao
            tabelaId="remessa-banco-digital"
            columns={tabelaColumns}
            data={dadosTabela}
            footer={[
              {
                name: "Total",
                value: "total",
                data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                  return tabelaBody.length.toString();
                }
              },
              {
                name: "Total Valor",
                value: "totalValor",
                data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                  const total = tabelaBody.reduce((acc, item) => {
                    const valor = typeof item.valorOriginal === 'number' ? item.valorOriginal : 0;
                    return acc + valor;
                  }, 0);
                  return `R$ ${total.toFixed(2).replace('.', ',')}`;
                }
              },
              {
                name: "Selecionados",
                value: "selecionados",
                data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                  return selecionados.length.toString();
                }
              },
              {
                name: "Total Selecionados",
                value: "totalSelecionados",
                data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                  const total = selecionados.reduce((acc, item) => {
                    const valor = typeof item.valorOriginal === 'number' ? item.valorOriginal : 0;
                    return acc + valor;
                  }, 0);
                  return `R$ ${total.toFixed(2).replace('.', ',')}`;
                }
              }
            ]}
            options={tabelaOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default RemessaBancoDigital; 