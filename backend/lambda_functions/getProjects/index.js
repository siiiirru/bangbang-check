const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const REGION = "ap-northeast-2";

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "bangbang-check";

exports.handler = async (event) => {
    const allowedOrigins = [
        "https://www.bangbang-check.com",
        "http://localhost:3000"
    ];

    const origin = event.headers.origin || event.headers.Origin;
    const allowOrigin = allowedOrigins.includes(origin) ? origin : "";

    // 쿼리 파라미터 가져오기
    const queryParams = event.queryStringParameters;

    // 쿼리 파라미터에서 'username' 값을 가져오기
    const username = queryParams ? queryParams.username : null;
    
    if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "username 쿼리 파라미터가 필요합니다." }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin,
            },
        };
    }

    const pk = `USER#${username}`;

    try {
        const result = await docClient.send(
            new QueryCommand({
                TableName: TABLE_NAME,
                KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
                ExpressionAttributeValues: {
                    ":pk": pk,
                    ":skPrefix": "PROJECT#"
                },
            })
        );

        const projectsData = result.Items.map(item => ({
                id: item.SK.replace("PROJECT#", ""), // SK에서 projectId 추출
                name: item.projectName,
            }));

        return {
            statusCode: 200,
            body: JSON.stringify(projectsData),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin, // 또는 특정 도메인
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
        }

    } catch (error) {
        console.error("DynamoDB query error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "서버 오류가 발생했습니다." }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin,
            },
        };
    }
}
