import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";

const GAP = 8;

const FloatingSubmenu = ({
  isOpen,
  items,
  onClose,
  titulo = "Menu",
  position,
  userMenuRef,
  parentRef = null,
  isNested = false,
}) => {
  if (!isOpen) return null;

  const menuRef = useRef(null);
  const timeoutRef = useRef(null);
  const [finalPosition, setFinalPosition] = useState({ top: 0, left: 0 });
  const [isCalculated, setIsCalculated] = useState(false);
  const [nestedMenu, setNestedMenu] = useState(null);

  const calculatePosition = useCallback(() => {
    if (!isOpen || !menuRef.current || !userMenuRef.current || !position) {
      setIsCalculated(false);
      return;
    }

    const menuEl = menuRef.current;
    const sidebarRect = userMenuRef.current.getBoundingClientRect();
    const sidebarTop = sidebarRect.top;
    const sidebarBottom = sidebarRect.bottom;
    const sidebarHeight = sidebarBottom - sidebarTop;

    const left = parentRef
      ? parentRef.getBoundingClientRect().right + GAP
      : sidebarRect.right + GAP;

    const menuHeight = menuEl.scrollHeight;
    let top = position.top;
    let overflow = false;
    let maxheight = false;

    const menuBottom = top + menuHeight;

    if (menuBottom > sidebarBottom) {
      const diff = menuBottom - sidebarBottom;
      const adjustedTop = top - diff;

      if (adjustedTop <= sidebarTop) {
        top = sidebarTop;
        overflow = true;
        maxheight = sidebarHeight;
      } else {
        top = adjustedTop;
        overflow = true;
        maxheight = sidebarBottom - top;
      }
    }

    const newPosition = {
      top: Math.max(GAP, top),
      left: Math.max(GAP, left),
      overflow,
      maxheight,
    };

    setFinalPosition(newPosition);
    setIsCalculated(true);
  }, [isOpen, position, userMenuRef, parentRef]);

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          calculatePosition();
        });
      });

      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [isOpen, items.length, calculatePosition]);

  useEffect(() => {
    if (!isOpen || !menuRef.current || !userMenuRef.current) return;

    const handleClickOutside = (event) => {
      const menuEl = menuRef.current;
      const sidebarEl = userMenuRef.current;

      if (
        !menuEl.contains(event.target) &&
        !sidebarEl.contains(event.target)
      ) {
        onClose();
        setNestedMenu(null);
        clearTimeout(timeoutRef.current);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onClose, userMenuRef]);

  const abrirSubmenuAninhado = (event, item) => {
    if (!item.submenu) return;

    const rect = event.currentTarget.getBoundingClientRect();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setNestedMenu({
      isOpen: true,
      items: item.submenu,
      position: { top: rect.top, left: rect.right },
      parentRef: event.currentTarget,
      titulo: item.label,
    });
  };

  const fecharSubmenuAninhadoComDelay = () => {
    timeoutRef.current = setTimeout(() => {
      setNestedMenu(null);
      timeoutRef.current = null;
    }, 2000);
  };

  const cancelarFechamentoAninhado = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const fecharMenuComDelay = () => {
    if (isNested) {
      timeoutRef.current = setTimeout(() => {
        onClose();
        timeoutRef.current = null;
      }, 2000);
    }
  };
  

  const cancelarFechamentoMenu = () => {
    if (isNested && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  

  return ReactDOM.createPortal(
    <>
      <div
        ref={menuRef}
        className={styles.floatingMenu}
        onMouseEnter={cancelarFechamentoMenu}
        onMouseLeave={fecharMenuComDelay}
        style={{
          position: "fixed",
          top: `${finalPosition.top}px`,
          left: `${finalPosition.left}px`,
          overflowY: finalPosition.overflow ? "auto" : "hidden",
          maxHeight: finalPosition.maxheight
            ? `${finalPosition.maxheight}px`
            : "none",
          display: "block",
          visibility: isCalculated ? "visible" : "hidden",
        }}
      >
        <div className={styles.menuContent}>
          <div className={styles.menuHeader}>
            <span className={styles.menuTitle}>{titulo}</span>
          </div>
          <div className={styles.menuItems}>
          {items.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className={styles.menuItemWrapper}
              onMouseEnter={(e) => abrirSubmenuAninhado(e, item)}  
              onMouseLeave={() => item.submenu && fecharSubmenuAninhadoComDelay()}
            >
              <button
                className={styles.menuItem}
                onClick={(e) => {
                  e.preventDefault();  
                  e.stopPropagation();     
                  item.onClick?.();
                  if (!item.submenu) {
                    onClose();
                    setNestedMenu(null);
                  }
                }}
              >
                {item.label}
                {item.submenu && <span className={styles.arrowRight}>›</span>}
              </button>
            </div>
          ))}
        </div>
        </div>
      </div>

      {nestedMenu?.isOpen && (
        <div
          onMouseEnter={cancelarFechamentoAninhado}
          onMouseLeave={fecharSubmenuAninhadoComDelay}
        >
          <FloatingSubmenu
            isOpen={true}
            items={nestedMenu.items}
            onClose={() => setNestedMenu(null)}
            position={nestedMenu.position}
            userMenuRef={userMenuRef}
            titulo={nestedMenu.titulo}
            parentRef={nestedMenu.parentRef}
            isNested={true}
          />
        </div>
      )}
    </>,
    document.body
  );
};

export default FloatingSubmenu;
