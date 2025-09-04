

export const jsonRoute = {
  Beneficiario_Login: "login-beneficiario",
  Beneficiario_Area: "area-beneficiario",
  // "Beneficiario_Area": "area-Beneficiario",
  // "Beneficiario_DadosDaConta": "dados-da-conta",
  // "Beneficiario_EquipeVendas": "equipe-de-vendas",
  // "Beneficiario_Acompanhamento": "acompanhamento",
  // "Beneficiario_MaterialApoio": "material-de-apoio",
  // "Beneficiario_VendasNovas": "vendas-novas",
  Seguranca: "seguranca",
  // Removido: Permissao (rota antiga)

  // -------------------------------------- //

  Operadora_Login: "login-operadora",
  AreaOperadora: "area-operadora",
  HomeOperadora: "home",
  SegurancaUsuario: "usuario",
  InfoTabela: "info-tabela",
  // Removido: Permissao duplicada
  PermissaoRelatorios: "permissao-relatorios",
  RelatoriosTab :"relatorios-tabela",
  PermissaoInformacoes:"permissoes",
  Configuracoes: "configuracoes",
  Relatorios: "relatorios",
  Mensagens: "ferramentas-mensagens",
  Operacional: "operacional",
  Financeiro: "financeiro",
  Lancamento: "lancamento",
  Tesouraria: "tesouraria",
  Cobranca: "cobranca",
  Servicos: "servicos",
  Banco: "banco",
  LogAuditoria: "log-auditoria",
  Manutencao: "manutencao",

    // ------------------- MANUTENÇÃO ------------------- //

  Contratante: "contratante",
  NovoContratante: "novo-contratante",
  AtualizacaoPrecoLote: "atualizacao-preco-lote",
  PlanoSaude: "plano-saude",
  NovoPlanoSaude: "novo-plano-saude",
  Operadora: "operadora",
  NovaOperadora: "nova-operadora",
  Convenio: "convenio",
  Depedente: "dependente",
  Entidade: "entidade",
  EntidadeCadastro: "cadastro",
  Fornecedor: "fornecedor",
  FornecedorCadastro: "cadastro",
  Funcionario: "funcionario",
  FuncionarioCadastro: "cadastro",
  ProdutoServico: "produto-servico",
  NovoProdutoServico: "novo-produto-servico",
  Representante: "representante",
  RepresentanteCadastro: "cadastro",
  Segurado: "segurado",
  NovoSegurado: "novo-segurado",
  VigenciaTransmissao: "vigencia-transmissao-lote",
  
  // ------------------- OPERACIONAL ------------------- //
  
  DashboardOperacional: "dashboard",
  DashboardConfiguracoes: "dashboard",
  CadastroBeneficiarios:"beneficiario",
  CriarCliente:"cadastrar-cliente",
  CadastroRepresentante: "representante",
  CadastroCliente: "cliente",
  CadastroBeneficiario:"cadastrar-beneficiario",
  CadastroBeneficiarioNovo: "cadastro",
  InfoRepresentante : "informacoes-representante",
  CadastroPlanos: "plano-servico",
  CadastroPlanosNovo: "cadastro-plano-servico",
  ComboProduto: "combo",
  NovoComboProdutoServico: "novo-combo",
  MovBeneficiario: "movimentacoes-beneficiario",
  MigracaoCarterinha: "carterinha",
  MigracaoRepresentante: "representante",
  MigracaoPlano: "plano",
  MigracaoColaborador: "colaborador",
  MigracaoFornecedor: "fornecedor",
  MigracaoVigencia: "vigencia",


  // ------------------- PORTAL EMPRESARIAL ------------------- //
  Acompanhamento_Empresarial: "acompanhamento",
  Cancelamento_Empresarial: "cancelamento",
  ValidacaoProposta_Empresarial: "validacao-proposta",

  
  // Sub-rotas do Tesouraria
  FluxoCaixa: "fluxo-caixa",
  ContasAReceber: "contas-a-receber",
  ContasAPagar: "contas-a-pagar",
  Comissao: "comissao",
  Competencia: "competencia",
  DRE: "dre",
  Kanban: "fluxo-de-trabalho",
  Movimentacoes: "Movimentacoes",
  
  // Sub-rotas do Serviços
  Contrato: "contrato",
  AlteracaoVencimento: "alteracao-vencimento",
  
  // Sub-rotas do Banco
  ArquivoRemessa: "arquivo-remessa",
  ArquivoRetorno: "arquivo-retorno",
  RemessaBancoDigital: "remessa-banco-digital",
  
  // Sub-rotas da Competência
  Fechamento: "fechamento",
  Abertura: "abertura",
  
  // Sub-rotas do Lançamento Novo
  DadosFinanceiro: "dados-financeiro",
  OrigemLancamento: "origem-lancamento",
  FormaPagamento: "forma-pagamento",
  Informacoes: "informacoes",

 // Sub-Rota Configuracao -- Formularios
  Formulario: "formulario",
  FormularioCadastro: "cadastro",
  
  // Sub-rotas do Lançamento
  LancamentoNovo: "novo",
  ConfigPadrao: "configuracaoPadrao",

  // ------------------- CONFIGURAÇÃO ------------------- //
  Especialidades: "especialidades",
  MensagensFerramenta: "mensagens",
  Notificacao: "notificacao",
  Departamento: "departamento",
  Status: "status",
  PerguntasDeclaracao: "perguntas-declaracao",
  QuestionarioVida: "questionario-de-vida",
  FuncaoUsuario: "funcao-usuario",
  AgendadorFinanceiro: "agendador-financeiro",
  AgendadorAssociado:"agendador-Associado",
  AgendadorProposta:"agendador-proposta",
  AgendadorMudarStatus:"agendador-mudar-status",
  AgendadorRepresentante:"agendador-representante",
  AgendadorPlataforma:"agendador-plataforma",
  AndamentoProposta: "andamento-proposta",
  CartaCacelamento:"carta-cancelamento",
  BoasVindas:"boas-vindas",
  StatusGeral:"status",
  DepartamentoGeral:"departamento",
  FuncaoUsuarioGeral:"funcao-usuario",
  // ------------------Area do Representante-------------------- //

  Representante_Login: "login-representante",
  Representante_Area: "area-representante",
  Representante_DadosRepresentante: "dados-representante",
  Representante_ListagemBeneficiario: "listagem-beneficiario",
  Representante_Atendimentos: "atendimentos",
  Representante_DadosDaConta: "dados-da-conta",
  Representante_Lotes: "lotes",
  Representante_AbreLote: "detalhes-lote",
  Representante_ValidarPaciente: "validar-paciente",
  Representante_ValidarToken: "token",
  Representante_Financeiro: "financeiro",
  Representante_FaseAtendimento: "fase-atendimento",
  KanbanRepresentante: "atendimento",
  Venda_Representante: "venda",
  Consulta_Representante: "consulta",
  Acompanhamento_Representante: "acompanhamento",

 // ------------------Area do cliente-------------------- //
  Cliente_login: "login-cliente",
  Operadora_MinhaConta:"area-cliente",
  HomeCliente:"home",
  Listagem_Beneficiarios: "listagem-beneficiarios",
  Movimentacoes: "movimentacoes",
  Modulo_Relatorio: "modulo-relatorio",
  Dados_do_Cliente: "dados-cliente",
  Financeiro_Cliente: "financeiro",
  Seguranca_Cliente: "usuario",
  Adesao_Cliente: "adesao",
  Acompanhamento_Cliente: "acompanhamento",
  Consulta_Cliente: "consulta",
  Venda_Cliente: "venda",
  CriarClientOperadora: "cadastrar-cliente-beneficiario",
  
 // ------------------Area do Beneficiario-------------------- //
  Beneficiario_login: "login-beneficiario",
  Beneficiario_MinhaConta:"area-beneficiario",
  HomeBeneficiario:"home",
  Questionario_de_Vida: "questionario-de-vida",
  Perguntas_Declaracao: "perguntas-declaracao",
  Dados_do_Beneficiario: "dados-beneficiario",
  QuestionarioPerguntasVida: "questionario-perguntas-declaracao",
  QuestionarioPerguntasDeclaracao: "questionario-perguntas-declaracao"
};

