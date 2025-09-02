import React from 'react';
import { Outlet, useLocation } from 'react-router';
import styles from './styles.module.css';

const Competencia = () => {
  const location = useLocation();
  
  const isSubRoute = location.pathname.includes('/fechamento') ||
                     location.pathname.includes('/abertura');

  return (
    <div className={styles.competenciaContainer}>
      {!isSubRoute && (
        <h4 className={styles.competenciaTitle}>
          <i className="fa-solid fa-calendar-alt"></i>
          Competência
        </h4>
      )}
      <div className={styles.subsectionContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Competencia; 