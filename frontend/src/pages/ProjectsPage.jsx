import { ProjectList } from "../components/project/project-list"
import { Header } from "../components/header"
import { useState} from "react"



export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
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

