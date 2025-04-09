"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"

interface Room {
  id: string
  name: string
  stars: number
}

interface RoomCardProps {
  room: Room
  projectId: string
  isDeleteMode: boolean
  isCheckedForDelete: boolean
  onDeleteCheckChange: (id: string, checked: boolean) => void
}

export function RoomCard({
  room,
  projectId,
  isDeleteMode,
  isCheckedForDelete,
  onDeleteCheckChange,
}: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="bg-gray-200 rounded-md overflow-hidden relative">
      {/* 삭제 모드일 때 체크박스 표시 */}
      {isDeleteMode && (
        <div className="absolute top-2 right-2 z-10">
          <Checkbox
            checked={isCheckedForDelete}
            onCheckedChange={(checked) => onDeleteCheckChange(room.id, checked as boolean)}
            className="h-5 w-5 border-2 border-gray-400 bg-white"
          />
        </div>
      )}

      {/* 방 내용 */}
      <Link href={`/projects/${projectId}/rooms/${room.id}`}>
        <div className="relative">
          {/* 방 이미지 */}
          <div className="bg-pink-300 aspect-square relative">
            <Image
              src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(room.name)}`}
              alt={room.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 방 이름 */}
          <div className="p-3">
            <h3 className="text-lg font-medium text-gray-800">{room.name}</h3>
          </div>

          {/* 별점 */}
          <div
            className={`absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer transition-colors`}
          >
            <Star size={16} className={room.stars > 0 ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
            <span className={room.stars > 0 ? "text-yellow-500" : "text-gray-600"}>{room.stars}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
