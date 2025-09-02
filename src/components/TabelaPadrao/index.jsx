/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import * as XLSX from 'xlsx';
import ReactDOM, { createPortal } from 'react-dom';
import Pagination from "../Pagination";
import Tooltip from "../TooltipPadrao";
import styles from "./styles.module.css";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
const COLUMN_SELECTOR_GAP = 8;

const TabelaPadrao = ({ tabelaId, columns, data, footer, options = {} }) => {
    const defaultOptions = {
        fileName: "relatorio",
        cardsPerPage: 10,
        cardsPerPageOptions: [10, 25, 50, 100],
        showHeader: true,
        showFooter: false,
        toolbar: true,
        showPaginationSwitch: false,
        showSearch: false,
        showRefresh: false,
        showToggleView: false,
        showColumnsSelector: false,
        showExport: false,
        showFilter: false,
        showGuardaCampos: false,
        additionalButtons: [],
        paginationEnabled: true,
        tableView: "table",
        customView: null,
        rowOnClick: false,
        rowSelection: false,
        rowSelectionMode: "multiple",
        onRowSelectChange: null,
        onDataChange: null,
        toolbarComponent: null,
    };

    const mergedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [options]);

    // alteração-permissao-começo //
    // Suporte a seleção controlada: options.selectedRowIds (array de IDs)
    // e options.rowIdKey (chave do ID nas linhas, default 'id').
    const rowIdKey = mergedOptions.rowIdKey || 'id';
    const selectedRowIds = mergedOptions.selectedRowIds || null;
    const controlledSyncRef = useRef(false);
    // alteração-permissao-fim //

    const [tabelaColumns, setTabelaColumns] = useState([]);
    const [footerColumns, setFooterColumns] = useState([]);
    const [tabelaBody, setTabelaBody] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCardsPerPage, setCurrentCardsPerPage] = useState(mergedOptions.cardsPerPage);
    const [paginationEnabled, setPaginationEnabled] = useState(mergedOptions.paginationEnabled);
    const [tableView, setTableView] = useState(mergedOptions.tableView);
    const [selectorPosition, setSelectorPosition] = useState({});
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [footerVisibility, setFooterVisibility] = useState({});
    const columnSelectorRef = useRef(null);
    const columnsButtonRef = useRef(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "none",
    });
    const [selectAllStatus, setSelectAllStatus] = useState('nenhum');
    const [selectedRows, setSelectedRows] = useState([]);
    const [isToolbarMenuOpen, setIsToolbarMenuOpen] = useState(false);
    const toolbarMenuRef = useRef(null);
    const toolbarButtonRef = useRef(null);
    const [toolbarMenuPosition, setToolbarMenuPosition] = useState({});

    // alteração-permissao-começo //
    // Sincroniza seleção visual quando selectedRowIds é controlado externamente
    useEffect(() => {
        if (!mergedOptions.rowSelection) return;
        if (!selectedRowIds) return;
        const idToIndex = new Map();
        tabelaBody.forEach((row, index) => {
            idToIndex.set(row[rowIdKey], index);
        });
        const indices = selectedRowIds
            .map((id) => idToIndex.get(id))
            .filter((idx) => typeof idx === 'number');
        // Evita loops: só atualiza se houve mudança real
        const isSameLength = indices.length === selectedRows.length;
        const isSame = isSameLength && indices.every((v, i) => v === selectedRows[i]);
        if (!isSame) {
            controlledSyncRef.current = true;
            setSelectedRows(indices);
        }
    }, [selectedRowIds, tabelaBody, rowIdKey, mergedOptions.rowSelection]);
    // alteração-permissao-fim //

    const [selectedColumnCells, setSelectedColumnCells] = useState({});
    const [selectColumnStatus, setSelectColumnStatus] = useState({});
    const lastDataSent = useRef(null);

    useEffect(() => {
        if (columns) {
            const columnDefaultOptions = {
                sortable: true,
                align: "center",
                headerStyle: {},
                cellStyle: {},
                type: "text",
            };
            const initialVisibility = {};
            const processedColumns = [];

            columns.forEach((item) => {
                if (item.subColumns && item.subColumns.length > 0) {
                    const processedSubColumns = item.subColumns.map((subItem) => {
                        initialVisibility[subItem.value] = subItem.visible !== undefined ? subItem.visible : true;
                        return {
                            ...columnDefaultOptions,
                            ...subItem,
                            parentValue: item.value,
                        };
                    });
                    processedColumns.push({
                        ...columnDefaultOptions,
                        ...item,
                        isParent: true,
                        subColumns: processedSubColumns,
                    });
                    processedColumns.push(...processedSubColumns);
                } else {
                    initialVisibility[item.value] = item.visible !== undefined ? item.visible : true;
                    processedColumns.push({
                        ...columnDefaultOptions,
                        ...item,
                    });
                }
            });

            setTabelaColumns(processedColumns);
            setColumnVisibility(initialVisibility);
        }
    }, [columns]);

    useEffect(() => {
        if (footer) {
            const footerDefaultOptions = {
                footerStyle: {},
                cellStyle: {},
            };
            const initialVisibility = {};
            const processedColumns = footer.map((item) => {
                initialVisibility[item.value] = item.visible !== undefined ? item.visible : true;
                return {
                    ...footerDefaultOptions,
                    ...item,
                };
            });
            setFooterColumns(processedColumns);
            setFooterVisibility(initialVisibility);
        }
    }, [footer]);
    
    useEffect(() => {
        if (data) {
            setTabelaBody(data);
            setSortConfig({ key: null, direction: "none" });
            if (mergedOptions.rowSelectionMode === 'single') {
                setSelectedRows([]);
            }
            if (paginationEnabled) setCurrentPage(1);
        }
    }, [data, paginationEnabled, mergedOptions.rowSelectionMode]);

    useEffect(() => {
        setCurrentCardsPerPage(mergedOptions.cardsPerPage);
        setCurrentPage(1); 
    }, [mergedOptions.cardsPerPage]);

    const handleSort = useCallback((key) => {
        let direction = "asc";
        if (sortConfig.key === key) {
            if (sortConfig.direction === "asc") direction = "desc";
            else if (sortConfig.direction === "desc") direction = "none";
        }
    
        setSortConfig({ key, direction });

        if (direction !== "none") {
            const sortedData = [...tabelaBody].sort((a, b) => {
                const aValue = a[key]?.sortableValue ?? a[key];
                const bValue = b[key]?.sortableValue ?? b[key];

                if (aValue === null || aValue === undefined) return 1;
                if (bValue === null || bValue === undefined) return -1;

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                if (aValue < bValue) return direction === "asc" ? -1 : 1;
                if (aValue > bValue) return direction === "asc" ? 1 : -1;
                return 0;
            });
            setTabelaBody(sortedData);
        } else {
            setTabelaBody(data ? [...data] : []);
        }
    }, [sortConfig, tabelaBody, data]);

    const indexOfLastCard = paginationEnabled ? currentPage * currentCardsPerPage : tabelaBody.length;
    const indexOfFirstCard = paginationEnabled ? indexOfLastCard - currentCardsPerPage : 0;
    
    const currentCards = useMemo(() => {
        return tabelaBody.slice(indexOfFirstCard, indexOfLastCard);
    }, [tabelaBody, indexOfFirstCard, indexOfLastCard]);

    const renderCellContent = useCallback((cellValue, row) => {
        if (typeof cellValue === "function") {
            return cellValue(row);
        }
        if (cellValue && typeof cellValue === "object" && 'value' in cellValue) {
            return cellValue.value;
        }
        if (React.isValidElement(cellValue)) {
            return cellValue;
        }
        return cellValue ?? '-';
    }, []);
    
    const formatters = useMemo(() => ({
        currency: (value) => `R$ ${Number(value)?.toFixed(2).replace('.', ',') || '0,00'}`,
        date: (value) => value ? new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-',
        brDate: (value) => {
            if (!value) return '-';
            try {
                if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
                    const [year, month, day] = value.substring(0, 10).split('-');
                    return `${day}/${month}/${year}`;
                }
                if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                    return value;
                }
                const dateObj = new Date(value);
                if (!isNaN(dateObj.getTime())) {
                    return dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                }
                return 'Data inválida';
            } catch {
                return 'Erro na data';
            }
        },
        boolean: (value) => value ? 'Sim' : 'Não',
        percentage: (value) => `${(Number(value) * 100)?.toFixed(2).replace('.', ',') || '0'}%`
    }), []);

    const renderFormattedCell = useCallback((rawValue, column, row) => {
        const value = rawValue ?? (column.defaultValue !== undefined ? column.defaultValue : '-');

        if (column.component) {
            const Component = column.component;
            return <Component value={value} row={row} column={column} />;
        }
        if (typeof column.formatter === "function") {
            return column.formatter(value, row, column);
        }
        if (column.format && formatters[column.format]) {
            return formatters[column.format](value, row, column);
        }
        return renderCellContent(value, row);
    }, [formatters, renderCellContent]);

    const getCellStyle = useCallback((column, row) => {
        const cellData = row[column.value];
        const baseStyle = {
            textAlign: column.align || 'left',
            cursor: column.__onClick || row.__onClick || mergedOptions.rowOnClick ? 'pointer' : 'default',
            ...column.cellStyle
        };

        if (cellData && typeof cellData === 'object' && cellData.style) {
            return { ...baseStyle, ...cellData.style };
        }
        return baseStyle;
    }, []);
    
    const handlePaginationSwitchClick = useCallback(() => {
        const newPaginationState = !paginationEnabled;
        setPaginationEnabled(newPaginationState);
        if (newPaginationState) setCurrentPage(1);
        if (typeof mergedOptions.showPaginationSwitch === "function") {
            mergedOptions.showPaginationSwitch(newPaginationState);
        }
    }, [paginationEnabled, mergedOptions]);
    
    const handleRefreshClick = useCallback(() => {
        if (typeof mergedOptions.showRefresh === "function") mergedOptions.showRefresh();
    }, [mergedOptions]);

    const handleSearchClick = useCallback(() => {
        if (typeof mergedOptions.showSearch === "function") mergedOptions.showSearch();
    }, [mergedOptions]);
    
    const handleToggleViewClick = useCallback(() => {
        const newTableView = tableView === 'table' ? "list"
                           : tableView === 'list' ? (mergedOptions.customView ? "custom" : "table")
                           : "table";
        setTableView(newTableView);
        if (typeof mergedOptions.showToggleView === "function") {
            mergedOptions.showToggleView(newTableView);
        }
    }, [tableView, mergedOptions]);

    const handleColumnsSelectorClick = useCallback(() => {
        setShowColumnSelector(prev => !prev);
        if (typeof mergedOptions.showColumnsSelector === "function") {
            mergedOptions.showColumnsSelector(!showColumnSelector);
        }
    }, [showColumnSelector, mergedOptions]);

    const handleExportClick = useCallback(() => {
        if (typeof mergedOptions.showExport === "function") mergedOptions.showExport();
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
            XLSX.writeFile(workbook, mergedOptions.fileName + ".xlsx");
    }, [mergedOptions]);

    const handleFilterClick = useCallback(() => {
        if (typeof mergedOptions.showFilter === "function") mergedOptions.showFilter();
    }, [mergedOptions]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showColumnSelector &&
                columnSelectorRef.current && !columnSelectorRef.current.contains(event.target) &&
                toolbarMenuRef.current && !toolbarMenuRef.current.contains(event.target)
            ) {
                setShowColumnSelector(false);
            }
        };
        if (showColumnSelector) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showColumnSelector]);

    const calculateSelectorPosition = useCallback(() => {
        if (!toolbarMenuRef.current || !columnSelectorRef.current) return {};

        const menuRect = toolbarMenuRef.current.getBoundingClientRect();
        const selectorRect = columnSelectorRef.current.getBoundingClientRect();
        const selectorWidth = selectorRect.width;
        const selectorHeight = selectorRect.height;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const spaceRight = viewportWidth - menuRect.right - COLUMN_SELECTOR_GAP;
        const spaceLeft = menuRect.left - COLUMN_SELECTOR_GAP;
        const spaceBelow = viewportHeight - menuRect.bottom - COLUMN_SELECTOR_GAP;
        const spaceAbove = menuRect.top - COLUMN_SELECTOR_GAP;

        let newPos = {};

        // Posicionamento Horizontal
        if (spaceRight >= selectorWidth || (spaceRight >= 0 && spaceRight >= spaceLeft)) {
            newPos.left = `${menuRect.left + window.scrollX}px`;
        } else if (spaceLeft >= selectorWidth || (spaceLeft >=0 && spaceLeft > spaceRight)) {
            newPos.left = `${menuRect.right + window.scrollX - selectorWidth}px`;
        } else { 
            newPos.left = `${Math.max(COLUMN_SELECTOR_GAP + window.scrollX, menuRect.left + window.scrollX - (selectorWidth - (viewportWidth - menuRect.left - COLUMN_SELECTOR_GAP)))}px`;
        }

        // Posicionamento Vertical
        if (spaceBelow >= selectorHeight || (spaceBelow >=0 && spaceBelow >= spaceAbove)) {
            newPos.top = `${menuRect.bottom + window.scrollY + COLUMN_SELECTOR_GAP}px`;
        } else if (spaceAbove >= selectorHeight || (spaceAbove >= 0 && spaceAbove > spaceBelow)) {
            newPos.top = `${menuRect.top + window.scrollY - selectorHeight - COLUMN_SELECTOR_GAP}px`;
        } else {
             newPos.top = `${Math.max(COLUMN_SELECTOR_GAP + window.scrollY, menuRect.top + window.scrollY - (selectorHeight - (viewportHeight - menuRect.bottom - COLUMN_SELECTOR_GAP)) )}px`;
        }
        return newPos;
    }, []);

    useEffect(() => {
        if (showColumnSelector) {
            requestAnimationFrame(() => {
                if (toolbarMenuRef.current && columnSelectorRef.current) {
                    const position = calculateSelectorPosition();
                    if (Object.keys(position).length > 0) {
                        setSelectorPosition(position);
                    }
                }
            });
        }
    }, [showColumnSelector, calculateSelectorPosition]);

    const handleColumnToggle = useCallback((columnValue) => {
        setColumnVisibility(prev => ({
            ...prev,
            [columnValue]: !prev[columnValue]
        }));
    }, []);

    const handleFooterToggle = useCallback((columnValue) => {
        setFooterVisibility(prev => ({
            ...prev,
            [columnValue]: !prev[columnValue]
        }));
    }, []);

    const visibleColumns = useMemo(() =>
        tabelaColumns.filter(column => columnVisibility[column.value] && !column.isParent),
    [tabelaColumns, columnVisibility]);

    const footerVisibleColumns = useMemo(() => 
        footerColumns.filter(column => footerVisibility[column.value]),
    [footerColumns, footerVisibility]);

    
    const handleToolbarMenu = useCallback(() => {
        setIsToolbarMenuOpen(prev => !prev);
    }, [isToolbarMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isToolbarMenuOpen &&
                toolbarMenuRef.current && !toolbarMenuRef.current.contains(event.target) &&
                toolbarButtonRef.current && !toolbarButtonRef.current.contains(event.target) && 
                columnSelectorRef.current && !columnSelectorRef.current.contains(event.target)
            ) {
                setIsToolbarMenuOpen(false);
            }
        };
        if (isToolbarMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isToolbarMenuOpen]);

    const calculateToolbarMenuPosition = useCallback(() => {
        if (!toolbarButtonRef.current || !toolbarMenuRef.current) return {};

        const buttonRect = toolbarButtonRef.current.getBoundingClientRect();
        const menuRect = toolbarMenuRef.current.getBoundingClientRect();
        const selectorWidth = menuRect.width;
        const selectorHeight = menuRect.height;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const spaceRight = viewportWidth - buttonRect.right - COLUMN_SELECTOR_GAP;
        const spaceLeft = buttonRect.left - COLUMN_SELECTOR_GAP;
        const spaceBelow = viewportHeight - buttonRect.bottom - COLUMN_SELECTOR_GAP;
        const spaceAbove = buttonRect.top - COLUMN_SELECTOR_GAP;

        let newPos = {};

        // Posicionamento Horizontal
        if (spaceRight >= selectorWidth || (spaceRight >= 0 && spaceRight >= spaceLeft)) {
            newPos.left = `${buttonRect.left + window.scrollX}px`;
        } else if (spaceLeft >= selectorWidth || (spaceLeft >=0 && spaceLeft > spaceRight)) {
            newPos.left = `${buttonRect.right + window.scrollX - selectorWidth}px`;
        } else { 
            newPos.left = `${Math.max(COLUMN_SELECTOR_GAP + window.scrollX, buttonRect.left + window.scrollX - (selectorWidth - (viewportWidth - buttonRect.left - COLUMN_SELECTOR_GAP)))}px`;
        }

        // Posicionamento Vertical
        if (spaceBelow >= selectorHeight || (spaceBelow >=0 && spaceBelow >= spaceAbove)) {
            newPos.top = `${buttonRect.bottom + window.scrollY + COLUMN_SELECTOR_GAP}px`;
        } else if (spaceAbove >= selectorHeight || (spaceAbove >= 0 && spaceAbove > spaceBelow)) {
            newPos.top = `${buttonRect.top + window.scrollY - selectorHeight - COLUMN_SELECTOR_GAP}px`;
        } else {
             newPos.top = `${Math.max(COLUMN_SELECTOR_GAP + window.scrollY, buttonRect.top + window.scrollY - (selectorHeight - (viewportHeight - buttonRect.bottom - COLUMN_SELECTOR_GAP)) )}px`;
        }
        return newPos;
    }, []);

    useEffect(() => {
        if (isToolbarMenuOpen) {
            requestAnimationFrame(() => {
                if (toolbarButtonRef.current && toolbarMenuRef.current) {
                    const position = calculateToolbarMenuPosition();
                    if (Object.keys(position).length > 0) {
                        setToolbarMenuPosition(position);
                    }
                }
            });
        }
    }, [isToolbarMenuOpen, calculateToolbarMenuPosition]);

    const debounce = useCallback((func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }, []);

    useEffect(() => {
        const handleResizeLayout = debounce(() => {
            const tabelaContainerEl = document.getElementById(`tabelaContainer-${tabelaId}`);
            if (tabelaContainerEl && tabelaContainerEl.parentElement) {
                tabelaContainerEl.style.maxWidth = `${tabelaContainerEl.parentElement.offsetWidth}px`;
            }
            if (showColumnSelector && columnsButtonRef.current) {
                 requestAnimationFrame(() => {
                    if (columnSelectorRef.current) {
                        const position = calculateSelectorPosition();
                        setSelectorPosition(position);
                    }
                });
            }
            if (isToolbarMenuOpen && toolbarButtonRef.current) {
                 requestAnimationFrame(() => {
                    if (columnSelectorRef.current) {
                        const position = calculateToolbarMenuPosition();
                        setToolbarMenuPosition(position);
                    }
                });
            }
        }, 150);

        window.addEventListener('resize', handleResizeLayout);
        window.addEventListener('layout-resize', handleResizeLayout);
        
        handleResizeLayout();

        return () => {
            window.removeEventListener('resize', handleResizeLayout);
            window.removeEventListener('layout-resize', handleResizeLayout);
        };
    }, [showColumnSelector, calculateSelectorPosition, isToolbarMenuOpen, calculateToolbarMenuPosition, debounce, tabelaId]);

    const handleRowSelect = useCallback((rowIndex) => {
        setSelectedRows(prevSelected => {
            if (mergedOptions.rowSelectionMode === "single") {
                return prevSelected.includes(rowIndex) ? [] : [rowIndex];
            } else { 
                if (prevSelected.includes(rowIndex)) {
                    return prevSelected.filter(id => id !== rowIndex);
                } else {
                    return [...prevSelected, rowIndex];
                }
            }
        });
    }, [mergedOptions.rowSelectionMode]);

    const handleSelectAll = useCallback(() => {
        if (mergedOptions.rowSelectionMode !== "multiple") {
            return;
        }

        setSelectAllStatus(prevStatus => {
            let newSelectedRows = [];
            let newStatus;
            let aux;

            if (prevStatus === 'nenhum') {
                aux = selectedRows;
                for (let i = indexOfFirstCard; i < indexOfLastCard; i++) {
                    if (tabelaBody[i]) {
                        newSelectedRows.push(i);
                    }
                }
                newSelectedRows = Array.from(new Set(aux.concat(newSelectedRows))).sort(function(a, b) {return a - b});
                newStatus = newSelectedRows.length === tabelaBody.length ? 'todos' : 'parcial';
            } else if (prevStatus === 'parcial') {
                newSelectedRows = Array.from({ length: tabelaBody.length }, (_, i) => i);
                newStatus = 'todos';
            } else {
                newSelectedRows = [];
                newStatus = 'nenhum';
            }

            setSelectedRows(newSelectedRows);
            return newStatus;
        });
    }, [selectedRows, indexOfFirstCard, indexOfLastCard]);

    useEffect(() => {
        const currentSelectionCount = currentCards.filter((_, index) =>
            selectedRows.includes(indexOfFirstCard + index)
        ).length;

        if (selectedRows.length === tabelaBody.length && tabelaBody.length > 0) {
            setSelectAllStatus('todos');
        } else if (currentSelectionCount === currentCards.length) {
            setSelectAllStatus('parcial');
        } else if (selectedRows.length !== currentCards.length && currentCards.length > 0) {
            setSelectAllStatus('nenhum');
        } else {
            setSelectAllStatus('nenhum');
        }
    }, [selectedRows, tabelaBody, currentCards, indexOfFirstCard]);

    // alteração-permissao-começo //
    // Notifica seleção apenas quando selectedRows/tabelaBody mudarem
    const prevNotifyRef = useRef({ rows: [], len: 0 });
    useEffect(() => {
        if (controlledSyncRef.current) {
            controlledSyncRef.current = false;
            return;
        }
        if (mergedOptions.onRowSelectChange && typeof mergedOptions.onRowSelectChange === 'function') {
            const selectedData = tabelaBody.filter((_, index) => selectedRows.includes(index));
            const prev = prevNotifyRef.current;
            const sameLen = prev.len === selectedRows.length;
            const sameRows = sameLen && prev.rows.every((v, i) => v === selectedRows[i]);
            if (!sameRows) {
                prevNotifyRef.current = { rows: [...selectedRows], len: selectedRows.length };
                mergedOptions.onRowSelectChange(selectedData);
            }
        }
    }, [selectedRows, tabelaBody]);
    // alteração-permissao-fim //

    const handleColumnRowSelect = useCallback((rowIndex, columnValue) => {
        setSelectedColumnCells(prevSelection => {
            const columnSelections = prevSelection[columnValue] || [];
            if (columnSelections.includes(rowIndex)) {
                return {
                    ...prevSelection,
                    [columnValue]: columnSelections.filter(id => id !== rowIndex),
                };
            } else {
                return {
                    ...prevSelection,
                    [columnValue]: [...columnSelections, rowIndex],
                };
            }
        });
    }, []);

    const handleColumnSelectAll = useCallback((columnValue) => {
        setSelectedColumnCells(prevSelection => {
            const allRowsIndexes = Array.from({ length: tabelaBody.length }, (_, i) => i);
            const currentSelected = prevSelection[columnValue] || [];
            const currentPageIndexes = currentCards.map((_, index) => indexOfFirstCard + index);

            if (currentPageIndexes.every(index => currentSelected.includes(index)) && currentSelected.length < allRowsIndexes.length) {
                return {
                    ...prevSelection,
                    [columnValue]: allRowsIndexes,
                };
            }
            
            if (currentSelected.length === allRowsIndexes.length) {
                return {
                    ...prevSelection,
                    [columnValue]: [],
                };
            }
            
            const newSelection = Array.from(new Set([...currentSelected, ...currentPageIndexes]));
            return {
                ...prevSelection,
                [columnValue]: newSelection,
            };
        });
    }, [tabelaBody, currentCards, indexOfFirstCard]);

    useEffect(() => {
        const newStatus = {};
        tabelaColumns.forEach(column => {
            if (column.type === 'select') {
                const allRows = tabelaBody.length;
                const allSelected = selectedColumnCells[column.value]?.length || 0;
                const currentSelectedInPage = currentCards.filter((_, index) => 
                    selectedColumnCells[column.value]?.includes(indexOfFirstCard + index)
                ).length;

                if (allSelected === allRows && allRows > 0) {
                    newStatus[column.value] = 'todos';
                } else if (currentSelectedInPage > 0 && currentSelectedInPage === currentCards.length) {
                    newStatus[column.value] = 'parcial';
                } else {
                    newStatus[column.value] = 'nenhum';
                }
            }
        });
        setSelectColumnStatus(newStatus);
    }, [selectedColumnCells, tabelaBody, tabelaColumns, currentCards, indexOfFirstCard]);

    useEffect(() => {
        if (mergedOptions.onDataChange && typeof mergedOptions.onDataChange === 'function') {
            const transformedData = tabelaBody.map((row, index) => {
                const newRow = { ...row };
                visibleColumns.forEach(column => {
                    if (column.type === 'select') {
                        const isSelected = selectedColumnCells[column.value]?.includes(index);
                        newRow[column.value] = isSelected ? true : false;
                    }
                });
                return newRow;
            });

            if (JSON.stringify(transformedData) !== JSON.stringify(lastDataSent.current)) {
                lastDataSent.current = transformedData;
                mergedOptions.onDataChange(transformedData);
            }
        }
    }, [selectedColumnCells, tabelaBody, visibleColumns, mergedOptions]);

