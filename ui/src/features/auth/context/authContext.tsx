import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  jwt: string | null;
  userNickname: string | null; // 사용자 닉네임 상태 추가
  login: (token: string, nickname: string) => void; // 닉네임 인자 추가
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("userNickname");

    if (token && nickname) {
      setJwt(token);
      setUserNickname(nickname);
    }
  }, []);

  const [jwt, setJwt] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);

  const login = (token: string, nickname: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userNickname", nickname);
    setJwt(token);
    setUserNickname(nickname);
  };

  const logout = () => {
    const isConfirmed = window.confirm("로그아웃하겠습니까?");

    if (isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("userNickname");
      setJwt(null);
      setUserNickname(null); // 닉네임 초기화
    }
  };

  return (
    <AuthContext.Provider value={{ jwt, userNickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
