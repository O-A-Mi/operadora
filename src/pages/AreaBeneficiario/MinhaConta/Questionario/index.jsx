import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../components';
import { useState } from 'react';
import { jsonRoute } from '../../../../utils/json';
import { useNavigate, Outlet, useLocation } from "react-router";

const tabelaColumns = [
    { value: "tituloDaPergunta", name: "Titulo da pergunta" },
    { value: "declaraçãoPertencente", name: "Declaração Pertencente" },
    { value: "quemVisualiza", name: "Quem Visualiza" },
    { value: "pergunta", name: "Pergunta" },
    { value: "ordemDeAparecimento", name: "Ordem de Aparecimento" },
    { value: "status", name: "Status" },
];

const dadosTabela = [
    {
        tituloDaPergunta: "",
        declaraçãoPertencente: "Declaração de Saúde",
        quemVisualiza: "TODOS",
        pergunta: "Doenças pulmonares (asma, bronquite, enfisema, pneumonias de repetição, entre outras)?",
        ordemDeAparecimento: "20",
        status: "Diretoria",
    },
];

const Questionario_de_Vida = () => {
    const [matricula, matriculaChange, matriculaRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();
    
    const location = useLocation();

    const basePath = `/${jsonRoute.Beneficiario_MinhaConta}/${jsonRoute.Questionario_de_Vida}`;

    const showTable = location.pathname === basePath;

    const handleNavigate = (route) => {
        navigate(route);
    };

    const status = [
        { value: "ativo", label: "ATIVO" },
        { value: "Cancelado", label: "CANCELADO" },
    ];

    const pesquisar = [
        { value: "titulo", label: "Título" }
    ];

    return (
        <>
            <div className={styles.contratoContainer}>
                <h2 className={styles.titleTela}>
                  <i className="fas fa-chart-bar" />
                  <span>Questionário de Vida</span>
                </h2>
                {showTable ? ( 
                    <>
                        <div className={styles.tabPanel}>
                            <div className={styles.tabContent}>
                                <UseInputPadrao
                                    label="Status"
                                    identifier="pesquisar"
                                    value={matricula}
                                    onChange={matriculaChange}
                                    inputRef={matriculaRef}
                                    type="select"
                                    options={status}
                                    width={50}
                                    gap={isMobile ? 0 : 0.5}
                                />
                                <UseInputPadrao
                                    label="Consulta"
                                    identifier="pesquisar"
                                    value={matricula}
                                    onChange={matriculaChange}
                                    inputRef={matriculaRef}
                                    type="select"
                                    options={pesquisar}
                                    width={50}
                                    gap={isMobile ? 0 : 0.5}
                                />
                            </div>
                        </div>

                        <div className={styles.tabelaSection}>
                            <TabelaPadrao
                                tabelaId="contrato"
                                columns={tabelaColumns}
                                data={dadosTabela}
                                options={{
                                    rowOnClick: (row, rowIndex) => handleNavigate(`${basePath}/${jsonRoute.QuestionarioPerguntasVida}`),
                                    showPaginationSwitch: true,
                                    showToggleView: true,
                                    showColumnsSelector: true,
                                    showPrint: false,
                                    showExport: true,
                                    showFooter: true,
                                    fileName: "contrato"
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
        </>
    );
};

export default Questionario_de_Vida;