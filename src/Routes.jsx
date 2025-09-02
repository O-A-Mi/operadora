import React from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import { jsonRoute } from "./utils/json.js";
import NotFound from "./pages/NotFound";

// ------------------- Area Operadora ------------------- //
import Operadora_Login from "./pages/AreaOperadora/LoginOperadora/index.jsx";
import AreaOperadora from "./pages/AreaOperadora/MinhaConta/index.jsx";
import HomeOperadora from "./pages/AreaOperadora/HomeOperadora/index.jsx";

// ------------------- Area Operadora - Operacional ------------------- //
import DashboardOperacional from "./pages/AreaOperadora/MinhaConta/Operacional/Dashboard/index.jsx";
import CadastroBeneficiarios from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroBeneficiario/index.jsx";
import CriarBeneficiario from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroBeneficiario/components/CriarBeneficiario.jsx";
import CadastroPrestador from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPrestador/index.jsx";
import InfoPrestador from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPrestador/components/InfoPrestador/index.jsx";
import CadastroCliente from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroCliente/index.jsx"
import CriarCliente from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroCliente/components/CriarCliente.jsx";
import CadastroPlanos from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPlanos/index.jsx";
import ComboNovo from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPlanos/Novo/index.jsx";
import Kanban from "./pages/AreaOperadora/MinhaConta/Operacional/Kanban/index.jsx";
import MovBeneficiario from "./pages/AreaOperadora/MinhaConta/Operacional/MovBeneficiario/index.jsx";
import MigracaoCarterinha from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Carterinha/index.jsx";
import MigracaoRepresentante from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Representante/index.jsx";
import MigracaoPlano from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Plano/index.jsx";
import MigracaoColaborador from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Colaborador/index.jsx";
import MigracaoFornecedor from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Fornecedor/index.jsx";
import MigracaoVigencia from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Vigencia/index.jsx";
import Acompanhamento from "./pages/AreaOperadora/MinhaConta/Operacional/PortalEmpresarial/Acompanhamento/index.jsx";
import Cancelamento from "./pages/AreaOperadora/MinhaConta/Operacional/PortalEmpresarial/Cancelamento/index.jsx";
import ValidacaoProposta from "./pages/AreaOperadora/MinhaConta/Operacional/PortalEmpresarial/ValidacaoProposta/index.jsx";


// ------------------- Area Operadora - Financeiro ------------------- //
import Financeiro from "./pages/AreaOperadora/MinhaConta/Financeiro/index.jsx";
import Dashboard from "./pages/AreaOperadora/MinhaConta/Financeiro/Dashboard/index.jsx";
import Lancamento from "./pages/AreaOperadora/MinhaConta/Financeiro/Lancamento/index.jsx";
import LancamentoNovo from "./pages/AreaOperadora/MinhaConta/Financeiro/Lancamento/Novo/index.jsx";
import FluxoCaixa from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/FluxoCaixa/index.jsx";
import ContasAReceber from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/ContasAReceber/index.jsx";
import ContasAPagar from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/ContasAPagar/index.jsx";
import Comissao from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/Comissao/index.jsx";
import DRE from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/DRE/index.jsx";
import Cobranca from "./pages/AreaOperadora/MinhaConta/Financeiro/Cobranca/index.jsx";
import Contrato from "./pages/AreaOperadora/MinhaConta/Financeiro/Servicos/Contrato/index.jsx";
import AlteracaoVencimento from "./pages/AreaOperadora/MinhaConta/Financeiro/Servicos/AlteracaoVencimento/index.jsx";
import ArquivoRemessa from "./pages/AreaOperadora/MinhaConta/Financeiro/Banco/ArquivoRemessa/index.jsx";
import ArquivoRetorno from "./pages/AreaOperadora/MinhaConta/Financeiro/Banco/ArquivoRetorno/index.jsx";
import RemessaBancoDigital from "./pages/AreaOperadora/MinhaConta/Financeiro/Banco/RemessaBancoDigital/index.jsx";
import LogAuditoria from "./pages/AreaOperadora/MinhaConta/Financeiro/LogAuditoria/index.jsx";
import Fechamento from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/Competencia/Fechamento/index.jsx";
import Abertura from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/Competencia/Abertura/index.jsx";

