import { carregarLinks } from '../db/carregarGeral.jsx';
import { getBaseConfig } from './utilsConfig.js';
import toastMessage from '../assets/toast-ui/toast.js';

const { baselink, companyId, endpoints } = getBaseConfig();

export const formatarUsuarioLogin = (str) => {
  // somente CPF e CNPJ vão ser formatados, strings com letras retornam normalmente.
  const raw = str.replace(/[.\-\/]/g, "");
  return /^\d+$/.test(raw) ? raw : str;
};

export const limparFiltros = (filtros) => {
  filtros.forEach(({ setter, ref, defaultValue }) => {
    if (setter) setter({ target: { value: defaultValue || "" } });
    if (ref?.current) ref.current.value = defaultValue || "";
  });
};

export const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const formatarMoeda = (valor) => {
  return valor != undefined ? new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor):"";
};

export const formatarData = (data) => {
  return data ? new Intl.DateTimeFormat("pt-BR").format(new Date(data)):"";
};

export const formatarDataHora = (data) => {

  return data ? new Intl.DateTimeFormat("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(data)):"";
};

export const validarCPF = (cpf) => {
  const strCPF = String(cpf).replace(/[^\d]/g, "");

  if (strCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(strCPF)) return false;

  let soma = 0;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(strCPF[i - 1]) * (11 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(strCPF[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(strCPF[i - 1]) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(strCPF[10]);
};

export const validarCNPJ = (cnpj) => {
  var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
  var dig1 = 0;
  var dig2 = 0;
  var i = 0;
  var exp = /\D/g;
  cnpj = cnpj.toString().replace(exp, '');
  var digito1 = Number(cnpj.charAt(12));
  var digito2 = Number(cnpj.charAt(13));
  for (i = 0; i < valida.length; i++) {
      dig1 += i > 0 ? Number(cnpj.charAt(i - 1)) * Number(valida[i]) : 0;
      dig2 += Number(cnpj.charAt(i)) * Number(valida[i]);
  }
  dig1 = dig1 % 11 < 2 ? 0 : 11 - (dig1 % 11);
  dig2 = dig2 % 11 < 2 ? 0 : 11 - (dig2 % 11);
  return dig1 == digito1 && dig2 == digito2;
};

export const validarCPFCNPJ = (cpfcnpj) => {
  return validarCPF(cpfcnpj) || validarCNPJ(cpfcnpj);
};

export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarData = (data) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(data)) return false;

  const [dia, mes, ano] = data.split("/").map(Number);
  const dataObj = new Date(ano, mes - 1, dia);
  return (
    dataObj.getFullYear() === ano &&
    dataObj.getMonth() + 1 === mes &&
    dataObj.getDate() === dia
  );
};

export const validarDataNasc = (data) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(data)) return false;

  const [dia, mes, ano] = data.split("/").map(Number);
  const dataObj = new Date(ano, mes - 1, dia);
  const dataHoje = new Date();
  dataHoje.setHours(0, 0, 0, 0);
  if(dataObj > dataHoje){
    return false;
  }
  return (
    dataObj.getFullYear() === ano &&
    dataObj.getMonth() + 1 === mes &&
    dataObj.getDate() === dia
  );
};

export const validarDataAgendamento = (data) => {
  const regex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
  if (!regex.test(data)) return false;

  const dataHoraSplit = data.split(/\s+/);
  const [dia, mes, ano] = dataHoraSplit[0].split("/").map(Number);
  const [horas, minutos] = dataHoraSplit[1].split(":").map(Number);
  const dataObj = new Date(ano, mes - 1, dia, horas, minutos);
  const dataHoje = new Date();
  if(dataObj <= dataHoje){
    return false;
  }
  return (
    dataObj.getFullYear() === ano &&
    dataObj.getMonth() + 1 === mes &&
    dataObj.getDate() === dia
  );
};

export const converterParaData = (data) => {
  if (!data) return null;
  const partes = data.split(' ')[0].split('/');
  if (partes.length !== 3) return null;
  const [dia, mes, ano] = partes;
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

export const validarNumeroCartao = (numeroCartao) => {
  if(numeroCartao.length != 19) return false;
  return true;
}

export const validarCvvCartao = (cvv) => {
  if(cvv.length != 3) return false;
  return true;
}

export const validarValidadeCartao = (data) => {
  const regex = /^\d{2}\/\d{2}$/;
  if (!regex.test(data)) return false;

  const [mes, ano] = data.split("/").map(Number);
  const dataObj = new Date(parseInt('20'+(ano.toString().padStart(2, '0'))), mes - 1);
  const dataHoje = new Date();
  dataHoje.setDate(1);
  dataHoje.setHours(0, 0, 0, 0);
  if(dataObj < dataHoje){
    return false;
  }
  return (
    dataObj.getFullYear() === parseInt('20'+ano.toString().padStart(2, '0')) &&
    dataObj.getMonth() + 1 === mes
  );
};

export const validarTelefone = (data) => {
  const regex = /^\d{10}$/; ///^\+\d{3}\(\d{2}\) \d{4}-\d{4}$/
  return regex.test(data.replace(/\D/g,''));
}

export const validarCelular = (data) => {
  const regex = /^\d{11}$/; ///^\+\d{3}\(\d{2}\) \d{5}-\d{4}$/
  return regex.test(data.replace(/\D/g,''));
}

export const validarTelCel = (data) => {
  return validarTelefone(data) || validarCelular(data);
}

String.prototype.initCap = function () {
   return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
   });
};

export const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const handleResizeTabela = debounce((tabelaId, container) => {
  const tabelaContainer = document.getElementById(`tabelaContainer-${tabelaId}`);
  if (!tabelaContainer) return;

  const mainContainer = document.getElementById(`${container}`);
  if (!mainContainer) return;

  const elementComputedStyle = window.getComputedStyle(mainContainer);
  const fullScreenWidth = mainContainer.parentElement.offsetWidth - parseFloat(elementComputedStyle.paddingLeft) - parseFloat(elementComputedStyle.paddingRight);
  tabelaContainer.style.maxWidth = `${fullScreenWidth}px`;
}, 250);

export const handleResizeTabelaAvulsa = debounce((tabelaId, container) => {
  const tabelaContainer = document.getElementById(`tabelaContainer-${tabelaId}`);
  if (!tabelaContainer) return;

  const mainContainer = document.getElementById(`${container}`);
  if (!mainContainer) return;

  const elementComputedStyle = window.getComputedStyle(mainContainer);
  const fullScreenWidth = mainContainer.parentElement.offsetWidth - parseFloat(elementComputedStyle.paddingLeft) - parseFloat(elementComputedStyle.paddingRight);
  tabelaContainer.style.maxWidth = `${fullScreenWidth}px`;
})

export const cepAPI = (cep, callback) => {
  window.callback = callback;
  
  const params = {
    cep: cep
  };

  carregarLinks(
    'carregarEndereco',
    `${baselink}${endpoints.buscarEndereco}`,
    params,
    'callback'
  );

  return () => {
    delete window.callback;
  };
}

export const validarCampos = arrayCamposObrigatorios => {
  /*arrayCamposObrigatorios = [
    {
      valor: value, //Valor do campo;
      nome: "Name", //Título do campo;
      validacao: validaCampo, //Função de validação do campo; Não obrigatório;
      tp: check //Tipo do campo; check => checkbox, file => arquivo; Não obrigatório;
    }
  ]*/
  const camposObrigatorios = arrayCamposObrigatorios;
  for (const campo of camposObrigatorios) {
    if (campo.tp) {
      if (!campo.valor) {
        if(campo.tp == 'check'){
          toastMessage(`Você precisa aceitar os termos para continuar.`, "warning", {
            timeOut: 5000,
          });
        } else if(campo.tp == 'file'){
          toastMessage(`Faça o upload de um arquivo no   campo ${campo.nome}.`, "warning", {
            timeOut: 5000,
          });
        }
        return false;
      }
    } else if (!campo.valor || campo.valor.trim() === "") {
      toastMessage(`O campo ${campo.nome} é obrigatório.`, "warning", {
        timeOut: 5000,
      });
      return false;
    } else if (campo.validacao && !campo.validacao(campo.valor)) {
      toastMessage(`O campo ${campo.nome} é inválido.`, "warning", {
        timeOut: 5000,
      });
      return false;
    }
  }
  return true;
};