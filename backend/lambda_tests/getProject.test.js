const { handler } = require('../lambda_functions/getProject/index'); 

// 테스트용 event 객체
const testEvent = {
    headers: {
        origin: "http://localhost:3000"
    },
    httpMethod: "GET", // GET 요청
    queryStringParameters: {
        username: "xogkwn", // 쿼리 파라미터로 username 전달
        projectId: "01JWDBNVZJT5ESZS58R2BJ3VBR"
    },
    requestContext: {
        authorizer: {
            claims: {
                "cognito:username": "xogkwn"
            }
        }
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