export const dadosMockados = [
  {
    id: 1,
    acao: "Cobrança enviada",
    pago: "Sim",
    acaoJudicial: "Não",
    serasa: "Sim",
    associado: "João Silva",
    referencia: "2025-07",
    historico: "Parcela quitada",
    tipoParcela: "Mensalidade",
    statusFi: "Ativo",
  },
  {
    id: 2,
    acao: "Cobrança não paga",
    pago: "Não",
    acaoJudicial: "Sim",
    serasa: "Não",
    associado: "Maria Oliveira",
    referencia: "2025-06",
    historico: "Em negociação",
    tipoParcela: "Trimestral",
    statusFi: "Inativo",
  },
  {
    id: 3,
    acao: "Negociação iniciada",
    pago: "Não",
    acaoJudicial: "Não",
    serasa: "Sim",
    associado: "Carlos Souza",
    referencia: "2025-05",
    historico: "Sem contato",
    tipoParcela: "Anuidade",
    statusFi: "Ativo",
  },
  {
    id: 4,
    acao: "Desconto aplicado",
    pago: "Sim",
    acaoJudicial: "Não",
    serasa: "Não",
    associado: "Ana Paula",
    referencia: "2025-04",
    historico: "Parcela renegociada",
    tipoParcela: "Mensalidade",
    statusFi: "Ativo",
  }
];

export const configuracoesForms = {
  Geral: {
    nome: "Formulários Geral",
    colunasTabela: [
      { value: "id", name: "Id", visible: false },
      { value: "associado", name: "Titulo", cellStyle: { textAlign: "left" }, headerStyle: { width: "35%"} },
      { value: "titleForms", name: "Formulário" },
      { value: "formulario", name: "Formulário", visible: false }
    ],
    tabela: [
      { id: "1", associado: "Hino do Corinthians", titleForms: "Formulario Generico", formulario: "<p>Salve o Corinthians o campeão dos campeões Salve o Corinthians. </p><br /><p>O campeão dos campeões, Eternamente dentro dos nossos corações.</p><br /> Salve o Corinthians de tradições e glórias mil. Tu és orgulhoDos esportistas do Brasil. Teu passado é uma bandeira,Teu presente, uma lição. Figuras entre os primeiros. Do nosso esporte bretão. Corinthians grande Sempre Altaneiro, És do Brasil O clube mais brasileiro. Salve o Corinthians, O campeão dos campeões, Eternamente dentro dos nossos corações. Salve o Corinthians de tradições e glórias mil. Tu és orgulho Dos esportistas do Brasil Salve o Corinthians, O campeão dos campeões, Eternamente dentro dos nossos corações. Salve o Corinthians de tradições e glórias mil Tu és orgulho Dos esportistas do Brasil" },
      { id: "2", associado: "Maria Oliveira", titleForms: "Formulario Generico", formulario: "Texto genérico para Maria Oliveira." },
      { id: "3", associado: "Carlos Souza", titleForms: "Formulario Generico", formulario: "Texto genérico para Carlos Souza." }
    ],
    optionsTabela: {
      showPaginationSwitch: true,
      showToggleView: true,
      showColumnsSelector: true,
      showExport: true
    }
  }
};

