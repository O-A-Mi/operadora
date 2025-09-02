import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { limparFiltros } from "../../../../../utils/functions";
import { UseInputMask } from "../../../../../components";
import { UseInputPadrao } from "../../../../../components";
import { TabelaPadrao } from "../../../../../components";
import styles from "./styles.module.css";
import GrupoBotoes from "../../../../../components/GrupoBotoes";
import dialogMessage from "../../../../../assets/dialog-ui/dialog";

const ConsultaClienteRepresentante = () => {
	//variaveis
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
	const [cadastroInicial, setCadastroInicial, cadastroInicialRef] = UseInputMask();
	const [cadastroFinal, setCadastroFinal, cadastroFinalRef] = UseInputMask();
	const [pesquisar, setPesquisar, pesquisarRef] = UseInputMask();
	const [texto, setTexto, textoRef] = UseInputMask();

	//Funções
	const showDialog = (type, item) => {
		switch (type) {
			case "remover":
				dialogMessage("Deseja remover esta venda?", 'warning')
				break;

			case "notificar":
				dialogMessage("Deseja notificar o contratante e titular?", 'info')
				break;
		}
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const limparFiltro = () => {
		limparFiltros([
			{ setter: setCadastroInicial, cadastroInicialRef },
			{ setter: setCadastroFinal, cadastroFinalRef },
			{ setter: setPesquisar, pesquisarRef },
			{ setter: setTexto, textoRef }
		]);
	};

	const filtrarBeneficiarios = () => {
    try {
      showLoader();
      const filtro = {
          beneficiario: beneficiario || "",
          formaPagamento: formaPagamento || "",
          dataInicio: dataInicio || "",
          dataFinal: dataFinal || "",
      };
      const inicioDate = parseBrazilianDateTime(filtro.dataInicio);
      const finalDate = parseBrazilianDateTime(filtro.dataFinal);

      const dadosFiltrados = dadosTabela.filter((row) => {
        const nome = row.beneficiario.toLowerCase();
        const cpf = row.cpf_beneficiario;
        const formaDePagamento = row.descr_forma_pagto;
        const solicitacaoDate = parseBrazilianDateTime(row.dtsolicitacao);

        const dataDentroDoIntervalo =
          (!inicioDate || solicitacaoDate >= inicioDate) &&
          (!finalDate || solicitacaoDate <= finalDate);

        return (
          (filtro.beneficiario === "" || (nome.includes(filtro.beneficiario.toLowerCase()) || cpf.includes(filtro.beneficiario))) &&
          (filtro.formaPagamento.length === 0 || filtro.formaPagamento.includes(formaDePagamento)) &&
          dataDentroDoIntervalo
        );
      });

      setDadosFiltrados(dadosFiltrados);
    } catch (error) {
      hideLoader();
      console.error("Erro ao filtrar beneficiários:", error);
      dialogMessage("Ocorreu um erro inesperado ao tentar filtrar dados. Tente novamente.", "error", { confirmButton: false });
    } finally {
      hideLoader();
    }
};



	//Listas
	const opPesquisar = [
		{ label: "Associado", value: "associado" },
		{ label: "CPF/CNPJ", value: "cpfCnpj" },
		{ label: "Representante", value: "representante" }
	];

	const opConsulta = [
		{ label: "Notificadas", value: "notificadas" },
		{ label: "Enviadas", value: "enviadas" },
	]

	const tableCollumns = [
		{ value: "acao", name: "Ação", align: "center", sortable: false },
		{ value: "referencia", name: "Referência", align: "center", sortable: true },
		{ value: "vidas", name: "Vidas", align: "center", sortable: true },
		{
			name: "Datas",
			value: "datas",
			subColumns: [
				{ value: "cadastro", name: "Cadastro" },
				{ value: "transmissao", name: "Transmissão" },
			]

		},
		{
			name: "Plano",
			value: "plano",
			subColumns: [
				{ value: "tipo", name: "Tipo" },
				{ value: "contratado", name: "Contratado" }
			]
		},
		{
			name: "Contratante",
			value: "contratante",
			subColumns: [
				{ value: "nome", name: "Nome" },
				{ value: "cpfCnpj", name: "CPF/CNPJ" },
				{ value: "email", name: "E-mail" }
			]
		},
		{

			name: "Representante",
			value: "representante",
			subColumns: [
				{ value: "corretora", name: "Corretora" },
				{ value: "supervisor", name: "Supervisor" },
				{ value: "consultor", name: "Consultor" }
			]
		}
	];

	const tableData = [
		{
			acao: <GrupoBotoes
				actions={[
					{ title: "Remover", icon: "fa-solid fa-times-circle", onClick: () => showDialog("remover"), color: "red", fontSize: "" },
					{ title: "Em preenchimento", icon: "fa-solid fa-tasks", color: "black", cursor: "default" },
				]}
			/>,
			referencia: "0017999",
			vidas: "2",
			cadastro: "15/08/2025",
			transmissao: "15/08/2025",
			tipo: "-",
			contratado: "HERMANOS EMP",
			nome: "TESTE",
			cpfCnpj: "99.999.999/9999-99",
			email: "teste@teste.com",
			corretora: "teste",
			supervisor: "teste",
			consultor: "teste"
		},
		{
			acao: <GrupoBotoes
				actions={[
					{ title: "Remover", icon: "fa-solid fa-times-circle", onClick: () => showDialog("remover"), color: "red" },
					{ title: "Em preenchimento", icon: "fa-solid fa-tasks", color: "black", cursor: "default" },
				]}
			/>,
			referencia: "0017999",
			vidas: "2",
			cadastro: "15/08/2025",
			transmissao: "15/08/2025",
			tipo: "-",
			contratado: "HERMANOS EMP",
			nome: "TESTE",
			cpfCnpj: "88.999.999/9999-99",
			email: "teste@teste.com",
			corretora: "teste",
			supervisor: "teste",
			consultor: "teste"
		},
		{
			acao: <GrupoBotoes
				actions={[
					{ title: "Remover", icon: "fa-solid fa-times-circle", onClick: () => showDialog("remover"), color: "red" },
					{ title: "Em preenchimento", icon: "fa-solid fa-tasks", color: "black", cursor: "default" },
				]}
			/>,
			referencia: "0017999",
			vidas: "2",
			cadastro: "15/08/2025",
			transmissao: "15/08/2025",
			tipo: "-",
			contratado: "HERMANOS EMP",
			nome: "TESTE",
			cpfCnpj: "99.999.999/9999-99",
			email: "teste@teste.com",
			corretora: "teste",
			supervisor: "teste",
			consultor: "teste"
		},
		{
			acao: <GrupoBotoes
				actions={[
					{ title: "Enviar Notificação para Contratante e Titular", icon: "fa-solid fa-paper-plane", onClick: () => showDialog("notificar"), color: "#00A8FF", fontSize: "" },
					{ title: "Aguardando Assinatura do Cliente", icon: "fa-solid fa-tasks", color: "orange", cursor: "default" },
				]}
			/>,
			referencia: "0017999",
			vidas: "2",
			cadastro: "15/08/2025",
			transmissao: "15/08/2025",
			tipo: "-",
			contratado: "HERMANOS EMP",
			nome: "TESTE",
			cpfCnpj: "99.999.999/9999-99",
			email: "teste@teste.com",
			corretora: "teste",
			supervisor: "teste",
			consultor: "teste"
		},
		{
			acao: <GrupoBotoes
				actions={[
					{ title: "Enviar Notificação para Contratante e Titular", icon: "fa-solid fa-paper-plane", onClick: () => showDialog("notificar"), color: "#00A8FF" },
					{ title: "Validado", icon: "fa-solid fa-tasks", color: "green", cursor: "default" },
				]}
			/>,
			referencia: "0017999",
			vidas: "2",
			cadastro: "15/08/2025",
			transmissao: "15/08/2025",
			tipo: "-",
			contratado: "HERMANOS EMP",
			nome: "TESTE",
			cpfCnpj: "99.999.999/9999-99",
			email: "teste@teste.com",
			corretora: "teste",
			supervisor: "teste",
			consultor: "teste"
		},

	]
	return (
		<>
			<main>
				<h2 className={styles.TitleRepresentante}>
					<i className="fa-solid fa-address-card"></i>
					Consulta
				</h2>
				<div className={styles.beneficiariosContent}>
					<section className={styles.filtroTabelaField}>
						<div className={styles.filtroTabelaContent}>
							<div className={styles.filtroTabelaHeader}>
								<h5 className={styles.filtroTabelaTitle}>
									<i className="fa-solid fa-filter"></i>
									Buscar por
								</h5>
								<button className={styles.filtroTabelaButton} onClick={limparFiltro}>
									<i className="fa-solid fa-filter-slash"></i> Limpar filtro
								</button>
							</div>
							<div className={styles.divConteudo}>
								<UseInputPadrao
									label="Cadastro - Inicial"
									identifier="cadastroInicial"
									value={cadastroInicial}
									onChange={setCadastroInicial}
									inputRef={cadastroInicialRef}
									type="date"
									width={isMobile ? 100 : 25}
									gap={isMobile ? 0 : 0.5}
								/>
								<UseInputPadrao
									label="Cadastro - Final"
									identifier="cadastroFinal"
									value={cadastroFinal}
									onChange={setCadastroFinal}
									inputRef={cadastroFinalRef}
									type="date"
									width={isMobile ? 100 : 25}
									gap={isMobile ? 0 : 0.5}
								/>
							</div>
							<div className={styles.divConteudo}>
								<UseInputPadrao
									label="Pesquisar"
									identifier="pesquisar"
									value={pesquisar}
									onChange={setPesquisar}
									inputRef={pesquisarRef}
									type="select"
									options={opPesquisar}
									width={isMobile ? 100 : 25}
									gap={isMobile ? 0 : 0.5}
								/>
								<UseInputPadrao
									label="Texto"
									identifier="texto"
									value={texto}
									onChange={setTexto}
									inputRef={textoRef}
									width={isMobile ? 100 : 75}
									gap={isMobile ? 0 : 0.5}
								/>
							</div>
							<div className={styles.tabela} id="tabelaPadrao-container">
								<TabelaPadrao
									id="statusAssociado"
									columns={tableCollumns}
									data={tableData}
									options={{
										cardsPerPage: 10,
										showPagination: true,
										showExport: true,
										fileName: "Associados",
										showHeader: true,
										showFooter: true,
										toolbar: true,
										toolbarPosition: "right",
										showPaginationSwitch: true,
										showSearch: true,
										showRefresh: true,
										showToggleView: true,
										showColumnsSelector: true,
										showFilter: true,
										showGuardaCampos: true,
										paginationEnabled: true,
									}}
								/>
							</div>
						</div>
					</section>
				</div>
			</main>
		</>
	);
}

export default ConsultaClienteRepresentante;