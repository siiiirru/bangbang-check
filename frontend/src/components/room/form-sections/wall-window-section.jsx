"use client"

import { Card, CardContent } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"


export function WallWindowSection({ data, updateFormData }) {
  const handleChange = (key, value) => {
    updateFormData({ [key]: value })
  }

  const handleOutsideItemChange = (item, checked) => {
    updateFormData({
      outsideItems: {
        ...(data.outsideItems || {}),
        [item]: checked,
      },
    })
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="window-count">창문 개수</Label>
            <Input
              id="window-count"
              type="number"
              value={data.windowCount || 0}
              onChange={(e) => handleChange("windowCount", Number(e.target.value))}
              min={0}
            />
          </div>
          <div>
            <Label htmlFor="window-direction">향</Label>
            <Select value={data.direction || ""} onValueChange={(value) => handleChange("direction", value)}>
              <SelectTrigger id="window-direction">
                <SelectValue placeholder="방향 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="동">동</SelectItem>
                <SelectItem value="서">서</SelectItem>
                <SelectItem value="남">남</SelectItem>
                <SelectItem value="북">북</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="window-screen"
            checked={data.hasScreens || false}
            onCheckedChange={(checked) => handleChange("hasScreens", checked)}
          />
          <Label htmlFor="window-screen" className="cursor-pointer">
            방충망 설치됨
          </Label>
        </div>

        <div>
          <Label className="mb-2 block">창밖</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="outside-wall"
                checked={data.outsideItems?.wall || false}
                onCheckedChange={(checked) => handleOutsideItemChange("wall", checked)}
              />
              <Label htmlFor="outside-wall" className="cursor-pointer text-sm">
                벽
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="outside-bar"
                checked={data.outsideItems?.bar || false}
                onCheckedChange={(checked) => handleOutsideItemChange("bar", checked)}
              />
              <Label htmlFor="outside-bar" className="cursor-pointer text-sm">
                술집
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="outside-restaurant"
                checked={data.outsideItems?.restaurant || false}
                onCheckedChange={(checked) => handleOutsideItemChange("restaurant", checked)}
              />
              <Label htmlFor="outside-restaurant" className="cursor-pointer text-sm">
                냄새(음식점)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="outside-recycling"
                checked={data.outsideItems?.recycling || false}
                onCheckedChange={(checked) => handleOutsideItemChange("recycling", checked)}
              />
              <Label htmlFor="outside-recycling" className="cursor-pointer text-sm">
                분리수거장
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="outside-other"
                checked={data.outsideItems?.other || false}
                onCheckedChange={(checked) => handleOutsideItemChange("other", checked)}
              />
              <Label htmlFor="outside-other" className="cursor-pointer text-sm">
                기타
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wall-insulation"
              checked={data.goodInsulation || false}
              onCheckedChange={(checked) => handleChange("goodInsulation", checked)}
            />
            <Label htmlFor="wall-insulation" className="cursor-pointer">
              단열이 잘 됨(벽이 차갑지 않음)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wall-knock"
              checked={data.solidWall || false}
              onCheckedChange={(checked) => handleChange("solidWall", checked)}
            />
            <Label htmlFor="wall-knock" className="cursor-pointer">
              벽을 노크해도 울리지 않음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wall-soundproof"
              checked={data.goodSoundproof || false}
              onCheckedChange={(checked) => handleChange("goodSoundproof", checked)}
            />
            <Label htmlFor="wall-soundproof" className="cursor-pointer">
              방 밖 대화소리가 들리지 않음
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
