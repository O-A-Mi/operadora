import React, { useEffect, useState } from 'react';
import { UseInputPadrao } from "../../../../../../../components/InputPadrao";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router';
import { StatusMock } from "../../../../../../../utils/mockConf";
import TogglePadrao from "../../../../../../../components/TogglePadrao";

const Status = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state?.id;

    const [formData, setFormData] = useState({
        descricao: '',
        tipo: '',
        cor: '#000000',
        padrao: 'NÃO',
        inativarCallCenter: 'NÃO',
        desabilitarTela: 'NÃO',
        visualizaInadimplentePropostaContrato: 'NÃO',
        visualizaInadimplenteFI: 'NÃO',
        congelamentoP: 'NÃO',
        mudarStatusAtivo: 'NÃO'
    });

    const carregarDadosParaEdicao = (id) => {
        const dados = StatusMock.Status.tabela.find(item => item.id === id);
        if (dados) {
            setFormData(dados);
        } else {
            setFormData({
                descricao: '',
                tipo: '',
                cor: '#000000',
                padrao: 'NÃO',
                inativarCallCenter: 'NÃO',
                desabilitarTela: 'NÃO',
                visualizaInadimplentePropostaContrato: 'NÃO',
                visualizaInadimplenteFI: 'NÃO',
                congelamentoP: 'NÃO',
                mudarStatusAtivo: 'NÃO'
            });
        }
    };

    useEffect(() => {
        if (id) {
            carregarDadosParaEdicao(id);
        } else {
            setFormData({
                descricao: '',
                tipo: '',
                cor: '#000000',
                padrao: 'NÃO',
                inativarCallCenter: 'NÃO',
                desabilitarTela: 'NÃO',
                visualizaInadimplentePropostaContrato: 'NÃO',
                visualizaInadimplenteFI: 'NÃO',
                congelamentoP: 'NÃO',
                mudarStatusAtivo: 'NÃO'
            });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? (checked ? 'SIM' : 'NÃO') : value
        }));
    };

    const handleSalvar = () => {
        alert('Dados salvos: ' + JSON.stringify(formData));
        navigate(-1, { state: { newStatus: formData } });
    };

    const handleVoltar= () => {
        navigate(-1);
    };

    const titulo = id ? 'Editar Status' : 'Novo Status';
    const subtitulo = id ? 'Altere os dados do status conforme necessário.' : 'Preencha os dados para criar um novo status.';

    return (
        <div className={styles.MainContent} key={id}>
            <div className={styles.HeaderCamp}>
                <h1 className='titlePadrao'>
                    <p className={styles.Header}><i className="fa-solid fa-pencil"></i>{titulo}</p>
                    
                </h1>
                <p className={styles.subHeader}>
                    <i className="fa-solid fa-info-circle"></i>
                    {subtitulo}
                </p>
            </div>
            <div className="moldura">
                <div className={styles.InputAlign}>
                    <UseInputPadrao
                        label="Descrição"
                        identifier="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        type="text"
                    />
                    <UseInputPadrao
                        label="Tipo"
                        identifier="tipo"
                        value={formData.tipo}
                        onChange={handleInputChange}
                        type="text"
                    />
                <div className={styles.colorInputContainer}>
                        <label className={styles.colorInputLabel} htmlFor="cor">Cor</label>
                        <input
                            id="cor"
                            type="color"
                            className={styles.colorInput}
                            value={formData.cor}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className={styles.toggleContainer}>
                    <div className={styles.toggleGroup}>
                        <TogglePadrao
                            label="Padrão"
                            checked={formData.padrao === 'SIM'}
                            onChange={(checked) => setFormData(prevData => ({ ...prevData, padrao: checked ? 'SIM' : 'NÃO' }))}
                            option1="Sim"
                            option2="Não"
                            size="small"
                        />
                    </div>
                    <div className={styles.toggleGroup}>
                        <TogglePadrao
                            label="Inativar no CallCenter"
                            checked={formData.inativarCallCenter === 'SIM'}
                            onChange={(checked) => setFormData(prevData => ({ ...prevData, inativarCallCenter: checked ? 'SIM' : 'NÃO' }))}
                            option1="Sim"
                            option2="Não"
                            size="small"
                        />
                    </div>
                    <div className={styles.toggleGroup}>
                        <TogglePadrao
                            label="Desabilitar Tela"
                            checked={formData.desabilitarTela === 'SIM'}
                            onChange={(checked) => setFormData(prevData => ({ ...prevData, desabilitarTela: checked ? 'SIM' : 'NÃO' }))}
                            option1="Sim"
                            option2="Não"
                            size="small"
                        />
                    </div>
                    <div className={styles.toggleGroup}>
                        <TogglePadrao
                            label="Visualiza na tela de Inadimplente - Status Proposta/Contrato"
                            checked={formData.visualizaInadimplentePropostaContrato === 'SIM'}
                            onChange={(checked) => setFormData(prevData => ({ ...prevData, visualizaInadimplentePropostaContrato: checked ? 'SIM' : 'NÃO' }))}
                            option1="Sim"
                            option2="Não"
                            size="small"
                        />
                    </div>
                    
                    <div className={styles.toggleGroup}>
                        <TogglePadrao
                            label="Visualiza na tela de Inadimplente - Status FI"
                            checked={formData.visualizaInadimplenteFI === 'SIM'}
                            onChange={(checked) => setFormData(prevData => ({ ...prevData, visualizaInadimplenteFI: checked ? 'SIM' : 'NÃO' }))}
                            option1="Sim"
                            option2="Não"
                            size="small"
                        />
                    </div>
                    <div className={styles.toggleGroup}>
                        <TogglePadrao
                            label="Congelamento P - Status e Tela"
                            checked={formData.congelamentoP === 'SIM'}
                            onChange={(checked) => setFormData(prevData => ({ ...prevData, congelamentoP: checked ? 'SIM' : 'NÃO' }))}
                            option1="Sim"
                            option2="Não"
                            size="small"
                        />
                    </div>
                    <div className={styles.toggleGroup}>
                        <TogglePadrao
                            label="Mudar Status da proposta para Ativo"
                            checked={formData.mudarStatusAtivo === 'SIM'}
                            onChange={(checked) => setFormData(prevData => ({ ...prevData, mudarStatusAtivo: checked ? 'SIM' : 'NÃO' }))}
                            option1="Sim"
                            option2="Não"
                            size="small"
                        />
                    </div>
                </div>
            </div>
                  <div className={styles.Footer}>
                <div className={styles.actionButtons}>
                <div className={styles.actionButtonsGroup}>
                    <button className={`${styles.actionButton} ${styles.actionButtonNovo}`}>
                    <i className="fa-solid fa-plus"></i>
                    Novo
                    </button>
                    <button type="submit" className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={handleSalvar}>
                    <i className="fa-solid fa-save"></i>
                    Gravar
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonRemover}`}>
                    <i className="fa-solid fa-trash"></i>
                    Remover
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleVoltar}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Voltar
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Status;