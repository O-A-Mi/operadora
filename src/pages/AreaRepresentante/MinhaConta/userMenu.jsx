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
import { useArea } from '../../../context/AreaContext';

const ROTAS_DA_AREA_REPRESENTANTE = [
  { id: "AREA_REPRESENTANTE_HOME", path: "home", module: "home" },

  { id: "AREA_REPRESENTANTE_FASE_ATENDIMENTO", path: "fase-atendimento", module: "fase_atendimento" },
  { id: "AREA_REPRESENTANTE_LISTAGEM_BENEFICIARIO", path: "listagem-beneficiario", module: "listagem_beneficiario" },
  { id: "AREA_REPRESENTANTE_DADOS_REPRESENTANTE", path: "dados-representante", module: "dados_representante" },
  { id: "AREA_REPRESENTANTE_FINANCEIRO", path: "financeiro", module: "financeiro" },
  { id: "AREA_REPRESENTANTE_ATENDIMENTOS", path: "atendimentos", module: "atendimentos" },
  { id: "AREA_REPRESENTANTE_LOTES", path: "lotes", module: "lotes" },
  { id: "AREA_REPRESENTANTE_VALIDAR_PACIENTE", path: "validar-paciente", module: "validar_paciente" },
  { id: "AREA_REPRESENTANTE_VALIDAR_TOKEN", path: "validar-token", module: "validar_token" },

  { id: "AREA_REPRESENTANTE_VENDA:", path: "venda", module: "venda" },
  { id: "AREA_REPRESENTANTE_CONSULTA:", path: "consulta", module: "consulta" },
  { id: "AREA_REPRESENTANTE_ACOMPANHAMENTO:", path: "acompanhamento", module: "acompanhamento" },
  { id: "AREA_REPRESENTANTE_DADOS_REPRESENTANTE:", path: "dados-representante", module: "dados_representante" },
];

const SUBMENUS = {
  FINANCEIRO: [
    { label: "Lançamento", path: "lancamento" },
    {
      label: "Tesouraria",
      submenu: [
        { label: "Fluxo de Caixa", path: "fluxo-caixa" },
        { label: "Contas a Receber", path: "contas-a-receber" },
        { label: "Contas a Pagar", path: "contas-a-pagar" },
        { label: "Comissão", path: "comissao" },
        { label: "DRE", path: "dre" },
        {
          label: "Competência",
          submenu: [
            { label: "Fechamento", path: "fechamento" },
            { label: "Abertura", path: "abertura" },
          ],
        },
      ],
    },
    { label: "Cobrança", path: "cobranca" },
    {
      label: "Serviços",
      submenu: [
        { label: "Contrato", path: "contrato" },
        { label: "Alteração de Vencimento", path: "alteracao-vencimento" },
      ],
    },
    {
      label: "Banco",
      submenu: [
        { label: "Arquivo Remessa", path: "arquivo-remessa" },
        { label: "Arquivo Retorno", path: "arquivo-retorno" },
        { label: "Remessa Banco Digital", path: "remessa-banco-digital" },
      ],
    },
    { label: "Log de Auditoria", path: "log-auditoria" },
  ],

};

const TITULO = {
  FINANCEIRO: "Financeiro",
};

