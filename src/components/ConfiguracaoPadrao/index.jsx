import React, { useEffect, useState, useRef } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../InputPadrao';
import TabelaPadrao from '../TabelaPadrao';
import { useLocation, useNavigate, Outlet } from 'react-router';
import { configPadrao } from "../../utils/json";
import { dadosMockados } from "../../utils/mockConf";
import { handleResizeTabelaAvulsa } from '../../utils/functions';

const TITLES = {
  'notificacao': {
    text: 'Notificações',
    icon: 'fa-solid fa-bell'
  },
  'especialidades': {
    text: 'Especialidades',
    icon: 'fa-solid fa-user-doctor'
  },
  'status': {
    text: 'Status',
    icon: 'fa-solid fa-circle-check'
  },
  'perguntas-declaracao': {
    text: 'Perguntas da Declaração',
    icon: 'fa-solid fa-file-circle-question'
  },
  'questionario-de-vida': {
    text: 'Questionário de Vida',
    icon: 'fa-solid fa-clipboard-list'
  },
  'mensagens': {
    text: 'Mensagens',
    icon: 'fa-solid fa-comment-dots'
  },
  'funcao-usuario': {
    text: 'Funções do Usuário',
    icon: 'fa-solid fa-users-gear'
  },
};


const ConfigPadrao = () => {
  const [configuracao, setConfiguracao] = useState([]);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [dadosTabelaFiltrados, setDadosTabelaFiltrados] = useState([]);
  const [filtrosTabela, setFiltrosTabela] = useState({});
  const [titulo, setTitulo] = useState({ text: '', icon: '' });
  const inputRefs = useRef({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  const pathAfterArea = location.pathname.replace(/^\/?area-operadora\/?/, '');
  const segments = pathAfterArea.split('/').filter(Boolean);
  const rotaAtualParaConfig = segments[1] ?? segments[0] ?? '';
  const isChildRouteActive = segments.includes('cadastro');

  useEffect(() => {
    const config = configPadrao.filter(config => config.id === rotaAtualParaConfig) || [];
    setConfiguracao(config);

    const tituloData = TITLES[rotaAtualParaConfig] || { 
      text: rotaAtualParaConfig.charAt(0).toUpperCase() + rotaAtualParaConfig.slice(1),
      icon: '' 
    };
    setTitulo(tituloData);

    if (config.length > 0) {
      const colunasVisiveis = config[0].colunasTabela.map(col => col.value);
      const dadosFiltrados = dadosMockados.map(item => {
        const novoItem = {};
        colunasVisiveis.forEach(key => {
          novoItem[key] = item[key] ?? '';
        });

        novoItem.id = item.id;
        return novoItem;
      });
      setDadosTabela(dadosFiltrados);
      setDadosTabelaFiltrados(dadosFiltrados);
    }
  }, [rotaAtualParaConfig, isChildRouteActive]);

  const handleFiltroChange = (e, index) => {
    const { value } = e.target;
    setFiltrosTabela(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const aplicarFiltros = () => {
    const filtrosAtivos = Object.entries(filtrosTabela)
      .filter(([key, value]) => value !== '' && value !== null);

    if (filtrosAtivos.length === 0) {
      setDadosTabelaFiltrados(dadosTabela);
      return;
    }

    const novosDados = dadosTabela.filter(item => {
      return filtrosAtivos.every(([index, filtroValue]) => {
        const filtroConfig = configuracao[0]?.filtrosTabela[index];
        if (!filtroConfig) return true;
        
        const itemValue = String(item[filtroConfig.id] || '').toLowerCase();
        const filtro = String(filtroValue).toLowerCase();
        return itemValue.includes(filtro);
      });
    });
    
    setDadosTabelaFiltrados(novosDados);
  };
  
  const limparFiltros = () => {
    setFiltrosTabela({});
    setDadosTabelaFiltrados(dadosTabela);
  };

  const handleRowClick = (linha) => {
    const id = linha.id;
    if (!id) return;
    navigate('cadastro', { state: { id } });
  };

  const handleNovoCadastroClick = () => {
    navigate('cadastro');
  };

  useEffect(() => {
    const cleanupHandler = () => handleResizeTabelaAvulsa('configuracao-padrao', 'configuracao-padrao-container', false);

    window.addEventListener("resize", cleanupHandler);

    requestAnimationFrame(() => {
      handleResizeTabelaAvulsa('configuracao-padrao', 'configuracao-padrao-container', false);
    });

    return () => {
      window.removeEventListener("resize", cleanupHandler);
    };
  }, []);

  return (
    <>
      {!isChildRouteActive && (
        <div id='configuracao-padrao-container' className={styles.configuracaoPadraoContainer}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContent}>
              {titulo.text && (
                <h2 className={styles.title}>
                  {titulo.icon && <i className={titulo.icon}></i>}
                  {titulo.text}
                </h2>
              )}
            </div>
          </section>
          <section className={styles.TabelaField}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Buscar Por:
              </h5>
              <button 
                className={styles.filtroTabelaButton}
                onClick={limparFiltros}
              >
                <i className="fa-solid fa-filter-slash"></i> Limpar filtro
              </button>
            </div>
            <div className={styles.filtroTabelaBody}>
              {configuracao[0]?.filtrosTabela.map((filtro, index) => {
                if (!inputRefs.current[index]) {
                  inputRefs.current[index] = React.createRef();
                }

                return (
                  <UseInputPadrao
                    key={index} 
                    label={filtro.label}
                    identifier={filtro.identifier || `filtro-${index}`}
                    value={filtrosTabela[index] || ''}
                    type={filtro.type}
                    options={filtro.options || []}
                    onChange={(e) => handleFiltroChange(e, index)}
                    inputRef={inputRefs.current[index]}
                  />
                );
              })}
            </div>
            <TabelaPadrao
              tabelaId="configuracao-padrao"
              columns={configuracao[0]?.colunasTabela || []}
              data={dadosTabelaFiltrados}
              options={{
                showPaginationSwitch: true,
                showToggleView: true,
                showColumnsSelector: true,
                additionalButtons: [
                  {
                    title: 'Novo Cadastro',
                    icon: 'fa fa-plus',
                    onClick: handleNovoCadastroClick,
                  },
                  {
                    title: 'Pesquisar',
                    icon: 'fa fa-search',
                    onClick: aplicarFiltros,
                  }
                ], 
                ...configuracao[0]?.optionsTabela,
                rowOnClick: handleRowClick,
              }}
            />
          </section>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default ConfigPadrao;