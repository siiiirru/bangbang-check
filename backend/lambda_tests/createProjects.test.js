process.env.MOCK_DYNAMODB = 'true';
const { handler } = require('../lambda_functions/createProjects/index'); // Lambda 함수가 정의된 파일을 require

// 테스트용 event 객체
const testEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
        username: "user123",
        projectName: "테스트 프로젝트"
    }),
    headers: {
        "Content-Type": "application/json"
    }
};

// 테스트용 context 객체 (필요시)
const context = {}; // 실제 실행에서는 AWS Lambda 환경에서 제공

// 테스트 실행
handler(testEvent, context)
    .then(response => {
        // Lambda 함수의 응답을 출력
        console.log("Response:", JSON.stringify(response, null, 2));
    })
    .catch(error => {
        // 에러 처리
        console.error("Error:", error);
    });