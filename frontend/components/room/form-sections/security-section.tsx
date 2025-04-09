"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SecuritySectionProps {
  data: Record<string, boolean>
  updateFormData: (data: any) => void
}

export function SecuritySection({ data, updateFormData }: SecuritySectionProps) {
  const handleSecurityChange = (option: string, checked: boolean) => {
    updateFormData({ [option]: checked })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(securityLabels).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`security-${key}`}
                checked={data[key] || false}
                onCheckedChange={(checked) => handleSecurityChange(key, checked as boolean)}
              />
              <Label htmlFor={`security-${key}`} className="cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// 보안 레이블
const securityLabels = {
  cctv: "CCTV",
  doorSecurity: "현관 보안",
  intercom: "인터폰",
  securityOffice: "경비실",
  cardKey: "카드키",
  doorLock: "디지털 도어락",
}
