import React, { useState } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../../../components/InputPadrao';
import toastMessage from '../../../../../../../assets/toast-ui/toast';

const ModalEfetuarPagamento = ({ isOpen, onClose }) => {
  const [dataPagamento, setDataPagamento] = useState('');
  const [dataCredito, setDataCredito] = useState('');
  const [dataArqRetorno, setDataArqRetorno] = useState('');

  const handleFechar = () => {
    onClose();
  };

  const handleGravar = () => {
    onClose();
    toastMessage("Pagamento efetuado com sucesso!", "success");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-money-bill-transfer"></i>
            <h2 className={styles.modalTitle}>Efetuar Pagamento</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Data de Pagamento"
              type="date"
              value={dataPagamento}
              onChange={(e) => setDataPagamento(e.target.value)}
              width={100}
            />
            
            <UseInputPadrao
              label="Data de Crédito"
              type="date"
              value={dataCredito}
              onChange={(e) => setDataCredito(e.target.value)}
              width={100}
            />
            
            <UseInputPadrao
              label="Data de Arq. Retorno"
              type="date"
              value={dataArqRetorno}
              onChange={(e) => setDataArqRetorno(e.target.value)}
              width={100}
            />
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.modalButtonGravar} onClick={handleGravar}>
            <i className="fa-solid fa-save"></i>
            Gravar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEfetuarPagamento; 