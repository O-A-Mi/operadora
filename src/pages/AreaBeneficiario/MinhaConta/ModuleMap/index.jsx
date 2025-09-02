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
        <h2 className={styles.title}>{currentModule.title}</h2>
        <p className={styles.subtitle}>{currentModule.subtitle}</p>
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