import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";

function Pagination({ totalCards, cardsPerPage, setCurrentPage, currentPage, setCardsPerPage, cardsPerPageOptions, indexOfFirstCard, indexOfLastCard, selectedRows }) {
    const [paginaAtual, setPaginaAtual] = useState(currentPage === undefined ? 1 : currentPage);
    const [maxPagesToShow, setMaxPagesToShow] = useState(5);
    const paginationRef = useRef(null);

    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const MAX_PAGES_LIMIT = 8; // Limite máximo de páginas a mostrar

    const calculateMaxPagesToShow = () => {
        if (!paginationRef.current) return;

        const paginationWidth = paginationRef.current.offsetWidth;
        const buttonWidth = 40;
        const navButtonsTotalWidth = (buttonWidth * 4) + (0.5 * 3 * 16);

        const availableWidth = paginationWidth - navButtonsTotalWidth;
        const calculatedMax = Math.max(1, Math.floor(availableWidth / buttonWidth));

        setMaxPagesToShow(Math.min(calculatedMax, MAX_PAGES_LIMIT));
    };

    const getVisiblePageNumbers = () => {
        const halfMaxPages = Math.floor(maxPagesToShow / 2);
        let startPage = Math.max(1, paginaAtual - halfMaxPages);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const visiblePages = [];

        if (startPage > 1) {
            visiblePages.push(1);
            if (startPage > 2) {
                visiblePages.push("...");
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                visiblePages.push("...");
            }
            visiblePages.push(totalPages);
        }

        return visiblePages;
    };

    useEffect(() => {
        const handleResize = () => {
            calculateMaxPagesToShow();
        };

        window.addEventListener("resize", handleResize);
        calculateMaxPagesToShow();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    const handleCardsPerPageChange = (event) => {
        const newCardsPerPage = Number(event.target.value);
        setCardsPerPage(newCardsPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        setPaginaAtual(currentPage);
    }, [currentPage]);

    const actualIndexOfLastCard = Math.min(indexOfLastCard, totalCards);

    return (
        <nav className={styles.pagination} ref={paginationRef}>
            <div className={styles.topRowControls}>
                <div className={styles.paginationCounter}>
                    Exibindo {totalCards === 0 ? 0 : indexOfFirstCard + 1} até {actualIndexOfLastCard} de {totalCards} linhas
                </div>
                {selectedRows > 0 && (
                    <div className={styles.paginationCounter}>
                        {selectedRows} de {totalCards} linhas selecionadas
                    </div>
                )}

                {totalPages > 1 && (
                    <div className={styles.recordsPerPageSelector}>
                        <label htmlFor="cardsPerPageSelect">Registros por página:</label>
                        <select
                            id="cardsPerPageSelect"
                            className={styles.selectPerPage}
                            value={cardsPerPage}
                            onChange={handleCardsPerPageChange}
                        >
                            {cardsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className={styles.bottomRowControls}>
                    <button
                        className={styles.paginationButton}
                        onClick={() => handlePageChange(1)}
                        disabled={paginaAtual === 1}
                    >
                        <i className="fas fa-chevrons-left"></i>
                    </button>
                    <button
                        className={styles.paginationButton}
                        onClick={() => handlePageChange(paginaAtual - 1)}
                        disabled={paginaAtual === 1}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className={styles.paginationNumbersWrapper}>
                        {getVisiblePageNumbers().map((number, index) =>
                            number === "..." ? (
                                <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={`${styles.paginationNumber} ${paginaAtual === number ? styles.paginationNumberActive : ""}`}
                                >
                                    {number < 10 ? `0${number}` : number}
                                </button>
                            )
                        )}
                    </div>
                    <button
                        className={styles.paginationButton}
                        onClick={() => handlePageChange(paginaAtual + 1)}
                        disabled={paginaAtual === totalPages}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    <button
                        className={styles.paginationButton}
                        onClick={() => handlePageChange(totalPages)}
                        disabled={paginaAtual === totalPages}
                    >
                        <i className="fas fa-chevrons-right"></i>
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Pagination;