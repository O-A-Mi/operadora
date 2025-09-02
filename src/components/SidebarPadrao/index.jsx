import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import styles from "./styles.module.css";
import logo from "/images/logobranca.png";
import { useTheme } from "../../context/themeContext";
import { UsuarioContext } from "../../context/UsuarioContext";
import FooterPadrao from "../FooterPadrao";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 1000);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    localStorage.removeItem("userToken");
    // Usar o contexto de logout para redirecionamento automático
    const { handleLogout: contextLogout } = useContext(UsuarioContext);
    contextLogout(navigate);
  };

  const modules = [
    {
      icon: "fas fa-home",
      label: "Home",
      path: "/home",
    },
    {
      icon: "fas fa-address-card",
      label: "Atendimento",
      path: "/atendimento/dados-cliente",
    },
    {
      icon: "fas fa-search",
      label: "Consulta",
      path: "/consulta",
    },
  ];

  const actions = [
    {
      icon: "fas fa-lock",
      label: "Alterar Senha",
      path: "/alterar-senha",
    },
    {
      icon: "fas fa-sign-out-alt",
      label: "Sair",
      path: "/sair",
    },
  ];

  return (
    <div
      className={`${styles.sidebar} ${expanded ? styles.expanded : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={logo} alt="Logo Hermanos" className={styles.logo} />
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarModules}>
          {modules.map((module, index) => (
            <div
              key={index}
              className={`${styles.sidebarModulesItem} ${
                expanded ? styles.expanded : ""
              }`}
              onClick={() => handleNavigation(module.path)}
            >
              <i className={`${module.icon} ${styles.icon}`} />
              <span className={styles.label}>{module.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.sidebarActions}>
          <div
            className={`${styles.sidebarActionsItem} ${
              expanded ? styles.expanded : ""
            }`}
            onClick={toggleTheme}
          >
            <div className={styles.themeIconContainer}>
              <i
                className={`fas fa-moon ${styles.themeIcon} ${
                  styles.moonIcon
                } ${theme === "dark" ? styles.hidden : ""}`}
              />
              <i
                className={`fas fa-sun ${styles.themeIcon} ${styles.sunIcon} ${
                  theme === "light" ? styles.hidden : ""
                }`}
              />
            </div>
            <span className={styles.label}>Alterar Tema</span>
          </div>
          {actions.map((action, index) => (
            <div
              key={index}
              className={`${styles.sidebarActionsItem} ${
                expanded ? styles.expanded : ""
              }`}
              onClick={() =>
                action.label === "Sair"
                  ? handleLogout()
                  : handleNavigation(action.path)
              }
            >
              <i className={`${action.icon} ${styles.icon}`} />
              <span className={styles.label}>{action.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
