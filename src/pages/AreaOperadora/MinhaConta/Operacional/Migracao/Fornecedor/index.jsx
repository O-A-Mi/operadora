import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from "../../../../../../components/InputPadrao";
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { BackscreenContext, useLoader } from '../../../../../../context';
import toastMessage from '../../../../../../assets/toast-ui/toast';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import { set } from 'optics-ts';

const Fornecedor = () => {
  const navigate = useNavigate();
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { showLoader, hideLoader } = useLoader();
  
  const [pesquisar, setPesquisar, refPesquisar] = UseInputMask();
  const [arquivoFornecedor, setArquivoFornecedor] = useState('');
  const arquivoFornecedorRef = useRef(null);
  const [fileBenef, setFileBenef] = useState(null);



  const pesquisarOptions = [
    { value: '121', label: 'Assim Saúde' },
    { value: '883', label: 'O Seu Convênio' },
    { value: '2044', label: 'Hermanos Pet' },
    { value: '2045', label: 'Odonto Corp' },
    { value: '2047', label: 'Saúde Corp' },
    { value: '2048', label: 'Pet Corp' },
  ];

  function downloadArchive(type){
    const link = document.createElement('a');
    let nomeArquivo = type == 'layout' ? 'layout-importacao-fornecedor.xlsx' : 'exemplo-importacao-fornecedor.xlsx';

    if(type == 'layout'){
      link.href = 'operadora/public/archives/Carterinha/layout-importacao-fornecedor.xlsx'
    }else if(type == 'exemplo'){
      link.href = 'operadora/public/archives/Carterinha/exemplo-importacao-fornecedor.xlsx'
    }else{
      return false;
    }

    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    const isXlsx = selectedFile.name.endsWith('.xlsx') && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (!isXlsx) {
      dialogMessage('Por favor, selecione um arquivo .xlsx válido.', 'warning', { confirmButton: false })
      e.target.value = "";
      return;
    }

    if (selectedFile) {
      setArquivoFornecedor(selectedFile.name);
      setFileBenef(selectedFile);
    } else {
      setArquivoFornecedor(null);
      setFileBenef(null);
    }
  };

  function handleProcessar(){
    try{
      if(!pesquisar){
        dialogMessage('Selecione um Convênio!', 'warning', { confirmButton: false })
        return;
      } else if(!fileBenef){
        dialogMessage('Selecione um Arquivo!', 'warning', { confirmButton: false })
        return;
      } else if(fileBenef.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        dialogMessage('Arquivo inválido!', 'warning', { confirmButton: false })
        return;
      } else{
        showLoader();
        setTimeout(() => {
          hideLoader();
          dialogMessage('Sucesso!', 'success', { confirmButton: false })
        }, 3000);
        return;
      }
    }
    catch(erro){
      hideLoader();
      console.error(erro);
      toastMessage('Erro ao processar o arquivo!', 'error');
    }
  }

  return (
    <>
      <div className={styles.fornecedorContainer} id="fornecedor-container">
        <div className={styles.fornecedorHeader}>
          <h2 className={styles.fornecedorTitle}>
            <i className="fa-solid fa-upload"></i>
            Importar Fornecedor
          </h2>
        </div>
        <div className={styles.fornecedorContent}>
          <div className={styles.conteudoFornecedorContent}>
            <div className={styles.conteudoFornecedorBody}>
              <UseInputPadrao
                label="Pesquisar"
                identifier="pesquisar"
                value={pesquisar}
                onChange={setPesquisar}
                inputRef={refPesquisar}
                type="select"
                options={pesquisarOptions}
                width={isMobile ? 100 : 100}
                gap={isMobile ? 0 : 0.5}
              />

              <div className={styles.conteudoImportacaoFornecedor}>
                <div className={styles.headerImportacaoFornecedor}>
                  <i className="fa-solid fa-file"></i>
                  Arquivo da Fornecedor
                </div>
                <UseInputPadrao
                  label="Arquivo da Fornecedor (.xlsx)"
                  identifier="arquivo-fornecedor"
                  onChange={handleFileChange}
                  inputRef={arquivoFornecedorRef}
                  type="file"
                  width={isMobile ? 100 : 100}
                  gap={isMobile ? 0 : 0.5}
                />
                <div className={styles.opcoesImportacaoFornecedor}>
                  <div className={styles.botoesImportacaoFornecedor}>
                    Layout de Importação da Fornecedor
                    <button onClick={() => downloadArchive('layout')}>
                      <i className="fa-solid fa-download"></i>
                      <p>Download - Layout</p>
                    </button>
                  </div>
                  <div className={styles.botoesImportacaoFornecedor}>
                    Arquivo de Exemplo da Fornecedor
                    <button onClick={() => downloadArchive('exemplo')}>
                      <i className="fa-solid fa-download"></i>
                      <p>Download - Exemplo</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.footerBotoesFornecedor}>
                <button>
                  <i className="fa-solid fa-arrow-left"></i>
                  <p>Voltar</p>
                </button>
                <button onClick={() => handleProcessar()}>
                  <i className="fa-solid fa-gears"></i>
                  <p>Processar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fornecedor;
