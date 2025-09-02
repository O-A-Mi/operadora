import React, { createContext, useCallback, useEffect, useState } from 'react';
import { defaultUserInfo, userInfoAtom, dadosClienteAtom } from '../jotai';
import { useAtom } from 'jotai';
import { jsonRoute } from '../../utils/json';

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);
    const [, setDadosCliente] = useAtom(dadosClienteAtom);

    const identificarAreaAtual = useCallback((pathname) => {
        if (pathname.includes(jsonRoute.AreaOperadora)) {
            return `/${jsonRoute.Operadora_Login}`;
        } else if (pathname.includes(jsonRoute.AreaCliente)) {
            return `/${jsonRoute.Cliente_login}`;
        } else if (pathname.includes(jsonRoute.Beneficiario_Area)) {
            return `/${jsonRoute.Beneficiario_Login}`;
        } else if (pathname.includes(jsonRoute.Representante_Area)) {
            return `/${jsonRoute.Representante_Login}`;
        } else if (pathname.includes(jsonRoute.Consultor_Area)) {
            return `/${jsonRoute.Consultor_Login}`;
        } else {
            return `/${jsonRoute.Cliente_login}`;
        }
    }, []);

    const handleLogout = useCallback((navigateFunction, redirectTo = null) => {
        setUsuarioLogado(false);
        setUserInfo({ ...defaultUserInfo });
        sessionStorage.removeItem('usuarioLogado');
        sessionStorage.removeItem('userInfo');
        setDadosCliente(null);

        window.dispatchEvent(new CustomEvent('userLogout'));

        let rotaDestino = redirectTo;
        if (!rotaDestino) {
            const pathnameAtual = window.location.pathname;
            rotaDestino = identificarAreaAtual(pathnameAtual);
        }

        if (navigateFunction) {
            navigateFunction(rotaDestino, { replace: true });
        } else {
            window.location.href = rotaDestino;
        }
    }, [setUserInfo, setDadosCliente, identificarAreaAtual]);

    const handleLogin = () => {
        setUsuarioLogado(true);
        sessionStorage.setItem('usuarioLogado', 'true');
    };

    useEffect(() => {
        const storedUserIsLoggedIn = sessionStorage.getItem('usuarioLogado') === 'true';

        if (storedUserIsLoggedIn) {
            setUsuarioLogado(true);
        }

        setAuthLoading(false);
    }, [handleLogout]);

    return (
        <UsuarioContext.Provider value={{
            usuarioLogado,
            userInfo,
            setUserInfo,
            handleLogin,
            handleLogout,
            authLoading
        }}>
            {children}
        </UsuarioContext.Provider>
    );
};

export { UsuarioContext, UsuarioProvider };
