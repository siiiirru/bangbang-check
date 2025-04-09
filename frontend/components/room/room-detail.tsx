"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Star,
  Edit,
  Home,
  Banknote,
  Lock,
  MapPin,
  WallpaperIcon as Wall,
  Bath,
  Utensils,
  Sparkles,
  Package,
} from "lucide-react"

interface RoomDetailProps {
  roomData: any
  isOwner: boolean
  onEditClick: () => void
  onStarToggle?: () => void
}

export function RoomDetail({ roomData, isOwner, onEditClick,onStarToggle }: RoomDetailProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % roomData.photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + roomData.photos.length) % roomData.photos.length)
  }

  return (
    <div className="space-y-6">
      {/* 방 제목 및 수정 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-800">{roomData.name}</h2>
          <button
            onClick={onStarToggle}
            className="flex items-center gap-1 px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-full text-white transition-colors"
          >
            <Star size={16} className="fill-white" />
            <span>{roomData.stars}</span>
          </button>
        </div>
        {isOwner && (
          <Button
            onClick={onEditClick}
            variant="outline"
            size="sm"
            className="gap-1 border-fuchsia-300 text-fuchsia-700 hover:bg-fuchsia-50"
          >
            <Edit size={16} />
            <span>수정</span>
          </Button>
        )}
      </div>

      {/* 사진 슬라이더 */}
      <div className="relative rounded-lg overflow-hidden bg-gray-200 aspect-video shadow-md">
        {roomData.photos.length > 0 ? (
          <>
            <Image
              src={roomData.photos[currentPhotoIndex] || "/placeholder.svg"}
              alt={`${roomData.name} 사진 ${currentPhotoIndex + 1}`}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
            {roomData.photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                  onClick={prevPhoto}
                >
                  <ChevronLeft size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                  onClick={nextPhoto}
                >
                  <ChevronRight size={24} />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                  {currentPhotoIndex + 1} / {roomData.photos.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">등록된 사진이 없습니다</p>
          </div>
        )}
      </div>

      {/* 정보 섹션들을 그리드로 배치 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {/* 기본 정보 */}
        <Card className="sm:col-span-2 lg:col-span-1 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-blue-50 border-b border-blue-100 py-3">
            <div className="flex items-center gap-2 text-blue-700">
              <Home size={18} />
              <h3 className="text-lg font-semibold">기본 정보</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">주소:</span>
                <span className="font-medium">
                  {roomData.address.main} {roomData.address.detail}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">면적:</span>
                <span className="font-medium">
                  {roomData.size.pyeong} ({roomData.size.squareMeter})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">구조:</span>
                <span className="font-medium">{roomData.structure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">층수:</span>
                <span className="font-medium">{roomData.floor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">입주 가능일:</span>
                <span className="font-medium">{roomData.moveInDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">준공년도:</span>
                <span className="font-medium">{roomData.constructionYear || "정보 없음"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">주차장:</span>
                <span className="font-medium">{roomData.hasParking ? "있음" : "없음"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">엘리베이터:</span>
                <span className="font-medium">{roomData.hasElevator ? "있음" : "없음"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 비용 */}
        <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-green-50 border-b border-green-100 py-3">
            <div className="flex items-center gap-2 text-green-700">
              <Banknote size={18} />
              <h3 className="text-lg font-semibold">비용</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">보증금:</span>
                <span className="font-medium">{roomData.cost.deposit}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">월세:</span>
                <span className="font-medium">{roomData.cost.monthlyRent}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">중개료:</span>
                <span className="font-medium">{roomData.cost.brokerageFee || 0}만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">관리비:</span>
                <span className="font-medium">{roomData.cost.maintenanceFee}만원</span>
              </div>
              {roomData.cost.maintenanceItems && Object.keys(roomData.cost.maintenanceItems).length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-1">관리비 포함:</span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(roomData.cost.maintenanceItems).map(
                      ([key, value]) =>
                        value && (
                          <Badge key={key} className="bg-green-100 text-green-800 hover:bg-green-200">
                            {maintenanceItemLabels[key as keyof typeof maintenanceItemLabels] || key}
                          </Badge>
                        ),
                    )}
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">공과금:</span>
                <span className="font-medium">{roomData.cost.utilityFee || 0}만원</span>
              </div>
              {roomData.cost.utilityItems && Object.keys(roomData.cost.utilityItems).length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-1">공과금 정보:</span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(roomData.cost.utilityItems).map(
                      ([key, value]) =>
                        value && (
                          <Badge key={key} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {utilityItemLabels[key as keyof typeof utilityItemLabels] || key}
                          </Badge>
                        ),
                    )}
                  </div>
                </div>
              )}
              {roomData.cost.mortgageBelow70Percent && (
                <div className="mt-2">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">근저당 매매가 70% 이하</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 창문·벽 */}
        <Card className="border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-yellow-50 border-b border-yellow-100 py-3">
            <div className="flex items-center gap-2 text-yellow-700">
              <Wall size={18} />
              <h3 className="text-lg font-semibold">창문·벽</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">창문 개수:</span>
                <span className="font-medium">{roomData.wallWindow?.windowCount || 0}개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">향:</span>
                <span className="font-medium">{roomData.wallWindow?.direction || "정보 없음"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">방충망:</span>
                <span className="font-medium">
                  {roomData.wallWindow?.hasScreens ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <X size={16} className="text-red-500" />
                  )}
                </span>
              </div>

              {roomData.wallWindow?.outsideItems && Object.keys(roomData.wallWindow.outsideItems).length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-1">창밖:</span>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(roomData.wallWindow.outsideItems).map(
                      ([key, value]) =>
                        value && (
                          <Badge key={key} className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            {outsideItemLabels[key as keyof typeof outsideItemLabels] || key}
                          </Badge>
                        ),
                    )}
                  </div>
                </div>
              )}

              <div className="mt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">단열이 잘 됨:</span>
                    {roomData.wallWindow?.goodInsulation ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <X size={16} className="text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">벽이 튼튼함:</span>
                    {roomData.wallWindow?.solidWall ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <X size={16} className="text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">방음이 잘 됨:</span>
                    {roomData.wallWindow?.goodSoundproof ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <X size={16} className="text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 화장실 */}
        <Card className="border-cyan-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-cyan-50 border-b border-cyan-100 py-3">
            <div className="flex items-center gap-2 text-cyan-700">
              <Bath size={18} />
              <h3 className="text-lg font-semibold">화장실</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">타일, 세면대 깨지지 않음:</span>
                {roomData.bathroom?.tilesNotBroken ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">창문, 환기시설 있음:</span>
                {roomData.bathroom?.hasVentilation ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">온수 전환시간 빠름:</span>
                {roomData.bathroom?.quickHotWater ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">동시에 틀기 수압 좋음:</span>
                {roomData.bathroom?.goodWaterPressure ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">물이 잘 빠짐:</span>
                {roomData.bathroom?.goodDrainage ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 부엌 */}
        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-orange-50 border-b border-orange-100 py-3">
            <div className="flex items-center gap-2 text-orange-700">
              <Utensils size={18} />
              <h3 className="text-lg font-semibold">부엌</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">후드 깨끗함:</span>
                {roomData.kitchen?.cleanHood ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">수납장 파손 없음:</span>
                {roomData.kitchen?.cabinetNotDamaged ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">파이프 튼튼하게 고정됨:</span>
                {roomData.kitchen?.securedPipes ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">역류경험 없음:</span>
                {roomData.kitchen?.noBackflow ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">냄새 안남:</span>
                {roomData.kitchen?.noSmell ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">온수 작동함:</span>
                {roomData.kitchen?.hotWaterWorks ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">여름철 온수 작동함:</span>
                {roomData.kitchen?.summerHotWaterWorks ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 위생 */}
        <Card className="border-purple-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-purple-50 border-b border-purple-100 py-3">
            <div className="flex items-center gap-2 text-purple-700">
              <Sparkles size={18} />
              <h3 className="text-lg font-semibold">위생</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">곰팡이 없음:</span>
                {roomData.hygiene?.noMold ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">악취가 나지 않음:</span>
                {roomData.hygiene?.noOdor ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">누수 흔적이 없음:</span>
                {roomData.hygiene?.noLeakage ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">벌레가 없음:</span>
                {roomData.hygiene?.noBugs ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">분리수거는 정해진 요일이 없음:</span>
                {roomData.hygiene?.noRecyclingDay ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 옵션 */}
        <Card className="sm:col-span-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-3">
            <div className="flex items-center gap-2 text-slate-700">
              <Package size={18} />
              <h3 className="text-lg font-semibold">옵션</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(optionLabels).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  {roomData.options?.[key] ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <X size={16} className="text-red-500" />
                  )}
                  <span className={roomData.options?.[key] ? "text-gray-800" : "text-gray-400"}>
                    {optionLabels[key as keyof typeof optionLabels] || key}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 보안 */}
        <Card className="border-rose-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-rose-50 border-b border-rose-100 py-3">
            <div className="flex items-center gap-2 text-rose-700">
              <Lock size={18} />
              <h3 className="text-lg font-semibold">보안</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(roomData.security).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  {value ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-red-500" />}
                  <span className={value ? "text-gray-800" : "text-gray-400"}>
                    {securityLabels[key as keyof typeof securityLabels] || key}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 주변 시설 */}
        <Card className="sm:col-span-2 lg:col-span-2 border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-emerald-50 border-b border-emerald-100 py-3">
            <div className="flex items-center gap-2 text-emerald-700">
              <MapPin size={18} />
              <h3 className="text-lg font-semibold">주변 시설</h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(roomData.surroundings)
                .filter(([key]) => key !== "school") // 학교 정보 제외
                .map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                      {surroundingLabels[key as keyof typeof surroundingLabels] || key}
                    </Badge>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              {roomData.surroundings.commute && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">등교·출퇴근 거리</Badge>
                  <span className="text-gray-800">{roomData.surroundings.commute}</span>
                </div>
              )}
              {roomData.surroundings.police && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">경찰서</Badge>
                  <span className="text-gray-800">{roomData.surroundings.police}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// 옵션 레이블
const optionLabels = {
  refrigerator: "냉장고",
  sink: "싱크대",
  induction: "인덕션",
  gasStove: "가스레인지",
  microwave: "전자레인지",
  diningTable: "식탁",
  shower: "샤워기",
  washbasin: "세면대",
  toilet: "변기",
  bathtub: "욕조",
  washingMachine: "세탁기",
  shoeRack: "신발장",
  airConditioner: "에어컨",
  television: "텔레비전",
  bed: "침대",
  desk: "책상",
  closet: "옷장",
}

// 보안 레이블
const securityLabels = {
  cctv: "CCTV",
  doorSecurity: "현관 보안",
  intercom: "인터폰",
}

// 주변 시설 레이블
const surroundingLabels = {
  subway: "지하철",
  bus: "버스",
  mart: "마트",
  convenience: "편의점",
  hospital: "병원",
  pharmacy: "약국",
  park: "공원",
  police: "경찰서",
  commute: "등교·출퇴근 거리",
}

// 관리비 항목 레이블
const maintenanceItemLabels = {
  internet: "인터넷",
  tv: "유선TV",
  gas: "가스",
  electric: "전기",
  water: "수도",
}

// 공과금 항목 레이블
const utilityItemLabels = {
  gas: "가스",
  electric: "전기",
  water: "수도",
  separateMeter: "계량기 별도 설치",
  individualHeating: "개별난방",
  centralHeating: "중앙난방",
  districtHeating: "지역난방",
}

// 창밖 항목 레이블
const outsideItemLabels = {
  wall: "벽",
  bar: "술집",
  restaurant: "냄새(음식점)",
  recycling: "분리수거장",
  other: "기타",
}
