import { Button } from "../components/ui/button"
import { LogOut } from "lucide-react"
import { GoProject, Logo } from "../components/header"
import { AccountSettings } from "../components/settings/account-settings"
import { DeleteAccount } from "../components/settings/delete-account"


export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100 custom-cursor-default-hover">
      <div className="container mx-auto py-4 px-4">
        {/* 헤더 */}
        <header className="flex justify-between items-center mb-8">
          <Logo/>
          <div className="flex gap-2">
            <a href="/">
              <Button variant="outline" size="sm" className="gap-1 text-black">
                <LogOut size={16} />
                <span>로그아웃</span>
              </Button>
            </a>
          </div>
        </header>

        {/* 뒤로가기 버튼 */}
        <GoProject/>

        {/* 설정 내용 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">설정</h2>

          <div className="space-y-6">
            {/* 계정 설정 */}
            <div className="p-4 border rounded-md border-border">
              <h3 className="text-lg font-medium mb-4 text-card-foreground">계정 설정</h3>
              <AccountSettings />
            </div>

            {/* 회원 탈퇴 */}
            <div className="p-4 border rounded-md border-destructive/20">
            <h3 className="text-lg font-medium mb-4 text-destructive">계정 삭제</h3>
            <p className="text-muted-foreground mb-4">
              계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다. 이 작업은 되돌릴 수 없습니다.
            </p>
            <DeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

