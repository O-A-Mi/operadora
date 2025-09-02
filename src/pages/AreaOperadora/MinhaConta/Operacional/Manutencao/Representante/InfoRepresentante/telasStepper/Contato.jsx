import { useEffect, useState } from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import styles from '../styles.module.css';

import React from 'react'

function Contato() {
  const [telefone1, setTelefone1, telefoneRef1] = UseInputMask();
  const [telefone2, setTelefone2, telefone2Ref] = UseInputMask();
  const [celular1, setCelular1, celular1Ref] = UseInputMask();
  const [celular2, setCelular2, celular2Ref] = UseInputMask();
  const [celular3, setCelular3, celular3Ref] = UseInputMask();
  const [email1, setEmail1, email1Ref] = UseInputMask();
  const [email2, setemail2, email2Ref] = UseInputMask();
  const [contato, setContato, contatoRef] = UseInputMask();


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
        <i className="fa-solid fa-phone"></i>
        Contato
      </h3>
      <main className={styles.secao}>
        <section className={styles.divInfo}>

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={telefone1}
            onChange={setTelefone1}
            inputRef={telefoneRef1}
            width={isMobile ? 100 : 33.3}
            gap={isMobile ? 0 : 0.333}
            label="Telefone 1"
          />

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={telefone2}
            onChange={setTelefone2}
            inputRef={telefone2Ref}
            width={isMobile ? 100 : 33.3}
            gap={isMobile ? 0 : 0.333}
            label="Telefone 2"
          />

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={celular1}
            onChange={setCelular1}
            inputRef={celular1Ref}
            width={isMobile ? 100 : 33.3}
            gap={isMobile ? 0 : 0.333}
            label="Celular / Whatsapp"
          />



        </section>

        <section className={styles.divInfo}>

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={celular2}
            onChange={setCelular2}
            inputRef={celular2Ref}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="Celular 2"
          />


          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={celular3}
            onChange={setCelular3}
            inputRef={celular3Ref}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="Celular 3"
          />

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={email1}
            onChange={setEmail1}
            inputRef={email1Ref}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="E-mail 1"
          />
        </section>


        <section className={styles.divInfo}>
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={email2}
            onChange={setemail2}
            inputRef={email2Ref}
            width={isMobile ? 100 : 50}
            gap={isMobile ? 0 : 0.333}
            label="E-mail 2"
          />

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={contato}
            onChange={setContato}
            inputRef={contatoRef}
            width={isMobile ? 100 : 50}
            gap={isMobile ? 0 : 0.333}
            label="Contato"
          />

        </section>
      </main>
    </>
  )
}

export default Contato