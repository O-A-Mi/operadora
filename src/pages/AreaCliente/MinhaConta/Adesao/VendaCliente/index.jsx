import { StepperPadrao } from './../../../../../components/index.jsx';
import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { UseInputPadrao } from './../../../../../components/InputPadrao/index.jsx'; 
import React from 'react';
import CardPagamento from './components/CardPagamento';
import Beneficiarios from './components/Beneficiarios';
import Contratante from './components/Contratante';
import Resumo from './components/Resumo';
import Simulacao from './components/Simulacao';
import TipoPlano from './components/TipoPlano';
import FormaPagamento from './components/FormaPagamento/index.jsx';

const VendaCLiente = () => {
    const [viewMode, setViewMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [search, setSearch] = useState('');
    const refSearch = useRef(null);

    const [steps, setSteps] = useState([
        { id: 1, name: 'Simulação', icon: 'fa fa-calculator', color: '#87a6be' },
        { id: 2, name: 'Tipo Plano & Plano', icon: 'fa-solid fa-file-waveform', color: '#4a5568' },
        { id: 3, name: 'Contratante', icon: 'fas fa-building', color: '#d69e2e' },
        { id: 4, name: 'Beneficiários', icon: 'fas fa-restroom', color: '#73cd95' },
        { id: 5, name: 'Opcionais', icon: 'fa fa-plus', color: '#675b58' },
        { id: 6, name: 'Forma de Pagamento', icon: 'fas fa-file-invoice-dollar', color: '#675b58' },
        { id: 7, name: 'Resumo de Contratação', icon: 'fas fa-clipboard-list', color: '#dd6b20' },
    ]);

    const [planInfos, setPlanInfos] = useState([
        {
            id: 0,
            label: 'Tipo Plano 1',
            icon: 'fas fa-procedures',
            iconColor: '#ff9800',
            image: '',
            availableInStep: 2,
            isPlanType: true,
            planType: 'Plano 1',
            isPlan: false,
            plan: '',
            planTypeId: 0,
            maxTitular: 2,
            onClick: () => { addPayamentInfos(0, 'Tipo Plano 1', true, false, 0, 0) },
            value: 100
        },
        {
            id: 1,
            label: 'Tipo Plano 2',
            icon: 'fas fa-procedures',
            iconColor: '#ff9800',
            image: '',
            availableInStep: 2,
            isPlanType: true,
            planType: 'Tipo Plano 2',
            isPlan: false,
            plan: '',
            planTypeId: 0,
            maxTitular: 2,
            onClick: () => {},
            value: 100
        },
        {
            id: 2,
            label: 'Tipo Plano 3',
            icon: 'fas fa-procedures',
            iconColor: '#ff9800',
            image: '',
            availableInStep: 2,
            isPlanType: true,
            planType: 'Plano 3',
            isPlan: false,
            plan: '',
            planTypeId: 0,
            maxTitular: 2,
            onClick: () => {},
            value: 100
        },
        {
            id: 3,
            label: 'Tipo Plano 4',
            icon: 'fas fa-procedures',
            iconColor: '#ff9800',
            image: '',
            availableInStep: 2,
            isPlanType: true,
            planType: 'Plano 4',
            isPlan: false,
            plan: '',
            planTypeId: 0,
            maxTitular: 2,
            onClick: () => {},
            value: 100
        },
        {
            id: 4,
            label: 'Plano 5',
            icon: 'fas fa-procedures',
            iconColor: '#ff9800',
            image: '',
            availableInStep: 2,
            isPlanType: false,
            planType: '',
            isPlan: true,
            plan: 'Plano 5',
            planTypeId: 0,
            maxTitular: 2,
            onClick: () => {
                addPayamentInfos(1, 'Plano 5', false, true, 0, 150); 
                setCurrentStep(prevStep => prevStep + 1);
            },
            value: 100
        },
    ]);

    const [payamentData, setPayamentData] = useState([
        {
            id: 0,
            proposal: '0018039',
            type: 'Plano Odontológico',
            plan: 'Plano 1',
            value: 100.00,
            validity: '',
            beneficiaries: 0,
            situation: 'Em Preenchimento',
            status: 'ATIVO'
        }
    ])

    function addPayamentInfos(avaliableInStep, label, isPlanType, isPlan, planTypeId, valor){
        setPayamentData(prevData => {
            const valorPagamento = prevData.map((item) => {
                if (isPlanType){
                    return {
                        ...item,
                        type: label,
                        value: valor > 0 ? valor : item.value
                    };
                } else if (isPlan){
                    return {
                        ...item,
                        plan: label,
                        value: valor > 0 ? valor : item.value
                    };
                }
                return item;
            });
            return valorPagamento;
        });
    }

    const handleStepChange = (stepId) => {
        setCurrentStep(stepId);
    };

    function handleViewMode(){
        setViewMode(!viewMode);
        if (viewMode){
            setSteps([
                { id: 1, name: 'Simulação', icon: 'fa fa-calculator', color: '#87a6be' },
                { id: 2, name: 'Tipo Plano & Plano', icon: 'fa-solid fa-file-waveform', color: '#4a5568' },
                { id: 3, name: 'Contratante', icon: 'fas fa-building', color: '#d69e2e' },
                { id: 4, name: 'Beneficiários', icon: 'fas fa-restroom', color: '#73cd95' },
                { id: 5, name: 'Opcionais', icon: 'fa fa-plus', color: '#3c9d6e' },
                { id: 6, name: 'Forma de Pagamento', icon: 'fas fa-file-invoice-dollar', color: '#675b58' },
                { id: 7, name: 'Resumo de Contratação', icon: 'fas fa-clipboard-list', color: '#dd6b20' },
            ]);
            if (currentStep === 8 || currentStep === 7){
                setCurrentStep(7);
            }
        }
        else if (!viewMode){
            setSteps([
                { id: 1, name: 'Simulação', icon: 'fa fa-calculator', color: '#87a6be' },
                { id: 2, name: 'Tipo Plano', icon: 'fa-solid fa-briefcase-medical', color: '#4a5568' },
                { id: 3, name: 'Plano Contratado', icon: 'fa-solid fa-file-waveform', color: '#2c7a7b' },
                { id: 4, name: 'Contratante', icon: 'fas fa-building', color: '#d69e2e' },
                { id: 5, name: 'Beneficiários', icon: 'fas fa-restroom', color: '#73cd95' },
                { id: 6, name: 'Opcionais', icon: 'fa fa-plus', color: '#3c9d6e' },
                { id: 7, name: 'Forma de Pagamento', icon: 'fas fa-file-invoice-dollar', color: '#675b58' },
                { id: 8, name: 'Resumo de Contratação', icon: 'fas fa-clipboard-list', color: '#dd6b20' },
            ]);
            if (currentStep === 6){
                setCurrentStep(7);
            }
            if (currentStep === 7){
                setCurrentStep(8);
            }
        }
    }

    const [planInfosFiltro, setPlanInfosFiltro] = useState([])

    useEffect(() => {
        if (typeof search === 'string') {
            setPlanInfosFiltro(planInfos.filter(
                (info) => info.label.toLowerCase().includes(search.toLowerCase())
            ));
        } else {
            setPlanInfosFiltro(planInfos);
        }
    }, [planInfos, search])

    return (
        <>
            <div className={styles.vendaClienteContainer}>
                <StepperPadrao 
                    steps={steps} 
                    currentStep={currentStep} 
                    onStepChange={handleStepChange}
                />
                <div>
                    <div className={styles.vendaClienteContent}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '100%' }}>
                                    {currentStep === 2 && <UseInputPadrao type='text' placeholder="Pesquisar..." label="Nome do Plano" value={search} onChange={(e) => setSearch(e.target.value)} inputRef={refSearch} icon="fa-solid fa-heart-pulse" />}
                                </div>
                                {/* <div style={{ height: '33px' }}>
                                    <button onClick={() => handleViewMode()} className={styles.infoButton}>
                                        {viewMode ? <i className="fa-solid fa-rectangle-wide" /> : <i className="fa-regular fa-list-ul" />}
                                        {viewMode ? 'Cartão' : 'Lista'}
                                    </button>
                                </div> */}
                            </div>
                            <div>
                                {currentStep === 1 && <Simulacao currentStep={false} viewMode={false} infos={false} />}
                                {currentStep === 2 && <TipoPlano currentStep={currentStep} viewMode={viewMode} infos={planInfosFiltro} />}
                                {currentStep === 3 && viewMode && (
                                    <div>Etapa 3 - Plano Contratado</div>
                                ) || currentStep === 3 && !viewMode && (
                                    <Contratante />
                                )}
                                {currentStep === 4 && viewMode && (
                                    <div>Etapa 4 - Contratante</div>
                                ) || currentStep === 4 && !viewMode && (
                                    <Beneficiarios />
                                )}
                                {currentStep === 5 && viewMode && (
                                    <div>Etapa 5 - Beneficiários</div>
                                ) || currentStep === 5 && !viewMode && (
                                    <div>Etapa 5 - Opcionais</div>
                                )}
                                  {currentStep === 6 && !viewMode && (
                                    <FormaPagamento />
                                )}
                                {currentStep === 7 && viewMode && (
                                    <div>Etapa 7 - Forma de Pagamento</div>
                                )}
                                {currentStep === 7 && !viewMode && (
                                    <Resumo />
                                )}
                                {currentStep === 8 && !viewMode && (
                                    <Resumo />
                                )}
                            </div>
                        </div>
                        <div style={{ minWidth: '350px' }}>
                            <CardPagamento 
                                payamentInfos={payamentData} 
                                currentStep={currentStep} 
                                steps={steps} 
                                setCurrentStep={setCurrentStep} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendaCLiente;