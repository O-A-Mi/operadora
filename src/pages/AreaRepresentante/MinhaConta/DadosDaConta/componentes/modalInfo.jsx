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
  if(!isOpen) return
  
  const [nome_fantasia, handleNomeFantasiaChange, nomeFantasiaRef] = UseInputMask(null, "text", initialData.nome_fantasia);
  const [razao_social, handleRazaoSocialChange, razao_socialRef] =  UseInputMask(null, "text", initialData.razao_social);
  const [cnpj, handleCnpjChange, cnpjRef] =  UseInputMask("99.999.999/9999-99", "number" ,initialData.cnpj );
  const [tipo, handleTipoChange, tipoRef] = UseInputMask( null, "text", initialData.tipo);
  const [email, handleEmailChange, emailRef] =  UseInputMask(null , "text" , initialData.email);
  const [telefone, handleTelefoneChange, telefoneRef] =  UseInputMask("(99) 9999-9999", "number", initialData.telefone);
  const [celular, handleCelularChange, CelularRef] =  UseInputMask("(99) 99999-9999", "number", initialData.celular);
  const toastIdentifier = `save-${Date.now()}`;
  const [isLoading, setIsLoading] = useState(false);

  const { baselink, companyId, endpoints } = getBaseConfig();
  const [idUsuario] = useAtom(loginAtom);
  const [idEstab] = useAtom(idAtom);

  // Array para validar todos os campos
  const arrayCamposObrigatorios = [
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
        token : idEstab,
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
  
  // Componente auxiliar para inputs do formulário
  function FormInput({ label, required, children, width, gap, identifier }) {
    return (
      <div
        className={styles.inputGroup}
        style={{ maxWidth: `calc(${width}% - ${gap ? gap : 0.5}rem)` }}
      >
        <label className={styles.inputLabel} htmlFor={identifier}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
        {children}
      </div>
    );
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

  FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    children: PropTypes.node.isRequired,
    width: PropTypes.number,
    gap: PropTypes.string,
    identifier: PropTypes.string.isRequired,
  };

  // Valores padrão opcionais
  FormInput.defaultProps = {
    required: false,
    width: 100,
    gap: "0.5rem",
  };

  const InputStyle = {
    height: 'auto',
    appearance: 'none',
    border: 'none',
    padding: '0.25rem',
    fontSize: '0.85rem',
    lineHeight: 'unset',
    background: 'transparent',
    color: 'var(--cinza-escuro)',
    transition: 'border 0.2s ease-in-out',
    cursor: 'default'
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Informações da clínica</h2>
          <button className={styles.backButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.modalForm}>
            <UseInputPadrao label="Nome Fantasia" required identifier="nomeFantasia"  onChange={handleNomeFantasiaChange} value={nome_fantasia} readOnly  disabled  inputRef={nomeFantasiaRef} inputStyle={InputStyle}/>

            <UseInputPadrao label="Razão Social" required identifier="razaoSocial" value={razao_social} onChange={handleRazaoSocialChange} readOnly  disabled inputRef={razao_socialRef} inputStyle={InputStyle}/>

            <UseInputPadrao label="CNPJ" required identifier="cnpj" value={cnpj} onChange={handleCnpjChange}  inputRef={cnpjRef} readOnly  disabled inputStyle={InputStyle}/>

            <UseInputPadrao label="Tipo" required identifier="tipo"  value={tipo} onChange={handleTipoChange} inputRef={tipoRef} readOnly  disabled inputStyle={InputStyle}/>

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
                "Salvar Alterações"
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
    nomeFantasia: PropTypes.string,
    razaoSocial: PropTypes.string,
    cnpj: PropTypes.string,
    tipo: PropTypes.string,
    email: PropTypes.string,
    telefone: PropTypes.string,
    celular: PropTypes.string,
    id_representante: PropTypes.string,
    login: PropTypes.string,
  }).isRequired,
  setFuncs: PropTypes.shape({
    setNomeFantasia: PropTypes.func,
    setRazaoSocial: PropTypes.func,
    setCnpj: PropTypes.func,
    setTipo: PropTypes.func,
    setEmail: PropTypes.func,
    setTelefone: PropTypes.func,
    setCelular: PropTypes.func,
  }).isRequired,
};
