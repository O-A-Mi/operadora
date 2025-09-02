"use client";

import React from "react";
import { useContext, useMemo } from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router";
import { jsonRoute } from "../../utils/json";
import { useModal, UsuarioContext } from "../../context";
import PoliticaDePrivacidade from "../../mocks/politicaDePrivacidade";
import TermosDeServico from "../../mocks/termosDeServico";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../context/jotai";
import { link } from "../../mocks/links";
import logo from "/img/logoBranco.png";
import ModalText from "../ModalText";



const TermsLinks = ({ openModal }) => (
  <section className={`${styles.footerSection} ${styles.TermsLinks}`}>
    <h2 className={styles.sectionTitle}>Termos</h2>
    <nav className={styles.sectionList}>
      <button
        className={styles.linkButton}
        onClick={() =>
          openModal("modalTexto", {
            titulo: "Termos de Serviço",
            texto: TermosDeServico,
          })
        }
      >
        Termos de uso
      </button>
      <button
        className={styles.linkButton}
        onClick={() =>
          openModal("modalTexto", {
            titulo: "Política de Privacidade",
            texto: PoliticaDePrivacidade,
          })
        }
      >
        Política de privacidade
      </button>
    </nav>
  </section>
);

const SocialButton = ({ icon, text, link }) => (
  <button
    className={styles.linkButton}
    onClick={() => window.open(link, "_blank")}
  >
    <span className={styles.socialIcon}>
      <i className={`fa-brands fa-${icon}`}></i>
    </span>
    <span className={styles.socialText}>{text}</span>
  </button>
);

const SocialLinks = () => (
  <section className={`${styles.footerSection} ${styles.SocialLinks}`}>
    <h2 className={styles.sectionTitle}>Redes Sociais</h2>
    <nav className={styles.sectionList}>
      {/* <SocialButton
        icon="instagram"
        text="Instagram"
        link="https://www.instagram.com/dr.hoje/"
      />
      <SocialButton
        icon="facebook"
        text="Facebook"
        link="https://www.facebook.com/doctorHoje"
      />
      <SocialButton
        icon="linkedin"
        text="LinkedIn"
        link="https://br.linkedin.com/company/doutor-hoje"
      /> */}
    </nav>
  </section>
);

const ContactInfo = () => (
  <section className={`${styles.footerSection} ${styles.ContactInfo}`}>
    <h2 className={styles.sectionTitle}>Central de atendimento</h2>
    {/* <p className={styles.contactDetails}>
      Brasília: (61) 3221-5350
      <br />
      Outras localidades: 0800 000 3507
      <br />
      E-mail: contato@doutorhoje.com.br
    </p>
    <p className={styles.schedule}>
      Atendimento de segunda a sexta, das 8h às 18h.
    </p>
    <div className={styles.whatsappWrapper}>
      <SocialButton icon="whatsapp" text="Whatsapp" link={link.whatsapp} />
    </div> */}
  </section>
);

export default function FooterPadrao() {
  const navigate = useNavigate();

  const userInfo = useAtomValue(userInfoAtom);
  const userType = useMemo(() => userInfo?.tipo_usuario, [userInfo]);

  const { openModal, closeModal, isModalOpen, modalContent } = useModal();
  const { usuarioLogado } = useContext(UsuarioContext);

  const handleNavigate = (link) => {
    navigate(link, { replace: true });
  };

  return (
    <>
      <footer className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerDivider}>
            <div className={`${styles.footerLogoField} ${styles.FooterLogo}`}>
              <img className={styles.img} src={logo} alt="logo branca" />
            </div>
            <TermsLinks openModal={openModal} />
            <SocialLinks />
            <ContactInfo />
          </div>
        </div>
      </footer>
      {isModalOpen("modalTexto") && (
        <ModalText
          closeModal={() => closeModal("modalTexto")}
          title={modalContent.titulo}
          text={modalContent.texto}
        />
      )}
    </>
  );
}
