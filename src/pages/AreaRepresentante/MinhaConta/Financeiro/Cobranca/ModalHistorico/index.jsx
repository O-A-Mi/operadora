import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { TabelaPadrao } from '../../../../../../components';
import { useLoader } from '../../../../../../context';

const ModalHistorico = ({ isOpen, onClose }) => {
  const { showLoader, hideLoader } = useLoader();
  const [historicoDados, setHistoricoDados] = useState([]);

  const tabelaColumns = [
    { value: "status", name: "Status" },
    { value: "horarioExecucao", name: "Horário de Execução" },
    { value: "tipo", name: "Tipo" },
    { value: "tipoPlano", name: "Tipo de Plano" },
    { value: "convenio", name: "Convênio" },
    { value: "plano", name: "Plano" },
    { value: "entidade", name: "Entidade" },
    { value: "competenciaInicial", name: "Competência Inicial" },
    { value: "competenciaFinal", name: "Competência Final" },
    { value: "venctoOriginalInicial", name: "Vencimento Original Inicial" },
    { value: "venctoOriginalFinal", name: "Vencimento Original Final" },
    { value: "vencimentoInicial", name: "Vencimento Inicial" },
    { value: "vencimentoFinal", name: "Vencimento Final" },
    { value: "diasAtrasoInicial", name: "Dias de Atraso Inicial" },
    { value: "diasAtrasoFinal", name: "Dias de Atraso Final" },
    { value: "boletosAtrasoInicial", name: "Boletos em Atraso Inicial" },
    { value: "boletosAtrasoFinal", name: "Boletos em Atraso Final" },
    { value: "boletoUnificado", name: "Boleto Unificado" },
    { value: "acaoParcela", name: "Ação da Parcela" },
    { value: "tipoParcela", name: "Tipo de Parcela" },
    { value: "tipoContratante", name: "Tipo de Contratante" },
    { value: "faturamento", name: "Faturamento" },
    { value: "statusFi", name: "Status FI" },
    { value: "statusContrato", name: "Status Contrato" },
    { value: "valorNominalMinimo", name: "Valor Nominal Mínimo" },
    { value: "valorNominalMaximo", name: "Valor Nominal Máximo" },
    { value: "pesquisar", name: "Pesquisar" },
    { value: "texto", name: "Texto" },
    { value: "acao", name: "Ação" },
    { value: "chamada", name: "Chamada" },
    { value: "mensagem", name: "Mensagem" }
  ];

  useEffect(() => {
    if (isOpen) {
      carregarHistorico();
    }
  }, [isOpen]);

  const carregarHistorico = async () => {
    showLoader();
    try {
  
      const dados = [
        {
          id: 1,
          status: "✅ Executado",
          horarioExecucao: "24/07/2025 18:00",
          tipo: "Sintético",
          tipoPlano: "Plano Saúde",
          convenio: "Assim Saúde",
          plano: "Teste",
          entidade: "ANC",
          competenciaInicial: "01/01/2025",
          competenciaFinal: "31/01/2025",
          venctoOriginalInicial: "01/01/2025",
          venctoOriginalFinal: "31/01/2025",
          vencimentoInicial: "01/01/2025",
          vencimentoFinal: "31/01/2025",
          diasAtrasoInicial: "0",
          diasAtrasoFinal: "30",
          boletosAtrasoInicial: "0",
          boletosAtrasoFinal: "5",
          boletoUnificado: "Todos",
          acaoParcela: "Todos",
          tipoParcela: "Todos",
          tipoContratante: "Pessoa Física",
          faturamento: "Todos",
          statusFi: "TODOS",
          statusContrato: "TODOS",
          valorNominalMinimo: "R$ 0,00",
          valorNominalMaximo: "R$ 1.000,00",
          pesquisar: "Associado",
          texto: "Teste",
          acao: "ATIVO",
          chamada: "Sugestões",
          mensagem: "Bloqueio realizado com sucesso para os associados em atraso."
        },
        {
          id: 2,
          status: "⏰ Agendado",
          horarioExecucao: "25/07/2025 10:00",
          tipo: "Analítico",
          tipoPlano: "Plano Odonto",
          convenio: "Odonto Corp",
          plano: "Cleandentes",
          entidade: "ANC",
          competenciaInicial: "01/02/2025",
          competenciaFinal: "28/02/2025",
          venctoOriginalInicial: "01/02/2025",
          venctoOriginalFinal: "28/02/2025",
          vencimentoInicial: "01/02/2025",
          vencimentoFinal: "28/02/2025",
          diasAtrasoInicial: "15",
          diasAtrasoFinal: "60",
          boletosAtrasoInicial: "1",
          boletosAtrasoFinal: "10",
          boletoUnificado: "Sim",
          acaoParcela: "Bloquear",
          tipoParcela: "Mensalidade",
          tipoContratante: "Pessoa Jurídica",
          faturamento: "Faturado",
          statusFi: "ATIVO",
          statusContrato: "ATIVO",
          valorNominalMinimo: "R$ 100,00",
          valorNominalMaximo: "R$ 5.000,00",
          pesquisar: "Quem Vendeu",
          texto: "Empresa XYZ",
          acao: "SUSPENSO",
          chamada: "Reclamações",
          mensagem: "Bloqueio agendado para clientes com reclamações pendentes."
        }
      ];
      
      setHistoricoDados(dados);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      hideLoader();
    }
  };

  const handleFechar = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <i className="fa-solid fa-history"></i>
            <h2 className={styles.modalTitle}>Histórico de Bloqueios</h2>
          </div>
          <button className={styles.modalCloseButton} onClick={handleFechar}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <TabelaPadrao
            tabelaId="historico-bloqueios"
            columns={tabelaColumns}
            data={historicoDados}
            options={{
              showPaginationSwitch: true,
              showSearch: false,
              showToggleView: true,
              showColumnsSelector: true,
              showPrint: false,
              showExport: true,
              showFooter: false,
              fileName: "historico-bloqueios"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalHistorico; 