export const devBaseInf = {
  cd_empresa: "IBBCA",
  baselink: "http://localhost:8080/sge/",
};

//login teste 60694186627
//senha 6069
export const prodBaseInf = {
  cd_empresa: "DRHOJE",
  baselink: "https://sistema.hermanosti.com/clubedebeneficio/api/drhoje/",
  baselinkJson: "https://sistema.hermanosti.com/clubedebeneficio/",
};

export const baseInf = {
  appMode: "prod",
  endpoints: {
    logarCliente: "LoginBeneficiario.jsp",
    especialidades: `json/${prodBaseInf.cd_empresa}/especialidades.json.gz`,
    estabelecimento: `json/${prodBaseInf.cd_empresa}/estabelecimento.json.gz`,
    gravarEsqueciSenha: "esqueciSenha.jsp",
    logarRepresentante: "loginRepresentante.jsp",
    cadastrarRepresentante: "gravarRepresentante.jsp",
    alteraEnderecoRepresentante: "alteraEnderecoRepresentante.jsp",
    alteraInfoRepresentante: "alteraInfoRepresentante.jsp",
    alterarSenhaRepresentante: "alterarSenhaRepresentante.jsp",
    cadastrar: "gravarPropostaCartao.jsp",
    cadastrarEmpresarial: "gravarPropostaEmpresa.jsp",
    gravaSegurado: "gravaSegurado.jsp",
    gravaDependente: "gravaDependente.jsp",
    editaDependente: "editarDependente.jsp",
    deletaDependente: "deletarDependente.jsp",
    alterarInfoCliente: "alteraInfoCliente.jsp",
    alterarEnderecoCliente: "alteraEnderecoCliente.jsp",
    alterarSenha: "alterarSenha.jsp",
    logarEntidade: "loginEntidade.jsp",
    cadastrarEntidade: "gravarEntidade.jsp",
    alterarInfoEntidade: "alterarInfoEntidade.jsp",
    alterarEnderecoEntidade: "alterarEnderecoEntidade.jsp",
    alterarSenhaEntidade: "alterarSenhaEntidade.jsp",
    alterarInfoUserEntidade: "alterarInfoUserEntidade.jsp",
    alterarInfoRepEntidade: "alterarInfoRepEntidade.jsp",
    deletarUserEntidade: "deletarUserEntidade.jsp",
    alterarUserEntidade: "alterarUserEntidade.jsp",
    gravarClienteEntidade: "gravarClienteEntidade.jsp",
    gravarCarrinho: "gravarCarrinho.jsp",
    limparCarrinho: "limparCarrinho.jsp",
    gravarBeneficiarioCarrinho: "gravarBeneficiarioCarrinho.jsp",
    gravarPagamentoCarrinho: "gravarPagamentoCarrinho.jsp",
    gravarAtendimento: "gravaAtendimento.jsp",
    logarConsultor: "loginConsultor.jsp",
    alterarDadosConsultor: "alterarDadosConsultor.jsp",
    alterarInfoCorretora: "alterarInfoCorretora.jsp",
    alterarDadosRepresentante: "alterarDadosRepresentante.jsp",
    alterarEnderecoConsultor: "alterarEnderecoConsultor.jsp",
    alterarSenhaConsultor: "alterarSenhaConsultor.jsp",
    cadastrarConsultor: "gravarConsultor.jsp",
    cadastrarCorretora: "gravarCorretora.jsp",
    logarEmpresarial: "loginEmpresarial.jsp",
    alterarInfoEmpresa: "alterarInfoEmpresa.jsp",
    alterarEnderecoEmpresa: "alterarEnderecoEmpresa.jsp",
    alterarInfoRepEmpresa: "alterarInfoRepEmpresa.jsp",
    alterarSenhaEmpresa: "alterarSenhaEmpresa.jsp",
    finalizaAtendimento: "finalizarAtendimento.jsp",
    uploadBeneficiario: "gravarUploadBeneficiarios.jsp",
    executarBeneficiario: "executarImportacaoBeneficiario.jsp",
    baixarBoleto: "boleto/gerarBoletoLanctoSite.jsp",
    alterarInfoUserEmpresa: "alterarInfoUserEmpresa.jsp",
    executarMovBeneficiario: "gravarUploadMovBenef.jsp",
    buscarEndereco: "buscarEndereco.jsp",
    // funções de gravar
    gravarUsuario: "gravarUsuario.jsp",
    cadastrarTelemedicina: "consultarTelemedicinaCadastro.jsp",

    // funções de busca
    consultarTelemedicina: "consultarTelemedicina.jsp",

    // funções de upload de imagens
    uploadDocumentosEmpresa: "ftp_documentos_venda_empresa.jsp",
  },
};

