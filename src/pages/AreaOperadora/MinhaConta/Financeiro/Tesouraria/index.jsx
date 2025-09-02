import React from 'react';
import { Outlet, useLocation } from 'react-router';
import styles from './styles.module.css';

const Tesouraria = () => {
  const location = useLocation();
  
  const isSubRoute = location.pathname.includes('/competencia/') ||
                     location.pathname.includes('/fluxo-caixa/') ||
                     location.pathname.includes('/contas-a-receber/') ||
                     location.pathname.includes('/contas-a-pagar/') ||
                     location.pathname.includes('/comissao/') ||
                     location.pathname.includes('/dre/');

  return (
    <div className={styles.tesourariaContainer}>
      {!isSubRoute && (
        <div className={styles.tesourariaHeader}>
          <h3 className={styles.tesourariaTitle}>
            <i className="fa-solid fa-vault"></i>
            Tesouraria
          </h3>
        </div>
      )}

      <div className={styles.subsectionContent}>
        <div className={`${styles.subsectionPanel} ${styles.expanded}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Tesouraria; 