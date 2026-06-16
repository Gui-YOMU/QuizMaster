import { createContext, useContext, useState } from "react";
import { tokenStore } from "../../core/infrastructure/adapters/TokenStore";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (token: string, id: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const login = (token: string, id: number) => {
    tokenStore.set(token, id.toString());
    setToken(token);
    setUserId(id.toString());
  };

  const logout = () => {
    tokenStore.clear();
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctxt = useContext(AuthContext);
  if (!ctxt) throw new Error("La fonction useAuth a besoin d'un provider.")
  return ctxt;
}
