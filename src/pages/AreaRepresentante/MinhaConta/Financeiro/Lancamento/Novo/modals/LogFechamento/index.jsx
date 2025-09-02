import React, { useState } from 'react';
import styles from './styles.module.css';
import TabelaPadrao from '../../../../../../../../components/TabelaPadrao';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import dadosLogFechamento from './dados.json';

const LogFechamento = ({ isOpen, onClose }) => {
  const [dataInicial, setDataInicial, dataInicialRef] = UseInputMask('2025-07-22');
  const [dataFinal, setDataFinal, dataFinalRef] = UseInputMask('2025-07-22');
  const [texto, setTexto, textoRef] = UseInputMask();

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-file-alt"></i>
            <h2 className={styles.modalTitle}>Log de Fechamento</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <div className={styles.modalFormRow}>
              <UseInputPadrao
                label="Data Inicial"
                identifier="dataInicialFechamento"
                type="date"
                value={dataInicial}
                onChange={setDataInicial}
                inputRef={dataInicialRef}
              />
              
              <UseInputPadrao
                label="Final"
                identifier="dataFinalFechamento"
                type="date"
                value={dataFinal}
                onChange={setDataFinal}
                inputRef={dataFinalRef}
              />
            </div>
            
            <UseInputPadrao
              label="Texto"
              identifier="pesquisaFechamento"
              type="text"
              value={texto}
              onChange={setTexto}
              inputRef={textoRef}
            />
          </div>

          <TabelaPadrao
            tabelaId="logFechamento"
            columns={[
              { name: 'Data', value: 'data', sortable: true },
              { name: 'Usuário', value: 'usuario', sortable: true },
              { name: 'Motivo', value: 'motivo', sortable: true }
            ]}
            data={dadosLogFechamento}
            options={{
              showPaginationSwitch: true,
              showToggleView: true,
              showColumnsSelector: true,
              showExport: true,
              showFooter: false,
              fileName: "log-fechamento",
              toolbar: true,
              toolbarPosition: "right",
              additionalButtons: [
                {
                  title: 'Pesquisar',
                  icon: 'fa-solid fa-search',
                  onClick: () => {
                    
                  }
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogFechamento; 