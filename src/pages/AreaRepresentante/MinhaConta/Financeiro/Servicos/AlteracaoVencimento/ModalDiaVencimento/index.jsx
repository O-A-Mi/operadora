import React, { useState } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../../../components/InputPadrao';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';
import toastMessage from '../../../../../../../assets/toast-ui/toast';

const ModalDiaVencimento = ({ isOpen, onClose }) => {
  const [diaVencimento, setDiaVencimento] = useState('1');

  const diaVencimentoOptions = [
    { value: '1', label: '1' },
    { value: '5', label: '5' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '13', label: '13' },
    { value: '15', label: '15' },
    { value: '17', label: '17' },
    { value: '20', label: '20' },
    { value: '23', label: '23' },
    { value: '25', label: '25' },
    { value: '30', label: '30' }
  ];

  const handleFechar = () => {
    onClose();
  };

  const handleGravar = () => {
    dialogMessage(
      "Tem certeza que deseja Efetuar a Alteração de Vencimento este registro?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },
      (result) => {
        if (result) {
          onClose();
          toastMessage("Alteração efetuada com sucesso", "success");
        }
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-info-circle"></i>
            <h2 className={styles.modalTitle}>Dia de Vencimento</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Dia de Vencimento"
              type="select"
              value={diaVencimento}
              onChange={(e) => setDiaVencimento(e.target.value)}
              options={diaVencimentoOptions}
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

export default ModalDiaVencimento; 