export const user = {
  id: "",
  senha: "2401",
  nome: "",
  cpf: "",
  email: "",
  genero: "",
  razao_social: "",
  sexo: "",
  dataNascimento: "",
  ddd: "",
  celular: "",
  telefone: "",
  cep: "",
  cnpj: "24.013.672/0001-08",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  pais: "",
  saldo: "",
  assinatura: [],
};

export const configPadrao = [
  {
    id: jsonRoute.Especialidades,
    filtrosTabela: [
      {label: "Nome", value: "nome", type: "select", options: [ 
      ]},
      {label: "Status", value: "status", type: "select", options: [
        {value: "Ativo", label: "Ativo"},
        {value: "Inativo", label: "Inativo"},
      ]},
    ],
    colunasTabela: [
      { value: "acao", name: "Ação" },
      { value: "pago", name: "Pago" },
      { value: "acaoJudicial", name: "Ação Judicial" },
      { value: "serasa", name: "Serasa" },
      { value: "associado", name: "Associado" },
      { value: "referencia", name: "Referência" },
      { value: "historico", name: "Histórico" },
      { value: "tipoParcela", name: "Tipo de Parcela" },
    ],
    optionsTabela: [{
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
      showPrint: false,
      showExport: true,
      showFooter: true,
      fileName: "especialidades",
      additionalButtons: [ 
      ]
    }],
    pathOnClick: "/area-operadora/especialidades/editar",
  },
  // {
  //   id: jsonRoute.MensagensFerramenta,
  //   filtrosTabela: [
  //     {label: "Nome", value: "nome", type: "select", options: [ 
  //     ]},
  //     {label: "Status", value: "status", type: "select", options: [
  //       {value: "Ativo", label: "Ativo"},
  //       {value: "Inativo", label: "Inativo"},
  //     ]},
  //     {label: "Texto", value: "texto", type: "text", identifier: "texto"},
  //   ],
  //   colunasTabela: [
  //     { value: "acao", name: "Ação" },
  //     { value: "pago", name: "Pago" },
  //     { value: "acaoJudicial", name: "Ação Judicial" },
  //     { value: "serasa", name: "Serasa" },
  //     { value: "associado", name: "Associado" },
  //     { value: "referencia", name: "Referência" },
  //     { value: "historico", name: "Histórico" },
  //     { value: "tipoParcela", name: "Tipo de Parcela" },
  //   ],
  //   optionsTabela: [{
  //     showPaginationSwitch: true,
  //     showToggleView: true,
  //     showColumnsSelector: true,
  //     showPrint: false,
  //     showExport: true,
  //     showFooter: true,
  //     fileName: "mensagemferramenta",
  //     additionalButtons: [ 
  //     ]
  //   }],
  //   pathOnClick: "/area-operadora/MensagensFerramenta/editar",
  // },
  {
    id: jsonRoute.Notificacao,
    filtrosTabela: [
      {label: "Nome", value: "nome", type: "select", options: [ 
      ]},
      {label: "Status", value: "status", type: "select", options: [
        {value: "Ativo", label: "Ativo"},
        {value: "Inativo", label: "Inativo"},
      ]},
    ],
    colunasTabela: [
      { value: "acao", name: "Ação" },
      { value: "pago", name: "Pago" },
      { value: "acaoJudicial", name: "Ação Judicial" },
      { value: "serasa", name: "Serasa" },
      { value: "associado", name: "Associado" },
      { value: "referencia", name: "Referência" },
      { value: "historico", name: "Histórico" },
      { value: "tipoParcela", name: "Tipo de Parcela" },
      { value: "statusFi", name: "Status FI" },
    ],
    optionsTabela: [{
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
      showPrint: false,
      showExport: true,
      showFooter: true,
      fileName: "notificacao",
      additionalButtons: [ 
      ]
    }],
    pathOnClick: "/area-operadora/Notificacao/editar",
  },
  {
    id: jsonRoute.Status,
    filtrosTabela: [
      {label: "Nome", value: "nome", type: "select", options: [ 
      ]},
      {label: "Status", value: "status", type: "select", options: [
        {value: "Ativo", label: "Ativo"},
        {value: "Inativo", label: "Inativo"},
      ]},
    ],
    colunasTabela: [
      { value: "acao", name: "Ação" },
      { value: "pago", name: "Pago" },
      { value: "acaoJudicial", name: "Ação Judicial" },
      { value: "serasa", name: "Serasa" },
      { value: "associado", name: "Associado" },
      { value: "referencia", name: "Referência" },
      { value: "historico", name: "Histórico" },
      { value: "tipoParcela", name: "Tipo de Parcela" },
      { value: "statusFi", name: "Status FI" },
      { value: "statusProposta", name: "Status Proposta" },
    ],
    optionsTabela: [{
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
      showPrint: false,
      showExport: true,
      showFooter: true,
      fileName: "status",
      additionalButtons: [ 
      ]
    }],
    pathOnClick: "/area-operadora/Status/editar",
  },
  {
    id: jsonRoute.PerguntasDeclaracao,
    filtrosTabela: [
      {label: "Nome", value: "nome", type: "select", options: [ 
      ]},
      {label: "Status", value: "status", type: "select", options: [
        {value: "Ativo", label: "Ativo"},
        {value: "Inativo", label: "Inativo"},
      ]},
    ],
    colunasTabela: [
      { value: "acao", name: "Ação" },
      { value: "pago", name: "Pago" },
      { value: "acaoJudicial", name: "Ação Judicial" },
      { value: "serasa", name: "Serasa" },
      { value: "associado", name: "Associado" },
      { value: "referencia", name: "Referência" },
      { value: "historico", name: "Histórico" },
      { value: "tipoParcela", name: "Tipo de Parcela" },
      { value: "statusFi", name: "Status FI" },
    ],
    optionsTabela: [{
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
      showPrint: false,
      showExport: true,
      showFooter: true,
      fileName: "perguntadeclaracao",
      additionalButtons: [ 
      ]
    }],
    pathOnClick: "/area-operadora/PerguntasDeclaracao/editar",
  },
  {
    id: jsonRoute.QuestionarioVida,
    filtrosTabela: [
      {label: "Nome", value: "nome", type: "select", options: [ 
      ]},
      {label: "Status", value: "status", type: "select", options: [
        {value: "Ativo", label: "Ativo"},
        {value: "Inativo", label: "Inativo"},
      ]},
    ],
    colunasTabela: [
      { value: "acao", name: "Ação" },
      { value: "pago", name: "Pago" },
      { value: "acaoJudicial", name: "Ação Judicial" },
      { value: "serasa", name: "Serasa" },
      { value: "associado", name: "Associado" },
      { value: "referencia", name: "Referência" },
      { value: "historico", name: "Histórico" },
      { value: "tipoParcela", name: "Tipo de Parcela" },
      { value: "statusFi", name: "Status FI" },
    ],
    optionsTabela: [{
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
      showPrint: false,
      showExport: true,
      showFooter: true,
      fileName: "questionariovida",
      additionalButtons: [ 
      ]
    }],
    pathOnClick: "/area-operadora/QuestionarioVida/editar",
  },
  {
    id: jsonRoute.FuncaoUsuario,
    filtrosTabela: [
      {label: "Nome", value: "nome", type: "select", options: [ 
      ]},
      {label: "Status", value: "status", type: "select", options: [
        {value: "Ativo", label: "Ativo"},
        {value: "Inativo", label: "Inativo"},
      ]},
    ],
    colunasTabela: [
      { value: "descricao", name: "Descrição" },
    ],
    optionsTabela: [{
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
      showPrint: false,
      showExport: true,
      showFooter: true,
      fileName: "funcaoUsuario",
      additionalButtons: [ 
      ]
    }],
    pathOnClick: "/area-operadora/FuncaoUsuario/editar",
  },
]

