import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

function GrupoBotoes({ actions }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef(null);

  const handleDropdown = (index, event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const dropdownWidth = 200;
  const dropdownHeight = 165; // aprox. altura do dropdown
  const spaceBottom = window.innerHeight - rect.bottom;
  const spaceTop = rect.top;

  // Calcula horizontal
  let left = rect.left;
  const spaceRight = window.innerWidth - rect.right;
  const spaceLeft = rect.left;
  if (spaceRight < dropdownWidth && spaceLeft > dropdownWidth) {
    left = rect.right - dropdownWidth;
  }

  // Calcula vertical
  let top;
  if (spaceBottom < dropdownHeight && spaceTop > dropdownHeight) {
    // abre para cima
    top = rect.top + window.scrollY - dropdownHeight;
  } else {
    // abre para baixo
    top = rect.bottom + window.scrollY;
  }

  setDropdownPosition({ x: left, y: top });
  setOpenDropdown(openDropdown === index ? null : index);
};


  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.grupoBotoes}>
      {actions.map((action, index) => (
        <div key={index} className={styles.botaoWrapper}>
          <button
            onClick={
              action.dropdown
                ? (e) => handleDropdown(index, e)
                : action.onClick
            }
            className={styles.botao}
            title={action.title}
            style={{
              borderRight: index === actions.length - 1 ? "none" : undefined,
              color: action.color ? action.color : undefined,
              cursor: action.cursor ? action.cursor : "pointer",
              bottom: "170px",
            }}
          >
            {action.icon && <i className={action.icon}></i>}
          </button>

          {/* DROPDOWN */}
          {action.dropdown && openDropdown === index && (
            <div
              className={styles.dropdownMenuFixed}
              style={{ top: dropdownPosition.y, left: dropdownPosition.x }}
              ref={dropdownRef}
            >
              {action.dropdown.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.dropdownItem}
                  onClick={() => {
                    item.onClick();
                    setOpenDropdown(null);
                  }}
                >
                  {item.icon && <i className={item.icon}></i>} {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GrupoBotoes;
