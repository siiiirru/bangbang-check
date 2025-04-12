import { ProjectList } from "../components/project/project-list"
import { Header } from "../components/header"
import { apiRequest } from "../config"
import { useState, useEffect } from "react"



export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      const fetchProjects = async () => {
        setIsLoading(true)
        try {
          const data = await apiRequest("/projects")
          setProjects(data)
        } catch (error) {
          console.error("프로젝트 목록을 가져오는 중 오류 발생:", error)
        } finally {
          setIsLoading(false)
        }
      }
  
      fetchProjects()
    }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-4 px-4">
        {/* 헤더 */}
        <Header/>

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 gap-6">
          <ProjectList projects={projects} setProjects={setProjects} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

