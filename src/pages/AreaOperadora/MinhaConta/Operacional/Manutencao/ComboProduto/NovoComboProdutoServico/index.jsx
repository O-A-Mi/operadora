import React from 'react'
import styles from "../../ComboProduto/styles.module.css";
import { useState, useEffect } from 'react';
import { TogglePadrao, UseInputMask, UseInputPadrao } from '../../../../../../../components';
import { useNavigate } from 'react-router';
import { jsonRoute } from '../../../../../../../utils/json';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';

function NovoComboProdutoServico() {
    //variaveis
    const navigate = useNavigate();
    const [screenState, setScreenState] = useState({
        voltar: false,
      });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [status, setStatus, statusRef] = UseInputMask();
    const [texto, setTexto, textoRef] = UseInputMask();
    const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
    const [ordem, setOrdem, ordemRef] = UseInputMask();
    const [aparece, setAparece, apareceRef] = UseInputMask();
    const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
    const [tabelaConcessao, setTabelaConcessao, tabelaConcessaoRef] = UseInputMask();
    const [tipoPlano, setTipoPlano, tipoPlanoRef] = UseInputMask();
    const [convenio, setConvenio, convenioRef] = UseInputMask();
    const [entidade, setEntidade, entidadeRef] = UseInputMask();
    const [forPagamento, setForPagamento, forPagamentoRef] = UseInputMask();
    const [descricao, setDescricao, descricaoRef] = UseInputMask();
    const [abreviacao, setAbreviacao, abreviacaoRef] = UseInputMask();
    const [tipoReajuste, setTipoReajuste, tipoReajusteRef] = UseInputMask();
    const [carencia, setCarencia, carenciaRef] = UseInputMask();
    const [mesAni, setMesAni, mesAniRef] = UseInputMask();
    const [aniversarioReajuste, setAniversarioReajuste, aniversarioReajusteRef] = UseInputMask();
    const [vigenciaContratoI, setVigenciaContratoI, vigenciaContratoIRef] = UseInputMask();
    const [vigenciaContratoF, setVigenciaContratoF, vigenciaContratoFRef] = UseInputMask();
    const [numAns, setNumAns, numAnsRef] = UseInputMask();
    const [segmentacao, setSegmentacao, segmentacaoRef] = UseInputMask();
    const [acomodacao, setAcomodacao, acomodacaoRef] = UseInputMask();
    const [abrangencia, setAbrangencia, abrangenciaRef] = UseInputMask();
    const [fatorMo, setFatorMo, fatorMoRef] = UseInputMask();
    const [codProEnv, setCodProEnv, codProEnvRef] = UseInputMask();
    const [codEmpEnv, setCodEmpEnv, codEmpEnvRef] = UseInputMask();
    const [utFaixaIdade, setUtFaixaIdade] = useState(false);
    const [custo, setCusto, custoRef] = UseInputMask();
    const [precoF, setPrecoF, precoFRef] = UseInputMask();
    const [modoA, setModoA, modoARef] = UseInputMask();
    const [vAdesao, setVAdesao, vAdesaoRef] = UseInputMask();
    const [qtdMin, setQtdMin, qtdMinRef] = UseInputMask();
    const [qtdMax, setQtdMax, qtdMaxRef] = UseInputMask();
    const [adicionaDep, setAdicionaDep] = useState(false);
    const [limDep, setLimDep, limDepRef] = UseInputMask();
    const [coDep, setCoDep] = useState(false);
    const [utiVigencia, setUtiVigentecia] = useState(false);
    const [portalCorretor, setPortalCorretor] = useState(false);
    const [valDnv, setValDnv] = useState(false);
    const [proRata, setProRata] = useState(false);
    const [utDmed, setUtDmed] = useState(false);
    const [segCarencia, setSegCarencia] = useState(false);
    const [depCarencia, setDepCarencia] = useState(false);
    const [audPerguntas, setAudPerguntas] = useState(false);
    const [envCadastro, setEnvCadastro] = useState(false);
    const [reaContrato, setReaContrato] = useState(false);
    const [reaFaixa, setReaFaixa] = useState(false);
    const [propoEspecial, setPropoEspecial] = useState(false);
    const [modoReajuste, setModoReajuste, modoReajusteRef] = UseInputMask();
    const [formatoProposta, setFormatoProposta, formatoPropostaRef] = UseInputMask();
    const [numInicial, setNumInicial, numInicialRef] = UseInputMask();
    const [imagem, setImagem, imagemRef] = UseInputMask();

    const [modalMensagemTipo, setModalMensagemTipo] = useState(false);
    const [modalFormularioOpen, setModalFormularioOpen] = useState(false);
    const [modalAnexoOpen, setModalAnexoOpen] = useState(false);
    const [modalLogOpen, setModalLogOpen] = useState(false);
    const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
    const [modalDependenteOpen, setModalDependenteOpen] = useState(false);
    //funcoes

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
          };
        
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);

    
    function handleChecked(setter, checked){
        setter(!checked);
    }

    const handleNavigate = (route) => {
        navigate(route);
    };

    const handleBackClick = () => {
        setScreenState({ voltar: true });
    };
    
    if (screenState.voltar) {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Manutencao}/${jsonRoute.ComboProduto}`);
    }


    
      const closeModalMensagem = () => {
        setModalMensagemTipo(null);
      }
    
      const handleConfirmMensagem = () => {
        closeModalMensagem();
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
    
      const handleConfirmGravar = () => {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Manutencao}/${jsonRoute.ComboProduto}`);
      }

      const handleConfirmDeletar = () => {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Manutencao}/${jsonRoute.ComboProduto}`);
      }
    

    //listas
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

      const opOrdem = [
        { label: "01", value: "01" },
        { label: "02", value: "02" },
        { label: "03", value: "03" },
        { label: "04", value: "04" },
        { label: "05", value: "05" },
        { label: "06", value: "06" },
        { label: "07", value: "07" },
        { label: "08", value: "08" },
        { label: "09", value: "09" },
        { label: "10", value: "10" },
    ];

    const opAparece = [
        {label: "Adesão", value:"adesao"},
        {label: "Empresarial", value:"empresarial"},
    ];
    
    const opGruposContratual = [
        { label: "Administrativo", value: "Administrativo" },
        { label: "Financeiro", value: "Financeiro" },
        { label: "Jurídico", value: "Jurídico" },
        { label: "Comercial", value: "Comercial" },
        { label: "Tecnologia", value: "Tecnologia" },
        { label: "Recursos Humanos", value: "Recursos Humanos" },
        { label: "Logística", value: "Logística" },
        { label: "Marketing", value: "Marketing" },
        { label: "Compras", value: "Compras" },
        { label: "Operações", value: "Operações" },
    ];
    
    const opTabCon = [
        {label: "Sim", value: "sim"},
        {label: "Não", value: "não"},
    ];

    const opConvenios = [
        { label: "Unimed", value: "Unimed" },
        { label: "Amil", value: "Amil" },
        { label: "Bradesco Saúde", value: "Bradesco Saúde" },
        { label: "SulAmérica", value: "SulAmérica" },
        { label: "NotreDame Intermédica", value: "NotreDame Intermédica" },
        { label: "Porto Seguro Saúde", value: "Porto Seguro Saúde" },
        { label: "Golden Cross", value: "Golden Cross" },
        { label: "Hapvida", value: "Hapvida" },
        { label: "São Francisco Saúde", value: "São Francisco Saúde" },
        { label: "Allianz Saúde", value: "Allianz Saúde" },
        { label: "Medial Saúde", value: "Medial Saúde" },
        { label: "Care Plus", value: "Care Plus" },
        { label: "Blue Med", value: "Blue Med" },
        { label: "Intermédica Notredame", value: "Intermédica Notredame" },
        { label: "Cassi", value: "Cassi" },
        { label: "Postal Saúde", value: "Postal Saúde" },
        { label: "Cabesp", value: "Cabesp" },
        { label: "Economus", value: "Economus" },
        { label: "Fusex", value: "Fusex" },
        { label: "Saúde Caixa", value: "Saúde Caixa" }
    ];

    const opTiposPlanos = [
        { label: "Individual", value: "Individual" },
        { label: "Familiar", value: "Familiar" },
        { label: "Empresarial", value: "Empresarial" },
        { label: "Coletivo por Adesão", value: "Coletivo por Adesão" },
        { label: "Ambulatorial", value: "Ambulatorial" },
        { label: "Hospitalar", value: "Hospitalar" },
        { label: "Hospitalar com Obstetrícia", value: "Hospitalar com Obstetrícia" },
        { label: "Odontológico", value: "Odontológico" },
        { label: "Nacional", value: "Nacional" },
        { label: "Regional", value: "Regional" },
        { label: "Básico", value: "Básico" },
        { label: "Especial", value: "Especial" },
        { label: "Premium", value: "Premium" },
        { label: "Executivo", value: "Executivo" },
        { label: "VIP", value: "VIP" }
    ];
    
    
    const opEntidades = [
        { label: "Associação dos Funcionários", value: "Associação dos Funcionários" },
        { label: "Sindicato dos Trabalhadores", value: "Sindicato dos Trabalhadores" },
        { label: "Ordem dos Advogados", value: "Ordem dos Advogados" },
        { label: "Conselho Regional de Medicina", value: "Conselho Regional de Medicina" },
        { label: "Conselho Regional de Engenharia", value: "Conselho Regional de Engenharia" },
        { label: "Câmara de Comércio", value: "Câmara de Comércio" },
        { label: "Federação das Indústrias", value: "Federação das Indústrias" },
        { label: "União dos Comerciários", value: "União dos Comerciários" },
        { label: "Cooperativa de Saúde", value: "Cooperativa de Saúde" },
        { label: "Associação Beneficente", value: "Associação Beneficente" },
        { label: "Instituto de Previdência", value: "Instituto de Previdência" },
        { label: "Fundação Educacional", value: "Fundação Educacional" },
        { label: "Instituto de Pesquisa", value: "Instituto de Pesquisa" },
        { label: "Ordem dos Contadores", value: "Ordem dos Contadores" },
        { label: "Conselho Regional de Enfermagem", value: "Conselho Regional de Enfermagem" }
    ];

    const opFormasPagamento = [
        { label: "Dinheiro", value: "Dinheiro" },
        { label: "Pix", value: "Pix" },
        { label: "Boleto Bancário", value: "Boleto Bancário" },
        { label: "Cartão de Crédito", value: "Cartão de Crédito" },
        { label: "Cartão de Débito", value: "Cartão de Débito" },
        { label: "Transferência Bancária", value: "Transferência Bancária" },
        { label: "Débito Automático", value: "Débito Automático" },
        { label: "Cheque", value: "Cheque" },
        { label: "Vale Alimentação", value: "Vale Alimentação" },
        { label: "Vale Refeição", value: "Vale Refeição" },
        { label: "Carteira Digital", value: "Carteira Digital" },
        { label: "PayPal", value: "PayPal" },
        { label: "Google Pay", value: "Google Pay" },
        { label: "Apple Pay", value: "Apple Pay" },
        { label: "Criptomoeda", value: "Criptomoeda" }
    ];

    const opReajuste = [
        {label: "Operadora", value: "operadora"},
        {label: "ANS", value: "ans"},
        {label: "IGPDI", value: "igpdi"},
        {label: "IGPM", value: "igpm"},
        {label: "INPC", value: "inpc"},
        {label: "IPCA", value: "ipca"},

    ];

    const opMeses = [
        { label: "Janeiro", value: "Janeiro" },
        { label: "Fevereiro", value: "Fevereiro" },
        { label: "Março", value: "Março" },
        { label: "Abril", value: "Abril" },
        { label: "Maio", value: "Maio" },
        { label: "Junho", value: "Junho" },
        { label: "Julho", value: "Julho" },
        { label: "Agosto", value: "Agosto" },
        { label: "Setembro", value: "Setembro" },
        { label: "Outubro", value: "Outubro" },
        { label: "Novembro", value: "Novembro" },
        { label: "Dezembro", value: "Dezembro" }
    ];
    
    const opSegmentacoes = [
        { label: "Saúde", value: "Saúde" },
        { label: "Educação", value: "Educação" },
        { label: "Tecnologia", value: "Tecnologia" },
        { label: "Comércio", value: "Comércio" },
        { label: "Indústria", value: "Indústria" },
        { label: "Serviços", value: "Serviços" },
        { label: "Financeiro", value: "Financeiro" },
        { label: "Agronegócio", value: "Agronegócio" },
        { label: "Transporte e Logística", value: "Transporte e Logística" },
        { label: "Turismo e Hotelaria", value: "Turismo e Hotelaria" },
        { label: "Construção Civil", value: "Construção Civil" },
        { label: "Marketing e Comunicação", value: "Marketing e Comunicação" },
        { label: "Energia", value: "Energia" },
        { label: "Meio Ambiente", value: "Meio Ambiente" },
        { label: "Entretenimento", value: "Entretenimento" }
    ];

    const opFatorMo = [
        {label: "Sem Coparticipação", value: "Sem coparticipação"},
        {label: "Com Coparticipação", value: "com coparticipação"},
    ];
    
    const opModoA = [
        {label: "Dinheiro", value: "dinheiro"},
        {label: "Percentual", value: "percentual"},
    ];

    const opModoReajuste = [
        {label:"Aniversariante no Mês Subsequente e será faturado no proximo mes do aniversário", value: "ProximoMesAni"},
        {label:"Aniversariante no Mês atual", value: "aniMesAtual"},
        {label: "Aniversariante no Mês Subsequente e será faturado no mês do aniversário", value: "faturadoMesAniversario"}
    ];
    
    
  return (
    <>
    <main>
        <div>
        <h2 className={styles.TitleRepresentante}>
                <i className="fa-solid fa-bags-shopping"></i>
                    Novo Combo Produto/Serviço       
        </h2>
        </div>   
        <div className={styles.beneficiariosContent}>
            <section className={styles.filtroTabelaField}>
                <div className={styles.filtroTabelaContent}>
                    <div className={styles.filtroTabelaHeader}>
                        <h5 className={styles.filtroTabelaTitle}>
                            <i className="fa-solid fa-gear"></i>
                            Configuração Inicial
                        </h5>
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Status" 
                            type="select"
                            identifier="status"
                            value={status}
                            onChange={setStatus}
                            inputRef={statusRef}
                            options={opStatus}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Ordem" 
                            type="select"
                            identifier="ordem"
                            value={ordem}
                            onChange={setOrdem}
                            inputRef={ordemRef}
                            options={opOrdem}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Aparece em" 
                            type="select"
                            identifier="aparece"
                            value={aparece}
                            onChange={setAparece}
                            inputRef={apareceRef}
                            options={opAparece}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Grupo Contratual" 
                            type="select"
                            identifier="grupoContratual"
                            value={grupoContratual}
                            onChange={setGrupoContratual}
                            inputRef={grupoContratualRef}
                            options={opGruposContratual}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Tabela de Concessão" 
                            type="select"
                            identifier="status"
                            value={tabelaConcessao}
                            onChange={setTabelaConcessao}
                            inputRef={tabelaConcessaoRef}
                            options={opTabCon}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Tipo de plano" 
                            type="select"
                            identifier="tipoPlano"
                            value={tipoPlano}
                            onChange={setTipoPlano}
                            inputRef={tipoPlanoRef}
                            options={opTiposPlanos}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Convênio" 
                            type="select"
                            identifier="convenio"
                            value={convenio}
                            onChange={setConvenio}
                            inputRef={convenioRef}
                            options={opConvenios}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Entidade" 
                            type="select"
                            identifier="entidade"
                            value={entidade}
                            onChange={setEntidade}
                            inputRef={entidadeRef}
                            options={opEntidades}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Forma de Pagamento" 
                            type="select"
                            identifier="formaPagamento"
                            value={forPagamento}
                            onChange={setForPagamento}
                            inputRef={forPagamentoRef}
                            options={opFormasPagamento}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Descrição" 
                            identifier="descricao"
                            value={descricao}
                            onChange={setDescricao}
                            inputRef={descricaoRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Abreviação" 
                            identifier="abreviacao"
                            value={abreviacao}
                            onChange={setAbreviacao}
                            inputRef={abreviacaoRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Tipo de Reajuste" 
                            type="select"
                            identifier="tipReajuste"
                            value={tipoReajuste}
                            onChange={setTipoReajuste}
                            inputRef={tipoReajusteRef}
                            options={opReajuste}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Carência" 
                            identifier="carencia"
                            value={carencia}
                            onChange={setCarencia}
                            inputRef={carenciaRef}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Mês aniversáriante" 
                            type="select"
                            identifier="mesAniversariante"
                            value={mesAni}
                            onChange={setMesAni}
                            inputRef={mesAniRef}
                            options={opMeses}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Vigência Contratual - Inicio" 
                            type="date"
                            identifier="vigenciaContratualInicio"
                            value={vigenciaContratoI}
                            onChange={setVigenciaContratoI}
                            inputRef={vigenciaContratoIRef}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Vigência Contratual - Fim" 
                            type="date"
                            identifier="vigenciaContratualFim"
                            value={vigenciaContratoF}
                            onChange={setVigenciaContratoF}
                            inputRef={vigenciaContratoFRef}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                    <div className={styles.filtroTabelaHeader}>
                        <h5 className={styles.filtroTabelaTitle}>
                            <i className="fa-solid fa-shield-halved"></i>
                            ANS
                        </h5>
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Número da ANS" 
                            identifier="numAns"
                            value={numAns}
                            onChange={setNumAns}
                            inputRef={numAnsRef}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                    
                        <UseInputPadrao
                            label="Segmentação" 
                            type="select"
                            identifier="segmentacao"
                            value={segmentacao}
                            onChange={setSegmentacao}
                            inputRef={segmentacaoRef}
                            options={opSegmentacoes}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Acomodação" 
                            identifier="acomodacao"
                            value={acomodacao}
                            onChange={setAcomodacao}
                            inputRef={acomodacaoRef}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Abrangência" 
                            identifier="abrangencia"
                            value={abrangencia}
                            onChange={setAbrangencia}
                            inputRef={abrangenciaRef}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Fator de Moderação" 
                            type="select"
                            identifier="fatoModeracao"
                            value={fatorMo}
                            onChange={setFatorMo}
                            inputRef={fatorMoRef}
                            options={opFatorMo}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                    <div className={styles.filtroTabelaHeader}>
                        <h5 className={styles.filtroTabelaTitle}>
                            <i className="fa-solid fa-paper-plane"></i>
                            Configuração de Envio Externo
                        </h5>
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Cód. Produto Envio" 
                            identifier="codProEnv"
                            value={codProEnv}
                            onChange={setCodProEnv}
                            inputRef={codProEnvRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Cód. Empresa Envio" 
                            identifier="codEmpEnv"
                            value={codEmpEnv}
                            onChange={setCodEmpEnv}
                            inputRef={codEmpEnvRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                    <div className={styles.filtroTabelaHeader}>
                        <h5 className={styles.filtroTabelaTitle}>
                            <i className="fa-solid fa-puzzle-piece"></i>
                            Configuração de Módulos
                        </h5>
                    </div>
                    <div className={styles.divConteudo}>
                        <TogglePadrao 
                        label="Utiliza por Faixa de Idade?"
                        checked={utFaixaIdade}
                        onChange={() => handleChecked(setUtFaixaIdade, utFaixaIdade)}
                        option1="Não"
                        option2="Sim"

                        />
                        
                        { !utFaixaIdade && (
                            <>
                        <UseInputPadrao
                            label="Custo" 
                            type="number"
                            identifier="custo"
                            value={custo}
                            onChange={setCusto}
                            inputRef={custoRef}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Preço Final" 
                            type="number"
                            identifier="precoFinal"
                            value={precoF}
                            onChange={setPrecoF}
                            inputRef={precoFRef}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Modo da Adesão" 
                            type="select"
                            identifier="modoAdesao"
                            value={modoA}
                            onChange={setModoA}
                            inputRef={modoARef}
                            options={opModoA}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Valor da Adesão" 
                            type="number"
                            identifier="valAdesao"
                            value={vAdesao}
                            onChange={setVAdesao}
                            inputRef={vAdesaoRef}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        </>
                        )}

                        
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Qtd. Mínima Titulares" 
                            type="number"
                            identifier="qtdMin"
                            value={qtdMin}
                            onChange={setQtdMin}
                            inputRef={qtdMinRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                            label="Qtd. Máxima Titulares" 
                            type="number"
                            identifier="qtdMax"
                            value={qtdMax}
                            onChange={setQtdMax}
                            inputRef={qtdMaxRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                    <div className={styles.divConteudo}>
                        <TogglePadrao 
                        label="Adiciona Dependentes?"
                        checked={adicionaDep}
                        onChange={() => handleChecked(setAdicionaDep, adicionaDep)}
                        option1="Não"
                        option2="Sim"

                        />
                        {adicionaDep && (
                            <>
                            <UseInputPadrao
                            label="Limite de Dependente" 
                            type="number"
                            identifier="limiteDependente"
                            value={limDep}
                            onChange={setLimDep}
                            inputRef={limDepRef}
                            width={isMobile ? 100 : 80}
                            gap={isMobile ? 0 : 0.5}
                            />
                            <TogglePadrao 
                            label="Cobra Dependentes?"
                            checked={coDep}
                            onChange={() => handleChecked(setCoDep, coDep)}
                            option1="Não"
                            option2="Sim"
                            />
                            </>
                        )}

                        
                    </div>
                    <div className={styles.divConteudo}>
                        <TogglePadrao 
                        label="Utiliza Vigência?
                        "
                        checked={utiVigencia}
                        onChange={() => handleChecked(setUtiVigentecia, utiVigencia)}
                        option1="Não"
                        option2="Sim"
                      
                        />
                        <TogglePadrao 
                        label="V. no Portal do Corretor? "
                        checked={portalCorretor}
                        onChange={() => handleChecked(setPortalCorretor, portalCorretor)}
                        option1="Não"
                        option2="Sim"
                        
                        />
                        <TogglePadrao 
                        label="Valida DNV?"
                        checked={valDnv}
                        onChange={() => handleChecked(setValDnv, valDnv)}
                        option1="Não"
                        option2="Sim"
                        
                        />
                        <TogglePadrao 
                        label="Utiliza Pro Rata"
                        checked={proRata}
                        onChange={() => handleChecked(setProRata, proRata)}
                        option1="Não"
                        option2="Sim"
                        
                        />
                        <TogglePadrao 
                        label="Utiliza DMED"
                        checked={utDmed}
                        onChange={() => handleChecked(setUtDmed, utDmed)}
                        option1="Não"
                        option2="Sim"
                        
                        />
                    </div>
                    <div className={styles.divConteudo}>
                        <TogglePadrao 
                        label="Segurado têm carência?"
                        checked={segCarencia}
                        onChange={() => handleChecked(setSegCarencia, segCarencia)}
                        option1="Não"
                        option2="Sim"
                        />
                        <TogglePadrao 
                        label="
                        Dependente têm carência?"
                        checked={depCarencia}
                        onChange={() => handleChecked(setDepCarencia, depCarencia)}
                        option1="Não"
                        option2="Sim"
                        />
                        <TogglePadrao 
                        label="Usa Auditoria de Perguntas?"
                        checked={audPerguntas}
                        onChange={() => handleChecked(setAudPerguntas, audPerguntas)}
                        option1="Não"
                        option2="Sim"
                        />
                        <TogglePadrao 
                        label="Envia Cadastros à S. Farmácia?"
                        checked={envCadastro}
                        onChange={() => handleChecked(setEnvCadastro, envCadastro)}
                        option1="Não"
                        option2="Sim"
                        />
                    </div>
                    <div className={styles.divConteudo}>
                        <TogglePadrao 
                        label="Reajuste do Contrato?"
                        checked={reaContrato}
                        onChange={() => handleChecked(setReaContrato, reaContrato)}
                        option1="Não"
                        option2="Sim"
                        />
                        <TogglePadrao 
                        label="Reajuste por Faixa?"
                        checked={reaFaixa}
                        onChange={() => handleChecked(setReaFaixa, reaFaixa)}
                        option1="Não"
                        option2="Sim"
                        />
                        {reaFaixa && (
                            <>
                            <UseInputPadrao
                            label="Modo do Reajuste por Faixa" 
                            type="select"
                            identifier="modoReajuste"
                            value={modoReajuste}
                            onChange={setModoReajuste}
                            inputRef={modoReajusteRef}
                            options={opModoReajuste}
                            width={isMobile ? 100 : 100}
                            gap={isMobile ? 0 : 0.5}
                            />
                            </>
                        )}
                    </div>
                    <div className={styles.divConteudo}>
                        <TogglePadrao 
                        label="Utiliza NºProposta Especial?"
                        checked={propoEspecial}
                        onChange={() => handleChecked(setPropoEspecial, propoEspecial)}
                        option1="Não"
                        option2="Sim"
                        />
                        { propoEspecial && (
                            <>
                            <UseInputPadrao
                            label="Formato Proposta" 
                            type="number"
                            identifier="formatoProposta"
                            value={formatoProposta}
                            onChange={setFormatoProposta}
                            inputRef={formatoPropostaRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                            label="Número Inicial" 
                            type="number"
                            identifier="numeroInicial"
                            value={numInicial}
                            onChange={setNumInicial}
                            inputRef={numInicialRef}
                            width={isMobile ? 100 : 50}
                            gap={isMobile ? 0 : 0.5}
                            />
                            </>
                        )}
                    </div>
                    <div className={styles.filtroTabelaHeader}>
                        <h5 className={styles.filtroTabelaTitle}>
                            <i className="fa-solid fa-circle-info"></i>
                            Informações adicionais
                        </h5>
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao
                            label="Imagem (Preferencialmente 512 x 512)" 
                            type="file"
                            identifier="imagem"
                            value={imagem}
                            onChange={setImagem}
                            inputRef={imagemRef}
                            width={isMobile ? 100 : 20}
                            gap={isMobile ? 0 : 0.5}
                        />
                    </div>
                </div>
            </section>
        </div>
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
            </div>
        {modalMensagemTipo && <ModalMensagem modoEnvio={modalMensagemTipo} closeModal={closeModalMensagem} onCloseOrConfirm={handleConfirmMensagem} />}
        {modalFormularioOpen && <ModalFormulario closeModal={closeModalFormulario} onCloseOrConfirm={handleConfirmFormulario} />}
        {modalAnexoOpen && <ModalAnexo closeModal={closeModalAnexo} onCloseOrConfirm={handleConfirmAnexo} />}
        {modalLogOpen && <ModalLog closeModal={closeModalLog} onCloseOrConfirm={handleConfirmLog} />}
        {modalUsuarioOpen && <Usuario closeModal={closeModalUsuario} onCloseOrConfirm={handleConfirmUser} />}
        {modalDependenteOpen && <ModalDependente closeModal={closeModalDependente} onCloseOrConfirm={handleConfirmDependente} />}
    </main>
    </>
  )
}

export default NovoComboProdutoServico;