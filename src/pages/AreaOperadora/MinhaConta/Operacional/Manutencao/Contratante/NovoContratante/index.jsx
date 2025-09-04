import React from 'react'
import { useNavigate } from 'react-router';
import { UseInputMask, UseInputPadrao } from '../../../../../../../components/InputPadrao';
import StepperPadrao from '../../../../../../../components/StepperPadrao'
import { useState, useEffect } from 'react';
import styles from "../../Contratante/styles.module.css";
import { useModal } from '../../../../../../../context';
import { jsonRoute } from '../../../../../../../utils/json';

function NovoContratante() {
  const navigate = useNavigate();
  const [tipoAssocioado, setTipoAssocioado, tipoAssocioadoRef] = UseInputMask();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [matricula, setMatricula, matriculaRef] = UseInputMask();
  const [nome, setNome, nomeRef] = UseInputMask();
  const [dtNascimento, setDtNascimento, dtNascimentoRef] = UseInputMask();
  const [uf, setUf, ufRef] = UseInputMask();
  const [status, setStatus, statusRef] = UseInputMask();
  const [estadoCivil, setEstadoCivil, estadoCivilRef] = UseInputMask();
  const [sexo, setSexo, sexoRef] = UseInputMask();
  const [rg, setRg, rgRef] = UseInputMask("99.999.999-9", "number");
  const [dtExpedicao, setDtExpedicao, dtExpedicaoRef] = UseInputMask();
  const [orEmissor, setOrEmissor, orEmissorRef] = UseInputMask();
  const [cpf, setCpf, cpfRef] = UseInputMask("999.999.999-99", "number");
  //const [loginSignIn, loginSignInChange, loginSignInRef] = UseInputMask("999.999.999-99 | 99.999.999/9999-99", "both", user.cnpj);
  const [cnh, setCnh, cnhRef] = UseInputMask("9999999/9999", "number");
  const [dtValidade, setDtValidade, dtValidadeRef] = UseInputMask();
  const [naturalidade, setNaturalidade, naturalidadeRef] = UseInputMask();
  const [nascionalidade, setNascionalidade, nascionalidadeRef] = UseInputMask();
  const [nomePai, setNomePai, nomePaiRef] = UseInputMask();
  const [nomeMae, setNomeMae, nomeMaeRef] = UseInputMask();
  const [cep, setCep, cepRef] = UseInputMask("99999-999","number");
  const [endereco, setEndereco, enderecoRef] = UseInputMask();
  const [numCasa, setNumCasa, numCasaRef] = UseInputMask("9999", "number");
  const [complemento, setComplemento, complementoRef] = UseInputMask();
  const [bairro, setBairro, bairroRef] = UseInputMask();
  const [cidade, setCidade, cidadeRef] = UseInputMask();
  const [tel1, setTel1, tel1Ref] = UseInputMask("(99) 9999-9999", "number");
  const [tel2, setTel2, tel2Ref] = UseInputMask("(99) 9999-9999", "number");
  const [cel1, setCel1, cel1Ref] = UseInputMask("(99) 99999-9999", "number");
  const [cel2, setCel2, cel2Ref] = UseInputMask("(99) 99999-9999", "number")
  const [email, setEmail, emailRef] = UseInputMask();
  const [email2, setEmail2, email2Ref] = UseInputMask();
  const [contato, setContato, contatoRef] = UseInputMask();
  const [indicacao, setIndicacao, indicacaoRef] = UseInputMask();
  const [consultor, setConsultor, consultorRef] = UseInputMask();
  const [conheceu, setConheceu, conheceuRef] = UseInputMask();
  const [boletoUni, setBoletoUni, boletoUniRef] = UseInputMask();
  const [envioBoleto, setEnvioBoleto, envioBoletoRef] = UseInputMask();
  const [insEnsino, setInsEnsino, insEnsinoRef] = UseInputMask();
  const [matriculaIns, setMatriculaIns, matriculaInsRef] = UseInputMask();
  const [observacao, setObservacao, observacaoRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [agencia, setAgencia, agenciaRef] = UseInputMask();
  const [conta, setConta, contaRef] = UseInputMask();

  const { openModal, closeModal, isModalOpen } = useModal();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [screenState, setScreenState] = useState({
    voltar: false,
  });

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

  const handleNavigate = (route) => {
    navigate(route);
  };

  if (screenState.voltar) {
      handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.Contratante}`);
  }



  const steps = [
    { id: 0, name: 'Informações Básicas', icon: 'fa-solid fa-user', color: '#3b82f6' },
    { id: 1, name: 'Endereço Residencial', icon: 'fa-solid fa-location-dot', color: '#10b981' },
    { id: 2, name: 'Contato', icon: 'fa-solid fa-phone', color: '#f59e0b' },
    { id: 3, name: 'Informações Adicionais', icon: 'fa-solid fa-plus', color: '#FF7E70' },
    { id: 4, name: 'Dados Bancários', icon: 'fa-solid fa-money-check-dollar', color: '#7c3b1a' },
    { id: 5, name: 'Endereço de Correspondência', icon: 'fa-solid fa-envelope', color: '#6d00a1' },
  ];


  const opStatus = [
    {label: "ATIVO", value: "ativo"},
    {label: "CANCELADO", value: "cancelado"},
    {label: "EM ANÁLISE PELA OPERADORA", value: "em analise pela operadora"},
    {label: "IBBCA SUSPENSO", value: "ibbca suspenso"},
    {label: "INADIMPLENTE IBBCA", value: "inadimplente ibbca"},
    {label: "INATIVO", value: "inativo"},
    {label: "INATIVO POR INADIMPLÊNCIA",value: "inativo por inadimplencia"},
    {label: "RESCISÃO CONTRATUAL", value: "rescisao contratual"},
    {label: "SUSPENSO", value: "suspenso"}
];

  const opEsCivil = [
    {label: "Solteiro(a)", value: "solteiro"},
    {label: "Casado(a)", value: "casado"},
    {label: "Divorciado(a)", value: "divorciado"},
    {label: "Viúvo(a)", value: "viuvo"},
    {label: "Separado(a)", value: "separado"},
    {label: "União Estável", value: "uniao estavel"}
  ];

  const opTipoAssocioado = [
    {label: "Pessoa Fisica", value: "pessoa fisica"},
    {label: "Pessoa Juridica", value: "pessoa juridica"},
];
  const opSexo = [
    {label: "Masculino", value: "masculino"},
    {label: "Feminino", value: "feminino"}
  ];

  const opNacionalidades = [
    { label: "Brasileiro", value: "brasileiro" },
    { label: "Americano", value: "americano" },
    { label: "Argentino", value: "argentino" },
    { label: "Chileno", value: "chileno" },
    { label: "Colombiano", value: "colombiano" },
    { label: "Mexicano", value: "mexicano" },
    { label: "Canadense", value: "canadense" },
    { label: "Português", value: "portugues" },
    { label: "Espanhol", value: "espanhol" },
    { label: "Francês", value: "frances" },
    { label: "Italiano", value: "italiano" },
    { label: "Alemão", value: "alemao" },
    { label: "Inglês", value: "ingles" },
    { label: "Irlandês", value: "irlandes" },
    { label: "Russo", value: "russo" },
    { label: "Chinês", value: "chines" },
    { label: "Japonês", value: "japones" },
    { label: "Coreano", value: "coreano" },
    { label: "Indiano", value: "indiano" },
    { label: "Australiano", value: "australiano" },
    { label: "Sul-Africano", value: "sul-africano" }
  ];

  const opNaturalidades = [
    { label: "Brasil", value: "brasil" },
    { label: "Argentina", value: "argentina" },
    { label: "Chile", value: "chile" },
    { label: "Colômbia", value: "colombia" },
    { label: "México", value: "mexico" },
    { label: "Estados Unidos", value: "estados-unidos" },
    { label: "Canadá", value: "canada" },
    { label: "Portugal", value: "portugal" },
    { label: "Espanha", value: "espanha" },
    { label: "França", value: "franca" },
    { label: "Itália", value: "italia" },
    { label: "Alemanha", value: "alemanha" },
    { label: "Inglaterra", value: "inglaterra" },
    { label: "Irlanda", value: "irlanda" },
    { label: "Rússia", value: "russia" },
    { label: "China", value: "china" },
    { label: "Japão", value: "japao" },
    { label: "Coreia do Sul", value: "coreia-do-sul" },
    { label: "Índia", value: "india" },
    { label: "Austrália", value: "australia" },
    { label: "África do Sul", value: "africa-do-sul" }
  ];

  const opConheceu = [
    {label:"Indicação", value:"indicacao"},
    {label:"Internet", value:"internet"},
    {label:"Mala Direita", value: "mala direta"},
    {label:"Outdoor", value:"outdoor"},
    {label:"Representante", value:"representante"},
    {label:"Outros", value:"outros"}
  ]

  const opConsultor = [
    { label: "AMARO QUIRINO DA SILVA ESTIVAS - CPF/CNPJ: 11.310.380/0001-87 - CARGO: ADMINISTRADORA - ATIVO", value:"amaro quirino" },
    { label: "MARIA FERNANDA DE SOUZA LIMA - CPF: 123.456.789-00 - CARGO: CONSULTORA - ATIVO", value:"maria fernanda" },
    { label: "JOÃO CARLOS PEREIRA - CPF: 987.654.321-00 - CARGO: GERENTE - ATIVO", value:"joao carlos" },
    { label: "ANA PAULA RIBEIRO - CPF/CNPJ: 22.222.222/0001-22 - CARGO: ANALISTA - INATIVO", value:"ana paula" },
    { label: "PEDRO HENRIQUE MORAES - CPF: 111.222.333-44 - CARGO: SUPERVISOR - ATIVO", value:"pedro henrique"},
    { label: "LUIZA MARTINS DA COSTA - CPF: 555.666.777-88 - CARGO: COORDENADORA - ATIVO", value:"luiza martins"},
    { label: "CARLOS EDUARDO VIEIRA - CPF: 999.888.777-66 - CARGO: DIRETOR - INATIVO", value:"carlos eduardo"}
  ];

  const opBanco = [
    { label: "Banco A.J. Renner S.A.", value: "banco a.j. renner s.a." },
    { label: "Banco ABC Brasil S.A.", value: "banco abc brasil s.a." },
    { label: "Banco ABN AMRO S.A.", value: "banco abn amro s.a." },
    { label: "Banco Agibank S.A.", value: "banco agibank s.a." },
    { label: "Banco Alfa S.A.", value: "banco alfa s.a." },
    { label: "Banco Alvorada S.A.", value: "banco alvorada s.a." },
    { label: "Banco Arbi S.A.", value: "banco arbi s.a." },
    { label: "Banco B3 S.A.", value: "banco b3 s.a." },
    { label: "Banco BMG S.A.", value: "banco bmg s.a." },
    { label: "Banco BNP Paribas Brasil S.A.", value: "banco bnp paribas brasil s.a." },
    { label: "Banco Bradesco S.A.", value: "banco bradesco s.a." },
    { label: "Banco Bradesco Financiamentos S.A.", value: "banco bradesco financiamentos s.a." },
    { label: "Banco Bradesco Cartões S.A.", value: "banco bradesco cartões s.a." },
    { label: "Banco Bradescard S.A.", value: "banco bradescard s.a." },
    { label: "Banco BTG Pactual S.A.", value: "banco btg pactual s.a." },
    { label: "Banco C6 S.A. – C6 Bank", value: "banco c6 s.a." },
    { label: "Banco Caixa Geral – Brasil S.A.", value: "banco caixa geral – brasil s.a." },
    { label: "Banco Capital S.A.", value: "banco capital s.a." },
    { label: "Banco Cargill S.A.", value: "banco cargill s.a." },
    { label: "Banco Carrefour", value: "banco carrefour" },
    { label: "Banco Cetelem S.A.", value: "banco cetelem s.a." },
    { label: "Banco Cifra S.A.", value: "banco cifra s.a." },
    { label: "Banco Citibank S.A.", value: "banco citibank s.a." },
    { label: "Banco Clássico S.A.", value: "banco clássico s.a." },
    { label: "Banco Cooperativo do Brasil S.A. – BANCOOB", value: "banco cooperativo do brasil s.a. – bancoob" },
    { label: "Banco Cooperativo Sicredi S.A.", value: "banco cooperativo sicredi s.a." },
    { label: "Banco Credit Suisse (Brasil) S.A.", value: "banco credit suisse (brasil) s.a." },
    { label: "Banco Crefisa S.A.", value: "banco crefisa s.a." },
    { label: "Banco da Amazônia S.A.", value: "banco da amazônia s.a." },
    { label: "Banco da China Brasil S.A.", value: "banco da china brasil s.a." },
    { label: "Banco Daycoval S.A.", value: "banco daycoval s.a." },
    { label: "Banco de La Nación Argentina", value: "banco de la nación argentina" },
    { label: "Banco de La Provincia de Buenos Aires", value: "banco de la provincia de buenos aires" },
    { label: "Banco de La República Oriental del Uruguay", value: "banco de la república oriental del uruguay" },
    { label: "Banco Digio S.A.", value: "banco digio s.a." },
    { label: "Banco do Brasil S.A.", value: "banco do brasil s.a." },
    { label: "Banco do Nordeste do Brasil S.A.", value: "banco do nordeste do brasil s.a." },
    { label: "Banco do Estado de Sergipe S.A.", value: "banco do estado de sergipe s.a." },
    { label: "Banco do Estado do Pará S.A.", value: "banco do estado do pará s.a." },
    { label: "Banco do Estado do Rio Grande do Sul S.A.", value: "banco do estado do rio grande do sul s.a." },
    { label: "Banco Fator S.A.", value: "banco fator s.a." },
    { label: "Banco Fibra S.A.", value: "banco fibra s.a." },
    { label: "Banco Ficsa S.A.", value: "banco ficsa s.a." },
    { label: "Banco Finaxis S.A.", value: "banco finaxis s.a." },
    { label: "Banco Guanabara S.A.", value: "banco guanabara s.a." },
    { label: "Banco Industrial do Brasil S.A.", value: "banco industrial do brasil s.a." },
    { label: "Banco Indusval S.A.", value: "banco indusval s.a." },
    { label: "Banco Inter S.A.", value: "banco inter s.a." },
    { label: "Banco Itaú BBA S.A.", value: "banco itaú bba s.a." },
    { label: "Banco Itaú Consignado S.A.", value: "banco itaú consignado s.a." },
    { label: "Banco ItauBank S.A.", value: "banco itaubank s.a." },
    { label: "Banco J. P. Morgan S.A.", value: "banco j. p. morgan s.a." },
    { label: "Banco J. Safra S.A.", value: "banco j. safra s.a." },
    { label: "Banco John Deere S.A.", value: "banco john deere s.a." },
    { label: "Banco KDB S.A.", value: "banco kdb s.a." },
    { label: "Banco KEB HANA do Brasil S.A.", value: "banco keb hana do brasil s.a." },
    { label: "Banco Luso Brasileiro S.A.", value: "banco luso brasileiro s.a." },
    { label: "Banco Maxinvest S.A.", value: "banco maxinvest s.a." },
    { label: "Banco Mercantil do Brasil S.A.", value: "banco mercantil do brasil s.a." },
    { label: "Banco Modal S.A.", value: "banco modal s.a." },
    { label: "Banco Original S.A.", value: "banco original s.a." },
    { label: "Banco Pan S.A.", value: "banco pan s.a." },
    { label: "Banco Paulista S.A.", value: "banco paulista s.a." },
    { label: "Banco Pecúnia S.A.", value: "banco pecúnia s.a." },
    { label: "Banco Petra S.A.", value: "banco petra s.a." },
    { label: "Banco Pine S.A.", value: "banco pine s.a." },
    { label: "Banco Rendimento S.A.", value: "banco rendimento s.a." },
    { label: "Banco Ribeirão Preto S.A.", value: "banco ribeirão preto s.a." },
    { label: "Banco Rodobens S.A.", value: "banco rodobens s.a." },
    { label: "Banco Safra S.A.", value: "banco safra s.a." },
    { label: "Banco Santander (Brasil) S.A.", value: "banco santander (brasil) s.a." },
    { label: "Banco Semear S.A.", value: "banco semear s.a." },
    { label: "Banco Société Générale Brasil S.A.", value: "banco société générale brasil s.a." },
    { label: "Banco Sofisa S.A.", value: "banco sofisa s.a." },
    { label: "Banco Sumitomo Mitsui Brasileiro S.A.", value: "banco sumitomo mitsui brasileiro s.a." },
    { label: "Banco Triângulo S.A.", value: "banco triângulo s.a." },
    { label: "Banco Tricury S.A.", value: "banco tricury s.a." },
    { label: "Banco Votorantim S.A.", value: "banco votorantim s.a." },
    { label: "Banco VR S.A.", value: "banco vr s.a." },
    { label: "Banco Western Union do Brasil S.A.", value: "banco western union do brasil s.a." },
    { label: "Banco Woori Bank do Brasil S.A.", value: "banco woori bank do brasil s.a." },
  ];
  


  
  const opEnvioBoleto = [
    {label:"Correio", value: "correio"},
    {label:"Motoqueiro", value: "motoqueiro"},
    {label:"SMS", value: "sms"},
    {label:"E-mail", value: "e-mail"},
    {label: "WhatsApp", value: "whatsapp"}
  ];

  return (
    <>
    <main>
    <div>
    <h2 className={styles.TitleRepresentante}>
          <i className="fa-solid fa-address-card"></i>
              Novo Contratante     
    </h2>
    </div>  
    <StepperPadrao
      steps={steps}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
    >
      {currentStep === 0 && (
        <>
        <div className={styles.filtroTabelaHeader}>
          <h5 className={styles.filtroTabelaSubTitle}>
            <i className="fa-solid fa-gear"></i>
            Informações Basicas
          </h5>
        </div>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContentNovo}>
                <div className={styles.divConteudo}>
                
                  <UseInputPadrao 
                    label="Tipo de Associado"
                    type="select"
                    identifier="tipoAssocioado"
                    value={tipoAssocioado}
                    onChange={setTipoAssocioado}
                    inputRef={tipoAssocioadoRef}
                    options={opTipoAssocioado}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5} 
                  />

                  <UseInputPadrao 
                    label="Matrícula"
                    identifier="matricula"
                    value={matricula}
                    onChange={setMatricula}
                    inputRef={matriculaRef}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}      
                  />

                  <UseInputPadrao 
                    label="Nome"
                    identifier="nome"
                    value={nome}
                    onChange={setNome}
                    inputRef={nomeRef}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}
                  />
                
                </div>

                <div className={styles.divConteudo}>
                    <UseInputPadrao 
                    label="Dt. Nascimento"
                    type="date"
                    value={dtNascimento}
                    onChange={setDtNascimento}
                    inputRef={dtNascimentoRef}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}
                    />

                    <UseInputPadrao 
                    label="Status"
                    identifier="status"
                    value={status}
                    onChange={setStatus}
                    inputRef={statusRef}
                    type="select"
                    options={opStatus}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}
                    />

                    <UseInputPadrao 
                    label="Estado Civil"
                    identifier="estado civil"
                    value={estadoCivil}
                    onChange={setEstadoCivil}
                    inputRef={estadoCivilRef}
                    type="select"
                    options={opEsCivil}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}
                    />

                </div>
            
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Sexo"
                  identifier="sexo"
                  value={sexo}
                  onChange={setSexo}
                  inputRef={sexoRef}
                  type="select"
                  options={opSexo}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao
                  label="RG"
                  value={rg}
                  onChange={setRg}
                  inputRef={rgRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Dt. Expedição"
                  type="date"
                  value={dtExpedicao}
                  onChange={setDtExpedicao}
                  inputRef={dtExpedicaoRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                </div>

                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Órgão Emissor"
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="CPF"
                  value={cpf}
                  onChange={setCpf}
                  inputRef={cpfRef}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="CNH"
                  value={cnh}
                  onChange={setCnh}
                  inputRef={cnhRef}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Dt. Validade"
                  type="date"
                  value={dtValidade}
                  onChange={setDtValidade}
                  inputRef={dtValidadeRef}
                  width={isMobile ? 100 : 25}
                  gap={isMobile ? 0 : 0.5}
                  />
              </div>

              <div className={styles.divConteudo}>
                <UseInputPadrao 
                label="Naturalidade"
                identifier="naturalidade"
                value={naturalidade}
                onChange={setNaturalidade}
                inputRef={naturalidadeRef}
                type="select"
                options={opNaturalidades}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
                />

                <UseInputPadrao 
                label="Nacionalidade"
                identifier="nacionalidade"
                value={nascionalidade}
                onChange={setNascionalidade}
                inputRef={nascionalidadeRef}
                type="select"
                options={opNacionalidades}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
                />

                <UseInputPadrao 
                label="Nome do pai"
                value={nomePai}
                onChange={setNomePai}
                inputRef={nomePaiRef}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
                />

                <UseInputPadrao 
                label="Nome da Mãe"
                value={nomeMae}
                onChange={setNomeMae}
                inputRef={nomeMaeRef}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
                />

              </div>
            </div>
          </section>
        </div>
        </>
      )}
      {currentStep === 1 && (
        <>
        <div className={styles.filtroTabelaHeader}>
          <h5 className={styles.filtroTabelaSubTitle}>
            <i className="fa-solid fa-house"></i>
            Endereço Residencial
          </h5>
        </div>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContentNovo}>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="CEP"
                  value={cep}
                  onChange={setCep}
                  inputRef={cepRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />
 
                  <UseInputPadrao 
                  label="Endereço"
                  value={endereco}
                  onChange={setEndereco}
                  inputRef={enderecoRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />


                </div>

                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                    label="Número"
                    value={numCasa}
                    onChange={setNumCasa}
                    inputRef={numCasaRef}
                    width={isMobile ? 100 : 50}
                    gap={isMobile ? 0 : 0.5}
                  /> 

                  <UseInputPadrao 
                    label="Complemento"
                    value={complemento}
                    onChange={setComplemento}
                    inputRef={complementoRef}
                    width={isMobile ? 100 : 50}
                    gap={isMobile ? 0 : 0.5}
                   />
                </div>
          
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                    label="Bairro"
                    value={bairro}
                    onChange={setBairro}
                    inputRef={bairroRef}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}
                    />

                  <UseInputPadrao
                    label="Cidade"
                    value={cidade}
                    onChange={setCidade}
                    inputRef={cidadeRef}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}
                    />

                  <UseInputPadrao 
                    label="UF"
                    value={uf}
                    onChange={setUf}
                    inputRef={ufRef}
                    width={isMobile ? 100 : 33}
                    gap={isMobile ? 0 : 0.5}
                  />
                </div>
              </div>
            </section>
          </div>
        </>
      )}
      {currentStep === 2 && (
        <>
        <div className={styles.filtroTabelaHeader}>
          <h5 className={styles.filtroTabelaSubTitle}>
            <i className="fa-solid fa-contact-card"></i>
            Contato
          </h5>
        </div>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContentNovo}>
                <div className={styles.divConteudo}>

                  <UseInputPadrao 
                    label="Telefone 1"
                    value={tel1}
                    onChange={setTel1}
                    inputRef={tel1Ref}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                    label="Telefone 2"
                    value={tel2}
                    onChange={setTel2}
                    inputRef={tel2Ref}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5}
                  />
                  <UseInputPadrao 
                    label="Celular/Whatsapp"
                    value={cel1}
                    onChange={setCel1}
                    inputRef={cel1Ref}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                    label="Celular 2"
                    value={cel2}
                    onChange={setCel2}
                    inputRef={cel2Ref}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5}
                  />

                </div>

                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="E-mail 1"
                  type='email'
                  value={email}
                  onChange={setEmail}
                  inputRef={emailRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="E-mail 2"
                  type='email'
                  value={email2}
                  onChange={setEmail2}
                  inputRef={email2Ref}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Contato"
                  value={contato}
                  onChange={setContato}
                  inputRef={contatoRef}
                  width={isMobile ? 100 : 34}
                  gap={isMobile ? 0 : 0.5}
                  />
               </div>
            </div>
          </section>
        </div>
        </>
      )}
      {currentStep === 3 &&(
        <>
        <div className={styles.filtroTabelaHeader}>
          <h5 className={styles.filtroTabelaSubTitle}>
            <i className="fa-solid fa-info-circle"></i>
            Informações Basicas
          </h5>
        </div>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContentNovo}>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Indicação"
                  value={indicacao}
                  onChange={setIndicacao}
                  inputRef={indicacaoRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Como Conheceu"
                  type="select"
                  value={conheceu}
                  onChange={setConheceu}
                  inputRef={conheceuRef}
                  options={opConheceu}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />

                </div>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Consultor"
                  type="select"
                  value={consultor}
                  onChange={setConsultor}
                  inputRef={consultorRef}
                  options={opConsultor}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Boleto Unificado"
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />

                </div>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Forma Envio Boleto"
                  type="select"
                  value={envioBoleto}
                  onChange={setEnvioBoleto}
                  inputRef={envioBoletoRef}
                  options={opEnvioBoleto}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Instituição de Ensino"
                  value={insEnsino}
                  onChange={setInsEnsino}
                  inputRef={insEnsinoRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Matricula Instituição"
                  value={matriculaIns}
                  onChange={setMatriculaIns}
                  inputRef={matriculaInsRef}
                  width={isMobile ? 100 : 34}
                  gap={isMobile ? 0 : 0.5}
                  />

                </div>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                    label="Observação"
                    type="textarea"
                    value={observacao}
                    onChange={setObservacao}
                    inputRef={observacaoRef}
                    width={isMobile ? 100 : 100}
                    gap={isMobile ? 0 : 0.5}
                    />
                </div>
              </div>
            </section>
          </div>
        </>
      )}
      {currentStep === 4 && (
        <>
        <div className={styles.filtroTabelaHeader}>
          <h5 className={styles.filtroTabelaSubTitle}>
            <i className="fa-solid fa-bank"></i>
            Dados Bancários
          </h5>
        </div>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContentNovo}>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Banco"
                  type="select"
                  value={banco}
                  onChange={setBanco}
                  inputRef={bancoRef}
                  options={opBanco}
                  width={isMobile ? 100 : 100}
                  gap={isMobile ? 0 : 0.5}
                  />
                </div>

                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Agência"
                  value={agencia}
                  onChange={setAgencia}
                  inputRef={agenciaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Conta(sem DV)"
                  value={conta}
                  onChange={setConta}
                  inputRef={contaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />
                </div>
            </div>
          </section>
        </div>
        </>
      )}
      {currentStep === 5 && (
        <>
        <div className={styles.filtroTabelaHeader}>
          <h5 className={styles.filtroTabelaSubTitle}>
            <i className="fa-solid fa-envelope"></i>
            Endereço de Correspondência
          </h5>
        </div>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContentNovo}>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="CEP"
                  value={cep}
                  onChange={setCep}
                  inputRef={cepRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Endereço"
                  value={endereco}
                  onChange={setEndereco}
                  inputRef={enderecoRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />
                </div>
                <div className={styles.divConteudo}>

                  <UseInputPadrao 
                  label="Número"
                  value={numCasa}
                  onChange={setNumCasa}
                  inputRef={numCasaRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Complemento"
                  value={complemento}
                  onChange={setComplemento}
                  inputRef={complementoRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  />
                
                </div>
                <div className={styles.divConteudo}>
                  <UseInputPadrao 
                  label="Bairro"
                  value={bairro}
                  onChange={setBairro}
                  inputRef={bairroRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="Cidade"
                  value={cidade}
                  onChange={setCidade}
                  inputRef={cidadeRef}
                  width={isMobile ? 100 : 33}
                  gap={isMobile ? 0 : 0.5}
                  />

                  <UseInputPadrao 
                  label="UF"
                  value={uf}
                  onChange={setUf}
                  inputRef={ufRef}
                  width={isMobile ? 100 : 34}
                  gap={isMobile ? 0 : 0.5}
                  />
                </div>
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
        <button className={styles.BotaoRemover} onClick={() => {
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
        <button className={styles.BotaoVoltar} onClick={handleBackClick}>
          <i className="fa-solid fa-arrow-left"></i>
          Voltar
        </button>
      </div>

      <div className={styles.divBotaoGroup}>
        {!isFirstStep() && (
          <button className={styles.btnAnterior} onClick={handleAnterior}>
            <i className="fa-solid fa-chevron-left"></i>
            Anterior
          </button>
        )}
        {!isLastStep() && (
          <button className={styles.btnProximo} onClick={handleProximo}>
            Próximo
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>
  </div>

  {isModalOpen('modalEspecialidade') && <ModalEspecialide closeModal={closeModalEspecialidade} onCloseOrConfirm={handleConfirmEspecialidade} />}
  </main>
  </>
  )
}

export default NovoContratante;