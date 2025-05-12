// Mock API 요청 처리 함수
import { userData, projectsData, roomsData, commentsData } from "./mock/data"
// AWS Lambda API 엔드포인트 설정
export const API_BASE_URL = "https://api.bangbangcheck.com/api"

// Mock 데이터 사용 여부 설정
export const USE_MOCK_DATA = true

// API 요청 헬퍼 함수
export async function apiRequest(endpoint, options = {}) {
  // Mock 데이터 사용 시 처리
  if (USE_MOCK_DATA) {
    return mockApiRequest(endpoint, options)
  }

  // 실제 API 호출 코드 (주석 처리)
  /*
  const token = localStorage.getItem("authToken")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "요청 처리 중 오류가 발생했습니다.")
  }

  return data
  */
}


async function mockApiRequest(endpoint, options = {}) {
  // 지연 시간 추가 (실제 API 호출처럼 보이게)
  await new Promise((resolve) => setTimeout(resolve, 300))

  // 엔드포인트에 따른 응답 처리
  if (endpoint === "/user/me") {
    return { ...userData }
  }

  if (endpoint === "/projects") {
    return [...projectsData]
  }

  // 프로젝트 상세 정보
  if (endpoint.match(/^\/projects\/\d+$/)) {
    const projectId = endpoint.split("/")[2]
    const project = projectsData.find((p) => p.id === projectId)
    if (!project) throw new Error("프로젝트를 찾을 수 없습니다.")
    return { ...project }
  }

  // 프로젝트의 방 목록
  if (endpoint.match(/^\/projects\/\d+\/rooms$/)) {
    const projectId = endpoint.split("/")[2]
    const rooms = roomsData[projectId] || []
    return [...rooms]
  }

  // 방 상세 정보
  if (endpoint.match(/^\/projects\/\d+\/rooms\/\d+$/)) {
    const parts = endpoint.split("/")
    const projectId = parts[2]
    const roomId = parts[4]
    const rooms = roomsData[projectId] || []
    const room = rooms.find((r) => r.id === roomId)
    if (!room) throw new Error("방을 찾을 수 없습니다.")
    return { ...room }
  }

  // 방 별점 토글
  if (endpoint.match(/^\/projects\/\d+\/rooms\/\d+\/star$/)) {
    const parts = endpoint.split("/")
    const projectId = parts[2]
    const roomId = parts[4]
    const rooms = roomsData[projectId] || []
    const room = rooms.find((r) => r.id === roomId)
    if (!room) throw new Error("방을 찾을 수 없습니다.")

    // 별점 토글 처리
    if (options.method === "POST") {
      room.stars = room.stars > 0 ? room.stars - 1 : room.stars + 1
    }

    return { success: true }
  }

  // 방 특이사항 업데이트
  if (endpoint.match(/^\/projects\/\d+\/rooms\/\d+\/special-notes$/)) {
    const parts = endpoint.split("/")
    const projectId = parts[2]
    const roomId = parts[4]
    const rooms = roomsData[projectId] || []
    const room = rooms.find((r) => r.id === roomId)
    if (!room) throw new Error("방을 찾을 수 없습니다.")

    if (options.method === "PUT") {
      const body = JSON.parse(options.body)
      room.specialNotes = body.specialNotes
    }

    return { success: true }
  }

  // 댓글 관련 처리
  if (endpoint.match(/^\/projects\/\d+\/rooms\/\d+\/comments$/)) {
    const parts = endpoint.split("/")
    const roomId = parts[4]

    if (options.method === "POST") {
      const body = JSON.parse(options.body)
      const newComment = {
        id: `comment${Date.now()}`,
        author: body.author,
        content: body.content,
        createdAt: new Date().toISOString(),
      }

      if (!commentsData[roomId]) {
        commentsData[roomId] = []
      }

      commentsData[roomId].push(newComment)
      return newComment
    }

    return commentsData[roomId] || []
  }

  // 댓글 삭제
  if (endpoint.match(/^\/projects\/\d+\/rooms\/\d+\/comments\/\w+$/)) {
    const parts = endpoint.split("/")
    const roomId = parts[4]
    const commentId = parts[6]

    if (options.method === "DELETE") {
      if (commentsData[roomId]) {
        commentsData[roomId] = commentsData[roomId].filter((c) => c.id !== commentId)
      }
      return { success: true }
    }
  }

  // 순위 업데이트
  if (endpoint.match(/^\/projects\/\d+\/rankings$/)) {
    const parts = endpoint.split("/")
    const projectId = parts[2]

    if (options.method === "PUT") {
      const body = JSON.parse(options.body)
      const { position, roomId } = body
      const rooms = roomsData[projectId] || []
      const room = rooms.find((r) => r.id === roomId)

      if (room) {
        // 기존에 같은 순위를 가진 방의 별점 초기화
        const starsForPosition = [3, 2, 1]
        rooms.forEach((r) => {
          if (r.stars === starsForPosition[position]) {
            r.stars = 0
          }
        })

        // 선택된 방의 별점 설정
        room.stars = starsForPosition[position]
      }

      return { success: true }
    }
  }

  // 순위 초기화
  if (endpoint.match(/^\/projects\/\d+\/rankings\/reset$/)) {
    const parts = endpoint.split("/")
    const projectId = parts[2]

    if (options.method === "POST") {
      const rooms = roomsData[projectId] || []
      rooms.forEach((room) => {
        room.stars = 0
      })

      return { success: true }
    }
  }

  // 로그인 처리
  if (endpoint === "/auth/login") {
    if (options.method === "POST") {
      const body = JSON.parse(options.body)
      if (body.userId === "testuser" && body.password === "password") {
        return { token: "mock-auth-token", user: userData }
      } else {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.")
      }
    }
  }

  // 회원가입 처리
  if (endpoint === "/auth/signup") {
    if (options.method === "POST") {
      return { success: true, message: "회원가입이 완료되었습니다." }
    }
  }

  // 기본 응답
  return { message: "Mock API 응답이 정의되지 않았습니다." }
}
