"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Upload, X, Save, ImageIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PhotoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  currentPhotos: string[]
  onPhotosUpdate: (photos: string[]) => void
  projectId: string
  roomId: string
  maxPhotos: number
}

export function PhotoUploadModal({
  isOpen,
  onClose,
  currentPhotos,
  onPhotosUpdate,
  projectId,
  roomId,
  maxPhotos,
}: PhotoUploadModalProps) {
  const [photos, setPhotos] = useState<string[]>([...currentPhotos])
  const [isUploading, setIsUploading] = useState(false)

  // 사진 업로드 핸들러 (데모용)
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      // 실제 구현에서는 여기에 API 요청으로 파일 업로드
      // const formData = new FormData();
      // for (let i = 0; i < files.length; i++) {
      //   formData.append('photos', files[i]);
      // }
      // const response = await fetch(`/api/projects/${projectId}/rooms/${roomId}/photos`, {
      //   method: 'POST',
      //   body: formData
      // });
      // const uploadedPhotos = await response.json();

      // 데모용 사진 URL 생성
      const newPhotos: string[] = []
      for (let i = 0; i < files.length; i++) {
        if (photos.length + newPhotos.length >= maxPhotos) break

        // 실제로는 업로드된 이미지 URL을 사용
        // 데모에서는 placeholder 이미지 사용
        newPhotos.push(`/placeholder.svg?height=400&width=600&text=업로드된_사진_${Date.now()}_${i}`)
      }

      setPhotos([...photos, ...newPhotos])
    } catch (error) {
      console.error("사진 업로드 중 오류 발생:", error)
    } finally {
      setIsUploading(false)
      // 파일 입력 초기화
      e.target.value = ""
    }
  }

  // 사진 삭제 핸들러
  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  // 변경 사항 저장
  const handleSave = () => {
    onPhotosUpdate(photos)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] border-violet-200">
        <DialogHeader className="bg-violet-50 -mx-6 -mt-6 px-6 pt-6 pb-3 rounded-t-lg border-b border-violet-100">
          <div className="flex items-center gap-2 text-violet-700">
            <ImageIcon size={18} />
            <DialogTitle>사진 관리</DialogTitle>
          </div>
          <DialogDescription>방 사진을 관리합니다. 최대 {maxPhotos}장까지 업로드할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* 사진 업로드 버튼 */}
          <div className="flex items-center justify-center">
            <Label
              htmlFor="photo-upload"
              className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer ${
                photos.length >= maxPhotos
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-violet-50 text-violet-600 hover:bg-violet-100 border-violet-200"
              }`}
            >
              <Upload size={16} />
              <span>
                사진 업로드 ({photos.length}/{maxPhotos})
              </span>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUpload}
                disabled={photos.length >= maxPhotos || isUploading}
              />
            </Label>
          </div>

          {/* 사진 미리보기 */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group aspect-square bg-gray-100 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`방 사진 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Trash2 size={40} className="mx-auto mb-2 opacity-20" />
              <p>등록된 사진이 없습니다</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="border-gray-300">
            <X size={16} className="mr-1" />
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-violet-600 hover:bg-violet-700"
            disabled={isUploading}
          >
            <Save size={16} className="mr-1" />
            변경 사항 저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
