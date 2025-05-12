
# 1. Commit Message / PR Prefix 규칙
| 타입     | 의미                                                   |
|----------|--------------------------------------------------------|
| [feat]   | 새로운 기능 추가                                       |
| [fix]    | 버그 수정                                              |
| [docs]   | 문서 수정 (README 등)                                  |
| [style]  | 코드 포맷팅 (세미콜론, 들여쓰기 등), 기능 변화 없음   |
| [refactor] | 코드 리팩토링 (동작 동일, 구조만 개선)              |
| [test]   | 테스트 추가/수정                                       |
| [chore]  | 빌드 시스템, 패키지 설정 등 기타 작업                  |
| [cicd]     | CI/CD 관련 설정                                        |
| [infra]  | 인프라 관련 (예: Terraform)                            |


# 2. 브랜치 전략

프로젝트의 안정성을 높이기 위해 아래와 같은 브랜치 전략을 사용합니다.

## 주요 브랜치

| 브랜치 이름     | 설명 |
|----------------|------|
| `main`         | 실제 운영(프로덕션)에 배포되는 브랜치. 항상 안정적인 상태 유지. |
| `dev`          | 개발자가 기능 브랜치를 머지하는 대상 브랜치. 테스트 환경과 연결 가능. |


## 기능 브랜치 (Feature Branch)

- 새로운 기능 추가 작업 시 사용합니다.
- 네이밍 규칙: `feature/<기능명>`
- 예시: `feature/login`, `feature/add-user-profile`

## 버그 수정 브랜치 (Bugfix Branch)

- 발견된 버그를 수정할 때 사용합니다.
- 네이밍 규칙: `fix/<버그명>`
- 예시: `fix/login-error`, `fix/api-response`

## 리팩토링 브랜치

- 코드 개선 작업 시 사용합니다.
- 네이밍 규칙: `refactor/<리팩토링 내용>`
- 예시: `refactor/reduce-complexity`, `refactor/clean-code`

## 인프라 브랜치 (Terraform 등)

- 인프라 코드(Terraform 등) 변경 시 사용합니다.
- 네이밍 규칙: `infra/<작업내용>`
- 예시: `infra/add-s3`, `infra/update-lambda`

## 브랜치 병합 규칙

| 브랜치 | 병합 대상 브랜치 | 병합 방식     |
|--------|------------------|----------------|
| `feature/*`, `fix/*` | `dev`           | Pull Request (PR) |
| `dev`                | `main`       | Pull Request (PR) |
|

모든 병합은 PR을 통해 진행되며, 리뷰와 테스트가 선행되어야 합니다.
