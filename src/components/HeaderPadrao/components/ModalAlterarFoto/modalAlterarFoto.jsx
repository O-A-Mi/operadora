import React, { useState, useRef } from 'react';
import styles from './styles.module.css';
import { useProfile } from '../../../../context/ProfileContext'; 
import Tooltip from "../../../../components/TooltipPadrao";

const ModalAlterarFoto = ({ closeModal }) => {
  const { setProfileImage } = useProfile();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if (selectedImage) {
      setProfileImage(selectedImage);
      
      console.log('Foto selecionada:', selectedImage);
    }
    closeModal();
  };

  const handleCloseClick = (event) => {
    if (event.target.classList.contains(styles.modalBackdrop)) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleCloseClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Alterar Foto de Usuário</h2>
          <button className={styles.closeButton} onClick={closeModal}>&times;</button>
        </div>
         <div className={styles.instructions}>
            <p className={styles.instructionsParag}>Selecione uma imagem PNG, JPG ou JPEG para alterar sua foto de usuário.</p>
            <br/>
            Tamanho máximo do arquivo: 5MB.
          </div>
        <div className={styles.modalBody}>
          <div className={styles.imagePreviewContainer}>
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className={styles.imagePreview} />
            ) : (
              <div className={styles.imagePlaceholder}></div>
            )}
          </div>
          <div className={styles.InputButtonPNG}>
            <button className={styles.addFileButton} onClick={handleButtonClick}>
              <i className="fas fa-upload"></i>
              Selecionar Foto
            </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
          />
            <div className={styles.modalFooter}>
              <Tooltip text="Salvar" position="top">
                  <button className={styles.submitButton} onClick={handleSubmit}>
                      <i className='fas fa-save'></i>
                  </button>
              </Tooltip>
              {/* <Tooltip text="Cancelar" position="top">
                  <button className={styles.cancelButton} onClick={closeModal}>
                      <i className='fas fa-times'></i>
                  </button>
              </Tooltip> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlterarFoto;