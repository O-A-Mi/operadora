import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../../context/themeContext";
import { useArea } from "../../context/AreaContext";
import { jsonRoute } from "../../utils/json";
import styles from "./styles.module.css";

const HamburguerMenu = ({ menuItems = [], onItemClick, isMobile = false, onModuleClick, onMenuOpen, showModules = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('userStatus');
      if (saved === 'online' || saved === 'invisivel') return saved;
      if (saved === 'ativo') return 'online';
      if (saved === 'inativo') return 'invisivel';
      return 'invisivel';
    } catch {
      return 'invisivel';
    }
  });
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { currentArea, getCurrentAreaModules } = useArea();

  const handleNavigation = (path) => {
    if (onItemClick) {
      onItemClick(path);
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const handleModuleClick = (module) => {
    const areaRoute = currentArea?.route ? jsonRoute[currentArea.route] : jsonRoute.AreaOperadora;
    
    if (currentArea?.id === 'AREA_CLIENTE' || window.location.pathname.includes(jsonRoute.Operadora_MinhaConta)) {
      const moduleRouteMap = {
        'listagem': jsonRoute.Listagem_Beneficiarios,
        'movimentacoes': jsonRoute.Movimentacoes,
        'relatorio': jsonRoute.Modulo_Relatorio,
        'dados_cliente': jsonRoute.Dados_do_Cliente,
        // 'financeiro': jsonRoute.Financeiro_Cliente // comentado temporariamente
      };
      
      const targetRoute = moduleRouteMap[module];
      if (targetRoute) {
        navigate(`/${jsonRoute.Operadora_MinhaConta}/${targetRoute}`);
        setIsOpen(false);
        return;
      }
    }
    
    if (currentArea?.id === 'AREA_BENEFICIARIO' || window.location.pathname.includes(jsonRoute.Beneficiario_MinhaConta)) {
      const moduleRouteMap = {
        'dados_beneficiario': jsonRoute.Dados_do_Beneficiario,
        //'questionario': jsonRoute.Questionario_de_Vida,
        //'perguntas': jsonRoute.Perguntas_Declaracao
      };
      
      const targetRoute = moduleRouteMap[module];
      if (targetRoute) {
        navigate(`/${jsonRoute.Beneficiario_MinhaConta}/${targetRoute}`);
        setIsOpen(false);
        return;
      }
    }
    
    if (currentArea?.id === 'AREA_REPRESENTANTE' || window.location.pathname.includes(jsonRoute.Representante_Area)) {
      const moduleRouteMap = {
        'fase_atendimento': jsonRoute.Representante_FaseAtendimento,
        'listagem_beneficiarios': jsonRoute.Representante_ListagemBeneficiario,
        'dados_representante': jsonRoute.Representante_DadosRepresentante,
        'financeiro': jsonRoute.Representante_Financeiro,
        'atendimentos': jsonRoute.Representante_Atendimentos,
        'lotes': jsonRoute.Representante_Lotes,
        'validar_paciente': jsonRoute.Representante_ValidarPaciente,
        'validar_token': jsonRoute.Representante_ValidarToken
      };
      
      const targetRoute = moduleRouteMap[module];
      if (targetRoute) {
        navigate(`/${jsonRoute.Representante_Area}/${targetRoute}`);
        setIsOpen(false);
        return;
      }
    }
    
    const directNavigationModules = ['mensagens', 'home', 'relatorios'];
    if (directNavigationModules.includes(module)) {
      const directModuleRouteMap = {
        'mensagens': jsonRoute.Mensagens,
        'home': jsonRoute.HomeOperadora,
        'relatorios': jsonRoute.Relatorios
      };
      
      const targetRoute = directModuleRouteMap[module];
      if (targetRoute) {
        navigate(`/${jsonRoute.AreaOperadora}/${targetRoute}`);
        setIsOpen(false);
        return;
      }
    }
    
    if (isMobile && onModuleClick) {
      onModuleClick(module);
      setIsOpen(false);
    } else {
      navigate(`/${areaRoute}/${module}`);
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    try {
      const saved = localStorage.getItem('userStatus');
      if (saved === 'online' || saved === 'invisivel') setStatus(saved);
      else if (saved === 'ativo') setStatus('online');
      else if (saved === 'inativo') setStatus('invisivel');
    } catch {}
    setIsOpen(!isOpen);
    if (!isOpen && typeof onMenuOpen === 'function') {
      onMenuOpen();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const listener = (e) => {
      const s = e?.detail?.status;
      if (s === 'online' || s === 'invisivel') setStatus(s);
    };
    window.addEventListener('userStatusChanged', listener);
    return () => window.removeEventListener('userStatusChanged', listener);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    try {
      const saved = localStorage.getItem('userStatus');
      if (saved === 'online' || saved === 'invisivel') setStatus(saved);
      else if (saved === 'ativo') setStatus('online');
      else if (saved === 'inativo') setStatus('invisivel');
    } catch {}
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const defaultActions = [];

  const getModuleItems = () => {
    const areaModules = getCurrentAreaModules();
    const areaRoute = currentArea?.route ? jsonRoute[currentArea.route] : jsonRoute.AreaOperadora;
    
    const moduleIconMap = {
      'home': 'fas fa-home',
      'listagem': 'fas fa-chart-bar',
      'movimentacoes': 'fas fa-cog',
      'relatorio': 'fas fa-clipboard-list',
      'dados_cliente': 'fa-solid fa-user',
      'financeiro': 'fas fa-dollar-sign',
      'seguranca': 'fas fa-shield-alt',
      'manutencao': 'fas fa-wrench',
      'configuracoes': 'fas fa-cog',
      'relatorios': 'fas fa-chart-bar',
      'mensagens': 'fa-solid fa-envelope',
      'operacional': 'fas fa-clipboard-list',
      'dados_beneficiario': 'fa-solid fa-user',
      //'questionario': 'fas fa-clipboard-list',
      //'perguntas': 'fas fa-question-circle',
      'consultas': 'fas fa-stethoscope',
      'atendimentos': 'fas fa-user-md',
      'dados_representante': 'fa-solid fa-user-md',
      'lotes': 'fas fa-boxes',
      'validar_paciente': 'fas fa-user-check',
      'validar_token': 'fas fa-key',
      'fase_atendimento': 'fas fa-clipboard-list',
      'listagem_beneficiarios': 'fas fa-users'
    };

    const moduleLabelMap = {
      'home': 'Home',
      'listagem': 'Listagem-beneficiários',
      'movimentacoes': 'Movimentações',
      'relatorio': 'Relatórios',
      'dados_cliente': 'Dados do Cliente',
      'financeiro': 'Financeiro',
      'seguranca': 'Segurança',
      'manutencao': 'Manutenção',
      'configuracoes': 'Configurações',
      'relatorios': 'Relatórios',
      'mensagens': 'Mensagens',
      'operacional': 'Operacional',
      'dados_beneficiario': 'Dados do Beneficiário',
      //'questionario': 'Questionário',
      //'perguntas': 'Perguntas',
      'consultas': 'Consultas',
      'atendimentos': 'Atendimentos',
      'dados_representante': 'Dados do Representante',
      'lotes': 'Lotes',
      'validar_paciente': 'Validar Paciente',
      'validar_token': 'Validar Token',
      'fase_atendimento': 'Fase de Atendimento',
      'listagem_beneficiarios': 'Listagem de Beneficiários'
    };

    const items = [
      {
        icon: "fas fa-home",
        label: "Home",
        action: "home",
        path: `/${areaRoute}`
      }
    ];

    areaModules.forEach(module => {
      if (module !== 'home') {
        const excludedModules = ['atendimentos', 'lotes', 'validar_paciente', 'validar_token'];
        if (excludedModules.includes(module)) {
          return;
        }
        
        items.push({
          icon: moduleIconMap[module] || 'fas fa-circle',
          label: moduleLabelMap[module] || module,
          action: "module",
          module: module
        });
      }
    });

    return items;
  };

  const moduleItems = getModuleItems();

  const allMenuItems = showModules ? [...defaultActions, ...moduleItems, ...menuItems] : [...defaultActions, ...menuItems];

  const isRepresentante = currentArea?.id === 'AREA_REPRESENTANTE' || window.location.pathname.includes(jsonRoute.Representante_Area);

  return (
    <div className={styles.hamburguerContainer}>
      <button
        ref={buttonRef}
        className={`${styles.hamburguerButton} ${isOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Menu de navegação"
        aria-expanded={isOpen}
      >
        <span className={styles.hamburguerLine}></span>
        <span className={styles.hamburguerLine}></span>
        <span className={styles.hamburguerLine}></span>
        {isMobile && isRepresentante && (
          <span className={`${styles.hamburguerStatusDot} ${status === 'online' ? styles.hamburguerStatusDotAtivo : styles.hamburguerStatusDotInativo}`}></span>
        )}
      </button>

      <div
        ref={menuRef}
        className={`${styles.dropdownMenu} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.menuHeader}>
          <span className={styles.menuTitle}>Menu</span>
        </div>

        <div className={styles.menuContent}>
          <div className={styles.menuSection}>
            <h3 className={styles.sectionTitle}>Navegação</h3>
            {allMenuItems.map((item, index) => (
              <button
                key={index}
                className={`${styles.menuItem}`}
                onClick={() => {
                  if (item.action === "alterarSenha") {
                    if (onItemClick) {
                      onItemClick("alterarSenha");
                    }
                  } else if (item.action === "alterarStatus") {
                    if (onItemClick) {
                      onItemClick("alterarStatus");
                    }
                  } else if (item.action === "logout") {
                    if (onItemClick) {
                      onItemClick("logout");
                    }
                  } else if (item.action === "home") {
                    handleNavigation(item.path);
                  } else if (item.action === "module") {
                    handleModuleClick(item.module);
                  } else if (item.path) {
                    handleNavigation(item.path);
                  } else if (onItemClick) {
                    onItemClick(item);
                    setIsOpen(false);
                  }
                }}
              >
                {item.statusDot ? (
                  <span className={styles.menuIconWrapper}>
                    <span className={`${styles.statusMenuIconDot} ${item.status === 'ativo' ? styles.statusMenuIconDotAtivo : styles.statusMenuIconDotInativo}`} />
                  </span>
                ) : (
                  <i className={`${item.icon} ${styles.menuIcon}`} />
                )}
                <span className={styles.menuLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default HamburguerMenu; 