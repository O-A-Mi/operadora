import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../components';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const ProdutoServico = ({ isMobile = false, currentStep }) => {
  const [nomeProduto, setNomeProduto, nomeProdutoRef] = UseInputMask();
  const [valorCusto, setValorCusto, valorCustoRef] = UseInputMask();
  const [valorVenda, setValorVenda, valorVendaRef] = UseInputMask();

  const handleNomeProdutoChange = useCallback((e) => {
    setNomeProduto(e);
  }, []);

  const handleValorCustoChange = useCallback((e) => {
    setValorCusto(e);
  }, []);

  const handleValorVendaChange = useCallback((e) => {
    setValorVenda(e);
  }, []);

  const [tabelaDados, setTabelaDados] = useState([
    {
      id: 1,
      generoProduto: 'Masculino',
      produtoServico: 'Consulta Médica',
      descricao: 'Consulta com cardiologista',
      valorCusto: 150.00,
      valorVenda: 200.00
    },
    {
      id: 2,
      generoProduto: 'Feminino',
      produtoServico: 'Exame Laboratorial',
      descricao: 'Exame de sangue completo',
      valorCusto: 80.00,
      valorVenda: 120.00
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
    if (!nomeProduto || !valorCusto || !valorVenda) {
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

    const custo = parseFloat(valorCusto);
    const venda = parseFloat(valorVenda);

    if (isNaN(custo) || isNaN(venda) || custo < 0 || venda < 0) {
      dialogMessage(
        'Os valores de custo e venda devem ser números válidos maiores que zero.',
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

    const novoProduto = {
      id: Date.now(),
      generoProduto: 'Masculino',
      produtoServico: nomeProduto,
      descricao: nomeProduto,
      valorCusto: custo,
      valorVenda: venda
    };

    setTabelaDados(prev => [...prev, novoProduto]);
    
    setNomeProduto('');
    setValorCusto('');
    setValorVenda('');
  }, [nomeProduto, valorCusto, valorVenda]);

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
    { value: 'descricao', name: 'Descrição' },
    { value: 'valorCusto', name: 'Vr. Custo' },
    { value: 'valorVenda', name: 'Vr. Venda' }
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
    fileName: "produto-servico",
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
    valorVenda: formatCurrency(item.valorVenda)
  })), [tabelaDados]);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-wrench"></i>
          Produto/Serviço
        </h3>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Nome do Produto"
            identifier="nome-produto" 
            value={nomeProduto}
            onChange={handleNomeProdutoChange}
            inputRef={nomeProdutoRef}
            type='text'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor de Custo"
            identifier="valor-custo" 
            value={valorCusto}
            onChange={handleValorCustoChange}
            inputRef={valorCustoRef}
            type='number'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Valor de Venda"
            identifier="valor-venda" 
            value={valorVenda}
            onChange={handleValorVendaChange}
            inputRef={valorVendaRef}
            type='number'
            width={isMobile ? 100 : 25}
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
           data={dadosTabela}
           options={tabelaOptions}
         />
       </div>
    </div>
  );
};

export default ProdutoServico;