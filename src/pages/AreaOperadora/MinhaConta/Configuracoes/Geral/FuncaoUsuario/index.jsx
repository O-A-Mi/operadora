import React, { useEffect, useState } from 'react';
import { UseInputPadrao, UseInputMask } from "../../../../../../components/InputPadrao";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router';
import { dadosMockados } from "../../../../../../utils/mockConf";

const FuncaoUsuarioGeral = () => {
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
        // Chama a função para carregar os dados nos campos
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
  const [acao, handleacaoChange, acaoRef] = UseInputMask(null, "text", initialData.acao || '');
  const [statusFi, handlestatusFiChange, statusFiRef] = UseInputMask(null, "text", initialData.statusFi || '');


  const CarregarDados = (dados) => {
    if (dados) {
      handleassociadoChange({ target: { value: dados.associado || '' } });
      handleacaoChange({ target: { value: dados.acao || '' } });
      handlestatusFiChange({ target: { value: dados.statusFi || '' } });
    }
  };

  const handleSalvar = () => {
    const dadosFormulario = { associado, acao, statusFi };
    alert('Salvar os dados: ' + JSON.stringify(dadosFormulario));
  };
  
  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <div className={styles.beneficiariosContainer} key={id}>
      <h2 className={styles.beneficiariosTitleTela}>
        <i className="fa-solid fa-user-tie"></i>
        {id ? 'Editar Função' : 'Nova Função'}
      </h2>
      <p className={styles.beneficiariosDescriptionTela}>
        {id ? 'Altere os dados da função conforme necessário.' : 'Preencha os dados para criar uma nova função.'}
      </p>
      <div className={styles.beneficiariosContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaBody}>
              <UseInputPadrao
                label="Associado"
                identifier="associado"
                value={associado}
                onChange={handleassociadoChange}
                inputRef={associadoRef}
                type="text"
              />
              <UseInputPadrao
                label="Ação"
                identifier="acao"
                value={acao}
                onChange={handleacaoChange}
                inputRef={acaoRef}
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
  );
};

export default FuncaoUsuarioGeral;