import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../../../components';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const Comissionamento = ({ isMobile = false, currentStep }) => {
  const [inicial, setInicial, inicialRef] = UseInputMask();
  const [final, setFinal, finalRef] = UseInputMask();
  const [valor, setValor, valorRef] = UseInputMask();
  const [tipo, setTipo, tipoRef] = UseInputMask();
  const [modo, setModo, modoRef] = UseInputMask();

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      inicial: 18,
      final: 30,
      tipo: 'Percentual',
      modo: 'Mensal',
      valor: 5.00
    },
    {
      id: 2,
      inicial: 31,
      final: 45,
      tipo: 'Fixo',
      modo: 'Anual',
      valor: 100.00
    }
  ]);
  const [selecionados, setSelecionados] = useState([]);

  const tipoOptions = [
    { value: 'Percentual', label: 'Percentual' },
    { value: 'Fixo', label: 'Fixo' },
    { value: 'Variável', label: 'Variável' }
  ];

  const modoOptions = [
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Anual', label: 'Anual' },
    { value: 'Semestral', label: 'Semestral' },
    { value: 'Trimestral', label: 'Trimestral' }
  ];

  const handleGetDadosConfirmar = useCallback((selectedData) => {
    setSelecionados(selectedData);
  }, []);

  const handleExcluirSelecionados = useCallback(() => {
    if (selecionados.length === 0) return;
    
    const idsParaExcluir = selecionados.map(item => item.id);
    setTabelaDados(prev => prev.filter(item => !idsParaExcluir.includes(item.id)));
    setSelecionados([]);
  }, [selecionados]);

  const handleAdicionar = useCallback(() => {
    if (!inicial || !final || !valor || !tipo || !modo) {
      dialogMessage(
        'Preencha todos os campos para prosseguir.',
        'warning',
        {
          confirmButton: false,
          buttonsText: {
            close: 'OK'
          }
        }
      );
      return;
    }

    const novoComissionamento = {
      id: Date.now(),
      inicial: parseInt(inicial) || 0,
      final: parseInt(final) || 0,
      tipo: tipo || '',
      modo: modo || '',
      valor: parseFloat(valor) || 0
    };

    setTabelaDados(prev => [...prev, novoComissionamento]);

    setInicial('');
    setFinal('');
    setValor('');
    setTipo('');
    setModo('');
  }, [inicial, final, valor, tipo, modo]);

  const handleRemover = useCallback(() => {
    if (selecionados.length === 0) {
      dialogMessage(
        'Selecione ao menos um registro para prosseguir.',
        'warning',
        {
          confirmButton: false,
          buttonsText: {
            close: 'OK'
          }
        }
      );
      return;
    }
    
    const idsParaRemover = selecionados.map(item => item.id);
    setTabelaDados(prev => prev.filter(item => !idsParaRemover.includes(item.id)));
    setSelecionados([]);
  }, [selecionados]);

  const handleAtualizar = useCallback(() => {
    console.log('Atualizando tabela...');
  }, []);

  const tabelaColumns = useMemo(() => [
    { value: 'inicial', name: 'Inicial' },
    { value: 'final', name: 'Final' },
    { value: 'tipo', name: 'Tipo' },
    { value: 'modo', name: 'Modo' },
    { value: 'valor', name: 'Valor' }
  ], []);

  const tabelaOptions = useMemo(() => ({
    showPaginationSwitch: true,
    showSearch: false,
    showToggleView: false,
    showColumnsSelector: false,
    showPrint: false,
    showExport: false,
    showRefresh: false,
    showFilter: false,
    fileName: "comissionamento",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
  }), [handleGetDadosConfirmar, handleExcluirSelecionados]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const dadosTabela = useMemo(() => tabelaDados.map(item => ({
    ...item,
    valor: formatCurrency(item.valor)
  })), [tabelaDados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-dollar-sign"></i>
          Comissionamento
        </h3>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Faixa Inicial"
            identifier="inicial" 
            value={inicial}
            onChange={setInicial}
            inputRef={inicialRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Faixa Final"
            identifier="final" 
            value={final}
            onChange={setFinal}
            inputRef={finalRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor"
            identifier="valor" 
            value={valor}
            onChange={setValor}
            inputRef={valorRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Tipo"
            identifier="tipo" 
            value={tipo}
            onChange={setTipo}
            inputRef={tipoRef}
            type='select'
            options={tipoOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Modo"
            identifier="modo" 
            value={modo}
            onChange={setModo}
            inputRef={modoRef}
            type='select'
            options={modoOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0}
          />
        </div>
      </div>

      <div className={styles.formActions}>
          <button
            type="button"
            onClick={handleAdicionar}
            className={`${styles.actionButton} ${styles.actionButtonAdicionar}`}
          >
            <i className="fa-solid fa-plus"></i>
            Adicionar
          </button>
          <button
            type="button"
            onClick={handleRemover}
            className={`${styles.actionButton} ${styles.actionButtonRemover}`}
          >
            <i className="fa-solid fa-trash"></i>
            Remover
          </button>
          <button
            type="button"
            onClick={handleAtualizar}
            className={`${styles.actionButton} ${styles.actionButtonAtualizar}`}
          >
            <i className="fa-solid fa-refresh"></i>
            Atualizar
          </button>
        </div>
      
        <div className={styles.tableSection}>
         <TabelaPadrao
           tabelaId={`cadastro-plano-${currentStep}`}
           columns={tabelaColumns}
           data={dadosTabela}
           options={tabelaOptions}
         />
       </div>
    </div>
  );
};

export default Comissionamento;