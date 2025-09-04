import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import { TabelaPadrao, TogglePadrao } from '../../../../../../../../components';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const VigenciaLimite = ({ isMobile = false, currentStep }) => {
  const [limiteTransmissao, setLimiteTransmissao, limiteTransmissaoRef] = UseInputMask();
  const [vigencia, setVigencia, vigenciaRef] = UseInputMask();
  const [primeiroVencimento, setPrimeiroVencimento, primeiroVencimentoRef] = UseInputMask();
  const [demaisVencimento, setDemaisVencimento, demaisVencimentoRef] = UseInputMask();
  const [modoReajuste, setModoReajuste, modoReajusteRef] = UseInputMask();
  const [acrescimoReajuste, setAcrescimoReajuste, acrescimoReajusteRef] = UseInputMask();
  const [tipoReajuste, setTipoReajuste, tipoReajusteRef] = UseInputMask();
  const [diasCalcularRateio, setDiasCalcularRateio, diasCalcularRateioRef] = UseInputMask();
  const [entidades, setEntidades, entidadesRef] = UseInputMask();
  const [mostrarPassado, setMostrarPassado] = useState(false);

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      limiteTransmissao: '31/12/2024',
      vigencia: '01/01/2024',
      primeiroVencimento: '15/01/2024',
      demaisVencimento: '15',
      modoReajuste: 'Dinheiro',
      valorReajuste: 0.00,
      prorata: 'Sim',
      tipoReajuste: 'Operadora',
      entidadesInclusas: 'Todas'
    },
    {
      id: 2,
      limiteTransmissao: '31/12/2025',
      vigencia: '01/01/2025',
      primeiroVencimento: '10/01/2025',
      demaisVencimento: '10',
      modoReajuste: 'Percentual',
      valorReajuste: 5.00,
      prorata: 'Não',
      tipoReajuste: 'Cliente',
      entidadesInclusas: 'Selecionadas'
    }
  ]);
  const [selecionados, setSelecionados] = useState([]);

  const demaisVencimentoOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
  }));

  const modoReajusteOptions = [
    { value: 'Dinheiro', label: 'Dinheiro' },
    { value: 'Percentual', label: 'Percentual' },
    { value: 'Índice', label: 'Índice' }
  ];

  const tipoReajusteOptions = [
    { value: 'Operadora', label: 'Operadora' },
    { value: 'Cliente', label: 'Cliente' },
    { value: 'Misto', label: 'Misto' }
  ];

  const entidadesOptions = [
    { value: 'Todas', label: 'Todas' },
    { value: 'Selecionadas', label: 'Selecionadas' },
    { value: 'Ativas', label: 'Ativas' },
    { value: 'Inativas', label: 'Inativas' }
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
    if (!limiteTransmissao || !vigencia || !primeiroVencimento || !demaisVencimento || !modoReajuste || !tipoReajuste) {
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

    const novaVigencia = {
      id: Date.now(),
      limiteTransmissao: limiteTransmissao || '',
      vigencia: vigencia || '',
      primeiroVencimento: primeiroVencimento || '',
      demaisVencimento: demaisVencimento || '',
      modoReajuste: modoReajuste || '',
      valorReajuste: parseFloat(acrescimoReajuste) || 0,
      prorata: diasCalcularRateio ? 'Sim' : 'Não',
      tipoReajuste: tipoReajuste || '',
      entidadesInclusas: entidades || 'Todas'
    };

    setTabelaDados(prev => [...prev, novaVigencia]);

    setLimiteTransmissao('');
    setVigencia('');
    setPrimeiroVencimento('');
    setDemaisVencimento('');
    setModoReajuste('');
    setAcrescimoReajuste('');
    setTipoReajuste('');
    setDiasCalcularRateio('');
    setEntidades('');
  }, [limiteTransmissao, vigencia, primeiroVencimento, demaisVencimento, modoReajuste, acrescimoReajuste, tipoReajuste, diasCalcularRateio, entidades]);

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

  const handleDuplicar = useCallback(() => {
    if (selecionados.length === 0) {
      dialogMessage(
        'Selecione ao menos um registro para duplicar.',
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
    
    const registrosParaDuplicar = selecionados.map(item => ({
      ...item,
      id: Date.now() + Math.random()
    }));
    
    setTabelaDados(prev => [...prev, ...registrosParaDuplicar]);
    setSelecionados([]);
  }, [selecionados]);

  const tabelaColumns = useMemo(() => [
    { value: 'id', name: '#' },
    { value: 'limiteTransmissao', name: 'Limite de Transmissão' },
    { value: 'vigencia', name: 'Vigência' },
    { value: 'primeiroVencimento', name: '1º Vencimento' },
    { value: 'demaisVencimento', name: 'Demais Vencimento' },
    { value: 'modoReajuste', name: 'Modo de Reajuste' },
    { value: 'valorReajuste', name: 'Valor de Reajuste' },
    { value: 'prorata', name: 'Prorata' },
    { value: 'tipoReajuste', name: 'Tipo de Reajuste' },
    { value: 'entidadesInclusas', name: 'Entidades Inclusas' }
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
    fileName: "vigencia-limite",
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
    valorReajuste: formatCurrency(item.valorReajuste)
  })), [tabelaDados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-calendar"></i>
          Vigência e Limite
        </h3>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Limite de Transmissão"
            identifier="limite-transmissao" 
            value={limiteTransmissao}
            onChange={setLimiteTransmissao}
            inputRef={limiteTransmissaoRef}
            type='date'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Vigência"
            identifier="vigencia" 
            value={vigencia}
            onChange={setVigencia}
            inputRef={vigenciaRef}
            type='date'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="1ª Parcela Vencto"
            identifier="primeiro-vencimento" 
            value={primeiroVencimento}
            onChange={setPrimeiroVencimento}
            inputRef={primeiroVencimentoRef}
            type='date'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Demais Vencimento"
            identifier="demais-vencimento" 
            value={demaisVencimento}
            onChange={setDemaisVencimento}
            inputRef={demaisVencimentoRef}
            type='select'
            options={demaisVencimentoOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Modo de Reajuste"
            identifier="modo-reajuste" 
            value={modoReajuste}
            onChange={setModoReajuste}
            inputRef={modoReajusteRef}
            type='select'
            options={modoReajusteOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0}
          />
        </div>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Acréscimo de Reajuste"
            identifier="acrescimo-reajuste" 
            value={acrescimoReajuste}
            onChange={setAcrescimoReajuste}
            inputRef={acrescimoReajusteRef}
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
            label="Dias para calcular rateio"
            identifier="dias-calcular-rateio" 
            value={diasCalcularRateio}
            onChange={setDiasCalcularRateio}
            inputRef={diasCalcularRateioRef}
            type='number'
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Entidades"
            identifier="entidades" 
            value={entidades}
            onChange={setEntidades}
            inputRef={entidadesRef}
            type='select'
            options={entidadesOptions}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
            multiple={true}
          />
          <TogglePadrao
            label="Mostrar Passado?"
            checked={mostrarPassado}
            onChange={(checked) => setMostrarPassado(checked)}
            option1="Não"
            option2="Sim"
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
          <button
            type="button"
            onClick={handleDuplicar}
            className={`${styles.actionButton} ${styles.actionButtonDuplicar}`}
          >
            <i className="fa-solid fa-copy"></i>
            Duplicar
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

export default VigenciaLimite;