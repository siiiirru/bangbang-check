"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WindowsSectionProps {
  data: {
    count: number
    direction: string
    ventilation: string
  }
  updateFormData: (data: any) => void
}

export function WindowsSection({ data, updateFormData }: WindowsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="windows-count">창문 개수</Label>
          <Input
            id="windows-count"
            type="number"
            value={data.count}
            onChange={(e) => updateFormData({ count: Number(e.target.value) })}
            min={0}
          />
        </div>

        <div>
          <Label htmlFor="windows-direction">창문 방향</Label>
          <Select value={data.direction} onValueChange={(value) => updateFormData({ direction: value })}>
            <SelectTrigger id="windows-direction">
              <SelectValue placeholder="방향 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="남향">남향</SelectItem>
              <SelectItem value="북향">북향</SelectItem>
              <SelectItem value="동향">동향</SelectItem>
              <SelectItem value="서향">서향</SelectItem>
              <SelectItem value="남동향">남동향</SelectItem>
              <SelectItem value="남서향">남서향</SelectItem>
              <SelectItem value="북동향">북동향</SelectItem>
              <SelectItem value="북서향">북서향</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="windows-ventilation">통풍</Label>
          <Select value={data.ventilation} onValueChange={(value) => updateFormData({ ventilation: value })}>
            <SelectTrigger id="windows-ventilation">
              <SelectValue placeholder="통풍 상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="매우 좋음">매우 좋음</SelectItem>
              <SelectItem value="좋음">좋음</SelectItem>
              <SelectItem value="보통">보통</SelectItem>
              <SelectItem value="나쁨">나쁨</SelectItem>
              <SelectItem value="매우 나쁨">매우 나쁨</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
