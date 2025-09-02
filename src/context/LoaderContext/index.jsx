import React from 'react';
import { createContext, useState, useContext, useCallback } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const showLoader = useCallback(() => {
        setIsLoading(true);
    }, []);

    const hideLoader = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader deve ser usado dentro de um LoaderProvider');
    }
    return context;
};