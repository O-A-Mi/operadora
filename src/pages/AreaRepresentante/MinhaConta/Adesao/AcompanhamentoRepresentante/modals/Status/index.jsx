import styles from "./styles.module.css";

export default function StatusContrato() {
  // Dados de exemplo para as fases. Você pode usar seus próprios dados aqui.
  const fases = [
    {
      id: 1,
      nome: "TESTE BACK",
      status: "Expirado",
      data: "06/03/2024 14:38",
      diretoria: "DIRETORIA",
      usuario: "VITOR TESTE",
    },
    {
      id: 2,
      nome: "TESTE BACK",
      status: "Expirado",
      data: "06/03/2024 14:38",
      diretoria: "DIRETORIA",
      usuario: "VITOR TESTE",
    },
    {
      id: 3,
      nome: "TESTE BACK",
      status: "Expirado",
      data: "06/03/2024 14:38",
      diretoria: "DIRETORIA",
      usuario: "VITOR TESTE",
    },
    {
      id: 4,
      nome: "TESTE BACK",
      status: "Expirado",
      data: "06/03/2024 14:38",
      diretoria: "DIRETORIA",
      usuario: "VITOR TESTE",
    },
    {
      id: 5,
      nome: "TESTE BACK",
      status: "Expirado",
      data: "06/03/2024 14:38",
      diretoria: "DIRETORIA",
      usuario: "VITOR TESTE",
    },
    {
      id: 6,
      nome: "TESTE BACK",
      status: "Expirado",
      data: "06/03/2024 14:38",
      diretoria: "DIRETORIA",
      usuario: "VITOR TESTE",
    },
    {
      id: 7,
      nome: "TESTE BACK",
      status: "Expirado",
      faseAtual: true,
      data: "06/03/2024 14:38",
      diretoria: "DIRETORIA",
      usuario: "VITOR TESTE",
    },

  ];

  return (
    // <div className={styles.modalContainer}>
    //   <div className={styles.modalContent}>
    //     <div className={styles.scrollBox}>
    //       <div className={styles.modalBody}>
    //         <div className={styles.timeline}>
    //           {fases.map((fase) => (
    //             <div key={fase.id} className={styles.timelineItem}>
    //               <div className={styles.timelineContent}>
    //                 <div className={styles.timelineHeader}>
    //                   <span className={styles.timelinePhaseName}>{fase.nome}</span>
    //                   <span className={styles.timelineStatus}>{fase.status}</span>
    //                   <span className={styles.timelineId}>{fase.id}</span>
    //                 </div>
    //                 {fase.faseAtual && <span className={styles.currentPhaseText}>Fase Atual</span>}
    //                 <div className={styles.timelineDetails}>
    //                   <div className={styles.timelineDetailRow}>
    //                     <i className="fas fa-clock"></i>
    //                     <span>{fase.data}</span>
    //                   </div>
    //                   <div className={styles.timelineDetailRow}>
    //                     <i className="fas fa-building"></i>
    //                     <span>{fase.diretoria}</span>
    //                   </div>
    //                   <div className={styles.timelineDetailRow}>
    //                     <i className="fas fa-user"></i>
    //                     <span>{fase.usuario}</span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className={styles.timeline}>
        <div className={styles.modalBody}>
          <div className={styles.modalContent}>
            {fases.map((fase) => (
              <div key={fase.id} className={styles.timelineItem}>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelinePhaseName}>{fase.nome}</span>
                    <span className={styles.timelineStatus}>{fase.status}</span>
                    <span className={styles.timelineId}>{fase.id}</span>
                  </div>
                  {fase.faseAtual && <span className={styles.currentPhaseText}>Fase Atual</span>}
                  <div className={styles.timelineDetails}>
                    <div className={styles.timelineDetailRow}>
                      <i className="fas fa-clock"></i>
                      <span>{fase.data}</span>
                    </div>
                    <div className={styles.timelineDetailRow}>
                      <i className="fas fa-building"></i>
                      <span>{fase.diretoria}</span>
                    </div>
                    <div className={styles.timelineDetailRow}>
                      <i className="fas fa-user"></i>
                      <span>{fase.usuario}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}