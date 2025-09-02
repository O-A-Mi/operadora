import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao/index.jsx';
import CardResumoModal from './ModalDados/index.jsx';
import pixImage from '../../../../../../../../public/img/pix.png';

function FormaPagamento() {
    const [formaPagamento, setFormaPagamento ] = useState(null);
    const [nomeCartao, setNomeCartao, refNomeCartao] = UseInputMask();
    const [numeroCartao, setNumeroCartao, refNumeroCartao] = UseInputMask();
    const [validadeCartao, setValidadeCartao, refValidadeCartao] = UseInputMask();
    const [cvvCartao, setCvvCartao, refCvvCartao] = UseInputMask();
    const [cnpj, setCnpj, cnpjRef] = UseInputMask("99.999.999/9999-99");
    const [razaoSocial, setRazaoSocial, razaoSocialRef] = UseInputMask();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    
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

    useEffect(() => {
    const resizeHandler = () => {
      handleResizeTabela( 'representante-container-venda');
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("layout-resize", resizeHandler);

    requestAnimationFrame(() => {
      handleResizeTabela('representante-container-venda');
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("layout-resize", resizeHandler);
    };
  }, []);


    return (
        <div className={styles.MainContent} id="representante-container-venda">
                <div className={styles.HeaderCamp}>
                    <h1 className={styles.Header}>
                        <i className="fas fa-credit-card"></i>
                        Forma de Pagamento
                    </h1>
                </div>
            <div className={styles.container}>
                <div className={styles.ContainerDadosEmpresa}>
                    <h2 className={styles.DadosEmpresa}>
                        <i className="fas fa-building"></i>
                        Dados do Cliente:
                    </h2>
                    {/* <p className={styles.subHeaderEmpresa}>
                        <i className="fa-solid fa-info-circle"></i>
                        Verifique os dados do cliente antes de prosseguir com o pagamento.
                    </p> */}
                </div>
                <div className={styles.CardCliente}>
                    <div className={styles.CardClienteContent}>
                        <p className={styles.CardClienteTitle}>Razão Social:</p>
                        <p className={styles.CardClienteInfo}>SPACE TECHNO BLADEE</p>
                    </div>
                    <div className={styles.CardClienteContent}>
                        <p className={styles.CardClienteTitle}>CNPJ:</p>
                        <p className={styles.CardClienteInfo}>00.623.904/0001-73</p>
                    </div>
                    <div className={styles.CardClienteContent}>
                        <p className={styles.CardClienteTitle}>E-mail:</p>
                        <p className={styles.CardClienteInfo}>spacetechnoRH@gmail.com</p>
                    </div>
                </div>

                <div className={styles.vendaClienteContent}>
                    <p className={styles.DadosPag}>
                        <i className="fas fa-money-bill-wave"></i>
                        Dados do Pagamento
                    </p>
                </div>
                <div className={styles.ButtonPagamento}>
                    <button className={formaPagamento === 'boleto' ? styles.buttonSelected : styles.buttonNotSelected}
                     onClick={() => setFormaPagamento('boleto')}>
                        <i className="fas fa-file-invoice-dollar"></i>
                        Boleto
                    </button>

                    <button className={formaPagamento === 'cartao' ? styles.buttonSelected : styles.buttonNotSelected}
                     onClick={() => setFormaPagamento('cartao')}>
                        <i className="fas fa-credit-card"></i>
                        C. de Crédito
                    </button>

                    <button className={formaPagamento === 'pix' ? styles.buttonSelected : styles.buttonNotSelected}
                     onClick={() => setFormaPagamento('pix')}>
                        <i className="fa-brands fa-pix"></i>
                        PIX
                    </button>

                    {/* <UseInputPadrao
                        label="Forma de Pagamento"
                        type="select"
                        value={formaPagamento}
                        onChange={setFormaPagamento}
                        options={[
                            { label: "Boleto", value: "boleto" },
                            { label: "Cartão de Crédito", value: "cartao" },
                            { label: "PIX", value: "pix" }
                        ]}
                    /> */}
                </div>

                {formaPagamento === 'boleto' && (
                    <div className={styles.FormaPagSelecionada}>
                        <p className={styles.infoTextBarcode}>
                        <i className="fat fa-rectangle-barcode"></i>
                            O boleto bancário será enviado por e-mail e por SMS 
                            assim que finalizar aqui! Realize o pagamento em até 2 dias
                            úteis para que a assinatura seja ativada.
                        </p>
                        <span className={styles.SubInfo}>
                            Os seus próximos boletos estarão disponíveis na sua área logada aqui do site,
                            e também enviaremos um sms com lembrete.
                        </span>
                    </div>
                )}

                {formaPagamento === 'pix' && (
                    <div className={styles.FormaPagSelecionada}>
                        <p className={styles.infoTextPIX}>
                            <img className={styles.ImagePIX} src={pixImage} alt="pix" />
                            O código Pix copia e cola será enviado por e-mail e por SMS
                             assim que finalizar aqui! Realize o pagamento em até X horas 
                             para que a assinatura seja ativada.
                        </p>
                        <span className={styles.SubInfoPIX}>
                            As próximas faturas estarão disponíveis na sua área logada aqui do site,
                            e também enviaremos um sms com lembrete.
                        </span>
                    </div>
                )}

                {formaPagamento === 'cartao' && (
                    <div className={styles.InputCreditCard}>
                        <UseInputPadrao
                            label="CNPJ"
                            type='text'
                            value={cnpj}
                            onChange={setCnpj}
                            inputRef={cnpjRef}
                            placeholder="00.000.000/0000-00"
                            required={true}
                        />
                        <UseInputPadrao
                            label="Razão Social"
                            type='text'
                            value={razaoSocial}
                            onChange={setRazaoSocial}
                            inputRef={razaoSocialRef}
                            required={true}
                        />
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
                            width={isMobile ? 70: 70}
                        />
                        <UseInputPadrao
                            label="CVV"
                            type='text'
                            value={cvvCartao}
                            onChange={setCvvCartao}
                            inputRef={refCvvCartao}
                            placeholder="123"
                            width={isMobile ? 30:30}
                        />
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