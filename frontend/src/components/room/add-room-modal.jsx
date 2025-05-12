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

export function AddRoomModal({ isOpen, onClose, onAdd }) {
  const [roomName, setRoomName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // 유효성 검사
    if (!roomName.trim()) {
      setError("방 이름을 입력해주세요.")
      return
    }

    // 방 추가
    onAdd(roomName)

    // 상태 초기화
    setRoomName("")
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>새 방 추가</DialogTitle>
            <DialogDescription>새로운 방 추가하기</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roomName" className="text-left text-gray-700">
                방 이름:
              </Label>
              <Input
                id="roomName"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value)
                  setError("")
                }}
                placeholder="방 이름을 입력하세요"
                className={error ? "border-red-500" : "text-gray-800"}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="text-gray-700">
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