// ------------------- Area Operadora - Configurações ------------------- //
import DashboardConfiguracoes from "./pages/AreaOperadora/MinhaConta/Configuracoes/Dashboard/index.jsx";
import ConfiguracaoPadrao from "../src/components/ConfiguracaoPadrao/index.jsx";
import FormularioOperadora from "./pages/AreaOperadora/MinhaConta/Configuracoes/Formulario/index.jsx";
import FormularioCadastro from "./pages/AreaOperadora/MinhaConta/Configuracoes/Formulario/Cadastro/index.jsx";
import MensagemFerramenta from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/MensagemFerramenta/index.jsx";
import TelaEditar from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/MensagemFerramenta/TelaEditar/index.jsx";
import Departamento from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/Departamento/index.jsx";
import DepartamentoEdit from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/Departamento/DepartamentoEdit/index.jsx";
import Notificacao from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/Notificacao/index.jsx";
//import Status from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/Status/index.jsx";
import PerguntaDeclaracao from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/PerguntasDeclaracao/index.jsx";
import QuestionarioVida from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/QuestionarioVida/index.jsx";
import FuncaoUsuario from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/FuncaoUsuario/index.jsx";


import AgendadorFinanceiro from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Financeiro/index.jsx";
import AgendadorAssociado from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Associado/index.jsx";
import AgendadorProposta from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Proposta/index.jsx";
import AgendadorMudarStatus from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/MudarStatus/index.jsx";
import AgendadorRepresentante from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Representante/index.jsx";
import AgendadorPlataforma from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/PlataformaCrm/index.jsx";
import AndamentoProposta from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/AndamentoProposta/index.jsx";

import CartaCancelamento from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Contratante/CartaCancelamento/index.jsx";
import BoasVindas from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Proposta/Boas-vindas/index.jsx";
import StatusGeral from "./pages/AreaOperadora/MinhaConta/Configuracoes/Geral/Status/index.jsx";
import Status from "./pages/AreaOperadora/MinhaConta/Configuracoes/Geral/Status/StatusAbre/index.jsx";
// ------------------- Area Operadora - Segurança ------------------- //
import DashboardSeguranca from "./pages/AreaOperadora/MinhaConta/Seguranca/Dashboard/index.jsx";
import Seguranca from "./pages/AreaOperadora/MinhaConta/Seguranca/usuario/index.jsx";
import InfoTabela from "./pages/AreaOperadora/MinhaConta/Seguranca/usuario/componentes/InfoTabela/InfoTabela.jsx";
import PermissaoRelatorios from "./pages/AreaOperadora/MinhaConta/Seguranca/PermissaoRelatorios/index.jsx";
import RelatoriosTab from "./pages/AreaOperadora/MinhaConta/Seguranca/PermissaoRelatorios/Relatorios/index.jsx";
import PermissaoInformacoes from "./pages/AreaOperadora/MinhaConta/Seguranca/Permissao/index.jsx";

// ------------------- Area Operadora - Outros ------------------- //
import Relatorios from "./pages/AreaOperadora/MinhaConta/Relatorios/index.jsx";
import Mensagens from "./pages/AreaOperadora/MinhaConta/Mensagens/index.jsx";

// ------------------- Area Operadora - Manutenção ------------------- //

