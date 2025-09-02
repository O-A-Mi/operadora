import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { handleResizeTabela, limparFiltros } from '../../../../../../utils/functions';
import dadosFinanceiro from '../../dados-financeiro.json';
import TogglePadrao from '../../../../../../components/TogglePadrao';
import ModalRegerarComissao from './ModalRegerarComissao';

const Comissao = () => {
  const { showLoader, hideLoader } = useLoader();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [showModalRegerarComissao, setShowModalRegerarComissao] = useState(false);

  const [comissaoInicial, setComissaoInicial, comissaoInicialRef] = UseInputMask();
  const [comissaoFinal, setComissaoFinal, comissaoFinalRef] = UseInputMask();
  const [tipoParcela, setTipoParcela, tipoParcelaRef] = UseInputMask();
  const [representante, setRepresentante, representanteRef] = UseInputMask();
  const [sintetico, setSintetico] = useState(false);
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();
  const [statusContrato, setStatusContrato, statusContratoRef] = UseInputMask();

  const footerColumns = [
    {
      name: "Valor",
      value: "valor",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.valorOriginal === 'number' ? item.valorOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    }
  ];

  const tipoParcelaOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'Adesão', label: 'Adesão' },
    { value: 'Adesão serv. Adicional', label: 'Adesão serv. Adicional' },
    { value: 'Mensalidade', label: 'Mensalidade' }
  ];

  const representanteOptions = [
    { value: 'João Silva - 123.456.789-00 - Supervisor', label: 'João Silva - 123.456.789-00 - Supervisor' },
    { value: 'Maria Santos - 987.654.321-00 - Consultor', label: 'Maria Santos - 987.654.321-00 - Consultor' },
    { value: 'Pedro Costa - 456.123.789-00 - Gerente', label: 'Pedro Costa - 456.123.789-00 - Gerente' }
  ];

  const pesquisarOptions = [
    { value: 'representante', label: 'Representante' },
    { value: 'quem-vendeu', label: 'Quem Vendeu' },
    { value: 'lancamento', label: 'Lançamento' }
  ];

  const statusContratoOptions = dadosFinanceiro.opcoes.statusContrato.map(status => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1)
  }));

  const tabelaColumnsAnalitico = [
    { value: "representante", name: "Representante" },
    { value: "quemVendeu", name: "Quem Vendeu" },
    { value: "contratoProsposta", name: "Contrato/Proposta" },
    { value: "statusContratoProsposta", name: "Status Contrato/Proposta" },
    { value: "produto", name: "Produto" },
    { value: "titular", name: "Titular" },
    { value: "parcela", name: "Parcela" },
    { 
      value: "datas", 
      name: "Datas",
      subColumns: [
        { value: "vencimento", name: "Vencimento" },
        { value: "creditoPagamento", name: "Crédito/Pagamento" },
        { value: "comissao", name: "Comissão" }
      ]
    },
    { value: "tipoParcela", name: "Tipo de Parcela" },
    { value: "lancamento", name: "Lançamento" },
    { value: "valor", name: "Valor" }
  ];

  const tabelaColumnsSintetico = [
    { value: "representante", name: "Representante" },
    { value: "valor", name: "Valor" }
  ];

  useEffect(() => {
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('comissao', 'comissao-container');
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('comissao', 'comissao-container');
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
      
      const dados = dadosFinanceiro.tesouraria.comissao.map(item => ({
        ...item,
        valorFormatado: `R$ ${item.valor.toFixed(2).replace('.', ',')}`,
        vencimentoFormatado: item.vencimento ? new Date(item.vencimento + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        creditoPagamentoFormatado: item.creditoPagamento ? new Date(item.creditoPagamento + 'T00:00:00').toLocaleDateString('pt-BR') : '',
        comissaoFormatado: item.comissao ? new Date(item.comissao + 'T00:00:00').toLocaleDateString('pt-BR') : ''
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

    if (comissaoInicial && comissaoFinal) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        const comissao = new Date(item.comissao + 'T00:00:00');
        const inicial = new Date(comissaoInicial + 'T00:00:00');
        const final = new Date(comissaoFinal + 'T00:00:00');
        return comissao >= inicial && comissao <= final;
      });
    }

    if (tipoParcela && tipoParcela !== '') {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.tipoParcela === tipoParcela
      );
    }

    if (representante) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.representante.includes(representante)
      );
    }

    if (statusContrato) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.statusContratoProsposta.toLowerCase().includes(statusContrato.toLowerCase())
      );
    }

    if (texto) {
      const textoLower = texto.toLowerCase();
      
      if (pesquisar === 'representante') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.representante.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'quem-vendeu') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.quemVendeu.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'lancamento') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.lancamento.toLowerCase().includes(textoLower)
        );
      }
    }

    setFiltroDados(dadosFiltrados);
  };

  const limparFiltro = () => {
    limparFiltros([
      { setter: setComissaoInicial, ref: comissaoInicialRef },
      { setter: setComissaoFinal, ref: comissaoFinalRef },
      { setter: setTipoParcela, ref: tipoParcelaRef },
      { setter: setRepresentante, ref: representanteRef },
      { setter: setPesquisar, ref: pesquisarRef },
      { setter: setTexto, ref: textoRef },
      { setter: setStatusContrato, ref: statusContratoRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  };

  const handleRegerarComissao = () => {
    setShowModalRegerarComissao(true);
  };

  const handleCloseModalRegerar = () => {
    setShowModalRegerarComissao(false);
  };

  const dadosAnalitico = dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    representante: item.representante,
    quemVendeu: item.quemVendeu,
    contratoProsposta: item.contratoProsposta,
    statusContratoProsposta: item.statusContratoProsposta,
    produto: item.produto,
    titular: item.titular,
    parcela: item.parcela,
    vencimento: item.vencimentoFormatado,
    creditoPagamento: item.creditoPagamentoFormatado,
    comissao: item.comissaoFormatado,
    tipoParcela: item.tipoParcela,
    lancamento: item.lancamento,
    valor: item.valorFormatado,
    valorOriginal: item.valor
  })) : [];

  const dadosSintetico = () => {
    const agrupado = filtroDados.reduce((acc, item) => {
      const key = item.representante;
      if (!acc[key]) {
        acc[key] = {
          representante: key,
          valor: 0
        };
      }
      acc[key].valor += item.valor;
      return acc;
    }, {});

    return Object.values(agrupado).map(item => ({
      representante: item.representante,
      valor: `R$ ${item.valor.toFixed(2).replace('.', ',')}`
    }));
  };

  return (
    <div className={styles.comissaoContainer} id="comissao-container">
      <h2 className={styles.comissaoTitle}>
        <i className="fa-solid fa-percentage"></i>
        Comissão
      </h2>
      
      <div className={styles.comissaoContent}>
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
              <div className={styles.filtroSection}>
                <div className={styles.filtroRow}>
                  <UseInputPadrao 
                    label="Comissão - Inicial"
                    identifier="comissao-inicial" 
                    type='date' 
                    value={comissaoInicial}
                    onChange={setComissaoInicial}
                    inputRef={comissaoInicialRef}
                    width={isMobile ? 100 : 25}
                    gap={0} 
                  />
                  <UseInputPadrao 
                    label="Comissão - Final"
                    identifier="comissao-final" 
                    type='date'
                    value={comissaoFinal}
                    onChange={setComissaoFinal}
                    inputRef={comissaoFinalRef}
                    width={isMobile ? 100 : 25}
                    gap={0} 
                  />
                  <UseInputPadrao 
                    label="Tipo de Parcela"
                    identifier="tipo-parcela" 
                    value={tipoParcela}
                    onChange={setTipoParcela}
                    inputRef={tipoParcelaRef}
                    type='select'
                    options={tipoParcelaOptions} 
                    width={isMobile ? 100 : 25}
                    gap={0} 
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
                    gap={0} 
                  />
                </div>
              </div>

              <div className={styles.filtroSection}>
                <div className={styles.filtroRow}>
                    <UseInputPadrao 
                      label="Status da Contrato/Proposta"
                      identifier="status-contrato" 
                      value={statusContrato}
                      onChange={setStatusContrato}
                      inputRef={statusContratoRef}
                      type='select'
                      options={statusContratoOptions} 
                      width={isMobile ? 100 : 25}
                      gap={0} 
                      multiple={true}
                  />
                  <UseInputPadrao 
                    label="Pesquisar"
                    identifier="pesquisar" 
                    value={pesquisar}
                    onChange={setPesquisar}
                    inputRef={pesquisarRef}
                    type='select'
                    options={pesquisarOptions}
                    width={isMobile ? 100 : 25}
                    gap={0} 
                  />
                  <UseInputPadrao 
                    label="Texto"
                    identifier="texto"
                    icon="fa-solid fa-search"
                    value={texto}
                    onChange={setTexto}
                    inputRef={textoRef}
                    width={isMobile ? 100 : 25}
                    gap={0} 
                    upperCase
                  />
                  <div className={styles.toggleContainer}>
                    <TogglePadrao
                      label="Sintético"
                      checked={sintetico}
                      onChange={(checked) => setSintetico(checked)}
                      option1="Não"
                      option2="Sim"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TabelaPadrao
          tabelaId="comissao"
          columns={sintetico ? tabelaColumnsSintetico : tabelaColumnsAnalitico}
          data={sintetico ? dadosSintetico() : dadosAnalitico}
          footer={footerColumns}
          options={{
            showPaginationSwitch: true,
            showSearch: () => filtrarDados(),
            showToggleView: true,
            showColumnsSelector: true,
            showPrint: false,
            showExport: true,
            showFooter: true,
            fileName: `comissao-${sintetico ? 'sintetico' : 'analitico'}`,
            additionalButtons: [
              {
                title: 'Regerar',
                icon: 'fa-solid fa-arrows-rotate',
                onClick: handleRegerarComissao
              }
            ]
          }}
        />
        
        <ModalRegerarComissao 
          isOpen={showModalRegerarComissao}
          onClose={handleCloseModalRegerar}
        />
      </div>
    </div>
  );
};

export default Comissao; 