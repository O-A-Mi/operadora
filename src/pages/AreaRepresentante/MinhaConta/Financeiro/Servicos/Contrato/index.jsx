import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useState, useEffect } from 'react';
import { useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';

const dadosContrato = [
  {
    "acao": "Ver",
    "andamentoProposta": "Em Análise",
    "referencia": "REF001",
    "grupoContratual": "Familiar",
    "codContratoOperadora": "OP001",
    "qtdVida": 3,
    "valorPacote": 1500.00,
    "datas": "01/01/2024",
    "plano": "Plano Saúde",
    "contratante": "João Silva",
    "beneficiario": "Maria Silva",
    "representante": "Carlos Santos",
    "cadastro": "15/12/2023",
    "transmissao": "20/12/2023",
    "vigencia": "01/01/2024",
    "validado": "25/12/2023",
    "planoTipo": "Plano Saúde",
    "planoConvenio": "Assim Saúde",
    "planoContratado": "Sim",
    "planoReajustaContrato": "Sim",
    "planoEntidade": "ANC - CAARJ Assim",
    "contratanteNome": "João Silva",
    "contratanteCpfCnpj": "123.456.789-00",
    "contratanteEmail": "joao.silva@email.com",
    "contratanteDtNascimento": "15/03/1980",
    "contratanteTelefone": "(11) 99999-9999",
    "contratanteEndereco": "Rua das Flores",
    "contratanteNumero": "123",
    "contratanteComplemento": "Apto 45",
    "contratanteBairro": "Centro",
    "contratanteCidade": "São Paulo",
    "contratanteUf": "SP",
    "beneficiarioCpfCnpj": "987.654.321-00",
    "beneficiarioEmail": "maria.silva@email.com",
    "beneficiarioDtNascimento": "20/05/1985",
    "beneficiarioTelefone": "(11) 88888-8888",
    "beneficiarioEndereco": "Rua das Flores",
    "beneficiarioNumero": "123",
    "beneficiarioComplemento": "Apto 45",
    "beneficiarioBairro": "Centro",
    "beneficiarioCidade": "São Paulo",
    "beneficiarioUf": "SP",
    "representanteCorretora": "Corretora ABC",
    "representanteSupervisor": "Ana Costa",
    "representanteConsultor": "Carlos Santos"
  },
  {
    "acao": "Ver",
    "andamentoProposta": "Aprovado",
    "referencia": "REF002",
    "grupoContratual": "Individual",
    "codContratoOperadora": "OP002",
    "qtdVida": 1,
    "valorPacote": 800.00,
    "datas": "15/01/2024",
    "plano": "Plano Odonto",
    "contratante": "Pedro Santos",
    "beneficiario": "Pedro Santos",
    "representante": "Maria Oliveira",
    "cadastro": "10/01/2024",
    "transmissao": "12/01/2024",
    "vigencia": "15/01/2024",
    "validado": "14/01/2024",
    "planoTipo": "Plano Odonto",
    "planoConvenio": "Odonto Corp",
    "planoContratado": "Sim",
    "planoReajustaContrato": "Não",
    "planoEntidade": "Teste",
    "contratanteNome": "Pedro Santos",
    "contratanteCpfCnpj": "111.222.333-44",
    "contratanteEmail": "pedro.santos@email.com",
    "contratanteDtNascimento": "10/08/1990",
    "contratanteTelefone": "(11) 77777-7777",
    "contratanteEndereco": "Av. Paulista",
    "contratanteNumero": "1000",
    "contratanteComplemento": "Sala 100",
    "contratanteBairro": "Bela Vista",
    "contratanteCidade": "São Paulo",
    "contratanteUf": "SP",
    "beneficiarioCpfCnpj": "111.222.333-44",
    "beneficiarioEmail": "pedro.santos@email.com",
    "beneficiarioDtNascimento": "10/08/1990",
    "beneficiarioTelefone": "(11) 77777-7777",
    "beneficiarioEndereco": "Av. Paulista",
    "beneficiarioNumero": "1000",
    "beneficiarioComplemento": "Sala 100",
    "beneficiarioBairro": "Bela Vista",
    "beneficiarioCidade": "São Paulo",
    "beneficiarioUf": "SP",
    "representanteCorretora": "Corretora XYZ",
    "representanteSupervisor": "Roberto Lima",
    "representanteConsultor": "Maria Oliveira"
  },
  {
    "acao": "Ver",
    "andamentoProposta": "Pendente",
    "referencia": "REF003",
    "grupoContratual": "Empresarial",
    "codContratoOperadora": "OP003",
    "qtdVida": 5,
    "valorPacote": 2500.00,
    "datas": "01/02/2024",
    "plano": "Plano Pet",
    "contratante": "Empresa ABC Ltda",
    "beneficiario": "Funcionários ABC",
    "representante": "José Pereira",
    "cadastro": "25/01/2024",
    "transmissao": "28/01/2024",
    "vigencia": "01/02/2024",
    "validado": "30/01/2024",
    "planoTipo": "Plano Pet",
    "planoConvenio": "Hermanos Pet",
    "planoContratado": "Sim",
    "planoReajustaContrato": "Sim",
    "planoEntidade": "ANC - CAARJ Assim",
    "contratanteNome": "Empresa ABC Ltda",
    "contratanteCpfCnpj": "12.345.678/0001-90",
    "contratanteEmail": "contato@empresaabc.com",
    "contratanteDtNascimento": "",
    "contratanteTelefone": "(11) 66666-6666",
    "contratanteEndereco": "Rua do Comércio",
    "contratanteNumero": "500",
    "contratanteComplemento": "Andar 10",
    "contratanteBairro": "Vila Madalena",
    "contratanteCidade": "São Paulo",
    "contratanteUf": "SP",
    "beneficiarioCpfCnpj": "Múltiplos",
    "beneficiarioEmail": "funcionarios@empresaabc.com",
    "beneficiarioDtNascimento": "Múltiplos",
    "beneficiarioTelefone": "(11) 66666-6666",
    "beneficiarioEndereco": "Rua do Comércio",
    "beneficiarioNumero": "500",
    "beneficiarioComplemento": "Andar 10",
    "beneficiarioBairro": "Vila Madalena",
    "beneficiarioCidade": "São Paulo",
    "beneficiarioUf": "SP",
    "representanteCorretora": "Corretora DEF",
    "representanteSupervisor": "Fernanda Silva",
    "representanteConsultor": "José Pereira"
  }
];

const Contrato = () => {
  const { showLoader, hideLoader } = useLoader();

  const [activeTab, setActiveTab] = useState('plano');
  const [expandedTabs, setExpandedTabs] = useState(['pesquisa']);

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const [tipoPlano, setTipoPlano, tipoPlanoRef] = UseInputMask();
  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [primeiraMensalidadePaga, setPrimeiraMensalidadePaga, primeiraMensalidadePagaRef] = UseInputMask();
  const [plano, setPlano, planoRef] = UseInputMask();
  const [entidade, setEntidade, entidadeRef] = UseInputMask();
  const [contratoValidado, setContratoValidado, contratoValidadoRef] = UseInputMask();
  
  const [cadastroInicial, setCadastroInicial, cadastroInicialRef] = UseInputMask();
  const [cadastroFinal, setCadastroFinal, cadastroFinalRef] = UseInputMask();
  const [transmissaoInicial, setTransmissaoInicial, transmissaoInicialRef] = UseInputMask();
  const [transmissaoFinal, setTransmissaoFinal, transmissaoFinalRef] = UseInputMask();
  const [vigenciaInicial, setVigenciaInicial, vigenciaInicialRef] = UseInputMask();
  const [vigenciaFinal, setVigenciaFinal, vigenciaFinalRef] = UseInputMask();
  const [diaVigencia, setDiaVigencia, diaVigenciaRef] = UseInputMask();
  const [validadoInicial, setValidadoInicial, validadoInicialRef] = UseInputMask();
  const [validadoFinal, setValidadoFinal, validadoFinalRef] = UseInputMask();
  
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask('representante');
  const [texto, setTexto, textoRef] = UseInputMask();
  const [tipoContratante, setTipoContratante, tipoContratanteRef] = UseInputMask();
  const [tipo, setTipo, tipoRef] = UseInputMask('sintetico');

  const tabs = [
    { id: 'pesquisa', label: 'Pesquisa', icon: 'fa-solid fa-search' },
    { id: 'configuracoes', label: 'Configurações', icon: 'fa-solid fa-cog' },
    { id: 'datas', label: 'Datas', icon: 'fa-solid fa-calendar-days' }
  ];

  const toggleTab = (tabId) => {
    setExpandedTabs(prev => 
      prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  const tipoPlanoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'plano_odonto', label: 'Plano Odonto' },
    { value: 'plano_saude', label: 'Plano Saúde' },
    { value: 'saude', label: 'Saúde' },
    { value: 'opcionais', label: 'Opcionais' },
    { value: 'plano_pet', label: 'Plano Pet' }
  ];

  const convenioOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'assim_saude', label: 'Assim Saúde' },
    { value: 'hermanos_pet', label: 'Hermanos Pet' },
    { value: 'odonto_corp', label: 'Odonto Corp' },
    { value: 'teste', label: 'Teste' }
  ];

  const primeiraMensalidadePagaOptions = [
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' }
  ];

  const planoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'teste', label: 'Teste' },
    { value: 'cleandentes', label: 'Cleandentes' },
    { value: 'siga_odonto', label: 'Siga Odonto' }
  ];

  const entidadeOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'anc_caarj_assim', label: 'ANC - CAARJ Assim' },
    { value: 'teste', label: 'Teste' }
  ];

  const contratoValidadoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'sim', label: 'Sim' },
    { value: 'nao', label: 'Não' }
  ];

  const diaVigenciaOptions = [
    ...Array.from({ length: 31 }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString()
    }))
  ];

  const pesquisarOptions = [
    { value: 'representante', label: 'Representante' },
    { value: 'contratante', label: 'Contratante' }
  ];

  const tipoContratanteOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'pessoa_fisica', label: 'Pessoa Física' },
    { value: 'pessoa_juridica', label: 'Pessoa Jurídica' }
  ];

  const tipoOptions = [
    { value: 'sintetico', label: 'Sintético' },
    { value: 'analitico', label: 'Analítico' }
  ];

  const tabelaColumns = [
    { value: "acao", name: "Ação" },
    { value: "andamentoProposta", name: "Andamento da Proposta" },
    { value: "referencia", name: "Referência" },
    { value: "grupoContratual", name: "Grupo Contratual" },
    { value: "codContratoOperadora", name: "Cod.Contrato Operadora" },
    { value: "qtdVida", name: "Qtd Vida" },
    { value: "valorPacote", name: "Valor do Pacote" },
    { 
      value: "datas", 
      name: "Datas",
      subColumns: [
        { value: "cadastro", name: "Cadastro" },
        { value: "transmissao", name: "Transmissão" },
        { value: "vigencia", name: "Vigência" },
        { value: "validado", name: "Validado" }
      ]
    },
    { 
      value: "plano", 
      name: "Plano",
      subColumns: [
        { value: "planoTipo", name: "Tipo" },
        { value: "planoConvenio", name: "Convênio" },
        { value: "planoContratado", name: "Contratado" },
        { value: "planoReajustaContrato", name: "Reajusta Contrato?" },
        { value: "planoEntidade", name: "Entidade" }
      ]
    },
    { 
      value: "contratante", 
      name: "Contratante",
      subColumns: [
        { value: "contratanteNome", name: "Nome" },
        { value: "contratanteCpfCnpj", name: "CPF/CNPJ" },
        { value: "contratanteEmail", name: "E-mail" },
        { value: "contratanteDtNascimento", name: "Dt. Nascimento" },
        { value: "contratanteTelefone", name: "Telefone" },
        { value: "contratanteEndereco", name: "Endereço" },
        { value: "contratanteNumero", name: "Número" },
        { value: "contratanteComplemento", name: "Complemento" },
        { value: "contratanteBairro", name: "Bairro" },
        { value: "contratanteCidade", name: "Cidade" },
        { value: "contratanteUf", name: "UF" }
      ]
    },
    { 
      value: "beneficiario", 
      name: "Beneficiário",
      subColumns: [
        { value: "beneficiarioCpfCnpj", name: "CPF/CNPJ" },
        { value: "beneficiarioEmail", name: "E-mail" },
        { value: "beneficiarioDtNascimento", name: "Dt. Nascimento" },
        { value: "beneficiarioTelefone", name: "Telefone" },
        { value: "beneficiarioEndereco", name: "Endereço" },
        { value: "beneficiarioNumero", name: "Número" },
        { value: "beneficiarioComplemento", name: "Complemento" },
        { value: "beneficiarioBairro", name: "Bairro" },
        { value: "beneficiarioCidade", name: "Cidade" },
        { value: "beneficiarioUf", name: "UF" }
      ]
    },
    { 
      value: "representante", 
      name: "Representante",
      subColumns: [
        { value: "representanteCorretora", name: "Corretora" },
        { value: "representanteSupervisor", name: "Supervisor" },
        { value: "representanteConsultor", name: "Consultor" }
      ]
    }
  ];

  useEffect(() => {
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('contrato', 'contrato-container');
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('contrato', 'contrato-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  const carregarDados = async () => {
    try {
      showLoader();
      setTabelaDados(dadosContrato);
      setFiltroDados(dadosContrato);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      hideLoader();
    }
  };

  const filtrarDados = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    try {
      showLoader();
      
      let dadosFiltrados = [...tabelaDados];

      if (tipoPlano) {
        dadosFiltrados = dadosFiltrados.filter(item => item.planoTipo === tipoPlano);
      }

      if (convenio) {
        dadosFiltrados = dadosFiltrados.filter(item => item.planoConvenio === convenio);
      }

      if (plano) {
        dadosFiltrados = dadosFiltrados.filter(item => item.plano === plano);
      }

      if (contratoValidado) {
        dadosFiltrados = dadosFiltrados.filter(item => item.validado === contratoValidado);
      }

      if (texto) {
        const textoLower = texto.toLowerCase();
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.contratante?.toLowerCase().includes(textoLower) ||
          item.representante?.toLowerCase().includes(textoLower) ||
          item.referencia?.toLowerCase().includes(textoLower)
        );
      }

      setFiltroDados(dadosFiltrados);
    } catch (error) {
      console.error('Erro ao filtrar dados:', error);
    } finally {
      hideLoader();
    }
  };

  const limparFiltro = () => {
    limparFiltros([
      { setter: setTipoPlano, ref: tipoPlanoRef },
      { setter: setConvenio, ref: convenioRef },
      { setter: setPrimeiraMensalidadePaga, ref: primeiraMensalidadePagaRef },
      { setter: setPlano, ref: planoRef },
      { setter: setEntidade, ref: entidadeRef },
      { setter: setContratoValidado, ref: contratoValidadoRef },
      { setter: setCadastroInicial, ref: cadastroInicialRef },
      { setter: setCadastroFinal, ref: cadastroFinalRef },
      { setter: setTransmissaoInicial, ref: transmissaoInicialRef },
      { setter: setTransmissaoFinal, ref: transmissaoFinalRef },
      { setter: setVigenciaInicial, ref: vigenciaInicialRef },
      { setter: setVigenciaFinal, ref: vigenciaFinalRef },
      { setter: setDiaVigencia, ref: diaVigenciaRef },
      { setter: setValidadoInicial, ref: validadoInicialRef },
      { setter: setValidadoFinal, ref: validadoFinalRef },
      { setter: setTexto, ref: textoRef },
      { setter: setTipoContratante, ref: tipoContratanteRef },
      { setter: setPesquisar, ref: pesquisarRef, defaultValue: 'representante' },
      { setter: setTipo, ref: tipoRef, defaultValue: 'sintetico' }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case 'configuracoes':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao 
              label="Tipo de plano"
              identifier="tipo-plano" 
              value={tipoPlano}
              onChange={setTipoPlano}
              inputRef={tipoPlanoRef}
              type='select'
              options={tipoPlanoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Convênio"
              identifier="convenio" 
              value={convenio}
              onChange={setConvenio}
              inputRef={convenioRef}
              type='select'
              options={convenioOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="1º Mensalidade Paga"
              identifier="primeira-mensalidade-paga" 
              value={primeiraMensalidadePaga}
              onChange={setPrimeiraMensalidadePaga}
              inputRef={primeiraMensalidadePagaRef}
              type='select'
              options={primeiraMensalidadePagaOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0} 
            />
          </div>
        );
        
      case 'datas':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao 
              label="Cadastro - Inicial"
              identifier="cadastro-inicial" 
              type='date' 
              value={cadastroInicial}
              onChange={setCadastroInicial}
              inputRef={cadastroInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Cadastro - Final"
              identifier="cadastro-final" 
              type='date'
              value={cadastroFinal}
              onChange={setCadastroFinal}
              inputRef={cadastroFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Transmissão - Inicial"
              identifier="transmissao-inicial" 
              type='date' 
              value={transmissaoInicial}
              onChange={setTransmissaoInicial}
              inputRef={transmissaoInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0} 
            />
            <UseInputPadrao 
              label="Transmissão - Final"
              identifier="transmissao-final" 
              type='date'
              value={transmissaoFinal}
              onChange={setTransmissaoFinal}
              inputRef={transmissaoFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Vigência - Inicial"
              identifier="vigencia-inicial" 
              type='date' 
              value={vigenciaInicial}
              onChange={setVigenciaInicial}
              inputRef={vigenciaInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Vigência - Final"
              identifier="vigencia-final" 
              type='date'
              value={vigenciaFinal}
              onChange={setVigenciaFinal}
              inputRef={vigenciaFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0} 
            />
            <UseInputPadrao 
              label="Dia Vigência"
              identifier="dia-vigencia" 
              type='select'
              value={diaVigencia}
              onChange={setDiaVigencia}
              inputRef={diaVigenciaRef}
              options={diaVigenciaOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Validado - Inicial"
              identifier="validado-inicial" 
              type='date' 
              value={validadoInicial}
              onChange={setValidadoInicial}
              inputRef={validadoInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Validado - Final"
              identifier="validado-final" 
              type='date'
              value={validadoFinal}
              onChange={setValidadoFinal}
              inputRef={validadoFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0} 
            />
          </div>
        );
        
      case 'pesquisa':
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao 
              label="Pesquisar"
              identifier="pesquisar" 
              value={pesquisar}
              onChange={setPesquisar}
              inputRef={pesquisarRef}
              type='select'
              options={pesquisarOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Texto"
              identifier="texto"
              icon="fa-solid fa-search"
              value={texto}
              onChange={setTexto}
              inputRef={textoRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5} 
              upperCase
            />
            <UseInputPadrao 
              label="Tipo Contratante"
              identifier="tipo-contratante" 
              value={tipoContratante}
              onChange={setTipoContratante}
              inputRef={tipoContratanteRef}
              type='select'
              options={tipoContratanteOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5} 
            />
            <UseInputPadrao 
              label="Tipo"
              identifier="tipo" 
              value={tipo}
              onChange={setTipo}
              inputRef={tipoRef}
              type='select'
              options={tipoOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0} 
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  const dadosTabela = dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    acao: item.acao,
    andamentoProposta: item.andamentoProposta,
    referencia: item.referencia,
    grupoContratual: item.grupoContratual,
    codContratoOperadora: item.codContratoOperadora,
    qtdVida: item.qtdVida,
    valorPacote: item.valorPacote,
    datas: item.datas,
    plano: item.plano,
    contratante: item.contratante,
    beneficiario: item.beneficiario,
    representante: item.representante,
    cadastro: item.cadastro,
    transmissao: item.transmissao,
    vigencia: item.vigencia,
    validado: item.validado,
    planoTipo: item.planoTipo,
    planoConvenio: item.planoConvenio,
    planoContratado: item.planoContratado,
    planoReajustaContrato: item.planoReajustaContrato,
    planoEntidade: item.planoEntidade,
    contratanteNome: item.contratanteNome,
    contratanteCpfCnpj: item.contratanteCpfCnpj,
    contratanteEmail: item.contratanteEmail,
    contratanteDtNascimento: item.contratanteDtNascimento,
    contratanteTelefone: item.contratanteTelefone,
    contratanteEndereco: item.contratanteEndereco,
    contratanteNumero: item.contratanteNumero,
    contratanteComplemento: item.contratanteComplemento,
    contratanteBairro: item.contratanteBairro,
    contratanteCidade: item.contratanteCidade,
    contratanteUf: item.contratanteUf,
    beneficiarioCpfCnpj: item.beneficiarioCpfCnpj,
    beneficiarioEmail: item.beneficiarioEmail,
    beneficiarioDtNascimento: item.beneficiarioDtNascimento,
    beneficiarioTelefone: item.beneficiarioTelefone,
    beneficiarioEndereco: item.beneficiarioEndereco,
    beneficiarioNumero: item.beneficiarioNumero,
    beneficiarioComplemento: item.beneficiarioComplemento,
    beneficiarioBairro: item.beneficiarioBairro,
    beneficiarioCidade: item.beneficiarioCidade,
    beneficiarioUf: item.beneficiarioUf,
    representanteCorretora: item.representanteCorretora,
    representanteSupervisor: item.representanteSupervisor,
    representanteConsultor: item.representanteConsultor,
    qtdVidaOriginal: item.qtdVida,
    valorPacoteOriginal: item.valorPacote
  })) : [];

  const footerColumns = [
    {
      name: "Qtd Vida",
      value: "qtdVida",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.qtdVidaOriginal === 'number' ? item.qtdVidaOriginal : 0;
          return acc + valor;
        }, 0);
        return total.toString();
      }
    },
    {
      name: "Valor do Pacote",
      value: "valorPacote",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.valorPacoteOriginal === 'number' ? item.valorPacoteOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    }
  ];

  return (
    <div className={styles.contratoContainer} id="contrato-container">
      <h2 className={styles.contratoTitle}>
        <i className="fa-solid fa-file-contract"></i>
        Contrato
      </h2>
      <div className={styles.contratoContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h5>
              <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                Limpar filtro
              </button>
            </div>
            
            <div className={styles.tabsContainer}>
              <div className={styles.tabsHeader}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${
                      expandedTabs.includes(tab.id) ? styles.active : ''
                    }`}
                    onClick={() => toggleTab(tab.id)}
                  >
                    <i className={tab.icon} />
                    {tab.label}
                    <i className={`fa-solid fa-chevron-down`} />
                  </button>
                ))}
              </div>
              
              {tabs.map(tab => (
                <div
                  key={tab.id}
                  className={`${styles.tabPanel} ${
                    expandedTabs.includes(tab.id) ? styles.expanded : styles.collapsed
                  }`}
                >
                  {renderTabContent(tab.id)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.tabelaSection}>
          <TabelaPadrao
            tabelaId="contrato"
            columns={tabelaColumns}
            data={dadosTabela}
            footer={footerColumns}
            options={{
              showPaginationSwitch: true,
              showSearch: () => filtrarDados(),
              showToggleView: true,
              showColumnsSelector: true,
              showPrint: false,
              showExport: true,
              showFooter: true,
              fileName: "contrato"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Contrato; 