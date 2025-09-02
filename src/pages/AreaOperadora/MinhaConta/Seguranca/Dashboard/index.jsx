import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../../utils/json';

const Dashboard = () => {
  const navigate = useNavigate();

  const secoesSeguranca = [
    {
      id: 'usuario',
      nome: 'Usuários',
      descricao: 'Gestão de usuários do sistema',
      icon: 'fa-solid fa-users',
      cor: '#4CAF50',
      rota: `${jsonRoute.SegurancaUsuario}`
    },
    {
      id: 'permissaoInformacoes',
      nome: 'Permissões',
      descricao: 'Gerenciar permissões de áreas, telas e ações',
      icon: 'fa-solid fa-lock',
      cor: '#2563EB',
      rota: `${jsonRoute.PermissaoInformacoes}`
    },
    // Removido cartão 'Permissão' (rota antiga)
    // A navegação correta é direta para Permissão Informações
    {
      id: 'permissaoRelatorios',
      nome: 'Permissão Relatório',
      descricao: 'Gestão de permissões para relatórios',
      icon: 'fa-solid fa-chart-bar',
      cor: '#FF9800',
      rota: `${jsonRoute.PermissaoRelatorios}`
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
          Mapa De Rotas Segurança
        </h2>
        <p className={styles.dashboardSubtitle}>
          <i className="fa-solid fa-info-circle"></i>
          Gerencie todas as configurações de segurança do sistema
        </p>
      </div>

      <div className={styles.secoesGrid}>
        {secoesSeguranca.map((secao) => (
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