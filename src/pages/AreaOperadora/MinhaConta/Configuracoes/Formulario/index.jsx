import React, { useMemo, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { UseInputPadrao, UseInputMask } from "../../../../../components/InputPadrao";
import TabelaPadrao from "../../../../../components/TabelaPadrao";
import { configuracoesForms } from "../../../../../utils/mockConf";
import { useNavigate, useLocation } from "react-router";
import { handleResizeTabelaAvulsa } from '../../../../../utils/functions';

const formularios = [
  "Associado",
  "Representante",
  "Fornecedor",
  "Funcionário",
  "Proposta",
  "Representante",
  "Lançamento",
];

const iconesFormularios = {
  "Associado": "fa-solid fa-user-group",
  "Representante": "fa-solid fa-handshake",
  "Fornecedor": "fa-solid fa-truck-fast",
  "Funcionário": "fa-solid fa-briefcase",
  "Proposta": "fa-solid fa-file-signature",
  "Entidade": "fa-solid fa-sitemap",
  "Lançamento": "fa-solid fa-file-invoice-dollar",
  "Segurado": "fa-solid fa-shield-halved",
  "Dependente": "fa-solid fa-user-plus",
  "Estabelecimento": "fa-solid fa-building",
};

export default function FormularioDrOnline({ isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [formSelecionado, setFormSelecionado, formSelecionadoRef] = UseInputMask(null, "text", "");
  const [textoBusca, setTextoBusca, textoBuscaRef] = UseInputMask(null, "text", "");
  
  // Estado local para armazenar os dados, com um valor inicial lido do localStorage
  const [dadosLocais, setDadosLocais] = useState(() => {
    const dadosSalvos = localStorage.getItem('dadosFormularios');
    return dadosSalvos ? JSON.parse(dadosSalvos) : {};
  });

  // Função para obter os dados base do mock ou do localStorage
  const getDadosBase = (tipo) => {
    const dadosBase = configuracoesForms[tipo] || { ...configuracoesForms.Geral, nome: `Formulário ${tipo}` };
    const dadosLocal = dadosLocais[tipo] || [];
    
    // Usa dados locais se existirem, caso contrário usa dados do mock
    return {
      ...dadosBase,
      tabela: dadosLocal.length > 0 ? dadosLocal : dadosBase.tabela,
    };
  };

  // Este useEffect agora lida com o carregamento inicial,
  // a navegação com estado e a atualização do localStorage
  useEffect(() => {
    if (location.state && location.state.tipoFormulario) {
      setFormSelecionado({ target: { value: location.state.tipoFormulario } });

      if (location.state.novoCadastroAdicionado) {
        const novoCadastro = location.state.novoCadastroAdicionado;
        const tipo = location.state.tipoFormulario;

        setDadosLocais(prevDados => {
          const dadosAtuais = prevDados[tipo] ? [...prevDados[tipo]] : getDadosBase(tipo).tabela;
          const cadastroExistenteIndex = dadosAtuais.findIndex(item => item.id === novoCadastro.id);

          if (cadastroExistenteIndex > -1) {
            dadosAtuais[cadastroExistenteIndex] = novoCadastro;
          } else {
            dadosAtuais.push(novoCadastro);
          }
          
          const novosDados = { ...prevDados, [tipo]: dadosAtuais };
          localStorage.setItem('dadosFormularios', JSON.stringify(novosDados));
          return novosDados;
        });
      }
      // Limpa o estado da navegação
      location.state = {};
    }
  }, [location.state, setFormSelecionado]);
  

  const VisualizarFormularioButton = ({ onClick }) => (
    <span className={styles.SpanEye} onClick={onClick}>
      <i className="fas fa-eye"></i>
      Visualizar Formulário
    </span>
  );

  const options = formularios.map((f) => ({ value: f, label: f }));
  const dadosDoFormulario = useMemo(() => {
    if (!formSelecionado) return configuracoesForms.Geral;
    const tipo = formSelecionado;
    return getDadosBase(tipo);
  }, [formSelecionado, dadosLocais]);

  const aplicarFiltros = () => {};

  const renderHtmlString = (item) => {
    if (typeof item.formulario === 'string' && item.formulario.trim() !== '') {
      return (
        <VisualizarFormularioButton onClick={() => handleVisualizarClick(item)} />
      );
    }
    return item.formulario; 
  };

  const handleVisualizarClick = (item) => {
    if (!item) return;

    const formularioCompleto = dadosDoFormulario.tabela.find(i => i.id === item.id);

    navigate("cadastro", {
      state: {
        formularioParaEdicao: formularioCompleto,
        modoEdicao: true,
        tipoFormulario: formSelecionado
      }
    });
  };

  const dadosFiltrados = useMemo(() => {
    const dadosBrutos = dadosDoFormulario.tabela;
    const dados = dadosBrutos.filter((item) =>
      Object.values(item).some((valor) =>
        String(valor).toLowerCase().includes(textoBusca.toLowerCase())
      )
    );
    return dados.map(item => ({
      ...item,
      titleForms: renderHtmlString(item)
    }));
  }, [textoBusca, dadosDoFormulario]); 

  const handleNovoCadastroClick = () => {
    navigate("cadastro", { state: { tipoFormulario: formSelecionado } });
  };

  useEffect(() => {
    const cleanupHandler = () => handleResizeTabelaAvulsa('formularios', 'formularios-container');
    window.addEventListener("resize", cleanupHandler);
    requestAnimationFrame(() => {
      handleResizeTabelaAvulsa('formularios', 'formularios-container');
    });
    return () => {
      window.removeEventListener("resize", cleanupHandler);
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      handleResizeTabelaAvulsa('formularios', 'formularios-container');
    });
  }, [dadosDoFormulario]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.beneficiariosTitleTela}>
          <h1 className={styles.title}>
            <i className="fa-brands fa-wpforms"></i>
            Formulários
          </h1>
        </div>
        <div className={styles.FormSelector}>
          <UseInputPadrao
            label="Selecione o formulário"
            identifier="select-form"
            type="select"
            value={formSelecionado}
            onChange={(e) => setFormSelecionado({ target: { value: e.target.value } })}
            options={options}
            searchable={false}
            width={100}
            defaultSelect={false}
            inputRef={formSelecionadoRef}
          />
        </div>
      </div>
      <div className={styles.editorContainer} id="formularios-container">
        {formSelecionado ? (
          <>
            <h2 className={styles.PlanHeader}>
              <i className={iconesFormularios[formSelecionado]}></i>
              {` ${formSelecionado}`}
            </h2>
            <section className={styles.InputAlign}>
              <div className={styles.Pesquisar}>
                <UseInputPadrao
                  label="Pesquisar"
                  identifier="input-pesquisa"
                  type="text"
                  value={textoBusca}
                  onChange={(e) => setTextoBusca({ target: { value: e.target.value } })}
                  inputRef={textoBuscaRef}
                  placeholder="Digite para pesquisar..."
                />
              </div>
              <div className={styles.ToolbarPlan}>
                <TabelaPadrao
                  tabelaId="formularios"
                  columns={dadosDoFormulario.colunasTabela}
                  data={dadosFiltrados}
                  options={{
                    showPaginationSwitch: true,
                    showToggleView: true,
                    showColumnsSelector: true,
                    additionalButtons: [
                      {
                        title: "Novo Cadastro",
                        icon: "fa fa-plus",
                        onClick: handleNovoCadastroClick,
                      },
                      {
                        title: "Pesquisar",
                        icon: "fa fa-search",
                        onClick: aplicarFiltros,
                      },
                    ],
                  }}
                  isMobile={isMobile}
                />
              </div>
            </section>
          </>
        ) : (
          <p className={styles.instrucao}>Selecione um formulário para começar</p>
        )}
      </div>
    </div>
  );
}