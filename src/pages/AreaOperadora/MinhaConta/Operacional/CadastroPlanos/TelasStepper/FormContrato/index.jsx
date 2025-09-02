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
              <label className={styles.columnLabel}>Associado</label>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="com-reducao-associado" 
                  value={comReducaoAssociado}
                  onChange={setComReducaoAssociado}
                  inputRef={comReducaoAssociadoRef}
                  type='select'
                  options={formOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                />
                <button 
                  className={styles.visualizarButton}
                  onClick={() => handleVisualizar('Com Redução', 'Associado')}
                >
                  <i className="fa-solid fa-eye"></i>
                  Visualizar
                </button>
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <label className={styles.columnLabel}>Segurado</label>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="com-reducao-segurado" 
                  value={comReducaoSegurado}
                  onChange={setComReducaoSegurado}
                  inputRef={comReducaoSeguradoRef}
                  type='select'
                  options={formOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                />
                <button 
                  className={styles.visualizarButton}
                  onClick={() => handleVisualizar('Com Redução', 'Segurado')}
                >
                  <i className="fa-solid fa-eye"></i>
                  Visualizar
                </button>
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <label className={styles.columnLabel}>Dependente</label>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="com-reducao-dependente" 
                  value={comReducaoDependente}
                  onChange={setComReducaoDependente}
                  inputRef={comReducaoDependenteRef}
                  type='select'
                  options={formOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                />
                <button 
                  className={styles.visualizarButton}
                  onClick={() => handleVisualizar('Com Redução', 'Dependente')}
                >
                  <i className="fa-solid fa-eye"></i>
                  Visualizar
                </button>
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
              <label className={styles.columnLabel}>Associado</label>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="sem-reducao-associado" 
                  value={semReducaoAssociado}
                  onChange={setSemReducaoAssociado}
                  inputRef={semReducaoAssociadoRef}
                  type='select'
                  options={formOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                />
                <button 
                  className={styles.visualizarButton}
                  onClick={() => handleVisualizar('Sem Redução', 'Associado')}
                >
                  <i className="fa-solid fa-eye"></i>
                  Visualizar
                </button>
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <label className={styles.columnLabel}>Segurado</label>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="sem-reducao-segurado" 
                  value={semReducaoSegurado}
                  onChange={setSemReducaoSegurado}
                  inputRef={semReducaoSeguradoRef}
                  type='select'
                  options={formOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                />
                <button 
                  className={styles.visualizarButton}
                  onClick={() => handleVisualizar('Sem Redução', 'Segurado')}
                >
                  <i className="fa-solid fa-eye"></i>
                  Visualizar
                </button>
              </div>
            </div>
            <div className={styles.communicationColumn}>
              <label className={styles.columnLabel}>Dependente</label>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="sem-reducao-dependente" 
                  value={semReducaoDependente}
                  onChange={setSemReducaoDependente}
                  inputRef={semReducaoDependenteRef}
                  type='select'
                  options={formOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                />
                <button 
                  className={styles.visualizarButton}
                  onClick={() => handleVisualizar('Sem Redução', 'Dependente')}
                >
                  <i className="fa-solid fa-eye"></i>
                  Visualizar
                </button>
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
              <label className={styles.columnLabel}>Quitação</label>
              <div className={styles.inputWithButton}>
                <UseInputPadrao 
                  identifier="atendimento-quitacao" 
                  value={atendimentoQuitacao}
                  onChange={setAtendimentoQuitacao}
                  inputRef={atendimentoQuitacaoRef}
                  type='select'
                  options={atendimentoOptions}
                  width={isMobile ? 100 : 100}
                  gap={0}
                />
                <button 
                  className={styles.visualizarButton}
                  onClick={() => handleVisualizar('Atendimento', 'Quitação')}
                >
                  <i className="fa-solid fa-eye"></i>
                  Visualizar
                </button>
              </div>
            </div>
                         <div className={styles.communicationColumn}>
               <label className={styles.columnLabel}>Portabilidade</label>
               <div className={styles.inputWithButton}>
                 <UseInputPadrao 
                   identifier="atendimento-portabilidade" 
                   value={atendimentoPortabilidade}
                   onChange={setAtendimentoPortabilidade}
                   inputRef={atendimentoPortabilidadeRef}
                   type='text'
                   width={isMobile ? 100 : 100}
                   gap={0}
                 />
                 <button 
                   className={styles.visualizarButton}
                   onClick={() => handleVisualizar('Atendimento', 'Portabilidade')}
                 >
                   <i className="fa-solid fa-eye"></i>
                   Visualizar
                 </button>
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
               <label className={styles.columnLabel}>Contratante e Beneficiários</label>
               <div className={styles.inputWithButton}>
                 <UseInputPadrao 
                   identifier="cancelamento-associado" 
                   value={cancelamentoAssociado}
                   onChange={setCancelamentoAssociado}
                   inputRef={cancelamentoAssociadoRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
                 />
                 <button 
                   className={styles.visualizarButton}
                   onClick={() => handleVisualizar('Cancelamento', 'Associado')}
                 >
                   <i className="fa-solid fa-eye"></i>
                   Visualizar
                 </button>
               </div>
             </div>
             <div className={styles.communicationColumn}>
               <label className={styles.columnLabel}>Contratante e Beneficiários</label>
               <div className={styles.inputWithButton}>
                 <UseInputPadrao 
                   identifier="cancelamento-bloqueio" 
                   value={cancelamentoBloqueio}
                   onChange={setCancelamentoBloqueio}
                   inputRef={cancelamentoBloqueioRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
                 />
                 <button 
                   className={styles.visualizarButton}
                   onClick={() => handleVisualizar('Cancelamento', 'Bloqueio')}
                 >
                   <i className="fa-solid fa-eye"></i>
                   Visualizar
                 </button>
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
               <label className={styles.columnLabel}>Contratante e Beneficiários</label>
               <div className={styles.inputWithButton}>
                 <UseInputPadrao 
                   identifier="cancelamento-inativacao" 
                   value={cancelamentoInativacao}
                   onChange={setCancelamentoInativacao}
                   inputRef={cancelamentoInativacaoRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
                 />
                 <button 
                   className={styles.visualizarButton}
                   onClick={() => handleVisualizar('Cancelamento', 'Inativação')}
                 >
                   <i className="fa-solid fa-eye"></i>
                   Visualizar
                 </button>
               </div>
             </div>
             <div className={styles.communicationColumn}>
               <label className={styles.columnLabel}>Contratante e Beneficiários</label>
               <div className={styles.inputWithButton}>
                 <UseInputPadrao 
                   identifier="cancelamento-rescisao" 
                   value={cancelamentoRescisao}
                   onChange={setCancelamentoRescisao}
                   inputRef={cancelamentoRescisaoRef}
                   type='select'
                   options={cancelamentoOptions}
                   width={isMobile ? 100 : 100}
                   gap={1}
                 />
                 <button 
                   className={styles.visualizarButton}
                   onClick={() => handleVisualizar('Cancelamento', 'Rescisão')}
                 >
                   <i className="fa-solid fa-eye"></i>
                   Visualizar
                 </button>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default FormContrato;
