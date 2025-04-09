"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface HygieneSectionProps {
  data: Record<string, any>
  updateFormData: (data: any) => void
}

export function HygieneSection({ data, updateFormData }: HygieneSectionProps) {
  const handleChange = (key: string, value: any) => {
    updateFormData({ [key]: value })
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hygiene-no-mold"
              checked={data.noMold || false}
              onCheckedChange={(checked) => handleChange("noMold", checked)}
            />
            <Label htmlFor="hygiene-no-mold" className="cursor-pointer">
              곰팡이 없음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hygiene-no-odor"
              checked={data.noOdor || false}
              onCheckedChange={(checked) => handleChange("noOdor", checked)}
            />
            <Label htmlFor="hygiene-no-odor" className="cursor-pointer">
              악취가 나지 않음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hygiene-no-leak"
              checked={data.noLeakage || false}
              onCheckedChange={(checked) => handleChange("noLeakage", checked)}
            />
            <Label htmlFor="hygiene-no-leak" className="cursor-pointer">
              누수 흔적이 없음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hygiene-no-bugs"
              checked={data.noBugs || false}
              onCheckedChange={(checked) => handleChange("noBugs", checked)}
            />
            <Label htmlFor="hygiene-no-bugs" className="cursor-pointer">
              벌레가 없음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hygiene-no-recycling-day"
              checked={data.noRecyclingDay || false}
              onCheckedChange={(checked) => handleChange("noRecyclingDay", checked)}
            />
            <Label htmlFor="hygiene-no-recycling-day" className="cursor-pointer">
              분리수거는 정해진 요일이 없음
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
