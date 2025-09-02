import { useEffect, useState } from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import styles from '../styles.module.css';
import TogglePadrao from '../../../../../../../../components/TogglePadrao';

function InformacoesBasicas() {

  const [representante, setRepresentante, representanteRef] = UseInputMask();
  const [CPF, setCPF, CPFRef] = UseInputMask("999.999.999-99", "number");
  const [CNPJ, setCNPJ, CNPJRef] = UseInputMask("99.999.99/9999-99", "number");
  const [CNPJouCPF, setCNPJouCPF] = useState(true); // true é cpf, false é cnpj
  const [comissaoParcela, setComissaoParcela] = useState(false)
  const [filial, setFilial, filialRef] = UseInputMask();
  const [nomeFantasia, setNomeFantasia, nomeFantasiaRef] = UseInputMask();
  const [status, setStatus, statusRef] = UseInputMask();
  const [razaoSocial, setRazaoSocial, razaoSocialRef] = UseInputMask();
  const [nome, setNome, nomeRef] = UseInputMask();
  const [tipo, setTipo, tipoRef] = UseInputMask();
  const [iEstadual, setIEstadual, iEstadualRef] = UseInputMask();
  const [iMunicipal, setIMunicipal, iMunicipalRef] = UseInputMask();
  const [banco, setBanco, bancoRef] = UseInputMask();
  const [agencia, setAgencia, agenciaRef] = UseInputMask();
  const [conta, setConta, contaRef] = UseInputMask();
  const [titularConta, setTitularConta, titularContaRef] = UseInputMask();
  const [CPFouCNPJconta, setCPFouCNPJconta, CPFouCNPJcontaRef] = UseInputMask();
  const [tipoPix, setTipoPix, tipoPixRef] = UseInputMask();
  const [pix, setPix, pixRef] = UseInputMask();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);


  return (
    <>
      <h3 className={styles.titulo}>
        <i className="fa-solid fa-user"></i>
        Representante Pai
      </h3>
      <main className={styles.divSecao}>

        <div className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={representante}
            onChange={setRepresentante}
            inputRef={representanteRef}
            width={isMobile ? 100 : 75}
            gap={0}
            label="Representante"
          />
        </div>

        <h3 className={styles.tituloSecao}>
          {CNPJouCPF ? <i className="fa-solid fa-buildings"></i> : <i className="fa-solid fa-user"></i>}
          Informações Básicas
        </h3>


        <div className={styles.divInfo}>
          <TogglePadrao
            checked={CNPJouCPF}
            option1="CPF"
            option2="CNPJ"
            label="Tipo"
            onChange={() => setCNPJouCPF(!CNPJouCPF)}
          />

          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={filial}
            onChange={setFilial}
            inputRef={filialRef}
            width={isMobile ? 33.33 : 33.33}
            gap={isMobile ? 0 : 0.50}
            label="Filial"
          />

          <TogglePadrao
            checked={comissaoParcela}
            label="Comssião por filial?"
            onChange={() => { setComissaoParcela(!comissaoParcela) }}
          />

        </div>
        {CNPJouCPF ?
          // CNPJ
          (<>

            <div className={styles.divInfo}>
              <UseInputPadrao
                type="text"
                identifier="tipo-cliente-signin"
                value={nomeFantasia}
                onChange={setNomeFantasia}
                inputRef={nomeFantasiaRef}
                width={isMobile ? 100 : 67}
                gap={isMobile ? 0 : 0.50}
                label="Nome Fantasia"
              />
              <UseInputPadrao
                type="select"
                identifier="tipo-cliente-signin"
                value={status}
                onChange={setStatus}
                inputRef={statusRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.50}
                label="Status"
              />
            </div>
            <div className={styles.divInfo}>
              <UseInputPadrao
                identifier="tipo-cliente-signin"
                value={razaoSocial}
                onChange={setRazaoSocial}
                inputRef={razaoSocialRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0.50}
                label="Razão Social"
              />
              <UseInputPadrao
                type="select"
                identifier="tipo-cliente-signin"
                value={tipo}
                onChange={setTipo}
                inputRef={tipoRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0.50}
                label="Tipo"
              />
            </div>
            <div className={styles.divInfo}>
              <UseInputPadrao
                type="text"
                identifier="tipo-cliente-signin"
                value={CNPJ}
                onChange={setCNPJ}
                inputRef={CNPJRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.50}
                label="CNPJ"
              />
              <UseInputPadrao
                type="text"
                identifier="tipo-cliente-signin"
                value={iMunicipal}
                onChange={setIMunicipal}
                inputRef={iMunicipalRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.50}
                label="I.Municipal"
              />
              <UseInputPadrao
                type="text"
                identifier="tipo-cliente-signin"
                value={iEstadual}
                onChange={setIEstadual}
                inputRef={iEstadualRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.50}
                label="I.Estadual"
              />
            </div>

          </>
            // CPF 
          ) : (<>
            <div className={styles.divInfo}>
              <UseInputPadrao
                type="text"
                identifier="tipo-cliente-signin"
                value={nome}
                onChange={setNome}
                inputRef={nomeRef}
                width={isMobile ? 100 : 66.66}
                gap={isMobile ? 0 : 0.50}
                label="Nome"
              />
              <UseInputPadrao
                type="select"
                identifier="tipo-cliente-signin"
                value={status}
                onChange={setStatus}
                inputRef={statusRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.50}
                label="Status"
              />
            </div>
            <div className={styles.divInfo}>
              <UseInputPadrao
                type="text"
                identifier="tipo-cliente-signin"
                value={CPF}
                onChange={setCPF}
                inputRef={CPFRef}
                width={isMobile ? 100 : 66.66}
                gap={isMobile ? 0 : 0.50}
                label="CPF"
              />
              <UseInputPadrao
                type="select"
                identifier="tipo-cliente-signin"
                value={tipo}
                onChange={setTipo}
                inputRef={tipoRef}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.50}
                label="Tipo"
              />
            </div>
          </>
          )}

        <h3 className={styles.tituloSecao}>
          <i className="fa-solid fa-building-columns"></i>
          Dados Bancários
        </h3>

        <div className={styles.divInfo}>
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={banco}
            onChange={setBanco}
            inputRef={bancoRef}
            width={isMobile ? 100 : 50}
            gap={isMobile ? 0 : 0.50}
            label="Banco"
          />
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={agencia}
            onChange={setAgencia}
            inputRef={agenciaRef}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.50}
            label="Agência"
          />
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={conta}
            onChange={setConta}
            inputRef={contaRef}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.50}
            label="Conta"
          />

        </div>
        <div className={styles.divInfo}>
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={titularConta}
            onChange={setTitularConta}
            inputRef={titularContaRef}
            width={isMobile ? 100 : 50}
            gap={isMobile ? 0 : 0.50}
            label="Titular da conta"
          />
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={CPFouCNPJconta}
            onChange={setCPFouCNPJconta}
            inputRef={CPFouCNPJcontaRef}
            width={isMobile ? 100 : 50}
            gap={isMobile ? 0 : 0.50}
            label="CPF/CNPJ da Conta"
          />
        </div>

        <div className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={tipoPix}
            onChange={setTipoPix}
            inputRef={tipoPixRef}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.50}
            label="Tipo PIX"
          />
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={pix}
            onChange={setPix}
            inputRef={pixRef}
            width={isMobile ? 100 : 75}
            gap={isMobile ? 0 : 0.50}
            label="Pix"
          />
        </div>
      </main>
    </>
  )
}

export default InformacoesBasicas