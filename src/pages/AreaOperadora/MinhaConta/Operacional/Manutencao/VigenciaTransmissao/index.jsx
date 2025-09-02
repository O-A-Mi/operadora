import { useEffect, useState } from "react";
import { UseInputMask, UseInputPadrao } from "../../../../../../components/InputPadrao";
import styles from "./styles.module.css"
import { useNavigate } from "react-router";

function VigenciaTransmissao() {

  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [limiteTransmissao, setLimiteTransmissao, limiteTransmissaoRef] = UseInputMask();
  const [vigencia, setVigencia, vigenciaRef] = UseInputMask();
  const [primeiraParcelaVencimento, setPrimeiraParcelaVencimento, primeiraParcelaVencimentoRef] = UseInputMask();
  const [vencimento, setVencimento, vencimentoRef] = UseInputMask();
  const [modoDeReajuste, setModoDeReajuste, modoDeReajusteRef] = UseInputMask();
  const [acresimoReajuste, setAcresimoReajuste, acresimoReajusteRef] = UseInputMask("", "number");
  const [entidades, setEntidades, entidadesRef] = UseInputMask();
  const [gruposContratuais, setGruposContratuais, gruposContratuaisRef] = UseInputMask();
  const navigate = useNavigate();

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
        <i className="fa-solid fa-id-card"></i>
        Vigência e Transmissão em Lote
      </h3>
      <main className={styles.moldura}>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            value={convenio}
            onChange={setConvenio}
            inputRef={convenioRef}
            width={isMobile ? 100 : 82.75}
            gap={isMobile ? 0 : 0.50}
            label="Procurar por convênio"
          />
        </section>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="date"
            value={limiteTransmissao}
            onChange={setLimiteTransmissao}
            inputRef={limiteTransmissaoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Max. de Transmissão"
          />
          <UseInputPadrao
            type="date"
            value={vigencia}
            onChange={setVigencia}
            inputRef={vigenciaRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Data de Vigência"
          />
          <UseInputPadrao
            type="date"
            value={primeiraParcelaVencimento}
            onChange={setPrimeiraParcelaVencimento}
            inputRef={primeiraParcelaVencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="1ª Parcela Vencto"
          />
          <UseInputPadrao
            type="select"
            value={vencimento}
            onChange={setVencimento}
            inputRef={vencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Dia de Vencimento"
          />
          <UseInputPadrao
            type="select"
            value={modoDeReajuste}
            onChange={setModoDeReajuste}
            inputRef={modoDeReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Modo de Reajuste"
          />
          <UseInputPadrao
            value={acresimoReajuste}
            onChange={setAcresimoReajuste}
            inputRef={acresimoReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Acrésimo de Reajuste"
            placeholder="R$ 0,00"
          />
        </section>
        {isMobile && <hr className={styles.borderMobile} />}
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="date"
            value={limiteTransmissao}
            onChange={setLimiteTransmissao}
            inputRef={limiteTransmissaoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Max. de Transmissão"
          />
          <UseInputPadrao
            type="date"
            value={vigencia}
            onChange={setVigencia}
            inputRef={vigenciaRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Data de Vigência"
          />
          <UseInputPadrao
            type="date"
            value={primeiraParcelaVencimento}
            onChange={setPrimeiraParcelaVencimento}
            inputRef={primeiraParcelaVencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="1ª Parcela Vencto"
          />
          <UseInputPadrao
            type="select"
            value={vencimento}
            onChange={setVencimento}
            inputRef={vencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Dia de Vencimento"
          />
          <UseInputPadrao
            type="select"
            value={modoDeReajuste}
            onChange={setModoDeReajuste}
            inputRef={modoDeReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Modo de Reajuste"
          />
          <UseInputPadrao
            value={acresimoReajuste}
            onChange={setAcresimoReajuste}
            inputRef={acresimoReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Acrésimo de Reajuste"
            placeholder="R$ 0,00"
          />
        </section>
        {isMobile && <hr className={styles.borderMobile} />}
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="date"
            value={limiteTransmissao}
            onChange={setLimiteTransmissao}
            inputRef={limiteTransmissaoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Max. de Transmissão"
          />
          <UseInputPadrao
            type="date"
            value={vigencia}
            onChange={setVigencia}
            inputRef={vigenciaRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Data de Vigência"
          />
          <UseInputPadrao
            type="date"
            value={primeiraParcelaVencimento}
            onChange={setPrimeiraParcelaVencimento}
            inputRef={primeiraParcelaVencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="1ª Parcela Vencto"
          />
          <UseInputPadrao
            type="select"
            value={vencimento}
            onChange={setVencimento}
            inputRef={vencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Dia de Vencimento"
          />
          <UseInputPadrao
            type="select"
            value={modoDeReajuste}
            onChange={setModoDeReajuste}
            inputRef={modoDeReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Modo de Reajuste"
          />
          <UseInputPadrao
            value={acresimoReajuste}
            onChange={setAcresimoReajuste}
            inputRef={acresimoReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Acrésimo de Reajuste"
            placeholder="R$ 0,00"
          />
        </section>
        {isMobile && <hr className={styles.borderMobile} />}
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="date"
            value={limiteTransmissao}
            onChange={setLimiteTransmissao}
            inputRef={limiteTransmissaoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Max. de Transmissão"
          />
          <UseInputPadrao
            type="date"
            value={vigencia}
            onChange={setVigencia}
            inputRef={vigenciaRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Data de Vigência"
          />
          <UseInputPadrao
            type="date"
            value={primeiraParcelaVencimento}
            onChange={setPrimeiraParcelaVencimento}
            inputRef={primeiraParcelaVencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="1ª Parcela Vencto"
          />
          <UseInputPadrao
            type="select"
            value={vencimento}
            onChange={setVencimento}
            inputRef={vencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Dia de Vencimento"
          />
          <UseInputPadrao
            type="select"
            value={modoDeReajuste}
            onChange={setModoDeReajuste}
            inputRef={modoDeReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Modo de Reajuste"
          />
          <UseInputPadrao
            value={acresimoReajuste}
            onChange={setAcresimoReajuste}
            inputRef={acresimoReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Acrésimo de Reajuste"
            placeholder="R$ 0,00"
          />
        </section>
        {isMobile && <hr className={styles.borderMobile} />}
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="date"
            value={limiteTransmissao}
            onChange={setLimiteTransmissao}
            inputRef={limiteTransmissaoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Max. de Transmissão"
          />
          <UseInputPadrao
            type="date"
            value={vigencia}
            onChange={setVigencia}
            inputRef={vigenciaRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Data de Vigência"
          />
          <UseInputPadrao
            type="date"
            value={primeiraParcelaVencimento}
            onChange={setPrimeiraParcelaVencimento}
            inputRef={primeiraParcelaVencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="1ª Parcela Vencto"
          />
          <UseInputPadrao
            type="select"
            value={vencimento}
            onChange={setVencimento}
            inputRef={vencimentoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Dia de Vencimento"
          />
          <UseInputPadrao
            type="select"
            value={modoDeReajuste}
            onChange={setModoDeReajuste}
            inputRef={modoDeReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Modo de Reajuste"
          />
          <UseInputPadrao
            value={acresimoReajuste}
            onChange={setAcresimoReajuste}
            inputRef={acresimoReajusteRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.50}
            label="Acrésimo de Reajuste"
            placeholder="R$ 0,00"
          />
        </section>
        {isMobile && <hr className={styles.borderMobile} />}
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            multiple="true"
            value={entidades}
            onChange={setEntidades}
            inputRef={entidadesRef}
            width={isMobile ? 100 : 48.75}
            gap={isMobile ? 0 : 0.50}
            label="Adicionar as Entidades"
          />
          <UseInputPadrao
            type="select"
            multiple="true"
            value={gruposContratuais}
            onChange={setGruposContratuais}
            inputRef={gruposContratuaisRef}
            width={isMobile ? 100 : 49}
            gap={isMobile ? 0 : 0.50}
            label="Adicionar aos Grupos Contratuais"
          />
        </section>
      </main>
      <div className={styles.actionButtons}>
        <div className={styles.actionButtonsGroup}>
          <button className={`${styles.actionButton} ${styles.actionButtonGravar}`}>
            <i className="fa-solid fa-save"></i>
            Adicionar
          </button>
        </div>
      </div>
    </>
  )
}

export default VigenciaTransmissao
