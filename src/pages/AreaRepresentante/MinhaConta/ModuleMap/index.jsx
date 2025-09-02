import React from 'react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../utils/json';

const ModuleMap = ({ module, onBack }) => {
  const navigate = useNavigate();

  const moduleMaps = {
    fase_atendimento: {
      title: 'Fase de Atendimento',
      subtitle: 'Gerencie as fases de atendimento do representante',
      sections: [
        {
          id: 'fase_atendimento',
          nome: 'Fase de Atendimento',
          descricao: 'Visualize e gerencie as fases de atendimento',
          icon: 'fa-solid fa-clipboard-list',
          cor: '#4CAF50',
          subsecoes: []
        }
      ]
    },
    listagem_beneficiario: {
      title: 'Listagem de Beneficiários',
      subtitle: 'Gerencie a listagem de beneficiários',
      sections: [
        {
          id: 'listagem_beneficiario',
          nome: 'Listagem de Beneficiários',
          descricao: 'Visualize e gerencie os beneficiários',
          icon: 'fa-solid fa-users',
          cor: '#2196F3',
          subsecoes: []
        }
      ]
    },
    dados_representante: {
      title: 'Dados do Representante',
      subtitle: 'Gerencie os dados do representante',
      sections: [
        {
          id: 'dados_representante',
          nome: 'Dados do Representante',
          descricao: 'Visualize e edite os dados do representante',
          icon: 'fa-solid fa-user-md',
          cor: '#9C27B0',
          subsecoes: []
        }
      ]
    },
    financeiro: {
      title: 'Financeiro',
      subtitle: 'Gerencie as operações financeiras',
      sections: [
        {
          id: 'financeiro_representante',
          nome: 'Financeiro',
          descricao: 'Visualize informações financeiras',
          icon: 'fa-solid fa-dollar-sign',
          cor: '#FF9800',
          subsecoes: []
        }
      ]
    },
    atendimentos: {
      title: 'Atendimentos',
      subtitle: 'Gerencie os atendimentos do representante',
      sections: [
        {
          id: 'atendimentos',
          nome: 'Atendimentos',
          descricao: 'Visualize e gerencie os atendimentos',
          icon: 'fa-solid fa-user-md',
          cor: '#E91E63',
          subsecoes: []
        }
      ]
    },
    lotes: {
      title: 'Lotes',
      subtitle: 'Gerencie os lotes do representante',
      sections: [
        {
          id: 'lotes',
          nome: 'Lotes',
          descricao: 'Visualize e gerencie os lotes',
          icon: 'fa-solid fa-boxes',
          cor: '#795548',
          subsecoes: []
        }
      ]
    },
    validar_paciente: {
      title: 'Validar Paciente',
      subtitle: 'Valide os pacientes do representante',
      sections: [
        {
          id: 'validar_paciente',
          nome: 'Validar Paciente',
          descricao: 'Valide os dados dos pacientes',
          icon: 'fa-solid fa-user-check',
          cor: '#607D8B',
          subsecoes: []
        }
      ]
    },
    validar_token: {
      title: 'Validar Token',
      subtitle: 'Valide os tokens de acesso',
      sections: [
        {
          id: 'validar_token',
          nome: 'Validar Token',
          descricao: 'Valide os tokens de acesso',
          icon: 'fa-solid fa-key',
          cor: '#FF5722',
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

    const moduleRouteMap = {
      'fase_atendimento': jsonRoute.Representante_FaseAtendimento,
      'listagem_beneficiario': jsonRoute.Representante_ListagemBeneficiario,
      'dados_representante': jsonRoute.Representante_DadosRepresentante,
      'financeiro': jsonRoute.Representante_Financeiro,
      'atendimentos': jsonRoute.Representante_Atendimentos,
      'lotes': jsonRoute.Representante_Lotes,
      'validar_paciente': jsonRoute.Representante_ValidarPaciente,
      'validar_token': jsonRoute.Representante_ValidarToken
    };

    const currentModule = module;
    const baseRoute = moduleRouteMap[currentModule];

    if (subsecao) {
      if (subsecao.rota.includes('/')) {
        rotaCompleta = `/${jsonRoute.Representante_Area}/${subsecao.rota}`;
      } else {
        rotaCompleta = `/${jsonRoute.Representante_Area}/${baseRoute}/${subsecao.rota}`;
      }
    } else {
      if (secao.subsecoes.length > 0) {
        const primeiraSubsecao = secao.subsecoes[0];
        return construirRota(secao, primeiraSubsecao);
      } else {
        rotaCompleta = `/${jsonRoute.Representante_Area}/${baseRoute}`;
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