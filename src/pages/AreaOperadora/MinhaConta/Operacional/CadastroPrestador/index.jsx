import styles from "./styles.module.css"
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao"
import TabelaPadrao from "../../../../../components/TabelaPadrao"
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../utils/json";
import { useState, useEffect, useCallback } from "react";
import { handleResizeTabela } from "../../../../../utils/functions";
import { limparFiltros } from "../../../../../utils/functions";

function CadastroRepresentante() {
    const [tabelaDados, setTabelaDados] = useState([
        {
            nome: "Rodrigo",
            endereco: "Rua Ângelo Rodrigues Alves",
            numero: "31",
            complemento: "",
            bairro: "VILA BELA",
            cidade: "Franco da Rocha",
            cep: "1234-567",
            uf: "SP",
            telefone: "(12)123456789",
            cnpj: "00.817.532/0001-16",
            whatssap: "",
            facebook: "",
            instagram: "",
            youtube: "",
            segmento: "Esporte e Lazer",
            especialidade: "Estetica",
        },
        {
            nome: "Amelida",
            endereco: "Rua Donatelo",
            numero: "41",
            complemento: "",
            bairro: "VILA BELA",
            cidade: "Franco da Rocha",
            cep: "1234-567",
            uf: "SP",
            telefone: "(12)987654321",
            cnpj: "00.817.453/0001-16",
            whatssap: "",
            facebook: "",
            instagram: "",
            youtube: "",
            segmento: "Farmácia",
            especialidade: "",
        },
        {
            nome: "José",
            endereco: "Rua Alldaddin",
            numero: "49",
            complemento: "",
            bairro: "VILA BELA",
            cidade: "Franco da Rocha",
            cep: "1234-567",
            uf: "SP",
            telefone: "(12)987654321",
            cnpj: "00.817.453/0001-16",
            whatssap: "",
            facebook: "",
            instagram: "",
            youtube: "",
            segmento: "Farmácia",
            especialidade: "",
        },
    ]);

    const tabelaColumns = [
        {
            value: "nome",
            name: "Nome",
        },
        {
            value: "endereco",
            name: "Endereço",
        },
        {
            value: "numero",
            name: "Número",
        },
        {
            value: "complemento",
            name: "Complemento",
        },
        {
            value: "bairro",
            name: "Bairro",
        },
        {
            value: "cidade",
            name: "Cidade",
        },
        {
            value: "cep",
            name: "CEP",
        },
        {
            value: "uf",
            name: "UF",
        },
        {
            value: "telefone",
            name: "Telefone",
        },
        {
            value: "cnpj",
            name: "CNPJ"
        },
        {
            value: "whatssap",
            name: "Whatssap",
        },
        {
            value: "facebook",
            name: "Facebook",
        },
        {
            value: "instagram",
            name: "Instagram",
        },
        {
            value: "youtube",
            name: "Youtube",
        },
        {
            value: "segmento",
            name: "Segmento",
        },
        {
            value: "especialidade",
            name: "Especialidade",
        },
    ];

    const limparFiltro = () => {
        limparFiltros([
            {setter: setPais, PaisRef},
            {setter: setUF, UFRef},
            {setter: setSegmento, SegmentoRef},
            {setter: setEspecialidade, EspecialidadeRef},
            {setter: setPesquisar, PesquisarRef},
            {setter: setTexto, TextoRef},
            {setter: setStatus, StatusRef},
        ]);
    };

    const navigate = useNavigate();
    const handleNavigate = useCallback((route) => {
        navigate(route);
    }, [navigate]);

    const [Pais, setPais, PaisRef] = UseInputMask();
    const [UF, setUF, UFRef] = UseInputMask();
    const [Segmento, setSegmento, SegmentoRef] = UseInputMask();
    const [Especialidade, setEspecialidade, EspecialidadeRef] = UseInputMask();
    const [Pesquisar, setPesquisar, PesquisarRef] = UseInputMask();
    const [Texto, setTexto, TextoRef] = UseInputMask();
    const [Status, setStatus, StatusRef] = UseInputMask();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const handleRowClick = useCallback((row, rowIndex) => {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${jsonRoute.CadastroRepresentante}/${jsonRoute.CadastroPlanosNovo}`);
    }, [handleNavigate]);

    useEffect(() => {
        const resizeHandler = () => {
            handleResizeTabela('tabelaPadrao', 'tabelaPadrao-container');
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener("resize", resizeHandler);
        window.addEventListener("layout-resize", resizeHandler);

        requestAnimationFrame(() => {
            handleResizeTabela('tabelaPadrao', 'tabelaPadrao-container');
        });

        return () => {
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("layout-resize", resizeHandler);
        };
    }, []);

    return (
        <div className={styles.representanteContainer}>
            <h2 className={styles.TitleRepresentante}>
                <i className="fa-solid fa-hospital"></i>
                Representante
            </h2>
            <div className={styles.representanteContent}>
                <section className={styles.filtroTabelaField}>
                    <div className={styles.filtroTabelaContent}>
                        <div className={styles.filtroTabelaHeader}>
                            <h5 className={styles.filtroTabelaTitle}>
                                <i className="fa-solid fa-filter"></i>
                                Buscar por:
                            </h5>
                            <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                                <i className="fa-solid fa-filter-slash"></i> Limpar filtro
                            </button>
                        </div>
                        <div className={styles.divConteudo}>
                            <UseInputPadrao
                                label="País:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                value={Pais}
                                onChange={setPais}
                                inputRef={PaisRef}
                                width={isMobile ? 100 : 20}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                                label="UF:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                value={UF}
                                onChange={setUF}
                                inputRef={UFRef}
                                width={isMobile ? 100 : 20}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                                label="Segmento:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                value={Segmento}
                                onChange={setSegmento}
                                inputRef={SegmentoRef}
                                width={isMobile ? 100 : 20}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                                label="Especialidade:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                value={Especialidade}
                                onChange={setEspecialidade}
                                inputRef={EspecialidadeRef}
                                width={isMobile ? 100 : 20}
                                gap={isMobile ? 0 : 0}
                            />
                            <UseInputPadrao
                                label="Status:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                value={Status}
                                onChange={setStatus}
                                inputRef={StatusRef}
                                width={isMobile ? 100 : 20}
                                gap={isMobile ? 0 : 0.33}
                            />
                        </div>
                        
                        <div className={styles.divConteudo}>
                            <UseInputPadrao
                                label="Pesquisar:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                value={Pesquisar}
                                onChange={setPesquisar}
                                inputRef={PesquisarRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.33}
                            />
                            <UseInputPadrao
                                label="Texto:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Texto}
                                onChange={setTexto}
                                inputRef={TextoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0}
                            />
                        </div>

                        <div className={styles.tabela} id="tabelaPadrao-container">
                            <TabelaPadrao
                                tabelaId="tabelaPadrao"
                                columns={tabelaColumns}
                                data={tabelaDados}
                                options={{
                                    showSearch: false,
                                    showToggleView: true,
                                    showColumnsSelector: true,
                                    showPaginationSwitch: true,
                                    showRefresh: true,
                                    showExport: true,
                                    showPrint: true,
                                    showFilter: false,
                                    rowOnClick: handleRowClick,
                                    additionalButtons: [{
                                        title: 'Novo',
                                        icon: 'fa-regular fa fa-plus',
                                        onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${jsonRoute.CadastroRepresentante}/${jsonRoute.CadastroPlanosNovo}`)
                                    }]
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CadastroRepresentante