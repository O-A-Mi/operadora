import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../../utils/json';

const Dashboard = () => {
  const navigate = useNavigate();

  const secoesOperacional = [
    {
      id: 'cadastroPlanos',
      nome: 'Plano/Serviço',
      descricao: 'Gestão de planos e serviços oferecidos',
      icon: 'fa-solid fa-clipboard-list',
      cor: '#4CAF50',
      rota: `${jsonRoute.CadastroPlanos}`
    },
    {
      id: 'cadastroRepresentante',
      nome: 'Representante',
      descricao: 'Gestão de representantees de serviço',
      icon: 'fa-solid fa-user-md',
      cor: '#FF9800',
      rota: `${jsonRoute.CadastroRepresentante}`
    },
    {
      id: 'cadastroBeneficiarios',
      nome: 'Beneficiário',
      descricao: 'Gestão de beneficiários e clientes',
      icon: 'fa-solid fa-users',
      cor: '#2196F3',
      rota: `${jsonRoute.CadastroBeneficiarios}`
    },
    {
      id: 'Cliente',
      nome: 'Cliente',
      descricao: 'Gestão de clientes',
      icon: 'fa-solid fa-user-plus',
      cor: '#E91E63',
      rota: `${jsonRoute.CadastroCliente}`
    },
    {
      id: 'movimentacoes',
      nome: 'Movimentações do Beneficiário',
      descricao: 'Gestão de movimentações e transferências',
      icon: 'fa-solid fa-exchange-alt',
      cor: '#9C27B0',
      rota: `${jsonRoute.MovBeneficiario}`
    },
    {
      id: 'kanban',
      nome: 'Fluxo de Trabalho',
      descricao: 'Gestão de tarefas e fluxo de trabalho',
      icon: 'fa-solid fa-columns',
      cor: '#00BCD4',
      rota: `${jsonRoute.Kanban}`
    }
  ];

  const handleSecaoClick = (secao) => {
    navigate(secao.rota);
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
        {secoesOperacional.map((secao) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 