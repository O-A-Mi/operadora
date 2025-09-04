import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../../../components';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

const Mensagens = ({ isMobile = false, currentStep }) => {
  const [smsAssociado, setSmsAssociado, smsAssociadoRef] = UseInputMask();
  const [smsSegurado, setSmsSegurado, smsSeguradoRef] = UseInputMask();
  const [smsDependente, setSmsDependente, smsDependenteRef] = UseInputMask();

  const [emailAssociado, setEmailAssociado, emailAssociadoRef] = UseInputMask();
  const [emailSegurado, setEmailSegurado, emailSeguradoRef] = UseInputMask();
  const [emailDependente, setEmailDependente, emailDependenteRef] = UseInputMask();

  const [mobileAssociado, setMobileAssociado, mobileAssociadoRef] = UseInputMask();
  const [mobileSegurado, setMobileSegurado, mobileSeguradoRef] = UseInputMask();
  const [mobileDependente, setMobileDependente, mobileDependenteRef] = UseInputMask();

  const [whatsappAssociado, setWhatsappAssociado, whatsappAssociadoRef] = UseInputMask();
  const [whatsappSegurado, setWhatsappSegurado, whatsappSeguradoRef] = UseInputMask();
  const [whatsappDependente, setWhatsappDependente, whatsappDependenteRef] = UseInputMask();

  const [hotlinkAssociado, setHotlinkAssociado, hotlinkAssociadoRef] = UseInputMask();
  const [hotlinkSegurado, setHotlinkSegurado, hotlinkSeguradoRef] = UseInputMask();
  const [hotlinkDependente, setHotlinkDependente, hotlinkDependenteRef] = UseInputMask();

  const mensagemOptions = [
    { value: 'NOTIFICAÇÃO - PROPOSTA', label: 'NOTIFICAÇÃO - PROPOSTA' },
    { value: 'CONFIRMAÇÃO - ADESÃO', label: 'CONFIRMAÇÃO - ADESÃO' },
    { value: 'LEMBRETE - PAGAMENTO', label: 'LEMBRETE - PAGAMENTO' },
    { value: 'CANCELAMENTO - PLANO', label: 'CANCELAMENTO - PLANO' }
  ];

  const hotlinkOptions = [
    { value: 'HTTP:/demonstracao.grupohermanos.com.br:8066/sge/assinaturaContratanteAD.jsp?id=P[CODIGO],12913', label: 'HTTP:/demonstracao.grupohermanos.com.br:8066/sge/assinaturaContratanteAD.jsp?id=P[CODIGO],12913' },
    { value: 'https://portal.exemplo.com.br/contrato', label: 'https://portal.exemplo.com.br/contrato' },
    { value: 'https://app.exemplo.com.br/adesao', label: 'https://app.exemplo.com.br/adesao' }
  ];

  const handleVisualizar = (tipo, campo) => {
    console.log(`Visualizando ${tipo} - ${campo}`);
  };



  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={`${styles.sectionTitle} ${styles.firstTitle}`}>
          <i className="fa-solid fa-comment-dots"></i>
          Mensagens
        </h3>

                 {/* SMS */}
         <div className={styles.communicationSection}>
                       <h4 className={styles.communicationTitle}>
              <i className="fa-solid fa-comment"></i>
              SMS
            </h4>
          <div className={styles.communicationRow}>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="sms-associado" 
                  label="Associado"
                  value={smsAssociado}
                  onChange={setSmsAssociado}
                  inputRef={smsAssociadoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  inputButtonRight={[
                      {
                          icon: 'fa-solid fa-eye',
                          text: 'Vizualizar',
                          onClick: () => alert('vizualizado!'),
                          tooltip: 'Clique para vizualizar',
                      },
                  ]}
                  gap={0}
                />
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="sms-segurado" 
                  label="Segurado"
                  value={smsSegurado}
                  onChange={setSmsSegurado}
                  inputRef={smsSeguradoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
             
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="sms-dependente" 
                  label="Dependente"
                  value={smsDependente}
                  onChange={setSmsDependente}
                  inputRef={smsDependenteRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                 ]}
                /> 
              </div>
            </div>
          </div>
        </div>

                 {/* Email */}
         <div className={styles.communicationSection}>
           <h4 className={styles.communicationTitle}>
             <i className="fa-solid fa-envelope"></i>
             Email
           </h4>
          <div className={styles.communicationRow}>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="email-associado" 
                  label="Associado"
                  value={emailAssociado}
                  onChange={setEmailAssociado}
                  inputRef={emailAssociadoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="email-segurado" 
                  label="Segurado"
                  value={emailSegurado}
                  onChange={setEmailSegurado}
                  inputRef={emailSeguradoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="email-dependente" 
                  label="Dependente"
                  value={emailDependente}
                  onChange={setEmailDependente}
                  inputRef={emailDependenteRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

                 {/* Mobile */}
         <div className={styles.communicationSection}>
           <h4 className={styles.communicationTitle}>
             <i className="fa-solid fa-mobile-alt"></i>
             Mobile
           </h4>
          <div className={styles.communicationRow}>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="mobile-associado" 
                  label="Associado"
                  value={mobileAssociado}
                  onChange={setMobileAssociado}
                  inputRef={mobileAssociadoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="mobile-segurado" 
                  label="Segurado"
                  value={mobileSegurado}
                  onChange={setMobileSegurado}
                  inputRef={mobileSeguradoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="mobile-dependente" 
                  label="Dependente"
                  value={mobileDependente}
                  onChange={setMobileDependente}
                  inputRef={mobileDependenteRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

                 {/* WhatsApp */}
         <div className={styles.communicationSection}>
           <h4 className={styles.communicationTitle}>
             <i className="fa-brands fa-whatsapp"></i>
             WhatsApp
           </h4>
          <div className={styles.communicationRow}>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="whatsapp-associado" 
                  label="Associado"
                  value={whatsappAssociado}
                  onChange={setWhatsappAssociado}
                  inputRef={whatsappAssociadoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />

              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="whatsapp-segurado" 
                  label="Segurado"
                  value={whatsappSegurado}
                  onChange={setWhatsappSegurado}
                  inputRef={whatsappSeguradoRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="whatsapp-dependente" 
                  label="Dependente"
                  value={whatsappDependente}
                  onChange={setWhatsappDependente}
                  inputRef={whatsappDependenteRef}
                  type='select'
                  options={mensagemOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                  inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hotlink */}
        <div className={styles.formSectionWithBorderTop}>
          <h3 className={styles.sectionTitle}>
            <i className="fa-solid fa-link"></i>
            Hotlink
          </h3>
          
                     <div className={styles.hotlinkSection}>
             <div className={styles.hotlinkRow}>
               <div className={styles.hotlinkColumn}>
                 <UseInputPadrao 
                   identifier="hotlink-associado" 
                   label="Associado"
                   value={hotlinkAssociado}
                   onChange={setHotlinkAssociado}
                   inputRef={hotlinkAssociadoRef}
                   type='text'
                   width={isMobile ? 100 : 100}
                   gap={0}
                 />
               </div>
             </div>
             
             <div className={styles.hotlinkRow}>
               <div className={styles.hotlinkColumn}>
                 <UseInputPadrao 
                   identifier="hotlink-segurado" 
                   label="Segurado"
                   value={hotlinkSegurado}
                   onChange={setHotlinkSegurado}
                   inputRef={hotlinkSeguradoRef}
                   type='text'
                   width={isMobile ? 100 : 100}
                   gap={0}
                   inputButtonRight={[
                    {
                        icon: 'fa-solid fa-eye',
                        text: 'Vizualizar',
                        onClick: () => alert('vizualizado!'),
                        tooltip: 'Clique para vizualizar',
                    },
                  ]}
                 />
               </div>
             </div>
             
             <div className={styles.hotlinkRow}>
               <div className={styles.hotlinkColumn}>
                 <UseInputPadrao 
                   identifier="hotlink-dependente" 
                   label="Dependente"
                   value={hotlinkDependente}
                   onChange={setHotlinkDependente}
                   inputRef={hotlinkDependenteRef}
                   type='text'
                   width={isMobile ? 100 : 100}
                   gap={0}
                  inputButtonRight={[
                  {
                      icon: 'fa-solid fa-eye',
                      text: 'Vizualizar',
                      onClick: () => alert('vizualizado!'),
                      tooltip: 'Clique para vizualizar',
                  },
                  ]}
                 />
               </div>
             </div>
           </div>
        </div>
      </div>

      
    </div>
  );
};

export default Mensagens;