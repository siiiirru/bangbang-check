"use client"

import { useState, useEffect , useCallback} from "react"
import { RoomDetail } from "@/components/room/room-detail"
import { RoomEditForm } from "@/components/room/room-edit-form"
import { CommentSection } from "@/components/room/comment-section"
import { SpecialNotesInput } from "@/components/room/special-notes-input"
import { Skeleton } from "@/components/ui/skeleton"
import { Header,GoProject } from "@/components/header"


interface RoomPageProps {
  params: {
    id: string
    roomId: string
  }
}

export default function RoomPage({ params }: RoomPageProps) {
  const { id, roomId } = params
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [roomData, setRoomData] = useState<any>(null)
  const [isOwner, setIsOwner] = useState(false) // 실제로는 인증 상태에 따라 결정
  const [isStarred, setIsStarred] = useState(false)
  // 방 데이터 가져오기
  useEffect(() => {
    const fetchRoomData = async () => {
      setIsLoading(true)
      try {
        // 실제 구현에서는 여기에 fetch 요청을 사용
        // const response = await fetch(`/api/projects/${id}/rooms/${roomId}`);
        // const data = await response.json();

        // 데모 데이터
        const demoData = {
          id: roomId,
          name: `방 이름${roomId}`,
          stars: 3,
          photos: [
            `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(`방 ${roomId} 이미지 1`)}`,
            `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(`방 ${roomId} 이미지 2`)}`,
          ],
          address: {
            main: "서울시 강남구",
            detail: "테헤란로 123",
          },
          size: {
            pyeong: "8평",
            squareMeter: "26.4㎡",
          },
          structure: "원룸",
          floor: "3층",
          totalFloors: "7층",
          moveInDate: "2025-05-01",
          contractPeriod: "1년",
          hasParking: true,
          hasElevator: true,
          cost: {
            deposit: 1000,
            monthlyRent: 50,
            maintenanceFee: 5,
          },
          options: {
            airConditioner: true,
            refrigerator: true,
            washingMachine: true,
            desk: true,
            bed: true,
            closet: true,
            tv: false,
            microwave: true,
            gasStove: true
          },
          windows: {
            count: 2,
            direction: "남향",
            ventilation: "좋음",
          },
          security: {
            cctv: true,
            doorSecurity: true,
            intercom: true,
          },
          surroundings: {
            subway: "강남역 도보 5분",
            bus: "버스정류장 도보 3분",
            mart: "이마트 도보 10분",
            convenience: "CU 도보 1분",
          },
          // 새로운 섹션들을 위한 데이터
          wallWindow: {
            wallMaterial: "concrete",
            wallCondition: "good",
            windowType: "sliding",
            windowInsulation: "good",
            isDoubleGlazed: true,
            isSoundproof: false,
            isWallInsulated: true,
            hasMold: false,
            hasCrack: false,
          },
          bathroom: {
            type: "separate",
            size: "1.5평",
            hasBathtub: false,
            hasBidet: true,
            hasShowerBooth: true,
            hasVentilation: true,
            hasWaterHeater: true,
          },
          kitchen: {
            type: "open",
            size: "1평",
            hasGasRange: true,
            hasInduction: false,
            hasSink: true,
            hasHood: true,
            hasCabinet: true,
          },
          hygiene: {
            cleanliness: "good",
            pestControl: "good",
            hasBugs: false,
            hasMold: false,
            hasOdor: false,
            hasGoodVentilation: true,
            hasWaterLeak: false,
          },
          specialNotes: "매우 깨끗한 상태이며, 채광이 좋습니다. 주변 소음이 적고 관리가 잘 되어 있습니다.",
          comments: [
            {
              id: "1",
              author: "user1",
              content: "이 방은 별로야",
              createdAt: "2025-04-01T12:00:00Z",
            },
            {
              id: "2",
              author: "user2",
              content:
                "다른 방이랑 비교했을 때 여기는 좀 소음이 없어 들릴 것 같고 채광도 별로일 것 같은데? 어때 털털시커",
              createdAt: "2025-04-02T14:30:00Z",
            },
          ],
        }

        // 데이터 로딩 시뮬레이션
        setTimeout(() => {
          setRoomData(demoData)
          setIsLoading(false)
          // 데모에서는 사용자가 방의 소유자라고 가정
          setIsOwner(true)
        }, 1000)
      } catch (error) {
        console.error("방 데이터를 가져오는 중 오류 발생:", error)
        setIsLoading(false)
      }
    }

    fetchRoomData()
  }, [id, roomId])

  // 방 데이터 업데이트
  const handleUpdateRoom = async (updatedData: any) => {
    try {
      // 실제 구현에서는 여기에 API 요청
      // await fetch(`/api/projects/${id}/rooms/${roomId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData)
      // });

      // 데모용 업데이트
      setRoomData({ ...roomData, ...updatedData })
      setIsEditing(false)
    } catch (error) {
      console.error("방 정보 업데이트 중 오류 발생:", error)
    }
  }

  // 별점 토글 핸들러 - useCallback으로 메모이제이션
  const handleStarToggle = useCallback(() => {
    if (!roomData) return
  
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
  }, [roomData, isStarred])

  // 특이 사항 업데이트
  const handleUpdateSpecialNotes = async (notes: string) => {
    try {
      // 실제 구현에서는 여기에 API 요청
      // await fetch(`/api/projects/${id}/rooms/${roomId}/special-notes`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ specialNotes: notes })
      // });

      // 데모용 업데이트
      setRoomData({ ...roomData, specialNotes: notes })
    } catch (error) {
      console.error("특이 사항 업데이트 중 오류 발생:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-4 px-4">
        {/* 헤더 */}
        <Header/>

        {/* 뒤로가기 버튼 */}
        <GoProject/>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Skeleton className="h-[300px] md:col-span-3" />
              <Skeleton className="h-[300px]" />
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
