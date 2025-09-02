import React, { useEffect, useState, useRef } from 'react';
import { UseInputPadrao, UseInputMask } from "../../../../../../components/InputPadrao";
import styles from "../../styles.module.css";
import shared from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router';
import { PerguntaMock } from "../../../../../../utils/mockConf";
import TabelaPadrao from '../../../../../../components/TabelaPadrao';
import TogglePadrao from "../../../../../../components/TogglePadrao";

const PerguntaNovo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state?.id;

    const [listaRespostas, setListaRespostas] = useState([]);
    const [status, setStatus] = useState('');
    const [declaracao, setDeclaracao] = useState('');
    const [quemVisualiza, setQuemVisualiza] = useState('');
    const [tipoPergunta, setTipoPergunta] = useState('');
    const [titulo, handleChangeTitulo, tituloRef] = UseInputMask(null, 'text', '');
    const [pergunta, handleChangePergunta, perguntaRef] = UseInputMask(null, 'textarea', '');
    const [ordemAparecimento, handleChangeOrdem, ordemAparecimentoRef] = UseInputMask(null, 'number', '0');
    const [novaRespostaStatus, setNovaRespostaStatus] = useState('');
    const [novaRespostaTipoVisualizacao, setNovaRespostaTipoVisualizacao] = useState('');
    const [novaRespostaTexto, handleChangeNovaRespostaTexto, novaRespostaTextoRef] = UseInputMask(null, 'textarea', '');
    
    // Use useState para os contadores
    const [ordemVisualizacao, setOrdemVisualizacao] = useState(0);
    const [novaRespostaOrdem, setNovaRespostaOrdem] = useState(0);

    const [precisaDetalhar, setPrecisaDetalhar] = useState(false);
    const [listaSelecionada, setListaSelecionada] = useState('');

    const listaOptions = [
        {value:"Odonto", label: "Odonto 3993"},
        {value:"MediCorp", label: "MediCorp 1989"},
        {value:"UniCp", label: "UniCp 1919"},
        {value:"Policlin", label: "Policlin 2223"},
    ];

    const [limitarCombos, setLimitarCombos] = useState(['TODOS']);

    const statusOptions = [
        { value: 'ATIVO', label: 'Ativo' },
        { value: 'INATIVO', label: 'Inativo' },
    ];
    const declaracaoOptions = [
        { value: 'DECLARACAO DE SAUDE', label: 'Declaração de Saúde' },
    ];
    const quemVisualizaOptions = [
        { value: 'TODOS', label: 'Todos' },
        { value: 'ASSOCIADO', label: 'Associado' },
        { value: 'PROPOSTA', label: 'Proposta' },
        { value: 'SEGURADO ', label: 'Segurado' },
        { value: 'DEPENDENTE ', label: 'Dependente' },
    ];
    const tipoPerguntaOptions = [
        { value: 'TEXTO', label: 'Texto' },
        { value: 'LISTA', label: 'Lista' },
        { value: 'MULTIPLOS', label: 'Múltiplos' },
        { value: 'SELECAO_UNICA', label: 'Seleção Única' },
    ];

    // Função genérica para incremento e decremento
    const handleIncrementDecrement = (setter, value, min = 0) => {
        setter(prevValue => Math.max(min, prevValue + value));
    };

    const colunasRespostas = [
        { name: 'Status', value: 'status' },
        { name: 'Precisa Detalhar', value: 'precisaDetalhar', },
        { name: 'Visualização', value: 'tipoVisualizacao' },
        { name: 'Ordem', value: 'ordemAparecimento' },
        { name: 'Texto', value: 'textoResposta' },
    ];

    useEffect(() => {
        if (id) {
            const dadosCarregados = PerguntaMock.PerguntasDaDeclaracao.tabela.find(item => item.id == id);
            if (dadosCarregados) {
                handleChangeTitulo({ target: { value: dadosCarregados.titulo || '' } });
                handleChangePergunta({ target: { value: dadosCarregados.pergunta || '' } });
                handleChangeOrdem({ target: { value: dadosCarregados.ordemAparecimento?.toString() || '0' } });
                setStatus(dadosCarregados.status || '');
                setDeclaracao(dadosCarregados.declaracao || '');
                setQuemVisualiza(dadosCarregados.quemVisualiza || '');
                setTipoPergunta(dadosCarregados.tipoPergunta || '');
                setLimitarCombos(dadosCarregados.limitarCombos || ['TODOS']);
            } else {
                console.error(`Item com ID ${id} não encontrado no mock.`);
            }
        }
    }, [id]);

    const handleSalvar = (e) => {
        e.preventDefault();

        const dadosFormulario = {
            id: id || Date.now(),
            titulo: tituloRef.current?.value || '',
            status: status,
            declaracao: declaracao,
            quemVisualiza: quemVisualiza,
            ordemAparecimento: parseInt(ordemAparecimentoRef.current?.value || '0', 10),
            tipoPergunta: tipoPergunta,
            pergunta: perguntaRef.current?.value || '',
            limitarCombos: limitarCombos,
            listaRespostas: listaRespostas,
        };
    
        navigate('..', { state: { newQuestion: dadosFormulario } });
    };

    const handleLimparCombo = (indexToRemove) => {
        const novosCombos = limitarCombos.filter((_, index) => index !== indexToRemove);
        setLimitarCombos(novosCombos);
    };

    const handleAdicionarResposta = (e) => {
        e.preventDefault();
        const novaResposta = {
            id: listaRespostas.length + 1,
            status: novaRespostaStatus,
            precisaDetalhar: precisaDetalhar ? 'Sim' : 'Não',
            tipoVisualizacao: novaRespostaTipoVisualizacao,
            ordemAparecimento: novaRespostaOrdem, // Use o estado do contador
            textoResposta: novaRespostaTexto,
        };

        console.log(novaResposta)

        setListaRespostas([...listaRespostas, novaResposta]);
        // Resetar os estados após adicionar
        setNovaRespostaStatus('');
        setNovaRespostaTipoVisualizacao('');
        setNovaRespostaOrdem(0);
        setPrecisaDetalhar(false);
        handleChangeNovaRespostaTexto({ target: { value: '' } });
    };

    const handleLimparTabela = () => {
        setListaRespostas([]); 
    };
    
    const handleCancelar = () => {
        navigate(-1);
    };
    
    const showRespostasForm = tipoPergunta === 'MULTIPLOS' || tipoPergunta === 'SELECAO_UNICA';

    return (
        <div className={styles.MainContent}>
            <div className={shared.container}>
                <div className={shared.HeaderCamp}>
                    <h1 className={shared.Header}>
                        <i className="fa-solid fa-question-circle"></i>
                        {id ? 'Editar Pergunta' : 'Nova Pergunta'}
                    </h1>
                    <p className={styles.subHeader}>
                        <i className="fa-solid fa-info-circle"></i>
                        {id ? 'Altere os dados da pergunta conforme necessário.' : 'Preencha os dados para criar uma nova pergunta.'}
                    </p>
                </div>
                <form onSubmit={handleSalvar} id="perguntaForm">
                    <div className={shared.fullWidth}>
                        <UseInputPadrao
                            label="Título"
                            identifier="titulo"
                            type="text"
                            name="titulo"
                            value={titulo}
                            onChange={handleChangeTitulo}
                            inputRef={tituloRef}
                        />
                    </div>
                    <div className={shared.gridContainer}>
                        <UseInputPadrao
                            label="Status *"
                            identifier="status"
                            type="select"
                            name="status"
                            options={statusOptions}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <UseInputPadrao
                            label="Declaração pertencente *"
                            identifier="declaracao"
                            type="select"
                            name="declaracao"
                            options={declaracaoOptions}
                            value={declaracao}
                            onChange={(e) => setDeclaracao(e.target.value)}
                        />
                        <UseInputPadrao
                            label="Tipo Visualização"
                            identifier="quemVisualiza"
                            type="select"
                            name="quemVisualiza"
                            options={quemVisualizaOptions}
                            value={quemVisualiza}
                            onChange={(e) => setQuemVisualiza(e.target.value)}
                        />
                        <div className={shared.ordemVisualizacao}>
                            <UseInputPadrao
                                label="Ordem Visualização"
                                identifier="ordemVisualizacao"
                                value={ordemVisualizacao}
                                onChange={(e) => setOrdemVisualizacao(parseInt(e.target.value, 10) || 0)}
                                inputButtonRight={[
                                    {
                                        icon: "fas fa-plus",
                                        onClick: (e) => { e.preventDefault(); handleIncrementDecrement(setOrdemVisualizacao, 1); },
                                        tooltip: 'Adicionar'
                                    }
                                ]}
                                inputButtonLeft={[
                                    {
                                        icon: "fas fa-minus",
                                        onClick: (e) => { e.preventDefault(); handleIncrementDecrement(setOrdemVisualizacao, -1); },
                                        tooltip: 'Remover'
                                    }
                                ]}
                            />
                        </div>
                        <UseInputPadrao
                            label="Tipo de Pergunta *"
                            identifier="tipoPergunta"
                            type="select"
                            name="tipoPergunta"
                            options={tipoPerguntaOptions}
                            value={tipoPergunta}
                            onChange={(e) => setTipoPergunta(e.target.value)}
                        />
                        {tipoPergunta === 'LISTA' && (
                            <UseInputPadrao
                                label="Listas"
                                identifier="listaSelecionada"
                                type="select"
                                name="listaSelecionada"
                                options={listaOptions}
                                value={listaSelecionada}
                                onChange={(e) => setListaSelecionada(e.target.value)}
                            />
                        )}
                    </div>
                    <div className={shared.limitarCombosContainer}>
                        <label className={shared.Combo}>Limitar Combos</label>
                        <div className={shared.combos}>
                            {limitarCombos.map((combo, index) => (
                                <div key={index} className={shared.comboTag}>
                                    {combo}
                                    <button type="button" onClick={() => handleLimparCombo(index)}>
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={shared.fullWidth}>
                        <UseInputPadrao
                            label="Texto *"
                            identifier="pergunta"
                            type="textarea"
                            name="pergunta"
                            placeholder="Digite o texto da pergunta..."
                            value={pergunta}
                            onChange={handleChangePergunta}
                            inputRef={perguntaRef}
                        />
                    </div>
                </form>
            </div>
            {showRespostasForm && (
                <div className={shared.container}>
                    <div className={styles.HeaderCamp}>
                        <h2 className={styles.Header}>
                            <i className="fa-solid fa-check-circle"></i>
                            Respostas da Pergunta
                        </h2>
                    </div>
                    <form onSubmit={handleAdicionarResposta}>
                        <div className={shared.ToggleResp}>
                            <TogglePadrao
                                label="Precisa de Detalhamento?"
                                checked={precisaDetalhar}
                                onChange={setPrecisaDetalhar}
                                option1="Sim"
                                option2="Não"
                                size="small"
                            />
                        </div>
                        <div className={shared.gridContainer}>
                            <UseInputPadrao
                                label="Status *"
                                identifier="statusResposta"
                                type="select"
                                name="status"
                                options={statusOptions}
                                value={novaRespostaStatus}
                                onChange={(e) => setNovaRespostaStatus(e.target.value)}
                            />
                            <UseInputPadrao
                                label="Tipo Visualização"
                                identifier="tipoVisualizacao"
                                type="select"
                                name="tipoVisualizacao"
                                options={quemVisualizaOptions}
                                value={novaRespostaTipoVisualizacao}
                                onChange={(e) => setNovaRespostaTipoVisualizacao(e.target.value)}
                            />
                            <div className={shared.ordemVisualizacao}>
                                <UseInputPadrao
                                    label="Ordem visualização"
                                    identifier="novaOrdemVisualizacao"
                                    value={novaRespostaOrdem}
                                    onChange={(e) => setNovaRespostaOrdem(parseInt(e.target.value, 10) || 0)}
                                    inputButtonRight={[
                                        {
                                            icon: "fas fa-plus",
                                            onClick: (e) => { e.preventDefault(); handleIncrementDecrement(setNovaRespostaOrdem, 1); },
                                            tooltip: 'Adicionar'
                                        }
                                    ]}
                                    inputButtonLeft={[
                                        {
                                            icon: "fas fa-minus",
                                            onClick: (e) => { e.preventDefault(); handleIncrementDecrement(setNovaRespostaOrdem, -1); },
                                            tooltip: 'Remover'
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                        <div className={shared.fullWidth}>
                            <UseInputPadrao
                                label="Texto de Resposta"
                                identifier="textoResposta"
                                type="textarea"
                                name="textoResposta"
                                placeholder="Digite o texto da resposta..."
                                value={novaRespostaTexto}
                                onChange={handleChangeNovaRespostaTexto}
                                inputRef={novaRespostaTextoRef}
                            />
                        </div>
                        <div className={shared.responseButtons}>
                            <button type="submit" className={`${styles.actionButton}`}>
                                <i className="fa-solid fa-plus"></i> Adicionar
                            </button>
                            <button
                                type="button"
                                className={`${styles.actionButton}`}
                                onClick={handleLimparTabela}
                            >
                                <i className="fa-solid fa-eraser"></i> Excluir
                            </button>
                        </div>
                        <TabelaPadrao
                            columns={colunasRespostas}
                            data={listaRespostas}
                            emptyMessage="Nenhuma resposta cadastrada."
                            options={
                                {
                                    rowSelection: true,
                                }
                            }
                        />
                    </form>
                </div>
            )}
            <div className={styles.Footer}>
                <div className={styles.actionButtons}>
                    <div className={styles.actionButtonsGroup}>
                        <button type="submit" form="perguntaForm" className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={handleSalvar}>
                            <i className="fa-solid fa-save"></i>
                            Gravar
                        </button>
                        <button type="button" className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleCancelar}>
                            <i className="fa-solid fa-arrow-left"></i>
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerguntaNovo;