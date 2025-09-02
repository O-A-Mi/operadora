import React, { useEffect, useState } from 'react';
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao";
import styles from "../styles.module.css";
import { useLocation, useNavigate } from 'react-router';
import { dadosMockados } from "../../../../../utils/mockConf";

const Notificacao = () => {
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

  const [titulo, handleTituloChange, tituloRef] = UseInputMask(null, "text", initialData.titulo || '');
  const [conteudo, handleConteudoChange, conteudoRef] = UseInputMask(null, "text", initialData.conteudo || '');
  const [dataEnvio, handleDataEnvioChange, dataEnvioRef] = UseInputMask(null, "text", initialData.dataEnvio || '');
  const [tipo, handleTipoChange, tipoRef] = UseInputMask(null, "text", initialData.tipo || '');

  const CarregarDados = (dados) => {
    if (dados) {
      handleTituloChange({ target: { value: dados.titulo || '' } });
      handleConteudoChange({ target: { value: dados.conteudo || '' } });
      handleDataEnvioChange({ target: { value: dados.dataEnvio || '' } });
      handleTipoChange({ target: { value: dados.tipo || '' } });
    }
  };

  const handleSalvar = () => {
    const dadosFormulario = { titulo, conteudo, dataEnvio, tipo };
    alert('Salvar os dados: ' + JSON.stringify(dadosFormulario));
  };
  
  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <div className={styles.MainContent} key={id}>
      <div className={styles.HeaderCamp}>
        <h1 className='titlePadrao'>
           <p className={styles.Header}><i className="fa-solid fa-bell"></i></p>
          {id ? 'Editar Notificações' : 'Nova Notificação'}
        </h1>
        <p className={styles.subHeader}>
          <i className="fa-solid fa-info-circle"></i>
          {id ? 'Altere os dados da notificação conforme necessário.' : 'Preencha os dados para criar uma nova notificação.'}
        </p>
      </div>
      <div className='moldura'>
        <div className={styles.container}>
          <div className={styles.InputAlign}>
            <UseInputPadrao
              label="Título"
              identifier="titulo"
              value={titulo}
              onChange={handleTituloChange}
              inputRef={tituloRef}
              type="text"
            />
            <UseInputPadrao
              label="Conteúdo"
              identifier="conteudo"
              value={conteudo}
              onChange={handleConteudoChange}
              inputRef={conteudoRef}
              type="text"
            />
            <UseInputPadrao
              label="Data de Envio"
              identifier="dataEnvio"
              value={dataEnvio}
              onChange={handleDataEnvioChange}
              inputRef={dataEnvioRef}
              type="date"
            />
            <UseInputPadrao
              label="Tipo"
              identifier="tipo"
              value={tipo}
              onChange={handleTipoChange}
              inputRef={tipoRef}
              type="select"
              options={[
                { value: 'info', label: 'Informativa' },
                { value: 'alerta', label: 'Alerta' },
              ]}
            />
          </div>
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

export default Notificacao;