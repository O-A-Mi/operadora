import React from 'react'
import { useState, useEffect } from 'react';
import { UseInputMask } from '../../../../../../../components';
import styles from "../../../../Adesao/styles.module.css";
import { UseInputPadrao } from '../../../../../../../components';


function CriarUmaChamada() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [data, setData, dataRef] = UseInputMask();
  const [proto, setProto, protoRef] = UseInputMask();
  const [tipoChamada, setTipoChamada, tipoChamadaRef] = UseInputMask();
  const [mens, setMens, mensRef] = UseInputMask();
  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  const opTipoChamada = [
    {value: "teste", label:"teste"},
    {value: "teste1", label: "teste1"}
  ]
  return (
    <>
    <div className={styles.Content}>
        <UseInputPadrao
          label="Data da Chamada" 
          value={data}
          onChange={setData}
          inputRef={dataRef}
        />
        <UseInputPadrao
          label="Protocolo da Chamada"
          value={proto}
          onChange={setProto}
          inputRef={protoRef}
        />
        <UseInputPadrao
          label="Tipo de Chamada"
          type="select"
          value={tipoChamada}
          onChange={setTipoChamada}
          inputRef={tipoChamadaRef}
          options={opTipoChamada}
        />
    </div>
    <div  className={styles.Content}>
      <UseInputPadrao
            label="Mensagem"
            type="textarea"
            value={mens}
            onChange={setMens}
            inputRef={mensRef}
          />
    </div>
    </>
  )
}

export default CriarUmaChamada