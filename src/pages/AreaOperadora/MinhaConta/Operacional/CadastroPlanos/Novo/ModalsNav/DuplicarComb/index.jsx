import React, { useState } from 'react';
import styles from './styles.module.css';
import TogglePadrao from '../../../../../../../../components/TogglePadrao';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import toastMessage from '../../../../../../../../assets/toast-ui/toast';

const DuplicarComb = ({ isOpen, onClose, onSubmit }) => {
  const [descricao, setDescricao, descricaoRef] = UseInputMask();
  const [abreviacao, setAbreviacao, abreviacaoRef] = UseInputMask();
  const [duplicaFaixaIdadeTitular, setDuplicaFaixaIdadeTitular] = useState(true);
  const [duplicaFaixaIdadeDependente, setDuplicaFaixaIdadeDependente] = useState(true);
  const [duplicaProdutoServico, setDuplicaProdutoServico] = useState(true);
  const [duplicaVigencia, setDuplicaVigencia] = useState(true);
  const [duplicaComissionamento, setDuplicaComissionamento] = useState(true);
  const [duplicaValorTaxas, setDuplicaValorTaxas] = useState(true);
  const [duplicaCampanha, setDuplicaCampanha] = useState(true);

  const handleSubmit = () => {
    onSubmit({
      descricao,
      abreviacao,
      duplicaFaixaIdadeTitular,
      duplicaFaixaIdadeDependente,
      duplicaProdutoServico,
      duplicaVigencia,
      duplicaComissionamento,
      duplicaValorTaxas,
      duplicaCampanha
    });
    
    toastMessage("Combo duplicado com sucesso", "success");
    onClose();
  };

  const handleCancel = () => {
    setDescricao('');
    setAbreviacao('');
    setDuplicaFaixaIdadeTitular(true);
    setDuplicaFaixaIdadeDependente(true);
    setDuplicaProdutoServico(true);
    setDuplicaVigencia(true);
    setDuplicaComissionamento(true);
    setDuplicaValorTaxas(true);
    setDuplicaCampanha(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-copy"></i>
            <h2 className={styles.modalTitle}>Duplicar Combo</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Descrição*"
              identifier="descricao"
              type="text"
              value={descricao}
              onChange={setDescricao}
              inputRef={descricaoRef}
            />
            
            <UseInputPadrao
              label="Abreviação*"
              identifier="abreviacao"
              type="text"
              value={abreviacao}
              onChange={setAbreviacao}
              inputRef={abreviacaoRef}
            />
            
            <div className={styles.togglesGrid}>
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>Duplica Faixa de Idade do Titular?</label>
                <TogglePadrao
                  checked={duplicaFaixaIdadeTitular}
                  onChange={setDuplicaFaixaIdadeTitular}
                  option1="Sim"
                  option2="Não"
                  width="100%"
                />
              </div>
              
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>Duplica Faixa de Idade do Dependente?</label>
                <TogglePadrao
                  checked={duplicaFaixaIdadeDependente}
                  onChange={setDuplicaFaixaIdadeDependente}
                  option1="Sim"
                  option2="Não"
                  width="100%"
                />
              </div>
              
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>Duplica Produto/Serviço?</label>
                <TogglePadrao
                  checked={duplicaProdutoServico}
                  onChange={setDuplicaProdutoServico}
                  option1="Sim"
                  option2="Não"
                  width="100%"
                />
              </div>
              
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>Duplica Vigência?</label>
                <TogglePadrao
                  checked={duplicaVigencia}
                  onChange={setDuplicaVigencia}
                  option1="Sim"
                  option2="Não"
                  width="100%"
                />
              </div>
              
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>Duplica Comissionamento?</label>
                <TogglePadrao
                  checked={duplicaComissionamento}
                  onChange={setDuplicaComissionamento}
                  option1="Sim"
                  option2="Não"
                  width="100%"
                />
              </div>
              
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>Duplica Valor Taxas?</label>
                <TogglePadrao
                  checked={duplicaValorTaxas}
                  onChange={setDuplicaValorTaxas}
                  option1="Sim"
                  option2="Não"
                  width="100%"
                />
              </div>
              
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>Duplica Campanha?</label>
                <TogglePadrao
                  checked={duplicaCampanha}
                  onChange={setDuplicaCampanha}
                  option1="Sim"
                  option2="Não"
                  width="100%"
                />
              </div>
            </div>
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

export default DuplicarComb;
