import { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Save } from "lucide-react"
import { RoomEditForm } from "../components/room/room-edit-form"
import { GoProject, Header } from "../components/header"


export default function RoomCreatePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const roomName = queryParams.get("name") || "새 방"
  
    // 기본 방 데이터
    const [roomData] = useState({
      name: roomName,
      photos: [],
      address: { main: "", detail: "" },
      size: { pyeong: "", squareMeter: "" },
      structure: "",
      floor: "",
      moveInDate: "",
      constructionYear: "",
      hasParking: false,
      hasElevator: false,
      cost: {
        deposit: 0,
        monthlyRent: 0,
        maintenanceFee: 0,
        brokerageFee: 0,
        utilityFee: 0,
        maintenanceItems: {},
        utilityItems: {},
        mortgageBelow70Percent: false,
      },
      options: {},
      wallWindow: {
        windowCount: 0,
        direction: "",
        hasScreens: false,
        outsideItems: {},
        goodInsulation: false,
        solidWall: false,
        goodSoundproof: false,
      },
      bathroom: {},
      kitchen: {},
      hygiene: {},
      security: {},
      surroundings: {
        subway: "",
        bus: "",
        mart: "",
        convenience: "",
        hospital: "",
        pharmacy: "",
        park: "",
        police: "",
        commute: "",
      },
      specialNotes: "",
      comments: [],
    })

  // 방 생성 처리
  const handleCreateRoom = async (formData) => {
    try {
      // AWS Lambda API 호출
      /*
      await apiRequest(`/projects/${id}/rooms`, {
        method: "POST",
        body: JSON.stringify(formData),
      })
      */

      // Mock 데이터 사용 시 처리
      console.log("방 생성 데이터:", formData)

      // 프로젝트 상세 페이지로 이동
      navigate(`/projects/${id}`)
    } catch (error) {
      console.error("방 생성 중 오류 발생:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* 헤더 */}
        <Header/>

        {/* 뒤로가기 버튼 */}
        <GoProject/>

        {/* 메인 콘텐츠 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">새 방 추가</h2>
            <Button onClick={() => handleCreateRoom(roomData)} className="bg-fuchsia-600 hover:bg-fuchsia-700">
              <Save size={16} className="mr-1" />
              <span>방 생성</span>
            </Button>
          </div>

          <RoomEditForm roomData={roomData} onSubmit={handleCreateRoom} projectId={id} roomId="new" />
        </div>
      </div>
    </div>
  )
}
