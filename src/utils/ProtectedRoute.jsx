import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { UsuarioContext } from '../context/UsuarioContext';
import { jsonRoute } from './json';

const ProtectedRoute = ({ children }) => {
    const { usuarioLogado, authLoading } = useContext(UsuarioContext);
    const location = useLocation();

    if (authLoading) return null;

    if (!usuarioLogado) {
        const path = location.pathname;

        if (!sessionStorage.getItem('intendedRoute')) {
            sessionStorage.setItem('intendedRoute', path + location.search + location.hash);
        }

        if (path.includes(jsonRoute.AreaOperadora)) {
            return <Navigate to={`/${jsonRoute.Operadora_Login}`} replace />;

        } else if (path.includes(jsonRoute.Operadora_MinhaConta)) {
            return <Navigate to={`/${jsonRoute.Cliente_login}`} replace />;

        } else if (path.includes(jsonRoute.Beneficiario_MinhaConta)) {
            return <Navigate to={`/${jsonRoute.Beneficiario_login}`} replace />;

        } else if (path.includes(jsonRoute.Consultor_Area)) {
            return <Navigate to={`/${jsonRoute.Consultor_Login}`} replace />;

        } else {
            return <Navigate to={`/${jsonRoute.Representante_Login}`} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;