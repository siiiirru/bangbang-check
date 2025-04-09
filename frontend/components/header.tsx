"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"; // useAuth를 import
import Link from "next/link"
import Image from "next/image"

export function Logo() {
    return(
        <Link href="/" className="flex items-center gap-2 justify-center mt-5">
            <Image src="/tokilogo4.png" alt="방방체크 로고" width={250} height={70} />
            {/* <h1 className="text-4xl font-logo bg-gradient-to-r from-pink-400 via-fuchsia-500 to-sky-300 text-transparent bg-clip-text">방방체크</h1> */}
          </Link>
    )
}



export const LogoutButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // useAuth를 사용해 상태 가져오기

  const handleLogout = () => {
    localStorage.removeItem('user'); // 로그인 정보 제거
    setIsLoggedIn(false); // 상태 업데이트
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
    return(
<header className="flex justify-between items-center mb-8">
          <Logo/>
          <div className="flex gap-2 text-black">
            <Link href="/settings">
              <Button variant="secondary" size="sm" className="gap-1">
                <Settings size={16} />
                <span>설정</span>
              </Button>
            </Link>
              <LogoutButton/>
          </div>
        </header>
    )
}

export function GoProject() {
    return(
<div className="mb-6">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="gap-1 text-gray-700">
              <ArrowLeft size={16} />
              <span>프로젝트 목록으로</span>
            </Button>
          </Link>
        </div>
    )
}