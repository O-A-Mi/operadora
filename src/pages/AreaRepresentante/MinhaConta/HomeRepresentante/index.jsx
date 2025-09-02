import { useEffect } from "react";
import { useModal, useLoader } from "../../../../context";
import styles from "./styles.module.css";
import { link } from "../../../../mocks/links";

function HomeRepresentante() {
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
        <span> Área Representante</span>
      </h2> 
      <h1 className={styles.title}>Bem vindo a área do Representante!</h1>
      <h2 className={styles.subTitle}>
        Gerencie seus atendimentos, dados da conta e configurações de segurança.
      </h2>
      <p className={styles.text}>
        A área do representante permite que você gerencie todos os aspectos da sua conta,
        incluindo dados pessoais, configurações de segurança e informações financeiras.
        Aqui você pode visualizar e atualizar suas informações, gerenciar permissões
        de usuários e acompanhar movimentações financeiras.
      </p>
    </div>
  );
}

export default HomeRepresentante; 