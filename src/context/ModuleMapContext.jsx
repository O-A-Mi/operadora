import React, { createContext, useContext, useState, useCallback } from 'react';

const ModuleMapContext = createContext();

export const useModuleMap = () => {
  const context = useContext(ModuleMapContext);
  if (!context) {
    throw new Error('useModuleMap deve ser usado dentro de um ModuleMapProvider');
  }
  return context;
};

export const ModuleMapProvider = ({ children }) => {
  const [showModuleMap, setShowModuleMap] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentAreaId, setCurrentAreaId] = useState(null);

  const resetModuleMap = useCallback(() => {
    setShowModuleMap(false);
    setSelectedModule(null);
  }, []);

  const openModuleMap = useCallback((module, areaId = null) => {
    setSelectedModule(module);
    setCurrentAreaId(areaId);
    setShowModuleMap(true);
  }, []);

  const setAreaId = useCallback((areaId) => {
    setCurrentAreaId(areaId);
  }, []);

  const value = {
    showModuleMap,
    selectedModule,
    currentAreaId,
    resetModuleMap,
    openModuleMap,
    setShowModuleMap,
    setSelectedModule,
    setAreaId
  };

  return (
    <ModuleMapContext.Provider value={value}>
      {children}
    </ModuleMapContext.Provider>
  );
}; 