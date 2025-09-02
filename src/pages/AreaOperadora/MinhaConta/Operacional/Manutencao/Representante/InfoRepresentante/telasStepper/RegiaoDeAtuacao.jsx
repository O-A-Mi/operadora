import { useEffect, useState } from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import styles from '../styles.module.css';

function RegiaoDeAtuacao() {

  const [cidadeRA, setcidadeRA, cidadeRARef] = UseInputMask();
  const [UFRA, setUFRA, UFRARef] = UseInputMask();

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
        <i className="fa-solid fa-bars"></i>
        Região de Atuação
      </h3>
      <main className={styles.secao}>
        <section className={styles.divInfo}>

          <UseInputPadrao
            identifier="tipo-cliente-signin"
            value={cidadeRA}
            onChange={setcidadeRA}
            inputRef={cidadeRARef}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
            label="Cidade"
          />

          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={UFRA}
            onChange={setUFRA}
            inputRef={UFRARef}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
            label="UF"
          />
        </section>
      </main>
    </>
  )
}

export default RegiaoDeAtuacao