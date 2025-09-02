import { useState } from 'react';
import styles from './styles.module.css';

function ModalPadrao({ isOpen, onClose, title, actions = [], children, ...prop }){
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAcaoGenerica = async (acao, index) => {
    console.log(typeof acao)
    if (typeof acao !== 'function') return;
    setIsLoading(true)
    setLoadingAction(index);

    try{
      setIsLoading(true);
      await acao();
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao realizar a ação:", error);
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
      >
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.modalBody}
          style={prop.contentOverflowY ? { overflowY: 'scroll' } : {}}
        >
          {children}
        </div>
        <div className={styles.modalFooter}>
          {actions.map((acao, index) => (
            <button
              key={index}
              className={acao.className || styles.dafaultButton }
              onClick={() => handleAcaoGenerica(acao.onClick, index)}
              disabled={isLoading && loadingAction !== index}
            >
              {isLoading && loadingAction === index ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  {acao.icon && <i className={acao.icon}></i> }
                  {acao.text}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalPadrao;