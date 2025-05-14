"use client"

import { useEffect, useState } from "react"
import { ProjectCard } from "../project/project-card"
import { AddProjectModal } from "../project/add-project-modal"
import { Button } from "../ui/button"
import { Plus, Trash2, Share2 } from "lucide-react"
import axios from "axios";
import {getAuthHeaders,API_BASE_URL} from "../../services/apiServices"

export function ProjectList() {
  // 프로젝트 목록 상태 
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 모달 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // 삭제 모드 상태
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [selectedForDelete, setSelectedForDelete] = useState([])

  // 공유 모드 상태
  const [isShareMode, setIsShareMode] = useState(false)
  const [selectedForShare, setSelectedForShare] = useState(null)

  // 프로젝트 목록 가져오기
  useEffect(() => {
    const fetchProjects = async () => {
      try {
      const headers = await getAuthHeaders();  // 공통 헤더 가져오기
      const username = localStorage.getItem("user");
      const response = await axios.get(`${API_BASE_URL}/projects`, {
        headers,
        params: {
            username: username, // 쿼리 파라미터
          }
      });

        setProjects(response.data)
      } catch (error) {
        console.error("프로젝트를 불러오는 중 오류 발생:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

    if (isLoading) {
    return <div>로딩 중...</div>;
  }


  // 프로젝트 추가 핸들러
  const handleAddProject = (name) => {
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
  const handleDeleteCheckChange = (id, checked) => {
    if (checked) {
      setSelectedForDelete([...selectedForDelete, id])
    } else {
      setSelectedForDelete(selectedForDelete.filter((item) => item !== id))
    }
  }

  // 공유 라디오 버튼 변경 핸들러
  const handleShareRadioChange = (id) => {
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
        <div className="flex gap-2">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700" size="sm">
            <Plus size={16} className="mr-1 text-gray-700" />
            추가
          </Button>
          <Button onClick={toggleDeleteMode} variant={isDeleteMode ? "destructive" : "outline" }className="text-gray-700" size="sm">
            <Trash2 size={16} className="mr-1 text-gray-700" />
            삭제
          </Button>
          <Button onClick={toggleShareMode} variant={isShareMode ? "secondary" : "outline"} size="sm" className="text-gray-700">
            <Share2 size={16} className="mr-1 text-gray-700" />
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
