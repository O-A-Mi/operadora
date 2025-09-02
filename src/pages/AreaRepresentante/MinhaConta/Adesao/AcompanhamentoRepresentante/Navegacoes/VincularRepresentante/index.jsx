import React from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../components';
import { useState, useEffect } from 'react';

function VincularRepresentante() {
    const [representante, setRepresentante, representanteRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
          };
          
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }, []);

    const opRepresentantes = [
        { value: "joaoSilva", label: "João Silva" },
        { value: "mariaSantos", label: "Maria Santos" },
        { value: "pedroAlmeida", label: "Pedro Almeida" },
        { value: "anaRodrigues", label: "Ana Rodrigues" },
        { value: "carlosPereira", label: "Carlos Pereira" },
        { value: "julianaOliveira", label: "Juliana Oliveira" },
        { value: "rafaelGomes", label: "Rafael Gomes" },
        { value: "fernandaCosta", label: "Fernanda Costa" },
        { value: "brunoMartins", label: "Bruno Martins" },
        { value: "leticiaRibeiro", label: "Letícia Ribeiro" },
        { value: "diegoSouza", label: "Diego Souza" },
        { value: "camilaFernandes", label: "Camila Fernandes" },
        { value: "felipeCarvalho", label: "Felipe Carvalho" },
        { value: "patriciaLima", label: "Patrícia Lima" },
        { value: "gustavoBarbosa", label: "Gustavo Barbosa" },
      ];
  return (
    <>
    <main>
        <div>
            <div>
                <UseInputPadrao 
                label="Representante"
                identifier="representante"
                type="select"
                value={representante}
                onChange={setRepresentante}
                inputRef={representanteRef}
                options={opRepresentantes}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
                />
            </div>
        </div>
    </main>
    </>
  )
}

export default VincularRepresentante