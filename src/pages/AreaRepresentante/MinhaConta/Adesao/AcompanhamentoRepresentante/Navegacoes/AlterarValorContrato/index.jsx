import React from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../components'
import { useEffect, useState } from 'react';
import ActionButtons from '../../../../../../../components/ActionButtonsPadrao';
import styles from "../../styles.module.css";
function AlterarValorContrato() {
    const [tipo, setTipo, tipoRef] = UseInputMask();
    const [valor, setValor, valorRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        


    const opTipo = [
        {value: "desconto", label: "Desconto (-)"},
        {value: "acrescimo", label: "Acrescimo (+)"},
    ];

  return (
    <>
    <main>
        <div className={styles.Content}>
            <UseInputPadrao 
            label="Tipo"
            identifier="tipo"
            type="select"
            value={tipo}
            onChange={setTipo}
            inputRef={tipoRef}
            options={opTipo}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao 
            label="Valor"
            identifier="valor"
            value={valor}
            onChange={setValor}
            inputRef={valorRef}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 0.5}
            />
        </div>
    </main>
    </>
  )
}

export default AlterarValorContrato