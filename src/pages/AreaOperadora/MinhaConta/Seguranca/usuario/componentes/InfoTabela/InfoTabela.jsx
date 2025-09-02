import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';
import { useState, useEffect } from 'react';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';
import ModalLog from '../modalLogAuditodia/modalLogAuditodia.jsx'
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../../utils/json";
import Tooltip from '../../../../../../../components/TooltipPadrao';
import { handleResizeTabela } from '../../../../../../../utils/functions.js';

function InfoTabela() {

    const [screenState, setScreenState] = useState({
        informacoesUsuario: true,
        novo: false,
        gravar: false,
        deletar: false,
        voltar: false,
    })






    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
    };


    const StatusOptions = [
        { value: 'A', label: 'Ativo' },
        { value: 'C', label: 'Cancelado' },
        { value: 'E', label: 'Em Analíse pela operadora' },
        { value: 'IS', label: 'IBBCA Suspenso' },
        { value: 'IB', label: 'Inadiplente IBBCA' },
        { value: 'I', label: 'Inativo' },
        { value: 'IN', label: 'Inativo por Inadiplência' },
        { value: 'R', label: 'Recisão Contratual' },
        { value: 'S', label: 'Suspenso' },
    ]

    const TipoOptions = [
        { value: 'A', label: 'Associado' },
        { value: 'S', label: 'Segurado' },
        { value: 'D', label: 'Dependente' },
        { value: 'E', label: 'Estabelecimento' },
        { value: 'T', label: 'Todos' },
        { value: 'F', label: 'Funcionario/Representante' },
    ]

    const Info = [
        { value: 'A', label: 'Associado' },
        { value: 'S', label: 'Segurado' },
        { value: 'D', label: 'Dependente' },
        { value: 'E', label: 'Estabelecimento' },
        { value: 'T', label: 'Todos' },
        { value: 'F', label: 'Funcionario/Representante' },
    ]

    const Funcao = [
        { value: 'T', label: 'Todos' },
        { value: 'D', label: 'Diretoria' },
        { value: 'R', label: 'Representante' },
        { value: 'F', label: 'Financeiro' },
        { value: 'C', label: 'Cobrança' },
        { value: 'G', label: 'Gerente' },
        { value: 'V', label: 'Vendas' }
    ]

    const Parceiro = [
        { value: 'P1', label: 'Matheus' },
        { value: 'P1', label: 'João' },
        { value: 'P1', label: 'Alex' },
        { value: 'P1', label: 'Alisson' },
    ]





    const [Nome, setNome, NomeRef] = UseInputMask();
    const [Login, setLogin, LoginRef] = UseInputMask();
    const [Tipo, setTipo, TipoRef] = UseInputMask();
    const [Informacoes, setInformacoes, InformacoesRef] = UseInputMask();
    const [Status, setStatus, StatusRef] = UseInputMask();
    const [Apelido, setApelido, ApelidoRef] = UseInputMask();
    const [Senha, setSenha, SenhaRef] = UseInputMask();
    const [Email, setEmail, EmailRef] = UseInputMask();
    const [Função, setFunção, FunçãoRef] = UseInputMask();
    const [parceiro, setparceiro, parceiroRef] = UseInputMask();




    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const [modalLogOpen, setModalLogOpen] = useState(false);

    const handleConfirmGravar = () => {
    }

    const handleConfirmDeletar = () => {
    }

     const openModalLog = () => {
        setModalLogOpen(true);
        setMenuOpen(false);
    };

    const closeModalLog = () => {
        setModalLogOpen(false);
    };

    const handleConfirmLog = () => {
        closeModalLog();
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const resizeHandler = () => {
            handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener("resize", resizeHandler);
        window.addEventListener("layout-resize", resizeHandler);

        requestAnimationFrame(() => {
            handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
        });

        return () => {
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("layout-resize", resizeHandler);
        };
    }, []);

    const formatTooltipText = (text) => {
        const wordMap = {
            'DESVINCULAR': 'Desvincular',
        };

        return wordMap[text.toUpperCase()] || text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };   

    return (
        <main className={styles.divContainer}>

        <h2 className={styles.titulo}>
          <i className="fa-solid fa-user"></i>
          Usuário
        </h2>

            {screenState.informacoesUsuario && (
                <section className={styles.divSecao}>
                    <div className={styles.secao}>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Nome:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Nome}
                                onChange={setNome}
                                inputRef={NomeRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Login:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Login}
                                onChange={setLogin}
                                inputRef={LoginRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Tipo:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                options={TipoOptions}
                                value={Tipo}
                                onChange={setTipo}
                                inputRef={TipoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Informações básicas:"
                                type="select" options={Info}
                                identifier="tipo-cliente-signin"
                                value={Informacoes}
                                onChange={setInformacoes}
                                inputRef={InformacoesRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Status:"
                                type="select"
                                options={StatusOptions}
                                identifier="tipo-cliente-signin"
                                value={Status}
                                onChange={setStatus}
                                inputRef={StatusRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Apelido:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Apelido}
                                onChange={setApelido}
                                inputRef={ApelidoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Senha:"
                                type="password"
                                identifier="tipo-cliente-signin"
                                value={Senha}
                                onChange={setSenha}
                                inputRef={SenhaRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                            <UseInputPadrao
                                label="Email:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Email}
                                onChange={setEmail}
                                inputRef={EmailRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Função:"
                                type="select"
                                options={Funcao}
                                identifier="tipo-cliente-signin"
                                value={Função}
                                onChange={setFunção}
                                inputRef={FunçãoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Parceiro:"
                                type="select"
                                options={Parceiro}
                                identifier="tipo-cliente-signin"
                                value={parceiro}
                                onChange={setparceiro}
                                inputRef={parceiroRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <button className={styles.BotaoDesvincular}>
                                <Tooltip text="Desvincular" position="top">
                                    <i className="fa fa-chain-broken"></i>
                                </Tooltip>
                            </button>
                        </div>
                    </div>

                </section>
            )}

            {screenState.novo && (
                <section className={styles.divSecao}>
                    <div className={styles.secao}>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Nome:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Nome}
                                onChange={setNome}
                                inputRef={NomeRef}
                                width={isMobile ? 100 : 50}
                            />

                            <UseInputPadrao
                                label="Login:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Login}
                                onChange={setLogin}
                                inputRef={LoginRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Tipo:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                options={TipoOptions}
                                value={Tipo}
                                onChange={setTipo}
                                inputRef={TipoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Informações básicas:"
                                type="select" options={Info}
                                identifier="tipo-cliente-signin"
                                value={Informacoes}
                                onChange={setInformacoes}
                                inputRef={InformacoesRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Status:"
                                type="select"
                                options={Parceiro}
                                identifier="tipo-cliente-signin"
                                value={StatusOptions}
                                onChange={setStatus}
                                inputRef={StatusRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Apelido:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Apelido}
                                onChange={setApelido}
                                inputRef={ApelidoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Senha:"
                                type="password"
                                identifier="tipo-cliente-signin"
                                value={Senha}
                                onChange={setSenha}
                                inputRef={SenhaRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                            <UseInputPadrao
                                label="Email:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Email}
                                onChange={setEmail}
                                inputRef={EmailRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Função:"
                                type="select"
                                options={Funcao}
                                identifier="tipo-cliente-signin"
                                value={Função}
                                onChange={setFunção}
                                inputRef={FunçãoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Parceiro:"
                                type="select"
                                options={Parceiro}
                                identifier="tipo-cliente-signin"
                                value={parceiro}
                                onChange={setparceiro}
                                inputRef={parceiroRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <button className={styles.BotaoDesvincular}>
                                <Tooltip text="Desvincular" position="top">
                                    <i className="fa fa-chain-broken"></i>
                                </Tooltip>
                            </button>
                        </div>
                    </div>

                </section>
            )}

            {screenState.gravar && (
                <section className={styles.divSecao}>
                    <div className={styles.secao}>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Nome:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Nome}
                                onChange={setNome}
                                inputRef={NomeRef}
                                width={isMobile ? 100 : 50}
                            />

                            <UseInputPadrao
                                label="Login:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Login}
                                onChange={setLogin}
                                inputRef={LoginRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Tipo:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                options={TipoOptions}
                                value={Tipo}
                                onChange={setTipo}
                                inputRef={TipoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Informações básicas:"
                                type="select" options={Info}
                                identifier="tipo-cliente-signin"
                                value={Informacoes}
                                onChange={setInformacoes}
                                inputRef={InformacoesRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Status:"
                                type="select"
                                options={StatusOptions}
                                identifier="tipo-cliente-signin"
                                value={Status}
                                onChange={setStatus}
                                inputRef={StatusRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Apelido:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Apelido}
                                onChange={setApelido}
                                inputRef={ApelidoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Senha:"
                                type="password"
                                identifier="tipo-cliente-signin"
                                value={Senha}
                                onChange={setSenha}
                                inputRef={SenhaRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                            <UseInputPadrao
                                label="Email:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Email}
                                onChange={setEmail}
                                inputRef={EmailRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Função:"
                                type="select"
                                options={Funcao}
                                identifier="tipo-cliente-signin"
                                value={Função}
                                onChange={setFunção}
                                inputRef={FunçãoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Parceiro:"
                                type="select"
                                options={Parceiro}
                                identifier="tipo-cliente-signin"
                                value={parceiro}
                                onChange={setparceiro}
                                inputRef={parceiroRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <button className={styles.BotaoDesvincular}>
                                <Tooltip text="Desvincular" position="top">
                                    <i className="fa fa-chain-broken"></i>
                                </Tooltip>
                            </button>
                        </div>
                    </div>

                </section>
            )}


            {screenState.deletar && (
                <section className={styles.divSecao}>
                    <div className={styles.secao}>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Nome:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Nome}
                                onChange={setNome}
                                inputRef={NomeRef}
                                width={isMobile ? 100 : 50}
                            />

                            <UseInputPadrao
                                label="Login:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Login}
                                onChange={setLogin}
                                inputRef={LoginRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Tipo:"
                                type="select"
                                identifier="tipo-cliente-signin"
                                options={TipoOptions}
                                value={Tipo}
                                onChange={setTipo}
                                inputRef={TipoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Informações básicas:"
                                type="select" options={Info}
                                identifier="tipo-cliente-signin"
                                value={Informacoes}
                                onChange={setInformacoes}
                                inputRef={InformacoesRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Status:"
                                type="select"
                                options={Parceiro}
                                identifier="tipo-cliente-signin"
                                value={Status}
                                onChange={setStatus}
                                inputRef={StatusRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Apelido:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Apelido}
                                onChange={setApelido}
                                inputRef={ApelidoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                        </div>

                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Senha:"
                                type="password"
                                identifier="tipo-cliente-signin"
                                value={Senha}
                                onChange={setSenha}
                                inputRef={SenhaRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                            <UseInputPadrao
                                label="Email:"
                                type="text"
                                identifier="tipo-cliente-signin"
                                value={Email}
                                onChange={setEmail}
                                inputRef={EmailRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />


                        </div>


                        <div className={styles.divInfo}>
                            <UseInputPadrao
                                label="Função:"
                                type="select"
                                options={Funcao}
                                identifier="tipo-cliente-signin"
                                value={Função}
                                onChange={setFunção}
                                inputRef={FunçãoRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />

                            <UseInputPadrao
                                label="Parceiro:"
                                type="select"
                                options={Parceiro}
                                identifier="tipo-cliente-signin"
                                value={parceiro}
                                onChange={setparceiro}
                                inputRef={parceiroRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <button className={styles.BotaoDesvincular}>
                                <Tooltip text="Desvincular" position="top">
                                    <i className="fa fa-chain-broken"></i>
                                </Tooltip>
                            </button>
                        </div>
                    </div>

                </section>
            )}


            {screenState.voltar && (() => {
                handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${jsonRoute.SegurancaUsuario}`);
                return null;
            })()}

            <div className={styles.actionButtons}>
                <div className={styles.actionButtonsGroup}>
                    <button className={`${styles.actionButton} ${styles.actionButtonNovo}`} onClick={() => setScreenState({ novo: true, gravar: false, deletar: false, voltar: false })}>
                        <i className="fa-solid fa-file"></i>
                        Novo
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={() => {
                        dialogMessage(
                            "Tem certeza que deseja gravar este registro?",
                            "info",
                            { buttonsText: { confirm: "Sim", cancel: "Não" } },
                            (result) => { if (result === true) { handleConfirmGravar(); } }
                        );
                    }}>
                        <i className="fa-solid fa-save"></i>
                        Gravar
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonDeletar}`} onClick={() => {
                        dialogMessage(
                            "Tem certeza que deseja deletar este registro?",
                            "info",
                            { buttonsText: { confirm: "Sim", cancel: "Não" } },
                            (result) => { if (result === true) { handleConfirmDeletar(); } }
                        );
                    }}>
                         <i className="fa-solid fa-trash"></i>
                        Remover
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={() => setScreenState({ novo: false, gravar: false, deletar: false, voltar: true })}>
                        <i className="fa-solid fa-arrow-left"></i>
                        Voltar
                    </button>
                </div>
                <div className={styles.actionButtonsGroup}>
                    <button className={`${styles.actionButton} ${styles.actionButtonNavegador}`} onClick={toggleMenu}>
                        <i className="fa-solid fa-floppy-disk"></i>
                        Navegador
                    </button>
                    {menuOpen && (
                        <div className={styles.menuContainer}>
                            <ul className={styles.menuList}>
                                <li className={styles.menuItem} onClick={openModalLog}><i className="fa-solid fa-tag" /> Log Auditoria</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {modalLogOpen && <ModalLog closeModal={closeModalLog} onCloseOrConfirm={handleConfirmLog} />}
        </main>



    )
}
export default InfoTabela;
