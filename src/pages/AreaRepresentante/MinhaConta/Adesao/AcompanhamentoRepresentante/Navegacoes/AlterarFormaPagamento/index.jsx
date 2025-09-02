import React from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../components';
import { useState, useEffect } from 'react';
import styles from "../../styles.module.css";

function AlterarFormaPagamento() {
    const [pagamento, setPagamento, pagamentoRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
          };
          
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }, []);


    const opPagamentos = [
        { value: "cartaoCredito", label: "Cartão de Crédito" },
        { value: "boletoBancario", label: "Boleto Bancário" },
        { value: "pix", label: "Pix" },
        { value: "debito", label: "Débito" },
        { value: "transferenciaBancaria", label: "Transferência Bancária" },
        { value: "dinheiro", label: "Dinheiro" },
      ];
    return (
       <>
       <main>
            <div className={styles.Content}>
                <UseInputPadrao 
                label="Formas de pagamento"
                identifier="formasDePagamento"
                type="select"
                value={pagamento}
                onChange={setPagamento}
                inputRef={pagamentoRef}
                options={opPagamentos}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
                />
            </div>
       </main>
       </> 
    );
}

export default AlterarFormaPagamento