import DashboardManutencao from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Dashboard/index.jsx";
import Contratante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Contratante/index.jsx";
import NovoContratante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Contratante/NovoContratante/index.jsx";
import AtualizacaoPrecoLote from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/AtualizacaoPrecoLote/index.jsx"
import PlanoSaude from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/PlanoSaude/index.jsx";
import NovoPlanoSaude from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/PlanoSaude/NovoProdutoServico/index.jsx";
import Operadora from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Operadora/index.jsx";
import NovaOperadora from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Operadora/NovaOperadora/index.jsx";
import Convenio from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Convenio/index.jsx";
import Dependente from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Dependente/index.jsx";
import Entidade from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Entidade/index.jsx"
import Fornecedor from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Fornecedor/index.jsx"
import Funcionario from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Funcionario/index.jsx"
import ComboProduto from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/ComboProduto/index.jsx"
import NovoComboProdutoServico from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/ComboProduto/NovoComboProdutoServico/index.jsx";
import Representante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Representante/index.jsx"
import Segurado from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Segurado/index.jsx"
import NovoSegurado from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Segurado/NovoSegurado/index.jsx";
import VigenciaTransmissao from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/VigenciaTransmissao/index.jsx"
import InfoRepresentante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Representante/InfoRepresentante/index.jsx";
import InfoFuncionario from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Funcionario/infoFuncionario/index.jsx";
import InfoFornecedor from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Fornecedor/infoFornecedor/index.jsx";
import InfoEntidade from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Entidade/infoEntidade/index.jsx";

// ------------------- Area do Cliente ------------------- //
import Cliente_login from "./pages/AreaCliente/LoginCliente/index.jsx";
import Operadora_MinhaConta from "./pages/AreaCliente/MinhaConta/index.jsx";
import HomeCliente from "./pages/AreaCliente/HomeCliente/index.jsx";
import DashboardAdesao from "./pages/AreaCliente/MinhaConta/Adesao/index.jsx";
import VendaCliente from "./pages/AreaCliente/MinhaConta/Adesao/VendaCliente/index.jsx";
import ConsultaCliente from "./pages/AreaCliente/MinhaConta/Adesao/ConsultaCliente/index.jsx";
import AcompanhamentoCliente from "./pages/AreaCliente/MinhaConta/Adesao/AcompanhamentoCliente/index.jsx";
import Listagem_Beneficiarios from "./pages/AreaCliente/MinhaConta/ListagemBeneficiario/index.jsx";
import Movimentacoes from "./pages/AreaCliente/MinhaConta/Movimentacoes/index.jsx";
import Modulo_Relatorio from "./pages/AreaCliente/MinhaConta/ModuloRelatorio/index.jsx";
import Dados_do_Cliente from "./pages/AreaCliente/MinhaConta/DadosCliente/index.jsx";
import Financeiro_Cliente from "./pages/AreaCliente/MinhaConta/Financeiro/index.jsx";
import Seguranca_Cliente from "./pages/AreaCliente/MinhaConta/Seguranca/usuario/index.jsx";
import CriarClienteOperadora from "./pages/AreaCliente/MinhaConta/ListagemBeneficiario/components/CriarCliente.jsx";

// ------------------- Area do Representante ------------------- //
import Representante_Login from "./pages/AreaRepresentante/LoginRepresentante/index.jsx";
import Representante_MinhaConta from "./pages/AreaRepresentante/MinhaConta/Index.jsx";
import HomeRepresentante from "./pages/AreaRepresentante/MinhaConta/HomeRepresentante/index.jsx";
import DadosRepresentante from "./pages/AreaRepresentante/MinhaConta/DadosRepresentante/index.jsx";
import ListagemBeneficiarioRepresentante from "./pages/AreaRepresentante/MinhaConta/ListagemBeneficiario/index.jsx";
import FaseAtendimento from "./pages/AreaRepresentante/MinhaConta/FaseAtendimento/components/index.jsx";
import VendaCLienteRepresentante from "./pages/AreaRepresentante/MinhaConta/Adesao/VendaCliente";
import ConsultaClienteRepresentante from "./pages/AreaRepresentante/MinhaConta/Adesao/ConsultaRepresentante";
import AcompanhamentoClienteRepresentante from "./pages/AreaRepresentante/MinhaConta/Adesao/AcompanhamentoRepresentante";

