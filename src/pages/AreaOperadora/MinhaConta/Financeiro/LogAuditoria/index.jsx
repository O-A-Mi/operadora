import React, { useState, useEffect } from 'react';
import { UseInputMask, UseInputPadrao } from '../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../components';
import { useLoader } from '../../../../../context';
import { limparFiltros } from '../../../../../utils/functions';
import styles from './styles.module.css';
import dadosAuditoria from './dados-auditoria.json';

const LogAuditoria = () => {
  const { showLoader, hideLoader } = useLoader();
  
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask('nosso_numero');
  const [conteudo, setConteudo, conteudoRef] = UseInputMask('novo');
  const [texto, setTexto, textoRef] = UseInputMask();

  const pesquisarOptions = [
    { value: 'nosso_numero', label: 'Nosso Número' },
    { value: 'numero_documento', label: 'Número Documento' }
  ];

  const conteudoOptions = [
    { value: 'novo', label: 'Novo' },
    { value: 'antigo', label: 'Antigo' }
  ];

  const tabelaColumns = [
    { value: "id", name: "ID" },
    { value: "campo", name: "Campo" },
    { value: "conteudoAntigo", name: "Conteúdo Antigo" },
    { value: "conteudoNovo", name: "Conteúdo Novo" },
    { value: "usuario", name: "Usuário" },
    { 
      value: "datas", 
      name: "Datas",
      subColumns: [
        { value: "dtAlteracao", name: "Dt.Alteração" },
        { value: "dtHoraAlteracao", name: "Dt/Hora Alteração" }
      ]
    },
    { value: "legendaCampo", name: "Legenda do Campo" }
  ];

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const carregarDados = async () => {
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      setDados(dadosAuditoria);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      hideLoader();
    }
  };

  const aplicarFiltros = () => {
    let filtrados = dados;
    
    if (pesquisar === 'nosso_numero') {
      filtrados = filtrados.filter(item => item.campo === 'Nosso Número');
    } else if (pesquisar === 'numero_documento') {
      filtrados = filtrados.filter(item => item.campo === 'Número Documento');
    }
    
    if (conteudo === 'novo') {
      filtrados = filtrados.filter(item => item.conteudoNovo && item.conteudoNovo.trim() !== '');
    } else if (conteudo === 'antigo') {
      filtrados = filtrados.filter(item => item.conteudoAntigo && item.conteudoAntigo.trim() !== '');
    }
    
    if (texto && texto.trim() !== '') {
      const textoLower = texto.toLowerCase();
      
      if (conteudo === 'novo') {
        filtrados = filtrados.filter(item => 
          item.conteudoNovo && item.conteudoNovo.toLowerCase().includes(textoLower)
        );
      } else if (conteudo === 'antigo') {
        filtrados = filtrados.filter(item => 
          item.conteudoAntigo && item.conteudoAntigo.toLowerCase().includes(textoLower)
        );
      } else {
        filtrados = filtrados.filter(item => 
          (item.conteudoAntigo && item.conteudoAntigo.toLowerCase().includes(textoLower)) ||
          (item.conteudoNovo && item.conteudoNovo.toLowerCase().includes(textoLower))
        );
      }
    }

    setDadosFiltrados(filtrados);
  };

  const limparFiltros = () => {
    limparFiltros([
      { setter: setPesquisar, ref: pesquisarRef, defaultValue: 'nosso_numero' },
      { setter: setConteudo, ref: conteudoRef, defaultValue: 'novo' },
      { setter: setTexto, ref: textoRef }
    ]);
  };

  const dadosTabela = dadosFiltrados.map(item => ({
    id: item.id,
    campo: item.campo,
    conteudoAntigo: item.conteudoAntigo,
    conteudoNovo: item.conteudoNovo,
    usuario: item.usuario,
    dtAlteracao: item.dtAlteracao,
    dtHoraAlteracao: item.dtHoraAlteracao,
    legendaCampo: item.legendaCampo
  }));

  return (
    <div className={styles.logAuditoriaContainer} id="log-auditoria-container">
      <h2 className={styles.logAuditoriaTitle}>
        <i className="fa-solid fa-history"></i>
        Log Auditoria
      </h2>
      
      <div className={styles.logAuditoriaContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h5>
              <button
                className={styles.filtroTabelaButton}
                onClick={limparFiltros}
              >
                Limpar filtro
              </button>
            </div>

            <div className={styles.filtrosContent}>
              <UseInputPadrao
                label="Pesquisar"
                identifier="pesquisar"
                value={pesquisar}
                onChange={setPesquisar}
                inputRef={pesquisarRef}
                type="select"
                options={pesquisarOptions}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.334}
              />
              <UseInputPadrao
                label="Conteúdo"
                identifier="conteudo"
                value={conteudo}
                onChange={setConteudo}
                inputRef={conteudoRef}
                type="select"
                options={conteudoOptions}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.334}
              />
              <UseInputPadrao
                label="Texto"
                identifier="texto"
                icon="fa-solid fa-search"
                value={texto}
                onChange={setTexto}
                inputRef={textoRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.334}
                placeholder="Digite para pesquisar..."
                upperCase
              />
            </div>
          </div>
        </section>
        
        <div className={styles.tabelaSection}>
          <TabelaPadrao
            tabelaId="log-auditoria"
            columns={tabelaColumns}
            data={dadosTabela}
            footer={[
              {
                name: "Total de Registros",
                value: "totalRegistros",
                data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                  return tabelaBody.length.toString();
                }
              }
            ]}
            options={{
              showPaginationSwitch: true,
              showToggleView: true,
              showColumnsSelector: true,
              showExport: true,
              showFooter: true,
              fileName: "log-auditoria",
              showSearch: aplicarFiltros
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogAuditoria; 