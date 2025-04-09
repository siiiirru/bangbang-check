"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project/project-card"
import { AddProjectModal } from "@/components/project/add-project-modal"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Share2 } from "lucide-react"

// 프로젝트 타입 정의
type Project = {
  id: string
  name: string
}

export function ProjectList() {
  // 프로젝트 목록 상태
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "프로젝트 명 1" },
    { id: "2", name: "프로젝트 명 2" },
  ])

  // 모달 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // 삭제 모드 상태
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([])

  // 공유 모드 상태
  const [isShareMode, setIsShareMode] = useState(false)
  const [selectedForShare, setSelectedForShare] = useState<string | null>(null)

  // 프로젝트 추가 핸들러
  const handleAddProject = (name: string) => {
    const newProject = {
      id: Date.now().toString(),
      name,
    }
    setProjects([...projects, newProject])
    setIsAddModalOpen(false)
  }

  // 삭제 모드 토글
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode)
    setIsShareMode(false)
    setSelectedForDelete([])
  }

  // 공유 모드 토글
  const toggleShareMode = () => {
    setIsShareMode(!isShareMode)
    setIsDeleteMode(false)
    setSelectedForShare(null)
  }

  // 삭제 체크박스 변경 핸들러
  const handleDeleteCheckChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedForDelete([...selectedForDelete, id])
    } else {
      setSelectedForDelete(selectedForDelete.filter((item) => item !== id))
    }
  }

  // 공유 라디오 버튼 변경 핸들러
  const handleShareRadioChange = (id: string) => {
    setSelectedForShare(id)
  }

  // 선택된 프로젝트 삭제
  const deleteSelectedProjects = () => {
    setProjects(projects.filter((project) => !selectedForDelete.includes(project.id)))
    setIsDeleteMode(false)
    setSelectedForDelete([])
  }

  // 선택된 프로젝트 공유
  const shareSelectedProject = () => {
    if (selectedForShare) {
      // 여기에 공유 로직 구현
      alert(`프로젝트 "${projects.find((p) => p.id === selectedForShare)?.name}"를 공유합니다.`)
      setIsShareMode(false)
      setSelectedForShare(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">프로젝트</h2>
        <div className="flex gap-2 text-black">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700" size="sm">
            <Plus size={16} className="mr-1" />
            추가
          </Button>
          <Button onClick={toggleDeleteMode} variant={isDeleteMode ? "destructive" : "outline"} size="sm">
            <Trash2 size={16} className="mr-1" />
            삭제
          </Button>
          <Button onClick={toggleShareMode} variant={isShareMode ? "secondary" : "outline"} size="sm">
            <Share2 size={16} className="mr-1" />
            공유
          </Button>
        </div>
      </div>

      {/* 삭제 모드 액션 버튼 */}
      {isDeleteMode && selectedForDelete.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Button onClick={deleteSelectedProjects} variant="destructive" size="sm">
            선택한 {selectedForDelete.length}개 프로젝트 삭제
          </Button>
        </div>
      )}

      {/* 공유 모드 액션 버튼 */}
      {isShareMode && selectedForShare && (
        <div className="mb-4 flex justify-end">
          <Button onClick={shareSelectedProject} className="bg-teal-600 hover:bg-teal-700" size="sm">
            선택한 프로젝트 공유하기
          </Button>
        </div>
      )}

      {/* 프로젝트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isDeleteMode={isDeleteMode}
            isShareMode={isShareMode}
            isCheckedForDelete={selectedForDelete.includes(project.id)}
            isSelectedForShare={selectedForShare === project.id}
            onDeleteCheckChange={handleDeleteCheckChange}
            onShareRadioChange={handleShareRadioChange}
          />
        ))}
      </div>

      {/* 프로젝트가 없을 때 */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">프로젝트가 없습니다. 새 프로젝트를 추가해보세요.</p>
          <Button onClick={() => setIsAddModalOpen(true)} className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700">
            <Plus size={16} className="mr-1" />새 프로젝트 추가
          </Button>
        </div>
      )}

      {/* 프로젝트 추가 모달 */}
      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProject} />
    </div>
  )
}

