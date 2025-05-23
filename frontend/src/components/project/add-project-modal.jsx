import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import axios from "axios"
import {getAuthHeaders,API_BASE_URL} from "../../services/apiServices"

export function AddProjectModal({ isOpen, onClose, onAdd }) {
  const [projectName, setProjectName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const username = localStorage.getItem("user");

  const handleSubmit = async(e) => {
    e.preventDefault()

    // 유효성 검사
    if (!projectName.trim()) {
      setError("프로젝트 이름을 입력해주세요.")
      return
    }

    try {
      // 람다 함수 URL (API Gateway 엔드포인트)
      const url = `${API_BASE_URL}/createProjects`
      const headers = await getAuthHeaders();

       // axios POST 요청
      const response = await axios.post(
        url,
        {
          username,
          projectName,
        },
        {
          headers,
        }
      )

      // 요청 성공 시 onAdd 호출
      onAdd(projectName)

      // 상태 초기화 및 모달 닫기
      setProjectName("")
      onClose()
    } catch (err) {
      setError(err.response?.data?.error || err.message || "알 수 없는 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }

  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>새 프로젝트 추가</DialogTitle>
            <DialogDescription>새로운 프로젝트의 이름을 입력해주세요.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="projectName" className="text-right">
                프로젝트 이름:
              </Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value)
                  setError("")
                }}
                placeholder="프로젝트 이름을 입력하세요"
                className={error ? "border-red-500" : "text-gray-800"}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="text-black" disabled={loading}>
              취소
            </Button>
            <Button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700" disabled={loading}>
              {loading ? "생성중..." : "생성"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

