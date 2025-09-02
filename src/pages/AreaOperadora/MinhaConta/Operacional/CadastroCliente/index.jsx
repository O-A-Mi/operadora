import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../components/InputPadrao';
import { useState, useEffect, useCallback } from 'react';
import { useLoader } from '../../../../../context';
import TabelaPadrao from '../../../../../components/TabelaPadrao';
import { useAtom } from 'jotai';
import { idAtom } from '../../../../../context/jotai';
import { carregarInfos } from '../../../../../db/carregarGeral';
import { converterParaData, limparFiltros, handleResizeTabela } from '../../../../../utils/functions';
import { jsonRoute } from "../../../../../utils/json";
import { Outlet, useNavigate, useLocation } from "react-router";



const CadastroCliente = () => {
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();



  const [beneficiario, beneficiarioChange, beneficiarioRef] = UseInputMask('999.999.999-99', "both");
  const [matricula, matriculaChange, matriculaRef] = UseInputMask();
  const [status, statusChange, statusRef] = UseInputMask();
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [tokenEmpresa] = useAtom(idAtom)


  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [atualizarDados, setAtualizarDados] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [matriculasOptions, setMatriculasOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([])

  const tabelaColumns = [
    { value: "nome", name: "Nome" },
    { value: "cpfcnpj", name: "CPF" },
    { value: "tipo_cliente", name: "Tipo do Beneficiário" },
    { value: "nome_pai", name: "Nome do Titular" },
    { value: "dt_nascimento", name: "Data de Nascimento" },
    { value: "status", name: "Status" },
    { value: "matricula", name: "Matrícula" },
    { value: "contrato", name: "Contrato" },
    { value: "plano", name: "Plano" },
    { value: "dt_vigencia", name: "Data de Vigência" },
    { value: "consultor", name: "Consultor" },
  ];

  const dadosTabela = [
    {
      nome: "Rodrigo",
      cpfcnpj: "123.456.78-9",
      tipo_cliente: "Titular",
      nome_pai: "",
      dt_nascimento: "22/02/2002",
      status: "Ativo",
      matricula: "000014225",
      contrato: "000000158",
      plano: "SAÚDE INTEGRAL",
      dt_vigencia: "",
      consultor: "",
    },

    {
      nome: "Rodolfo",
      cpfcnpj: "987.654.32-1",
      tipo_cliente: "Titular",
      nome_pai: "",
      dt_nascimento: "22/02/2000",
      status: "Inativo",
      matricula: "000014325",
      contrato: "000000159",
      plano: "SAÚDE INTEGRAL",
      dt_vigencia: "",
      consultor: "",
    },

    {
      nome: "Alex",
      cpfcnpj: "824.073.169-40",
      tipo_cliente: "Titular",
      nome_pai: "",
      dt_nascimento: "22/02/2000",
      status: "Inativo",
      matricula: "000014325",
      contrato: "000000159",
      plano: "SAÚDE INTEGRAL",
      dt_vigencia: "",
      consultor: "",
    },
  ]


  const buscarBeneficiarios = () => {
    showLoader();
    const params = {
      campo: '*',
      tabela: 'VW_SITE_CLIENTES_EMPRESA',
    };
    carregarInfos('carregarClientes', params, 'carregarClientes');
  }

  useEffect(() => {
    window.carregarClientes = carregarClientes;
    buscarBeneficiarios();
    return () => delete window.carregarClientes;
  }, [atualizarDados]);

  const carregarClientes = useCallback((dados) => {
    let resp;
    try {
      resp = JSON.parse(dados);

      const dadosFormatados = resp.map((row) => ({
        nome: row.nome,
        cpfcnpj: row.cpfcnpj,
        tipo_cliente: row.tipo_cliente == 'T' ? 'Titular' : 'Dependente',
        nome_pai: row.tipo_cliente == 'T' ? '' : row.nome_pai,
        dt_nascimento: row.dt_nascimento,
        status: row.status,
        matricula: row.matricula,
        contrato: row.contrato,
        plano: row.plano,
        dt_vigencia: row.dt_vigencia,
        consultor: row.consultor,
      }))

      setTabelaDados(dadosFormatados);
    } catch (error) {
      hideLoader();
      console.error("Erro ao parsear resposta de beneficiários:", dados, error);

      return;
    }
  }, [setTabelaDados, hideLoader]);

  const filtrarBeneficiarios = () => {
    try {
      showLoader();
      const filtro = {
        beneficiario: beneficiarioRef.current?.value || "",
        matricula: matriculaRef.current?.value || "",
        status: statusRef.current?.value || "",
        dataInicio: dataInicio || "",
        dataFinal: dataFinal || "",
      };

      const dataInicioFiltro = filtro.dataInicio;
      const dataFinalFiltro = filtro.dataFinal;
      const dadosFiltrados = tabelaDados.filter((row) => {
        const nome = row.nome.toLowerCase();
        const cpf = row.cpfcnpj;
        const status = row.status.toLowerCase();
        const matricula = row.matricula.toLowerCase();
        const dt_vigencia = converterParaData(row.dt_vigencia);
        const dataDentroDoIntervalo =
          (!dataInicioFiltro || dt_vigencia >= dataInicioFiltro) &&
          (!dataFinalFiltro || dt_vigencia <= dataFinalFiltro);

        return (
          (filtro.beneficiario === "" || (nome.includes(filtro.beneficiario.toLowerCase()) || cpf.includes(filtro.beneficiario))) &&
          (filtro.matricula === "" || matricula === filtro.matricula.toLowerCase()) &&
          (filtro.status === "" || status === filtro.status.toLowerCase()) &&
          dataDentroDoIntervalo
        );
      })

      setFiltroDados(dadosFiltrados);
    } catch (error) {
      hideLoader();
      console.error("Erro ao filtrar beneficiários:", error);
      return;
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    const matriculas = tabelaDados.map((row) => ({
      value: row.matricula,
      label: row.matricula,
    }));

    const status = tabelaDados.length > 0 && tabelaDados.some(row => row.status)
      ? [...new Set(tabelaDados.map(row => row.status))]
        .filter(Boolean)
        .map(statusValue => ({
          value: statusValue,
          label: statusValue
        }))
      : [];

    setMatriculasOptions(matriculas);
    setStatusOptions(status);
    filtrarBeneficiarios();
  }, [tabelaDados]);

  const limparFiltro = () => {
    limparFiltros([
      { setter: beneficiarioChange, ref: beneficiarioRef },
      { setter: matriculaChange, ref: matriculaRef },
      { setter: statusChange, ref: statusRef },
    ]);
    setDataInicio("");
    setDataFinal("");
    filtrarBeneficiarios();
  };

  useEffect(() => {
    const resizeHandler = () => handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
    window.addEventListener("resize", () => { resizeHandler(); setIsMobile(window.innerWidth < 1024); });
    window.addEventListener("layout-resize", () => { resizeHandler(); setIsMobile(window.innerWidth < 1024); });

    requestAnimationFrame(() => {
      handleResizeTabela('empresa-beneficiarios', 'empresa-beneficiarios-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, [handleResizeTabela]);

  return (
    <>
      <div className={styles.beneficiariosContainer} id="empresa-beneficiarios-container">
        <h2 className={styles.beneficiariosTitleTela}>
          <i className="fa-solid fa-building"></i>
          Cliente
        </h2>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContent}>
              <div className={styles.filtroTabelaHeader}>
                <h3 className={styles.filtroTabelaTitle}>
                  <i className="fa-solid fa-filter"></i>
                  Buscar por:
                </h3>
                <button className={styles.filtroTabelaButton} onClick={limparFiltro}><i className="fa-solid fa-filter-slash"></i>Limpar filtro</button>
              </div>
              <div className={styles.filtroTabelaBody}>
                <UseInputPadrao
                  label="Beneficiário" identifier="beneficiario" icon="fas fa-user"
                  value={beneficiario} onChange={beneficiarioChange} inputRef={beneficiarioRef}
                  width={isMobile ? 100 : 33.33} gap={isMobile ? 0 : 0.5}
                  placeholder="Digite nome ou CPF" upperCase
                  onBlur={() => filtrarBeneficiarios()}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}

                  type='select'
                />
                <UseInputPadrao
                  label="Matricula" identifier="matricula"
                  value={matricula} onChange={matriculaChange} inputRef={matriculaRef}
                  type='select' options={matriculasOptions}
                  width={isMobile ? 100 : 33.33} gap={isMobile ? 0 : 0.5}
                  onBlur={() => filtrarBeneficiarios()}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}

                />
                <UseInputPadrao
                  label="Status" identifier="status"
                  value={status} onChange={statusChange} inputRef={statusRef}
                  type='select' options={statusOptions}
                  width={isMobile ? 100 : 33.33} gap={isMobile ? 0 : 0}
                  onBlur={() => filtrarBeneficiarios()}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                />
                <div className={styles.filtroTabelaBody}>
                  <UseInputPadrao
                    label="Data Vigência - Inicial" identifier="data-inicial"
                    type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}
                    width={isMobile ? 100 : 50} gap={isMobile ? 0.5 : 0.666}
                    onBlur={() => filtrarBeneficiarios()}
                    onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}

                  />
                  <UseInputPadrao
                    label="Data Vigência - Final" identifier="data-final"
                    type='date' value={dataFinal} onChange={(e) => setDataFinal(e.target.value)}
                    width={isMobile ? 100 : 50} gap={isMobile ? 0.5 : 0}
                    onBlur={() => filtrarBeneficiarios()}
                    onKeyPress={(e) => { if (e.key === 'Enter') filtrarBeneficiarios() }}
                  />
                </div>
              </div>
            </div>
          </section>
          <TabelaPadrao
            tabelaId="empresa-beneficiarios"
            columns={tabelaColumns}
            data={dadosTabela}
            options={{
              showSearch: buscarBeneficiarios,
              showPaginationSwitch: true,
              showToggleView: true,
              showColumnsSelector: true,
              additionalButtons:
                [{
                  title: 'Adicionar Cliente',
                  icon: 'fa-regular fa fa-plus',
                  onClick: () => navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/${jsonRoute.CadastroCliente}/${jsonRoute.CadastroPlanosNovo}`)
                }]
            }}
          />
        </div>
      </div>

    </>
  );
}
export default CadastroCliente;
