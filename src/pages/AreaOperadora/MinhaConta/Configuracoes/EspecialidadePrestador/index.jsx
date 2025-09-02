import styles from './styles.module.css'; 
import { UseInputPadrao, UseInputMask } from '../../../../../components/InputPadrao';
import { useState, useEffect } from 'react';
import { useLoader, useModal } from '../../../../../context';
import { TabelaPadrao } from '../../../../../components';
import ModalCriarCliente from './components/ModalCriarCliente';
import { limparFiltros, handleResizeTabela } from '../../../../../utils/functions';
import ModalNovaMensagem from './components/ModalNovaMensagem';

const Especialidades = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { showLoader, hideLoader } = useLoader();

  const [textoBusca, textoBuscaChange, textoBuscaRef] = UseInputMask();
  const [matricula, matriculaChange, matriculaRef] = UseInputMask();
  const [status, statusChange, statusRef] = UseInputMask();
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [modoEnvio, setModoEnvio] = useState('email');

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const statusOptions = [
    { value: "naoEnviado", label: "Não enviado" }, 
    { value: "enviado", label: "Enviado" },
    { value: "erro", label: "Erro" },
  ];

  const matriculasOptions = [
    { value: "telefone", label: "Telefone" },
    { value: "mensagem", label: "Mensagem" },
  ];

  const tabelaColumns = [
    { value: "telefone", name: "Telefone" },
    { value: "geracao", name: "Geração" },
    { value: "envio", name: "Envio" },
    { value: "status", name: "Status" },
    { value: "parceiro", name: "Parceiro" },
    { value: "tabela", name: "Tabela" },
    { value: "mensagem", name: "Mensagem" },
    { value: "resposta", name: "Resposta" },
  ];

  const dadosMock = [
    {
      telefone: "(12)98266-2995",
      geracao: "atual",
      envio: "enviado",
      status: "enviado",
      parceiro: "teste",
      tabela: "teste",
      mensagem: "mensagem de email",
      resposta: "ok",
      tipo: "email",
      dt_vigencia: "2025-07-16",
      matricula: "telefone",
      nome: "João da Silva",
      cpfcnpj: "12345678901",
    },
    {
      telefone: "(12)98266-0000",
      geracao: "atual",
      envio: "enviado",
      status: "enviado",
      parceiro: "teste",
      tabela: "teste",
      mensagem: "mensagem de sms",
      resposta: "ok",
      tipo: "sms",
      dt_vigencia: "2025-07-15",
      matricula: "mensagem",
      nome: "Maria Oliveira",
      cpfcnpj: "98765432100",
    },
    {
      telefone: "(12)98266-1111",
      geracao: "atual",
      envio: "enviado",
      status: "enviado",
      parceiro: "teste",
      tabela: "teste",
      mensagem: "mensagem de whatsapp",
      resposta: "ok",
      tipo: "whatsapp",
      dt_vigencia: "2025-07-10",
      matricula: "telefone",
      nome: "Carlos Souza",
      cpfcnpj: "11122233344",
    },
  ];

  useEffect(() => {
    setTabelaDados(dadosMock);
  }, []);

  const filtrarBeneficiarios = () => {
    try {
      showLoader();
      const filtro = {
        texto: textoBuscaRef.current?.value || "",
        matricula: matriculaRef.current?.value || "",
        status: statusRef.current?.value || "",
        dataInicio: dataInicio || "",
        dataFinal: dataFinal || "",
      };

      const dadosFiltrados = tabelaDados.filter((row) => {
        const tipo = row.tipo?.toLowerCase() || "";
        const nome = row.nome?.toLowerCase() || "";
        const cpf = row.cpfcnpj || "";
        const status = row.status?.toLowerCase() || "";
        const matricula = row.matricula?.toLowerCase() || "";
        const dt_vigencia = row.dt_vigencia;

        const dataDentroDoIntervalo =
          (!filtro.dataInicio || dt_vigencia >= filtro.dataInicio) &&
          (!filtro.dataFinal || dt_vigencia <= filtro.dataFinal);

        return (
          tipo === modoEnvio.toLowerCase() &&
          (filtro.texto === "" || nome.includes(filtro.texto.toLowerCase()) || cpf.includes(filtro.texto)) &&
          (filtro.matricula === "" || matricula === filtro.matricula.toLowerCase()) &&
          (filtro.status === "" || status === filtro.status.toLowerCase()) &&
          dataDentroDoIntervalo
        );
      });

      setFiltroDados(dadosFiltrados);
    } catch (error) {
      hideLoader();
      console.error("Erro ao filtrar beneficiários:", error);
      alert("Ocorreu um erro inesperado ao tentar filtrar dados.");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    filtrarBeneficiarios();
  }, [tabelaDados, modoEnvio]);

  const limparFiltro = () => {
    limparFiltros([
      { setter: textoBuscaChange, ref: textoBuscaRef },
      { setter: matriculaChange, ref: matriculaRef },
      { setter: statusChange, ref: statusRef },
    ]);
    setDataInicio("");
    setDataFinal("");
    filtrarBeneficiarios();
  };

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  const dadosTabela = filtroDados.length ? filtroDados : tabelaDados;

  return (
    <>
      <div className={styles.beneficiariosContainer} id="empresa-beneficiarios-container">
        <h2 className={styles.beneficiariosTitleTela}>
          <i className="fa-solid fa-user-md"></i>
          Especialidade Representante
        </h2>
        <div className={styles.beneficiariosContent}>
          <div className={styles.Mensagens}>
          <div className={styles.mensagensLinha}>
              <span
                className={`${styles.itemMensagem} ${modoEnvio === 'email' ? styles.ativo : ''}`}
                onClick={() => setModoEnvio('email')}
              >
                <i className="fa-solid fa-envelope" />
                Email
              </span>
              <span
                className={`${styles.itemMensagem} ${modoEnvio === 'sms' ? styles.ativo : ''}`}
                onClick={() => setModoEnvio('sms')}
              >
                <i className="fa-solid fa-comment" />
                Sms
              </span>
              <span
                className={`${styles.itemMensagem} ${modoEnvio === 'whatsapp' ? styles.ativo : ''}`}
                onClick={() => setModoEnvio('whatsapp')}
              >
                <i className="fa-brands fa-whatsapp" />
                WhatsApp
              </span>
            </div>
          </div>

          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContent}>
                             <div className={styles.filtroTabelaHeader}>
                 <h3 className={styles.filtroTabelaTitle}>
                   <i className="fa-solid fa-filter"></i>
                   Buscar por:
                 </h3>
                 <span
                   className={styles.itemMensagemNew}
                   onClick={() => openModal('novaMensagem')}>
                   <i className="fa-regular fa-file-lines" />
                   Nova Mensagem
                 </span>
                 <button className={styles.filtroTabelaButton} onClick={limparFiltro}>Limpar filtro</button>
               </div>
              <div className={styles.filtroTabelaBody}>
                <UseInputPadrao 
                  label="Geração - Inicial"
                  identifier="data-inicial" 
                  type="date" value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)} 
                  width={isMobile ? 50 : 30}
                  gap={isMobile ? 0.5 : 0.666} 
                  onBlur={filtrarBeneficiarios}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                />
                <UseInputPadrao 
                  label="Data Vigência - Final"
                  identifier="data-final" 
                  type="date"
                  value={dataFinal}
                  onChange={(e) => setDataFinal(e.target.value)} 
                  width={isMobile ? 50 : 30}
                  gap={isMobile ? 0.5 : 0.666} 
                  onBlur={filtrarBeneficiarios}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                />
                <UseInputPadrao 
                  label="Status"
                  identifier="status" 
                  value={status}
                  onChange={statusChange}
                  inputRef={statusRef} 
                  type="select"
                  options={statusOptions} 
                  width={isMobile ? 100 : 30}
                  gap={isMobile ? 0 : 0.666} 
                  onBlur={filtrarBeneficiarios}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                />
                <UseInputPadrao 
                  label="Pesquisar"
                  identifier="pesquisar" 
                  value={matricula}
                  onChange={matriculaChange}
                  inputRef={matriculaRef} 
                  type="select"
                  options={matriculasOptions}
                  width={isMobile ? 100 : 20}
                  gap={isMobile ? 0 : 0.5} 
                  onBlur={filtrarBeneficiarios}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                />
                <UseInputPadrao 
                  label="Texto"
                  identifier="texto"
                  icon="fa-solid fa-text"
                  value={textoBusca}
                  onChange={textoBuscaChange}
                  inputRef={textoBuscaRef} 
                  width={isMobile ? 100 : 40}
                  gap={isMobile ? 0 : 0.5} 
                  upperCase
                  onBlur={filtrarBeneficiarios}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                />
              </div>
            </div>
          </section>

          <TabelaPadrao
            tabelaId="empresa-beneficiarios"
            columns={tabelaColumns}
            data={dadosTabela}
            options={{
              showPaginationSwitch: true,
              showToggleView: true,
              showColumnsSelector: true,
            }}
          />
        </div>
      </div>
      {isModalOpen('criarBeneficiario') && (
        <ModalCriarCliente
          closeModal={() => closeModal("criarBeneficiario")}
          setAtualizarDados={() => {}}
        />
        )}
    {isModalOpen('novaMensagem') && (
  <ModalNovaMensagem
    modoEnvio={modoEnvio}
    onMensagemEnviada={(mensagem) => {
      setTabelaDados((prev) => [...prev, {
        telefone: mensagem.telefone || mensagem.destinatario,
        geracao: "nova",
        envio: "enviado",
        status: "enviado",
        parceiro: "novo",
        tabela: "nova",
        mensagem: mensagem.mensagem,
        resposta: "ok",
        tipo: mensagem.tipo,
        dt_vigencia: new Date().toISOString().slice(0, 10),
        matricula: "telefone",
        nome: "Novo Beneficiário",
        cpfcnpj: "00000000000",
      }]);
    }}
  />
)}
    </>
  );
};

export default Especialidades;
