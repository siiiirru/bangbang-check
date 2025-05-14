exports.handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://www.bangbang-check.com",
                "Access-Control-Allow-Headers": "Authorization,Content-Type",
                "Access-Control-Allow-Methods": "GET,OPTIONS",
            },
            body: "",
        };
    }
    // 쿼리 파라미터 가져오기
    const queryParams = event.queryStringParameters;

    // 쿼리 파라미터에서 'username' 값을 가져오기
    const username = queryParams ? queryParams.username : null;
    console.log("User name:",username); // 로그에 출력


    const projectsData = [
        { id: "1", name: "2025직장 근처 자취방 구하기"},
        { id: "2", name: "2023학교 근처 자취방 구하기"},
    ]

    return {
        statusCode: 200,
        body: JSON.stringify(projectsData),
        headers: {
            "Access-Control-Allow-Origin": "https://www.bangbang-check.com", // 또는 특정 도메인
            "Access-Control-Allow-Headers": "Authorization,Content-Type",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
    }
}
