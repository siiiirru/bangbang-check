const { ulid } = require('ulid');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const REGION = "ap-northeast-2";

let ddbClient;
let docClient;

if (process.env.MOCK_DYNAMODB === 'true') {
    // Mock 객체 (v3에서는 Promise 반환하는 함수 형태)
    ddbClient = {
    send: async (command) => {
        console.log('[MOCK] DynamoDB command 호출됨:', command.input);
        return Promise.resolve({});
    }
    };
    docClient = ddbClient;
} else {
    ddbClient = new DynamoDBClient({ region: REGION });
    docClient = DynamoDBDocumentClient.from(ddbClient);
}

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const projectId = ulid();

    const params = {
        TableName: "bangbang-check",
        Item: {
        PK: `USER#${requestBody.username}`,
        SK: `PROJECT#${projectId}`,
        projectName: requestBody.projectName,
        createdAt: new Date().toISOString()
        }
    };

    try {
        await docClient.send(new PutCommand(params));

        return {
        statusCode: 200,
        body: JSON.stringify({ message: "데이터 저장 완료" }),
        headers: {
            "Access-Control-Allow-Origin": "https://www.bangbang-check.com"
        }
        };
    } catch (error) {
        console.error("에러:", error);
        return {
        statusCode: 500,
        body: JSON.stringify({ error: "저장 중 오류 발생" }),
        headers: {
            "Access-Control-Allow-Origin": "https://www.bangbang-check.com"
        }
        };
    }
};
