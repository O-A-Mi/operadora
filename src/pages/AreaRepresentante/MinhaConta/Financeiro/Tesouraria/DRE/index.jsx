import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import dadosFinanceiro from '../../dados-financeiro.json';
import TogglePadrao from '../../../../../../components/TogglePadrao';

const DRE = () => {
  const { showLoader, hideLoader } = useLoader();

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const [ano, setAno, anoRef] = UseInputMask(new Date().getFullYear().toString());
  const [visualizarSintetico, setVisualizarSintetico] = useState(false);

  const anoOptions = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    anoOptions.push({ value: i.toString(), label: i.toString() });
  }

  const tabelaColumns = [
    { value: "contas", name: "Contas" },
    { value: "planoContas", name: "Plano de Contas" },
    { value: "janeiro", name: "Janeiro" },
    { value: "fevereiro", name: "Fevereiro" },
    { value: "marco", name: "Março" },
    { value: "abril", name: "Abril" },
    { value: "maio", name: "Maio" },
    { value: "junho", name: "Junho" },
    { value: "julho", name: "Julho" },
    { value: "agosto", name: "Agosto" },
    { value: "setembro", name: "Setembro" },
    { value: "outubro", name: "Outubro" },
    { value: "novembro", name: "Novembro" },
    { value: "dezembro", name: "Dezembro" }
  ];

  useEffect(() => {
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('dre-competencia', 'dre-competencia-container');
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('dre-competencia', 'dre-competencia-container');
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
      
      const dados = dadosFinanceiro.tesouraria.competencia.dre.map(item => ({
        ...item,
        janeiroFormatado: formatarValor(item.janeiro),
        fevereiroFormatado: formatarValor(item.fevereiro),
        marcoFormatado: formatarValor(item.marco),
        abrilFormatado: formatarValor(item.abril),
        maioFormatado: formatarValor(item.maio),
        junhoFormatado: formatarValor(item.junho),
        julhoFormatado: formatarValor(item.julho),
        agostoFormatado: formatarValor(item.agosto),
        setembroFormatado: formatarValor(item.setembro),
        outubroFormatado: formatarValor(item.outubro),
        novembroFormatado: formatarValor(item.novembro),
        dezembroFormatado: formatarValor(item.dezembro)
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

  const formatarValor = (valor) => {
    if (valor === 0) return '0,00';
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const filtrarDados = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let dadosFiltrados = [...tabelaDados];

    if (visualizarSintetico) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        const conta = item.contas;
        return conta === "0" || 
               conta === "01" || 
               conta === "01.01" || 
               conta === "01.01.02" || 
               conta === "01.01.02.01" || 
               conta === "01.01.03" || 
               conta === "01.01.03.04" || 
               conta === "9999";
      });
    }

    setFiltroDados(dadosFiltrados);
  };

  const limparFiltro = () => {
    limparFiltros([
      { setter: setAno, ref: anoRef, defaultValue: new Date().getFullYear().toString() }
    ]);
    setVisualizarSintetico(false);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  };

  const dadosTabela = dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    contas: item.contas,
    planoContas: item.planoContas,
    janeiro: item.janeiroFormatado,
    fevereiro: item.fevereiroFormatado,
    marco: item.marcoFormatado,
    abril: item.abrilFormatado,
    maio: item.maioFormatado,
    junho: item.junhoFormatado,
    julho: item.julhoFormatado,
    agosto: item.agostoFormatado,
    setembro: item.setembroFormatado,
    outubro: item.outubroFormatado,
    novembro: item.novembroFormatado,
    dezembro: item.dezembroFormatado
  })) : [];

  return (
    <div className={styles.dreContainer} id="dre-competencia-container">
      <h2 className={styles.dreTitle}>
        <i className="fa-solid fa-chart-pie"></i>
        DRE - Demonstrativo de Resultados do Exercício
      </h2>
      
      <div className={styles.dreContent}>
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
                label="Ano"
                identifier="ano" 
                value={ano}
                onChange={setAno}
                inputRef={anoRef}
                type='select'
                options={anoOptions} 
                width={isMobile ? 50 : 25}
                gap={isMobile ? 0.5 : 0.5} 
                onBlur={() => filtrarDados()}
                onKeyPress={(e) => { if (e.key === 'Enter') filtrarDados() }}
              />
              
              <TogglePadrao
                label="Visualizar Sintético"
                checked={visualizarSintetico}
                onChange={(checked) => setVisualizarSintetico(checked)}
                option1="Não"
                option2="Sim"
              />
              <button className={styles.gerarButton} /*onClick={Gerar DRE}*/ >Gerar DRE</button>
            </div>
          </div>
        </section>

        <div className={styles.dreInfo}>
          <p className={styles.dreDescription}>
            {visualizarSintetico ? 
              'Exibindo visão sintética - contas principais hierárquicas' : 
              'Exibindo visão analítica - todos os lançamentos detalhados com CPF/CNPJ'
            }
          </p>
        </div>

        <TabelaPadrao
          tabelaId="dre-competencia"
          columns={tabelaColumns}
          data={dadosTabela}
          options={{
            showPaginationSwitch: true,
                          showSearch: () => filtrarDados(),
            showToggleView: true,
            showColumnsSelector: true,
            showPrint: false,
            showExport: true,
            fileName: `dre-${ano}-${visualizarSintetico ? 'sintetico' : 'analitico'}`
          }}
        />
      </div>
    </div>
  );
};

export default DRE; 