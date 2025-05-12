import React from 'react';
import { Link } from "react-router-dom"
import { Button } from "./ui/button";
import { ArrowLeft, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // useAuth를 import
import { signOut } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom';
export function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2 justify-center mt-5">
            <img src="/tokilogo4.png" alt="방방체크 로고" width={250} height={70} />
            {/* <h1 className="text-4xl font-logo bg-gradient-to-r from-pink-400 via-fuchsia-500 to-sky-300 text-transparent bg-clip-text">방방체크</h1> */}
        </Link>
    );
}

export const LogoutButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // useAuth를 사용해 상태 가져오기
  const navigate = useNavigate()
  
  const handleLogout =async() => {
    try {
        await signOut(); // Cognito 세션 로그아웃
    
        // 클라이언트 상태 초기화
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    
        navigate("/");
      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
  };

  return (
    <>
      {isLoggedIn && (
        <Button variant="outline" size="sm" className="gap-1 text-black" onClick={handleLogout}>
          <LogOut size={16} />
          <span>로그아웃</span>
        </Button>
      )}
    </>
  );
};

export function Header() {
    return (
        <header className="flex justify-between items-center mb-8">
            <Logo />
            <div className="flex gap-2 text-black">
                <Link to="/settings">
                    <Button variant="secondary" size="sm" className="gap-1">
                        <Settings size={16} />
                        <span>설정</span>
                    </Button>
                </Link>
                <LogoutButton />
            </div>
        </header>
    );
}

export function GoProject() {
    return (
        <div className="mb-6">
            <Link to="/projects">
                <Button variant="ghost" size="sm" className="gap-1 text-gray-700">
                    <ArrowLeft size={16} />
                    <span>프로젝트 목록으로</span>
                </Button>
            </Link>
        </div>
    );
}
