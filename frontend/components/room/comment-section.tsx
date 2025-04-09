"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AddCommentModal } from "@/components/room/add-comment-modal"
import { Trash2, MessageCircle, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

interface CommentSectionProps {
  comments: Comment[]
  projectId: string
  roomId: string
  isOwner: boolean
  onCommentsUpdate: (comments: Comment[]) => void
}

export function CommentSection({ comments, projectId, roomId, isOwner, onCommentsUpdate }: CommentSectionProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // 댓글 추가 핸들러
  const handleAddComment = async (content: string) => {
    try {
      // 실제 구현에서는 여기에 API 요청
      // const response = await fetch(`/api/projects/${projectId}/rooms/${roomId}/comments`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content })
      // });
      // const newComment = await response.json();

      // 데모용 댓글 추가
      const newComment = {
        id: Date.now().toString(),
        author: "현재 사용자", // 실제로는 인증된 사용자 정보 사용
        content,
        createdAt: new Date().toISOString(),
      }

      onCommentsUpdate([...comments, newComment])
      setIsAddModalOpen(false)
    } catch (error) {
      console.error("댓글 추가 중 오류 발생:", error)
    }
  }

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
    try {
      // 실제 구현에서는 여기에 API 요청
      // await fetch(`/api/projects/${projectId}/rooms/${roomId}/comments/${commentId}`, {
      //   method: 'DELETE'
      // });

      // 데모용 댓글 삭제
      onCommentsUpdate(comments.filter((comment) => comment.id !== commentId))
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error)
    }
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ko })
    } catch (error) {
      return dateString
    }
  }

  return (
    <div>
      <CardHeader className="bg-pink-50 border-b border-pink-100 py-3 px-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-pink-700">
            <MessageCircle size={18} />
            <h3 className="text-lg font-semibold">다른 사람의 의견</h3>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="outline"
            size="sm"
            className="border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            의견 추가
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 bg-white rounded-b-lg border-x border-b border-pink-200">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">아직 의견이 없습니다. 첫 의견을 남겨보세요!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-gray-200 shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1 text-gray-700">
                          <User size={14} />
                          <span className="font-medium">{comment.author}</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                    </div>
                    {isOwner && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      {/* 의견 추가 모달 */}
      <AddCommentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddComment} />
    </div>
  )
}
