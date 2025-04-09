"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface SurroundingsSectionProps {
  data: Record<string, string>
  updateFormData: (data: any) => void
}

export function SurroundingsSection({ data, updateFormData }: SurroundingsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="surroundings-subway">지하철</Label>
            <Input
              id="surroundings-subway"
              value={data.subway || ""}
              onChange={(e) => updateFormData({ subway: e.target.value })}
              placeholder="예: 강남역 도보 5분"
            />
          </div>
          <div>
            <Label htmlFor="surroundings-bus">버스</Label>
            <Input
              id="surroundings-bus"
              value={data.bus || ""}
              onChange={(e) => updateFormData({ bus: e.target.value })}
              placeholder="예: 버스정류장 도보 3분"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="surroundings-mart">마트</Label>
            <Input
              id="surroundings-mart"
              value={data.mart || ""}
              onChange={(e) => updateFormData({ mart: e.target.value })}
              placeholder="예: 이마트 도보 10분"
            />
          </div>
          <div>
            <Label htmlFor="surroundings-convenience">편의점</Label>
            <Input
              id="surroundings-convenience"
              value={data.convenience || ""}
              onChange={(e) => updateFormData({ convenience: e.target.value })}
              placeholder="예: CU 도보 1분"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="surroundings-hospital">병원</Label>
            <Input
              id="surroundings-hospital"
              value={data.hospital || ""}
              onChange={(e) => updateFormData({ hospital: e.target.value })}
              placeholder="예: 종합병원 도보 15분"
            />
          </div>
          <div>
            <Label htmlFor="surroundings-pharmacy">약국</Label>
            <Input
              id="surroundings-pharmacy"
              value={data.pharmacy || ""}
              onChange={(e) => updateFormData({ pharmacy: e.target.value })}
              placeholder="예: 약국 도보 5분"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="surroundings-park">공원</Label>
            <Input
              id="surroundings-park"
              value={data.park || ""}
              onChange={(e) => updateFormData({ park: e.target.value })}
              placeholder="예: 한강공원 도보 20분"
            />
          </div>
          <div>
            <Label htmlFor="surroundings-police">경찰서</Label>
            <Input
              id="surroundings-police"
              value={data.police || ""}
              onChange={(e) => updateFormData({ police: e.target.value })}
              placeholder="예: 경찰서 도보 10분"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="surroundings-commute">등교·출퇴근 거리</Label>
          <Input
            id="surroundings-commute"
            value={data.commute || ""}
            onChange={(e) => updateFormData({ commute: e.target.value })}
            placeholder="예: 회사까지 지하철 20분"
          />
        </div>
      </CardContent>
    </Card>
  )
}
