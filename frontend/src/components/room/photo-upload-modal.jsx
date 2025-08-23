import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Trash2, Upload, X, Save, ImageIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { getAuthHeaders, API_BASE_URL } from "../../services/apiServices"
import axios from "axios"

export function PhotoUploadModal({
  isOpen,
  onClose,
  currentPhotos,
  onPhotosUpdate,
  projectId,
  roomId,
  maxPhotos,
}) {
  const [photos, setPhotos] = useState([...currentPhotos])
  const [uploading, setUploading] = useState(false)

  // 파일 선택 핸들러
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // 최대 개수 체크
    const availableSlots = maxPhotos - photos.length
    const filesToAdd = files.slice(0, availableSlots)

    if (filesToAdd.length > 0) {
      setUploading(true)
      try {
        const uploadedUrls = await uploadPhotosToS3(filesToAdd)
        setPhotos([...photos, ...uploadedUrls])
      } catch (error) {
        console.error('사진 업로드 실패:', error)
        alert('사진 업로드에 실패했습니다.')
      } finally {
        setUploading(false)
      }
    }

    // 파일 입력 초기화
    e.target.value = ""
  }

  // Presigned URL로 S3 업로드
  const uploadPhotosToS3 = async (files) => {
    const uploadPromises = files.map(async (file) => {
      // 1. Presigned URL 요청
      const headers = await getAuthHeaders()
      const presignedResponse = await axios.post(`${API_BASE_URL}/get-presigned-url`, {
        fileName: file.name,
        projectId: projectId
      }, {
        headers
      })
      
      const { presignedUrl, imageUrl } = presignedResponse.data
      
      // 2. fetch로 S3에 업로드
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      })
      
      if (!uploadResponse.ok) {
        throw new Error(`S3 업로드 실패: ${uploadResponse.status} ${uploadResponse.statusText}`)
      }
      
      return imageUrl
    })

    return Promise.all(uploadPromises)
  }

  // 미리보기 URL 가져오기 (이제 모든 photo는 S3 URL 문자열)
  const getPreviewUrl = (photo) => {
    return typeof photo === 'string' && photo !== '' ? photo : '/placeholder.svg'
  }

  // 사진 삭제 핸들러
  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  // 변경 사항 저장 (S3 URL 배열 전달)
  const handleSave = () => {
    onPhotosUpdate(photos)
    onClose()
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
            <div
              onClick={() => {
                if (photos.length < maxPhotos && !uploading) {
                  document.getElementById('photo-upload').click()
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer ${
                photos.length >= maxPhotos || uploading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-violet-50 text-violet-600 hover:bg-violet-100 border-violet-200"
              }`}
            >
              <Upload size={16} />
              <span>
                {uploading ? '업로드 중...' : `사진 선택 (${photos.length}/${maxPhotos})`}
              </span>
            </div>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              disabled={photos.length >= maxPhotos || uploading}
            />
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
                    src={getPreviewUrl(photo)}
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
          <Button type="button" variant="outline" onClick={onClose} className="text-gray-700 border-gray-300">
            <X size={16} className="mr-1" />
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Save size={16} className="mr-1" />
            변경 사항 저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}