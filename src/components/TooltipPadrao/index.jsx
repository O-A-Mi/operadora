import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

const GAP = 8;

const Tooltip = React.forwardRef(({
    children,
    text,
    position = 'top',
    className = '',
    style = {}
}, ref_from_parent) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipCoords, setTooltipCoords] = useState({ top: 0, left: 0 });
    const [actualPosition, setActualPosition] = useState(position);

    const localTriggerRef = useRef(null);
    const tooltipPopupRef = useRef(null);
    const activeTriggerRef = ref_from_parent || localTriggerRef;

    const calculatePosition = useCallback(() => {
        if (!activeTriggerRef || !activeTriggerRef.current || !tooltipPopupRef.current) {
            return;
        }

        const triggerRect = activeTriggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipPopupRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let preferredPos = position;
        let calculatedCoords = {};

        const positionsToCheck = [
            preferredPos,
            ...(preferredPos === 'top' ? ['bottom', 'right', 'left'] :
                preferredPos === 'bottom' ? ['top', 'right', 'left'] :
                preferredPos === 'left' ? ['right', 'top', 'bottom'] :
                preferredPos === 'right' ? ['left', 'top', 'bottom'] : []),
            'top', 'bottom', 'left', 'right'
        ].filter((value, index, self) => self.indexOf(value) === index);

        for (const currentAttemptPos of positionsToCheck) {
            let top = 0, left = 0;
            let fits = false;

            switch (currentAttemptPos) {
                case 'top':
                    top = triggerRect.top - tooltipRect.height - GAP;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    if (top >= 0 && left >= 0 && (left + tooltipRect.width <= viewportWidth)) fits = true;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + GAP;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    if ((top + tooltipRect.height <= viewportHeight) && left >= 0 && (left + tooltipRect.width <= viewportWidth)) fits = true;
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.left - tooltipRect.width - GAP;
                    if (left >= 0 && top >= 0 && (top + tooltipRect.height <= viewportHeight)) fits = true;
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.right + GAP;
                    if ((left + tooltipRect.width <= viewportWidth) && top >= 0 && (top + tooltipRect.height <= viewportHeight)) fits = true;
                    break;
                default:
                    break;
            }

            if (fits) {
                if (left < GAP) left = GAP;
                if (left + tooltipRect.width > viewportWidth - GAP) left = viewportWidth - tooltipRect.width - GAP;
                if (top < GAP) top = GAP;
                if (top + tooltipRect.height > viewportHeight - GAP) top = viewportHeight - tooltipRect.height - GAP;

                calculatedCoords = { top, left };
                setActualPosition(currentAttemptPos);
                break;
            }
        }

        if (Object.keys(calculatedCoords).length === 0) {
            let top = 0, left = 0;
            switch (preferredPos) {
                case 'top': top = triggerRect.top - tooltipRect.height - GAP; left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2); break;
                case 'bottom': top = triggerRect.bottom + GAP; left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2); break;
                case 'left': top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2); left = triggerRect.left - tooltipRect.width - GAP; break;
                case 'right': top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2); left = triggerRect.right + GAP; break;
                default: top = triggerRect.top - tooltipRect.height - GAP; left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2); break;
            }
            calculatedCoords = {top, left};
            setActualPosition(preferredPos);
        }

        setTooltipCoords({
            top: calculatedCoords.top + window.scrollY,
            left: calculatedCoords.left + window.scrollX,
        });

    }, [position, activeTriggerRef]);

    useEffect(() => {
        if (isVisible && activeTriggerRef && activeTriggerRef.current) {
            const rafId = requestAnimationFrame(() => {
                if (activeTriggerRef.current && tooltipPopupRef.current) {
                    calculatePosition();
                }
            });
            window.addEventListener('resize', calculatePosition);
            window.addEventListener('scroll', calculatePosition, true);

            return () => {
                cancelAnimationFrame(rafId);
                window.removeEventListener('resize', calculatePosition);
                window.removeEventListener('scroll', calculatePosition, true);
            };
        }
    }, [isVisible, calculatePosition, activeTriggerRef]);

    const showTooltip = useCallback(() => setIsVisible(true), []);
    const hideTooltip = useCallback(() => setIsVisible(false), []);

    const tooltipId = `tooltip-${React.useId ? React.useId() : Math.random().toString(36).substr(2, 9)}`;

    const triggerElement = React.cloneElement(React.Children.only(children), {
        ref: activeTriggerRef,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip,
        'aria-describedby': isVisible ? tooltipId : undefined,
    });

    return (
        <>
            {triggerElement}
            {isVisible && ReactDOM.createPortal(
                <div
                    id={tooltipId}
                    ref={tooltipPopupRef}
                    role="tooltip"
                    className={`${styles.tooltip} ${styles[actualPosition]} ${className}`}
                    style={{
                        ...style,
                        position: 'absolute',
                        top: `${tooltipCoords.top}px`,
                        left: `${tooltipCoords.left}px`,
                        opacity: (tooltipPopupRef.current && tooltipPopupRef.current.offsetWidth > 0 &&
                                 (tooltipCoords.top !== 0 || tooltipCoords.left !== 0 || (activeTriggerRef.current && activeTriggerRef.current.offsetWidth > 0)))
                                 ? 1 : 0,
                        pointerEvents: 'none',
                    }}
                >
                    {text}
                </div>,
                document.body
            )}
        </>
    );
});

Tooltip.displayName = 'Tooltip'; 
export default Tooltip;