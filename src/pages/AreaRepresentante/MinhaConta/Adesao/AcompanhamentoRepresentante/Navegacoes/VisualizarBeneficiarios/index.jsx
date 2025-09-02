import React from 'react';
import { useState, useEffect } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components';
import styles from "../../../../Adesao/AcompanhamentoRepresentante/styles.module.css";
import TabelaPadrao from '../../../../../../../components/TabelaPadrao';
import { handleResizeTabela } from '../../../../../../../utils/functions';

function VisualizarBeneficiarios() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const tableCollumns = [
    { value: "acao", name: "Ação", align: "center", sortable: true },
    { value: "cpf", name: "CPF", align: "center", sortable: true },
    { value: "datas", name: "Datas", align: "center", sortable: true },
    { value: "cliente", name: "Cliente/Contratante", align: "center", sortable: true },
    { value: "email", name: "E-mail", align: "center", sortable: true },
    { value: "acaoJudicial", name: "Ação Judicial", align: "center", sortable: true },
    { value: "dtAcaoJudicial", name: "Dt. Ação Judicial", align: "center", sortable: true },
    { value: "tipoReajuste", name: "Tipo Reajuste", align: "center", sortable: true },
    { value: "dtTipoReajuste", name: "Dt. Tipo Reajuste", align: "center", sortable: true },
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

export default VisualizarBeneficiarios