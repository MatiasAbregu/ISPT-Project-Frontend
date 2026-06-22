import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/auth/AuthService";

export const UserContext = createContext();

const SECRET_KEY = ".m.y._ISPT_key#_!very(s3cr3t)_and_very(s4f3)";

const parseTokenToUser = (token) => {
  if (!token || !token.accessToken) return null;
  try {
    const decoded = jwtDecode(token.accessToken);
    return {
      id: decoded.ID || "",
      username: decoded.Username || "",
      roles: decoded.Role
        ? (Array.isArray(decoded.Role) ? decoded.Role : [decoded.Role])
        : []
    };
  } catch (error) {
    console.error("Error al decodificar el JWT:", error);
    return null;
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const encryptedToken = Cookies.get("token");
    if (!encryptedToken) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      const decryptedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return parseTokenToUser(decryptedToken);
    } catch (error) {
      return null;
    }
  });

  const login = (token) => {
    try {
      const userData = parseTokenToUser(token);
      if (!userData) throw new Error("Token inválido");

      setUser(userData);

      const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(token), SECRET_KEY).toString();
      Cookies.set("token", encryptedToken, { expires: 7, secure: true, sameSite: "strict" })
    } catch (error) {
      return console.error("Error en el login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  const getToken = () => {
    const encryptedToken = Cookies.get("token");
    if (!encryptedToken) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return token;
    } catch (error) {
      return null;
    }
  }

  const refreshToken = async () => {
    const currentToken = getToken();
    if (!currentToken) {
      logout();
      return null;
    }

    try {
      const res = (await AuthService.refresh(currentToken)).data;
      if (res && res.statusCode >= 200 && res.statusCode < 300) {
        login(res.object);
        return res.object.accessToken; // 🟢 QUEDA: Retornamos el string del token para Axios
      }
    } catch (error) {
      console.error("Error en AuthService.refresh:", error);
    }

    logout();
    return null;
  }

  return (
    <UserContext.Provider value={{ user, login, logout, getToken, refreshToken }}>
      {children}
    </UserContext.Provider>
  );
}