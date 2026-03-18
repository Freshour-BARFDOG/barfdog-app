import { refreshAccessToken } from "@/api/tokenRefresh";
import { WEBVIEW_MESSAGES } from "@/constants/webview";
import { useSession } from "@/components/domain/auth/SessionProvider";
import { useWebViewTokenSync } from "@/hooks/useWebViewTokenSync";
import { getUrlHost } from "@/utils/webview/url";
import { Href, router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, Linking, Platform } from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";

const APP_SCHEME = "barfdogapp://";

interface CommonWebViewProps {
  baseUrl: string;
  initialPath?: string;
}

export default function CommonWebView({
  baseUrl,
  initialPath = "/",
}: CommonWebViewProps) {
  const { signOut } = useSession();
  const ref = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const { isCookieReady, handleWebViewLoad } = useWebViewTokenSync(
    baseUrl,
    ref,
  );

  const fullUrl = `${baseUrl}${initialPath}`;

  // ─── 안드로이드 하드웨어 뒤로가기 ───────────────────────────────────────
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

  // ─── WebView → Native 메시지 수신 ────────────────────────────────────────
  const handleMessage = useCallback(async (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.type) {
        case WEBVIEW_MESSAGES.REQUEST_TOKENS: {
          // WebView 401 → RN에 갱신 위임
          // refreshAccessToken이 완료되면 TOKEN_REFRESHED 이벤트 발화
          // → useWebViewTokenSync 이벤트 리스너가 쿠키 갱신 + INJECT_TOKENS 전송
          try {
            await refreshAccessToken();
          } catch {
            // 실패 시 TOKEN_REFRESH_FAILED 이벤트 리스너가 처리
          }
          break;
        }

        case WEBVIEW_MESSAGES.LOGOUT:
          await signOut();
          break;

        case WEBVIEW_MESSAGES.DEBUG_LOG: {
          const { message, data: logData, timestamp } = data.payload;
          console.log(`🌐 [WebView ${timestamp}] ${message}`, logData || "");
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error("메시지 파싱 실패:", error);
    }
  }, [signOut]);

  // ─── URL 라우팅 제어 ──────────────────────────────────────────────────────
  const allowedHosts = useMemo(() => {
    try {
      return [new URL(baseUrl).host, "service.iamport.kr"];
    } catch {
      return ["service.iamport.kr"];
    }
  }, [baseUrl]);

  const handleNavigationStateChange = useCallback(
    (s: WebViewNavigation) => setCanGoBack(s.canGoBack),
    [],
  );

  const onShouldStart = useCallback(
    (req: WebViewNavigation) => {
      const { url } = req;

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

      if (allowedHosts.includes(getUrlHost(url))) return true;

      Linking.openURL(url);
      return false;
    },
    [allowedHosts],
  );

  if (!isCookieReady) return null;

  return (
    <WebView
      ref={ref}
      source={{ uri: fullUrl }}
      onNavigationStateChange={handleNavigationStateChange}
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
