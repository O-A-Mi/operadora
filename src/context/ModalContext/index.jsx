import React from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import { BackscreenContext } from '../BackscreenContext';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
  const [modalState, setModalState] = useState({});
  const [modalContent, setModalContent] = useState({});

  const openModal = useCallback((modalName, content) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
    setModalContent(content);
    showBackscreen();
  }, [showBackscreen, setModalContent]);

  const closeModal = useCallback((modalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
    setModalContent({});
    hideBackscreen();
  }, [hideBackscreen, setModalContent]);

  const isModalOpen = (modalName) => !!modalState[modalName];

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal deve ser usado dentro de um modalProvider');
    }
    return context;
};