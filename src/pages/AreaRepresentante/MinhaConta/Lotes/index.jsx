/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import styles from "./styles.module.css";
import { jsonRoute } from "../../../../utils/json";
import { useState, useEffect, useMemo } from "react";
import { InputField, InputPadrao, UseInputMask } from "../../../../components/InputPadrao";
import { idAtom, userInfoAtom } from '../../../../context/jotai.jsx';
import { useAtomValue, useAtom } from 'jotai';
import { useLoader } from "../../../../context";
import TabelaPadrao from "../../../../components/TabelaPadrao";
import { useNavigate, Outlet, useLocation } from "react-router";
import { carregarInfos } from "../../../../db/carregarGeral.jsx";
import { devBaseInf, prodBaseInf, baseInf } from "../../../../utils/json.js";
import {useCallback,  useRef} from 'react';
import { formatarMoeda, converterParaData } from "../../../../utils/functions.js";

 export default function LoteSelector() {
  const { showLoader, hideLoader } = useLoader();
  const [pesquisarChange, pesquisarRef] = UseInputMask();
  const [numeroContrato, numeroContratoChange, numeroContratoRef] = UseInputMask();
  const [dataInicio, setDataInicio] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [lotesArray, setLotesArray] = useState([]);
  const [detalheAberto, setDetalheAberto] = useState(false);
  const [responsive] = useState(window.innerWidth < 991);
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useAtomValue(userInfoAtom);
  const resizeTimeout = useRef(null);
  const [id] =  useAtom(idAtom);

  const handleBuscar = () => {
    const filtro = {
      numeroContrato: numeroContratoRef.current?.value || "",
      dataInicio: dataInicio || "",
      dataFinal: dataFinal || "",
    };

    const dataInicioFiltro = filtro.dataInicio;
    const dataFinalFiltro = filtro.dataFinal;

    const dadosFiltrados = tabelaDados.filter((row) => {
      const contrato = row.ncontrato.sortableValue;
      const dataExecucao = converterParaData(row.data_pagamento.sortableValue.split(' ')[0]);
      const dataDentroDoIntervalo = (!dataInicioFiltro || dataExecucao >= dataInicioFiltro) && (!dataFinalFiltro || dataExecucao <= dataFinalFiltro);
      return (
        (filtro.numeroContrato === "" || contrato === filtro.numeroContrato) && dataDentroDoIntervalo
      );
    });
    setFiltroDados(dadosFiltrados);
  };

  const handleDetalhar = (lote) => {
    navigate(`${jsonRoute.Representante_AbreLote}/${lote.numero_pedido}`, {
      state: { loteDetalhe: lote }
    });
  };

  const limparFiltro = () => {
    numeroContratoChange({ target: { value: "" } });
    setDataInicio("");
    setDataFinal("");

    if (numeroContratoRef.current) numeroContratoRef.current.value = "";
  };

  const FormInput = useMemo(() => ({ label, required, children, width, gap, identifier }) => (
    <div className={styles.inputGroup} style={{ maxWidth: `calc(${width}% - ${gap ? gap : 0.5}rem)` }}>
      <label className={styles.inputLabel} htmlFor={identifier}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
    </div>
  ), []);

  const MaskedInput = useMemo(() => ({ type = "text", value, onChange, placeholder, className, required, id, inputRef, style }) => (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={className} required={required} id={id} ref={inputRef} style={style}/>
  ), []);

  const SelectInput = useMemo(() => ({ options, value, onChange, placeholder, className, required, id, inputRef }) => (
    <div className={styles.selectInputField} style={{ height: "100%" }}>
      <select value={value} onChange={onChange} placeholder={placeholder} className={className} required={required} id={id} ref={inputRef}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <i className="fa-solid fa-chevron-down"></i>
    </div>
  ), []);

  const buildDataPagamento = (data_pagamento) => {
    return (
      <div className={styles.tabelaStatusField}>
        <span className={styles.tabelaStatusDate}>{data_pagamento}</span>
      </div>
    );
  }

  const buildReferencia = (referencia) => {
    return (
      <div className={styles.tabelaStatusField}>
        <span className={styles.tabelaStatusDate}>{referencia}</span>
      </div>
    );
  }

  const buildEncontrado = (ncontrato) => {
    return (
      <div className={styles.tabelaStatusField}>
        <span className={styles.tabelaStatusDate}>{ncontrato}</span>
      </div>
    );
  }

  const buildDocumento = (documento) => {
    return (
      <div className={styles.tabelaDocumento}>
        <span className={styles.tabelaStatusDate}>{documento}</span>
      </div>
    );
  }

  const buildValor = (valor) => {
    return (
      <div className={styles.tabelaValor}>
        <span className={styles.tabelaStatusDate}>{formatarMoeda(valor)}</span>
      </div>
    );
  }

  const buildAcoes = (lote) => {
    return (
      <button className={styles.verDetalhesButton} onClick={() => handleDetalhar(lote)}>Ver detalhes <i className="fa-regular fa-arrow-right"></i></button>
    );
  }

  const debounce = useCallback((func, delay) => {
    return function (...args) {
        clearTimeout(resizeTimeout.current);
        resizeTimeout.current = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
  }, []);

  const handleResize = useMemo(() => debounce((e) => {
      const tabelaContainer = document.getElementById("tabelaContainer-representante-lotes");
      if (!tabelaContainer || window.innerWidth <= 768) return;

      const lotesContainer = document.querySelector(`.${styles.lotesContainer}`);
      if (!lotesContainer) return;

      const sidebarColumn = lotesContainer.parentElement.previousElementSibling;
      const fullScreenWidth = lotesContainer.parentElement.parentElement.offsetWidth - 24 - (sidebarColumn?.offsetWidth || 0);
      tabelaContainer.style.maxWidth = `${fullScreenWidth}px`;
  }, 250), [debounce]);

  useEffect(() => {
      const resizeHandler = handleResize;
      window.addEventListener("resize", resizeHandler);
      window.addEventListener("layout-resize", (e) => resizeHandler(e));
      
      requestAnimationFrame(() => {
          handleResize();
      });

      return () => {
          window.removeEventListener("resize", resizeHandler);
          window.removeEventListener("layout-resize", resizeHandler);
          clearTimeout(resizeTimeout.current);
      };
  }, [handleResize]);

  const tabelaColumns = [
    {
      value: "nlote",
      name: "Nº Lote",
      className:styles.whiteSpace,
    },
    {
      value: "ncontrato",
      name: "Nº Contrato",
      className:styles.whiteSpace,
    },
    {
      value: "referencia",
      name: "Referência",
    },
    {
      value: "documento",
      name: "Documento",
    },
    {
      value: "valor",
      name: "Valor",
    },
    {
      value: "data_pagamento",
      name: "Data de Pagamento",
    },
    {
      value: "acoes",
      name: "Ações",
    },
  ];

  function carregarLotes(dados){
    let resp = JSON.parse(dados);
    //console.log('Lotes: ', resp);
    const dadosFormatados = resp.map((item, index) => ({
      nlote: index+1,
      ncontrato: {
        value: buildEncontrado(item.numero_pedido),
        sortableValue: item.numero_pedido,
      },
      data_pagamento: {
        value: buildDataPagamento(item.data_pagamento),
        sortableValue: item.data_pagamento,
      },
      referencia: {
        value: buildReferencia(item.referencia),
      },
      documento: {
        value: buildDocumento(item.cpfcnpj),
      },
      valor: {
        value: buildValor(item.vr_lote),
      },
      acoes: {
        value: buildAcoes(item),
      },
      dt_execucao: {
        value: item.data_execucao,
      }
      }));
    setTabelaDados(dadosFormatados);
    hideLoader();
  }

  useEffect(() => {
    window.carregarLotes = carregarLotes;
    carregarInfos('carregarValidacaoToken', {
      campo: '*',
      tabela: 'VW_SITE_LOTES',
      condicao: `CD_EMPRESA = '${baseInf.appMode=="dev"?devBaseInf.cd_empresa:prodBaseInf.cd_empresa}' AND TOKEN_ESTABELECIMENTO = '${id}'`}, 'carregarLotes');
  },[]);

  useEffect(() => {
    setDetalheAberto(location.pathname.includes(jsonRoute.Representante_AbreLote));
  }, [location]);
  
  useEffect(() => {
    let arrayContratos = [];
    tabelaDados.map((row) => {
      let flag = true;
      arrayContratos.map(item => {
        if(item.value == row.ncontrato.sortableValue && flag){
          flag = false;
        }
      });
      if(flag){
        arrayContratos.push({
          value: row.ncontrato.sortableValue,
          label: row.ncontrato.sortableValue
        });
      }
    });
    setLotesArray(arrayContratos);
  }, [tabelaDados]);

  return (
    <>
      {Outlet && <Outlet />}
      {!detalheAberto && (
        <section className={styles.lotesContainer}>
          <div>
            <h2 className={styles.lotesTitleTela}>Lotes</h2>
            <p className={styles.pText}>Acompanhe e busque lotes detalhados.</p>
          </div>
          <div className={styles.lotesSection}>
            <div className={styles.buscaLote}>
              <div className={styles.buscaLoteTitle}>
                <h3 className={styles.busca}>Busca por:</h3>
                <button className={styles.buttonFilter} onClick={limparFiltro}>Limpar filtro</button>
              </div>
            </div>
            <div className={styles.filtroTabelaBody}>
              {responsive ? (
                <>
                  <InputField label="Número do Contrato" identifier="numeroContrato">
                      <InputPadrao type='select' value={numeroContrato} onChange={numeroContratoChange} inputRef={numeroContratoRef} placeholder="Número do Contrato" identifier="numeroContrato" options={lotesArray}/>
                  </InputField>

                  <InputField label="Data Inicial" identifier="data-inicial">
                      <InputPadrao type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} identifier="data-inicial" />
                  </InputField>

                  <InputField label="Data Final" identifier="data-final">
                      <InputPadrao type='date' value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} identifier="data-final" />
                  </InputField>
                </>
              ) : (
                <>
                  <InputField label="Número do Contrato" identifier="numeroContrato" width={33.33333333333333} gap={0.6666666666666667}>
                      <InputPadrao type='select' value={numeroContrato} onChange={numeroContratoChange} inputRef={numeroContratoRef} placeholder="Número do Contrato" identifier="numeroContrato" options={lotesArray} containerStyle = {{ height: '100%' }} />
                  </InputField>

                  <InputField label="Data Inicial" identifier="data-inicial" width={33.33333333333333} gap={0.6666666666666667}>
                      <InputPadrao type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} identifier="data-inicial" />
                  </InputField>

                  <InputField label="Data Final" identifier="data-final" width={33.33333333333333} gap={0.6666666666666667}>
                      <InputPadrao type='date' value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} identifier="data-final" />
                  </InputField>
                </>
              )}
            </div>
          </div>
          <section className={styles.tabelaField}>
            <TabelaPadrao 
              tabelaId="representante-lotes"
              columns={tabelaColumns}
              data={filtroDados}
              options={
                {showSearch: handleBuscar,
                  showToggleView: true,
                  showColumnsSelector: true,
                  showPaginationSwitch: true,
                }}/>
          </section>
        </section>
      )}
    </>
  );
}