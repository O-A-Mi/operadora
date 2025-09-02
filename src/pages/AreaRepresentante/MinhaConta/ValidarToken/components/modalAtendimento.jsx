import {  useAtomValue } from 'jotai';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import toastMessage from '../../../../../assets/toast-ui/toast';
import { carregarLinks, carregarInfos } from '../../../../../db/carregarGeral.jsx';
import dialogMessage from '../../../../../assets/dialog-ui/dialog';
import { devBaseInf, prodBaseInf, baseInf, user } from '../../../../../utils/json.js';
import { userInfoAtom} from '../../../../../context/jotai.jsx';
import { UseInputPadrao, UseInputMask,InputField, InputPadrao  } from '../../../../../components/InputPadrao/index.jsx';
import { validarDataAgendamento, validarCampos } from "../../../../../utils/functions.js";
export default function ModalAgendaAtendimento({
  closeModal,
  isOpen,
  initialData,
  setAtualizarDados
}) {
  const [medico, medicoChange, medicoRef] = UseInputMask();
  const [dataConsulta, setDataConsulta] = useState("")
  const userInfo = useAtomValue(userInfoAtom);
  const [representante, setRepresentante] = useState([]);

  const formatData = dataConsulta => {
    const data = new Date(dataConsulta);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); 
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    return dataFormatada;
  };

  useEffect(() => {
    window.respAtendimento = respAtendimento;
  }, []);
    
  // Array para validar todos os campos
  const arrayCamposObrigatorios = [
      { valor: medico, nome: "Médico" },
      { valor: formatData(dataConsulta), nome: "Data da Consulta", validacao: validarDataAgendamento }
  ];

  const agendarAtendimento = async () => {
    if(!validarCampos(arrayCamposObrigatorios)) return;
      const dataFormatada = formatData(dataConsulta);
      carregarLinks('salvaAtendimento', (baseInf.appMode == "dev" ? devBaseInf.baselink : prodBaseInf.baselink) + baseInf.endpoints.gravarAtendimento, { token: initialData.token, profissional_token:medico,data_consulta: dataFormatada, login: userInfo.login, cd_empresa: (baseInf.appMode == "dev" ? devBaseInf.cd_empresa : prodBaseInf.cd_empresa) },'respAtendimento');
  }

    const respAtendimento = async (data) => {
    const toastIdentifier = `save-${Date.now()}`;
    try {
      toastMessage("gravando Atendimento...", "loading", {
        timeOut: Infinity,
        position: "top-center",
        closeButton: false,
        loading: { id: toastIdentifier, complete: false },
      });

      toastMessage("", "", {
        loading: { id: toastIdentifier, complete: true },
        timeOut: 0,
      })
      
      dialogMessage("Atendimento marcado com sucesso!", "success", { confirmButton: false });
    } catch (error) {
      toastMessage(error, "error");
    } finally {
      closeModal();
      setAtualizarDados(prev => !prev);
    }
  }
  function carregarRepresentante(dados){
    const dadosParsed = JSON.parse(dados);
    const dadosTransformados = dadosParsed.map((item, index) => ({
      value: item.token_representante,
      label: item.nome
    }));

    setRepresentante(dadosTransformados);
    //setRepresentante(JSON.parse(dados));

  }
  useEffect(() => {
        window.carregarRepresentante = carregarRepresentante;
        carregarInfos('carregarRepresentante', {campo: '*', tabela: 'VW_SITE_REPRESENTANTE', condicao: `CD_EMPRESA = '${baseInf.appMode=="dev"?devBaseInf.cd_empresa:prodBaseInf.cd_empresa}' AND LISTA_ESTABELECIMENTO LIKE '%${initialData.token_estabelecimento}%'`}, 'carregarRepresentante');
    },[]);

  function checkValidaDataAgendamento() {
    if(dataConsulta.length > 0){
      if(!validarDataAgendamento(formatData(dataConsulta))){
        setDataConsulta('');
        toastMessage("Data da consulta inválida.", "warning");
      }
    }
  }
    
  if(!isOpen) return
  return (
    <>
       <div className={styles.modalAtendimentoContainer}>
                   <div className={styles.modalAtendimento}>
                       <div className={styles.modalAtendimentoHeader}>
                           <h2 className={styles.modalAtendimentoTitle}>Agendar Atendimento</h2>
                           <button className={styles.backButton} onClick={closeModal}>
                               <i className="fa-solid fa-xmark"></i>
                           </button>
                       </div>
                       <div className={styles.modalAtendimentoContent}>
                           <div className={styles.modalAtendimentoData}>
                               <div className={styles.modalAtendimentoDataValue}>
                                   <span className={styles.modalAtendimentoDataLabel}>Número do Pedido: </span>
                                   <span className={styles.modalAtendimentoDataValue}>{initialData.pedido}</span> 
                               </div>
                               <div className={styles.modalAtendimentoDataValue}>
                                   <span className={styles.modalAtendimentoDataLabel}>Paciente: </span>
                                   <span className={styles.modalAtendimentoDataValue}>{initialData.paciente} </span> 
                               </div>
                               <div className={styles.modalAtendimentoDataValue}>
                                   <span className={styles.modalAtendimentoDataLabel}>Tipo: </span>
                                   <span className={styles.modalAtendimentoDataValue}>{initialData.tipo} </span> 
                               </div>
                           </div>
                           <div className={styles.modalAtendimentoLista}>
                            <UseInputPadrao type='select' label="Médico" identifier="medico" width={70} required value={medico} onChange={medicoChange} inputRef={medicoRef} inputStyle={{width: '100%'}} options={representante}/>
                            <UseInputPadrao type='datetime-local' label="Data da Consulta" identifier="data_consulta" width={70} onBlur={checkValidaDataAgendamento} required value={dataConsulta} onChange={(e) => setDataConsulta(e.target.value)} inputStyle={{width: '100%'}} />
                           </div>
                       </div>
                        <div className={styles.modalAtendimentoFooter}>
                             <button className={styles.agendarSubmit} onClick={agendarAtendimento}>Agendar</button>
                        </div>
                   </div>
               </div>
    </>
  );
}


