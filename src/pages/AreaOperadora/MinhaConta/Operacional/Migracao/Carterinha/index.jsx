import styles from './styles.module.css';
import { UseInputMask, UseInputPadrao } from "../../../../../../components/InputPadrao";
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router';
import { BackscreenContext, useLoader } from '../../../../../../context';
import toastMessage from '../../../../../../assets/toast-ui/toast';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import { set } from 'optics-ts';

const Carteirinha = () => {
  const navigate = useNavigate();
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { showLoader, hideLoader } = useLoader();
  
  const [pesquisar, setPesquisar, refPesquisar] = UseInputMask();
  const [arquivoCarteirinha, setArquivoCarteirinha] = useState('');
  const arquivoCarteirinhaRef = useRef(null);
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
    let nomeArquivo = type == 'layout' ? 'layout-importacao-carteirinha.xlsx' : 'exemplo-importacao-carteirinha.xlsx';

    if(type == 'layout'){
      link.href = 'operadora/public/archives/Carterinha/layout-importacao-carteirinha.xlsx'
    }else if(type == 'exemplo'){
      link.href = 'operadora/public/archives/Carterinha/exemplo-importacao-carteirinha.xlsx'
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
      setArquivoCarteirinha(selectedFile.name);
      setFileBenef(selectedFile);
    } else {
      setArquivoCarteirinha(null);
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
      <div className={styles.carteirinhaContainer} id="carteirinha-container">
        <div className={styles.carteirinhaHeader}>
          <h2 className={styles.carteirinhaTitle}>
            <i className="fa-solid fa-upload"></i>
            Importar Carteirinha
          </h2>
        </div>
        <div className={styles.carteirinhaContent}>
          <div className={styles.conteudoCarteirinhaContent}>
            <div className={styles.conteudoCarteirinhaBody}>
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

              <div className={styles.conteudoImportacaoCarteirinha}>
                <div className={styles.headerImportacaoCarteirinha}>
                  <i className="fa-solid fa-file"></i>
                  Arquivo da Carteirinha
                </div>
                <UseInputPadrao
                  label="Arquivo da Carteirinha (.xlsx)"
                  identifier="arquivo-carteirinha"
                  onChange={handleFileChange}
                  inputRef={arquivoCarteirinhaRef}
                  type="file"
                  width={isMobile ? 100 : 100}
                  gap={isMobile ? 0 : 0.5}
                />
                <div className={styles.opcoesImportacaoCarteirinha}>
                  <div className={styles.botoesImportacaoCarteirinha}>
                    Layout de Importação da Carteirinha
                    <button onClick={() => downloadArchive('layout')}>
                      <i className="fa-solid fa-download"></i>
                      <p>Download - Layout</p>
                    </button>
                  </div>
                  <div className={styles.botoesImportacaoCarteirinha}>
                    Arquivo de Exemplo da Carteirinha
                    <button onClick={() => downloadArchive('exemplo')}>
                      <i className="fa-solid fa-download"></i>
                      <p>Download - Exemplo</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.footerBotoesCarteirinha}>
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

export default Carteirinha;
