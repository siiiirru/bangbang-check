process.env.MOCK_DYNAMODB = 'true';
const { handler } = require('../lambda_functions/createRoom/index'); // Lambda 함수가 정의된 파일을 require

// 테스트용 event 객체
const testEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
        projectId: "01JWDBNVZJT5ESZS58R2BJ3VBR",
        roomData: {
            name: "테스트 방",
            photos: ["test-photo.jpg"],
            address: { 
                main: "서울시 강남구", 
                detail: "테헤란로 123" 
            },
            size: { 
                pyeong: "10", 
                squareMeter: "33" 
            },
            structure: "원룸",
            floor: "3층",
            moveInDate: "2024-09-01",
            constructionYear: "2020",
            hasParking: true,
            hasElevator: true,
            cost: {
                deposit: 10000000,
                monthlyRent: 500000,
                maintenanceFee: 50000,
                brokerageFee: 200000,
                utilityFee: 30000,
                maintenanceItems: {
                    "관리비": true,
                    "인터넷": true
                },
                utilityItems: {
                    "전기": true,
                    "가스": true
                },
                mortgageBelow70Percent: false
            },
            options: {
                "에어컨": true,
                "냉장고": true,
                "세탁기": false
            },
            wallWindow: {
                windowCount: 2,
                direction: "남향",
                hasScreens: true,
                outsideItems: {
                    "발코니": true
                },
                goodInsulation: true,
                solidWall: true,
                goodSoundproof: false
            },
            bathroom: {
                "샤워부스": true,
                "욕조": false
            },
            kitchen: {
                "가스레인지": true,
                "전자레인지": true
            },
            hygiene: {
                "깨끗함": true
            },
            security: {
                "CCTV": true,
                "도어락": true
            },
            surroundings: {
                subway: "강남역 5분",
                bus: "정류장 1분",
                mart: "편의점 2분",
                convenience: "GS25 1분",
                hospital: "병원 10분",
                pharmacy: "약국 3분",
                park: "공원 5분",
                police: "파출소 10분",
                commute: "회사 30분"
            },
            specialNotes: "조용하고 깨끗한 방입니다.",
            comments: []
        }
    }),
    headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000"
    }
};

// 테스트용 context 객체 (필요시)
const context = {}; // 실제 실행에서는 AWS Lambda 환경에서 제공

// 테스트 실행
handler(testEvent, context)
    .then(response => {
        // Lambda 함수의 응답을 출력
        console.log("Response:", JSON.stringify(response, null, 2));
        
        // 응답 검증
        const body = JSON.parse(response.body);
        console.log("생성된 방 ID:", body.roomId);
        console.log("메시지:", body.message);
    })
    .catch(error => {
        // 에러 처리
        console.error("Error:", error);
    });