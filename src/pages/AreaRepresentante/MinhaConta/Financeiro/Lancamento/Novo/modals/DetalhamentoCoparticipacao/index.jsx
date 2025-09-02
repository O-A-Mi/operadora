import React from 'react';
import styles from './styles.module.css';
import TabelaPadrao from '../../../../../../../../components/TabelaPadrao';
import dadosCoparticipacao from './dados.json';

const DetalhamentoCoparticipacao = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-users"></i>
            <h2 className={styles.modalTitle}>Detalhamento Coparticipação</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <TabelaPadrao
            tabelaId="coparticipacao"
            columns={[
              { name: 'Nome', value: 'nome', sortable: true },
              { name: 'Valor', value: 'valor', sortable: true, format: 'currency' },
              { name: 'Procedimento', value: 'procedimento', sortable: true },
              { name: 'Representante', value: 'representante', sortable: true },
              { name: 'Operadora', value: 'operadora', sortable: true },
              { name: 'Data', value: 'data', sortable: true, format: 'date' }
            ]}
            data={dadosCoparticipacao}
            footer={[
              {
                name: 'Valor da Coparticipação',
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
              fileName: "detalhamento-coparticipacao",
              toolbar: true,
              toolbarPosition: "right"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetalhamentoCoparticipacao; 