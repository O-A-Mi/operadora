import styles from '../styles.module.css';
import { UseInputPadrao } from '../../../../../components/InputPadrao';
import React, { useRef, useEffect, useState } from 'react';

const FiltroModal = ({ relatorio, tabelaDados, filtroValores, setFiltroValores, onFiltrar, onClose }) => {
  const modalFormRef = useRef(null);
  const [formWidth, setFormWidth] = useState('');
  const [localFiltroValores, setLocalFiltroValores] = useState(filtroValores);

  // Atualiza os valores locais quando os props mudam
  useEffect(() => {
    setLocalFiltroValores(filtroValores);
  }, [filtroValores]);

  // Atualiza a largura quando o modal é aberto ou redimensionado
  useEffect(() => {
    const updateWidth = () => {
      if (modalFormRef.current) {
        setFormWidth(`${modalFormRef.current.offsetWidth}px`);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleChange = (campo, valor) => {
    const value = valor?.target?.value !== undefined ? valor.target.value : valor;
    setLocalFiltroValores(prev => ({
      ...prev,
      [campo]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Garante que está passando um objeto válido
    const filtrosParaAplicar = localFiltroValores || {};
    setFiltroValores(filtrosParaAplicar);
    onFiltrar(filtrosParaAplicar);
    onClose();
};

  const handleCancel = () => {
    // Descarta as alterações não salvas
    setLocalFiltroValores(filtroValores);
    onClose();
  };

  // Função para obter opções únicas de uma coluna
  const getUniqueColumnValues = (columnName) => {
    if (!tabelaDados || !tabelaDados.length) return [];
    
    const uniqueValues = new Set();
    tabelaDados.forEach(row => {
      if (row[columnName]) {
        uniqueValues.add(row[columnName]);
      }
    });
    
    return Array.from(uniqueValues).map(value => ({
      value: value,
      label: value.toString()
    }));
  };
  
  // Função para obter as opções do filtro
  const getFilterOptions = (filtro) => {
    let options = [];
    
    if (filtro.select) {
      if (filtro.options && filtro.options.length > 0 && getUniqueColumnValues(filtro.select).length === 0) {
        options = [...filtro.options];
      } else {
        options = getUniqueColumnValues(filtro.select);
      }
    } else if (filtro.options && filtro.options.length > 0) {
      options = [...filtro.options];
    }
    
    return [...options];
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Informações de Identificação</h2>
          <button className={styles.backButton} onClick={handleCancel}><i className="fas fa-times"></i></button>
        </div>
        <div className={styles.modalBody}>
          <form 
            ref={modalFormRef}
            onSubmit={handleSubmit} 
            className={styles.modalForm}
          >
            {relatorio?.filtros?.map((filtro) => {
              if (filtro.value.includes('_inicio') || filtro.value.includes('_fim')) {
                return (
                  <React.Fragment key={filtro.value}>
                    <UseInputPadrao
                      type="date"
                      label={filtro.name}
                      identifier={`filtro-${filtro.value}`}
                      width={50}
                      gap={0.375}
                      value={localFiltroValores[filtro.value] || ''}
                      onChange={(e) => handleChange(filtro.value, e)}
                    />
                  </React.Fragment>
                );
              }

              if(filtro?.select || (filtro?.options && filtro.options.length > 0)) {
                const options = getFilterOptions(filtro);
                return (
                  <React.Fragment key={filtro.value}>
                    <UseInputPadrao
                      type="select"
                      label={filtro.name}
                      identifier={`filtro-${filtro.value}`}
                      value={localFiltroValores[filtro.value] || ''}
                      onChange={(e) => handleChange(filtro.value, e)}
                      options={options}
                      inputStyle={{ maxWidth: formWidth }}
                    />
                  </React.Fragment>
                );
              }
              
              return (
                <React.Fragment key={filtro.value}>
                  <UseInputPadrao
                    label={filtro.name}
                    identifier={`filtro-${filtro.value}`}
                    value={localFiltroValores[filtro.value] || ''}
                    onChange={(value) => handleChange(filtro.value, value)}
                  />
                </React.Fragment>
              );
            })}
            
            <div className={styles.filtroModalActions}>
              <button type="button" onClick={handleCancel} className={styles.filtroModalCancel}>
                Cancelar
              </button>
              <button type="submit" className={styles.filtroModalSubmit}>
                Aplicar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FiltroModal;