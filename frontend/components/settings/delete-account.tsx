"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function DeleteAccount() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [error, setError] = useState("")

  const handleDeleteRequest = () => {
    setIsConfirmOpen(true)
    setConfirmText("")
    setError("")
  }

  const handleConfirmDelete = () => {
    if (confirmText !== "계정삭제") {
      setError("올바른 확인 텍스트를 입력해주세요.")
      return
    }

    // 실제 구현에서는 API 요청
    // 성공 시 로그아웃 및 홈으로 리다이렉트
    window.location.href = "/"
  }

  return (
    <>
      <Button variant="destructive" onClick={handleDeleteRequest}>
        계정 삭제
      </Button>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle size={18} />
              계정 삭제 확인
            </AlertDialogTitle>
            <AlertDialogDescription>
              계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다. 이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
              <div className="mt-4 p-3 bg-destructive/10 rounded-md text-destructive dark:text-destructive-foreground">
                <span className="font-medium">삭제를 확인하려면 아래에 "계정삭제"를 입력하세요.</span>
              </div>
  
          </AlertDialogHeader>

          <div className="py-4">
            <Label htmlFor="confirmText" className="text-destructive">
              확인 텍스트
            </Label>
            <Input
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="계정삭제"
              className="mt-1 border-destructive/50 focus-visible:ring-destructive text-gray-800"
            />
            {error && <p className="text-destructive text-sm mt-1">{error}</p>}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-800">취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              계정 삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
