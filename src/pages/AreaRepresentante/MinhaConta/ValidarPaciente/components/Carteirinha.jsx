import { toPng } from 'html-to-image';
import styles from '../styles.module.css';
import * as htmlToImage from 'html-to-image';
import { useEffect, useState } from 'react';
import { carregarInfos } from "../../../../../db/carregarGeral.jsx";
const Carteirinha = ({isOpen, closeModal, token,plano}) => {
    if(!isOpen) return

    const [assinaturaPaciente, setAssinaturaPaciente] = useState(1);
    const [listaBenef, setListaBenef] = useState([]);
    const [benefSelecionado, setBenefSelecionado] = useState(null);

    const idCarteirinha = "carteirinha";

    // Função mock para simular dados - substitua pela implementação real
    const carregarDadosBenef = (dados) => {
        let resp = JSON.parse(dados);
        setListaBenef(resp.map((item) => (JSON.parse(item.json))));
        setBenefSelecionado(JSON.parse(resp[0].json).token);
    };  

    const handleDownload = async() => {
        const fontEmbedCSS = await htmlToImage.getFontEmbedCSS(document.getElementById(idCarteirinha));
        htmlToImage.toPng(document.getElementById(idCarteirinha),{background:'transparent', fontEmbedCSS:fontEmbedCSS}).then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'carteirinha.png';
        link.click();
        });
    };
    const handleCompartilhar =  () => {
        htmlToImage.toBlob(document.getElementById(idCarteirinha)).then(async (blobImage) => {
        //const truefile = dataUrl
        //console.log(new File([blobImage], 'carteirinha.png', { type: 'image/png' }));
        navigator.canShare({ files: [new File([blobImage], 'carteirinha.png', { type: 'image/png' })] });
        try {
            await navigator.share({ files: [new File([blobImage], 'carteirinha.png', { type: 'image/png' })] });
            //console.log('Shared successfully');
        } catch (err) {
            //console.log('Shared error: ', err);
        }
        });
    }

    useEffect(() => {
        
        // Comentei seu código original para focar na correção
        
        window.carregarDadosBenef = carregarDadosBenef;
        carregarInfos('carregarDadosBenef', {
            campo: '*', 
            tabela: 'VW_SITE_CARTEIRINHA', 
            condicao: `TOKEN_PROPOSTA = '${token}'`
        }, 'carregarDadosBenef');
        
        return () => {
            delete window.carregarDadosBenef;
        };
        
    }, [assinaturaPaciente]);

    const handleBenefChange = (e) => {
        setBenefSelecionado(e.target.value);
    }

    const [assinaturaSelecionada] = useState({
        nome: plano,
        cor: "linear-azul-padrao",
    });

    const [showBenef, setShowBenef] = useState({});

    useEffect(() => {
        if (!benefSelecionado) return;
        setShowBenef(listaBenef.find((item) => item.token === benefSelecionado));
    }, [benefSelecionado]);

    return (
        <div className={styles.carteirinhaContainer}> 
            <div className={styles.carteirinhaWrapper}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2>Informações de Identificação</h2>
                        <button className={styles.backButton} onClick={closeModal}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        {listaBenef.length > 1 && (
                            <div className={styles.selectBeneficiarioField}>
                                <select 
                                    className={styles.selectBeneficiario} 
                                    value={benefSelecionado || ''}
                                    onChange={handleBenefChange}
                                >
                                    {listaBenef.map((item, index) => (
                                        <option key={index} value={item.token}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </select>
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        )}
                        
                        <div className={styles.carteirinhaCard} id={idCarteirinha}>
                            <div 
                                className={styles.cardHeader} 
                                style={{background: `var(--${assinaturaSelecionada.cor})`}}
                            >
                                <div className={styles.cardHeaderText}>
                                    <span>{assinaturaSelecionada.nome}</span>
                                </div>
                                <img
                                    loading="lazy"
                                    src={LogoBranca}
                                    className={styles.cardLogo}
                                    alt="Saúde na Tela logo"
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardContentUserDetails}>
                                    <div className={styles.userName}>{showBenef?.nome}</div>
                                    <div className={`${styles.userType} ${showBenef?.tipo_benef == 'S' ? styles.userTypeTitular : styles.userTypeDependente}`}>{showBenef?.tipo_benef == 'S' ? 'Titular' : 'Dependente'}</div>
                                </div>
                                <div className={styles.cardContentDetails}>
                                    <div className={styles.cardDetail}>
                                        CPF: {showBenef?.cpfcnpj}
                                    </div>
                                    <div className={styles.cardDetail}>
                                        Data de nascimento: {showBenef?.dtnasc}
                                    </div>
                                    <div className={styles.cardDetail}>
                                        Id: {showBenef?.matricula}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.cardActions}>
                            <button className={styles.actionButton} onClick={handleDownload}>
                                <i className="fa-solid fa-download"></i> Baixar carteirinha
                            </button>
                            <button className={styles.actionButton} onClick={handleCompartilhar}>
                                <i className="fa-solid fa-share"></i> Compartilhar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carteirinha;