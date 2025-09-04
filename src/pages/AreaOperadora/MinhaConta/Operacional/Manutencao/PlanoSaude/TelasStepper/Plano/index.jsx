import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { UseInputPadrao, UseInputMask } from '../../../../../../../../components/InputPadrao';
import TogglePadrao from '../../../../../../../../components/TogglePadrao';

const Plano = ({ 
  modoEdicao = false,
  planoParaEdicao = null,
  isMobile = false,
  onToggleChange,
  utilizaFaixaIdade: propUtilizaFaixaIdade,
  adicionaDependentes: propAdicionaDependentes,
  cobraDependentes: propCobraDependentes,
  utilizaVigencia: propUtilizaVigencia
}) => {
  const [status, setStatus, statusRef] = UseInputMask();
  const [ordem, setOrdem, ordemRef] = UseInputMask();
  const [apareceEm, setApareceEm, apareceEmRef] = UseInputMask();
  const [grupoContratual, setGrupoContratual, grupoContratualRef] = UseInputMask();
  const [tabelaConcessao, setTabelaConcessao, tabelaConcessaoRef] = UseInputMask();
  const [tipoPlano, setTipoPlano, tipoPlanoRef] = UseInputMask();
  const [convenio, setConvenio, convenioRef] = UseInputMask();
  const [entidade, setEntidade, entidadeRef] = UseInputMask();
  const [formaPagamento, setFormaPagamento, formaPagamentoRef] = UseInputMask();
  const [tipoReajuste, setTipoReajuste, tipoReajusteRef] = UseInputMask();
  const [carencia, setCarencia, carenciaRef] = UseInputMask();
  const [mesAniversarioReajuste, setMesAniversarioReajuste, mesAniversarioReajusteRef] = UseInputMask();
  const [segmentacao, setSegmentacao, segmentacaoRef] = UseInputMask();
  const [fatorModeracao, setFatorModeracao, fatorModeracaoRef] = UseInputMask();
  const [modoAdesao, setModoAdesao, modoAdesaoRef] = UseInputMask();

  const [descricao, setDescricao, descricaoRef] = UseInputMask();
  const [abreviacao, setAbreviacao, abreviacaoRef] = UseInputMask();
  const [vigenciaInicio, setVigenciaInicio, vigenciaInicioRef] = UseInputMask();
  const [vigenciaFim, setVigenciaFim, vigenciaFimRef] = UseInputMask();
  const [numeroANS, setNumeroANS, numeroANSRef] = UseInputMask();
  const [acomodacao, setAcomodacao, acomodacaoRef] = UseInputMask();
  const [abrangencia, setAbrangencia, abrangenciaRef] = UseInputMask();
  const [codProdutoEnvio, setCodProdutoEnvio, codProdutoEnvioRef] = UseInputMask();
  const [codEmpresaEnvio, setCodEmpresaEnvio, codEmpresaEnvioRef] = UseInputMask();
  const [custo, setCusto, custoRef] = UseInputMask();
  const [precoFinal, setPrecoFinal, precoFinalRef] = UseInputMask();
  const [valorAdesao, setValorAdesao, valorAdesaoRef] = UseInputMask();
  const [qtdMinimaTitulares, setQtdMinimaTitulares, qtdMinimaTitularesRef] = UseInputMask();
  const [qtdMaximaTitulares, setQtdMaximaTitulares, qtdMaximaTitularesRef] = UseInputMask();
  const [limiteDependentes, setLimiteDependentes, limiteDependentesRef] = UseInputMask();

  const [utilizaFaixaIdade, setUtilizaFaixaIdade] = useState(propUtilizaFaixaIdade || false);
  const [cobraDependentes, setCobraDependentes] = useState(propCobraDependentes || false);
  const [utilizaVigencia, setUtilizaVigencia] = useState(propUtilizaVigencia || false);
  const [vPortalCorretor, setVPortalCorretor] = useState(false);
  const [validaDNV, setValidaDNV] = useState(false);
  const [utilizaProRata, setUtilizaProRata] = useState(false);
  const [utilizaDMED, setUtilizaDMED] = useState(false);
  const [seguradoTemCarencia, setSeguradoTemCarencia] = useState(false);
  const [dependenteTemCarencia, setDependenteTemCarencia] = useState(false);
  const [usaAuditoriaPerguntas, setUsaAuditoriaPerguntas] = useState(false);
  const [enviaCadastrosSFarmacia, setEnviaCadastrosSFarmacia] = useState(false);
  const [reajusteContrato, setReajusteContrato] = useState(false);
  const [reajustePorFaixa, setReajustePorFaixa] = useState(false);
  const [utilizaNPropostaEspecial, setUtilizaNPropostaEspecial] = useState(false);
  const [adicionaDependentes, setAdicionaDependentes] = useState(propAdicionaDependentes !== undefined ? propAdicionaDependentes : true);
  
  const [modoReajusteFaixa, setModoReajusteFaixa, modoReajusteFaixaRef] = UseInputMask();
  const [formatoProposta, setFormatoProposta, formatoPropostaRef] = UseInputMask();
  const [numeroInicial, setNumeroInicial, numeroInicialRef] = UseInputMask();

  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);

  useEffect(() => {
    if (modoEdicao && planoParaEdicao) {
      const camposTexto = [
        { campo: 'status', valor: planoParaEdicao.status },
        { campo: 'ordemVisualizacao', valor: planoParaEdicao.ordemVisualizacao },
        { campo: 'tipoPlano', valor: planoParaEdicao.tipoPlano },
        { campo: 'convenio', valor: planoParaEdicao.convenio },
        { campo: 'grupoContrato', valor: planoParaEdicao.grupoContrato },
        { campo: 'descricao', valor: planoParaEdicao.descricao },
        { campo: 'abreviacao', valor: planoParaEdicao.abreviacao },
        { campo: 'entidade', valor: planoParaEdicao.entidade },
        { campo: 'codigoExternoFornecedor', valor: planoParaEdicao.codigoExternoFornecedor },
        { campo: 'codigoExternoEmpresa', valor: planoParaEdicao.codigoExternoEmpresa },
        { campo: 'vrCusto', valor: planoParaEdicao.vrCusto },
        { campo: 'vrVenda', valor: planoParaEdicao.vrVenda },
        { campo: 'carencia', valor: planoParaEdicao.carencia },
        { campo: 'mesAniversarioReajuste', valor: planoParaEdicao.mesAniversarioReajuste },
        { campo: 'tipoReajuste', valor: planoParaEdicao.tipoReajuste }
      ];

      const settersTexto = {
        status: setStatus,
        ordemVisualizacao: setOrdem,
        tipoPlano: setTipoPlano,
        convenio: setConvenio,
        grupoContrato: setGrupoContratual,
        descricao: setDescricao,
        abreviacao: setAbreviacao,
        entidade: setEntidade,
        codigoExternoFornecedor: setCodProdutoEnvio,
        codigoExternoEmpresa: setCodEmpresaEnvio,
        vrCusto: setCusto,
        vrVenda: setPrecoFinal,
        carencia: setCarencia,
        mesAniversarioReajuste: setMesAniversarioReajuste,
        tipoReajuste: setTipoReajuste
      };

      camposTexto.map(({ campo, valor }) => {
        const setter = settersTexto[campo];
        if (setter) {
          const mockEvent = {
            target: { value: valor || '' }
          };
          setter(mockEvent);
        }
        return null;
      });

      setCobraDependentes(planoParaEdicao.cobraDependentes === 'Sim');
      setUtilizaFaixaIdade(planoParaEdicao.utilizaFaixaIdade === 'Sim');
    }
  }, [modoEdicao, planoParaEdicao]);

  useEffect(() => {
    if (onToggleChange && typeof onToggleChange === 'function') {
      onToggleChange('utilizaFaixaIdade', utilizaFaixaIdade);
    }
  }, [utilizaFaixaIdade, onToggleChange]);

  useEffect(() => {
    if (onToggleChange && typeof onToggleChange === 'function') {
      onToggleChange('adicionaDependentes', adicionaDependentes);
    }
  }, [adicionaDependentes, onToggleChange]);

  useEffect(() => {
    if (onToggleChange && typeof onToggleChange === 'function') {
      onToggleChange('cobraDependentes', cobraDependentes);
    }
  }, [cobraDependentes, onToggleChange]);

  useEffect(() => {
    if (onToggleChange && typeof onToggleChange === 'function') {
      onToggleChange('utilizaVigencia', utilizaVigencia);
    }
  }, [utilizaVigencia, onToggleChange]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagemPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'inativo', label: 'Inativo' }
  ];

  const ordemOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
  ];

  const apareceEmOptions = [
    { value: 'portal', label: 'Portal' },
    { value: 'app', label: 'App' },
    { value: 'ambos', label: 'Ambos' }
  ];

  const grupoContratualOptions = [
    { value: 'grupo1', label: 'Grupo 1' },
    { value: 'grupo2', label: 'Grupo 2' }
  ];

  const tabelaConcessaoOptions = [
    { value: 'tabela1', label: 'Tabela 1' },
    { value: 'tabela2', label: 'Tabela 2' }
  ];

  const tipoPlanoOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'familiar', label: 'Familiar' },
    { value: 'empresarial', label: 'Empresarial' }
  ];

  const convenioOptions = [
    { value: 'convenio1', label: 'Convênio 1' },
    { value: 'convenio2', label: 'Convênio 2' }
  ];

  const entidadeOptions = [
    { value: 'entidade1', label: 'Entidade 1' },
    { value: 'entidade2', label: 'Entidade 2' }
  ];

  const formaPagamentoOptions = [
    { value: 'mensal', label: 'Mensal' },
    { value: 'trimestral', label: 'Trimestral' },
    { value: 'semestral', label: 'Semestral' },
    { value: 'anual', label: 'Anual' }
  ];

  const tipoReajusteOptions = [
    { value: 'anual', label: 'Anual' },
    { value: 'semestral', label: 'Semestral' },
    { value: 'trimestral', label: 'Trimestral' }
  ];

  const mesAniversarioReajusteOptions = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];

  const segmentacaoOptions = [
    { value: 'segmento1', label: 'Segmento 1' },
    { value: 'segmento2', label: 'Segmento 2' }
  ];

  const fatorModeracaoOptions = [
    { value: '1.0', label: '1.0' },
    { value: '1.1', label: '1.1' },
    { value: '1.2', label: '1.2' }
  ];

  const modoAdesaoOptions = [
    { value: 'online', label: 'Online' },
    { value: 'presencial', label: 'Presencial' },
    { value: 'ambos', label: 'Ambos' }
  ];

  const modoReajusteFaixaOptions = [
    { value: 'aniversariante-mes-atual', label: 'Aniversariante no Mês atual' },
    { value: 'aniversariante-mes-subsequente-faturado-mes-aniversario', label: 'Aniversariante no Mês Subsequente e será faturado no mês do Aniversário' },
    { value: 'aniversariante-mes-subsequente-faturado-proximo-mes-aniversario', label: 'Aniversariante no Mês Subsequente e será faturado no próximo mês do Aniversário' }
  ];

  return (
    <>
      <div className={styles.formSectionWithBorder}>
        <h3 className={`${styles.sectionTitle} ${styles.firstTitle}`}>
          <i className="fa-solid fa-cog"></i>
          Configuração Inicial
        </h3>
        
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Status"
            identifier="status" 
            value={status}
            onChange={setStatus}
            inputRef={statusRef}
            type='select'
            options={statusOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Ordem"
            identifier="ordem" 
            value={ordem}
            onChange={setOrdem}
            inputRef={ordemRef}
            type='select'
            options={ordemOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Aparece em"
            identifier="aparece-em" 
            value={apareceEm}
            onChange={setApareceEm}
            inputRef={apareceEmRef}
            type='select'
            options={apareceEmOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Grupo Contratual"
            identifier="grupo-contratual" 
            value={grupoContratual}
            onChange={setGrupoContratual}
            inputRef={grupoContratualRef}
            type='select'
            options={grupoContratualOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
        </div>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Tabela de Concessão"
            identifier="tabela-concessao" 
            value={tabelaConcessao}
            onChange={setTabelaConcessao}
            inputRef={tabelaConcessaoRef}
            type='select'
            options={tabelaConcessaoOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Tipo de Plano"
            identifier="tipo-plano" 
            value={tipoPlano}
            onChange={setTipoPlano}
            inputRef={tipoPlanoRef}
            type='select'
            options={tipoPlanoOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Convênio"
            identifier="convenio" 
            value={convenio}
            onChange={setConvenio}
            inputRef={convenioRef}
            type='select'
            options={convenioOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Entidade"
            identifier="entidade" 
            value={entidade}
            onChange={setEntidade}
            inputRef={entidadeRef}
            type='select'
            options={entidadeOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
            multiple={modoEdicao}
          />
        </div>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Forma de Pagamento"
            identifier="forma-pagamento" 
            value={formaPagamento}
            onChange={setFormaPagamento}
            inputRef={formaPagamentoRef}
            type='select'
            options={formaPagamentoOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
            multiple={true}
          />
          <UseInputPadrao 
            label="Descrição"
            identifier="descricao" 
            value={descricao}
            onChange={setDescricao}
            inputRef={descricaoRef}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Abreviação"
            identifier="abreviacao" 
            value={abreviacao}
            onChange={setAbreviacao}
            inputRef={abreviacaoRef}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Tipo Reajuste"
            identifier="tipo-reajuste" 
            value={tipoReajuste}
            onChange={setTipoReajuste}
            inputRef={tipoReajusteRef}
            type='select'
            options={tipoReajusteOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
        </div>

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Carência"
            identifier="carencia" 
            value={carencia}
            onChange={setCarencia}
            inputRef={carenciaRef}
            type='text'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Mês Aniversário Reajuste"
            identifier="mes-aniversario-reajuste" 
            value={mesAniversarioReajuste}
            onChange={setMesAniversarioReajuste}
            inputRef={mesAniversarioReajusteRef}
            type='select'
            options={mesAniversarioReajusteOptions} 
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Vigência Início"
            identifier="vigencia-inicio" 
            value={vigenciaInicio}
            onChange={setVigenciaInicio}
            inputRef={vigenciaInicioRef}
            type='date'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Vigência Fim"
            identifier="vigencia-fim" 
            value={vigenciaFim}
            onChange={setVigenciaFim}
            inputRef={vigenciaFimRef}
            type='date'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
        </div>
      </div>

      <div className={styles.formSectionWithBorder}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-shield-alt"></i>
          ANS
        </h3>
        
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Número ANS"
            identifier="numero-ans" 
            value={numeroANS}
            onChange={setNumeroANS}
            inputRef={numeroANSRef}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Segmentação"
            identifier="segmentacao" 
            value={segmentacao}
            onChange={setSegmentacao}
            inputRef={segmentacaoRef}
            type='select'
            options={segmentacaoOptions} 
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Acomodação"
            identifier="acomodacao" 
            value={acomodacao}
            onChange={setAcomodacao}
            inputRef={acomodacaoRef}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Abrangência"
            identifier="abrangencia" 
            value={abrangencia}
            onChange={setAbrangencia}
            inputRef={abrangenciaRef}
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Fator Moderação"
            identifier="fator-moderacao" 
            value={fatorModeracao}
            onChange={setFatorModeracao}
            inputRef={fatorModeracaoRef}
            type='select'
            options={fatorModeracaoOptions} 
            width={isMobile ? 100 : 20}
            gap={isMobile ? 0 : 0.5}
          />
        </div>
      </div>

      <div className={styles.formSectionWithBorder}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-paper-plane"></i>
          Configuração de Envio Externo
        </h3>
        
        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Cód. Produto Envio"
            identifier="cod-produto-envio" 
            value={codProdutoEnvio}
            onChange={setCodProdutoEnvio}
            inputRef={codProdutoEnvioRef}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Cód. Empresa Envio"
            identifier="cod-empresa-envio" 
            value={codEmpresaEnvio}
            onChange={setCodEmpresaEnvio}
            inputRef={codEmpresaEnvioRef}
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-puzzle-piece"></i>
          Configuração de Módulos
        </h3>
        
        <div className={styles.formRow}>
          <TogglePadrao
            label="Utiliza Faixa Idade?"
            checked={utilizaFaixaIdade}
            onChange={(checked) => setUtilizaFaixaIdade(checked)}
            option1="Não"
            option2="Sim"
          />
        </div>
        
        {!utilizaFaixaIdade && (
          <div className={styles.formRow}>
            <UseInputPadrao 
              label="Custo"
              identifier="custo" 
              value={custo}
              onChange={setCusto}
              inputRef={custoRef}
              type='number'
              width={isMobile ? 100 : 25}
              gap={isMobile ? 100 : 0.5}
            />
            <UseInputPadrao 
              label="Preço Final"
              identifier="preco-final" 
              value={precoFinal}
              onChange={setPrecoFinal}
              inputRef={precoFinalRef}
              type='number'
              width={isMobile ? 100 : 25}
              gap={isMobile ? 100 : 0.5}
            />
            <UseInputPadrao 
              label="Modo Adesão"
              identifier="modo-adesao" 
              value={modoAdesao}
              onChange={setModoAdesao}
              inputRef={modoAdesaoRef}
              type='select'
              options={modoAdesaoOptions} 
              width={isMobile ? 100 : 25}
              gap={isMobile ? 100 : 0.5}
            />
            <UseInputPadrao 
              label="Valor Adesão"
              identifier="valor-adesao" 
              value={valorAdesao}
              onChange={setValorAdesao}
              inputRef={valorAdesaoRef}
              type='number'
              width={isMobile ? 100 : 25}
              gap={isMobile ? 100 : 0.5}
            />
          </div>
        )}

        <div className={styles.formRow}>
          <UseInputPadrao 
            label="Qtd. Mínima Titulares"
            identifier="qtd-minima-titulares" 
            value={qtdMinimaTitulares}
            onChange={setQtdMinimaTitulares}
            inputRef={qtdMinimaTitularesRef}
            type='number'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <UseInputPadrao 
            label="Qtd. Máxima Titulares"
            identifier="qtd-maxima-titulares" 
            value={qtdMaximaTitulares}
            onChange={setQtdMaximaTitulares}
            inputRef={qtdMaximaTitularesRef}
            type='number'
            width={isMobile ? 100 : 25}
            gap={isMobile ? 0 : 0.5}
          />
          <TogglePadrao
            label="Adiciona Dependentes?"
            checked={adicionaDependentes}
            onChange={(checked) => setAdicionaDependentes(checked)}
            option1="Não"
            option2="Sim"
          />
          {adicionaDependentes && (
            <>
              <UseInputPadrao 
                label="Limite Dependentes"
                identifier="limite-dependentes" 
                value={limiteDependentes}
                onChange={setLimiteDependentes}
                inputRef={limiteDependentesRef}
                type='number'
                width={isMobile ? 100 : 25}
                gap={isMobile ? 0 : 0.5}
              />
              <TogglePadrao
                label="Cobra Dependentes?"
                checked={cobraDependentes}
                onChange={(checked) => setCobraDependentes(checked)}
                option1="Não"
                option2="Sim"
              />
            </>
          )}
        </div>

        <div className={styles.toggleGrid}>
          <TogglePadrao
            label="Utiliza Vigência?"
            checked={utilizaVigencia}
            onChange={(checked) => setUtilizaVigencia(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="V. Portal Corretor?"
            checked={vPortalCorretor}
            onChange={(checked) => setVPortalCorretor(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Valida DNV?"
            checked={validaDNV}
            onChange={(checked) => setValidaDNV(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Utiliza Pro Rata?"
            checked={utilizaProRata}
            onChange={(checked) => setUtilizaProRata(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Utiliza DMED?"
            checked={utilizaDMED}
            onChange={(checked) => setUtilizaDMED(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Segurado têm carência?"
            checked={seguradoTemCarencia}
            onChange={(checked) => setSeguradoTemCarencia(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Dependente têm carência?"
            checked={dependenteTemCarencia}
            onChange={(checked) => setDependenteTemCarencia(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Usa Auditoria de Perguntas?"
            checked={usaAuditoriaPerguntas}
            onChange={(checked) => setUsaAuditoriaPerguntas(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Envia Cadastros à S. Farmácia?"
            checked={enviaCadastrosSFarmacia}
            onChange={(checked) => setEnviaCadastrosSFarmacia(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Reajuste do Contrato?"
            checked={reajusteContrato}
            onChange={(checked) => setReajusteContrato(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Reajuste por Faixa?"
            checked={reajustePorFaixa}
            onChange={(checked) => setReajustePorFaixa(checked)}
            option1="Não"
            option2="Sim"
          />
          <TogglePadrao
            label="Utiliza NºProposta Especial?"
            checked={utilizaNPropostaEspecial}
            onChange={(checked) => setUtilizaNPropostaEspecial(checked)}
            option1="Não"
            option2="Sim"
          />
        </div>

        {(reajustePorFaixa || utilizaNPropostaEspecial) && (
          <div className={styles.formRow} style={{ marginTop: '1rem' }}>
            {reajustePorFaixa && (
              <UseInputPadrao
                label="Modo do Reajuste por Faixa"
                identifier="modo-reajuste-faixa"
                value={modoReajusteFaixa}
                onChange={setModoReajusteFaixa}
                inputRef={modoReajusteFaixaRef}
                type='select'
                options={modoReajusteFaixaOptions}
                width={isMobile ? 100 : 33.33}
                gap={isMobile ? 0 : 0.5}
              />
            )}
            {utilizaNPropostaEspecial && (
              <>
                <UseInputPadrao
                  label="Formato Proposta"
                  identifier="formato-proposta"
                  value={formatoProposta}
                  onChange={setFormatoProposta}
                  inputRef={formatoPropostaRef}
                  type='number'
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.5}
                />
                <UseInputPadrao
                  label="Número Inicial"
                  identifier="numero-inicial"
                  value={numeroInicial}
                  onChange={setNumeroInicial}
                  inputRef={numeroInicialRef}
                  type='number'
                  width={isMobile ? 100 : 33.33}
                  gap={isMobile ? 0 : 0.5}
                />
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.formSectionWithBorderTop}>
        <h3 className={styles.sectionTitle}>
          <i className="fa-solid fa-info-circle"></i>
          Informações adicionais
        </h3>
        
        <div className={styles.imagemSection}>
          <div className={styles.imagemRow}>
            <UseInputPadrao
              label="Imagem (Preferencialmente 512 x 512)"
              type="file"
              accept=".png"
              onChange={handleImagemChange}
              width={isMobile ? 100 : 50}
              gap={isMobile ? 0 : 1}
            />

          </div>
          {imagemPreview && (
            <div className={styles.imagemPreview}>
              <img src={imagemPreview} alt="Preview" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Plano;