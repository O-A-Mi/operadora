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

const formatTooltipText = (text) => {
  const wordMap = {
    'LISTAGEM': 'Listagem de Beneficiários',
    'MOVIMENTACOES': 'Movimentações',
    'RELATORIO': 'Relatórios',
    'DADOS CLIENTE': 'Dados do Cliente',
    'FINANCEIRO': 'Financeiro',
    'ADESAO': 'Adesão',
  };
  
  return wordMap[text.toUpperCase()] || text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const ROTAS_DA_AREA_CLIENTE = [
  { id: "AREA_CLIENTE_HOME", path: jsonRoute.HomeCliente, module: 'home' },
  { id: "AREA_CLIENTE_LISTAGEM", path: jsonRoute.Listagem_Beneficiarios, module: 'listagem' },
  { id: "AREA_CLIENTE_MOVIMENTACOES", path: jsonRoute.Movimentacoes, module: 'movimentacoes' },
  { id: "AREA_CLIENTE_RELATORIO", path: jsonRoute.Modulo_Relatorio, module: 'relatorio' },
  { id: "AREA_CLIENTE_DADOS_CLIENTE", path: jsonRoute.Dados_do_Cliente, module: 'dados_cliente' },
  // { id: "AREA_CLIENTE_ADESAO", path: jsonRoute.Adesao_Cliente, module: 'adesao' },
];

const SUBMENUS = {
  CONFIGURACOES: [
    { 
      label: "Agendador de Tarefas",
       submenu: [
        {label:"Financeiro", path: `${jsonRoute.Configuracoes}/${jsonRoute.AgendadorFinanceiro}`},
        {label:"Associado", path: `${jsonRoute.Configuracoes}/${jsonRoute.AgendadorAssociado}`},
        {label:"Proposta", path: `${jsonRoute.Configuracoes}/${jsonRoute.AgendadorProposta}`},
        {label:"Mudar Status", path: `${jsonRoute.Configuracoes}/${jsonRoute.AgendadorMudarStatus}`},
        {label:"Andamento da Proposta", path: `${jsonRoute.Configuracoes}/${jsonRoute.AndamentoProposta}`},
        {label:"Representante", path: `${jsonRoute.Configuracoes}/${jsonRoute.AgendadorRepresentante}`},
        {label:"Plataforma CRM", path: `${jsonRoute.Configuracoes}/${jsonRoute.AgendadorPlataforma}`},
      ]
    },
    { label: "Especialidades", path: `${jsonRoute.Configuracoes}/${jsonRoute.Especialidades}` },
    { label: "Mensagens", path: `${jsonRoute.Configuracoes}/${jsonRoute.MensagensFerramenta}` },
    { label: "Notificação", path: `${jsonRoute.Configuracoes}/${jsonRoute.Notificacao}` },
    { label: "Status", path: `${jsonRoute.Configuracoes}/${jsonRoute.Status}` },
    { label: "Perguntas da Declaração", path: `${jsonRoute.Configuracoes}/${jsonRoute.PerguntasDeclaracao}` },
    { label: "Questionário de Vida", path: `${jsonRoute.Configuracoes}/${jsonRoute.QuestionarioVida}` },
    { label: "Formulário", path: `${jsonRoute.Configuracoes}/${jsonRoute.Formulario}` },
    { label: "Funções de Usuário", path: `${jsonRoute.Configuracoes}/${jsonRoute.FuncaoUsuario}` },
  ],
  FINANCEIRO: [
    { label: "Lançamento", path: `${jsonRoute.Financeiro}/${jsonRoute.Lancamento}` },
    {
      label: "Tesouraria",
      submenu: [
        { label: "Fluxo de Caixa", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.FluxoCaixa}` },
        { label: "Contas a Receber", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.ContasAReceber}` },
        { label: "Contas a Pagar", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.ContasAPagar}` },
        { label: "Comissão", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Comissao}` },
        { label: "DRE", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.DRE}` },
        {
          label: "Competência",
          submenu: [
            { label: "Fechamento", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Fechamento}` },
            { label: "Abertura", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Abertura}` },
          ],
        },
      ],
    },
    { label: "Cobrança", path: `${jsonRoute.Financeiro}/${jsonRoute.Cobranca}` },
    {
      label: "Serviços",
      submenu: [
        { label: "Contrato", path: `${jsonRoute.Financeiro}/${jsonRoute.Servicos}/${jsonRoute.Contrato}` },
        { label: "Alteração de Vencimento", path: `${jsonRoute.Financeiro}/${jsonRoute.Servicos}/${jsonRoute.AlteracaoVencimento}` },
      ],
    },
    {
      label: "Banco",
      submenu: [
        { label: "Arquivo Remessa", path: `${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.ArquivoRemessa}` },
        { label: "Arquivo Retorno", path: `${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.ArquivoRetorno}` },
        { label: "Remessa Banco Digital", path: `${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.RemessaBancoDigital}` },
      ],
    },
    { label: "Log de Auditoria", path: `${jsonRoute.Financeiro}/${jsonRoute.LogAuditoria}` },
  ],
  // ADESAO: [
  //   {label:"Venda", path: `${jsonRoute.Adesao_Cliente}/${jsonRoute.Venda_Cliente}`},
  //   {label:"Consulta", path: `${jsonRoute.Adesao_Cliente}/${jsonRoute.Consulta_Cliente}`},
  //   {label:"Acompanhamento", path: `${jsonRoute.Adesao_Cliente}/${jsonRoute.Acompanhamento_Cliente}`},
  // ],
  OPERACIONAL: [
    { label: "Plano/Serviço", path: `${jsonRoute.Operacional}/${jsonRoute.CadastroPlanos}` },
    { label: "Cliente", path: "cliente" },
    { label: "Contrato", path: "contrato" },
    { label: "Representante",  path:`${jsonRoute.Operacional}/${jsonRoute.CadastroRepresentante}` },
    { label: "Repasse", path: "repasse" },
    { label: "Cadastro Beneficiário",  path:`${jsonRoute.Operacional}/${jsonRoute.CadastroBeneficiarios}` },
    { label: " Movimentações do Beneficiário",  path: `${jsonRoute.Operacional}/${jsonRoute.MovBeneficiario}` },
    { label: "KanBan", path: `${jsonRoute.Operacional}/${jsonRoute.Kanban}` },
  ],
};

const UserMenuCliente = ({ menuAberto, setMenuAberto, isMobile }) => {
  const { handleLogout } = useContext(UsuarioContext);
  const { showLoader, hideLoader } = useLoader();
  const { getCurrentAreaModules } = useArea();

  const permissoes = useAtomValue(permissoesFormatadasAtom);
  const permissoes_ordem = useAtomValue(permissoesOrdemAtom);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuLateral = () => setIsOpen((prev) => !prev);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const areaModules = getCurrentAreaModules();
  
  const getFilteredMenuItems = () => {
    return ROTAS_DA_AREA_CLIENTE.filter(item => 
      areaModules.includes(item.module)
    );
  };

  const getMenuIcon = (module) => {
    const iconMap = {
      'home': 'fas fa-home',
      'listagem': 'fa-solid fa-users',
      'movimentacoes': 'fa-solid fa-arrow-right-arrow-left',
      'relatorio': 'fas fa-clipboard-list',
      'dados_cliente': 'fa-solid fa-user',
      // 'adesao': 'fa fa-plus'
      // 'financeiro': 'fas fa-dollar-sign' // comentado temporariamente
    };
    return iconMap[module] || 'fas fa-circle';
  };
  const userMenuRef = useRef(null);

  const temPermissao = useCallback(
    (ordemPermissao) => {
      if (!permissoes_ordem || !permissoes_ordem.AREA_CLIENTE_ROOT_CLIENTE)
        return false;
      if (!permissoes || !permissoes[permissoes_ordem.AREA_CLIENTE_ROOT_CLIENTE])
        return false;
      return !!permissoes[ordemPermissao];
    },
    [permissoes, permissoes_ordem]
  );

  const handleNavigate = useCallback(
    (link, options) => {
      const rotaDestinoId = ROTAS_DA_AREA_CLIENTE.find((r) =>
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
        link === `/${jsonRoute.Operadora_MinhaConta}` ||
        link === `/${jsonRoute.Operadora_MinhaConta}/`;
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

    const basePathDaArea = `/${jsonRoute.Operadora_MinhaConta}`;

    if (!temPermissao(permissoes_ordem.AREA_CLIENTE_ROOT_CLIENTE)) {
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
        navigate(`/${jsonRoute.Operadora_MinhaConta}`, { replace: true });
        setTimeout(() => {
          hideLoader();
        }, 100);
      }
    } else if (currentPath.startsWith(basePathDaArea)) {
      let rotaAtualMapeada = false;
      let ordemDaRotaAtual = null;

      for (const rotaInfo of ROTAS_DA_AREA_CLIENTE) {
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
        navigate(`/${jsonRoute.Operadora_MinhaConta}`);
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
    !temPermissao(permissoes_ordem.AREA_CLIENTE_ROOT_CLIENTE)
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
    // ADESAO: "Adesão",
    CONFIGURACOES: "Configurações",
    FINANCEIRO: "Financeiro",
    OPERACIONAL: "Operacional",
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
          if (item.path.startsWith(jsonRoute.Operadora_MinhaConta)) {
            handleNavigate(`/${item.path}`);
          } else {
            handleNavigate(`/${jsonRoute.Operadora_MinhaConta}/${item.path}`);
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
              handleNavigate(`/${jsonRoute.Operadora_MinhaConta}/`, { replace: true })
            }
            className={`${
              currentPath == `/${jsonRoute.Operadora_MinhaConta}`
                ? styles.menuItemActive
                : ""
            } ${styles.menuItem}`}
          >
            <i className="fas fa-home" />
          </a>
        </Tooltip>
        
        {getFilteredMenuItems().map((item) => {
          const permissionKey = item.id;
          const tooltipText = formatTooltipText(item.id.replace('AREA_CLIENTE_', '').replace('_', ' '));
          
          if (!temPermissao(permissoes_ordem[permissionKey])) return null;

          const hasSubmenu = ['ADESAO'].includes(item.module.toUpperCase());
          
          return (
            <Tooltip key={item.id} text={tooltipText} position="right">
              <a
                onClick={hasSubmenu ? (e) => abrirSubmenu(e, item.module.toUpperCase()) : () => handleNavigate(`/${jsonRoute.Operadora_MinhaConta}/${item.path}`)} //() => handleNavigate(`/${jsonRoute.Operadora_MinhaConta}/${item.path}`)
                className={`${
                  currentPath.includes(`/${jsonRoute.Operadora_MinhaConta}/${item.path}`)
                    ? styles.menuItemActive
                    : ""
                } ${styles.menuItem}`}
              >
                <i className={getMenuIcon(item.module)} />
              </a>
            </Tooltip>
          );
        })}

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
