import { TOKEN_REFRESHED } from "@/api/tokenRefresh";
import { useSession } from "@/components/domain/auth/SessionProvider";
import { WEBVIEW_MESSAGES } from "@/constants/webview";
import { TokenStorage } from "@/utils/auth/tokenStorage";
import { setAccessTokenCookie } from "@/utils/webview/cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import { WebView } from "react-native-webview";

export function useWebViewTokenSync(
  baseUrl: string,
  webViewRef: React.RefObject<WebView | null>,
) {
  const { signOut } = useSession();
  const [isCookieReady, setIsCookieReady] = useState(false);
  const isTokenInjectedRef = useRef(false);

  // ─── WebView 로드 전 쿠키 주입 ──────────────────────────────────────────
  useEffect(() => {
    setIsCookieReady(false);
    isTokenInjectedRef.current = false;

    const inject = async () => {
      try {
        const accessToken = await TokenStorage.getAccessToken();
        if (accessToken) await setAccessTokenCookie(baseUrl, accessToken);
      } catch (error) {
        console.error("쿠키 설정 실패:", error);
      } finally {
        setIsCookieReady(true);
      }
    };

    inject();
  }, [baseUrl]);

  // ─── RN 토큰 이벤트 → WebView 동기화 ────────────────────────────────────
  // refreshAccessToken() 호출 주체가 누구든(RN 인터셉터 or REQUEST_TOKENS 핸들러)
  // 이 단일 경로로만 WebView에 토큰이 전달됨
  useEffect(() => {
    const onRefreshed = DeviceEventEmitter.addListener(
      TOKEN_REFRESHED,
      async ({ token }: { token: string }) => {
        try {
          await setAccessTokenCookie(baseUrl, token);
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: WEBVIEW_MESSAGES.INJECT_TOKENS,
              payload: { accessToken: token },
            }),
          );
        } catch (error) {
          console.error("WebView 토큰 동기화 실패:", error);
        }
      },
    );

    const onFailed = DeviceEventEmitter.addListener(
      WEBVIEW_MESSAGES.TOKEN_REFRESH_FAILED,
      async () => {
        webViewRef.current?.postMessage(
          JSON.stringify({ type: WEBVIEW_MESSAGES.TOKEN_REFRESH_FAILED }),
        );
        await signOut();
      },
    );

    return () => {
      onRefreshed.remove();
      onFailed.remove();
    };
  }, [baseUrl, signOut]);

  // ─── WebView 초기 로드 시 토큰 주입 (1회) ───────────────────────────────
  const handleWebViewLoad = useCallback(async () => {
    if (isTokenInjectedRef.current) return;

    const accessToken = await TokenStorage.getAccessToken();
    if (accessToken) {
      webViewRef.current?.postMessage(
        JSON.stringify({ type: WEBVIEW_MESSAGES.INJECT_TOKENS, payload: { accessToken } }),
      );
      isTokenInjectedRef.current = true;
    }
  }, []);

  return { isCookieReady, handleWebViewLoad };
}
