import React, { useState } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import toastMessage from '../../../../../../../../assets/toast-ui/toast';

const ModalMotivoAbertura = ({ isOpen, onClose }) => {
  const [motivoAbertura, setMotivoAbertura] = useState('');

  const handleFechar = () => {
    onClose();
  };

  const handleGravar = () => {
    onClose();
    toastMessage("Abertura efetuada com sucesso", "success");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-key"></i>
            <h2 className={styles.modalTitle}>Motivo da Abertura</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Motivo da Abertura"
              type="textarea"
              value={motivoAbertura}
              onChange={(e) => setMotivoAbertura(e.target.value)}
              width={100}
              placeholder="Motivo da Abertura"
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

export default ModalMotivoAbertura; 