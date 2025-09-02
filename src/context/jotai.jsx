import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const defaultUserInfo = {
  id_usuario: "", // token do usuario logado
  tipo_usuario: "", // tipo do usuario logado B, E, P
  cpfcnpj: "", // cpf ou cnpj do usuario
  login: "", // login do usuario
  nome: "", // nome do usuario
  assinatura: [], // area do cliente
  token_cliente: "", // token do estipulante do Beneficiário
  dados_cliente: {}, // dados do cliente
  sessao_id: "",
  fotoperfil:
    "https://sistema.hermanosti.com/clubedebeneficio/img/profile_placeholder.png",
  permissao: [],
  permissoesFormatadas: {},
};

export const userInfoAtom = atomWithStorage(
  "userInfo",
  defaultUserInfo,
  createJSONStorage(() => sessionStorage)
);

export const idAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("id_usuario")
);
export const tipoUsuarioAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("tipo_usuario")
);
export const cpfcnpjAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("cpfcnpj")
);
export const loginAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("login")
);
export const nomeAtom = focusAtom(userInfoAtom, (optic) => optic.prop("nome"));
export const assinaturaListaAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("assinatura")
);
export const tokenClienteAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("token_cliente")
);
export const dadosClienteAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("dados_cliente")
);
export const fotoPerfilAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("fotoperfil")
);
export const permissoesAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("permissao")
);
export const permissoesFormatadasAtom = focusAtom(userInfoAtom, (optic) =>
  optic.prop("permissoesFormatadas")
);

export const permissoesOrdemAtom = atom({
  // Permissões Área Operadora
  AREA_OPERADORA_ROOT: "1",
  AREA_OPERADORA_SEGURANCA: "1.01",
  AREA_OPERADORA_CONFIGURACOES: "1.02",
  AREA_OPERADORA_RELATORIOS: "1.03",
  AREA_OPERADORA_MENSAGENS: "1.04",
  AREA_OPERADORA_OPERACIONAL: "1.05",
  AREA_OPERADORA_FINANCEIRO: "1.06",
  AREA_OPERADORA_MANUTENCAO: "1.05", // Depois tem que renomar variaveis como essas pra OPERADORA, só que quebra umas mil coisas então tem que ir com calma, calabreso

  // Permissões Área Cliente
  AREA_CLIENTE_ROOT_CLIENTE: "2",
  AREA_CLIENTE_SEGURANCA_CLIENTE: "2.01",
  AREA_CLIENTE_LISTAGEM: "2.02",
  AREA_CLIENTE_MOVIMENTACOES: "2.03",
  AREA_CLIENTE_RELATORIO: "2.04",
  AREA_CLIENTE_DADOS_CLIENTE: "2.05",
  AREA_CLIENTE_FINANCEIRO: "2.06",
  AREA_CLIENTE_ADESAO: "2.06",

  // Permissões Área Beneficiario
  AREA_BENEFICIARIO_ROOT: "3",
  AREA_BENEFICIARIO_QUESTIONARIO: "3.01",
  AREA_BENEFICIARIO_PERGUNTAS: "3.02",
  AREA_BENEFICIARIO_DADOS_BENEFICIARIO: "3.03",

  // Permissões Área Beneficiario

  AREA_REPRESENTANTE_ROOT:"4",
  AREA_REPRESENTANTE_VENDA:"4.01",
  AREA_REPRESENTANTE_CONSULTA:"4.02",
  AREA_REPRESENTANTE_ACOMPANHAMENTO:"4.03",
  AREA_REPRESENTANTE_DADOS_REPRESENTANTE:"4.04"
});


export const dadosDoClienteCompra = atom({
    dataSolicitacaoProposta: "2025-08-26",
    cnpj: "12.345.678/0001-99",
    razaoSocial: "Soluções Digitais Vértice Ltda.",
    nomeFantasia: "Vértice Tech",

    enderecoPrincipal: {
        cep: "01310-200",
        endereco: "Avenida Paulista",
        numero: "1842",
        complemento: "Conjunto 155, Torre Norte",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        uf: "SP",
    },

    enderecoCorrespondencia: {
        cep: "04571-000",
        endereco: "Avenida Engenheiro Luís Carlos Berrini",
        numero: "1748",
        complemento: "Andar 10",
        bairro: "Cidade Monções",
        cidade: "São Paulo",
        uf: "SP",
    },

    contatoPrincipal: {
        cpf: "111.222.333-44",
        nome: "Ricardo Mendes de Oliveira",
        email: "ricardo.oliveira@verticetech.com",
        confirmacaoEmail: "ricardo.oliveira@verticetech.com",
        telefone: "(11) 3045-6789",
        celular: "(11) 98877-6655",
    },
});
