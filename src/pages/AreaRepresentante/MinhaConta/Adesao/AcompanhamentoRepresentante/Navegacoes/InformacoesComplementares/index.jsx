import React from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../components'
import { useEffect, useState } from 'react';

function InformacoesComplementares() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [texto, setTexto, textoRef] = UseInputMask();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

    return (
        <main>
            <div>
                <div>
                    <UseInputPadrao 
                    identifier="textarea"
                    type="textarea"
                    value={texto}
                    onChange={setTexto}
                    inputRef={textoRef}
                    width={isMobile ? 100 : 100}
                    gap={isMobile ? 0 : 0.5}
                    />
                </div>
            </div>
        </main>
    )
}

export default InformacoesComplementares