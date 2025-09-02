import styles from '../styles.module.css'
import { useState, useEffect, useRef } from 'react';
import { formatarMoeda } from "../../../utils/functions";
import { getBaseConfig } from '../../../utils/utilsConfig';
import { jsonRoute } from '../../../utils/json';
import { useLocation, useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { loginAtom } from '../../../context/jotai';
import { carregarInfos, carregarLinks } from "../../../db/carregarGeral.jsx";
import toastMessage from '../../../assets/toast-ui/toast';

const Carrinho = ({isOpen, closeCarrinho}) => {
  const [login, setLoginAtom] =  useAtom(loginAtom);

  const carrinhoRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigate = (link) => {
      navigate(link, { replace: true });
  };

  const carregarCarrinho = dados => {
    let resp = JSON.parse(dados);
    resp.map(item => {
      item.valor = parseFloat(item.valor);
      item.valor_desc = parseFloat(item.valor_desc);
    })
    setListaCarrinho(resp);
  };

  const atualizarCarrinho = (dados) => {
    const executeQuery = () => {
      const params = {
        campo: '*',
        tabela: 'VW_SITE_CARRINHO',
        condicao: `TOKEN_PROPOSTA = '${assinaturaSelecionada.token_proposta}' AND TIPO_BENEF = '${assinaturaSelecionada.tipo_benef}' AND TOKEN_BENEF = '${assinaturaSelecionada.token_benef}'`
      };

      carregarInfos('carregarCarrinho',params,'carregarCarrinho');
    }

    if(dados != '*'){
      let resp = JSON.parse(dados);
      if(resp.status == '200'){
        toastMessage(resp.mensagem, "success", {position: 'top-left'});
        window.carregarCarrinho = carregarCarrinho;
        executeQuery()
        return () => {delete window.carregarCarrinho};
      } else{
        toastMessage(resp.mensagem, "error", {position: 'top-right'});
      }
    } else{
      window.carregarCarrinho = carregarCarrinho;
      executeQuery()
      return () => {delete window.carregarCarrinho};
    }
  }

  useEffect(() => {
    if(assinaturaSelecionada.token_proposta != ''){
      atualizarCarrinho('*');
    }
  }, [assinaturaSelecionada]);

  const { baselink, companyId, endpoints } = getBaseConfig();
  
  const handleRemoveItem = (token) => {
    window.atualizarCarrinho = atualizarCarrinho;

    const params = {
      token: token,
      usuario: login,
      cd_empresa: companyId,
      cmd: 'E'
    };

    carregarLinks(
      'remove_carrinho',
      `${baselink}${endpoints.gravarCarrinho}`,
      params,
      'atualizarCarrinho'
    );

    return () => {
      delete window.atualizarCarrinho;
    };
  }

  useEffect(() => {
    if(location.pathname == `${'/'+jsonRoute.Cliente_Area +'/'+ jsonRoute.Cliente_CompraResumo}` ||
      location.pathname == `${'/'+jsonRoute.Cliente_Area +'/'+ jsonRoute.Cliente_CompraPagamento}` ||
      location.pathname == `${'/'+jsonRoute.Cliente_Area +'/'+ jsonRoute.Cliente_CompraConfirmacao}`){
      setShowCarrinho(false);
    } else{
      setShowCarrinho(true);
    }
  }, [location]);

  
  const [valorCompras, setValorCompras] = useState();
  const [valorDesconto, setValorDesconto] = useState();
  const [valorTotal, setValorTotal] = useState();
  const [valorCupom, setValorCupom] = useState();
  
  useEffect(() => {
    let valor_comp = 0;
    let valor_desc = 0;
    let valor_tot = 0;
    let valor_cupom = 0;
    listaCarrinho.map(item => {
      valor_comp += item.valor;
      if(item.tipo_desc == 'D'){
        valor_desc += parseFloat(item.valor_desc);
      } else{
        valor_desc += parseFloat((item.valor * (item.valor_desc/100)).toFixed(2));
      }
    });
    valor_tot = (valor_comp - valor_desc);
    setValorCompras(valor_comp);
    setValorDesconto(valor_desc);
    setValorTotal(valor_tot);
  }, [listaCarrinho]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && carrinhoRef.current && !carrinhoRef.current.contains(event.target)) {
        closeCarrinho();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeCarrinho]);

  const renderCarrinhoItens = () => {
    return (
      <>
        <div className={styles.carrinhoItems}>
          {listaCarrinho.map(item => (
            <div className={styles.itemDetails} key={item.token}>
              <div className={styles.itemInfo}>
                <div className={styles.infoRemoveSpace}>
                  <div>
                    <label className={styles.infoLabel}>Consulta</label>
                    <p className={styles.infoValue}>{item.procedimento_original}</p>
                  </div>
                  <div>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveItem(item.token)}
                    >
                      <i className="fa-solid fa-trash"></i> Remover
                    </button>
                  </div>
                </div>
                <div>
                  <label className={styles.infoLabel}>Especialidade</label>
                  <p className={styles.infoValue}>{item.especialidade}</p>
                </div>
                <div className={styles.infoGroup}>
                  <label className={styles.infoLabel}>Local</label>
                  <p className={styles.infoValue}>{item.nome_estab}</p>
                </div>
                {item.valor_desc > 0 ? (
                  <div className={styles.itemPriceGroup}>
                      <p className={styles.itemPriceOld}>{formatarMoeda(item.valor)}</p>
                      <p className={styles.itemPrice}>{formatarMoeda(item.valor - (item.tipo_desc == 'D' ? item.valor_desc : (item.valor * (item.valor_desc/100)).toFixed(2)))}</p>
                  </div> 
                ) : (
                  <p className={styles.itemPrice}>{formatarMoeda(item.valor)}</p>
                )}
              </div>
          </div>
          ))}
        </div>
        <div className={styles.carrinhoFooter}>
          <div className={styles.itemDetails}>
            <h4 className={styles.summaryTitle}>Resumo da compra</h4>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Sub total ({listaCarrinho.length} {listaCarrinho.length == 1 ? 'item' : 'itens'})</span>
              <span>{formatarMoeda(valorTotal)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Saldo virtual disponível</span>
              <span>{formatarMoeda(saldoPendente)}</span>
            </div>
            <button
              className={styles.checkoutButton}
              onClick={handleContinuarCompra}
            >
              Continuar compra <i className="fa-regular fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderCarrinhoVazio = () => {
    return (
      <div className={styles.carrinhoVazioContainer}>
        <i className="fa-regular fa-cart-xmark"></i>
        <h1 className={styles.carrinhoVazioText}>O carrinho está vazio</h1>
      </div>
    );
  };
  
  const handleContinuarCompra = () => {
    closeCarrinho();
    handleNavigate(`${'/'+jsonRoute.Cliente_Area +'/'+ jsonRoute.Cliente_CompraResumo}`, { replace: true });
  };

  return(
    <>
      <section className={`${styles.carrinhoContainer} ${isOpen ? styles.carrinhoOpen : ''}`} ref={carrinhoRef}>
        <div className={styles.carrinhoHeader}>
          <h2 className={styles.carrinhoTitle}>Carrinho de compras</h2>
          <i className="fas fa-times" onClick={closeCarrinho} />
        </div>
        {listaCarrinho.length > 0 ? renderCarrinhoItens() : renderCarrinhoVazio()}
      </section>
    </>
  )
}

export default Carrinho;