import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../../../components';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const Campanhas = ({ isMobile = false, currentStep }) => {
  const [dataInicio, setDataInicio, dataInicioRef] = UseInputMask();
  const [dataFim, setDataFim, dataFimRef] = UseInputMask();
  const [tipoRegra, setTipoRegra, tipoRegraRef] = UseInputMask();
  const [parcelaInicial, setParcelaInicial, parcelaInicialRef] = UseInputMask();
  const [parcelaFinal, setParcelaFinal, parcelaFinalRef] = UseInputMask();

  const [tipoValor, setTipoValor, tipoValorRef] = UseInputMask();
  const [modo, setModo, modoRef] = UseInputMask();
  const [valor, setValor, valorRef] = UseInputMask();
  const [baseValor, setBaseValor, baseValorRef] = UseInputMask();
  const [baseQuem, setBaseQuem, baseQuemRef] = UseInputMask();

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      dataInicio: '01/01/2024',
      dataFim: '31/12/2024',
      tipoRegra: 'Adesão',
      parcelaInicial: 1,
      parcelaFinal: 12,
      tipoValor: 'Desconto',
      modo: 'Dinheiro',
      valor: 150.00,
      baseValor: 'Preço Net',
      baseQuem: 'Contrato'
    },
    {
      id: 2,
      dataInicio: '01/02/2024',
      dataFim: '28/02/2024',
      tipoRegra: 'Renovação',
      parcelaInicial: 13,
      parcelaFinal: 24,
      tipoValor: 'Acréscimo',
      modo: 'Percentual',
      valor: 5.00,
      baseValor: 'Preço Bruto',
      baseQuem: 'Titular'
    }
  ]);
  const [selecionados, setSelecionados] = useState([]);

  const tipoRegraOptions = [
    { value: 'Adesão', label: 'Adesão' },
    { value: 'Renovação', label: 'Renovação' },
    { value: 'Cancelamento', label: 'Cancelamento' }
  ];

  const tipoValorOptions = [
    { value: 'Desconto', label: 'Desconto' },
    { value: 'Acréscimo', label: 'Acréscimo' },
    { value: 'Fixo', label: 'Fixo' }
  ];

  const modoOptions = [
    { value: 'Dinheiro', label: 'Dinheiro' },
    { value: 'Percentual', label: 'Percentual' },
    { value: 'Fixo', label: 'Fixo' }
  ];

  const baseValorOptions = [
    { value: 'Preço Net', label: 'Preço Net' },
    { value: 'Preço Bruto', label: 'Preço Bruto' },
    { value: 'Valor Base', label: 'Valor Base' }
  ];

  const baseQuemOptions = [
    { value: 'Contrato', label: 'Contrato' },
    { value: 'Titular', label: 'Titular' },
    { value: 'Dependente', label: 'Dependente' }
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
    if (!dataInicio || !dataFim || !tipoRegra || !parcelaInicial || !parcelaFinal ||
        !tipoValor || !modo || !valor || !baseValor || !baseQuem) {
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

    const novaCampanha = {
      id: Date.now(),
      dataInicio: dataInicio || '',
      dataFim: dataFim || '',
      tipoRegra: tipoRegra || '',
      parcelaInicial: parseInt(parcelaInicial) || 0,
      parcelaFinal: parseInt(parcelaFinal) || 0,
      tipoValor: tipoValor || '',
      modo: modo || '',
      valor: parseFloat(valor) || 0,
      baseValor: baseValor || '',
      baseQuem: baseQuem || ''
    };

    setTabelaDados(prev => [...prev, novaCampanha]);

    setDataInicio('');
    setDataFim('');
    setTipoRegra('');
    setParcelaInicial('');
    setParcelaFinal('');
    setTipoValor('');
    setModo('');
    setValor('');
    setBaseValor('');
    setBaseQuem('');
  }, [dataInicio, dataFim, tipoRegra, parcelaInicial, parcelaFinal, tipoValor, modo, valor, baseValor, baseQuem]);

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
      value: 'regra',
      name: 'Regra',
      subColumns: [
        { value: 'dataInicio', name: 'Inicio Campanha' },
        { value: 'dataFim', name: 'Fim Campanha' },
        { value: 'tipoRegra', name: 'Tipo' },
        { value: 'parcelaInicial', name: 'Inicial' },
        { value: 'parcelaFinal', name: 'Final' }
      ]
    },
    {
      value: 'valores',
      name: 'Valores',
      subColumns: [
        { value: 'tipoValor', name: 'Tipo' },
        { value: 'modo', name: 'Modo' },
        { value: 'valor', name: 'Valor' },
        { value: 'baseValor', name: 'com base em qual valor?' },
        { value: 'baseQuem', name: 'com base em quem?' }
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
    fileName: "campanhas",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
  }), [handleGetDadosConfirmar, handleExcluirSelecionados]);

  const dadosTabela = useMemo(() => tabelaDados.map(item => ({
    ...item,
    valor: item.valor
  })), [tabelaDados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSectionWithBorder}>
        <h3 className={`${styles.sectionTitle} ${styles.firstTitle}`}>
          <i className="fa-solid fa-bullhorn"></i>
          Campanha - Regra
        </h3>
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Data - Inicio"
            identifier="data-inicio" 
            value={dataInicio}
            onChange={setDataInicio}
            inputRef={dataInicioRef}
            type='date'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Data - fim"
            identifier="data-fim" 
            value={dataFim}
            onChange={setDataFim}
            inputRef={dataFimRef}
            type='date'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Tipo"
            identifier="tipo-regra" 
            value={tipoRegra}
            onChange={setTipoRegra}
            inputRef={tipoRegraRef}
            type='select'
            options={tipoRegraOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="N° Parcela - Inicial"
            identifier="parcela-inicial" 
            value={parcelaInicial}
            onChange={setParcelaInicial}
            inputRef={parcelaInicialRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="N° Parcela - Final"
            identifier="parcela-final" 
            value={parcelaFinal}
            onChange={setParcelaFinal}
            inputRef={parcelaFinalRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-dollar-sign"></i>
          Campanha - Valores
        </h3>
        
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Tipo"
            identifier="tipo-valor" 
            value={tipoValor}
            onChange={setTipoValor}
            inputRef={tipoValorRef}
            type='select'
            options={tipoValorOptions}
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
            label="Com base em qual valor?"
            identifier="base-valor" 
            value={baseValor}
            onChange={setBaseValor}
            inputRef={baseValorRef}
            type='select'
            options={baseValorOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Com base em quem?"
            identifier="base-quem" 
            value={baseQuem}
            onChange={setBaseQuem}
            inputRef={baseQuemRef}
            type='select'
            options={baseQuemOptions}
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

export default Campanhas;