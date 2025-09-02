import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import TabelaPadrao from '../../../../../../components/TabelaPadrao';

function ModalDependente({ closeModal, onCloseOrConfirm }) {
  const [Pesquisar, setPesquisar, PesquisarRef] = UseInputMask();

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
      <main className={styles.DivContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1 className={styles.modalTitle}><i className="fa-solid fa-file"></i>Dependente</h1>
            <button className={styles.modalCloseButton} onClick={onCloseOrConfirm}>
              <i className='fas fa-xmark'></i>
            </button>
          </div>


          <section className={styles.modalSection}>
            <div className={styles.inputGroup}>

              <div className={styles.divInputs}>
                <UseInputPadrao
                  type="text"
                  identifier="tipo-cliente-signin"
                  value={Pesquisar}
                  onChange={setPesquisar}
                  inputRef={PesquisarRef}
                  label="Nome:" />
              </div>

              <TabelaPadrao
                tabelaId="tabelaPadrao"
                columns={tabelaColumns}
                data={dadosTabela}
                options={{
                  showSearch: false,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showPaginationSwitch: true,
                  showRefresh: false,
                  showExport: true,
                  showPrint: true,
                  showFilter: true,
                }}
              />
            </div>
          </section>
        </div>
      </main>

    </>
  )
};

export default ModalDependente;
