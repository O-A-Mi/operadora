import { useTheme } from "../../context/themeContext";
import styles from "./styles.module.css";
import TooltipPadrao from "../TooltipPadrao";

const ThemeToggleButton = ({ iconOnly }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipPadrao text="Alternar tema" position="right">
      <button
        className={styles.themeToggleBtn}
        onClick={toggleTheme}
        aria-label="Alternar tema claro/escuro"
        type="button"
        tabIndex={0}
      >
        <div className={styles.themeIconContainer}>
          <i
            className={`fas fa-moon ${styles.themeIcon} ${styles.moonIcon} ${theme === "dark" ? styles.active : ""}`}
          />
          <i
            className={`fas fa-sun-bright ${styles.themeIcon} ${styles.sunIcon} ${theme === "light" ? styles.active : ""}`}
          />
        </div>
        {!iconOnly && <span className={styles.label}>Alterar Tema</span>}
      </button>
    </TooltipPadrao>
  );
};

export default ThemeToggleButton;
