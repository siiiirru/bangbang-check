"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GoProject, Header } from "@/components/header"

interface CreateRoomPageProps {
  params: {
    id: string
  }
}

export default function CreateRoomPage({ params }: CreateRoomPageProps) {
  const { id } = params
  const router = useRouter()
  const searchParams = useSearchParams()

  const [roomName, setRoomName] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")
  const [area, setArea] = useState("")
  const [structure, setStructure] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // URL 파라미터에서 방 이름 가져오기
  useEffect(() => {
    const nameFromUrl = searchParams?.get("name")
    if (nameFromUrl) {
      setRoomName(decodeURIComponent(nameFromUrl))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 실제 구현에서는 여기에 방 생성 API 요청
      // await fetch(`/api/projects/${id}/rooms`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: roomName,
      //     location,
      //     price,
      //     area,
      //     structure,
      //     description
      //   })
      // });

      // 데모용 지연
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 생성 후 프로젝트 페이지로 이동
      router.push(`/projects/${id}`)
    } catch (error) {
      console.error("방 생성 중 오류 발생:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* 헤더 */}
        <Header/>

        {/* 뒤로가기 버튼 */}
        <GoProject/>

        {/* 방 생성 폼 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">새 방 등록</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="roomName" className="text-gray-800">방 이름</Label>
                  <Input
                    id="roomName"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="방 이름을 입력하세요"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-gray-800">위치</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="예: 서울시 강남구"
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="text-gray-800">가격</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="예: 월세 50/50, 전세 2억"
                  />
                </div>

                <div>
                  <Label htmlFor="area" className="text-gray-800">면적</Label>
                  <Input
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="예: 25㎡ (8평)"
                  />
                </div>

                <div>
                  <Label htmlFor="structure" className="text-gray-800">구조</Label>
                  <Input
                    id="structure"
                    value={structure}
                    onChange={(e) => setStructure(e.target.value)}
                    placeholder="예: 원룸, 투룸, 오피스텔"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description" className="text-gray-800">상세 설명</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="방에 대한 상세 설명을 입력하세요"
                    className="min-h-[200px]"
                  />
                </div>

                <div>
                  <Label className="text-gray-800">사진 업로드</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mt-1 text-center">
                    <p className="text-gray-500">아직 구현되지 않은 기능입니다. 추후 업데이트 예정입니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Link href={`/projects/${id}`}>
                <Button type="button" variant="outline" className="text-gray-800">
                  취소
                </Button>
              </Link>
              <Button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700" disabled={isSubmitting}>
                {isSubmitting ? "등록 중..." : "방 등록하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
