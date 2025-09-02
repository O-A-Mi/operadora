import React from 'react'
import { useEffect, useState } from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../components';
import ActionButtons from '../../../../../../../components/ActionButtonsPadrao';
function ReajustarValorContrato() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [dataVencimento, setDataVencimento, dataVencimentoRef] = UseInputMask();
    const [parcela, setParcela, parcelaRef] = UseInputMask();

     useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        

    const opParcelas = [
        { value: "01", label: "01" },
        { value: "02", label: "02" },
        { value: "03", label: "03" },
        { value: "04", label: "04" },
        { value: "05", label: "05" },
        { value: "06", label: "06" },
        { value: "07", label: "07" },
        { value: "08", label: "08" },
        { value: "09", label: "09" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
      ];

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
                <UseInputPadrao 
                label="Data do Vencimento/Vigência"
                identifier="dataVencimento"
                type="date"
                value={dataVencimento}
                onChange={setDataVencimento}
                inputRef={dataVencimentoRef}
                width={isMobile ? 100 : 66}
                gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao 
                label="Partir de Parcela"
                identifier="partirParcela"
                type="select"
                value={parcela}
                onChange={setParcela}
                inputRef={parcelaRef}
                options={opParcelas}
                width={isMobile ? 100 : 66}
                gap={isMobile ? 0 : 0.5}
                />

            </div>
        </main>
        </>
    )
}

export default ReajustarValorContrato