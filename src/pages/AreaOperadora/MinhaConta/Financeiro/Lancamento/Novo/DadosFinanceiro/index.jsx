import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from "../../../../../../../components/InputPadrao";
import TogglePadrao from "../../../../../../../components/TogglePadrao";
import { validarCampos, limparFiltros } from "../../../../../../../utils/functions.js";

const DadosFinanceiro = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const { lancamentoParaEdicao, modoEdicao } = props;

  const [referencia, setReferencia, referenciaRef] = UseInputMask();
  const [statusNovo, setStatusNovo, statusNovoRef] = UseInputMask();
  const [tipoNovo, setTipoNovo, tipoNovoRef] = UseInputMask(null, 'text', 'Cliente');
  const [historico, setHistorico, historicoRef] = UseInputMask();
  const [tipoParcelaNovo, setTipoParcelaNovo, tipoParcelaNovoRef] = UseInputMask();
  const [centroCusto, setCentroCusto, centroCustoRef] = UseInputMask();
  const [toggles, setToggles] = useState({
    pagou: false,
    remessa: false,
    boleto: false,
    fechado: false,
    retornado: false
  });
  const [numeroDocumento, setNumeroDocumento, numeroDocumentoRef] = UseInputMask();
  const [planoContasCredito, setPlanoContasCredito, planoContasCreditoRef] = UseInputMask();
  const [nossoNumero, setNossoNumero, nossoNumeroRef] = UseInputMask();
  const [numeroParcela, setNumeroParcela, numeroParcelaRef] = UseInputMask();
  const [totalParcela, setTotalParcela, totalParcelaRef] = UseInputMask();
  const [notaFiscal, setNotaFiscal, notaFiscalRef] = UseInputMask();
  const [codigoBarras, setCodigoBarras, codigoBarrasRef] = UseInputMask();
  const [dataDocumento, setDataDocumento, dataDocumentoRef] = UseInputMask();
  const [vencimentoOriginal, setVencimentoOriginal, vencimentoOriginalRef] = UseInputMask();
  const [vencimento, setVencimento, vencimentoRef] = UseInputMask();
  const [pagamento, setPagamento, pagamentoRef] = UseInputMask();
  const [credito, setCredito, creditoRef] = UseInputMask();
  const [arquivoRetorno, setArquivoRetorno, arquivoRetornoRef] = UseInputMask();
  const [nominal, setNominal, nominalRef] = UseInputMask(null, 'number');
  const [servicos, setServicos, servicosRef] = UseInputMask(null, 'number');
  const [coparticipacao, setCoparticipacao, coparticipacaoRef] = UseInputMask(null, 'number');
  const [txAssociativa, setTxAssociativa, txAssociativaRef] = UseInputMask(null, 'number');
  const [txAdministrativa, setTxAdministrativa, txAdministrativaRef] = UseInputMask(null, 'number');
  const [vrReajusteAnual, setVrReajusteAnual, vrReajusteAnualRef] = UseInputMask(null, 'number');
  const [juros, setJuros, jurosRef] = UseInputMask(null, 'number');
  const [multa, setMulta, multaRef] = UseInputMask(null, 'number');
  const [acrescimo, setAcrescimo, acrescimoRef] = UseInputMask(null, 'number');
  const [desconto, setDesconto, descontoRef] = UseInputMask(null, 'number');
  const [vrInclusaoRetroativa, setVrInclusaoRetroativa, vrInclusaoRetroativaRef] = UseInputMask(null, 'number');
  const [vrReajusteFxIdade, setVrReajusteFxIdade, vrReajusteFxIdadeRef] = UseInputMask(null, 'number');
  const [liquido, setLiquido, liquidoRef] = UseInputMask(null, 'number');
  const [linhaDigitavel, setLinhaDigitavel, linhaDigitavelRef] = UseInputMask();
  const [valorPago, setValorPago, valorPagoRef] = UseInputMask(null, 'number');

  const inputStyle = {
    readOnly: true,
    backgroundColor: "var(--cinza-claro)",
    color: "var(--cinza-escuro)",
    borderColor: "var(--cinza-claro)",
    cursor: "default",
    boxShadow: "none",
    outline: "none",
    border: "none",
  };


  useEffect(() => {
    if (modoEdicao && lancamentoParaEdicao && typeof lancamentoParaEdicao === 'object') {
      const camposTexto = [
        { campo: 'referencia', valor: lancamentoParaEdicao.referencia },
        { campo: 'statusFi', valor: lancamentoParaEdicao.statusFi },
        { campo: 'tipo', valor: lancamentoParaEdicao.tipo || 'Cliente' },
        { campo: 'historico', valor: lancamentoParaEdicao.historico },
        { campo: 'tipoParcela', valor: lancamentoParaEdicao.tipoParcela },
        { campo: 'centroCusto', valor: lancamentoParaEdicao.centroCusto },
        { campo: 'nossoNumero', valor: lancamentoParaEdicao.nossoNumero },
        { campo: 'numeroNotaFiscal', valor: lancamentoParaEdicao.numeroNotaFiscal },
        { campo: 'venctoOriginal', valor: lancamentoParaEdicao.venctoOriginal },
        { campo: 'vencimento', valor: lancamentoParaEdicao.vencimento },
        { campo: 'pagamento', valor: lancamentoParaEdicao.pagamento },
        { campo: 'credito', valor: lancamentoParaEdicao.credito },
        { campo: 'arquivoRetorno', valor: lancamentoParaEdicao.arquivoRetorno }
      ];

      const settersTexto = {
        referencia: setReferencia,
        statusFi: setStatusNovo,
        tipo: setTipoNovo,
        historico: setHistorico,
        tipoParcela: setTipoParcelaNovo,
        centroCusto: setCentroCusto,
        nossoNumero: setNossoNumero,
        numeroNotaFiscal: setNotaFiscal,
        venctoOriginal: setVencimentoOriginal,
        vencimento: setVencimento,
        pagamento: setPagamento,
        credito: setCredito,
        arquivoRetorno: setArquivoRetorno
      };

             camposTexto.map(({ campo, valor }) => {
         const setter = settersTexto[campo];
         if (setter) {
           const mockEvent = {
             target: { value: valor || '' }
           };
           setter(mockEvent);
         }
         return null;
       });

      const camposNumericos = [
        { campo: 'nominal', valor: lancamentoParaEdicao.nominal, prefixo: 'R$ ' },
        { campo: 'coparticipacao', valor: lancamentoParaEdicao.coparticipacao },
        { campo: 'txAssociativa', valor: lancamentoParaEdicao.txAssociativa },
        { campo: 'txAdministrativa', valor: lancamentoParaEdicao.txAdministrativa },
        { campo: 'vrReajusteAnual', valor: lancamentoParaEdicao.vrReajusteAnual },
        { campo: 'juros', valor: lancamentoParaEdicao.juros },
        { campo: 'multa', valor: lancamentoParaEdicao.multa },
        { campo: 'acrescimo', valor: lancamentoParaEdicao.acrescimo },
        { campo: 'desconto', valor: lancamentoParaEdicao.desconto },
        { campo: 'vrInclusaoRetroativa', valor: lancamentoParaEdicao.vrInclusaoRetroativa },
        { campo: 'vrReajusteFxIdade', valor: lancamentoParaEdicao.vrReajusteFxIdade },
        { campo: 'liquido', valor: lancamentoParaEdicao.liquido }
      ];

      const settersNumericos = {
        nominal: setNominal,
        coparticipacao: setCoparticipacao,
        txAssociativa: setTxAssociativa,
        txAdministrativa: setTxAdministrativa,
        vrReajusteAnual: setVrReajusteAnual,
        juros: setJuros,
        multa: setMulta,
        acrescimo: setAcrescimo,
        desconto: setDesconto,
        vrInclusaoRetroativa: setVrInclusaoRetroativa,
        vrReajusteFxIdade: setVrReajusteFxIdade,
        liquido: setLiquido
      };

             camposNumericos.map(({ campo, valor, prefixo = '' }) => {
         if (valor) {
           let valorFormatado = '';
           
           if (typeof valor === 'number' && !isNaN(valor)) {
             valorFormatado = `${prefixo}${valor.toFixed(2).replace('.', ',')}`;
           } else if (typeof valor === 'string') {
             valorFormatado = valor;
           }
           
           if (valorFormatado) {
             const setter = settersNumericos[campo];
             if (setter) {
               const mockEvent = {
                 target: { value: valorFormatado }
               };
               setter(mockEvent);
             }
           }
         }
         return null;
       });


      setToggles({
        pagou: lancamentoParaEdicao.pago === 'Sim',
        remessa: false,
        boleto: lancamentoParaEdicao.numeroBoleto ? true : false,
        fechado: false,
        retornado: lancamentoParaEdicao.arquivoRetorno ? true : false
      });


      if (lancamentoParaEdicao.parcela && typeof lancamentoParaEdicao.parcela === 'string') {
        const [numero, total] = lancamentoParaEdicao.parcela.split('/');
        setNumeroParcela(numero || '');
        setTotalParcela(total || '');
      }
    }
  }, [modoEdicao, lancamentoParaEdicao]);

  const sections = [
    {
      id: "gerais",
      label: "Dados Gerais",
      icon: "fa-solid fa-info-circle",
    },
    {
      id: "documento",
      label: "Detalhes do Documento",
      icon: "fa-solid fa-file-alt",
    },
    {
      id: "valores",
      label: "Valores",
      icon: "fa-solid fa-money-bill-wave",
    },
  ];

  const statusNovoOptions = [
    { value: "Pendente", label: "Pendente" },
    { value: "Pago", label: "Pago" },
    { value: "Vencido", label: "Vencido" },
    { value: "Cancelado", label: "Cancelado" }
  ];

  const tipoNovoOptions = [
    { value: "Cliente", label: "Cliente" },
    { value: "Receita", label: "Receita" },
    { value: "Despesa", label: "Despesa" },
    { value: "Funcionário", label: "Funcionário" },
    { value: "Fornecedor", label: "Fornecedor" },
    { value: "Representante", label: "Representante" }
  ];

  const tipoParcelaNovoOptions = [
    { value: "Mensal", label: "Mensal" },
    { value: "Trimestral", label: "Trimestral" },
    { value: "Semestral", label: "Semestral" },
    { value: "Anual", label: "Anual" }
  ];

  const centroCustoOptions = [
    { value: "Administrativo", label: "Administrativo" },
    { value: "Comercial", label: "Comercial" },
    { value: "Financeiro", label: "Financeiro" },
    { value: "Operacional", label: "Operacional" }
  ];

  const receitaReadOnlyFields = [
    "numeroDocumento",
    "nossoNumero",
    "dataDocumento",
    "vencimentoOriginal",
    "credito",
    "arquivoRetorno",
    "servicos",
    "juros",
    "multa",
    "liquido",
    "codigoBarras",
    "linhaDigitavel",
    "valorPago"
  ];

  const despesaReadOnlyFields = [
    "nossoNumero",
    "credito",
    "arquivoRetorno",
    "servicos",
    "juros",
    "multa",
    "liquido",
    "codigoBarras",
    "linhaDigitavel",
    "valorPago"
  ];

  const despesaHiddenFields = [
    "remessa",
    "boleto", 
    "retornado",
    "nossoNumero",
    "pagamento",
    "credito",
    "arquivoRetorno",
    "servicos"
  ];

  const isReceitaReadOnly = (fieldName) => {
    if (tipoNovo === "Receita" || tipoNovo === "Cliente") {
      return receitaReadOnlyFields.includes(fieldName);
    }
    if (["Despesa", "Fornecedor", "Funcionário", "Representante"].includes(tipoNovo)) {
      return despesaReadOnlyFields.includes(fieldName);
    }
    return false;
  };

  const isDespesaHidden = (fieldName) => {
    return ["Despesa", "Fornecedor", "Funcionário", "Representante"].includes(tipoNovo) && despesaHiddenFields.includes(fieldName);
  };

  const getPlanoContasLabel = () => {
    if (tipoNovo === "Cliente") {
      return "Cliente";
    }
    if (tipoNovo === "Despesa") {
      return "Plano de Contas - Débito";
    }
    if (tipoNovo === "Fornecedor") {
      return "Fornecedor";
    }
    if (tipoNovo === "Funcionário") {
      return "Funcionário";
    }
    if (tipoNovo === "Representante") {
      return "Representante";
    }
    return "Plano de Contas - Crédito";
  };

  const handleValorBlur = (valor, setValor, isMonetary = false) => {
    if (!valor || valor.trim() === '') {
      setValor(isMonetary ? 'R$ 0,00' : '0,00');
    }
  };

  const validarCamposObrigatorios = () => {
    const arrayCamposObrigatorios = [
      { valor: referencia, nome: "Referência" },
      { valor: statusNovo, nome: "Status" },
      { valor: tipoNovo, nome: "Tipo" },
      { valor: planoContasCredito, nome: getPlanoContasLabel() },
      { valor: numeroDocumento, nome: "Número do Documento" },
      { valor: numeroParcela, nome: "Número da Parcela" },
      { valor: totalParcela, nome: "Total de Parcelas" }
    ];

    return validarCampos(arrayCamposObrigatorios);
  };

  useImperativeHandle(ref, () => ({
    validarCamposObrigatorios,
  }));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const renderSectionContent = (sectionId) => {
    switch (sectionId) {
      case "gerais":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Referência"
              identifier="referencia"
              value={referencia}
              onChange={setReferencia}
              inputRef={referenciaRef}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
              required
            />
            <UseInputPadrao
              label="Status"
              identifier="status-novo"
              value={statusNovo}
              onChange={setStatusNovo}
              inputRef={statusNovoRef}
              type="select"
              options={statusNovoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
              required
            />
            <UseInputPadrao
              label="Tipo"
              identifier="tipo-novo"
              value={tipoNovo}
              onChange={setTipoNovo}
              inputRef={tipoNovoRef}
              type="select"
              options={tipoNovoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
              defaultSelect={false}
              required
            />
            <UseInputPadrao
              label="Tipo de Parcela"
              identifier="tipo-parcela-novo"
              value={tipoParcelaNovo}
              onChange={setTipoParcelaNovo}
              inputRef={tipoParcelaNovoRef}
              type="select"
              options={tipoParcelaNovoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Centro Custo"
              identifier="centro-custo"
              value={centroCusto}
              onChange={setCentroCusto}
              inputRef={centroCustoRef}
              type="select"
              options={centroCustoOptions}
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label={getPlanoContasLabel()}
              identifier="plano-contas-credito"
              value={planoContasCredito}
              onChange={setPlanoContasCredito}
              inputRef={planoContasCreditoRef}
              type="text"
              width={isMobile ? 100 : 33.33}
              gap={isMobile ? 0 : 0}
              required
            />
            <UseInputPadrao
              label="Histórico"
              identifier="historico"
              value={historico}
              onChange={setHistorico}
              inputRef={historicoRef}
              type="text"
              width={isMobile ? 100 : 100}
              gap={isMobile ? 0 : 0}
            />
            <TogglePadrao
              label="Pagou"
              checked={toggles.pagou}
              onChange={(checked) => setToggles({ ...toggles, pagou: checked })}
              option1="Não"
              option2="Sim"
            />
            {!isDespesaHidden("remessa") && (
              <TogglePadrao
                label="Remessa"
                checked={toggles.remessa}
                onChange={(checked) => setToggles({ ...toggles, remessa: checked })}
                option1="Não"
                option2="Sim"
              />
            )}
            {!isDespesaHidden("boleto") && (
              <TogglePadrao
                label="Boleto"
                checked={toggles.boleto}
                onChange={(checked) => setToggles({ ...toggles, boleto: checked })}
                option1="Não"
                option2="Sim"
              />
            )}
            <TogglePadrao
              label="Fechado"
              checked={toggles.fechado}
              onChange={(checked) => setToggles({ ...toggles, fechado: checked })}
              option1="Não"
              option2="Sim"
            />
            {!isDespesaHidden("retornado") && (
              <TogglePadrao
                label="Retornado"
                checked={toggles.retornado}
                onChange={(checked) => setToggles({ ...toggles, retornado: checked })}
                option1="Não"
                option2="Sim"
              />
            )}
          </div>
        );

      case "documento":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Número do Documento"
              identifier="numero-documento"
              value={numeroDocumento}
              onChange={setNumeroDocumento}
              inputRef={numeroDocumentoRef}
              readOnly={isReceitaReadOnly("numeroDocumento")}
              inputStyle={isReceitaReadOnly("numeroDocumento") ? inputStyle : undefined}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
              required
            />
            {!isDespesaHidden("nossoNumero") && (
              <UseInputPadrao
                label="Nosso Número"
                identifier="nosso-numero"
                value={nossoNumero}
                onChange={setNossoNumero}
                inputRef={nossoNumeroRef}
                readOnly={isReceitaReadOnly("nossoNumero")}
                inputStyle={isReceitaReadOnly("nossoNumero") ? inputStyle : undefined}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
              />
            )}
            <UseInputPadrao
              label="Número da Parcela"
              identifier="numero-parcela"
              type="number"
              value={numeroParcela}
              onChange={setNumeroParcela}
              inputRef={numeroParcelaRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
              required
            />
            <UseInputPadrao
              label="Total de Parcelas"
              identifier="total-parcela"
              type="number"
              value={totalParcela}
              onChange={setTotalParcela}
              inputRef={totalParcelaRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0}
              required
            />
            <UseInputPadrao
              label="Nota Fiscal"
              identifier="nota-fiscal"
              value={notaFiscal}
              onChange={setNotaFiscal}
              inputRef={notaFiscalRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Código de Barras"
              identifier="codigo-barras"
              value={codigoBarras}
              onChange={setCodigoBarras}
              inputRef={codigoBarrasRef}
              readOnly={isReceitaReadOnly("codigoBarras")}
              inputStyle={isReceitaReadOnly("codigoBarras") ? inputStyle : undefined}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Data do Documento"
              identifier="data-documento"
              type="date"
              value={dataDocumento}
              onChange={setDataDocumento}
              inputRef={dataDocumentoRef}
              readOnly={isReceitaReadOnly("dataDocumento")}
              inputStyle={isReceitaReadOnly("dataDocumento") ? inputStyle : undefined}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Vencimento Original"
              identifier="vencimento-original"
              type="date"
              value={vencimentoOriginal}
              onChange={setVencimentoOriginal}
              inputRef={vencimentoOriginalRef}
              readOnly={isReceitaReadOnly("vencimentoOriginal")}
              inputStyle={isReceitaReadOnly("vencimentoOriginal") ? inputStyle : undefined}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Vencimento"
              identifier="vencimento"
              type="date"
              value={vencimento}
              onChange={setVencimento}
              inputRef={vencimentoRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            {!isDespesaHidden("pagamento") && (
              <UseInputPadrao
                label="Data de Pagamento"
                identifier="pagamento"
                type="date"
                value={pagamento}
                onChange={setPagamento}
                inputRef={pagamentoRef}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
              />
            )}
            {!isDespesaHidden("credito") && (
              <UseInputPadrao
                label="Crédito"
                identifier="credito"
                type="date"
                value={credito}
                onChange={setCredito}
                inputRef={creditoRef}
                readOnly={isReceitaReadOnly("credito")}
                inputStyle={isReceitaReadOnly("credito") ? inputStyle : undefined}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
              />
            )}
            {!isDespesaHidden("arquivoRetorno") && (
              <UseInputPadrao
                label="Arquivo de Retorno"
                identifier="arquivo-retorno"
                value={arquivoRetorno}
                onChange={setArquivoRetorno}
                inputRef={arquivoRetornoRef}
                readOnly={isReceitaReadOnly("arquivoRetorno")}
                inputStyle={isReceitaReadOnly("arquivoRetorno") ? inputStyle : undefined}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0}
              />
            )}
            <UseInputPadrao
              label="Linha Digitável"
              identifier="linha-digitavel"
              value={linhaDigitavel}
              onChange={setLinhaDigitavel}
              inputRef={linhaDigitavelRef}
              readOnly={isReceitaReadOnly("linhaDigitavel")}
              inputStyle={isReceitaReadOnly("linhaDigitavel") ? inputStyle : undefined}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
          </div>
        );

      case "valores":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Valor Nominal"
              placeholder="R$ 0,00"
              identifier="nominal"
              value={nominal}
              onChange={setNominal}
              inputRef={nominalRef}
              onBlur={() => handleValorBlur(nominal, setNominal, true)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            {!isDespesaHidden("servicos") && (
              <UseInputPadrao
                label="Serviços"
                placeholder="R$ 0,00"
                identifier="servicos"
                value={servicos}
                onChange={setServicos}
                inputRef={servicosRef}
                readOnly={isReceitaReadOnly("servicos")}
                inputStyle={isReceitaReadOnly("servicos") ? inputStyle : undefined}
                onBlur={() => handleValorBlur(servicos, setServicos)}
                width={isMobile ? 100 : 16.66}
                gap={isMobile ? 0 : 0.5}
              />
            )}
            <UseInputPadrao
              label="Coparticipação"
              placeholder="R$ 0,00"
              identifier="coparticipacao"
              value={coparticipacao}
              onChange={setCoparticipacao}
              inputRef={coparticipacaoRef}
              onBlur={() => handleValorBlur(coparticipacao, setCoparticipacao)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Taxa Associativa"
              placeholder="R$ 0,00"
              identifier="tx-associativa"
              value={txAssociativa}
              onChange={setTxAssociativa}
              inputRef={txAssociativaRef}
              onBlur={() => handleValorBlur(txAssociativa, setTxAssociativa)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Taxa Administrativa"
              placeholder="R$ 0,00"
              identifier="tx-administrativa"
              value={txAdministrativa}
              onChange={setTxAdministrativa}
              inputRef={txAdministrativaRef}
              onBlur={() => handleValorBlur(txAdministrativa, setTxAdministrativa)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Reajuste Anual"
              placeholder="R$ 0,00"
              identifier="vr-reajuste-anual"
              value={vrReajusteAnual}
              onChange={setVrReajusteAnual}
              inputRef={vrReajusteAnualRef}
              onBlur={() => handleValorBlur(vrReajusteAnual, setVrReajusteAnual)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Juros"
              placeholder="R$ 0,00"
              identifier="juros"
              value={juros}
              onChange={setJuros}
              inputRef={jurosRef}
              readOnly={isReceitaReadOnly("juros")}
              inputStyle={isReceitaReadOnly("juros") ? inputStyle : undefined}
              onBlur={() => handleValorBlur(juros, setJuros)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Multa"
              placeholder="R$ 0,00"
              identifier="multa"
              value={multa}
              onChange={setMulta}
              inputRef={multaRef}
              readOnly={isReceitaReadOnly("multa")}
              inputStyle={isReceitaReadOnly("multa") ? inputStyle : undefined}
              onBlur={() => handleValorBlur(multa, setMulta)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Acréscimo"
              placeholder="R$ 0,00"
              identifier="acrescimo"
              value={acrescimo}
              onChange={setAcrescimo}
              inputRef={acrescimoRef}
              onBlur={() => handleValorBlur(acrescimo, setAcrescimo)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Desconto"
              placeholder="R$ 0,00"
              identifier="desconto"
              value={desconto}
              onChange={setDesconto}
              inputRef={descontoRef}
              onBlur={() => handleValorBlur(desconto, setDesconto)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Inclusão Retroativa"
              placeholder="R$ 0,00"
              identifier="vr-inclusao-retroativa"
              value={vrInclusaoRetroativa}
              onChange={setVrInclusaoRetroativa}
              inputRef={vrInclusaoRetroativaRef}
              onBlur={() => handleValorBlur(vrInclusaoRetroativa, setVrInclusaoRetroativa)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Reajuste Fx Idade"
              placeholder="R$ 0,00"
              identifier="vr-reajuste-fx-idade"
              value={vrReajusteFxIdade}
              onChange={setVrReajusteFxIdade}
              inputRef={vrReajusteFxIdadeRef}
              onBlur={() => handleValorBlur(vrReajusteFxIdade, setVrReajusteFxIdade)}
              width={isMobile ? 100 : 16.66}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Valor Líquido"
              placeholder="R$ 0,00"
              identifier="liquido"
              value={liquido}
              onChange={setLiquido}
              inputRef={liquidoRef}
              readOnly={isReceitaReadOnly("liquido")}
              inputStyle={isReceitaReadOnly("liquido") ? inputStyle : undefined}
              onBlur={() => handleValorBlur(liquido, setLiquido)}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            {!isDespesaHidden("valorPago") && (
              <UseInputPadrao
                label="Valor Pago"
                placeholder="R$ 0,00"
                identifier="valor-pago"
                value={valorPago}
                onChange={setValorPago}
                inputRef={valorPagoRef}
                readOnly={isReceitaReadOnly("valorPago")}
                inputStyle={isReceitaReadOnly("valorPago") ? inputStyle : undefined}
                onBlur={() => handleValorBlur(valorPago, setValorPago, true)}
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.dadosFinanceiroContainer}>
      <div className={styles.filtroTabelaField}>
        <div className={styles.filtroTabelaContent}>
          <div className={styles.sectionsContainer}>
        {sections.map((section) => (
          <div key={section.id} className={styles.sectionPanel}>
            <div className={styles.sectionHeader}>
              <h6 className={styles.sectionTitle}>
                <i className={section.icon} />
                {section.label}
              </h6>
            </div>
            <div className={styles.sectionContent}>
              {renderSectionContent(section.id)}
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default DadosFinanceiro; 