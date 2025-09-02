/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import styles from "../styles.module.css";
import { getBaseConfig } from "../../../../../utils/utilsConfig";
import toastMessage from "../../../../../assets/toast-ui/toast";
import dialogMessage from "../../../../../assets/dialog-ui/dialog";
import { carregarLinks } from "../../../../../db/carregarGeral.jsx";
import { useAtom } from "jotai";
import { idAtom, loginAtom } from "../../../../../context/jotai";
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao";

import { validarCampos } from "../../../../../utils/functions.js";

export default function ModalSecurityRepresentante({ onClose, isOpen }) {
  const toastIdentifier = `save-${Date.now()}`;
  if(!isOpen){
    return null;
  }
  const { baselink, companyId, endpoints } = getBaseConfig();
  const [token] = useAtom(idAtom)
  const [idUsuario] = useAtom(loginAtom)
  const [senhaAtual, handleSenhaAtualChange, senhaAtualRef] = UseInputMask();
  const [senhaNova, handleSenhaNovaChange, senhaNovaRef] = UseInputMask();
  const [senhaConfirmacao, handleSenhaConfirmacaoChange, senhaConfirmacaoRef] = UseInputMask();
  
  const arrayCamposObrigatorios = [
    { valor: senhaAtual, nome: "Senha Atual" },
    { valor: senhaNova, nome: "Senha Nova" },
    { valor: senhaConfirmacao, nome: "Confirmar a nova senha" }
  ];

  const gravarAlteracao = async () => {
    if(!validarCampos(arrayCamposObrigatorios)) return
    if(senhaNova !== senhaConfirmacao){
      dialogMessage("As senhas não coincidem!", "error", {confirmButton: false});
      return false;
    }
    if(senhaAtual === senhaNova){
      dialogMessage("A senha nova não pode ser igual à atual", "error", {confirmButton: false});
      return false;
    }

    window.alterarSenhaRepresentante = alterarSenhaRepresentante
    try {
      const params = {
        senha_atual: senhaAtual,
        senha_nova: senhaNova,
        token: token,
        idusuario: idUsuario,
        cd_empresa: companyId
      };

      carregarLinks('alterarSenhaRepresentante', `${baselink}${endpoints.alterarSenhaRepresentante}`, params, 'alterarSenhaRepresentante');
    } catch (error) {
      toastMessage(error.message || "Erro ao alterar a senha", "error");
    } finally {
      onClose();
    }
    return () => delete window.alterarSenhaRepresentante
  };

  function alterarSenhaRepresentante(dados){
    let resp = JSON.parse(dados);
    if(resp.status === 200){
      dialogMessage(resp.mensagem, "success", {
        loading: { id: toastIdentifier, complete: true },
        confirmButton: false,
      });
    } else {
      dialogMessage(resp.mensagem, "error", {
        loading: { id: toastIdentifier, complete: true },
        confirmButton: false,
      });
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <h2 className={styles.modalTitle}>Segurança</h2>
          </div>
          <button className={styles.backButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.modalForm}>
            <UseInputPadrao type="password" required label="Senha Atual" identifier="senha-atual" value={senhaAtual} onChange={handleSenhaAtualChange} inputRef={senhaAtualRef} icon={false} />
            <UseInputPadrao type="password" required label="Senha Nova" identifier="senha-nova" value={senhaNova} onChange={handleSenhaNovaChange} inputRef={senhaNovaRef} icon={false} />
            <UseInputPadrao type="password" required label="Confirmar a nova senha" identifier="senha-confirmacao" value={senhaConfirmacao} onChange={handleSenhaConfirmacaoChange} inputRef={senhaConfirmacaoRef} icon={false} />
          </form>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.confirmButton} onClick={gravarAlteracao}>
            <i className="fas fa-save"></i>
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
} 