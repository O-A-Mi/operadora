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
  fotoPerfilAtom,
  nomeAtom,
  cpfcnpjAtom,
  permissoesFormatadasAtom,
  permissoesOrdemAtom,
} from "../../../context/jotai";
import { useAtomValue } from "jotai";
import { useNavigate, useLocation, replace } from "react-router";
import { jsonRoute } from "../../../utils/json";
import toastMessage from "../../../assets/toast-ui/toast";
import Tooltip from "../../../components/TooltipPadrao";
import FloatingSubmenu from "../../../components/MenuFlutuante";
import { useArea } from '../../../context/AreaContext';

const formatTooltipText = (text) => {
  const wordMap = {
    'FINANCEIRO': 'Financeiro',
    // 'CONFIGURACOES': 'Configurações',
    'OPERACIONAL': 'Operacional',
    'SEGURANCA': 'Segurança',
    'RELATORIOS': 'Relatórios',
    'MENSAGENS': 'Mensagens',
    'DADOS BENEFICIARIO': 'Dados do Beneficiário',
    'CONSULTAS': 'Consultas',
    'ATENDIMENTOS': 'Atendimentos',
    'DADOS REPRESENTANTE': 'Dados do Representante',
    'VALIDAR PACIENTE': 'Validar Paciente',
    'LOTES': 'Lotes',
    // 'MANUTENCAO': 'Manutenção',
  };

  return wordMap[text.toUpperCase()] || text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Precisa renomear para OPERADORA dps pq quebra a coisa toda

const ROTAS_DA_AREA_OPERADORA = [
  { id: "AREA_OPERADORA_HOME", path: jsonRoute.HomeOperadora, module: 'home' },
  { id: "AREA_OPERADORA_OPERACIONAL", path: jsonRoute.Operacional, module: 'operacional' },
  { id: "AREA_OPERADORA_FINANCEIRO", path: jsonRoute.Financeiro, module: 'financeiro' },
  { id: "AREA_OPERADORA_MENSAGENS", path: jsonRoute.Mensagens, module: 'mensagens' },
  { id: "AREA_OPERADORA_RELATORIOS", path: jsonRoute.Relatorios, module: 'relatorios' },
  { id: "AREA_OPERADORA_SEGURANCA", path: jsonRoute.Seguranca, module: 'seguranca' },
  { id: "AREA_OPERADORA_CONFIGURACOES", path: jsonRoute.Configuracoes, module: 'configuracoes' },
  // { id: "AREA_OPERADORA_MANUTENCAO", path: jsonRoute.Manutencao, module: 'manutencao' },
];

const SUBMENUS = {
  SEGURANCA:
    [
      { label: "Usuários", path: `${jsonRoute.Seguranca}/${jsonRoute.SegurancaUsuario}` },
      { label: "Permissões", path: `${jsonRoute.Seguranca}/${jsonRoute.PermissaoInformacoes}` },
      { label: "Permissões de Relatórios", path: `${jsonRoute.Seguranca}/${jsonRoute.PermissaoRelatorios}` },
    ],

  CONFIGURACOES:
    [
      // { label: "Agendador de Tarefas",
      //   submenu:
      //     [
      //       { label: "Financeiro", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorFinanceiro}` },
      //       { label: "Contratante",
      //         submenu:
      //           [
      //             { label: "Carta de cancelamento", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.CartaCacelamento}` },
      //           ]
      //       },

      //       { label: "Associado", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorAssociado}` },
      //       // { label: "Proposta", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorProposta}` },

      //       { label: "Proposta",
      //         submenu:
      //           [
      //             { label: "Boas-vindas", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.BoasVindas}` }
      //           ]
      //       },

      //       { label: "Mudar Status", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorMudarStatus}` },
      //       { label: "Andamento da Proposta", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.AndamentoProposta}` },
      //       { label: "Representante", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorRepresentante}` },
      //       { label: "Plataforma CRM", path: `${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorPlataforma}` },
      //     ]
      // },

      // { label: "Especialidades", path: `${jsonRoute.Configuracoes}/${jsonRoute.Especialidades}` },
      { label: "Geral",
        submenu:
          [
            { label: "Departamento", path:`${jsonRoute.Configuracoes}/geral/${jsonRoute.DepartamentoGeral}` },
            // { label: "Função do Usuario", path:`${jsonRoute.Configuracoes}/geral/${jsonRoute.FuncaoUsuarioGeral}` },
            // { label: "Assunto", path: "" },
            // { label: "Tipo Chamando", path: "" },
            // { label: "Documento/Arquivo", path: "" },
            { label: "Pergunta da Declaração", path: "" },
            // { label: "Pergunta da Qualidade de Vida", path: "" },
          ]
      },

      // { label: "Mensagens", path: `${jsonRoute.Configuracoes}/${jsonRoute.MensagensFerramenta}` },
      //{ label: "Departamento", path: `${jsonRoute.Configuracoes}/${jsonRoute.Departamento}` },
      // { label: "Notificação", path: `${jsonRoute.Configuracoes}/${jsonRoute.Notificacao}` },
      { label: "Status", path: `${jsonRoute.Configuracoes}/${jsonRoute.Status}` },
      // { label: "Perguntas da Declaração", path: `${jsonRoute.Configuracoes}/${jsonRoute.PerguntasDeclaracao}` },
      // { label: "Questionário de Vida", path: `${jsonRoute.Configuracoes}/${jsonRoute.QuestionarioVida}` }, restante da dr online, n/a
      // { label: "Funções de Usuário", path: `${jsonRoute.Configuracoes}/${jsonRoute.FuncaoUsuario}` },
    ],

  // FINANCEIRO:
  //   [
  //     { label: "Lançamento", path: `${jsonRoute.Financeiro}/${jsonRoute.Lancamento}` },
  //     { label: "Tesouraria",
  //       submenu:
  //         [
  //           { label: "Fluxo de Caixa", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.FluxoCaixa}` },
  //           { label: "Contas a Receber", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.ContasAReceber}` },
  //           { label: "Contas a Pagar", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.ContasAPagar}` },
  //           { label: "Comissão", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Comissao}` },
  //           { label: "DRE", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.DRE}` },
  //           { label: "Competência",
  //             submenu:
  //               [
  //                 { label: "Fechamento", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Fechamento}` },
  //                 { label: "Abertura", path: `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Abertura}` },
  //               ],
  //           },
  //         ],
  //     },
  //     { label: "Cobrança", path: `${jsonRoute.Financeiro}/${jsonRoute.Cobranca}` },
  //     { label: "Serviços",
  //       submenu:
  //         [
  //           { label: "Contrato", path: `${jsonRoute.Financeiro}/${jsonRoute.Servicos}/${jsonRoute.Contrato}` },
  //           { label: "Alteração de Vencimento", path: `${jsonRoute.Financeiro}/${jsonRoute.Servicos}/${jsonRoute.AlteracaoVencimento}` },
  //         ],
  //     },

  //     { label: "Banco",
  //       submenu:
  //         [
  //           { label: "Arquivo Remessa", path: `${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.ArquivoRemessa}` },
  //           { label: "Arquivo Retorno", path: `${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.ArquivoRetorno}` },
  //           { label: "Remessa Banco Digital", path: `${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.RemessaBancoDigital}` },
  //         ],
  //     },

  //     { label: "Log de Auditoria", path: `${jsonRoute.Financeiro}/${jsonRoute.LogAuditoria}` },
  //   ],
  OPERACIONAL:
    [
      { label: "Manutenção",
        submenu:
          [
            { label: "Plano", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.PlanoSaude}` },
            { label: "Grupo Contratual", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.CadastroGrupoContratual}` },
            { label: "Tipo Plano", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.CadastroTipoPlano}` },
            { label: "Forma de Pagamento", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.CadastroFormaPagamento}` },
            { label: "Parentesco", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.CadastroParentesco}` },
            // { label: "Contratante", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Contratante}` },
            // { label: "Segurado", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Segurado}`},
            // { label: "Colaborador", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Funcionario}` },
            // { label: "Representante", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Representante}` },
            // { label: "Fornecedor", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Fornecedor}` },
            // { label: "Beneficiários",
            //   submenu:
            //     [
            //       { label: "Titular", path: `${jsonRoute.Operacional}/manutencao//${jsonRoute.CadastroBeneficiarios}` },
            //       { label: "Dependente", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Depedente}` }
            //     ],
            // },
            // // { label: "Entidade/Empresa", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Entidade}`}, Serviço não oferecido
            // // { label: "Tipo do Plano", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.PlanoSaude}` },
            // // { label: "Operadora", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Operadora}`},
            // { label: "Convênio", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.Convenio}` },
            // { label: "Atualização de Preço em Lote", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.AtualizacaoPrecoLote}` },
            // // { label: "Vigência e Transmissão em Lote", path: `${jsonRoute.Operacional}/manutencao/${jsonRoute.VigenciaTransmissao}`},
          ]
      },
      // { label: "Movimentações", path: `${jsonRoute.Operacional}/${jsonRoute.MovBeneficiario}` },

      { label: "Formulário", path: `${jsonRoute.Operacional}/${jsonRoute.Formulario}` },
      { label: "Portal Empresarial",
        submenu:
          [
            { label: "Acompanhamento", path: `${jsonRoute.Operacional}/${jsonRoute.PortalEmpresarial}/${jsonRoute.Acompanhamento_Empresarial}` },
            { label: "Cancelamento", path: `${jsonRoute.Operacional}/${jsonRoute.PortalEmpresarial}/${jsonRoute.Cancelamento_Empresarial}` },
            { label: "Validação de Proposta", path: `${jsonRoute.Operacional}/${jsonRoute.PortalEmpresarial}/${jsonRoute.ValidacaoProposta_Empresarial}` },
          ]
      },
      { label: "Portal Adesão",
        submenu:
          [
            { label: "Acompanhamento", path: `${jsonRoute.Operacional}/${jsonRoute.PortalAdesao}/${jsonRoute.Acompanhamento_Adesao}` },
            { label: "Cancelamento", path: `${jsonRoute.Operacional}/${jsonRoute.PortalAdesao}/${jsonRoute.Cancelamento_Adesao}` },
            { label: "Validação de Proposta", path: `${jsonRoute.Operacional}/${jsonRoute.PortalAdesao}/${jsonRoute.ValidacaoProposta_Adesao}` },
          ]
      },
      // { label: "Migração de Dados",
      //   submenu:
      //     [
      //       { label: "Carterinha", path: `${jsonRoute.Operacional}/${jsonRoute.MigracaoCarterinha}` },
      //       { label: "Representante", path: `${jsonRoute.Operacional}/${jsonRoute.MigracaoRepresentante}` },
      //       { label: "Plano", path: `${jsonRoute.Operacional}/${jsonRoute.MigracaoPlano}` },
      //       { label: "Colaborador", path: `${jsonRoute.Operacional}/${jsonRoute.MigracaoColaborador}` },
      //       { label: "Fornecedor", path: `${jsonRoute.Operacional}/${jsonRoute.MigracaoFornecedor}` },
      //       { label: "Vigência", path: `${jsonRoute.Operacional}/${jsonRoute.MigracaoVigencia}` },
      //     ]
      // },
      // { label: "Plano/Serviço", path: `${jsonRoute.Operacional}/${jsonRoute.CadastroPlanos}` },
      // { label: "Representante",  path:`${jsonRoute.Operacional}/${jsonRoute.CadastroRepresentante}` },
      // { label: "Cliente",  path:`${jsonRoute.Operacional}/${jsonRoute.CadastroCliente}` },
      // { label: "Fluxo de Trabalho", path: `${jsonRoute.Operacional}/${jsonRoute.Kanban}` },
    ],
  /*MANUTENCAO: [
  ],*/
};

