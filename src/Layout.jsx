import React from 'react';
import { HeaderPadrao, FooterPadrao } from "./components";
import { Outlet, useLocation } from "react-router";
import { jsonRoute } from "./utils/json";

import { useModuleMap } from './context/ModuleMapContext';

function Layout({ children }) {
    const location = useLocation();
    const { resetModuleMap } = useModuleMap();

    // Lista de telas que não devem exibir HeaderPadrao e FooterPadrao
    // const telasComFooter = [
    //     jsonRoute.LoginOperadora,
    //     jsonRoute.Cliente_login,
    //     jsonRoute.Beneficiario_Login,
    //     jsonRoute.Representante_Login,
    //     jsonRoute.HomeOperadora,
    //     jsonRoute.HomeCliente,
    //     jsonRoute.HomeBeneficiario,
    //     jsonRoute.HomeRepresentante,
    // ];
    
    const telasSemHeader = [

    ];

    const deveExibirHeader = !telasSemHeader.some(tela => location.pathname.endsWith(tela));
    // const deveExibirFooter = telasComFooter.some(tela => location.pathname.endsWith(tela));

    return (
        <>
            {deveExibirHeader && <HeaderPadrao onMenuOpen={resetModuleMap} />}
            <Outlet />
            {children}
            {/* {deveExibirFooter && <FooterPadrao />} */}
        </>
    );
}

export default Layout;