export const MensagemForm = {
    Mensagens: {
        nome: "Mensagens",
        colunasTabela: {
            email: [
                { value: "id", name: "Id", visible: false },
                { value: "assunto", name: "Assunto", cellStyle: { textAlign: "left" }, headerStyle: { width: "35%" } },
                { value: "mensagem", name: "Mensagem" },
                { value: "destinatario", name: "Destinatário" },
            ],
            sms: [
                { value: "id", name: "Id", visible: false },
                { value: "destinatario", name: "Destinatário", cellStyle: { textAlign: "left" }, headerStyle: { width: "35%" } },
                { value: "mensagem", name: "Mensagem" },
                { value: "status", name: "Status" },
            ],
            whatsapp: [
                { value: "id", name: "Id", visible: false },
                { value: "destinatario", name: "Destinatário", cellStyle: { textAlign: "left" }, headerStyle: { width: "35%" } },
                { value: "mensagem", name: "Mensagem" },
                { value: "status", name: "Status" },
            ],
        },
        tabela: [
            { id: "1", tipo: "email", assunto: "Confirmação de Pagamento", mensagem: "Olá, seu pagamento foi confirmado.", destinatario: "joao@email.com", status: "Enviado" },
            { id: "2", tipo: "sms", destinatario: "(11) 98888-7777", mensagem: "Seu código de verificação é 123456.", status: "Enviado" },
            { id: "3", tipo: "whatsapp", destinatario: "(11) 99999-0000", mensagem: "Obrigado por se cadastrar!", status: "Entregue" },
            { id: "4", tipo: "email", assunto: "Lembrete de Agendamento", mensagem: "Lembrete: sua consulta é amanhã.", destinatario: "maria@email.com", status: "Enviado" },
            { id: "5", tipo: "sms", destinatario: "(11) 97777-6666", mensagem: "Sua fatura está disponível no app.", status: "Erro" },
            { id: "6", tipo: "whatsapp", destinatario: "(11) 96666-5555", mensagem: "Promoção especial para você!", status: "Lida" },
        ],
        optionsTabela: {
            showPaginationSwitch: true,
            showToggleView: true,
            showColumnsSelector: true,
            showExport: true
        }
    }
};

export const DepartamentoForm = {
    Departamento: {
        nome: "Departamento",
        colunasTabela: {
            Descrição: [
                { value: "id", name: "Id", visible: false },
                { value: "descricao", name: "Descrição", cellStyle: { textAlign: "left" }, headerStyle: { width: "100%" } },
            ],
        },
        tabela: [
            { id: "1", descricao: "FINANCEIRO" },
            { id: "2", descricao: "PROD" },
            { id: "3", descricao: "SCCP" },
            { id: "4", descricao: "BDA" },
            { id: "5", descricao: "ADM"  },
            { id: "6", descricao: "SUP" },
        ],
        optionsTabela: {
            showPaginationSwitch: true,
            showToggleView: true,
            showColumnsSelector: true,
            showExport: true
        }
    }
};

export const Descript = {
    Descricao: {
      nome: "Descrição",
      colunasTabela: {
        Descrição: [
        { value: "id", name: "id", visible: false },
        { value: "descricao", name: "Descrição", cellStyle: { textAlign: "left" }, headerStyle: { width: "100%" } },
        ],
      },
      tabela: [
          { id: "1", descricao: "PoliC", departamento: "ADM", },
          { id: "2", descricao: "Medic", departamento: "ADM" },
          { id: "3", descricao: "Cori", departamento: "SCCP" },
          { id: "4", descricao: "Odont", departamento: "MED" },
          { id: "5", descricao: "Intern", departamento: "PROD"  },
          { id: "6", descricao: "Abraham", departamento: "POO" },
      ],
      optionsTabela: {
            showPaginationSwitch: true,
            showToggleView: true,
            showColumnsSelector: true,
            showExport: true
        }
    }
}
// Perguntas Declaracao
export const PerguntaMock = {
    PerguntasDaDeclaracao: {
        tabela: [
            {
                id: 1,
                titulo: '',
                declaracao: 'DECLARACAO DE SAUDE',
                quemVisualiza: 'TODOS',
                pergunta: 'Doenças de pele (psoríase, dermatite, alergias, entre outras)?',
                ordemAparecimento: 19,
                status: 'ATIVO'
            },
            {
                id: 2,
                titulo: '',
                declaracao: 'DECLARACAO DE SAUDE',
                quemVisualiza: 'TODOS',
                pergunta: 'Doenças infectocontagiosas (hepatites A, B, C, D ou E, tuberculose, entre outras)?',
                ordemAparecimento: 20,
                status: 'ATIVO'
            },
            {
                id: 3,
                titulo: '',
                declaracao: 'DECLARACAO DE SAUDE',
                quemVisualiza: 'TODOS',
                pergunta: 'Alguma doença ou lesão não mencionada acima?',
                ordemAparecimento: 23,
                status: 'INATIVO'
            },
            {
                id: 4,
                titulo: 'SAUDE - FAMILIAR',
                declaracao: 'DECLARACAO DE SAUDE',
                quemVisualiza: 'TODOS',
                pergunta: 'Alguma internação?',
                ordemAparecimento: 24,
                status: 'ATIVO'
            },
        ],
       colunasTabela: {
            Descrição: [
                { value: 'titulo', name: 'Titulo da Pergunta' },
                { value: 'declaracao', name: 'Declaração Pertencente' },
                { value: 'quemVisualiza', name: 'Quem Visualiza' },
                { value: 'pergunta', name: 'Pergunta' },
                { value: 'ordemAparecimento', name: 'Ordem de Aparecimento' },
                { value: 'status', name: 'Status' }
            ]
        },

        optionsTabela: {
            showPaginationSwitch: true,
            showToggleView: true,
            showColumnsSelector: true,
            showExport: true,
        }
    }
};

