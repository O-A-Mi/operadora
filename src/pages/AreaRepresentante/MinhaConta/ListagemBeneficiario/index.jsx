import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../components/InputPadrao';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLoader } from '../../../../context';
import TabelaPadrao from '../../../../components/TabelaPadrao';
import { useAtom } from 'jotai';
import { idAtom } from '../../../../context/jotai';
import { carregarInfos } from '../../../../db/carregarGeral';
import { converterParaData, limparFiltros, handleResizeTabela } from '../../../../utils/functions';
import { jsonRoute } from "../../../../utils/json";
import { useNavigate } from "react-router";
import dadosPacientes from './pacientes.json';

const Listagem_Beneficiario = () => {
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  const [paciente, pacienteChange, pacienteRef] = UseInputMask('999.999.999-99', "both");
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [status, statusChange, statusRef] = UseInputMask();
  const [tokenEmpresa] = useAtom(idAtom)

  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [tabelaDados, setTabelaDados] = useState([]);
  const [filtroDados, setFiltroDados] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [statusOptions, setStatusOptions] = useState([])

  const tabelaColumns = [
    { value: "nome", name: "Nome do Paciente" },
    { value: "cpf", name: "CPF" },
    { value: "data_atendimento", name: "Data do Atendimento" },
    { value: "status_questionario", name: "Status do Questionário" },
    { value: "perguntas_respondidas", name: "Perguntas Respondidas" },
    { value: "problemas_identificados", name: "Problemas Identificados" },
    { value: "medico_responsavel", name: "Médico Responsável" },
    { value: "observacoes", name: "Observações" },
  ];

  const carregarDados = useCallback(async () => {
    showLoader();
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const params = {
        campo: '*',
        tabela: 'VW_QUESTIONARIOS_PACIENTES',
      };
      
      const dados = dadosPacientes.questionarios.map(item => ({
        ...item,
        data_atendimento_formatada: item.data_atendimento
      }));
      
      setTabelaDados(dados);
      setFiltroDados(dados);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setTabelaDados(dadosPacientes.questionarios);
      setFiltroDados(dadosPacientes.questionarios);
      setDadosCarregados(true);
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  const filtrarDados = useCallback(() => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let dadosFiltrados = [...tabelaDados];

    if (paciente) {
      const pacienteLower = paciente.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.nome.toLowerCase().includes(pacienteLower) || 
        item.cpf.includes(paciente)
      );
    }

    if (status) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.status_questionario.toLowerCase() === status.toLowerCase()
      );
    }

    if (dataInicio && dataFinal) {
      dadosFiltrados = dadosFiltrados.filter(item => {
        const dataAtendimento = new Date(item.data_atendimento.split('/').reverse().join('-') + 'T00:00:00');
        const inicial = new Date(dataInicio + 'T00:00:00');
        const final = new Date(dataFinal + 'T00:00:00');
        return dataAtendimento >= inicial && dataAtendimento <= final;
      });
    }

    setFiltroDados(dadosFiltrados);
  }, [tabelaDados, paciente, status, dataInicio, dataFinal, dadosCarregados, carregarDados]);

  useEffect(() => {
    const status = tabelaDados.length > 0 && tabelaDados.some(row => row.status_questionario)
      ? [...new Set(tabelaDados.map(row => row.status_questionario))]
        .filter(Boolean)
        .map(statusValue => ({
          value: statusValue,
          label: statusValue
        }))
      : [];

    setStatusOptions(status);
  }, [tabelaDados]);

  const limparFiltro = useCallback(() => {
    limparFiltros([
      { setter: pacienteChange, ref: pacienteRef },
      { setter: statusChange, ref: statusRef },
    ]);
    setDataInicio("");
    setDataFinal("");
    if (dadosCarregados) {
      setFiltroDados(tabelaDados);
    } else {
      setFiltroDados([]);
    }
  }, [tabelaDados, dadosCarregados, pacienteChange, pacienteRef, statusChange, statusRef]);

  const visualizarQuestionario = useCallback((row) => {
    navigate(`/${jsonRoute.Representante_Area}/${jsonRoute.Representante_FaseAtendimento}`, { 
      state: { 
        paciente: row.nome,
        cpf: row.cpf,
        dataAtendimento: row.data_atendimento,
        modo: 'visualizacao'
      }
    });
  }, [navigate]);

  const dadosTabela = useMemo(() => dadosCarregados && filtroDados.length > 0 ? filtroDados : [], [filtroDados, dadosCarregados]);

  const tabelaOptions = useMemo(() => ({
    showSearch: () => filtrarDados(),
    showPaginationSwitch: true,
    showToggleView: true,
    showColumnsSelector: true,
    customActions: (row) => [
      {
        icon: "fas fa-eye",
        tooltip: "Visualizar Questionário",
        onClick: () => visualizarQuestionario(row)
      }
    ]
  }), [filtrarDados, visualizarQuestionario]);

  useEffect(() => {
    const resizeHandler = () => handleResizeTabela('representante-questionarios', 'representante-questionarios-container');
    window.addEventListener("resize", () => { resizeHandler(); setIsMobile(window.innerWidth < 1024); });
    window.addEventListener("layout-resize", () => { resizeHandler(); setIsMobile(window.innerWidth < 1024); });

    requestAnimationFrame(() => {
      handleResizeTabela('representante-questionarios', 'representante-questionarios-container');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, [handleResizeTabela]);

  return (
    <>
      <div className={styles.beneficiariosContainer} id="representante-questionarios-container">
        <h2 className={styles.beneficiariosTitleTela}>
          <i className="fa-solid fa-users"></i>
          Listagem de Beneficiários
        </h2>
        <p className={styles.beneficiariosDescriptionTela}>Visualize o histórico de questionários realizados com seus pacientes. Você pode filtrar por paciente, data e status do questionário.</p>
        <div className={styles.beneficiariosContent}>
          <section className={styles.filtroTabelaField}>
            <div className={styles.filtroTabelaContent}>
              <div className={styles.filtroTabelaHeader}>
                <h5 className={styles.filtroTabelaTitle}>
                  <i className="fa-solid fa-filter"></i>
                  Buscar por:
                </h5>
                <button className={styles.filtroTabelaButton} onClick={limparFiltro}>
                  <i className="fa-solid fa-filter-slash"></i> Limpar filtro
                </button>
              </div>
              <div className={styles.filtroTabelaBody}>
                <UseInputPadrao
                  label="Paciente"
                  identifier="paciente"
                  icon="fa-solid fa-user"
                  value={paciente}
                  onChange={pacienteChange}
                  inputRef={pacienteRef}
                  width={isMobile ? 100 : 50}
                  gap={isMobile ? 0 : 0.5}
                  placeholder="Digite nome ou CPF"
                  onBlur={() => filtrarDados()}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarDados() }}
                  type='text'
                />
                <UseInputPadrao
                  label="Status do Questionário" 
                  identifier="status" 
                  value={status} 
                  onChange={statusChange} 
                  inputRef={statusRef}
                  type='select' 
                  options={statusOptions}
                  width={isMobile ? 100 : 50} 
                  gap={isMobile ? 0 : 0.5}
                  onBlur={() => filtrarDados()}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarDados() }}
                />
                <UseInputPadrao
                  label="Data Atendimento - Inicial" 
                  identifier="data-inicial"
                  type='date' 
                  value={dataInicio} 
                  onChange={(e) => setDataInicio(e.target.value)}
                  width={isMobile ? 100 : 50} 
                  gap={isMobile ? 0 : 0.5}
                  onBlur={() => filtrarDados()}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarDados() }}
                />
                <UseInputPadrao
                  label="Data Atendimento - Final" 
                  identifier="data-final"
                  type='date' 
                  value={dataFinal} 
                  onChange={(e) => setDataFinal(e.target.value)}
                  width={isMobile ? 100 : 50} 
                  gap={isMobile ? 0 : 0.5}
                  onBlur={() => filtrarDados()}
                  onKeyPress={(e) => { if (e.key === 'Enter') filtrarDados() }}
                />
              </div>
            </div>
          </section>
          <TabelaPadrao
            tabelaId="representante-questionarios"
            columns={tabelaColumns}
            data={dadosTabela}
            options={tabelaOptions}
          />
        </div>
      </div>
    </>
  );
}

export default Listagem_Beneficiario;
