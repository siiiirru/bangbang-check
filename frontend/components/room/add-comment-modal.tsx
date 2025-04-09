"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddCommentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (author: string, content: string) => void
}

export function AddCommentModal({ isOpen, onClose, onSubmit }: AddCommentModalProps) {
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    // 유효성 검사
    if (!author.trim()) {
      setError("이름을 입력해주세요.")
      return
    }

    if (!content.trim()) {
      setError("의견을 입력해주세요.")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit(author, content)
      setAuthor("")
      setContent("")
    } catch (error) {
      console.error("의견 제출 중 오류 발생:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-pink-200">
        <DialogHeader className="bg-pink-50 -mx-6 -mt-6 px-6 pt-6 pb-3 rounded-t-lg border-b border-pink-100">
          <DialogTitle className="text-pink-700">의견 추가</DialogTitle>
          <DialogDescription>이 방에 대한 의견을 자유롭게 작성해주세요.</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {error && <div className="bg-red-50 text-red-600 p-2 rounded-md text-sm">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="author" className="text-gray-700">이름</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름을 입력하세요"
              className="border-pink-200 focus-visible:ring-pink-400 text-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-700">의견</Label>
            <Textarea
              id="content"
              placeholder="의견을 입력하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] border-pink-200 focus-visible:ring-pink-400 text-gray-600"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="border-gray-300 text-gray-600">
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-pink-600 hover:bg-pink-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "완료"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
