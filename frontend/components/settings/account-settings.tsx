"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Check } from "lucide-react"

export function AccountSettings() {
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [nickname, setNickname] = useState("사용자")
  const [newNickname, setNewNickname] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleNicknameEdit = () => {
    setIsEditingNickname(true)
    setNewNickname(nickname)
    setError("")
    setSuccess("")
  }

  const setErrorWithTimeout = (message: string) => {
    setError(message)
    setTimeout(() => setError(""), 3000)
  }

  const handlePasswordEdit = () => {
    setIsEditingPassword(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setError("")
    setSuccess("")
  }

  const handleNicknameSave = () => {
    if (!newNickname.trim()) {
      setErrorWithTimeout("닉네임을 입력해주세요.")
      return
    }

    // 실제 구현에서는 API 요청
    setNickname(newNickname)
    setIsEditingNickname(false)
    setSuccess("닉네임이 성공적으로 변경되었습니다.")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handlePasswordSave = () => {
    if (!currentPassword) {
      setErrorWithTimeout("현재 비밀번호를 입력해주세요.")
      return
    }
    if (!newPassword) {
      setErrorWithTimeout("새 비밀번호를 입력해주세요.")
      return
    }
    if (newPassword.length < 8) {
      setErrorWithTimeout("새 비밀번호는 8자 이상이어야 합니다.")
      return
    }
    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setErrorWithTimeout("새 비밀번호는 영문자와 숫자를 조합해서 입력해야 합니다.")
      return
    }
    if (newPassword !== confirmPassword) {
      setErrorWithTimeout("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.")
      return
    }

    // 실제 구현에서는 API 요청
    setIsEditingPassword(false)
    setSuccess("비밀번호가 성공적으로 변경되었습니다.")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleCancel = () => {
    setIsEditingNickname(false)
    setIsEditingPassword(false)
    setError("")
  }

  return (
    <div className="space-y-6">
      {success && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-md flex items-center gap-2">
          <Check size={16} />
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md">{error}</div>
      )}

      {/* 닉네임 수정 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User size={18} className="text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium text-gray-700">닉네임 설정</h4>
          </div>
          {!isEditingNickname && (
            <Button onClick={handleNicknameEdit} variant="outline" size="sm" className="text-gray-700">
              수정
            </Button>
          )}
        </div>

        {isEditingNickname ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="nickname" className="text-blue-500">새 닉네임</Label>
              <Input
                id="nickname"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="새 닉네임을 입력하세요"
                className="text-gray-700"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleCancel} className="text-gray-700">
                취소
              </Button>
              <Button size="sm" onClick={handleNicknameSave} className="bg-blue-600 hover:bg-blue-700">
                저장
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-muted rounded-md">
            <span className="font-medium text-gray-700">{nickname}</span>
          </div>
        )}
      </div>

      {/* 비밀번호 수정 */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-green-600 dark:text-green-400" />
            <h4 className="font-medium text-gray-700">비밀번호 변경</h4>
          </div>
          {!isEditingPassword && (
            <Button onClick={handlePasswordEdit} variant="outline" size="sm" className="text-gray-700">
              변경
            </Button>
          )}
        </div>

        {isEditingPassword && (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="currentPassword" className="text-gray-600">현재 비밀번호</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력하세요"
                className="text-gray-600"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-gray-600">새 비밀번호</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요. 영문과 숫자를 조합해 8글자 이상으로 입력하세요."
                className="text-gray-600"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-gray-600">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요. "
                className="text-gray-600"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleCancel} className="text-gray-700">
                취소
              </Button>
              <Button size="sm" onClick={handlePasswordSave} className="bg-green-600 hover:bg-green-700">
                저장
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
