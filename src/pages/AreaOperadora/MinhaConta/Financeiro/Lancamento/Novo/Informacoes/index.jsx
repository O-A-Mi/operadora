import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from "../../../../../../../components/InputPadrao";
import { limparFiltros } from "../../../../../../../utils/functions.js";

const Informacoes = forwardRef(({ lancamentoParaEdicao, modoEdicao }, ref) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [observacao, setObservacao, observacaoRef] = UseInputMask();

  useEffect(() => {
    if (modoEdicao && lancamentoParaEdicao && typeof lancamentoParaEdicao === 'object') {
      setObservacao(lancamentoParaEdicao.observacao || '');
    }
  }, [modoEdicao, lancamentoParaEdicao]);

  const sections = [
    {
      id: "informacoes",
      label: "Informações Adicionais",
      icon: "fa-solid fa-info-circle",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case "informacoes":
        return (
          <div className={styles.tabContent}>
            <div className={styles.observacaoContainer}>
              <h6 className={styles.observacaoSubtitle}>Observação</h6>
              <UseInputPadrao
                label=""
                identifier="observacao"
                value={observacao}
                onChange={setObservacao}
                inputRef={observacaoRef}
                type="textarea"
                maxLength={3000}
                width={100}
                gap={0}
                placeholder="Digite suas observações aqui..."
              />
              <div className={styles.contadorCaracteres}>
                {observacao.length}/3000 caracteres
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const resetarCampos = () => {
    limparFiltros([
      { setter: setObservacao, ref: observacaoRef }
    ]);
  };

  useImperativeHandle(ref, () => ({
    resetarCampos
  }));

  return (
    <div className={styles.informacoesContainer}>
      <div className={styles.filtroTabelaField}>
        <div className={styles.filtroTabelaContent}>
          <div className={styles.sectionsContainer}>
            {sections.map((section) => (
              <div key={section.id} className={styles.sectionPanel}>
                <div className={styles.sectionHeader}>
                  <h6 className={styles.sectionTitle}>
                    <i className={section.icon} />
                    {section.label}
                  </h6>
                </div>
                <div className={styles.sectionContent}>
                  {renderSectionContent(section.id)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Informacoes; 