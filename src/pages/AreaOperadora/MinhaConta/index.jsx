import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import styles from "./styles.module.css";
import UserMenu from "./userMenu";
import { jsonRoute } from "../../../utils/json";
import HomeOperadora from "../HomeOperadora";
import ModuleMap from "./ModuleMap";
import { useModuleMap } from '../../../context/ModuleMapContext';
import { useArea } from '../../../context/AreaContext';

const Operadora_MinhaConta = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuAberto, setMenuAberto] = useState(true);
  const [rotaTelas, setRotaTelas] = useState([]);
  const { showModuleMap, selectedModule, setShowModuleMap, setSelectedModule, resetModuleMap, setAreaId } = useModuleMap();
  const { setArea } = useArea();

  useEffect(() => {
    setArea('AREA_OPERADORA');
    setAreaId('AREA_OPERADORA');
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const resizeTimeout = useRef(null);
  const sidebarRef = useRef(null);
  const navigationTimeout = useRef(null);

  const handleRotaTelas = useCallback(() => {
    const currentRoute = location.pathname;
    const partesDaRota = currentRoute.split("/").filter(Boolean);

    setRotaTelas(partesDaRota.map((item) => ({ name: item })));
  }, [location.pathname]);

  useEffect(() => {
    if (isMobile) return;
    handleRotaTelas();
  }, [isMobile, location.pathname, handleRotaTelas]);

     useEffect(() => {
     const isHomePage = currentPath === `/${jsonRoute.AreaOperadora}`;
     const fromModuleMap = sessionStorage.getItem('fromModuleMap');

     if (fromModuleMap === 'true' && !isHomePage && showModuleMap) {
       resetModuleMap();
       sessionStorage.removeItem('fromModuleMap');
     }
   }, [currentPath, showModuleMap]);

  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeout.current);
    resizeTimeout.current = setTimeout(() => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setMenuAberto(false);
      }
    }, 0);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout.current);
      clearTimeout(navigationTimeout.current);
    };
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
   }, [isMobile]);

  const renderRotaTelas = useMemo(() => {
    const secoesParaSubsecoes = {
      'tesouraria': `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.FluxoCaixa}`,
      'competencia': `${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Fechamento}`,
      'servicos': `${jsonRoute.Financeiro}/${jsonRoute.Servicos}/${jsonRoute.Contrato}`,
      'banco': `${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.ArquivoRemessa}`
    };

    return rotaTelas
      .filter((item) => !/^\d+$/.test(item.name))
      .map((item, index, array) => {
        const routeKey = Object.keys(jsonRoute).find(
          (key) => jsonRoute[key].toLowerCase() === item.name.toLowerCase()
        );

        let path = `/${jsonRoute.AreaOperadora}`;
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

        const homePath = `/${jsonRoute.AreaOperadora}`;
        
        const itemNameLower = item.name.toLowerCase();
        const subsecaoPath = secoesParaSubsecoes[itemNameLower];
        
        let clickPath;
        if (isFirst) {
          clickPath = homePath;
        } else if (subsecaoPath) {
          clickPath = `/${jsonRoute.AreaOperadora}/${subsecaoPath}`;
        } else {
          clickPath = path;
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
     navigate(`/${jsonRoute.AreaOperadora}`);
   }, []);

  const handleMenuOpen = useCallback(() => {
    resetModuleMap();
  }, []);

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
    <div className={styles.areaEmpresaContainer}>
      {!isMobile && (
        <aside className={sidebarContainerClasses} ref={sidebarRef}>
          <UserMenu
            menuAberto={menuAberto}
            setMenuAberto={setMenuAberto}
            isMobile={isMobile}
          />
        </aside>
      )}
      <div className={styles.areaEmpresaContent} id="areaEmpresaContent">
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
              {currentPath == `/${jsonRoute.AreaOperadora}` ? (
                <HomeOperadora />
              ) : (
                <Outlet />
              )}
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

export default Operadora_MinhaConta;