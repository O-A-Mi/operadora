import { useState, useEffect } from "react";
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';
import ModalEspecialide from "../modalEspecialidade/modalEspecialidade.jsx";
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../../utils/json";
import TogglePadrao from "../../../../../../../components/TogglePadrao";
import StepperPadrao from '../../../../../../../components/StepperPadrao';
import { useModal } from '../../../../../../../context';
import { handleResizeTabela } from "../../../../../../../utils/functions.js";


const InfoRepresentante = () => {

    const [currentStep, setCurrentStep] = useState(0);


    const [contratoFirmado, setContratoFirmado] = useState(false);


    const steps = [
        { id: 0, name: 'Informações Básicas', icon: 'fa-solid fa-user', color: '#3b82f6' },
        { id: 1, name: 'Endereço', icon: 'fa-solid fa-location-dot', color: '#10b981' },
        { id: 2, name: 'Contato', icon: 'fa-solid fa-phone', color: '#db1b1bff' },
        { id: 3, name: 'Horário Comercial', icon: 'fa-solid fa-clock', color: '#eefd1dff' },
        { id: 4, name: 'Dados para Emissão de Contrato', icon: 'fa-solid fa-file', color: '#931be2ff' },
        { id: 5, name: 'Fotos', icon: 'fa-solid fa-camera', color: '#1bd5e2ff' },
        { id: 6, name: 'Financeiro', icon: 'fa-solid fa-money-bill-1', color: '#57df45ff' },
    ];


    const [screenState, setScreenState] = useState({
        voltar: false,
    });
    const navigate = useNavigate();

    // ---------------------DADOS PESSOAIS------------------------------//

    const [Pais, setPais, PaisRef] = UseInputMask();
    const [CpfCnpj, setCpfCnpj, CpfCnpjRef] = UseInputMask();
    const [NomeRepresentante, setNomeRepresentante, NomeRepresentanteRef] = UseInputMask()
    const [Status, setStatus, StatusRef] = UseInputMask()
    const [RazaoSocial, setRazaoSocial, RazaoSocialRef] = UseInputMask();
    const [Segmento, setSegmento, SegmentoRef] = UseInputMask();
    const [Especialidade, setEspecialidade, EspecialidadeRef] = UseInputMask();
    const [Descricao, setDescricao, DescricaoRef] = UseInputMask();

    // ----------------------DADOS DE ENDEREÇO-----------------------------//
    const [cep, setCep, cepRef] = UseInputMask();
    const [pais, setpais, paisRef] = UseInputMask();
    const [cidade, setcidade, cidadeRef] = UseInputMask();
    const [endereco, setendereco, enderecoRef] = UseInputMask();
    const [complemento, setcomplemento, complementoRef] = UseInputMask();
    const [bairro, setbairro, bairroRef] = UseInputMask();
    const [UF, setUF, UFRef] = UseInputMask();
    const [latitude, setlatitude, latitudeRef] = UseInputMask();
    const [longitude, setlongitude, longitudeRef] = UseInputMask();
    const [maps, setmaps, mapsRef] = UseInputMask();

    // ----------------------DADOS DE TELEFONE-----------------------------//
    const [numero, setnumero, numeroRef] = UseInputMask();
    const [telefone, setTelefone, telefoneRef] = UseInputMask();
    const [site, setsite, siteRef] = UseInputMask();
    const [facebook, setfacebook, facebookRef] = UseInputMask();
    const [email, setemail, emailRef] = UseInputMask();
    const [Twitter, setTwitter, TwitterRef] = UseInputMask();
    const [Instagram, setInstagram, InstagramRef] = UseInputMask();
    const [YouTube, setYouTube, YouTubeRef] = UseInputMask();
    const [WhatsApp, setWhatsApp, WhatsAppRef] = UseInputMask();
    const [Skype, setSkype, SkypeRef] = UseInputMask();


    // ----------------------DADOS HORARIO COMERCIAL-----------------------------//
    const [aberturaSegunda, setAberturaSegunda, aberturaSegundaRef] = UseInputMask();
    const [aberturaTerca, setAberturaTerca, aberturaTercaRef] = UseInputMask();
    const [aberturaQuarta, setAberturaQuarta, aberturaQuartaRef] = UseInputMask();
    const [aberturaQuinta, setAberturaQuinta, aberturaQuintaRef] = UseInputMask();
    const [aberturaSexta, setAberturaSexta, aberturaSextaRef] = UseInputMask();
    const [aberturaSabado, setAberturaSabado, aberturaSabadoRef] = UseInputMask();
    const [aberturaDomingo, setAberturaDomingo, aberturaDomingoRef] = UseInputMask();

    const [fechamentoSegunda, setFechamentoSegunda, fechamentoSegundaRef] = UseInputMask();
    const [fechamentoTerca, setFechamentoTerca, fechamentoTercaRef] = UseInputMask();
    const [fechamentoQuarta, setFechamentoQuarta, fechamentoQuartaRef] = UseInputMask();
    const [fechamentoQuinta, setFechamentoQuinta, fechamentoQuintaRef] = UseInputMask();
    const [fechamentoSexta, setFechamentoSexta, fechamentoSextaRef] = UseInputMask();
    const [fechamentoSabado, setFechamentoSabado, fechamentoSabadoRef] = UseInputMask();
    const [fechamentoDomingo, setFechamentoDomingo, fechamentoDomingoRef] = UseInputMask();


    // ----------------------DADOS PARA EMISSÃO DE CONTRATO-----------------------------//
    const [paisEC, setpaisEC, paisECRef] = UseInputMask();
    const [cepEC, setcepEC, cepECRef] = UseInputMask();
    const [enderecoEC, setenderecoEC, enderecoECRef] = UseInputMask();
    const [numeroEC, setnumeroEC, numeroECRef] = UseInputMask();
    const [complementoEC, setcomplementoEC, complementoECRef] = UseInputMask();
    const [bairroEC, setbairroEC, bairroECRef] = UseInputMask();
    const [cidadeEC, setcidadeEC, cidadeECRef] = UseInputMask();
    const [UFEC, setUFEC, UFECRef] = UseInputMask();
    const [observacaoEC, setobservacaoEC, observacaoECRef] = UseInputMask();

    // ----------------------DADOS PARA FOTOS-----------------------------//
    const [upload280, setupload280, upload280Ref] = UseInputMask();
    const [upload540, setupload540, upload540Ref] = UseInputMask();


    
    // ----------------------DADOS PARA FINANCEIRO-----------------------------//
    const [DataContrato, setDataContrato, DataContratoRef] = UseInputMask();
    const [PercentualDesconto, setPercentualDesconto, PercentualDescontoRef] = UseInputMask();
    const [Negociacao, setNegociacao, NegociacaoRef] = UseInputMask();



    const handleNavigate = (route) => {
        navigate(route);
    };


    const handleConfirmGravar = () => {
    }

    const handleConfirmDeletar = () => {
    }

    const closeModalEspecialidade = () => {
        closeModal('modalEspecialidade');
    }

    const handleConfirmEspecialidade = () => {
        closeModal('modalEspecialidade');
    }


    const handleBackClick = () => {
        setScreenState({ voltar: true });
    };

    const isFirstStep = () => {
        return currentStep === 0;
    };

    const isLastStep = () => {
        return currentStep === steps.length - 1;
    };

    const handleAnterior = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleProximo = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    if (screenState.voltar) {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${jsonRoute.CadastroRepresentante}`);
    }

    const { openModal, closeModal, isModalOpen } = useModal();



    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);


    // Estados para horários comerciais - estrutura simplificada
    const [horariosComerciais, setHorariosComerciais] = useState([
        { dia: 'Segunda', ativo: false },
        { dia: 'Terça', ativo: false },
        { dia: 'Quarta', ativo: false },
        { dia: 'Quinta', ativo: false },
        { dia: 'Sexta', ativo: false },
        { dia: 'Sábado', ativo: false },
        { dia: 'Domingo', ativo: false },
    ]);

    // Função para atualizar horário de abertura
    const handleAberturaChange = (value, index) => {
        switch (index) {
            case 0: setAberturaSegunda(value); break;
            case 1: setAberturaTerca(value); break;
            case 2: setAberturaQuarta(value); break;
            case 3: setAberturaQuinta(value); break;
            case 4: setAberturaSexta(value); break;
            case 5: setAberturaSabado(value); break;
            case 6: setAberturaDomingo(value); break;
        }
    };

    // Função para atualizar horário de fechamento
    const handleFechamentoChange = (value, index) => {
        switch (index) {
            case 0: setFechamentoSegunda(value); break;
            case 1: setFechamentoTerca(value); break;
            case 2: setFechamentoQuarta(value); break;
            case 3: setFechamentoQuinta(value); break;
            case 4: setFechamentoSexta(value); break;
            case 5: setFechamentoSabado(value); break;
            case 6: setFechamentoDomingo(value); break;
        }
    };

    // Função para obter valor de abertura
    const getAberturaValue = (index) => {
        switch (index) {
            case 0: return aberturaSegunda;
            case 1: return aberturaTerca;
            case 2: return aberturaQuarta;
            case 3: return aberturaQuinta;
            case 4: return aberturaSexta;
            case 5: return aberturaSabado;
            case 6: return aberturaDomingo;
            default: return '';
        }
    };

    // Função para obter valor de fechamento
    const getFechamentoValue = (index) => {
        switch (index) {
            case 0: return fechamentoSegunda;
            case 1: return fechamentoTerca;
            case 2: return fechamentoQuarta;
            case 3: return fechamentoQuinta;
            case 4: return fechamentoSexta;
            case 5: return fechamentoSabado;
            case 6: return fechamentoDomingo;
            default: return '';
        }
    };

    // Função para obter inputRef de abertura
    const getAberturaRef = (index) => {
        switch (index) {
            case 0: return aberturaSegundaRef;
            case 1: return aberturaTercaRef;
            case 2: return aberturaQuartaRef;
            case 3: return aberturaQuintaRef;
            case 4: return aberturaSextaRef;
            case 5: return aberturaSabadoRef;
            case 6: return aberturaDomingoRef;
            default: return { current: null };
        }
    };

    // Função para obter inputRef de fechamento
    const getFechamentoRef = (index) => {
        switch (index) {
            case 0: return fechamentoSegundaRef;
            case 1: return fechamentoTercaRef;
            case 2: return fechamentoQuartaRef;
            case 3: return fechamentoQuintaRef;
            case 4: return fechamentoSextaRef;
            case 5: return fechamentoSabadoRef;
            case 6: return fechamentoDomingoRef;
            default: return { current: null };
        }
    };

    const handleToggleChange = (checked, index) => {
        const newHorarios = [...horariosComerciais];
        newHorarios[index].ativo = checked;
        // Adiciona a propriedade mostrarFechado para controlar a exibição do texto "dia fechado"
        newHorarios[index].mostrarFechado = checked;
        setHorariosComerciais(newHorarios);
    };

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

    return (
        <>
            <h2 className={styles.titulo}>
                <i className="fa-solid fa-hospital"></i>
                Representante
            </h2>
            <StepperPadrao
                steps={steps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
            >
                {currentStep === 0 && (
                    <>
                        <h3 className={styles.titulo}>
                            <i className="fa-solid fa-user"></i>
                            Informações Básicas
                        </h3>
                        <main className={styles.divSecao}>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-pais"
                                    value={Pais}
                                    onChange={setPais}
                                    inputRef={PaisRef}
                                    label="País"
                                    width={isMobile ? 100 : 20}
                                    gap={0}
                                />
                            </div>


                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-cpf/cnpj"
                                    value={CpfCnpj}
                                    onChange={setCpfCnpj}
                                    inputRef={CpfCnpjRef}
                                    label="CPF/CNPJ:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-nome do representante"
                                    value={NomeRepresentante}
                                    onChange={setNomeRepresentante}
                                    inputRef={NomeRepresentanteRef}
                                    label="Nome do Representante"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-status"
                                    value={Status}
                                    onChange={setStatus}
                                    inputRef={StatusRef}
                                    label="Status:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                            </div>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-razao-social"
                                    value={RazaoSocial}
                                    onChange={setRazaoSocial}
                                    inputRef={RazaoSocialRef}
                                    label="Razão Social:"
                                    width={isMobile ? 100 : 100}
                                    gap={isMobile ? 0 : 0.0}
                                />
                            </div>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-segmento"
                                    value={Segmento}
                                    onChange={setSegmento}
                                    inputRef={SegmentoRef}
                                    label="Segmento:"
                                    width={isMobile ? 100 : 100}
                                    gap={isMobile ? 0 : 0}
                                />

                            </div>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-especialidade"
                                    value={Especialidade}
                                    onChange={setEspecialidade}
                                    inputRef={EspecialidadeRef}
                                    label="Especialidade:"
                                    width={isMobile ? 100 : 100}
                                    gap={isMobile ? 0 : 0}
                                />
                            </div>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="textarea"
                                    identifier="tipo-cliente-signin"
                                    value={Descricao}
                                    onChange={setDescricao}
                                    inputRef={DescricaoRef}
                                    label="Descreva as atividades do comércio:"
                                    width={isMobile ? 100 : 100}
                                    gap={isMobile ? 0 : 0}
                                />
                            </div>
                        </main>
                    </>
                )}
                {currentStep === 1 && (
                    <>
                        <h3 className={styles.titulo}>
                            <i className="fa-solid fa-location-dot"></i>
                            Endereço
                        </h3>
                        <main className={styles.secao}>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-CEP"
                                    value={cep}
                                    onChange={setCep}
                                    inputRef={cepRef}
                                    label="CEP:"
                                    icon="fa-solid fa-magnifying-glass"
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0}
                                />
                            </div>


                            <div className={styles.divInfo}>

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-endereco"
                                    value={endereco}
                                    onChange={setendereco}
                                    inputRef={enderecoRef}
                                    label="Endereço:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-numero"
                                    value={numero}
                                    onChange={setnumero}
                                    inputRef={numeroRef}
                                    label="Número:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-complemento"
                                    value={complemento}
                                    onChange={setcomplemento}
                                    inputRef={complementoRef}
                                    label="Complemento:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                            </div>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-bairro"
                                    value={bairro}
                                    onChange={setbairro}
                                    inputRef={bairroRef}
                                    label="Bairro:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-cidade"
                                    value={cidade}
                                    onChange={setcidade}
                                    inputRef={cidadeRef}
                                    label="Cidade:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-uf"
                                    value={UF}
                                    onChange={setUF}
                                    inputRef={UFRef}
                                    label="UF:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                            </div>
                        </main>

                        <h3 className={styles.titulo2}>
                            <i className="fa-solid fa-map-marker-alt"></i>
                            Coordenada
                        </h3>
                        <main className={styles.divSecao}>

                            <div className={styles.divInfo}>
                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-latitude"
                                    value={latitude}
                                    onChange={setlatitude}
                                    inputRef={latitudeRef}
                                    label="Latitude:"
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0.333}
                                />



                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-longitude"
                                    value={longitude}
                                    onChange={setlongitude}
                                    inputRef={longitudeRef}
                                    label="Longitude:"
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0.333}
                                />



                                <button className={styles.botaoMaps}>
                                    <i className="fa-solid fa-location-dot"></i>
                                    maps
                                </button>

                            </div>
                        </main>
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <h3 className={styles.titulo}>
                            <i className="fa-solid fa-phone"></i>
                            Contato
                        </h3>
                        <main className={styles.secao}>
                            <section className={styles.divInfo}>

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-telefone"
                                    value={telefone}
                                    onChange={setTelefone}
                                    inputRef={telefoneRef}
                                    label="Telefone:"
                                    width={isMobile ? 100 : 33.3}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-site"
                                    value={site}
                                    onChange={setsite}
                                    inputRef={siteRef}
                                    label="Site:"
                                    width={isMobile ? 100 : 33.3}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-email"
                                    value={email}
                                    onChange={setemail}
                                    inputRef={emailRef}
                                    label="E-mail:"
                                    width={isMobile ? 100 : 33.3}
                                    gap={isMobile ? 0 : 0.333}
                                />
                            </section>

                            <section className={styles.divInfo}>

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-facebook"
                                    value={facebook}
                                    onChange={setfacebook}
                                    inputRef={facebookRef}
                                    label="Facebook:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-twitter"
                                    value={Twitter}
                                    onChange={setTwitter}
                                    inputRef={TwitterRef}
                                    label="Twitter:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-instagram"
                                    value={Instagram}
                                    onChange={setInstagram}
                                    inputRef={InstagramRef}
                                    label="Instagram:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />
                            </section>


                            <section className={styles.divInfo}>
                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-youtube"
                                    value={YouTube}
                                    onChange={setYouTube}
                                    inputRef={YouTubeRef}
                                    label="YouTube:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-whatsapp"
                                    value={WhatsApp}
                                    onChange={setWhatsApp}
                                    inputRef={WhatsAppRef}
                                    label="WhatsApp:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-skype"
                                    value={Skype}
                                    onChange={setSkype}
                                    inputRef={SkypeRef}
                                    label="Skype:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                            </section>
                        </main>
                    </>
                )}

                {currentStep === 3 && (
                    <>

                        <h3 className={styles.titulo}>
                            <i className="fa-solid fa-clock"></i>  Horário Comercial
                        </h3>

                        <main className={styles.secao}>
                            {horariosComerciais.map((horario, index) => (
                                <>

                                    <section key={index} className={styles.horarioContainer}>
                                        <span className={styles.DiaDaSemana}>{horario.dia}</span>

                                        <UseInputPadrao
                                            type="apenas hora"
                                            value={getAberturaValue(index)}
                                            onChange={(value) => handleAberturaChange(value, index)}
                                            inputRef={getAberturaRef(index)}
                                            icon="fa-solid fa-clock"
                                            label={"Entrada"}
                                            width={isMobile ? 100 : 30}
                                            gap={isMobile ? 0 : 0.5}
                                            disabled={horario.ativo}
                                        />

                                        <UseInputPadrao
                                            type="apenas hora"
                                            value={getFechamentoValue(index)}
                                            onChange={(value) => handleFechamentoChange(value, index)}
                                            inputRef={getFechamentoRef(index)}
                                            icon="fa-solid fa-clock"
                                            label={"Saída"}
                                            width={isMobile ? 100 : 30}
                                            gap={isMobile ? 0 : 0.5}
                                            disabled={horario.ativo}
                                        />

                                        <TogglePadrao
                                            checked={horario.ativo}
                                            onChange={(checked) => handleToggleChange(checked, index)}
                                            option1="Não"
                                            option2="Sim"
                                        />
                                        {horario.mostrarFechado && (
                                            <span style={{
                                                marginLeft: '10px',
                                                color: '#666',
                                                fontSize: '12px',
                                                fontStyle: 'italic'
                                            }}>
                                                fechado
                                            </span>
                                        )}
                                    </section>
                                </>
                            ))}
                        </main>
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        <div className={styles.divTituloEmissao}>
                            <h3 className={styles.titulo}>
                                <i className="fa-solid fa-file"></i>
                                Dados para Emissão do Contrato
                            </h3>
                            <button className={styles.botaoEmissao}>Importar dados</button>
                        </div>
                        <main className={styles.secao}>
                            <section className={styles.divInfo}>

                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-paisEc"
                                    value={paisEC}
                                    onChange={setpaisEC}
                                    inputRef={paisECRef}
                                    label="País"
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0.5}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-cepEc"
                                    value={cepEC}
                                    onChange={setcepEC}
                                    inputRef={cepECRef}
                                    label="CEP:"
                                    icon="fa-solid fa-magnifying-glass"
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0.5}
                                />


                            </section>

                            <section className={styles.divInfo}>

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-enderecoEc"
                                    value={enderecoEC}
                                    onChange={setenderecoEC}
                                    inputRef={enderecoECRef}
                                    label="Endereço:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-numeroEc"
                                    value={numeroEC}
                                    onChange={setnumeroEC}
                                    inputRef={numeroECRef}
                                    label="Número"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-complementoEc"
                                    value={complementoEC}
                                    onChange={setcomplementoEC}
                                    inputRef={complementoECRef}
                                    label="Complemento"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                            </section>

                            <section className={styles.divInfo}>

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-bairroEc"
                                    value={bairroEC}
                                    onChange={setbairroEC}
                                    inputRef={bairroECRef}
                                    label="Bairro:"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-cidadeEc"
                                    value={cidadeEC}
                                    onChange={setcidadeEC}
                                    inputRef={cidadeECRef}
                                    label="Cidade"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />


                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-ufEc"
                                    value={UFEC}
                                    onChange={setUFEC}
                                    inputRef={UFECRef}
                                    label="UF"
                                    width={isMobile ? 100 : 33.33}
                                    gap={isMobile ? 0 : 0.333}
                                />

                            </section>

                            <section className={styles.divInfo}>

                                <UseInputPadrao
                                    type="textarea"
                                    identifier="tipo-observacao"
                                    value={observacaoEC}
                                    onChange={setobservacaoEC}
                                    inputRef={observacaoECRef}
                                    label="Observação"
                                    width={isMobile ? 100 : 100}
                                />

                            </section>
                        </main>
                    </>
                )}

                {currentStep === 5 && (
                    <>
                        <h3 className={styles.titulo}>
                            <i className="fa-solid fa-camera"></i>
                            Fotos
                        </h3>

                        <main className={styles.FotosContainer}>
                            <section className={styles.inputPictures}>
                                <div className={styles.boxImage}>
                                    <div>
                                        <UseInputPadrao
                                            type="file"
                                            identifier="tipo-cliente-signin"
                                            value={upload280}
                                            onChange={(e) => handleFileChange('comercio', e)}
                                            inputRef={upload280Ref}
                                            label="Foto do Comércio (.png)"
                                            inputButtonRight={[
                                                {
                                                    icon: 'fa-solid fa-file',
                                                    text: 'Upload',
                                                    onClick: () => handleFileUpload('comercio'),
                                                    tooltip: 'Clique para fazer Upload',
                                                },
                                                {
                                                    icon: 'fa-solid fa-eye',
                                                    text: 'Visualizar',
                                                    onClick: () => handlePreviewImage('comercio'),
                                                    tooltip: 'Clique para visualizar',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className={styles.boxImage}>
                                    <div>
                                        <UseInputPadrao
                                            type="file"
                                            identifier="tipo-cliente-signin"
                                            value={upload540}
                                            onChange={(e) => handleFileChange('banner', e)}
                                            inputRef={upload540Ref}
                                            label="Foto do Banner (.png)"
                                            inputButtonRight={[
                                                {
                                                    icon: 'fa-solid fa-file',
                                                    text: 'Upload',
                                                    onClick: () => handleFileUpload('banner'),
                                                    tooltip: 'Clique para fazer Upload',
                                                },
                                                {
                                                    icon: 'fa-solid fa-eye',
                                                    text: 'Visualizar',
                                                    onClick: () => handlePreviewImage('banner'),
                                                    tooltip: 'Clique para visualizar',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                            </section>
                        </main>
                    </>
                )}


                {currentStep === 6 && (
                    <>
                        <h3 className={styles.titulo}>
                            <i className="fa-solid fa-hospital"></i>
                            Financeiro
                        </h3>

                        <main className={styles.secao}>
                            <section className={styles.divFinanceiro}>
                                <div>
                                    <TogglePadrao
                                        label="Contrato firmado?"
                                        checked={contratoFirmado}
                                        onChange={(checked) => setContratoFirmado(checked)}
                                        option1="Não"
                                        option2="Sim"
                                    />
                                </div>

                                <UseInputPadrao
                                    type="date"
                                    identifier="tipo-cliente-signin"
                                    value={DataContrato}
                                    onChange={setDataContrato}
                                    inputRef={DataContratoRef}
                                    label="Data do contrato firmado"
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0.166}
                                />

                                <UseInputPadrao
                                    type="text"
                                    identifier="tipo-cliente-signin"
                                    value={PercentualDesconto}
                                    onChange={setPercentualDesconto}
                                    inputRef={PercentualDescontoRef}
                                    label="Percentual de desconto % "
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0.166}
                                />

                                <UseInputPadrao
                                    type="select"
                                    identifier="tipo-cliente-signin"
                                    value={Negociacao}
                                    onChange={setNegociacao}
                                    inputRef={NegociacaoRef}
                                    label="Negociação "
                                    width={isMobile ? 100 : 20}
                                    gap={isMobile ? 0 : 0.166}
                                />


                            </section>
                        </main>
                    </>
                )}
            </StepperPadrao>

            <div className={styles.actionButtons}>
                <div className={styles.actionButtonsGroup}>
                    <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={() => {
                        dialogMessage(
                            "Tem certeza que deseja gravar este registro?",
                            "info",
                            {
                                buttonsText: {
                                    confirm: "Sim",
                                    cancel: "Não"
                                }
                            },
                            (result) => {
                                if (result === true) {
                                    handleConfirmGravar();
                                }
                            }
                        );
                    }}>
                        <i className="fa-solid fa-save"></i>
                        Gravar
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonDeletar}`} onClick={() => {
                        dialogMessage(
                            "Tem certeza que deseja remover este registro?",
                            "info",
                            {
                                buttonsText: {
                                    confirm: "Sim",
                                    cancel: "Não"
                                }
                            },
                            (result) => {
                                if (result === true) {
                                    handleConfirmDeletar();
                                }
                            }
                        );
                    }}>
                        <i className="fa-solid fa-trash"></i>
                        Remover
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleBackClick}>
                        <i className="fa-solid fa-arrow-left"></i>
                        Voltar
                    </button>
                </div>
                <div className={styles.actionButtonsGroup}>
                    {!isFirstStep() && (
                        <button className={`${styles.actionButton} ${styles.actionButtonAnterior}`} onClick={handleAnterior}>
                            <i className="fa-solid fa-chevron-left"></i>
                            Anterior
                        </button>
                    )}
                    {!isLastStep() && (
                        <button className={`${styles.actionButton} ${styles.actionButtonProximo}`} onClick={handleProximo}>
                            Próximo
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    )}
                </div>
            </div>

            {isModalOpen('modalEspecialidade') && <ModalEspecialide closeModal={closeModalEspecialidade} onCloseOrConfirm={handleConfirmEspecialidade} />}
        </>
    )
}

export default InfoRepresentante;


