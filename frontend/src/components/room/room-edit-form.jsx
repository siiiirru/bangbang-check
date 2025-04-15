"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { PhotoUploadModal } from "./photo-upload-modal"
import { BasicInfoSection } from "./form-sections/basic-info-section"
import { CostSection } from "./form-sections/cost-section"
import { OptionsSection } from "./form-sections/options-section"
import { SecuritySection } from "./form-sections/security-section"
import { SurroundingsSection } from "./form-sections/surroundings-section"
import { WallWindowSection } from "./form-sections/wall-window-section"
import { BathroomSection } from "./form-sections/bathroom-section"
import { KitchenSection } from "./form-sections/kitchen-section"
import { HygieneSection } from "./form-sections/hygiene-section"
import {
  Home,
  Banknote,
  Lock,
  MapPin,
  WallpaperIcon as Wall,
  Bath,
  Utensils,
  Sparkles,
  Package,
  ImageIcon,
  Save,
  X,
} from "lucide-react"

export function RoomEditForm({ roomData, onSubmit, projectId, roomId }) {
  const [formData, setFormData] = useState({ ...roomData })
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 데이터 업데이트 핸들러
  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  // 최상위 필드 업데이트 핸들러
  const updateTopLevelField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 사진 업데이트 핸들러
  const handlePhotosUpdate = (photos) => {
    setFormData((prev) => ({
      ...prev,
      photos,
    }))
    setIsPhotoModalOpen(false)
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("폼 제출 중 오류 발생:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* 사진 섹션 */}
        <Card className="border-violet-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-violet-50 border-b border-violet-100 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-violet-700">
                <ImageIcon size={18} />
                <h3 className="text-lg font-semibold">사진</h3>
              </div>
              <Button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                variant="outline"
                size="sm"
                className="border-violet-200 text-violet-600 hover:bg-violet-50"
              >
                사진 관리
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {formData.photos.map((photo, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`방 사진 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {formData.photos.length === 0 && (
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 text-sm">사진 없음</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 탭 형식의 폼 섹션 */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-blue-50 border-b border-blue-100 py-3">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Home size={18} />
                      <h3 className="text-lg font-semibold">기본 정보</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <BasicInfoSection
                      data={formData}
                      updateFormData={updateFormData}
                      updateTopLevelField={updateTopLevelField}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-green-50 border-b border-green-100 py-3">
                    <div className="flex items-center gap-2 text-green-700">
                      <Banknote size={18} />
                      <h3 className="text-lg font-semibold">비용</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CostSection data={formData.cost} updateFormData={(data) => updateFormData("cost", data)} />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 py-3">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Package size={18} />
                      <h3 className="text-lg font-semibold">옵션</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <OptionsSection
                      data={formData.options}
                      updateFormData={(data) => updateFormData("options", data)}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-yellow-50 border-b border-yellow-100 py-3">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <Wall size={18} />
                      <h3 className="text-lg font-semibold">창문·벽</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <WallWindowSection
                      data={formData.wallWindow || {}}
                      updateFormData={(data) => updateFormData("wallWindow", data)}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Card className="border-cyan-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-cyan-50 border-b border-cyan-100 py-3">
                    <div className="flex items-center gap-2 text-cyan-700">
                      <Bath size={18} />
                      <h3 className="text-lg font-semibold">화장실</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <BathroomSection
                      data={formData.bathroom || {}}
                      updateFormData={(data) => updateFormData("bathroom", data)}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-orange-50 border-b border-orange-100 py-3">
                    <div className="flex items-center gap-2 text-orange-700">
                      <Utensils size={18} />
                      <h3 className="text-lg font-semibold">부엌</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <KitchenSection
                      data={formData.kitchen || {}}
                      updateFormData={(data) => updateFormData("kitchen", data)}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-purple-50 border-b border-purple-100 py-3">
                    <div className="flex items-center gap-2 text-purple-700">
                      <Sparkles size={18} />
                      <h3 className="text-lg font-semibold">위생</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <HygieneSection
                      data={formData.hygiene || {}}
                      updateFormData={(data) => updateFormData("hygiene", data)}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-rose-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-rose-50 border-b border-rose-100 py-3">
                    <div className="flex items-center gap-2 text-rose-700">
                      <Lock size={18} />
                      <h3 className="text-lg font-semibold">보안</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <SecuritySection
                      data={formData.security}
                      updateFormData={(data) => updateFormData("security", data)}
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-emerald-50 border-b border-emerald-100 py-3">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <MapPin size={18} />
                      <h3 className="text-lg font-semibold">주변 시설</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <SurroundingsSection
                      data={formData.surroundings}
                      updateFormData={(data) => updateFormData("surroundings", data)}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSubmit(roomData)}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <X size={16} className="mr-1" />
            취소
          </Button>
          <Button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700" disabled={isSubmitting}>
            <Save size={16} className="mr-1" />
            {isSubmitting ? "저장 중..." : "변경 완료"}
          </Button>
        </div>
      </div>

      {/* 사진 업로드 모달 */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotos={formData.photos}
        onPhotosUpdate={handlePhotosUpdate}
        projectId={projectId}
        roomId={roomId}
        maxPhotos={15}
      />
    </form>
  )
}