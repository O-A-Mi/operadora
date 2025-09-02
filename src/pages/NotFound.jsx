import React, { useContext, useEffect } from 'react';
import { jsonRoute } from '../utils/json';
import { useNavigate } from 'react-router';
import { useLoader, UsuarioContext } from '../context';
import './NotFound.css';

const NotFound = () => {
    const { hideLoader } = useLoader();
    const navigate = useNavigate();
    const { usuarioLogado } = useContext(UsuarioContext);

    const handleBack = () => {
        if (usuarioLogado) {
            navigate(-1);
        } else {
            navigate(`/${jsonRoute.Operadora_Login}`, { replace: true });
        }
    };

    useEffect(() => {
        hideLoader();
    }, [hideLoader]);

    return (
        <div className="not-found-container">
            <i className="fa-regular fa-face-frown not-found-icon"></i>
            <h1 className="not-found-title">Não conseguimos encontrar a página que procurava</h1>
            <button
                onClick={handleBack}
                className="not-found-button"
            >
                Voltar
            </button>
        </div>
    );
};

export default NotFound;