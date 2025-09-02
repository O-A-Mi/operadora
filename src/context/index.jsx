import React from 'react';
import { BackscreenProvider, BackscreenContext } from "./BackscreenContext";
import { UsuarioProvider, UsuarioContext } from "./UsuarioContext";
import { LoaderProvider, useLoader } from "./LoaderContext" 
import { ModalProvider, useModal } from "./ModalContext" 
import { ModuleMapProvider } from './ModuleMapContext';
import { AreaProvider, useArea } from './AreaContext';

export { 
    BackscreenProvider, 
    BackscreenContext, 
    UsuarioProvider, 
    UsuarioContext,
    LoaderProvider,
    useLoader,
    ModalProvider,
    useModal,
    ModuleMapProvider,
    AreaProvider,
    useArea,
};