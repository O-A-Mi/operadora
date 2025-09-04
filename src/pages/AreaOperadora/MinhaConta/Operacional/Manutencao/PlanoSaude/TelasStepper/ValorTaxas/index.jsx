import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../../../components';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const ValorTaxas = ({ isMobile = false, currentStep }) => {
  const [entidade, setEntidade, entidadeRef] = UseInputMask();
  const [taxaAssociativaAdesao, setTaxaAssociativaAdesao, taxaAssociativaAdesaoRef] = UseInputMask();
  const [taxaAssociativaMensal, setTaxaAssociativaMensal, taxaAssociativaMensalRef] = UseInputMask();
  const [taxaAdministrativaAdesao, setTaxaAdministrativaAdesao, taxaAdministrativaAdesaoRef] = UseInputMask();
  const [taxaAdministrativaMensal, setTaxaAdministrativaMensal, taxaAdministrativaMensalRef] = UseInputMask();

  const entidadeOptions = [
    { value: 'Entidade A', label: 'Entidade A' },
    { value: 'Entidade B', label: 'Entidade B' },
    { value: 'Entidade C', label: 'Entidade C' },
    { value: 'Entidade D', label: 'Entidade D' }
  ];

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      entidade: 'Entidade A',
      taxaAssociativaAdesao: 50.00,
      taxaAssociativaMensal: 25.00,
      taxaAdministrativaAdesao: 30.00,
      taxaAdministrativaMensal: 15.00
    },
    {
      id: 2,
      entidade: 'Entidade B',
      taxaAssociativaAdesao: 75.00,
      taxaAssociativaMensal: 35.00,
      taxaAdministrativaAdesao: 45.00,
      taxaAdministrativaMensal: 20.00
    }
  ]);
  const [selecionados, setSelecionados] = useState([]);

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
    if (!entidade || !taxaAssociativaAdesao || !taxaAssociativaMensal || 
        !taxaAdministrativaAdesao || !taxaAdministrativaMensal) {
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

    const novaTaxa = {
      id: Date.now(),
      entidade: entidade || '',
      taxaAssociativaAdesao: parseFloat(taxaAssociativaAdesao) || 0,
      taxaAssociativaMensal: parseFloat(taxaAssociativaMensal) || 0,
      taxaAdministrativaAdesao: parseFloat(taxaAdministrativaAdesao) || 0,
      taxaAdministrativaMensal: parseFloat(taxaAdministrativaMensal) || 0
    };

    setTabelaDados(prev => [...prev, novaTaxa]);

    setEntidade('');
    setTaxaAssociativaAdesao('');
    setTaxaAssociativaMensal('');
    setTaxaAdministrativaAdesao('');
    setTaxaAdministrativaMensal('');
  }, [entidade, taxaAssociativaAdesao, taxaAssociativaMensal, taxaAdministrativaAdesao, taxaAdministrativaMensal]);

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
    {
      value: 'entidade',
      name: 'Entidade'
    },
    {
      value: 'taxaAssociativa',
      name: 'Taxa Associativa',
      subColumns: [
        { value: 'taxaAssociativaAdesao', name: 'Adesão' },
        { value: 'taxaAssociativaMensal', name: 'Mensal' }
      ]
    },
    {
      value: 'taxaAdministrativa',
      name: 'Taxa Administrativa',
      subColumns: [
        { value: 'taxaAdministrativaAdesao', name: 'Adesão' },
        { value: 'taxaAdministrativaMensal', name: 'Mensal' }
      ]
    }
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
    fileName: "valor-taxas",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
  }), [handleGetDadosConfirmar, handleExcluirSelecionados]);

  const dadosTabela = useMemo(() => tabelaDados.map(item => ({
    ...item,
    taxaAssociativaAdesao: item.taxaAssociativaAdesao,
    taxaAssociativaMensal: item.taxaAssociativaMensal,
    taxaAdministrativaAdesao: item.taxaAdministrativaAdesao,
    taxaAdministrativaMensal: item.taxaAdministrativaMensal
  })), [tabelaDados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={`${styles.sectionTitle} ${styles.firstTitle}`}>
          <i className="fa-solid fa-percentage"></i>
          Valor Taxas
        </h3>
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Entidade"
            identifier="entidade" 
            value={entidade}
            onChange={setEntidade}
            inputRef={entidadeRef}
            type='select'
            options={entidadeOptions}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 0}
            multiple={true}
          />
        </div>
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Taxa Associativa Adesão"
            identifier="taxa-associativa-adesao" 
            value={taxaAssociativaAdesao}
            onChange={setTaxaAssociativaAdesao}
            inputRef={taxaAssociativaAdesaoRef}
            type='number'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Taxa Associativa Mensal"
            identifier="taxa-associativa-mensal" 
            value={taxaAssociativaMensal}
            onChange={setTaxaAssociativaMensal}
            inputRef={taxaAssociativaMensalRef}
            type='number'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Taxa Administrativa Adesão"
            identifier="taxa-administrativa-adesao" 
            value={taxaAdministrativaAdesao}
            onChange={setTaxaAdministrativaAdesao}
            inputRef={taxaAdministrativaAdesaoRef}
            type='number'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Taxa Administrativa Mensal"
            identifier="taxa-administrativa-mensal" 
            value={taxaAdministrativaMensal}
            onChange={setTaxaAdministrativaMensal}
            inputRef={taxaAdministrativaMensalRef}
            type='number'
            width={isMobile ? 100 : 25}
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

export default ValorTaxas;