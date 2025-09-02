import styles from './styles.module.css'; 
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import { useState, useEffect } from 'react';
import { useLoader, useModal } from '../../../../../../context';
import ModalCriarCliente from './components/ModalCriarCliente';
import { limparFiltros, handleResizeTabela } from '../../../../../../utils/functions';
import ModalNovaMensagem from './components/ModalNovaMensagem/ModalNovaMensagem';
import TogglePadrao from "../../../../../../components/TogglePadrao"


const AgendadorPlataforma = () => {
  const { openModal, closeModal, isModalOpen } = useModal();
  const { showLoader, hideLoader } = useLoader();
  const [pagou, setPagou] = useState("Não");
  const [currentTab, setCurrentTab] = useState('Mensalidade a Vencer');
  const [textoBusca, textoBuscaChange, textoBuscaRef] = UseInputMask();
  const [matricula, matriculaChange, matriculaRef] = UseInputMask();
  const [status, statusChange, statusRef] = UseInputMask();
  const [dataInicio, setDataInicio, dataInicioRef] = UseInputMask();
  const [dataFinal, setDataFinal, dataFinalRef] = UseInputMask();
  const [checkBoxValue, checkBoxChange, checkBoxRef] =  UseInputMask(null, "text");

  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const tabs = [
    { id: 'email', name: 'Email', icon: 'fa-solid fa-envelope' },
    { id: 'sms', name: 'SMS', icon: 'fa-solid fa-comment' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp' },
    { id: 'mobile', name: 'Mobile', icon: 'fa-solid fa-mobile-alt' }
  ];

  const statusOptions = [
    { value: "naoEnviado", label: "Não enviado" }, 
    { value: "enviado", label: "Enviado" },
    { value: "erro", label: "Erro" },
  ];

  const matriculasOptions = [
    { value: "telefone", label: "Telefone" },
    { value: "mensagem", label: "Mensagem" },
  ];

  const [screenState, setScreenState] = useState({
      pos_venda: true,
      auditoria_medica: false,
      cobranca: false,
      carteirinha: false,
      inativo_pago: false,
      liminar: false,
      deposito: false,
  })

  const filtrarBeneficiarios = () => {
    try {
      showLoader();
      const filtro = {
        texto: textoBuscaRef.current?.value || "",
        matricula: matriculaRef.current?.value || "",
        status: statusRef.current?.value || "",
        dataInicio: dataInicioRef.current?.value || "",
        dataFinal: dataFinalRef.current?.value || "",
      };

      const dadosFiltrados = tabelaDados.filter((row) => {
        const tipo = row.tipo?.toLowerCase() || "";
        const nome = row.nome?.toLowerCase() || "";
        const cpf = row.cpfcnpj || "";
        const status = row.status?.toLowerCase() || "";
        const matricula = row.matricula?.toLowerCase() || "";
        const dt_vigencia = row.dt_vigencia;

        const dataDentroDoIntervalo =
          (!filtro.dataInicio || dt_vigencia >= filtro.dataInicio) &&
          (!filtro.dataFinal || dt_vigencia <= filtro.dataFinal);

        return (
          tipo === currentTab.toLowerCase() &&
          (filtro.texto === "" || nome.includes(filtro.texto.toLowerCase()) || cpf.includes(filtro.texto)) &&
          (filtro.matricula === "" || matricula === filtro.matricula.toLowerCase()) &&
          (filtro.status === "" || status === filtro.status.toLowerCase()) &&
          dataDentroDoIntervalo
        );
      });

      setFiltroDados(dadosFiltrados);
    } catch (error) {
      hideLoader();
      console.error("Erro ao filtrar beneficiários:", error);
      alert("Ocorreu um erro inesperado ao tentar filtrar dados.");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    filtrarBeneficiarios();
  }, [tabelaDados, currentTab]);

  const limparFiltro = () => {
    limparFiltros([
      { setter: textoBuscaChange, ref: textoBuscaRef },
      { setter: matriculaChange, ref: matriculaRef },
      { setter: statusChange, ref: statusRef },
      { setter: setDataInicio, ref: dataInicioRef },
      { setter: setDataFinal, ref: dataFinalRef },
    ]);
    filtrarBeneficiarios();
  };

  useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);

  const isActiveTab = (tab) => {
    return currentTab === tab.id;
  };

  const handleTabClick = (tab) => {
    setCurrentTab(tab.id);
  };

  const getActiveTabName = () => {
    const activeTabObj = tabs.find(tab => isActiveTab(tab));
    if (activeTabObj) return activeTabObj.name;
    return tabs[0].name;
  };


  return (
    <>
      <div className={styles.beneficiariosContainer} id="empresa-beneficiarios-container">
        <h2 className={styles.beneficiariosTitleTela}>
          <i className="fa-solid fa-cogs"></i>
          Plataforma CRM
        </h2>
        <div className={styles.beneficiariosContent}>
          <div className={styles.tesourariaHeader}>
            <div className={styles.subsectionButtons}>
             <button className={`${styles.buttonPage} ${screenState. pos_venda && styles.active}`} onClick={() => setScreenState({pos_venda:true, auditoria_medica:false, cobranca: false, carteirinha: false, inativo_pago: false, liminar: false, deposito: false})}><i class="fa-solid fa-page"></i>Pós Venda </button>
              <button className={`${styles.buttonPage} ${screenState. auditoria_medica && styles.active}`} onClick={() => setScreenState({pos_venda:false, auditoria_medica:true, cobranca: false, carteirinha: false, inativo_pago: false, liminar: false, deposito: false})}><i class="fa-solid fa-page"></i>Auditoria Médica </button>
              <button className={`${styles.buttonPage} ${screenState. cobranca && styles.active}`} onClick={() => setScreenState({pos_venda:false, auditoria_medica:false, cobranca: true, carteirinha: false, inativo_pago: false, liminar: false, deposito: false})}><i class="fa-solid fa-page"></i>Cobrança</button>
              <button className={`${styles.buttonPage} ${screenState. carteirinha && styles.active}`} onClick={() => setScreenState({pos_venda:false, auditoria_medica:false, cobranca: false, carteirinha: true, inativo_pago: false, liminar: false, deposito: false})}><i class="fa-solid fa-page"></i>Carteirinha </button>
              <button className={`${styles.buttonPage} ${screenState. inativo_pago && styles.active}`} onClick={() => setScreenState({pos_venda:false, auditoria_medica:false, cobranca: false, carteirinha: false, inativo_pago: true, liminar: false, deposito: false})}><i class="fa-solid fa-page"></i>Inativo pago </button>
              <button className={`${styles.buttonPage} ${screenState. liminar && styles.active}`} onClick={() => setScreenState({pos_venda:false, auditoria_medica:false, cobranca: false, carteirinha: false, inativo_pago: false, liminar: true, deposito: false})}><i class="fa-solid fa-page"></i>Liminar</button>
              <button className={`${styles.buttonPage} ${screenState. deposito && styles.active}`} onClick={() => setScreenState({pos_venda:false, auditoria_medica:false, cobranca: false, carteirinha: false, inativo_pago: false, liminar: false, deposito: true})}><i class="fa-solid fa-page"></i>Depósito</button>
            </div>
          </div>

          <div className={styles.subsectionContent}>
            
            <div className={styles.subsectionPanel}>
              <section className={styles.filtroTabelaField}>
                <div className={styles.filtroTabelaContent}>
                  <div className={styles.filtroTabelaBody}>
                    {screenState.pos_venda &&(
                    <>
                    <div className={styles.spaceInput}>
                      <div className={styles.contentBox}>
                        <TogglePadrao
                          label="Ativar"
                          checked={pagou === 'Sim'}
                          onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                          value={checkBoxValue}
                          inputRef={checkBoxRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                        <div className={styles.contentBoxAlign}>
                          <UseInputPadrao 
                            label="Ação"
                            identifier="data-inicial" 
                            required
                            type="select" 
                            value={dataInicio}
                            onChange={setDataInicio} inputRef={dataInicioRef} 
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Qtd de dias"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Quantidade de Mensagens por lote"
                            identifier="data-final" 
                            type="text"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Tempo por segundo (mínimo de 30seg)"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="text"
                            options={statusOptions} 
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Assunto"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Fase"
                            required
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Departamento"
                            required
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário Designado"
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário de Criação "
                            required
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Texto de Abertura"
                            required
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="textarea"
                            options={statusOptions} 
                            width={100}
                            gap={isMobile ? 0 : 0.0} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                        </div>
                      </div>
                    </div>
                    </>
                    )}
                    {screenState.auditoria_medica &&(
                      <>
                    <div className={styles.spaceInput}>
                      <div className={styles.contentBox}>
                        <TogglePadrao
                          label="Ativar"
                          checked={pagou === 'Sim'}
                          onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                          value={checkBoxValue}
                          inputRef={checkBoxRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                        <div className={styles.contentBoxAlign}>
                          <UseInputPadrao 
                            label="Ação"
                            identifier="data-inicial" 
                            required
                            type="select" 
                            value={dataInicio}
                            onChange={setDataInicio} inputRef={dataInicioRef} 
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Qtd de dias"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Quantidade de Mensagens por lote"
                            identifier="data-final" 
                            type="text"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Tempo por segundo (mínimo de 30seg)"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="text"
                            options={statusOptions} 
                            width={25}
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Assunto"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Fase"
                            required
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Departamento"
                            required
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário Designado"
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário de Criação "
                            required
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Limitar Combos"
                            required
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            multiple={true}
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Texto de Abertura"
                            required
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="textarea"
                            options={statusOptions} 
                            width={100}
                            gap={isMobile ? 0 : 0.0} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                        </div>
                      </div>
                    </div>
                      </>
                    )}
                    {screenState.cobranca &&(
                     <>
                      <div className={styles.spaceInput}>
                        <div className={styles.contentBox}>
                          <TogglePadrao
                            label="Ativar"
                            checked={pagou === 'Sim'}
                            onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                            value={checkBoxValue}
                            inputRef={checkBoxRef}
                            option1="Sim"
                            option2="Não"
                            color1Hex="#6b7280"
                            color2Hex="#9ca3af"
                            size="small"
                          />
                          <UseInputPadrao 
                            label="Tipo Contratante"
                            identifier="data-inicial" 
                            type="select" 
                            value={dataInicio}
                            width={25}
                            onChange={setDataInicio} inputRef={dataInicioRef} 
                            gap={isMobile ? 0 : 0.375} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <div className={styles.contentBoxAlign}>
                            <UseInputPadrao 
                              label="Qtd de dias de inadimplência"
                              identifier="data-inicial" 
                              required
                              type="select" 
                              value={dataInicio}
                              onChange={setDataInicio} inputRef={dataInicioRef} 
                              width={25}
                              gap={isMobile ? 0 : 0.375} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Quantidade de Mensagens por lote"
                              required
                              identifier="pesquisar" 
                              value={matricula}
                              onChange={matriculaChange}
                              inputRef={matriculaRef} 
                              type="select"
                              options={matriculasOptions}
                              width={25}
                              gap={isMobile ? 0 : 0.375} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Tempo por segundo (mínimo de 30seg)"
                              identifier="data-final" 
                              type="text"
                              value={dataFinal}
                              onChange={setDataFinal} inputRef={dataFinalRef} 
                              width={25}
                              gap={isMobile ? 0 : 0.375} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Rodar a Rotina a partir de que hora"
                              identifier="status" 
                              value={status}
                              onChange={statusChange}
                              inputRef={statusRef} 
                              type="text"
                              options={statusOptions} 
                              width={25}
                              gap={isMobile ? 0 : 0.375} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <TogglePadrao
                              label="Cobra Juros"
                              checked={pagou === 'Sim'}
                              onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                              value={checkBoxValue}
                              inputRef={checkBoxRef}
                              option1="Sim"
                              option2="Não"
                              color1Hex="#6b7280"
                              color2Hex="#9ca3af"
                              size="small"
                            />
                            <UseInputPadrao 
                              label="Juros"
                              required
                              identifier="pesquisar" 
                              value={matricula}
                              onChange={matriculaChange}
                              inputRef={matriculaRef} 
                              type="number"
                              options={matriculasOptions}
                              width={33.3}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <TogglePadrao
                              label="Cobra Multa"
                              checked={pagou === 'Sim'}
                              onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                              value={checkBoxValue}
                              inputRef={checkBoxRef}
                              option1="Sim"
                              option2="Não"
                              color1Hex="#6b7280"
                              color2Hex="#9ca3af"
                              size="small"
                            />
                            <UseInputPadrao 
                              label="Multa"
                              required
                              identifier="status" 
                              value={status}
                              onChange={statusChange}
                              inputRef={statusRef} 
                              type="number"
                              options={statusOptions} 
                              width={20}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="% Margem para dar desconto"
                              identifier="data-final" 
                              type="select"
                              value={dataFinal}
                              onChange={setDataFinal} inputRef={dataFinalRef} 
                              width={33.3}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />

                            <UseInputPadrao 
                              label="Assunto"
                              required
                              identifier="status" 
                              value={status}
                              onChange={statusChange}
                              inputRef={statusRef} 
                              type="select"
                              options={statusOptions} 
                              width={33.3}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Fase"
                              required
                              identifier="status" 
                              value={status}
                              onChange={statusChange}
                              inputRef={statusRef} 
                              type="select"
                              options={statusOptions} 
                              width={33.3}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Departamento"
                              identifier="data-final" 
                              required
                              type="select"
                              value={dataFinal}
                              onChange={setDataFinal} inputRef={dataFinalRef} 
                              width={33.3}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Usuário Designado"
                              identifier="status" 
                              value={status}
                              onChange={statusChange}
                              inputRef={statusRef} 
                              type="select"
                              options={statusOptions} 
                              width={33.3}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Usuário de Criação"
                              required
                              identifier="status" 
                              value={status}
                              onChange={statusChange}
                              inputRef={statusRef} 
                              type="select"
                              options={statusOptions} 
                              width={33.3}
                              gap={isMobile ? 0 : 0.333} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                            <UseInputPadrao 
                              label="Texto de Abertura"
                              required
                              identifier="status" 
                              value={status}
                              onChange={statusChange}
                              inputRef={statusRef} 
                              type="textarea"
                              options={statusOptions} 
                              width={100}
                              gap={isMobile ? 0 : 0.0} 
                              onBlur={filtrarBeneficiarios}
                              onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                            />
                          </div>
                        </div>
                      </div>
                     </>
                    )}
                    {screenState.carteirinha &&(
                    <>
                    <div className={styles.spaceInput}>
                      <div className={styles.contentBox}>
                        <TogglePadrao
                          label="Ativar"
                          checked={pagou === 'Sim'}
                          onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                          value={checkBoxValue}
                          inputRef={checkBoxRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                        <div className={styles.contentBoxAlign}>
                          <UseInputPadrao 
                            label="Ação"
                            required
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={50}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Rodar a Rotina a partir de que hora"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="number"
                            options={statusOptions} 
                            width={50}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Empresa - Email"
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Convênio - Email"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Provisório - Email"
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                        </div>
                        <div className={styles.contentBoxAlign}>
                           <UseInputPadrao 
                            label="Assunto"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                           <UseInputPadrao 
                            label="Fase"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Departamento"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário Designado"
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={50}
                            gap={isMobile ? 0 : 0.5} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário de Criação"
                            required
                            identifier="pesquisar" 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={50}
                            gap={isMobile ? 0 : 0.5} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                        </div>
                      </div>
                    </div>
                    </>
                    )}
                    {screenState.inativo_pago &&(
                    <>
                    <div className={styles.spaceInput}>
                      <div className={styles.contentBox}>
                        <TogglePadrao
                          label="Ativar"
                          checked={pagou === 'Sim'}
                          onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                          value={checkBoxValue}
                          inputRef={checkBoxRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                        <div className={styles.contentBoxAlign}>
                          <UseInputPadrao 
                            label="Módulo"
                            identifier="data-final" 
                            required
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Assunto"
                            identifier="status" 
                            required
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Fase"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Departamento "
                            identifier="data-final" 
                            required
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário Designado"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário de Criação"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Texto de Abertura"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="textarea"
                            options={matriculasOptions}
                            width={100}
                            gap={isMobile ? 0 : 0.0} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                        </div>
                      </div>
                    </div>
                    </>
                    )}
                    {screenState.liminar &&(
                     <>
                    <div className={styles.spaceInput}>
                      <div className={styles.contentBox}>
                        <TogglePadrao
                          label="Ativar"
                          checked={pagou === 'Sim'}
                          onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                          value={checkBoxValue}
                          inputRef={checkBoxRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                        <div className={styles.contentBoxAlign}>
                          <UseInputPadrao 
                            label="Rodar a Rotina a partir de que hora"
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Próximo aviso a cada x dias"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Campo"
                            identifier="pesquisar"
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Módulo "
                            identifier="data-final" 
                            required
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Assunto"
                            identifier="status" 
                            required
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Fase"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Departamento "
                            identifier="data-final" 
                            required
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário Designado"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário de Criação"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Texto de Abertura"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="textarea"
                            options={matriculasOptions}
                            width={100}
                            gap={isMobile ? 0 : 0.0} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                        </div>
                      </div>
                    </div>
                    </>
                    )}
                    {screenState.deposito &&(
                   <>
                    <div className={styles.spaceInput}>
                      <div className={styles.contentBox}>
                        <TogglePadrao
                          label="Ativar"
                          checked={pagou === 'Sim'}
                          onChange={(checkBoxChange) => setPagou(checkBoxChange ? 'Sim' : 'Não')}
                          value={checkBoxValue}
                          inputRef={checkBoxRef}
                          option1="Sim"
                          option2="Não"
                          color1Hex="#6b7280"
                          color2Hex="#9ca3af"
                          size="small"
                        />
                        <div className={styles.contentBoxAlign}>
                          <UseInputPadrao 
                            label="Rodar a Rotina a partir de que hora"
                            identifier="data-final" 
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Próximo aviso a cada x dias"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Campo"
                            identifier="pesquisar"
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Módulo "
                            identifier="data-final" 
                            required
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Assunto"
                            identifier="status" 
                            required
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Fase"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Departamento "
                            identifier="data-final" 
                            required
                            type="select"
                            value={dataFinal}
                            onChange={setDataFinal} inputRef={dataFinalRef} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário Designado"
                            identifier="status" 
                            value={status}
                            onChange={statusChange}
                            inputRef={statusRef} 
                            type="select"
                            options={statusOptions} 
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Usuário de Criação"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="select"
                            options={matriculasOptions}
                            width={33.3}
                            gap={isMobile ? 0 : 0.333} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                          <UseInputPadrao 
                            label="Texto de Abertura"
                            identifier="pesquisar"
                            required 
                            value={matricula}
                            onChange={matriculaChange}
                            inputRef={matriculaRef} 
                            type="textarea"
                            options={matriculasOptions}
                            width={100}
                            gap={isMobile ? 0 : 0.0} 
                            onBlur={filtrarBeneficiarios}
                            onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                          />
                        </div>
                      </div>
                    </div>
                    </>
                    )}
                  </div>
                </div>
              </section>
              <div className={styles.actionButtons}>
                <div className={styles.actionButtonsGroup}>
                  <button className={`${styles.actionButton} ${styles.actionButtonGravar}`}>
                    <i className="fa-solid fa-save"></i>
                    Gravar
                  </button>
                  <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen('criarBeneficiario') && (
        <ModalCriarCliente
          closeModal={() => closeModal("criarBeneficiario")}
          setAtualizarDados={() => {}}
        />
        )}
    {isModalOpen('novaMensagem') && (
  <ModalNovaMensagem
    modoEnvio={currentTab}
    onMensagemEnviada={(mensagem) => {
      setTabelaDados((prev) => [...prev, {
        telefone: mensagem.telefone || mensagem.destinatario,
        geracao: "nova",
        envio: "enviado",
        status: "enviado",
        parceiro: "novo",
        tabela: "nova",
        mensagem: mensagem.mensagem,
        resposta: "ok",
        tipo: mensagem.tipo,
        dt_vigencia: new Date().toISOString().slice(0, 10),
        matricula: "telefone",
        nome: "Novo Beneficiário",
        cpfcnpj: "00000000000",
      }]);
    }}
  />
)}
    </>
  );
};

export default AgendadorPlataforma;
