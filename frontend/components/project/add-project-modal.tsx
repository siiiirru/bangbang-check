"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string) => void
}

export function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [projectName, setProjectName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    if (!projectName.trim()) {
      setError("프로젝트 이름을 입력해주세요.")
      return
    }

    // 프로젝트 추가
    onAdd(projectName)

    // 상태 초기화
    setProjectName("")
    setError("")
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
            <Button type="button" variant="outline" onClick={onClose} className="text-black">
              취소
            </Button>
            <Button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700">
              생성
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

