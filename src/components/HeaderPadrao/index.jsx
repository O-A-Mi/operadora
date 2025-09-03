import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { UsuarioContext, BackscreenContext, useLoader, useModal } from '../../context';
import { jsonRoute } from "../../utils/json.js";
import { getBaseConfig } from '../../utils/utilsConfig.js';
import styles from './styles.module.css';
import Carrinho from './components/Carrinho';
import ModalAlterarSenha from './components/modalAlterarSenha.jsx';
import ModalAlterarFoto from './components/ModalAlterarFoto/modalAlterarFoto.jsx';
import ModalAlterarStatus from './components/modalAlterarStatus.jsx';
import { carregarInfos, carregarLinks } from '../../db/carregarGeral.jsx';
import dialogMessage from '../../assets/dialog-ui/dialog.jsx';
import toastMessage from '../../assets/toast-ui/toast.js';
import logoBranco2 from '/svg/logo_operadora.png';
import { useDarkReader } from '../../context/darkReaderContext';
import { useAtomValue, useAtom } from 'jotai';
import { nomeAtom, tipoUsuarioAtom, fotoPerfilAtom, assinaturaListaAtom, permissoesFormatadasAtom, permissoesOrdemAtom, tokenClienteAtom, cpfcnpjAtom } from '../../context/jotai';
import DarkReaderToggleButton from '../DarkReaderToggleButton';
import HamburguerMenu from '../hamburguerMenu';
import { useProfile } from '../../context/ProfileContext';

