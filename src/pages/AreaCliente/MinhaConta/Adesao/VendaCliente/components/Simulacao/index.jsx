import { StepperPadrao, TogglePadrao, TabelaPadrao } from "../../../../../../../components/index.jsx";
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { UseInputPadrao, InputPadrao, UseInputMask } from "../../../../../../../components/InputPadrao"
import React from 'react';
import { handleResizeTabela } from '../../../../../../../utils/functions.js';
// import arrayEstadosComCidades from '../../../../../../utils/estados-com-cidades.js';

function Simulacao({ currentStep, viewMode, infos }){
    const [typePlanIsSet, setTypePlanIsSet] = useState(false);
    const [typePlan, setTypePlan, refTypePlan] = UseInputMask();
    const [plan, setPlan, refPlan] = UseInputMask();
    const [faixaEtariaA18, setFaixaEtariaA18, refFaixaEtariaA18] = UseInputMask();
    const [faixaEtariaA23, setFaixaEtariaA23, refFaixaEtariaA23] = UseInputMask();
    const [faixaEtariaA28, setFaixaEtariaA28, refFaixaEtariaA28] = UseInputMask();
    const [faixaEtariaA33, setFaixaEtariaA33, refFaixaEtariaA33] = UseInputMask();
    const [faixaEtariaA38, setFaixaEtariaA38, refFaixaEtariaA38] = UseInputMask();
    const [faixaEtariaA43, setFaixaEtariaA43, refFaixaEtariaA43] = UseInputMask();
    const [faixaEtariaA48, setFaixaEtariaA48, refFaixaEtariaA48] = UseInputMask();
    const [faixaEtariaA53, setFaixaEtariaA53, refFaixaEtariaA53] = UseInputMask();
    const [faixaEtariaA58, setFaixaEtariaA58, refFaixaEtariaA58] = UseInputMask();
    const [faixaEtariaDe59, setFaixaEtariaDe59, refFaixaEtariaDe59] = UseInputMask();

    const tableColumns = [
        { value: "plano", name: "Plano", align: "center", sortable: false },
        { value: "faixa_etaria_ate_18", name: "0-18", align: "center", sortable: false },
        { value: "faixa_etaria_ate_23", name: "19-23", align: "center", sortable: false },
        { value: "faixa_etaria_ate_28", name: "24-28", align: "center", sortable: false },
        { value: "faixa_etaria_ate_33", name: "29-33", align: "center", sortable: false },
        { value: "faixa_etaria_ate_38", name: "34-38", align: "center", sortable: false },
        { value: "faixa_etaria_ate_43", name: "39-43", align: "center", sortable: false },
        { value: "faixa_etaria_ate_48", name: "44-48", align: "center", sortable: false },
        { value: "faixa_etaria_ate_53", name: "49-53", align: "center", sortable: false },
        { value: "faixa_etaria_ate_58", name: "54-58", align: "center", sortable: false },
        { value: "faixa_etaria_ate_59", name: "59+", align: "center", sortable: false },
    ]

    const buildInput = (value, onChange, inputRef) => (
        <UseInputPadrao
            type='number'
            value={value}
            onChange={onChange}
            inputRef={inputRef}
        />
    )

    const [tableData, setTableData] = useState([
        {
            plano: "A",
            faixa_etaria_ate_18: buildInput(faixaEtariaA18, setFaixaEtariaA18, refFaixaEtariaA18),
            faixa_etaria_ate_23: buildInput(faixaEtariaA23, setFaixaEtariaA23, refFaixaEtariaA23),
            faixa_etaria_ate_28: buildInput(faixaEtariaA28, setFaixaEtariaA28, refFaixaEtariaA28),
            faixa_etaria_ate_33: buildInput(faixaEtariaA33, setFaixaEtariaA33, refFaixaEtariaA33),
            faixa_etaria_ate_38: buildInput(faixaEtariaA38, setFaixaEtariaA38, refFaixaEtariaA38),
            faixa_etaria_ate_43: buildInput(faixaEtariaA43, setFaixaEtariaA43, refFaixaEtariaA43),
            faixa_etaria_ate_48: buildInput(faixaEtariaA48, setFaixaEtariaA48, refFaixaEtariaA48),
            faixa_etaria_ate_53: buildInput(faixaEtariaA53, setFaixaEtariaA53, refFaixaEtariaA53),
            faixa_etaria_ate_58: buildInput(faixaEtariaA58, setFaixaEtariaA58, refFaixaEtariaA58),
            faixa_etaria_ate_59: buildInput(faixaEtariaDe59, setFaixaEtariaDe59, refFaixaEtariaDe59),
        },
    ], [])


    useEffect(() => {
        setTypePlanIsSet(typePlan)
    }, [typePlan])

 return (
    <div className={styles.MainContent}>
        <div className={styles.container}>
            <div className={styles.HeaderCamp}>
                <h1 className={styles.Header}>
                    <i className="fas fa-users"></i>
                    Simulação de Planos
                </h1>
                <p className={styles.subHeader}>
                        <i className="fa-solid fa-info-circle"></i>
                        Selecione o plano e preencha as faixas etárias para simular os valores.
                    </p>
            </div>
            <div className={styles.planRow}>
                <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
                    <UseInputPadrao
                        label="Tipo de Plano"
                        type="select"
                        value={typePlan}
                        onChange={setTypePlan}
                        options={[
                            { label: "Plano Mensal", value: "1" },
                            { label: "Plano Anual", value: "2" },
                        ]}
                        searchable={true}
                    />
                </div>
                {typePlanIsSet && (
                    <div className={styles.planCell} style={{ flexBasis: 'calc(50% - 1rem)' }}>
                        <UseInputPadrao
                            label="Plano"
                            type="select"
                            value={plan}
                            onChange={setPlan}
                            options={[
                                { label: "Plano Mensal", value: "1" },
                            ]}
                            searchable={true}
                        />
                    </div>
                )}
            </div>
        {typePlanIsSet && plan &&
                <TabelaPadrao
                    columns={tableColumns}
                    data={tableData}
                    options={{
                        showPagination: false,
                        showHeader: true,
                        toolbar: false,
                        showPaginationSwitch: false,
                        showToggleView: true,
                        showColumnsSelector: false,
                        showExport: false,
                        paginationEnabled: false,
                        tableView: "table",
                    }}
                />
        }
        </div>

    </div>
)
}


export default Simulacao;