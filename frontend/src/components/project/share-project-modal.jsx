"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import { Copy } from "lucide-react"

export function ShareProjectModal({ isOpen, onClose, project }) {
const [copySuccess, setCopySuccess] = useState(false)

if (!project) return null

const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project.id}`

const handleCopyLink = async () => {
    try {
    await navigator.clipboard.writeText(shareUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
    alert("링크 복사에 실패했어요.")
    }
}

const openSocial = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(`"${project.name}" 프로젝트를 확인해보세요!`)
    let shareLink = ""

    switch (platform) {
    case "kakao":
        window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: project.name,
            description: "내 프로젝트를 공유해요!",
            imageUrl: "https://via.placeholder.com/300",
            link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl
            }
        }
        })
        return
    case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        break
    case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
    default:
        return
    }

    window.open(shareLink, "_blank")
}

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>프로젝트 공유</DialogTitle>
            <DialogDescription>다른 사람들과 이 프로젝트를 공유해보세요!</DialogDescription>
            </DialogHeader>

            <div className="mb-4 mt-2">
            <p className="text-gray-600 text-sm mb-2">공유 링크</p>
            <div className="flex items-center space-x-2">
                <input
                readOnly
                className="w-full border px-3 py-1 rounded-md text-sm text-gray-700"
                value={shareUrl}
                />
                <Button onClick={handleCopyLink} size="sm" variant="outline">
                <Copy size={14} className="mr-1" />
                복사
                </Button>
            </div>
            {copySuccess && (
                <p className="text-xs text-green-600 mt-1">링크가 복사되었어요!</p>
            )}
            </div>

            <div className="mt-4">
            <p className="text-gray-600 text-sm mb-2">소셜로 공유하기</p>
            <div className="flex space-x-3">
                <Button
                onClick={() => openSocial("kakao")}
                className="bg-yellow-300 text-black hover:bg-yellow-400"
                size="sm"
                >
                카카오톡
                </Button>
                <Button
                onClick={() => openSocial("twitter")}
                className="bg-blue-500 hover:bg-blue-600"
                size="sm"
                >
                X (Twitter)
                </Button>
                <Button
                onClick={() => openSocial("facebook")}
                className="bg-blue-700 hover:bg-blue-800"
                size="sm"
                >
                Facebook
                </Button>
            </div>
            </div>

            <DialogFooter />
        </DialogContent>
        </Dialog>
    )
}
