import React, { useState, useCallback, useMemo } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';
import { TabelaPadrao } from '../../../../../../../components';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog';
import styles from './styles.module.css';

const FormContrato = ({ isMobile = false, currentStep }) => {
  const [comReducaoAssociado, setComReducaoAssociado, comReducaoAssociadoRef] = UseInputMask();
  const [comReducaoSegurado, setComReducaoSegurado, comReducaoSeguradoRef] = UseInputMask();
  const [comReducaoDependente, setComReducaoDependente, comReducaoDependenteRef] = UseInputMask();

  const [semReducaoAssociado, setSemReducaoAssociado, semReducaoAssociadoRef] = UseInputMask();
  const [semReducaoSegurado, setSemReducaoSegurado, semReducaoSeguradoRef] = UseInputMask();
  const [semReducaoDependente, setSemReducaoDependente, semReducaoDependenteRef] = UseInputMask();

  const [atendimentoQuitacao, setAtendimentoQuitacao, atendimentoQuitacaoRef] = UseInputMask();
  const [atendimentoPortabilidade, setAtendimentoPortabilidade, atendimentoPortabilidadeRef] = UseInputMask();

  const [cancelamentoAssociado, setCancelamentoAssociado, cancelamentoAssociadoRef] = UseInputMask();

  const [cancelamentoBloqueio, setCancelamentoBloqueio, cancelamentoBloqueioRef] = UseInputMask();

  const [cancelamentoInativacao, setCancelamentoInativacao, cancelamentoInativacaoRef] = UseInputMask();

  const [cancelamentoRescisao, setCancelamentoRescisao, cancelamentoRescisaoRef] = UseInputMask();

  const formOptions = [
    { value: '1. LI E CONCORDO - CONTRATANTE ODONTO', label: '1. LI E CONCORDO - CONTRATANTE ODONTO' },
    { value: '2. LI E CONCORDO - CONTRATANTE MEDICO', label: '2. LI E CONCORDO - CONTRATANTE MEDICO' },
    { value: '3. LI E CONCORDO - CONTRATANTE HOSPITALAR', label: '3. LI E CONCORDO - CONTRATANTE HOSPITALAR' }
  ];

  const atendimentoOptions = [
    { value: 'TESTE GARFIELD', label: 'TESTE GARFIELD' },
    { value: 'TESTE NOVO', label: 'TESTE NOVO' },
    { value: 'QUITACAO PADRAO', label: 'QUITACAO PADRAO' }
  ];

  const cancelamentoOptions = [
    { value: 'CARTA DE SUSPENSAO', label: 'CARTA DE SUSPENSAO' },
    { value: 'CARTA DE RECISAO', label: 'CARTA DE RECISAO' },
    { value: 'CARTA DE INATIVACAO', label: 'CARTA DE INATIVACAO' }
  ];

  const handleVisualizar = (tipo, campo) => {
    console.log(`Visualizando ${tipo} - ${campo}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h3 className={`${styles.sectionTitle} ${styles.firstTitle}`}>
          <i className="fa-solid fa-file-contract"></i>
          Formulários de Contrato
        </h3>

        {/* Com Redução de Carência */}
        <div className={styles.communicationSection}>
          <h4 className={styles.communicationTitle}>
            <i className="fa-solid fa-clock"></i>
            Com Redução de Carência
          </h4>
          <div className={styles.communicationRow}>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="com-reducao-associado" 
                  label="Associado"
                  value={comReducaoAssociado}
                  onChange={setComReducaoAssociado}
                  inputRef={comReducaoAssociadoRef}
                  type='select'
                  options={formOptions}
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
                  identifier="com-reducao-segurado" 
                  label="Segurado"
                  value={comReducaoSegurado}
                  onChange={setComReducaoSegurado}
                  inputRef={comReducaoSeguradoRef}
                  type='select'
                  options={formOptions}
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
                  identifier="com-reducao-dependente" 
                  label="Dependente"
                  value={comReducaoDependente}
                  onChange={setComReducaoDependente}
                  inputRef={comReducaoDependenteRef}
                  type='select'
                  options={formOptions}
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

        {/* Sem Redução de Carência */}
        <div className={styles.communicationSection}>
          <h4 className={styles.communicationTitle}>
            <i className="fa-solid fa-ban"></i>
            Sem Redução de Carência
          </h4>
          <div className={styles.communicationRow}>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="sem-reducao-associado" 
                  label="Associado"
                  value={semReducaoAssociado}
                  onChange={setSemReducaoAssociado}
                  inputRef={semReducaoAssociadoRef}
                  type='select'
                  options={formOptions}
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
                  identifier="sem-reducao-segurado" 
                  label="Segurado"
                  value={semReducaoSegurado}
                  onChange={setSemReducaoSegurado}
                  inputRef={semReducaoSeguradoRef}
                  type='select'
                  options={formOptions}
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
                  identifier="sem-reducao-dependente" 
                  label="Dependente"
                  value={semReducaoDependente}
                  onChange={setSemReducaoDependente}
                  inputRef={semReducaoDependenteRef}
                  type='select'
                  options={formOptions}
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

      {/* Formulários de Atendimento */}
      <div className={styles.formSectionWithBorder}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-headset"></i>
          Formulários de Atendimento
        </h3>

        {/* Solicitação do Associado */}
        <div className={styles.communicationSection}>
          <h4 className={styles.communicationTitle}>
            <i className="fa-solid fa-user"></i>
            Solicitação do(a) Associado
          </h4>
          <div className={styles.communicationRow}>
            <div className={styles.communicationColumn}>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="atendimento-quitacao" 
                  label="Quitação"
                  value={atendimentoQuitacao}
                  onChange={setAtendimentoQuitacao}
                  inputRef={atendimentoQuitacaoRef}
                  type='select'
                  options={atendimentoOptions}
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
                   identifier="atendimento-portabilidade" 
                   label="Portabilidade"
                   value={atendimentoPortabilidade}
                   onChange={setAtendimentoPortabilidade}
                   inputRef={atendimentoPortabilidadeRef}
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

      {/* Formulários de Cancelamento */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-times-circle"></i>
          Formulários de Cancelamento
        </h3>

                 {/* Solicitação do Associado e por bloqueio */}
         <div className={styles.communicationSection}>
           <h4 className={styles.communicationTitle}>
             <i className="fa-solid fa-user"></i>
             Solicitação do(a) Associado
           </h4>
           <div className={styles.communicationRow}>
             <div className={styles.communicationColumn}>
               <div className={styles.inputWithButton}>
                 <UseInputPadrao 
                   identifier="cancelamento-associado" 
                   label="Contratante e Beneficiários"
                   value={cancelamentoAssociado}
                   onChange={setCancelamentoAssociado}
                   inputRef={cancelamentoAssociadoRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
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
                   identifier="cancelamento-bloqueio" 
                   label="Contratante e Beneficiários"
                   value={cancelamentoBloqueio}
                   onChange={setCancelamentoBloqueio}
                   inputRef={cancelamentoBloqueioRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
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

         {/* por inativação e por rescisão */}
         <div className={styles.communicationSection}>
           <h4 className={styles.communicationTitle}>
             <i className="fa-solid fa-pause-circle"></i>
             Por inativação
           </h4>
           <div className={styles.communicationRow}>
             <div className={styles.communicationColumn}>
               <div className={styles.inputWithButton}>
                 <UseInputPadrao 
                   identifier="cancelamento-inativacao" 
                   label="Contratante e Beneficiários"
                   value={cancelamentoInativacao}
                   onChange={setCancelamentoInativacao}
                   inputRef={cancelamentoInativacaoRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
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
                   identifier="cancelamento-rescisao" 
                   label="Contratante e Beneficiários"
                   value={cancelamentoRescisao}
                   onChange={setCancelamentoRescisao}
                   inputRef={cancelamentoRescisaoRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
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

export default FormContrato;