const LoggedUserMenu = ({
  listaAssinaturas, 
  assinaturaSelecionada, 
  handleNavigate, 
  fazerLogout, 
  toggleSubMenu, 
  MarcarAssinatura,
  toggleMenu,
  toggleCarrinho,
  listaCarrinho,
  showCarrinho,
  menuRef,
  buttonRef,
  isMenuOpen,
  isSubMenuOpen,
  showLoader,
  hideLoader,
  isMobile,
  onMenuOpen
}) => {
  const [tokenCliente] = useAtom(tokenClienteAtom)
  const [tipoUsuario] = useAtom(tipoUsuarioAtom);
  const [cpf] = useAtom(cpfcnpjAtom);
  const [nome] = useAtom(nomeAtom);
  const [fotoPerfil] = useAtom(fotoPerfilAtom);
  const {baselink, endpoints} = getBaseConfig();
  const {openModal, closeModal, isModalOpen } = useModal();

  useEffect(() => {
    window.retornoTelemedicina = retornoTelemedicina;
    return () => {
      delete window.retornoTelemedicina;
    };
  }, []);

  useEffect(() => {
    try {
      const dot = document.getElementById('user-status-dot');
      const saved = localStorage.getItem('userStatus');
      if (dot) {
        if (saved === 'online') {
          dot.classList.add(styles.statusDotAtivo);
          dot.classList.remove(styles.statusDotInativo);
        } else {
          dot.classList.add(styles.statusDotInativo);
          dot.classList.remove(styles.statusDotAtivo);
        }
      }
      const listener = (e) => {
        if (!['P'].includes(tipoUsuario)) return;
        const s = e?.detail?.status;
        const currentDot = document.getElementById('user-status-dot');
        if (!currentDot) return;
        if (s === 'online') {
          currentDot.classList.add(styles.statusDotAtivo);
          currentDot.classList.remove(styles.statusDotInativo);
        } else {
          currentDot.classList.add(styles.statusDotInativo);
          currentDot.classList.remove(styles.statusDotAtivo);
        }
      };
      window.addEventListener('userStatusChanged', listener);
      return () => window.removeEventListener('userStatusChanged', listener);
    } catch {}
  }, [tipoUsuario]);

  const consultarTelemedicina = () => {
    showLoader();
    const paramsTelemedicina = {
      idcontratante: tokenCliente,
      idcontrato: assinaturaSelecionada.token_proposta,
      cpf: cpf,
      tipobeneficiario: tipoUsuario
    };
    carregarLinks('telemedicina', `${baselink}${endpoints.consultarTelemedicina}`, paramsTelemedicina, 'retornoTelemedicina');
  };

  const retornoTelemedicina = (retorno) => {
    try {
      const resp = JSON.parse(retorno);

      if (resp.link) {
        toastMessage('Redirecionando para Telemedicina', 'success');
        window.open(resp.link, '_blank');
      } else {
        dialogMessage(resp.mensagem || 'Não foi possível redirecionar para Telemedicina', 'warning', { confirmButton: false });
      }
    } catch (error) {
      console.error("Erro ao parsear resposta de telemedicina:", error);
      dialogMessage("Erro ao carregar dados da telemedicina.", "error", { confirmButton: false });
    } finally {
      hideLoader();
    }
  };

  const prontoAtendimentoPermitido = () => {
    try {
      const listaDeProdutos = JSON.parse(assinaturaSelecionada?.sub_produto || '[]');
      return listaDeProdutos.some((produto) => produto.modo_at === 'P');
    } catch (error) {
      console.error('Erro ao analisar sub_produto:', error);
      return false;
    }
  };

   const { profileImage } = useProfile();
   const [currentProfileImage, setCurrentProfileImage] = useState(fotoPerfil);

  useEffect(() => {

    if (profileImage) {
      setCurrentProfileImage(profileImage);
    }
  }, [profileImage]);

  return (
    <>
      {(['S', 'D'].includes(tipoUsuario) && prontoAtendimentoPermitido()) && (
        <nav className={styles.headerNavbar}>
          <li className={styles.headerNavbarItem}>
            <button 
              className={styles.headerNavbarButton} 
              onClick={() => consultarTelemedicina()}
            >
              <i className="fas fa-clock"></i>
              <span>Pronto Atendimento Online 24h</span>
            </button>
          </li>
        </nav>
      )}

      <HamburguerMenu 
        menuItems={[
          { icon: "fas fa-lock", label: "Alterar senha", action: "alterarSenha" },
          ...(['P'].includes(tipoUsuario) ? [
            { icon: 'fas fa-circle', label: 'Alterar status', action: 'alterarStatus' }
          ] : []),
          { icon: "fas fa-sign-out-alt", label: "Sair da conta", action: "logout" }
        ]}
        isMobile={isMobile}
        onItemClick={(action) => {
          if (action === "alterarSenha") {
            openModal("modalAlterarSenha");
          } else if (action === 'alterarStatus') {
            openModal('modalAlterarStatus');
          } else if (action === "logout") {
            fazerLogout(jsonRoute.Cliente_Home);
          } else if (typeof action === "string" && action.startsWith("/")) {
            handleNavigate(action);
          }
        }}
        onModuleClick={(module) => {
          const currentPath = window.location.pathname;
          if (currentPath.includes(jsonRoute.AreaOperadora)) {
            window.dispatchEvent(new CustomEvent('moduleClick', { detail: { module } }));
          }
        }}
        onMenuOpen={onMenuOpen}
      />

      <menu
        className={`${styles.headerMenu} ${styles.logged} ${isMenuOpen ? styles.headerMenuActive : ''}`}
        id="header-menu"
        ref={menuRef}
        style={{ maxHeight: isSubMenuOpen ? '-webkit-fill-available' : '' }}
      >
        {['R'].includes(tipoUsuario) && (
          <ul className={styles.headerMenuUserOptions}>
            <li className={styles.headerMenuItem} tabIndex="0" onClick={() => openModal("modalAlterarSenha")}>  
              <span>Alterar Senha</span>
              
            </li>
            <li className={styles.headerMenuItem} tabIndex="0" onClick={() => openModal("modalAlterarFoto")}>
              <span>Alterar foto</span>
            </li>
            <li className={styles.headerMenuItem} tabIndex="0" onClick={() => fazerLogout(jsonRoute.Consultor_Login)}>
              <span>Sair da conta</span>
              
            </li>
          </ul>
        )}
        {['E'].includes(tipoUsuario) && (
          <>
            {isSubMenuOpen && (
              <ul className={styles.headerSubMenuContainer}>
                <li className={styles.closeSubMenu} tabIndex="0" onClick={toggleSubMenu}>
                  <span>Voltar</span>
                </li>
                <li className={styles.headerSubMenu}>
                  {listaAssinaturas.map((item) => (
                    <label
                      key={item.token_proposta}
                      className={`${styles.headerSubMenuItens} ${assinaturaSelecionada.token_proposta === item.token_proposta ? styles.active : ''}`}
                      onClick={() => MarcarAssinatura(item)}
                    >
                      <p className={styles.headerSubMenuItensText}>
                        {assinaturaSelecionada.token_proposta === item.token_proposta ? "Assinatura Selecionada" : "Selecionar Assinatura"}
                      </p>
                      <div className={styles.headerSubMenuItensBox}>
                        <p dangerouslySetInnerHTML={{ __html: `<span>${item.plano.replace('Saúde', 'Saúde <strong>') + '</strong>'} <br><sub>(${item.referencia})</sub></span>` }} style={{ gap: '0.35rem' }}></p>
                        <input
                          type="radio"
                          className={styles.headerSubMenuInput}
                          checked={assinaturaSelecionada.token_proposta === item.token_proposta}
                          readOnly
                        />
                      </div>
                    </label>
                  ))}
                </li>
              </ul>
            )}
            <li className={styles.headerMenuItem} tabIndex="0" onClick={() => handleNavigate(jsonRoute.Empresarial_Area)}>
              <span>Minha conta</span>
            </li>
            <li className={styles.headerMenuItem} tabIndex="0" onClick={toggleSubMenu}>
              <span>Alterar assinatura</span>
            </li>
            <li className={styles.headerMenuItem} tabIndex="0" onClick={() => fazerLogout(jsonRoute.Operadora_Login)}>
              <span>Sair da conta</span>
            </li>
          </>
        )}
        {['S', 'D'].includes(tipoUsuario) && (
          <>
            {isSubMenuOpen && (
              <ul className={styles.headerSubMenuContainer}>
                <li className={styles.closeSubMenu} tabIndex="0" onClick={toggleSubMenu}>
                  <span>Voltar</span>
                </li>
                <li className={styles.headerSubMenu}>
                  {listaAssinaturas.map((item) => (
                    <label
                      key={item.token_proposta}
                      className={`${styles.headerSubMenuItens} ${assinaturaSelecionada.token_proposta === item.token_proposta ? styles.active : ''}`}
                      onClick={() => MarcarAssinatura(item)}
                    >
                      <p className={styles.headerSubMenuItensText}>
                        {assinaturaSelecionada.token_proposta === item.token_proposta ? "Assinatura Selecionada" : "Selecionar Assinatura"}
                      </p>
                      <div className={styles.headerSubMenuItensBox}>
                        <p dangerouslySetInnerHTML={{ __html: `<span>${item.plano.replace('Saúde', 'Saúde <strong>') + '</strong>'} <br><sub>(${item.referencia})</sub></span>` }} style={{ gap: '0.35rem' }}></p>
                        <input
                          type="radio"
                          className={styles.headerSubMenuInput}
                          checked={assinaturaSelecionada.token_proposta === item.token_proposta}
                          readOnly
                        />
                      </div>
                    </label>
                  ))}
                </li>
              </ul>
            )}
            <li className={styles.headerMenuItem} tabIndex="0" onClick={() => handleNavigate(jsonRoute.Cliente_Area)}>
              <span>Minha conta</span>
            </li>
            <li className={styles.headerMenuItem} tabIndex="0" onClick={toggleSubMenu}>
              <span>Alterar assinatura</span>
            </li>
            <li className={styles.headerMenuItem} tabIndex="0" onClick={() => fazerLogout(jsonRoute.Cliente_Home)}>
              <span>Sair da conta</span>
            </li>
          </>
        )}
        {['P'].includes(tipoUsuario) && (
          <>
            <ul className={styles.headerMenuUserOptions}>
              <li className={styles.headerMenuItem} tabIndex="0" onClick={() => openModal('modalAlterarStatus')}>
                <span>Alterar status</span>
              </li>
              <li className={styles.headerMenuItem} tabIndex="0" onClick={() => openModal('modalAlterarSenha')}>
                <span>Alterar Senha</span>
              </li>
              <li className={styles.headerMenuItem} tabIndex="0" onClick={() => fazerLogout(jsonRoute.Representante_Login)}>
                <span>Sair da conta</span>
              </li>
            </ul>
          </>
        )}
      </menu>

      <div className={styles.headerUserButtonMenu}>
        <li className={`${styles.headerUserButton} ${styles.headerUserMenuButton}`}>
          <button
            className={styles.headerMenuButton}
            id="header-user-button"
            onClick={toggleMenu}
            ref={buttonRef}
          >
            <span className={styles.profileImageWrapper}>
               <img 
              className={styles.profileImage} 
              src={currentProfileImage} 
              alt={nome} 
            />
            {['P'].includes(tipoUsuario) && (
              <span id="user-status-dot" className={`${styles.statusDot} ${styles.statusDotInativo}`}></span>
            )}
            </span>
            <span>{nome}</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </li>
        {showCarrinho && ['S'].includes(tipoUsuario) && (
          <li className={`${styles.headerUserButton} ${styles.headerShoppingButton}`}>
            <button className={styles.headerMenuButton} onClick={toggleCarrinho}>
              <i className="fas fa-cart-shopping"></i>
              {listaCarrinho.length > 0 && (
                <span className={styles.carrinhoCount}><strong>{listaCarrinho.length}</strong></span>
              )}
            </button>
          </li>
        )}
      </div>
    </>
  );
};

const GuestUserMenu = ({ handleNavigate, showLogin, isMobile, onMenuOpen }) => {
  const location = useLocation();
  const [selectedArea, setSelectedArea] = useState(() => {
    const pathname = location.pathname;
    if (pathname.includes(jsonRoute.Operadora_Login)) return 'operadora';
    if (pathname.includes(jsonRoute.Cliente_login)) return 'cliente';
    if (pathname.includes(jsonRoute.Beneficiario_Login)) return 'beneficiario';
    if (pathname.includes(jsonRoute.Representante_Login)) return 'representante';
    return null;
  });

  const handleAreaClick = (area, route) => {
    setSelectedArea(area);
    handleNavigate(route);
    if (isMobile && onMenuOpen) {
      onMenuOpen();
    }
  };

  const areaMenuItems = [
    {
      icon: "fas fa-building",
      label: "Operadora",
      action: "area",
      area: "operadora",
      route: jsonRoute.Operadora_Login
    },
    {
      icon: "fas fa-user",
      label: "Área do Cliente",
      action: "area",
      area: "cliente",
      route: jsonRoute.Cliente_login
    },
    {
      icon: "fas fa-users",
      label: "Área do Beneficiário",
      action: "area",
      area: "beneficiario",
      route: jsonRoute.Beneficiario_Login
    },
    {
      icon: "fas fa-user-md",
      label: "Área do Representante",
      action: "area",
      area: "representante",
      route: jsonRoute.Representante_Login
    }
  ];

  return (
    <>
      {isMobile && (
        <HamburguerMenu 
          menuItems={areaMenuItems}
          isMobile={isMobile}
          showModules={false}
          onItemClick={(item) => {
            if (item.action === "area") {
              handleAreaClick(item.area, item.route);
            }
          }}
          onMenuOpen={onMenuOpen}
        />
      )}
      
      <menu className={`${styles.headerMenu} ${styles.guestMenu}`}>
        <li 
          className={`${styles.headerMenuItem} ${selectedArea === 'operadora' ? styles.headerMenuItemActive : ''}`} 
          tabIndex="0" 
          onClick={() => handleAreaClick('operadora', jsonRoute.Operadora_Login)}
        >
          <span>Operadora</span>
        </li>
        <li 
          className={`${styles.headerMenuItem} ${selectedArea === 'cliente' ? styles.headerMenuItemActive : ''}`} 
          tabIndex="0" 
          onClick={() => handleAreaClick('cliente', jsonRoute.Cliente_login)}
        >
          <span>Área do Conta</span>
        </li>
        <li 
          className={`${styles.headerMenuItem} ${selectedArea === 'beneficiario' ? styles.headerMenuItemActive : ''}`} 
          tabIndex="0" 
          onClick={() => handleAreaClick('beneficiario', jsonRoute.Beneficiario_Login)}
        >
          <span>Área do Beneficiário</span>
        </li>
        <li 
          className={`${styles.headerMenuItem} ${selectedArea === 'representante' ? styles.headerMenuItemActive : ''}`} 
          tabIndex="0" 
          onClick={() => handleAreaClick('representante', jsonRoute.Representante_Login)}
        >
          <span>Área do Consultor</span>
        </li>
      </menu>
    </>
  );
};

export default function HeaderPadrao({ onMenuOpen }) {
  const { enabled: drEnabled } = useDarkReader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { usuarioLogado } = useContext(UsuarioContext);
  const { handleLogout: contextLogout } = useContext(UsuarioContext);
  const { showBackscreen, hideBackscreen } = useContext(BackscreenContext);
  const { showLoader, hideLoader } = useLoader();
  const { closeModal, isModalOpen, openModal } = useModal();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  // Corrigir tipoUsuario para pegar do jotai
  const [tipoUsuario] = useAtom(tipoUsuarioAtom);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

const fazerLogout = (rotaDestino) => {
  showLoader && showLoader();
  contextLogout(navigate, rotaDestino);
};

  useEffect(() => {
    if (!usuarioLogado) {
      setIsMenuOpen(false);
      setIsSubMenuOpen(false);
    }
  }, [usuarioLogado]);

  const handleMenuPosition = useCallback(() => {
    if (!menuRef.current || !buttonRef.current) return;
    if (window.innerWidth >= 768) {
      const ButtonReferencia = buttonRef.current.getBoundingClientRect();
      menuRef.current.style.top = `${ButtonReferencia.top + ButtonReferencia.height}px`;
      menuRef.current.style.right = `${window.innerWidth - ButtonReferencia.right}px`;
    } else {
      menuRef.current.style.top = 'calc(var(--header-height) + 1px)';
      menuRef.current.style.right = '0px';
    }
  }, []);

  const toggleMenu = useCallback(() => {
    handleMenuPosition();
    setIsMenuOpen(prev => !prev);
  }, [handleMenuPosition]);

  const toggleCarrinho = useCallback(() => {
    setIsCarrinhoOpen(true);
    showBackscreen();
  }, [showBackscreen]);

  const closeCarrinho = useCallback(() => {
    setIsCarrinhoOpen(false);
    hideBackscreen();
  }, [hideBackscreen]);

  const toggleSubMenu = useCallback(() => {
    const event = new Event("resize");
    window.dispatchEvent(event);
    document.querySelectorAll(`.${styles.headerMenuItem}`).forEach((item) => {
      item.classList.toggle(styles.menuHidden);
    });
    setIsSubMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    let timeOutFunctionId;
    const resizeHandler = () => {
      clearTimeout(timeOutFunctionId);
      timeOutFunctionId = setTimeout(handleMenuPosition, 500);
    };
    window.addEventListener("resize", resizeHandler);
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.headerSubMenuContainer}`)
      ) {
        setIsMenuOpen(false);
        setIsSubMenuOpen(false);
        document.querySelectorAll(`.${styles.headerMenuItem}`).forEach((item) => {
          if (item.classList.contains(styles.menuHidden)) {
            item.classList.remove(styles.menuHidden);
          }
        });
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, handleMenuPosition]);

  useEffect(() => {
    setIsMenuOpen(false);
    const headerBtn = document.getElementById("header-responsive-btn");
    if (headerBtn) headerBtn.checked = false;
    setTimeout(() => {
      const root = document.getElementById('root');
      if (root) root.scrollTo(0, 0);
    });
    if(location.pathname.toLowerCase().includes('login')){
      setShowLogin(false);
    } else{
      setShowLogin(true);
    }
  }, [location]);

  const handleNavigate = useCallback((link, options) => {
    showLoader();
    const headerBtn = document.getElementById("header-responsive-btn");
    if (headerBtn && headerBtn.checked) {
        headerBtn.checked = false;
        setIsMenuOpen(false);
    }
    if (isSubMenuOpen) {
        toggleSubMenu();
    }
    navigate(link, options);
  }, [navigate, isSubMenuOpen, toggleSubMenu, setIsMenuOpen]);

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <figure className={styles.headerImageField} >
            <img 
              src={drEnabled ? logoBranco2 : logoBranco2} alt="Logo"
              className={styles.logoOperadora}
            />
          </figure>
          {/* {usuarioLogado && (
            <>
              <div className={styles.headerThemeButtonContainer}>
                <DarkReaderToggleButton iconOnly />
              </div>
            </>
          )} */}
          {usuarioLogado ? (
            <LoggedUserMenu
              handleNavigate={handleNavigate}
              fazerLogout={fazerLogout}
              toggleSubMenu={toggleSubMenu}
              toggleMenu={toggleMenu}
              toggleCarrinho={toggleCarrinho}
              menuRef={menuRef}
              buttonRef={buttonRef}
              isMenuOpen={isMenuOpen}
              isSubMenuOpen={isSubMenuOpen}
              showLoader={showLoader}
              hideLoader={hideLoader}
              isMobile={isMobile}
              onMenuOpen={onMenuOpen}
            />
          ) : (
            <GuestUserMenu handleNavigate={handleNavigate} showLogin={showLogin} isMobile={isMobile} onMenuOpen={onMenuOpen} />
          )}
        </div>
      </header>

      {isModalOpen('modalInfo') && (
        <ModalInfo
          onClose={() => closeModal("modalInfo")}
        />
      )}
      {isModalOpen('modalAlterarSenha') && (
        <ModalAlterarSenha
          closeModal={() => closeModal("modalAlterarSenha")}
        />
      )}
      {isModalOpen('modalAlterarStatus') && (
        <ModalAlterarStatus
          closeModal={() => closeModal('modalAlterarStatus')}
        />
      )}

       {isModalOpen('modalAlterarFoto') && (
        <ModalAlterarFoto
          closeModal={() => closeModal("modalAlterarFoto")}
        />
      )}

      {['S'].includes(tipoUsuario) && (
        <Carrinho isOpen={isCarrinhoOpen} closeCarrinho={closeCarrinho} />
      )}
    </>
  );
}