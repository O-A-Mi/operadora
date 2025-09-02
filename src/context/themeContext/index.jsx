import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const checkUserStatus = () => {
      const usuarioLogado = sessionStorage.getItem('usuarioLogado') === 'true';
      
      if (usuarioLogado) {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
          setTheme(savedTheme);
        } else if (systemPrefersDark) {
          setTheme('dark');
        }
      } else {
        setTheme('light');
      }
    };

    checkUserStatus();

    const handleStorageChange = (e) => {
      if (e.key === 'usuarioLogado') {
        checkUserStatus();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkUserStatus();
      }
    };

    const handleCustomLogout = () => {
      setTheme('light');
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('userLogout', handleCustomLogout);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('userLogout', handleCustomLogout);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (sessionStorage.getItem('usuarioLogado') === 'true') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado') === 'true';
    if (usuarioLogado) {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Erro: ThemeProvider não encontrado');
  }
  return context;
};