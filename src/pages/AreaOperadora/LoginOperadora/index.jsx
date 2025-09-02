import styles from "./styles.module.css";
import Empresarial_Login_PNG from "/img/Empresarial_Login.png";
import { jsonRoute } from "../../../utils/json";
import { useContext, useEffect } from "react";
import { UsuarioContext, useLoader, useModal } from "../../../context";
import { useLocation, useNavigate } from "react-router";
import LoginForm from "./components/LoginForm";
import ModalPasswordRecovery from "../../../components/ModalPasswordRecovery";
import ModalText from "../../../components/ModalText";

const Operadora_Login = () => {
  const { openModal, closeModal, isModalOpen, modalContent } = useModal();
  const { usuarioLogado } = useContext(UsuarioContext);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    hideLoader();
  }, [location]);

  useEffect(() => {
    if (usuarioLogado && jsonRoute && jsonRoute.AreaOperadora) {
      navigate(`/${jsonRoute.AreaOperadora}`, { replace: true });
    }
  }, [usuarioLogado, jsonRoute, navigate]);

  const root = document.getElementById("root");

  useEffect(() => {
    hideLoader();
    const formColumn = document.querySelector(`.${styles.formColumn}`);

    if (formColumn) {
      if (window.innerHeight < formColumn.offsetHeight) {
        root.style.overflowY = "auto";
        root.style.overflowX = "hidden";
      } else {
        root.style.overflowY = "hidden";
        root.style.overflowX = "hidden";
      }
    }

    root.scrollTo(0, 0);

    return () => {
      root.style.overflow = "auto";
      root.style.overflowX = "auto";
      root.style.overflowY = "auto";
      root.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div className={styles.loginOperadoraContainer}>
        <div className={styles.loginOperadoraContent}>
          <div className={styles.formColumn}>
            <LoginForm
              openModal={openModal}
              showLoader={showLoader}
              hideLoader={hideLoader}
            />
          </div>
          <object className={styles.floatingBox} />
        </div>

        {isModalOpen("modalPasswordRecovery") && (
          <ModalPasswordRecovery
            closeModal={() => closeModal("modalPasswordRecovery")}
          />
        )}
        {isModalOpen("modalTexto") && (
          <ModalText
            closeModal={() => closeModal("modalTexto")}
            title={modalContent.titulo}
            text={modalContent.texto}
          />
        )}
      </div>
    </>
  );
};

export default Operadora_Login;
