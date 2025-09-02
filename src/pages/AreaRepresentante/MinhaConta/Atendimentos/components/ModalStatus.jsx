import styles from '../styles.module.css'

const ModalStatus = ({isOpen, closeModal, data}) => {
    if(!isOpen) return

    const statusLista = [
        {
            status: "Confirmado",
            atualizado: "Atualizado",
            data: "17/06/2024",
            hora: "12:00"
        },
        {
            status: "Finalizado",
            atualizado: "Atualizado",
            data: "17/06/2024",
            hora: "12:00"
        },
        {
            status: "Pendente",
            atualizado: "Atualizado",
            data: "17/06/2024",
            hora: "12:00"
        },
        {
            status: "Cancelado",
            atualizado: "Atualizado",
            data: "17/06/2024",
            hora: "12:00"
        }
    ]

    return (
        <div className={styles.modalStatusContainer}>
            <div className={styles.modalStatus}>
                <div className={styles.modalStatusHeader}>
                    <h1 className={styles.modalStatusTitle}>Status dos atendimentos</h1>
                    <button className={styles.closeButton} onClick={closeModal}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className={styles.modalStatusContent}>
                    <div className={styles.modalStatusData}>
                        <div className={styles.modalStatusDataValue}>
                            <span className={styles.modalStatusDataLabel}>Número do Pedido: </span>
                            <span className={styles.modalStatusDataValue}>#000000</span> 
                        </div>
                        <div className={styles.modalStatusDataValue}>
                            <span className={styles.modalStatusDataLabel}>Paciente: </span>
                            <span className={styles.modalStatusDataValue}>João das Neves</span> 
                        </div>
                    </div>
                    <div className={styles.modalStatusLista}>
                        {statusLista.map((item, index) => (
                            <div className={styles.modalStatusItem} key={index}>
                                <span className={`${styles.modalStatusItemValue} ${styles.status}`} style={{
                                    '--cor-dinamica': item.status == 'Confirmado' || item.status == 'Finalizado' ? 'var(--green-500)' : item.status == 'Pendente' ? 'var(--orange-400)' : 'var(--red-400)'
                                }}>{item.status}</span>
                                <span className={styles.modalStatusItemValue}>{item.atualizado}</span>
                                <span className={styles.modalStatusItemValue}>{item.data}</span>
                                <span className={styles.modalStatusItemValue}>{item.hora}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalStatus