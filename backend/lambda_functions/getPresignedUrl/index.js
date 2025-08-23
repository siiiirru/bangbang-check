const { S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { ulid } = require('ulid');

const REGION = "ap-northeast-2";
const BUCKET_NAME = "user-upload-bangbang-check-bucket";

let s3Client;

if (process.env.MOCK_S3 === 'true') {
    s3Client = null;
} else {
    s3Client = new S3Client({ 
        region: REGION,
        requestChecksumCalculation: "WHEN_REQUIRED"
    });
}

exports.handler = async (event) => {
    const allowedOrigins = [
        "https://www.bangbang-check.com",
        "http://localhost:3000"
    ];

    const origin = event.headers.origin || event.headers.Origin || "";
    const allowOrigin = allowedOrigins.includes(origin) ? origin : "";

    try {
        const requestBody = JSON.parse(event.body);
        const { fileName, projectId } = requestBody;

        if (!fileName || !projectId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "파일명과 프로젝트 ID가 필요합니다." }),
                headers: {
                    "Access-Control-Allow-Origin": allowOrigin
                }
            };
        }

        // Mock 모드
        if (process.env.MOCK_S3 === 'true') {
            const mockImageId = ulid();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    presignedUrl: `https://mock-presigned-url.com/${mockImageId}`,
                    imageUrl: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/rooms/${projectId}/${mockImageId}.jpg`,
                    imageId: mockImageId
                }),
                headers: {
                    "Access-Control-Allow-Origin": allowOrigin,
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            };
        }

        // 파일 확장자 추출
        const fileExtension = fileName.split('.').pop().toLowerCase() || 'jpg';
        const imageId = ulid();
        const key = `rooms/${projectId}/${imageId}.${fileExtension}`;

        // Content-Type 매핑
        const contentTypeMap = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'jfif': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp'
        };
        const contentType = contentTypeMap[fileExtension] || 'image/jpeg';

        // Presigned URL 생성
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: contentType
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { 
            expiresIn: 300,
            unhoistableHeaders: new Set(['x-amz-checksum-crc32']),
            signableHeaders: new Set(['host'])  // 이 줄 추가
        }); // 5분
        const imageUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;

        return {
            statusCode: 200,
            body: JSON.stringify({
                presignedUrl: presignedUrl,
                imageUrl: imageUrl,
                imageId: imageId
            }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin,
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        };

    } catch (error) {
        console.error("Presigned URL 생성 에러:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Presigned URL 생성 중 오류 발생" }),
            headers: {
                "Access-Control-Allow-Origin": allowOrigin,
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        };
    }
};