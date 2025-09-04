import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../components';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const Especialidade = ({ isMobile = false, currentStep }) => {
  const [especialidade, setEspecialidade, especialidadeRef] = UseInputMask();
  const [limitePorMes, setLimitePorMes, limitePorMesRef] = UseInputMask();
  const [carencia, setCarencia, carenciaRef] = UseInputMask();

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      especialidade: 'Cardiologia',
      limitePorMes: 5,
      carencia: 30
    },
    {
      id: 2,
      especialidade: 'Dermatologia',
      limitePorMes: 3,
      carencia: 15
    }
  ]);
  const [selecionados, setSelecionados] = useState([]);

  const especialidadeOptions = [
    { value: 'Cardiologia', label: 'Cardiologia' },
    { value: 'Dermatologia', label: 'Dermatologia' },
    { value: 'Endocrinologia', label: 'Endocrinologia' },
    { value: 'Ginecologia', label: 'Ginecologia' },
    { value: 'Neurologia', label: 'Neurologia' },
    { value: 'Oftalmologia', label: 'Oftalmologia' },
    { value: 'Ortopedia', label: 'Ortopedia' },
    { value: 'Pediatria', label: 'Pediatria' },
    { value: 'Psiquiatria', label: 'Psiquiatria' },
    { value: 'Urologia', label: 'Urologia' }
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
    if (!especialidade || !limitePorMes || !carencia) {
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

    const novaEspecialidade = {
      id: Date.now(),
      especialidade: especialidade,
      limitePorMes: limitePorMes,
      carencia: carencia
    };

    setTabelaDados(prev => [...prev, novaEspecialidade]);
    
    setEspecialidade('');
    setLimitePorMes('');
    setCarencia('');
  }, [especialidade, limitePorMes, carencia]);

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

    handleExcluirSelecionados();
  }, [selecionados, handleExcluirSelecionados]);

  const handleAtualizar = useCallback(() => {
    if (selecionados.length !== 1) {
      dialogMessage(
        'Selecione exatamente um registro para atualizar.',
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

    const itemSelecionado = selecionados[0];
    setEspecialidade(itemSelecionado.especialidade);
    setLimitePorMes(itemSelecionado.limitePorMes);
    setCarencia(itemSelecionado.carencia);

    const idsParaExcluir = selecionados.map(item => item.id);
    setTabelaDados(prev => prev.filter(item => !idsParaExcluir.includes(item.id)));
    setSelecionados([]);
  }, [selecionados]);

  const tabelaColumns = useMemo(() => [
    { value: 'especialidade', name: 'Especialidade' },
    { value: 'limitePorMes', name: 'Limite por Mês' },
    { value: 'carencia', name: 'Carência' }
  ], []);

  const tabelaOptions = useMemo(() => ({
    showToggleView: false,
    showColumnsSelector: false,
    showPrint: false,
    showExport: false,
    showRefresh: false,
    showFilter: false,
    fileName: "especialidade",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosConfirmar,
  }), [handleGetDadosConfirmar, handleExcluirSelecionados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-stethoscope"></i>
          Especialidade
        </h3>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Especialidade"
            identifier="especialidade" 
            value={especialidade}
            onChange={setEspecialidade}
            inputRef={especialidadeRef}
            type='select'
            options={especialidadeOptions}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.5}
          />
                     <UseInputPadrao 
             label="Limite por Mês"
             identifier="limite-por-mes" 
             value={limitePorMes}
             onChange={setLimitePorMes}
             inputRef={limitePorMesRef}
             type='number'
             width={isMobile ? 100 : 33.33}
             gap={isMobile ? 0 : 0.5}
           />
           <UseInputPadrao 
             label="Carência"
             identifier="carencia" 
             value={carencia}
             onChange={setCarencia}
             inputRef={carenciaRef}
             type='number'
             width={isMobile ? 100 : 33.33}
             gap={isMobile ? 0 : 0.5}
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
          data={tabelaDados}
          options={tabelaOptions}
        />
      </div>
    </div>
  );
};

export default Especialidade;