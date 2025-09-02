import React from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../components'
import { useEffect, useState } from 'react';

function AlterarVigencia() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [vigencia,setVigencia, vigenciaRef] = UseInputMask();
    useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
          };
          
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <>
        <main>
            <div>
                <div>
                    <UseInputPadrao 
                    label="Vigência"
                    identifier="vigencia"
                    type="date"
                    value={vigencia}
                    onChange={setVigencia}
                    inputRef={vigenciaRef}
                    width={isMobile ? 100 : 100}
                    gap={isMobile ? 0 : 0.5}
                    />
                </div>
            </div>
        </main>
        </>
    )
}

export default AlterarVigencia