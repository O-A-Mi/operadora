import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import dadosAlteracaoVencimento from '../../dados-alteracao-vencimento.json';
import ModalDiaVencimento from './ModalDiaVencimento';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';

const AlteracaoVencimento = () => {
  const { showLoader, hideLoader } = useLoader();

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [showModalDiaVencimento, setShowModalDiaVencimento] = useState(false);
  const [selecionados, setSelecionados] = useState([]);

  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask('associado');
  const [texto, setTexto, textoRef] = UseInputMask();

  const pesquisarOptions = useMemo(() => [
    { value: 'associado', label: 'Associado' },
    { value: 'proposta', label: 'Proposta' }
  ], []);

  const tabelaColumns = useMemo(() => [
    { value: "proposta", name: "Proposta" },
    { value: "cpfCnpj", name: "CPF/CNPJ" },
    { value: "associado", name: "Associado" },
    { value: "diaVencimento", name: "Dia de Vencto" },
    { value: "valorParcela", name: "Valor da Parcela" },
    { value: "representante", name: "Representante" },
    { value: "status", name: "Status" },
    { value: "comboServicosProdutos", name: "Combo Serviços/Produtos" }
  ], []);

    useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        showLoader();
        setTabelaDados(dadosAlteracaoVencimento);
        setDadosCarregados(true);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        hideLoader();
      }
    };
    
    carregarDadosIniciais();
  }, [showLoader, hideLoader]);

  const handleResize = useCallback(() => {
    handleResizeTabela('alteracao-vencimento', 'alteracao-vencimento-container');
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
    try {
      showLoader();
      setTabelaDados(dadosAlteracaoVencimento);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  const filtrarDados = useCallback(() => {
    if (!dadosCarregados || tabelaDados.length === 0) {
      return;
    }

    let dadosFiltrados = [...tabelaDados];

    if (texto.trim()) {
      const textoLower = texto.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(item => {
        if (pesquisar === 'associado') {
          return item.associado?.toLowerCase().includes(textoLower);
        } else if (pesquisar === 'proposta') {
          return item.proposta?.toLowerCase().includes(textoLower);
        }
        return false;
      });
    }

    setFiltroDados(dadosFiltrados);
  }, [tabelaDados, texto, pesquisar, dadosCarregados]);

  const handlePesquisar = useCallback(() => {
    filtrarDados();
  }, [filtrarDados]);



  const limparFiltro = useCallback(() => {
    limparFiltros([
      { setter: setPesquisar, ref: pesquisarRef, defaultValue: 'associado' },
      { setter: setTexto, ref: textoRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  }, [tabelaDados, dadosCarregados]);

  const handleEfetuarAlteracao = useCallback(() => {
    const registrosSelecionados = Array.isArray(selecionados) ? selecionados : [];
    
    if (registrosSelecionados.length === 0) {
      dialogMessage("Selecione ao menos um registro para prosseguir", "warning", { 
        confirmButton: false,
        buttonsText: {
          close: "OK"
        }
      });
      return;
    }
    
    setShowModalDiaVencimento(true);
  }, [selecionados]);

  const handleCloseModalDiaVencimento = useCallback(() => {
    setShowModalDiaVencimento(false);
  }, []);

  const handleGetDadosConfirmar = useCallback((selectedData) => {
    const dadosProcessados = Array.isArray(selectedData) ? selectedData : [];
    setSelecionados(dadosProcessados);
  }, []);

  const tabelaOptions = useMemo(() => ({
    showPaginationSwitch: true,
    showSearch: handlePesquisar,
    showToggleView: true,
    showColumnsSelector: true,
    showPrint: false,
    showExport: true,
    fileName: "alteracao-vencimento",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
    additionalButtons: [
      {
        title: 'Efetuar Alteração de Vencimento',
        icon: 'fa-solid fa-calendar-day',
        onClick: handleEfetuarAlteracao
      }
    ]
  }), [handleGetDadosConfirmar, handleEfetuarAlteracao, handlePesquisar]);

  const dadosParaTabela = useMemo(() => {
    return filtroDados.length > 0 ? filtroDados : [];
  }, [filtroDados]);

  return (
    <div className={styles.alteracaoVencimentoContainer} id="alteracao-vencimento-container">
      <h2 className={styles.alteracaoVencimentoTitle}>
        <i className="fa-solid fa-calendar-alt"></i>
        Alteração de Vencimento
      </h2>
      <div className={styles.alteracaoVencimentoContent}>
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
            
            <div className={styles.filtrosContainer}>
              <div className={styles.filtrosRow}>
                <UseInputPadrao 
                  label="Pesquisar"
                  identifier="pesquisar-alteracao-vencimento" 
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
                  identifier="texto-alteracao-vencimento"
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
          </div>
        </section>

        <div className={styles.tabelaSection}>
          <TabelaPadrao
            tabelaId="alteracao-vencimento"
            columns={tabelaColumns}
            data={dadosParaTabela}
            options={tabelaOptions}
          />
        </div>
        
        <ModalDiaVencimento 
          isOpen={showModalDiaVencimento}
          onClose={handleCloseModalDiaVencimento}
        />
      </div>
    </div>
  );
};

export default AlteracaoVencimento;