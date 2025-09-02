import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';
import { TabelaPadrao, TogglePadrao } from '../../../../../../../components';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const Pontuacao = ({ isMobile = false, currentStep }) => {
  const [parcelaInicial, setParcelaInicial, parcelaInicialRef] = UseInputMask();
  const [parcelaFinal, setParcelaFinal, parcelaFinalRef] = UseInputMask();
  const [tipo, setTipo, tipoRef] = UseInputMask();
  const [baseCampo, setBaseCampo, baseCampoRef] = UseInputMask();
  const [indicacao, setIndicacao] = useState(false);
  
  const [condicaoPrincipal, setCondicaoPrincipal, condicaoPrincipalRef] = UseInputMask();
  const [qtdDiasPrincipal, setQtdDiasPrincipal, qtdDiasPrincipalRef] = UseInputMask();
  const [modoPrincipal, setModoPrincipal, modoPrincipalRef] = UseInputMask();
  const [valorPrincipal, setValorPrincipal, valorPrincipalRef] = UseInputMask();
  
  const [condicaoExtra, setCondicaoExtra, condicaoExtraRef] = UseInputMask();
  const [qtdDiasExtra, setQtdDiasExtra, qtdDiasExtraRef] = UseInputMask();
  const [modoExtra, setModoExtra, modoExtraRef] = UseInputMask();
  const [valorExtra, setValorExtra, valorExtraRef] = UseInputMask();

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      parcelaInicial: 1,
      parcelaFinal: 12,
      tipo: 'Adesão',
      baseCampo: 'Preço Net',
      indicacao: false,
      condicaoPrincipal: 'Menor ou igual (<=)',
      qtdDiasPrincipal: 30,
      modoPrincipal: 'Ponto Fixo',
      valorPrincipal: 150.00,
      condicaoExtra: 'Maior que (>)',
      qtdDiasExtra: 60,
      modoExtra: 'Percentual',
      valorExtra: 5.00
    },
    {
      id: 2,
      parcelaInicial: 13,
      parcelaFinal: 24,
      tipo: 'Renovação',
      baseCampo: 'Preço Bruto',
      indicacao: true,
      condicaoPrincipal: 'Igual (=)',
      qtdDiasPrincipal: 45,
      modoPrincipal: 'Variável',
      valorPrincipal: 200.00,
      condicaoExtra: 'Menor que (<)',
      qtdDiasExtra: 90,
      modoExtra: 'Fixo',
      valorExtra: 10.00
    }
  ]);
  const [selecionados, setSelecionados] = useState([]);

  const tipoOptions = [
    { value: 'Adesão', label: 'Adesão' },
    { value: 'Renovação', label: 'Renovação' },
    { value: 'Cancelamento', label: 'Cancelamento' }
  ];

  const baseCampoOptions = [
    { value: 'Preço Net', label: 'Preço Net' },
    { value: 'Preço Bruto', label: 'Preço Bruto' },
    { value: 'Valor Base', label: 'Valor Base' }
  ];

  const condicaoOptions = [
    { value: 'Menor ou igual (<=)', label: 'Menor ou igual (<=)' },
    { value: 'Maior que (>)', label: 'Maior que (>)' },
    { value: 'Igual (=)', label: 'Igual (=)' },
    { value: 'Menor que (<)', label: 'Menor que (<)' },
    { value: 'Maior ou igual (>=)', label: 'Maior ou igual (>=)' }
  ];

  const qtdDiasOptions = [
    { value: '-1', label: '-1' },
    { value: '0', label: '0' },
    ...Array.from({ length: 31 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1)
    }))
  ];

  const modoOptions = [
    { value: 'Ponto Fixo', label: 'Ponto Fixo' },
    { value: 'Percentual', label: 'Percentual' },
    { value: 'Variável', label: 'Variável' },
    { value: 'Fixo', label: 'Fixo' }
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
    if (!parcelaInicial || !parcelaFinal || !tipo || !baseCampo || !indicacao || 
        !condicaoPrincipal || !qtdDiasPrincipal || !modoPrincipal || !valorPrincipal ||
        !condicaoExtra || !qtdDiasExtra || !modoExtra || !valorExtra) {
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

    const novaPontuacao = {
      id: Date.now(),
      parcelaInicial: parseInt(parcelaInicial) || 0,
      parcelaFinal: parseInt(parcelaFinal) || 0,
      tipo: tipo || '',
      baseCampo: baseCampo || '',
      indicacao: indicacao ? 'Sim' : 'Não',
      condicaoPrincipal: condicaoPrincipal || '',
      qtdDiasPrincipal: parseInt(qtdDiasPrincipal) || 0,
      modoPrincipal: modoPrincipal || '',
      valorPrincipal: parseFloat(valorPrincipal) || 0,
      condicaoExtra: condicaoExtra || '',
      qtdDiasExtra: parseInt(qtdDiasExtra) || 0,
      modoExtra: modoExtra || '',
      valorExtra: parseFloat(valorExtra) || 0
    };

    setTabelaDados(prev => [...prev, novaPontuacao]);

    setParcelaInicial('');
    setParcelaFinal('');
    setTipo('');
    setBaseCampo('');
    setIndicacao(false);
    setCondicaoPrincipal('');
    setQtdDiasPrincipal('');
    setModoPrincipal('');
    setValorPrincipal('');
    setCondicaoExtra('');
    setQtdDiasExtra('');
    setModoExtra('');
    setValorExtra('');
  }, [parcelaInicial, parcelaFinal, tipo, baseCampo, indicacao, condicaoPrincipal, qtdDiasPrincipal, modoPrincipal, valorPrincipal, condicaoExtra, qtdDiasExtra, modoExtra, valorExtra]);

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
      value: 'pontuacao',
      name: 'Pontuação',
      subColumns: [
        { value: 'parcelaInicial', name: 'Inicial' },
        { value: 'parcelaFinal', name: 'Final' },
        { value: 'tipo', name: 'Tipo' },
        { value: 'baseCampo', name: 'Com base em qual campo?' },
        { value: 'indicacao', name: 'Indicação?' }
      ]
    },
    {
      value: 'regraPrincipal',
      name: 'Regra Principal',
      subColumns: [
        { value: 'condicaoPrincipal', name: 'Condição' },
        { value: 'qtdDiasPrincipal', name: 'Qtd.Dias' },
        { value: 'modoPrincipal', name: 'Modo' },
        { value: 'valorPrincipal', name: 'Valor' }
      ]
    },
    {
      value: 'regraExtra',
      name: 'Regra Extra',
      subColumns: [
        { value: 'condicaoExtra', name: 'Condição' },
        { value: 'qtdDiasExtra', name: 'Qtd.Dias' },
        { value: 'modoExtra', name: 'Modo' },
        { value: 'valorExtra', name: 'Valor' }
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
    fileName: "pontuacao",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
  }), [handleGetDadosConfirmar, handleExcluirSelecionados]);

  const dadosTabela = useMemo(() => tabelaDados.map(item => ({
    ...item,
    indicacao: item.indicacao ? 'Sim' : 'Não',
    valorPrincipal: item.valorPrincipal,
    valorExtra: item.valorExtra
  })), [tabelaDados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSectionWithBorder}>
        <h3 className={`${styles.sectionTitle} ${styles.firstTitle}`}>
          <i className="fa-solid fa-coins"></i>
          Pontuação
        </h3>
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="N° Parcela - Inicial"
            identifier="parcela-inicial" 
            value={parcelaInicial}
            onChange={setParcelaInicial}
            inputRef={parcelaInicialRef}
            type='number'
            width={isMobile ? 100 : 24}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="N° Parcela - Final"
            identifier="parcela-final" 
            value={parcelaFinal}
            onChange={setParcelaFinal}
            inputRef={parcelaFinalRef}
            type='number'
            width={isMobile ? 100 : 24}
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
            width={isMobile ? 100 : 24}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Com base em qual campo"
            identifier="base-campo" 
            value={baseCampo}
            onChange={setBaseCampo}
            inputRef={baseCampoRef}
            type='select'
            options={baseCampoOptions}
            width={isMobile ? 100 : 23.96}
            gap={isMobile ? 0 : 0.5}
          />
          <TogglePadrao 
            label="Indicação?"
            checked={indicacao}
            onChange={(checked) => setIndicacao(checked)}
            option1="Não"
            option2="Sim"
          />
        </div>
      </div>

      <div className={styles.formSectionWithBorder}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-cog"></i>
          Regra Principal
        </h3>
        
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Condição"
            identifier="condicao-principal" 
            value={condicaoPrincipal}
            onChange={setCondicaoPrincipal}
            inputRef={condicaoPrincipalRef}
            type='select'
            options={condicaoOptions}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Quantidade de dias"
            identifier="qtd-dias-principal" 
            value={qtdDiasPrincipal}
            onChange={setQtdDiasPrincipal}
            inputRef={qtdDiasPrincipalRef}
            type='select'
            options={qtdDiasOptions}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Modo"
            identifier="modo-principal" 
            value={modoPrincipal}
            onChange={setModoPrincipal}
            inputRef={modoPrincipalRef}
            type='select'
            options={modoOptions}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor"
            identifier="valor-principal" 
            value={valorPrincipal}
            onChange={setValorPrincipal}
            inputRef={valorPrincipalRef}
            type='number'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-plus"></i>
          Regra Extra
        </h3>
        
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Condição"
            identifier="condicao-extra" 
            value={condicaoExtra}
            onChange={setCondicaoExtra}
            inputRef={condicaoExtraRef}
            type='select'
            options={condicaoOptions}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Quantidade de dias"
            identifier="qtd-dias-extra" 
            value={qtdDiasExtra}
            onChange={setQtdDiasExtra}
            inputRef={qtdDiasExtraRef}
            type='select'
            options={qtdDiasOptions}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Modo"
            identifier="modo-extra" 
            value={modoExtra}
            onChange={setModoExtra}
            inputRef={modoExtraRef}
            type='select'
            options={modoOptions}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor"
            identifier="valor-extra" 
            value={valorExtra}
            onChange={setValorExtra}
            inputRef={valorExtraRef}
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

export default Pontuacao;
