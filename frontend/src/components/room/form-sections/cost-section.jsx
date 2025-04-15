"use client"

import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Card, CardContent } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"

export function CostSection({ data, updateFormData }) {
  const handleMaintenanceItemChange = (item, checked) => {
    updateFormData({
      maintenanceItems: {
        ...(data.maintenanceItems || {}),
        [item]: checked,
      },
    })
  }

  const handleUtilityItemChange = (item, checked) => {
    updateFormData({
      utilityItems: {
        ...(data.utilityItems || {}),
        [item]: checked,
      },
    })
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="deposit">보증금 (만원)</Label>
          <Input
            id="deposit"
            type="number"
            value={data.deposit}
            onChange={(e) => updateFormData({ deposit: Number(e.target.value) })}
            placeholder="보증금을 입력하세요"
          />
        </div>

        <div>
          <Label htmlFor="monthlyRent">월세 (만원)</Label>
          <Input
            id="monthlyRent"
            type="number"
            value={data.monthlyRent}
            onChange={(e) => updateFormData({ monthlyRent: Number(e.target.value) })}
            placeholder="월세를 입력하세요"
          />
        </div>

        <div>
          <Label htmlFor="brokerageFee">중개료 (만원)</Label>
          <Input
            id="brokerageFee"
            type="number"
            value={data.brokerageFee || 0}
            onChange={(e) => updateFormData({ brokerageFee: Number(e.target.value) })}
            placeholder="중개료를 입력하세요"
          />
        </div>

        <div>
          <Label htmlFor="maintenanceFee">관리비 (만원)</Label>
          <Input
            id="maintenanceFee"
            type="number"
            value={data.maintenanceFee}
            onChange={(e) => updateFormData({ maintenanceFee: Number(e.target.value) })}
            placeholder="관리비를 입력하세요"
          />

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenance-internet"
                checked={data.maintenanceItems?.internet || false}
                onCheckedChange={(checked) => handleMaintenanceItemChange("internet", checked)}
              />
              <Label htmlFor="maintenance-internet" className="cursor-pointer text-sm">
                인터넷
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenance-tv"
                checked={data.maintenanceItems?.tv || false}
                onCheckedChange={(checked) => handleMaintenanceItemChange("tv", checked)}
              />
              <Label htmlFor="maintenance-tv" className="cursor-pointer text-sm">
                유선TV
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenance-gas"
                checked={data.maintenanceItems?.gas || false}
                onCheckedChange={(checked) => handleMaintenanceItemChange("gas", checked)}
              />
              <Label htmlFor="maintenance-gas" className="cursor-pointer text-sm">
                가스
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenance-electric"
                checked={data.maintenanceItems?.electric || false}
                onCheckedChange={(checked) => handleMaintenanceItemChange("electric", checked)}
              />
              <Label htmlFor="maintenance-electric" className="cursor-pointer text-sm">
                전기
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenance-water"
                checked={data.maintenanceItems?.water || false}
                onCheckedChange={(checked) => handleMaintenanceItemChange("water", checked)}
              />
              <Label htmlFor="maintenance-water" className="cursor-pointer text-sm">
                수도
              </Label>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="utilityFee">공과금 (만원)</Label>
          <Input
            id="utilityFee"
            type="number"
            value={data.utilityFee || 0}
            onChange={(e) => updateFormData({ utilityFee: Number(e.target.value) })}
            placeholder="공과금을 입력하세요"
          />

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="utility-gas"
                checked={data.utilityItems?.gas || false}
                onCheckedChange={(checked) => handleUtilityItemChange("gas", checked)}
              />
              <Label htmlFor="utility-gas" className="cursor-pointer text-sm">
                가스
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="utility-electric"
                checked={data.utilityItems?.electric || false}
                onCheckedChange={(checked) => handleUtilityItemChange("electric", checked)}
              />
              <Label htmlFor="utility-electric" className="cursor-pointer text-sm">
                전기
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="utility-water"
                checked={data.utilityItems?.water || false}
                onCheckedChange={(checked) => handleUtilityItemChange("water", checked)}
              />
              <Label htmlFor="utility-water" className="cursor-pointer text-sm">
                수도
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="utility-separate-meter"
                checked={data.utilityItems?.separateMeter || false}
                onCheckedChange={(checked) => handleUtilityItemChange("separateMeter", checked)}
              />
              <Label htmlFor="utility-separate-meter" className="cursor-pointer text-sm">
                계량기 별도 설치
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="utility-individual-heating"
                checked={data.utilityItems?.individualHeating || false}
                onCheckedChange={(checked) => handleUtilityItemChange("individualHeating", checked)}
              />
              <Label htmlFor="utility-individual-heating" className="cursor-pointer text-sm">
                개별난방
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="utility-central-heating"
                checked={data.utilityItems?.centralHeating || false}
                onCheckedChange={(checked) => handleUtilityItemChange("centralHeating", checked)}
              />
              <Label htmlFor="utility-central-heating" className="cursor-pointer text-sm">
                중앙난방
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="utility-district-heating"
                checked={data.utilityItems?.districtHeating || false}
                onCheckedChange={(checked) => handleUtilityItemChange("districtHeating", checked)}
              />
              <Label htmlFor="utility-district-heating" className="cursor-pointer text-sm">
                지역난방
              </Label>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="mortgage-below-70"
            checked={data.mortgageBelow70Percent || false}
            onCheckedChange={(checked) => updateFormData({ mortgageBelow70Percent: checked })}
          />
          <Label htmlFor="mortgage-below-70" className="cursor-pointer">
            근저당 매매가 70% 이하
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
