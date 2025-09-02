import { useState, useEffect } from "react";
import styles from '../styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import ModalMensagem from './modalMensagem/modalmensagem.jsx';
import ModalFormulario from './modalFormulario/modalFormulario.jsx';
import ModalAnexo from './modalAnexo/modalAnexo.jsx';
import ModalLog from './modalLogAuditoria/modalLogAuditoria.jsx'; 
import ModalDependente from './modalDependente/modalDependente.jsx'
import Usuario from './modalUsuario/usuarioMobile.jsx'
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../utils/json.js";


import StepperPadrao from '../../../../../../components/StepperPadrao';

const CriarCliente = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 0, name: 'Informações Básicas', icon: 'fa-solid fa-user', color: '#3b82f6' },
    { id: 1, name: 'Endereço', icon: 'fa-solid fa-location-dot', color: '#10b981' },
    { id: 2, name: 'Contato', icon: 'fa-solid fa-phone', color: '#f59e0b' },
  ];

  const [modalMensagemTipo, setModalMensagemTipo] = useState(false);
  const [modalFormularioOpen, setModalFormularioOpen] = useState(false);
  const [modalAnexoOpen, setModalAnexoOpen] = useState(false);
  const [modalLogOpen, setModalLogOpen] = useState(false);
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [modalDependenteOpen, setModalDependenteOpen] = useState(false);

  const [screenState, setScreenState] = useState({
    voltar: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavegador, setShowNavegador] = useState(false);
  const navigate = useNavigate();

  const navegadorOptions = [
    { id: 'whatsapp', label: 'Whatsapp', icon: 'fa-brands fa-whatsapp' },
    { id: 'email', label: 'Email', icon: 'fa-solid fa-envelope' },
    { id: 'sms', label: 'SMS', icon: 'fa-regular fa-comment' },
    { id: 'dependente', label: 'Dependente', icon: 'fa-solid fa-users' },
    { id: 'formulario', label: 'Formulários', icon: 'fa-solid fa-file-lines' },
    { id: 'anexo', label: 'Anexo', icon: 'fa-solid fa-paperclip' },
    { id: 'log', label: 'Log Auditoria', icon: 'fa-solid fa-tag' },
    { id: 'usuario', label: 'Usuário Mobile', icon: 'fa-solid fa-user' }
  ];

  const [nomeCompleto, setNomeCompleto, nomeCompletoRef] = UseInputMask();
  const [matricula, setMatricula, matriculaRef] = UseInputMask();
  const [status, setStatus, statusRef] = UseInputMask();
  const [cpfCnpj, setCpfCnpj, cpfCnpjRef] = UseInputMask();
  const [estadoCivil, setEstadoCivil, estadoCivilRef] = UseInputMask();
  const [sexo, setSexo, sexoRef] = UseInputMask();
  const [dataNascimento, setDataNascimento, dataNascimentoRef] = UseInputMask();
  const [rg, setRg, rgRef] = UseInputMask();
  const [dataExpedicao, setDataExpedicao, dataExpedicaoRef] = UseInputMask();
  const [orgaoEmissor, setOrgaoEmissor, orgaoEmissorRef] = UseInputMask();
  const [carteirinha, setCarteirinha, carteirinhaRef] = UseInputMask();
  const [nomeMae, setNomeMae, nomeMaeRef] = UseInputMask();
  const [nomePai, setNomePai, nomePaiRef] = UseInputMask();
  const [profissao, setProfissao, profissaoRef] = UseInputMask();
  const [proposta, setProposta, propostaRef] = UseInputMask();
  const [associado, setAssociado, associadoRef] = UseInputMask();
  const [cep, setCep, cepRef] = UseInputMask();
  const [endereco, setEndereco, enderecoRef] = UseInputMask();
  const [numero, setNumero, numeroRef] = UseInputMask();
  const [complemento, setComplemento, complementoRef] = UseInputMask();
  const [bairro, setBairro, bairroRef] = UseInputMask();
  const [cidade, setCidade, cidadeRef] = UseInputMask();
  const [uf, setUf, ufRef] = UseInputMask();
  const [telefone1, setTelefone1, telefone1Ref] = UseInputMask();
  const [telefone2, setTelefone2, telefone2Ref] = UseInputMask();
  const [celularWhatsapp, setCelularWhatsapp, celularWhatsappRef] = UseInputMask();
  const [celular2, setCelular2, celular2Ref] = UseInputMask();
  const [email1, setEmail1, email1Ref] = UseInputMask();
  const [email2, setEmail2, email2Ref] = UseInputMask();
  const [contato, setContato, contatoRef] = UseInputMask();

  useEffect(() => {
    if (modalMensagemTipo) {
      setMenuOpen(false);
      setShowNavegador(false);
    }
  }, [modalMensagemTipo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNavegador && !event.target.closest(`.${styles.navegadorContainer}`)) {
        setShowNavegador(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNavegador]);

  const handleNavigate = (route) => {
    navigate(route);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavegadorClick = () => {
    setShowNavegador(!showNavegador);
    setMenuOpen(false);
  };

  const handleNavegadorOption = (option) => {
    setShowNavegador(false);
    switch (option.id) {
      case 'whatsapp':
        openModalMensagem('whatsapp');
        break;
      case 'email':
        openModalMensagem('email');
        break;
      case 'sms':
        openModalMensagem('sms');
        break;
      case 'dependente':
        openModalDependente();
        break;
      case 'formulario':
        openModalFormulario();
        break;
      case 'anexo':
        openModalAnexo();
        break;
      case 'log':
        openModalLog();
        break;
      case 'usuario':
        openModalUsuario();
        break;
      default:
        break;
    }
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

  const openModalMensagem = (tipo) => {
    setModalMensagemTipo(tipo);
  }

  const closeModalMensagem = () => {
    setModalMensagemTipo(null);
  }

  const handleConfirmMensagem = () => {
    closeModalMensagem();
  }


  const openModalFormulario = () => {
    setModalFormularioOpen(true);
    setMenuOpen(false);
  }

  const openModalAnexo = () => {
    setModalAnexoOpen(true);
    setMenuOpen(false);
  }

  const openModalLog = () => {
    setModalLogOpen(true);
    setMenuOpen(false);
  }

  const openModalUsuario = () => {
    setModalUsuarioOpen(true)
    setMenuOpen(false)
  }

  const openModalDependente = () => {
    setModalDependenteOpen(true)
    setMenuOpen(false)
  }

  const closeModalFormulario = () => {
    setModalFormularioOpen(false);
  }

  const closeModalAnexo = () => {
    setModalAnexoOpen(false);
  }

  const closeModalLog = () => {
    setModalLogOpen(false);
  }

  const closeModalUsuario = () => {
    setModalUsuarioOpen(false);
  }


  const closeModalDependente = () => {
    setModalDependenteOpen(false);
  }

  const handleConfirmFormulario = () => {
    closeModalFormulario();
  }

  const handleConfirmAnexo = () => {
    closeModalAnexo();
  }

  const handleConfirmLog = () => {
    closeModalLog();
  }

  const handleConfirmUser = () => {
    closeModalUsuario();
  }

  const handleConfirmDependente = () => {
    closeModalDependente();
  }


  const handleBackClick = () => {
    setScreenState({ voltar: true });
  };

  if (screenState.voltar) {
    handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${jsonRoute.CadastroCliente}`);
  }

  return (
    <>
      <h2 className={styles.titulo}>
        <i className="fa-solid fa-building"></i>
        Cliente
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
              <div className={styles.secao}>
                <section className={styles.divInfo}>
                  <div className={styles.divNome}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={nomeCompleto}
                      onChange={setNomeCompleto}
                      inputRef={nomeCompletoRef}
                      label="Nome Completo:" />
                  </div>
                  <div className={styles.subItem}>
                    <div>
                      <UseInputPadrao
                        type="text"
                        identifier="tipo-cliente-signin"
                        value={matricula}
                        onChange={setMatricula}
                        inputRef={matriculaRef}
                        label="Matricula:" />
                    </div>
                  </div>
                  <div className={styles.subItem}>
                    <UseInputPadrao
                      type="select"
                      identifier="tipo-cliente-signin"
                      value={status}
                      onChange={setStatus}
                      inputRef={statusRef}
                      label="Status:" />
                  </div>
                </section>
                <section className={styles.divInfo}>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={cpfCnpj}
                      onChange={setCpfCnpj}
                      inputRef={cpfCnpjRef}
                      label="CPF/CNPJ:" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="select"
                      identifier="tipo-cliente-signin"
                      value={estadoCivil}
                      onChange={setEstadoCivil}
                      inputRef={estadoCivilRef}
                      label="Estado Civil:" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="select"
                      identifier="tipo-cliente-signin"
                      value={sexo}
                      onChange={setSexo}
                      inputRef={sexoRef}
                      label="Sexo:" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="date"
                      identifier="tipo-cliente-signin"
                      value={dataNascimento}
                      onChange={setDataNascimento}
                      inputRef={dataNascimentoRef}
                      label="Data de Nascimento:" />
                  </div>
                </section>
                <section className={styles.divInfo}>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={rg}
                      onChange={setRg}
                      inputRef={rgRef}
                      label="RG:" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="date"
                      identifier="tipo-cliente-signin"
                      value={dataExpedicao}
                      onChange={setDataExpedicao}
                      inputRef={dataExpedicaoRef}
                      label="Data de Expedição:" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={orgaoEmissor}
                      onChange={setOrgaoEmissor}
                      inputRef={orgaoEmissorRef}
                      label="Órgão Emissor:" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={carteirinha}
                      onChange={setCarteirinha}
                      inputRef={carteirinhaRef}
                      label="Carteirinha:" />
                  </div>
                </section>
                <section className={styles.divInfo}>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={nomeMae}
                      onChange={setNomeMae}
                      inputRef={nomeMaeRef}
                      label="Nome da Mãe" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={nomePai}
                      onChange={setNomePai}
                      inputRef={nomePaiRef}
                      label="Nome do Pai" />
                  </div>
                </section>
                <section className={styles.divInfo}>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="select"
                      identifier="tipo-cliente-signin"
                      value={profissao}
                      onChange={setProfissao}
                      inputRef={profissaoRef}
                      label="Profissão" />
                  </div>
                  <div className={styles.divFilho}>
                    <UseInputPadrao
                      type="text"
                      identifier="tipo-cliente-signin"
                      value={proposta}
                      onChange={setProposta}
                      inputRef={propostaRef}
                      label="Proposta"
                    />
                  </div>
                  <div className={styles.subItem}>
                    <UseInputPadrao
                      type="select"
                      identifier="tipo-cliente-signin"
                      value={associado}
                      onChange={setAssociado}
                      inputRef={associadoRef}
                      label="Associado" />
                  </div>
                </section>
              </div>
            </main>
          </>
        )}
        {currentStep === 1 && (
          <>
            <h3 className={styles.titulo2}>
              <i className="fa-solid fa-location-dot"></i>
              Endereço
            </h3>
            <main className={styles.divSecao}>
              <section className={styles.divInfo}>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="date"
                    identifier="tipo-cliente-signin"
                    value={cep}
                    onChange={setCep}
                    inputRef={cepRef}
                    label="CEP:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={endereco}
                    onChange={setEndereco}
                    inputRef={enderecoRef}
                    label="Endereço :" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={numero}
                    onChange={setNumero}
                    inputRef={numeroRef}
                    label="Número:" />
                </div>
              </section>
              <section className={styles.divInfo}>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={complemento}
                    onChange={setComplemento}
                    inputRef={complementoRef}
                    label="Complemento:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={bairro}
                    onChange={setBairro}
                    inputRef={bairroRef}
                    label="Bairro:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={cidade}
                    onChange={setCidade}
                    inputRef={cidadeRef}
                    label="Cidade:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="select"
                    identifier="tipo-cliente-signin"
                    value={uf}
                    onChange={setUf}
                    inputRef={ufRef}
                    label="UF" />
                </div>
              </section>
            </main>
          </>
        )}
        {currentStep === 2 && (
          <>
            <h3 className={styles.titulo2}>
              <i className="fa-solid fa-phone"></i>
              Contato
            </h3>
            <div className={styles.divSecao}>
              <section className={styles.divInfo}>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={telefone1}
                    onChange={setTelefone1}
                    inputRef={telefone1Ref}
                    label="Telefone1" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={telefone2}
                    onChange={setTelefone2}
                    inputRef={telefone2Ref}
                    label="Telefone 2:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={celularWhatsapp}
                    onChange={setCelularWhatsapp}
                    inputRef={celularWhatsappRef}
                    label="Celular/Whatsapp:" />
                </div>
              </section>
              <section className={styles.divInfo}>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={celular2}
                    onChange={setCelular2}
                    inputRef={celular2Ref}
                    label="Celular 2:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={email1}
                    onChange={setEmail1}
                    inputRef={email1Ref}
                    label="E-mail 1:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={email2}
                    onChange={setEmail2}
                    inputRef={email2Ref}
                    label="E-mail 2:" />
                </div>
                <div className={styles.divFilho}>
                  <UseInputPadrao
                    type="text"
                    identifier="tipo-cliente-signin"
                    value={contato}
                    onChange={setContato}
                    inputRef={contatoRef}
                    label="Contato" />
                </div>
              </section>
            </div>
          </>
        )}
      </StepperPadrao>

      <div className={styles.divBotao} style={{ position: 'relative' }}>
        <div className={styles.divBotaoGroup}>
          <button className={styles.BotaoGravar} onClick={() => {
            dialogMessage(
              "Tem certeza que deseja gravar este registro?",
              "info",
              { buttonsText: { confirm: "Sim", cancel: "Não" } },
              (result) => { if (result === true) { handleConfirmGravar(); } }
            );
          }}><i className="fa-solid fa-save" />Gravar</button>
          <button className={styles.BotaoRemover} onClick={() => {
            dialogMessage(
              "Tem certeza que deseja remover este registro?",
              "info",
              { buttonsText: { confirm: "Sim", cancel: "Não" } },
              (result) => { if (result === true) { handleConfirmDeletar(); } }
            );
          }}><i className="fa-solid fa-trash" />Remover</button>
          <button className={styles.BotaoVoltar} onClick={handleBackClick}><i className="fa-solid fa-arrow-left" />Voltar</button>
        </div>

        <div className={styles.divBotaoGroup}>
          {!isFirstStep() && (
            <button className={`${styles.BotaoAction} ${styles.BotaoAnterior}`} onClick={handleAnterior}>
              <i className="fa-solid fa-chevron-left" />Anterior
            </button>
          )}
          {!isLastStep() && (
            <button className={`${styles.BotaoAction} ${styles.BotaoProximo}`} onClick={handleProximo}>
              Próximo<i className="fa-solid fa-chevron-right" />
            </button>
          )}
          <div className={styles.navegadorContainer}>
            <button className={styles.BotaoNavegador} onClick={handleNavegadorClick}>
              Navegador<i className="fa-solid fa-caret-up" />
            </button>
            {showNavegador && (
              <div className={styles.navegadorDropdown}>
                {navegadorOptions.map((option) => (
                  <div
                    key={option.id}
                    className={styles.navegadorOption}
                    onClick={() => handleNavegadorOption(option)}
                  >
                    {option.icon && <i className={option.icon}></i>}
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {modalMensagemTipo && <ModalMensagem modoEnvio={modalMensagemTipo} closeModal={closeModalMensagem} onCloseOrConfirm={handleConfirmMensagem} />}
      {modalFormularioOpen && <ModalFormulario closeModal={closeModalFormulario} onCloseOrConfirm={handleConfirmFormulario} />}
      {modalAnexoOpen && <ModalAnexo closeModal={closeModalAnexo} onCloseOrConfirm={handleConfirmAnexo} />}
      {modalLogOpen && <ModalLog closeModal={closeModalLog} onCloseOrConfirm={handleConfirmLog} />}
      {modalUsuarioOpen && <Usuario closeModal={closeModalUsuario} onCloseOrConfirm={handleConfirmUser} />}
      {modalDependenteOpen && <ModalDependente closeModal={closeModalDependente} onCloseOrConfirm={handleConfirmDependente} />}
    </>
  )
}

export default CriarCliente;


