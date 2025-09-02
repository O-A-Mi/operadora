import React from 'react'
import { useEffect, useState } from 'react'
import { TogglePadrao, UseInputMask, UseInputPadrao } from '../../../../../../../components';
import ActionButtons from '../../../../../../../components/ActionButtonsPadrao';
import styles from "../../styles.module.css";

function DuplicarProposta() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [data, setData, dataRef] = UseInputMask();
    const [plano, setPlano, planoRef] = UseInputMask();
    const [vigencia, setVigencia, vigenciaRef] = UseInputMask();
    const [nasAndamentoProposta, setNasAndamentoProposta, nasAndamentoPropostaRef] = UseInputMask();
    const [formaPagamento, setFormaPagamento, formaPagamentoRef] = UseInputMask();
    const [duplicar, setDuplicar, duplicarRef] = UseInputMask();  
    const [desNot, setDesNot] = useState(false);
    const [vigOri, setVigOri] = useState(false);
    const [numPro, setNumPro] = useState(false);

    function handleChecked(setter, checked){
        setter(!checked);
    }

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
    const opVigencia = [
        { value: "mensal", label: "Mensal" },
        { value: "trimestral", label: "Trimestral" },
        { value: "semestral", label: "Semestral" },
        { value: "anual", label: "Anual" },
        { value: "bienal", label: "Bienal" },
    ];

    const opNasAndamentoProposta = [
        { value: "cadastroManual", label: "Cadastro Manual" },
        { value: "integracaoApi", label: "Integração via API" },
        { value: "importacaoDados", label: "Importação de Dados" },
        { value: "sistemaLegado", label: "Sistema Legado" },
        { value: "duplicacaoProposta", label: "Duplicação de Proposta" },
    ];
    const opFormaPagamento = [
        { value: "cartaoCredito", label: "Cartão de Crédito" },
        { value: "boletoBancario", label: "Boleto Bancário" },
        { value: "pix", label: "Pix" },
        { value: "cartaoDebito", label: "Cartão de Débito" },
        { value: "transferenciaBancaria", label: "Transferência Bancária" },
        { value: "dinheiro", label: "Dinheiro" },
        { value: "valeAlimentacao", label: "Vale Alimentação" },
        { value: "valeRefeicao", label: "Vale Refeição" },
      ];

    const opDuplicar = [
        { value: "duplicarCompleto", label: "Duplicar Completo" },
        { value: "duplicarDadosBasicos", label: "Duplicar Apenas Dados Básicos" },
        { value: "duplicarComNovoNumero", label: "Duplicar com Novo Número" },
        { value: "duplicarMantendoDados", label: "Duplicar Mantendo Dados" },
    ];
    
    return (
        <>
        <main>
            <div>
                <div className={styles.Content}>
                    <TogglePadrao 
                    label="Deseja Notificar"
                    checked={desNot}
                    onChange={() => handleChecked(setDesNot, desNot)}
                    option1="Não"
                    option2="Sim"
                    />
                    <TogglePadrao 
                    label="Manter Vigência Original"
                    checked={vigOri}
                    onChange={() => handleChecked(setVigOri, vigOri)}
                    option1="Não"
                    option2="Sim"
                    />
                    <TogglePadrao 
                    label="Manter Núm. Proposta"
                    checked={numPro}
                    onChange={() => handleChecked(setNumPro, numPro)}
                    option1="Não"
                    option2="Sim"
                    />

                    <UseInputPadrao 
                    label="Data"
                    type="date"
                    identifier="data"
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
                    label="
                    Como irá nascer o Andamento da Proposta?"
                    identifier="nascerAndamentoProposta"
                    type="select"
                    value={nasAndamentoProposta}
                    onChange={setNasAndamentoProposta}
                    inputRef={nasAndamentoPropostaRef}
                    options={opNasAndamentoProposta}
                    width={isMobile ? 100 : 100}
                    gap={isMobile ? 0 : 0.5}
                    />

                    <UseInputPadrao 
                    label="Forma de Pagamento "
                    identifier="formaPagamento"
                    type="select"
                    value={formaPagamento}
                    onChange={setFormaPagamento}
                    inputRef={formaPagamentoRef}
                    options={opFormaPagamento}
                    width={isMobile ? 100 : 100}
                    gap={isMobile ? 0 : 0.5}
                    />
                    <UseInputPadrao 
                    label="Duplicar"
                    identifier="duplicar"
                    type="select"
                    value={duplicar}
                    onChange={setDuplicar}
                    inputRef={duplicarRef}
                    options={opDuplicar}
                    width={isMobile ? 100 : 100}
                    gap={isMobile ? 0 : 0.5}
                    />
                </div>

            </div>
        </main>
        </>
    )
}

export default DuplicarProposta