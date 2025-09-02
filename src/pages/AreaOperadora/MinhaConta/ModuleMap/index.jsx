import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../utils/json';

const ModuleMap = ({ module, onBack }) => {
  const navigate = useNavigate();

  const moduleMaps = {
    financeiro: {
      title: 'Mapa de Rotas Financeiro',
      subtitle: 'Gerencie todas as operações financeiras do sistema',
      sections: [
        {
          id: 'tesouraria',
          nome: 'Tesouraria',
          descricao: 'Gestão de fluxo de caixa, contas a receber e pagar',
          icon: 'fa-solid fa-calculator',
          cor: '#4CAF50',
          subsecoes: [
            { nome: 'Fluxo de Caixa', rota: jsonRoute.FluxoCaixa, icon: 'fa-solid fa-chart-line' },
            { nome: 'Contas a Receber', rota: jsonRoute.ContasAReceber, icon: 'fa-solid fa-hand-holding-dollar' },
            { nome: 'Contas a Pagar', rota: jsonRoute.ContasAPagar, icon: 'fa-solid fa-money-bill-transfer' },
            { nome: 'Comissão', rota: jsonRoute.Comissao, icon: 'fa-solid fa-percentage' },
            { nome: 'DRE', rota: jsonRoute.DRE, icon: 'fa-solid fa-chart-pie' },
            { nome: 'Fechamento', rota: `${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Fechamento}`, icon: 'fa-solid fa-lock' },
            { nome: 'Abertura', rota: `${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Abertura}`, icon: 'fa-solid fa-unlock' }
          ]
        },
        {
          id: 'banco',
          nome: 'Banco',
          descricao: 'Gestão de arquivos de remessa e retorno bancário',
          icon: 'fa-solid fa-university',
          cor: '#2196F3',
          subsecoes: [
            { nome: 'Arquivo Remessa', rota: jsonRoute.ArquivoRemessa, icon: 'fa-solid fa-file-export' },
            { nome: 'Arquivo Retorno', rota: jsonRoute.ArquivoRetorno, icon: 'fa-solid fa-file-import' },
            { nome: 'Remessa Banco Digital', rota: jsonRoute.RemessaBancoDigital, icon: 'fa-solid fa-digital-tachograph' }
          ]
        },
        {
          id: 'servicos',
          nome: 'Serviços',
          descricao: 'Gestão de contratos e alterações de vencimento',
          icon: 'fa-solid fa-cogs',
          cor: '#FF9800',
          subsecoes: [
            { nome: 'Contrato', rota: jsonRoute.Contrato, icon: 'fa-solid fa-file-contract' },
            { nome: 'Alteração de Vencimento', rota: jsonRoute.AlteracaoVencimento, icon: 'fa-solid fa-calendar-alt' }
          ]
        },
        {
          id: 'lancamento',
          nome: 'Lançamento',
          descricao: 'Gestão de lançamentos financeiros',
          icon: 'fa-solid fa-plus-circle',
          cor: '#9C27B0',
          subsecoes: []
        },
        {
          id: 'cobranca',
          nome: 'Cobrança',
          descricao: 'Gestão de cobranças e inadimplência',
          icon: 'fa-solid fa-credit-card',
          cor: '#F44336',
          subsecoes: []
        },
        {
          id: 'logAuditoria',
          nome: 'Log Auditoria',
          descricao: 'Histórico de auditoria financeira',
          icon: 'fa-solid fa-history',
          cor: '#607D8B',
          subsecoes: []
        }
      ]
    },
    operacional: {
      title: 'Mapa de Rotas Operacional',
      subtitle: 'Gerencie todas as operações do sistema',
      sections: [
        {
          id: 'cadastroPlanos',
          nome: 'Plano/Serviço',
          descricao: 'Gestão de planos e serviços oferecidos',
          icon: 'fa-solid fa-clipboard-list',
          cor: '#4CAF50',
          subsecoes: []
        },
        {
          id: 'cadastroRepresentante',
          nome: 'Representante',
          descricao: 'Gestão de representantees de serviço',
          icon: 'fa-solid fa-user-md',
          cor: '#FF9800',
          subsecoes: []
        },
        {
          id: 'cadastroBeneficiarios',
          nome: 'Beneficiário',
          descricao: 'Gestão de beneficiários e clientes',
          icon: 'fa-solid fa-users',
          cor: '#2196F3',
          subsecoes: []
        },
        {
          id: 'cadastroCliente',
          nome: 'Cliente',
          descricao: 'Gestão de clientes',
          icon: 'fa-solid fa-user-plus',
          cor: '#E91E63',
          subsecoes: []
        },
        {
          id: 'movimentacoes',
          nome: 'Movimentações do Beneficiário',
          descricao: 'Gestão de movimentações e transferências',
          icon: 'fa-solid fa-exchange-alt',
          cor: '#9C27B0',
          subsecoes: []
        },
        {
          id: 'kanban',
          nome: 'KanBan',
          descricao: 'Gestão de tarefas e fluxo de trabalho',
          icon: 'fa-solid fa-columns',
          cor: '#00BCD4',
          subsecoes: []
        }
      ]
    },
    seguranca: {
      title: 'Mapa de Rotas Segurança',
      subtitle: 'Gerencie todas as configurações de segurança do sistema',
      sections: [
        {
          id: 'usuario',
          nome: 'Usuários',
          descricao: 'Gestão de usuários do sistema',
          icon: 'fa-solid fa-users',
          cor: '#4CAF50',
          subsecoes: []
        },
        {
          id: 'permissoes',
          nome: 'Permissões',
          descricao: 'Gerenciar permissões de áreas, telas e ações',
          icon: 'fa-solid fa-lock',
          cor: '#2563EB',
          subsecoes: []
        },
        {
          id: 'permissaoRelatorios',
          nome: 'Permissão Relatório',
          descricao: 'Gestão de permissões para relatórios',
          icon: 'fa-solid fa-chart-bar',
          cor: '#FF9800',
          subsecoes: []
        }
      ]
    },
    configuracoes: {
      title: 'Mapa de Rotas Configurações',
      subtitle: 'Gerencie todas as configurações do sistema',
      sections: [
        /*{
          id: 'agendador',
          nome: 'Agendador de Tarefas',
          descricao: 'Configuração de tarefas automatizadas do sistema',
          icon: 'fa-solid fa-clock',
          cor: '#4CAF50',
          subsecoes: [
            { nome: 'Financeiro', rota: jsonRoute.AgendadorFinanceiro, icon: 'fa-solid fa-dollar-sign' },
            { nome: 'Associado', rota: jsonRoute.AgendadorAssociado, icon: 'fa-solid fa-users' },
            { nome: 'Proposta', rota: jsonRoute.AgendadorProposta, icon: 'fa-solid fa-file-contract' },
            { nome: 'Mudar Status', rota: jsonRoute.AgendadorMudarStatus, icon: 'fa-solid fa-exchange-alt' },
            { nome: 'Andamento da Proposta', rota: jsonRoute.AndamentoProposta, icon: 'fa-solid fa-chart-line' },
            { nome: 'Representante', rota: jsonRoute.AgendadorRepresentante, icon: 'fa-solid fa-user-tie' },
            { nome: 'Plataforma CRM', rota: jsonRoute.AgendadorPlataforma, icon: 'fa-solid fa-desktop' }
          ]
        },*/
        { 
          id: "manutencao",
          nome: "Manutenção",
          descricao: "Gestão de manutenção",
          icon: 'fa-solid fa-computer-classic',
          cor: '#4CAF50',
          subsecoes: [
            { nome: "Contratante", rota: jsonRoute.Contratante, icon:'fa-solid fa-dollar-sign'},
            { nome: "Segurado", rota: jsonRoute.Segurado, icon: 'fa-solid fa-dollar-sign'},
            { nome: "Dependente", rota: jsonRoute.Depedente, icon: 'fa-solid fa-dollar-sign' },
            { nome: "Representante", rota: jsonRoute.Representante, icon: 'fa-solid fa-dollar-sign'},
            { nome: "Funcionário", rota: jsonRoute.Funcionario, icon: 'fa-solid fa-dollar-sign'},
            { nome: "Fornecedor", rota: jsonRoute.Fornecedor, icon: 'fa-solid fa-dollar-sign'},
            { nome: "Entidade/Empresa", rota: jsonRoute.Entidade, icon: 'fa-solid fa-dollar-sign'},
           /* { nome: "Produto/Serviço", rota: jsonRoute.ProdutoServico, icon: }, //ate segunda ordem manter escondido */
            { nome: "Plano de Saúde", rota: jsonRoute.PlanoSaude, icon: 'fa-solid fa-dollar-sign'},
            { nome: "Operadora", rota: jsonRoute.Operadora, icon: 'fa-solid fa-dollar-sign'},
            { nome: "Atualização de Preço em Lote", rota: jsonRoute.AtualizacaoPrecoLote, icon: 'fa-solid fa-dollar-sign'},
            { nome: "Vicgência e Transmissão em Lote", rota: jsonRoute.VigenciaTransmissao, icon: 'fa-solid fa-dollar-sign'},
          ]
        },
        {
          id: 'especialidades',
          nome: 'Especialidades',
          descricao: 'Gestão de especialidades médicas e representantees',
          icon: 'fa-solid fa-stethoscope',
          cor: '#2196F3',
          subsecoes: []
        },
        {
          id: 'mensagens',
          nome: 'Mensagens',
          descricao: 'Configuração de mensagens e ferramentas',
          icon: 'fa-solid fa-comments',
          cor: '#FF9800',
          subsecoes: []
        },
        {
          id: 'notificacao',
          nome: 'Notificação',
          descricao: 'Configuração de notificações do sistema',
          icon: 'fa-solid fa-bell',
          cor: '#9C27B0',
          subsecoes: []
        },
        {
          id: 'status',
          nome: 'Status',
          descricao: 'Gestão de status e estados do sistema',
          icon: 'fa-solid fa-toggle-on',
          cor: '#F44336',
          subsecoes: []
        },
        {
          id: 'perguntas-declaracao',
          nome: 'Perguntas da Declaração',
          descricao: 'Configuração de perguntas e declarações',
          icon: 'fa-solid fa-question-circle',
          cor: '#607D8B',
          subsecoes: []
        },
        {
          id: 'questionario-de-vida',
          nome: 'Questionário de Vida',
          descricao: 'Configuração de questionários de saúde',
          icon: 'fa-solid fa-clipboard-list',
          cor: '#795548',
          subsecoes: []
        },
        {
          id: 'formulario',
          nome: 'Formulário',
          descricao: 'Gestão de formulários do sistema',
          icon: 'fa-solid fa-file-alt',
          cor: '#E91E63',
          subsecoes: []
        },
        {
          id: 'funcao-usuario',
          nome: 'Funções de Usuário',
          descricao: 'Configuração de funções e permissões',
          icon: 'fa-solid fa-user-cog',
          cor: '#00BCD4',
          subsecoes: []
        }
      ]
    }
  };

  const currentModule = moduleMaps[module];

  if (!currentModule) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack}>
            <i className="fas fa-arrow-left" />
            <span>Voltar</span>
          </button>
          <h2 className={styles.title}>Módulo não encontrado</h2>
        </div>
      </div>
    );
  }

  const construirRota = (secao, subsecao = null) => {
    let rotaCompleta;

    if (module === 'financeiro') {
      if (subsecao) {
        if (subsecao.rota.includes('/')) {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Financeiro}/${subsecao.rota}`;
        } else {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Financeiro}/${secao.id}/${subsecao.rota}`;
        }
      } else {
        if (secao.subsecoes.length > 0) {
          const primeiraSubsecao = secao.subsecoes[0];
          return construirRota(secao, primeiraSubsecao);
        } else {
          if (secao.id === 'logAuditoria') {
            rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Financeiro}/${jsonRoute.LogAuditoria}`;
          } else {
            rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Financeiro}/${secao.id}`;
          }
        }
      }
    } else if (module === 'operacional') {
      if (subsecao) {
        if (subsecao.rota.includes('/')) {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${subsecao.rota}`;
        } else {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${secao.id}/${subsecao.rota}`;
        }
      } else {
        if (secao.subsecoes.length > 0) {
          const primeiraSubsecao = secao.subsecoes[0];
          return construirRota(secao, primeiraSubsecao);
        } else {
          const rotasOperacional = {
            'cadastroPlanos': jsonRoute.CadastroPlanos,
            'cadastroRepresentante': jsonRoute.CadastroRepresentante,
            'cadastroBeneficiarios': jsonRoute.CadastroBeneficiarios,
            'cadastroCliente': jsonRoute.CadastroCliente,
            'movimentacoes': jsonRoute.Movimentacoes,
            'kanban': jsonRoute.Kanban
          };
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${rotasOperacional[secao.id]}`;
        }
      }
    } else if (module === 'seguranca') {
      if (subsecao) {
        if (subsecao.rota.includes('/')) {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${subsecao.rota}`;
        } else {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${secao.id}/${subsecao.rota}`;
        }
      } else {
        if (secao.subsecoes.length > 0) {
          const primeiraSubsecao = secao.subsecoes[0];
          return construirRota(secao, primeiraSubsecao);
        } else {
          if (secao.id === 'usuario') {
            rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${jsonRoute.SegurancaUsuario}`;
          } else {
            const rotasSeguranca = {
              'permissoes': jsonRoute.PermissaoInformacoes,
              'permissaoRelatorios': jsonRoute.PermissaoRelatorios
            };
            rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}/${rotasSeguranca[secao.id] || secao.id}`;
          }
        }
      }
    } else if (module === 'configuracoes') {
      if (subsecao) {
        if (subsecao.rota.includes('/')) {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${subsecao.rota}`;
        } else {
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${secao.id}/${subsecao.rota}`;
        }
      } else {
        if (secao.subsecoes.length > 0) {
          const primeiraSubsecao = secao.subsecoes[0];
          return construirRota(secao, primeiraSubsecao);
        } else {
          const rotasConfiguracoes = {
            'especialidades': jsonRoute.Especialidades,
            'mensagens': jsonRoute.MensagensFerramenta,
            'notificacao': jsonRoute.Notificacao,
            'status': jsonRoute.Status,
            'perguntas-declaracao': jsonRoute.PerguntasDeclaracao,
            'questionario-de-vida': jsonRoute.QuestionarioVida,
            'formulario': jsonRoute.Formulario,
            'funcao-usuario': jsonRoute.FuncaoUsuario
          };
          rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${rotasConfiguracoes[secao.id] || secao.id}`;
        }
      }
    }

    return rotaCompleta;
  };

  const handleSecaoClick = (secao) => {
    sessionStorage.setItem('fromModuleMap', 'true');
    
    const rotaCompleta = construirRota(secao);
    navigate(rotaCompleta);
  };

  const handleSubsecaoClick = (secao, subsecao) => {
    sessionStorage.setItem('fromModuleMap', 'true');
    
    const rotaCompleta = construirRota(secao, subsecao);
    navigate(rotaCompleta);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <i className="fas fa-arrow-left" />
          <span>Voltar</span>
        </button>
        <h2 className={styles.title}>
          <i className="fa-solid fa-map"></i>
          {currentModule.title}
        </h2>
        <p className={styles.subtitle}>
          <i className="fa-solid fa-info-circle"></i>
          {currentModule.subtitle}
        </p>
      </div>

      <div className={styles.sectionsGrid}>
        {currentModule.sections.map((secao) => (
          <div key={secao.id} className={styles.secaoCard}>
            <div 
              className={styles.secaoHeader}
              style={{ borderLeftColor: secao.cor }}
              onClick={() => handleSecaoClick(secao)}
            >
              <div className={styles.secaoIcon} style={{ color: secao.cor }}>
                <i className={secao.icon} />
              </div>
              <div className={styles.secaoInfo}>
                <h3 className={styles.secaoNome}>{secao.nome}</h3>
                <p className={styles.secaoDescricao}>{secao.descricao}</p>
              </div>
              <div className={styles.secaoArrow}>
                <i className="fa-solid fa-chevron-right" />
              </div>
            </div>

            {secao.subsecoes.length > 0 && (
              <div className={styles.subsecoesList}>
                {secao.subsecoes.map((subsecao, index) => (
                  <div 
                    key={index}
                    className={styles.subsecaoItem}
                    onClick={() => handleSubsecaoClick(secao, subsecao)}
                  >
                    <i className={subsecao.icon} style={{ color: secao.cor }} />
                    <span>{subsecao.nome}</span>
                    <i className="fa-solid fa-chevron-right" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleMap;