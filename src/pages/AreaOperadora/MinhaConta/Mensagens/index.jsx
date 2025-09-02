import styles from './styles.module.css'; 
import { UseInputPadrao, UseInputMask } from '../../../../components/InputPadrao';
import { useState, useEffect, useCallback } from 'react';
import { useLoader, useModal } from '../../../../context';
import { TabelaPadrao } from '../../../../components';
import ModalCriarCliente from './components/ModalCriarCliente';
import { limparFiltros, handleResizeTabela } from '../../../../utils/functions';
import ModalNovaMensagem from './components/ModalNovaMensagem/ModalNovaMensagem';

const Beneficiarios = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { showLoader, hideLoader } = useLoader();

  const [currentTab, setCurrentTab] = useState('email');
  const [textoBusca, textoBuscaChange, textoBuscaRef] = UseInputMask();
  const [matricula, matriculaChange, matriculaRef] = UseInputMask();
  const [status, statusChange, statusRef] = UseInputMask();
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const tabs = [
    { id: 'email', name: 'Email', icon: 'fa-solid fa-envelope' },
    { id: 'sms', name: 'SMS', icon: 'fa-solid fa-comment' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp' },
    { id: 'mobile', name: 'Mobile', icon: 'fa-solid fa-mobile-alt' }
  ];

  const statusOptions = [
    { value: "naoEnviado", label: "Não enviado" }, 
    { value: "enviado", label: "Enviado" },
    { value: "erro", label: "Erro" },
  ];

  const matriculasOptions = [
    { value: "telefone", label: "Telefone" },
    { value: "mensagem", label: "Mensagem" },
  ];

  const getTabelaColumns = (tabId) => {
    switch (tabId) {
      case 'sms':
        return [
          { value: "telefone", name: "Telefone" },
          { value: "geracao", name: "Geração" },
          { value: "envio", name: "Envio" },
          { value: "status", name: "Status" },
          { value: "remetente", name: "Remetente" },
          { value: "origem", name: "Origem" },
          { value: "mensagem", name: "Mensagem" },
          { value: "resposta", name: "Resposta" },
        ];
      
      case 'email':
        return [
          { value: "de", name: "DE" },
          { value: "para", name: "PARA" },
          { value: "cc", name: "CC" },
          { value: "cco", name: "CCO" },
          { value: "assunto", name: "Assunto" },
          { value: "geracao", name: "Geração" },
          { value: "envio", name: "Envio" },
          { value: "status", name: "Status" },
          { value: "nomeDestinatario", name: "Nome do Destinatário" },
          { value: "origem", name: "Origem" },
          { value: "competencia", name: "Competência" },
          { value: "parcelaFi", name: "Parcela FI" },
          { value: "historicoFi", name: "Histórico FI" },
          { value: "resposta", name: "Resposta" },
        ];
      
      case 'whatsapp':
        return [
          { value: "telefone", name: "Telefone" },
          { value: "geracao", name: "Geração" },
          { value: "envio", name: "Envio" },
          { value: "status", name: "Status" },
          { value: "remetente", name: "Remetente" },
          { value: "origem", name: "Origem" },
          { value: "mensagem", name: "Mensagem" },
        ];
      
      case 'mobile':
        return [
          { value: "aparelho", name: "Aparelho" },
          { value: "geracao", name: "Geração" },
          { value: "envio", name: "Envio" },
          { value: "status", name: "Status" },
          { value: "destinatario", name: "Destinatário" },
          { value: "origem", name: "Origem" },
          { value: "titulo", name: "Título" },
          { value: "mensagem", name: "Mensagem" },
          { value: "token", name: "Token" },
        ];
      
      default:
        return [
          { value: "telefone", name: "Telefone" },
          { value: "geracao", name: "Geração" },
          { value: "envio", name: "Envio" },
          { value: "status", name: "Status" },
          { value: "remetente", name: "Remetente" },
          { value: "origem", name: "Origem" },
          { value: "mensagem", name: "Mensagem" },
          { value: "resposta", name: "Resposta" },
        ];
    }
  };

  const dadosMock = [
    {
      telefone: "(12)98266-2995",
      geracao: "atual",
      envio: "enviado",
      status: "enviado",
      remetente: "teste",
      origem: "teste",
      mensagem: "mensagem de email",
      resposta: "ok",
      tipo: "email",
      dt_vigencia: "2025-07-16",
      matricula: "telefone",
      nome: "João da Silva",
      cpfcnpj: "12345678901",
      de: "sistema@empresa.com",
      para: "joao@email.com",
      cc: "admin@empresa.com",
      cco: "",
      assunto: "Confirmação de Pagamento",
      nomeDestinatario: "João da Silva",
      competencia: "2025-01",
      parcelaFi: "001",
      historicoFi: "Pagamento mensalidade",
      aparelho: "iPhone 12",
      destinatario: "João da Silva",
      titulo: "Notificações",
      token: "abc123",
    },
    {
      telefone: "(12)98266-0000",
      geracao: "atual",
      envio: "enviado",
      status: "enviado",
      remetente: "teste",
      origem: "teste",
      mensagem: "mensagem de sms",
      resposta: "ok",
      tipo: "sms",
      dt_vigencia: "2025-07-15",
      matricula: "mensagem",
      nome: "Maria Oliveira",
      cpfcnpj: "98765432100",
      de: "sistema@empresa.com",
      para: "maria@email.com",
      cc: "",
      cco: "",
      assunto: "Lembrete de Consulta",
      nomeDestinatario: "Maria Oliveira",
      competencia: "2025-01",
      parcelaFi: "002",
      historicoFi: "Consulta médica",
      aparelho: "Samsung Galaxy",
      destinatario: "Maria Oliveira",
      titulo: "Lembrete",
      token: "def456",
    },
    {
      telefone: "(12)98266-1111",
      geracao: "atual",
      envio: "enviado",
      status: "enviado",
      remetente: "teste",
      origem: "teste",
      mensagem: "mensagem de whatsapp",
      resposta: "ok",
      tipo: "whatsapp",
      dt_vigencia: "2025-07-10",
      matricula: "telefone",
      nome: "Carlos Souza",
      cpfcnpj: "11122233344",
      de: "sistema@empresa.com",
      para: "carlos@email.com",
      cc: "",
      cco: "",
      assunto: "Resultado de Exame",
      nomeDestinatario: "Carlos Souza",
      competencia: "2025-01",
      parcelaFi: "003",
      historicoFi: "Exame laboratorial",
      aparelho: "Motorola G8",
      destinatario: "Carlos Souza",
      titulo: "Resultado",
      token: "ghi789",
    },
    {
      telefone: "(12)98266-2222",
      geracao: "atual",
      envio: "enviado",
      status: "enviado",
      remetente: "teste",
      origem: "teste",
      mensagem: "mensagem mobile",
      resposta: "ok",
      tipo: "mobile",
      dt_vigencia: "2025-07-12",
      matricula: "telefone",
      nome: "Ana Costa",
      cpfcnpj: "55566677788",
      de: "sistema@empresa.com",
      para: "ana@email.com",
      cc: "",
      cco: "",
      assunto: "Agendamento",
      nomeDestinatario: "Ana Costa",
      competencia: "2025-01",
      parcelaFi: "004",
      historicoFi: "Agendamento consulta",
      aparelho: "Xiaomi Redmi",
      destinatario: "Ana Costa",
      titulo: "Agendamento",
      token: "jkl012",
    },
  ];

  const carregarDados = useCallback(async () => {
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setTabelaDados(dadosMock);
      setFiltroDados(dadosMock);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  const filtrarBeneficiarios = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    try {
      showLoader();
      const filtro = {
        texto: textoBuscaRef.current?.value || "",
        matricula: matriculaRef.current?.value || "",
        status: statusRef.current?.value || "",
        dataInicio: dataInicio || "",
        dataFinal: dataFinal || "",
      };

      const temFiltros = filtro.texto || filtro.matricula || filtro.status || filtro.dataInicio || filtro.dataFinal;
      
      if (!temFiltros) {
        setFiltroDados(tabelaDados);
        hideLoader();
        return;
      }

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
          tipo === currentTab.toLowerCase() &&
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
    setFiltroDados([]);
  }, [currentTab]);

  const limparFiltro = () => {
    limparFiltros([
      { setter: textoBuscaChange, ref: textoBuscaRef },
      { setter: matriculaChange, ref: matriculaRef },
      { setter: statusChange, ref: statusRef },
    ]);
    setDataInicio("");
    setDataFinal("");
    setFiltroDados([]);
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

  const isActiveTab = (tab) => {
    return currentTab === tab.id;
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab.id);
  };

  const getActiveTabName = () => {
    const activeTabObj = tabs.find(tab => isActiveTab(tab));
    if (activeTabObj) return activeTabObj.name;
    return tabs[0].name;
  };

  const dadosTabela = filtroDados;

  return (
    <>
      <div className={styles.beneficiariosContainer} id="empresa-beneficiarios-container">
        <h2 className="titlePadrao">
            <p className={styles.beneficiariosTitleTela}><i className="fa-solid fa-envelope"></i></p>
            Mensagens
        </h2>
        <div className={styles.beneficiariosContent}>
          <div className={styles.tesourariaHeader}>
            <div className={styles.subsectionButtons}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.buttonPage} ${
                    isActiveTab(tab) ? styles.active : ''
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  <i className={tab.icon} />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.subsectionContent}>
            <div className={styles.subsectionPanel}>
              <section className={styles.filtroTabelaField}>
                <div className={styles.filtroTabelaContent}>
                  <div className={styles.filtroTabelaHeader}>
                    <h5 className={styles.filtroTabelaTitle}>
                      <i className="fa-solid fa-filter"></i>
                      Buscar por:
                    </h5>
                    <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                      <i className="fa-solid fa-filter-slash"></i>Limpar filtro
                    </button>
                  </div>
                  <div className={styles.filtroTabelaBody}>
                    <UseInputPadrao 
                      label="Geração - Inicial"
                      identifier="data-inicial" 
                      type="date" 
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)} 
                      width={isMobile ? 100 : 33.33}
                      gap={isMobile ? 0 : 0.333} 
                    />
                    <UseInputPadrao 
                      label="Geração - Final"
                      identifier="data-final" 
                      type="date"
                      value={dataFinal}
                      onChange={(e) => setDataFinal(e.target.value)} 
                      width={isMobile ? 100 : 33.33}
                      gap={isMobile ? 0 : 0.333} 
                    />
                    <UseInputPadrao 
                      label="Status"
                      identifier="status" 
                      value={status}
                      onChange={statusChange}
                      inputRef={statusRef} 
                      type="select"
                      options={statusOptions} 
                      width={isMobile ? 100 : 33.33}
                      gap={isMobile ? 0 : 0.333} 
                    />
                  </div>
                </div>
              </section>

              <TabelaPadrao
                tabelaId="empresa-beneficiarios"
                columns={getTabelaColumns(currentTab)}
                data={dadosTabela}
                options={{
                  toolbar: true,
                  showPaginationSwitch: true,
                  showSearch: true,
                  showRefresh: true,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showExport: true,
                  showFilter: true,
                  showGuardaCampos: true,
                  additionalButtons: [],
                  toolbarComponent: () => (
                    <div className={styles.filtroTabelaBody}>
                      <UseInputPadrao 
                        label="Pesquisar"
                        identifier="pesquisar" 
                        value={matricula}
                        onChange={matriculaChange}
                        inputRef={matriculaRef} 
                        type="select"
                        options={matriculasOptions}
                        width={isMobile ? 100: 15}
                        gap={isMobile ? 0 : 0.333}  
                      />
                      <UseInputPadrao 
                        label="Texto"
                        identifier="texto"
                        value={textoBusca}
                        onChange={textoBuscaChange}
                        inputRef={textoBuscaRef} 
                        width={isMobile ? 100 : 35}
                        gap={isMobile ? 0 : 0.333}  
                        inputButtonRight={[{
                          text: 'Pesquisar',
                          className: styles.searchButton,
                        }]}
                      />
                      <button className={styles.advancedSearchButton}>
                        Busca Avançada <i className="fas fa-search"></i>
                      </button>
                    </div>
                  )
                }}
              />
            </div>
          </div>
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
          modoEnvio={currentTab}
          onMensagemEnviada={(mensagem) => {
            setTabelaDados((prev) => [...prev, {
              telefone: mensagem.telefone || mensagem.destinatario,
              geracao: "nova",
              envio: "enviado",
              status: "enviado",
              remetente: "novo",
              origem: "nova",
              mensagem: mensagem.mensagem,
              resposta: "ok",
              tipo: mensagem.tipo,
              dt_vigencia: new Date().toISOString().slice(0, 10),
              matricula: "telefone",
              nome: "Novo Beneficiário",
              cpfcnpj: "00000000000",
              de: mensagem.de || "sistema@empresa.com",
              para: mensagem.para || "",
              cc: mensagem.cc || "",
              cco: mensagem.cco || "",
              assunto: mensagem.assunto || "",
              nomeDestinatario: mensagem.nomeDestinatario || "",
              competencia: mensagem.competencia || "",
              parcelaFi: mensagem.parcelaFi || "",
              historicoFi: mensagem.historicoFi || "",
              aparelho: mensagem.aparelho || "",
              destinatario: mensagem.destinatario || "",
              titulo: mensagem.titulo || "",
              token: mensagem.token || "",
            }]);
          }}
        />
      )}
    </>
  );
};

export default Beneficiarios;
