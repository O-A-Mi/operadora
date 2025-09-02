import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import dadosFinanceiro from '../../dados-financeiro.json';
import dadosRemessa from './dados-remessa.json';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';

const ArquivoRemessa = () => {
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
  const [tipo, setTipo, tipoRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
  const [entidade, setEntidade, entidadeRef] = UseInputMask();
  const [tipoContratante, setTipoContratante, tipoContratanteRef] = UseInputMask();
  const [formaEnvioBoleto, setFormaEnvioBoleto, formaEnvioBoletoRef] = UseInputMask();
  const [statusLancamento, setStatusLancamento, statusLancamentoRef] = UseInputMask();
  const [gerarArquivoCancelamento, setGerarArquivoCancelamento, gerarArquivoCancelamentoRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const bancoOptions = useMemo(() => dadosFinanceiro.opcoes.bancos.map(banco => ({
    value: banco,
    label: banco === 'todos' ? 'Todos' : banco
  })), []);

  const convenioOptions = useMemo(() => dadosFinanceiro.opcoes.convenios.map(convenio => ({
    value: convenio,
    label: convenio === 'todos' ? 'Todos' : convenio
  })), []);

  const grupoContratualOptions = useMemo(() => dadosFinanceiro.opcoes.gruposContratuais.map(grupo => ({
    value: grupo,
    label: grupo === 'todos' ? 'Todos' : grupo
  })), []);

  const entidadeOptions = useMemo(() => dadosFinanceiro.opcoes.entidades.map(entidade => ({
    value: entidade,
    label: entidade === 'todos' ? 'Todos' : entidade
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

  const gerarArquivoCancelamentoOptions = useMemo(() => [
    { value: 'nao', label: 'Não' },
    { value: 'sim', label: 'Sim' }
  ], []);

  const tipoOptions = useMemo(() => [
    { value: 'todos', label: 'Todos' },
    { value: 'enviado', label: 'Enviado' },
    { value: 'nao_enviado', label: 'Não Enviado' }
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
        { value: "vencimento", name: "Vencimento" }
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
    handleResizeTabela('arquivo-remessa', 'arquivo-remessa-container');
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
      
      const dados = dadosRemessa.map(item => ({
        ...item,
        valorNominalFormatado: item.valor,
        coparticipacaoFormatada: `R$ 0,00`,
        jurosFormatado: `R$ 0,00`,
        multaFormatada: `R$ 0,00`,
        acrescimoFormatado: `R$ 0,00`,
        descontoFormatado: `R$ 0,00`,
        liquidoFormatado: item.valor,
        dataDocumentoFormatada: item.dtVencto ? new Date(item.dtVencto.split('/').reverse().join('-') + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        venctoOriginalFormatado: item.dtVencto ? new Date(item.dtVencto.split('/').reverse().join('-') + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        vencimentoFormatado: item.dtVencto ? new Date(item.dtVencto.split('/').reverse().join('-') + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        pagamentoFormatado: '-',
        parceiro: item.representante,
        referencia: item.referencia,
        historico: item.historico,
        numeroBoleto: item.numeroBoleto,
        parcela: item.parcela,
        centroCusto: item.plano,
        dataDocumento: item.dtVencto ? item.dtVencto.split('/').reverse().join('-') : '',
        venctoOriginal: item.dtVencto ? item.dtVencto.split('/').reverse().join('-') : '',
        vencimento: item.dtVencto ? item.dtVencto.split('/').reverse().join('-') : '',
        valorNominal: parseFloat(item.valor.replace('R$ ', '').replace(',', '.')),
        coparticipacao: 0,
        juros: 0,
        multa: 0,
        acrescimo: 0,
        desconto: 0,
        liquido: parseFloat(item.valor.replace('R$ ', '').replace(',', '.')),
        valorOriginal: parseFloat(item.valor.replace('R$ ', '').replace(',', '.'))
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

    if (dtDocumentoInicial && dtDocumentoFinal) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        const documento = new Date(item.dataDocumento + 'T00:00:00');
        const inicial = new Date(dtDocumentoInicial + 'T00:00:00');
        const final = new Date(dtDocumentoFinal + 'T00:00:00');
        return documento >= inicial && documento <= final;
      });
    }

    if (tipo && tipo !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.tipo === tipo
      );
    }

    if (banco && banco !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.banco.toLowerCase().includes(banco.toLowerCase())
      );
    }

    if (convenio && convenio !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.convenio === convenio
      );
    }

    if (grupoContratual && grupoContratual !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.grupoContratual === grupoContratual
      );
    }

    if (entidade && entidade !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.entidade === entidade
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
  }, [tabelaDados, dadosCarregados, dtVencimentoInicial, dtVencimentoFinal, dtDocumentoInicial, dtDocumentoFinal, tipo, banco, convenio, grupoContratual, entidade, tipoContratante, formaEnvioBoleto, statusLancamento, texto, pesquisar]);

  useEffect(() => {
    if (tabelaDados.length > 0) {
      aplicarFiltros();
    }
  }, [aplicarFiltros]);

  const limparFiltros = useCallback(() => {
    limparFiltros([
      { setter: setDtVencimentoInicial, ref: dtVencimentoInicialRef },
      { setter: setDtVencimentoFinal, ref: dtVencimentoFinalRef },
      { setter: setDtDocumentoInicial, ref: dtDocumentoInicialRef },
      { setter: setDtDocumentoFinal, ref: dtDocumentoFinalRef },
      { setter: setTipo, ref: tipoRef, defaultValue: 'todos' },
      { setter: setBanco, ref: bancoRef, defaultValue: 'todos' },
      { setter: setConvenio, ref: convenioRef, defaultValue: 'todos' },
      { setter: setGrupoContratual, ref: grupoContratualRef, defaultValue: 'todos' },
      { setter: setEntidade, ref: entidadeRef, defaultValue: 'todos' },
      { setter: setTipoContratante, ref: tipoContratanteRef, defaultValue: 'todos' },
      { setter: setFormaEnvioBoleto, ref: formaEnvioBoletoRef, defaultValue: 'todos' },
      { setter: setStatusLancamento, ref: statusLancamentoRef, defaultValue: 'todos' },
      { setter: setGerarArquivoCancelamento, ref: gerarArquivoCancelamentoRef, defaultValue: 'nao' },
      { setter: setPesquisar, ref: pesquisarRef, defaultValue: 'parceiro' },
      { setter: setTexto, ref: textoRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  }, [tabelaDados, dadosCarregados]);



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
              label="Dt. Vencimento Inicial"
              type="date"
              value={dtVencimentoInicial}
              onChange={setDtVencimentoInicial}
              inputRef={dtVencimentoInicialRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Dt. Vencimento Final"
              type="date"
              value={dtVencimentoFinal}
              onChange={setDtVencimentoFinal}
              inputRef={dtVencimentoFinalRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Dt. Documento Inicial"
              type="date"
              value={dtDocumentoInicial}
              onChange={setDtDocumentoInicial}
              inputRef={dtDocumentoInicialRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Dt. Documento Final"
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
              label="Tipo"
              type="select"
              value={tipo}
              onChange={setTipo}
              inputRef={tipoRef}
              options={tipoOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Banco"
              type="select"
              value={banco}
              onChange={setBanco}
              inputRef={bancoRef}
              options={bancoOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Convênio"
              type="select"
              value={convenio}
              onChange={setConvenio}
              inputRef={convenioRef}
              options={convenioOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Grupo Contratual"
              type="select"
              value={grupoContratual}
              onChange={setGrupoContratual}
              inputRef={grupoContratualRef}
              options={grupoContratualOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Entidade"
              type="select"
              value={entidade}
              onChange={setEntidade}
              inputRef={entidadeRef}
              options={entidadeOptions}
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
              label="Status Lançamento"
              type="select"
              value={statusLancamento}
              onChange={setStatusLancamento}
              inputRef={statusLancamentoRef}
              options={statusLancamentoOptions}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0.5}
              multiple={true}
            />
            <UseInputPadrao
              label="Gerar Arquivo Cancelamento"
              type="select"
              value={gerarArquivoCancelamento}
              onChange={setGerarArquivoCancelamento}
              inputRef={gerarArquivoCancelamentoRef}
              options={gerarArquivoCancelamentoOptions}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0}
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
  }, [dtVencimentoInicial, dtVencimentoFinal, dtDocumentoInicial, dtDocumentoFinal, tipo, banco, convenio, grupoContratual, entidade, tipoContratante, formaEnvioBoleto, statusLancamento, gerarArquivoCancelamento, pesquisar, texto, isMobile, tipoOptions, bancoOptions, convenioOptions, grupoContratualOptions, entidadeOptions, tipoContratanteOptions, formaEnvioBoletoOptions, statusLancamentoOptions, gerarArquivoCancelamentoOptions, pesquisarOptions]);

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
    fileName: "arquivo-remessa",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
    additionalButtons: [
      {
        title: 'Gerar Arquivo',
        icon: 'fa-solid fa-file-code',
        onClick: () => {
          if (!selecionados || selecionados.length === 0) {
            dialogMessage("Selecione ao menos um registro para prosseguir", "warning", { 
              confirmButton: false,
              buttonsText: {
                close: "OK"
              }
            });
            return;
          }

        }
      },
      {
        title: 'Zip com Boleto',
        icon: 'fa-solid fa-file-zipper',
        onClick: () => {
          if (!selecionados || selecionados.length === 0) {
            dialogMessage("Selecione ao menos um registro para prosseguir", "warning", { 
              confirmButton: false,
              buttonsText: {
                close: "OK"
              }
            });
            return;
          }

        }
      },
      {
        title: 'Unificação de Boleto',
        icon: 'fa-solid fa-file-invoice-dollar',
        onClick: () => {
          if (!selecionados || selecionados.length === 0) {
            dialogMessage("Selecione ao menos um registro para prosseguir", "warning", { 
              confirmButton: false,
              buttonsText: {
                close: "OK"
              }
            });
            return;
          }

        }
      },
      {
        title: 'Detalhamento do Beneficiário',
        icon: 'fa-solid fa-user-friends',
        onClick: () => {
          if (!selecionados || selecionados.length === 0) {
            dialogMessage("Selecione ao menos um registro para prosseguir", "warning", { 
              confirmButton: false,
              buttonsText: {
                close: "OK"
              }
            });
            return;
          }

        }
      }
    ]
  }), [handleGetDadosConfirmar, selecionados]);

  return (
    <div className={styles.arquivoRemessaContainer} id="arquivo-remessa-container">
      <h2 className={styles.arquivoRemessaTitle}>
        <i className="fa-solid fa-file-export"></i>
        Arquivo Remessa
      </h2>
      
      <div className={styles.arquivoRemessaContent}>
        <div className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h5>
              <button className={styles.filtroTabelaButton} onClick={limparFiltros}>
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
            tabelaId="arquivo-remessa"
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

export default ArquivoRemessa; 