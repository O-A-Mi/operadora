import React from 'react';
import { Outlet } from 'react-router';
import styles from './styles.module.css';

const Banco = () => {
  return (
    <div className={styles.bancoContainer}>
      <div className={styles.bancoHeader}>
        <h3 className={styles.bancoTitle}>
          <i className="fa-solid fa-university"></i>
          Banco
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

export default Banco; 