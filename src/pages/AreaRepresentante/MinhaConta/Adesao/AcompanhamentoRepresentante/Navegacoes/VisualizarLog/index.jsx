import React from 'react'
import { useState, useEffect } from 'react';
import TabelaPadrao from '../../../../../../../components/TabelaPadrao';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components';
import styles from "../../styles.module.css"
function VisualizarLog() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dataInicial, setDataInicial, dataInicialRef] = UseInputMask();
  const [dataFinal, setDataFinal, dataFinalRef] = UseInputMask();

  const tableCollumns = [
    { value: "data", name: "Data", align: "center", sortable: true },
    { value: "usuario", name: "Usuario", align: "center", sortable: true },
    { value: "campo", name: "Campo", align: "center", sortable: true },
    { value: "conteudoAntigo", name: "Conteúdo Antigo", align: "center", sortable: true },
    { value: "conteudoNovo", name: "Conteúdo Novo", align: "center", sortable: true },
  ]

  const tableData = [
    {}
  ]

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('visualizarBeneficiarios', 'visualizarBeneficiarios-container');
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    const timer = setTimeout(() => {
      handleResizeTabela('visualizarBeneficiarios', 'visualizarBeneficiarios-container');
    }, 100);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <div className={styles.Content}>
        <UseInputPadrao
          label="Data Inicial" 
          identifier="dataInicio"
          type="date"
          value={dataInicial}
          onChange={setDataInicial}
          inputRef={dataInicialRef}
        />
        <UseInputPadrao
          label="Final" 
          identifier="dataFinal"
          type="date"
          value={dataFinal}
          onChange={setDataFinal}
          inputRef={dataFinalRef}
        />
      </div>
      <div className={styles.Content} id='visualizarBeneficiarios-container'>
        <TabelaPadrao
        tabelaId="visualizarBeneficiarios"
        columns={tableCollumns}
        data={tableData}
        options={{
            cardsPerPage: 10,
            showPagination: true,
            showExport: true,
            fileName: "beneficiarios",
            showHeader: true,
            showFooter: true,
            toolbar: true,
            toolbarPosition: "right",
            showPaginationSwitch: true,
            showSearch: true,
            showRefresh: true,
            showToggleView: true,
            showColumnsSelector: true,
            showFilter: true,
            showGuardaCampos: true,
            paginationEnabled: true,
            /*rowOnClick: handleRowClick,*/
        }} 
        />
      </div>
    </>
  )
}

export default VisualizarLog