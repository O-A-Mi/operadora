import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css'; 
import { UseInputPadrao } from '../../../../../../components/InputPadrao';
import { useNavigate, useLocation } from 'react-router';
import { DepartamentoForm } from "../../../../../../utils/mockConf"; 
import { useLoader } from '../../../../../../context';

const EditDepartamento = () => {
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const isEditMode = Boolean(id);
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('ativo'); 

    useEffect(() => {
        if (isEditMode) {
            showLoader();
            try {
                const departamentoParaEditar = DepartamentoForm.Departamento.tabela.find(
                    (item) => item.id === id
                );

                if (departamentoParaEditar) {
                    setDescricao(departamentoParaEditar.descricao);
                    if (departamentoParaEditar.status) {
                        setStatus(departamentoParaEditar.status);
                    }
                } else {
                    console.error("Departamento não encontrado!");
                    navigate(-1); 
                }
            } catch (error) {
                console.error("Erro ao carregar dados do departamento:", error);
            } finally {
                hideLoader();
            }
        }
    }, [id, isEditMode, navigate, showLoader, hideLoader]);

    const handleSave = (event) => {
        event.preventDefault(); 
        showLoader();

        const dadosPayload = {
            id: isEditMode ? id : new Date().getTime(), 
            descricao: descricao,
            status: status,
        };
        console.log(isEditMode ? "Atualizando departamento:" : "Criando novo departamento:", dadosPayload);
        
        setTimeout(() => {
            hideLoader();
            navigate(-1); 
        }, 500);
    };

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <section onSubmit={handleSave}>
            <div className={styles.beneficiariosContainer} key={id}>
              <h2 className={styles.beneficiariosTitleTela}>
                <i className="fa-solid fa-sitemap"></i>
                {isEditMode ? 'Editar Departamento' : 'Novo Departamento'}
              </h2>
              <div className={styles.beneficiariosContent}>
                <section className={styles.filtroTabelaField}>
                  <div className={styles.filtroTabelaContent}>
                    <div className={styles.filtroTabelaBody}>
                        <UseInputPadrao
                            label="Descrição"
                            identifier="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            type="text"
                            placeholder="Digite a descrição do departamento"
                            required
                        />
                        <UseInputPadrao
                            label="Status"
                            identifier="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            type="select"
                            options={[
                                { value: 'ativo', label: 'ATIVO' },
                                { value: 'cancelado', label: 'CANCELADO' },
                                { value: 'emAnalisePelaOperadora', label: 'EM ANÁLISE PELA OPERADORA' },
                                { value: 'ibbcaSuspenso', label: 'IBBCA SUSPENSO' },
                                { value: 'inativo', label: 'INATIVO' },
                                { value: 'inativoPorInadimplencia', label: 'INATIVO POR INADIMPLÊNCIA' },
                                { value: 'rescisaoContratual', label: 'RESCISÃO CONTRATUAL' },
                                { value: 'suspenso', label: 'SUSPENSO' },
                            ]}
                            placeholder="Selecione o status..."
                        />
                    </div>
                  </div>
                </section>
                </div>
                <div className={styles.actionButtons}>
                  <div className={styles.actionButtonsGroup}>
                    <button className={`${styles.actionButton} ${styles.actionButtonGravar}`}>
                      <i className="fa-solid fa-save"></i>
                      Gravar
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonDeletar}`}>
                      <i className="fa-solid fa-trash"></i>
                      Deletar
                    </button>
                    <button className={`${styles.actionButton} ${styles.actionButtonVoltar}`} onClick={handleBack}>
                        <i className="fa-solid fa-arrow-left"></i>
                        Voltar
                    </button>
                </div>
              </div>
            </div>
        </section>
    );
};

export default EditDepartamento;