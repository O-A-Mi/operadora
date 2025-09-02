import { StepperPadrao, TogglePadrao, TabelaPadrao } from "../../../../../../../components/index.jsx";
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { UseInputPadrao, InputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao/index.jsx'



function Contratante() {
    const [dataSolicitacaoProposta, setDataSolicitacaoProposta, refDataSolicitacaoProposta] = UseInputMask();

    const [cnpj, setCnpj, refCnpj] = UseInputMask("99.999.999/9999-99");
    const [razaoSocial, setRazaoSocial, refRazaoSocial] = UseInputMask();
    const [nomeFantasia, setNomeFantasia, refNomeFantasia] = UseInputMask();

    const [cepFiscal, setCepFiscal, refCepFiscal] = UseInputMask();
    const [enderecoFiscal, setEnderecoFiscal, refEnderecoFiscal] = UseInputMask();
    const [numeroFiscal, setNumeroFiscal, refNumeroFiscal] = UseInputMask();
    const [complementoFiscal, setComplementoFiscal, refComplementoFiscal] = UseInputMask();
    const [bairroFiscal, setBairroFiscal, refBairroFiscal] = UseInputMask();
    const [cidadeFiscal, setCidadeFiscal, refCidadeFiscal] = UseInputMask();
    const [ufFiscal, setUfFiscal, refUfFiscal] = UseInputMask();

    const [repetirEndereco, setRepetirEndereco] = useState(true); //Toggle
    const [cepCorrespondencia, setCepCorrespondencia, refCepCorrespondencia] = UseInputMask();
    const [enderecoCorrespondencia, setEnderecoCorrespondencia, refEnderecoCorrespondencia] = UseInputMask();
    const [numeroCorrespondencia, setNumeroCorrespondencia, refNumeroCorrespondencia] = UseInputMask();
    const [complementoCorrespondencia, setComplementoCorrespondencia, refComplementoCorrespondencia] = UseInputMask();
    const [bairroCorrespondencia, setBairroCorrespondencia, refBairroCorrespondencia] = UseInputMask();
    const [cidadeCorrespondencia, setCidadeCorrespondencia, refCidadeCorrespondencia] = UseInputMask();
    const [ufCorrespondencia, setUfCorrespondencia, refUfCorrespondencia] = UseInputMask();

    const [cpfRepresentante, setCpfRepresentante, refCpfRepresentante] = UseInputMask();
    const [nomeRepresentante, setNomeRepresentante, refNomeRepresentante] = UseInputMask();
    const [emailRepresentante, setEmailRepresentante, refEmailRepresentante] = UseInputMask();
    const [confirmacaoEmail, setConfirmacaoEmail, refConfirmacaoEmail] = UseInputMask();
    const [telefoneRepresentante, setTelefoneRepresentante, refTelefoneRepresentante] = UseInputMask();
    const [celularRepresentante, setCelularRepresentante, refCelularRepresentante] = UseInputMask();

    const [tipoDocumento, setTipoDocumento, refTipoDocumento] = UseInputMask();
    const [documento, setDocumento] = useState(true);
    const [anexo, anexoChange, anexoRef] = UseInputMask();

    return (
        <>
        <div className={styles.MainContent}>
                <div className={styles.HeaderCamp}>
                        <h1 className={styles.Header}>
                            <i className="fas fa-users"></i>
                            Contratante
                        </h1>
                        <p className={styles.subHeader}>
                            <i className="fa-solid fa-info-circle"></i>
                            Selecione o plano e preencha as faixas etárias para simular os valores.
                        </p>
                    </div>
            <div className={styles.vendaClienteContainer}>
                <div className={styles.vendaClienteContent}>
                    <p className={styles.vendaClienteDescriptionTela}>
                        <i className="fas fa-file-signature"></i>
                        Assinatura
                    </p>
                </div>
                <div className={styles.vendaClienteContentBorder}>
                    <UseInputPadrao
                        label="Data de Solicitação da Proposta"
                        type='date'
                        value={dataSolicitacaoProposta}
                        onChange={setDataSolicitacaoProposta}
                        inputRef={refDataSolicitacaoProposta}
                        required={true}
                    />
                </div>

                <div className={styles.vendaClienteContent}>
                    <p className={styles.vendaClienteDescriptionTela}>
                        <i className="fas fa-building"></i>
                        Dados da empresa contratante
                    </p>
                </div>
                <div className={styles.vendaClienteContent}>
                    <UseInputPadrao 
                        label="CNPJ" 
                        type='cnpj' 
                        value={cnpj} 
                        onChange={setCnpj} 
                        inputRef={refCnpj} 
                        placeholder="00.000.000/0000-00" 
                        required={true} 
                    />
                </div>
                <div className={styles.vendaClienteContentBorder}>
                    <UseInputPadrao 
                        label="Razão Social" 
                        type='text' 
                        value={razaoSocial} 
                        onChange={setRazaoSocial} 
                        inputRef={refRazaoSocial}
                        placeholder="Digite a razão social" 
                        required={true} 
                    />
                    <UseInputPadrao 
                        label="Nome Fantasia" 
                        type='text' 
                        value={nomeFantasia} 
                        onChange={setNomeFantasia} 
                        inputRef={refNomeFantasia} 
                        placeholder="Digite o nome fantasia" 
                        required={true} 
                    />
                </div>

                <div className={styles.vendaClienteContent}>
                    <p className={styles.vendaClienteDescriptionTela}>
                        <i className="fas fa-map-marked-alt"></i>
                        Endereço fiscal
                    </p>
                </div>
                <div className={styles.vendaClienteContent}>
                    <UseInputPadrao 
                        label="CEP" 
                        type='text' 
                        value={cepFiscal} 
                        onChange={setCepFiscal} 
                        inputRef={refCepFiscal} 
                        placeholder="00000-000" 
                        required={true} 
                    />
                    <UseInputPadrao 
                        label="Endereço" 
                        type='text' 
                        value={enderecoFiscal} 
                        onChange={setEnderecoFiscal} 
                        inputRef={refEnderecoFiscal} 
                        placeholder="Av. Paulista" 
                        required={true} 
                    />
                    <UseInputPadrao 
                        label="Número" 
                        type='text' 
                        value={numeroFiscal} 
                        onChange={setNumeroFiscal} 
                        inputRef={refNumeroFiscal} 
                        placeholder="123" 
                        required={true} 
                    />
                </div>
                <div className={styles.vendaClienteContent}>
                    <UseInputPadrao 
                        label="Complemento" 
                        type='text' 
                        value={complementoFiscal} 
                        onChange={setComplementoFiscal} 
                        inputRef={refComplementoFiscal} 
                        placeholder="Apto 101" 
                        required={false} 
                    />
                    <UseInputPadrao 
                        label="Bairro" 
                        type='text' 
                        value={bairroFiscal} 
                        onChange={setBairroFiscal} 
                        inputRef={refBairroFiscal} 
                        placeholder="Bela Vista" 
                        required={true} 
                    />
                    <UseInputPadrao 
                        label="Cidade" 
                        type='text' 
                        value={cidadeFiscal} 
                        onChange={setCidadeFiscal} 
                        inputRef={refCidadeFiscal}
                        placeholder="São Paulo"
                        required={true} 
                    />
                </div>
                <div className={styles.vendaClienteContentBorder}>
                    <UseInputPadrao 
                        label="UF" 
                        type='text' 
                        value={ufFiscal} 
                        onChange={setUfFiscal} 
                        inputRef={refUfFiscal} 
                        placeholder="SP" 
                        required={true} 
                    />
                    <div className={styles.ToggleContainer}>
                    <TogglePadrao
                        label='Repetir para "Endereço para correspondência"'
                        checked={repetirEndereco}
                        onChange={() => setRepetirEndereco(!repetirEndereco)}
                        />
                    </div>
                </div>

                {repetirEndereco && (
                    <>
                        <div className={styles.vendaClienteContent}>
                            <p className={styles.vendaClienteDescriptionTela}>
                                <i className="fas fa-envelope-open-text"></i>
                                Endereço para correspondência
                            </p>
                        </div>
                        <div className={styles.vendaClienteContent}>
                            <UseInputPadrao 
                                label="CEP" 
                                type='text' 
                                value={cepCorrespondencia} 
                                onChange={setCepCorrespondencia} 
                                inputRef={refCepCorrespondencia} 
                                placeholder="00000-000" 
                                required={true} 
                            />
                            <UseInputPadrao 
                                label="Endereço" 
                                type='text' 
                                value={enderecoCorrespondencia} 
                                onChange={setEnderecoCorrespondencia} 
                                inputRef={refEnderecoCorrespondencia} 
                                placeholder="Av. Faria Lima" 
                                required={true} 
                            />
                            <UseInputPadrao
                                label="Número"
                                type='text'
                                value={numeroCorrespondencia} 
                                onChange={setNumeroCorrespondencia} 
                                inputRef={refNumeroCorrespondencia} 
                                placeholder="456" 
                                required={true} 
                            />
                        </div>
                        <div className={styles.vendaClienteContentBorder}>
                            <UseInputPadrao 
                                label="Complemento"
                                type='text' 
                                value={complementoCorrespondencia}
                                onChange={setComplementoCorrespondencia} 
                                inputRef={refComplementoCorrespondencia} 
                                placeholder="Sala 202" 
                                required={false} 
                            />
                            <UseInputPadrao 
                                label="Bairro" 
                                type='text' 
                                value={bairroCorrespondencia}
                                onChange={setBairroCorrespondencia} 
                                inputRef={refBairroCorrespondencia} 
                                placeholder="Pinheiros" 
                                required={true} 
                            />
                            <UseInputPadrao 
                                label="Cidade" 
                                type='text' 
                                value={cidadeCorrespondencia} 
                                onChange={setCidadeCorrespondencia} 
                                inputRef={refCidadeCorrespondencia} 
                                placeholder="São Paulo" 
                                required={true} 
                            />
                            <UseInputPadrao 
                                label="UF" 
                                type='text' 
                                value={ufCorrespondencia} 
                                onChange={setUfCorrespondencia}
                                inputRef={refUfCorrespondencia} 
                                placeholder="SP" 
                                required={true} 
                            />
                        </div>
                    </>
                )}

                <div className={styles.vendaClienteContent}>
                    <p className={styles.vendaClienteDescriptionTela}>
                        <i className="fas fa-user-tie"></i>
                        Representante legal
                    </p>
                </div>
                <div className={styles.vendaClienteContent}>
                    <UseInputPadrao 
                        label="CPF" 
                        type='text' 
                        value={cpfRepresentante} 
                        onChange={setCpfRepresentante} 
                        inputRef={refCpfRepresentante} 
                        placeholder="000.000.000-00" 
                        required={true} 
                    />
                    <UseInputPadrao
                        label="Nome"
                        type='text' 
                        value={nomeRepresentante} 
                        onChange={setNomeRepresentante} 
                        inputRef={refNomeRepresentante} 
                        placeholder="Nome completo do representante" 
                        required={true} 
                     />
                </div>
                <div className={styles.vendaClienteContent}>
                    <UseInputPadrao 
                        label="E-mail" 
                        type='email' 
                        value={emailRepresentante} 
                        onChange={setEmailRepresentante} 
                        inputRef={refEmailRepresentante} 
                        placeholder="contato@empresa.com" 
                        required={true} 
                    />
                    <UseInputPadrao 
                        label="Confirmação de E-mail" 
                        type='email' 
                        value={confirmacaoEmail} 
                        onChange={setConfirmacaoEmail} 
                        inputRef={refConfirmacaoEmail} 
                        placeholder="Confirme o e-mail" 
                        required={true} 
                    />
                </div>
                <div className={styles.vendaClienteContent}>
                    <UseInputPadrao 
                        label="Telefone" 
                        type='tel' 
                        value={telefoneRepresentante} 
                        onChange={setTelefoneRepresentante} 
                        inputRef={refTelefoneRepresentante} 
                        placeholder="(11) 4004-0000" 
                        required={false} 
                    />

                    <UseInputPadrao 
                        label="Celular" 
                        type='tel' 
                        value={celularRepresentante} 
                        onChange={setCelularRepresentante} 
                        inputRef={refCelularRepresentante} 
                        placeholder="(11) 99999-9999" 
                        required={true} 
                    />
                </div>

                <div className={styles.vendaClienteContent}>
                    <p className={styles.vendaClienteDescriptionTela}>
                        <i className="fas fa-folder-open"></i>
                        Documentação
                    </p>
                </div>
                <div className={styles.vendaClienteContentEnd}>
                    <UseInputPadrao
                        label="Tipo de Documento"
                        type="select"
                        value={tipoDocumento}
                        onChange={setTipoDocumento}
                        options={[
                            { label: "Plano Mensal", value: "1" },
                            { label: "Plano Anual", value: "2" },
                        ]}
                    />
                    <InputPadrao
                        inputStyle={{ height: '35px' }}
                        label="Anexo" 
                        type="file" 
                        identifier="anexo" 
                        value={anexo} 
                        onChange={anexoChange} 
                        inputRef={anexoRef} 
                        />
                </div>
            </div>
        </div>
    </>
    )
}


export default Contratante;