// alteração-permissao-começo //
    // Sincroniza seleção visual quando selectedRowIds é controlado externamente
    useEffect(() => {
        if (!mergedOptions.rowSelection) return;
        if (!selectedRowIds) return;
        const idToIndex = new Map();
        tabelaBody.forEach((row, index) => {
            idToIndex.set(row[rowIdKey], index);
        });
        const indices = selectedRowIds
            .map((id) => idToIndex.get(id))
            .filter((idx) => typeof idx === 'number');
        // Evita loops: só atualiza se houve mudança real
        const isSameLength = indices.length === selectedRows.length;
        const isSame = isSameLength && indices.every((v, i) => v === selectedRows[i]);
        if (!isSame) {
            controlledSyncRef.current = true;
            setSelectedRows(indices);
        }
    }, [selectedRowIds, tabelaBody, rowIdKey, mergedOptions.rowSelection]);
    // alteração-permissao-fim //

    const renderListView = () => ( 
        <div className={styles.listViewContainer}>
            {currentCards.length === 0  || visibleColumns.length === 0 ? (
                <div className={styles.listItem} style={{ display: 'flex', flex: '1' }}>
                    <div colSpan={tabelaColumns?.length || 1} className={styles.listColumnValue} style={{ textAlign: 'center', padding: '0' }}>
                        Nenhuma informação encontrada
                    </div>
                </div>
            ) : (
                currentCards.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.listItem} onClick={() => {
                        if(row.__onClick) {
                            row.__onClick(row, rowIndex)
                        } else if(mergedOptions.rowOnClick && typeof mergedOptions.rowOnClick === 'function') {
                            mergedOptions.rowOnClick(row, rowIndex);
                        } 
                    }} style={{ cursor: row.__onClick || mergedOptions.rowOnClick ? 'pointer' : 'default' }}>
                        {visibleColumns.map((column, colIndex) => (
                            <div key={colIndex} className={styles.listRow} onClick={() => {
                                if(column.__onClick) {
                                    column.__onClick(row, column, rowIndex, colIndex)
                                }
                            }} style={{ cursor: column.__onClick ? 'pointer' : 'default' }}>
                                <div className={styles.listColumnName}>
                                    {column.name}:
                                </div>
                                <div className={styles.listColumnValue}>
                                    {row[column.value] ? renderFormattedCell(row[column.value], column, row) : '-'}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
    const renderTableView = () => (
        <table className={styles.tabela} id="tabela">
            {mergedOptions.showHeader && (
                <thead className={styles.tabelaHeader}>
                    <tr className={styles.tabelaHeaderRow}>
                        {visibleColumns.length === 0 ? (
                            <th className={styles.tabelaHeaderCell} style={{padding: "0.75rem 1.25rem"}} colSpan={1}>Nenhuma informação encontrada</th>
                        ) :(
                            <React.Fragment>
                                {mergedOptions.rowSelection && (
                                    <td className={styles.tabelaHeaderCell} style={{padding: "1rem"}} rowSpan={mergedOptions.showHeader ? 2 : 1}>
                                        {mergedOptions.rowSelection && mergedOptions.rowSelectionMode === "multiple" && (
                                            <div className={styles.checkboxInput}>
                                                <input
                                                    type="checkbox"
                                                    className={`${styles.tabelaSelection} ${styles.tabelaColumnSelection}`}
                                                    checked={selectAllStatus === 'parcial' || selectAllStatus === 'todos'}
                                                    onChange={handleSelectAll}
                                                />

                                                {selectAllStatus === 'todos' && (
                                                    <i className={`${styles.partialCheckboxIcon} fas fa-check`} /> 
                                                )}
                                            </div>
                                        )}
                                    </td>
                                )}
                                {tabelaColumns.map((column, index) => {
                                    if(column.isParent){
                                        const visibleSubColumns = column.subColumns.filter(subCol => columnVisibility[subCol.value]);
                                        if(visibleSubColumns.length === 0) return null;
                                        return (
                                            <th 
                                                key={index}
                                                className={`${styles.tabelaHeaderCell} ${column.className || ""}`}
                                                colSpan={visibleSubColumns.length}
                                                rowSpan={1}
                                                style={{
                                                    textAlign: column.align,
                                                    cursor: "default",
                                                    padding: "0.75rem",
                                                    ...column.headerStyle
                                                }}
                                            >
                                                <span>{column.name}</span>
                                            </th>
                                        );
                                    } else if (!column.parentValue) {
                                        if (!columnVisibility[column.value]) return null;

                                        return (
                                            <th
                                                key={index}
                                                className={`${styles.tabelaHeaderCell} ${column.className || ""}`}
                                                id={`${column.value}`}
                                                onClick={() => column.sortable && handleSort(column.value)}
                                                style={{
                                                    textAlign: column.align,
                                                    cursor: column.sortable ? "pointer" : "default",
                                                    padding: column.sortable ? "1rem 2.5rem 1rem 1rem" : "1rem",
                                                    ...column.headerStyle
                                                }}
                                                rowSpan={2}
                                            >
                                                {column.type === 'select' ? (
                                                    <div className={styles.tabelaHeaderCellTypeSelect} style={{ justifyContent: column.align }}>
                                                        <div className={styles.checkboxInput}>
                                                            <input
                                                                type="checkbox"
                                                                className={`${styles.tabelaSelection} ${styles.tabelaColumnSelection}`}
                                                                checked={selectColumnStatus[column.value] === 'parcial' || selectColumnStatus[column.value] === 'todos'}
                                                                onChange={() => handleColumnSelectAll(column.value)}
                                                            />
                                                            {selectColumnStatus[column.value] === 'todos' && (
                                                                <i className={`${styles.partialCheckboxIcon} fas fa-check`} />
                                                            )}
                                                        </div>
                                                        <span>{column.name}</span>
                                                    </div>
                                                ) : (
                                                    <span>{column.name}</span>
                                                )}
                                                {column.sortable && (
                                                    <i
                                                        className={`fas 
                                                            ${sortConfig.key === column.value
                                                                ? sortConfig.direction === "asc"
                                                                    ? "fa-sort-up"
                                                                    : sortConfig.direction === "desc"
                                                                    ? "fa-sort-down"
                                                                    : "fa-sort"
                                                                : "fa-sort"
                                                            } ${styles.sortButton}`}
                                                    />
                                                )}
                                            </th>
                                        );
                                    }
                                    return null; 
                                })}
                            </React.Fragment>
                        )}
                    </tr>
                    <tr className={styles.tabelaHeaderRow}>
                        {tabelaColumns.length !== 0 && (
                            tabelaColumns.map((column, index) => {
                                if (column.parentValue && columnVisibility[column.value]) {
                                    return (
                                        <th
                                            key={index}
                                            className={`${styles.tabelaHeaderSubCell} ${column.className || ""}`}
                                            id={`${column.value}`}
                                            onClick={() => column.sortable && handleSort(column.value)}
                                            style={{
                                                textAlign: column.align,
                                                cursor: column.sortable ? "pointer" : "default",
                                                padding: column.sortable ? "0.75rem 2.5rem 0.75rem 0.75rem" : "0.75rem",
                                                ...column.headerStyle
                                            }}
                                            rowSpan={1}
                                        >
                                            <span>{column.name}</span>
                                            {column.sortable && (
                                                <i
                                                    className={`fas ${sortConfig.key === column.value
                                                        ? sortConfig.direction === "asc"
                                                            ? "fa-sort-up"
                                                            : sortConfig.direction === "desc"
                                                            ? "fa-sort-down"
                                                            : "fa-sort"
                                                        : "fa-sort"
                                                } ${styles.sortButton}`}
                                                />
                                            )}
                                        </th>
                                    );
                                }
                                return null;
                            })
                        )}
                    </tr>
                </thead>
            )}
            <tbody className={`${styles.tabelaBody} ${mergedOptions.showFooter ? styles.tabelaBodyWithFooter : ''}`}>
                {tabelaBody.length === 0  || visibleColumns.length === 0 ? (
                    <tr className={styles.tabelaBodyRow}>
                        <td colSpan={mergedOptions.rowSelection ? tabelaColumns?.length + 1 : tabelaColumns?.length || 1} className={styles.tabelaBodyCell}>
                            Nenhuma informação encontrada
                        </td>
                    </tr>
                ) : (
                    currentCards.map((row, rowIndex) => (
                        <tr key={rowIndex} className={styles.tabelaBodyRow} onClick={() => {
                            if(row.__onClick) {
                                row.__onClick(row, rowIndex)
                            } else if(mergedOptions.rowOnClick && typeof mergedOptions.rowOnClick === 'function') {
                                mergedOptions.rowOnClick(row, rowIndex);
                            } 
                        }} style={{ cursor: row.__onClick || mergedOptions.rowOnClick ? 'pointer' : 'default', background: row.__rowColor ? row.__rowColor : ''}}>
                            {mergedOptions.rowSelection && (
                                <td className={`${styles.tabelaBodyCell} ${selectedRows.includes(rowIndex + indexOfFirstCard) ? styles.tabelaBodyCellSelected : ''}`} style={{padding: "0"}}>
                                    {mergedOptions.rowSelection && (
                                        <input
                                            className={`${styles.tabelaSelection} ${styles.tabelaRowSelection}`}
                                            type={mergedOptions.rowSelectionMode === "single" ? "radio" : "checkbox"}
                                            checked={selectedRows.includes(rowIndex + indexOfFirstCard)}
                                            onChange={() => handleRowSelect(rowIndex + indexOfFirstCard)}
                                        />
                                    )}
                                </td>
                            )}
                            {visibleColumns.map((column, colIndex) => (
                                <td 
                                key={colIndex} 
                                className={`${styles.tabelaBodyCell} ${column.rowsClassName || ''} ${row[column.value]?.className || ''} ${selectedRows.includes(rowIndex + (currentPage != 1 && (currentPage - 1) * currentCardsPerPage)) ? styles.tabelaBodyCellSelected : ''} `}
                                style={getCellStyle(column, row)}
                                onClick={() => {
                                    if(column.__onClick) {
                                        column.__onClick(row, column, rowIndex, colIndex)
                                    }
                                }}
                                >
                                    {column.type === 'select' ? (
                                        <input
                                            className={`${styles.tabelaSelection} ${styles.tabelaRowSelection}`}
                                            type={mergedOptions.rowSelectionMode === "single" ? "radio" : "checkbox"}
                                            checked={(selectedColumnCells[column.value] || []).includes(rowIndex + indexOfFirstCard)}
                                            onChange={() => handleColumnRowSelect(rowIndex + indexOfFirstCard, column.value)}
                                        />
                                    ) : (
                                        row[column.value] ? renderFormattedCell(row[column.value], column, row) : ''
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );

    const renderCustomView = () => {
        if (!mergedOptions.customView) {
            return (
                <div className={styles.listViewContainer}>
                    <div className={styles.listItem} style={{ display: 'flex', flex: '1' }}>
                        <div colSpan={tabelaColumns?.length || 1} className={styles.listColumnValue} style={{ textAlign: 'center', padding: '0' }}>
                            Nenhuma informação encontrada
                        </div>
                    </div>
                </div>
            );
        }
    
        if (typeof mergedOptions.customView === 'function') {
            if (currentCards.length === 0) {
                return (
                    <div className={styles.listViewContainer}>
                        <div className={styles.listItem} style={{ display: 'flex', flex: '1' }}>
                            <div colSpan={tabelaColumns?.length || 1} className={styles.listColumnValue} style={{ textAlign: 'center', padding: '0' }}>
                                Nenhuma informação encontrada
                            </div>
                        </div>
                    </div>
                );
            }
            return mergedOptions.customView(currentCards);
        }
        
        return mergedOptions.customView;
    };

    const [footerCellPositions, setFooterCellPositions] = useState([]);
    const footerContainerRef = useRef(null);

    useEffect(() => {
        if (!footerContainerRef.current || footerVisibleColumns.length === 0) {
            return;
        }

        const calculateFooterPositions = () => {
            const container = footerContainerRef.current;
            const cells = Array.from(container.children);
            if (cells.length === 0) return;

            const newPositions = [];
            let currentRowTop = -1;
            let currentLine = [];
            const OFFSET_THRESHOLD = 2;

            cells.forEach((cell, index) => {
                const cellTop = cell.offsetTop;

                if (currentRowTop === -1 || Math.abs(cellTop - currentRowTop) > OFFSET_THRESHOLD) {
                    if (currentLine.length > 0) {
                        newPositions.push(currentLine);
                    }
                    currentRowTop = cellTop;
                    currentLine = [cell.dataset.value];
                } else {
                    currentLine.push(cell.dataset.value);
                }

                if (index === cells.length - 1 && currentLine.length > 0) {
                    newPositions.push(currentLine);
                }
            });

            setFooterCellPositions(newPositions);
        };

        const observer = new ResizeObserver(() => {
            calculateFooterPositions();
        });

        observer.observe(footerContainerRef.current);
        calculateFooterPositions();

        return () => observer.disconnect();
    }, [footerVisibleColumns, tableView]);

    const renderFooterView = useCallback(() => {
        if (!mergedOptions.showFooter || footerVisibleColumns.length === 0) {
            return null;
        }

        return (
            <div className={styles.tabelaFooterContainer} ref={footerContainerRef}>
                {footerVisibleColumns.length === 0 ? (
                    <div className={styles.tabelaFooterEmpty}>
                        Nenhuma informação de rodapé encontrada
                    </div>
                ) : (
                    footerVisibleColumns.map((column) => {
                        let classNames = [styles.tabelaFooterCell];
                        if (column.className) {
                            classNames.push(column.className);
                        }

                        const lineIndex = footerCellPositions.findIndex(line => line.includes(column.value));
                        const currentLine = footerCellPositions[lineIndex];

                        const positionInLine = currentLine ? currentLine.indexOf(column.value) : -1;

                        const isFirstColumnInItsLine = currentLine && positionInLine === 0;
                        const isLastColumnInItsLine = currentLine && positionInLine === currentLine.length - 1;
                        const isLastRenderedLine = lineIndex === footerCellPositions.length - 1;

                        if (isFirstColumnInItsLine && isLastRenderedLine) {
                            classNames.push(styles.borderRadiusBottomLeft);
                        }

                        if (isLastColumnInItsLine && isLastRenderedLine) {
                            classNames.push(styles.borderRadiusBottomRight);
                        }

                        // Remover borda direita se não for a última coluna da sua linha
                        if (positionInLine !== -1 && !isLastColumnInItsLine) {
                            classNames.push(styles.removeBorderRight);
                        }

                        // Remover borda inferior se não for a última linha renderizada e houver mais de uma linha
                        if (!isLastRenderedLine && footerCellPositions.length > 1) {
                             classNames.push(styles.removeBorderBottom);
                        }

                        return (
                            <div
                                key={column.value}
                                className={classNames.join(' ')}
                                style={{
                                    textAlign: 'center',
                                    ...column.footerStyle
                                }}
                                data-value={column.value}
                            >
                                <span className={styles.tabelaFooterCellLabel}>{column.name}:</span>
                                <span className={styles.tabelaFooterCellValue}>
                                    {typeof column.data === 'function' ? column.data(tabelaBody, visibleColumns, footerVisibleColumns) : column.data}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>
        );
    }, [mergedOptions.showFooter, footerVisibleColumns, tabelaBody, visibleColumns, footerCellPositions]);

    return (
        <>
            <div className={styles.tabelaToolbarContainer}>
                {mergedOptions.toolbarComponent && mergedOptions.toolbarComponent()}
                <div className={styles.tabelaToolbar}>
                    <Tooltip text="Ferramentas" position="top" ref={toolbarButtonRef}>
                        <button className={styles.tabelaToolbarButton} onClick={handleToolbarMenu}>
                            <i className="fas fa-tools"></i>
                        </button>
                    </Tooltip>
                    {isToolbarMenuOpen && ReactDOM.createPortal(
                        <div 
                            className={styles.tabelaToolbarMenu} 
                            ref={toolbarMenuRef} 
                            style={{...toolbarMenuPosition }} 
                            onClick={(e) => e.stopPropagation()}
                            id={`toolbar-menu-${tabelaId}`}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`toolbar-menu-${tabelaId}`}
                        >
                            <div className={styles.tabelaToolbarMenuBody}>
                                {mergedOptions.showPaginationSwitch && (
                                    <button className={styles.tabelaToolbarMenuButton} onClick={handlePaginationSwitchClick}>
                                        <i className={`${paginationEnabled ? 'far fa-square-caret-down' : 'far fa-square-caret-up'}`}></i> {paginationEnabled ? "Desativar Paginação" : "Ativar Paginação"}
                                    </button>
                                )}

                                {mergedOptions.showSearch && (
                                    <button className={styles.tabelaToolbarMenuButton} onClick={handleSearchClick}>
                                        <i className="fas fa-search" /> Pesquisar
                                    </button>
                                )}

                                {mergedOptions.showRefresh && (
                                    <button className={styles.tabelaToolbarMenuButton} onClick={handleRefreshClick}>
                                        <i className="fas fa-refresh" /> Atualizar Dados
                                    </button>
                                )}

                                {mergedOptions.showToggleView && (
                                    <button className={styles.tabelaToolbarMenuButton} onClick={handleToggleViewClick}>
                                        <i className={`fas ${tableView === 'table' ? 'fa-list' : tableView === 'list' ? (mergedOptions.customView ? 'fa-eye' : 'fa-table') : 'fa-table'}`} /> 
                                        {
                                            tableView === 'table' ? "Visualizar em Lista" :
                                            tableView === 'list' && mergedOptions.customView ? "Visualização Customizada" :
                                            tableView === 'list' ? "Visualizar em Tabela" :
                                            "Visualizar em Tabela"
                                        }
                                    </button>
                                )}

                                {mergedOptions.showColumnsSelector && (
                                    <button 
                                        className={showColumnSelector ? styles.tabelaToolbarMenuButtonActive : styles.tabelaToolbarMenuButton}
                                        onClick={handleColumnsSelectorClick}
                                        aria-expanded={showColumnSelector}
                                        aria-controls={`column-selector-${tabelaId}`}
                                    >
                                        <i className="fas fa-columns" /> Selecionar Colunas
                                    </button>
                                )}

                                {showColumnSelector && ReactDOM.createPortal(
                                    <div
                                        id={`column-selector-${tabelaId}`}
                                        onClick={(e) => e.stopPropagation()}
                                        ref={columnSelectorRef}
                                        className={styles.columnSelector}
                                        style={{...selectorPosition }}
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby={`column-selector-header-${tabelaId}`}
                                    >
                                        <div className={styles.columnSelectorHeader} id={`column-selector-header-${tabelaId}`}>
                                            Selecione as colunas
                                        </div>
                                        <div className={styles.columnSelectorList}>
                                            <div className={styles.columnSelectorActions}>
                                                <span onClick={() => {
                                                    const allVisible = {};
                                                    Object.keys(columnVisibility).forEach(key => {
                                                        allVisible[key] = true;
                                                    });
                                                    setColumnVisibility(allVisible);
                                                }} role="button" tabIndex={0}>Mostrar Todas</span>
                                                <span onClick={() => {
                                                    const noneVisible = {};
                                                    Object.keys(columnVisibility).forEach(key => {
                                                        noneVisible[key] = false;
                                                    });
                                                    setColumnVisibility(noneVisible);
                                                }} role="button" tabIndex={0}>Ocultar Todas</span>
                                            </div>
                                            {tabelaColumns.filter((column) => !column.isParent).map((column) => (
                                                <label key={column.value} className={styles.columnSelectorItem}>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!columnVisibility[column.value]}
                                                        onChange={() => handleColumnToggle(column.value)}
                                                    />
                                                    <span>{column.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {footerColumns.length > 0 && (
                                            <>
                                                <div className={styles.columnSelectorHeader} id={`column-selector-footer-${tabelaId}`}>
                                                    Colunas do rodapé
                                                </div>
                                                <div className={styles.columnSelectorList}>
                                                    <div className={styles.columnSelectorActions}>
                                                        <span onClick={() => {
                                                            const allVisible = {};
                                                            footerColumns.forEach(column => {
                                                                allVisible[column.value] = true;
                                                            });
                                                            setFooterVisibility(allVisible);
                                                        }} role="button" tabIndex={0}>Mostrar Todas</span>
                                                        <span onClick={() => {
                                                            const noneVisible = {};
                                                            footerColumns.forEach(column => {
                                                                noneVisible[column.value] = false;
                                                            });
                                                            setFooterVisibility(noneVisible);
                                                        }} role="button" tabIndex={0}>Ocultar Todas</span>
                                                    </div>
                                                    {footerColumns.map((column) => (
                                                        <label key={column.value} className={styles.columnSelectorItem}>
                                                            <input
                                                                type="checkbox"
                                                                checked={!!footerVisibility[column.value]}
                                                                onChange={() => handleFooterToggle(column.value)}
                                                            />
                                                            <span>{column.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>,
                                    document.body
                                )}

                                {mergedOptions.showExport && (
                                        <button className={styles.tabelaToolbarMenuButton} onClick={handleExportClick}>
                                            <i className="fas fa-file-export" /> Exportar Dados
                                        </button>
                                )}
                                {mergedOptions.showFilter && (
                                        <button className={styles.tabelaToolbarMenuButton} onClick={handleFilterClick}>
                                            <i className="fas fa-filter" /> Filtrar Dados
                                        </button>
                                )}
                                {mergedOptions.showGuardaCampos && (
                                        <button className={styles.tabelaToolbarMenuButton} onClick={handleFilterClick}>
                                            <i className="fas fa-server" /> Guarda Campos
                                        </button>
                                )}
                                {mergedOptions.additionalButtons && (
                                    mergedOptions.additionalButtons.map((button, index) => (
                                            <button className={styles.tabelaToolbarMenuButton} onClick={button.onClick}>
                                                <i className={button.icon} /> {button.title}
                                            </button>
                                    ))
                                )}
                            </div>
                        </div>,
                        document.body
                    )}
                </div>
            </div>
            <div className={`${styles.tabelaContainer} ${mergedOptions.showFooter ? styles.tabelaBodyWithFooter : ''}`} id={`tabelaContainer-${tabelaId}`}>
                {tableView === 'table' ? renderTableView() : tableView === 'list' ? renderListView() : tableView === 'custom' ? renderCustomView() : renderTableView()}
            </div>
            {tableView === 'custom' ? null : renderFooterView()}

            {paginationEnabled && (
                <Pagination
                    totalCards={tabelaBody.length}
                    cardsPerPage={currentCardsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    setCardsPerPage={setCurrentCardsPerPage}
                    cardsPerPageOptions={mergedOptions.cardsPerPageOptions}
                    indexOfFirstCard={indexOfFirstCard}
                    indexOfLastCard={indexOfLastCard}
                    selectedRows={selectedRows.length}
                />
            )}
        </>
    );
};

export default TabelaPadrao;