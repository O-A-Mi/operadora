import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../../../../../components/InputPadrao';

const ModalCriarDetalhamento = ({ isOpen, onClose, beneficiarios, beneficiarioSelecionado, onCriar }) => {
  const [beneficiario, setBeneficiario] = useState('');
  const [modo, setModo] = useState('');
  const [valor, setValor] = useState('');

  const modos = [
    { value: 'Mensalidade', label: 'Mensalidade' },
    { value: 'Pró-rata', label: 'Pró-rata' },
    { value: 'Anual', label: 'Anual' },
    { value: 'Idade', label: 'Idade' },
    { value: 'Retroativo Pró-rata', label: 'Retroativo Pró-rata' },
    { value: 'Retroativo Anual', label: 'Retroativo Anual' },
    { value: 'Retroativo Idade', label: 'Retroativo Idade' }
  ];

  useEffect(() => {
    if (beneficiarioSelecionado) {
      setBeneficiario(beneficiarioSelecionado);
    }
    setModo('Mensalidade');
    setValor('0,00');
  }, [beneficiarioSelecionado]);

  const handleBeneficiarioChange = (e) => {
    setBeneficiario(e.target.value);
  };

  const handleModoChange = (e) => {
    setModo(e.target.value);
  };

  const handleValorChange = (e) => {
    setValor(e.target.value);
  };

  const handleCriar = () => {
    if (!beneficiario || !modo || !valor) {
      return;
    }

    const dados = {
      beneficiario,
      modo,
      valor: parseFloat(valor.replace(',', '.'))
    };

    onCriar(dados);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <h2 className={styles.modalTitle}>Criar Detalhamento</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Beneficiário"
              identifier="beneficiario"
              type="select"
              value={beneficiario}
              onChange={handleBeneficiarioChange}
              options={beneficiarios.map(ben => ({ value: ben, label: ben }))}
              width={100}
              gap={0}
              icon="fa-solid fa-user"
            />
            
            <UseInputPadrao
              label="Modo"
              identifier="modo"
              type="select"
              value={modo}
              onChange={handleModoChange}
              options={modos}
              width={100}
              gap={0}
              icon="fa-solid fa-cog"
            />
            
            <UseInputPadrao
              label="Valor"
              identifier="valor"
              type="number"
              value={valor}
              onChange={handleValorChange}
              width={100}
              gap={0}
              icon="fa-solid fa-dollar-sign"
              step="0.01"
              min="0"
            />
          </div>
          
          <div className={styles.formActions}>
            <button className={styles.criarButton} onClick={handleCriar}>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              Criar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCriarDetalhamento; 