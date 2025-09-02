import React, { useEffect, useState, useMemo } from 'react';
import { UseInputPadrao } from "../../../../../../components/InputPadrao";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router';
import { configuracoesForms } from "../../../../../../utils/mockConf";
import { jsonRoute } from "../../../../../../utils/json.js";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';

const ModalPreview = ({ htmlContent, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Visualização do Formulário</h3>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div 
          className={styles.modalBody}
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </div>
  );
};

const FORM_TEMPLATE_HTML = `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">
    <table style="width: 100%; border: none;">
      <tbody>
        <tr>
          <td style="width: 50%; padding: 10px; border: none;">
            <p style="font-weight: bold; font-size: 1.2em;">TERMO DE INCLUSÃO</p>
            <p>Coletivo por Adesão</p>
            <p>Dependente</p>
          </td>
          <td style="width: 50%; text-align: right; padding: 10px; border: none;">
            <p style="margin-top: 20px;">CÓDIGO DA CARTEIRINHA</p>
            <div style="border: 1px solid #ccc; height: 30px; margin-top: 5px;"></div>
            <p style="font-size: 0.8em; color: #666; margin-top: 5px;">PREENCHIMENTO EXCLUSIVO PELA UNIMED VITÓRIA</p>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #e0e0e0; padding: 5px; margin: 10px 0;">
      <p style="font-weight: bold; margin: 0;">IDENTIFICAÇÃO DA CONTRATADA</p>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr style="background-color: #f9f9f9;">
          <td style="width: 33%; border: 1px solid #ccc; padding: 5px;">OPERADORA</td>
          <td style="width: 33%; border: 1px solid #ccc; padding: 5px;"></td>
          <td style="width: 34%; border: 1px solid #ccc; padding: 5px;">REGISTRO NA ANS Nº</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 5px;">UNIMED VITÓRIA COOPERATIVA DE TRABALHO MÉDICO</td>
          <td style="border: 1px solid #ccc; padding: 5px;"></td>
          <td style="border: 1px solid #ccc; padding: 5px;">357391</td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #e0e0e0; padding: 5px; margin: 10px 0;">
      <p style="font-weight: bold; margin: 0;">ENDEREÇO</p>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr style="background-color: #f9f9f9;">
          <td style="width: 33%; border: 1px solid #ccc; padding: 5px;">ENDEREÇO</td>
          <td style="width: 33%; border: 1px solid #ccc; padding: 5px;">INSCRIÇÃO NO CNPJ</td>
          <td style="width: 34%; border: 1px solid #ccc; padding: 5px;">TELEFONE</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 5px;">AV. CEZAR HILAL, 700, 3° ANDAR - BENTO FERREIRA - VITÓRIA - ES - CEP: 29.050-903</td>
          <td style="border: 1px solid #ccc; padding: 5px;">27.571.424/0001-20</td>
          <td style="border: 1px solid #ccc; padding: 5px;">0800 026 0080</td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #e0e0e0; padding: 5px; margin: 10px 0;">
      <p style="font-weight: bold; margin: 0;">DADOS DO PROPONENTE/TITULAR</p>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr style="background-color: #f9f9f9;">
          <td style="width: 25%; border: 1px solid #ccc; padding: 5px;">NOME COMPLETO</td>
          <td style="width: 25%; border: 1px solid #ccc; padding: 5px;">CÓDIGO PRODUTO ANS</td>
          <td style="width: 25%; border: 1px solid #ccc; padding: 5px;">TIPO DE CONTRATO</td>
          <td style="width: 25%; border: 1px solid #ccc; padding: 5px;">DATA DE NASCIMENTO</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 5px;"></td>
          <td style="border: 1px solid #ccc; padding: 5px;"></td>
          <td style="border: 1px solid #ccc; padding: 5px;"></td>
          <td style="border: 1px solid #ccc; padding: 5px;"></td>
        </tr>
      </tbody>
    </table>
  </div>
`;

