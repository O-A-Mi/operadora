import { useEffect, useState } from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import styles from '../styles.module.css';

import React from 'react'

function EnderecoResidencial() {

  const [cep, setCep, cepRef] = UseInputMask("99999-99", "number");
  const [numero, setnumero, numeroRef] = UseInputMask();
  const [cidade, setcidade, cidadeRef] = UseInputMask();
  const [endereco, setendereco, enderecoRef] = UseInputMask();
  const [complemento, setcomplemento, complementoRef] = UseInputMask();
  const [bairro, setbairro, bairroRef] = UseInputMask();
  const [UF, setUF, UFRef] = UseInputMask();

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
        <i className="fa-solid fa-location-dot"></i>
        Endereço
      </h3>
      <main className={styles.secao}>

        <div className={styles.divInfo}>
          <UseInputPadrao
            type="text"
            identifier="tipo-CEP"
            value={cep}
            onChange={setCep}
            inputRef={cepRef}
            icon="fa-solid fa-magnifying-glass"
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.333}
            label="CEP"
          />
        </div>


        <section className={styles.divInfo}>

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={endereco}
            onChange={setendereco}
            inputRef={enderecoRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="Endereço"
          />



          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={numero}
            onChange={setnumero}
            inputRef={numeroRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="Número"
          />


          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={complemento}
            onChange={setcomplemento}
            inputRef={complementoRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="Complemento"
          />

        </section>

        <section className={styles.divInfo}>
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={bairro}
            onChange={setbairro}
            inputRef={bairroRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="Bairro"
          />

          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={cidade}
            onChange={setcidade}
            inputRef={cidadeRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="Cidade"
          />


          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={UF}
            onChange={setUF}
            inputRef={UFRef}
            width={isMobile ? 100 : 33.33}
            gap={isMobile ? 0 : 0.333}
            label="UF"
          />

        </section>
      </main>
    </>
  )
}

export default EnderecoResidencial