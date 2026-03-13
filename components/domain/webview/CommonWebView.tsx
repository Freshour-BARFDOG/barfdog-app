import {
  refreshAccessToken,
  TOKEN_REFRESH_FAILED,
  TOKEN_REFRESHED,
} from "@/api/tokenRefresh";
import { TokenStorage } from "@/utils/auth/tokenStorage";
import CookieManager from "@preeternal/react-native-cookie-manager";
import { Href, router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  DeviceEventEmitter,
  Linking,
  Platform,
} from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

const APP_SCHEME = "barfdogapp://";

interface CommonWebViewProps {
  baseUrl: string;
  initialPath?: string;
}

export default function CommonWebView({
  baseUrl,
  initialPath = "/",
}: CommonWebViewProps) {
  const ref = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isCookieReady, setIsCookieReady] = useState(false);
  const isTokenInjectedRef = useRef(false);

  const fullUrl = `${baseUrl}${initialPath}`;

  // ─── WebView 로드 전 쿠키 주입 ────────────────────────────────────────────
  useEffect(() => {
    const injectCookieBeforeLoad = async () => {
      try {
        const accessToken = await TokenStorage.getAccessToken();
        if (accessToken) {
          await CookieManager.set(baseUrl, {
            name: "accessToken",
            value: accessToken,
            path: "/",
            secure: true,
            httpOnly: false,
          });
        }
      } catch (error) {
        console.error("쿠키 설정 실패:", error);
      } finally {
        setIsCookieReady(true);
      }
    };

    injectCookieBeforeLoad();
  }, [baseUrl]);

  // ─── 안드로이드 하드웨어 뒤로가기 ─────────────────────────────────────────
  useEffect(() => {
    if (Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack) {
        ref.current?.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack]);

  // ─── RN 토큰 이벤트 → WebView 동기화 ─────────────────────────────────────
  // refreshAccessToken() 호출 주체가 누구든(RN 인터셉터 or REQUEST_TOKENS 핸들러)
  // 이 단일 경로로만 WebView에 토큰이 전달됨
  useEffect(() => {
    const onRefreshed = DeviceEventEmitter.addListener(
      TOKEN_REFRESHED,
      async ({ token }: { token: string }) => {
        try {
          await CookieManager.set(baseUrl, {
            name: "accessToken",
            value: token,
            path: "/",
            secure: true,
            httpOnly: false,
          });
          ref.current?.postMessage(
            JSON.stringify({
              type: "INJECT_TOKENS",
              payload: { accessToken: token },
            }),
          );
        } catch (error) {
          console.error("WebView 토큰 동기화 실패:", error);
        }
      },
    );

    const onFailed = DeviceEventEmitter.addListener(
      TOKEN_REFRESH_FAILED,
      () => {
        ref.current?.postMessage(
          JSON.stringify({ type: "TOKEN_REFRESH_FAILED" }),
        );
        router.replace("/auth/login");
      },
    );

    return () => {
      onRefreshed.remove();
      onFailed.remove();
    };
  }, [baseUrl]);

  // ─── WebView 초기 로드 시 토큰 주입 (1회) ─────────────────────────────────
  const handleWebViewLoad = useCallback(async () => {
    if (isTokenInjectedRef.current) return;

    const accessToken = await TokenStorage.getAccessToken();
    if (accessToken) {
      ref.current?.postMessage(
        JSON.stringify({ type: "INJECT_TOKENS", payload: { accessToken } }),
      );
      isTokenInjectedRef.current = true;
    }
  }, []);

  // ─── WebView → Native 메시지 수신 ─────────────────────────────────────────
  const handleMessage = useCallback(async (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.type) {
        case "REQUEST_TOKENS": {
          // WebView 401 → RN에 갱신 위임
          // refreshAccessToken이 완료되면 TOKEN_REFRESHED 이벤트 발화
          // → 위 이벤트 리스너가 쿠키 갱신 + INJECT_TOKENS 전송
          try {
            await refreshAccessToken();
          } catch {
            // 실패 시 TOKEN_REFRESH_FAILED 이벤트 리스너가 처리
          }
          break;
        }

        case "LOGOUT":
          await TokenStorage.clearAllTokens();
          router.replace("/auth/login");
          break;

        case "TOKEN_UPDATED": {
          const { accessToken: updatedToken } = data.payload;
          if (updatedToken) await TokenStorage.setAccessToken(updatedToken);
          break;
        }

        case "DEBUG_LOG": {
          const { message, data: logData, timestamp } = data.payload;
          console.log(`🌐 [WebView ${timestamp}] ${message}`, logData || "");
          break;
        }

        default:
          console.log("📨 WebView 메시지:", data);
      }
    } catch (error) {
      console.error("메시지 파싱 실패:", error);
    }
  }, []);

  // ─── URL 라우팅 제어 ───────────────────────────────────────────────────────
  const allowedHosts = [
    new URL(baseUrl).host,
    "service.iamport.kr",
  ];

  const onShouldStart = useCallback(
    (req: any) => {
      const url = req.url;

      if (url === "about:blank") return true;

      if (url.startsWith(APP_SCHEME)) {
        const path = url.replace(APP_SCHEME, "/");
        router.push(path as Href);
        return false;
      }

      if (!url.startsWith("http")) {
        Linking.openURL(url);
        return false;
      }

      const host = (() => {
        try {
          return new URL(url).host;
        } catch {
          return "";
        }
      })();

      if (allowedHosts.includes(host)) return true;

      Linking.openURL(url);
      return false;
    },
    [baseUrl],
  );

  if (!isCookieReady) return null;

  return (
    <WebView
      ref={ref}
      source={{ uri: fullUrl }}
      onNavigationStateChange={(s) => setCanGoBack(s.canGoBack)}
      onShouldStartLoadWithRequest={onShouldStart}
      onLoad={handleWebViewLoad}
      onMessage={handleMessage}
      applicationNameForUserAgent="BarfdogApp/ (Hybrid)"
      javaScriptEnabled
      domStorageEnabled
      thirdPartyCookiesEnabled
      sharedCookiesEnabled
      allowsBackForwardNavigationGestures
    />
  );
}
