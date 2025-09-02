 import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import styles from "./styles.module.css";
import UserMenu from "./userMenu";
import { jsonRoute } from "../../../utils/json";
import HomeCliente from "../HomeCliente";
import { useArea } from '../../../context/AreaContext';
 
 const Operadora_MinhaConta = () => {
     const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuAberto, setMenuAberto] = useState(true);
  const [rotaTelas, setRotaTelas] = useState([]);
  const { setArea } = useArea();

     useEffect(() => {
    setArea('AREA_CLIENTE');
  }, []);
 
   const navigate = useNavigate();
   const location = useLocation();
   const currentPath = location.pathname;
 
   const resizeTimeout = useRef(null);
   const sidebarRef = useRef(null);
   const navigationTimeout = useRef(null);
 

 
   useEffect(() => {
     if (isMobile) return;
     const currentRoute = location.pathname;
     const partesDaRota = currentRoute.split("/").filter(Boolean);
     setRotaTelas(partesDaRota.map((item) => ({ name: item })));
   }, [isMobile, location.pathname]);
 
    
 
    const handleResize = useCallback(() => {
     clearTimeout(resizeTimeout.current);
     resizeTimeout.current = setTimeout(() => {
       const mobile = window.innerWidth < 1024;
       setIsMobile(mobile);
       if (mobile) {
         setMenuAberto(false);
       }
     }, 0);
    }, []);
 
    useEffect(() => {
     window.addEventListener("resize", handleResize);
     handleResize();
      return () => {
       window.removeEventListener("resize", handleResize);
       clearTimeout(resizeTimeout.current);
       clearTimeout(navigationTimeout.current);
      };
    }, [handleResize]);
 
      
 
   const renderRotaTelas = useMemo(() => {

     return rotaTelas
       .filter((item) => !/^\d+$/.test(item.name))
       .map((item, index, array) => {
         const routeKey = Object.keys(jsonRoute).find(
           (key) => jsonRoute[key].toLowerCase() === item.name.toLowerCase()
         );
 
         let path = `/${jsonRoute.Operadora_MinhaConta}`;
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
 
         const homePath = `/${jsonRoute.Operadora_MinhaConta}`;
         
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
      setMenuAberto(true);
      navigate(`/${jsonRoute.Operadora_MinhaConta}`);
    }, [navigate]);

    const handleMenuOpen = useCallback(() => {
      // Não precisa fazer nada específico
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
         <header className={headerClasses}>
           <div className={styles.pageRouteContainer}>
             <div className={styles.pageRoute}>{renderRotaTelas}</div>
           </div>
         </header>
         <main className={mainSectionClasses}>
           <div className={styles.contentColumn}>
             {currentPath == `/${jsonRoute.Operadora_MinhaConta}` ? (
               <HomeCliente />
             ) : (
               <Outlet />
             )}
           </div>
         </main>
       </div>
     </div>
    );
 };
 
 export default Operadora_MinhaConta;