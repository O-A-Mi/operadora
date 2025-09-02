import React, { useState } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao } from '../../../../../../../components/InputPadrao';
import TogglePadrao from '../../../../../../../components/TogglePadrao';
import toastMessage from '../../../../../../../assets/toast-ui/toast';

const ModalRegerarComissao = ({ isOpen, onClose }) => {
  const [dataPagamentoInicio, setDataPagamentoInicio] = useState('');
  const [dataPagamentoFim, setDataPagamentoFim] = useState('');
  const [deletarComissoes, setDeletarComissoes] = useState(false);
  const [dataComissaoInicio, setDataComissaoInicio] = useState('');
  const [dataComissaoFim, setDataComissaoFim] = useState('');

  const handleFechar = () => {
    onClose();
  };

  const handleRegerar = () => {
    onClose();
    toastMessage("Execução efetuada com sucesso", "success");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-arrows-rotate"></i>
            <h2 className={styles.modalTitle}>Regerar Comissão</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <UseInputPadrao
              label="Data Pagamento do Cliente - Inicio"
              type="date"
              value={dataPagamentoInicio}
              onChange={(e) => setDataPagamentoInicio(e.target.value)}
              width={100}
            />
            
            <UseInputPadrao
              label="Data Pagamento do Cliente - Fim"
              type="date"
              value={dataPagamentoFim}
              onChange={(e) => setDataPagamentoFim(e.target.value)}
              width={100}
            />
            
            <div className={styles.toggleContainer}>
              <TogglePadrao
                label="Deletar as comissões criadas"
                checked={deletarComissoes}
                onChange={(checked) => setDeletarComissoes(checked)}
                option1="Não"
                option2="Sim"
              />
            </div>
            
            {deletarComissoes && (
              <>
                <UseInputPadrao
                  label="Data Comissão do Representante - Inicio"
                  type="date"
                  value={dataComissaoInicio}
                  onChange={(e) => setDataComissaoInicio(e.target.value)}
                  width={100}
                />
                
                <UseInputPadrao
                  label="Data Comissão do Representante - Fim"
                  type="date"
                  value={dataComissaoFim}
                  onChange={(e) => setDataComissaoFim(e.target.value)}
                  width={100}
                />
              </>
            )}
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.modalButtonRegerar} onClick={handleRegerar}>
            <i className="fa-solid fa-arrows-rotate"></i>
            Regerar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRegerarComissao; 