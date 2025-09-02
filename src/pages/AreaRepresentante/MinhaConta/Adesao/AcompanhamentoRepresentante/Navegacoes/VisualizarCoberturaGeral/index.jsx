import React from 'react'
import { useState, useEffect } from 'react';
import { handleResizeTabela } from '../../../../../../../utils/functions';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components';
import styles from "../../../../Adesao/AcompanhamentoRepresentante/styles.module.css";

function VisualizarCoberturaGeral() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const tableCollumns = [
    { value: "data", name: "Data", align: "center", sortable: true },
    { value: "protocolo", name: "Protocolo", align: "center", sortable: true },
    { value: "tipo", name: "Tipo", align: "center", sortable: true },
    { value: "mensagem", name: "Mensagem", align: "center", sortable: true },
    { value: "usuarioCriacao", name: "Usuario Criação", align: "center", sortable: true },
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

export default VisualizarCoberturaGeral