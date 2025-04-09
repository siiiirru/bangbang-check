// context/AuthContext.tsx
"use client";
import { createContext, useContext, useState,useEffect, ReactNode } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    //여기서 로그인 유,무 테스트
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "혜비" }));
    const loggedInUser = localStorage.getItem('user'); // 로그인 정보가 있는지 확인

    if (loggedInUser) {
      setIsLoggedIn(true); // 로그인 상태를 true로 설정
    } else {
      setIsLoggedIn(false); // 로그인 정보 없으면 false로 설정
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
