import { useEffect, useState } from 'react'
import { UseInputMask, UseInputPadrao } from '../../../../../../../../components/InputPadrao';
import styles from '../styles.module.css';
import { TabelaPadrao } from '../../../../../../../../components';

const tabelaColumns = [
  {
    value: 'numParcelaInicial',
    name: 'Inicial',
    align: 'center',
    sortable: false
  },
  {
    value: 'numParcelaFinal',
    name: 'Final',
    align: 'center',
    sortable: false,
  },
  {
    value: 'tipo',
    name: "Tipo",
    align: 'center',
    sortable: false
  },
  {
    value: 'modo',
    name: "Modo",
    align: "center",
    sortable: false
  },
  {
    value: 'valorDireto',
    name: 'Valor Direto',
    align: 'center',
    format: 'currency',
    sortable: false

  },
  {
    value: 'valorIndireto',
    name: 'Valor Indireto',
    align: 'center',
    format: 'currency',
    sortable: false,
  },
  {
    value: 'formaDePagamento',
    name: "Forma de Pagamento",
    align: 'center',
    sortable: false
  },
  {
    value: 'baseDeCobranca',
    name: 'Base de Cobrança',
    align: 'center',
    sortable: false
  },
  {
    value: 'plano',
    name: 'Plano',
    align: 'center',
    sortable: false,
  }
]


const tabelaDados = [
  {
    numParcelaInicial: 10,
    numParcelaFinal: 20,
    tipo: "Adesão",
    modo: "DINHEIRO",
    valorDireto: 100.22,
    valorIndireto: 200.11,
    formaDePagamento: "Dia Fixo",
    baseDeCobranca: "Preço NET",
    plano: "UNIREDE RECIFE ENFERMARIA"
  },
  {
    numParcelaInicial: 12,
    numParcelaFinal: 36,
    tipo: "Mensalidade",
    modo: "PERCENTUAL",
    valorDireto: 659.44,
    valorIndireto: 203.23,
    formaDePagamento: "Dia Corrido",
    baseDeCobranca: "Valor Pago",
    plano: "EMI"
  },
]


function Remuneracao() {

  const [planosCobrados, setPlanosCobrados, planosCobradosRef] = UseInputMask();
  const [formaDePagamento, setFormaDePagamento, formaDePagamentoRef] = UseInputMask(null,);
  const [numParcelasInicial, setNumParcelasInicial, numParcelasInicialRef] = UseInputMask();
  const [numParcelasFinal, setNumParcelasFinal, numParcelasFinalRef] = UseInputMask();
  const [tipoComissao, setTipoComissao, tipoComissaoRef] = UseInputMask();
  const [modoComissao, setModoComissao, modoComissaoRef] = UseInputMask();
  const [valorDireto, setValorDireto, valorDiretoRef] = UseInputMask();
  const [valorIndireto, setValorIndireto, valorIndiretoRef] = UseInputMask();
  const [baseCobranca, setBaseCobranca, baseCobrancaRef] = UseInputMask();

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
        <i className="fa-solid fa-dollar-sign"></i>
        Comissionamento Regra de Pagamento
      </h3>

      <main className={styles.secao}>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={planosCobrados}
            onChange={setPlanosCobrados}
            inputRef={planosCobradosRef}
            width={isMobile ? 100 : 50}
            gap={isMobile ? 0 : 0.333}
            label="Planos a serem cobrados"
            multiple="true"
          />


        </section>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={formaDePagamento}
            onChange={setFormaDePagamento}
            inputRef={formaDePagamentoRef}
            width={isMobile ? 100 : 50}
            gap={isMobile ? 0 : 0.333}
            label="Forma de Pagamento"
          /* Segundo o SGE, vai ter 3 opções:
            Dia Corrido -> +1 campo para Dia de Pagamento
            Dia Fixo -> +2 campos para Dia e Mês do Pagamento
            Intervalo -> +12 campos, 3x intervalo inicial, intervalo final, dia e mes do pagamento
          */
          />

        </section>
        <h3 className={styles.tituloSecao}>
          <i className="fa-solid fa-user">  </i>
          Comissionamento Valores
        </h3>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={numParcelasInicial}
            onChange={setNumParcelasInicial}
            inputRef={numParcelasInicialRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.333}
            label="N° Parcela - Inicial"
          />
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={numParcelasFinal}
            onChange={setNumParcelasFinal}
            inputRef={numParcelasFinalRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.333}
            label="N° Parcela - Final"
          />
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={tipoComissao}
            onChange={setTipoComissao}
            inputRef={tipoComissaoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.333}
            label="Tipo"
          // Adesão ou Mensalidade
          />
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={modoComissao}
            onChange={setModoComissao}
            inputRef={modoComissaoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.333}
            label="Modo"
          // Dinheiro ou Percentual
          />
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={valorDireto}
            onChange={setValorDireto}
            inputRef={valorDiretoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.333}
            label="Valor Direto"
          />
          <UseInputPadrao
            type="text"
            identifier="tipo-cliente-signin"
            value={valorIndireto}
            onChange={setValorIndireto}
            inputRef={valorIndiretoRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.333}
            label="Valor Indireto"
          />
        </section>
        <section className={styles.divInfo}>
          <UseInputPadrao
            type="select"
            identifier="tipo-cliente-signin"
            value={baseCobranca}
            onChange={setBaseCobranca}
            inputRef={baseCobrancaRef}
            width={isMobile ? 100 : 16}
            gap={isMobile ? 0 : 0.333}
            label="Base de Cobrança"
          />
        </section>
        <TabelaPadrao
          tabelaId="tabela-remuneracao"
          columns={tabelaColumns}
          data={tabelaDados}
          options={{ showPagination: false, showToolbar: true }}
        />
      </main>
    </>
  )
}

export default Remuneracao