import { useNavigate } from "react-router";
import { UseInputMask, UseInputPadrao } from "../../../../../../components/InputPadrao"
import TogglePadrao from "../../../../../../components/TogglePadrao";
import styles from './styles.module.css';
import { useState, useEffect } from "react";

function AtualizacaoPrecoLote() {

  // ------------------------- Variáveis dos inputs ------------------------- //
  const [tipoPlano, setTipoPlano, tipoPlanoRef] = UseInputMask();
  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [entidade, setEntidade, entidadeRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
  const [comboProdutoServico, setComboProdutoServico, comboProdutoServicoRef] = UseInputMask();
  const [tabelaDeConcessao, setTabelaDeConcessao, tabelaDeConcessaoRef] = UseInputMask();
  const [valorDeCustoModo, setValorDeCustoModo, valorDeCustoModoRef] = UseInputMask();
  const [valorDeCustoReajuste, setValorDeCustoReajuste, valorDeCustoReajusteRef] = UseInputMask();
  const [valorDeVendaTipo, setValorDeVendaTipo, valorDeVendaTipoRef] = UseInputMask();
  const [valorDeVendaModo, setValorDeVendaModo, valorDeVendaModoRef] = UseInputMask();
  const [valorDeVendaReajuste, setValorDeVendaReajuste, valorDeVendaReajusteRef] = UseInputMask();
  const [valorDeAdesaoTipo, setValorDeAdesaoTipo, valorDeAdesaoTipoRef] = UseInputMask();
  const [valorDeAdesaoModo, setValorDeAdesaoModo, valorDeAdesaoModoRef] = UseInputMask();
  const [valorDeAdesaoReajuste, setValorDeAdesaoReajuste, valorDeAdesaoReajusteRef] = UseInputMask();
  const [faixaGeral, setFaixaGeral] = useState(false);
  const [faixaTitular, setFaixaTitular] = useState(false);
  const [faixaDependente, setFaixaDependente] = useState(false);
  const [reajustaTodosContratos, setReajustaTodosContratos] = useState(false);
  const navigate = useNavigate();

  // ------------------------- Funções para os botões mudarem os valores ------------------------- //

  function handleFaixaGeralChange() {
    setFaixaGeral(!faixaGeral)
  }
  function handleFaixaTitularChange() {
    setFaixaTitular(!faixaTitular)
  }
  function handleFaixaDependenteChange() {
    setFaixaDependente(!faixaDependente)
  }
  function handleReajustaTodosContratoChange() {
    setReajustaTodosContratos(!reajustaTodosContratos)
  }

  // ------------------------- isMobile coisas ------------------------- //

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
        <i className="fa-solid fa-box-dollar"></i>
        Atualização de Preço em Lote
      </h3>
      <main className={styles.moldura}>
        <h3 className={styles.subTitulo}>
          Itens a serem atualizados
        </h3>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            value={tipoPlano}
            onChange={setTipoPlano}
            inputRef={tipoPlanoRef}
            width={isMobile ? 100 : 30}
            gap={isMobile ? 0 : 0.50}
            label="Tipo de Plano"
          />
          <UseInputPadrao
            type="select"
            value={convenio}
            onChange={setConvenio}
            inputRef={convenioRef}
            width={isMobile ? 100 : 30}
            gap={isMobile ? 0 : 0.50}
            label="Convenio"
          />
          <UseInputPadrao
            type="select"
            value={entidade}
            onChange={setEntidade}
            inputRef={entidadeRef}
            width={isMobile ? 100 : 30}
            gap={isMobile ? 0 : 0.50}
            label="Entidade"
          />
        </section>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            value={grupoContratual}
            onChange={setGrupoContratual}
            inputRef={grupoContratualRef}
            width={isMobile ? 100 : 30}
            gap={isMobile ? 0 : 0.50}
            label="Grupo Contratual"
          />
          <UseInputPadrao
            type="select"
            value={comboProdutoServico}
            onChange={setComboProdutoServico}
            inputRef={comboProdutoServicoRef}
            width={isMobile ? 100 : 30}
            gap={isMobile ? 0 : 0.50}
            label="Combo Produto/Serviço"
          />
          <UseInputPadrao
            type="select"
            value={tabelaDeConcessao}
            onChange={setTabelaDeConcessao}
            inputRef={tabelaDeConcessaoRef}
            width={isMobile ? 100 : 30}
            gap={isMobile ? 0 : 0.50}
            label="Tabela de Concessão"
          />
        </section>
        <section className={styles.divInfo}>
          <div className={styles.containerHorizontal}>
            <div className={styles.item}>
              <h3 className={styles.subTitulo}>
                Atualizar o Valor de Custo
              </h3>
            </div>
            <div className={styles.item}>
              <UseInputPadrao
                type="select"
                value={valorDeCustoModo}
                onChange={setValorDeCustoModo}
                inputRef={valorDeCustoModoRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0.50}
                label="Modo"
              />
              <UseInputPadrao
                value={valorDeCustoReajuste}
                onChange={setValorDeCustoReajuste}
                inputRef={valorDeCustoReajusteRef}
                width={isMobile ? 100 : 50}
                gap={isMobile ? 0 : 0.50}
                label="Valor do Reajuste do Custo"
              />
            </div>
          </div>
          <div className={styles.containerHorizontal}>
            <div className={styles.item}>
              <h3 className={styles.subTitulo}>
                Atualizar Valor de Venda
              </h3>
            </div>
            <div className={styles.item}>
              <UseInputPadrao
                type="select"
                value={valorDeVendaTipo}
                onChange={setValorDeVendaTipo}
                inputRef={valorDeVendaTipoRef}
                width={isMobile ? 100 : 33}
                gap={isMobile ? 0 : 0.50}
                label="Tipo de Aplicação"
              />
              <UseInputPadrao
                type="select"
                value={valorDeVendaModo}
                onChange={setValorDeVendaModo}
                inputRef={valorDeVendaModoRef}
                width={isMobile ? 100 : 33}
                gap={isMobile ? 0 : 0.50}
                label="Modo"
              />
              <UseInputPadrao
                value={valorDeVendaReajuste}
                onChange={setValorDeVendaReajuste}
                inputRef={valorDeVendaReajusteRef}
                width={isMobile ? 100 : 33}
                gap={isMobile ? 0 : 0.50}
                label="Valor do Reajuste da Venda"
              />
            </div>
          </div>
          <div className={styles.containerHorizontal}>
            <div className={styles.item}>
              <h3 className={styles.subTitulo}>
                Atualizar o Valor de Adesão
              </h3>
            </div>
            <div className={styles.item}>
              <UseInputPadrao
                type="select"
                value={valorDeAdesaoTipo}
                onChange={setValorDeAdesaoTipo}
                inputRef={valorDeAdesaoTipoRef}
                width={isMobile ? 100 : 33}
                gap={isMobile ? 0 : 0.50}
                label="Tipo de Aplicação"
              />
              <UseInputPadrao
                type="select"
                value={valorDeAdesaoModo}
                onChange={setValorDeAdesaoModo}
                inputRef={valorDeAdesaoModoRef}
                width={isMobile ? 100 : 33}
                gap={isMobile ? 0 : 0.50}
                label="Modo"
              />
              <UseInputPadrao
                value={valorDeAdesaoReajuste}
                onChange={setValorDeAdesaoReajuste}
                inputRef={valorDeAdesaoReajusteRef}
                width={isMobile ? 100 : 33}
                gap={isMobile ? 0 : 0.50}
                label="Valor do Reajuste da Adesão"
              />
            </div>
          </div>
        </section>
        <h3 className={styles.subTitulo}>
          Opções de Atualização
        </h3>
        <section className={styles.divInfo}>
          <TogglePadrao
            checked={faixaGeral}
            onChange={handleFaixaGeralChange}
            option1="Sim"
            option2="Não"
            label="Faixa Geral?"
          />
          <TogglePadrao
            checked={faixaTitular}
            onChange={handleFaixaTitularChange}
            option1="Sim"
            option2="Não"
            label="Faixa do Titular?"
          />
          <TogglePadrao
            checked={faixaDependente}
            onChange={handleFaixaDependenteChange}
            option1="Sim"
            option2="Não"
            label="Faixa do Dependente?"
          />
          <TogglePadrao
            checked={reajustaTodosContratos}
            onChange={handleReajustaTodosContratoChange}
            option1="Sim"
            option2="Não"
            label="Aplica reajuste em todos os contratos da base?"
          />
        </section>
      </main>
      <div className={styles.actionButtons}>
        <div className={styles.actionButtonsGroup}>
          <button className={`${styles.actionButton} ${styles.actionButtonGravar}`}>
            <i className="fa-solid fa-refresh"></i>
            Atualizar
          </button>
        </div>
      </div>
    </>
  )
}

export default AtualizacaoPrecoLote
