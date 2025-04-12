import { Textarea } from "../../ui/textarea"
import { Card, CardContent } from "../../ui/card"

// SpecialNotesSection 컴포넌트
function SpecialNotesSection({ data, updateFormData }) {
  return (
    <Card>
      <CardContent className="p-6">
        <Textarea
          placeholder="방에 대한 특이 사항을 입력하세요..."
          value={data || ""}
          onChange={(e) => updateFormData(e.target.value)}
          className="min-h-[200px]"
        />
        <p className="text-sm text-gray-500 mt-2">
          예: 채광, 소음, 단열, 누수, 곰팡이, 벌레, 냄새 등 특이사항이나 주의할 점을 자유롭게 작성해주세요.
        </p>
      </CardContent>
    </Card>
  );
}

export default SpecialNotesSection;
