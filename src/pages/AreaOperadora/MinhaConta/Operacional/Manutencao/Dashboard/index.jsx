import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../../../utils/json';

const Dashboard = () => {
  const navigate = useNavigate();

  const secoesOperacional = [
    {
      id: 'associado',
      nome: 'Associado',
      descricao: 'Gestão de associados à empresa',
      icon: 'fa-solid fa-id-card',
      cor: '#4CAF50',
      rota: `${jsonRoute.Associado}`
    },
    {
      id: 'segurado',
      nome: 'Segurado',
      descricao: 'Gestão de segurados da empresa',
      icon: 'fa-solid fa-user',
      cor: '#FF9800',
      rota: `${jsonRoute.Segurado}`
    },
    {
      id: 'dependente',
      nome: 'Dependente',
      descricao: 'Gestão de dependentes',
      icon: 'fa-solid fa-users',
      cor: '#2196F3',
      rota: `${jsonRoute.Depedente}`
    },
    {
      id: 'Representante',
      nome: 'Representante',
      descricao: 'Gestão de representantes de clientes',
      icon: 'fa-solid fa-people-arrows',
      cor: '#E91E63',
      rota: `${jsonRoute.Representante}`
    },
    {
      id: 'funcionario',
      nome: 'Funcionário',
      descricao: 'Gestão de funcionários',
      icon: 'fa-solid fa-id-badge',
      cor: '#9C27B0',
      rota: `${jsonRoute.Funcionario}`
    },
    {
      id: 'fornecedor',
      nome: 'Fornecedor',
      descricao: 'Gestão de fornecedores',
      icon: 'fa-solid fa-boxes-stacked',
      cor: '#10b981',
      rota: `${jsonRoute.Fornecedor}`
    },
    {
      id: 'entidadeempresa',
      nome: 'Entidade/Empresa',
      descricao: 'Gestão de entidades e empresas',
      icon: 'fa-solid fa-building',
      cor: '#db1b1b',
      rota: `${jsonRoute.Entidade}`
    },
    {
      id: 'produtoservico',
      nome: 'Produto/Serviço',
      descricao: 'Gestão de produtos e serviços',
      icon: 'fa-solid fa-bag-shopping',
      cor: '#84ce71ff',
      rota: `${jsonRoute.ProdutoServico}`
    },
    {
      id: 'comboprodutoservico',
      nome: 'Combo Produto/Serviço',
      descricao: 'Gestão de combos de produtos e serviços',
      icon: 'fa-solid fa-bags-shopping',
      cor: '#00d4b8ff',
      rota: `${jsonRoute.ComboProduto}`
    },
    {
      id: 'convenio',
      nome: 'Convênio',
      descricao: 'Gestão de convênios oferecidos',
      icon: 'fa-solid fa-user-plus',
      cor: '#ff00ffff',
      rota: `${jsonRoute.Convenio}`
    },
    {
      id: 'atualizacaoprecolote',
      nome: 'Atualização de Preço em Lote',
      descricao: 'Atualizar multiplos preços de uma vez',
      icon: 'fa-solid fa-box-dollar',
      cor: '#ffd7a9ff',
      rota: `${jsonRoute.AtualizacaoPrecoLote}`
    },
    {
      id: 'vigenciatransmissao',
      nome: 'Vigência e Transmissão em Lote',
      descricao: 'Atualizar multiplas vigências de uma vez',
      icon: 'fa-solid fa-signal',
      cor: '#0004ffff',
      rota: `${jsonRoute.VigenciaTransmissao}`
    },
  ];

  const handleSecaoClick = (secao) => {
    navigate(secao.rota);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h2 className={styles.dashboardTitle}>
          <i className="fa-solid fa-map"></i>
          Mapa De Rotas Manutenção
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