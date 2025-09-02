import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styles from "./styles.module.css";
import { UseInputMask, UseInputPadrao } from "../../../../../../../components/InputPadrao";
import { limparFiltros } from "../../../../../../../utils/functions.js";

const OrigemLancamento = forwardRef(({ lancamentoParaEdicao, modoEdicao }, ref) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  const [tipoPagamento, handleTipoPagamento, tipoPagamentoRef] = UseInputMask();
  const [contaContabil, handleContaContabil, contaContabilRef] = UseInputMask();
  const [banco, handleBanco, bancoRef] = UseInputMask();
  const [agencia, handleAgencia, agenciaRef] = UseInputMask();
  const [conta, handleConta, contaRef] = UseInputMask();
  const [titularConta, handleTitularConta, titularContaRef] = UseInputMask();
  const [cpfCnpjConta, handleCpfCnpjConta, cpfCnpjContaRef] = UseInputMask();
  const [mensagem1, handleMensagem1, mensagem1Ref] = UseInputMask();
  const [mensagem2, handleMensagem2, mensagem2Ref] = UseInputMask();
  const [mensagem3, handleMensagem3, mensagem3Ref] = UseInputMask();
  const [mensagem4, handleMensagem4, mensagem4Ref] = UseInputMask();
  const [importante, handleImportante, importanteRef] = UseInputMask();

  useEffect(() => {
    if (modoEdicao && lancamentoParaEdicao && typeof lancamentoParaEdicao === 'object') {
      handleTipoPagamento({ target: { value: lancamentoParaEdicao.tipoPagamento || '' } });
      handleContaContabil({ target: { value: lancamentoParaEdicao.contaContabil || '' } });
      handleBanco({ target: { value: lancamentoParaEdicao.banco || '' } });
      handleAgencia({ target: { value: lancamentoParaEdicao.agencia || '' } });
      handleConta({ target: { value: lancamentoParaEdicao.conta || '' } });
      handleTitularConta({ target: { value: lancamentoParaEdicao.titularConta || '' } });
      handleCpfCnpjConta({ target: { value: lancamentoParaEdicao.cpfCnpjConta || '' } });
      handleMensagem1({ target: { value: lancamentoParaEdicao.mensagem1 || '' } });
      handleMensagem2({ target: { value: lancamentoParaEdicao.mensagem2 || '' } });
      handleMensagem3({ target: { value: lancamentoParaEdicao.mensagem3 || '' } });
      handleMensagem4({ target: { value: lancamentoParaEdicao.mensagem4 || '' } });
      handleImportante({ target: { value: lancamentoParaEdicao.importante || '' } });
    }
  }, [modoEdicao, lancamentoParaEdicao]);

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
      id: "mensagens",
      label: "Mensagens",
      icon: "fa-solid fa-comment",
    },
  ];

  const tipoPagamentoOptions = [
    { value: "pix", label: "PIX" },
    { value: "cartaoCredito", label: "Cartão de Crédito" },
    { value: "cartaoDebito", label: "Cartão de Débito" }
  ];

  const contaContabilOptions = [
    { value: "teste1", label: "Teste 1" },
    { value: "teste2", label: "Teste 2" },
    { value: "teste3", label: "Teste 3" }
  ];

  const bancoOptions = [
    { value: "nubank", label: "Nubank" },
    { value: "itau", label: "Itaú" },
    { value: "santander", label: "Santander" }
  ];

  const dadosBancarios = {
    nubank: {
      agencia: "0001",
      conta: "12345678-9",
      titular: "João Silva",
      cpfCnpj: "123.456.789-00"
    },
    itau: {
      agencia: "1234",
      conta: "98765-4",
      titular: "Maria Santos",
      cpfCnpj: "987.654.321-00"
    },
    santander: {
      agencia: "5678",
      conta: "54321-0",
      titular: "Pedro Costa",
      cpfCnpj: "456.789.123-00"
    }
  };

  useEffect(() => {
    if (banco && dadosBancarios[banco]) {
      handleAgencia({ target: { value: dadosBancarios[banco].agencia } });
      handleConta({ target: { value: dadosBancarios[banco].conta } });
      handleTitularConta({ target: { value: dadosBancarios[banco].titular } });
      handleCpfCnpjConta({ target: { value: dadosBancarios[banco].cpfCnpj } });
    } else {
      handleAgencia({ target: { value: "" } });
      handleConta({ target: { value: "" } });
      handleTitularConta({ target: { value: "" } });
      handleCpfCnpjConta({ target: { value: "" } });
    }
  }, [banco]);

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
              onChange={handleTipoPagamento}
              inputRef={tipoPagamentoRef}
              type="select"
              options={tipoPagamentoOptions}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Conta Contábil"
              identifier="conta-contabil"
              value={contaContabil}
              onChange={handleContaContabil}
              inputRef={contaContabilRef}
              type="select"
              options={contaContabilOptions}
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
              onChange={handleBanco}
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
              inputRef={agenciaRef}
              inputStyle={inputStyle}
              readOnly={true}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Conta"
              identifier="conta"
              value={conta}
              inputRef={contaRef}
              inputStyle={inputStyle}
              readOnly={true}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0.5}
            />
            <UseInputPadrao
              label="Titular da Conta"
              identifier="titular-conta"
              value={titularConta}
              inputRef={titularContaRef}
              inputStyle={inputStyle}
              readOnly={true}
              width={isMobile ? 100 : 25}
              gap={isMobile ? 0 : 0}
            />
            <UseInputPadrao
              label="CPF/CNPJ da Conta"
              identifier="cpf-cnpj-conta"
              value={cpfCnpjConta}
              inputRef={cpfCnpjContaRef}
              inputStyle={inputStyle}
              readOnly={true}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 0}
            />
          </div>
        );

      case "mensagens":
        return (
          <div className={styles.tabContent}>
            <div className={styles.mensagensGrid}>
              <div className={styles.mensagemContainer}>
                <UseInputPadrao
                  label="Mensagem 1"
                  identifier="mensagem1"
                  value={mensagem1}
                  onChange={handleMensagem1}
                  inputRef={mensagem1Ref}
                  type="text"
                  maxLength={40}
                  width={100}
                  gap={0}
                />
                <div className={styles.contadorCaracteres}>
                  {mensagem1.length}/40 caracteres
                </div>
              </div>
              <div className={styles.mensagemContainer}>
                <UseInputPadrao
                  label="Mensagem 2"
                  identifier="mensagem2"
                  value={mensagem2}
                  onChange={handleMensagem2}
                  inputRef={mensagem2Ref}
                  type="text"
                  maxLength={40}
                  width={100}
                  gap={0}
                />
                <div className={styles.contadorCaracteres}>
                  {mensagem2.length}/40 caracteres
                </div>
              </div>
              <div className={styles.mensagemContainer}>
                <UseInputPadrao
                  label="Mensagem 3"
                  identifier="mensagem3"
                  value={mensagem3}
                  onChange={handleMensagem3}
                  inputRef={mensagem3Ref}
                  type="text"
                  maxLength={40}
                  width={100}
                  gap={0}
                />
                <div className={styles.contadorCaracteres}>
                  {mensagem3.length}/40 caracteres
                </div>
              </div>
              <div className={styles.mensagemContainer}>
                <UseInputPadrao
                  label="Mensagem 4"
                  identifier="mensagem4"
                  value={mensagem4}
                  onChange={handleMensagem4}
                  inputRef={mensagem4Ref}
                  type="text"
                  maxLength={40}
                  width={100}
                  gap={0}
                />
                <div className={styles.contadorCaracteres}>
                  {mensagem4.length}/40 caracteres
                </div>
              </div>
            </div>
            <div className={styles.importanteContainer}>
              <UseInputPadrao
                label="Importante"
                identifier="importante"
                value={importante}
                onChange={handleImportante}
                inputRef={importanteRef}
                type="textarea"
                maxLength={400}
                width={100}
                gap={0}
              />
              <div className={styles.contadorCaracteres}>
                {importante.length}/400 caracteres
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const resetarCampos = () => {
    limparFiltros([
      { setter: handleTipoPagamento, ref: tipoPagamentoRef },
      { setter: handleContaContabil, ref: contaContabilRef },
      { setter: handleBanco, ref: bancoRef },
      { setter: handleAgencia, ref: agenciaRef },
      { setter: handleConta, ref: contaRef },
      { setter: handleTitularConta, ref: titularContaRef },
      { setter: handleCpfCnpjConta, ref: cpfCnpjContaRef },
      { setter: handleMensagem1, ref: mensagem1Ref },
      { setter: handleMensagem2, ref: mensagem2Ref },
      { setter: handleMensagem3, ref: mensagem3Ref },
      { setter: handleMensagem4, ref: mensagem4Ref },
      { setter: handleImportante, ref: importanteRef }
    ]);
  };

  useImperativeHandle(ref, () => ({
    resetarCampos
  }));

  return (
    <div className={styles.origemLancamentoContainer}>
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

export default OrigemLancamento; 