// ------------------- Area do Beneficiario ------------------- //
import Beneficiario_login from "./pages/AreaBeneficiario/LoginCliente/index.jsx";
import Beneficiario_MinhaConta from "./pages/AreaBeneficiario/MinhaConta/index.jsx";
import HomeBeneficiario from "./pages/AreaBeneficiario/HomeBeneficiario/index.jsx";
import Questionario_de_Vida from "./pages/AreaBeneficiario/MinhaConta/Questionario/index.jsx";
import Perguntas_Declaracao from "./pages/AreaBeneficiario/MinhaConta/Perguntas/index.jsx";
import Dados_do_Beneficiario from "./pages/AreaBeneficiario/MinhaConta/DadosCliente/index.jsx";
import QuestionarioPerguntasVida from "./pages/AreaBeneficiario/MinhaConta/Perguntas/components/FaseAtendimento/index.jsx";
import QuestionarioPerguntasDeclaracao from "./pages/AreaBeneficiario/MinhaConta/Questionario/components/FaseAtendimento/index.jsx";
import EditDepartamento from "./pages/AreaOperadora/MinhaConta/Configuracoes/Departamento/DepartamentoEdit/index.jsx";
import DepartamentoGeral from "./pages/AreaOperadora/MinhaConta/Configuracoes/Geral/Departamento/index.jsx";
import FuncaoUsuarioGeral from "./pages/AreaOperadora/MinhaConta/Configuracoes/Geral/FuncaoUsuario/index.jsx";






