import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Link } from "react-router-dom"

export function ProjectCard({
  project,
  isDeleteMode,
  isShareMode,
  isCheckedForDelete,
  isSelectedForShare,
  onDeleteCheckChange,
  onShareRadioChange,
}) {
  return (
    <div className="bg-gray-200 rounded-md p-4 relative">
      {/* 삭제 모드일 때 체크박스 표시 */}
      {isDeleteMode && (
        <div className="absolute top-2 right-2">
          <Checkbox
            checked={isCheckedForDelete}
            onCheckedChange={(checked) => onDeleteCheckChange(project.id, checked)}
            className="h-5 w-5 border-2 border-gray-400"
          />
        </div>
      )}

      {/* 공유 모드일 때 라디오 버튼 표시 */}
      {isShareMode && (
        <div className="absolute top-2 right-2">
          <RadioGroup value={isSelectedForShare ? project.id : ""}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={project.id}
                id={`radio-${project.id}`}
                onClick={() => onShareRadioChange(project.id)}
              />
            </div>
          </RadioGroup>
        </div>
      )}

      {/* 프로젝트 내용 */}
      <Link to={`/projects/${project.id}`} className="block">
        <div className={`h-24 flex items-center justify-center ${isDeleteMode || isShareMode ? "pr-8" : ""}`}>
          <h3 className="text-lg font-medium text-gray-800 text-center">{project.name}</h3>
        </div>
      </Link>
    </div>
  )
}
