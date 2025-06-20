const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand, BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");

const REGION = "ap-northeast-2";

let ddbClient;
let docClient;

// MOCK 모드일 때는 send 함수만 흉내내는 객체로 대체
if (process.env.MOCK_DYNAMODB === 'true') {
    const { QueryCommand, BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");

    ddbClient = {
        send: async (command) => {
            if (command instanceof QueryCommand) {
                // 필요한 경우 가짜 데이터 넣어주기
                if (command.input.ExpressionAttributeValues[":pk"].startsWith("PROJECT#")) {
                    return {
                        Items: [
                            { PK: `PROJECT#proj123`, SK: `ROOM#room1` },
                            { PK: `PROJECT#proj123`, SK: `TASK#task1` }
                        ]
                    };
                } else if (command.input.ExpressionAttributeValues[":pk"].startsWith("ROOM#")) {
                    return {
                        Items: [
                            { PK: `ROOM#room1`, SK: `DETAIL#1` },
                            { PK: `ROOM#room1`, SK: `DETAIL#2` }
                        ]
                    };
                }
                return { Items: [] };
            } else if (command instanceof BatchWriteCommand) {
                return {}; // BatchWriteCommand에 대한 응답
            } else {
                return {};
            }
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

    try {
        // PROJECT#projectId 하위 항목 조회
        const projectItems = await docClient.send(
            new QueryCommand({
                TableName: "bangbang-check",
                KeyConditionExpression: "PK = :pk",
                ExpressionAttributeValues: {
                    ":pk": `PROJECT#${projectId}`
                }
            })
        );

        const deleteRequests = [];

        // 해당 항목들 삭제 요청 생성
        for (const item of projectItems.Items) {
            deleteRequests.push({
                DeleteRequest: {
                    Key: {
                        PK: item.PK,
                        SK: item.SK
                    }
                }
            });

            // ROOM#... 항목이면 해당 room의 상세도 삭제
            if (item.SK.startsWith("ROOM#")) {
                const roomId = item.SK.replace("ROOM#", "");
                const roomItems = await docClient.send(
                    new QueryCommand({
                        TableName: "bangbang-check",
                        KeyConditionExpression: "PK = :pk",
                        ExpressionAttributeValues: {
                            ":pk": `ROOM#${roomId}`
                        }
                    })
                );
                for (const roomItem of roomItems.Items) {
                    deleteRequests.push({
                        DeleteRequest: {
                            Key: {
                                PK: roomItem.PK,
                                SK: roomItem.SK
                            }
                        }
                    });
                }
            }
        }

        // USER#username 와 PROJECT 연결도 삭제
        deleteRequests.push({
            DeleteRequest: {
                Key: {
                    PK: `USER#${username}`,
                    SK: `PROJECT#${projectId}`
                }
            }
        });

        // BatchWrite 25개씩 나눠서 삭제 요청
        const chunkSize = 25;
        for (let i = 0; i < deleteRequests.length; i += chunkSize) {
            const chunk = deleteRequests.slice(i, i + chunkSize);
            await docClient.send(new BatchWriteCommand({
                RequestItems: {
                    "bangbang-check": chunk
                }
            }));
        }

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
