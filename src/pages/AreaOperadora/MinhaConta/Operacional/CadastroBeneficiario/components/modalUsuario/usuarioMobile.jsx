import styles from './styles.module.css';
import { useState, useCallback } from "react";
import TabelaPadrao from '../../../../../../../components/TabelaPadrao/index.jsx';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog.jsx';

function ModalUsuario({ closeModal, onCloseOrConfirm }) {
  const [selecionados, setSelecionados] = useState([]);


  const handleResetarSenhaClick = useCallback(() => {
    dialogMessage(
      "Tem certeza que deseja efetuar o recebimento desse registro?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },

    );
  });

  const handleAcessoSenhaClick = useCallback(() => {
    dialogMessage(
      "Deseja realmente resetar o acesso?",
      "info",
      {
        buttonsText: {
          confirm: "Sim",
          cancel: "Não"
        }
      },

    );
  });

  const tabelaColumns = [
    {
      value: "login",
      name: "Login",

    },
    {
      value: "nome",
      name: "Nome",
    },
    {
      value: "email",
      name: "Email",
    },
    {
      value: "status",
      name: "Status",
    },
    {
      value: "departamento",
      name: "Departamento",
    },
    {
      value: "funcao",
      name: "Funcao",
    },
    {
      value: "tipo",
      name: "Tipo"
    }
  ];

  const dadosTabela = [
    {
      login: "73924490953R",
      nome: "Rodrigo",
      email: "Rodrigo@gmail.com",
      status: "Ativo",
      departamento: "Produção",
      funcao: "Diretoria",
      tipo: "Funcionario/Representante",
    },

    {
      login: "73923490953R",
      nome: "Osvaldo",
      email: "Osvaldo@gmail.com",
      status: "Ausente",
      departamento: "RH",
      funcao: "Representante",
      tipo: "Funcionario/Representante",
    },

    {
      login: "13924490953R",
      nome: "Otavio",
      email: "otavio@gmail.com",
      status: "Inativo",
      departamento: "TI",
      funcao: "Representante",
      tipo: "Funcionario/Representante",
    },
  ]


  return (
    <>
      <div className={styles.modalOverlay} onClick={closeModal}></div>
      <main className={styles.ModalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1 className={styles.modalTitle}><i className="fa-solid fa-user"></i> Usuário Mobile</h1>
            <button className={styles.modalCloseButton} onClick={onCloseOrConfirm}>
              <i className='fas fa-xmark'></i>
            </button>
          </div>

          <section className={styles.modalSection}>
            <div className={styles.TabelaGroup}>
              <TabelaPadrao
                tabelaId="tabelaPadrao"
                columns={tabelaColumns}
                data={dadosTabela}
                options={{
                  showSearch: false,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showPaginationSwitch: true,
                  showRefresh: true,
                  showExport: true,
                  showPrint: true,
                  showFilter: false,
                  additionalButtons: [

                    {
                      title: 'resetar acesso',
                      icon: 'fa-solid fa-person',
                      onClick: handleAcessoSenhaClick
                    },
                    {
                      title: 'resetar senha',
                      icon: 'fa-solid fa-key',
                      onClick: handleResetarSenhaClick
                    },
                  ],
                  onRowSelectChange: (selected) => setSelecionados(selected)
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  )
};

export default ModalUsuario;
