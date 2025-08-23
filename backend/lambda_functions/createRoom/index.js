const { ulid } = require('ulid');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const REGION = "ap-northeast-2";

let ddbClient;
let docClient;

if (process.env.MOCK_DYNAMODB === 'true') {
    ddbClient = {
        send: async (command) => {
            return Promise.resolve({});
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

    const origin = event.headers.origin || event.headers.Origin || "";
    const allowOrigin = allowedOrigins.includes(origin) ? origin : "";

    const requestBody = JSON.parse(event.body);
    const projectId = requestBody.projectId;
    const roomData = requestBody.roomData;
    const roomId = ulid();

    // 유효성 검사
    if (!projectId || !roomData || !roomData.name) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "projectId와 방 이름이 필요합니다." }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    }

    if (typeof roomData.name !== 'string' || roomData.name.length > 100 || /[<>"'&]/.test(roomData.name)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "유효하지 않은 방 이름입니다." }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    }

    const timestamp = new Date().toISOString();

    const roomItem = {
      PK: `PROJECT#${projectId}`,
      SK: `ROOM#${roomId}`,
      stars: 0,
      data: roomData,  // 전체 데이터
      updatedAt: timestamp
    };

    try {
        await docClient.send(new PutCommand({
            TableName: "bangbang-check",
            Item: roomItem
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "방 생성 완료",
                roomId: roomId
            }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin,
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        };
    } catch (error) {
        console.error("방 생성 에러:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "방 생성 중 오류 발생" }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin,
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        };
    }
};