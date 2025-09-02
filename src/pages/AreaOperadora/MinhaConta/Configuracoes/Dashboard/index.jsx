import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../../utils/json';

const Dashboard = () => {
  const navigate = useNavigate();

  const secoesConfiguracoes = [
    // {
    //   id: 'agendador',
    //   nome: 'Agendador de Tarefas',
    //   descricao: 'Configuração de tarefas automatizadas do sistema',
    //   icon: 'fa-solid fa-clock',
    //   cor: '#4CAF50',
    //   subsecoes: [
    //     { nome: 'Financeiro', rota: jsonRoute.AgendadorFinanceiro, icon: 'fa-solid fa-dollar-sign' },
    //     { nome: 'Associado', rota: jsonRoute.AgendadorAssociado, icon: 'fa-solid fa-users' },
    //     { nome: 'Proposta', rota: jsonRoute.AgendadorProposta, icon: 'fa-solid fa-file-contract' },
    //     { nome: 'Mudar Status', rota: jsonRoute.AgendadorMudarStatus, icon: 'fa-solid fa-exchange-alt' },
    //     { nome: 'Andamento da Proposta', rota: jsonRoute.AndamentoProposta, icon: 'fa-solid fa-chart-line' },
    //     { nome: 'Representante', rota: jsonRoute.AgendadorRepresentante, icon: 'fa-solid fa-user-tie' },
    //     { nome: 'Plataforma CRM', rota: jsonRoute.AgendadorPlataforma, icon: 'fa-solid fa-desktop' }
    //   ]
    // },
    {
      id: 'manutencao',
      nome: 'Manutenção',
      descricao: 'Configuração de manutenção de informações do sistema',
      icon: 'fa-solid fa-tools',
      cor: '#81dddcff',
      subsecoes: [
        { nome: 'Contratante', rota: jsonRoute.Contratante, icon: 'fa-solid fa-user' },
        { nome: 'Segurado', rota: jsonRoute.Segurado, icon: 'fa-solid fa-users' },
        { nome: 'Dependente', rota: jsonRoute.Depedente, icon: 'fa-solid fa-child' },
        { nome: 'Representante', rota: jsonRoute.Representante, icon: 'fa-solid fa-exchange-alt' },
        { nome: 'Fornecedor', rota: jsonRoute.Fornecedor, icon: 'fa-solid fa-building' },
        { nome: 'Plano de Saúde', rota: jsonRoute.PlanoSaude, icon: 'fa-solid fa-clipboard-list' },
        { nome: 'Operadora', rota: jsonRoute.Operadora, icon: 'fa-solid fa-' }
      ]
    },
    // {
    //   id: 'especialidades',
    //   nome: 'Especialidades',
    //   descricao: 'Gestão de especialidades médicas e representantees',
    //   icon: 'fa-solid fa-stethoscope',
    //   cor: '#2196F3',
    //   subsecoes: []
    // },
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
    // {
    //   id: 'perguntas-declaracao',
    //   nome: 'Perguntas da Declaração',
    //   descricao: 'Configuração de perguntas e declarações',
    //   icon: 'fa-solid fa-question-circle',
    //   cor: '#607D8B',
    //   subsecoes: []
    // },
    // {
    //   id: 'questionario-de-vida',
    //   nome: 'Questionário de Vida',
    //   descricao: 'Configuração de questionários de saúde',
    //   icon: 'fa-solid fa-clipboard-list',
    //   cor: '#795548',
    //   subsecoes: []
    // },
    {
      id: 'formulario',
      nome: 'Formulário',
      descricao: 'Gestão de formulários do sistema',
      icon: 'fa-solid fa-file-alt',
      cor: '#E91E63',
      subsecoes: []
    },
    {
      id: 'departamento',
      nome: 'Departamento',
      descricao: 'Gestão de departamentos do sistema',
      icon: 'fa-solid fa-building',
      cor: '#725b2aff',
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
  ];

  const handleSecaoClick = (secao) => {
    if (secao.subsecoes.length > 0) {
      const rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${secao.id}/${secao.subsecoes[0].rota}`;
      navigate(rotaCompleta);
    } else {
      const rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${secao.id}`;
      navigate(rotaCompleta);
    }
  };

  const handleSubsecaoClick = (secao, subsecao) => {
    const rotaCompleta = `/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${secao.id}/${subsecao.rota}`;
    navigate(rotaCompleta);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h2 className={styles.dashboardTitle}>
          <i className="fa-solid fa-map"></i>
          Mapa De Rotas Operacional
        </h2>
        <p className={styles.dashboardSubtitle}>
          <i className="fa-solid fa-info-circle"></i>
          Gerencie todas as operações do sistema
        </p>
      </div>

      <div className={styles.secoesGrid}>
        {secoesConfiguracoes.map((secao, index) => (
          <div key={secao.id} className={`${styles.secaoCard} ${styles[`secaoCard${index + 1}`]}`}>
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

export default Dashboard; 