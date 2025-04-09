"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Facebook } from "lucide-react"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

  const form = event.currentTarget
  const passwordInput = form.password as HTMLInputElement
  const confirmInput = form.confirmPassword as HTMLInputElement

  if (passwordInput.value !== confirmInput.value) {
    confirmInput.setCustomValidity("비밀번호가 일치하지 않습니다.")
    confirmInput.reportValidity()
    return
  } else {
    confirmInput.setCustomValidity("") // 오류 없으면 초기화
  }

  setIsLoading(true)
  
    // 여기에 회원가입 로직을 구현합니다 (예: 서버 액션 또는 API 호출)
    setTimeout(() => {
      setIsLoading(false)
      alert("회원가입 성공!")
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="userId" className="w-24 text-left text-slate-950">
                아이디:
              </Label>
              <Input
                id="userId"
                placeholder="아이디를 입력하세요"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                className="text-black"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="nickname" className="w-24 text-left text-slate-950">
                닉네임:
              </Label>
              <Input
                id="nickname"
                placeholder="닉네임을 입력하세요"
                type="text"
                autoCapitalize="none"
                className="text-black"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="password" className="w-24 text-left text-slate-950">
                비밀번호:
              </Label>
              <Input
                id="password"
                placeholder="비밀번호를 입력하세요"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                className="text-black"
                disabled={isLoading}
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                title="비밀번호는 영문자와 숫자를 조합하여 8자 이상이어야 합니다."
              />
            </div>
            <p className="text-xs text-gray-500 pl-28">
              영문자와 숫자를 조합한 8자 이상이어야 합니다.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="confirmPassword" className="w-32 text-left text-slate-950">
                비밀번호 확인:
              </Label>
              <Input
                id="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                className="text-black"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">또는</span>
        </div>
      </div>
      <div className="grid gap-2 text-slate-950">
        <Button variant="outline" type="button" disabled={isLoading}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google로 회원가입
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Facebook으로 회원가입
        </Button>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        회원가입 시{" "}
        <a href="#" className="underline underline-offset-4 hover:text-fuchsia-600">
          이용약관
        </a>{" "}
        및{" "}
        <a href="#" className="underline underline-offset-4 hover:text-fuchsia-600">
          개인정보처리방침
        </a>
        에 동의하게 됩니다.
      </div>
    </div>
  )
}