const ProjectRoutes = () => {
  return (
    <Routes>
      {/* Rotas Básicas */}
      <Route path="/" element={<Operadora_Login />} />
      <Route path="*" element={<NotFound />} />

      // ------------------- Area Operadora ------------------- //
      <Route path={jsonRoute.Beneficiario_Login} element={<Beneficiario_login />} />
      <Route path={jsonRoute.AreaOperadora} element={<ProtectedRoute><AreaOperadora /></ProtectedRoute>}>
        
        {/* Area Operadora - Geral */}
        <Route path={jsonRoute.HomeOperadora} element={<HomeOperadora />} />
        
        {/* Area Operadora - Operacional */}
        <Route path={jsonRoute.Operacional} element={<DashboardOperacional />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.DashboardOperacional}`} element={<DashboardOperacional />} />
          {/* <Route path={`${jsonRoute.Manutencao}`} element={<DashboardManutencao />} /> */}
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Contratante}`} element={<Contratante />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Contratante}/${jsonRoute.NovoContratante}`} element={<NovoContratante />} />
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.AtualizacaoPrecoLote}`} element={<AtualizacaoPrecoLote />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.PlanoSaude}`} element={<PlanoSaude />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.PlanoSaude}/${jsonRoute.NovoPlanoSaude}`} element={<NovoPlanoSaude />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Operadora}`} element={<Operadora />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Operadora}/${jsonRoute.NovaOperadora}`} element={<NovaOperadora />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Convenio}`} element={<Convenio />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Depedente}`} element={<Dependente />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Entidade}`} element={<Entidade />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Entidade}/${jsonRoute.EntidadeCadastro}`} element={<InfoEntidade />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Fornecedor}`} element={<Fornecedor />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Fornecedor}/${jsonRoute.FornecedorCadastro}`} element={<InfoFornecedor />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Funcionario}`} element={<Funcionario />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Funcionario}/${jsonRoute.FuncionarioCadastro}`} element={<InfoFuncionario />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Representante}`} element={<Representante />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Representante}/${jsonRoute.RepresentanteCadastro}`} element={<InfoRepresentante />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Segurado}`} element={<Segurado />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.Segurado}/${jsonRoute.NovoSegurado}`} element={<NovoSegurado />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.VigenciaTransmissao}`} element={<VigenciaTransmissao />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.ComboProduto}`} element={<ComboProduto />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.ComboProduto}/${jsonRoute.NovoComboProdutoServico}`} element={<NovoComboProdutoServico />} />
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.CadastroBeneficiarios}`} element={<CadastroBeneficiarios />} />
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.CadastroBeneficiarios}/${jsonRoute.CadastroBeneficiarioNovo}`} element={<CriarBeneficiario />} />
          {/* <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.ProdutoServico}`} element={<ProdutoServico />}/>
          <Route path={`${jsonRoute.Operacional}/manutencao/${jsonRoute.ProdutoServico}/${jsonRoute.NovoProdutoServico}`} element={<NovoProdutoServico />} /> */}
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.CadastroPlanos}`} element={<CadastroPlanos />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.CadastroPlanos}/${jsonRoute.CadastroPlanosNovo}`} element={<ComboNovo />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.CriarCliente}`} element={<CriarCliente />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.CadastroCliente}`} element={<CadastroCliente />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.CadastroCliente}/${jsonRoute.CadastroPlanosNovo}`} element={<CriarCliente />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.CadastroPrestador}`} element={<CadastroPrestador />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.CadastroPrestador}/${jsonRoute.CadastroPlanosNovo}`} element={<InfoPrestador />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.InfoPrestador}`} element={<InfoPrestador />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.Kanban}`} element={<Kanban />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.MovBeneficiario}`} element={<MovBeneficiario />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.MigracaoCarterinha}`} element={<MigracaoCarterinha />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.MigracaoRepresentante}`} element={<MigracaoRepresentante />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.MigracaoPlano}`} element={<MigracaoPlano />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.MigracaoColaborador}`} element={<MigracaoColaborador />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.MigracaoFornecedor}`} element={<MigracaoFornecedor />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.MigracaoVigencia}`} element={<MigracaoVigencia />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.Acompanhamento_Empresarial}`} element={<Acompanhamento />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.Cancelamento_Empresarial}`} element={<Cancelamento />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.ValidacaoProposta_Empresarial}`} element={<ValidacaoProposta />} />

        
        {/* Area Operadora - Outros */}
        <Route path={jsonRoute.Relatorios} element={<Relatorios />} />
        <Route path={jsonRoute.Mensagens} element={<Mensagens />} />
        <Route path={jsonRoute.Configuracoes} element={<DashboardConfiguracoes />} />

        {/* Area Operadora - Financeiro */}
        <Route path={jsonRoute.Financeiro} element={<Financeiro />}>
          <Route index element={<Dashboard />} />
          <Route path={`${jsonRoute.Lancamento}/novo`} element={<LancamentoNovo />} />
        </Route>
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Lancamento}`} element={<Lancamento />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Cobranca}`} element={<Cobranca />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.LogAuditoria}`} element={<LogAuditoria />} />
        
        {/* Area Operadora - Financeiro - Tesouraria */}
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.FluxoCaixa}`} element={<FluxoCaixa />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.ContasAReceber}`} element={<ContasAReceber />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.ContasAPagar}`} element={<ContasAPagar />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Comissao}`} element={<Comissao />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.DRE}`} element={<DRE />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Fechamento}`} element={<Fechamento />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Tesouraria}/${jsonRoute.Competencia}/${jsonRoute.Abertura}`} element={<Abertura />} />
        
        {/* Area Operadora - Financeiro - Serviços */}
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Servicos}/${jsonRoute.Contrato}`} element={<Contrato />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Servicos}/${jsonRoute.AlteracaoVencimento}`} element={<AlteracaoVencimento />} />
        
        {/* Area Operadora - Financeiro - Banco */}
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.ArquivoRemessa}`} element={<ArquivoRemessa />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.ArquivoRetorno}`} element={<ArquivoRetorno />} />
        <Route path={`${jsonRoute.Financeiro}/${jsonRoute.Banco}/${jsonRoute.RemessaBancoDigital}`} element={<RemessaBancoDigital />} />

        {/* Area Operadora - Configurações */}
        
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorFinanceiro}`} element={<AgendadorFinanceiro />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorAssociado}`} element={<AgendadorAssociado />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorProposta}`} element={<AgendadorProposta />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorMudarStatus}`} element={<AgendadorMudarStatus />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorRepresentante}`} element={<AgendadorRepresentante />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.AgendadorPlataforma}`} element={<AgendadorPlataforma />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.AndamentoProposta}`} element={<AndamentoProposta />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.CartaCacelamento}`} element={<CartaCancelamento />} />
        <Route path={`${jsonRoute.Configuracoes}/agendador/${jsonRoute.BoasVindas}`} element={<BoasVindas />} />
        
        <Route path={`${jsonRoute.Configuracoes}/geral/${jsonRoute.StatusGeral}`} element={<StatusGeral />} >
             <Route path={'cadastro'} element={<Status />} />
        </Route>

        <Route path={`${jsonRoute.Configuracoes}/geral/${jsonRoute.DepartamentoGeral}`} element={<DepartamentoGeral />} >
             <Route path={'cadastro'} element={<EditDepartamento />} />
        </Route>

        <Route path={`${jsonRoute.Configuracoes}/geral/${jsonRoute.FuncaoUsuarioGeral}`} element={<ConfiguracaoPadrao />} >
             <Route path={'cadastro'} element={<FuncaoUsuarioGeral />} />
        </Route>
      
        
        {/* Area Operadora - Configurações - Componentes */}
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.Especialidades}`} element={<ConfiguracaoPadrao />} >
          <Route path={'cadastro'} element={<FuncaoUsuario/>} />
        </Route>
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.MensagensFerramenta}`} element={<MensagemFerramenta/>} > 
          <Route path={'cadastro'} element={<TelaEditar />} />
        </Route>
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.Notificacao}`} element={<ConfiguracaoPadrao />} >
          <Route path={'cadastro'} element={<Notificacao />} />
        </Route>
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.Status}`} element={<ConfiguracaoPadrao />} >
          <Route path={'cadastro'} element={<Status />} />
        </Route>
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.PerguntasDeclaracao}`} element={<ConfiguracaoPadrao />} >
          <Route path={'cadastro'} element={<PerguntaDeclaracao />} />
        </Route>
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.QuestionarioVida}`} element={<ConfiguracaoPadrao />} >
          <Route path={'cadastro'} element={<QuestionarioVida />} />
        </Route>
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.FuncaoUsuario}`} element={<ConfiguracaoPadrao />} >
          <Route path={'cadastro'} element={<FuncaoUsuario />} />
        </Route>
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.Departamento}`} element={<Departamento />}>
          <Route path={'cadastro'} element={<DepartamentoEdit />} />
        </Route>
        
        {/* Area Operadora - Configurações - Formulários */}
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.Formulario}`} element={<FormularioOperadora />} />
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.Formulario}/${jsonRoute.FormularioCadastro}`} element={<FormularioCadastro />} />
        <Route path={`${jsonRoute.Configuracoes}/${jsonRoute.ConfigPadrao}`} element={<ConfiguracaoPadrao />} />

        {/* Area Operadora - Segurança */}
        <Route path={jsonRoute.Seguranca} element={<DashboardSeguranca />} />
        <Route path={`${jsonRoute.Seguranca}/${jsonRoute.SegurancaUsuario}`} element={<Seguranca />} />
        <Route path={`${jsonRoute.Seguranca}/${jsonRoute.InfoTabela}`} element={<InfoTabela />} />
        <Route path={`${jsonRoute.Seguranca}/${jsonRoute.PermissaoRelatorios}`} element={<PermissaoRelatorios />} />
        <Route path={`${jsonRoute.Seguranca}/${jsonRoute.PermissaoInformacoes}`} element={<PermissaoInformacoes />} />
        <Route path={`${jsonRoute.Seguranca}/${jsonRoute.RelatoriosTab}`} element={<RelatoriosTab />} />

        {/* Area Operadora - Manutenção */}

      </Route>
      
      // ------------------- Area do Cliente ------------------- //
      <Route path={jsonRoute.Operadora_Login} element={<Operadora_Login />} />
      <Route path={jsonRoute.Cliente_login} element={<Cliente_login />} />
      <Route path={jsonRoute.Operadora_MinhaConta} element={<ProtectedRoute><Operadora_MinhaConta /></ProtectedRoute>}>
        <Route path={jsonRoute.HomeCliente} element={<HomeCliente />} />

        {/* Area do Cliente - Adesao */}
        <Route path={jsonRoute.Adesao_Cliente} element={<DashboardAdesao />} />
        <Route path={`${jsonRoute.Adesao_Cliente}/${jsonRoute.Acompanhamento_Cliente}`} element={<AcompanhamentoCliente />} />
        <Route path={`${jsonRoute.Adesao_Cliente}/${jsonRoute.Consulta_Cliente}`} element={<ConsultaCliente />} />
        <Route path={`${jsonRoute.Adesao_Cliente}/${jsonRoute.Venda_Cliente}`} element={<VendaCliente />} />
        
        
        
        
        <Route path={jsonRoute.Listagem_Beneficiarios} element={<Listagem_Beneficiarios />} />
        <Route path={jsonRoute.Movimentacoes} element={<Movimentacoes />} />
        <Route path={jsonRoute.Modulo_Relatorio} element={<Modulo_Relatorio />} />
        <Route path={jsonRoute.Dados_do_Cliente} element={<Dados_do_Cliente />} />
        <Route path={jsonRoute.Financeiro_Cliente} element={<Financeiro_Cliente />} />
        <Route path={jsonRoute.Seguranca_Cliente} element={<Seguranca_Cliente />} />
        <Route path={jsonRoute.CriarClientOperadora} element={<CriarClienteOperadora />} />
      </Route>

      // ------------------- Area do Representante ------------------- //
      <Route path={jsonRoute.Representante_Login} element={<Representante_Login />} />
      <Route path={jsonRoute.Representante_Area} element={<ProtectedRoute><Representante_MinhaConta /></ProtectedRoute>}>
        <Route index element={<HomeRepresentante />} />
        <Route path="home" element={<HomeRepresentante />} />
        <Route path={jsonRoute.Representante_ListagemBeneficiario} element={<ListagemBeneficiarioRepresentante />} />
        <Route path={jsonRoute.Representante_DadosRepresentante} element={<DadosRepresentante />} />
        <Route path="financeiro/*" element={<Representante_MinhaConta />} />
        <Route path={jsonRoute.Acompanhamento_Representante} element={<AcompanhamentoClienteRepresentante />} />
        <Route path={jsonRoute.Venda_Representante} element={<VendaCLienteRepresentante />} />
        <Route path={jsonRoute.Consulta_Representante} element={<ConsultaClienteRepresentante />} />
        <Route path={jsonRoute.Representante_FaseAtendimento} element={<FaseAtendimento />} />
      </Route>

      // ------------------- Area do Beneficiario ------------------- //
      <Route path={jsonRoute.Beneficiario_login} element={<Beneficiario_login />} />
      <Route path={jsonRoute.Beneficiario_MinhaConta} element={<ProtectedRoute><Beneficiario_MinhaConta /></ProtectedRoute>}>
        <Route path={jsonRoute.HomeBeneficiario} element={<HomeBeneficiario />} />
        <Route path={jsonRoute.Questionario_de_Vida} element={<Questionario_de_Vida />}>
          <Route path={jsonRoute.QuestionarioPerguntasVida} element={<QuestionarioPerguntasVida/>}/> 
        </Route>
        <Route path={jsonRoute.Perguntas_Declaracao} element={<Perguntas_Declaracao />}>
          <Route path={jsonRoute.QuestionarioPerguntasDeclaracao} element={<QuestionarioPerguntasDeclaracao/>}/> 
        </Route>
        <Route path={jsonRoute.Dados_do_Beneficiario} element={<Dados_do_Beneficiario />}/>       
      </Route>

    </Routes>
  );
};

export default ProjectRoutes;