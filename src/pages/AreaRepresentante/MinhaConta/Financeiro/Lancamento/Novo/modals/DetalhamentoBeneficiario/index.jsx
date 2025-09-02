import React, { useState, useCallback, useMemo } from 'react';
import styles from './styles.module.css';
import TabelaPadrao from '../../../../../../../../components/TabelaPadrao';
import dadosBeneficiario from './dados.json';
import dadosInconsistencias from './inconsistencias.json';
import ModalCriarDetalhamento from './ModalCriarDetalhamento';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import toastMessage from '../../../../../../../../assets/toast-ui/toast';

const DetalhamentoBeneficiario = ({ isOpen, onClose }) => {
  const [dados, setDados] = useState(dadosBeneficiario);
  const [selecionados, setSelecionados] = useState([]);
  const [showModalCriar, setShowModalCriar] = useState(false);

  const beneficiarios = useMemo(() => {
    return dados.map(item => item.nome);
  }, [dados]);

  const handleGetDadosSelecionados = useCallback((selectedData) => {
    setSelecionados(selectedData || []);
  }, []);

  const handleCriarDetalhamento = (dadosNovos) => {
    const novoItem = {
      nome: dadosNovos.beneficiario,
      tipo: dadosNovos.modo,
      valorCobrado: dadosNovos.valor,
      valorCusto: 0.00
    };
    
    setDados(prev => [...prev, novoItem]);
  };

  const handleDeletarDetalhamento = useCallback(() => {
    if (!selecionados || selecionados.length === 0) {
      dialogMessage("Selecione ao menos um registro para prosseguir", "warning", { 
        confirmButton: false,
        buttonsText: {
          close: "OK"
        }
      });
      return;
    }
    
    dialogMessage(
      "Tem certeza que deseja deletar esse detalhamento?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },
      (result) => {
        if (result) {
          const indicesParaRemover = selecionados.map(item => dados.indexOf(item));
          setDados(prev => prev.filter((_, index) => !indicesParaRemover.includes(index)));
          setSelecionados([]);
          toastMessage("Detalhamento deletado com sucesso", "success");
        }
      }
    );
  }, [selecionados, dados]);

  const handleEditarCampo = (linhaIndex, campo, valor) => {
    setDados(prev => prev.map((item, index) => {
      if (index === linhaIndex) {
        return { ...item, [campo]: valor };
      }
      return item;
    }));
  };

  const ValorCobradoComponent = ({ value, row }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value || '');
    const rowIndex = dados.findIndex(item => item === row);
    
    const handleStartEdit = () => {
      setIsEditing(true);
      setEditValue(value || '');
    };

    const handleSaveEdit = () => {
      handleEditarCampo(rowIndex, 'valorCobrado', parseFloat(editValue) || 0);
      setIsEditing(false);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditValue(value || '');
    };

    if (isEditing) {
      return (
        <div className={styles.cellContainer}>
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit();
              } else if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
            className={styles.editInput}
            autoFocus
          />
        </div>
      );
    }
    
    return (
      <div className={styles.cellContainer}>
        <span>{typeof value === 'number' ? `R$ ${value.toFixed(2).replace('.', ',')}` : value}</span>
        <button
          className={styles.editButton}
          onClick={handleStartEdit}
          title="Editar"
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    );
  };

  const ValorCustoComponent = ({ value, row }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value || '');
    const rowIndex = dados.findIndex(item => item === row);
    
    const handleStartEdit = () => {
      setIsEditing(true);
      setEditValue(value || '');
    };

    const handleSaveEdit = () => {
      handleEditarCampo(rowIndex, 'valorCusto', parseFloat(editValue) || 0);
      setIsEditing(false);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditValue(value || '');
    };

    if (isEditing) {
      return (
        <div className={styles.cellContainer}>
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit();
              } else if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
            className={styles.editInput}
            autoFocus
          />
        </div>
      );
    }
    
    return (
      <div className={styles.cellContainer}>
        <span>{typeof value === 'number' ? `R$ ${value.toFixed(2).replace('.', ',')}` : value}</span>
        <button
          className={styles.editButton}
          onClick={handleStartEdit}
          title="Editar"
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    );
  };

  const TipoComponent = ({ value, row }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value || '');
    const rowIndex = dados.findIndex(item => item === row);
    
    const handleStartEdit = () => {
      setIsEditing(true);
      setEditValue(value || '');
    };

    const handleSaveEdit = () => {
      handleEditarCampo(rowIndex, 'tipo', editValue);
      setIsEditing(false);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditValue(value || '');
    };

    if (isEditing) {
      return (
        <div className={styles.cellContainer}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit();
              } else if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
            className={styles.editInput}
            autoFocus
          />
        </div>
      );
    }
    
    return (
      <div className={styles.cellContainer}>
        <span>{value}</span>
        <button
          className={styles.editButton}
          onClick={handleStartEdit}
          title="Editar"
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    );
  };

  const tabelaColumns = [
    { name: '', value: 'checkbox', component: () => <input type="checkbox" /> },
    { name: 'Nome', value: 'nome', sortable: true },
    { name: 'Valor de?', value: 'tipo', sortable: true, component: TipoComponent },
    { name: 'Valor Cobrado', value: 'valorCobrado', sortable: true, component: ValorCobradoComponent },
    { name: 'Valor de Custo', value: 'valorCusto', sortable: true, component: ValorCustoComponent }
  ];

  const tabelaOptions = {
    showPaginationSwitch: true,
    showToggleView: true,
    showColumnsSelector: true,
    showExport: true,
    showFooter: true,
    fileName: "detalhamento-beneficiario",
    toolbar: true,
    toolbarPosition: "right",
    rowSelection: true,
    rowSelectionMode: "multiple",
    onRowSelectChange: handleGetDadosSelecionados,
    additionalButtons: [
      {
        title: 'Deletar Detalhamento',
        icon: 'fa-solid fa-trash',
        onClick: handleDeletarDetalhamento
      },
      {
        title: 'Criar Detalhamento',
        icon: 'fa-solid fa-plus',
        onClick: () => {
          setShowModalCriar(true);
        }
      },
      {
        title: 'Regerar Detalhamento',
        icon: 'fa-solid fa-rotate',
        onClick: () => {
          
        }
      }
    ]
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderLeft}>
              <i className="fa-solid fa-user-friends"></i>
              <h2 className={styles.modalTitle}>Detalhamento Beneficiário</h2>
            </div>
            <button className={styles.modalCloseButton} onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          
          <div className={styles.modalBody}>
            <TabelaPadrao
              tabelaId="beneficiario"
              columns={tabelaColumns}
              data={dados}
              footer={[
                {
                  name: 'Valor Cobrado',
                  value: 'totalCobrado',
                  data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                    const total = tabelaBody.reduce((acc, item) => {
                      const valor = typeof item.valorCobrado === 'number' ? item.valorCobrado : 0;
                      return acc + valor;
                    }, 0);
                    return `R$ ${total.toFixed(2).replace('.', ',')}`;
                  }
                },
                {
                  name: 'Valor de Custo',
                  value: 'totalCusto',
                  data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                    const total = tabelaBody.reduce((acc, item) => {
                      const valor = typeof item.valorCusto === 'number' ? item.valorCusto : 0;
                      return acc + valor;
                    }, 0);
                    return `R$ ${total.toFixed(2).replace('.', ',')}`;
                  }
                }
              ]}
              options={tabelaOptions}
            />

            <div className={styles.inconsistenciasSection}>
              <h3 className={styles.inconsistenciasTitle}>Inconsistências</h3>
              <TabelaPadrao
                tabelaId="inconsistencias"
                columns={[
                  { name: 'Tipo', value: 'tipo', sortable: false },
                  { name: 'Mensalidade', value: 'mensalidade', sortable: true, format: 'currency' },
                  { name: 'Anual', value: 'anual', sortable: true, format: 'currency' },
                  { name: 'Idade', value: 'idade', sortable: true, format: 'currency' },
                  { name: 'Retroativo', value: 'retroativo', sortable: true, format: 'currency' }
                ]}
                data={dadosInconsistencias}
                options={{
                  showHeader: true,
                  showFooter: false,
                  toolbar: false,
                  showPagination: false,
                  showSearch: false,
                  showExport: false,
                  showToggleView: false,
                  showColumnsSelector: false,
                  showPaginationSwitch: false,
                  showRefresh: false,
                  showFilter: false,
                  showGuardaCampos: false,
                  showPrint: false,
                  paginationEnabled: false
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalCriarDetalhamento
        isOpen={showModalCriar}
        onClose={() => setShowModalCriar(false)}
        beneficiarios={beneficiarios}
        beneficiarioSelecionado={selecionados.length > 0 ? selecionados[0]?.nome : null}
        onCriar={handleCriarDetalhamento}
      />
    </>
  );
};

export default DetalhamentoBeneficiario; 