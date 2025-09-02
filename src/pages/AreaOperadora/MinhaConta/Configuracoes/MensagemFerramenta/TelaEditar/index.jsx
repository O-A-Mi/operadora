import React, { useEffect, useState } from 'react';
import { UseInputPadrao, UseInputMask } from "../../../../../../components/InputPadrao";
import shared from "../../styles.module.css";
import styles from "./styles.module.css";
import { useAsyncError, useLocation, useNavigate } from 'react-router';
import { dadosMockados } from "../../../../../../utils/mockConf";
import Editor from "react-simple-wysiwyg";

const MensagemFerramenta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, tipo } = location.state || {}; 
  const [mensagens, setMensagens] = useState("");
  const [modoEnvio, setModoEnvio] = useState(tipo || "email"); 
  // const id = location.state?.id;

  const [initialData, setInitialData] = useState({});

  const tabs = [
    { id: 'email', name: 'Email', icon: 'fa-solid fa-envelope' },
    { id: 'sms', name: 'SMS', icon: 'fa-solid fa-comment' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp' },
    { id: 'mobile', name: 'Mobile', icon: 'fa-solid fa-mobile-alt' }
  ];

  // const handleTabClick = (tab) => {
  //     setModoEnvio(tab.id);
  // }
  // const isActiveTab = (tab) => {
  //   return modoEnvio == tab.id
  // }

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
  const [mensagem, handleMensagemChange, mensagemRef] = UseInputMask(null, "text", initialData.mensagem || '');
  const [ativo, handleAtivoChange, ativoRef] = UseInputMask(null, "text", initialData.ativo || '');

  const CarregarDados = (dados) => {
    if (dados) {
      handleTituloChange({ target: { value: dados.titulo || '' } });
      handleMensagemChange({ target: { value: dados.mensagem || '' } });
      handleAtivoChange({ target: { value: dados.ativo || '' } });
    }
  };

  const handleSalvar = () => {
    const dadosFormulario = { titulo, mensagem, ativo };
    alert('Salvar os dados: ' + JSON.stringify(dadosFormulario));
  };
  
  const handleCancelar = () => {
    navigate(-1);
  };

    const getActiveTabName = () => {
      const activeTabObj = tabs.find(tab => tab.id === modoEnvio);
      if (activeTabObj) return activeTabObj.name;
      return 'Email'; 
  };

  return (
    <div className={shared.MainContent} key={id}>
      <div className={shared.HeaderCamp}>
        <h1 className='titlePadrao'>
          <p className={shared.Header}><i className="fa-solid fa-comment"></i></p>
           {id ? 'Editar' : 'Nova'} {getActiveTabName()}
        </h1>
        <p className={shared.subHeader}>
          <i className="fa-solid fa-info-circle"></i>
          {id ? 'Altere os dados da mensagem conforme necessário.' : 'Preencha os dados para criar uma nova mensagem.'}
        </p>
      </div>
      <section className='moldura'>
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
              label="Ativo"
              identifier="ativo"
              value={ativo}
              onChange={handleAtivoChange}
              inputRef={ativoRef}
              type="select"
              options={[
                { value: "sim", label: 'Sim' },
                { value: "nao", label: 'Não' },
              ]}
            />
          </div>
          <div className={styles.InputEditor}>
                        {modoEnvio === "email" ? (
                          <Editor
                            value={mensagens}
                            onChange={(e) => setMensagens(e.target.value)}
                            className={styles.wysiwyg}
                            placeholder="Digite sua mensagem aqui..."
                          />
                        ) : (
                          <UseInputPadrao
                            label="Mensagem"
                            identifier="mensagem"
                            value={mensagem}
                            onChange={handleMensagemChange}
                            inputRef={mensagemRef}
                            type="textarea"
                          />
                  )}
            </div>
        </div>
      </section>
      <div className={shared.Footer}>
       <div className={shared.actionButtons}>
                  <div className={shared.actionButtonsGroup}>
                        <button className={`${shared.actionButton} ${shared.actionButtonGravar}`} onClick={handleSalvar}>
                          <i className="fa-solid fa-save"></i>
                          Gravar
                        </button>
                        <button className={`${shared.actionButton} ${shared.actionButtonVoltar}`} onClick={handleCancelar}>
                          <i className="fa-solid fa-arrow-left"></i>
                          Voltar
                        </button>
                  </div>
          </div>
      </div>
    </div>
  );
};

export default MensagemFerramenta;