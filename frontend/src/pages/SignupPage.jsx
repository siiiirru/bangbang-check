import { SignupForm } from "../components/auth/signup-form"
import { Logo } from "../components/header"

export default function SignupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <Logo/>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">회원가입</h1>
          <p className="text-sm text-muted-foreground">방방체크 서비스를 이용하기 위한 계정을 만들어보세요</p>
        </div>
        <SignupForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="underline underline-offset-4 hover:text-fuchsia-600">
            로그인
          </a>
        </p>
      </div>

    </div>
  )
}

