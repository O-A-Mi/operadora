/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import styles from "../styles.module.css";
import toastMessage from "../../../../../assets/toast-ui/toast";
import { carregarLinks } from "../../../../../db/carregarGeral.jsx";
import { UseInputMask, UseInputPadrao } from '../../../../../components/InputPadrao/index.jsx';
import PropTypes from "prop-types";
import { getBaseConfig } from "../../../../../utils/utilsConfig";
import { useAtom } from "jotai";
import { loginAtom, idAtom} from "../../../../../context/jotai.jsx";
import { useState } from 'react';
import dialogMessage from "../../../../../assets/dialog-ui/dialog";
import { validarTelefone, validarCelular, validarEmail, validarCampos } from "../../../../../utils/functions.js";

export default function ModalInfo({ onClose, isOpen, initialData, setFuncs, setAtualizarDados }) {
  if(!isOpen) return null;
  
  const [nome, handleNomeChange, nomeRef] = UseInputMask(null, "text", initialData.nome);
  const [crm, handleCrmChange, crmRef] = UseInputMask(null, "text", initialData.crm);
  const [especialidade, handleEspecialidadeChange, especialidadeRef] = UseInputMask(null, "text", initialData.especialidade);
  const [email, handleEmailChange, emailRef] = UseInputMask(null, "text", initialData.email);
  const [telefone, handleTelefoneChange, telefoneRef] = UseInputMask("(99) 9999-9999", "number", initialData.telefone);
  const [celular, handleCelularChange, CelularRef] = UseInputMask("(99) 99999-9999", "number", initialData.celular);
  const toastIdentifier = `save-${Date.now()}`;
  const [isLoading, setIsLoading] = useState(false);

  const { baselink, companyId, endpoints } = getBaseConfig();
  const [idUsuario] = useAtom(loginAtom);
  const [idEstab] = useAtom(idAtom);

  const arrayCamposObrigatorios = [
    { valor: nome, nome: "Nome", validacao: null },
    { valor: crm, nome: "CRM", validacao: null },
    { valor: especialidade, nome: "Especialidade", validacao: null },
    { valor: email, nome: "E-mail", validacao: validarEmail },
    { valor: celular, nome: "Celular", validacao: validarCelular }
  ];
  
  const gravarAlteracao = () => {
    if(!validarCampos(arrayCamposObrigatorios)) return
    window.alteraInfoRepresentante = alteraInfoRepresentante
    try {
      toastMessage("Salvando alterações...", "loading", {
        timeOut: Infinity,
        closeButton: false,
        loading: { id: toastIdentifier, complete: false },
      });
      setIsLoading(true);

      const params = {
        token: idEstab,
        nome: nome,
        crm: crm,
        especialidade: especialidade,
        email: email,
        telefone: telefone,
        celular: celular,
        id_usuario: idUsuario,
        cd_empresa: companyId 
      };
     carregarLinks(
      'alteraInfoRepresentante',
      `${baselink}${endpoints.alteraInfoRepresentante}`,
      params, 'alteraInfoRepresentante');
      
    } catch (error) {
      dialogMessage(error.message, "error");
    } finally {
      setFuncs.setNome(nome);
      setFuncs.setCrm(crm);
      setFuncs.setEspecialidade(especialidade);
      setFuncs.setEmail(email);
      setFuncs.setTelefone(telefone);
      setFuncs.setCelular(celular);
      onClose();
    }
    return () => delete window.alteraInfoRepresentante
  };

  const alteraInfoRepresentante = (dados) => {
    const resp = JSON.parse(dados)
    toastMessage("", "", { loading: { id: toastIdentifier, complete: true }, timeOut: 0});
    if(resp.status === 200){
      toastMessage("Alterações salvas com sucesso!", "success", {
        loading: { id: toastIdentifier, complete: true },
      });
      setAtualizarDados(prev => !prev);
      onClose();
    }
    else{
      toastMessage(resp.mensagem, "error", {
        loading: { id: toastIdentifier, complete: true },
      });
    } 
    setIsLoading(false);
  }

  function checkValidaEmail() {
    if(email.length > 0){
      if(!validarEmail(email)){
        handleEmailChange({ target: { value: '' } });
        toastMessage("E-mail inválido.", "warning");
      }
    }
  }

  function checkValidaTelefone() {
    if(telefone.length > 0){
      if(!validarTelefone(telefone)){
        handleTelefoneChange({ target: { value: '' } });
        toastMessage("Telefone inválido.", "warning");
      }
    }
  }

  function checkValidaCelular() {
    if(celular.length > 0){
      if(!validarCelular(celular)){
        handleCelularChange({ target: { value: '' } });
        toastMessage("Celular inválido.", "warning");
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <h2 className={styles.modalTitle}>Informações Profissionais</h2>
          </div>
          <button className={styles.backButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.modalForm}>
            <UseInputPadrao label="Nome Completo" required identifier="nome" onChange={handleNomeChange} value={nome} inputRef={nomeRef}/>

            <UseInputPadrao label="CRM" required identifier="crm" value={crm} onChange={handleCrmChange} inputRef={crmRef}/>

            <UseInputPadrao label="Especialidade" required identifier="especialidade" value={especialidade} onChange={handleEspecialidadeChange} inputRef={especialidadeRef}/>

            <UseInputPadrao label="E-mail" required identifier="email" type="email" value={email} onBlur={checkValidaEmail} onChange={handleEmailChange} inputRef={emailRef} /> 

            <UseInputPadrao label="Telefone" identifier="telefone" type="tel" value={telefone} onChange={handleTelefoneChange} onBlur={checkValidaTelefone} inputRef={telefoneRef} placeholder="(00) 0000-0000" />

            <UseInputPadrao label="Celular" required identifier="celular" type="tel" value={celular} onChange={handleCelularChange} onBlur={checkValidaCelular} inputRef={CelularRef} placeholder="(00) 00000-0000" />
          </form>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.confirmButton} onClick={gravarAlteracao}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Salvar Alterações
                </>
              )}
          </button>
        </div>
      </div>
    </div>
  );
}

ModalInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  initialData: PropTypes.shape({
    nome: PropTypes.string,
    crm: PropTypes.string,
    especialidade: PropTypes.string,
    email: PropTypes.string,
    telefone: PropTypes.string,
    celular: PropTypes.string,
  }).isRequired,
  setFuncs: PropTypes.shape({
    setNome: PropTypes.func,
    setCrm: PropTypes.func,
    setEspecialidade: PropTypes.func,
    setEmail: PropTypes.func,
    setTelefone: PropTypes.func,
    setCelular: PropTypes.func,
  }).isRequired,
  setAtualizarDados: PropTypes.func.isRequired,
}; 