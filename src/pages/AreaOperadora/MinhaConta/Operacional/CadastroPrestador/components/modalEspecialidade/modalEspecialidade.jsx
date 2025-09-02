import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from '../../../../../../../components/InputPadrao';
import TabelaPadrao from "../../../../../../../components/TabelaPadrao";
import { useState } from "react";


export default function ModalNovoCard({ closeModal }) {
  const [prioridade, prioridadeChange, prioridadeRef] = UseInputMask(null, "number");
  const [assunto, assuntoChange, assuntoRef] = UseInputMask(null, "text")

  const tabelaColumns = [
    {
      value: "inicial",
      name: "Inicial",

    },
    {
      value: "final",
      name: "Final",
    },
    {
      value: "tipo",
      name: "Tipo",
    },
    {
      value: "modo",
      name: "Modo",
    },
    {
      value: "valor",
      name: "Valor",
    },
  ];

  const dadosTabela = [
    {
      inicial: "0",
      final: "0",
      tipo: "Adesão",
      modo: "Percentual",
      valor: "10",
    },

    {
      inicial: "1",
      final: "3",
      tipo: "Adesão",
      modo: "Percentual",
      valor: "30",
    },

    {
      inicial: "3",
      final: "7",
      tipo: "Adesão",
      modo: "Percentual",
      valor: "20",
    },
  ]


  const InputStyle = {
    // height: 'auto',
    appearance: 'none',
    border: 'none',
    // padding: '0.25rem',
    // fontSize: '0.85rem',
    // lineHeight: 'unset',
    // background: 'transparent',
    // color: 'var(--cinza-escuro)',
    // transition: 'border 0.2s ease-in-out',
    // cursor: 'default'
  }
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h2>Novo Card</h2>
          <button className={styles.backButton} onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
        </header>

        <div className={styles.scrollBox}>
          <div className={styles.modalBody}>
            <form className={styles.modalForm}>
              <div className={styles.inputs}>
                <UseInputPadrao
                  label="Especialidade"
                  required type="select"
                  identifier="prior idade"
                  value={prioridade}
                  onChange={prioridadeChange}
                  inputRef={prioridadeRef} />

                <UseInputPadrao
                  label="Valor"
                  required type="select"
                  identifier="assunto"
                  value={assunto}
                  onChange={assuntoChange}
                  inputRef={assuntoRef} />
              </div>

              <TabelaPadrao
                tabelaId="tabelaPadrao"
                columns={tabelaColumns}
                data={dadosTabela}
                options={{
                  showSearch: true,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showPaginationSwitch: true,
                  showRefresh: true,
                  showExport: true,
                  showPrint: true,
                  showFilter: true,
                }} />

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}