export const estadosBR = [
  {
    nome: "Acre",
    sigla: "AC",
  },
  {
    nome: "Alagoas",
    sigla: "AL",
  },
  {
    nome: "Amapá",
    sigla: "AP",
  },
  {
    nome: "Amazonas",
    sigla: "AM",
  },
  {
    nome: "Bahia",
    sigla: "BA",
  },
  {
    nome: "Ceará",
    sigla: "CE",
  },
  {
    nome: "Distrito Federal",
    sigla: "DF",
  },
  {
    nome: "Espírito Santo",
    sigla: "ES",
  },
  {
    nome: "Goiás",
    sigla: "GO",
  },
  {
    nome: "Maranhão",
    sigla: "MA",
  },
  {
    nome: "Mato Grosso",
    sigla: "MT",
  },
  {
    nome: "Mato Grosso do Sul",
    sigla: "MS",
  },
  {
    nome: "Minas Gerais",
    sigla: "MG",
  },
  {
    nome: "Pará",
    sigla: "PA",
  },
  {
    nome: "Paraíba",
    sigla: "PB",
  },
  {
    nome: "Paraná",
    sigla: "PR",
  },
  {
    nome: "Pernambuco",
    sigla: "PE",
  },
  {
    nome: "Piauí",
    sigla: "PI",
  },
  {
    nome: "Rio de Janeiro",
    sigla: "RJ",
  },
  {
    nome: "Rio Grande do Norte",
    sigla: "RN",
  },
  {
    nome: "Rio Grande do Sul",
    sigla: "RS",
  },
  {
    nome: "Rondônia",
    sigla: "RO",
  },
  {
    nome: "Roraima",
    sigla: "RR",
  },
  {
    nome: "Santa Catarina",
    sigla: "SC",
  },
  {
    nome: "São Paulo",
    sigla: "SP",
  },
  {
    nome: "Sergipe",
    sigla: "SE",
  },
  {
    nome: "Tocantins",
    sigla: "TO",
  },
];

