import React, { useState } from 'react';
import styles from './styles.module.css';
import TabelaPadrao from '../../../../../../../../components/TabelaPadrao';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import dadosLogAuditoria from './dados.json';

const LogAuditoria = ({ isOpen, onClose }) => {
  const [dataInicial, setDataInicial, dataInicialRef] = UseInputMask();
  const [dataFinal, setDataFinal, dataFinalRef] = UseInputMask();

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-bookmark"></i>
            <h2 className={styles.modalTitle}>Log de Auditoria</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Data - Inicial"
              identifier="dataInicial"
              type="date"
              value={dataInicial}
              onChange={setDataInicial}
              inputRef={dataInicialRef}
            />
            <UseInputPadrao
              label="Data - Final"
              identifier="dataFinal"
              type="date"
              value={dataFinal}
              onChange={setDataFinal}
              inputRef={dataFinalRef}
            />
          </div>

          <TabelaPadrao
            tabelaId="logAuditoria"
            columns={[
              { name: 'Data', value: 'data', sortable: true },
              { name: 'Usuário', value: 'usuario', sortable: true },
              { name: 'Campo', value: 'campo', sortable: true },
              { name: 'Conteúdo Antigo', value: 'conteudoAntigo', sortable: true },
              { name: 'Conteúdo Novo', value: 'conteudoNovo', sortable: true }
            ]}
            data={dadosLogAuditoria}
            options={{
              showPaginationSwitch: true,
              showToggleView: true,
              showColumnsSelector: true,
              showExport: true,
              showFooter: false,
              fileName: "log-auditoria",
              toolbar: true,
              toolbarPosition: "right"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogAuditoria;