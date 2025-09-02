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

export default function ModalPersonal({ onClose, isOpen, initialData, setFuncs }) {
  const toastIdentifier = `save-${Date.now()}`;
  const [cpf, handleCpfChange, cpfRef] = UseInputMask("999.999.999-99", "number", initialData.cpf);
  const [cep, handleCepChange, cepRef] = UseInputMask("99999-999", "number", initialData.cep);
  const [endereco, handleEnderecoChange, enderecoRef] = UseInputMask(null, "text", initialData.endereco);
  const [numero, handleNumeroChange, numeroRef] = UseInputMask(null, "number", initialData.numero);
  const [complemento, handleComplementoChange, complementoRef] = UseInputMask(null, "text", initialData.complemento);
  const [bairro, handleBairroChange, bairroRef] = UseInputMask(null, "text", initialData.bairro);
  const [uf, handleUfChange, ufRef] = UseInputMask(null, "text", initialData.uf);
  const [cidade, handleCidadeChange, cidadeRef] = UseInputMask(null, "text", initialData.cidade);
  const [isLoading, setIsLoading] = useState(false);
  
  const [cities, setCities] = useState([]);

  const { baselink, companyId, endpoints } = getBaseConfig();
  const [token] = useAtom(idAtom);
  const [idUsuario] = useAtom(loginAtom);
  
  const arrayCamposObrigatorios = [
    { valor: cpf, nome: "CPF" },
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
    
    if(initialData.cep != '' && initialData.cep.length >= 9){
      if(initialData.uf != '') ufRef.current.disabled = true;
      if(initialData.cidade != '') cidadeRef.current.disabled = true;
      if(initialData.endereco != '') enderecoRef.current.disabled = true;
      if(initialData.bairro != '') bairroRef.current.disabled = true;
    }
  }, [initialData]);

  const gravarAlteracao = () => {
    if(!validarCampos(arrayCamposObrigatorios)) return

    window.alteraDadosPessoaisRepresentante = alteraDadosPessoaisRepresentante

    try {
      const params = {
        cpf: cpf,
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

      carregarLinks('alteraDadosPessoaisRepresentante', `${baselink}${endpoints.alteraDadosPessoaisRepresentante}`, params, 'alteraDadosPessoaisRepresentante');
    } catch (error) {
      toastMessage(error.message || "Erro ao alterar dados", "error");
    } finally {
      setFuncs.setCpf(cpf);
      setFuncs.setCep(cep);
      setFuncs.setEndereco(endereco);
      setFuncs.setNumero(numero);
      setFuncs.setComplemento(complemento);
      setFuncs.setBairro(bairro);
      setFuncs.setCidade(cidade);
      setFuncs.setUf(uf);
      onClose();
    }
    return () => delete window.alteraDadosPessoaisRepresentante

  };

  const alteraDadosPessoaisRepresentante = (dados) => {
    const resp = JSON.parse(dados)
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
      if(cep.length > 0) toastMessage("CEP inválido. Digite um CEP completo.", "warning");
    } else{
      // Habilitar campos antes de buscar, caso a API falhe
      ufRef.current.disabled = false;
      cidadeRef.current.disabled = false;
      enderecoRef.current.disabled = false;
      bairroRef.current.disabled = false;
      cepAPI(cep, carregarEndereco);
    }
  }

  function carregarEndereco(dados){
    let resp = JSON.parse(dados);
    if(resp.length > 0){
      resp = resp[0];
      handleUfChange({ target: { value: resp.uf } });
      handleCidadeChange({ target: { value: resp.cidade } });
      handleEnderecoChange({ target: { value: resp.endereco } });
      handleBairroChange({ target: { value: resp.bairro } });
      
      // Desabilitar campos apenas se a API retornou dados válidos
      if(resp.uf != '') ufRef.current.disabled = true;
      if(resp.cidade != '') cidadeRef.current.disabled = true;
      if(resp.endereco != '') enderecoRef.current.disabled = true;
      if(resp.bairro != '') bairroRef.current.disabled = true;
    } else{
      limparCamposEndereco();
      toastMessage("CEP não encontrado. Preencha os dados manualmente.", "info");
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
          <div className={styles.modalHeaderLeft}>
            <h2 className={styles.modalTitle}>Informações Pessoais</h2>
          </div>
          <button className={styles.backButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.modalBody}>
          <form className={styles.modalForm}>
            <UseInputPadrao label="CPF" required identifier="cpf" type="text" value={cpf} onChange={handleCpfChange} inputRef={cpfRef}/>

                         <UseInputPadrao label="CEP" required identifier="cep" type="text" onBlur={buscarEndereco} value={cep} onChange={handleCepChange} inputRef={cepRef}/>

                           <UseInputPadrao 
                label="UF" 
                required 
                identifier="uf" 
                options={estadosArray} 
                type="select" 
                onChange={handleUfChange} 
                value={uf} 
                inputRef={ufRef}
                searchable={true}
                defaultSelect={false}
              />

                           <UseInputPadrao 
                label="Cidade" 
                required 
                identifier="cidade" 
                type="select" 
                value={cidade} 
                onChange={(e) => handleCityChange(e.target.value)} 
                inputRef={cidadeRef} 
                options={cities}
                searchable={true}
                defaultSelect={false}
              />

            <UseInputPadrao label="Endereço" required identifier="endereco" type="text" value={endereco} onChange={handleEnderecoChange} inputRef={enderecoRef}/>

            <UseInputPadrao label="Número" required identifier="numero" type="text" value={numero} onChange={handleNumeroChange} inputRef={numeroRef}/>

            <UseInputPadrao label="Complemento" identifier="complemento" type="text" value={complemento} onChange={handleComplementoChange} inputRef={complementoRef}/>
 
            <UseInputPadrao label="Bairro" required identifier="bairro" type="text" value={bairro} onChange={handleBairroChange} inputRef={bairroRef}/>
          </form>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.confirmButton} onClick={gravarAlteracao}>
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Salvar Alterações
                </>
              )}
          </button>
        </div>
      </div>
    </div>
  );
} 