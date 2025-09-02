import React from 'react';
import { Outlet } from 'react-router';
import styles from './styles.module.css';

const Servicos = () => {
  return (
    <div className={styles.servicosContainer}>
      <div className={styles.servicosHeader}>
        <h3 className={styles.servicosTitle}>
          <i className="fa-solid fa-cogs"></i>
          Serviços
        </h3>
      </div>

      <div className={styles.subsectionContent}>
        <div className={`${styles.subsectionPanel} ${styles.expanded}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Servicos; 