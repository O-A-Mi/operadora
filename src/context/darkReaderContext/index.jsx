import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { jsonRoute } from "../../utils/json";

const DarkReaderContext = createContext({ enabled: false, toggle: () => {} });

function isUserLoggedIn() {
  try {
    return sessionStorage.getItem("usuarioLogado") === "true";
  } catch (_) {
    return false;
  }
}

function isLoginRoute(pathname) {
  if (!pathname) return false;
  const routes = [
    jsonRoute.Operadora_Login,
    jsonRoute.Cliente_login,
    jsonRoute.Beneficiario_Login,
    jsonRoute.Representante_Login,
  ];
  return routes.some((r) => pathname.includes(r));
}

export const DarkReaderProvider = ({ children }) => {
  const location = useLocation();
  const [enabled, setEnabled] = useState(false);

  const syncFromEnvironment = () => {
    const logged = isUserLoggedIn();
    const onLogin = isLoginRoute(window.location.pathname || "");
    if (!logged || onLogin) {
      setEnabled(false);
      return;
    }
    try {
      const stored = localStorage.getItem("dr_dark_enabled");
      setEnabled(stored === "1");
    } catch (_) {
      setEnabled(false);
    }
  };

  useEffect(() => {
    syncFromEnvironment();
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.setAttribute("data-dr-dark", "1");
      try {
        root.setAttribute("data-theme", "light");
        if (isUserLoggedIn()) {
          localStorage.setItem("theme", "light");
        }
      } catch (_) {}
    } else {
      root.removeAttribute("data-dr-dark");
    }
  }, [enabled]);

  const toggle = () => {
    const logged = isUserLoggedIn();
    if (!logged || isLoginRoute(window.location.pathname || "")) return;
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("dr_dark_enabled", next ? "1" : "0");
      } catch (_) {}
      return next;
    });
  };

  const value = useMemo(() => ({ enabled, toggle }), [enabled]);

  return (
    <DarkReaderContext.Provider value={value}>{children}</DarkReaderContext.Provider>
  );
};

export const useDarkReader = () => {
  const ctx = useContext(DarkReaderContext);
  if (!ctx) throw new Error("DarkReaderProvider não encontrado");
  return ctx;
};


