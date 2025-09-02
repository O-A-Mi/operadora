import React from 'react'
import { useState, useEffect } from 'react';
import { UseInputMask, UseInputPadrao } from '../../../../../../../components';

function TransferenciaSegmento() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [data, setData, dataRef] = UseInputMask();
    const [plano, setPlano, planoRef] = UseInputMask();
    const [motivo, setMotivo, motivoRef] = UseInputMask();


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    const opPlano = [
        { value: "planoIndividual", label: "Plano Individual" },
        { value: "planoFamiliar", label: "Plano Familiar" },
        { value: "planoEmpresarial", label: "Plano Empresarial" },
        { value: "planoOuro", label: "Plano Ouro" },
        { value: "planoPrata", label: "Plano Prata" },
        { value: "planoBronze", label: "Plano Bronze" },
        { value: "planoEspecial", label: "Plano Especial" },
      ];

    return (
        <>
        <main>
            <div>
                <div>
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
                    options={opPlano}
                    width={isMobile ? 100 : 100}
                    gap={isMobile ? 0 : 0.5}
                    />
                </div>

                <div>
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
            </div>
        </main>
        </>
    )
}

export default TransferenciaSegmento