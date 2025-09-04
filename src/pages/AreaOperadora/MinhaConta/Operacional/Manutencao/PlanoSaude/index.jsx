import React, { useState, useEffect } from 'react';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao';
import TabelaPadrao from '../../../../../../components/TabelaPadrao';
import { useNavigate } from 'react-router';
import { jsonRoute } from '../../../../../../utils/json.js';
import { limparFiltros } from '../../../../../../utils/functions';
import styles from './styles.module.css';
import dadosPlanos from './dados-planos.json';
import { useLoader } from '../../../../../../context/index.jsx';

const CadastroPlanos = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [status, setStatus, statusRef] = UseInputMask();
  const [tipoPlano, setTipoPlano, tipoPlanoRef] = UseInputMask();
  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
  const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
  const [texto, setTexto, textoRef] = UseInputMask();

  const [dados, setDados] = useState([]);
  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [opcoes, setOpcoes] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  useEffect(() => {
    setOpcoes(dadosPlanos.opcoes);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const limparFiltro = () => {
    limparFiltros([
      { setter: setStatus, ref: statusRef },
      { setter: setTipoPlano, ref: tipoPlanoRef },
      { setter: setConvenio, ref: convenioRef },
      { setter: setGrupoContratual, ref: grupoContratualRef },
      { setter: setPesquisar, ref: pesquisarRef },
      { setter: setTexto, ref: textoRef },
    ]);
    if (dadosCarregados) {
      setDados(dadosOriginais);
    }
  };

  const carregarDados = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const dadosFormatados = dadosPlanos.planos || [];
      setDados(dadosFormatados);
      setDadosOriginais(dadosFormatados);
      setDadosCarregados(true);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const filtrarDados = () => {
    if (!dadosCarregados) {
      carregarDados();
      return;
    }

    let filtrados = dadosOriginais;

    if (status) {
      filtrados = filtrados.filter(item => item.status === status);
    }

    if (tipoPlano) {
      filtrados = filtrados.filter(item => item.tipoPlano === tipoPlano);
    }

    if (convenio) {
      filtrados = filtrados.filter(item => item.convenio === convenio);
    }

    if (grupoContratual) {
      filtrados = filtrados.filter(item => item.grupoContrato === grupoContratual);
    }

    if (texto) {
      const textoLower = texto.toLowerCase();
      
      if (pesquisar === 'codigo') {
        filtrados = filtrados.filter(item => 
          item.codigo.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'descricao') {
        filtrados = filtrados.filter(item => 
          item.descricao.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'abreviacao') {
        filtrados = filtrados.filter(item => 
          item.abreviacao.toLowerCase().includes(textoLower)
        );
      } else if (pesquisar === 'entidade') {
        filtrados = filtrados.filter(item => 
          item.entidade.toLowerCase().includes(textoLower)
        );
      }
    }

    setDados(filtrados);
  };

  const handleRowClick = (row, rowIndex) => {
    showLoader();
    navigate(`/${jsonRoute.AreaDronline}/${jsonRoute.Operacional}/${jsonRoute.CadastroPlanos}/${jsonRoute.CadastroPlanosNovo}`, {
      state: {
        planoParaEdicao: row,
        modoEdicao: true
      }
    });
  };



  const tabelaColumns = [
    { value: 'codigo', name: 'Código', sortable: true, align: 'center' },
    { value: 'tipoPlano', name: 'Tipo de Plano', sortable: true, align: 'left' },
    { value: 'convenio', name: 'Convênio', sortable: true, align: 'left' },
    { value: 'grupoContrato', name: 'Grupo de Contrato', sortable: true, align: 'left' },
    { value: 'descricao', name: 'Descrição', sortable: true, align: 'left' },
    { value: 'abreviacao', name: 'Abreviação', sortable: true, align: 'center' },
    { value: 'entidade', name: 'Entidade', sortable: true, align: 'left' },
    { value: 'codigoExternoFornecedor', name: 'Código Externo Fornecedor', sortable: true, align: 'center' },
    { value: 'codigoExternoEmpresa', name: 'Código Externo Empresa', sortable: true, align: 'center' },
    { value: 'ordemVisualizacao', name: 'Ordem Visualização', sortable: true, align: 'center' },
    { value: 'vrCusto', name: 'Vr. Custo', sortable: true, align: 'right' },
    { value: 'vrVenda', name: 'Vr. Venda', sortable: true, align: 'right' },
    { value: 'carencia', name: 'Carência', sortable: true, align: 'center' },
    { value: 'mesAniversarioReajuste', name: 'Mês de aniversário do Reajuste', sortable: true, align: 'center' },
    { value: 'tipoReajuste', name: 'Tipo de Reajuste', sortable: true, align: 'center' },
    { value: 'adesao', name: 'Adesão', sortable: true, align: 'center' },
    { value: 'cobraDependentes', name: 'Cobra Dependentes?', sortable: true, align: 'center' },
    { value: 'utilizaFaixaIdade', name: 'Utiliza por Faixa de Idade?', sortable: true, align: 'center' }
  ];

  return (
    <div className={styles.cadastroPlanosContainer} id="plano-serviço-container">
      <h2 className={styles.cadastroPlanosTitle}>
        <i className="fa-solid fa-clipboard-list"></i>
        Plano/Serviço
      </h2>
      
      <div className={styles.cadastroPlanosContent}>
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
                label="Status"
                identifier="status" 
                value={status}
                onChange={setStatus}
                inputRef={statusRef}
                type='select'
                options={opcoes.status || []} 
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Tipo de Plano"
                identifier="tipo-plano" 
                value={tipoPlano}
                onChange={setTipoPlano}
                inputRef={tipoPlanoRef}
                type='select'
                options={opcoes.tipoPlano || []} 
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Convênio"
                identifier="convenio" 
                value={convenio}
                onChange={setConvenio}
                inputRef={convenioRef}
                type='select'
                options={opcoes.convenio || []} 
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5} 
              />
              <UseInputPadrao 
                label="Grupo Contratual"
                identifier="grupo-contratual" 
                value={grupoContratual}
                onChange={setGrupoContratual}
                inputRef={grupoContratualRef}
                type='select'
                options={opcoes.grupoContratual || []} 
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0} 
              />
              <div className={styles.centerInputs}>
                <div className={styles.rowInputs}>
                  <UseInputPadrao 
                    label="Pesquisar"
                    identifier="pesquisar" 
                    value={pesquisar}
                    onChange={setPesquisar}
                    inputRef={pesquisarRef}
                    type='select'
                    options={opcoes.pesquisar || []}
                    width={isMobile ? 100 : 25}
                    gap={isMobile ? 0 : 0.5} 
                  />
                  <UseInputPadrao 
                    label="Texto"
                    identifier="texto"
                    value={texto}
                    onChange={setTexto}
                    inputRef={textoRef}
                    width={isMobile ? 100 : 50}
                    gap={isMobile ? 0 : 0.5} 
                    upperCase
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.tabelaSection}>
          <TabelaPadrao
            tabelaId="plano-serviço"
            columns={tabelaColumns}
            data={dados}
            options={{
              showPaginationSwitch: true,
              showSearch: () => {
                showLoader();
                setTimeout(() => {
                  hideLoader();
                  filtrarDados();
                }, 500);
              },
              showToggleView: true,
              showColumnsSelector: true,
              showPrint: false,
              showExport: true,
              showFooter: false,
              fileName: "plano-serviço",
              rowOnClick: handleRowClick,
              additionalButtons: [
                {
                  title: 'Novo Plano',
                  icon: 'fa-regular fa fa-plus',
                  onClick: () => {
                    showLoader();
                    navigate(`/${jsonRoute.AreaDronline}/${jsonRoute.Operacional}/${jsonRoute.CadastroPlanos}/${jsonRoute.CadastroPlanosNovo}`);
                  }
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CadastroPlanos; 