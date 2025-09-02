import { useEffect, useState } from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import styles from '../styles.module.css';

function InformacaoAdicional() {

  const [gestor, setGestor, gestorRef] = UseInputMask();
  const [planosPODEMvender, setPlanosPODEMvender, planosPODEMvenderRef] = UseInputMask();
  const [planosNAOPodemVender, setPlanosNAOPodemVender, planosNAOPodemVenderRef] = UseInputMask();
  const [observacao, setObersvacao, observacaoRef] = UseInputMask();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <h3 className={styles.titulo}>
        <i className="fa-solid fa-info"></i>
        Informações adicionais
      </h3>

      <main className={styles.secao}>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={gestor}
            onChange={setGestor}
            inputRef={gestorRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.5}
            label="Gestor"
          />
          <UseInputPadrao
            type="select"
            multiple="true"
            identifier="tipo-cliente-signin"
            value={planosPODEMvender}
            onChange={setPlanosPODEMvender}
            inputRef={planosPODEMvenderRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.5}
            label="Planos que PODEM ser vendidos"
          />
          <UseInputPadrao
            type="select"
            multiple="true"
            identifier="tipo-cliente-signin"
            value={planosNAOPodemVender}
            onChange={setPlanosNAOPodemVender}
            inputRef={planosNAOPodemVenderRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.5}
            label="Planos que NÃO podem ser vendidos"
          />
        </section>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="textarea"
            identifier="tipo-cliente-signin"
            value={observacao}
            onChange={setObersvacao}
            inputRef={observacaoRef}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 0.5}
            label="Observação"
          />
        </section>
      </main>
    </>
  )
}

export default InformacaoAdicional