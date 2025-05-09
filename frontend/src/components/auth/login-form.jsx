import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Facebook } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { signIn, resetPassword, confirmResetPassword } from 'aws-amplify/auth'
import { useAuth} from "../../context/AuthContext"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showReset, setShowReset] = useState(false)
  const [resetStep, setResetStep] = useState(1) // 1: 아이디 입력, 2: 코드/새비번 입력
  const [newPassword, setNewPassword] = useState("")
  const [code, setCode] = useState("")
  

  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuth()

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await signIn({ username, password })

      if (!response.isSignedIn) {
        throw new Error(response.message || "로그인에 실패했습니다.")
      }

      localStorage.setItem("user", username)
      setIsLoggedIn(true)
      navigate("/projects")
    } catch (error) {
      console.error("로그인 오류:", error)
      setError(error.message || "로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSendCode(e) {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await resetPassword({ username })
      setResetStep(2)
    } catch (err) {
      console.error("인증 코드 발송 실패:", err)
      setError(err.message || "인증 코드 발송에 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConfirmReset(e) {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword,
      })
      alert("비밀번호가 성공적으로 변경되었습니다.")
      setShowReset(false)
      setResetStep(1)
      setNewPassword("")
      setCode("")
    } catch (err) {
      console.error("비밀번호 재설정 실패:", err)
      setError(err.message || "비밀번호 재설정에 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

      {!showReset ? (
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-4">
                <Label htmlFor="username" className="w-24 text-left text-slate-800">
                  아이디:
                </Label>
                <Input
                  id="username"
                  placeholder="아이디를 입력하세요"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                  className="text-black"
                  disabled={isLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-fuchsia-600"
                      onClick={() => {
                        setShowReset(true)
                        setError("")
                      }}
                    >
                      비밀번호 찾기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-fuchsia-600 hover:bg-fuchsia-700" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={resetStep === 1 ? handleSendCode : handleConfirmReset}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-4">
                <Label htmlFor="username" className="w-24 text-left text-slate-800">
                  아이디:
                </Label>
                <Input
                  id="username"
                  placeholder="아이디를 입력하세요"
                  type="text"
                  className="text-black"
                  disabled={isLoading || resetStep === 2}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            {resetStep === 2 && (
              <>
                <div className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="code" className="w-24 text-left text-slate-800">
                      인증 코드:
                    </Label>
                    <Input
                      id="code"
                      placeholder="이메일로 받은 코드"
                      type="text"
                      className="text-black"
                      disabled={isLoading}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="newPassword" className="w-24 text-left text-slate-800">
                      새 비밀번호:
                    </Label>
                    <Input
                      id="newPassword"
                      placeholder="새 비밀번호 입력"
                      type="password"
                      className="text-black"
                      disabled={isLoading}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-between items-center">
              <Button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700" disabled={isLoading}>
                {resetStep === 1 ? "인증 코드 받기" : "비밀번호 변경"}
              </Button>
              <button type="button" className="text-xs underline" onClick={() => setShowReset(false)}>
                로그인으로 돌아가기
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="relative mt-4">
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
            <path d="..." fill="#4285F4" />
            <path d="..." fill="#34A853" />
            <path d="..." fill="#FBBC05" />
            <path d="..." fill="#EA4335" />
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
