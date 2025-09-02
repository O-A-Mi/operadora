import { useEffect } from "react";
import { useModal, useLoader } from "../../../context";
import styles from "./styles.module.css";

function HomeOperadora() {
  const { closeModal } = useModal();
  const { hideLoader } = useLoader();

  useEffect(() => {
    closeModal("modalPasswordRecovery");
    closeModal("modalTexto");
    hideLoader();
  }, []);

  return (
    <div className={styles.contentColumn}>
      <h2 className={styles.superTitle}>
        <i className="fas fa-notes-medical" />
        <span> Área Operadora</span>
      </h2>
      <h1 className={styles.title}>Bem vindo a área Operadora!</h1>
      <h2 className={styles.subTitle}>
        Faça parte da nossa rede de atendimento e aumento o volume de consultas
        e exames na sua clínica.
      </h2>
      <p className={styles.text}>
        Os agendamentos serão realizados diretamente pelo cliente em contato com
        a clínica. O Cartão Saúde + proporciona a possibilidade de fidelização
        do cliente com a sua empresa. A consulta é a porta de entrada para que o
        cliente possa realizar os demais exames e procedimentos em sua clínica,
        pagando direto ao representante.
      </p>
    </div>
  );
}

export default HomeOperadora;
