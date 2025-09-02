import React from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import { jsonRoute } from "./utils/json.js";
import NotFound from "./pages/NotFound";

// ------------------- Area Operadora ------------------- //
import Operadora_Login from "./pages/AreaOperadora/LoginOperadora";
import AreaOperadora from "./pages/AreaOperadora/MinhaConta";
import HomeOperadora from "./pages/AreaOperadora/HomeOperadora";

// ------------------- Area Operadora - Operacional ------------------- //
import DashboardOperacional from "./pages/AreaOperadora/MinhaConta/Operacional/Dashboard";
import CadastroBeneficiarios from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroBeneficiario";
import CriarBeneficiario from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroBeneficiario/components/CriarBeneficiario.jsx";
import CadastroPrestador from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPrestador";
import InfoPrestador from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPrestador/components/InfoPrestador";
import CadastroCliente from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroCliente"
import CriarCliente from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroCliente/components/CriarCliente.jsx";
import CadastroPlanos from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPlanos";
import ComboNovo from "./pages/AreaOperadora/MinhaConta/Operacional/CadastroPlanos/Novo";
import Kanban from "./pages/AreaOperadora/MinhaConta/Operacional/Kanban";
import MovBeneficiario from "./pages/AreaOperadora/MinhaConta/Operacional/MovBeneficiario";
import MigracaoCarterinha from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Carterinha";
import MigracaoRepresentante from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Representante";
import MigracaoPlano from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Plano";
import MigracaoColaborador from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Colaborador";
import MigracaoFornecedor from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Fornecedor";
import MigracaoVigencia from "./pages/AreaOperadora/MinhaConta/Operacional/Migracao/Vigencia";
import Acompanhamento from "./pages/AreaOperadora/MinhaConta/Operacional/PortalEmpresarial/Acompanhamento";
import Cancelamento from "./pages/AreaOperadora/MinhaConta/Operacional/PortalEmpresarial/Cancelamento";
import ValidacaoProposta from "./pages/AreaOperadora/MinhaConta/Operacional/PortalEmpresarial/ValidacaoProposta";

// ------------------- Area Operadora - Financeiro ------------------- //
import Financeiro from "./pages/AreaOperadora/MinhaConta/Financeiro";
import Dashboard from "./pages/AreaOperadora/MinhaConta/Financeiro/Dashboard";
import Lancamento from "./pages/AreaOperadora/MinhaConta/Financeiro/Lancamento";
import LancamentoNovo from "./pages/AreaOperadora/MinhaConta/Financeiro/Lancamento/Novo";
import FluxoCaixa from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/FluxoCaixa";
import ContasAReceber from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/ContasAReceber";
import ContasAPagar from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/ContasAPagar";
import Comissao from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/Comissao";
import DRE from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/DRE";
import Cobranca from "./pages/AreaOperadora/MinhaConta/Financeiro/Cobranca";
import Contrato from "./pages/AreaOperadora/MinhaConta/Financeiro/Servicos/Contrato";
import AlteracaoVencimento from "./pages/AreaOperadora/MinhaConta/Financeiro/Servicos/AlteracaoVencimento";
import ArquivoRemessa from "./pages/AreaOperadora/MinhaConta/Financeiro/Banco/ArquivoRemessa";
import ArquivoRetorno from "./pages/AreaOperadora/MinhaConta/Financeiro/Banco/ArquivoRetorno";
import RemessaBancoDigital from "./pages/AreaOperadora/MinhaConta/Financeiro/Banco/RemessaBancoDigital";
import LogAuditoria from "./pages/AreaOperadora/MinhaConta/Financeiro/LogAuditoria";
import Fechamento from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/Competencia/Fechamento";
import Abertura from "./pages/AreaOperadora/MinhaConta/Financeiro/Tesouraria/Competencia/Abertura";

// ------------------- Area Operadora - Configurações ------------------- //
import DashboardConfiguracoes from "./pages/AreaOperadora/MinhaConta/Configuracoes/Dashboard";
import ConfiguracaoPadrao from "../src/components/ConfiguracaoPadrao";
import FormularioOperadora from "./pages/AreaOperadora/MinhaConta/Configuracoes/Formulario";
import FormularioCadastro from "./pages/AreaOperadora/MinhaConta/Configuracoes/Formulario/Cadastro";
import MensagemFerramenta from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/MensagemFerramenta";
import TelaEditar from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/MensagemFerramenta/TelaEditar";
import Departamento from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/Departamento";
import DepartamentoEdit from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/Departamento/DepartamentoEdit";
import Notificacao from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/Notificacao";
import PerguntaDeclaracao from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/PerguntasDeclaracao";
import QuestionarioVida from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/QuestionarioVida";
import FuncaoUsuario from "../src/pages/AreaOperadora/MinhaConta/Configuracoes/FuncaoUsuario";


