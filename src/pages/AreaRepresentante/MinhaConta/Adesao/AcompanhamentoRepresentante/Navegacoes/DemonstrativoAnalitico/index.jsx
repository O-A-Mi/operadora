import React from 'react'
import styles from "../../../../Adesao/styles.module.css"
import { UseInputMask } from '../../../../../../../components';
import TogglePadrao from '../../../../../../../components/TogglePadrao';
import { useEffect, useState } from 'react';
import { UseInputPadrao } from '../../../../../../../components';

function DemonstrativoAnalitico() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [data, setData, dataRef] = UseInputMask();
  const [visualizacao, setVisualizacao] = useState(false);
  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  function handleChecked(setter, checked) {
    setter(!checked);
  }

  return (
    <>
      <div className={styles.Content}>
        <UseInputPadrao
          label="Data"
          type="date"
          value={data}
          onChange={setData}
          inputRef={dataRef}
        />

        <TogglePadrao 
        label="Tipo de Visualização"
        checked={visualizacao}
        onChange={() => handleChecked(setVisualizacao, visualizacao)}
        option1='Contrato'
        option2='Cliente'
        />
      </div>
    </>
  )
}

export default DemonstrativoAnalitico