export const StatusMock = {
    "Status": {
        "tabela": [
            {
                "id": 1,
                "descricao": "ATIVO",
                "tipo": "ATIVO",
                "cor": "ATIVO",
                "padrao": "SIM",
                "inativarCallCenter": "NÃO",
                "desabilitarTela": "NÃO",
                "visualizaInadimplentePropostaContrato": "SIM",
                "visualizaInadimplenteFI": "SIM",
                "congelamentoP": "NÃO",
                "mudarStatusAtivo": "SIM"
            },
            {
                "id": 2,
                "descricao": "CANCELADO",
                "tipo": "INATIVO",
                "cor": "INATIVO",
                "padrao": "NÃO",
                "inativarCallCenter": "NÃO",
                "desabilitarTela": "NÃO",
                "visualizaInadimplentePropostaContrato": "NÃO",
                "visualizaInadimplenteFI": "NÃO",
                "congelamentoP": "NÃO",
                "mudarStatusAtivo": "NÃO"
            },
            {
                "id": 3,
                "descricao": "EM ANÁLISE PELA OPERADORA",
                "tipo": "ATIVO",
                "cor": "ATIVO",
                "padrao": "NÃO",
                "inativarCallCenter": "NÃO",
                "desabilitarTela": "NÃO",
                "visualizaInadimplentePropostaContrato": "SIM",
                "visualizaInadimplenteFI": "SIM",
                "congelamentoP": "NÃO",
                "mudarStatusAtivo": "SIM"
            },
            {
                "id": 4,
                "descricao": "INADIMPLENTE IBBC",
                "tipo": "ATIVO",
                "cor": "INATIVO",
                "padrao": "NÃO",
                "inativarCallCenter": "SIM",
                "desabilitarTela": "SIM",
                "visualizaInadimplentePropostaContrato": "SIM",
                "visualizaInadimplenteFI": "SIM",
                "congelamentoP": "SIM",
                "mudarStatusAtivo": "NÃO"
            }
        ],
        "colunasTabela": {
            "Descrição": [
                { value: "descricao", name: "Descrição" },
                { value: "tipo", name: "Tipo" },
                { value: "cor", name: "Cor" },
                { value: "padrao", name: "Padrão" },
                { value: "inativarCallCenter", name: "Inativar no CallCenter" },
                { value: "desabilitarTela", name: "Desabilitar Tela" },
                { value: "visualizaInadimplentePropostaContrato", name: "Visualiza na tela de Inadimplente - Status Proposta/Contrato" },
                { value: "visualizaInadimplenteFI", name: "Visualiza na tela de Inadimplente - Status FI" },
                { value: "congelamentoP", name: "Congelamento P - Status e Tela" },
                { value: "mudarStatusAtivo", name: "Mudar Status da proposta para Ativo" }
            ]
        },
        "optionsTabela": {
            "showPaginationSwitch": true,
            "showToggleView": true,
            "showColumnsSelector": true,
            "showExport": true,
        }
    }
};