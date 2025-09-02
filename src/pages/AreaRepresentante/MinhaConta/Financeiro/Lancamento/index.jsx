import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from "../../../../../components/InputPadrao";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLoader } from '../../../../../context';
import { TabelaPadrao } from '../../../../../components';
import { handleResizeTabela, limparFiltros } from '../../../../../utils/functions';
import { jsonRoute } from '../../../../../utils/json';
import dadosLancamento from './dados-lancamento.json';

const Lancamento = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [expandedTabs, setExpandedTabs] = useState(['pesquisa']);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);

  const [tipo, setTipo, tipoRef] = UseInputMask();
  const [vencimentoInicial, setVencimentoInicial, vencimentoInicialRef] = UseInputMask();
  const [vencimentoFinal, setVencimentoFinal, vencimentoFinalRef] = UseInputMask();
  const [tipoParcela, setTipoParcela, tipoParcelaRef] = UseInputMask();
  const [situacao, setSituacao, situacaoRef] = UseInputMask();
  const [status, setStatus, statusRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [representante, setRepresentante, representanteRef] = UseInputMask(null, 'text', 'todos');
  const [boletoUnificado, setBoletoUnificado, boletoUnificadoRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();  

  const tabs = [
    { id: 'pesquisa', label: 'Pesquisa', icon: 'fa-solid fa-search' },
    { id: 'configuracoes', label: 'Configurações', icon: 'fa-solid fa-cog' },
    { id: 'datas', label: 'Datas', icon: 'fa-solid fa-calendar-days' }
  ];

  const toggleTab = (tabId) => {
    setExpandedTabs(prev => 
      prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  const tipoOptions = [
    { value: 'Cliente', label: 'Cliente' },
    { value: 'Receita', label: 'Receita' },
    { value: 'Despesa', label: 'Despesa' },
    { value: 'Funcionário', label: 'Funcionário' },
    { value: 'Fornecedor', label: 'Fornecedor' },
    { value: 'Representante', label: 'Representante' }
  ];

  const tipoParcelaOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'Adesão', label: 'Adesão' },
    { value: 'Adesão Serv. Adicional', label: 'Adesão Serv. Adicional' },
    { value: 'Mensalidade', label: 'Mensalidade' },
    { value: 'Participação', label: 'Participação' },
    { value: 'Avulso', label: 'Avulso' }
  ];

  const situacaoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'Sim', label: 'Pago' },
    { value: 'Não', label: 'Não Pago' }
  ];

  const statusOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Inadimplente', label: 'Inadimplente' }
  ];

  const bancoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'Assim Saúde', label: 'Assim Saúde' },
    { value: 'Odonto Corp', label: 'Odonto Corp' },
    { value: 'Teste', label: 'Teste' },
    { value: 'Hermanos Pet', label: 'Hermanos Pet' }
  ];

  const boletoUnificadoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'Sim', label: 'Sim' },
    { value: 'Não', label: 'Não' }
  ];

  const representanteOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'João Silva', label: 'João Silva' },
    { value: 'Maria Santos', label: 'Maria Santos' },
    { value: 'Pedro Oliveira', label: 'Pedro Oliveira' }
  ];

  const pesquisarOptions = [
    { value: 'referencia', label: 'Referência' },
    { value: 'historico', label: 'Histórico' },
    { value: 'nosso_numero', label: 'Nosso Número' },
    { value: 'boleto', label: 'Boleto' },
    { value: 'proposta', label: 'Proposta' },
    { value: 'numero_nota_fiscal', label: 'Número Nota Fiscal' },
    { value: 'estado', label: 'Estado' }
  ];

  const getTabelaColumns = () => {
    const getPlanoContasColumnName = () => {
      if (tipo === "Cliente") {
        return "Cliente";
      }
      if (tipo === "Despesa") {
        return "Plano de Contas - Débito";
      }
      if (tipo === "Fornecedor") {
        return "Fornecedor";
      }
      if (tipo === "Funcionário") {
        return "Funcionário";
      }
      if (tipo === "Representante") {
        return "Representante";
      }
      return "Plano de Contas - Crédito";
    };

    return [
      { value: "acao", name: "Ação" },
      { value: "pago", name: "Pago" },
      { value: "acaoJudicial", name: "Ação Judicial" },
      { value: "serasa", name: "Serasa" },
      { value: "planoContas", name: getPlanoContasColumnName() },
      { value: "associado", name: "Associado" },
      { value: "referencia", name: "Referência" },
      { value: "historico", name: "Histórico" },
      { value: "tipoParcela", name: "Tipo de Parcela" },
      { value: "statusFi", name: "Status FI" },
      { value: "statusProposta", name: "Status Proposta" },
      { value: "grupoContrato", name: "Grupo Contrato" },
      { value: "convenio", name: "Convênio" },
      { value: "nossoNumero", name: "Nosso Número" },
      { value: "numeroBoleto", name: "Nº Boleto" },
      { value: "numeroNotaFiscal", name: "Nº Nota Fiscal" },
      { value: "parcela", name: "Parcela" },
      { value: "centroCusto", name: "Centro Custo" },
      { 
        value: "datas", 
        name: "Datas",
        subColumns: [
          { value: "vencimento", name: "Vencimento" },
          { value: "pagamento", name: "Pagamento" },
          { value: "documento", name: "Documento" },
          { value: "venctoOriginal", name: "Vencto Original" },
          { value: "credito", name: "Crédito" },
          { value: "arquivoRetorno", name: "Arquivo Retorno" },
          { value: "diasAtraso", name: "Dias Atraso" }
        ]
      },
      {
        value: "valores",
        name: "Valores",
        subColumns: [
          { value: "nominal", name: "Nominal" },
          { value: "coparticipacao", name: "Coparticipação" },
          { value: "txAssociativa", name: "Tx.Associativa" },
          { value: "txAdministrativa", name: "Tx.Administrativa" },
          { value: "vrReajusteAnual", name: "Vr. Reajuste Anual" },
          { value: "juros", name: "Juros" },
          { value: "multa", name: "Multa" },
          { value: "acrescimo", name: "Acréscimo" },
          { value: "desconto", name: "Desconto" },
          { value: "vrInclusaoRetroativa", name: "Vr. Inclusão Retroativa" },
          { value: "vrReajusteFxIdade", name: "Vr. Reajuste Fx.Idade" },
          { value: "liquido", name: "Líquido" }
        ]
      },
      {
        value: "representante",
        name: "Representante",
        subColumns: [
          { value: "corretora", name: "Corretora" },
          { value: "supervisor", name: "Supervisor" },
          { value: "consultor", name: "Consultor" }
        ]
      }
    ];
  };

  useEffect(() => {
    hideLoader();
  }, [hideLoader]);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('lancamento', 'lancamento-container');
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    const timer = setTimeout(() => {
      handleResizeTabela('lancamento', 'lancamento-container');
    }, 100);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
      clearTimeout(timer);
    };
  }, []);

  const carregarDados = async () => {
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const dados = dadosLancamento || [];
      const dadosFormatados = dados.map(item => ({
        ...item,
        tipo: item.tipo || 'Receita',
        nominalFormatado: typeof item.nominal === 'number' ? `R$ ${item.nominal.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        coparticipacaoFormatada: typeof item.coparticipacao === 'number' ? `R$ ${item.coparticipacao.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        txAssociativaFormatada: typeof item.txAssociativa === 'number' ? `R$ ${item.txAssociativa.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        txAdministrativaFormatada: typeof item.txAdministrativa === 'number' ? `R$ ${item.txAdministrativa.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        vrReajusteAnualFormatado: typeof item.vrReajusteAnual === 'number' ? `R$ ${item.vrReajusteAnual.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        jurosFormatado: typeof item.juros === 'number' ? `R$ ${item.juros.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        multaFormatada: typeof item.multa === 'number' ? `R$ ${item.multa.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        acrescimoFormatado: typeof item.acrescimo === 'number' ? `R$ ${item.acrescimo.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        descontoFormatado: typeof item.desconto === 'number' ? `R$ ${item.desconto.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        vrInclusaoRetroativaFormatada: typeof item.vrInclusaoRetroativa === 'number' ? `R$ ${item.vrInclusaoRetroativa.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        vrReajusteFxIdadeFormatada: typeof item.vrReajusteFxIdade === 'number' ? `R$ ${item.vrReajusteFxIdade.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        liquidoFormatado: typeof item.liquido === 'number' ? `R$ ${item.liquido.toFixed(2).replace('.', ',')}` : 'R$ 0,00',
        pagoFormatado: item.pago
      }));
      
      setTabelaDados(dadosFormatados);
      setFiltroDados(dadosFormatados);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      hideLoader();
    }
  };

  const filtrarDados = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let filtrados = tabelaDados;

    if (tipo) {
      filtrados = filtrados.filter(item => item.tipo === tipo);
    }

    if (vencimentoInicial) {
      filtrados = filtrados.filter(item => 
        new Date(item.vencimento) >= new Date(vencimentoInicial)
      );
    }

    if (vencimentoFinal) {
      filtrados = filtrados.filter(item => 
        new Date(item.vencimento) <= new Date(vencimentoFinal)
      );
    }

    if (tipoParcela) {
      filtrados = filtrados.filter(item => item.tipoParcela === tipoParcela);
    }

    if (situacao) {
      filtrados = filtrados.filter(item => item.pago === situacao);
    }

    if (status) {
      filtrados = filtrados.filter(item => item.statusFi === status);
    }

    if (banco) {
      filtrados = filtrados.filter(item => item.convenio === banco);
    }

    if (representante && representante !== 'todos') {
      filtrados = filtrados.filter(item => item.representante === representante);
    }

    if (boletoUnificado) {
      filtrados = filtrados.filter(item => item.pago === boletoUnificado);
    }

    if (texto) {
      const textoLower = texto.toLowerCase();
      
      if (pesquisar === 'referencia') {
        filtrados = filtrados.filter(item => 
          item.referencia.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'historico') {
        filtrados = filtrados.filter(item => 
          item.historico.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'nosso_numero') {
        filtrados = filtrados.filter(item => 
          item.nossoNumero.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'boleto') {
        filtrados = filtrados.filter(item => 
          item.numeroBoleto.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'proposta') {
        filtrados = filtrados.filter(item => 
          item.statusProposta.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'numero_nota_fiscal') {
        filtrados = filtrados.filter(item => 
          item.numeroNotaFiscal.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'estado') {
        filtrados = filtrados.filter(item => 
          item.statusFi.toLowerCase().includes(textoLower)
        );
      }
    }

    setFiltroDados(filtrados);
  };

  const limparFiltro = () => {
    limparFiltros([
      { setter: setTipo, ref: tipoRef }, 
      { setter: setVencimentoInicial, ref: vencimentoInicialRef }, 
      { setter: setVencimentoFinal, ref: vencimentoFinalRef }, 
      { setter: setTipoParcela, ref: tipoParcelaRef }, 
      { setter: setSituacao, ref: situacaoRef }, 
      { setter: setStatus, ref: statusRef }, 
      { setter: setBanco, ref: bancoRef }, 
      { setter: setRepresentante, ref: representanteRef, defaultValue: 'todos' }, 
      { setter: setBoletoUnificado, ref: boletoUnificadoRef }, 
      { setter: setPesquisar, ref: pesquisarRef }, 
      { setter: setTexto, ref: textoRef }, 
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case 'configuracoes':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Tipo"
              identifier="tipo"
              value={tipo}
              onChange={setTipo} 
              inputRef={tipoRef}
              type="select"
              options={tipoOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Situação"
              identifier="situacao"
              value={situacao}
              onChange={setSituacao}
              inputRef={situacaoRef}
              type="select"
              options={situacaoOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Status"
              identifier="status"
              value={status}
              onChange={setStatus}
              inputRef={statusRef}
              type="select"
              options={statusOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Tipo Parcela"
              identifier="tipo-parcela"
              value={tipoParcela}
              onChange={setTipoParcela}
              inputRef={tipoParcelaRef}
              type="select"
              options={tipoParcelaOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Banco"
              identifier="banco"
              value={banco}
              onChange={setBanco}
              inputRef={bancoRef}
              type="select"
              options={bancoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Representante"
              identifier="representante"
              value={representante}
              onChange={setRepresentante}
              inputRef={representanteRef}
              type="select"
              options={representanteOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Boleto Unificado"
              identifier="boleto-unificado"
              value={boletoUnificado}
              onChange={setBoletoUnificado}
              inputRef={boletoUnificadoRef}
              type="select"
              options={boletoUnificadoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
            /> 
          </div>
        );

      case 'datas':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Vencimento - Inicial"
              identifier="vencimento-inicial"
              type="date"
              value={vencimentoInicial}
              onChange={setVencimentoInicial}
              inputRef={vencimentoInicialRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Vencimento - Final"
              identifier="vencimento-final"
              type="date"
              value={vencimentoFinal}
              onChange={setVencimentoFinal}
              inputRef={vencimentoFinalRef}
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
              type="select"
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
        );

      default:
        return null;
    }
  };

  const footerColumns = [
    {
      name: "Total Líquido",
      value: "totalLiquido",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.liquidoOriginal === 'number' ? item.liquidoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Total Pago",
      value: "totalPago",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = item.pago === "Sim" ? item.liquidoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Total Registros",
      value: "totalRegistros",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        return tabelaBody.length.toString();
      }
    }
  ];

  const dadosTabela = dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    acao: item.acao,
    pago: item.pago,
    acaoJudicial: item.acaoJudicial,
    serasa: item.serasa,
    associado: item.associado,
    referencia: item.referencia,
    historico: item.historico,
    tipoParcela: item.tipoParcela,
    statusFi: item.statusFi,
    statusProposta: item.statusProposta,
    grupoContrato: item.grupoContrato,
    convenio: item.convenio,
    nossoNumero: item.nossoNumero,
    numeroBoleto: item.numeroBoleto,
    numeroNotaFiscal: item.numeroNotaFiscal,
    parcela: item.parcela,
    centroCusto: item.centroCusto,
    planoContas: item.planoContas || 'Plano de Contas',
    datas: item.datas,
    valores: item.valores,
    representante: item.representante,
    vencimento: item.vencimento,
    pagamento: item.pagamento,
    documento: item.documento,
    venctoOriginal: item.venctoOriginal,
    credito: item.credito,
    arquivoRetorno: item.arquivoRetorno,
    diasAtraso: item.diasAtraso,
    nominal: item.nominalFormatado,
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
    corretora: item.corretora,
    supervisor: item.supervisor,
    consultor: item.consultor,
    liquidoOriginal: item.liquido,
  })) : [];

  const handleRowClick = (row, rowIndex) => {
    navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Financeiro}/${jsonRoute.Lancamento}/${jsonRoute.LancamentoNovo}`, {
      state: {
        lancamentoParaEdicao: row,
        modoEdicao: true
      }
    });
  };

  return (
    <div className={styles.lancamentoContainer} id="lancamento-container">
      <div className={styles.lancamentoHeader}>
        <h2 className={styles.lancamentoTitle}>
          <i className="fa-solid fa-receipt"></i>
          Lançamento
        </h2>
      </div>

      <div className={styles.lancamentoContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h5>
              <button
                className={styles.filtroTabelaButton}
                onClick={limparFiltro}
              >
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
            tabelaId="lancamento"
            columns={getTabelaColumns()}
            data={dadosTabela}
            footer={footerColumns}
            options={{
              showPaginationSwitch: true,
              showSearch: () => filtrarDados(),
              showToggleView: true,
              showColumnsSelector: true,
              showPrint: false,
              showExport: true,
              showFooter: true,
              fileName: "lancamento",
              rowOnClick: handleRowClick,
              additionalButtons: [
                {
                  title: 'Novo Lançamento',
                  icon: 'fa-regular fa-file-lines',
                  onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Financeiro}/${jsonRoute.Lancamento}/${jsonRoute.LancamentoNovo}`)
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Lancamento; 