import { useState, useEffect , useCallback} from "react"
import { RoomDetail } from "../components/room/room-detail"
import { RoomEditForm } from "../components/room/room-edit-form"
import { CommentSection } from "../components/room/comment-section"
import { SpecialNotesInput } from "../components/room/special-notes-input"
import { Skeleton } from "../components/ui/skeleton"
import { Header,GoProject } from "../components/header"
import { useParams } from 'react-router-dom'
import { userData, roomsData } from "../mock/data"

export default function RoomDetailPage() {
    const { id, roomId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [roomData, setRoomData] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [isStarred, setIsStarred] = useState(false);
    // 방 데이터 가져오기
    useEffect(() => {
      const fetchRoomData = async () => {
        setIsLoading(true)
        try {
          // AWS Lambda API 호출
          /*
          const data = await apiRequest(`/projects/${id}/rooms/${roomId}`)
          setRoomData(data)
  
          // 프로젝트 소유자 확인
          const userData = await apiRequest("/user/me")
          setIsOwner(userData.id === data.ownerId)
          */
  
          // Mock 데이터 사용
          const projectRooms = roomsData[id] || []
          const room = projectRooms.find((room) => room.id === roomId)
  
          if (room) {
            setRoomData(room)
            setIsOwner(userData.id === room.ownerId)
          }
  
          setIsLoading(false)
        } catch (error) {
          console.error("방 데이터를 가져오는 중 오류 발생:", error)
          setIsLoading(false)
        }
      }
  
      fetchRoomData()
    }, [id, roomId])
  
    // 방 데이터 업데이트
    const handleUpdateRoom = async (updatedData) => {
      try {
        // AWS Lambda API 호출
        /*
        await apiRequest(`/projects/${id}/rooms/${roomId}`, {
          method: "PUT",
          body: JSON.stringify(updatedData),
        })
        */
  
        // UI 업데이트
        setRoomData({ ...roomData, ...updatedData })
        setIsEditing(false)
      } catch (error) {
        console.error("방 정보 업데이트 중 오류 발생:", error)
      }
    }
  
    // 특이 사항 업데이트
    const handleUpdateSpecialNotes = async (notes) => {
      try {
        // AWS Lambda API 호출
        /*
        await apiRequest(`/projects/${id}/rooms/${roomId}/special-notes`, {
          method: "PUT",
          body: JSON.stringify({ specialNotes: notes }),
        })
        */
  
        // UI 업데이트
        setRoomData({ ...roomData, specialNotes: notes })
      } catch (error) {
        console.error("특이 사항 업데이트 중 오류 발생:", error)
      }
    }

    const handleStarToggle = useCallback(async () => {
        if (!roomData) return

        try {
            // AWS Lambda API 호출
            /*
            await apiRequest(`/projects/${id}/rooms/${roomId}/star`, {
            method: "POST",
            })
            */

            // UI 업데이트
            setRoomData((prevData) => {
                const newStars = isStarred
                  ? Math.max(prevData.stars - 1, 0)
                  : prevData.stars + 1
            
                return {
                  ...prevData,
                  stars: newStars,
                }
              })
            
              setIsStarred((prev) => !prev) // 토글
            }catch (error) {
                console.error("별점 토글 중 오류 발생:", error)
              }
            }, [roomData,isStarred]) //api 연결 시 id, roomId 추가

    if (isLoading || !roomData) {
        return (
            <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-4 px-4">
                {/* 헤더 */}
                <Header/>
    
                {/* 뒤로가기 버튼 */}
                <GoProject/>

                <div className="space-y-4">
                    <Skeleton className="h-10 w-1/3" />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Skeleton className="h-[300px] md:col-span-3" />
                            <Skeleton className="h-[300px]" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-4 px-4">
                {/* 헤더 */}
                <Header/>

                {/* 뒤로가기 버튼 */}
                <GoProject/>

                {/* 메인 콘텐츠 레이아웃 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* 방 상세 정보 또는 수정 폼 - 3/4 너비 */}
                    <div className="md:col-span-3 bg-white rounded-lg shadow-sm p-6">
                        {isEditing ? (
                            <RoomEditForm roomData={roomData} onSubmit={handleUpdateRoom} projectId={id} roomId={roomId} />
                        ) : (
                            <RoomDetail 
                                roomData={roomData} 
                                isOwner={isOwner} 
                                onEditClick={() => setIsEditing(true)}
                                onStarToggle={handleStarToggle}
                            />
                        )}
                    </div>

                    {/* 사이드바 (특이 사항 및 의견) - 1/4 너비 */}
                    <div className="space-y-6">
                        {/* 특이 사항 */}
                        <SpecialNotesInput
                        notes={roomData.specialNotes}
                        onUpdate={handleUpdateSpecialNotes}
                        isOwner={isOwner}
                        />

                        {/* 의견 섹션 */}
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <CommentSection
                                comments={roomData.comments}
                                projectId={id}
                                roomId={roomId}
                                isOwner={isOwner}
                                onCommentsUpdate={(updatedComments) => {
                                    setRoomData({ ...roomData, comments: updatedComments })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}