const UserMenu = ({ menuAberto, setMenuAberto, isMobile }) => {
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
  const userMenuRef = useRef(null);

  const areaModules = getCurrentAreaModules();

  const getFilteredMenuItems = () => {
    return ROTAS_DA_AREA_OPERADORA.filter(item =>
      areaModules.includes(item.module)
    );
  };

  const getMenuIcon = (module) => {
    const iconMap = {
      'home': 'fas fa-home',
      'seguranca': 'fas fa-shield-alt',
      'configuracoes': 'fas fa-cogs',
      'relatorios': 'fas fa-chart-bar',
      'mensagens': 'fas fa-envelope',
      'operacional': 'fas fa-tools',
      'financeiro': 'fas fa-dollar-sign',
      'manutencao': 'fas fa-wrench',
    };
    return iconMap[module] || 'fas fa-circle';
  };

  const temPermissao = useCallback(
    (ordemPermissao) => {
      if (!permissoes_ordem || !permissoes_ordem.AREA_OPERADORA_ROOT)
        return false;
      if (!permissoes || !permissoes[permissoes_ordem.AREA_OPERADORA_ROOT])
        return false;
      return !!permissoes[ordemPermissao];
    },
    [permissoes, permissoes_ordem]
  );

  const handleNavigate = useCallback(
    (link, options) => {
      const rotaDestinoId = ROTAS_DA_AREA_OPERADORA.find((r) =>
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
        link === `/${jsonRoute.AreaOperadora}` ||
        link === `/${jsonRoute.AreaOperadora}/`;
      const normalizedCurrentPath =
        currentPath.endsWith("/") && currentPath.length > 1
          ? currentPath.slice(0, -1)
          : currentPath;

      if (
        (isHome
          ? normalizedCurrentPath === link.replace(/\/$/, "")
          : currentPath === link || currentPath === link.replace(/\/$/, "")) &&
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

    const basePathDaArea = `/${jsonRoute.AreaOperadora}`;

    if (!temPermissao(permissoes_ordem.AREA_OPERADORA_ROOT)) {
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
        navigate(`/${jsonRoute.AreaOperadora}`, { replace: true });
        setTimeout(() => {
          hideLoader();
        }, 100);
      }
    } else if (currentPath.startsWith(basePathDaArea)) {
      let rotaAtualMapeada = false;
      let ordemDaRotaAtual = null;

      for (const rotaInfo of ROTAS_DA_AREA_OPERADORA) {
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
        navigate(`/${jsonRoute.AreaOperadora}`, { replace: true });
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
    !temPermissao(permissoes_ordem.AREA_OPERADORA_ROOT)
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
    CONFIGURACOES: "Configurações",
    FINANCEIRO: "Financeiro",
    OPERACIONAL: "Operacional",
    SEGURANCA: "Segurança",
    MANUTENCAO: "Manutenção"
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
          if (item.path.startsWith(jsonRoute.AreaOperadora)) {
            handleNavigate(`/${item.path}`);
          } else {
            handleNavigate(`/${jsonRoute.AreaOperadora}/${item.path}`);
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
              handleNavigate(`/${jsonRoute.AreaOperadora}/`, { replace: true })
            }
            className={`${currentPath == `/${jsonRoute.AreaOperadora}`
              ? styles.menuItemActive
              : ""
              } ${styles.menuItem}`}
          >
            <i className="fas fa-home" />
          </a>
        </Tooltip>
        {getFilteredMenuItems().map((item) => {
          const permissionKey = item.id;
          const tooltipText = formatTooltipText(item.id.replace('AREA_OPERADORA_', '').replace('_', ' '));

          if (!temPermissao(permissoes_ordem[permissionKey])) return null;

          const hasSubmenu = ['FINANCEIRO', 'CONFIGURACOES', 'OPERACIONAL', 'SEGURANCA', 'MANUTENCAO'].includes(item.module.toUpperCase());

          return (
            <Tooltip key={item.id} text={tooltipText} position="right">
              <a
                onClick={hasSubmenu ? (e) => abrirSubmenu(e, item.module.toUpperCase()) : () => handleNavigate(`/${jsonRoute.AreaOperadora}/${item.path}`)}
                className={`${currentPath.includes(`/${jsonRoute.AreaOperadora}/${item.path}`)
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

export default UserMenu;
