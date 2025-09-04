import React, { useState, useEffect } from 'react'
import { UseInputMask, UseInputPadrao, TogglePadrao } from '../../../../../../../components';
import { useNavigate } from 'react-router';
import styles from '../../Operadora/styles.module.css';
import { jsonRoute } from '../../../../../../../utils/json';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';


function NovaOperadora() {
    //variaveis
    const [screenState, setScreenState] = useState({
        voltar: false,
      });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [descricao, setDescricao, descricaoRef] = UseInputMask();
    const [banco, setBanco, bancoRef] = UseInputMask();
    const [status, setStatus, statusRef] = UseInputMask();
    const [propostaEsp , setPropostaEsp] = useState(false);
    const [forProsposta, setForProsposta, forProspostaRef] = UseInputMask();
    const [numInicial, setNumInicial, numInicialRef] = UseInputMask();
    const [imagem, setImagem, imagemRef] = UseInputMask();
    const [imagemCar, setImagemCar, imagemCarRef] = UseInputMask();
    const navigate = useNavigate();

    const [modalMensagemTipo, setModalMensagemTipo] = useState(false);
    const [modalFormularioOpen, setModalFormularioOpen] = useState(false);
    const [modalAnexoOpen, setModalAnexoOpen] = useState(false);
    const [modalLogOpen, setModalLogOpen] = useState(false);
    const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
    const [modalDependenteOpen, setModalDependenteOpen] = useState(false);

    //funcoes

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
          };
        
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handleChecked(setter, checked){
            setter(!checked);
    };
    
    const handleNavigate = (route) => {
            navigate(route);
    };

    const handleBackClick = () => {
        setScreenState({ voltar: true });
    };
    
    if (screenState.voltar) {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.Operadora}`);
    }


    
    const closeModalMensagem = () => {
        setModalMensagemTipo(null);
    }
    
    const handleConfirmMensagem = () => {
      closeModalMensagem();
    }



    const closeModalFormulario = () => {
      setModalFormularioOpen(false);
    }

    const closeModalAnexo = () => {
      setModalAnexoOpen(false);
    }

    const closeModalLog = () => {
      setModalLogOpen(false);
    }

    const closeModalUsuario = () => {
      setModalUsuarioOpen(false);
    }


    const closeModalDependente = () => {
      setModalDependenteOpen(false);
    }

    const handleConfirmFormulario = () => {
      closeModalFormulario();
    }

    const handleConfirmAnexo = () => {
      closeModalAnexo();
    }

    const handleConfirmLog = () => {
      closeModalLog();
    }

    const handleConfirmUser = () => {
      closeModalUsuario();
    }

    const handleConfirmDependente = () => {
      closeModalDependente();
    }

    const handleConfirmGravar = () => {
      handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Manutencao}/${jsonRoute.Convenio}`);
    }
    const handleConfirmDeletar = () => {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Manutencao}/${jsonRoute.Convenio}`);
    }
    //listas
    const opStatus = [
        {label: "ATIVO", value: "ativo"},
        {label: "CANCELADO", value: "cancelado"},
        {label: "EM ANÁLISE PELA OPERADORA", value: "em analise pela operadora"},
        {label: "IBBCA SUSPENSO", value: "ibbca suspenso"},
        {label: "INADIMPLENTE IBBCA", value: "inadimplente ibbca"},
        {label: "INATIVO", value: "inativo"},
        {label: "INATIVO POR INADIMPLÊNCIA",value: "inativo por inadimplencia"},
        {label: "RESCISÃO CONTRATUAL", value: "rescisao contratual"},
        {label: "SUSPENSO", value: "suspenso"}
      ];

    const opBancos = [
        { label: "Banco do Brasil", value: "banco_do_brasil" },
        { label: "Caixa Econômica Federal", value: "caixa" },
        { label: "Bradesco", value: "bradesco" },
        { label: "Itaú Unibanco", value: "itau" },
        { label: "Santander", value: "santander" },
        { label: "Banco Inter", value: "inter" },
        { label: "Banco Original", value: "original" },
        { label: "Nubank", value: "nubank" },
        { label: "Banco Modal", value: "modal" },
        { label: "Banco Pan", value: "pan" },
        { label: "Banco C6", value: "c6" },
        { label: "Banco Votorantim", value: "votorantim" },
        { label: "Banco Safra", value: "safra" },
        { label: "Banco BTG Pactual", value: "btg" },
        { label: "Banco Mercantil do Brasil", value: "mercantil" }
      ];
      

    
  return (
    <>
    <main className={styles.beneficiariosContainer}>
        <div>
            <h2 className={styles.TitleRepresentante}>            
              <i className="fa-solid fa-user-plus"></i>
              Nova Operadora              
            </h2>
            </div>
            <div className={styles.beneficiariosContent}>
                <section className={styles.filtroTabelaField}>
                    <div className={styles.filtroTabelaContent}>
                        <div className={styles.filtroTabelaHeader}>
                            <h5 className={styles.filtroTabelaSubTitle}>
                                <i className="fa-solid fa-gear"></i>
                                Tipo de Convênio
                            </h5>
                        </div>
                        <div className={styles.divConteudo}>
                            <UseInputPadrao
                                label="Status" 
                                type="select"
                                identifier="status"
                                value={status}
                                onChange={setStatus}
                                inputRef={statusRef}
                                options={opStatus}
                                width={isMobile ? 100 : 33}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                                label="Descrição" 
                                identifier="status"
                                value={descricao}
                                onChange={setDescricao}
                                inputRef={descricaoRef}
                                width={isMobile ? 100 : 33}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                                label="Banco Padrão" 
                                type="select"
                                identifier="status"
                                value={banco}
                                onChange={setBanco}
                                inputRef={bancoRef}
                                options={opBancos}
                                width={isMobile ? 100 : 33}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>
                        <div className={styles.divConteudo}>
                            <TogglePadrao 
                                label="Utiliza NºProposta Especial?"
                                checked={propostaEsp}
                                onChange={() => handleChecked(setPropostaEsp, propostaEsp)}
                                option1="Não"
                                option2="Sim"
                            />

                            { propostaEsp && (
                                <>
                                <UseInputPadrao
                                    label="Formato Proposta" 
                                    type="number"
                                    identifier="FormatoProposta"
                                    value={forProsposta}
                                    onChange={setForProsposta}
                                    inputRef={forProspostaRef}
                                    width={isMobile ? 100 : 40}
                                    gap={isMobile ? 0 : 0.5}
                                />
                                <UseInputPadrao
                                    label="Número Inicial" 
                                    type="number"
                                    identifier="NumeroInicial"
                                    value={numInicial}
                                    onChange={setNumInicial}
                                    inputRef={numInicialRef}
                                    width={isMobile ? 100 : 41}
                                    gap={isMobile ? 0 : 0.5}
                                />
                                </>
                            )}
                        </div>
                        <div className={styles.divConteudo}>
                            <UseInputPadrao
                                label="Imagem (Preferencialmente 512 x 512)" 
                                type="file"
                                identifier="imagem"
                                value={imagem}
                                onChange={setImagem}
                                inputRef={imagemRef}
                                width={isMobile ? 100 : 50}
                                gap={isMobile ? 0 : 0.5}
                            />
                            <UseInputPadrao
                                label="Imagem - Carteirinha (Preferencialmente 512 x 512)" 
                                type="file"
                                identifier="imagem"
                                value={imagemCar}
                                onChange={setImagemCar}
                                inputRef={imagemCarRef}
                                width={isMobile ? 100 : 49}
                                gap={isMobile ? 0 : 0.5}
                            />
                        </div>
                    </div>
                </section>
            </div>

            <div className={styles.divBotao} style={{ position: 'relative' }}>
                <div className={styles.divBotaoGroup}>
                <button className={styles.BotaoGravar} onClick={() => {
                    dialogMessage(
                    "Tem certeza que deseja gravar este registro?",
                    "info",
                    { buttonsText: { confirm: "Sim", cancel: "Não" } },
                    (result) => { if (result === true) { handleConfirmGravar(); } }
                    );
                }}><i className="fa-solid fa-save" />Gravar</button>
                <button className={styles.BotaoRemover} onClick={() => {
                    dialogMessage(
                    "Tem certeza que deseja remover este registro?",
                    "info",
                    { buttonsText: { confirm: "Sim", cancel: "Não" } },
                    (result) => { if (result === true) { handleConfirmDeletar(); } }
                    );
                }}><i className="fa-solid fa-trash" />Remover</button>
                <button className={styles.BotaoVoltar} onClick={handleBackClick}><i className="fa-solid fa-arrow-left" />Voltar</button>
                </div>
            </div>
        {modalMensagemTipo && <ModalMensagem modoEnvio={modalMensagemTipo} closeModal={closeModalMensagem} onCloseOrConfirm={handleConfirmMensagem} />}
        {modalFormularioOpen && <ModalFormulario closeModal={closeModalFormulario} onCloseOrConfirm={handleConfirmFormulario} />}
        {modalAnexoOpen && <ModalAnexo closeModal={closeModalAnexo} onCloseOrConfirm={handleConfirmAnexo} />}
        {modalLogOpen && <ModalLog closeModal={closeModalLog} onCloseOrConfirm={handleConfirmLog} />}
        {modalUsuarioOpen && <Usuario closeModal={closeModalUsuario} onCloseOrConfirm={handleConfirmUser} />}
        {modalDependenteOpen && <ModalDependente closeModal={closeModalDependente} onCloseOrConfirm={handleConfirmDependente} />}
    </main>
    </>
  )
}

export default NovaOperadora;