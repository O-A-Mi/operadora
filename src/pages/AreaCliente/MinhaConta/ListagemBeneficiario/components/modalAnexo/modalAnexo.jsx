import styles from './styles.module.css';
import { useState } from "react"
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';

function ModalAnexo({ closeModal, onCloseOrConfirm }) {
    const [informativo, setInformativo] = useState(false);
    const [Pesquisar, setPesquisar, PesquisarRef] = UseInputMask();


    return (
        <>
            <div className={styles.modalOverlay} onClick={closeModal}></div>
            <main className={styles.DivContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalTitle}><i className="fa-solid fa-paperclip"></i>Anexo</h1>
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
                            <button className={styles.botaoArquivo}><i className="fa-solid fa-folder"></i>Selecionar Arquivos</button>
                            <button className={styles.botaoUpload}><i className="fa-solid fa-upload"></i>Iniciar Upload</button>
                        </div>
                    </section>
                </div>
            </main>

        </>
    )
};

export default ModalAnexo;
