import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import dadosFinanceiro from '../../dados-financeiro.json';

const FluxoCaixa = () => {
  const { showLoader, hideLoader } = useLoader();
  const [expandedTabs, setExpandedTabs] = useState(['pesquisa']);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);

  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [plano, setPlano, planoRef] = UseInputMask();
  const [tipoData, setTipoData, tipoDataRef] = UseInputMask();
  const [dataInicial, setDataInicial, dataInicialRef] = UseInputMask();
  const [dataFinal, setDataFinal, dataFinalRef] = UseInputMask();
  const [chave, setChave, chaveRef] = UseInputMask();
  const [tipoBaixa, setTipoBaixa, tipoBaixaRef] = UseInputMask();
  const [representante, setRepresentante, representanteRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask(null, "text", []);
  const [entidade, setEntidade, entidadeRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const footerColumns = [
    {
      name: "Valor Crédito",
      value: "valorCredito",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.valorCreditoOriginal === 'number' ? item.valorCreditoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    },
    {
      name: "Valor Débito", 
      value: "valorDebito",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.debitoOriginal === 'number' ? item.debitoOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    }
  ];

  const convenioOptions = dadosFinanceiro.opcoes.convenios.map(conv => ({
    value: conv,
    label: conv
  }));

  const planoOptions = dadosFinanceiro.opcoes.planos.map(plano => ({
    value: plano,
    label: plano
  }));

  const tipoDataOptions = dadosFinanceiro.opcoes.tiposData.map(tipo => ({
    value: tipo,
    label: tipo.charAt(0).toUpperCase() + tipo.slice(1)
  }));

  const chaveOptions = dadosFinanceiro.opcoes.chaves.map(chave => ({
    value: chave,
    label: chave.charAt(0).toUpperCase() + chave.slice(1)
  }));

  const tipoBaixaOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'banco', label: 'Banco' },
    { value: 'manual', label: 'Manual' }
  ];

  const grupoContratualOptions = dadosFinanceiro.opcoes.gruposContratuais.map(grupo => ({
    value: grupo,
    label: grupo
  }));

  const entidadeOptions = dadosFinanceiro.opcoes.entidades.map(ent => ({
    value: ent,
    label: ent
  }));

  const representanteOptions = [
    { value: 'João Silva - 123.456.789-00 - Supervisor', label: 'João Silva - 123.456.789-00 - Supervisor' },
    { value: 'Maria Santos - 987.654.321-00 - Consultor', label: 'Maria Santos - 987.654.321-00 - Consultor' },
    { value: 'Pedro Costa - 456.123.789-00 - Gerente', label: 'Pedro Costa - 456.123.789-00 - Gerente' }
  ];

  const bancoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'nubank', label: 'Nubank' },
    { value: 'itau', label: 'Itaú' },
    { value: 'bradesco', label: 'Bradesco' }
  ];

  const pesquisarOptions = [
    { value: 'parceiro', label: 'Parceiro' },
    { value: 'referencia', label: 'Referência' },
    { value: 'historico', label: 'Histórico' },
    { value: 'boleto', label: 'Boleto' },
    { value: 'nosso-numero', label: 'Nosso Número' },
    { value: 'usuario-baixa', label: 'Usuário Baixa' },
    { value: 'contrato', label: 'Contrato' }
  ];

  const tabs = [
    { id: 'pesquisa', label: 'Pesquisa', icon: 'fa-solid fa-search' },
    { id: 'configuracoes', label: 'Configurações', icon: 'fa-solid fa-cog' },
    { id: 'datas', label: 'Datas', icon: 'fa-solid fa-calendar-days' },
    { id: 'transacoes', label: 'Transações', icon: 'fa-solid fa-exchange-alt' }
  ];

  const toggleTab = (tabId) => {
    setExpandedTabs(prev => 
      prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  const tabelaColumns = [
    { value: "parceiro", name: "Parceiro" },
    { value: "chave", name: "Chave" },
    { value: "referencia", name: "Referência" },
    { value: "historico", name: "Histórico" },
    { value: "tipoParcela", name: "Tipo de Parcela" },
    { value: "nossoNumero", name: "Nosso Número" },
    { value: "numeroBoleto", name: "Nº Boleto" },
    { value: "parcela", name: "Parcela" },
    { value: "centroCusto", name: "Centro Custo" },
    { value: "convenio", name: "Convênio" },
    { value: "plano", name: "Plano" },
    { value: "entidade", name: "Entidade" },
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
        { value: "vrReajusteAnual", name: "Vr. Reajuste Anual" },
        { value: "juros", name: "Juros" },
        { value: "multa", name: "Multa" },
        { value: "acrescimo", name: "Acréscimo" },
        { value: "desconto", name: "Desconto" },
        { value: "vrInclusaoRetroativa", name: "Vr. Inclusão Retroativa" },
        { value: "vrReajusteFxIdade", name: "Vr. Reajuste Fx.Idade" },
        { value: "liquido", name: "Líquido" },
        { value: "valorCredito", name: "Crédito" },
        { value: "debito", name: "Débito" },
        { value: "pago", name: "Pago" }
      ]
    },
    {
      value: "representante",
      name: "Representante",
      subColumns: [
        { value: "representanteCorretora", name: "Corretora" },
        { value: "representanteSupervisor", name: "Supervisor" },
        { value: "representanteConsultor", name: "Consultor" }
      ]
    },
    { value: "usuarioBaixa", name: "Usuário Baixa" },
    { value: "tipoBaixa", name: "Tipo de Baixa" },
    { value: "tipoPagamento", name: "Tipo do Pagamento" }
  ];

  useEffect(() => {
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('fluxo-caixa', 'fluxo-caixa-container');
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('fluxo-caixa', 'fluxo-caixa-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  const carregarDados = async () => {
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const dados = dadosFinanceiro.tesouraria.fluxoCaixa.map(item => ({
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
        valorCreditoFormatado: `R$ ${item.valorCredito.toFixed(2).replace('.', ',')}`,
        debitoFormatado: `R$ ${item.debito.toFixed(2).replace('.', ',')}`,
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
  };

  const filtrarDados = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let dadosFiltrados = [...tabelaDados];

    if (convenio) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.convenio.toLowerCase().includes(convenio.toLowerCase())
      );
    }

    if (plano) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.plano.toLowerCase().includes(plano.toLowerCase())
      );
    }

    if (chave && chave !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.chave === chave
      );
    }

    if (tipoBaixa && tipoBaixa !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.tipoBaixa === tipoBaixa
      );
    }

    if (representante && representante !== '') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.representanteCorretora === representante ||
        item.representanteSupervisor === representante ||
        item.representanteConsultor === representante
      );
    }

    if (banco && banco !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.banco === banco
      );
    }

    if (grupoContratual && Array.isArray(grupoContratual) && grupoContratual.length > 0) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        grupoContratual.includes(item.grupoContratual)
      );
    }

    if (entidade) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.entidade === entidade
      );
    }

    if (dataInicial && dataFinal && tipoData) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        let dataComparacao;
        
        switch (tipoData) {
          case 'pagamento':
            dataComparacao = item.pagamento;
            break;
          case 'vencimento':
            dataComparacao = item.vencimento;
            break;
          case 'vencimento original':
            dataComparacao = item.venctoOriginal;
            break;
          default:
            dataComparacao = item.vencimento;
        }

        if (dataComparacao) {
          const data = new Date(dataComparacao + 'T00:00:00');
          const inicial = new Date(dataInicial + 'T00:00:00');
          const final = new Date(dataFinal + 'T00:00:00');
          return data >= inicial && data <= final;
        }
        return false;
      });
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
      } else if (pesquisar === 'boleto') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.numeroBoleto.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'nosso-numero') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.nossoNumero.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'usuario-baixa') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.usuarioBaixa.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'contrato') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.contrato.toLowerCase().includes(textoLower)
        );
      }
    }

    setFiltroDados(dadosFiltrados);
  };

  const limparFiltro = () => {
    limparFiltros([
      { setter: setConvenio, ref: convenioRef },
      { setter: setPlano, ref: planoRef },
      { setter: setTipoData, ref: tipoDataRef },
      { setter: setDataInicial, ref: dataInicialRef },
      { setter: setDataFinal, ref: dataFinalRef },
      { setter: setChave, ref: chaveRef },
      { setter: setTipoBaixa, ref: tipoBaixaRef },
      { setter: setRepresentante, ref: representanteRef },
      { setter: setBanco, ref: bancoRef },
      { setter: setGrupoContratual, ref: grupoContratualRef, defaultValue: [] },
      { setter: setEntidade, ref: entidadeRef },
      { setter: setPesquisar, ref: pesquisarRef },
      { setter: setTexto, ref: textoRef }
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
              label="Convênio"
              identifier="convenio" 
              value={convenio}
              onChange={setConvenio}
              inputRef={convenioRef}
              type='select'
              options={convenioOptions} 
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Plano"
              identifier="plano" 
              value={plano}
              onChange={setPlano}
              inputRef={planoRef}
              type='select'
              options={planoOptions} 
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0} 
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
              gap={isMobile ? 0 : 0.5}
              multiple={true}
            />
            <UseInputPadrao 
              label="Entidade"
              identifier="entidade" 
              value={entidade}
              onChange={setEntidade}
              inputRef={entidadeRef}
              type='select'
              options={entidadeOptions} 
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0} 
            />
          </div>
        );
        
      case 'datas':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao 
              label="Tipo de Data"
              identifier="tipo-data" 
              value={tipoData}
              onChange={setTipoData}
              inputRef={tipoDataRef}
              type='select'
              options={tipoDataOptions} 
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Data Inicial"
              identifier="data-inicial" 
              type='date' 
              value={dataInicial}
              onChange={setDataInicial}
              inputRef={dataInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Data Final"
              identifier="data-final" 
              type='date'
              value={dataFinal}
              onChange={setDataFinal}
              inputRef={dataFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0} 
            />
          </div>
        );
        
      case 'transacoes':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao 
              label="Chave"
              identifier="chave" 
              value={chave}
              onChange={setChave}
              inputRef={chaveRef}
              type='select'
              options={chaveOptions} 
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Tipo de Baixa"
              identifier="tipo-baixa" 
              value={tipoBaixa}
              onChange={setTipoBaixa}
              inputRef={tipoBaixaRef}
              type='select'
              options={tipoBaixaOptions} 
              width={isMobile ? 100 : 25}
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
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Representante"
              identifier="representante" 
              value={representante}
              onChange={setRepresentante}
              inputRef={representanteRef}
              type='select'
              options={representanteOptions} 
              width={isMobile ? 100 : 25}
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

  const dadosTabela = dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    parceiro: item.parceiro,
    chave: item.chave,
    referencia: item.referencia,
    historico: item.historico,
    tipoParcela: item.tipoParcela,
    nossoNumero: item.nossoNumero,
    numeroBoleto: item.numeroBoleto,
    parcela: item.parcela,
    centroCusto: item.centroCusto,
    convenio: item.convenio,
    plano: item.plano,
    entidade: item.entidade,
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
    vrReajusteAnual: item.vrReajusteAnualFormatado,
    juros: item.jurosFormatado,
    multa: item.multaFormatada,
    acrescimo: item.acrescimoFormatado,
    desconto: item.descontoFormatado,
    vrInclusaoRetroativa: item.vrInclusaoRetroativaFormatada,
    vrReajusteFxIdade: item.vrReajusteFxIdadeFormatada,
    liquido: item.liquidoFormatado,
    valorCredito: item.valorCreditoFormatado,
    debito: item.debitoFormatado,
    pago: item.pagoFormatado,
    representanteCorretora: item.representanteCorretora,
    representanteSupervisor: item.representanteSupervisor,
    representanteConsultor: item.representanteConsultor,
    usuarioBaixa: item.usuarioBaixa,
    tipoBaixa: item.tipoBaixa,
    tipoPagamento: item.tipoPagamento,
    valorCreditoOriginal: item.valorCredito,
    debitoOriginal: item.debito
  })) : [];

  return (
    <div className={styles.fluxoCaixaContainer} id="fluxo-caixa-container">
      <h2 className={styles.fluxoCaixaTitle}>
        <i className="fa-solid fa-chart-line"></i>
        Fluxo de Caixa
      </h2>
      
      <div className={styles.fluxoCaixaContent}>
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
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${
                      expandedTabs.includes(tab.id) ? styles.active : ''
                    }`}
                    onClick={() => toggleTab(tab.id)}
                  >
                    <i className={tab.icon} />
                    {tab.label}
                    <i className={`fa-solid fa-chevron-down`} />
                  </button>
                ))}
              </div>
              
              {tabs.map(tab => (
                <div
                  key={tab.id}
                  className={`${styles.tabPanel} ${
                    expandedTabs.includes(tab.id) ? styles.expanded : styles.collapsed
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
            tabelaId="fluxo-caixa"
            columns={tabelaColumns}
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
              fileName: "fluxo-de-caixa",
              additionalButtons: [
                {
                  title: 'Gerar Relatório',
                  icon: 'fa-solid fa-file-chart-column',
                  onClick: () => {
                    
                  }
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FluxoCaixa; 