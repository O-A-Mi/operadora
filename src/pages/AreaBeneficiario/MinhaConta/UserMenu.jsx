import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { useLoader, UsuarioContext } from "../../../context";
import styles from "./styles.module.css";
import {
  permissoesFormatadasAtom,
  permissoesOrdemAtom,
} from "../../../context/jotai";
import { useAtomValue } from "jotai";
import { useNavigate, useLocation } from "react-router";
import { jsonRoute } from "../../../utils/json";
import toastMessage from "../../../assets/toast-ui/toast";
import Tooltip from "../../../components/TooltipPadrao";
import FloatingSubmenu from "../../../components/MenuFlutuante";

const ROTAS_DA_AREA_BENEFICIARIO = [
  { id: "AREA_BENEFICIARIO_HOME", path: jsonRoute.HomeBeneficiario },
  { id: "AREA_BENEFICIARIO_QUESTIONARIO", path: jsonRoute.Questionario_de_Vida },
  { id: "AREA_BENEFICIARIO_PERGUNTAS", path: jsonRoute.Perguntas_Declaracao },
  { id: "AREA_BENEFICIARIO_DADOS_BENEFICIARIO", path: jsonRoute.Dados_do_Beneficiario },
];

const SUBMENUS = {
  
};

const UserMenuCliente = ({ menuAberto, setMenuAberto, isMobile }) => {
  const { handleLogout } = useContext(UsuarioContext);
  const { showLoader, hideLoader } = useLoader();

  const permissoes = useAtomValue(permissoesFormatadasAtom);
  const permissoes_ordem = useAtomValue(permissoesOrdemAtom);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuLateral = () => setIsOpen((prev) => !prev);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const userMenuRef = useRef(null);

  const temPermissao = useCallback(
    (ordemPermissao) => {
      if (!permissoes_ordem || !permissoes_ordem.AREA_BENEFICIARIO_ROOT)
        return false;
      if (!permissoes || !permissoes[permissoes_ordem.AREA_BENEFICIARIO_ROOT])
        return false;
      return !!permissoes[ordemPermissao];
    },
    [permissoes, permissoes_ordem]
  );

  const handleNavigate = useCallback(
    (link, options) => {
      const rotaDestinoId = ROTAS_DA_AREA_BENEFICIARIO.find((r) =>
        link.includes(r.path)
      )?.id;
      const ordemDestino = rotaDestinoId
        ? permissoes_ordem[rotaDestinoId]
        : null;

      if (ordemDestino && !temPermissao(ordemDestino)) {
        toastMessage(
          "Você não tem permissão para acessar esta tela.",
          "warning"
        );
        return;
      }

      const isHome =
        link === `/${jsonRoute.Beneficiario_MinhaConta}` ||
        link === `/${jsonRoute.Beneficiario_MinhaConta}/`;
      const normalizedCurrentPath =
        currentPath.endsWith("/") && currentPath.length > 1
          ? currentPath.slice(0, -1)
          : currentPath;
      
      if (
        (isHome
          ? normalizedCurrentPath === link.replace(/\/$/, "")
          : currentPath === link || currentPath ===  link.replace(/\/$/, "") ) &&
        !options?.force
      ) {
        return;
      }

      setMenuAberto(false);
      showLoader();
      navigate(link, options);
      
      setTimeout(() => {
        hideLoader();
      }, 100);
    },
    [
      currentPath,
      showLoader,
      hideLoader,
      setMenuAberto,
      navigate,
      permissoes_ordem,
      temPermissao,
    ]
  );

  useEffect(() => {
    if (
      !permissoes ||
      Object.keys(permissoes).length === 0 ||
      !permissoes_ordem ||
      Object.keys(permissoes_ordem).length === 0
    ) {
      return;
    }

    const basePathDaArea = `/${jsonRoute.Beneficiario_MinhaConta}`;

    if (!temPermissao(permissoes_ordem.AREA_BENEFICIARIO_ROOT)) {
      toastMessage("Você não tem permissão para acessar esta área.", "warning");
      showLoader();
      handleLogout(navigate);
      return;
    }

    const normalizedPath =
      currentPath.endsWith("/") && currentPath.length > 1
        ? currentPath.slice(0, -1)
        : currentPath;
    const estaNaRaizDaArea = normalizedPath === basePathDaArea;

    if (estaNaRaizDaArea) {
      if (isMobile) {
        hideLoader();
        setMenuAberto(true);
      } else {
        showLoader();
        navigate(`/${jsonRoute.Beneficiario_MinhaConta}`, { replace: true });
        setTimeout(() => {
          hideLoader();
        }, 100);
      }
    } else if (currentPath.startsWith(basePathDaArea)) {
      let rotaAtualMapeada = false;
      let ordemDaRotaAtual = null;

      for (const rotaInfo of ROTAS_DA_AREA_BENEFICIARIO) {
        const fullPath = `${basePathDaArea}/${rotaInfo.path}`.replace(
          /\/\//g,
          "/"
        );
        if (currentPath.startsWith(fullPath)) {
          ordemDaRotaAtual = permissoes_ordem[rotaInfo.id];
          rotaAtualMapeada = true;
          break;
        }
      }

      if (rotaAtualMapeada && !temPermissao(ordemDaRotaAtual)) {
        toastMessage(
          `Você não tem permissão para acessar esta página.`,
          "warning"
        );
        showLoader();
        navigate(`/${jsonRoute.Beneficiario_MinhaConta}`);
        setTimeout(() => {
          hideLoader();
        }, 100);
      } else {
        if (isMobile && menuAberto) {
          navigate(basePathDaArea);
        }
        hideLoader();
      }
    } else {
      hideLoader();
    }
  }, [location.pathname, permissoes, permissoes_ordem, isMobile, navigate]);

  if (
    !permissoes_ordem ||
    !permissoes ||
    !temPermissao(permissoes_ordem.AREA_BENEFICIARIO_ROOT)
  ) {
    return null;
  }

  useEffect(() => {
    if (submenu.isOpen) {
      setSubmenu(prev => ({ ...prev, isOpen: false }));
    }
  }, [location.pathname]);

  const [submenu, setSubmenu] = useState({
    isOpen: false,
    position: { top: 0, left: 0 },
    items: [],
    titulo: "",
  });
  
  const TITULO = {
   
  }

  const processarItensMenu = (itens) => {
    return itens.map((item) => {
      if (item.submenu) {
        return {
          label: item.label,
          submenu: processarItensMenu(item.submenu),
        };
      }
  
      return { 
        label: item.label,
        onClick: () => {
          if (item.path.startsWith(jsonRoute.Beneficiario_MinhaConta)) {
            handleNavigate(`/${item.path}`);
          } else {
            handleNavigate(`/${jsonRoute.Beneficiario_MinhaConta}/${item.path}`);
          }
          setSubmenu((prev) => ({ ...prev, isOpen: false }));
        },
      };
    });
  };
  
  const abrirSubmenu = (event, chave) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const itens = SUBMENUS[chave] || [];
    const tituloFormatado = TITULO[chave] || chave.toLowerCase();
    const itemsProcessados = processarItensMenu(itens);
  
    setSubmenu({
      isOpen: true,
      position: {
        top: rect.top,
        left: rect.left + rect.width / 2,
      },
      items: itemsProcessados,
      titulo: tituloFormatado,
    });
  };
  

  return (
    <div className={styles.userMenu} ref={userMenuRef}>
      <nav className={styles.menuList}>
        <Tooltip text="Home" position="right">
          <a
            onClick={() =>
              handleNavigate(`/${jsonRoute.Beneficiario_MinhaConta}/`, { replace: true })
            }
            className={`${
              currentPath == `/${jsonRoute.Beneficiario_MinhaConta}`
                ? styles.menuItemActive
                : ""
            } ${styles.menuItem}`}
          >
            <i className="fas fa-home" />
          </a>
        </Tooltip>
        {/*
        {temPermissao(permissoes_ordem.AREA_BENEFICIARIO_QUESTIONARIO) && (
          <Tooltip text="Questionário de Vida" position="right">
            <a
              onClick={() =>
                handleNavigate(
                  `/${jsonRoute.Beneficiario_MinhaConta}/${jsonRoute.Questionario_de_Vida}`
                )
              }
              className={`${
                currentPath.includes(
                  `/${jsonRoute.Beneficiario_MinhaConta}/${jsonRoute.Questionario_de_Vida }`
                )
                  ? styles.menuItemActive
                  : ""
              } ${styles.menuItem}`}
            >
              <i className="fas fa-chart-bar" />
            </a>
          </Tooltip>
        )}
        {temPermissao(permissoes_ordem.AREA_BENEFICIARIO_PERGUNTAS) && (
          <Tooltip text="Perguntas da Declaração" position="right">
            <a
              onClick={() =>
                handleNavigate(
                  `/${jsonRoute.Beneficiario_MinhaConta}/${jsonRoute.Perguntas_Declaracao}`
                )
              }
              className={`${
                currentPath.includes(
                  `/${jsonRoute.Beneficiario_MinhaConta}/${jsonRoute.Perguntas_Declaracao}`
                )
                  ? styles.menuItemActive
                  : ""
              } ${styles.menuItem}`}
            >
              <i className="fa-solid fa-message-question"></i>
            </a>
          </Tooltip>
        )}

            */}
        {temPermissao(permissoes_ordem.AREA_BENEFICIARIO_DADOS_BENEFICIARIO) && (
                          <Tooltip text="Dados do Beneficiário" position="right">
            <a
              onClick={() =>
                handleNavigate(
                  `/${jsonRoute.Beneficiario_MinhaConta}/${jsonRoute.Dados_do_Beneficiario}`
                )
              }
              className={`${
                currentPath.includes(
                  `/${jsonRoute.Beneficiario_MinhaConta}/${jsonRoute.Dados_do_Beneficiario}`
                )
                  ? styles.menuItemActive
                  : ""
              } ${styles.menuItem}`}
            >
              <i className="fa-solid fa-user"></i>
            </a>
          </Tooltip>
        )}

      </nav>
      {submenu.isOpen && (
        <FloatingSubmenu
          isOpen={submenu.isOpen}
          items={submenu.items}
          onClose={() => setSubmenu((prev) => ({ ...prev, isOpen: false }))}
          position={submenu.position}
          userMenuRef={userMenuRef}
          titulo={submenu.titulo}
        />
      )}
    </div>
  );
};

export default UserMenuCliente;
