import styles from '../../ModalPasswordRecovery/styles.module.css';
import { carregarLinks } from "../../../db/carregarGeral.jsx";
import { devBaseInf, prodBaseInf, baseInf} from "../../../utils/json.js";
import { useState } from "react";
import toastMessage from '../../../assets/toast-ui/toast.js';

 function ModalAlterarSenha ({closeModal}) {
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [informativo, setInformativo] = useState(false);

    const recuperarSenha = async (e) => {
        e.preventDefault();
    
        if(!email){
            toastMessage("Por favor, insira seu email!", "warning");
            return;
        }
        if(!cpf){
            toastMessage("Por favor, insira seu CPF!", "warning");
        }
        let resp;
        //let resp = carregarGeral("http://localhost:8080/sge/gravarEsqueciSenha.jsp", {usuario: String(email).toLocaleUpperCase(), cd_empresa: 'DRHOJE'},true);
        try{
            resp = carregarLinks('recuperarSenha', (baseInf.appMode === "dev" ? devBaseInf.baselink : prodBaseInf.baselink) + baseInf.endpoints.gravarEsqueciSenha, {usuario: cpf, email: String(email).toLocaleUpperCase(), cd_empresa: (baseInf.appMode === "dev" ? devBaseInf.cd_empresa : prodBaseInf.cd_empresa)});
            
            toastMessage("Email enviado com sucesso!", "success");
            setInformativo(true);
            closeModal();
            
        }catch(error){
            toastMessage("Erro ao Recuperar", "error");
            setInformativo(false);
            closeModal();
            
        }
    }
    
    return (
        <>
            {informativo ? (
                <div className={styles.modalPasswordRecoveryContainer}>
                    <div className={styles.modalPasswordRecovery}>
                        <div className={styles.modalPasswordHeader}>
                            <h1 className={styles.modalPasswordTitle}>Recuperação de Senha</h1>
                            <button className={styles.modalCloseButton} onClick={closeModal}>
                                <i className='fas fa-xmark'></i>
                            </button>
                        </div>
                        <p className={styles.modalPasswordInformative}>
                            Enviamos um e-mail com uma nova senha. <br />
                            Após fazer o login, você poderá cadastrar uma nova senha em Minha Conta.
                        </p>
                        <div className={styles.modalPasswordButtonField}>
                            <button type="button" className={styles.modalPasswordButton} onClick={closeModal}>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.modalPasswordRecoveryContainer}>
                    <div className={styles.modalPasswordRecovery}>
                        <div className={styles.modalPasswordHeader}>
                            <h1 className={styles.modalPasswordTitle}>Recuperação de Senha</h1>
                            <button className={styles.modalCloseButton} onClick={closeModal}>
                                <i className='fas fa-xmark'></i>
                            </button>
                        </div>
                        <p className={styles.modalPasswordDescription}>
                            Digite o seu CPF e e-mail cadastrado para recuperar sua senha.
                        </p>
                        <form className={styles.modalPasswordForm} onSubmit={recuperarSenha}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel} htmlFor='cpf' style={{ fontSize: "0.8rem" }}>
                                    CPF cadastrado:
                                </label>
                                <div className={styles.inputGroupField}>
                                    <input
                                        className={styles.textInput}
                                        id='cpf'
                                        onChange={(e) => setCpf(e.target.value)}
                                    />
                                    <i className="fas fa-user"/>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel} htmlFor='email' style={{ fontSize: "0.8rem" }}>
                                    E-mail cadastrado:
                                </label>
                                <div className={styles.inputGroupField}>
                                    <input
                                        className={styles.textInput}
                                        id='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <i className="fas fa-envelope"/>
                                </div>
                            </div>
                            <div className={styles.modalPasswordButtonField}>
                                <button type="submit" className={styles.modalPasswordButton}>
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
};

export default ModalAlterarSenha;