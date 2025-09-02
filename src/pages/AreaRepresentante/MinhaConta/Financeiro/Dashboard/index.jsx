import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../../utils/json';

const Dashboard = () => {
  const navigate = useNavigate();

  const secoesFinanceiro = [
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
  ];

  const handleSecaoClick = (secao) => {
    if (secao.subsecoes.length > 0) {
      navigate(`${secao.id}/${secao.subsecoes[0].rota}`);
    } else {
      if (secao.id === 'logAuditoria') {
        navigate(jsonRoute.LogAuditoria);
      } else {
        navigate(secao.id);
      }
    }
  };

  const handleSubsecaoClick = (secao, subsecao) => {
    if (subsecao.rota.includes('/')) {
      navigate(subsecao.rota);
    } else {
      navigate(`${secao.id}/${subsecao.rota}`);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h2 className={styles.dashboardTitle}>Mapa De Rotas Financeiro</h2>
        <p className={styles.dashboardSubtitle}>
          Gerencie todas as operações financeiras do sistema
        </p>
      </div>

      <div className={styles.secoesGrid}>
        {secoesFinanceiro.map((secao) => (
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

export default Dashboard; 