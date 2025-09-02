let subport;
let k;
let iv;//?
self.onmessage = (mensagem)=>{
  if (mensagem.data.k != undefined && mensagem.data.k != null){
    k = mensagem.data.k;
    iv = mensagem.data.iv;
  } else if (mensagem.data.port != undefined && mensagem.data.port != null){
    if (subport != undefined && subport != null){
      subport.close();
    }
    subport = mensagem.data.port;
    subport.onmessage = (mensagem)=>{
      if (mensagem.data.url != undefined && mensagem.data.url != null){
        pesquisarArquivo(mensagem.data.url, mensagem.data.returnId, subport, mensagem.data.param, mensagem.data.returnMulti, mensagem.data.returnTodos, mensagem.data.callBack, mensagem.data.dataForm, mensagem.data.isFile);
      }
    };
  } else {
    if (mensagem.data.url != undefined && mensagem.data.url != null){
      if (mensagem.data.url.includes("carregarGenericoCripto")){
        pesquisaCriptografia(mensagem.data.url, mensagem.data.returnId, mensagem.data.param, mensagem.data.returnMulti, mensagem.data.returnTodos, mensagem.data.callBack, mensagem.data.dataForm);
      } else {
        pesquisarArquivo(mensagem.data.url, mensagem.data.returnId, mensagem.data.param, mensagem.data.returnMulti, mensagem.data.returnTodos, mensagem.data.callBack, mensagem.data.dataForm, mensagem.data.jsonFile,mensagem.data.isFile);
      }
    }
  }
};

