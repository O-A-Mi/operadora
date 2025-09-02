import React, { useState } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';

const ModalFormularios = ({ isOpen, onClose }) => {
  const [selectedForm, setSelectedForm, selectedFormRef] = UseInputMask('recibo_lancamento');

  const formularios = [
    { value: 'recibo_lancamento', label: 'RECIBO LANCAMENTO' },
    { value: 'comprovante_pagamento', label: 'COMPROVANTE PAGAMENTO' },
    { value: 'relatorio_financeiro', label: 'RELATORIO FINANCEIRO' },
    { value: 'extrato_conta', label: 'EXTRATO CONTA' },
    { value: 'fatura_mensal', label: 'FATURA MENSAL' }
  ];

  const handleVisualizar = () => {
    
  };

  const handleImprimir = () => {
    
  };

  const handleFechar = () => {
    setSelectedForm('recibo_lancamento');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-file-lines"></i>
            <h2 className={styles.modalTitle}>Formulários</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Formulários"
              identifier="formularios"
              type="select"
              value={selectedForm}
              onChange={setSelectedForm}
              inputRef={selectedFormRef}
              options={formularios}
              width={100}
              gap={0}
            />
            
            <div className={styles.actionButtons}>
              <button className={styles.visualizarButton} onClick={handleVisualizar}>
                <i className="fa-solid fa-eye"></i>
                Visualizar
              </button>
              <button className={styles.imprimirButton} onClick={handleImprimir}>
                <i className="fa-solid fa-print"></i>
                Imprimir
              </button>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default ModalFormularios; 