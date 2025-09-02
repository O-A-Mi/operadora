import React, { useState, useRef } from 'react';
import { UseInputPadrao } from '../../../../../../components/InputPadrao';
import styles from './styles.module.css';
import { jsonRoute } from '../../../../../../utils/json';
import { useNavigate } from 'react-router';

const QuestionarioPerguntasVida = () => {
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const advancedIndicesRef = useRef(new Set());
  const pendingAdvanceRef = useRef({ timeoutId: null, fromIndex: null });


  const parentToChildren = {
    3: [17, 14],
    9: [1],
    6: [16],
  };

  const getCategory = (text) => {
    const lower = (text || '').toLowerCase();
    if (lower.includes('pulmon')) return 'pulmonar';
    if (lower.includes('card')) return 'cardiaco';
    if (lower.includes('renal')) return 'renal';
    if (lower.includes('hepá') || lower.includes('hepatic') || lower.includes('hepaticos')) return 'hepatico';
    if (lower.includes('diabet')) return 'diabetico';
    if (lower.includes('câncer') || lower.includes('cancer')) return 'oncologico';
    return null;
  };

  const isChildOfParentByCategory = (parentIndex, childIndex, questionsArr) => {
    const parentCat = getCategory(questionsArr[parentIndex]);
    if (!parentCat) return false;
    if (childIndex === parentIndex) return false;
    return getCategory(questionsArr[childIndex]) === parentCat;
  };

  const isHiddenQuestion = (questionIndex) => {
    for (const [parentIndexStr, children] of Object.entries(parentToChildren)) {
      const parentIndex = Number(parentIndexStr);
      if (children.includes(questionIndex)) {
        const parentResponse = responses[parentIndex];
        if (parentResponse?.answer === 'não') return true;
      }
    }
    for (let p = 0; p < questions.length; p++) {
      const parentResponse = responses[p];
      if (parentResponse?.answer === 'não' && isChildOfParentByCategory(p, questionIndex, questions)) {
        return true;
      }
    }
    return false;
  };

  const findNextVisibleIndex = (fromIndex) => {
    for (let i = fromIndex + 1; i < questions.length; i++) {
      if (!isHiddenQuestion(i)) return i;
    }
    return fromIndex;
  };

  const scheduleAdvance = (fromIndex) => {
    if (advancedIndicesRef.current.has(fromIndex)) return;
    if (pendingAdvanceRef.current.fromIndex === fromIndex) return;
    if (pendingAdvanceRef.current.timeoutId) {
      clearTimeout(pendingAdvanceRef.current.timeoutId);
      pendingAdvanceRef.current.timeoutId = null;
      pendingAdvanceRef.current.fromIndex = null;
    }
    pendingAdvanceRef.current.fromIndex = fromIndex;
    pendingAdvanceRef.current.timeoutId = setTimeout(() => {
      setCurrentQuestionIndex(prev => {
        if (prev === fromIndex) {
          const next = findNextVisibleIndex(fromIndex);
          return Math.min(next, questions.length - 1);
        }
        return prev;
      });
      advancedIndicesRef.current.add(fromIndex);
      pendingAdvanceRef.current.fromIndex = null;
      pendingAdvanceRef.current.timeoutId = null;
    }, 250);
  };

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

    if (value === 'não' && questionIndex === currentQuestionIndex) {
      scheduleAdvance(questionIndex);
    }
  };

  const handleDetailChange = (questionIndex, field, value) => {
    setResponses(prev => {
      const previousResponse = prev[questionIndex] || {};
      const wasCompleteBefore =
        previousResponse?.answer === 'sim' &&
        !!previousResponse?.year &&
        !!previousResponse?.description;
      const updatedResponse = {
        ...previousResponse,
        [field]: value
      };
      const updatedResponses = {
        ...prev,
        [questionIndex]: updatedResponse
      };

      const isCompleteNow =
        updatedResponse?.answer === 'sim' &&
        !!updatedResponse?.year &&
        !!updatedResponse?.description;

      if (questionIndex === currentQuestionIndex && !wasCompleteBefore && isCompleteNow) {
        scheduleAdvance(questionIndex);
      }

      return updatedResponses;
    });
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
    const visibleIndices = questions.map((_, i) => i).filter(i => !isHiddenQuestion(i));
    const completed = visibleIndices.filter((i) => getQuestionStatus(i) === 'completed').length;
    const incomplete = visibleIndices.filter((i) => getQuestionStatus(i) === 'incomplete').length;
    const pending = visibleIndices.filter((i) => getQuestionStatus(i) === 'pending').length;
    const total = visibleIndices.length;
    return { completed, incomplete, pending, total };
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
        {questions
          .slice(0, currentQuestionIndex + 1)
          .map((q, idx) => ({ q, idx }))
          .filter(({ idx }) => !isHiddenQuestion(idx))
          .map(({ q, idx }) => {
          const index = idx;
          const question = q;
          const status = getQuestionStatus(index);
          const response = responses[index];

          return (
            <div
              key={index}
              className={`${styles.questionCard} ${styles[status]} ${index === currentQuestionIndex ? styles.fadeSlideIn : ''}`}
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

export default QuestionarioPerguntasVida;
