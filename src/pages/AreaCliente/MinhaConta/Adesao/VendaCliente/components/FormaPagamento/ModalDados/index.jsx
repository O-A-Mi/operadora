import React, { useState } from "react";
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao/index.jsx';

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                        Confirmação de Dados
                    </h2>
                    <button onClick={onClose} className={styles.modalCloseButton}>
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const CardResumoModal = ({ show, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [nomeEmpresa, setNomeEmpresa] = useState("SPORT CLUBE CORINTHIANS PAULISTA");
    const [cnpjEmpresa, setCnpjEmpresa] = useState("123.456.789-10");
    const [protocoloANS, setProtocoloANS] = useState("00000.2025.06.23.000049");
    const [carteirinha, setCarteirinha] = useState("123456789");
    const [endereco, setEndereco] = useState("Corinthians Itaquera, 123");
    const [cep, setCep] = useState("01234-567");
    const [estado, setEstado] = useState("SP");
    const [contratante, setContratante] = useState("João Silva Santos");
    const [cpfContratante, setCpfContratante] = useState("123.456.789-10");
    const [status, setStatus] = useState("ATIVO");

    const [dataUltimaAtualizacao, setDataUltimaAtualizacao] = useState("14/01/2024");
    const [aviso, setAviso] = useState("Obrigatório atualizar (20 meses)");

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleConfirmar = () => {
        if (isEditing) {
            setIsEditing(false);
        }
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                        Confirmação de Dados
                    </h2>
                    <button onClick={onClose} className={styles.modalCloseButton}>
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.cardResumoContainer}>
                        <div className={styles.sectionTitleDados}>
                            <i className="fas fa-user-circle" style={{ marginRight: '8px' }}></i>
                            Dados do Cliente
                        </div>

                        <div className={styles.gridContainer}>
                            <UseInputPadrao
                                label="Empresa" type="text"
                                value={nomeEmpresa}
                                onChange={(e) => setNomeEmpresa(e.target.value)}
                                readOnly={!isEditing}
                               
                            />

                            <UseInputPadrao
                                label="CPF/CNPJ da Empresa"
                                type="text"
                                value={cnpjEmpresa}
                                onChange={(e) => setCnpjEmpresa(e.target.value)}
                                readOnly={!isEditing}
                                
                            />

                            <UseInputPadrao
                                label="Protocolo ANS"
                                type="text"
                                value={protocoloANS}
                                onChange={(e) => setProtocoloANS(e.target.value)}
                                readOnly={true}
                                
                            />

                            <UseInputPadrao
                                label="Carteirinha"
                                type="text"
                                value={carteirinha}
                                onChange={(e) => setCarteirinha(e.target.value)}
                                readOnly={!isEditing}
                           
                            />

                            <UseInputPadrao
                                label="Endereço"
                                type="text"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                readOnly={!isEditing}
                              
                            />

                            <UseInputPadrao
                                label="CEP"
                                type="text"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                readOnly={!isEditing}
                              
                            />

                            <UseInputPadrao
                                label="Estado"
                                type="text"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                readOnly={!isEditing}
                                
                            />

                            <UseInputPadrao
                                label="Contratante"
                                type="text"
                                value={contratante}
                                onChange={(e) => setContratante(e.target.value)}
                                readOnly={!isEditing}
                              
                            />

                            <UseInputPadrao
                                label="CPF do Contratante"
                                type="text"
                                value={cpfContratante}
                                onChange={(e) => setCpfContratante(e.target.value)}
                                readOnly={!isEditing}
                              
                            />

                            <UseInputPadrao
                                label="Status"
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                readOnly={true}
                               
                            />
                        </div>

                        <div className={styles.attentionBox}>
                            <p>
                                <i className="fas fa-calendar-alt"></i>
                                <strong>Última Atualização dos Dados:</strong>
                                <span className={styles.dataUltimaAtualizacao}>{dataUltimaAtualizacao}</span>
                            </p>
                            <p>
                                <strong>Status:</strong>
                                <i className="fas fa-exclamation-triangle" style={{ color: 'var(--laranja)' }}></i>
                                {aviso}
                            </p>
                        </div>

                        <div className={styles.buttonContainer}>
                            {!isEditing ? (
                                <>
                                    <button className={`${styles.infoButton} ${styles.editButton}`} onClick={handleEditToggle}>
                                        <i className="fas fa-edit" style={{ marginRight: '6px' }}></i> 
                                        Editar
                                    </button>
                                    <button className={`${styles.infoButton} ${styles.infoButtonConfirm}`} onClick={onClose}> 
                                        <i className="fas fa-check" style={{ marginRight: '6px' }}></i>
                                        Confirmar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className={`${styles.infoButton} ${styles.saveButton}`} onClick={handleConfirmar}>
                                        <i className="fas fa-save" style={{ marginRight: '6px' }}></i>
                                        Salvar
                                    </button>
                                    <button className={`${styles.infoButton} ${styles.cancelButton}`} onClick={handleEditToggle}>
                                        <i className="fas fa-times" style={{ marginRight: '6px' }}></i>
                                        Cancelar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardResumoModal;