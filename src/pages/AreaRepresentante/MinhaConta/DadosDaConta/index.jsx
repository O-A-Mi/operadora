/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import styles from './styles.module.css';
import { useEffect, useState, useContext, useCallback } from "react";
import ModalInfo from "./componentes/modalInfo";
import ModalAdress from "./componentes/modalAdress";
import ModalSecurity from "./componentes/modalSecurity";
import { BackscreenContext, useLoader } from "../../../../context";
import { useAtom } from "jotai";
import { idAtom } from "../../../../context/jotai";
import { carregarInfos } from '../../../../db/carregarGeral.jsx';

function DadosConta() {
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
  const { showLoader, hideLoader } = useLoader();
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [token] = useAtom(idAtom);
  const [nome_fantasia, setNome_fantasia] = useState("");
  const [razao_social, setRazao_social] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [tipo_estabelecimento, setTipo_estabelecimento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [modalState, setModalState] = useState({
    modalInfo: false,
    modalAdress: false,
    modalSecurity: false,
  });
  const [atualizarDados, setAtualizarDados] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = useCallback((modalType) => {
      setModalState((prev) => ({ ...prev, [modalType]: true }));
      showBackscreen();
  },[showBackscreen]);
  
  const closeModal = useCallback((modalType) => {
      setModalState((prev) => ({ ...prev, [modalType]: false }));
      hideBackscreen();
  },[hideBackscreen]);

  useEffect(() => {
    const todosModaisFechados = Object.values(modalState).every(
      (value) => !value
    );

    if (todosModaisFechados) {
      hideBackscreen();
    }
  }, [mobile, modalState, hideBackscreen]);

  function carregarDados(dados) {
    try {
        const resp = JSON.parse(dados)[0];
        if (!resp) return;

        const fieldMappings = {
            nome_fantasia: setNome_fantasia,
            razao_social: setRazao_social,
            cnpj: setCnpj,
            tipo_estabelecimento: setTipo_estabelecimento,
            email: setEmail,
            telefone: setTelefone,
            celular: setCelular,
            cep: setCep,
            endereco: setEndereco,
            numero: setNumero,
            complemento: setComplemento,
            bairro: setBairro,
            cidade: setCidade,
            estado: setUf,
        };

        Object.entries(fieldMappings).forEach(([key, setter]) => {
            const value = resp[key] || '';
            setter(value);
        });

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    } finally {
      hideLoader();
    }
  }

  useEffect(() => {
    window.carregarDados = carregarDados;
    
    const params = {
        campo: '*',
        tabela: 'VW_SITE_DADOS_ESTABELECIMENTO',
        condicao: `TOKEN = '${token}'`
    };

    carregarInfos('carregarDados', params, 'carregarDados');
    
    return () => delete window.carregarDados;
  }, [atualizarDados]);

  const InfoField = ({ label, value }) => {
    return (
      <div className={styles.infoField}>
        <div className={styles.infoLabel}>{label}</div>
        <div className={styles.infoValue}>{value}</div>
      </div>
    );
  };

  return (
    <>
      <main className={styles.dadosContaContainer}>
        <h2 className={styles.dadosDaContaTitleTela}>Dados da Conta</h2>
        <p className={styles.dadosDaContaDescriptionTela}>
          Consulte e atualize os dados da sua clínica.
        </p>
        <div className={styles.dadosContaContent}>
          {mobile ? (
            <section className={styles.cardsList}>
              <div className={styles.cardContainer}>
                <h2 className={styles.cardTitle}>Informações da Clínica</h2>
                <button className={styles.editButton} onClick={() => openModal("ModalInfo")}>
                   Alterar <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <div className={styles.cardContainer}>
                <h2 className={styles.cardTitle}>Endereço</h2>
                <button className={styles.editButtonDesk} onClick={() => openModal("modalAdress")}>
                  Alterar <i className="fas fa-arrow-right"></i>
                </button>
              </div>
              <div className={styles.cardContainer}>
                <h2 className={styles.cardTitle}>Segurança</h2>
                <button className={styles.editButton} onClick={() => openModal("modalSecurity")}>
                  Alterar <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </section>
          ) : (
            <section className={styles.dadosContaContent}>
              <article className={styles.dadosContaCard}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Informações da Clínica</h2>
                </div>
                <div className={styles.cardContent}>
                  <InfoField label="Nome Fantasia:" value={nome_fantasia || ''} />
                  <InfoField label="Razão Social:" value={razao_social || ''} />
                  <InfoField label="CNPJ:" value={cnpj || ''} />
                  <InfoField label="Tipo:" value={tipo_estabelecimento || ''} />
                  <InfoField label="E-mail:" value={email || ''} />
                  <InfoField label="Telefone:" value={telefone || ''} />
                  <InfoField label="Celular:" value={celular || ''} />
                </div>
                <button className={styles.editButtonDesk} onClick={() => openModal("modalInfo")}> 
                  Alterar <i className="fas fa-arrow-right"></i>
                </button>
              </article>

              <article className={styles.dadosContaCard}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Endereço</h2>
                </div>
                <div className={styles.cardContent}>
                  <InfoField label="CEP:" value={cep || ''} />
                  <InfoField label="UF:" value={uf || ''} />
                  <InfoField label="Cidade:" value={cidade || ''} />
                  <InfoField label="Endereco:" value={endereco || ''} />
                  <InfoField label="Número:" value={numero || ''} />
                  <InfoField label="Complemento:" value={complemento || ''} />
                  <InfoField label="Bairro/Distrito:" value={bairro || ''} />
                </div>
                <button className={styles.editButtonDesk} onClick={() => openModal("modalAdress")}>
                   Alterar <i className="fas fa-arrow-right"></i>
                </button>
              </article>

              <article className={styles.dadosContaCard}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Segurança</h2>
                </div>
                <div className={styles.cardContent}>
                  <InfoField label="Senha:" value={"******"} />
                </div>
                <button className={styles.editButtonDesk} onClick={() => openModal("modalSecurity")}> 
                  Alterar <i className="fas fa-arrow-right"></i>
                </button>
              </article>
            </section>
          )}
        </div>
      </main>

      {modalState.modalInfo && (
        <ModalInfo
          onClose={() => closeModal("modalInfo")}
          isOpen={modalState.modalInfo}
          initialData={{
            nome_fantasia: nome_fantasia || "",
            razao_social: razao_social || "",
            cnpj: cnpj || "",
            tipo_estabelecimento: tipo_estabelecimento || "",
            email: email || "",
            telefone: telefone || "",
            celular: celular || "",
          }}
          setFuncs={{ setEmail, setTelefone, setCelular }}
          setAtualizarDados={setAtualizarDados}s
        />
      )}

      {modalState.modalAdress && (
        <ModalAdress
          onClose={() => closeModal("modalAdress")}
          isOpen={modalState.modalAdress}
          initialData={{
            cep: cep || "",
            endereco: endereco || "",
            numero: numero || "",
            complemento: complemento || "",
            bairro: bairro || "",
            cidade: cidade || "",
            uf: uf || "",
          }}
          setFuncs={{ setCep, setEndereco, setNumero, setComplemento, setBairro, setCidade, setUf }}
        />
      )}

      {modalState.modalSecurity && (
        <ModalSecurity
          onClose={() => closeModal("modalSecurity")}
          isOpen={modalState.modalSecurity}
          />
        )}
    </>
  );
}

export default DadosConta;
