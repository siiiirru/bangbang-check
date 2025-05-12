
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Checkbox } from "../../ui/checkbox"

export function BasicInfoSection({ data, updateFormData, updateTopLevelField }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-blue-700">
          방 이름
        </Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => updateTopLevelField("name", e.target.value)}
          placeholder="방 이름을 입력하세요"
          className="border-blue-200 focus-visible:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address-main" className="text-blue-700">
            주소
          </Label>
          <Input
            id="address-main"
            value={data.address.main}
            onChange={(e) => updateFormData("address", { main: e.target.value })}
            placeholder="시/구/동"
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="address-detail" className="text-blue-700">
            상세 주소
          </Label>
          <Input
            id="address-detail"
            value={data.address.detail}
            onChange={(e) => updateFormData("address", { detail: e.target.value })}
            placeholder="번지, 건물명, 호수 등"
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="size-pyeong" className="text-blue-700">
            평수
          </Label>
          <Input
            id="size-pyeong"
            value={data.size.pyeong}
            onChange={(e) => updateFormData("size", { pyeong: e.target.value })}
            placeholder="예: 8평"
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="size-squareMeter" className="text-blue-700">
            제곱미터
          </Label>
          <Input
            id="size-squareMeter"
            value={data.size.squareMeter}
            onChange={(e) => updateFormData("size", { squareMeter: e.target.value })}
            placeholder="예: 26.4㎡"
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="structure" className="text-blue-700">
            구조
          </Label>
          <Input
            id="structure"
            value={data.structure}
            onChange={(e) => updateTopLevelField("structure", e.target.value)}
            placeholder="예: 원룸, 투룸, 오피스텔"
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="floor" className="text-blue-700">
            층수
          </Label>
          <Input
            id="floor"
            value={data.floor}
            onChange={(e) => updateTopLevelField("floor", e.target.value)}
            placeholder="예: 3층"
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="moveInDate" className="text-blue-700">
            입주 가능일
          </Label>
          <Input
            id="moveInDate"
            type="date"
            value={data.moveInDate}
            onChange={(e) => updateTopLevelField("moveInDate", e.target.value)}
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="constructionYear" className="text-blue-700">
            준공년도
          </Label>
          <Input
            id="constructionYear"
            type="date"
            value={data.constructionYear || ""}
            onChange={(e) => updateTopLevelField("constructionYear", e.target.value)}
            className="border-blue-200 focus-visible:ring-blue-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasParking"
            checked={data.hasParking}
            onCheckedChange={(checked) => updateTopLevelField("hasParking", checked)}
            className="border-blue-300 text-blue-600 focus-visible:ring-blue-400"
          />
          <Label htmlFor="hasParking" className="cursor-pointer text-blue-700">
            주차장
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasElevator"
            checked={data.hasElevator}
            onCheckedChange={(checked) => updateTopLevelField("hasElevator", checked)}
            className="border-blue-300 text-blue-600 focus-visible:ring-blue-400"
          />
          <Label htmlFor="hasElevator" className="cursor-pointer text-blue-700">
            엘리베이터
          </Label>
        </div>
      </div>
    </div>
  )
}
