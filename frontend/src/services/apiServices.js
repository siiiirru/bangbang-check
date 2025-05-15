// src/services/authService.js
import { fetchAuthSession } from 'aws-amplify/auth';

export const API_BASE_URL = "https://api.bangbang-check.com";

// 세션과 인증 헤더를 가져오는 함수
export const getAuthHeaders = async () => {
    try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();
        if (!idToken) {
            throw new Error("토큰이 없습니다.");
        }
        return {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json"
        };
    } catch (error) {
        console.error("세션 가져오는 중 오류 발생:", error);
        throw new Error("세션을 가져올 수 없습니다.");
    }
};
