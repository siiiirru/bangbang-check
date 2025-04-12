import { useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export function AiRecommendation({ projectId }) {
  const [request, setRequest] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recommendation, setRecommendation] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!request.trim()) return

    setIsSubmitting(true)

    try {
      // 실제 구현에서는 여기에 AI 추천 API 요청
      /*
      const response = await fetch(`/api/projects/${projectId}/ai-recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request })
      });
      const data = await response.json();
      */

      // 데모용 응답 시뮬레이션
      setTimeout(() => {
        setRecommendation(
          `"${request}"에 맞는 추천 방은 다음과 같습니다:\n\n1. 강남 역세권 원룸 (월세 50/50)\n2. 홍대 인근 투룸 (전세 2억)\n3. 신림 역세권 오피스텔 (월세 60/60)`,
        )
        setIsSubmitting(false)
      }, 1500)
    } catch (error) {
      console.error("AI 추천 요청 중 오류 발생:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">오늘의 AI 방 추천</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                <Info size={16} color="#3B82F6" />
                <span className="sr-only">정보</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-gray-700">
              <p>
                프로젝트로 작성한 방의 정보와 사용자의 추가 요청사항을 종합하여 최적의 방 하나를 추천해드립니다. 
                <p className="text-red-500">하루에 한번만 요청 가능합니다.</p>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {recommendation ? (
        <div className="mb-4">
          <div className="bg-gray-100 p-3 rounded-md whitespace-pre-line text-sm text-gray-700">{recommendation}</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="추가 요청사항을 입력하세요 (예: 강남역 근처, 월세 50만원 이하, 반려동물 가능 등)"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="min-h-[100px] text-sm text-black"
          />
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={isSubmitting || !request.trim()}
          >
            {isSubmitting ? "처리 중..." : "추천 받기"}
          </Button>
        </form>
      )}
    </div>
  )
}
