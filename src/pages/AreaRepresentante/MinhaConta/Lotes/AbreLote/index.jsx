/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import styles from "./AbreLote.module.css";
import { useNavigate, useParams, useLocation  } from "react-router";
import { useState, useMemo, useEffect } from "react";
import { UseInputMask } from "../../../../../components";
import TabelaPadrao from "../../../../../components/TabelaPadrao";
import { jsonRoute } from "../../../../../utils/json";
import {useCallback,  useRef} from 'react';
import { formatarMoeda } from "../../../../../utils/functions.js";

export default function AbreLote() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [idLoteItem, idLotemItemChange, idLoteItemRef ] = UseInputMask("", null, "number");
  const [inicio , inicioChange, inicioRef ] = UseInputMask("", "99/99/9999", "number");
  const [fim, fimChange, fimRef ] = UseInputMask("", "99/99/9999", "number");
  const [tipo, tipoChange, tipoRef ] = UseInputMask("", null, "text");
  const [procedimento , procedimentoChange, procedimentoRef ] = UseInputMask("", null, "text");
  const [especialidade, especialidadeChange, especialidadeRef ] = UseInputMask("", null, "text");
  const [documento , documentoChange, documentoRef ] = UseInputMask("", null, "text");
  const [situacao, situacaoChange, situacaoRef ] = UseInputMask("", null, "text");
  const [valor, valorChange, valorRef ] = UseInputMask("", null, "number");
  const resizeTimeout = useRef(null);

  
  const location = useLocation();
  const [detalheAberto, setDetalheAberto] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const Expor = () => {};
  const loteDetalhe = location.state?.loteDetalhe;
  // const lotes = dados.map((item) => item.lote);

  useEffect(() => {
    //console.log(loteDetalhe);
    setDetalheAberto(location.pathname.includes(jsonRoute.Representante_AbreLote));
  }, [location]);
    
  const FormInput = useMemo(() => ({ label, required, children, width, gap, identifier }) => (
    <div className={styles.inputGroup}  style={{ maxWidth: `calc(${width}% - ${gap ? gap : 0.5}rem)` }}>
      <label className={styles.inputLabel} htmlFor={identifier}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
    </div>
  ), []); 
  const MaskedInput = useMemo(() => ({ type = "text", value, onChange, placeholder, className, required, id, inputRef, style }) => (
    <input type={type}  disabled value={value} onChange={onChange} placeholder={placeholder} className={className} required={required} id={id} ref={inputRef} style={style}/>
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
  const [responsive, setResponsive] = useState(window.innerWidth < 1140); 

  const debounce = useCallback((func, delay) => {
    return function (...args) {
        clearTimeout(resizeTimeout.current);
        resizeTimeout.current = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
  }, []);
 
  const handleResize = useMemo(() => debounce((e) => {
      setResponsive(window.innerWidth < 1140);
      const tabelaContainer = document.getElementById("tabelaContainer");
      if (!tabelaContainer || window.innerWidth <= 768) return;

      const abreLoteContainer = document.querySelector(`.${styles.abreLoteContainer}`);
      if (!abreLoteContainer) return;

      const sidebarColumn = abreLoteContainer.parentElement.previousElementSibling;
      const fullScreenWidth = window.innerWidth - 32 - 32 - 37- (sidebarColumn?.offsetWidth || 0);
      
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
  

  return (
    <>
      {detalheAberto && (
        <section className={styles.abreLoteContainer}>
          <div className={styles.abreLoteHigh}>
            <div className={styles.ButtonBack}>
              <h2 className={styles.lotesTitleTela}>Lotes</h2>
                <div className={styles.highAlinhamento}>
                  <div className={styles.buttonContainer}>
                    <div className={styles.buttonSpace}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className={styles.voltarButton} onClick={() => navigate(-1)}><i className="fa-regular fa-arrow-left"></i> Voltar</button>
            </div>
            <div className={styles.lotesSection}>
              <div className={styles.buscaLote}>
                <div className={styles.buscaLoteTitle}>
                  <h3 className={styles.busca}>Detalhes: {loteDetalhe.numero_pedido} - {loteDetalhe.referencia} - ({loteDetalhe.cpfcnpj})</h3>
                </div>
                <div className={styles.filtroTabelaBody}>
                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Data de Pagamento" identifier={"IdLoteItem"} >
                    <div className={styles.selectInputField}>
                    <MaskedInput value={loteDetalhe.data_pagamento} className={styles.textInput} id="dt_pagamento" inputRef={inicioRef} placeholder={"dd/mm/aaaa"}/>
                      <i className="fas fa-calendar-days"></i>
                    </div>
                  </FormInput> 

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Data de Agendamento" identifier="inicio">
                    <div className={styles.selectInputField}>
                      <MaskedInput value={loteDetalhe.data_agendamento} className={styles.textInput} id="dt_agendamento" inputRef={inicioRef} placeholder={"dd/mm/aaaa"}/>
                      <i className="fas fa-calendar-days"></i>
                    </div>
                  </FormInput>

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Data de Execução" identifier="fim">
                    <div className={styles.selectInputField}>
                      <MaskedInput value={loteDetalhe.data_execucao} className={styles.textInput} id="dt_execucao" inputRef={fimRef} placeholder={"dd/mm/aaaa"}/>
                      <i className="fas fa-calendar-days"></i>
                    </div>
                  </FormInput>

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Tipo" identifier={"tipo"}>
                    <MaskedInput value={loteDetalhe.tipo_atendimento} placeholder="tipo" className={`${styles.selectInput} ${styles.textDefault}`} id="tipo" inputRef={tipoRef} />
                  </FormInput>

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Plano" identifier={"procedimento"} >
                    <MaskedInput value={loteDetalhe.procedimento} placeholder="Plano" className={`${styles.selectInput} ${styles.textDefault}`} id="procedimento" inputRef={procedimentoRef} />
                  </FormInput>

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Especialidade" identifier={"especialidade"}>
                    <MaskedInput value={loteDetalhe.tipo_consulta} placeholder="especialidade" className={`${styles.selectInput} ${styles.textDefault}`} id="especialidade" inputRef={especialidadeRef} />
                  </FormInput>

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Documento" identifier={"documento"}>
                    <MaskedInput value={loteDetalhe.documento} placeholder="especialidade" className={`${styles.selectInput} ${styles.textDefault}`} id="especialidade" inputRef={documentoRef} />
                  </FormInput>

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Situação" identifier={"situacao"} >
                    <MaskedInput value={loteDetalhe.situacao} placeholder="situacao" className={`${styles.selectInput} ${styles.textDefault}`} id="situacao" inputRef={situacaoRef} />
                  </FormInput> 

                  <FormInput width={responsive ? 100 : 33.33333333333333} gap={responsive ? 0 : 0.6666666666666667} label="Valor" identifier={"valor"} >
                    <MaskedInput value={formatarMoeda(loteDetalhe.vr_lote)} placeholder="valor" className={`${styles.selectInput} ${styles.textDefault}`} id="valor" inputRef={valorRef} />
                  </FormInput> 
                </div>
              </div>
            </div>
        </section>
      )}
    </>
  );
};