const FormularioCadastro = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { formularioParaEdicao, modoEdicao, tipoFormulario } = location.state || {};
  const isModoEdicao = modoEdicao === true;

  const [campos, setCampos] = useState({});
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const dadosDoFormulario = useMemo(() => {
    if (tipoFormulario && configuracoesForms[tipoFormulario]) {
      return configuracoesForms[tipoFormulario];
    }
    return {
      ...configuracoesForms.Geral,
      nome: `Formulário ${tipoFormulario}`
    };
  }, [tipoFormulario]);

  useEffect(() => {
    if (isModoEdicao && formularioParaEdicao) {
      setCampos(formularioParaEdicao);
      if (formularioParaEdicao.formulario) {
        const blocksFromHtml = htmlToDraft(formularioParaEdicao.formulario);
        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          setEditorState(EditorState.createWithContent(contentState));
        }
      }
    } else {
      setCampos({
        associado: '',
        formulario: '',
      });
      const blocksFromHtml = htmlToDraft(FORM_TEMPLATE_HTML);
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        setEditorState(EditorState.createWithContent(contentState));
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [isModoEdicao, formularioParaEdicao]);

  const handleCampoChange = (campo, value) => {
    setCampos(prev => ({
      ...prev,
      [campo]: value
    }));
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    handleCampoChange("formulario", html);
  };

  const handleSalvar = () => {
    const novoCadastro = {
      id: isModoEdicao ? formularioParaEdicao.id : Date.now(), 
      ...campos,
    };
    navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${jsonRoute.Formulario}`, {
      state: {
        tipoFormulario: tipoFormulario,
        novoCadastroAdicionado: novoCadastro 
      }
    });
  }

  const handleExportarParaDocx = async () => {
    const htmlContent = campos.formulario;
    if (!htmlContent || htmlContent.trim() === '') {
      alert("Não há conteúdo para exportar.");
      return;
    }
    try {
      const data = await asBlob(htmlContent);
      saveAs(data, `${tipoFormulario}_${campos.associado || 'documento'}.docx`);
    } catch (error) {
      console.error('Erro ao exportar para .docx:', error);
      alert('Erro ao gerar o documento Word. Tente novamente.');
    }
  };

  const handleVisualizar = () => {
    if (!campos.formulario || campos.formulario.trim() === '') {
      alert("Não há conteúdo para visualizar.");
      return;
    }
    setIsPreviewing(true);
  };
  
  const handleImprimir = () => {
    const htmlContent = campos.formulario;
    if (!htmlContent || htmlContent.trim() === '') {
      alert("Não há conteúdo para imprimir.");
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentDocument.write(htmlContent);
    iframe.contentDocument.close();
    iframe.contentWindow.print();
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
  };
  
  const handleCancelar = () => {
    navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Configuracoes}/${jsonRoute.Formulario}`, {
      state: {
        tipoFormulario: tipoFormulario
      }
    });
  };
    
  const renderTabContent = () => {
    return (
      <div className={styles.tabContent}>
        <div className={styles.associadoField}>
          <UseInputPadrao
            label="Associado"
            identifier="associado"
            value={campos.associado || ''}
            onChange={e => handleCampoChange("associado", e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.formularioWysiwygField}>
          <label className={styles.formularioWysiwygLabel}>Formulário</label>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorStyle={{ border: "1px solid #ccc", minHeight: "200px" }}
          />
        </div>
      </div>
    );
  };

  return (
    <> 
      {isPreviewing && (
        <ModalPreview 
          htmlContent={campos.formulario} 
          onClose={() => setIsPreviewing(false)} 
        />
      )}
      <div className={styles.formularioCadastroContainer} id="formulario-cadastro-container">
        <h2 className={styles.formularioCadastroTitle}>
          <i className="fa-solid fa-file-lines"></i>
          {isModoEdicao ? `Editar ${dadosDoFormulario.nome}` : `Novo ${dadosDoFormulario.nome}`}
        </h2>
        
        <div className={styles.formularioCadastroContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.tabsContainer}>
              {renderTabContent()}
            </div>
          </section>
          <div className={styles.tabelaSection}>
            <div className={styles.Footer}>
              <div></div>
              <div className={styles.FooterButtons}>
                <div className={styles.actionButtons}>
                  <div className={styles.actionButtonsGroup}>
                    <button className={`${styles.actionButton} ${styles.actionButtonInfo}`} onClick={handleVisualizar}>
                      <i className="fa-solid fa-eye"></i>
                      Visualizar
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonSecondary}`} onClick={handleImprimir}>
                      <i className="fa-solid fa-print"></i>
                      Imprimir
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={handleExportarParaDocx}>
                      <i className="fa-solid fa-file-word"></i>
                      Baixar .docx  
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={handleSalvar}>
                      <i className="fa-solid fa-save"></i>
                      Gravar
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleCancelar}>
                      <i className="fa-solid fa-arrow-left"></i>
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioCadastro;