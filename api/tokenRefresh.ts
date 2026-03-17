import { WEBVIEW_MESSAGES } from "@/constants/webview";
import { TokenStorage } from "@/utils/auth/tokenStorage";
import { DeviceEventEmitter } from "react-native";
import { publicAxios } from "./axiosInstance";

// ─── 이벤트 상수 ───────────────────────────────────────────────────────────────
export const TOKEN_REFRESHED = "TOKEN_REFRESHED" as const;

// ─── 내부 타입 ─────────────────────────────────────────────────────────────────
type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

// ─── 모듈 레벨 상태 (앱 전체 공유) ────────────────────────────────────────────
let isRefreshing = false;
let queue: QueueItem[] = [];

const flushQueue = (error?: unknown, token?: string) => {
  queue.forEach((item) =>
    error ? item.reject(error) : token && item.resolve(token),
  );
  queue = [];
};

const extractToken = (
  data: unknown,
  headers: Record<string, string>,
): string | null => {
  const headerToken = headers?.authorization || headers?.Authorization;
  if (typeof headerToken === "string" && headerToken.startsWith("Bearer ")) {
    return headerToken.slice(7);
  }
  return (data as any)?.accessToken ?? null;
};

/**
 * 액세스 토큰 갱신 — 앱 전체 단일 진입점.
 *
 * - 동시에 여러 곳에서 호출해도 실제 HTTP 요청은 1회만 발생 (큐 관리)
 * - 갱신 성공: TOKEN_REFRESHED 이벤트 → CommonWebView가 WebView에 동기화
 * - 갱신 실패: TOKEN_REFRESH_FAILED 이벤트 → CommonWebView가 로그인 화면 이동
 */
export const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      queue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const { data, headers } = await publicAxios.post(
      "/api/v2/public/accounts/refresh",
    );

    const token = extractToken(data, headers as Record<string, string>);
    if (!token) throw new Error("토큰 재발급 실패: 응답에 토큰 없음");

    await TokenStorage.setAccessToken(token);
    flushQueue(undefined, token);

    // CommonWebView 이벤트 리스너 → WebView 쿠키 + INJECT_TOKENS 동기화
    DeviceEventEmitter.emit(TOKEN_REFRESHED, { token });

    return token;
  } catch (error) {
    flushQueue(error);
    await TokenStorage.clearAllTokens();

    // CommonWebView 이벤트 리스너 → TOKEN_REFRESH_FAILED 전송 + 로그인 이동
    DeviceEventEmitter.emit(WEBVIEW_MESSAGES.TOKEN_REFRESH_FAILED);

    throw error;
  } finally {
    isRefreshing = false;
  }
};
