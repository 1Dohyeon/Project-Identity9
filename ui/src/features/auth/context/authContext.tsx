import React, { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  jwt: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(null);

  const login = (token: string) => {
    setJwt(token); // 상태 업데이트
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ jwt, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
