import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import styles from "./styles.module.css";

const InfoField = ({ label, value }) => {
    return (
        <div className={styles.infoField}>
            <div className={styles.infoLabel}>{label}</div>
            <div className={styles.infoValue}>{value}</div>
        </div>
    );
};

const Card = ({ title, icon, children }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                    <i className={icon}></i>
                    {title}
                </h3>
            </div>
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    );
};

const Resumo = () => {
    const {
        updateInfoGerais,
        reiniciarAtendimento,
        dadosAtendimento,
    } = {
        updateInfoGerais: () => console.log("Função updateInfoGerais simulada"),
        reiniciarAtendimento: () => console.log("Função reiniciarAtendimento simulada"),
        dadosAtendimento: { status: "EM ANDAMENTO" },
    };

    const navigate = useNavigate();

    useEffect(() => {
        updateInfoGerais({
            status: "FINALIZADO",
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    
        const scrollableElements = document.querySelectorAll(
            '[class*="container"], [class*="content"], [class*="wrapper"]'
        );
        scrollableElements.forEach((element) => {
            if (element.scrollTop > 0) {
                element.scrollTop = 0;
            }
        });
    
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    };

    const handleFecharChamado = () => {
        reiniciarAtendimento();
        localStorage.setItem("atendimento-progresso-maximo", "0");
        navigate("/atendimento/dados-cliente");
        [50, 150, 300, 600].forEach((delay) => {
            setTimeout(() => {
                scrollToTop();
            }, delay);
        });
    };

    const isChamadoFechado = dadosAtendimento.status === "FINALIZADO";

    const dadosCliente = {
        nome: "SPORT CLUBE CORINTHIANS PAULISTA",
        cpfCnpj: "123.456.789-10",
        cpfContratante: "123.456.789-10",
        rua: "Corinthians, Itaquera, 1910",
        cep: "01234-567",
        estado: "SP",
    };

    const dadosBeneficiario = {
        nome: "Não informado",
        cpf: "Não informado",
    };

    const dadosChamado = {
        tipoSolicitacao: "Boleto",
        mensagem: "Nenhuma mensagem informada",
    };

    return (
        <div className={styles.container}>
            <link rel="stylesheet" href="/assets/icons/css/all.css" />
            <div className={styles.headerSection}>
                <h1 className={styles.pageTitle}>
                    <i className="fas fa-check-circle" style={{ marginRight: 8 }}></i>
                    Resumo do Atendimento
                </h1>
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.cardsGrid}>
                  <div className={styles.CardGridUSer}>

                    <Card
                        title="Dados do Cliente"
                        icon="fas fa-user-circle"
                        >
                        <InfoField label="Nome:" value={dadosCliente.nome} />
                        <InfoField label="CPF/CNPJ da Empresa:" value={dadosCliente.cpfCnpj} />
                        <InfoField label="CPF do Contratante:" value={dadosCliente.cpfContratante} />
                        <InfoField label="Rua:" value={dadosCliente.rua} />
                        <InfoField label="CEP:" value={dadosCliente.cep} />
                        <InfoField label="Estado:" value={dadosCliente.estado} />
                    </Card>
                  </div>
                  <div className={styles.CardGridColumn}>
                    <Card
                        title="Beneficiário"
                        icon="fas fa-users"
                        >
                        <InfoField label="Nome Beneficiário:" value={dadosBeneficiario.nome} />
                        <InfoField label="CPF do Beneficiário:" value={dadosCliente.cpfContratante} />
                        <InfoField label="CPF Beneficiário:" value={dadosBeneficiario.cpf} />
                    </Card>

                    <Card
                        title="Dados do Chamado"
                        icon="fas fa-headset"
                        >
                        <InfoField label="Tipo de Solicitação:" value={dadosChamado.tipoSolicitacao} />
                        <InfoField label="Mensagem:" value={dadosChamado.mensagem} />
                    </Card>
                      </div>
                  </div>
                
                {/* <div className={styles.actionsSection}>
                    {!isChamadoFechado && (
                        <button
                            className={styles.closeButton}
                            onClick={handleFecharChamado}
                            title="Fechar este chamado e iniciar novo atendimento"
                        >
                            <i className="fas fa-times" style={{ marginRight: 6 }}></i>
                            Fechar Chamado
                        </button>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Resumo;