import React from 'react';
import styles from './styles.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UsuarioContext, useLoader, useModal } from '../../../context';
import { useLocation, useNavigate } from "react-router";
import { jsonRoute } from '../../../utils/json';
import { ModalText, ModalPasswordRecovery } from '../../../components'
import LoginForm from './components/LoginForm';
import toastMessage from '../../../assets/toast-ui/toast';
import { link } from '../../../mocks/links';

export default function LoginRepresentante () {
    const { openModal, closeModal, isModalOpen, modalContent } = useModal();
    const { usuarioLogado } = useContext(UsuarioContext);
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        hideLoader();
    }, [location])

    useEffect(() => {
        if(usuarioLogado) {
            navigate(`/${jsonRoute.Representante_Area}`, { replace: true })
        }
    }, [usuarioLogado, navigate])

    const root = document.getElementById("root");

    useEffect(() => {
        hideLoader();
        const formColumn = document.querySelector(`.${styles.formColumn}`);
    
        if (formColumn) {
            if (window.innerHeight < formColumn.offsetHeight) {
                root.style.overflowY = 'auto';
                root.style.overflowX= 'hidden';
            } else {
                root.style.overflowY = 'hidden';
                root.style.overflowX= 'hidden';
            }
        }
    
        root.scrollTo(0, 0);
        
        return () => {
            root.style.overflow = 'auto';
            root.style.overflowX= 'auto';
            root.style.overflowY= 'auto';
            root.scrollTo(0, 0);
        };
    }, []);

    const [email, setEmail] = useState('credenciamento@operadora.com.br');

    const copiarEmail = async (e) => {
        e.preventDefault();

        const copiarTextoFallback = (texto) => {
            const textarea = document.createElement('textarea');
            textarea.value = texto;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);

            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            try {
                const sucesso = document.execCommand('copy');
                document.body.removeChild(textarea);

                if (sucesso) {
                    toastMessage('E-mail copiado!', 'info');
                } else {
                    throw new Error('Falha ao copiar o texto.');
                }
            } catch (err) {
                console.error("Erro ao copiar o e-mail:", err);
                toastMessage('Erro ao copiar o e-mail: ' + err.message, 'error');
            }
        };

        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(email);
                toastMessage('E-mail copiado!', 'info');
            } catch (err) {
                console.error("Erro ao copiar o e-mail:", err);
                toastMessage('Erro ao copiar o e-mail: ' + err.message, 'error');
            }
        } else {
            copiarTextoFallback(email);
        }
    };

    return (
        <div className={styles.loginRepresentanteContainer}>
            <div className={styles.loginRepresentanteContent}>
                <div className={styles.formColumn}>
                    <LoginForm openModal={openModal} showLoader={showLoader} hideLoader={hideLoader}/>
                </div>
                <object className={styles.floatingBox} />
            </div>
            
            {isModalOpen("modalPasswordRecovery") && (
                <ModalPasswordRecovery
                    closeModal={() => closeModal("modalPasswordRecovery")}
                />
            )}
            {isModalOpen("modalTexto") && (
                <ModalText
                    closeModal={() => closeModal("modalTexto")}
                    title={modalContent.titulo}
                    text={modalContent.texto}
                />
            )}
        </div>
    )
};