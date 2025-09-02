import React, { useEffect, useState } from 'react';
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router';
import { dadosMockados } from "../../../../../utils/mockConf";

const Status = () => {
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


  const [nome, handleNomeChange, nomeRef] = UseInputMask(null, "text", initialData.nome || '');
  const [tipoParcela, handletipoParcelaChange, tipoParcelaRef] = UseInputMask(null, "text", initialData.tipoParcela || '');
  const [statusFi, handlestatusFiChange, statusFiRef] = UseInputMask(null, "text", initialData.statusFi || '');

  const CarregarDados = (dados) => {
    if (dados) {
      handleNomeChange({ target : { value: dados.associado || '' } });
      handletipoParcelaChange({ target : { value: dados.tipoParcela || '' } });
      handlestatusFiChange({ target : { value: dados.statusFi || '' } });
    }
  }
  const handleSalvar = () => {
    const dadosFormulario = { nome, tipoParcela, statusFi };
    alert('Salvar os dados: ' + JSON.stringify(dadosFormulario));
  };
  
  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <section>
      <div className={styles.beneficiariosContainer} key={id}>
        <h2 className={styles.beneficiariosTitleTela}>
          <i className="fa-solid fa-user"></i>
          {id ? 'Editar Usuário' : 'Novo Usuário'}
        </h2>
        <p className={styles.beneficiariosDescriptionTela}>
          {id ? 'Altere os dados do usuário conforme necessário.' : 'Preencha os dados para criar um novo usuário.'}
        </p>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContent}>
              <div className={styles.filtroTabelaBody}>
                <UseInputPadrao
                  label="Nome"
                  identifier="nome"
                  value={nome}
                  onChange={handleNomeChange}
                  inputRef={nomeRef}
                  type="text"
                />

                <UseInputPadrao
                  label="Tipo Parcela"
                  identifier="tipoParcela"
                  value={tipoParcela}
                  onChange={handletipoParcelaChange}
                  inputRef={tipoParcelaRef}
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
          </section>
          </div>
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
    </section>
  );
};

export default Status;