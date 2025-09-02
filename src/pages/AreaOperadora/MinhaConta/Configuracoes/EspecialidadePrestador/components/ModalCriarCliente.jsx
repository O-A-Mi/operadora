import { useState, useEffect } from "react";
import styles from '../styles.module.css';
import { useAtom } from 'jotai';
import { UseInputPadrao, UseInputMask } from '../../../../../../components/InputPadrao/index.jsx';
import { getBaseConfig } from '../../../../../../utils/utilsConfig.js';
import toastMessage from '../../../../../../assets/toast-ui/toast.js';
import arrayEstadosComCidades from "../../../../../../utils/estados-com-cidades.js";
import { cepAPI, validarCPF, validarEmail, validarData, validarDataNasc, validarCelular } from "../../../../../../utils/functions.js";
import { useLoader } from '../../../../../../context' 

// fazer validação dos dados antes de passar (cpf, celular, dtNasc e garantir que todos os inputs tem informação) \src\pages\Adesao\AdesaoCadastro\components\CadastroForm.jsx
// apagar essas duas mensagens pós inserir Backend

const ModalCriarCliente = ({closeModal, setAtualizarDados}) => {
  const [tipoBenef, handleTipoBenefChange, tipoBenefRef] = UseInputMask();
  const [nome, handleNomeChange, nomeRef] = UseInputMask();
  const [listaSegurados, setListaSegurados] = useState([]);
  const [titular, handleTitularChange, titularRef] = UseInputMask();
  const [cpf, handleCpfChange, cpfRef] = UseInputMask("999.999.999-99", "number");
  const [genero, handleGeneroChange, generoRef] = UseInputMask();
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataVigencia, setDataVigencia] = useState("");
  const [nomeMae, handleNomeMaeChange, nomeMaeRef] = UseInputMask();
  const [parentesco, handleParentescoChange, parentescoRef] = UseInputMask();
  const [listaParentesco, setListaParentesco] = useState([]);
  const [cep, handleCepChange, cepRef] = UseInputMask("99999-999", "number");
  const [endereco, handleEnderecoChange, enderecoRef] = UseInputMask();
  const [numEndereco, handleNumEnderecoChange, numEnderecoRef] = UseInputMask();
  const [complemento, handleComplementoChange, complementoRef] = UseInputMask();
  const [bairro, handleBairroChange, bairroRef] = UseInputMask();
  const [listaCidades, setListaCidades] = useState([]);
  const [cidade, handleCidadeChange, cidadeRef] = UseInputMask();
  const [uf, handleUfChange, ufRef] = UseInputMask();
  const [email, handleEmailChange, emailRef] = UseInputMask();
  const [celular, handleCelularChange, celularRef] = UseInputMask("(99) 99999-9999", "number");

  const { baselink, companyId, endpoints } = getBaseConfig();
  const { showLoader, hideLoader } = useLoader();
  const [idUsuario] = useAtom(loginAtom);



  const tipoArray = [
    {value: "S", label: "Titular"},
    {value: "D", label: "Dependente"}
  ];

  const generoArray = [
    {value: "F", label: "Feminino"},
    {value: "M", label: "Masculino"}
  ];

  const estadosArray = arrayEstadosComCidades.map((estado) => ({
    label: estado.nomeEstado,
    value: estado.sigla,
    id: estado.id
  }));

 

  function carregarSegurados(dados){
    let resp = JSON.parse(dados);
    let arraySegurados = [];
    resp.map(item => {
      arraySegurados.push({value: item.token, label: item.nome});
      if(resp.length == 1){
        handleTitularChange({ target: { value: item.token } });
      }
    })
    setListaSegurados(arraySegurados);
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
        setListaCidades(cidades);
      }
    } else {
      setListaCidades([]);
    }
  }, [uf]);

  useEffect(() => {
    if(tipoBenef == 'S') {
      handleTitularChange({ target: { value: '' } });
      handleParentescoChange({ target: { value: '' } });
    } else{
      if(listaSegurados.length == 2){
        handleTitularChange({ target: { value: listaSegurados[1].value } });
      }
      if(listaParentesco.length == 2){
        handleParentescoChange({ target: { value: listaParentesco[1].value } });
      }
    }
  }, [tipoBenef]);

  function checkValidaCPF() {
    if(cpf.length > 0){
      if(!validarCPF(cpf)){
        handleCpfChange({ target: { value: '' } });
        toastMessage("CPF inválido.", "warning");
      }
    }
  }

  function checkValidaDataVigencia() {
    if(dataVigencia.length == 10){
      let dataF = `${dataVigencia.split('-')[2]}/${dataVigencia.split('-')[1]}/${dataVigencia.split('-')[0]}`;
      if(!validarData(dataF)){
        setDataVigencia('');
        toastMessage("Data de Vigência inválida.", "warning");
      }
    } else{
      setDataVigencia('');
      toastMessage("Data de Vigência inválida.", "warning");
    }
  }

  function checkValidaDataNasc() {
    if(dataNascimento.length == 10){
      let dataF = `${dataNascimento.split('-')[2]}/${dataNascimento.split('-')[1]}/${dataNascimento.split('-')[0]}`;
      if(!validarDataNasc(dataF)){
        setDataNascimento('');
        toastMessage("Data de Nascimento inválida.", "warning");
      }
    } else{
      setDataNascimento('');
      toastMessage("Data de Nascimento inválida.", "warning");
    }
  }

  function checkValidaEmail() {
    if(email.length > 0){
      if(!validarEmail(email)){
        handleEmailChange({ target: { value: '' } });
        toastMessage("E-mail inválido.", "warning");
      }
    }
  }

  function checkValidaCelular() {
    if(celular.length > 0){
      if(!validarCelular(celular)){
        handleCelularChange({ target: { value: '' } });
        toastMessage("Celular inválido.", "warning");
      }
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
    handleNumEnderecoChange({ target: { value: '' } });
    handleComplementoChange({ target: { value: '' } });
    handleBairroChange({ target: { value: '' } });
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
      toastMessage("CEP não encontrado.", "warning");
    }
  }

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Cadastro de Beneficiários</h2>
            <button className={styles.backButton} onClick={() => closeModal()}><i className="fas fa-times"></i></button>
          </div>
          <div className={styles.modalBody}>
            <form className={styles.modalForm}>
              <UseInputPadrao type='select' options={tipoArray} label="Tipo de Beneficiário" identifier="tipo_benef" value={tipoBenef} onChange={handleTipoBenefChange} inputRef={tipoBenefRef} icon="fas fa-user-group" required />
              {tipoBenef != '' && <>
                <UseInputPadrao type='date' label="Data de Vigência" identifier="data-vigencia" value={dataVigencia} onBlur={checkValidaDataVigencia} onChange={(e) => setDataVigencia(e.target.value)} icon="fas fa-calendar-circle-plus" required />
                {tipoBenef == 'D' && <UseInputPadrao  type='select' options={listaSegurados} label="Nome do Titular" identifier="titular" value={titular} onChange={handleTitularChange} inputRef={titularRef} icon="fas fa-people-arrows" required  />}
                <UseInputPadrao label="Nome Completo" identifier="nome" value={nome} onChange={handleNomeChange} inputRef={nomeRef} icon="fas fa-user" required />
                <UseInputPadrao type='date' label="Data de Nascimento" identifier="data-nascimento" value={dataNascimento} onBlur={checkValidaDataNasc} onChange={(e) => setDataNascimento(e.target.value)} required />
                <UseInputPadrao type='select' options={generoArray} label="Gênero" identifier="genero" value={genero} onChange={handleGeneroChange} inputRef={generoRef} icon="fas fa-venus-mars" required />
                <UseInputPadrao label="CPF" identifier="cpf" value={cpf} onChange={handleCpfChange} onBlur={checkValidaCPF} inputRef={cpfRef} icon="fas fa-id-card" required />
                <UseInputPadrao label="Nome da Mãe" identifier="nome_mae" value={nomeMae} onChange={handleNomeMaeChange} inputRef={nomeMaeRef} icon="fas fa-person-dress" required />
                {tipoBenef == 'D' && <UseInputPadrao type='select' options={listaParentesco} label="Parentesco" identifier="parentesco" value={parentesco} onChange={handleParentescoChange} inputRef={parentescoRef} icon="fas fa-family" required />}
                <UseInputPadrao label="E-mail" identifier="email" value={email} onChange={handleEmailChange} onBlur={checkValidaEmail} inputRef={emailRef} type="email" required />
                <UseInputPadrao label="Celular" identifier="celular" value={celular} onChange={handleCelularChange} onBlur={checkValidaCelular} inputRef={celularRef} type="tel" required />
                <UseInputPadrao label="CEP" identifier="cep" value={cep} onChange={handleCepChange} onBlur={buscarEndereco} inputRef={cepRef}  icon="fas fa-address-book" required />
                <UseInputPadrao type='select' options={estadosArray} label="UF" identifier="uf" value={uf} onChange={handleUfChange} inputRef={ufRef}  icon="fas fa-flag" required />
                <UseInputPadrao type='select' options={listaCidades} label="Cidade" identifier="cidade" value={cidade} onChange={handleCidadeChange} inputRef={cidadeRef} icon="fas fa-city" required />
                <UseInputPadrao label="Endereço" identifier="endereco" value={endereco} onChange={handleEnderecoChange} inputRef={enderecoRef} icon="fas fa-address-card" required />
                <UseInputPadrao label="Número" identifier="num_endereco" value={numEndereco} onChange={handleNumEnderecoChange} inputRef={numEnderecoRef} icon="fas fa-map-location-dot" required />
                <UseInputPadrao label="Complemento" identifier="complemento" value={complemento} onChange={handleComplementoChange} inputRef={complementoRef} icon="fas fa-house-building" required={false} />
                <UseInputPadrao label="Bairro" identifier="bairro" value={bairro} onChange={handleBairroChange} inputRef={bairroRef} icon="fas fa-signs-post" required />
              </>}
            </form>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.confirmButton} onClick={() => criarBeneficiario()}>Salvar Alterações</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalCriarCliente
