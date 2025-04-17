import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext";
import { Amplify } from 'aws-amplify';

// 페이지 컴포넌트 임포트
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProjectsPage from "./pages/ProjectsPage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import RoomCreatePage from "./pages/RoomCreatePage"
import RoomDetailPage from "./pages/RoomDetailPage"
import SettingsPage from "./pages/SettingsPage"

console.log("App 시작");


Amplify.configure({
  Auth: {
    Cognito:{
      region: 'ap-northeast-2',
      userPoolId: 'ap-northeast-2_fDjjYS7ZH',
      userPoolClientId: '3llaurs0bbg33kf7pcd8ghl80',
      authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
  },
});


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
