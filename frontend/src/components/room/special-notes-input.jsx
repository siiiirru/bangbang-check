import { useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Edit, Check, X, FileText } from "lucide-react"

export function SpecialNotesInput({ notes, onUpdate, isOwner }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedNotes, setEditedNotes] = useState(notes)

  const handleSave = () => {
    onUpdate(editedNotes)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedNotes(notes)
    setIsEditing(false)
  }

  return (
    <Card className="border-indigo-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-indigo-50 border-b border-indigo-100 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-700">
            <FileText size={18} />
            <h3 className="text-lg font-semibold">특이 사항</h3>
          </div>
          {isOwner && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 px-2 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700"
            >
              <Edit size={16} className="mr-1" />
              <span>입력</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              placeholder="방에 대한 특이 사항을 입력하세요..."
              className="min-h-[120px] text-sm border-indigo-200 focus-visible:ring-indigo-400"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="h-8 px-3 border-red-200 text-red-600 hover:bg-red-50"
              >
                <X size={14} className="mr-1" />
                <span>취소</span>
              </Button>
              <Button size="sm" onClick={handleSave} className="h-8 px-3 bg-indigo-600 hover:bg-indigo-700">
                <Check size={14} className="mr-1" />
                <span>저장</span>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre-line text-sm">{notes || "특이 사항이 없습니다."}</p>
        )}
      </CardContent>
    </Card>
  )
}
