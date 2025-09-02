import React, { useState } from 'react';
import styles from './styles.module.css';
import TabelaPadrao from '../../../../../../../../components/TabelaPadrao';
import { UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import TogglePadrao from '../../../../../../../../components/TogglePadrao';
import dadosClientes from './dadosClientes.json';
import dadosContratos from './dadosContratos.json';

const DemonstrativoAnalitico = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(true);
  const [competencia, setCompetencia] = useState('2025-06-01');
  const [tipoVisualizacao, setTipoVisualizacao] = useState(true);
  const [tipoVisualizacaoSelecionado, setTipoVisualizacaoSelecionado] = useState(true);

  const handleGerar = () => {
    setTipoVisualizacaoSelecionado(tipoVisualizacao);
    setShowForm(false);
  };

  const handleFechar = () => {
    setShowForm(true);
    onClose();
  };

  const handleVoltar = () => {
    setShowForm(true);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {showForm ? (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <i className="fa-solid fa-calendar-check"></i>
                <h2 className={styles.modalTitle}>Competência</h2>
              </div>
              <button className={styles.modalCloseButton} onClick={handleFechar}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalForm}>
                <UseInputPadrao
                  label="Competência"
                  identifier="competencia"
                  type="date"
                  value={competencia}
                  onChange={(e) => setCompetencia(e.target.value)}
                  width={100}
                  gap={0}
                />
                
                <div className={styles.tipoVisualizacaoContainer}>
                  <label className={styles.tipoVisualizacaoLabel}>Tipo de Visualização</label>
                  <TogglePadrao
                    checked={tipoVisualizacao}
                    onChange={setTipoVisualizacao}
                    option1="Contrato"
                    option2="Cliente"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.modalButtonGerar} onClick={handleGerar}>
                <i className="fa-solid fa-file-export"></i>
                Gerar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <i className="fa-solid fa-chart-line"></i>
                <h2 className={styles.modalTitle}>Demonstrativo Analítico</h2>
              </div>
              <button className={styles.modalCloseButton} onClick={handleFechar}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <TabelaPadrao
                tabelaId="demonstrativo"
                columns={[
                  { name: 'Nome', value: 'nome', sortable: true },
                  { name: 'Tipo', value: 'tipo', sortable: true },
                  { name: 'Valor', value: 'valor', sortable: true, format: 'currency' }
                ]}
                data={tipoVisualizacaoSelecionado ? dadosClientes : dadosContratos}
                footer={[
                  {
                    name: 'Titular',
                    value: 'titular',
                    data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                      const count = tabelaBody.filter(item => item.tipo === 'Titular').length;
                      return count.toString();
                    }
                  },
                  {
                    name: 'Dependente',
                    value: 'dependente',
                    data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                      const count = tabelaBody.filter(item => item.tipo === 'Dependente').length;
                      return count.toString();
                    }
                  },
                  {
                    name: 'Valor',
                    value: 'total',
                    data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
                      const total = tabelaBody.reduce((acc, item) => {
                        const valor = typeof item.valor === 'number' ? item.valor : 0;
                        return acc + valor;
                      }, 0);
                      return `R$ ${total.toFixed(2).replace('.', ',')}`;
                    }
                  }
                ]}
                options={{
                  showPaginationSwitch: true,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showExport: true,
                  showFooter: true,
                  fileName: "demonstrativo-analitico",
                  toolbar: true,
                  toolbarPosition: "right"
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DemonstrativoAnalitico; 