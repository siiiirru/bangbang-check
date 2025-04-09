"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface KitchenSectionProps {
  data: Record<string, any>
  updateFormData: (data: any) => void
}

export function KitchenSection({ data, updateFormData }: KitchenSectionProps) {
  const handleChange = (key: string, value: any) => {
    updateFormData({ [key]: value })
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen-hood"
              checked={data.cleanHood || false}
              onCheckedChange={(checked) => handleChange("cleanHood", checked)}
            />
            <Label htmlFor="kitchen-hood" className="cursor-pointer">
              후드 깨끗함
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen-cabinet"
              checked={data.cabinetNotDamaged || false}
              onCheckedChange={(checked) => handleChange("cabinetNotDamaged", checked)}
            />
            <Label htmlFor="kitchen-cabinet" className="cursor-pointer">
              수납장 파손 없음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen-pipe"
              checked={data.securedPipes || false}
              onCheckedChange={(checked) => handleChange("securedPipes", checked)}
            />
            <Label htmlFor="kitchen-pipe" className="cursor-pointer">
              파이프 튼튼하게 고정됨
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen-backflow"
              checked={data.noBackflow || false}
              onCheckedChange={(checked) => handleChange("noBackflow", checked)}
            />
            <Label htmlFor="kitchen-backflow" className="cursor-pointer">
              역류경험 없음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen-smell"
              checked={data.noSmell || false}
              onCheckedChange={(checked) => handleChange("noSmell", checked)}
            />
            <Label htmlFor="kitchen-smell" className="cursor-pointer">
              냄새 안남
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen-hotwater"
              checked={data.hotWaterWorks || false}
              onCheckedChange={(checked) => handleChange("hotWaterWorks", checked)}
            />
            <Label htmlFor="kitchen-hotwater" className="cursor-pointer">
              온수 작동함
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen-summer-hotwater"
              checked={data.summerHotWaterWorks || false}
              onCheckedChange={(checked) => handleChange("summerHotWaterWorks", checked)}
            />
            <Label htmlFor="kitchen-summer-hotwater" className="cursor-pointer">
              여름철 온수 작동함
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
