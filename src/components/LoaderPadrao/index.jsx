"use client"
import React from 'react';
import { useLoader } from '../../context';
import styles from './styles.module.css';

const LoaderPadrao = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContet}>
        <img 
          src="/operadora/svg/logo_operadora_color.svg" 
          alt="Logo" 
          className={styles.loaderLogo}
        />
      </div>
    </div>
  );
};

export default LoaderPadrao;
