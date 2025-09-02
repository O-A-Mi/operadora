import styles from './styles.module.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router";
import { jsonRoute } from '../../../../../utils/json';
import { handleResizeTabela } from '../../../../../utils/functions';
import TabelaPadrão from '../../../../../components/TabelaPadrao';
import { UseInputPadrao } from '../../../../../components/InputPadrao';
import dialogMessage from '../../../../../assets/dialog-ui/dialog.jsx';
import toastMessage from '../../../../../assets/toast-ui/toast.js';

import 'jstree/dist/themes/default/style.css';
import $ from 'jquery';
import 'jstree';
import Tooltip from '../../../../../components/TooltipPadrao/index.jsx';

function PermissaoInformacoes() {
  const [openAll, setOpenAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleResize = useCallback(() => {
    handleResizeTabela('permissao-informacoes', 'permissao-informacoes-container');
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("layout-resize", handleResize);

    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("layout-resize", handleResize);
      clearTimeout(timer);
    };
  }, [handleResize]);

  const [showSelector, setShowSelector] = useState(false);

  const [cargoList, setCargoList] = useState([
    { codigo: '001', descricao: 'Diretoria' },
    { codigo: '002', descricao: 'Representante' },
    { codigo: '003', descricao: 'Financeiro' },
    { codigo: '004', descricao: 'Cobrança' },
    { codigo: '005', descricao: 'Adesão' },
    { codigo: '006', descricao: 'Empresarial' },
    { codigo: '007', descricao: 'Representante Empresarial' },
    { codigo: '008', descricao: 'Supervisor' },
    { codigo: '009', descricao: 'Gerente' },
    { codigo: '010', descricao: 'Vendas' },
    { codigo: '011', descricao: 'RH' },
    { codigo: '012', descricao: 'DP' },
  ]);

  const departamentoOptions = [
    { value: 'adm', label: 'ADM' },
    { value: 'diretoria', label: 'Diretoria' },
    { value: 'empresarial', label: 'Empresarial' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'juridico', label: 'Jurídico' },
  ];

  const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'inativo', label: 'Inativo' },
    { value: 'suspenso', label: 'Suspenso' },
  ];

  const [selectedCargo, setSelectedCargo] = useState(null);
  const [selectedScreenId, setSelectedScreenId] = useState(null);
  const [treeQuery, setTreeQuery] = useState('');

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editCargoName, setEditCargoName] = useState('');
  const [newCargoName, setNewCargoName] = useState('');
  const [editDepartamento, setEditDepartamento] = useState('');
  const [editStatus, setEditStatus] = useState('ativo');
  const [newCargoDepartamento, setNewCargoDepartamento] = useState('');
  const [newCargoStatus, setNewCargoStatus] = useState('ativo');
  const handleSavePermissions = () => {
    const cargoTexto = selectedCargo?.descricao || 'cargo';
    dialogMessage(
      `Tem certeza que deseja gravar as alterações de permissões feitas em ${cargoTexto}?`,
      'warning',
      { confirmButton: true },
      (confirmou) => {
        if (confirmou) {
          const getScreenTextById = (id) => {
            const stack = [...treeData];
            while (stack.length) {
              const node = stack.pop();
              if (node.id === id) return node.text;
              if (node.children && node.children.length) stack.push(...node.children);
            }
            return id;
          };
          toastMessage(`Alterações feitas nas permissões de ${cargoTexto} salvas com sucesso`, 'success');

          const permissoes = Object.keys(optionsByScreen).map((telaId) => {
            const selecionadas = selectedOptionsByScreen[telaId] || [];
            const acoes = (optionsByScreen[telaId] || []).map((acao) => ({
              id: acao.id,
              allowed: selecionadas.includes(acao.id),
            }));
            return {
              telaId,
              telaNome: getScreenTextById(telaId),
              enabled: selecionadas.length > 0,
              acoes,
            };
          });

          const payload = {
            cargoId: selectedCargo?.codigo || null,
            cargoNome: selectedCargo?.descricao || null,
            permissoes,
          };

          console.log('GRAVAR_PERMISSOES_PAYLOAD', payload);
        }
      }
    );
  };

  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const clearTreeHighlights = () => {
    if (!treeRef.current) return;
    const anchors = treeRef.current.querySelectorAll('a.jstree-anchor');
    anchors.forEach((a) => {
      const spans = a.querySelectorAll('span.treeSearchHighlight');
      spans.forEach((span) => {
        const text = document.createTextNode(span.textContent || '');
        span.replaceWith(text);
      });
    });
  };

  const applyTreeHighlights = (query) => {
    clearTreeHighlights();
    if (!query) return;
    if (!treeRef.current) return;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    const anchors = treeRef.current.querySelectorAll('a.jstree-anchor');
    anchors.forEach((a) => {
      const textNodes = Array.from(a.childNodes).filter((n) => n.nodeType === 3);
      textNodes.forEach((node) => {
        const text = node.textContent || '';
        if (!regex.test(text)) return;
        regex.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let m;
        while ((m = regex.exec(text)) !== null) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
          const span = document.createElement('span');
          span.className = 'treeSearchHighlight';
          span.textContent = m[1];
          frag.appendChild(span);
          lastIndex = m.index + m[1].length;
        }
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        node.parentNode.replaceChild(frag, node);
      });
    });
  };

  const openNodeIdsRef = useRef(new Set());
  const treeRef = useRef(null);
  const isUpdatingRef = useRef(false);

  const updateAncestorsCheckState = useCallback((instance, nodeId) => {
    if (!instance || !nodeId) return;
    let parentId = instance.get_parent(nodeId);
    while (parentId && parentId !== '#') {
      const parentNode = instance.get_node(parentId);
      const allChildrenChecked = (parentNode.children || []).every((cid) => instance.is_checked(cid));
      isUpdatingRef.current = true;
      if (allChildrenChecked && !instance.is_checked(parentId)) {
        instance.check_node(parentId);
      } else if (!allChildrenChecked && instance.is_checked(parentId)) {
        instance.uncheck_node(parentId);
      }
      isUpdatingRef.current = false;
      parentId = parentNode.parent;
    }
  }, []);

  useEffect(() => {
    if (!selectedCargo && cargoList.length > 0) {
      setSelectedCargo(cargoList[0]);
    }
  }, [cargoList, selectedCargo]);

  const handleCargoChange = (e) => {
    const codigo = e?.target?.value;
    const encontrado = cargoList.find((c) => c.codigo === codigo) || null;
    setSelectedCargo(encontrado);
  };

  const openEditModal = () => {
    if (!selectedCargo) return;
    setEditCargoName(selectedCargo.descricao || '');
    setEditDepartamento(selectedCargo.departamento || '');
    setEditStatus(selectedCargo.status || 'ativo');
    setIsEditOpen(true);
  };

  const saveEditCargo = () => {
    if (!selectedCargo) return;

    const nomeNormalizado = (editCargoName || '').trim().toLowerCase();
    const dep = editDepartamento || '';
    const existeIgual = cargoList.some((c) => (
      c.codigo !== selectedCargo.codigo &&
      (c.descricao || '').trim().toLowerCase() === nomeNormalizado &&
      (c.departamento || '') === dep
    ));

    const prosseguir = () => {
      const atualizados = cargoList.map((c) =>
        c.codigo === selectedCargo.codigo ? { ...c, descricao: editCargoName, departamento: editDepartamento, status: editStatus } : c
      );
      setCargoList(atualizados);
      const atualizado = atualizados.find((c) => c.codigo === selectedCargo.codigo) || null;
      setSelectedCargo(atualizado);
      setIsEditOpen(false);
      toastMessage(`Alterações feitas em ${atualizado?.descricao || atualizado?.codigo} salvas com sucesso`, 'success');
    };

    if (existeIgual) {
      dialogMessage(
        'Já existe esta função neste departamento, deseja prosseguir mesmo assim?',
        'warning',
        { confirmButton: true },
        (confirmou) => { if (confirmou) prosseguir(); }
      );
    } else {
      prosseguir();
    }  

  };

  const openCreateModal = () => {
    setNewCargoName('');
    setIsCreateOpen(true);
    setNewCargoDepartamento('');
    setNewCargoStatus('ativo');
  };

  const handleRemoveCargo = () => {
    if (!selectedCargo) return;
    const nomeCargo = selectedCargo.descricao || selectedCargo.codigo || 'cargo';
    dialogMessage(
      `Tem certeza que deseja remover o cargo ${nomeCargo}?`,
      'warning',
      { confirmButton: true },
      (confirmou) => {
        if (!confirmou) return;
        const idx = cargoList.findIndex((c) => c.codigo === selectedCargo.codigo);
        const novaLista = cargoList.filter((c) => c.codigo !== selectedCargo.codigo);
        setCargoList(novaLista);
        if (novaLista.length === 0) {
          setSelectedCargo(null);
        } else {
          const proximoIndex = Math.min(Math.max(idx, 0), novaLista.length - 1);
          setSelectedCargo(novaLista[proximoIndex]);
        }
        toastMessage(`Cargo ${nomeCargo} removido com sucesso`, 'success');
      }
    );
  };

  const saveCreateCargo = () => {
    const nomeNormalizado = (newCargoName || '').trim().toLowerCase();
    const dep = newCargoDepartamento || '';
    const existeIgual = cargoList.some((c) => (
      (c.descricao || '').trim().toLowerCase() === nomeNormalizado &&
      (c.departamento || '') === dep
    ));

    const prosseguir = () => {
      const nextNumero = cargoList
        .map((c) => parseInt(c.codigo, 10))
        .reduce((max, n) => (Number.isFinite(n) && n > max ? n : max), 0) + 1;
      const novoCodigo = String(nextNumero).padStart(3, '0');
      const novo = { codigo: novoCodigo, descricao: newCargoName || `Cargo ${novoCodigo}`, departamento: newCargoDepartamento, status: newCargoStatus };
      const atualizados = [...cargoList, novo];
      setCargoList(atualizados);
      setSelectedCargo(novo);
      setIsCreateOpen(false);
      toastMessage(`Cargo ${novo.descricao} criado com sucesso`, 'success');
    };

    if (existeIgual) {
      dialogMessage(
        'Já existe esta função neste departamento, deseja prosseguir mesmo assim?',
        'warning',
        { confirmButton: true },
        (confirmou) => { if (confirmou) prosseguir(); }
      );
    } else {
      prosseguir();
    }
  };

  const treeData = [
    {
      id: 'operacional',
      text: 'Operacional',
      state: { opened: false, selected: false },
      data: { nodeType: 'area' },
      type: 'area',
        children: [
        { id: 'operacional_plano_servico', text: 'Plano/Serviço', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'operacional_beneficiario', text: 'Beneficiário', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'operacional_cadastro_representante', text: 'Representante', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'operacional_cadastro_cliente', text: 'Cliente', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'operacional_movimentacoes', text: 'Movimentações', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'operacional_kanban', text: 'Kanban', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'operacional_info_representante', text: 'Info Representante', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
      ],
    },
    {
      id: 'configuracoes',
      text: 'Configurações',
      state: { opened: false, selected: false },
      data: { nodeType: 'area' },
      type: 'area',
            children: [
        {
          id: 'configuracoes_agendador',
          text: 'Agendador de Tarefas',
          state: { opened: false, selected: false },
          data: { nodeType: 'area' },
          type: 'pasta',
          children: [
            { id: 'configuracoes_agendador_financeiro', text: 'Financeiro', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
            { id: 'configuracoes_agendador_associado', text: 'Associado', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
            { id: 'configuracoes_agendador_proposta', text: 'Proposta', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
            { id: 'configuracoes_agendador_mudar_status', text: 'Mudar Status', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
            { id: 'configuracoes_agendador_andamento_proposta', text: 'Andamento da Proposta', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
            { id: 'configuracoes_agendador_representante', text: 'Representante', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
            { id: 'configuracoes_agendador_plataforma_crm', text: 'Plataforma CRM', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
          ],
        },
        { id: 'configuracoes_formulario', text: 'Formulário', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'configuracoes_especialidades', text: 'Especialidades', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'configuracoes_mensagens', text: 'Mensagens da Ferramenta', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'configuracoes_notificacao', text: 'Notificação', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'configuracoes_status', text: 'Status', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'configuracoes_perguntas', text: 'Perguntas Declaração', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'configuracoes_questionario', text: 'Questionário de Vida', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'configuracoes_funcao_usuario', text: 'Função de Usuário', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
            ],
          },
          {
      id: 'relatorios',
      text: 'Relatórios',
      state: { opened: false, selected: false },
      data: { nodeType: 'area' },
      type: 'area',
            children: [
        { id: 'relatorios_geral', text: 'Relatórios Gerais', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
      ],
    },
    {
      id: 'mensagens',
      text: 'Mensagens',
      state: { opened: false, selected: false },
      data: { nodeType: 'area' },
      type: 'area',
      children: [
        { id: 'mensagens_root', text: 'Mensagens', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
      ],
    },
    {
      id: 'seguranca',
      text: 'Segurança',
      state: { opened: false, selected: false },
      data: { nodeType: 'area' },
      type: 'area',
        children: [
        { id: 'seguranca_usuarios', text: 'Usuários', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'seguranca_permissao', text: 'Permissão', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
        { id: 'seguranca_permissao_relatorios', text: 'Permissão Relatórios', state: { selected: false }, data: { nodeType: 'tela' }, type: 'tela' },
      ],
    },
  ];

  const optionsByScreen = {
    operacional_plano_servico: [
      { id: 'PLANO_NOVO', icon: 'fa-regular fa-file', descricao: 'Abre Combo Produto/Serviço - Novo' },
      { id: 'PLANO_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Abre Combo Produto/Serviço - Editar' },
      { id: 'PLANO_IMPRIMIR', icon: 'fa-solid fa-print', descricao: 'Abre Combo Produto/Serviço - Imprimir' },
      { id: 'PLANO_EXPORTAR', icon: 'fa-solid fa-upload', descricao: 'Abre Combo Produto/Serviço - Exportar' },
      { id: 'PLANO_COMBO_NOVO', icon: 'fa-regular fa-file', descricao: 'Combo Produto/Serviço - Novo' },
      { id: 'PLANO_COMBO_GRAVAR', icon: 'fa-solid fa-floppy-disk', descricao: 'Combo Produto/Serviço - Gravar' },
      { id: 'PLANO_COMBO_DELETAR', icon: 'fa-solid fa-trash', descricao: 'Combo Produto/Serviço - Deletar' },
      { id: 'PLANO_COMBO_ADICIONAR', icon: 'fa-solid fa-plus', descricao: 'Combo Produto/Serviço - Produto/Serviço - Adicionar' },
      { id: 'PLANO_COMBO_EXCLUIR', icon: 'fa-solid fa-minus', descricao: 'Combo Produto/Serviço - Produto/Serviço - Excluir' },
    ],
    operacional_beneficiario: [
      { id: 'BENEF_NOVO', icon: 'fa-regular fa-file', descricao: 'Beneficiário - Novo' },
      { id: 'BENEF_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Beneficiário - Editar' },
      { id: 'BENEF_IMPRIMIR', icon: 'fa-solid fa-print', descricao: 'Beneficiário - Imprimir' },
      { id: 'BENEF_EXPORTAR', icon: 'fa-solid fa-upload', descricao: 'Beneficiário - Exportar' },
      { id: 'BENEF_GRAVAR', icon: 'fa-solid fa-floppy-disk', descricao: 'Beneficiário - Gravar' },
      { id: 'BENEF_DELETAR', icon: 'fa-solid fa-trash', descricao: 'Beneficiário - Deletar' },
      { id: 'BENEF_ADICIONAR_DEP', icon: 'fa-solid fa-user-plus', descricao: 'Beneficiário - Adicionar Dependente' },
      { id: 'BENEF_EXCLUIR_DEP', icon: 'fa-solid fa-user-minus', descricao: 'Beneficiário - Excluir Dependente' },
    ],
    operacional_cadastro_representante: [
      { id: 'PRES_NOVO', icon: 'fa-regular fa-file', descricao: 'Representante - Novo' },
      { id: 'PRES_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Representante - Editar' },
      { id: 'PRES_GRAVAR', icon: 'fa-solid fa-floppy-disk', descricao: 'Representante - Gravar' },
      { id: 'PRES_DELETAR', icon: 'fa-solid fa-trash', descricao: 'Representante - Deletar' },
      { id: 'PRES_ESPECIALIDADE', icon: 'fa-solid fa-briefcase-medical', descricao: 'Representante - Especialidades' },
    ],
    operacional_cadastro_cliente: [
      { id: 'CLI_NOVO', icon: 'fa-regular fa-file', descricao: 'Cliente - Novo' },
      { id: 'CLI_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Cliente - Editar' },
      { id: 'CLI_GRAVAR', icon: 'fa-solid fa-floppy-disk', descricao: 'Cliente - Gravar' },
      { id: 'CLI_DELETAR', icon: 'fa-solid fa-trash', descricao: 'Cliente - Deletar' },
      { id: 'CLI_IMPORTAR', icon: 'fa-solid fa-file-import', descricao: 'Cliente - Importar' },
    ],
    operacional_movimentacoes: [
      { id: 'MOV_VISUALIZAR', icon: 'fa-regular fa-eye', descricao: 'Movimentações - Visualizar' },
      { id: 'MOV_IMPORTAR', icon: 'fa-solid fa-file-import', descricao: 'Movimentações - Importar' },
    ],
    operacional_kanban: [
      { id: 'KAN_VISUALIZAR', icon: 'fa-regular fa-eye', descricao: 'Kanban - Visualizar' },
      { id: 'KAN_EDITAR_CARD', icon: 'fa-regular fa-rectangle-list', descricao: 'Kanban - Editar Card' },
      { id: 'KAN_NOVA_FASE', icon: 'fa-solid fa-plus', descricao: 'Kanban - Nova Fase' },
    ],
    operacional_info_representante: [
      { id: 'INFOPRES_VISUALIZAR', icon: 'fa-regular fa-eye', descricao: 'Info Representante - Visualizar' },
      { id: 'INFOPRES_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Info Representante - Editar' },
    ],
    financeiro_tesouraria: [
      { id: 'TES_VISUALIZAR', icon: 'fa-regular fa-eye', descricao: 'Tesouraria - Visualizar' },
      { id: 'TES_IMPRIMIR', icon: 'fa-solid fa-print', descricao: 'Tesouraria - Imprimir' },
      { id: 'TES_EXPORTAR', icon: 'fa-solid fa-upload', descricao: 'Tesouraria - Exportar' },
    ],
    financeiro_lancamento: [
      { id: 'LAN_NOVO', icon: 'fa-regular fa-file', descricao: 'Lançamento - Novo' },
      { id: 'LAN_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Lançamento - Editar' },
      { id: 'LAN_DUPLICAR', icon: 'fa-regular fa-clone', descricao: 'Lançamento - Duplicar' },
      { id: 'LAN_IMPORTAR', icon: 'fa-solid fa-file-import', descricao: 'Lançamento - Importar' },
      { id: 'LAN_GRAVAR', icon: 'fa-solid fa-floppy-disk', descricao: 'Lançamento - Gravar' },
      { id: 'LAN_DELETAR', icon: 'fa-solid fa-trash', descricao: 'Lançamento - Deletar' },
      { id: 'LAN_LOG_AUDITORIA', icon: 'fa-solid fa-shield-halved', descricao: 'Lançamento - Log Auditoria' },
    ],
    configuracoes_formulario: [
      { id: 'FORM_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Formulário - Editar' },
      { id: 'FORM_DUPLICAR', icon: 'fa-regular fa-clone', descricao: 'Formulário - Duplicar' },
      { id: 'FORM_PUBLICAR', icon: 'fa-solid fa-upload', descricao: 'Formulário - Publicar' },
    ],
    configuracoes_especialidades: [
      { id: 'ESP_CADASTRAR', icon: 'fa-solid fa-stethoscope', descricao: 'Especialidades - Cadastrar' },
      { id: 'ESP_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Especialidades - Editar' },
      { id: 'ESP_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Especialidades - Excluir' },
    ],
    configuracoes_mensagens: [
      { id: 'MSG_CADASTRAR', icon: 'fa-solid fa-comments', descricao: 'Mensagens - Cadastrar' },
      { id: 'MSG_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Mensagens - Editar' },
      { id: 'MSG_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Mensagens - Excluir' },
    ],
    configuracoes_notificacao: [
      { id: 'NOTI_CADASTRAR', icon: 'fa-solid fa-bell', descricao: 'Notificação - Cadastrar' },
      { id: 'NOTI_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Notificação - Editar' },
      { id: 'NOTI_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Notificação - Excluir' },
    ],
    configuracoes_status: [
      { id: 'STATUS_CADASTRAR', icon: 'fa-solid fa-toggle-on', descricao: 'Status - Cadastrar' },
      { id: 'STATUS_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Status - Editar' },
      { id: 'STATUS_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Status - Excluir' },
    ],
    configuracoes_perguntas: [
      { id: 'PERG_CADASTRAR', icon: 'fa-solid fa-question', descricao: 'Perguntas Declaração - Cadastrar' },
      { id: 'PERG_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Perguntas Declaração - Editar' },
      { id: 'PERG_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Perguntas Declaração - Excluir' },
    ],
    configuracoes_questionario: [
      { id: 'QUEST_CADASTRAR', icon: 'fa-solid fa-clipboard-list', descricao: 'Questionário de Vida - Cadastrar' },
      { id: 'QUEST_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Questionário de Vida - Editar' },
      { id: 'QUEST_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Questionário de Vida - Excluir' },
    ],
    configuracoes_funcao_usuario: [
      { id: 'FUNCAO_CADASTRAR', icon: 'fa-solid fa-user-gear', descricao: 'Função de Usuário - Cadastrar' },
      { id: 'FUNCAO_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Função de Usuário - Editar' },
      { id: 'FUNCAO_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Função de Usuário - Excluir' },
    ],
    configuracoes_agendador: [
      { id: 'AGEND_VISUALIZAR', icon: 'fa-regular fa-eye', descricao: 'Agendador - Visualizar' },
      { id: 'AGEND_CRIAR', icon: 'fa-solid fa-clock', descricao: 'Agendador - Criar Tarefa' },
      { id: 'AGEND_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador - Excluir Tarefa' },
    ],
    configuracoes_agendador_financeiro: [
      { id: 'AGEND_FIN_CRIAR', icon: 'fa-solid fa-plus', descricao: 'Agendador Financeiro - Criar' },
      { id: 'AGEND_FIN_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Agendador Financeiro - Editar' },
      { id: 'AGEND_FIN_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador Financeiro - Excluir' },
    ],
    configuracoes_agendador_associado: [
      { id: 'AGEND_ASSO_CRIAR', icon: 'fa-solid fa-plus', descricao: 'Agendador Associado - Criar' },
      { id: 'AGEND_ASSO_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Agendador Associado - Editar' },
      { id: 'AGEND_ASSO_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador Associado - Excluir' },
    ],
    configuracoes_agendador_proposta: [
      { id: 'AGEND_PROP_CRIAR', icon: 'fa-solid fa-plus', descricao: 'Agendador Proposta - Criar' },
      { id: 'AGEND_PROP_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Agendador Proposta - Editar' },
      { id: 'AGEND_PROP_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador Proposta - Excluir' },
    ],
    configuracoes_agendador_mudar_status: [
      { id: 'AGEND_STATUS_CRIAR', icon: 'fa-solid fa-plus', descricao: 'Agendador Mudar Status - Criar' },
      { id: 'AGEND_STATUS_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Agendador Mudar Status - Editar' },
      { id: 'AGEND_STATUS_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador Mudar Status - Excluir' },
    ],
    configuracoes_agendador_andamento_proposta: [
      { id: 'AGEND_AND_PROP_CRIAR', icon: 'fa-solid fa-plus', descricao: 'Agendador Andamento Proposta - Criar' },
      { id: 'AGEND_AND_PROP_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Agendador Andamento Proposta - Editar' },
      { id: 'AGEND_AND_PROP_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador Andamento Proposta - Excluir' },
    ],
    configuracoes_agendador_representante: [
      { id: 'AGEND_REP_CRIAR', icon: 'fa-solid fa-plus', descricao: 'Agendador Representante - Criar' },
      { id: 'AGEND_REP_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Agendador Representante - Editar' },
      { id: 'AGEND_REP_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador Representante - Excluir' },
    ],
    configuracoes_agendador_plataforma_crm: [
      { id: 'AGEND_CRM_CRIAR', icon: 'fa-solid fa-plus', descricao: 'Agendador Plataforma CRM - Criar' },
      { id: 'AGEND_CRM_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Agendador Plataforma CRM - Editar' },
      { id: 'AGEND_CRM_EXCLUIR', icon: 'fa-solid fa-trash', descricao: 'Agendador Plataforma CRM - Excluir' },
    ],
    relatorios_geral: [
      { id: 'REL_GERAR', icon: 'fa-solid fa-file-lines', descricao: 'Relatórios - Gerar' },
      { id: 'REL_EXPORTAR', icon: 'fa-solid fa-upload', descricao: 'Relatórios - Exportar' },
      { id: 'REL_IMPRIMIR', icon: 'fa-solid fa-print', descricao: 'Relatórios - Imprimir' },
    ],
    mensagens_root: [
      { id: 'MENS_NOVA', icon: 'fa-solid fa-message', descricao: 'Mensagens - Nova Mensagem' },
      { id: 'MENS_ENVIAR', icon: 'fa-solid fa-paper-plane', descricao: 'Mensagens - Enviar' },
    ],
    seguranca_usuarios: [
      { id: 'USER_CRIAR', icon: 'fa-regular fa-user', descricao: 'Usuários - Criar' },
      { id: 'USER_EDITAR', icon: 'fa-solid fa-user-pen', descricao: 'Usuários - Editar' },
      { id: 'USER_RESETAR_SENHA', icon: 'fa-solid fa-key', descricao: 'Usuários - Resetar Senha' },
      { id: 'USER_BLOQUEAR', icon: 'fa-solid fa-user-lock', descricao: 'Usuários - Bloquear' },
      { id: 'USER_EXCLUIR', icon: 'fa-solid fa-user-xmark', descricao: 'Usuários - Excluir' },
    ],
    seguranca_permissao: [
      { id: 'PERM_VISUALIZAR', icon: 'fa-regular fa-eye', descricao: 'Permissão - Visualizar' },
      { id: 'PERM_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Permissão - Editar' },
    ],
    seguranca_permissao_relatorios: [
      { id: 'PERMREL_EDITAR', icon: 'fa-solid fa-pen', descricao: 'Permissão Relatórios - Editar' },
    ],
  };

  const [selectedOptionsByScreen, setSelectedOptionsByScreen] = useState({});

  const buildOptionsRows = (screenId) => {
    const list = optionsByScreen[screenId] || [];
    return list.map(item => ({
      id: item.id,
      descricao: item.descricao,
      iconClass: item.icon,
    }));
  };

  useEffect(() => {
    if (!treeRef.current) return;

    $(treeRef.current).jstree('destroy');
    $(treeRef.current).jstree({
          core: {
        data: treeData,
        themes: { icons: true },
        multiple: true,
          },
          checkbox: {
            keep_selected_style: false,
            three_state: false,
            cascade: '',
        tie_selection: false,
        whole_node: false,
          },
      types: {
        area: { icon: 'fa-solid fa-folder' },
        pasta: { icon: 'fa-solid fa-folder' },
        tela: { icon: 'fa-regular fa-rectangle-list' },
        default: { icon: 'fa-regular fa-rectangle-list' },
      },
      search: {
        show_only_matches: true,
        case_sensitive: false,
        fuzzy: false,
      },
      plugins: ['checkbox', 'types', 'search', 'wholerow'],
        });

    $(treeRef.current).off('check_node.jstree uncheck_node.jstree select_node.jstree open_node.jstree close_node.jstree ready.jstree search.jstree clear_search.jstree');

    $(treeRef.current).on('check_node.jstree', function (e, data) {
      if (isUpdatingRef.current) return;
      const node = data.node;
      if (node?.data?.nodeType === 'area') {
        isUpdatingRef.current = true;
        node.children_d.forEach((childId) => data.instance.check_node(childId));
        isUpdatingRef.current = false;
        const telaIds = node.children_d.filter((cid) => {
          const nd = data.instance.get_node(cid);
          return nd?.data?.nodeType === 'tela' || nd?.type === 'tela';
        });
        if (telaIds.length > 0) {
          setSelectedOptionsByScreen((prev) => {
            const next = { ...prev };
            telaIds.forEach((tid) => {
              const allOptions = (optionsByScreen[tid] || []).map((o) => o.id);
              if (allOptions.length > 0) next[tid] = allOptions;
            });
            return next;
          });
        }
      } else if (node?.data?.nodeType === 'tela') {
        const allOptions = (optionsByScreen[node.id] || []).map(o => o.id);
        if (allOptions.length > 0) {
          setSelectedOptionsByScreen(prev => ({
            ...prev,
            [node.id]: allOptions,
          }));
        }
      }
      updateAncestorsCheckState(data.instance, node.id);
    });

    $(treeRef.current).on('uncheck_node.jstree', function (e, data) {
      if (isUpdatingRef.current) return;
      const node = data.node;
      if (node?.data?.nodeType === 'area') {
        isUpdatingRef.current = true;
        node.children_d.forEach((childId) => data.instance.uncheck_node(childId));
        isUpdatingRef.current = false;
        const telaIds = node.children_d.filter((cid) => {
          const nd = data.instance.get_node(cid);
          return nd?.data?.nodeType === 'tela' || nd?.type === 'tela';
        });
        if (telaIds.length > 0) {
          setSelectedOptionsByScreen((prev) => {
            const next = { ...prev };
            telaIds.forEach((tid) => { delete next[tid]; });
            return next;
          });
        }
      } else if (node?.data?.nodeType === 'tela') {
        setSelectedOptionsByScreen(prev => {
          const copy = { ...prev };
          delete copy[node.id];
          return copy;
        });
      }
      updateAncestorsCheckState(data.instance, node.id);
    });

    $(treeRef.current).on('select_node.jstree', function (e, data) {
      const node = data.node;
      if (node?.data?.nodeType === 'area') {
        data.instance.deselect_node(node);
        return;
      }
      setSelectedScreenId(node.id);
    });

    $(treeRef.current).on('open_node.jstree', function (e, data) {
      const node = data.node;
      if (node?.type === 'area' || node?.type === 'pasta') {
        const $el = data.instance.get_node(node, true);
        const $icon = $el.find('> a > i.jstree-themeicon');
        $icon.removeClass('fa-folder').addClass('fa-folder-open');
      }
      openNodeIdsRef.current.add(node.id);
    });

    $(treeRef.current).on('close_node.jstree', function (e, data) {
      const node = data.node;
      if (node?.type === 'area' || node?.type === 'pasta') {
        const $el = data.instance.get_node(node, true);
        const $icon = $el.find('> a > i.jstree-themeicon');
        $icon.removeClass('fa-folder-open').addClass('fa-folder');
      }
      openNodeIdsRef.current.delete(node.id);
    });

    $(treeRef.current).on('ready.jstree', function (e, data) {
      const instance = data.instance;
      const flat = instance.get_json('#', { flat: true });
      flat.forEach((n) => {
        if (n.type === 'area' || n.type === 'pasta') {
          const $el = instance.get_node(n.id, true);
          const $icon = $el.find('> a > i.jstree-themeicon');
          if (n.state && n.state.opened) {
            $icon.removeClass('fa-folder').addClass('fa-folder-open');
          } else {
            $icon.removeClass('fa-folder-open').addClass('fa-folder');
          }
        }
      });
      if (openNodeIdsRef.current.size > 0) {
        openNodeIdsRef.current.forEach((id) => {
          try { instance.open_node(id); } catch(_) {}
        });
      }
    });

    $(treeRef.current).on('search.jstree', function (e, data) {
      applyTreeHighlights(data.str || '');
      const instance = data.instance;
      if (openNodeIdsRef.current.size > 0) {
        openNodeIdsRef.current.forEach((id) => {
          try { instance.open_node(id); } catch(_) {}
        });
      }
    });
    $(treeRef.current).on('clear_search.jstree', function () {
      clearTreeHighlights();
    });
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && treeRef.current) {
        const instance = $(treeRef.current).jstree(true);
        if (instance) {
          openNodeIdsRef.current.forEach((id) => {
            try { instance.open_node(id); } catch(_) {}
          });
          if (treeQuery) {
            instance.search(treeQuery);
            applyTreeHighlights(treeQuery);
          }
        }
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [treeQuery]);

  useEffect(() => {
    if (!treeRef.current) return;
    const instance = $(treeRef.current).jstree(true);
    if (instance) {
      instance.search(treeQuery);
    }
  }, [treeQuery]);

  useEffect(() => {
  }, [treeRef.current])

  return (
    <main className={styles.mainSection}>
      <h2 className={styles.beneficiariosTitleTela}>
        <i className="fa-solid fa-shield-alt"></i>
        Permissões{selectedCargo ? ` - ${selectedCargo.descricao || selectedCargo.codigo}` : ''}
      </h2>
      <div className={styles.moldura}>
      <div className={styles.cargoRow}>
          <UseInputPadrao
            label="Cargo"
            type="select"
            identifier="cargo-select"
            options={cargoList.map((c) => ({ value: c.codigo, label: c.descricao }))}
            value={selectedCargo?.codigo || ''}
            onChange={handleCargoChange}
            width={isMobile ? 100 : 29.9}
            gap={0}
          />
          <div className={styles.cargoActions}>
            <button className={`${styles.actionButton} ${styles.actionButtonEditar}`} onClick={openEditModal}>
              <i className="fa-solid fa-pen"></i>
              Editar
            </button>
            <button className={`${styles.actionButton} ${styles.actionButtonDeletar}`} onClick={handleRemoveCargo}>
              <i className="fa-solid fa-trash"></i>
              Remover
            </button>
            <button className={`${styles.actionButton} ${styles.actionButtonNovo}`} onClick={openCreateModal}>
              <i className="fa-solid fa-plus"></i>
              Novo
            </button>
          </div>
      </div>

      <div className={styles.permissionsLayout}>
        <div className={styles.treePanel}>

          <div className={styles.treeToolbar}>
            <UseInputPadrao
              label="Área ou tela"
              type="search"
              identifier="tree-search"
              value={treeQuery}
              onChange={(e) => setTreeQuery(e.target.value)}
              width={isMobile ? 100 : 100}
              gap={0}
            />
            <Tooltip text={openAll ? 'Fechar pastas' : 'Abrir pastas'} position="top">
              <label className={styles.switch} title="Alternar abrir/fechar todas as pastas">
                <input
                  type="checkbox"
                  className={styles.switchInput}
                  checked={openAll}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setOpenAll(checked);
                    if (treeRef.current) {
                      if (checked) {
                        $(treeRef.current).jstree('open_all');
                      } else {
                        $(treeRef.current).jstree('close_all');
                      }
                    }
                  }}
                  aria-label="Alternar abrir/fechar todas as pastas"
                  />
                <span className={styles.switchSlider} />
              </label>
            </Tooltip>
            <button
              className={`${styles.actionButton} ${styles.actionButtonGravar}`}
              onClick={handleSavePermissions}
              title="Gravar permissões"
            >
              <i className="fa-solid fa-save"></i>
              Gravar
            </button>
          </div>
          <div className={styles.jstreeContainer} ref={treeRef} />
        </div>

        <div className={styles.treePanel}>
          <div className={styles.panelTitle}>Selecione as ações permitidas</div>
          <TabelaPadrão
            tabelaId="tabelaOpcoes"
            columns={[
              {
                value: 'descricao',
                name: 'Descrição',
                align: 'left',
                formatter: (value, row) => (
                  <span className={styles.optionCell}>
                    <i className={`${row.iconClass} ${styles.optionIcon}`} />
                    {value}
                  </span>
                )
              },
            ]}
            data={selectedScreenId ? buildOptionsRows(selectedScreenId) : []}
            options={{
              rowSelection: true,
              rowSelectionMode: 'multiple',
              onRowSelectChange: (rows) => {
                const selecionados = rows.map(r => r.id);
                setSelectedOptionsByScreen(prev => ({
                  ...prev,
                  [selectedScreenId]: selecionados,
                }));

                const total = (optionsByScreen[selectedScreenId] || []).length;
                const instance = treeRef.current ? $(treeRef.current).jstree(true) : null;
                if (instance && selectedScreenId) {
                  isUpdatingRef.current = true;
                  if (selecionados.length === total && total > 0) {
                    instance.check_node(selectedScreenId);
                  } else if (selecionados.length === 0) {
                    instance.uncheck_node(selectedScreenId);
                  }
                  isUpdatingRef.current = false;
                  updateAncestorsCheckState(instance, selectedScreenId);
                }
              },
              selectedRowIds: selectedOptionsByScreen[selectedScreenId] || [],
              rowIdKey: 'id'
            }}
          />
        </div>
      </div>
      </div>

      {isEditOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <i className="fa-solid fa-pen"></i>
                <h2 className={styles.modalTitle}>Editar Cargo</h2>
              </div>
              <button className={styles.modalCloseButton} onClick={() => setIsEditOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className={styles.modalBody}>
            <div className={styles.modalFields}>
                <UseInputPadrao
                  label="Nome do Cargo"
                  type="text"
                  identifier="editar-cargo-nome"
                  value={editCargoName}
                  onChange={(e) => setEditCargoName(e.target.value)}
                  width={100}
                />
                <UseInputPadrao
                  label="Departamento"
                  type="select"
                  identifier="editar-cargo-departamento"
                  options={departamentoOptions}
                  value={editDepartamento}
                  onChange={(e) => setEditDepartamento(e.target.value)}
                  width={100}
                />
                <UseInputPadrao
                  label="Status"
                  type="select"
                  identifier="editar-cargo-status"
                  options={statusOptions}
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  width={100}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={saveEditCargo}>
                <i className="fa-solid fa-save"></i>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <i className="fa-solid fa-plus"></i>
                <h2 className={styles.modalTitle}>Novo Cargo</h2>
              </div>
              <button className={styles.modalCloseButton} onClick={() => setIsCreateOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalFields}>
                  <UseInputPadrao
                    label="Nome do Cargo"
                    type="text"
                    identifier="novo-cargo-nome"
                    value={newCargoName}
                    onChange={(e) => setNewCargoName(e.target.value)}
                    width={100}
                  />
                  <UseInputPadrao
                    label="Departamento"
                    type="select"
                    identifier="novo-cargo-departamento"
                    options={departamentoOptions}
                    value={newCargoDepartamento}
                    onChange={(e) => setNewCargoDepartamento(e.target.value)}
                    width={100}
                  />
                  <UseInputPadrao
                    label="Status"
                    type="select"
                    identifier="novo-cargo-status"
                    options={statusOptions}
                    value={newCargoStatus}
                    onChange={(e) => setNewCargoStatus(e.target.value)}
                    width={100}
                  />
                </div>
              </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.actionButton} ${styles.actionButtonGravar}`} onClick={saveCreateCargo}>
                <i className="fa-solid fa-save"></i>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function NavigateToPermissao({ setGoBack }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${jsonRoute.AreaOperadora}/${jsonRoute.Seguranca}`);
    setGoBack(false);
  }, [navigate, setGoBack]);

  return null;
}

export default PermissaoInformacoes;