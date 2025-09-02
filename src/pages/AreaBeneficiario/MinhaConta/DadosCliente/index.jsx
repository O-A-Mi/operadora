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

export const conteudo = {
    //-----------Dados Cliente -----------//
    nome:"fabricio", 
    cpf:"440.000.000-02", 
    genero:"Masculino", 
    dataDeNascimento:"04/01/2005", 

    //-----------Dados Endereço -----------//
    cep:"99999-999", 
    uf:"SP", 
    cidade:"Taubate", 
    endereco:"rua bananeiras", 
    numero:"04", 
    complemento:"Casa", 
    bairro:"Campos alemão", 

}

function Dados_do_Beneficiario() {
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
  const { showLoader, hideLoader } = useLoader();
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [token] = useAtom(idAtom);
  const [activeTab, setActiveTab] = useState('info');

  //---------------Dados Cliente---------------//
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  //---------------Dados endereço---------------//
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
            nome: setNome,
            cpf: setCpf,
            genero: setGenero,
            dataDeNascimento: setDataDeNascimento,
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

  // useEffect(() => {
  //   window.carregarDados = carregarDados;
    
  //   const params = {
  //       campo: '*',
  //       tabela: 'VW_SITE_DADOS_ESTABELECIMENTO',
  //       condicao: `TOKEN = '${token}'`
  //   };

  //   carregarInfos('carregarDados', params, 'carregarDados');
    
  //   return () => delete window.carregarDados;
  // }, [atualizarDados]);

  const InfoField = ({ label, value }) => {
    return (
      <div className={styles.infoField}>
        <div className={styles.infoLabel}>{label}</div>
        <div className={styles.infoValue}>{value}</div>
      </div>
    );
  };

  const TabContent = ({ id, title, icon, children, onEdit, isActive, onTabClick }) => {
    return (
      <div className={styles.tabContainer}>
        {mobile && (
          <button
            className={`${styles.mobileTabHeader} ${isActive ? styles.active : ''}`}
            onClick={() => onTabClick(id)}
            type="button"
          >
            <div className={styles.tabHeaderLeft}>
              <i className={icon}></i>
              <span>{title}</span>
            </div>
            <i className={`fas fa-chevron-${isActive ? 'up' : 'down'}`}></i>
          </button>
        )}

        <div className={`${styles.tabContent} ${!mobile || isActive ? styles.expanded : ''}`}>
          {!mobile && (
            <div className={styles.desktopCardHeader}>
              <h3 className={styles.cardTitle}>
                <i className={icon}></i>
                {title}
              </h3>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
              >
                Alterar <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}

          <div className={styles.cardContent}>
            {children}
          </div>

          {mobile && (
            <button
              className={styles.mobileEditButton}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit();
              }}
            >
              Alterar <i className="fas fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <main className={styles.dadosContaContainer}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>
            <i className="fas fa-user"></i>
            Dados do Beneficiário
          </h2>
          <p className={styles.pageDescription}>
            Consulte e atualize os seus dados.
          </p>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.cardsGrid}>
            <TabContent
              id="info"
              title="Informações do Beneficiário"
              icon="fas fa-user"
              isActive={activeTab === 'info'}
              onTabClick={setActiveTab}
              onEdit={() => openModal('modalInfo')}
            >
              <InfoField label="Nome:" value={nome || conteudo.nome} />
              <InfoField label="CPF:" value={cpf || conteudo.cpf} />
              <InfoField label="Gênero:" value={genero || conteudo.genero} />
              <InfoField label="Data de nascimento:" value={dataDeNascimento || conteudo.dataDeNascimento} />
              <InfoField label="E-mail:" value={email || conteudo.email} />
              <InfoField label="Telefone:" value={telefone || conteudo.telefone} />
              <InfoField label="Celular:" value={celular || conteudo.celular} />
            </TabContent>

            <TabContent
              id="end"
              title="Endereço"
              icon="fas fa-map-marker-alt"
              isActive={activeTab === 'end'}
              onTabClick={setActiveTab}
              onEdit={() => openModal('modalAdress')}
            >
              <InfoField label="CEP:" value={cep || conteudo.cep} />
              <InfoField label="UF:" value={uf || conteudo.uf} />
              <InfoField label="Cidade:" value={cidade || conteudo.cidade} />
              <InfoField label="Endereço:" value={endereco || conteudo.endereco} />
              <InfoField label="Número:" value={numero || conteudo.numero} />
              <InfoField label="Complemento:" value={complemento || conteudo.complemento} />
              <InfoField label="Bairro/Distrito:" value={bairro || conteudo.bairro} />
            </TabContent>

            <TabContent
              id="seg"
              title="Segurança"
              icon="fas fa-shield-alt"
              isActive={activeTab === 'seg'}
              onTabClick={setActiveTab}
              onEdit={() => openModal('modalSecurity')}
            >
              <InfoField label="Senha:" value={"******"} />
            </TabContent>
          </div>
        </div>
      </main>

      {modalState.modalInfo && (
        <ModalInfo
          onClose={() => closeModal("modalInfo")}
          isOpen={modalState.modalInfo}
          initialData={{
            nome: nome || "",
            cpf: cpf || "",
            genero: genero || "",
            dataDeNascimento: dataDeNascimento || "",
            email: email || "",
            telefone: telefone || "",
            celular: celular || "",
          }}
          setFuncs={{ setEmail, setTelefone, setCelular }}
          setAtualizarDados={setAtualizarDados}
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

export default Dados_do_Beneficiario;
