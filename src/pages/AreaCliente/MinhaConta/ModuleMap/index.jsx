import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../utils/json';

const ModuleMap = ({ module, onBack }) => {
  const navigate = useNavigate();

  const moduleMaps = {
    listagem: {
      title: 'Listagem de Beneficiários',
      subtitle: 'Gerencie a listagem de beneficiários do cliente',
      sections: [
        {
          id: 'beneficiarios',
          nome: 'Beneficiários',
          descricao: 'Visualize e gerencie os beneficiários',
          icon: 'fa-solid fa-users',
          cor: '#4CAF50',
          subsecoes: []
        }
      ]
    },
    movimentacoes: {
      title: 'Movimentações',
      subtitle: 'Gerencie as movimentações do sistema',
      sections: [
        {
          id: 'movimentacoes',
          nome: 'Movimentações',
          descricao: 'Visualize e gerencie as movimentações',
          icon: 'fa-solid fa-exchange-alt',
          cor: '#2196F3',
          subsecoes: []
        }
      ]
    },
    relatorio: {
      title: 'Relatórios',
      subtitle: 'Acesse os relatórios disponíveis',
      sections: [
        {
          id: 'relatorios',
          nome: 'Relatórios',
          descricao: 'Visualize relatórios do sistema',
          icon: 'fa-solid fa-chart-bar',
          cor: '#FF9800',
          subsecoes: []
        }
      ]
    },
    dados_cliente: {
      title: 'Dados do Cliente',
      subtitle: 'Gerencie os dados do cliente',
      sections: [
        {
          id: 'dados',
          nome: 'Dados',
          descricao: 'Visualize e edite os dados do cliente',
          icon: 'fa-solid fa-user',
          cor: '#9C27B0',
          subsecoes: []
        }
      ]
    },
    // financeiro: {
    //   title: 'Financeiro',
    //   subtitle: 'Gerencie as operações financeiras',
    //   sections: [
    //     {
    //       id: 'financeiro_cliente',
    //       nome: 'Financeiro',
    //       descricao: 'Visualize informações financeiras',
    //       icon: 'fa-solid fa-dollar-sign',
    //       cor: '#4CAF50',
    //       subsecoes: []
    //     }
    //   ]
    // }
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

     // Mapeamento de módulos para rotas
     const moduleRouteMap = {
       'listagem': jsonRoute.Listagem_Beneficiarios,
       'movimentacoes': jsonRoute.Movimentacoes,
       'relatorio': jsonRoute.Modulo_Relatorio,
       'dados_cliente': jsonRoute.Dados_do_Cliente,
       // 'financeiro': jsonRoute.Financeiro_Cliente // comentado temporariamente
     };

     const currentModule = module; // O módulo atual vem como prop
     const baseRoute = moduleRouteMap[currentModule];

     if (subsecao) {
       if (subsecao.rota.includes('/')) {
         rotaCompleta = `/${jsonRoute.Operadora_MinhaConta}/${subsecao.rota}`;
       } else {
         rotaCompleta = `/${jsonRoute.Operadora_MinhaConta}/${baseRoute}/${subsecao.rota}`;
       }
     } else {
       if (secao.subsecoes.length > 0) {
         const primeiraSubsecao = secao.subsecoes[0];
         return construirRota(secao, primeiraSubsecao);
       } else {
         rotaCompleta = `/${jsonRoute.Operadora_MinhaConta}/${baseRoute}`;
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