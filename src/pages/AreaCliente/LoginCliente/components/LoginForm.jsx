import styles from '../styles.module.css';
import { useEffect, useContext, useCallback } from 'react';
import { user } from '../../../../utils/json';
import { UsuarioContext } from '../../../../context';
import { carregarLinks } from '../../../../db/carregarGeral';
import { getBaseConfig } from '../../../../utils/utilsConfig';
import { useAtom } from 'jotai';
import { cpfcnpjAtom, idAtom, tipoUsuarioAtom, nomeAtom, loginAtom, assinaturaListaAtom, permissoesAtom, permissoesFormatadasAtom } from '../../../../context/jotai';
import { UseInputPadrao, UseInputMask } from '../../../../components/InputPadrao/index.jsx';
import PoliticaDePrivacidade from '../../../../mocks/politicaDePrivacidade';
import TermosDeServico from '../../../../mocks/termosDeServico';
import toastMessage from "../../../../assets/toast-ui/toast";
import dialogMessage from '../../../../assets/dialog-ui/dialog';
import { formatarUsuarioLogin } from '../../../../utils/functions.js';
import { jsonRoute } from '../../../../utils/json';
import { useNavigate } from 'react-router';


export default function LoginForm({openModal, showLoader, hideLoader}) {
  const { handleLogin } = useContext(UsuarioContext);
  const [, setIdAtomValue] =  useAtom(idAtom);
  const [, setNomeAtomValue] =  useAtom(nomeAtom);
  const [, setLoginAtomValue] = useAtom(loginAtom);
  const [, setCpfCnpjAtomValue] = useAtom(cpfcnpjAtom);
  const [, setTipoUsuarioAtomValue] = useAtom(tipoUsuarioAtom);
  const [, setAssinaturaListaAtomValue] = useAtom(assinaturaListaAtom);
  const [, setPermissoesRawAtomValue] = useAtom(permissoesAtom);
  const [, setPermissoesFormatadasAtomValue] = useAtom(permissoesFormatadasAtom);
  
  const navigate = useNavigate(); 
  const { baselink, companyId, endpoints } = getBaseConfig();

  const [loginSignIn, loginSignInChange, loginSignInRef] = UseInputMask("999.999.999-99 | 99.999.999/9999-99", "both");
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
  
  useEffect(() => {
    window.logar = logarCallback;
    return () => {
      delete window.logar;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, baselink, endpoints.logarEmpresarial]);

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
        { ordem: "2", visivel: "T" }, // ROOT
        { ordem: "2.01", visivel: "T" }, // EMPRESA
        { ordem: "2.02", visivel: "T" }, // MOVIMENTACOES
        { ordem: "2.03", visivel: "T" }, // BENEFICIARIOS
        { ordem: "2.04", visivel: "T" }, // CONSULTAS
        { ordem: "2.05", visivel: "T" }, // COMPRAS
        { ordem: "2.06", visivel: "T" }, // USUARIOS
      ];

      const permissoesMapObj = processarPermissoesParaMap(permissoesArrayDeObjetos);

      setLoginAtomValue(user.cnpj);
      setIdAtomValue("token_teste_empresarial");
      setNomeAtomValue(user.nome || "Empresa Teste");
      setCpfCnpjAtomValue(user.cnpj);
      setTipoUsuarioAtomValue('R');
      setPermissoesRawAtomValue(permissoesArrayDeObjetos);
      setPermissoesFormatadasAtomValue(permissoesMapObj);

      toastMessage("Login efetuado com sucesso", "success");
      handleLogin();
      hideLoader();
      navigate(`/${jsonRoute.Operadora_MinhaConta}`, { replace: true });
    } else {
      hideLoader();
      dialogMessage("Usuário ou senha inválidos.", "error", { confirmButton: false });
    }
  };

  const logarCallback = useCallback((dados) => {
    let resp;
    try {
      resp = JSON.parse(dados);
    } catch (error) {
      hideLoader();
      console.error("Erro ao parsear resposta do login:", dados, error);
      dialogMessage("Ocorreu um erro inesperado ao tentar fazer login. Tente novamente.", "error", { confirmButton: false });
      return;
    }

    if (resp.status != 200) {
      hideLoader();
      dialogMessage(resp.mensagem || "Usuário ou senha inválidos.", "error", { confirmButton: false });
      return;
    }

    let propostasArrayDeObjetos = [];
    if (resp.jsonProposta && Array.isArray(resp.jsonProposta)) {
        propostasArrayDeObjetos = resp.jsonProposta.map(e => {
            try {
                return JSON.parse(e);
            } catch (parseError) {
                console.error("Erro ao parsear string de permissão individual:", e, parseError);
                return null;
            }
        }).filter(p => p !== null);
    } else {
        console.warn("Propostas não é um array ou está ausente.");
        dialogMessage("Ocorreu um erro inesperado ao tentar carregar as assinaturas. Tente novamente.", "error", { confirmButton: false });
    }

    let permissoesArrayDeObjetos = [];
    if (resp.jsonMenu && Array.isArray(resp.jsonMenu)) {
        permissoesArrayDeObjetos = resp.jsonMenu.map(e => {
            try {
                return JSON.parse(e);
            } catch (parseError) {
                console.error("Erro ao parsear string de permissão individual:", e, parseError);
                return null;
            }
        }).filter(p => p !== null);
    } else {
        console.warn("Permissões não é um array ou está ausente.");
        dialogMessage("Ocorreu um erro inesperado ao tentar carregar as permissões. Tente novamente.", "error", { confirmButton: false });
    }

    const permissoesMapObj = processarPermissoesParaMap(permissoesArrayDeObjetos);

    if (!permissoesMapObj["2"]) { 
      hideLoader();
      dialogMessage("Você não tem permissão para acessar esta área. Entre em contato com o suporte.", "error", { confirmButton: false });
      return;
    }

    setAssinaturaListaAtomValue(propostasArrayDeObjetos);
    setLoginAtomValue(resp.usuario);
    setIdAtomValue(resp.token_cliente);
    setNomeAtomValue(resp.nome);
    setCpfCnpjAtomValue(resp.cpfcnpj);
    setTipoUsuarioAtomValue('EMP');
    setPermissoesRawAtomValue(permissoesArrayDeObjetos);
    setPermissoesFormatadasAtomValue(permissoesMapObj);

    toastMessage("Login efetuado com sucesso", "success");
    handleLogin();
  }, [
    hideLoader, processarPermissoesParaMap, setAssinaturaListaAtomValue, setLoginAtomValue, setIdAtomValue,
    setCpfCnpjAtomValue, setTipoUsuarioAtomValue, setPermissoesRawAtomValue,
    setPermissoesFormatadasAtomValue, handleLogin
  ]);

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