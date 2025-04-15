import { Card, CardContent } from "../../ui/card"; // Card 컴포넌트
import { Checkbox } from "../../ui/checkbox"; // Checkbox 컴포넌트
import { Label } from "../../ui/label"; // Label 컴포넌트

// OptionsSection 컴포넌트
export function OptionsSection({ data, updateFormData }) {
  const handleOptionChange = (option, checked) => {
    updateFormData({ [option]: checked });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(optionLabels).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`option-${key}`}
                checked={data[key] || false}
                onCheckedChange={(checked) => handleOptionChange(key, checked)}
              />
              <Label htmlFor={`option-${key}`} className="cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


// 옵션 레이블
const optionLabels = {
  refrigerator: "냉장고",
  sink: "싱크대",
  induction: "인덕션",
  gasStove: "가스레인지",
  microwave: "전자레인지",
  diningTable: "식탁",
  shower: "샤워기",
  washbasin: "세면대",
  toilet: "변기",
  bathtub: "욕조",
  washingMachine: "세탁기",
  shoeRack: "신발장",
  airConditioner: "에어컨",
  television: "텔레비전",
  bed: "침대",
  desk: "책상",
  closet: "옷장",
};
