import React from 'react'
import { StepperPadrao, UseInputMask } from '../../../../../../../components';
import styles from "./styles.module.css";
import { useState, useEffect } from 'react';
import { UseInputPadrao } from '../../../../../../../components';

import { useNavigate } from 'react-router';
import { jsonRoute } from '../../../../../../../utils/json';
import TogglePadrao from '../../../../../../../components/TogglePadrao';

function NovoPlanoSaude() {
    //variaveis
    const navigate = useNavigate();
    const [screenState, setScreenState] = useState({
        voltar: false,
      });
    const [coparticipacao, setCoparticipacao] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [status, setStatus, statusRef] = UseInputMask();
    const [tipoServico, setTipoServico, tipoServicoRef] = UseInputMask();
    const [descricao, setDescricao, descricaoRef] = UseInputMask();
    const [genero, setGenero, generoRef] = UseInputMask();
    const [fornecedor, setFornecedor, fornecedorRef] = UseInputMask();
    const [codFornecedor, setCodFornecedor, codFornecedorRef] = UseInputMask();
    const [texPesquisa, setTexPesquisa, texPesquisaRef] = UseInputMask();
    const [venda, setVenda, vendaRef] = UseInputMask();
    const [custo, setCusto, custoRef] = UseInputMask();
    const [carencia, setCarencia, carenciaRef] = UseInputMask();
    const [carenciaPromo, setCarenciaPromo, carenciaPromoRef] = UseInputMask();
    const [carenciaOpera, setCarenciaOpera, carenciaOperaRef] = UseInputMask();
    const [descricaoC, setDescricaoC, descricaoCRef] = UseInputMask();
    const [selecionado , setSelecionado] = useState([]);
    const [valorC, setValorC, valorCRef] = UseInputMask();
    const [modoC, setModoC, modoCRef] = UseInputMask();

    //funções
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    


    const handleNavigate = (route) => {
        navigate(route);
    };

    const handleBackClick = () => {
        setScreenState({ voltar: true });
    };
    
    if (screenState.voltar) {
        handleNavigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Operacional}/manutencao/${jsonRoute.PlanoSaude}`);
    }
    
    function handleCoparticipacaoToggle(checked){
        setCoparticipacao(!checked);
    }


    //listas
    const opStatus = [
        {label: "ATIVO", value: "ativo"},
        {label: "CANCELADO", value: "cancelado"},
        {label: "EM ANÁLISE PELA OPERADORA", value: "em analise pela operadora"},
        {label: "IBBCA SUSPENSO", value: "ibbca suspenso"},
        {label: "INADIMPLENTE IBBCA", value: "inadimplente ibbca"},
        {label: "INATIVO", value: "inativo"},
        {label: "INATIVO POR INADIMPLÊNCIA",value: "inativo por inadimplencia"},
        {label: "RESCISÃO CONTRATUAL", value: "rescisao contratual"},
        {label: "SUSPENSO", value: "suspenso"}
    ];
    const opTipoServico = [
        {label: "Vida", value:"vida"},
        {label: "Residencial", value:"residencial"},
    ];
    
    const opGenero = [
      {label: "Saúde", value: "saude"},
      {label: "Clube de Desconto", value: "clubeDesconto"},
      {label: "Desconto Medicamento", value: "descMedicamento"},
      {label: "Funeral", value: "funeral"},
      {label: "Residencial", value: "residencial"},
      {label: "Assistência", value: "assistencia"},
      {label: "Odonto", value: "odonto"},
      {label: "Informática", value: "informatica"},
      {label: "Pet", value: "pet"},
      {label: "Familia", value: "familia"},
      {label: "A P", value: "ap"},
      {label: "Max", value: "max"},
      {label: "Hospitalar", value: "hospitalar"},
      {label: "Tonner", value: "tonner"},
    ];

    const opFornecedor = [
      { label: "Hermanos Fornecedor - CPF/CNPJ: 58.135.500/0001-10 - ATIVO", value: "hermanosFornecedor" },
      { label: "Alfa Distribuidora Ltda - CPF/CNPJ: 12.345.678/0001-99 - ATIVO", value: "alfaDistribuidora" },
      { label: "Beta Comercial S.A - CPF/CNPJ: 98.765.432/0001-55 - INATIVO", value: "betaComercial" },
      { label: "Gamma Suprimentos ME - CPF/CNPJ: 45.678.123/0001-22 - ATIVO", value: "gammaSuprimentos" },
      { label: "Delta Importações - CPF/CNPJ: 11.222.333/0001-44 - ATIVO", value: "deltaImportacoes" },
      { label: "Omega Atacadista EIRELI - CPF/CNPJ: 66.777.888/0001-00 - INATIVO", value: "omegaAtacadista" },
      { label: "Nova Era Fornecimentos - CPF/CNPJ: 22.333.444/0001-11 - ATIVO", value: "novaEraFornecimentos" },
      { label: "Prime Soluções Comerciais - CPF/CNPJ: 33.444.555/0001-22 - ATIVO", value: "primeSolucoes" },
      { label: "Max Forte Distribuição - CPF/CNPJ: 44.555.666/0001-33 - ATIVO", value: "maxForteDistribuicao" },
      { label: "Solaris Fornecedores Associados - CPF/CNPJ: 77.888.999/0001-66 - INATIVO", value: "solarisFornecedores" }
    ];

    const opModoC = [
        {label:"Dinheiro", value:"dinheiro"},
        {label:"Percentual", value:"percentual"},
    ]


  return (
    <>
        <div className={styles.beneficiariosContainer}>
            <div>
                <h2 className={styles.TitleRepresentante}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    Novo Plano de Saúde
                </h2>
            </div>
            <div className={styles.beneficiariosContent}>
                <section className={styles.filtroTabelaField}>
                    <div className={styles.filtroTabelaContent}>
                    <div className={styles.divConteudo}>
                    <UseInputPadrao 
                        label="Status"
                        type="select"
                        identifier="status"
                        value={status}
                        onChange={setStatus}
                        inputRef={statusRef}
                        options={opStatus}
                        width={isMobile ? 100 : 50}
                        gap={isMobile ? 0 : 0.5} 
                    />

                    <UseInputPadrao 
                        label="Tipo Serviço"
                        identifier="tiposervico"
                        type="select"
                        value={tipoServico}
                        onChange={setTipoServico}
                        inputRef={tipoServicoRef}
                        options={opTipoServico}
                        width={isMobile ? 100 : 50}
                        gap={isMobile ? 0 : 0.5}      
                    />
                    </div>

                    <div className={styles.divConteudo}>
                    <UseInputPadrao 
                        label="Descrição"
                        identifier="descricao"
                        value={descricao}
                        onChange={setDescricao}
                        inputRef={descricaoRef}
                        width={isMobile ? 100 : 50}
                        gap={isMobile ? 0 : 0.5}
                    />
                    </div>
                    <div className={styles.divConteudo}>
                    <UseInputPadrao 
                        label="Gênero"
                        type="select"
                        identifier="genero"
                        value={genero}
                        onChange={setGenero}
                        inputRef={generoRef}
                        options={opGenero}
                        width={isMobile ? 100 : 50}
                        gap={isMobile ? 0 : 0.5} 
                    />


                    <TogglePadrao 
                        label="Utiliza Coparticipação?"
                        checked={coparticipacao}
                        onChange={() => handleCoparticipacaoToggle(coparticipacao)}
                        option1="Não"
                        option2="Sim"
                    />

                    </div>

                    <div className={styles.divConteudo}>
                    <UseInputPadrao 
                        label="Fornecedor"
                        type="select"
                        identifier="fornecedor"
                        value={fornecedor}
                        onChange={setFornecedor}
                        inputRef={fornecedorRef}
                        options={opFornecedor}
                        width={isMobile ? 100 : 33}
                        gap={isMobile ? 0 : 0.5} 
                    />

                    <UseInputPadrao 
                        label="Código no Fornecedor"
                        identifier="codFornecedor"
                        value={codFornecedor}
                        onChange={setCodFornecedor}
                        inputRef={codFornecedorRef}
                        width={isMobile ? 100 : 33}
                        gap={isMobile ? 0 : 0.5}
                    />

                    <UseInputPadrao 
                        label="Texto para Pesquisa Produtos"
                        identifier="texPesquisa"
                        value={texPesquisa}
                        onChange={setTexPesquisa}
                        inputRef={texPesquisaRef}
                        width={isMobile ? 100 : 33}
                        gap={isMobile ? 0 : 0.5}
                    />
                    </div>
                    <div className={styles.divConteudo}>
                    <UseInputPadrao 
                        label="Custo"
                        type="number"
                        identifier="custo"
                        value={custo}
                        onChange={setCusto}
                        inputRef={custoRef}
                        width={isMobile ? 100 : 25}
                        gap={isMobile ? 0 : 0.5}
                    />

                    <UseInputPadrao 
                        label="Venda"
                        type="number"
                        identifier="venda"
                        value={venda}
                        onChange={setVenda}
                        inputRef={vendaRef}
                        width={isMobile ? 100 : 25}
                        gap={isMobile ? 0 : 0.5}
                    />

                    {coparticipacao && (
                        <>
                        <UseInputPadrao 
                            label="Valor Coparticipação"
                            type="number"
                            identifier="ValorCopar"
                            value={valorC}
                            onChange={setValorC}
                            inputRef={valorCRef}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        <UseInputPadrao 
                            label="Modo - Coparticipação"
                            type="select"
                            identifier="modoCopar"
                            value={modoC}
                            onChange={setModoC}
                            inputRef={modoCRef}
                            options={opModoC}
                            width={isMobile ? 100 : 25}
                            gap={isMobile ? 0 : 0.5}
                        />
                        </>
                    )}
                    </div>
                    <div className={styles.divConteudo}>
                    <UseInputPadrao 
                        label="Carência"
                        identifier="carencia"
                        value={carencia}
                        onChange={setCarencia}
                        inputRef={carenciaRef}
                        width={isMobile ? 100 : 33}
                        gap={isMobile ? 0 : 0.5}
                    />

                    <UseInputPadrao 
                        label="Carência Promocional"
                        identifier="carenciaP"
                        value={carenciaPromo}
                        onChange={setCarenciaPromo}
                        inputRef={carenciaPromoRef}
                        width={isMobile ? 100 : 33}
                        gap={isMobile ? 0 : 0.5}

                    />

                    <UseInputPadrao 
                        label="Carência Advindo de outra operadora"
                        identifier="carenciaO"
                        value={carenciaOpera}
                        onChange={setCarenciaOpera}
                        inputRef={carenciaOperaRef}
                        width={isMobile ? 100 : 33}
                        gap={isMobile ? 0 : 0.5}
                    />
                    </div>
                    <div className={styles.divConteudo}>
                        <UseInputPadrao 
                            label="Descrição - Cobertura"
                            type="textarea"
                            identifier="descriacaoCo"
                            value={descricaoC}
                            onChange={setDescricaoC}
                            inputRef={descricaoCRef}
                            width={isMobile ? 100 : 100}
                            gap={isMobile ? 0 : 0.5}
                        />

                    </div>
                    </div>
                </section>  
            </div>

            <div className={styles.divBotao} style={{ position: 'relative' }}>
                <div className={styles.divBotaoGroup}>
                <button className={styles.BotaoGravar} onClick={() => {
                    dialogMessage(
                    "Tem certeza que deseja gravar este registro?",
                    "info",
                    { buttonsText: { confirm: "Sim", cancel: "Não" } },
                    (result) => { if (result === true) { handleConfirmGravar(); } }
                    );
                }}><i className="fa-solid fa-save" />Gravar</button>
                <button className={styles.BotaoRemover} onClick={() => {
                    dialogMessage(
                    "Tem certeza que deseja remover este registro?",
                    "info",
                    { buttonsText: { confirm: "Sim", cancel: "Não" } },
                    (result) => { if (result === true) { handleConfirmDeletar(); } }
                    );
                }}><i className="fa-solid fa-trash" />Remover</button>
                <button className={styles.BotaoVoltar} onClick={handleBackClick}><i className="fa-solid fa-arrow-left" />Voltar</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default NovoPlanoSaude;