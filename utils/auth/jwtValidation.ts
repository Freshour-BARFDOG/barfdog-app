import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number; // 만료 시간(초 단위)
}

/**
 * JWT 토큰의 유효성을 검증합니다.
 * - Bearer 접두어 처리
 * - JWT 형식 검증
 * - 만료 시간 체크
 *
 * @param token - 검증할 JWT 토큰
 * @returns 토큰이 유효하면 true, 아니면 false
 */
export function isTokenValid(token?: string): boolean {
  if (!token || token.trim() === "") {
    return false;
  }

  // 1) Bearer 접두어 제거
  const normalizedToken = token.startsWith("Bearer ") ? token.slice(7) : token;

  // 2) JWT 세 부분 검증
  const parts = normalizedToken.split(".");
  if (parts.length !== 3) {
    console.warn("잘못된 JWT 형식:", normalizedToken);
    return false;
  }

  try {
    // 3) 디코딩 후 만료 시간 체크
    const decoded = jwtDecode<JwtPayload>(normalizedToken);
    const currentTime = Date.now();
    if (decoded.exp && currentTime >= decoded.exp * 1000) {
      console.log("토큰 만료됨");
      return false; // 토큰 만료
    }
    return true; // 정상 토큰
  } catch (error) {
    console.error("JWT 디코딩 실패:", error);
    return false;
  }
}