import AgendadorFinanceiro from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Financeiro";
import AgendadorAssociado from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Associado";
import AgendadorProposta from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Proposta";
import AgendadorMudarStatus from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/MudarStatus";
import AgendadorRepresentante from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Representante";
import AgendadorPlataforma from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/PlataformaCrm";
import AndamentoProposta from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/AndamentoProposta";

import CartaCancelamento from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Contratante/CartaCancelamento";
import BoasVindas from "./pages/AreaOperadora/MinhaConta/Configuracoes/AgendadorTarefas/Proposta/Boas-vindas";
import Status from "./pages/AreaOperadora/MinhaConta/Configuracoes/Geral/Status/StatusAbre";
// ------------------- Area Operadora - Segurança ------------------- //
import DashboardSeguranca from "./pages/AreaOperadora/MinhaConta/Seguranca/Dashboard";
import Seguranca from "./pages/AreaOperadora/MinhaConta/Seguranca/usuario";
import InfoTabela from "./pages/AreaOperadora/MinhaConta/Seguranca/usuario/componentes/InfoTabela/InfoTabela.jsx";
import PermissaoRelatorios from "./pages/AreaOperadora/MinhaConta/Seguranca/PermissaoRelatorios";
import RelatoriosTab from "./pages/AreaOperadora/MinhaConta/Seguranca/PermissaoRelatorios/Relatorios";
import PermissaoInformacoes from "./pages/AreaOperadora/MinhaConta/Seguranca/Permissao";

// ------------------- Area Operadora - Outros ------------------- //
import Relatorios from "./pages/AreaOperadora/MinhaConta/Relatorios";
import Mensagens from "./pages/AreaOperadora/MinhaConta/Mensagens";

// ------------------- Area Operadora - Manutenção ------------------- //

import Contratante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Contratante";
import NovoContratante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Contratante/NovoContratante";
import AtualizacaoPrecoLote from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/AtualizacaoPrecoLote"
import PlanoSaude from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/PlanoSaude";
import NovoPlanoSaude from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/PlanoSaude/NovoProdutoServico";
import Operadora from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Operadora";
import NovaOperadora from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Operadora/NovaOperadora";
import Convenio from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Convenio";
import Dependente from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Dependente";
import Entidade from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Entidade"
import Fornecedor from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Fornecedor"
import Funcionario from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Funcionario"
import ComboProduto from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/ComboProduto"
import NovoComboProdutoServico from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/ComboProduto/NovoComboProdutoServico";
import Representante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Representante"
import Segurado from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Segurado"
import NovoSegurado from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Segurado/NovoSegurado";
import VigenciaTransmissao from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/VigenciaTransmissao"
import InfoRepresentante from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Representante/InfoRepresentante";
import InfoFuncionario from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Funcionario/infoFuncionario";
import InfoFornecedor from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Fornecedor/infoFornecedor";
import InfoEntidade from "./pages/AreaOperadora/MinhaConta/Operacional/Manutencao/Entidade/infoEntidade";



const ProjectRoutes = () => {
  return (
    <Routes>
      {/* Rotas Básicas */}
      <Route path="/" element={<Operadora_Login />} />
      <Route path="*" element={<NotFound />} />

      // ------------------- Area Operadora ------------------- //
      <Route path={jsonRoute.Operadora_Login} element={<Operadora_Login />} />
      <Route path={jsonRoute.AreaOperadora} element={<ProtectedRoute><AreaOperadora /></ProtectedRoute>}>
        
        {/* Area Operadora - Geral */}
        <Route path={jsonRoute.HomeOperadora} element={<HomeOperadora />} />
        
        {/* Area Operadora - Operacional */}
        <Route path={jsonRoute.Operacional} element={<DashboardOperacional />} />
        <Route path={`${jsonRoute.Operacional}/${jsonRoute.DashboardOperacional}`} element={<DashboardOperacional />} />
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
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;