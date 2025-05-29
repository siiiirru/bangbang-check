const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const REGION = "ap-northeast-2";

let ddbClient;
let docClient;

// MOCK 모드일 때는 send 함수만 흉내내는 객체로 대체
if (process.env.MOCK_DYNAMODB === 'true') {
    ddbClient = {
        send: async (command) => {
            return Promise.resolve({}); // 성공 응답 시뮬레이션
        }
    };
    docClient = ddbClient;
} else {
    ddbClient = new DynamoDBClient({ region: REGION });
    docClient = DynamoDBDocumentClient.from(ddbClient);
}

exports.handler = async (event) => {
    const allowedOrigins = [
        "https://www.bangbang-check.com",
        "http://localhost:3000"
    ];

    const origin = event.headers.origin || event.headers.Origin;
    const allowOrigin = allowedOrigins.includes(origin) ? origin : "";

    const requestBody = JSON.parse(event.body);
    const username = requestBody.username;
    const projectId = requestBody.projectId;

    // 유효성 검사
    if (!username || typeof username !== 'string' || !projectId || typeof projectId !== 'string') {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "username 또는 projectId가 유효하지 않습니다." }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    }

    const params = {
        TableName: "bangbang-check",
        Key: {
            PK: `USER#${username}`,
            SK: `PROJECT#${projectId}`
        }
    };

    try {
        await docClient.send(new DeleteCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: process.env.MOCK_DYNAMODB === 'true' ? "모의 삭제 성공" : "데이터 삭제 완료",
                projectId: projectId
            }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    } catch (error) {
        console.error("삭제 중 에러:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "삭제 중 오류 발생" }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    }
};
