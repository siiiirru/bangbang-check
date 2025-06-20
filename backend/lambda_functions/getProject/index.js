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

    //username을 토큰에서 가져오기
    const claims = event.requestContext?.authorizer?.claims;
    const isAuthenticated = !!claims;

    let username = null;
    if (isAuthenticated) {
    username = claims["cognito:username"];
    }

    // 인증 토큰 가져오기
    // const token = event.headers?.Authorization || null;
    // 쿼리 파라미터 가져오기
    const queryParams = event.queryStringParameters;

    // 쿼리 파라미터에서 값 가져오기
    // const username = queryParams?.username ?? null;
    const pk = queryParams?.projectId ?? null;

    if (!pk) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "projectId 쿼리 파라미터가 필요합니다." }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin,
            },
        };
    }

    try {
        const result = await docClient.send(
            new QueryCommand({
                TableName: TABLE_NAME,
                KeyConditionExpression: "PK = :pk",
                ExpressionAttributeValues: {
                    ":pk": pk,
                },
            })
        );

        const items = result.Items;
        const meta = items.find(item => item.SK === "META");
        const rooms = items
        .filter(item => item.SK !== "META")
        .map(item => ({
            roomId: item.SK.replace("ROOM#", ""),
            name: item.name,
            photo: item.photo,
            stars: item.stars,
        })) || [];

        let projectsData = null;

        // 게스트 반환값
        if(username!=meta.createBy){
            projectsData = {
                rooms:rooms,
                isOwner:false
            }
        }
        // 프로젝트 소유자 반환값
        else{
            projectsData={
                rooms:rooms,
                isOwner:true
            }

            if (meta.rank1 !== undefined) {
                projectsData.rank1 = meta.rank1;
            }
            if (meta.rank2 !== undefined) {
                projectsData.rank2 = meta.rank2;
            }
            if (meta.rank3 !== undefined) {
                projectsData.rank3 = meta.rank3;
            }
            if (meta.aiRecommend !== undefined) {
                projectsData.aiRecommend = meta.aiRecommend;
            }
        }


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
