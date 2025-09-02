import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from "../../../../../../components/InputPadrao";
import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { BackscreenContext, useLoader } from '../../../../../../context';
import { TabelaPadrao } from '../../../../../../components';
import { handleResizeTabela, limparFiltros } from '../../../../../../utils/functions';
import { jsonRoute } from '../../../../../../utils/json';
import ModalPadrao from "../../../../../../components/ModalPadrao";
import dadosLancamento from './dados-lancamento.json';
import Tooltip from '../../../../../../components/TooltipPadrao';

const ValidacaoProposta = () => {
  const navigate = useNavigate();
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);

  const { showLoader, hideLoader } = useLoader();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const pesquisarOptions = [
    { value: 'cpfcnpj', label: 'CPF/CNPJ' },
    { value: 'nome', label: 'Associado' },
    { value: 'referencia', label: 'Proposta' },
  ];

  const getTabelaColumns = () => {
    return [
        {value: "acao", name: "Ação", align: "center", sortable: true},
        {value: "referencia", name: "Referência", align: "center", sortable: true},
        {
            name: "Datas", 
            value: "datas",
            subColumns: [
                {value: "cadastro", name: "Cadastro"},
                {value: "transmissao", name: "Transmissão"},
            ]
        },
        {
            name: "Plano", 
            value: "plano",
            subColumns: [
                {value: "tipo", name: "Tipo"},
                {value: "contratado", name: "Contratado"}
            ]
        },
        { 
            name: "Contratante",
            value: "contratante",
            subColumns: [
                {value: "nome", name: "Nome"},
                {value: "cpfcnpj", name: "CPF/CNPJ"},
            ]
        },
        {
            name: "Representante",
            value: "representante",
            subColumns: [
                {value: "consultor", name: "Consultor"},
                {value: "supervisor", name: "Supervisor"},
                {value: "corretora", name: "Corretora"}
            ]
        }
    ];
  };

  //Referência CPF/CNPJ Associado Pedido Cadastro Validação Representante Status

  useEffect(() => {
    hideLoader();
  }, [hideLoader]);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('lancamento', 'lancamento-container');
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    const timer = setTimeout(() => {
      handleResizeTabela('lancamento', 'lancamento-container');
    }, 100);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
      clearTimeout(timer);
    };
  }, []);

  const openModal = useCallback((item) => {
    console.log("Item recebido no clique:", item);
    setItemSelecionado(item);
    setIsModalOpen(true);
    showBackscreen();
  }, [showBackscreen]);

  const closeModal = useCallback(() => {
    setItemSelecionado(null);
    setIsModalOpen(false);
    hideBackscreen();
  }, [hideBackscreen]);

  const carregarDados = async () => {
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const dados = dadosLancamento || [];
      const dadosFormatados = dados.map(item => ({
        ...item,
        acao: item.acao || '',
        datas: {
          cadastro: item.cadastro || '',
          transmissao: item.transmissao || '',
        },
        plano: {
          tipo: item.tipo || '',
          contratado: item.contratado || '',
        },
        contratante: {
          nome: item.nome || '',
          cpfcnpj: item.cpfcnpj || '',
        },
        representante: {
          consultor: item.consultor || '',
          supervisor: item.supervisor || '',
          corretora: item.corretora || '',
        }
      }));
      setTabelaDados(dadosFormatados);
      setFiltroDados(dadosFormatados);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      hideLoader();
    }
  };

  const filtrarDados = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let filtrados = tabelaDados;

    if (texto) {
      const textoLower = texto.toLowerCase();

      switch (pesquisar) {
        case 'cpfcnpj':
          filtrados = filtrados.filter(item => 
            item.contratante.cpfcnpj.toLowerCase().includes(textoLower)
          );
          break;
        case 'nome':
          filtrados = filtrados.filter(item => 
            item.contratante.nome.toLowerCase().includes(textoLower)
          );
          break;
        case 'referencia':
          filtrados = filtrados.filter(item => 
            item.referencia.toLowerCase().includes(textoLower)
          );
          break;
      }
    }

    setFiltroDados(filtrados);
  };

  const limparFiltro = () => {
    limparFiltros([
      { setter: setPesquisar, ref: pesquisarRef }, 
      { setter: setTexto, ref: textoRef },
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  };

  const configStatusAcao = {
    EP: {
      icon: "fa-solid fa-pencil",
      color: "#3498db",
      tooltip: "Em Preenchimento"
    },
    EPI: {
      icon: "fa-solid fa-file-circle-exclamation",
      color: "#f39c12",
      tooltip: "Encaminhado para Portal Interno"
    },
    AASS: {
      icon: "fa-solid fa-signature",
      color: "#9b59b6",
      tooltip: "Aguardando assinatura do cliente"
    },
    PA: {
      icon: "fa-solid fa-magnifying-glass",
      color: "#f1c40f",
      tooltip: "Proposta em analise"
    },
    P: {
      icon: "fa-solid fa-clock",
      color: "#e7a83cff",
      tooltip: "Pendente"
    },
    AV: {
      icon: "fa-solid fa-clock",
      color: "#2d99aaff",
      tooltip: "Aguardando vigência"
    },
    VA: {
      icon: "fa-solid fa-circle-check",
      color: "#2ecc71",
      tooltip: "Validado"
    },
    _default: {
      icon: "fa-solid fa-circle-question",
      color: "#95a5a6",
      tooltip: "Status Desconhecido"
    }
  };

  const dadosTabela = dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => {
    const configAcao = configStatusAcao[item.acao] || configStatusAcao._default;

    return {
      ...item,
      acao: (
        <Tooltip text={configAcao.tooltip}>
          <i
            className={configAcao.icon}
            style={{ color: configAcao.color, fontSize: '1.2em' }}
          ></i>
        </Tooltip>
      ),
      datas: {
        cadastro: item.cadastro || '',
        transmissao: item.transmissao || '',
      },
      plano: {
        tipo: item.tipo || '',
        contratado: item.contratado || '',
      },
      contratante: {
        nome: item.nome || '',
        cpfcnpj: item.cpfcnpj || '',
      },
      representante: {
        consultor: item.consultor || '',
        supervisor: item.supervisor || '',
        corretora: item.corretora || '',
      }
    };
  }) : [];

  const handleConfirmarValidacao = (referencia) => {
    const dadosAtualizados = tabelaDados.map(item => item.referencia === referencia ? ({
      ...item,
      acao: 'VA'
    }) : item);
    setTabelaDados(dadosAtualizados);
    setFiltroDados(dadosAtualizados);
    closeModal();
  };

  const modalActions = [
    {
      text: "Voltar",
      onClick: () => closeModal(),
      className: styles.backButton,
      icon: "fas fa-arrow-left"
    },
    {
      text: "Validar",
      onClick: () => handleConfirmarValidacao(itemSelecionado.referencia),
      className: styles.confirmButton,
      icon: "fas fa-check"
    }
  ];

  return (
    <>
      <div className={styles.lancamentoContainer} id="lancamento-container">
        <div className={styles.lancamentoHeader}>
          <h2 className={styles.lancamentoTitle}>
            <i className="fa-solid fa-id-card"></i>
            Validação de Proposta
          </h2>
        </div>

        <div className={styles.lancamentoContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContent}>
              <div className={styles.filtroTabelaHeader}>
                <h5 className={styles.filtroTabelaTitle}>
                  <i className="fa-solid fa-filter"></i>
                  Buscar por:
                </h5>
                <button
                  className={styles.filtroTabelaButton}
                  onClick={limparFiltro}
                >
                  Limpar filtro
                </button>
              </div>

              <div className={styles.tabelaSection}>
                <TabelaPadrao
                  tabelaId="validacao"
                  columns={getTabelaColumns()}
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
                    showSearch: () => filtrarDados(),
                    showPrint: false,
                    fileName: "validacao",
                    rowOnClick: (item) => openModal(item),
                    additionalButtons: [
                      {
                        title: 'Voltar',
                        icon: 'fa-regular fa-arrow-left',
                        onClick: () => navigate(-1)
                      }
                    ],
                    toolbarComponent: () => (
                      <div className={styles.filtroTabelaBody}>
                        <UseInputPadrao
                          label="Pesquisar"
                          identifier="pesquisar"
                          value={pesquisar}
                          onChange={setPesquisar}
                          inputRef={pesquisarRef}
                          type="select"
                          options={pesquisarOptions}
                          width={isMobile ? 100 : 50}
                          gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao
                          label="Texto"
                          identifier="texto"
                          icon="fa-solid fa-search"
                          value={texto}
                          onChange={setTexto}
                          inputRef={textoRef}
                          width={isMobile ? 100 : 50}
                          gap={isMobile ? 0 : 0}
                          upperCase
                          inputButtonRight={[{
                            onClick: () => filtrarDados(),
                            text: 'Pesquisar',
                            className: styles.searchButton,
                          }]}
                        />
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      {isModalOpen && itemSelecionado && (
        <ModalPadrao
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Validar Proposta"
          actions={modalActions}
        >
          <p>
            Tem certeza que deseja validar a proposta?
          </p>
          <div className={styles.modalInformationDetails}>
            <strong>Referência:</strong> {itemSelecionado.referencia}<br />
            <strong>Associado:</strong> {itemSelecionado.contratante.nome}<br />
            <strong>CPF/CNPJ:</strong> {itemSelecionado.contratante.cpfcnpj}
          </div>
        </ModalPadrao>
      )}
    </>
  );
};

export default ValidacaoProposta;
