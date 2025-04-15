import { LoginForm } from "../components/auth/login-form"
import { Link } from "react-router-dom"
import { Logo } from "../components/header"

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
        
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <Logo/>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">로그인</h1>
          <p className="text-sm text-muted-foreground">방방체크 서비스를 이용하기 위해 로그인해주세요</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          아직 계정이 없으신가요?{" "}
          <Link to="/signup" className="underline underline-offset-4 hover:text-fuchsia-600">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}

