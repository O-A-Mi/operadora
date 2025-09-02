import React from 'react'
import { useEffect, useState } from 'react'
import ActionButtons from '../../../../../../../components/ActionButtonsPadrao'
import { TogglePadrao, UseInputMask, UseInputPadrao } from '../../../../../../../components'
import styles from "../../styles.module.css";

function TrocaPlano() {
    const [data, setData, dataRef] = UseInputMask();
    const [plano, setPlano, planoRef] = UseInputMask();
    const [manterVen, setManterVen, manterVenRef] = UseInputMask();
    const [vigencia, setVigencia, vigenciaRef] = UseInputMask();
    const [nasAndamentoProposta, setNasAndamentoProposta, nasAndamentoPropostaRef] = UseInputMask();
    const [motivo, setMotivo, motivoRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        
    
    const opPlanos = [
        { value: "planoIndividual", label: "Plano Individual" },
        { value: "planoFamiliar", label: "Plano Familiar" },
        { value: "planoEmpresarial", label: "Plano Empresarial" },
        { value: "planoOuro", label: "Plano Ouro" },
        { value: "planoPrata", label: "Plano Prata" },
        { value: "planoBronze", label: "Plano Bronze" },
        { value: "planoEspecial", label: "Plano Especial" },
    ];

    const opVigencia = [
        { value: "mensal", label: "Mensal" },
        { value: "trimestral", label: "Trimestral" },
        { value: "semestral", label: "Semestral" },
        { value: "anual", label: "Anual" },
        { value: "bienal", label: "Bienal" },
      ];

    const opNasAnd = [
        {value: "emPreenchimento", label: "Em preenchimento"},
        {value: "aguardandoAssinaturaCliente", label: "Aguardando Assinatura do Cliente"},
        {value: "propostaAnalise", label: "Proposta em Análise"},
        {value: "validado", label: "Validado"},
    ]

    return (
        <>
        <main>
            <div className={styles.Content}>
                <UseInputPadrao 
                label="Data"
                identifier="data"
                type="date"
                value={data}
                onChange={setData}
                inputRef={dataRef}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao 
                label="Plano"
                identifier="plano"
                type="select"
                value={plano}
                onChange={setPlano}
                inputRef={planoRef}
                options={opPlanos}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
                />

                <TogglePadrao 
                label="Manter Vencto"
                identifier="manterVencto"
                />
                <TogglePadrao
                label="Deseja Notificar"
                identifier="desejaNotificar"
                />

                <UseInputPadrao 
                label="Vigência"
                identifier="vigencia"
                type="select"
                value={vigencia}
                onChange={setVigencia}
                inputRef={vigenciaRef}
                options={opVigencia}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao 
                label="Como irá nascer o Andamento da Proposta?"
                identifier="nascerAndamentoProposta"
                type="select"
                value={nasAndamentoProposta}
                onChange={setNasAndamentoProposta}
                inputRef={nasAndamentoPropostaRef}
                options={opNasAnd}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao 
                label="Motivo"
                identifier="motivo"
                type="textarea"
                value={motivo}
                onChange={setMotivo}
                inputRef={motivoRef}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
                />
            </div>
        </main>
        </>
    )
}

export default TrocaPlano