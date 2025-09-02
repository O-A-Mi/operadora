import React from 'react';
import { useEffect } from 'react';
import './assets/icons/css/all.css';
import './assets/dialog-ui/dialog.css';
import { BrowserRouter } from "react-router";
import "./utils/functions.js";
import './app.css' 
import Layout from "./Layout";
import ProjectRoutes from "./Routes";
import { UsuarioProvider, BackscreenProvider, LoaderProvider, ModalProvider, ModuleMapProvider, AreaProvider } from './context';
import { Provider as JotaiProvider } from 'jotai';
import AuthRedirectHandler from './utils/AuthRedirectHandler.js';
import LoaderPadrao from './components/LoaderPadrao/index.jsx';
import { jsonRoute } from './utils/json.js';
import { ThemeProvider } from './context/themeContext';
import { DarkReaderProvider } from './context/darkReaderContext';
import { ProfileProvider } from './context/ProfileContext';

function App() {
    useEffect(() => {
        const currentPath = window.location.pathname + window.location.search + window.location.hash;
        const basename = `/operadora`;
        let pathWithoutBasename = currentPath;

        if (currentPath.startsWith(basename + '/')) {
            pathWithoutBasename = currentPath.substring(basename.length);
        } else if (currentPath === basename) {
            pathWithoutBasename = "/" + window.location.search + window.location.hash;
        } else {
            window.location.pathname = 'operadora/login-operadora'
        }

        const nonIntendedPaths = [
            jsonRoute.Cliente_Home,
            jsonRoute.Cliente_Login,
            jsonRoute.Representante_Login,
            jsonRoute.Entidade_Login,
            jsonRoute.LoginOperadora,
            jsonRoute.Consultor_Login
        ];

        const isNonIntended = nonIntendedPaths.some(p => pathWithoutBasename.startsWith(p));

        if (pathWithoutBasename && !isNonIntended) {
            sessionStorage.setItem('intendedRoute', pathWithoutBasename);
        }
    }, []);

    return (
    <ProfileProvider>
        <ThemeProvider>
            <JotaiProvider>
                <UsuarioProvider>
                    <BackscreenProvider>
                        <ModalProvider>
                            <LoaderProvider>
                                <ModuleMapProvider>
                                    <AreaProvider>
                                        <BrowserRouter basename='/operadora'>
                                            <DarkReaderProvider>
                                                <LoaderPadrao />
                                                <AuthRedirectHandler />
                                                <Layout>
                                                    <ProjectRoutes />
                                                </Layout>
                                            </DarkReaderProvider>
                                        </BrowserRouter>
                                    </AreaProvider>
                                </ModuleMapProvider>
                            </LoaderProvider>
                        </ModalProvider>
                    </BackscreenProvider>
                </UsuarioProvider>
            </JotaiProvider>
        </ThemeProvider>
    </ProfileProvider>
    );
}

export default App;
