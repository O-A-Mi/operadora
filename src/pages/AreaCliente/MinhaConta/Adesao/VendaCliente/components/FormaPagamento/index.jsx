import React, { useState } from "react";
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao/index.jsx';
import CardResumoModal from './ModalDados/index.jsx';

function FormaPagamento() {
    const [formaPagamento, setFormaPagamento, refFormaPagamento] = UseInputMask();
    const [nomeCartao, setNomeCartao, refNomeCartao] = UseInputMask();
    const [numeroCartao, setNumeroCartao, refNumeroCartao] = UseInputMask();
    const [validadeCartao, setValidadeCartao, refValidadeCartao] = UseInputMask();
    const [cvvCartao, setCvvCartao, refCvvCartao] = UseInputMask();
    
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        if (formaPagamento) {
            setShowModal(true);
        } else {
            alert("Por favor, selecione uma forma de pagamento.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.MainContent}>
            <link rel="stylesheet" href="/assets/icons/css/all.css" />
            <div className={styles.container}>
                <div className={styles.HeaderCamp}>
                    <h1 className={styles.Header}>
                        <i className="fas fa-credit-card"></i>
                        Forma de Pagamento
                    </h1>
                    <p className={styles.subHeader}>
                        <i className="fa-solid fa-info-circle"></i>
                        Selecione a forma de pagamento e preencha os dados necessários para finalizar.
                    </p>
                </div>

                <div className={styles.vendaClienteContent}>
                    <p className={styles.DadosPag}>
                        <i className="fas fa-money-bill-wave"></i>
                        Dados do Pagamento
                    </p>
                </div>
                <div className={styles.vendaClienteContent}>
                    <UseInputPadrao
                        label="Forma de Pagamento"
                        type="select"
                        value={formaPagamento}
                        onChange={setFormaPagamento}
                        options={[
                            { label: "Boleto", value: "boleto" },
                            { label: "Cartão de Crédito", value: "cartao" },
                            { label: "PIX", value: "pix" }
                        ]}
                    />
                </div>

                {formaPagamento === 'cartao' && (
                    <div className={styles.vendaClienteContentBorder}>
                        <UseInputPadrao
                            label="Nome no Cartão"
                            type='text'
                            value={nomeCartao}
                            onChange={setNomeCartao}
                            inputRef={refNomeCartao}
                            placeholder="Nome completo"
                            required={true}
                        />
                    <div className={styles.InputGridCreditRender}>
                        <UseInputPadrao
                            label="Número do Cartão"
                            type='text'
                            value={numeroCartao}
                            onChange={setNumeroCartao}
                            inputRef={refNumeroCartao}
                            placeholder="0000 0000 0000 0000"
                            required={true}
                            />
                        <UseInputPadrao
                            label="Validade (MM/AA)"
                            type='text'
                            value={validadeCartao}
                            onChange={setValidadeCartao}
                            inputRef={refValidadeCartao}
                            placeholder="MM/AA"
                            required={true}
                        />
                        <UseInputPadrao
                            label="CVV"
                            type='text'
                            value={cvvCartao}
                            onChange={setCvvCartao}
                            inputRef={refCvvCartao}
                            placeholder="123"
                            required={true}
                        />
                        </div>
                    </div>
                )}
                
                {formaPagamento && (
                    <div className={styles.VizualizarDados}>
                        <button 
                            className={styles.infoButtonModal}
                            onClick={handleOpenModal}
                        >
                            <i className="fas fa-eye" style={{ marginRight: '6px' }}></i>
                            Confirmar Dados do Cliente
                        </button>
                    </div>
                )}
            </div>

        <CardResumoModal show={showModal} onClose={handleCloseModal} />
        </div>
    );
}

export default FormaPagamento;