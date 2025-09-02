/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import styles from './styles.module.css';
import { useEffect, useState, useContext, useCallback } from "react";
import ModalInfo from "./componentes/modalInfo";
import ModalPersonal from "./componentes/modalPersonal";
import ModalSecurity from "./componentes/modalSecurity";
import { BackscreenContext, useLoader } from "../../../../context";
import { useAtom } from "jotai";
import { idAtom } from "../../../../context/jotai";
import { carregarInfos } from '../../../../db/carregarGeral.jsx';

export const conteudo = {
    //-----------Dados Profissionais -----------//
    nome: "Dr. João Silva Santos",
    crm: "12345-SP",
    especialidade: "Cardiologia",
    email: "joao.silva@exemplo.com",
    telefone: "(11) 3456-7890",
    celular: "(11) 98765-4321",

    //-----------Dados Pessoais -----------//
    cpf: "123.456.789-00",
    cep: "01234-567",
    uf: "SP",
    cidade: "São Paulo",
    endereco: "Rua das Flores",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
}

function DadosRepresentante() {
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
  const { showLoader, hideLoader } = useLoader();
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [token] = useAtom(idAtom);
  
  //---------------Dados Profissionais---------------//
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  
  //---------------Dados Pessoais---------------//
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  
  const [modalState, setModalState] = useState({
    modalInfo: false,
    modalPersonal: false,
    modalSecurity: false,
  });
  const [atualizarDados, setAtualizarDados] = useState(false);
  const [activeTab, setActiveTab] = useState('prof');

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  }, [modalState, hideBackscreen]);

  function carregarDados(dados) {
    try {
        const resp = JSON.parse(dados)[0];
        if (!resp) return;

        const fieldMappings = {
            nome: setNome,
            crm: setCrm,
            especialidade: setEspecialidade,
            email: setEmail,
            telefone: setTelefone,
            celular: setCelular,
            cpf: setCpf,
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
        tabela: 'VW_SITE_DADOS_REPRESENTANTE',
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
            <i className="fas fa-user-md"></i>
            Dados do Representante
          </h2>
          <p className={styles.pageDescription}>
            Consulte e atualize os dados profissionais e pessoais.
          </p>
        </div>
        
        <div className={styles.contentWrapper}>
          <div className={styles.cardsGrid}>
            <TabContent
              id="prof"
              title="Informações Profissionais"
              icon="fas fa-briefcase"
              isActive={activeTab === 'prof'}
              onTabClick={setActiveTab}
              onEdit={() => openModal('modalInfo')}
            >
              <InfoField label="Nome:" value={nome || conteudo.nome} />
              <InfoField label="CRM:" value={crm || conteudo.crm} />
              <InfoField label="Especialidade:" value={especialidade || conteudo.especialidade} />
              <InfoField label="E-mail:" value={email || conteudo.email} />
              <InfoField label="Telefone:" value={telefone || conteudo.telefone} />
              <InfoField label="Celular:" value={celular || conteudo.celular} />
            </TabContent>

            <TabContent
              id="pess"
              title="Informações Pessoais"
              icon="fas fa-user"
              isActive={activeTab === 'pess'}
              onTabClick={setActiveTab}
              onEdit={() => openModal('modalPersonal')}
            >
              <InfoField label="CPF:" value={cpf || conteudo.cpf} />
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
              <InfoField label="Senha:" value="******" />
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
            crm: crm || "",
            especialidade: especialidade || "",
            email: email || "",
            telefone: telefone || "",
            celular: celular || "",
          }}
          setFuncs={{ setNome, setCrm, setEspecialidade, setEmail, setTelefone, setCelular }}
          setAtualizarDados={setAtualizarDados}
        />
      )}

      {modalState.modalPersonal && (
        <ModalPersonal
          onClose={() => closeModal("modalPersonal")}
          isOpen={modalState.modalPersonal}
          initialData={{
            cpf: cpf || "",
            cep: cep || "",
            endereco: endereco || "",
            numero: numero || "",
            complemento: complemento || "",
            bairro: bairro || "",
            cidade: cidade || "",
            uf: uf || "",
          }}
          setFuncs={{ setCpf, setCep, setEndereco, setNumero, setComplemento, setBairro, setCidade, setUf }}
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

export default DadosRepresentante;