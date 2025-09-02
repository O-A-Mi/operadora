import React from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components';
import styles from "../../../AcompanhamentoRepresentante/styles.module.css";
import ActionButtons from '../../../../../../../components/ActionButtonsPadrao';
import { useEffect, useState } from 'react';

function AlterarNumero() {
    const [numeroProposta, setNumeroProposta, numeroPropostaRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
          };
          
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }, []);
      
      const limparFiltro = () => {
          limparFiltros([
              {setter: setTransmissaoInicial, transmissaoInicialRef},
              {setter: setTransmissaoFinal, transmissaoFinalRef},
              {setter: setAcompanhamento, acompanhamentoRef},
              {setter: setPesquisar, pesquisarRef},
              {setter: setTexto, textoRef}
          ]);
      };

    const opSelect = [
        {value: "ssalda", label: "smdalkdm"}
    ]
  
    return (
    <>
    <main>
        <div className={styles.Content}>
            <UseInputPadrao
            label="Número Proposta"
            identifier="numeroProposta"
            value={numeroProposta}
            onChange={setNumeroProposta}
            inputRef={numeroPropostaRef}
            width={isMobile ? 100 : 100}
            gap={isMobile ? 0 : 0.5}
            />     
        </div>
    </main>
    </>
  )
}

export default AlterarNumero