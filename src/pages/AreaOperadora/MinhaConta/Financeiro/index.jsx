import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../utils/json';

const Financeiro = () => {
  const navigate = useNavigate();
  const location = useLocation();



  const isSubRoute = location.pathname.includes('/tesouraria/') || 
                     location.pathname.includes('/cobranca/') ||
                     location.pathname.includes('/servicos/') ||
                     location.pathname.includes('/banco/') ||
                     location.pathname.includes('/lancamento/') ||
                     location.pathname.includes('/log-auditoria/');

  return (
    <div className={styles.financeiroContainer}>
      <div className={styles.sectionContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Financeiro; 