export const paises = [
  {
    value: "BR",
    nome: "Brasil",
    ddi: "+55",
  },
  {
    value: "AF",
    nome: "Afeganistão",
    ddi: "+93",
  },
  {
    value: "ZA",
    nome: "África do Sul",
    ddi: "+27",
  },
  {
    value: "AL",
    nome: "Albânia",
    ddi: "+355",
  },
  {
    value: "DE",
    nome: "Alemanha",
    ddi: "+49",
  },
  {
    value: "AD",
    nome: "Andorra",
    ddi: "+376",
  },
  {
    value: "AO",
    nome: "Angola",
    ddi: "+244",
  },
  {
    value: "AG",
    nome: "Antígua e Barbuda",
    ddi: "+1",
  },
  {
    value: "SA",
    nome: "Arábia Saudita",
    ddi: "+966",
  },
  {
    value: "DZ",
    nome: "Argélia",
    ddi: "+213",
  },
  {
    value: "AR",
    nome: "Argentina",
    ddi: "+54",
  },
  {
    value: "AM",
    nome: "Armênia",
    ddi: "+374",
  },
  {
    value: "AW",
    nome: "Aruba",
    ddi: "+297",
  },
  {
    value: "AU",
    nome: "Austrália",
    ddi: "+61",
  },
  {
    value: "AT",
    nome: "Áustria",
    ddi: "+43",
  },
  {
    value: "BS",
    nome: "Bahamas",
    ddi: "+1",
  },
  {
    value: "BD",
    nome: "Bangladesh",
    ddi: "+880",
  },
  {
    value: "BB",
    nome: "Barbados",
    ddi: "+1",
  },
  {
    value: "BH",
    nome: "Barein",
    ddi: "+973",
  },
  {
    value: "BY",
    nome: "Belarus",
    ddi: "+375",
  },
  {
    value: "BE",
    nome: "Bélgica",
    ddi: "+32",
  },
  {
    value: "BZ",
    nome: "Belize",
    ddi: "+501",
  },
  {
    value: "BJ",
    nome: "Benim",
    ddi: "+229",
  },
  {
    value: "BO",
    nome: "Bolívia",
    ddi: "+591",
  },
  {
    value: "BA",
    nome: "Bósnia-Herzegóvina",
    ddi: "+387",
  },
  {
    value: "BW",
    nome: "Botsuana",
    ddi: "+267",
  },
  {
    value: "BN",
    nome: "Brunei",
    ddi: "+673",
  },
  {
    value: "BG",
    nome: "Bulgária",
    ddi: "+359",
  },
  {
    value: "BF",
    nome: "Burkina Fasso",
    ddi: "+226",
  },
  {
    value: "BI",
    nome: "Burundi",
    ddi: "+257",
  },
  {
    value: "BT",
    nome: "Butão",
    ddi: "+975",
  },
  {
    value: "CV",
    nome: "Cabo Verde",
    ddi: "+238",
  },
  {
    value: "CM",
    nome: "Camarões",
    ddi: "+237",
  },
  {
    value: "KH",
    nome: "Camboja",
    ddi: "+855",
  },
  {
    value: "CA",
    nome: "Canadá",
    ddi: "+1",
  },
  {
    value: "KZ",
    nome: "Cazaquistão",
    ddi: "+7",
  },
  {
    value: "TD",
    nome: "Chade",
    ddi: "+235",
  },
  {
    value: "CL",
    nome: "Chile",
    ddi: "+56",
  },
  {
    value: "CN",
    nome: "China",
    ddi: "+86",
  },
  {
    value: "CY",
    nome: "Chipre",
    ddi: "+357",
  },
  {
    value: "CO",
    nome: "Colômbia",
    ddi: "+57",
  },
  {
    value: "KM",
    nome: "Comores",
    ddi: "+269",
  },
  {
    value: "CG",
    nome: "Congo",
    ddi: "+242",
  },
  {
    value: "KP",
    nome: "Coréia do Norte",
    ddi: "+850",
  },
  {
    value: "KR",
    nome: "Coréia do Sul",
    ddi: "+82",
  },
  {
    value: "CI",
    nome: "Costa do Marfim",
    ddi: "+225",
  },
  {
    value: "CR",
    nome: "Costa Rica",
    ddi: "+506",
  },
  {
    value: "HR",
    nome: "Croácia",
    ddi: "+385",
  },
  {
    value: "CU",
    nome: "Cuba",
    ddi: "+53",
  },
  {
    value: "DK",
    nome: "Dinamarca",
    ddi: "+45",
  },
  {
    value: "DJ",
    nome: "Djibuti",
    ddi: "+253",
  },
  {
    value: "DM",
    nome: "Dominica",
    ddi: "+1",
  },
  {
    value: "EG",
    nome: "Egito",
    ddi: "+20",
  },
  {
    value: "SV",
    nome: "El Salvador",
    ddi: "+503",
  },
  {
    value: "AE",
    nome: "Emirados Árabes Unidos",
    ddi: "+971",
  },
  {
    value: "EC",
    nome: "Equador",
    ddi: "+593",
  },
  {
    value: "ER",
    nome: "Eritréia",
    ddi: "+291",
  },
  {
    value: "SK",
    nome: "Eslováquia",
    ddi: "+421",
  },
  {
    value: "SI",
    nome: "Eslovênia",
    ddi: "+386",
  },
  {
    value: "ES",
    nome: "Espanha",
    ddi: "+34",
  },
  {
    value: "US",
    nome: "Estados Unidos",
    ddi: "+1",
  },
  {
    value: "EE",
    nome: "Estônia",
    ddi: "+372",
  },
  {
    value: "SZ",
    nome: "Essuatíni",
    ddi: "+268",
  },
  {
    value: "ET",
    nome: "Etiópia",
    ddi: "+251",
  },
  {
    value: "FJ",
    nome: "Fiji",
    ddi: "+679",
  },
  {
    value: "PH",
    nome: "Filipinas",
    ddi: "+63",
  },
  {
    value: "FI",
    nome: "Finlândia",
    ddi: "+358",
  },
  {
    value: "FR",
    nome: "França",
    ddi: "+33",
  },
  {
    value: "GA",
    nome: "Gabão",
    ddi: "+241",
  },
  {
    value: "GM",
    nome: "Gâmbia",
    ddi: "+220",
  },
  {
    value: "GH",
    nome: "Gana",
    ddi: "+233",
  },
  {
    value: "GE",
    nome: "Geórgia",
    ddi: "+995",
  },
  {
    value: "GD",
    nome: "Granada",
    ddi: "+1",
  },
  {
    value: "GR",
    nome: "Grécia",
    ddi: "+30",
  },
  {
    value: "GT",
    nome: "Guatemala",
    ddi: "+502",
  },
  {
    value: "GY",
    nome: "Guiana",
    ddi: "+592",
  },
  {
    value: "GN",
    nome: "Guiné",
    ddi: "+224",
  },
  {
    value: "GW",
    nome: "Guiné-Bissau",
    ddi: "+245",
  },
  {
    value: "GQ",
    nome: "Guiné Equatorial",
    ddi: "+240",
  },
  {
    value: "HT",
    nome: "Haiti",
    ddi: "+509",
  },
  {
    value: "NL",
    nome: "Holanda",
    ddi: "+31",
  },
  {
    value: "HN",
    nome: "Honduras",
    ddi: "+504",
  },
  {
    value: "HU",
    nome: "Hungria",
    ddi: "+36",
  },
  {
    value: "YE",
    nome: "Iêmen",
    ddi: "+967",
  },
  {
    value: "MH",
    nome: "Ilhas Marshall",
    ddi: "+692",
  },
  {
    value: "SB",
    nome: "Ilhas Salomão",
    ddi: "+677",
  },
  {
    value: "IN",
    nome: "Índia",
    ddi: "+91",
  },
  {
    value: "ID",
    nome: "Indonésia",
    ddi: "+62",
  },
  {
    value: "IR",
    nome: "Irã",
    ddi: "+98",
  },
  {
    value: "IQ",
    nome: "Iraque",
    ddi: "+964",
  },
  {
    value: "IE",
    nome: "Irlanda",
    ddi: "+43",
  },
  {
    value: "IS",
    nome: "Islândia",
    ddi: "+354",
  },
  {
    value: "IL",
    nome: "Israel",
    ddi: "+972",
  },
  {
    value: "IT",
    nome: "Itália",
    ddi: "+39",
  },
  {
    value: "JM",
    nome: "Jamaica",
    ddi: "+1",
  },
  {
    value: "JP",
    nome: "Japão",
    ddi: "+81",
  },
  {
    value: "JO",
    nome: "Jordânia",
    ddi: "+962",
  },
  {
    value: "KI",
    nome: "Kiribati",
    ddi: "+686",
  },
  {
    value: "XK",
    nome: "Kosovo",
    ddi: "+383",
  },
  {
    value: "KW",
    nome: "Kuwait",
    ddi: "+965",
  },
  {
    value: "LA",
    nome: "Laos",
    ddi: "+856",
  },
  {
    value: "LS",
    nome: "Lesoto",
    ddi: "+266",
  },
  {
    value: "LV",
    nome: "Letônia",
    ddi: "+371",
  },
  {
    value: "LB",
    nome: "Líbano",
    ddi: "+961",
  },
  {
    value: "LY",
    nome: "Líbia",
    ddi: "+218",
  },
  {
    value: "LR",
    nome: "Libéria",
    ddi: "+231",
  },
  {
    value: "LI",
    nome: "Liechtenstein",
    ddi: "+423",
  },
  {
    value: "LT",
    nome: "Lituânia",
    ddi: "+370",
  },
  {
    value: "LU",
    nome: "Luxemburgo",
    ddi: "+352",
  },
  {
    value: "MK",
    nome: "Macedônia do Norte",
    ddi: "+389",
  },
  {
    value: "MG",
    nome: "Madagascar",
    ddi: "+261",
  },
  {
    value: "MY",
    nome: "Malásia",
    ddi: "+60",
  },
  {
    value: "MW",
    nome: "Malaui",
    ddi: "+265",
  },
  {
    value: "MV",
    nome: "Maldivas",
    ddi: "+960",
  },
  {
    value: "ML",
    nome: "Mali",
    ddi: "+223",
  },
  {
    value: "MT",
    nome: "Malta",
    ddi: "+356",
  },
  {
    value: "MA",
    nome: "Marrocos",
    ddi: "+43",
  },
  {
    value: "MU",
    nome: "Maurício",
    ddi: "+230",
  },
  {
    value: "MR",
    nome: "Mauritânia",
    ddi: "+222",
  },
  {
    value: "MX",
    nome: "México",
    ddi: "+52",
  },
  {
    value: "MM",
    nome: "Mianmar",
    ddi: "+95",
  },
  {
    value: "FM",
    nome: "Micronésia",
    ddi: "+691",
  },
  {
    value: "MZ",
    nome: "Moçambique",
    ddi: "+258",
  },
  {
    value: "MD",
    nome: "Moldávia",
    ddi: "+373",
  },
  {
    value: "MC",
    nome: "Mônaco",
    ddi: "+377",
  },
  {
    value: "MN",
    nome: "Mongólia",
    ddi: "+976",
  },
  {
    value: "ME",
    nome: "Montenegro",
    ddi: "+382",
  },
  {
    value: "NA",
    nome: "Namíbia",
    ddi: "+264",
  },
  {
    value: "NR",
    nome: "Nauru",
    ddi: "+674",
  },
  {
    value: "NP",
    nome: "Nepal",
    ddi: "+977",
  },
  {
    value: "NI",
    nome: "Nicarágua",
    ddi: "+505",
  },
  {
    value: "NE",
    nome: "Níger",
    ddi: "+227",
  },
  {
    value: "NG",
    nome: "Nigéria",
    ddi: "+234",
  },
  {
    value: "NO",
    nome: "Noruega",
    ddi: "+47",
  },
  {
    value: "NZ",
    nome: "Nova Zelândia",
    ddi: "+64",
  },
  {
    value: "OM",
    nome: "Omã",
    ddi: "+968",
  },
  {
    value: "PW",
    nome: "Palau",
    ddi: "+680",
  },
  {
    value: "PG",
    nome: "Papua-Nova Guiné",
    ddi: "+675",
  },
  {
    value: "PK",
    nome: "Paquistão",
    ddi: "+92",
  },
  {
    value: "PY",
    nome: "Paraguai",
    ddi: "+595",
  },
  {
    value: "PE",
    nome: "Peru",
    ddi: "+51",
  },
  {
    value: "PL",
    nome: "Polônia",
    ddi: "+48",
  },
  {
    value: "PT",
    nome: "Portugal",
    ddi: "+351",
  },
  {
    value: "QA",
    nome: "Qatar",
    ddi: "+974",
  },
  {
    value: "KE",
    nome: "Quênia",
    ddi: "+254",
  },
  {
    value: "KG",
    nome: "Quirguistão",
    ddi: "+996",
  },
  {
    value: "UK",
    nome: "Reino Unido",
    ddi: "+44",
  },
  {
    value: "CF",
    nome: "República Centro-Africana",
    ddi: "+236",
  },
  {
    value: "CD",
    nome: "República Democrática do Congo",
    ddi: "+243",
  },
  {
    value: "DO",
    nome: "República Dominicana",
    ddi: "+1",
  },
  {
    value: "CZ",
    nome: "República Tcheca",
    ddi: "+420",
  },
  {
    value: "RO",
    nome: "Romênia",
    ddi: "+40",
  },
  {
    value: "RW",
    nome: "Ruanda",
    ddi: "+250",
  },
  {
    value: "RU",
    nome: "Rússia",
    ddi: "+7",
  },
  {
    value: "WS",
    nome: "Samoa",
    ddi: "+685",
  },
  {
    value: "SM",
    nome: "San Marino",
    ddi: "+378",
  },
  {
    value: "LC",
    nome: "Santa Lúcia",
    ddi: "+1",
  },
  {
    value: "KN",
    nome: "São Cristóvão e Névis",
    ddi: "+1",
  },
  {
    value: "ST",
    nome: "São Tomé e Príncipe",
    ddi: "+239",
  },
  {
    value: "VC",
    nome: "São Vicente e Granadinas",
    ddi: "+1",
  },
  {
    value: "SC",
    nome: "Seicheles",
    ddi: "+248",
  },
  {
    value: "SN",
    nome: "Senegal",
    ddi: "+221",
  },
  {
    value: "SL",
    nome: "Serra Leoa",
    ddi: "+232",
  },
  {
    value: "RS",
    nome: "Sérvia",
    ddi: "+381",
  },
  {
    value: "SG",
    nome: "Singapura",
    ddi: "+65",
  },
  {
    value: "SY",
    nome: "Síria",
    ddi: "+963",
  },
  {
    value: "SO",
    nome: "Somália",
    ddi: "+252",
  },
  {
    value: "LK",
    nome: "Sri Lanka",
    ddi: "+94",
  },
  {
    value: "SD",
    nome: "Sudão",
    ddi: "+249",
  },
  {
    value: "SS",
    nome: "Sudão do Sul",
    ddi: "+211",
  },
  {
    value: "SE",
    nome: "Suécia",
    ddi: "+46",
  },
  {
    value: "CH",
    nome: "Suíça",
    ddi: "+41",
  },
  {
    value: "SR",
    nome: "Suriname",
    ddi: "+597",
  },
  {
    value: "TJ",
    nome: "Tadjiquistão",
    ddi: "+992",
  },
  {
    value: "TH",
    nome: "Tailândia",
    ddi: "+66",
  },
  {
    value: "TZ",
    nome: "Tanzânia",
    ddi: "+255",
  },
  {
    value: "TL",
    nome: "Timor-Leste",
    ddi: "+670",
  },
  {
    value: "TG",
    nome: "Togo",
    ddi: "+228",
  },
  {
    value: "TO",
    nome: "Tonga",
    ddi: "+676",
  },
  {
    value: "TT",
    nome: "Trinidad e Tobago",
    ddi: "+1",
  },
  {
    value: "TN",
    nome: "Tunísia",
    ddi: "+216",
  },
  {
    value: "TM",
    nome: "Turcomenistão",
    ddi: "+993",
  },
  {
    value: "TR",
    nome: "Turquia",
    ddi: "+90",
  },
  {
    value: "TV",
    nome: "Tuvalu",
    ddi: "+688",
  },
  {
    value: "UA",
    nome: "Ucrânia",
    ddi: "+380",
  },
  {
    value: "UG",
    nome: "Uganda",
    ddi: "+256",
  },
  {
    value: "UY",
    nome: "Uruguai",
    ddi: "+598",
  },
  {
    value: "UZ",
    nome: "Uzbequistão",
    ddi: "+998",
  },
  {
    value: "VU",
    nome: "Vanuatu",
    ddi: "+678",
  },
  {
    value: "VE",
    nome: "Venezuela",
    ddi: "+58",
  },
  {
    value: "VN",
    nome: "Vietnã",
    ddi: "+84",
  },
  {
    value: "ZM",
    nome: "Zâmbia",
    ddi: "+260",
  },
  {
    value: "ZW",
    nome: "Zimbábue",
    ddi: "+263",
  },
];

