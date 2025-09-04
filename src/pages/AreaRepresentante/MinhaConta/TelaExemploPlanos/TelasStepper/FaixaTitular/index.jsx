import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../components';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const FaixaTitular = ({ isMobile = false, currentStep }) => {
  const [faixaInicial, setFaixaInicial, faixaInicialRef] = UseInputMask();
  const [faixaFinal, setFaixaFinal, faixaFinalRef] = UseInputMask();
  const [valorCusto, setValorCusto, valorCustoRef] = UseInputMask();
  const [valorVenda, setValorVenda, valorVendaRef] = UseInputMask();
  const [modoAdesao, setModoAdesao, modoAdesaoRef] = UseInputMask();
  const [valorAdesao, setValorAdesao, valorAdesaoRef] = UseInputMask();
  const [tipoReajuste, setTipoReajuste, tipoReajusteRef] = UseInputMask();
  const [valorANS, setValorANS, valorANSRef] = UseInputMask();
  const [valorIGPDI, setValorIGPDI, valorIGPDIRef] = UseInputMask();
  const [valorIGPM, setValorIGPM, valorIGPMRef] = UseInputMask();

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      faixaInicial: 18,
      faixaFinal: 30,
      valorCusto: 150.00,
      valorVenda: 200.00,
      modoAdesao: 'Dinheiro',
      valorAdesao: 50.00,
      tipoReajuste: 'Operadora',
      valorANS: 10.00,
      valorIGPDI: 5.00,
      valorIGPM: 3.00
    },
    {
      id: 2,
      faixaInicial: 31,
      faixaFinal: 45,
      valorCusto: 180.00,
      valorVenda: 200.00,
      modoAdesao: 'Cartão',
      valorAdesao: 60.00,
      tipoReajuste: 'ANS',
      valorANS: 15.00,
      valorIGPDI: 8.00,
      valorIGPM: 4.00
    }
  ]);
  const [selecionados, setSelecionados] = useState([]);

  const modoAdesaoOptions = [
    { value: 'Dinheiro', label: 'Dinheiro' },
    { value: 'Percentual', label: 'Percentual' },
  ];

  const tipoReajusteOptions = [
    { value: 'Operadora', label: 'Operadora' },
    { value: 'ANS', label: 'ANS' },
    { value: 'IGPDI', label: 'IGPDI' },
    { value: 'IGPM', label: 'IGPM' },
    { value: 'IPCA', label: 'IPCA' },
    { value: 'INPC', label: 'INPC' }
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
    if (!faixaInicial || !faixaFinal || !valorCusto || !valorVenda || !modoAdesao || !valorAdesao || !tipoReajuste || !valorANS || !valorIGPDI || !valorIGPM) {
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

    const novaFaixa = {
      id: Date.now(),
      faixaInicial: parseInt(faixaInicial) || 0,
      faixaFinal: parseInt(faixaFinal) || 0,
      valorCusto: parseFloat(valorCusto) || 0,
      valorVenda: parseFloat(valorVenda) || 0,
      modoAdesao: modoAdesao || 'Dinheiro',
      valorAdesao: parseFloat(valorAdesao) || 0,
      tipoReajuste: tipoReajuste || 'Operadora',
      valorANS: parseFloat(valorANS) || 0,
      valorIGPDI: parseFloat(valorIGPDI) || 0,
      valorIGPM: parseFloat(valorIGPM) || 0
    };

    setTabelaDados(prev => [...prev, novaFaixa]);
    
    setFaixaInicial('');
    setFaixaFinal('');
    setValorCusto('');
    setValorVenda('');
    setModoAdesao('Dinheiro');
    setValorAdesao('');
    setTipoReajuste('Operadora');
    setValorANS('');
    setValorIGPDI('');
    setValorIGPM('');
  }, [faixaInicial, faixaFinal, valorCusto, valorVenda, modoAdesao, valorAdesao, tipoReajuste, valorANS, valorIGPDI, valorIGPM]);

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
    { value: 'faixaInicial', name: 'Faixa Inicial' },
    { value: 'faixaFinal', name: 'Faixa Final' },
    { value: 'valorCusto', name: 'Vr. Custo' },
    { value: 'valorVenda', name: 'Vr. Venda' },
    { value: 'modoAdesao', name: 'Modo Adesão' },
    { value: 'valorAdesao', name: 'Vr. Adesão' },
    { value: 'tipoReajuste', name: 'Tipo Reajuste' },
    { value: 'valorANS', name: 'Vr ANS' },
    { value: 'valorIGPDI', name: 'Vr IGPDI' },
    { value: 'valorIGPM', name: 'Vr IGPM' }
  ], []);

  const tabelaOptions = useMemo(() => ({
    showPaginationSwitch: true,
    showSearch: false,
    showToggleView: false,
    showColumnsSelector: false,
    showPrint: false,
    showExport: true,
    showRefresh: false,
    showFilter: false,
    fileName: "faixa-titular",
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
    valorCusto: formatCurrency(item.valorCusto),
    valorVenda: formatCurrency(item.valorVenda),
    valorAdesao: formatCurrency(item.valorAdesao),
    valorANS: formatCurrency(item.valorANS),
    valorIGPDI: formatCurrency(item.valorIGPDI),
    valorIGPM: formatCurrency(item.valorIGPM)
  })), [tabelaDados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-user"></i>
          Faixa do Titular por Idade
        </h3>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Faixa de Idade - Inicial"
            identifier="faixa-inicial" 
            value={faixaInicial}
            onChange={setFaixaInicial}
            inputRef={faixaInicialRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Faixa de Idade - Final"
            identifier="faixa-final" 
            value={faixaFinal}
            onChange={setFaixaFinal}
            inputRef={faixaFinalRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor de Custo"
            identifier="valor-custo" 
            value={valorCusto}
            onChange={setValorCusto}
            inputRef={valorCustoRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor de Venda"
            identifier="valor-venda" 
            value={valorVenda}
            onChange={setValorVenda}
            inputRef={valorVendaRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Modo da Adesão"
            identifier="modo-adesao" 
            value={modoAdesao}
            onChange={setModoAdesao}
            inputRef={modoAdesaoRef}
            type='select'
            options={modoAdesaoOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0}
          />
        </div>
        
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Valor da Adesão"
            identifier="valor-adesao" 
            value={valorAdesao}
            onChange={setValorAdesao}
            inputRef={valorAdesaoRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Tipo Reajuste"
            identifier="tipo-reajuste" 
            value={tipoReajuste}
            onChange={setTipoReajuste}
            inputRef={tipoReajusteRef}
            type='select'
            options={tipoReajusteOptions}
            width={isMobile ? 100 : 20} 
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor ANS"
            identifier="valor-ans" 
            value={valorANS}
            onChange={setValorANS}
            inputRef={valorANSRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor IGPDI"
            identifier="valor-igpdi" 
            value={valorIGPDI}
            onChange={setValorIGPDI}
            inputRef={valorIGPDIRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor IGPM"
            identifier="valor-igpm" 
            value={valorIGPM}
            onChange={setValorIGPM}
            inputRef={valorIGPMRef}
            type='number'
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

export default FaixaTitular;