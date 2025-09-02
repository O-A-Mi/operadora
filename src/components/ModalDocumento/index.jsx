import styles from './styles.module.css';

const ModalDocumento = ({src, titulo, closeModal}) => {
  return (
    <div className={`${styles.modalContainer} ${styles.show}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>{titulo ? titulo : 'Visualizar documento'}</h4>
          <div className={styles.modalCloseButton}>
            <a onClick={() => closeModal()}><i className="fas fa-times"></i></a>
          </div>
        </div>
        <iframe className={styles.modalIframe} src={src}></iframe>
      </div>
    </div>
  )
};

export default ModalDocumento