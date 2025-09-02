import React, { useState, useEffect } from 'react';
import { UseInputMask, UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useLoader } from '../../../../../../context';
import { limparFiltros } from '../../../../../../utils/functions';
import dialogMessage from '../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const bancoOptions = [
  { value: 'Nubank', label: 'Nubank' },
  { value: 'Itau', label: 'Itau' },
  { value: 'Bradesco', label: 'Bradesco' }
];

const ArquivoRetorno = () => {
  const { showLoader, hideLoader } = useLoader();
  
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [banco, setBanco, bancoRef] = UseInputMask('Nubank');

  const limparFiltro = () => {
    limparFiltros([
      { setter: setBanco, ref: bancoRef, defaultValue: 'Nubank' }
    ]);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['.ret', '.txt'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (allowedExtensions.includes(fileExtension)) {
        setArquivoSelecionado(file);
      } else {
        dialogMessage("Por favor, selecione um arquivo .ret ou .txt", "warning", {
          confirmButton: false,
          buttonsText: {
            close: "OK"
          }
        });
        event.target.value = '';
      }
    }
  };

  const handleEnviar = async () => {
    if (!arquivoSelecionado) {
      dialogMessage("Por favor, selecione um arquivo antes de enviar", "warning", {
        confirmButton: false,
        buttonsText: {
          close: "OK"
        }
      });
      return;
    }
    
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dialogMessage(`Arquivo ${arquivoSelecionado.name} enviado com sucesso!`, "success", {
        confirmButton: false,
        buttonsText: {
          close: "OK"
        }
      });
      setArquivoSelecionado(null);
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      dialogMessage("Erro ao enviar arquivo. Tente novamente.", "error", {
        confirmButton: false,
        buttonsText: {
          close: "OK"
        }
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <div className={styles.cobrancaContainer}>
      <h2 className={styles.cobrancaTitle}>
        <i className="fa-solid fa-file-import"></i>
        Arquivo Retorno
      </h2>
      <div className={styles.cobrancaContent}>
        <div className={styles.container}>
          <UseInputPadrao
            label="Banco Digital"
            type="select"
            value={banco}
            onChange={setBanco}
            inputRef={bancoRef}
            options={bancoOptions}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao
            label="Upload Arquivo"
            type="file"
            accept=".ret,.txt"
            onChange={handleFileChange}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <button
            onClick={handleEnviar}
            className={styles.enviarButton}
          >
            Enviar
          </button>
        </div>
        {arquivoSelecionado && (
          <div className={styles.arquivoInfo}>
            Arquivo selecionado: <strong>{arquivoSelecionado.name}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArquivoRetorno; 