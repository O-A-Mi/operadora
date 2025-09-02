import React, { useState } from 'react';
import styles from './styles.module.css';
import TogglePadrao from '../../../../../../../../components/TogglePadrao';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import toastMessage from '../../../../../../../../assets/toast-ui/toast';

const DuplicarLancamento = ({ isOpen, onClose, onSubmit }) => {
  const [primeiraDataVencimento, setPrimeiraDataVencimento, primeiraDataVencimentoRef] = UseInputMask();
  const [quantidade, setQuantidade, quantidadeRef] = UseInputMask();
  const [liquido, setLiquido, liquidoRef] = UseInputMask('5,00');
  const [geraComNossoNumero, setGeraComNossoNumero] = useState(false);
  const [observacao, setObservacao, observacaoRef] = UseInputMask();

    const handleSubmit = () => {
    onSubmit({
      primeiraDataVencimento,
      quantidade,
      liquido,
      geraComNossoNumero,
      observacao
    });
    
    onSubmit({
      primeiraDataVencimento,
      quantidade,
      liquido,
      geraComNossoNumero,
      observacao
    });
    
    toastMessage("Lançamento duplicado com sucesso", "success");
    onClose();
  };

  const handleCancel = () => {
    setPrimeiraDataVencimento('');
    setQuantidade('');
    setLiquido('5,00');
    setGeraComNossoNumero(false);
    setObservacao('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-copy"></i>
            <h2 className={styles.modalTitle}>Duplicar Lançamento</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Primeira Data Vencimento"
              identifier="primeiraDataVencimento"
              type="date"
              value={primeiraDataVencimento}
              onChange={setPrimeiraDataVencimento}
              inputRef={primeiraDataVencimentoRef}
              width={100}
              gap={0}
            />
            
            <UseInputPadrao
              label="Quantidade"
              identifier="quantidade"
              type="number"
              value={quantidade}
              onChange={setQuantidade}
              inputRef={quantidadeRef}
              width={100}
              gap={0}
            />
            
            <div className={styles.liquidoContainer}>
              <label className={styles.liquidoLabel}>Líquido</label>
              <div className={styles.liquidoInputGroup}>
                <span className={styles.liquidoPrefix}>R$</span>
                <input
                  type="text"
                  className={styles.liquidoInput}
                  value={liquido}
                  onChange={(e) => setLiquido(e.target.value)}
                  placeholder="0,00"
                />
              </div>
            </div>
            
            <div className={styles.toggleContainer}>
              <label className={styles.toggleLabel}>Gera com Nosso Número</label>
              <TogglePadrao
                checked={geraComNossoNumero}
                onChange={setGeraComNossoNumero}
                option1="Sim"
                option2="Não"
                width="100%"
              />
            </div>
            
            <UseInputPadrao
              label="Observação"
              identifier="observacao"
              type="textarea"
              value={observacao}
              onChange={setObservacao}
              inputRef={observacaoRef}
              width={100}
              gap={0}
            />
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.modalButtonConfirmar} onClick={handleSubmit}>
            <i className="fa-solid fa-check"></i>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicarLancamento; 