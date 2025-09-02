import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from "../../../../../components/InputPadrao";
import { useState, useEffect } from "react";
import { useLoader } from "../../../../../context";
import { TabelaPadrao } from "../../../../../components";
import {
  limparFiltros,
  handleResizeTabela,
} from "../../../../../utils/functions";
import dadosFinanceiro from "../dados-financeiro.json";
import ModalEfetuarBloqueio from "./ModalEfetuarBloqueio";
import ModalHistorico from "./ModalHistorico";

const Cobranca = () => {
  const { showLoader, hideLoader } = useLoader();

  const [activeTab, setActiveTab] = useState("pesquisa");
  const [expandedTabs, setExpandedTabs] = useState(["pesquisa"]);

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [showModalEfetuarBloqueio, setShowModalEfetuarBloqueio] = useState(false);
  const [showModalHistorico, setShowModalHistorico] = useState(false);

  const [tipoPlano, setTipoPlano, tipoPlanoRef] = UseInputMask();
  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [plano, setPlano, planoRef] = UseInputMask();
  const [competenciaInicial, setCompetenciaInicial, competenciaInicialRef] = UseInputMask();
  const [competenciaFinal, setCompetenciaFinal, competenciaFinalRef] = UseInputMask();
  const [venctoOriginalInicial, setVenctoOriginalInicial, venctoOriginalInicialRef] = UseInputMask();
  const [venctoOriginalFinal, setVenctoOriginalFinal, venctoOriginalFinalRef] = UseInputMask();
  const [vencimentoInicial, setVencimentoInicial, vencimentoInicialRef] = UseInputMask();
  const [vencimentoFinal, setVencimentoFinal, vencimentoFinalRef] = UseInputMask();
  const [diasAtrasoInicial, setDiasAtrasoInicial, diasAtrasoInicialRef] = UseInputMask();
  const [diasAtrasoFinal, setDiasAtrasoFinal, diasAtrasoFinalRef] = UseInputMask();
  const [qtdBoletosAtrasoInicial, setQtdBoletosAtrasoInicial, qtdBoletosAtrasoInicialRef] = UseInputMask();
  const [qtdBoletosAtrasoFinal, setQtdBoletosAtrasoFinal, qtdBoletosAtrasoFinalRef] = UseInputMask();
  const [boletoUnificado, setBoletoUnificado, boletoUnificadoRef] = UseInputMask();
  const [acaoParcela, setAcaoParcela, acaoParcelaRef] = UseInputMask();
  const [tipoParcela, setTipoParcela, tipoParcelaRef] = UseInputMask();
  const [tipoContratante, setTipoContratante, tipoContratanteRef] = UseInputMask();
  const [tipo, setTipo, tipoRef] = UseInputMask("sintetico");
  const [faturamento, setFaturamento, faturamentoRef] = UseInputMask();
  const [statusFi, setStatusFi, statusFiRef] = UseInputMask();
  const [statusContrato, setStatusContrato, statusContratoRef] = UseInputMask();
  const [valorNominalMinimo, setValorNominalMinimo, valorNominalMinimoRef] = UseInputMask();
  const [valorNominalMaximo, setValorNominalMaximo, valorNominalMaximoRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const validarValor = (valor) => {
    return valor.replace(/[^\d,]/g, '');
  };

  const tabs = [
    { id: "pesquisa", label: "Pesquisa", icon: "fa-solid fa-search" },
    { id: "configuracoes", label: "Configurações", icon: "fa-solid fa-cog" },
    { id: "datas", label: "Datas", icon: "fa-solid fa-calendar-days" },
    { id: "valores", label: "Valores", icon: "fa-solid fa-money-bill-wave" }
  ];

  const toggleTab = (tabId) => {
    setExpandedTabs((prev) =>
      prev.includes(tabId)
        ? prev.filter((id) => id !== tabId)
        : [...prev, tabId]
    );
  };

  const tipoPlanoOptions = [
    { value: "todos", label: "Todos" },
    { value: "plano_odonto", label: "Plano Odonto" },
    { value: "plano_saude", label: "Plano Saúde" },
    { value: "saude", label: "Saúde" },
    { value: "opcionais", label: "Opcionais" },
    { value: "plano_pet", label: "Plano Pet" },
  ];

  const convenioOptions = [
    { value: "todos", label: "Todos" },
    { value: "assim_saude", label: "Assim Saúde" },
    { value: "hermanos_pet", label: "Hermanos Pet" },
    { value: "odonto_corp", label: "Odonto Corp" },
    { value: "teste", label: "Teste" },
  ];

  const planoOptions = [
    { value: "todos", label: "Todos" },
    { value: "teste", label: "Teste" },
    { value: "cleandentes", label: "Cleandentes" },
    { value: "siga_odonto", label: "Siga Odonto" },
  ];

  const boletoUnificadoOptions = [
    { value: "todos", label: "Todos" },
    { value: "sim", label: "Sim" },
    { value: "nao", label: "Não" },
  ];

  const acaoParcelaOptions = [
    { value: "todos", label: "Todos" },
    { value: "manual", label: "Manual" },
    { value: "automatica", label: "Automática" },
  ];

  const tipoParcelaOptions = [
    { value: "todos", label: "Todos" },
    { value: "adesao", label: "Adesão" },
    { value: "adesao_serv_adicional", label: "Adesão Serv. Adicional" },
    { value: "mensalidade", label: "Mensalidade" },
    { value: "participacao", label: "Participação" },
    { value: "avulso", label: "Avulso" },
  ];

  const tipoContratanteOptions = [
    { value: "todos", label: "Todos" },
    { value: "pessoa_fisica", label: "Pessoa Física" },
    { value: "pessoa_juridica", label: "Pessoa Jurídica" },
  ];

  const tipoOptions = [
    { value: "sintetico", label: "Sintético" },
    { value: "analitico", label: "Analítico" },
  ];

  const faturamentoOptions = [
    { value: "todos", label: "Todos" },
    { value: "faturado", label: "Faturado" },
    { value: "nao_faturado", label: "Não Faturado" },
  ];

  const statusOptions = [
    { value: "todos", label: "Todos" },
    { value: "ativo", label: "Ativo" },
    { value: "cancelado", label: "Cancelado" },
    { value: "em_analise", label: "Em Análise pela Operadora" },
    { value: "ibbca_suspenso", label: "IBBCA Suspenso" },
    { value: "inadimplente_ibbca", label: "Inadimplente IBBCA" },
    { value: "inativo", label: "Inativo" },
    { value: "inativo_inadimplencia", label: "Inativo por Inadimplência" },
    { value: "rescisao_contratual", label: "Rescisão Contratual" },
    { value: "suspenso", label: "Suspenso" },
  ];

  const pesquisarOptions = [
    { value: "associado", label: "Associado" },
    { value: "referencia", label: "Referência" },
    { value: "historico", label: "Histórico" },
    { value: "boleto", label: "Boleto" },
  ];

  const tabelaColumns = [
    { value: "matricula", name: "Matrícula" },
    { value: "associado", name: "Associado" },
    { value: "cpfCnpj", name: "CPF/CNPJ do Associado" },
    { value: "titular", name: "Titular" },
    { value: "stContrato", name: "St. Contrato" },
    { value: "diasAtraso", name: "Dias Atraso" },
    { value: "telefone1", name: "Telefone 1" },
    { value: "telefone2", name: "Telefone 2" },
    { value: "celular1", name: "Celular 1" },
    { value: "celular2", name: "Celular 2" },
    { value: "celular3", name: "Celular 3" },
    { value: "email1", name: "E-mail 1" },
    { value: "email2", name: "E-mail 2" },
    { value: "representante", name: "Representante" },
    { value: "qtdParcela", name: "Qtd Parcela" },
    {
      value: "valores",
      name: "Valores",
      subColumns: [
        { value: "nominal", name: "Nominal" },
        { value: "coparticipacao", name: "Coparticipação" },
        { value: "txAssociativa", name: "Tx.Associativa" },
        { value: "txAdministrativa", name: "Tx.Administrativa" },
        { value: "vrReajusteAnual", name: "Vr. Reajuste Anual" },
        { value: "juros", name: "Juros" },
        { value: "multa", name: "Multa" },
        { value: "acrescimo", name: "Acréscimo" },
        { value: "desconto", name: "Desconto" },
        { value: "vrInclusaoRetroativa", name: "Vr. Inclusão Retroativa" },
        { value: "vrReajusteFxIdade", name: "Vr. Reajuste Fx.Idade" },
        { value: "cobranca", name: "Cobrança" }
      ]
    },
    {
      value: "plano",
      name: "Plano",
      subColumns: [
        { value: "planoTipo", name: "Tipo" },
        { value: "planoConvenio", name: "Convênio" },
        { value: "planoContratado", name: "Contratado" },
        { value: "planoEntidade", name: "Entidade" },
      ],
    },
  ];

  useEffect(() => {
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela("cobranca", "cobranca-container");
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela("cobranca", "cobranca-container");
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  const carregarDados = async () => {
    showLoader();
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const dados = dadosFinanceiro.cobranca || [];
      const dadosFormatados = dados.map((item) => ({
        ...item,
        nominalFormatado: `R$ ${item.nominal.toFixed(2).replace(".", ",")}`,
        coparticipacaoFormatada: `R$ ${item.coparticipacao
          .toFixed(2)
          .replace(".", ",")}`,
        txAssociativaFormatada: `R$ ${item.txAssociativa
          .toFixed(2)
          .replace(".", ",")}`,
        txAdministrativaFormatada: `R$ ${item.txAdministrativa
          .toFixed(2)
          .replace(".", ",")}`,
        vrReajusteAnualFormatado: `R$ ${item.vrReajusteAnual
          .toFixed(2)
          .replace(".", ",")}`,
        jurosFormatado: `R$ ${item.juros.toFixed(2).replace(".", ",")}`,
        multaFormatada: `R$ ${item.multa.toFixed(2).replace(".", ",")}`,
        acrescimoFormatado: `R$ ${item.acrescimo.toFixed(2).replace(".", ",")}`,
        descontoFormatado: `R$ ${item.desconto.toFixed(2).replace(".", ",")}`,
        vrInclusaoRetroativaFormatada: `R$ ${item.vrInclusaoRetroativa
          .toFixed(2)
          .replace(".", ",")}`,
        vrReajusteFxIdadeFormatada: `R$ ${item.vrReajusteFxIdade
          .toFixed(2)
          .replace(".", ",")}`,
        cobrancaFormatada: `R$ ${item.cobranca.toFixed(2).replace(".", ",")}`,
      }));

      setTabelaDados(dadosFormatados);
      setFiltroDados(dadosFormatados);
      setDadosCarregados(true);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      hideLoader();
    }
  };

  const filtrarDados = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let dadosFiltrados = [...tabelaDados];

    if (tipoPlano && tipoPlano !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.planoTipo === tipoPlano
      );
    }

    if (convenio && convenio !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.planoConvenio === convenio
      );
    }

    if (plano && plano !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.planoContratado === plano
      );
    }

    if (competenciaInicial && competenciaFinal) {
      dadosFiltrados = dadosFiltrados.filter((item) => {
        const competencia = new Date(item.competencia + "T00:00:00");
        const inicial = new Date(competenciaInicial + "T00:00:00");
        const final = new Date(competenciaFinal + "T00:00:00");
        return competencia >= inicial && competencia <= final;
      });
    }

    if (venctoOriginalInicial && venctoOriginalFinal) {
      dadosFiltrados = dadosFiltrados.filter((item) => {
        const vencto = new Date(item.venctoOriginal + "T00:00:00");
        const inicial = new Date(venctoOriginalInicial + "T00:00:00");
        const final = new Date(venctoOriginalFinal + "T00:00:00");
        return vencto >= inicial && vencto <= final;
      });
    }

    if (vencimentoInicial && vencimentoFinal) {
      dadosFiltrados = dadosFiltrados.filter((item) => {
        const vencimento = new Date(item.vencimento + "T00:00:00");
        const inicial = new Date(vencimentoInicial + "T00:00:00");
        const final = new Date(vencimentoFinal + "T00:00:00");
        return vencimento >= inicial && vencimento <= final;
      });
    }

    if (diasAtrasoInicial && diasAtrasoFinal) {
      dadosFiltrados = dadosFiltrados.filter(
        (item) =>
          item.diasAtraso >= parseInt(diasAtrasoInicial) &&
          item.diasAtraso <= parseInt(diasAtrasoFinal)
      );
    }

    if (qtdBoletosAtrasoInicial && qtdBoletosAtrasoFinal) {
      dadosFiltrados = dadosFiltrados.filter(
        (item) =>
          item.qtdBoletosAtraso >= parseInt(qtdBoletosAtrasoInicial) &&
          item.qtdBoletosAtraso <= parseInt(qtdBoletosAtrasoFinal)
      );
    }

    if (valorNominalMinimo && valorNominalMaximo) {
      dadosFiltrados = dadosFiltrados.filter(
        (item) =>
          item.nominal >= parseFloat(valorNominalMinimo) &&
          item.nominal <= parseFloat(valorNominalMaximo)
      );
    }

    if (boletoUnificado && boletoUnificado !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.boletoUnificado === boletoUnificado
      );
    }

    if (acaoParcela && acaoParcela !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.acaoParcela === acaoParcela
      );
    }

    if (tipoParcela && tipoParcela !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.tipoParcela === tipoParcela
      );
    }

    if (tipoContratante && tipoContratante !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.tipoContratante === tipoContratante
      );
    }

    if (faturamento && faturamento !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.faturamento === faturamento
      );
    }

    if (statusFi && statusFi !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.statusFi === statusFi
      );
    }

    if (statusContrato && statusContrato !== "") {
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.statusContrato === statusContrato
      );
    }

    if (texto && pesquisar) {
      dadosFiltrados = dadosFiltrados.filter((item) => {
        switch (pesquisar) {
          case "associado":
            return item.associado.toLowerCase().includes(texto.toLowerCase());
          case "referencia":
            return item.referencia.toLowerCase().includes(texto.toLowerCase());
          case "historico":
            return item.historico.toLowerCase().includes(texto.toLowerCase());
          case "boleto":
            return item.boleto.includes(texto);
          default:
            return true;
        }
      });
    }

    setFiltroDados(dadosFiltrados);
  };

  const limparFiltro = () => {
    limparFiltros([
      { setter: setTipoPlano, ref: tipoPlanoRef },
      { setter: setConvenio, ref: convenioRef },
      { setter: setPlano, ref: planoRef },
      { setter: setCompetenciaInicial, ref: competenciaInicialRef },
      { setter: setCompetenciaFinal, ref: competenciaFinalRef },
      { setter: setVenctoOriginalInicial, ref: venctoOriginalInicialRef },
      { setter: setVenctoOriginalFinal, ref: venctoOriginalFinalRef },
      { setter: setVencimentoInicial, ref: vencimentoInicialRef },
      { setter: setVencimentoFinal, ref: vencimentoFinalRef },
      { setter: setDiasAtrasoInicial, ref: diasAtrasoInicialRef },
      { setter: setDiasAtrasoFinal, ref: diasAtrasoFinalRef },
      { setter: setQtdBoletosAtrasoInicial, ref: qtdBoletosAtrasoInicialRef },
      { setter: setQtdBoletosAtrasoFinal, ref: qtdBoletosAtrasoFinalRef },
      { setter: setBoletoUnificado, ref: boletoUnificadoRef },
      { setter: setAcaoParcela, ref: acaoParcelaRef },
      { setter: setTipoParcela, ref: tipoParcelaRef },
      { setter: setTipoContratante, ref: tipoContratanteRef },
      { setter: setTipo, ref: tipoRef, defaultValue: "sintetico" },
      { setter: setFaturamento, ref: faturamentoRef },
      { setter: setStatusFi, ref: statusFiRef },
      { setter: setStatusContrato, ref: statusContratoRef },
      { setter: setValorNominalMinimo, ref: valorNominalMinimoRef },
      { setter: setValorNominalMaximo, ref: valorNominalMaximoRef },
      { setter: setPesquisar, ref: pesquisarRef },
      { setter: setTexto, ref: textoRef }
    ]);
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  };

  const handleEfetuarBloqueio = () => {
    setShowModalEfetuarBloqueio(true);
  };

  const handleCloseModalBloqueio = () => {
    setShowModalEfetuarBloqueio(false);
  };

  const handleHistorico = () => {
    setShowModalHistorico(true);
  };

  const handleCloseModalHistorico = () => {
    setShowModalHistorico(false);
  };

  const getFiltrosCobranca = () => {
    return {
      tipoPlano,
      convenio,
      plano,
      competenciaInicial,
      competenciaFinal,
      venctoOriginalInicial,
      venctoOriginalFinal,
      vencimentoInicial,
      vencimentoFinal,
      diasAtrasoInicial,
      diasAtrasoFinal,
      qtdBoletosAtrasoInicial,
      qtdBoletosAtrasoFinal,
      boletoUnificado,
      acaoParcela,
      tipoParcela,
      tipoContratante,
      tipo,
      faturamento,
      statusFi,
      statusContrato,
      valorNominalMinimo,
      valorNominalMaximo,
      pesquisar,
      texto
    };
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "configuracoes":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Tipo de Plano"
              identifier="tipo-plano"
              value={tipoPlano}
              onChange={setTipoPlano}
              inputRef={tipoPlanoRef}
              type="select"
              options={tipoPlanoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Convênio"
              identifier="convenio"
              value={convenio}
              onChange={setConvenio}
              inputRef={convenioRef}
              type="select"
              options={convenioOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Plano"
              identifier="plano"
              value={plano}
              onChange={setPlano}
              inputRef={planoRef}
              type="select"
              options={planoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Boleto Unificado"
              identifier="boleto-unificado"
              value={boletoUnificado}
              onChange={setBoletoUnificado}
              inputRef={boletoUnificadoRef}
              type="select"
              options={boletoUnificadoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Ação da Parcela"
              identifier="acao-parcela"
              value={acaoParcela}
              onChange={setAcaoParcela}
              inputRef={acaoParcelaRef}
              type="select"
              options={acaoParcelaOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Faturamento"
              identifier="faturamento"
              value={faturamento}
              onChange={setFaturamento}
              inputRef={faturamentoRef}
              type="select"
              options={faturamentoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      case "datas":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Competência - Inicial"
              identifier="competencia-inicial"
              type="date"
              value={competenciaInicial}
              onChange={setCompetenciaInicial}
              inputRef={competenciaInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Competência - Final"
              identifier="competencia-final"
              type="date"
              value={competenciaFinal}
              onChange={setCompetenciaFinal}
              inputRef={competenciaFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Vencto Original - Inicial"
              identifier="vencto-original-inicial"
              type="date"
              value={venctoOriginalInicial}
              onChange={setVenctoOriginalInicial}
              inputRef={venctoOriginalInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Vencto Original - Final"
              identifier="vencto-original-final"
              type="date"
              value={venctoOriginalFinal}
              onChange={setVenctoOriginalFinal}
              inputRef={venctoOriginalFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Vencimento - Inicial"
              identifier="vencimento-inicial"
              type="date"
              value={vencimentoInicial}
              onChange={setVencimentoInicial}
              inputRef={vencimentoInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Vencimento - Final"
              identifier="vencimento-final"
              type="date"
              value={vencimentoFinal}
              onChange={setVencimentoFinal}
              inputRef={vencimentoFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      case "valores":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Dias em Atraso - Inicial"
              identifier="dias-atraso-inicial"
              value={diasAtrasoInicial}
              onChange={(value) => setDiasAtrasoInicial(validarValor(value))}
              inputRef={diasAtrasoInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Dias em Atraso - Final"
              identifier="dias-atraso-final"
              value={diasAtrasoFinal}
              onChange={(value) => setDiasAtrasoFinal(validarValor(value))}
              inputRef={diasAtrasoFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Qtd. Boletos Atraso - Inicial"
              identifier="qtd-boletos-atraso-inicial"
              value={qtdBoletosAtrasoInicial}
              onChange={(value) => setQtdBoletosAtrasoInicial(validarValor(value))}
              inputRef={qtdBoletosAtrasoInicialRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Qtd. Boletos Atraso - Final"
              identifier="qtd-boletos-atraso-final"
              value={qtdBoletosAtrasoFinal}
              onChange={(value) => setQtdBoletosAtrasoFinal(validarValor(value))}
              inputRef={qtdBoletosAtrasoFinalRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="R$ Valor Nominal - Mínimo"
              identifier="valor-nominal-minimo"
              value={valorNominalMinimo}
              onChange={(value) => setValorNominalMinimo(validarValor(value))}
              inputRef={valorNominalMinimoRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="R$ Valor Nominal - Máximo"
              identifier="valor-nominal-maximo"
              value={valorNominalMaximo}
              onChange={(value) => setValorNominalMaximo(validarValor(value))}
              inputRef={valorNominalMaximoRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );



      case "pesquisa":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Pesquisar"
              identifier="pesquisar"
              value={pesquisar}
              onChange={setPesquisar}
              inputRef={pesquisarRef}
              type="select"
              options={pesquisarOptions}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Texto"
              identifier="texto"
              icon="fa-solid fa-search"
              value={texto}
              onChange={setTexto}
              inputRef={textoRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
              upperCase
            />
          </div>
        );

      default:
        return null;
    }
  };

  const dadosTabela = dadosCarregados && filtroDados.length > 0 ? filtroDados.map((item) => ({
    matricula: item.matricula,
    associado: item.associado,
    cpfCnpj: item.cpfCnpj,
    titular: item.titular,
    stContrato: item.stContrato,
    diasAtraso: item.diasAtraso,
    telefone1: item.telefone1,
    telefone2: item.telefone2,
    celular1: item.celular1,
    celular2: item.celular2,
    celular3: item.celular3,
    email1: item.email1,
    email2: item.email2,
    representante: item.representante,
    qtdParcela: item.qtdParcela,
    nominal: item.nominalFormatado,
    coparticipacao: item.coparticipacaoFormatada,
    txAssociativa: item.txAssociativaFormatada,
    txAdministrativa: item.txAdministrativaFormatada,
    vrReajusteAnual: item.vrReajusteAnualFormatado,
    juros: item.jurosFormatado,
    multa: item.multaFormatada,
    acrescimo: item.acrescimoFormatado,
    desconto: item.descontoFormatado,
    vrInclusaoRetroativa: item.vrInclusaoRetroativaFormatada,
    vrReajusteFxIdade: item.vrReajusteFxIdadeFormatada,
    cobranca: item.cobrancaFormatada,
    planoTipo: item.planoTipo,
    planoConvenio: item.planoConvenio,
    planoContratado: item.planoContratado,
    planoEntidade: item.planoEntidade,
    cobrancaOriginal: item.cobranca,
  })) : [];

  const footerColumns = [
    {
      name: "Valor Cobrança",
      value: "valorCobranca",
      data: (tabelaBody, visibleColumns, footerVisibleColumns) => {
        const total = tabelaBody.reduce((acc, item) => {
          const valor = typeof item.cobrancaOriginal === 'number' ? item.cobrancaOriginal : 0;
          return acc + valor;
        }, 0);
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      }
    }
  ];

  return (
    <div className={styles.cobrancaContainer} id="cobranca-container">
              <h2 className={styles.cobrancaTitle}>Cobrança</h2>

      <div className={styles.cobrancaContent}>
        <section className={styles.filtroTabelaField}>
          <div className={styles.filtroTabelaContent}>
            <div className={styles.filtroTabelaHeader}>
              <h5 className={styles.filtroTabelaTitle}>
                <i className="fa-solid fa-filter"></i>
                Filtros:
              </h5>
              <button
                className={styles.filtroTabelaButton}
                onClick={limparFiltro}
              >
                Limpar filtro
              </button>
            </div>

            <div className={styles.tabsContainer}>
              <div className={styles.tabsHeader}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${
                      expandedTabs.includes(tab.id) ? styles.active : ""
                    }`}
                    onClick={() => toggleTab(tab.id)}
                  >
                    <i className={tab.icon} />
                    {tab.label}
                    <i className={`fa-solid fa-chevron-down`} />
                  </button>
                ))}
              </div>

              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`${styles.tabPanel} ${
                    expandedTabs.includes(tab.id)
                      ? styles.expanded
                      : styles.collapsed
                  }`}
                >
                  {renderTabContent(tab.id)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.tabelaSection}>
          <TabelaPadrao
            tabelaId="cobranca"
            columns={tabelaColumns}
            data={dadosTabela}
            footer={footerColumns}
            options={{
              showPaginationSwitch: true,
              showSearch: () => filtrarDados(),
              showToggleView: true,
              showColumnsSelector: true,
              showPrint: false,
              showExport: true,
              showFooter: true,
              fileName: "cobranca",
              additionalButtons: [
                {
                  title: 'Efetuar Bloqueio',
                  icon: 'fa-solid fa-ban',
                  onClick: handleEfetuarBloqueio
                },
                {
                  title: 'Histórico',
                  icon: 'fa-solid fa-history',
                  onClick: handleHistorico
                }
              ]
            }}
          />
        </div>
        
        <ModalEfetuarBloqueio 
          isOpen={showModalEfetuarBloqueio}
          onClose={handleCloseModalBloqueio}
          filtrosCobranca={getFiltrosCobranca()}
        />
        
        <ModalHistorico 
          isOpen={showModalHistorico}
          onClose={handleCloseModalHistorico}
        />
      </div>
    </div>
  );
};

export default Cobranca;
