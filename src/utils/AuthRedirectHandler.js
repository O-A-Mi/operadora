import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { UsuarioContext } from '../context/UsuarioContext';

const AuthRedirectHandler = () => {
    const { usuarioLogado } = useContext(UsuarioContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (usuarioLogado) {
            const intendedRoute = sessionStorage.getItem('intendedRoute');
            const currentPath = location.pathname;

            if (intendedRoute && intendedRoute !== currentPath && !intendedRoute.includes('login')) {
                sessionStorage.removeItem('intendedRoute');
                // Antes de navegar, garantir que o route comece com '/'
                let route = intendedRoute;
                if (route && !route.startsWith('/')) {
                    route = '/' + route;
                }
                navigate(route);
            } else if (intendedRoute) {
                sessionStorage.removeItem('intendedRoute');
            }
        }
    }, [usuarioLogado, navigate, location.pathname]);

    return null;
};

export default AuthRedirectHandler; 