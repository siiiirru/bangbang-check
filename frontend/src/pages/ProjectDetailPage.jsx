import { useState, useEffect, useCallback } from "react"
import { Button } from "../components/ui/button"
import { useParams } from "react-router-dom"
import { RoomList } from "../components/room/room-list"
import { RankingList } from "../components/room/ranking-list"
import { GoProject, Header } from "../components/header"
import { AiRecommendation } from "../components/room/ai-recommendation"
import { ResetConfirmModal } from "../components/room/reset-confirm-modal"
import {getAuthHeaders,API_BASE_URL} from "../services/apiServices"
import { useLocation } from "react-router-dom"
import axios from "axios"
// import { roomsData } from "../mock/data"


export default function ProjectDetailPage() {
  const { id } = useParams()
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [rankings, setRankings] = useState([])
  const [allRooms, setAllRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const projectName = decodeURIComponent(searchParams.get("projectName"))

  // 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true)

    try {
      const headers = await getAuthHeaders();  

      // 서버에서 토큰이 없거나 username이 createBy와 다르면 게스트로 방정보만 받음
      const response = await axios.get(`${API_BASE_URL}/project`, {
      headers,
      params: {
          projectId:id
        }
      })
      
      const data = response.data
      setAllRooms(Array.isArray(data.rooms) ? data.rooms : [])
      setIsOwner(data.isOwner || false)
      
      // 랭킹 설정
      if (data.isOwner) {
        const { rank1, rank2, rank3 } = data

        // rankings를 문자열 배열로 설정
        setRankings([rank1, rank2, rank3].filter(Boolean))
      }

      setIsLoading(false)
      } catch (error) {
        console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error)
        setIsOwner(false)
        setAllRooms([])
        setIsLoading(false)
      }
    }

    fetchProjectData()
  }, [id])

   // 순위 업데이트 핸들러 - useCallback으로 메모이제이션
const handleUpdateRanking = useCallback(
  async (position, roomId) => {
    try {
      // 서버 호출 예시 (필요할 경우)
      /*
      await apiRequest(`/projects/${id}/rankings`, {
        method: "PUT",
        body: JSON.stringify({ position, roomId }),
      })
      */

      // rankings 배열을 해당 위치에 맞게 업데이트
      setRankings((prevRankings) => {
        // 중복 제거: 다른 위치에 이미 들어가 있는 roomId는 제거
        const filtered = prevRankings.filter((rankId) => rankId !== roomId)

        // 새 배열 만들고 지정된 위치에 roomId 삽입
        const updated = [...filtered]
        updated[position] = roomId

        return updated
      })
    } catch (error) {
      console.error("순위 업데이트 중 오류 발생:", error)
    }
  },
  [id]
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
              <RoomList projectId={id} rooms={allRooms} rankings={rankings} setRankings={setRankings} isOwner={isOwner} />
            </div>
          </div>

        {isOwner&&(
          // 사이드바
          <div className="space-y-6">
            {/* 현재 순위 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">현재 순위</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsResetModalOpen(true)}
                  disabled={isLoading || rankings.filter(Boolean).length === 0} 
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
        )}
        </div>
      </div>

      {/* 초기화 확인 모달 */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        // onConfirm={handleResetRankings}
      />
    </div>
  )
}
