import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AreaContext = createContext();

export const useArea = () => {
  const context = useContext(AreaContext);
  if (!context) {
    throw new Error('useArea deve ser usado dentro de um AreaProvider');
  }
  return context;
};

export const AreaProvider = ({ children }) => {
  const [currentArea, setCurrentArea] = useState(null);

  const areas = {
    AREA_OPERADORA: {
      id: 'AREA_OPERADORA',
      name: 'AreaOperadora',
      modules: ['home', 'operacional', 'mensagens', 'configuracoes', 'relatorios', 'seguranca'],
      route: 'AreaOperadora'
    },
    AREA_CLIENTE: {
      id: 'AREA_CLIENTE', 
      name: 'AreaCliente',
      modules: ['listagem', 'movimentacoes', 'relatorio', 'dados_cliente', 'adesao'], // 'financeiro' comentado temporariamente
      route: 'Operadora_MinhaConta'
    },
    AREA_BENEFICIARIO: {
      id: 'AREA_BENEFICIARIO',
      name: 'AreaBeneficiario', 
      modules: ['dados_beneficiario'], // 'financeiro', 'questionario', 'perguntas' comentado temporariamente 
      route: 'Beneficiario_MinhaConta'
    },
    AREA_REPRESENTANTE: {
      id: 'AREA_REPRESENTANTE',
      name: 'AreaRepresentante',
      modules: ['venda', 'consulta','acompanhamento', 'dados_representante'], // 'financeiro' comentado temporariamente
      route: 'Representante_Area'
    }
  };

  const setArea = useCallback((areaId) => {
    setCurrentArea(areas[areaId] || null);
  }, []);

  const getAreaModules = useCallback((areaId) => {
    return areas[areaId]?.modules || [];
  }, []);

  const getCurrentAreaModules = useCallback(() => {
    return currentArea?.modules || [];
  }, [currentArea]);

  const value = useMemo(() => ({
    currentArea,
    areas,
    setArea,
    getAreaModules,
    getCurrentAreaModules
  }), [currentArea, setArea, getAreaModules, getCurrentAreaModules]);

  return (
    <AreaContext.Provider value={value}>
      {children}
    </AreaContext.Provider>
  );
}; 