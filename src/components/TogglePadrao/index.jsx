import React from 'react';
import styles from './styles.module.css';

const TogglePadrao = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  width = "auto",
  option1 = "Sim",
  option2 = "Não",
  size = "medium"
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={styles.toggleContainer} style={{ width }}>
      {label && <span className={styles.labelText}>{label}</span>}
      
      <div className={`${styles.slidingToggleContainer} ${styles[`size${size}`]}`}>
        <div 
          className={`${styles.slidingContent} ${checked ? styles.slidingContentActive : ''}`}
        >
          <div 
            className={styles.option}
          >
            {option1}
          </div>
          <div 
            className={styles.option}
          >
            {option2}
          </div>
        </div>
        <span className={`${styles.toggleDivider} ${checked ? styles.toggleDividerActive : ''}`} />
        <button
          onClick={handleToggle}
          className={`${styles.toggleButton} ${disabled ? styles.disabled : ''}`}
          aria-label={`Toggle entre ${option1} e ${option2}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TogglePadrao;