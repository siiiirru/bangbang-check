import { useState, useEffect } from "react"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import { Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function RankingList({ rankings, isLoading, allRooms, onUpdateRanking }) {
  const [selectedRooms, setSelectedRooms] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  // 컴포넌트 마운트 시 또는 rankings가 변경될 때만 초기 선택 상태 설정
  useEffect(() => {
    const initialSelections = {}

    // 기존 순위 데이터가 있으면 가져오기
    rankings.forEach((room, index) => {
      if (index < 3) {
        initialSelections[index] = room.id
      }
    })

    setSelectedRooms(initialSelections)
    setHasChanges(false)
  }, [rankings])

  // 방 선택 핸들러
  const handleRoomSelect = (position, roomId) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [position]: roomId,
    }))
    setHasChanges(true)
  }

  // 변경 완료 핸들러
  const handleSaveChanges = () => {
    // 각 위치에 대해 선택된 방 ID로 순위 업데이트
    Object.entries(selectedRooms).forEach(([position, roomId]) => {
      onUpdateRanking(Number(position), roomId)
    })
    setHasChanges(false)
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {allRooms.length === 0 ? (
        <p className="text-gray-500 text-center py-4">등록된 방이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {/* 1위, 2위, 3위 선택 UI */}
          {[0, 1, 2].map((position) => (
            <div key={position} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
              <div className="font-bold text-gray-700">{position + 1}위</div>
              <div className="flex-1 mx-4">
                <Select
                  value={selectedRooms[position] || ""}
                  onValueChange={(value) => handleRoomSelect(position, value)} 
                >
                  <SelectTrigger className="w-full text-gray-700">
                    <SelectValue placeholder="방 선택" className="text-gray-700" />
                  </SelectTrigger>
                  <SelectContent >
                    {allRooms.map((room) => (
                      <SelectItem key={room.id} value={room.id} className="text-gray-700">
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}

          {/* 변경 완료 버튼 */}
          {hasChanges && (
            <Button onClick={handleSaveChanges} className="w-full mt-2 bg-fuchsia-600 hover:bg-fuchsia-700" size="sm">
              <Check size={16} className="mr-1" />
              변경 완료
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
