import { StepperPadrao, TogglePadrao, TabelaPadrao } from '../../../../../../../components/index.jsx';
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { UseInputPadrao, InputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao'
import React from 'react';
import { handleResizeTabela } from '../../../../../../../utils/functions.js';
// import arrayEstadosComCidades from '../../../../../../utils/estados-com-cidades.js';

function CardPlano({ currentStep, viewMode, cardData }){
    const [typeplanelected, setTypeplanelected] = useState(null)

    const handleTypePlanClick = (typeValue) => {
        if (typeplanelected == typeValue){
            setTypeplanelected(null);
        } else {
            setTypeplanelected(typeValue);
        }
    };

    return (
        <>
            {cardData.map((data) => {
                if (data.isPlanType === true && data.availableInStep === currentStep){
                    const isSelected = typeplanelected === data.id;
                    return (
                        <React.Fragment key={data.id}>
                            <div className={styles.planCell}>
                                <button {...(viewMode ? { className: styles.planCellButtonCard } : { className: styles.planCellButtonLista })} onClick={() => { handleTypePlanClick(data.id); data.onClick(); }} value={data.value}>
                                    <div>
                                        <i style={{ color: data.iconColor ? data.iconColor : '' }} className={data.icon ? data.icon : data.image ? data.image : 'fas fa-no-symbol'}></i>
                                    </div>
                                    <p className={styles.vendaClienteDescriptionTela}>{data.label}</p>
                                </button>
                                {isSelected && !viewMode && (
                                    cardData
                                        .filter(plan => plan.isPlan && plan.planTypeId === data.id)
                                        .map(planData => (
                                            <div key={planData.id}>
                                                <button
                                                    {...(viewMode ? { className: styles.planCellButtonCard } : { className: styles.planCellChildButtonLista })}
                                                    onClick={() => { planData.onClick(); }}
                                                    value={planData.value}
                                                >
                                                    <div>
                                                        <i style={{ color: planData.iconColor ? planData.iconColor : '' }} className={planData.icon ? planData.icon : planData.image ? planData.image : 'fas fa-no-symbol'}></i>
                                                    </div>
                                                    <p className={styles.vendaClienteDescriptionTela}>{planData.label}</p>
                                                </button>
                                            </div>
                                        ))
                                )}
                            </div>
                        </React.Fragment>
                    );
                }
                return null;
            })}
        </>
    );
}

function TipoPlano({ currentStep, viewMode, infos }){
    if (viewMode === false){
        return (
            <div className={styles.planContentLista}>
                <CardPlano currentStep={currentStep} viewMode={viewMode} cardData={infos} />
            </div>
        );
    } else if (viewMode === true){
        return (
            <div className={styles.planContentCard}>
                <CardPlano currentStep={currentStep} viewMode={viewMode} cardData={infos} />
            </div>
        );
    }
}


export default TipoPlano;