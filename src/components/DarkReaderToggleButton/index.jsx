import { useDarkReader } from "../../context/darkReaderContext";
import styles from "./styles.module.css";
import TooltipPadrao from "../TooltipPadrao";

const DarkReaderToggleButton = ({ iconOnly }) => {
  const { enabled, toggle } = useDarkReader();

  const tooltipText = enabled ? "Tema claro" : "Tema escuro";

  return (
    <TooltipPadrao text={tooltipText} position="right">
      <button
        className={styles.themeToggleBtn}
        onClick={toggle}
        aria-label="Alternar modo escuro estilo Dark Reader"
        type="button"
        tabIndex={0}
      >
        <div className={styles.themeIconContainer}>
          <i
            className={`fas fa-moon ${styles.themeIcon} ${styles.moonIcon} ${enabled ? styles.active : ""}`}
          />
          <i
            className={`fas fa-sun-bright ${styles.themeIcon} ${styles.sunIcon} ${!enabled ? styles.active : ""}`}
          />
        </div>
        {!iconOnly && <span className={styles.label}>Tema</span>}
      </button>
    </TooltipPadrao>
  );
};

export default DarkReaderToggleButton;


