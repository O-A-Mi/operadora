import styles from './styles.module.css';
import { carregarLinks } from "../../../../../../../db/carregarGeral.jsx";
import { devBaseInf, prodBaseInf, baseInf } from "../../../../../../../utils/json.js";
import { useState } from "react";
import toastMessage from '../../../../../../../assets/toast-ui/toast.js';

function Gravar({ closeModal, onCloseOrConfirm }) {
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [informativo, setInformativo] = useState(false);

    const recuperarSenha = async (e) => {
        e.preventDefault();

        if (!email) {
            toastMessage("Por favor, insira seu email!", "warning");
            return;
        }
        if (!cpf) {
            toastMessage("Por favor, insira seu CPF!", "warning");
        }
        let resp;

        try {
            resp = carregarLinks('recuperarSenha', (baseInf.appMode === "dev" ? devBaseInf.baselink : prodBaseInf.baselink) + baseInf.endpoints.gravarEsqueciSenha, { usuario: cpf, email: String(email).toLocaleUpperCase(), cd_empresa: (baseInf.appMode === "dev" ? devBaseInf.cd_empresa : prodBaseInf.cd_empresa) });

            toastMessage("Email enviado com sucesso!", "success");
            setInformativo(true);
            closeModal();

        } catch (error) {
            toastMessage("Erro ao Recuperar", "error");
            setInformativo(false);
            closeModal();

        }
    }

    return (
        <>
            <div className={styles.modalOverlay} onClick={closeModal}></div>
            {informativo ? (
                <div className={styles.modalPasswordRecoveryContainer}>
                    <div className={styles.modalPasswordRecovery}>
                        <div className={styles.modalPasswordHeader}>
                            <h1 className={styles.modalPasswordTitle}>Tem certeza que deseja gravar este registro?</h1>
                            <button className={styles.modalCloseButton} onClick={onCloseOrConfirm}>
                                <i className='fas fa-xmark'></i>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.modalPasswordRecoveryContainer}>
                    <div className={styles.modalPasswordRecovery}>
                        <div className={styles.modalPasswordHeader}>
                            <h1 className={styles.modalPasswordTitle}>Tem certeza que deseja gravar este registro?</h1>
                            <button className={styles.modalCloseButton} onClick={onCloseOrConfirm}>
                                <i className='fas fa-xmark'></i>
                            </button>
                        </div>

                        <form className={styles.modalPasswordForm}>
                            <div className={styles.inputGroup}>
                                <div className={styles.inputGroupField}>
                                    <button className={styles.botaoSim} type="button" onClick={onCloseOrConfirm}>Sim</button>
                                    <button className={styles.botaoNao} type="button" onClick={onCloseOrConfirm}>Não</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
};

export default Gravar;
