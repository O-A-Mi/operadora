import React, { useEffect, useState } from 'react';
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao";
import styles from "../styles.module.css";
import { useLocation, useNavigate } from 'react-router';
import { dadosMockados } from "../../../../../utils/mockConf";

const QuestionarioVida = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    console.log("ID recebido:", id);
    if (id) {
      const isArray = Array.isArray(dadosMockados);
      let dadosCarregados;

      if (isArray) {
        dadosCarregados = dadosMockados.find(item => item.id == id);
      } else {
        dadosCarregados = dadosMockados[id];
      }

      if (dadosCarregados) {
        console.log("Dados encontrados para o ID", id, ":", dadosCarregados);
        setInitialData(dadosCarregados);
        CarregarDados(dadosCarregados);
      } else {
        setInitialData({});
        console.error("Item com ID " + id + " não encontrado.");
      }
    } else {
      setInitialData({});
    }
  }, [id]);

  const [associado, handleassociadoChange, associadoRef] = UseInputMask(null, "text", initialData.associado || '');
  const [serasa, handleserasaChange, serasaRef] = UseInputMask(null, "text", initialData.serasa || '');
  const [statusFi, handlestatusFiChange, statusFiRef] = UseInputMask(null, "text", initialData.statusFi || '');

  const CarregarDados = (dados) => {
    if (dados) {
      handleassociadoChange({ target: { value: dados.associado || '' } });
      handleserasaChange({ target: { value: dados.serasa || '' } });
      handlestatusFiChange({ target: { value: dados.statusFi || '' } });
    }
  };

  const handleSalvar = () => {
    const dadosFormulario = { associado, serasa, statusFi };
    alert('Salvar os dados: ' + JSON.stringify(dadosFormulario));
  };
  
  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <div className={styles.MainContent} key={id}>
      <div className={styles.HeaderCamp}>
        <h1 className={styles.Header}>
          <i className="fa-solid fa-clipboard-list"></i>
          {id ? 'Editar Questionário' : 'Novo Questionário'}
        </h1>
        <p className={styles.subHeader}>
          <i className="fa-solid fa-info-circle"></i>
          {id ? 'Altere os dados do questionário conforme necessário.' : 'Preencha os dados para criar um novo questionário.'}
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.InputAlign}>
          <UseInputPadrao
            label="Associado"
            identifier="associado"
            value={associado}
            onChange={handleassociadoChange}
            inputRef={associadoRef}
            type="text"
          />
          <UseInputPadrao
            label="Serasa"
            identifier="serasa"
            value={serasa}
            onChange={handleserasaChange}
            inputRef={serasaRef}
            type="text"
          />
          <UseInputPadrao
            label="Status"
            identifier="statusFi"
            value={statusFi}
            onChange={handlestatusFiChange}
            inputRef={statusFiRef}
            type="select"
            options={[
              { value: 'Ativo', label: 'Ativo' },
              { value: 'Inativo', label: 'Inativo' },
            ]}
          />
        </div>
      </div>
      <div className={styles.Footer}>
         <div className={styles.actionButtons}>
            <div className={styles.actionButtonsGroup}>
                          <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={handleSalvar}>
                            <i className="fa-solid fa-save"></i>
                            Gravar
                          </button>
                          <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleCancelar}>
                            <i className="fa-solid fa-arrow-left"></i>
                            Voltar
                          </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default QuestionarioVida;