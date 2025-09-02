import styles from '../../ModalPasswordRecovery/styles.module.css';
import StatusControl from '../../StatusControl';

export default function ModalAlterarStatus({ closeModal }) {
  return (
    <div className={styles.modalPasswordRecoveryContainer}>
      <div className={styles.modalPasswordRecovery}>
        <div className={styles.modalPasswordHeader}>
          <h1 className={styles.modalPasswordTitle}>Alterar status</h1>
          <button className={styles.modalCloseButton} onClick={closeModal}>
            <i className='fas fa-xmark'></i>
          </button>
        </div>
        <StatusControl compact variant="select" onStatusChange={closeModal} />
      </div>
    </div>
  );
}


