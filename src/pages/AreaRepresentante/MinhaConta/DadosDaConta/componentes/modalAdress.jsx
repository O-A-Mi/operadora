/* eslint-disable react/prop-types */
import styles from "../styles.module.css";
import toastMessage from "../../../../../assets/toast-ui/toast";
import dialogMessage from "../../../../../assets/dialog-ui/dialog";
import { carregarLinks } from "../../../../../db/carregarGeral.jsx";
import { UseInputMask, UseInputPadrao } from '../../../../../components/InputPadrao';
import { idAtom, loginAtom } from "../../../../../context/jotai";
import { getBaseConfig } from "../../../../../utils/utilsConfig";
import { useAtom } from "jotai";
import { useState, useEffect } from 'react';
import arrayEstadosComCidades from "../../../../../utils/estados-com-cidades.js";
import { cepAPI, validarCampos } from "../../../../../utils/functions.js";

export default function ModalAdressRepresentante({onClose, isOpen, initialData, setFuncs}) {
  const toastIdentifier = `save-${Date.now()}`;
  const [cep, handleCepChange, cepRef] = UseInputMask( "99999-999", "number", initialData.cep);
  const [endereco, handleEnderecoChange, enderecoRef] = UseInputMask( null, "text", initialData.endereco);
  const [numero, handleNumeroChange, numeroRef] = UseInputMask( null, "number", initialData.numero);
  const [complemento, handleComplementoChange, complementoRef] = UseInputMask( null, "text", initialData.complemento);
  const [bairro, handleBairroChange, bairroRef] = UseInputMask( null, "text", initialData.bairro);
  const [uf, handleUfChange, ufRef] = UseInputMask( null, "text", initialData.uf);
  const [cidade, handleCidadeChange, cidadeRef] = UseInputMask( null, "text", initialData.cidade);
  const [isLoading, setIsLoading] = useState(false);
  
  const [cities, setCities] = useState([]);

  const { baselink, companyId, endpoints } = getBaseConfig();
  const [token] = useAtom(idAtom);
  const [idUsuario] = useAtom(loginAtom);
  
  // Array para validar todos os campos
  const arrayCamposObrigatorios = [
    { valor: cep, nome: "CEP" },
    { valor: uf, nome: "UF" },
    { valor: cidade, nome: "Cidade" },
    { valor: endereco, nome: "Endereço" },
    { valor: numero, nome: "Número" },
    { valor: bairro, nome: "Bairro" },
  ];

  const estadosArray = arrayEstadosComCidades.map((estado) => ({
      label: estado.nomeEstado,
      value: estado.sigla,
      id: estado.id
    }));

  useEffect(() => {
    if (initialData.uf) {
      const estadoInicial = arrayEstadosComCidades.find(e => e.sigla === initialData.uf);
      if (estadoInicial) {
        const cidades = estadoInicial.cidades.map(c => ({
          label: c.nomeCidade,
          value: c.nomeCidade,
          id: c.id_cidade
        }));
        setCities(cidades);

        if (initialData.cidade) {
          const cidadeInicialLower = initialData.cidade.toLowerCase();
          const cidadeCorrespondente = cidades.find(c => c.value.toLowerCase() === cidadeInicialLower);

          if (cidadeCorrespondente) {
            handleCidadeChange({ target: { value: cidadeCorrespondente.value } });
          }
        }
      }
    }
    if(initialData.cep != ''){
      if(initialData.uf != '') ufRef.current.disabled = true;
      if(initialData.cidade != '') cidadeRef.current.disabled = true;
      if(initialData.endereco != '') enderecoRef.current.disabled = true;
      if(initialData.bairro != '') bairroRef.current.disabled = true;
    }
  }, [initialData]);

  const gravarAlteracao = () => {
    if(!validarCampos(arrayCamposObrigatorios)) return

    window.alteraEnderecoRepresentante = alteraEnderecoRepresentante

    try {
      const params = {
        cep: cep,
        endereco: endereco,
        complemento: complemento, 
        numero: numero,
        uf: uf,
        cidade: cidade,
        bairro: bairro,
        token: token,
        id_usuario: idUsuario,
        cd_empresa: companyId
      };

      carregarLinks('alteraEnderecoRepresentante', `${baselink}${endpoints.alteraEnderecoRepresentante}`, params, 'alteraEnderecoRepresentante');
    } catch (error) {
      toastMessage(error.message || "Erro ao alterar dados", "error");
    } finally {
      setFuncs.setCep(cep);
      setFuncs.setEndereco(endereco);
      setFuncs.setNumero(numero);
      setFuncs.setComplemento(complemento);
      setFuncs.setBairro(bairro);
      setFuncs.setCidade(cidade);
      setFuncs.setUf(uf);
      onClose();
    }
    return () => delete window.alteraEnderecoRepresentante

  };

  const alteraEnderecoRepresentante = (dados) => {
    const resp = JSON.parse(dados)
    //toastMessage("", "", { loading: { id: toastIdentifier, complete: true }, timeOut: 0});
    if(resp.status === 200){
      dialogMessage("Dados gravados com sucesso!", "success", {
        loading: { id: toastIdentifier, complete: true },
        confirmButton: false,
      });
    } else {
      toastMessage(resp.mensagem || "Erro ao alterar dados", "error",{
        loading: { id: toastIdentifier, complete: true },
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (uf) {
      const estadoSelecionado = arrayEstadosComCidades.find(e => e.sigla === uf);
      if (estadoSelecionado) {
        const cidades = estadoSelecionado.cidades.map(cidade => ({
          label: cidade.nomeCidade,
          value: cidade.nomeCidade,
          id: cidade.id_cidade
        }));
        setCities(cidades);
        //handleCidadeChange({ target: { value: '' } });
      }
    } else {
      setCities([]);
    }
  }, [uf]);

  const handleCityChange = (selectedOption) => {
    handleCidadeChange({ target: { value: selectedOption } });
  };

  function buscarEndereco(){
    if(cep.length < 9){
      limparCamposEndereco();
      if(cep.length > 0) toastMessage("CEP inválido.", "warning");
    } else{
      cepAPI(cep, carregarEndereco);
    }
  }

  function carregarEndereco(dados){
    let resp = JSON.parse(dados);
    if(resp.length > 0){
      resp = resp[0];
      handleUfChange({ target: { value: resp.uf } });
      if(resp.uf != '') ufRef.current.disabled = true;
      handleCidadeChange({ target: { value: resp.cidade } });
      if(resp.cidade != '') cidadeRef.current.disabled = true;
      handleEnderecoChange({ target: { value: resp.endereco } });
      if(resp.endereco != '') enderecoRef.current.disabled = true;
      handleBairroChange({ target: { value: resp.bairro } });
      if(resp.bairro != '') bairroRef.current.disabled = true;
    } else{
      limparCamposEndereco();
      toastMessage("CEP não encontrado.", "info");
    }
  }

  const limparCamposEndereco = () => {
    ufRef.current.disabled = false;
    cidadeRef.current.disabled = false;
    enderecoRef.current.disabled = false;
    bairroRef.current.disabled = false;
    handleCepChange({ target: { value: '' } });
    handleUfChange({ target: { value: '' } });
    handleCidadeChange({ target: { value: '' } });
    handleEnderecoChange({ target: { value: '' } });
    handleNumeroChange({ target: { value: '' } });
    handleComplementoChange({ target: { value: '' } });
    handleBairroChange({ target: { value: '' } });
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Endereço</h2>
          <button className={styles.backButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.modalForm}>
            <UseInputPadrao label="CEP" required identifier="cep" type="text" onBlur={buscarEndereco} value={cep} onChange={handleCepChange} inputRef={cepRef}/>

            <UseInputPadrao label="UF" required identifier="uf" options={estadosArray} type="select" onChange={handleUfChange} value={uf} inputRef={ufRef}/>

            <UseInputPadrao label="Cidade" required identifier="cidade" type="select" value={cidade} onChange={(e) => handleCityChange(e.target.value)} inputRef={cidadeRef} options={cities}/>

            <UseInputPadrao label="Endereço" required identifier="endereco" type="text" value={endereco} onChange={handleEnderecoChange} inputRef={enderecoRef}/>

            <UseInputPadrao label="Número" required identifier="numero"  type="text" value={numero} onChange={handleNumeroChange} inputRef={numeroRef}/>

            <UseInputPadrao label="Complemento" identifier="complemento" type="text" value={complemento} onChange={handleComplementoChange} inputRef={complementoRef}/>
 
            <UseInputPadrao label="Bairro" required identifier="bairro" type="text" value={bairro} onChange={handleBairroChange} inputRef={bairroRef}/>
          </form>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.confirmButton} onClick={gravarAlteracao}>
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Salvar Alterações"
              )}
          </button>
        </div>
      </div>
    </div>
  );
}