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

const Cancelamento = () => {
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
    { value: 'associado', label: 'Associado' },
    { value: 'referencia', label: 'Proposta' },
  ];

  const getTabelaColumns = () => {
    return [
      { value: "referencia", name: "Referência" },
      { value: "cpfcnpj", name: "CPF/CNPJ" },
      { value: "associado", name: "Associado" },
      { value: "pedido", name: "Pedido" },
      { value: "cadastro", name: "Cadastro" },
      { value: "validacao", name: "Validação" },
      { value: "representante", name: "Representante" },
      { value: "status", name: "Status" },
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
        referencia: item.referencia || '',
        cpfcnpj: item.cpfcnpj || '',
        associado: item.associado || '',
        pedido: item.pedido || '',
        cadastro: item.cadastro || '',
        validacao: item.validacao || '',
        representante: item.representante || '',
        status: item.status || '',
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
            item.cpfcnpj.toLowerCase().includes(textoLower)
          );
          break;
        case 'associado':
          filtrados = filtrados.filter(item => 
            item.associado.toLowerCase().includes(textoLower)
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

  const dadosTabela = dadosCarregados && filtroDados.length > 0 ? filtroDados.map(item => ({
    ...item,
    referencia: item.referencia || '',
    cnpfcnpj: item.cnpfcnpj || '',
    associado: item.associado || '',
    pedido: item.pedido || '',
    cadastro: item.cadastro || '',
    validacao: item.validacao || '',
    representante: item.representante || '',
    status: item.status || '',
  })) : [];

  const handleConfirmarExclusao = (referencia) => {
    const dadosAtualizados = tabelaDados.filter(item => item.referencia !== referencia);
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
      text: "Cancelar",
      onClick: () => handleConfirmarExclusao(itemSelecionado.referencia),
      className: styles.confirmButton,
      icon: "fas fa-trash"
    }
  ];

  return (
    <>
      <div className={styles.lancamentoContainer} id="lancamento-container">
        <div className={styles.lancamentoHeader}>
          <h2 className={styles.lancamentoTitle}>
            <i className="fa-solid fa-id-card"></i>
            Cancelamento
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
                  tabelaId="cancelamento"
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
                    fileName: "cancelamento",
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
          title="Cancelar Proposta"
          actions={modalActions}
        >
          <p>
            Tem certeza que deseja cancelar a proposta?
          </p>
          <div className={styles.modalInformationDetails}>
            <strong>Referência:</strong> {itemSelecionado.referencia}<br />
            <strong>Associado:</strong> {itemSelecionado.associado}<br />
            <strong>CPF/CNPJ:</strong> {itemSelecionado.cnpfcnpj}
          </div>
        </ModalPadrao>
      )}
    </>
  );
};

export default Cancelamento;
