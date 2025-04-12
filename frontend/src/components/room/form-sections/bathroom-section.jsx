import { Card, CardContent } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Label } from "../../ui/label"

export function BathroomSection({ data, updateFormData }) {
  const handleChange = (key, value) => {
    updateFormData({ [key]: value })
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom-tiles"
              checked={data.tilesNotBroken || false}
              onCheckedChange={(checked) => handleChange("tilesNotBroken", checked)}
            />
            <Label htmlFor="bathroom-tiles" className="cursor-pointer">
              타일, 세면대 깨지지 않음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom-ventilation"
              checked={data.hasVentilation || false}
              onCheckedChange={(checked) => handleChange("hasVentilation", checked)}
            />
            <Label htmlFor="bathroom-ventilation" className="cursor-pointer">
              창문, 환기시설 있음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom-hotwater"
              checked={data.quickHotWater || false}
              onCheckedChange={(checked) => handleChange("quickHotWater", checked)}
            />
            <Label htmlFor="bathroom-hotwater" className="cursor-pointer">
              온수 전환시간 빠름
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom-pressure"
              checked={data.goodWaterPressure || false}
              onCheckedChange={(checked) => handleChange("goodWaterPressure", checked)}
            />
            <Label htmlFor="bathroom-pressure" className="cursor-pointer">
              동시에 틀기 수압 좋음
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom-drain"
              checked={data.goodDrainage || false}
              onCheckedChange={(checked) => handleChange("goodDrainage", checked)}
            />
            <Label htmlFor="bathroom-drain" className="cursor-pointer">
              물이 잘 빠짐
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