const UserMenuRepresentante = ({ menuAberto, setMenuAberto, isMobile }) => {
  const { hideLoader } = useLoader();
  const { usuarioLogado } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const location = useLocation();
  const permissoesFormatadas = useAtomValue(permissoesFormatadasAtom);
  const permissoesOrdem = useAtomValue(permissoesOrdemAtom);
  const { getCurrentAreaModules } = useArea();

  const [isOpen, setIsOpen] = useState(false);
  const [submenu, setSubmenu] = useState({
    isOpen: false,
    position: { top: 0, left: 0 },
    items: [],
    titulo: "",
  });
  const userMenuRef = useRef(null);

  const toggleMenuLateral = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    hideLoader();
  }, [location, hideLoader]);

  useEffect(() => {
    if (isMobile) {
      setMenuAberto(isOpen);
    }
  }, [isOpen, isMobile, setMenuAberto]);

  const handleNavigate = useCallback((path) => {
    const fullPath = path ? `/${jsonRoute.Representante_Area}/${path}` : `/${jsonRoute.Representante_Area}`;
    navigate(fullPath, { replace: true });

    if (isMobile) {
      setMenuAberto(false);
      setIsOpen(false);
    }
  }, [navigate, isMobile, setMenuAberto]);

  const temPermissaoRepresentante = useCallback((permissao) => {
    if (!permissoesFormatadas || !permissoesOrdem) return true;
    if (!permissoesOrdem.AREA_REPRESENTANTE_ROOT) return true;
    if (!permissoesFormatadas || !permissoesFormatadas[permissoesOrdem.AREA_REPRESENTANTE_ROOT]) return true;
    return !!permissoesFormatadas[permissao];
  }, [permissoesFormatadas, permissoesOrdem]);

  const currentPath = location.pathname;
  const normalizedCurrentPath = currentPath.endsWith("/") && currentPath.length > 1
    ? currentPath.slice(0, -1)
    : currentPath;
  const areaModules = getCurrentAreaModules();

  const getFilteredMenuItems = () => {
    return ROTAS_DA_AREA_REPRESENTANTE.filter(item =>
      areaModules.includes(item.module)
    );
  };

  const getMenuIcon = (module) => {
    const iconMap = {
      'home': 'fas fa-home',
      'fase_atendimento': 'fas fa-clipboard-list',
      'listagem_beneficiario': 'fas fa-users',
      'dados_representante': 'fa-solid fa-user-md',
      'financeiro': 'fas fa-dollar-sign',
      'atendimentos': 'fas fa-user-md',
      'lotes': 'fas fa-boxes',
      'validar_paciente': 'fas fa-user-check',
      'validar_token': 'fas fa-key'
    };
    return iconMap[module] || 'fas fa-circle';
  };

  const processarItensMenu = (itens) => {
    return itens.map((item) => {
      const itemProcessado = {
        label: item.label,
        onClick: () => {
          if (item.submenu) {
            return;
          }
          handleNavigate(item.path);
        },
      };

      if (item.submenu) {
        itemProcessado.submenu = processarItensMenu(item.submenu);
      }

      return itemProcessado;
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
    <>
      <div className={styles.userMenu} ref={userMenuRef}>
        <nav className={styles.menuList}>
          <Tooltip text="Home" position="right">
            <a
              onClick={() =>
                handleNavigate('')
              }
              className={`${normalizedCurrentPath === `/${jsonRoute.Representante_Area}`
                  ? styles.menuItemActive
                  : ""
                } ${styles.menuItem}`}
            >
              <i className="fas fa-home" />
            </a>
          </Tooltip>



          {temPermissaoRepresentante("AREA_REPRESENTANTE_FASE_ATENDIMENTO") && (
            <Tooltip text="Venda" position="right">
              <a
                onClick={() =>
                  handleNavigate(jsonRoute.Venda_Representante)
                }
                className={`${currentPath.includes(
                  `/${jsonRoute.Representante_Area}/${jsonRoute.Venda_Representante}`
                )
                    ? styles.menuItemActive
                    : ""
                  } ${styles.menuItem}`}
              >
                <i className="fa fa-dollar-sign" />
              </a>
            </Tooltip>
          )}


          {temPermissaoRepresentante("AREA_REPRESENTANTE_FASE_ATENDIMENTO") && (
            <Tooltip text="Consulta" position="right">
              <a
                onClick={() =>
                  handleNavigate(jsonRoute.Consulta_Representante)
                }
                className={`${currentPath.includes(
                  `/${jsonRoute.Representante_Area}/${jsonRoute.Consulta_Representante}`
                )
                    ? styles.menuItemActive
                    : ""
                  } ${styles.menuItem}`}
              >
                <i className="fas fa-clipboard-list" />
              </a>
            </Tooltip>
          )}

          {temPermissaoRepresentante("AREA_REPRESENTANTE_LISTAGEM_BENEFICIARIO") && (
            <Tooltip text="Acompanhamento" position="right">
              <a
                onClick={() =>
                  handleNavigate(jsonRoute.Acompanhamento_Representante)
                }
                className={`${currentPath.includes(
                  `/${jsonRoute.Representante_Area}/${jsonRoute.Acompanhamento_Representante}`
                )
                    ? styles.menuItemActive
                    : ""
                  } ${styles.menuItem}`}
              >
                <i className="fas fa-users" />
              </a>
            </Tooltip>
          )}

          {/* {temPermissaoRepresentante("AREA_REPRESENTANTE_FINANCEIRO") && (
            <Tooltip text="Financeiro" position="right">
              <a
                onClick={(e) => abrirSubmenu(e, "FINANCEIRO")}
                className={`${
                  currentPath.includes(
                    `/${jsonRoute.Representante_Area}/financeiro`
                  )
                    ? styles.menuItemActive
                    : ""
                } ${styles.menuItem}`}
              >
                <i className="fas fa-dollar-sign" />
              </a>
            </Tooltip>
          )} */}

          {temPermissaoRepresentante("AREA_REPRESENTANTE_DADOS_REPRESENTANTE") && (
            <Tooltip text="Dados do Representante" position="right">
              <a
                onClick={() =>
                  handleNavigate(jsonRoute.Representante_DadosRepresentante)
                }
                className={`${currentPath.includes(
                  `/${jsonRoute.Representante_Area}/${jsonRoute.Representante_DadosRepresentante}`
                )
                    ? styles.menuItemActive
                    : ""
                  } ${styles.menuItem}`}
              >
                <i className="fas fa-user" />
              </a>
            </Tooltip>
          )}


        </nav>
      </div>

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
    </>
  );
};

export default UserMenuRepresentante;
