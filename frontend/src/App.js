import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext";

// 페이지 컴포넌트 임포트
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProjectsPage from "./pages/ProjectsPage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import RoomCreatePage from "./pages/RoomCreatePage"
import RoomDetailPage from "./pages/RoomDetailPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
  return (
    <AuthProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/projects/:id/rooms/create" element={<RoomCreatePage />} />
        <Route path="/projects/:id/rooms/:roomId" element={<RoomDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
