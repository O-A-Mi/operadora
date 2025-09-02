import React from 'react'
import { TabelaPadrao } from '../../../../../../../components';
import { useState, useEffect } from 'react';
import styles from "../../styles.module.css";


function VisualizarCobertura() {

    const tableCollumns = [
        { value: "cobertura", name: "Cobertura", align: "center", sortable: true },
        { value: "legenda", name: "Legenda", align: "center", sortable: true },
        { 
            value: "carencia", 
            name: "Carência", 
            align: "center", 
            sortable: true,
            subColumns: [
                { value: "contratual", name: "Contratual", align: "center", sortable: true },
                { value: "novoAssociados", name: "Promocional Novos Associoados", align: "center", sortable: true },
                { value: "advindosOperadoras", name: "Promocional Advindos de outras operadoras", align: "center", sortable: true },
            ]
        },
        
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

export default VisualizarCobertura