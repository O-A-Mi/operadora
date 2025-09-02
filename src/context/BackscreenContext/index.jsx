import React, { createContext, useState, useEffect } from 'react';
import style from './style.module.css'

const BackscreenContext = createContext();

const BackscreenProvider = ({ children }) => {
    const [BackscreenState, setBackscreenState] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
        const backscreen = document.getElementById('backscreen');
        if (!backscreen) return;

        if (BackscreenState) {
            backscreen.style.display = 'flex';
            setTimeout(() => {
                backscreen.style.opacity = '1';
            });
        } else {
            backscreen.style.opacity = '0';
            setTimeout(() => {
                backscreen.style.display = 'none';    
            }, 150);
        }
    }, 0);

    return () => clearTimeout(timer);
}, [BackscreenState]);

    const showBackscreen = () => {
        setBackscreenState(true);
    };

    const hideBackscreen = () => {
        setBackscreenState(false);
    };

    return (
        <BackscreenContext.Provider value={{ BackscreenState, showBackscreen, hideBackscreen }}>
            {children}
            <div className={style.backscreen} id='backscreen'></div>
        </BackscreenContext.Provider>
    );
};

export { BackscreenContext, BackscreenProvider };