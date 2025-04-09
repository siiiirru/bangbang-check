"use client"

import type React from "react"

import { useState } from "react"
import { RoomCard } from "@/components/room/room-card"
import { AddRoomModal } from "@/components/room/add-room-modal"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Room {
  id: string
  name: string
  stars: number
}

interface RoomListProps {
  projectId: string
  rankings: Room[]
  setRankings: React.Dispatch<React.SetStateAction<Room[]>>
}

export function RoomList({ projectId, rankings, setRankings }: RoomListProps) {
  const router = useRouter()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([])

  // 방 추가 핸들러
  const handleAddRoom = (name: string) => {
    router.push(`/projects/${projectId}/rooms/create?name=${encodeURIComponent(name)}`)
  }

  // 삭제 모드 토글
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode)
    setSelectedForDelete([])
  }

  // 삭제 체크박스 변경 핸들러
  const handleDeleteCheckChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedForDelete([...selectedForDelete, id])
    } else {
      setSelectedForDelete(selectedForDelete.filter((item) => item !== id))
    }
  }

  // 선택된 방 삭제
  const deleteSelectedRooms = () => {
    setRankings(rankings.filter((room) => !selectedForDelete.includes(room.id)))
    setIsDeleteMode(false)
    setSelectedForDelete([])
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700" size="sm">
            <Plus size={16} className="mr-1" />
            추가
          </Button>
          <Button onClick={toggleDeleteMode} variant={isDeleteMode ? "destructive" : "outline"} size="sm" className="text-gray-700">
            <Trash2 size={16} className="mr-1" />
            삭제
          </Button>
        </div>
      </div>

      {/* 삭제 모드 액션 버튼 */}
      {isDeleteMode && selectedForDelete.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Button onClick={deleteSelectedRooms} variant="destructive" size="sm">
            선택한 {selectedForDelete.length}개 방 삭제
          </Button>
        </div>
      )}

      {/* 방 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rankings.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            projectId={projectId}
            isDeleteMode={isDeleteMode}
            isCheckedForDelete={selectedForDelete.includes(room.id)}
            onDeleteCheckChange={handleDeleteCheckChange}
          />
        ))}
      </div>

      {/* 방이 없을 때 */}
      {rankings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">등록된 방이 없습니다. 새 방을 추가해보세요.</p>
          <Button onClick={() => setIsAddModalOpen(true)} className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700">
            <Plus size={16} className="mr-1" />새 방 추가
          </Button>
        </div>
      )}

      {/* 방 추가 모달 */}
      <AddRoomModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddRoom} />
    </div>
  )
}
