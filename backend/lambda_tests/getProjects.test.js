// Lambda handler 함수 호출을 위한 테스트 코드
const { handler } = require('../lambda_functions/getProjects/index'); // Lambda 함수가 정의된 파일을 require

// 테스트용 event 객체
const testEvent = {
    httpMethod: "GET", // GET 요청
    queryStringParameters: {
        username: "testuser" // 쿼리 파라미터로 username 전달
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