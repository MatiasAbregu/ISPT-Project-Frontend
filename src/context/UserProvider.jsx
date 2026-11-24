import { createContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/auth/AuthService";

export const UserContext = createContext();

const SECRET_KEY = ".m.y._ISPT_key#_!very(s3cr3t)_and_very(s4f3)";
const SESSION_COOKIE = "token";

const readStoredSession = () => {
  const encryptedSession = Cookies.get(SESSION_COOKIE);
  if (!encryptedSession) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedSession, SECRET_KEY);
    const storedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // Acepta las cookies previas, que guardaban directamente el DTO del token.
    const tokens = storedValue.tokens ?? storedValue;
    if (!tokens?.accessToken) return null;

    return {
      tokens,
      rememberMe: storedValue.rememberMe ?? Boolean(tokens.refreshToken)
    };
  } catch {
    return null;
  }
};

const parseTokenToUser = (token) => {
  if (!token?.accessToken) return null;
  try {
    const decoded = jwtDecode(token.accessToken);
    return {
      id: decoded.ID || "",
      personId: decoded.PersonId || "",
      username: decoded.Username || "",
      fullname: decoded.Fullname || "",
      roles: decoded.Role
        ? (Array.isArray(decoded.Role) ? decoded.Role : [decoded.Role])
        : []
    };
  } catch (error) {
    console.error("Error al decodificar el JWT:", error);
    return null;
  }
};

const isTokenExpiredOrAboutToExpire = (token) => {
  try {
    const { exp } = jwtDecode(token.accessToken);
    return !exp || exp * 1000 <= Date.now() + 60_000;
  } catch {
    return true;
  }
};

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(() => readStoredSession());
  const [user, setUser] = useState(() => parseTokenToUser(readStoredSession()?.tokens));
  const [authReady, setAuthReady] = useState(false);
  const refreshPromise = useRef(null);
  const sessionVersion = useRef(0);

  const saveSession = (tokens, rememberMe) => {
    sessionVersion.current += 1;
    const nextSession = { tokens, rememberMe: Boolean(rememberMe) };
    setSession(nextSession);
    setUser(parseTokenToUser(tokens));

    const encryptedSession = CryptoJS.AES.encrypt(JSON.stringify(nextSession), SECRET_KEY).toString();
    const cookieOptions = {
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/"
    };

    // Keep-session cookies use a long sliding lifetime; regular sessions end with the browser session.
    if (rememberMe) cookieOptions.expires = 3650;
    Cookies.set(SESSION_COOKIE, encryptedSession, cookieOptions);
    setAuthReady(true);
  };

  const logout = () => {
    const currentSession = readStoredSession();
    sessionVersion.current += 1;
    if (currentSession?.tokens?.refreshToken) {
      AuthService.logout(currentSession.tokens).catch((error) => {
        console.error("No se pudo invalidar el refresh token en el servidor:", error);
      });
    }
    setSession(null);
    setUser(null);
    setAuthReady(true);
    Cookies.remove(SESSION_COOKIE, { path: "/" });
  };

  const getToken = () => readStoredSession()?.tokens ?? null;

  const refreshToken = () => {
    if (refreshPromise.current) return refreshPromise.current;

    refreshPromise.current = (async () => {
      const storedSession = readStoredSession();
      if (!storedSession?.tokens?.refreshToken) {
        logout();
        return null;
      }

      const startedForSessionVersion = sessionVersion.current;
      try {
        const response = (await AuthService.refresh(storedSession.tokens)).data;
        if (response?.statusCode >= 200 && response.statusCode < 300 && response.object?.accessToken) {
          if (sessionVersion.current !== startedForSessionVersion) {
            AuthService.logout(response.object).catch(() => {});
            return null;
          }
          saveSession(response.object, storedSession.rememberMe);
          return response.object.accessToken;
        }
      } catch (error) {
        console.error("Error en AuthService.refresh:", error);
        if (!error.response || error.response.status >= 500) return null;
      }

      logout();
      return null;
    })();

    return refreshPromise.current.finally(() => {
      refreshPromise.current = null;
    });
  };

  useEffect(() => {
    const storedSession = readStoredSession();
    if (!storedSession) {
      if (Cookies.get(SESSION_COOKIE)) logout();
      else setAuthReady(true);
      return;
    }

    if (!parseTokenToUser(storedSession.tokens)) {
      logout();
      return;
    }

    if (isTokenExpiredOrAboutToExpire(storedSession.tokens)) {
      if (storedSession.rememberMe && storedSession.tokens.refreshToken) {
        refreshToken().finally(() => setAuthReady(true));
      } else {
        logout();
      }
      return;
    }

    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!session?.rememberMe || !session.tokens?.refreshToken) return undefined;

    let retryTimer;
    const refreshWithRetry = async () => {
      const accessToken = await refreshToken();
      if (!accessToken && readStoredSession()) {
        retryTimer = window.setTimeout(refreshWithRetry, 30_000);
      }
    };

    let timeout;
    try {
      const { exp } = jwtDecode(session.tokens.accessToken);
      const refreshDelay = Math.max(exp * 1000 - Date.now() - 60_000, 0);
      timeout = window.setTimeout(refreshWithRetry, refreshDelay);
    } catch {
      timeout = window.setTimeout(refreshWithRetry, 0);
    }

    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(retryTimer);
    };
  }, [session]);

  return (
    <UserContext.Provider value={{ user, authReady, login: saveSession, logout, getToken, refreshToken }}>
      {children}
    </UserContext.Provider>
  );
};
