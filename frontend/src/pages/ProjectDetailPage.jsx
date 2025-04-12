import { useState, useEffect, useCallback } from "react"
import { Button } from "../components/ui/button"
import { useParams } from "react-router-dom"
import { RoomList } from "../components/room/room-list"
import { RankingList } from "../components/room/ranking-list"
import { GoProject, Header } from "../components/header"
import { AiRecommendation } from "../components/room/ai-recommendation"
import { ResetConfirmModal } from "../components/room/reset-confirm-modal"
import { projectsData, roomsData } from "../mock/data"

export default function ProjectDetailPage() {
    const { id } = useParams()
    const [projectName, setProjectName] = useState("")
    const [isResetModalOpen, setIsResetModalOpen] = useState(false)
    const [rankings, setRankings] = useState([])
    const [allRooms, setAllRooms] = useState([])
    const [isLoading, setIsLoading] = useState(true)

  // 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true)
      try {
        // AWS Lambda API 호출
        /*
        const projectData = await apiRequest(`/projects/${id}`)
        setProjectName(projectData.name)

        // 방 목록 가져오기
        const roomsData = await apiRequest(`/projects/${id}/rooms`)
        setAllRooms(roomsData)
        */

        // Mock 데이터 사용
        const projectData = projectsData.find((project) => project.id === id)
        setProjectName(projectData?.name || "프로젝트")

        const rooms = roomsData[id] || []
        setAllRooms(rooms)

        // 별점 기준으로 정렬하여 랭킹 설정
        const sortedRooms = [...rooms].sort((a, b) => b.stars - a.stars)
        setRankings(sortedRooms)

        setIsLoading(false)
      } catch (error) {
        console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error)
        setIsLoading(false)
      }
    }

    fetchProjectData()
  }, [id])

  // 순위 초기화 처리
  const handleResetRankings = async () => {
    try {
      // AWS Lambda API 호출
      /*
      await apiRequest(`/projects/${id}/rankings/reset`, { method: "POST" })
      */

      // 랭킹 초기화 후 UI 업데이트
      setRankings(rankings.map((room) => ({ ...room, stars: 0 })))
      setIsResetModalOpen(false)
    } catch (error) {
      console.error("순위 초기화 중 오류 발생:", error)
    }
  }

   // 순위 업데이트 핸들러 - useCallback으로 메모이제이션
   const handleUpdateRanking = useCallback(
    async (position, roomId) => {
      try {
        // AWS Lambda API 호출
        /*
        await apiRequest(`/projects/${id}/rankings`, {
          method: "PUT",
          body: JSON.stringify({ position, roomId }),
        })
        */

        // UI 업데이트
        setRankings((prevRankings) => {
          const newRankings = [...prevRankings]
          // 선택된 방의 별 개수를 위치에 따라 설정 (1위: 3, 2위: 2, 3위: 1)
          const starsForPosition = [3, 2, 1]

          // 모든 방의 별점을 업데이트
          return newRankings.map((room) => {
            if (room.id === roomId) {
              return { ...room, stars: starsForPosition[position] }
            } else if (room.stars === starsForPosition[position]) {
              // 다른 방이 같은 순위를 가지고 있었다면 초기화
              return { ...room, stars: 0 }
            }
            return room
          })
        })
      } catch (error) {
        console.error("순위 업데이트 중 오류 발생:", error)
      }
    },
    [id],
  )

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="container mx-auto py-4 px-4">
        {/* 헤더 */}
        <Header/>

        {/* 뒤로가기 버튼 */}
        <GoProject/>

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 방 목록 섹션 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{projectName}</h2>
              <RoomList projectId={id} rankings={rankings} setRankings={setRankings} />
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 현재 순위 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">현재 순위</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsResetModalOpen(true)}
                  disabled={isLoading || rankings.every((room) => room.stars === 0)}
                  className="text-gray-800"
                >
                  초기화
                </Button>
              </div>
              <RankingList
                rankings={rankings}
                isLoading={isLoading}
                allRooms={allRooms}
                onUpdateRanking={handleUpdateRanking}
              />
            </div>

            {/* 오늘의 AI 방 추천 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <AiRecommendation projectId={id} />
            </div>
          </div>
        </div>
      </div>

      {/* 초기화 확인 모달 */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetRankings}
      />
    </div>
  )
}
