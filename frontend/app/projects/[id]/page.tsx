"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings, LogOut } from "lucide-react"
import { RoomList } from "@/components/room/room-list"
import { RankingList } from "@/components/room/ranking-list"
import { GoProject, Header } from "@/components/header"
import { AiRecommendation } from "@/components/room/ai-recommendation"
import { ResetConfirmModal } from "@/components/room/reset-confirm-modal"

// 예시 데이터로 프로젝트 정보를 반환하는 함수
export async function getProjectData(id: string) {
  // 하드코딩된 예시 데이터
  const projectData = {
    '1': {
      title: '프로젝트 1',
      description: '이것은 프로젝트 1에 대한 설명입니다.',
    },
    '2': {
      title: '프로젝트 2',
      description: '이것은 프로젝트 2에 대한 설명입니다.',
    },
    '3': {
      title: '프로젝트 3',
      description: '이것은 프로젝트 3에 대한 설명입니다.',
    },
  };
}

// app/projects/[id]/page.tsx
export const generateStaticParams = async () => {
  // 하드코딩된 프로젝트 ID 목록을 반환합니다
  const projectIds = ['1', '2', '3']; // 예시로 프로젝트 ID 리스트를 하드코딩합니다.

  // 각 프로젝트 ID에 대한 경로를 반환합니다
  return projectIds.map((id) => ({
    id,
  }));
};

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params
  const [projectName, setProjectName] = useState(`프로젝트 명${id}`)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [rankings, setRankings] = useState<{ id: string; name: string; stars: number }[]>([])
  const [allRooms, setAllRooms] = useState<{ id: string; name: string; stars: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 순위 데이터 가져오기 (REST API 요청 시뮬레이션)
  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true)
      try {
        // 실제 구현에서는 여기에 fetch 요청을 사용
        // const response = await fetch(`/api/projects/${id}/rankings`);
        // const data = await response.json();

        // 데모 데이터
        const demoData = [
          { id: "1", name: "방 이름1", stars: 3 },
          { id: "2", name: "방 이름2", stars: 2 },
          { id: "3", name: "방 이름3", stars: 5 },
        ].sort((a, b) => b.stars - a.stars)

        // 모든 방 목록 (랭킹에 없는 방 포함)
        const allRoomsData = [
          ...demoData,
          { id: "4", name: "방 이름4", stars: 0 },
          { id: "5", name: "방 이름5", stars: 0 },
        ]

        // 데이터 로딩 시뮬레이션
        setTimeout(() => {
          setRankings(demoData)
          setAllRooms(allRoomsData)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("순위 데이터를 가져오는 중 오류 발생:", error)
        setIsLoading(false)
      }
    }

    fetchRankings()
  }, [id])

  // 순위 초기화 처리
  const handleResetRankings = async () => {
    try {
      // 실제 구현에서는 여기에 초기화 API 요청
      // await fetch(`/api/projects/${id}/rankings/reset`, { method: 'POST' });

      // 데모용 초기화
      // setRankings(rankings.map((room) => ({ ...room, stars: 0 })))
      setIsResetModalOpen(false)
    } catch (error) {
      console.error("순위 초기화 중 오류 발생:", error)
    }
  }

  // 순위 업데이트 핸들러 - useCallback으로 메모이제이션
  const handleUpdateRanking = useCallback((position: number, roomId: string) => {
    // 실제 구현에서는 여기에 API 요청
    // await fetch(`/api/projects/${id}/rankings`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ position, roomId })
    // });

    // 데모용 업데이트
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
  }, []) // 의존성 배열 비움

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
