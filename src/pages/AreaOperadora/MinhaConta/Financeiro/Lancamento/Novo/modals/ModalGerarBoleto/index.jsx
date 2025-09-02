import React from 'react';
import styles from './styles.module.css';

const ModalGerarBoleto = ({ isOpen, onClose }) => {
  const handleFechar = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-receipt"></i>
            <h2 className={styles.modalTitle}>Gerar Boleto</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
    
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default ModalGerarBoleto; 