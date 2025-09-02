import React, { useState } from 'react';
import styles from './styles.module.css';

const ModalAnexos = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('upload');

  const tabs = [
    { id: 'upload', name: 'Upload de Arquivos', icon: 'fa-solid fa-upload' },
    { id: 'download', name: 'Download de Anexos', icon: 'fa-solid fa-download' }
  ];

  const handleSelectFiles = () => {
    
  };

  const handleStartUpload = () => {
    
  };

  const handleDownloadAll = () => {
    
  };

  const handleFechar = () => {
    setActiveTab('upload');
    onClose();
  };

  const isActiveTab = (tab) => {
    return activeTab === tab.id;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
  };

  const getActiveTabName = () => {
    const activeTabObj = tabs.find(tab => isActiveTab(tab));
    return activeTabObj ? activeTabObj.name : tabs[0].name;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-paperclip"></i>
            <h2 className={styles.modalTitle}>Anexos</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.subsectionButtons}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.subsectionButton} ${
                  isActiveTab(tab) ? styles.active : ''
                }`}
                onClick={() => handleTabClick(tab)}
              >
                <i className={tab.icon} />
                {tab.name}
              </button>
            ))}
          </div>

          <div className={styles.subsectionContent}>
            <div className={styles.subsectionTitleContainer}>
              <h4 className={styles.Title}>{getActiveTabName()}</h4>
            </div>
            
            <div className={styles.subsectionPanel}>
              {activeTab === 'upload' ? (
                <div className={styles.modalForm}>
                  <div className={styles.actionButtons}>
                    <button className={styles.selectButton} onClick={handleSelectFiles}>
                      <i className="fa-solid fa-folder"></i>
                      Selecionar Arquivos
                    </button>
                    <button className={styles.uploadButton} onClick={handleStartUpload}>
                      <i className="fa-solid fa-upload"></i>
                      Iniciar Upload (Tamanho: 5MB; Formato: .png, .pdf)
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.downloadSection}>
                  <div className={styles.actionButtons}>
                    <button className={styles.downloadButton} onClick={handleDownloadAll}>
                      <i className="fa-solid fa-download"></i>
                      Baixar Todos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default ModalAnexos; 