import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const register = async ({ name, email, password }) => {
    const res = await api.post("/users/register", { name, email, password });
    setUser({ id: res.data.id, name: res.data.name, email: res.data.email });
    setToken(res.data.token);
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/users/login", { email, password });
    setUser({ id: res.data.id, name: res.data.name, email: res.data.email });
    setToken(res.data.token);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
