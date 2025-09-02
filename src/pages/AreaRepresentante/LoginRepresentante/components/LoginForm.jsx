import React from 'react';
import styles from '../styles.module.css';
import { useEffect, useContext, useCallback } from 'react';
import { UsuarioContext } from '../../../../context';
import { carregarLinks } from '../../../../db/carregarGeral';
import { getBaseConfig } from '../../../../utils/utilsConfig';
import { useAtom } from 'jotai';
import { cpfcnpjAtom, idAtom, tipoUsuarioAtom, nomeAtom, loginAtom, permissoesAtom, permissoesFormatadasAtom } from '../../../../context/jotai';
import { UseInputPadrao, UseInputMask } from '../../../../components/InputPadrao/index.jsx';
import PoliticaDePrivacidade from '../../../../mocks/politicaDePrivacidade';
import TermosDeServico from '../../../../mocks/termosDeServico';
import toastMessage from "../../../../assets/toast-ui/toast";
import dialogMessage from '../../../../assets/dialog-ui/dialog';
import { formatarUsuarioLogin } from '../../../../utils/functions.js';
import { useNavigate } from 'react-router';
import { jsonRoute } from '../../../../utils/json';
import { user } from '../../../../utils/json';

export default function LoginForm({openModal, showLoader, hideLoader}) {
  const { handleLogin } = useContext(UsuarioContext);
  const [, setIdAtomValue] =  useAtom(idAtom);
  const [, setNomeAtomValue] =  useAtom(nomeAtom);
  const [, setLoginAtomValue] = useAtom(loginAtom);
  const [, setCpfCnpjAtomValue] = useAtom(cpfcnpjAtom);
  const [, setTipoUsuarioAtomValue] = useAtom(tipoUsuarioAtom);
  const [, setPermissoesRawAtomValue] = useAtom(permissoesAtom);
  const [, setPermissoesFormatadasAtomValue] = useAtom(permissoesFormatadasAtom);
  
  const { baselink, companyId, endpoints } = getBaseConfig();
  const navigate = useNavigate();

  const [loginSignIn, loginSignInChange, loginSignInRef] = UseInputMask("99.999.999/9999-99", "number");
  const [senhaSignIn, senhaSignInChange, senhaSignInRef] = UseInputMask();

  const processarPermissoesParaMap = (permissoesBrutasArray) => {
    const formatadas = new Map();
    if (permissoesBrutasArray && Array.isArray(permissoesBrutasArray)) {
      permissoesBrutasArray.forEach(permObj => {
        try {
          if (permObj && permObj.ordem !== undefined && permObj.visivel !== undefined) {
            formatadas.set(String(permObj.ordem), permObj.visivel === "T");
          } else {
            toastMessage(`Objeto de permissão inválido ou incompleto: ${permObj}`, 'warning');
          }
        } catch (e) {
          console.error("Erro ao processar objeto de permissão:", permObj, e);
        }
      });
    }

    return Object.fromEntries(formatadas);
  };
  
  const onSignIn = (e) => {
    e.preventDefault();
    if (!loginSignIn.trim() || !senhaSignIn.trim()) {
        dialogMessage("Por favor, preencha o login e a senha.", "warning", { confirmButton: false });
        return;
    }

    showLoader();

    const usuarioInput = formatarUsuarioLogin(String(loginSignIn).toUpperCase());
    const senhaInput = senhaSignIn;

    if (
      (usuarioInput === formatarUsuarioLogin(user.cnpj.toUpperCase()) || usuarioInput === formatarUsuarioLogin(user.cpf)) &&
      senhaInput === user.senha
    ) {
      const permissoesArrayDeObjetos = [
        { ordem: "1", visivel: "T" }, // ROOT
        { ordem: "1.01", visivel: "T" }, // EMPRESA
        { ordem: "1.02", visivel: "T" }, // MOVIMENTACOES
        { ordem: "1.03", visivel: "T" }, // BENEFICIARIOS
        { ordem: "1.04", visivel: "T" }, // CONSULTAS
        { ordem: "1.05", visivel: "T" }, // COMPRAS
        { ordem: "1.06", visivel: "T" }, // USUARIOS
      ];

      const permissoesMapObj = processarPermissoesParaMap(permissoesArrayDeObjetos);

      setLoginAtomValue(user.cnpj);
      setIdAtomValue("token_teste_representante");
      setNomeAtomValue(user.nome || "Representante Teste");
      setCpfCnpjAtomValue(user.cnpj);
      setTipoUsuarioAtomValue('P');
      setPermissoesRawAtomValue(permissoesArrayDeObjetos);
      setPermissoesFormatadasAtomValue(permissoesMapObj);

      toastMessage("Login efetuado com sucesso", "success");
      handleLogin();
      hideLoader();
      navigate(`/${jsonRoute.Representante_Area}`, { replace: true });
    } else {
      hideLoader();
      dialogMessage("Usuário ou senha inválidos.", "error", { confirmButton: false });
    }
  };

  return (
    <form className={styles.loginForm}>
      <div className={styles.loginFormContent}>
        <p className={styles.loginFormTitle}>Faça o login para acessar sua conta</p>
        <UseInputPadrao label="CNPJ" identifier="cpnj-signin" required value={loginSignIn} onChange={loginSignInChange} inputRef={loginSignInRef} inputStyle={{width: '100%'}} autoComplete="username"/>
        <UseInputPadrao type="password" label="Senha" identifier="senha-signin" required value={senhaSignIn} onChange={senhaSignInChange} inputRef={senhaSignInRef} inputStyle={{width: '100%'}} autoComplete="current-password"/>
        <button className={styles.submitButton} onClick={onSignIn}>Fazer Login</button>
      </div>
      <div className={styles.formActions}>
        <a className={styles.formActionsLink} onClick={() => openModal("modalPasswordRecovery")}>
          Clique aqui para recuperar sua senha
        </a>
        <a className={styles.formActionsLink} onClick={() => openModal("modalTexto", {titulo: "Política de Privacidade", texto: PoliticaDePrivacidade})}>
          Politicas de Privacidade
        </a>
        <a className={styles.formActionsLink} onClick={() => openModal("modalTexto", {titulo: "Termos de Serviço", texto: TermosDeServico})}>
          Termos de Serviço
        </a>
      </div>
    </form>
  );
}