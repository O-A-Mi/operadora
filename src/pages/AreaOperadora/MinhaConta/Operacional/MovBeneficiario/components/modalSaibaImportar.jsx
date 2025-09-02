import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState } from "react";

export default function ModalSaibaImportar({ closeModal }) {
    const [contratoProposta, contratoPropostaChange, contratoPropostaRef] = UseInputMask(null, "text");
    const [protocoloAns, protocoloAnsChange, protocoloAnsRef] = UseInputMask("999999.9999.99.9999.999999", "number");
    const [prioridade, prioridadeChange, prioridadeRef] = UseInputMask(null, "number");
    const [assunto, assuntoChange, assuntoRef] = UseInputMask(null, "text");
    const [fases, fasesChange, fasesRef] = UseInputMask(null, "text");
    const [porPessoa, porPessoaChange, porPessoaRef] = UseInputMask(null, "text");

    const [cargos, setCargos] = useState([]);

    const filtrar = [
        { value: "dataDeAbertura", label: "Data de Abertura" },

    ];

    const fase = [
        { value: "fase1", label: "Fase 1" },

    ];

    const ordem = [
        { value: "01", label: "01" },

    ];

    const pessoa = [
        { value: "fabricio", label: "Fabricio" },

    ];

    const assuntoDisponivel = [

    ];

    const InputStyle = {
        // height: 'auto',
        appearance: 'none',
        border: 'none',
        // padding: '0.25rem',
        // fontSize: '0.85rem',
        // lineHeight: 'unset',
        // background: 'transparent',
        // color: 'var(--cinza-escuro)',
        // transition: 'border 0.2s ease-in-out',
        // cursor: 'default'
    }
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>Guia de Importação</h2>
                    <button className={styles.backButton} onClick={closeModal}>
                        <i className="fas fa-times"></i>
                    </button>
                </header>

                <div className={styles.scrollBox}>
                    <div className={styles.modalBody}>
                        <section className={styles.modalFormInfo}>
                            <h3>Importação de beneficiários:</h3>
                            <p>
                                Faça o download do arquivo modelo de beneficiários e preencha com os dados de cada pessoa vinculada ao contrato.
                                Salve o arquivo e faça a importação no botão Importar planilha.
                            </p>

                            <h3>Movimentações do Beneficiário:</h3>
                            <p>
                                Esta planilha deve conter apenas três colunas:
                                CPF (sem pontos ou traços),
                                Tipo de Beneficiário e Ação
                            </p>

                            <h3>Tipo:</h3>
                            <ul className={styles.lista}>
                                <li>
                                    T – Titular
                                </li>

                                <li>
                                    D – Dependente
                                </li>
                            </ul>

                            <h3>Ação:</h3>
                            <ul className={styles.lista}>
                                <li>
                                    R – Reativação
                                </li>

                                <li>
                                    I – Inativação
                                </li>

                                <li>
                                    S – Suspensão
                                </li>

                                <li>
                                    E – Exclusão
                                </li>
                            </ul>

                        </section>
                    </div>
                </div>

                <footer>
                    <div className={styles.modalFooter}>
                        
                        <div>
                            <button className={styles.confirmButtonNovaFase} >
                                Baixar arquivo modelo importação
                            </button>
                        </div>

                        <div>
                            <button className={styles.confirmButtonNovaFase} >
                                Baixar arquivo modelo movimentação
                            </button>
                        </div>

                    </div>
                </footer>
            </div>
        </div>
    );
}