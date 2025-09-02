import { useAtom } from 'jotai';
import * as XLSX from 'xlsx';
import styles from './styles.module.css';
import { useModal } from '../../../../context/index.jsx';
import dialogMessage from '../../../../assets/dialog-ui/dialog.jsx';
import { carregarLinks, carregarInfos } from '../../../../db/carregarGeral.jsx';
import { useState, useRef, useEffect, useContext } from "react";
import { devBaseInf, prodBaseInf, baseInf, user } from '../../../../utils/json.js';
import { loginAtom, assinaturaListaAtom, idAtom } from '../../../../context/jotai.jsx'
import { useLoader } from '../../../../context/LoaderContext/index.jsx';
import ModalImportar from "./components/modalImportarBeneficiarios.jsx"
import ModalMovimentacoes from './components/modalImportarMovimentacoes.jsx'
import ModalSaibaImportar from './components/modalSaibaImportar.jsx'

const Movimentacoes = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const [assinaturaLista, setAssinaturaLista] = useAtom(assinaturaListaAtom);
  const [login, setLogin] = useAtom(loginAtom);
  const [token, setToken] = useAtom(idAtom);
  const [assinaturaOption, setAssinaturaOption] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [tipoResumo, setTipoResumo] = useState('beneficiarios');
  const [resumoTotal, setResumoTotal] = useState(0);
  const [resumoPrimeiro, setResumoPrimeiro] = useState(0);
  const [resumoSegundo, setResumoSegundo] = useState(0);
  const [uploading, setUploading] = useState(false);
  const batchSize = 100; // Defina o tamanho do lote
  const [isResumo, setIsResumo] = useState(false);

  const [colunasTabela, setColunasTabela] = useState([]);
  const [dadosTabela, setDadosTabela] = useState([]);
  const [typeOperacao, setTypeOperacao] = useState(''); // 'I' para importação, 'M' para movimentação

  const { showLoader, hideLoader } = useLoader();



  const [fileBenef, setFileBenef] = useState(null);

  const fileBenefRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    const isXlsx = selectedFile.name.endsWith('.xlsx') && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (!isXlsx) {
      dialogMessage('Por favor, selecione um arquivo .xlsx válido.', 'warning', { confirmButton: false })
      e.target.value = ""; // Limpa o input
      return;
    }


    if (selectedFile) {
      setFileBenef(selectedFile);
    } else {
      setFileBenef(null);
    }

  };
  const modalPreviewImportacao = (type) => {
    if (!fileBenef) {
      dialogMessage('Selecione um arquivo primeiro', 'warning', { confirmButton: false })
      return;
    }

    if (!excelData || excelData.length === 0) {
      console.error('Nenhum dado para enviar.');
      dialogMessage('Nenhum dado para enviar', 'warning', { confirmButton: false })
      return;
    }

    setTypeOperacao(type);
    openModal('ModalImportar');
  }
  const modalViewImportacao = () => {
    setIsResumo(true);
    openModal('ModalImportar');
  }


  const initResumoDadosImportados = () => {
    window.carregarImportados = carregarImportados;



    carregarInfos('carregarImportados', params, 'carregarImportados');

    return () => delete window.carregarImportados;
  }

  function carregarImportados(dados) {
    const resp = JSON.parse(dados);

    const colunas = resp[0].map((item) => ({
      value: item,
      name: item
    }))



    setColunasTabela(colunas);
    setDadosTabela(resp);
    modalViewImportacao();
  }

  function transformarOption() {
    setAssinaturaOption([
      { label: "Selecione uma assinatura...", value: "" },
      ...assinaturaLista.map(item => ({
        label: item.cobertura,
        value: item.token_proposta
      }))
    ]);
  }
  const handleDownload = (type) => {
    const link = document.createElement('a');
    const arquivo_importacao = '../../../../../public/exemplo_importacao.xlsx'
    const arquivo_movimentacao = '../../../../../public/exemplo_movimentacao.xlsx'
    const url_importacao = new URL(arquivo_importacao, import.meta.url).href
    const url_movimentacao = new URL(arquivo_movimentacao, import.meta.url).href

    switch (type) {

      case 'M':
        link.href = url_movimentacao;
        link.download = 'exemplo_movimentacao.xlsx';
        link.click();
        break;

      case 'I':
        link.href = url_importacao;
        link.download = 'exemplo_importacao.xlsx';
        link.click();
        break;
    }
  }

  const uploadAllData = async (type) => {
    closeModal('ModalImportar')
    console.error('Enviando todos os dados de uma vez...');
    setUploading(true);

    let allUploadsSuccessful = true;
    showLoader();
    try {
      await sendBatch(excelData, type);
    } catch (error) {
      console.error('Falha ao enviar os dados:', error);
      allUploadsSuccessful = false;
      hideLoader();
    }

    setUploading(false);
    if (!allUploadsSuccessful) {
      dialogMessage('Erro entre em contato com o suporte', 'error', { confirmButton: false })
    }
  };

  const sendBatch = async (batch, type) => {


    if (type === 'I') {
      carregarLinks(
        'uploadBenef',
        (baseInf.appMode === "dev" ? devBaseInf.baselink : prodBaseInf.baselink) + baseInf.endpoints.uploadBeneficiario,
        batchWithInfo, 'getResponse')
    } else {
      carregarLinks(
        'uploadBenef',
        (baseInf.appMode === "dev" ? devBaseInf.baselink : prodBaseInf.baselink) + baseInf.endpoints.executarMovBeneficiario,
        batchWithInfo, 'getResponse')
    }
  };

  const getResponse = (response) => {
    hideLoader();
    let dados = JSON.parse(response);
    if (dados.status == '200') {
      confirmarImportacao();
      limpaDados();
      return;
    }
    erroImportacao(dados.mensagem);
    limpaDados();
  }
  const limpaDados = () => {
    setExcelData(null);
    setFileBenef(null);
  }

  const confirmarImportacao = () => {
    closeModal('ModalImportar')
    dialogMessage('Importação realizada com sucesso', 'success', { confirmButton: false })
    initResumoDadosImportados();

  }

  const erroImportacao = (mensagem) => {
    closeModal('ModalMovimentacoes')
    dialogMessage(mensagem, 'error', { confirmButton: false })
  }

  useEffect(() => {
    window.getResponse = getResponse;
    transformarOption();
  }, [])

  useEffect(() => {
    if (!fileBenef) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      const colunas = Object.keys(sheetData[0]).map((key) => ({
        value: key,
        name: key
      }));
      setExcelData(sheetData);
      setColunasTabela(colunas);
      setDadosTabela(sheetData);
    };

    reader.readAsArrayBuffer(fileBenef);
  }, [fileBenef]);

  return (
    <>
      <div className={styles.movimentacoesContainer}>
        <h2 className={styles.movimentacoesTitleTela}><i className="fa-solid fa-arrow-right-arrow-left"></i>Movimentações</h2>
        <p className={styles.movimentacoesDescriptionTela}>Faça a movimentação cadastral dos associados da entidade por meio de planilhas.</p>
        <div className={styles.movimentacoesContent}>

          <div className={styles.actionContainer}>
            <button onClick={() => openModal('ModalImportar')} className={styles.infoButton}>
              <i className="fas fa-clipboard-list" /> Importar novos beneficiários
            </button>
          </div>

          <div className={styles.actionContainer}>
            <button onClick={() => openModal('ModalMovimentacoes')} className={styles.infoButton}>
              <i className="fas fa-clipboard-list" /> Importar planilha de movimentação
            </button>
          </div>

          <div className={styles.actionContainer}>
            <button onClick={() => openModal('ModalSaibaImportar')} className={styles.importarButton}>
              <i className="fas fa-circle-info" /> Saiba como importar
            </button>
          </div>

        </div>
      </div>

      {isModalOpen("ModalImportar") && (
        <ModalImportar
          closeModal={() => closeModal("ModalImportar")}
        />
      )}

      {isModalOpen("ModalMovimentacoes") && (
        <ModalMovimentacoes
          closeModal={() => closeModal("ModalMovimentacoes")}
        />
      )}

      {isModalOpen("ModalSaibaImportar") && (
        <ModalSaibaImportar
          closeModal={() => closeModal("ModalSaibaImportar")}
        />
      )}
    </>
  );
}

export default Movimentacoes;
