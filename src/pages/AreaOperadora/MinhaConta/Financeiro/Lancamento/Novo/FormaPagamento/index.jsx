import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from "../../../../../../../components/InputPadrao";
import { limparFiltros } from "../../../../../../../utils/functions.js";

const FormaPagamento = forwardRef(({ lancamentoParaEdicao, modoEdicao }, ref) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [tipoPagamento, setTipoPagamento, tipoPagamentoRef] = UseInputMask();
  const [contraPartida, setContraPartida, contraPartidaRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [agencia, setAgencia, agenciaRef] = UseInputMask();
  const [conta, setConta, contaRef] = UseInputMask();
  const [titularConta, setTitularConta, titularContaRef] = UseInputMask();
  const [cpfCnpjConta, setCpfCnpjConta, cpfCnpjContaRef] = UseInputMask();
  const [numeroCheque, setNumeroCheque, numeroChequeRef] = UseInputMask();
  const [tipoCartao, setTipoCartao, tipoCartaoRef] = UseInputMask();
  const [operadora, setOperadora, operadoraRef] = UseInputMask();
  const [numeroCartao, setNumeroCartao, numeroCartaoRef] = UseInputMask();
  const [dataValidade, setDataValidade, dataValidadeRef] = UseInputMask();
  const [titularCartao, setTitularCartao, titularCartaoRef] = UseInputMask();
  const [cv, setCv, cvRef] = UseInputMask();

  useEffect(() => {
    if (modoEdicao && lancamentoParaEdicao && typeof lancamentoParaEdicao === 'object') {
      setTipoPagamento(lancamentoParaEdicao.tipoPagamento || '');
      setContraPartida(lancamentoParaEdicao.contraPartida || '');
      setBanco(lancamentoParaEdicao.banco || '');
      setAgencia(lancamentoParaEdicao.agencia || '');
      setConta(lancamentoParaEdicao.conta || '');
      setTitularConta(lancamentoParaEdicao.titularConta || '');
      setCpfCnpjConta(lancamentoParaEdicao.cpfCnpjConta || '');
      setNumeroCheque(lancamentoParaEdicao.numeroCheque || '');
      setTipoCartao(lancamentoParaEdicao.tipoCartao || '');
      setOperadora(lancamentoParaEdicao.operadora || '');
      setNumeroCartao(lancamentoParaEdicao.numeroCartao || '');
      setDataValidade(lancamentoParaEdicao.dataValidade || '');
      setTitularCartao(lancamentoParaEdicao.titularCartao || '');
      setCv(lancamentoParaEdicao.cv || '');
    }
  }, [modoEdicao, lancamentoParaEdicao]);

  const sections = [
    {
      id: "gerais",
      label: "Dados Gerais",
      icon: "fa-solid fa-info-circle",
    },
    {
      id: "bancarios",
      label: "Dados Bancários",
      icon: "fa-solid fa-university",
    },
    {
      id: "cartao",
      label: "Dados do Cartão",
      icon: "fa-solid fa-credit-card",
    },
  ];

  const tipoPagamentoOptions = [
    { value: "dinheiro", label: "Dinheiro" },
    { value: "pix", label: "PIX" },
    { value: "transferencia", label: "Transferência" },
    { value: "cheque", label: "Cheque" },
    { value: "cartaoCredito", label: "Cartão de Crédito" },
    { value: "cartaoDebito", label: "Cartão de Débito" },
    { value: "boleto", label: "Boleto" }
  ];

  const contraPartidaOptions = [
    { value: "caixa", label: "Caixa" },
    { value: "banco", label: "Banco" },
    { value: "outros", label: "Outros" }
  ];

  const bancoOptions = [
    { value: "nubank", label: "Nubank" },
    { value: "itau", label: "Itaú" },
    { value: "santander", label: "Santander" },
    { value: "bradesco", label: "Bradesco" },
    { value: "bb", label: "Banco do Brasil" }
  ];

  const tipoCartaoOptions = [
    { value: "credito", label: "Crédito" },
    { value: "debito", label: "Débito" }
  ];

  const operadoraOptions = [
    { value: "visa", label: "Visa" },
    { value: "mastercard", label: "Mastercard" },
    { value: "elo", label: "Elo" },
    { value: "hipercard", label: "Hipercard" },
    { value: "amex", label: "American Express" }
  ];

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
              label="Tipo de Pagamento"
              identifier="tipo-pagamento"
              value={tipoPagamento}
              onChange={setTipoPagamento}
              inputRef={tipoPagamentoRef}
              type="select"
              options={tipoPagamentoOptions}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Contra Partida"
              identifier="contra-partida"
              value={contraPartida}
              onChange={setContraPartida}
              inputRef={contraPartidaRef}
              type="select"
              options={contraPartidaOptions}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      case "bancarios":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Banco"
              identifier="banco"
              value={banco}
              onChange={setBanco}
              inputRef={bancoRef}
              type="select"
              options={bancoOptions}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Agência"
              identifier="agencia"
              value={agencia}
              onChange={setAgencia}
              inputRef={agenciaRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Conta"
              identifier="conta"
              value={conta}
              onChange={setConta}
              inputRef={contaRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Titular da Conta"
              identifier="titular-conta"
              value={titularConta}
              onChange={setTitularConta}
              inputRef={titularContaRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="CPF/CNPJ da Conta"
              identifier="cpf-cnpj-conta"
              value={cpfCnpjConta}
              onChange={setCpfCnpjConta}
              inputRef={cpfCnpjContaRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Número do Cheque"
              identifier="numero-cheque"
              value={numeroCheque}
              onChange={setNumeroCheque}
              inputRef={numeroChequeRef}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      case "cartao":
        return (
          <div className={styles.tabContent}>
            <UseInputPadrao
              label="Cartão de Débito/Crédito"
              identifier="tipo-cartao"
              value={tipoCartao}
              onChange={setTipoCartao}
              inputRef={tipoCartaoRef}
              type="select"
              options={tipoCartaoOptions}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Operadora"
              identifier="operadora"
              value={operadora}
              onChange={setOperadora}
              inputRef={operadoraRef}
              type="select"
              options={operadoraOptions}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="Número do Cartão"
              identifier="numero-cartao"
              value={numeroCartao}
              onChange={setNumeroCartao}
              inputRef={numeroCartaoRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Data de Validade"
              identifier="data-validade"
              type="date"
              value={dataValidade}
              onChange={setDataValidade}
              inputRef={dataValidadeRef}
              width={isMobile ? 100 : 20}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Titular do Cartão"
              identifier="titular-cartao"
              value={titularCartao}
              onChange={setTitularCartao}
              inputRef={titularCartaoRef}
              width={isMobile ? 100 : 30}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="CV"
              identifier="cv"
              value={cv}
              onChange={setCv}
              inputRef={cvRef}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const resetarCampos = () => {
    limparFiltros([
      { setter: setTipoPagamento, ref: tipoPagamentoRef },
      { setter: setContraPartida, ref: contraPartidaRef },
      { setter: setBanco, ref: bancoRef },
      { setter: setAgencia, ref: agenciaRef },
      { setter: setConta, ref: contaRef },
      { setter: setTitularConta, ref: titularContaRef },
      { setter: setCpfCnpjConta, ref: cpfCnpjContaRef },
      { setter: setNumeroCheque, ref: numeroChequeRef },
      { setter: setTipoCartao, ref: tipoCartaoRef },
      { setter: setOperadora, ref: operadoraRef },
      { setter: setNumeroCartao, ref: numeroCartaoRef },
      { setter: setDataValidade, ref: dataValidadeRef },
      { setter: setTitularCartao, ref: titularCartaoRef },
      { setter: setCv, ref: cvRef }
    ]);
  };

  useImperativeHandle(ref, () => ({
    resetarCampos
  }));

  return (
    <div className={styles.formaPagamentoContainer}>
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

export default FormaPagamento; 