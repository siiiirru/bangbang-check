const { ulid } = require('ulid');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-northeast-2' });

let dynamodb;
if (process.env.MOCK_DYNAMODB === 'true') {
  // 테스트용 Mock 객체
    dynamodb = {
        put: (params) => ({
        promise: async () => {
            console.log('[MOCK] DynamoDB put 호출됨:', params);
            return Promise.resolve();
        }
        }),
    };
    } else {
    dynamodb = new AWS.DynamoDB.DocumentClient();
}

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const projectId = ulid();

    const params = {
        TableName: "bangbang-check",
        Item : {
            PK: `USER#${requestBody.userId}`,
            SK: `PROJECT#${projectId}`, 
            projectName: requestBody.projectName,
            createAt: new Date().toISOString()
        }
    };

    try {
        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "데이터 저장 완료" }),
            headers: {
                "Access-Control-Allow-Origin": "https://www.bangbang-check.com", // 또는 특정 도메인
            }
        };
    } catch (error) {
        console.error("에러:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "저장 중 오류 발생" }),
            headers: {
                "Access-Control-Allow-Origin": "https://www.bangbang-check.com", // 또는 특정 도메인
            }
        };
    }
}