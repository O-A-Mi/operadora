import styles from './styles.module.css';
import { InputPadrao, UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';
import { useState } from 'react';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog'
import Seguranca from '../../index.jsx';
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../../utils/json";

function InfoTabela() {

    const [screenState, setScreenState] = useState({
        informacoesUsuario: true,
        novo: false,
        gravar: false,
        deletar: false,
        voltar: false,

    })

    const handleModalCloseOrConfirm = () => setScreenState({ novo: true, gravar: false, deletar: false, voltar: false });

    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
    };

    const [tipoCliente, setTipoCliente] = useState([]);

    const Status2 = [
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

    const Tipo2 = [
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
        { value: 'P1', label: 'Fulano' },
        { value: 'P1', label: 'Teste' },
        { value: 'P1', label: 'Kratos' },
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

    return (
        <main className={styles.divContainer}>

            <div className={styles.divTitulo}>
                <h2>Usuário</h2>
            </div>

            {screenState.informacoesUsuario && (
                <section className={styles.divSecao}>
                    <div className={styles.secao}>

                        <div>
                            <div>
                                <UseInputPadrao label="Nome:" type="text" identifier="tipo-cliente-signin" value={Nome} onChange={setNome} inputRef={NomeRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Login:" type="text" identifier="tipo-cliente-signin" value={Login} onChange={setLogin} inputRef={LoginRef} />
                            </div>
                        </div>

                        <div>
                            <div>

                                <UseInputPadrao label="Tipo:" type="select" identifier="tipo-cliente-signin" value={Tipo2} onChange={setTipo} inputRef={TipoRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Informações básicas:" type="select" options={Info} identifier="tipo-cliente-signin" value={Informacoes} onChange={setInformacoes} inputRef={InformacoesRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Status:" type="select" options={Parceiro} identifier="tipo-cliente-signin" value={Status} onChange={setStatus} inputRef={StatusRef} />
                            </div>
                        </div>

                    </div>


                    <div className={styles.secao2}>
                        <div>
                            <div className={styles.campo}>
                                <div>
                                    <UseInputPadrao label="Apelido:" type="text" identifier="tipo-cliente-signin" value={Apelido} onChange={setApelido} inputRef={ApelidoRef} />
                                </div>

                                <div>
                                    <UseInputPadrao label="Senha:" type="password" identifier="tipo-cliente-signin" value={Senha} onChange={setSenha} inputRef={SenhaRef} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Email:" type="text" identifier="tipo-cliente-signin" value={Email} onChange={setEmail} inputRef={EmailRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Função:" type="select" options={Funcao} identifier="tipo-cliente-signin" value={Função} onChange={setFunção} inputRef={FunçãoRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Parceiro:" type="select" options={Parceiro} identifier="tipo-cliente-signin" value={parceiro} onChange={setparceiro} inputRef={parceiroRef} />
                            </div>
                        </div>

                    </div>

                </section>
            )}

            {screenState.novo && (
                <section className={styles.divSecao}>
                    <div className={styles.secao}>

                        <div>
                            <div>
                                <UseInputPadrao label="Nome:" type="text" identifier="tipo-cliente-signin" value={Nome} onChange={setNome} inputRef={NomeRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Login:" type="text" identifier="tipo-cliente-signin" value={Login} onChange={setLogin} inputRef={LoginRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Tipo:" type="select" options={Tipo2} identifier="tipo-cliente-signin" value={Tipo} onChange={setTipo} inputRef={TipoRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Informações básicas:" type="select" options={Status2} identifier="tipo-cliente-signin" value={Informacoes} onChange={setInformacoes} inputRef={InformacoesRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Status:" type="select" options={Status2} identifier="tipo-cliente-signin" value={Status} onChange={setStatus} inputRef={StatusRef} />
                            </div>
                        </div>

                    </div>


                    <div className={styles.secao2}>
                        <div>
                            <div className={styles.campo}>
                                <div>
                                    <UseInputPadrao label="Apelido:" type="text" identifier="tipo-cliente-signin" value={Apelido} onChange={setApelido} inputRef={ApelidoRef} />
                                </div>

                                <div>
                                    <UseInputPadrao label="Senha:" type="password" identifier="tipo-cliente-signin" value={Senha} onChange={setSenha} inputRef={SenhaRef} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Email:" type="text" identifier="tipo-cliente-signin" value={Email} onChange={setEmail} inputRef={EmailRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Função:" type="select" options={Funcao} identifier="tipo-cliente-signin" value={Função} onChange={setFunção} inputRef={FunçãoRef} />
                            </div>
                        </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Parceiro:" type="select" options={Parceiro} identifier="tipo-cliente-signin" value={parceiro} onChange={setparceiro} inputRef={parceiroRef} />
                            </div>
                        </div>

                    </div>



                </section>
            )}

            {screenState.gravar && (
                <section>
                    <section className={styles.divSecao}>
                        <div className={styles.secao}>

                            <div>
                                <div>
                                    <UseInputPadrao label="Nome:" type="text" identifier="tipo-cliente-signin" value={Nome} onChange={setNome} inputRef={NomeRef} />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <UseInputPadrao label="Login:" type="text" identifier="tipo-cliente-signin" value={Login} onChange={setLogin} inputRef={LoginRef} />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <UseInputPadrao label="Tipo:" type="select" options={Tipo2} identifier="tipo-cliente-signin" value={Tipo} onChange={setTipo} inputRef={TipoRef} />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <UseInputPadrao label="Informações básicas:" type="select" options={Status2} identifier="tipo-cliente-signin" value={Informacoes} onChange={setInformacoes} inputRef={InformacoesRef} />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <UseInputPadrao label="Status:" type="select" options={Status2} identifier="tipo-cliente-signin" value={Status} onChange={setStatus} inputRef={StatusRef} />
                                </div>
                            </div>

                        </div>


                        <div className={styles.secao2}>
                            <div>
                                <div className={styles.campo}>
                                    <div>
                                        <UseInputPadrao label="Apelido:" type="text" identifier="tipo-cliente-signin" value={Apelido} onChange={setApelido} inputRef={ApelidoRef} />
                                    </div>

                                    <div>
                                        <UseInputPadrao label="Senha:" type="password" identifier="tipo-cliente-signin" value={Senha} onChange={setSenha} inputRef={SenhaRef} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <UseInputPadrao label="Email:" type="text" identifier="tipo-cliente-signin" value={Email} onChange={setEmail} inputRef={EmailRef} />
                                </div>
                            </div>

                        <div>
                            <div>
                                <UseInputPadrao label="Função:" type="select" options={Funcao} identifier="tipo-cliente-signin" value={Função} onChange={setFunção} inputRef={FunçãoRef} />
                            </div>
                        </div>

                            <div>
                                <div>
                                    <UseInputPadrao label="Parceiro:" type="select" options={Parceiro} identifier="tipo-cliente-signin" value={parceiro} onChange={setparceiro} inputRef={parceiroRef} />
                                </div>
                            </div>

                        </div>

                    </section>
                </section>
            )}


            {screenState.voltar && (() => {
                handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}`);
                return null;
            })()}

            <section className={styles.divBotoes}>
                <button className={`${styles.botao1} ${screenState.tabela}`} onClick={() => setScreenState({ novo: true, gravar: false, deletar: false, voltar: false })}><i className="fa-solid fa-file"></i> Novo</button>
                <button className={`${styles.botao2} ${screenState.tabela}`} onClick={() => {
                    dialogMessage(
                        "Tem certeza que deseja gravar este registro?",
                        "info",
                        { buttonsText: { confirm: "Sim", cancel: "Não" } },
                        (result) => { if (result === true) { handleModalCloseOrConfirm(); } }
                    );
                }}><i className="fa-solid fa-floppy-disk"></i>Gravar</button>
                <button className={`${styles.botao3} ${screenState.tabela}`} onClick={() => {
                    dialogMessage(
                        "Tem certeza que deseja deletar este registro?",
                        "info",
                        { buttonsText: { confirm: "Sim", cancel: "Não" } },
                        (result) => { if (result === true) { setScreenState({ novo: false, gravar: false, deletar: false, voltar: false }); } }
                    );
                }}><i className="fa-solid fa-trash"></i>Remover</button>
                <button className={`${styles.botao4} ${screenState.tabela}`} onClick={() => setScreenState({ novo: false, gravar: false, deletar: false, voltar: true })}><i className="fa-solid fa-circle-arrow-left"></i>voltar</button>
            </section>
        </main>



    )
}
export default InfoTabela;
