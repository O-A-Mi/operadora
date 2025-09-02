import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';

function ModalFormulario({ closeModal, onCloseOrConfirm }) {

    const [Pesquisar, setPesquisar, PesquisarRef] = UseInputMask();

    return (
        <>
            <div className={styles.modalOverlay} onClick={closeModal}></div>
                <main className={styles.DivContainer}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h1 className={styles.modalTitle}><i className="fa-solid fa-file"></i>Formulários</h1>
                            <button className={styles.modalCloseButton} onClick={onCloseOrConfirm}>
                                <i className='fas fa-xmark'></i>
                            </button>
                        </div>

                        <section>
                                <div className={styles.divInputs}>
                                    <UseInputPadrao
                                        type="select"
                                        identifier="tipo-cliente-signin"
                                        value={Pesquisar}
                                        onChange={setPesquisar}
                                        inputRef={PesquisarRef}
                                        label="Pesquisar:" />
                                </div>
                        </section>


                        <section className={styles.InputGroupContainer}>
                            <div className={styles.inputGroup}>
                               <button className={styles.botaoPesquisar}><i class="fa-solid fa-magnifying-glass"></i>Pesquisar</button>
                               <button className={styles.botaoImprimir}><i className="fa-solid fa-print"></i> Imprimir</button>
                            </div>
                        </section>
                    </div>
                </main>   
        </>
    )
};

export default ModalFormulario;
