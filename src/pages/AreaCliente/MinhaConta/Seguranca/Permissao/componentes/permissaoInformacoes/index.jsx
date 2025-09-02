import styles from './styles.module.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router";
import { jsonRoute } from '../../../../../../../utils/json';
import TabelaPadrão from '../../../../../../../components/TabelaPadrao';
import 'jstree/dist/themes/default/style.css';
import $ from 'jquery';
import 'jstree';

function PermissaoInformacoes() {
  const [screenState, setScreenState] = useState({
    buscaRapida: false,
    novo: false,
    gravar: false,
    deletar: false,
    voltar: false,
    showTabela: false,
    tabela: false,
    financeiro: false,
    administrativo: false,
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    financeiro: false,
    administrativo: false,
  });

  const [dropdownDataState, setDropdownDataState] = useState({
    financeiro: [
      {
        id: 'financeiro',
        text: 'Financeiro',
        state: { opened: true, selected: false },
        children: [
          {
            id: 'lancamento',
            text: 'Lançamento',
            state: { selected: false },
          },
          {
            id: 'tesouraria',
            text: 'Tesouraria',
            state: { opened: true, selected: false },
            children: [
              { id: 'fluxoCaixa', text: 'Fluxo de Caixa', state: { selected: false } },
              { id: 'contasReceber', text: 'Contas a Receber', state: { selected: false } },
              { id: 'contasPagar', text: 'Contas a Pagar', state: { selected: false } },
              { id: 'comissao', text: 'Comissão', state: { selected: false } },
            ],
          },
          {
            id: 'competencia',
            text: 'Competência',
            state: { selected: false },
            children: [
              { id: 'comissaoFaturamento', text: 'Comissão por Faturamento', state: { selected: false } },
            ],
          },
          { id: 'fechamento', text: 'Fechamento', state: { selected: false } },
          { id: 'dre', text: 'DRE', state: { selected: false } },
        ],
      },
    ],
    administrativo: [
      {
        id: 'administrativo',
        text: 'Administrativo',
        state: { opened: true, selected: false },
        children: [
          { id: 'manutencao', text: 'Manutenção', state: { selected: false } },
          { id: 'venda', text: 'Venda', state: { selected: false } },
          {
            id: 'portalConsultorEmpresarial',
            text: 'Portal do Consultor - Empresarial',
            state: { selected: false },
          },
          {
            id: 'portalInternoEmpresarial',
            text: 'Portal Interno - Empresarial',
            state: { selected: false },
          },
          {
            id: 'portalConsultorAdesao',
            text: 'Portal do Consultor - Adesão',
            state: { selected: false },
          },
          {
            id: 'portalInternoAdesao',
            text: 'Portal Interno - Adesão',
            state: { selected: false },
          },
          { id: 'mesaNegociacao', text: 'Mesa de Negociação', state: { selected: false } },
          { id: 'consulta', text: 'Consulta', state: { selected: false } },
          { id: 'terceiro', text: 'Terceiro', state: { selected: false } },
          { id: 'migracaoDados', text: 'Migração de Dados', state: { selected: false } },
          { id: 'carteirinha', text: 'Carteirinha', state: { selected: false } },
          { id: 'redeCredenciada', text: 'Rede Credenciada', state: { selected: false } },
          { id: 'atendimentoChamada', text: 'Atendimento - Chamada', state: { selected: false } },
          { id: 'acaoJudicial', text: 'Ação Judicial', state: { selected: false } },
        ],
      },
    ],
  });

  const [financeiroData, setFinanceiroData] = useState([]);
  const [administrativoData, setAdministrativoData] = useState([]);

  const dropdownRef = useRef({
    financeiro: null,
    administrativo: null,
  });
  const treeRef = useRef({
    financeiro: null,
    administrativo: null,
  });

  useEffect(() => {
    if (screenState.financeiro) {
      
      setFinanceiroData([
        { id: 1, name: 'Relatório Financeiro 1', value: 1000 },
        { id: 2, name: 'Relatório Financeiro 2', value: 2000 },
        { id: 3, name: 'Relatório Financeiro 3', value: 3000 },
      ]);
    } else {
      setFinanceiroData([]);
    }
  }, [screenState.financeiro]);

  useEffect(() => {
    if (screenState.administrativo) {
      setAdministrativoData([
        { id: 1, name: 'Relatório Administrativo 1', value: 500 },
        { id: 2, name: 'Relatório Administrativo 2', value: 1500 },
        { id: 3, name: 'Relatório Administrativo 3', value: 2500 },
      ]);
    } else {
      setAdministrativoData([]);
    }
  }, [screenState.administrativo]);

  const isUpdatingRef = useRef({ financeiro: false, administrativo: false });

  useEffect(() => {
    ['financeiro', 'administrativo'].forEach((key) => {
      if (dropdownOpen[key] && treeRef.current && treeRef.current[key]) {
        $(treeRef.current[key]).jstree('destroy');
        $(treeRef.current[key]).jstree({
          core: {
            data: dropdownDataState[key],
            themes: {
              icons: true,
            },
          },
          checkbox: {
            keep_selected_style: false,
            three_state: false,
            cascade: '',
          },
          plugins: ['checkbox'],
        });

        $(treeRef.current[key]).off('changed.jstree');

        $(treeRef.current[key]).on('changed.jstree', function (e, data) {
          if (isUpdatingRef.current[key]) return;
          isUpdatingRef.current[key] = true;

          const selectedIds = data.selected;

          const isParentSelected = (nodeId) => {
            const node = data.instance.get_node(nodeId);
            if (!node.parent || node.parent === '#') return true;
            if (selectedIds.includes(node.parent)) return isParentSelected(node.parent);
            return false;
          };

          const filteredSelectedIds = selectedIds.filter(id => isParentSelected(id));

          const updateChecked = (nodes) => {
            return nodes.map((node) => {
              return {
                ...node,
                state: {
                  ...node.state,
                  selected: filteredSelectedIds.includes(node.id),
                },
                children: node.children ? updateChecked(node.children) : [],
              };
            });
          };

          setDropdownDataState((prev) => ({
            ...prev,
            [key]: updateChecked(prev[key]),
          }));

          isUpdatingRef.current[key] = false;
        });
      }
    });
  }, [dropdownOpen]);

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (dropdownRef.current &&
          Object.values(dropdownRef.current).every(
            (ref) => ref && !ref.contains(event.target)
          ))
      ) {
        setDropdownOpen({
          financeiro: false,
          administrativo: false,
        });
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const [tabelaDados, setTabelaDados] = useState([]);

  const tabelaColumns = [
    {
      value: 'codigo',
      name: 'Codigo',
    },
    {
      value: 'descricao',
      name: 'Descrição',
    },
  ];

  const dadosTabela = [
    {
      codigo: '001',
      descricao: 'Diretoria',
    },
    {
      codigo: '002',
      descricao: 'Representante',
    },
    {
      codigo: '003',
      descricao: 'Financeiro',
    },
    {
      codigo: '004',
      descricao: 'Cobrança',
    },
    {
      codigo: '005',
      descricao: 'Adesão',
    },
    {
      codigo: '006',
      descricao: 'Empresarial',
    },
    {
      codigo: '007',
      descricao: 'Representante Empresarial',
    },
    {
      codigo: '008',
      descricao: 'Supervisor',
    },
    {
      codigo: '009',
      descricao: 'Gerente',
    },
    {
      codigo: '010',
      descricao: 'Vendas',
    },
    {
      codigo: '011',
      descricao: 'RH',
    },
    {
      codigo: '012',
      descricao: 'DP',
    },
  ];

  useEffect(() => {
    if (screenState.financeiro) {
      setTabelaDados(financeiroData);
    } else if (screenState.administrativo) {
      setTabelaDados(administrativoData);
    } else if (screenState.buscaRapida || screenState.tabela) {
      setTabelaDados(dadosTabela);
    } else {
      setTabelaDados([]);
    }
  }, [screenState.financeiro, screenState.administrativo, screenState.buscaRapida, screenState.tabela, financeiroData, administrativoData]);

  return (
    <main>
      <h2 className={styles.titulo}>Permissão</h2>

      <div>
        <label className={`${styles.check} ${screenState.buscaRapida ? styles.checked : ''}`} htmlFor="buscaRapidaCheckbox">
          <input
            id="buscaRapidaCheckbox"
            type="checkbox"
            checked={screenState.buscaRapida}
            onChange={(e) => {
              const newValue = e.target.checked;
              setScreenState((prev) => ({
                ...prev,
                buscaRapida: newValue,
                showTabela: newValue,
              }));
            }}
          />
          <h3>Busca Rápida</h3>
        </label>

        <label className={`${styles.check} ${screenState.tabela ? styles.checked : ''}`} htmlFor="tabelaCheckbox">
          <input
            id="tabelaCheckbox"
            type="checkbox"
            checked={screenState.tabela}
            onChange={(e) => {
              const newValue = e.target.checked;
              setScreenState((prev) => ({
                ...prev,
                tabela: newValue,
                showTabela: newValue,
              }));
            }}
          />
          <h3>BI</h3>
        </label>

        <div className={styles.checkText} ref={dropdownRef.financeiro}>
          <i
            className={`fa-solid ${dropdownOpen.financeiro ? 'fa-minus' : 'fa-plus'}`}
            onClick={() => {
              toggleDropdown('financeiro');
            }}
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="financeiroCheckbox" className={styles.checkText}>
            <input
              id="financeiroCheckbox"
              type="checkbox"
              checked={screenState.financeiro}
              onChange={(e) => {
                const newValue = e.target.checked;
                setScreenState((prev) => {
                  if (!newValue) {
                    setDropdownOpen((prev) => ({ ...prev, financeiro: false }));
                  } else {
                    setDropdownOpen((prev) => ({ ...prev, financeiro: true }));
                  }
                  return {
                    ...prev,
                    financeiro: newValue,
                  };
                });
              }}
            />
            <h3>Financeiro</h3>
          </label>
          {dropdownOpen.financeiro && screenState.financeiro && (
            <div className={styles.jstreeContainer} ref={(el) => (treeRef.current.financeiro = el)} />
          )}
        </div>

        <div className={styles.checkText} ref={dropdownRef.administrativo}>
          <i
            className={`fa-solid ${dropdownOpen.administrativo ? 'fa-minus' : 'fa-plus'}`}
            onClick={() => {
              toggleDropdown('administrativo');
            }}
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor="administrativoCheckbox" className={styles.checkText}>
            <input
              id="administrativoCheckbox"
              type="checkbox"
              checked={screenState.administrativo}
              onChange={(e) => {
                const newValue = e.target.checked;
                setScreenState((prev) => {
                  if (!newValue) {
                    setDropdownOpen((prev) => ({ ...prev, administrativo: false }));
                  } else {
                    setDropdownOpen((prev) => ({ ...prev, administrativo: true }));
                  }
                  return {
                    ...prev,
                    administrativo: newValue,
                  };
                });
              }}
            />
            <h3>Administrativo</h3>
          </label>
          {dropdownOpen.administrativo && screenState.administrativo && (
            <div className={styles.jstreeContainer} ref={(el) => (treeRef.current.administrativo = el)} />
          )}
        </div>
      </div>

      <section className={styles.tabelaInfo}>
        <TabelaPadrão
          tabelaId="tabelaPadrao"
          columns={screenState.financeiro ? [
            { value: 'id', name: 'ID' },
            { value: 'name', name: 'Nome' },
            { value: 'value', name: 'Valor' },
          ] : screenState.administrativo ? [
            { value: 'id', name: 'ID' },
            { value: 'name', name: 'Nome' },
            { value: 'value', name: 'Valor' },
          ] : tabelaColumns}
          data={tabelaDados}
        />
      </section>

      <section className={styles.divBotaoVoltar}>
        {screenState.voltar && <NavigateToPermissao setScreenState={setScreenState} />}

        <button
          className={`${styles.botao4} ${screenState.tabela ? styles.checked : ''}`}
          onClick={() => setScreenState((prev) => ({ ...prev, novo: false, gravar: false, deletar: false, voltar: true }))}
        >
          <i className="fa-solid fa-circle-arrow-left"></i>voltar
        </button>
      </section>
    </main>
  );
}

function NavigateToPermissao({ setScreenState }) {
  const navigate = useNavigate();

  useEffect(() => {
     navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Permissao}`);
    setScreenState((prev) => ({ ...prev, voltar: false }));
  }, [navigate, setScreenState]);

  return null;
}

export default PermissaoInformacoes;
