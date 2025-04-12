import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Facebook } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../../config"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // AWS Lambda API 호출
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.")
      }

      // 로그인 성공 시 토큰 저장 및 리다이렉트
      localStorage.setItem("authToken", data.token)
      navigate("/projects")
    } catch (error) {
      console.error("로그인 오류:", error)
      setError(error.message || "로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="userId" className="w-24 text-left text-slate-800">
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
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="password" className="w-24 text-left text-slate-800">
                비밀번호:
              </Label>
              <div className="flex-1">
                <Input
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  className="text-black"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-xs text-muted-foreground hover:text-fuchsia-600">
                    비밀번호 찾기
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Button className="bg-fuchsia-600 hover:bg-fuchsia-700" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
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
          Google로 로그인
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Facebook으로 로그인
        </Button>
      </div>
    </div>
  )
}