const pesquisarArquivo = (url, id, param, multi = false, returnTodos=true, callBack='', dataForm=true, jsonFile =false, isFile=false) =>{
  let body = dataForm?new URLSearchParams(param):param;
  if(isFile){
    const blob = new Blob([dataForm], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('params',param)
    body = formData
  }
  let kukoTeste = '';
  const myRequest = new Request(url, {method: 'POST', body: body});
  fetch(myRequest).then(function (response) {
    if (!response.ok) {
      return Promise.reject(response);
    } else {
      if (url.substr(-2)=="gz") {
        return (new Response(response.body.pipeThrough(new DecompressionStream('gzip')), { headers: { "Content-Type": "application/json" } })).arrayBuffer();
      } else {
        kukoTeste = 'normal';
        return response.arrayBuffer();
      }
    }
  }).then(function (buffer) {
    kukoTeste = 'normal 2';
    const decoder = new TextDecoder("ansi_x3.4-1968");
    const decoder2 = new TextDecoder("UTF-8");
    kukoTeste = 'normal 3';
    const text = url.substr(-2)=="gz"?decoder2.decode(buffer):decoder.decode(buffer);
    if (url.includes("carregarGenericoCripto")){
      decryptData(base64URLtoArrayBuffer(text), id, multi, returnTodos, callBack);
    } else {
      //const data =  JSON.parse(text);
      if (subport != undefined && subport != null){
        subport.postMessage({dados:text,returnId:id, returnMulti:multi, returnTodos:returnTodos, funcao:callBack});
      } else {
        postMessage({dados:text,returnId:id, returnMulti:multi, returnTodos:returnTodos, funcao:callBack, jsonFile:url.substr(-2)=="gz", args:url});
      }
    }
  }).catch(error => {
    if (error.status === 404) {
      if (subport) {
        subport.postMessage(`Status:${error.status} - URL não encontrada...`);
      } else {
        postMessage(`Status:${error.status} - URL não encontrada...`);
      }
    } else {
      if (subport) {
        subport.postMessage(`Status:${error.status} - Erro`);
      } else {
        postMessage(`Status:${error} - Erro ${kukoTeste}`);
      }
    }
  });
};
const base64URLtoArrayBuffer = (base64) => {
  const base64Encoded = base64.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  let binaryString = atob(String(base64Encoded+padding));
  let bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
  /** */
}
const decryptData = (encryptedData, id, multi, returnTodos, callBack) => {
  if (!k || !iv) {
    throw new Error("Key or IV not set");
  }
  crypto.subtle.importKey("raw",base64URLtoArrayBuffer(k),"AES-CBC",false,["encrypt", "decrypt"]).then( async function(importedKey){
    crypto.subtle.decrypt({name: "AES-CBC",iv: base64URLtoArrayBuffer(iv)},importedKey,encryptedData).then(function(decrypted){
      let decoder = new TextDecoder("utf-8");
      let decryptedString = decoder.decode(decrypted);
      let data = JSON.parse(decryptedString);
      if (subport != undefined && subport != null){
        subport.postMessage({dados:data,returnId:id, returnMulti:multi, returnTodos:returnTodos, funcao:callBack});
      } else {
        postMessage({dados:data,returnId:id, returnMulti:multi, returnTodos:returnTodos, funcao:callBack});
      }
    });
  });
};
const encryptData = (encryptedData, id, callBack) => {
  if (!k || !iv) {
    throw new Error("Key or IV not set");
  }
  crypto.subtle.importKey("raw",base64URLtoArrayBuffer(k),"AES-CBC",false,["encrypt", "decrypt"]).then( async function(importedKey){
    crypto.subtle.encrypt({name: "AES-CBC",iv: base64URLtoArrayBuffer(iv)},importedKey,new TextEncoder().encode(JSON.stringify(encryptedData)).buffer).then(function(encrypted){
      const data = btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted))).replace(/\+/g, '-').replace(/\//g, '_');
      if (subport != undefined && subport != null){
        subport.postMessage({dados:data,returnId:id, funcao:callBack});
      } else {
        postMessage({dados:data,returnId:id, funcao:callBack});
      }
    });
  });
};
const pesquisaCriptografia = (url, id, param, multi = false, returnTodos=true, callBack='') =>{
  if (!k || !iv) {
    throw new Error("Key or IV not set");
  }
  crypto.subtle.importKey("raw",base64URLtoArrayBuffer(k),"AES-CBC",false,["encrypt", "decrypt"]).then( async function(importedKey){
    crypto.subtle.encrypt({name: "AES-CBC",iv: base64URLtoArrayBuffer(iv)},importedKey,new TextEncoder().encode(JSON.stringify(param)).buffer).then(function(encrypted){
      const body = btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted))).replace(/\+/g, '-').replace(/\//g, '_');
      const myRequest = new Request("../"+url, {method: 'POST', body: body.toString()});
      fetch(myRequest).then(function (response) {
        if (!response.ok) {
          return Promise.reject(response);
        } else {
          if (url.substr(-2)=="gz") {
            let kuko = response.body.pipeThrough(new DecompressionStream('gzip'));
            return (new Response(kuko, { headers: { "Content-Type": "application/json" } })).arrayBuffer();
          } else {
            return response.arrayBuffer();
          }
        }
      }).then(function (buffer) {
        const decoder = new TextDecoder("ansi_x3.4-1968");
        const decoder2 = new TextDecoder("UTF-8");
        const text = url.substr(-2)=="gz"?decoder2.decode(buffer):decoder.decode(buffer);
        if (url.includes("carregarGenericoCripto")){
          decryptData(base64URLtoArrayBuffer(text), id, multi, returnTodos, callBack);
        } else {
          const data =  JSON.parse(text);
          if (subport != undefined && subport != null){
            subport.postMessage({dados:data,returnId:id, returnMulti:multi, returnTodos:returnTodos, funcao:callBack});
          } else {
            postMessage({dados:data,returnId:id, returnMulti:multi, returnTodos:returnTodos, funcao:callBack});
          }
        }
      }).catch(error => {
        if (error.status === 404) {
          if (subport) {
            subport.postMessage(`Status:${error.status} - URL não encontrada...`);
          } else {
            postMessage(`Status:${error.status} - URL não encontrada...`);
          }
        } else {
          if (subport) {
            subport.postMessage(`Status:${error.status} - Erro`);
          } else {
            postMessage(`Status:${error} - Erro`);
          }
        }
      });
    });
  });
};