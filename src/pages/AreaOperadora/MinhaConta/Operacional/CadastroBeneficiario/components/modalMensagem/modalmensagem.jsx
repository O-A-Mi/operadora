import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useModal } from "../../../../../../../context";
import { UseInputPadrao, UseInputMask } from "../../../../../../../components/InputPadrao";
import Editor from "react-simple-wysiwyg";
import { modelosEmail } from "../../../../../../../utils/Email.js";
import TabelaPadrao from "../../../../../../../components/TabelaPadrao";
import toastMessage from "../../../../../../../assets/toast-ui/toast";

const ModalMensagem = ({ modoEnvio, onMensagemEnviada, onCloseOrConfirm }) => {
  const { closeModal } = useModal();

  const listaModelos = modelosEmail.modelosEmail || [];
  const [emailDestinatario, setEmailDestinatario] = useState("");
  const [nome, setNome] = useState("");
  const [remetente, setRemetente] = useState("");
  const [cc, setCc] = useState("");
  const [cco, setCco] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [status, statusChange, statusRef] = UseInputMask();
  const [tipoContato, tipoContatoChange, tipoContatoRef] = UseInputMask();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [mostrarFiltrosAssociado, setMostrarFiltrosAssociado] = useState(false);
  const [tipoPlano, setTipoPlano] = useState("");
  const [plano, setPlano] = useState("");
  const [convenio, setConvenio] = useState("");
  const [entidade, setEntidade] = useState("");

  const handleTipoContatoChange = (event) => {
    tipoContatoChange(event); 
    const value = event.target.value;

    const tiposComFiltro = [
      "associado",
      "listaaniversarios",
      "associadoinadimplente",
      "contasareceber",
    ];
    setMostrarFiltrosAssociado(tiposComFiltro.includes(value));
  };

  const tipoContatoOptions = [
    { value: "associado", label: "Associado" },
    { value: "listaaniversarios", label: "Lista Aniversariante" },
    { value: "representante", label: "Representante" },
    { value: "funcionario", label: "Funcionário" },
    { value: "fornecedor", label: "Fornecedor" },
    { value: "associadoinadimplente", label: "Associado Inadimplente" },
    { value: "contasareceber", label: "Contas a Receber" },
  ];

  const statusOptions = [ 
    { value: "cancelado", label: "Cancelado"},
    { value: "emanalisepelaoperadora", label: "Em Análise pela operadora"},
    { value: "ibbccasuspenso", label: "Ibbcca Suspenso"},
    { value: "inadimplenteibbca", label: "Inadimplente IBBCA"},
    { value: "inativo", label: "Inativo"},
    { value: "inativoinadimplente", label: "Inativo Inadimplencia"},
    { value: "resciaocontratual", label: "Rescisão Contratual"},
    { value: "suspenso", label: "Suspenso"},
  ];
  
  const tabelaColumns = [
    { value: "Associado", name: "Associado", sortable: true , cellStyle:{
      padding: "0.5rem",
      fontSize: "0.875rem",
    }, headerStyle: {
      padding: "0.5rem",
      fontSize: "0.875rem",
    }},
    { value: "Contato", name: "Contato", sortable: true, cellStyle:{
      padding: "0.5rem",
      fontSize: "0.875rem",
    }, headerStyle: {
      padding: "0.5rem",
      fontSize: "0.875rem",
    }}
  ];
  
  const dadosMock = [
    {
      Associado: "João Silva",
      Contato: "(12) 91234-5678",
    },
    {
      Associado: "Maria Oliveira",
      Contato: "(12) 98765-4321",
    },
    {
      Associado: "Carlos Souza",
      Contato: "(12) 99876-5432",
    },
    {
      Associado: "Ana Costa",
      Contato: "(12) 92345-6789",
    },
    {
      Associado: "Pedro Santos",
      Contato: "(12) 93456-7890",
    },
    {
      Associado: "Lucia Ferreira",
      Contato: "(12) 94567-8901",
    },
    {
      Associado: "Roberto Lima",
      Contato: "(12) 95678-9012",
    },
    {
      Associado: "Fernanda Alves",
      Contato: "(12) 96789-0123",
    },
    {
      Associado: "Marcos Costa",
      Contato: "(12) 97890-1234",
    },
    {
      Associado: "Juliana Silva",
      Contato: "(12) 98901-2345",
    },
    {
      Associado: "Ricardo Oliveira",
      Contato: "(12) 99012-3456",
    },
  ];

  const [tabelaDados, setTabelaDados] = useState(dadosMock);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    if (modeloSelecionado) {
      const modelo = listaModelos.find((m) => m.id === modeloSelecionado);
      if (modelo) {
        setMensagem(modelo.mensagem);
        if (!assunto) setAssunto(modelo.assunto);
      }
    }
  }, [modeloSelecionado]);
  
  const [telefone, setTelefone] = useState("");

  const handleGetDadosSelecionados = (selectedData) => {
    setSelecionados(selectedData || []);
  };

  const handleEnviar = () => {
    let payload = {};

    if (modoGrupo) {
      payload = {
        tipo: modoEnvio,
        destinatarios: selecionados,
        mensagem,
        modoEnvio: "grupo"
      };
    } else if (modoEnvio === "email") {
      payload = {
        tipo: "email",
        destinatario: emailDestinatario,
        remetente,
        cc,
        cco,
        assunto,
        mensagem,
        modoEnvio: "individual"
      };
    } else {
      payload = {
        tipo: modoEnvio,
        telefone,
        mensagem,
        modoEnvio: "individual"
      };
    }


    onMensagemEnviada?.(payload);
    
    const mensagemSucesso = modoGrupo 
      ? `Mensagem enviada com sucesso para ${selecionados.length} destinatário(s)!`
      : "Mensagem enviada com sucesso!";
    
    toastMessage(mensagemSucesso, "success");
    if (onCloseOrConfirm) {
      onCloseOrConfirm();
    }
  };

  const renderCamposEspecificos = () => {
    switch (modoEnvio) {
      case "email":
        return (
          <>
            <div className={styles.ModeloInp}>
              <label>Modelo</label>
              <select
                  className={styles.select}
                  value={modeloSelecionado}
                  onChange={(e) => setModeloSelecionado(e.target.value)}
                >
              <option value="">Selecione um modelo</option>
              {listaModelos.map((modelo) => (
                <option key={modelo.id} value={modelo.id}>
                  {modelo.nome}
                </option>
              ))}
              </select>
            </div>
            <div className={styles.RemDes}>
            <UseInputPadrao
              label="Remetente"
              value={remetente}
              onChange={setRemetente}
              />
            <UseInputPadrao
              label="Destinatário (email)"
              value={emailDestinatario}
              onChange={setEmailDestinatario}
              required
              />
              </div>
            <UseInputPadrao
              label="Assunto"
              value={assunto}
              onChange={setAssunto}
              required
            />
          </>
        );
      case "sms": 
        return (
          <div className={styles.Sms}>
          <UseInputPadrao 
          label="Para:"
          value={nome}
          onChange={setNome}
          obrigatorio />

          <UseInputPadrao
            label="Número de telefone"
            value={telefone}
            onChange={setTelefone}
            obrigatorio
            />
          </div>
        );

      case "whatsapp":
        return (
          <UseInputPadrao
            label="Número de telefone"
            value={telefone}
            onChange={setTelefone}
            obrigatorio
          />
        );
      default:
        return null;
    }
  };

  const [modoGrupo, setModoGrupo] = useState(false); 

  const handleFechar = () => {
    if (onCloseOrConfirm) {
      onCloseOrConfirm();
    }
  };

  const getIconeModoEnvio = () => {
    switch (modoEnvio) {
      case "email":
        return "fa-solid fa-envelope";
      case "sms":
        return "fa-solid fa-comment";
      case "whatsapp":
        return "fa-brands fa-whatsapp";
      case "mobile":
        return "fa-solid fa-mobile-alt";
      default:
        return "fa-solid fa-envelope";
    }
  };

  const getTituloModoEnvio = () => {
    switch (modoEnvio) {
      case "email":
        return "Email";
      case "sms":
        return "SMS";
      case "whatsapp":
        return "WhatsApp";
      case "mobile":
        return "Mobile";
      default:
        return "Email";
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className={getIconeModoEnvio()}></i>
            <h2 className={styles.modalTitle}>Nova Mensagem - {getTituloModoEnvio()}</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.modalForm}>
            <div className={styles.ModoEnvio}>
              <h2 className={styles.EnvioRadio}>
                {modoEnvio === "email" ? "Enviar por Email" : 
                 modoEnvio === "sms" ? "Enviar por SMS" : 
                 modoEnvio === "whatsapp" ? "Enviar por WhatsApp" : 
                 "Enviar por Mobile"}
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="modoEnvio"
                      value="individual"
                      checked={!modoGrupo}
                      onChange={() => setModoGrupo(false)}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom}></span>
                    Individual
                  </label>

                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="modoEnvio"
                      value="grupo"
                      checked={modoGrupo}
                      onChange={() => setModoGrupo(true)}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom}></span>
                    Grupo
                  </label>
                </div>
              </h2>
            </div>

            <div className={styles.Num}>
              {!modoGrupo && renderCamposEspecificos()}
            </div>

            <div className={styles.inputGroup}>
              <label>Mensagem</label>
              {modoEnvio === "email" ? (
                <Editor
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  className={styles.wysiwyg}
                />
              ) : (
                <textarea
                  className={styles.TextAreaModal}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Digite sua mensagem aqui..."
                />
              )}
            </div>

            {modoGrupo && (
              <div className={styles.destinatarioContainer}>
                <h3 className={styles.TituloTabela}>Selecionar destinatários</h3>
                <div className={styles.SelectInp}>
                  <div className={styles.SelectLinha}>
                    <UseInputPadrao 
                      label="Status"
                      identifier="status" 
                      value={status}
                      onChange={statusChange}
                      inputRef={statusRef} 
                      type="select"
                      options={statusOptions} 
                      width={isMobile ? 100 : 33.33}
                      gap={isMobile ? 0 : 0.666} 
                    />
                    <UseInputPadrao
                      label="Tipo Contato"
                      identifier="tipoContato"
                      value={tipoContato}
                      onChange={handleTipoContatoChange} 
                      inputRef={tipoContatoRef}
                      type="select"
                      options={tipoContatoOptions}
                      width={isMobile ? 100 : 33.33}
                      gap={isMobile ? 0 : 0.666}
                    />
                  </div>

                  <div
                    className={`${styles.ExtraSelect} ${mostrarFiltrosAssociado ? styles.expandVisible : styles.expandHidden}`}>
                    <div className={styles.TipoPlano}>
                      <UseInputPadrao
                        label="Tipo de Plano"
                        value={tipoPlano}
                        onChange={setTipoPlano}
                        type="select"
                        options={[
                          { value: "individual", label: "Individual" },
                          { value: "familiar", label: "Familiar" },
                          { value: "empresarial", label: "Empresarial" },
                        ]}
                        width={isMobile ? 100 : 33.33}
                        gap={isMobile ? 0 : 0.666}
                      />
                      <UseInputPadrao
                        label="Plano"
                        value={plano}
                        onChange={setPlano}
                        type="select"
                        options={[
                          { value: "bronze", label: "Bronze" },
                          { value: "prata", label: "Prata" },
                          { value: "ouro", label: "Ouro" },
                        ]}
                        width={isMobile ? 100 : 33.33}
                        gap={isMobile ? 0 : 0.666}
                      />
                    </div>
                      
                    <div className={styles.Convenio}>
                      <UseInputPadrao
                        label="Convênio"
                        value={convenio}
                        onChange={setConvenio}
                        type="select"
                        options={[
                          { value: "unimed", label: "Unimed" },
                          { value: "amil", label: "Amil" },
                          { value: "bradesco", label: "Bradesco Saúde" },
                        ]}
                        width={isMobile ? 100 : 33.33}
                        gap={isMobile ? 0 : 0.666}
                      />
                      <UseInputPadrao
                        label="Entidade"
                        value={entidade}
                        onChange={setEntidade}
                        type="select"
                        options={[
                          { value: "prefeitura", label: "Prefeitura" },
                          { value: "empresaX", label: "Empresa X" },
                          { value: "entidadeY", label: "Entidade Y" },
                        ]}
                        width={isMobile ? 100 : 33.33}
                        gap={isMobile ? 0 : 0.666}
                      />
                    </div>
                  </div>
                </div>
                <TabelaPadrao
                  tabelaId="empresa-beneficiarios"
                  columns={tabelaColumns}
                  data={tabelaDados}
                  options={{
                    showPaginationSwitch: true,
                    showToggleView: true,
                    showColumnsSelector: true,
                    rowSelection: true,
                    rowSelectionMode: "multiple",
                    onRowSelectChange: handleGetDadosSelecionados,
                  }}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button className={styles.modalButtonEnviar} onClick={handleEnviar}>
            <i className="fa-solid fa-paper-plane"></i>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMensagem;
