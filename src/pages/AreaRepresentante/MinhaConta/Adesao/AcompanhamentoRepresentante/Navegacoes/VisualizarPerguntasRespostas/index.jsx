import React from 'react'
import { useState, useEffect } from 'react';
import { UseInputMask } from '../../../../../../../components';
import styles from "../../../../Adesao/styles.module.css";
import { UseInputPadrao } from '../../../../../../../components';

function VisualizarPerguntasRespostas() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [tipoBene, setTipoBene, tipoBeneRef] = UseInputMask();
  const [nomeBene, setNomeBene, nomeBeneRef] = UseInputMask();
  const [resp, setResp, respRef] = UseInputMask();
  const [perg, setPerg, pergRef] = UseInputMask();
  const [comenResp, setComenResp, comenRespRef] = UseInputMask();

  const opResp = [
    {value: "teste", label: "teste"}
  ]

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <>
     <div className={styles.Content}>
        <UseInputPadrao
          label="Tipo Beneficiario" 
          identifier="tipoBenef"
          value={tipoBene}
          onChange={setTipoBene}
          inputRef={tipoBeneRef}
        />
        <UseInputPadrao
          label="Nome Beneficiario" 
          identifier="nomeBene"
          value={nomeBene}
          onChange={setNomeBene}
          inputRef={nomeBeneRef}
        />
      </div>
      <div className={styles.Content}>
        <UseInputPadrao
          label="Resposta" 
          identifier="resposta"
          type="select"
          value={resp}
          onChange={setResp}
          inputRef={respRef}
          options={opResp}
        />
      </div>
      <div className={styles.Content}>
        <UseInputPadrao
          label="Pergunta" 
          identifier="pergunta"
          value={perg}
          onChange={setPerg}
          inputRef={pergRef}
        />
      </div>
      <div className={styles.Content}>
        <UseInputPadrao
          label="Comentário da Resposta" 
          identifier="comentarioResposta"
          type="textarea"
          value={comenResp}
          onChange={setComenResp}
          inputRef={comenRespRef}
        />
      </div>
    </>
  )
}

export default VisualizarPerguntasRespostas