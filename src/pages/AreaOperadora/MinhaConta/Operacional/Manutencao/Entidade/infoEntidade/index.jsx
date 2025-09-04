import { useState, useEffect } from "react";
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from "../../../../../../../components/InputPadrao";
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog.jsx';
import { useNavigate } from "react-router";
import { jsonRoute } from "../../../../../../../utils/json.js";
import StepperPadrao from '../../../../../../../components/StepperPadrao/index.jsx';
import { useModal } from '../../../../../../../context/index.jsx';
import { handleResizeTabela } from "../../../../../../../utils/functions.js";


const InfoEntidade = () => {
  const [currentStep, setCurrentStep] = useState(1);


  const steps = [
    { id: 1, name: 'Informações Básicas', icon: 'fa-solid fa-user', color: '#22c222' },
    { id: 2, name: 'Endereço Residencial', icon: 'fa-solid fa-location-dot', color: '#3e5e9a' },
    { id: 3, name: 'Contato', icon: 'fa-solid fa-phone', color: '#db1b1bff' },
    { id: 4, name: 'Informações Adicionais', icon: 'fa-solid fa-info', color: '#1bd5e2ff' },
  ];

  const [screenState, setScreenState] = useState({
    voltar: false,
  });
  const navigate = useNavigate();

  // ---------------------INFORMAÇÕES BÀSICAS------------------------------//

  const [nome, setNome, nomeRef] = UseInputMask();
  const [status, setStatus, statusRef] = UseInputMask();
  const [razaoSocial, setRazaoSocial, razaoSocialRef] = UseInputMask();
  const [iEstadual, setIEstadual, iEstadualRef] = UseInputMask();
  const [iMunicipal, setIMunicipal, iMunicipalRef] = UseInputMask();
  const [CNPJ, setCNPJ, CNPJRef] = UseInputMask("99.999.99/9999-99", "number");
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [agencia, setAgencia, agenciaRef] = UseInputMask();
  const [conta, setConta, contaRef] = UseInputMask();
  const [titularConta, setTitularConta, titularContaRef] = UseInputMask();
  const [CPFouCNPJconta, setCPFouCNPJconta, CPFouCNPJcontaRef] = UseInputMask();
  const [imagem, setImagem, imagemRef] = UseInputMask();
  const [imagemAssinatura, setImagemAssinatura, imagemAssinaturaRef] = UseInputMask();
  const [imagemCarteirinha, setImagemCarteirinha, imagemCarteirinhaRef] = UseInputMask();
  const [corFonteCarteirinha, setCorFonteCarteirinha, corFonteCarteirinhaRef] = UseInputMask();

  // ----------------------ENDEREÇO RESIDENCIAL----------------------------//

  const [cep, setCep, cepRef] = UseInputMask();
  const [numero, setnumero, numeroRef] = UseInputMask();
  const [cidade, setcidade, cidadeRef] = UseInputMask();
  const [endereco, setendereco, enderecoRef] = UseInputMask();
  const [complemento, setcomplemento, complementoRef] = UseInputMask();
  const [bairro, setbairro, bairroRef] = UseInputMask();
  const [UF, setUF, UFRef] = UseInputMask();

  // ----------------------CONTATO-----------------------------//
  const [telefone1, setTelefone1, telefoneRef1] = UseInputMask();
  const [telefone2, setTelefone2, telefone2Ref] = UseInputMask();
  const [celular1, setCelular1, celular1Ref] = UseInputMask();
  const [celular2, setCelular2, celular2Ref] = UseInputMask();
  const [celular3, setCelular3, celular3Ref] = UseInputMask();
  const [email1, setEmail1, email1Ref] = UseInputMask();
  const [email2, setemail2, email2Ref] = UseInputMask();
  const [contato, setContato, contatoRef] = UseInputMask();

  // ----------------------INFORMAÇÃO ADICIONAL-----------------------------//

  const [observacao, setObersvacao, observacaoRef] = UseInputMask();

  const handleNavigate = (route) => {
    navigate(route);
  };


  const handleConfirmGravar = () => {
  }

  const handleConfirmDeletar = () => {
  }

  const openModalEspecialidade = () => {
    openModal('modalEspecialidade');
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
    return currentStep === 1;
  };

  const isLastStep = () => {
    return currentStep === steps.length;
  };

  const handleAnterior = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProximo = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (screenState.voltar) {
    handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.Entidade}`);
  }

  const { openModal, closeModal, isModalOpen } = useModal();



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

  return (
    <>
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      >
        {currentStep === 1 && ( // ---------------- INFORMAÇÕES BÁSICAS ------------ //
          <>
            <h3 className={styles.titulo}>
              <i className="fa-solid fa-user"></i>
              Informações básicas
            </h3>
            <main className={styles.divSecao}>
              <section className={styles.divInfo}>
                <UseInputPadrao
                  identifier="tipo-cliente-signin"
                  value={nome}
                  onChange={setNome}
                  inputRef={nomeRef}
                  width={isMobile ? 100 : 70}
                  gap={isMobile ? 0 : 0.50}
                  label="Nome"
                />
                <UseInputPadrao
                  type="select"
                  identifier="tipo-cliente-signin"
                  value={status}
                  onChange={setStatus}
                  inputRef={statusRef}
                  width={isMobile ? 100 : 30}
                  gap={isMobile ? 0 : 0.50}
                  label="Status"
                />
              </section>
              <section className={styles.divInfo}>
                <UseInputPadrao
                  type="select"
                  identifier="tipo-cliente-signin"
                  value={razaoSocial}
                  onChange={setRazaoSocial}
                  inputRef={razaoSocialRef}
                  width={100}
                  gap={0}
                  label="Razão Social"
                />
              </section>
              <div className={styles.divInfo}>
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={CNPJ}
                  onChange={setCNPJ}
                  inputRef={CNPJRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.30}
                  label="CNPJ"
                />
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={iMunicipal}
                  onChange={setIMunicipal}
                  inputRef={iMunicipalRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.30}
                  label="I.Municipal"
                />
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={iEstadual}
                  onChange={setIEstadual}
                  inputRef={iEstadualRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.30}
                  label="I.Estadual"
                />
              </div>
              <section className={styles.divInfo}>
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={banco}
                  onChange={setBanco}
                  inputRef={bancoRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="Banco"
                />
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={agencia}
                  onChange={setAgencia}
                  inputRef={agenciaRef}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 1}
                  label="Agência"
                />
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={conta}
                  onChange={setConta}
                  inputRef={contaRef}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.50}
                  label="Conta"
                />

              </section>
              <div className={styles.divInfo}>
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={titularConta}
                  onChange={setTitularConta}
                  inputRef={titularContaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="Titular da conta"
                />
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={CPFouCNPJconta}
                  onChange={setCPFouCNPJconta}
                  inputRef={CPFouCNPJcontaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="CPF/CNPJ da Conta"
                />
              </div>
              <section className={styles.divInfo}>
                <UseInputPadrao
                  type="file"
                  identifier="tipo-cliente-signin"
                  value={imagem}
                  onChange={setImagem}
                  inputRef={imagemRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="Imagem (Preferencialmente 1023 x 230)"
                />
                <UseInputPadrao
                  type="file"
                  identifier="tipo-cliente-signin"
                  value={imagemAssinatura}
                  onChange={setImagemAssinatura}
                  inputRef={imagemAssinaturaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="Imagem - Assinatura (Preferencialmente 340 x 100)"
                />
              </section>
              <section className={styles.divInfo}>
                <UseInputPadrao
                  type="file"
                  identifier="tipo-cliente-signin"
                  value={imagemCarteirinha}
                  onChange={setImagemCarteirinha}
                  inputRef={imagemCarteirinhaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="Imagem - Carteirinha (Preferencialmente 1004 x 638)"
                />
                <UseInputPadrao
                  type="select"
                  identifier="tipo-cliente-signin"
                  value={corFonteCarteirinha}
                  onChange={setCorFonteCarteirinha}
                  inputRef={corFonteCarteirinhaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="Cor fonte Carteirinha"
                />
              </section>
            </main>
          </>
        )}
        {currentStep === 2 && (// ---------------- ENDEREÇO ------------ //
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
                  icon="fa-solid fa-magnifying-glass"
                  width={isMobile ? 100 : 20}
                  gap={isMobile ? 0 : 0.50}
                  label="CEP"
                />
              </div>


              <section className={styles.divInfo}>

                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={endereco}
                  onChange={setendereco}
                  inputRef={enderecoRef}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="Endereço"
                />



                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={numero}
                  onChange={setnumero}
                  inputRef={numeroRef}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="Número"
                />


                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={complemento}
                  onChange={setcomplemento}
                  inputRef={complementoRef}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="Complemento"
                />

              </section>

              <section className={styles.divInfo}>
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={bairro}
                  onChange={setbairro}
                  inputRef={bairroRef}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="Bairro"
                />

                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={cidade}
                  onChange={setcidade}
                  inputRef={cidadeRef}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="Cidade"
                />


                <UseInputPadrao
                  type="select"
                  identifier="tipo-cliente-signin"
                  value={UF}
                  onChange={setUF}
                  inputRef={UFRef}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="UF"
                />

              </section>
            </main>
          </>
        )}
        {currentStep === 3 && ( // ---------------- CONTATO ------------ //
          <>
            <h3 className={styles.titulo}>
              <i className="fa-solid fa-phone"></i>
              Contato
            </h3>
            <main className={styles.secao}>
              <section className={styles.divInfo}>

                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={telefone1}
                  onChange={setTelefone1}
                  inputRef={telefoneRef1}
                  width={isMobile ? 100 : 33.3}
                  gap={isMobile ? 0 : 0.50}
                  label="Telefone 1"
                />

                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={telefone2}
                  onChange={setTelefone2}
                  inputRef={telefone2Ref}
                  width={isMobile ? 100 : 33.3}
                  gap={isMobile ? 0 : 0.50}
                  label="Telefone 2"
                />

                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={celular1}
                  onChange={setCelular1}
                  inputRef={celular1Ref}
                  width={isMobile ? 100 : 33.3}
                  gap={isMobile ? 0 : 0.50}
                  label="Celular / Whatsapp"
                />



              </section>

              <section className={styles.divInfo}>

                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={celular2}
                  onChange={setCelular2}
                  inputRef={celular2Ref}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="Celular 2"
                />


                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={celular3}
                  onChange={setCelular3}
                  inputRef={celular3Ref}
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.50}
                  label="Celular 3"
                />

                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={contato}
                  onChange={setContato}
                  inputRef={contatoRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="Contato"
                />
              </section>
              <section className={styles.divInfo}>
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={email1}
                  onChange={setEmail1}
                  inputRef={email1Ref}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="E-mail 1"
                />
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={email2}
                  onChange={setemail2}
                  inputRef={email2Ref}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.50}
                  label="E-mail 2"
                />
              </section>
            </main>
          </>
        )}

        {currentStep === 4 && ( // ---------------- INFORMAÇÕES ADICIONAIS ------------ //
          <>
            <h3 className={styles.titulo}>
              <i className="fa-solid fa-info"></i>
              Informações adicionais
            </h3>
            <main className={styles.secao}>
              <section className={styles.divInfo}>
                <UseInputPadrao
                  type="textarea"
                  identifier="tipo-cliente-signin"
                  value={observacao}
                  onChange={setObersvacao}
                  inputRef={observacaoRef}
                  width={isMobile ? 100 : 100}
                  gap={isMobile ? 0 : 0.5}
                  label="Observação"
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

export default InfoEntidade;


