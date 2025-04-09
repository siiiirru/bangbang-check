"use client";
import { ProjectList } from "@/components/project/project-list"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ProjectsPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login"); // 로그인 안 되어 있으면 로그인 페이지로 리디렉트
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-4 px-4">
        {/* 헤더 */}
        <Header/>

        {/* 프로젝트 목록 */}
        <ProjectList />
      </div>
    </div>
  )
}

