import React, { useState } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import toastMessage from '../../../../../../assets/toast-ui/toast';

const ModalEfetuarBloqueio = ({ isOpen, onClose, filtrosCobranca }) => {
  const [step, setStep] = useState(1);
  const [status, setStatus, statusRef] = UseInputMask('ATIVO');
  const [tipoChamada, setTipoChamada, tipoChamadaRef] = UseInputMask();
  const [mensagem, setMensagem, mensagemRef] = UseInputMask();
  const [dataExecucao, setDataExecucao, dataExecucaoRef] = UseInputMask();
  const [horaExecucao, setHoraExecucao, horaExecucaoRef] = UseInputMask('18:00');

  const statusOptions = [
    { value: 'ATIVO', label: 'ATIVO' },
    { value: 'TODOS', label: 'TODOS' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'em analise pela operadora', label: 'Em Análise pela Operadora' },
    { value: 'ibbca suspenso', label: 'IBBCA Suspenso' },
    { value: 'inadimplente ibbca', label: 'Inadimplente IBBCA' },
    { value: 'inativo', label: 'Inativo' },
    { value: 'inativo por inadimplência', label: 'Inativo por Inadimplência' },
    { value: 'rescisão contratual', label: 'Rescisão Contratual' },
    { value: 'suspenso', label: 'Suspenso' }
  ];

  const tipoChamadaOptions = [
    { value: '', label: 'SELECIONE...' },
    { value: 'sugestões', label: 'Sugestões' },
    { value: 'reclamações', label: 'Reclamações' },
    { value: '2 via de boleto', label: '2 Via de Boleto' },
    { value: 'alteração de dados', label: 'Alteração de Dados' },
    { value: 'cancelamento', label: 'Cancelamento' },
    { value: 'outros', label: 'Outros' }
  ];

  const handleFechar = () => {
    onClose();
    setStep(1);
    setStatus('ATIVO');
    setTipoChamada('');
    setMensagem('');
    setDataExecucao('');
    setHoraExecucao('18:00');
  };

  const handleContinuar = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      handleGravar();
    }
  };

  const handleVoltar = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleGravar = () => {
    onClose();
    setStep(1);
    setStatus('ATIVO');
    setTipoChamada('');
    setMensagem('');
    setDataExecucao('');
    setHoraExecucao('18:00');
    toastMessage("Bloqueio efetuado com sucesso", "success");
  };

  const formatarDataHora = () => {
    const hoje = new Date();
    const data = dataExecucao || hoje.toISOString().split('T')[0];
    const hora = horaExecucao || '18:00';
    return `${data.split('-').reverse().join('/')} ${hora}`;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-ban"></i>
            <h2 className={styles.modalTitle}>
              {step === 1 && "Alterar Status"}
              {step === 2 && "Resumo"}
              {step === 3 && "Agendar Horário"}
            </h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          {step === 1 && (
            <div className={styles.modalForm}>
              <UseInputPadrao
                label="Status"
                type="select"
                value={status}
                onChange={setStatus}
                inputRef={statusRef}
                options={statusOptions}
                width={100}
              />
              
              <UseInputPadrao
                label="Tipo de Chamada"
                type="select"
                value={tipoChamada}
                onChange={setTipoChamada}
                inputRef={tipoChamadaRef}
                options={tipoChamadaOptions}
                width={100}
              />
              
              <div className={styles.mensagemContainer}>
                <UseInputPadrao
                  label="Mensagem"
                  type="textarea"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value.slice(0, 2000))}
                  inputRef={mensagemRef}
                  width={100}
                  placeholder="Escreva uma chamada de até 2000 caracteres..."
                  maxLength={2000}
                />
                <div className={styles.contadorCaracteres}>
                  {mensagem.length}/2000 caracteres
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.resumoContainer}>
              <div className={styles.resumoGrid}>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Tipo de Plano:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.tipoPlano || "Campo Não Informado"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Convênio:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.convenio || "Campo Não Informado"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Entidade:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.entidade || "Campo Não Informado"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Plano:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.plano || "Campo Não Informado"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Competência:</span>
                  <span className={styles.resumoValue}>
                    {filtrosCobranca?.competenciaInicial && filtrosCobranca?.competenciaFinal 
                      ? `${filtrosCobranca.competenciaInicial} - ${filtrosCobranca.competenciaFinal}`
                      : "Campo Não Informado - Campo Não Informado"}
                  </span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Vencimento Original:</span>
                  <span className={styles.resumoValue}>
                    {filtrosCobranca?.venctoOriginalInicial && filtrosCobranca?.venctoOriginalFinal 
                      ? `${filtrosCobranca.venctoOriginalInicial} - ${filtrosCobranca.venctoOriginalFinal}`
                      : "Campo Não Informado - Campo Não Informado"}
                  </span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Vencimento:</span>
                  <span className={styles.resumoValue}>
                    {filtrosCobranca?.vencimentoInicial && filtrosCobranca?.vencimentoFinal 
                      ? `${filtrosCobranca.vencimentoInicial} - ${filtrosCobranca.vencimentoFinal}`
                      : "Campo Não Informado - Campo Não Informado"}
                  </span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Dias em Atraso:</span>
                  <span className={styles.resumoValue}>
                    {filtrosCobranca?.diasAtrasoInicial && filtrosCobranca?.diasAtrasoFinal 
                      ? `${filtrosCobranca.diasAtrasoInicial} - ${filtrosCobranca.diasAtrasoFinal}`
                      : "Campo Não Informado - Campo Não Informado"}
                  </span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Boletos em Atraso:</span>
                  <span className={styles.resumoValue}>
                    {filtrosCobranca?.qtdBoletosAtrasoInicial && filtrosCobranca?.qtdBoletosAtrasoFinal 
                      ? `${filtrosCobranca.qtdBoletosAtrasoInicial} - ${filtrosCobranca.qtdBoletosAtrasoFinal}`
                      : "Campo Não Informado - Campo Não Informado"}
                  </span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Boleto Unificado:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.boletoUnificado || "Todos"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Ação da Parcela:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.acaoParcela || "Todos"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Tipo de Parcela:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.tipoParcela || "Todos"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Tipo Contratante:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.tipoContratante || "Pessoa Física"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Tipo:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.tipo || "Sintético"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Faturamento:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.faturamento || "Todos"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Status FI:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.statusFi || "TODOS"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Status Contrato:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.statusContrato || "TODOS"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Valor Nominal:</span>
                  <span className={styles.resumoValue}>
                    {filtrosCobranca?.valorNominalMinimo && filtrosCobranca?.valorNominalMaximo 
                      ? `${filtrosCobranca.valorNominalMinimo} - ${filtrosCobranca.valorNominalMaximo}`
                      : "Campo Não Informado - Campo Não Informado"}
                  </span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Pesquisar:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.pesquisar || "Associado"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Texto:</span>
                  <span className={styles.resumoValue}>{filtrosCobranca?.texto || "Campo Não Informado"}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Ação:</span>
                  <span className={styles.resumoValue}>{status}</span>
                </div>
                <div className={styles.resumoItem}>
                  <span className={styles.resumoLabel}>Tipo de Chamada:</span>
                  <span className={styles.resumoValue}>{tipoChamada || "Campo Não Informado"}</span>
                </div>
              </div>
              
              <div className={styles.mensagemResumo}>
                <h6>Mensagem</h6>
                <div className={styles.mensagemTextarea}>
                  {mensagem || "Campo Não Informado"}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.agendamentoContainer}>
              <div className={styles.horarioBox}>
                <h6>Horário de Execução</h6>
                <div className={styles.horarioDisplay}>
                  {formatarDataHora()}
                </div>
              </div>
              
              <div className={styles.agendamentoForm}>
                <UseInputPadrao
                  label="Data de Execução"
                  type="date"
                  value={dataExecucao}
                  onChange={setDataExecucao}
                  inputRef={dataExecucaoRef}
                  width={100}
                />
                
                <UseInputPadrao
                  label="Hora de Execução"
                  type="time"
                  value={horaExecucao}
                  onChange={setHoraExecucao}
                  inputRef={horaExecucaoRef}
                  width={100}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.modalFooter}>
          {step > 1 && (
            <button className={styles.modalButtonVoltar} onClick={handleVoltar}>
              <i className="fa-solid fa-reply"></i>
              Voltar
            </button>
          )}
          <button className={styles.modalButtonContinuar} onClick={handleContinuar}>
            <i className="fa-solid fa-arrow-right"></i>
            {step === 3 ? "Executar" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEfetuarBloqueio; 