import React, { useState } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import toastMessage from '../../../../../../../../assets/toast-ui/toast';

const ModalMotivoFechamento = ({ isOpen, onClose }) => {
  const [motivoFechamento, setMotivoFechamento] = useState('');

  const handleFechar = () => {
    onClose();
  };

  const handleGravar = () => {
    onClose();
    toastMessage("Fechamento efetuado com sucesso", "success");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-key"></i>
            <h2 className={styles.modalTitle}>Motivo do Fechamento</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Motivo do Fechamento"
              type="textarea"
              value={motivoFechamento}
              onChange={(e) => setMotivoFechamento(e.target.value)}
              width={100}
              placeholder="Motivo do Fechamento"
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

export default ModalMotivoFechamento; 