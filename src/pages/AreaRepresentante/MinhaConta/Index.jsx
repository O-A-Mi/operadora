import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import styles from "./styles.module.css";
import UserMenu from "./userMenu";
import { jsonRoute } from "../../../utils/json";
import ModuleMap from "./ModuleMap";
import { useModuleMap } from '../../../context/ModuleMapContext';
import { useArea } from '../../../context/AreaContext';

const MinhaContaRepresentante = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuAberto, setMenuAberto] = useState(true);
  const [rotaTelas, setRotaTelas] = useState([]);
  const { showModuleMap, selectedModule, setShowModuleMap, setSelectedModule, resetModuleMap } = useModuleMap();
  const { setArea } = useArea();
  
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const resizeTimeout = useRef(null);
  const sidebarRef = useRef(null);
  const navigationTimeout = useRef(null);

  useEffect(() => {
    setArea('AREA_REPRESENTANTE');
  }, []);

  const handleRotaTelas = useMemo(() => () => {
    const currentRoute = location.pathname;
    const partesDaRota = currentRoute.split('/').filter(Boolean);
    
    if (JSON.stringify(rotaTelas) !== JSON.stringify(partesDaRota)) {
      setRotaTelas(partesDaRota.map(item => ({ name: item })));
    }
  }, [location.pathname, rotaTelas]);

  useEffect(() => {
    if (isMobile) return;
    handleRotaTelas();
  }, [location.pathname]);

  useEffect(() => {
    const isHomePage = currentPath === `/${jsonRoute.Representante_Area}`;
    const fromModuleMap = sessionStorage.getItem('fromModuleMap');

    if (fromModuleMap === 'true' && !isHomePage && showModuleMap) {
      resetModuleMap();
      sessionStorage.removeItem('fromModuleMap');
    }
  }, [currentPath, showModuleMap, resetModuleMap]);

  useEffect(() => {
    if (isMobile) return;
    handleRotaTelas();

    const areaRepresentanteContent = document.querySelector(`.${styles.areaRepresentanteContent}`);
    const pageTitle = document.querySelector(`.${styles.pageTitle}`);
    const sidebarToggleButton = document.querySelector(`.${styles.sidebarToggleButton}`);
    const pageRoute = document.querySelector(`.${styles.pageRoute}`);
    const headerSection = document.querySelector(`.${styles.headerSection}`);
    const mainSection = document.querySelector(`.${styles.mainSection}`);

    if (!pageTitle || !sidebarToggleButton || !headerSection || !mainSection || !sidebarRef.current) {
        return;
    }

    const sidebarWidth = sidebarRef.current.offsetWidth || 0;
    const areaRepresentanteContentWidth = (areaRepresentanteContent.offsetWidth || 0) - 28 * 2;
    const gap = 24;
    const totalOffset = sidebarWidth + gap;

    if (menuAberto) {
        if (sidebarToggleButton) sidebarToggleButton.style.left = `${pageTitle.offsetWidth - sidebarToggleButton.offsetWidth}px`;
        if (pageRoute) pageRoute.style.paddingLeft = '';
        if (headerSection) {
            headerSection.style.transform = '';
            headerSection.style.width = '';
        }
        if (mainSection) {
            mainSection.style.transform = '';
            mainSection.style.width = '';
        }
        if(sidebarRef.current) sidebarRef.current.style.transform = 'translateX(0)';
    } else {
        if (sidebarToggleButton) sidebarToggleButton.style.left = `${totalOffset}px`;
        if (pageRoute) pageRoute.style.paddingLeft = `${sidebarToggleButton.offsetWidth + gap / 2}px`;
        if (headerSection) {
            headerSection.style.transform = `translateX(-${totalOffset}px)`;
            headerSection.style.width = `calc(${areaRepresentanteContentWidth + totalOffset}px)`;
          }
          if (mainSection) {
            mainSection.style.transform = `translateX(-${totalOffset}px)`;
            mainSection.style.width = `calc(${areaRepresentanteContentWidth + totalOffset}px)`;
        }
        if(sidebarRef.current) sidebarRef.current.style.transform = `translateX(-100%)`;
    }
  }, [menuAberto, isMobile]);

  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeout.current);
    resizeTimeout.current = setTimeout(() => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setMenuAberto(false);
      }
    }, 0);
  }, [isMobile, setIsMobile, setMenuAberto]);
    
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout.current);
        clearTimeout(navigationTimeout.current);
    }
  }, [handleResize]);

  useEffect(() => {
    const handleModuleClick = (event) => {
      const { module } = event.detail;
      if (isMobile) {
        setSelectedModule(module);
        setShowModuleMap(true);
        setMenuAberto(false);
      }
    };

    window.addEventListener('moduleClick', handleModuleClick);
    return () => {
      window.removeEventListener('moduleClick', handleModuleClick);
    };
  }, [isMobile, setSelectedModule, setShowModuleMap]);

  const renderRotaTelas = useMemo(() => {
    return rotaTelas
      .filter((item) => !/^\d+$/.test(item.name))
      .map((item, index, array) => {
        const routeKey = Object.keys(jsonRoute).find(
          (key) => jsonRoute[key].toLowerCase() === item.name.toLowerCase()
        );

        let path = `/${jsonRoute.Representante_Area}`;
        for (let i = 1; i <= index; i++) {
          const currentItem = rotaTelas[i];
          if (!/^\d+$/.test(currentItem.name)) {
            const currentRouteKey = Object.keys(jsonRoute).find(
              (key) => jsonRoute[key].toLowerCase() === currentItem.name.toLowerCase()
            );
            if (currentRouteKey) {
              path += `/${jsonRoute[currentRouteKey]}`;
            }
          }
        }

        const isFirst = index === 0;
        const isLast = index === array.length - 1;

        const homePath = `/${jsonRoute.Representante_Area}`;
        
        const itemNameLower = item.name.toLowerCase();
        
        let clickPath;
        if (isFirst) {
          clickPath = homePath;
        } 

        return (
          <div key={index} className={styles.pageRouteItem}>
            <span
              style={{ fontWeight: isLast ? "bold" : "normal" }}
              onClick={
                !isLast
                  ? () => navigate(clickPath, { replace: true })
                  : undefined
              }
            >
              {item.name === "novo" ? "Novo" : item.name.replace(/-/g, " ")}
            </span>
            {!isLast && (
              <i className="fa fa-chevron-right" aria-hidden="true" />
            )}
          </div>
        );
      });
  }, [rotaTelas, navigate]);

  const handleBackToMenu = useCallback(() => {
    resetModuleMap();
    setMenuAberto(true);
    navigate(`/${jsonRoute.Representante_Area}`);
  }, [resetModuleMap, navigate]);

  const handleMenuOpen = useCallback(() => {
    resetModuleMap();
  }, [resetModuleMap]);

  const headerClasses = [
    styles.headerSection,
    isMobile && menuAberto ? styles.hidden : "",
    isMobile ? styles.mobileHeader : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sidebarContainerClasses = [
    styles.sidebarColumn,
    isMobile ? styles.mobileSidebar : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mainSectionClasses = [styles.mainSection].filter(Boolean).join(" ");

  return (
    <div className={styles.areaRepresentanteContainer}>
      {!isMobile && (
        <aside className={sidebarContainerClasses} ref={sidebarRef}>
          <UserMenu
            menuAberto={menuAberto}
            setMenuAberto={setMenuAberto}
            isMobile={isMobile}
          />
        </aside>
      )}
      <div className={styles.areaRepresentanteContent} id="areaRepresentanteContent">
        {!showModuleMap && (
          <header className={headerClasses}>
            <div className={styles.pageRouteContainer}>
              <div className={styles.pageRoute}>{renderRotaTelas}</div>
            </div>
          </header>
        )}
        <main className={mainSectionClasses}>
          {!showModuleMap && (
            <div className={styles.contentColumn}>
              <Outlet />
            </div>
          )}
          
          {isMobile && showModuleMap && selectedModule && (
            <ModuleMap
              module={selectedModule}
              onBack={handleBackToMenu}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default MinhaContaRepresentante;