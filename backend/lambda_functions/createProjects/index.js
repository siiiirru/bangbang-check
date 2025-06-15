const { ulid } = require('ulid');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");

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
    const projectId = ulid();
    const projectName = requestBody.projectName;
    const username = requestBody.username;

    if (!projectName || typeof projectName !== 'string' || projectName.length > 100 || /[<>"'&]/.test(projectName)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "유효하지 않은 프로젝트 이름입니다." }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    }

    const timestamp = new Date().toISOString();

    const batchParams = {
        RequestItems: {
            "bangbang-check": [
                {
                    PutRequest: {
                        Item: {
                            PK: `USER#${username}`,
                            SK: `PROJECT#${projectId}`,
                            projectName: projectName,
                            createdAt: timestamp
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            PK: `PROJECT#${projectId}`,
                            SK: "META",
                            createBy: username,
                            createdAt: timestamp
                        }
                    }
                }
            ]
        }
    };

    try {
        await docClient.send(new BatchWriteCommand(batchParams));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "데이터 저장 완료",
                projectId: projectId
            }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    } catch (error) {
        console.error("에러:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "저장 중 오류 발생" }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin
            }
        };
    }
};
