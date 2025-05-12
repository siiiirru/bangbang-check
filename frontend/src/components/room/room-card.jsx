import { Link } from "react-router-dom"
import { Checkbox } from "../ui/checkbox"
import { Star } from "lucide-react"

export function RoomCard({ room, projectId, isDeleteMode, isCheckedForDelete, onDeleteCheckChange }) {
  return (
    <div className="bg-gray-200 rounded-md overflow-hidden relative">
      {/* 삭제 모드일 때 체크박스 표시 */}
      {isDeleteMode && (
        <div className="absolute top-2 right-2 z-10">
          <Checkbox
            checked={isCheckedForDelete}
            onCheckedChange={(checked) => onDeleteCheckChange(room.id, checked)}
            className="h-5 w-5 border-2 border-gray-400 bg-white"
          />
        </div>
      )}

      {/* 방 내용 */}
      <Link to={`/projects/${projectId}/rooms/${room.id}`}>
        <div className="relative">
          {/* 방 이미지 */}
          <div className="bg-pink-300 aspect-square relative">
            <img
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

          {/* 별점 표시 (클릭 불가) */}
          {room.stars > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-400 text-white">
              <Star size={16} className="fill-white" />
              <span>{room.stars}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
