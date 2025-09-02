import React, { useState } from 'react';
import { UseInputPadrao } from '../../../../../../components/InputPadrao';
import styles from './styles.module.css';
import { useNavigate } from 'react-router';
const QuestionarioPerguntasDeclaracao = () => {
  const [responses, setResponses] = useState({});

  const questions = [
    "Você tem ou já teve hipertensão arterial?",
    "Você tem ou já teve diabetes?",
    "Você tem ou já teve problemas cardíacos?",
    "Você tem ou já teve problemas pulmonares?",
    "Você tem ou já teve problemas renais?",
    "Você tem ou já teve problemas hepáticos?",
    "Você tem ou já teve câncer?",
    "Você tem ou já teve problemas neurológicos?",
    "Você tem ou já teve problemas psiquiátricos?",
    "Você tem ou já teve problemas endocrinológicos?",
    "Você tem ou já teve problemas gastrointestinais?",
    "Você tem ou já teve problemas ortopédicos?",
    "Você tem ou já teve problemas dermatológicos?",
    "Você tem ou já teve problemas oftalmológicos?",
    "Você tem ou já teve problemas otorrinolaringológicos?",
    "Você tem ou já teve problemas urológicos/ginecológicos?",
    "Você tem ou já teve problemas hematológicos?",
    "Você fuma ou já fumou?",
    "Você consome bebidas alcoólicas regularmente?",
    "Você faz uso de medicamentos contínuos?"
  ];

  const handleResponseChange = (questionIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        answer: value,
        year: value === 'sim' ? prev[questionIndex]?.year || '' : '',
        description: value === 'sim' ? prev[questionIndex]?.description || '' : ''
      }
    }));
  };

  const handleDetailChange = (questionIndex, field, value) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        [field]: value
      }
    }));
  };

  const getQuestionStatus = (questionIndex) => {
    const response = responses[questionIndex];
    if (!response?.answer) return 'pending';
    if (response.answer === 'não') return 'completed';
    if (response.answer === 'sim' && response.year && response.description) return 'completed';
    if (response.answer === 'sim') return 'incomplete';
    return 'pending';
  };

  const getCompletionStats = () => {
    const completed = questions.filter((_, index) => getQuestionStatus(index) === 'completed').length;
    const incomplete = questions.filter((_, index) => getQuestionStatus(index) === 'incomplete').length;
    const pending = questions.filter((_, index) => getQuestionStatus(index) === 'pending').length;
    
    return { completed, incomplete, pending, total: questions.length };
  };

  const stats = getCompletionStats();

  const navigate = useNavigate();

  const backPage = () => {
    navigate(-1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div>
          <h1 className={styles.title}>Fase de Atendimento</h1>
        </div>
        <div>
          <button className={styles.backButton} onClick={backPage}><i className="fa-solid fa-arrow-left"></i>Voltar</button>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.total}</div>
            <div className={styles.statLabel}>Total</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.completed}</div>
            <div className={styles.statLabel}>Completas</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.incomplete}</div>
            <div className={styles.statLabel}>Incompletas</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.pending}</div>
            <div className={styles.statLabel}>Pendentes</div>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span>Progresso</span>
            <span>{Math.round((stats.completed / stats.total) * 100)}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.questionsContainer}>
        {questions.map((question, index) => {
          const status = getQuestionStatus(index);
          const response = responses[index];
          
          return (
            <div
              key={index}
              className={`${styles.questionCard} ${styles[status]}`}
            >
              <div className={styles.questionContent}>
                <div className={styles.questionHeader}>
                  <div className={styles.questionInfo}>
                    <div className={`${styles.questionNumber} ${styles[status]}`}>
                      {index + 1}
                    </div>
                    <div className={styles.questionText}>
                      <h3>{question}</h3>
                    </div>
                  </div>
                  
                  <div className={styles.statusIcon}>
                    {status === 'completed' && <span className={styles.completedIcon}>✓</span>}
                    {status === 'incomplete' && <span className={styles.incompleteIcon}>!</span>}
                    {status === 'pending' && <span className={styles.pendingIcon}>○</span>}
                  </div>
                </div>

                <div className={styles.responseButtons}>
                  <button
                    onClick={() => handleResponseChange(index, 'sim')}
                    className={`${styles.responseBtn} ${response?.answer === 'sim' ? styles.activeSim : ''}`}
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => handleResponseChange(index, 'não')}
                    className={`${styles.responseBtn} ${response?.answer === 'não' ? styles.activeNao : ''}`}
                  >
                    Não
                  </button>
                </div>

                {response?.answer === 'sim' && (
                  <div className={styles.detailsSection}>
                    <div className={styles.detailField}>
                      <UseInputPadrao
                        label="Ano de início/diagnóstico"
                        identifier={`year-${index}`}
                        type="number"
                        value={response.year || ''}
                        onChange={(e) => handleDetailChange(index, 'year', e.target.value)}
                        placeholder="Ex: 2020"
                        min="1900"
                        max={new Date().getFullYear()}
                        width={100}
                        gap={0}
                        icon={false}
                      />
                    </div>
                    <div className={styles.detailField}>
                      <UseInputPadrao
                        label="Descrição/Observações"
                        identifier={`description-${index}`}
                        type="textarea"
                        value={response.description || ''}
                        onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                        placeholder="Descreva detalhes relevantes..."
                        width={100}
                        gap={0}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footerSummary}>
        <div className={styles.summaryContent}>
          <div className={styles.summaryInfo}>
            <h3>Resumo do Questionário</h3>
            <p>
              {stats.completed} de {stats.total} perguntas completas
              {stats.incomplete > 0 && ` • ${stats.incomplete} aguardando detalhes`}
            </p>
          </div>
          <div className={`${styles.summaryStatus} ${stats.completed === stats.total ? styles.complete : styles.inProgress}`}>
            {stats.completed === stats.total ? 'Questionário Completo' : 'Em Andamento'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionarioPerguntasDeclaracao;
