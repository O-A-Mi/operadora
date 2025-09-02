import React from 'react';
import styles from './styles.module.css';

function CardPagamento({ payamentInfos, currentStep, steps, setCurrentStep }) {
    function handleStepAnterior() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    function handleStepProximo() {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    }

    return (
        <div className={styles.cardWrapper}>
            {payamentInfos.map((data) => (
                <div key={data.id} className={styles.cardContainer}>
                    <div className={styles.cardHeader}>
                        <div className={styles.numeroAtendimentoContainer}>
                            <span className={styles.numeroAtendimento}>Nº Proposta:</span>
                            <span className={styles.numeroAtendimentoValue}>
                                {data.proposal}
                            </span>
                        </div>
                        <div className={`${styles.protocoloContainer} ${styles.protocoloRow}`}>
                            <span className={styles.protocoloLabel}>Tipo:</span>
                            <span className={styles.protocoloValue}>
                                {data.type}
                            </span>
                        </div>
                    </div>

                    <div className={styles.cardContent}>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Contratante:</span>
                            <span className={styles.value}>{data.contratante || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>CPF do Contratante:</span>
                            <span className={styles.value}>{data.cpfContratante || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Rua:</span>
                            <span className={styles.value}>{data.rua || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>CEP:</span>
                            <span className={styles.value}>{data.cep || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Estado:</span>
                            <span className={styles.value}>{data.estado || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Contrato:</span>
                            <span className={styles.value}>{data.contrato || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Entidade:</span>
                            <span className={styles.value}>{data.entidade || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Plano:</span>
                            <span className={styles.value}>{data.plan || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Valor:</span>
                            <span className={`${styles.value} ${styles.valor}`}>
                                R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Vigência:</span>
                            <span className={styles.value}>{data.validity || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Beneficiários:</span>
                            <span className={styles.value}>{data.beneficiaries || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Situação:</span>
                            <span className={styles.value}>{data.situation || "Aguardando"}</span>
                        </div>
                        <div className={`${styles.infoRow} ${styles.statusRow}`}>
                            <span className={styles.label}>Status:</span>
                            <span className={styles.value}>{data.status || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Solicitante:</span>
                            <span className={styles.value}>{data.solicitante || "Aguardando"}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>CPF do Solicitante:</span>
                            <span className={styles.value}>{data.cpfSolicitante || "Aguardando"}</span>
                        </div>
                    </div>
                    
                    <div className={styles.cardFooter}>
                        <button onClick={handleStepAnterior} className={styles.infoButton}>
                            <i className="fa-solid fa-arrow-left" /> Voltar
                        </button>
                        <button onClick={handleStepProximo} className={styles.infoButton}>
                            Avançar <i className="fa-solid fa-arrow-right" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardPagamento;