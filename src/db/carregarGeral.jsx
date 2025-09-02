import CryptoJS from 'crypto-js';
import { devBaseInf, prodBaseInf, baseInf } from '../utils/json.js';
export let allPromises = {};
export let carregarGeral = {};
export let key = 'H_CLUBEBENEFICIO';

const encrypt = (texto={}) => {
  //console.log(texto,CryptoJS.AES.encrypt(JSON.stringify(texto), key), base64ToBase64Url(CryptoJS.AES.encrypt(JSON.stringify(texto), key)));
  return base64ToBase64Url(CryptoJS.AES.encrypt(JSON.stringify(texto), key).toString());
}
export const decrypt = (texto="") => {
  return CryptoJS.AES.decrypt(atob(texto.replace(/\r\n/g,'')), key).toString(CryptoJS.enc.Utf8);
}

// Function to convert Base64 to Base64Url
const base64ToBase64Url = (base64) => {
  return String(base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

// Function to convert Base64Url to Base64
export const base64UrlToBase64 = (base64Url) => {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
      base64 += '=';
  }
  return base64;
}

export const uploadFile = (id,  link, file,  params,callBack=null) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const arrayBuffer = event.target.result;
    console.log("arrayBuffer",arrayBuffer);
    carregarGeral = iniciarWorker();
    allPromises[id] = {};
    allPromises[id].promise = new Promise((resolve, reject) => {
    carregarGeral.postMessage({
      url: link,
      callBack: callBack,
      dataForm: arrayBuffer,
      returnId: id,
      returnMulti: false,
      returnTodos: false,
      param: encrypt(params),
      isFile: true
    });
    allPromises[id].resolve = resolve;
    allPromises[id].reject = reject;
  });
  }
    reader.readAsArrayBuffer(file);
  
}

export const carregarLinks = (id, link, parameter, callBack = 'carregarCampoApoio')=>{
  carregarGeral = iniciarWorker();
  //console.log("carregarLinks",id,link,parameter,callBack);
  allPromises[id] = {};
  allPromises[id].promise = new Promise((resolve, reject) => {
    carregarGeral.postMessage({
      url: link,
      callBack: callBack,
      returnId: id,
      returnMulti: false,
      returnTodos: false,
      param: encrypt(parameter)
    });
    allPromises[id].resolve = resolve;
    allPromises[id].reject = reject;
  });
};

export const carregarDocumentos = (id, link, parameter, callBack = 'carregarCampoApoio')=>{
  carregarGeral = iniciarWorker();
  //console.log("carregarLinks",id,link,parameter,callBack);
  allPromises[id] = {};
  allPromises[id].promise = new Promise((resolve, reject) => {
    carregarGeral.postMessage({
      url: link,
      callBack: callBack,
      returnId: id,
      returnMulti: false,
      returnTodos: false,
      param: parameter
    });
    allPromises[id].resolve = resolve;
    allPromises[id].reject = reject;
  });
};

export const carregarInfos = (id, parameter, callBack = 'carregarCampoApoio') =>{
  // console.log(parameter);
  carregarGeral = iniciarWorker();
  allPromises[id] = {};
  allPromises[id].promise = new Promise((resolve, reject) => {
    carregarGeral.postMessage({
      url: (baseInf.appMode=="dev"?devBaseInf.baselink:prodBaseInf.baselink)+"carregarGenerico.jsp",
      callBack: callBack,
      returnId: id,
      returnMulti: false,
      param: encrypt(parameter),
      returnTodos: false
    });
    allPromises[id].resolve = resolve;
    allPromises[id].reject = reject;
  });
}

export const carregarCampoApoio = (dados) =>{
  if (typeof dados === 'object'){
    const idd = dados.data.returnId;
    const multip = dados.data.returnMulti;
    const todosp = dados.data.returnTodos;
    const myJson = JSON.parse(decrypt(dados.data.dados));
    let opcoes = ``;
    if (todosp) {
      opcoes = `<option value="${multip?"*":""}" selected >${multip?"TODOS":"ESCOLHA UMA OP\u00c7\u00c3O"}</option>`;
    }
    for (var i=0;i<myJson.length;i++) {
      opcoes += `<option value="${myJson[i].codigo}">${myJson[i].descricao}</option>`;
    }
    if (opcoes !="") {
      if (Array.isArray(idd)){
        idd.map((k)=>{
          document.getElementById(k).innerHTML = opcoes;
          //$(`#${k}`).html(opcoes);
        });
      } else {
        document.getElementById(idd).innerHTML = opcoes;
        //$(`#${idd}`).html(opcoes);
      }
    }
    allPromises[idd].resolve();
  } else {
    allPromises[dados.data].reject();
  }
  terminarWorker();
};

export const checkDate = (element) => {
  let tam = element.value.replaceAll(/\D/g,'');
  let aux;
  let regex;
  if (tam.length == 8){
    if (Number(tam.substr(2,4)) == 2){
      if (Number(tam.substr(-4)) % 4 == 0 && tam.substr(-2) != '00'){
        regex = /(0[1-9]|1\d|2\d)(0[1-9]|1[0-2])(19|20)d{2}/;
      } else{
        regex = /(0[1-9]|1\d|2[0-8])(0[1-9]|1[0-2])(19|20)d{2}/;
      }
    } else if ( (Number(tam.substr(2,4))%2==0) && Number(tam.substr(2,4)) < 7 || (Number(tam.substr(2,4))%2==1) && Number(tam.substr(2,4)) > 7){
      regex = /(0[1-9]|1\d|2\d|30)(0[1-9]|1[0-2])(19|20)d{2}/;
    } else{
      regex = /(0[1-9]|1\d|2\d|3[0-1])(0[1-9]|1[0-2])(19|20)d{2}/;
    }
  } else if (tam.length==6){
    regex = /(0[1-9]|1[0-2])(19|20)\d{2}/;
  }
  if (regex){
    aux = regex.test(tam);
  }
  if (tam.length==0){
    aux=true;
  }
  if (!aux){
    //console.log("Aten\u00E7\u00E3o, a data est\u00E1 incorreta!");
    element.value = "";
    //event.keyCode=0;
    return false;
  }
};


const iniciarWorker = () => {
  const carregarGeralX = new Worker(new URL('carregarWorker.js', import.meta.url));
  carregarGeralX.onmessage = (dados) => {
    // console.log(dados);
    //console.log(decrypt(dados.data.dados));
    if (dados.data.funcao != '' && dados.data.funcao != undefined && dados.data.funcao != null) {
      switch (dados.data.funcao) {
        case 'carregarCampoApoio':
          carregarCampoApoio(dados);
          break;
          /*
        case 'teste5555':
          teste5555(dados);
          break;
        case 'atualizarNotificacao':
          atualizarNotificacao(dados);
          break;
        case 'gravarTabsApoioIDB':
          gravarTabsApoioIDB(dados.data.dados, dados.data.returnId);
          break;
        case 'gravarTabsApoioIDB2':
          gravarTabsApoioIDB2(dados.data.dados, dados.data.returnId);
          break;
        case 'confVersion':
          confVersion(dados.data.dados, dados.data.returnId,dados.data);
          break;
          /** */
        default:
        window[dados.data.funcao](dados.data.jsonFile?dados.data.dados:decrypt(dados.data.dados),dados.data.returnId);
      }
    }
  };
  return carregarGeralX;
};
export const terminarWorker = () => {
  carregarGeral.terminate();
}