export const Empresarial_Relatorios_Json = [
  {
    id: 101,
    view_relatorio: "clientes",
    nome_relatorio: "Clientes",
    columns: [
      { value: "contrato", name: "Contrato" },
      { value: "plano", name: "Plano", cellStyle: { whiteSpace: "nowrap" } },
      {
        value: "cpfcnpj",
        name: "CPF / CNPJ",
        cellStyle: { whiteSpace: "nowrap" },
      },
      { value: "tipo_benef", name: "Beneficiário" },
      { value: "carteirinha", name: "Carteirinha" },
      { value: "nome", name: "Nome", cellStyle: { whiteSpace: "nowrap" } },
      { value: "email", name: "Email" },
      {
        value: "celular",
        name: "Celular",
        cellStyle: { whiteSpace: "nowrap" },
      },
      { value: "status", name: "Status" },
      { value: "dtnascimento", name: "Data nascimento" },
      { value: "dtadesao", name: "Data de Adesão" },
    ],
    options: {
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
    },
    filtros: [
      { value: "nome", name: "Nome" },
      { value: "cpfcnpj", name: "CPF / CNPJ" },
      { value: "contrato", name: "Contrato" },
      { value: "dtadesao_inicio", name: "Data de Adesão - Inicial" },
      { value: "dtadesao_fim", name: "Data de Adesão - Final" },
      {
        value: "status",
        name: "Status",
        select: "status",
        options: [
          { value: "ativo", label: "Ativo" },
          { value: "inativo", label: "Inativo" },
          { value: "deletado", label: "Deletado" },
        ],
      },
    ],
  },
  {
    id: 102,
    view_relatorio: "movimentacoes",
    nome_relatorio: "Movimentações",
    columns: [
      { value: "especialidade", name: "Especialidade" },
      { value: "nome_estab", name: "Estabelecimento" },
      { value: "beneficiario", name: "Beneficiário" },
      { value: "dtsolicitacao", name: "Data Solicitação" },
      { value: "dtpagto", name: "Data Pagamento" },
      { value: "dtagendamento", name: "Data Agendamento" },
      { value: "dtexecucao", name: "Data Execução" },
      { value: "descr_status_andamento", name: "Status" },
      { value: "valor", name: "Valor" },
      { value: "descr_forma_pagto", name: "Forma Pagamento" },
      { value: "descr_status_pagto", name: "Status Pagamento" },
    ],
    options: {
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
    },
    filtros: [
      { value: "dtsolicitacao_inicio", name: "Data de Solicitação - Inicial" },
      { value: "dtsolicitacao_fim", name: "Data de Solicitação - Final" },
    ],
  },
];
