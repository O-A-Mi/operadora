import {  useAtomValue } from 'jotai';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import toastMessage from '../../../../../assets/toast-ui/toast.js';
import { carregarLinks, carregarInfos } from '../../../../../db/carregarGeral.jsx';
import dialogMessage from '../../../../../assets/dialog-ui/dialog.jsx';
import { devBaseInf, prodBaseInf, baseInf, user } from '../../../../../utils/json.js';
import { userInfoAtom} from '../../../../../context/jotai.jsx';
import { UseInputPadrao, UseInputMask,InputField, InputPadrao  } from '../../../../../components/InputPadrao/index.jsx';

export default function ModalValidacao({
  closeModal,
  isOpen,
  token,
  setAtualizarDados
}) {

    const userInfo = useAtomValue(userInfoAtom);

    useEffect(() => {
      window.respAtendimento = respAtendimento;
    }, []);
    const finalizarAtendimento = async () => {
      //console.log('aaaa');
      //console.log( baseInf.appMode)
      //console.log( devBaseInf.cd_empresa)
      //console.log( prodBaseInf.cd_empresa)
      carregarLinks('finalizaAtendimento', (baseInf.appMode == "dev" ? devBaseInf.baselink : prodBaseInf.baselink) + baseInf.endpoints.finalizaAtendimento, { token: token, login: userInfo.login, cd_empresa: (baseInf.appMode == "dev" ? devBaseInf.cd_empresa : prodBaseInf.cd_empresa) },'respAtendimento');
      setAtualizarDados(prev => !prev)
    }


    const respAtendimento = async (data) => {
    const toastIdentifier = `save-${Date.now()}`;
    try {
      toastMessage("gravando Atendimento...", "loading", {
        timeOut: Infinity,
        position: "top-center",
        closeButton: false,
        loading: { id: toastIdentifier, complete: false },
      });

      toastMessage("", "", {
        loading: { id: toastIdentifier, complete: true },
        timeOut: 0,
      })
      
      dialogMessage("Atendimento finalizado com sucesso!", "success", { confirmButton: false });
    } catch (error) {
      toastMessage(error, "error");
    } finally {
      closeModal();
    }
  }
    
  if(!isOpen) return
  return (
    <>
       <div className={styles.modalValidacaoContainer}>
                   <div className={styles.modalValidacao}>
                       <div className={styles.modalValidacaoHeader}>
                           <h2 className={styles.modalValidacaoTitle}>Finalizar Atendimento</h2>
                           <button className={styles.backButton} onClick={closeModal}>
                               <i className="fa-solid fa-xmark"></i>
                           </button>
                       </div>
                       <div className={styles.modalValidacaoContent}>
                           <div className={styles.modalValidacaoLista}>
                            <span className={styles.modalValidacaoListaTitle}>Deseja confirmar a finalização do atendimento?</span>
                           </div>
                       </div>
                        <div className={styles.modalValidacaoFooter}>
                            <button className={styles.agendarSubmit} onClick={finalizarAtendimento}>Sim</button>
                            <button className={styles.agendarSubmit} onClick={closeModal}>Não</button>
                        </div>
                   </div>
               </div>
    </>
  );
}


