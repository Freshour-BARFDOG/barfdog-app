import { TokenStorage } from "@/utils/auth/tokenStorage";
import CookieManager from "@preeternal/react-native-cookie-manager";
import { Href, router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Linking, Platform } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

const APP_SCHEME = "barfdogapp://";

interface CommonWebViewProps {
  baseUrl: string;
  initialPath?: string; // 초기 경로 (예: "/store", "/health-note")
}

export default function CommonWebView({
  baseUrl,
  initialPath = "/",
}: CommonWebViewProps) {
  const ref = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [isCookieReady, setIsCookieReady] = useState<boolean>(false); // 쿠키 설정 완료 여부
  const isTokenInjectedRef = useRef<boolean>(false); // 토큰 주입 플래그

  // 전체 URL 생성
  const fullUrl = `${baseUrl}${initialPath}`;

  // WebView 로드 전 쿠키에 토큰 주입
  useEffect(() => {
    const injectCookieBeforeLoad = async () => {
      try {
        const accessToken = await TokenStorage.getAccessToken();

        if (accessToken) {
          // 네이티브 쿠키 저장소에 토큰 설정
          await CookieManager.set(baseUrl, {
            name: "accessToken",
            value: accessToken,
            path: "/",
            secure: true,
            httpOnly: false,
          });
          console.log("🍪 쿠키에 토큰 주입 완료");
        }
      } catch (error) {
        console.error("쿠키 설정 실패:", error);
      } finally {
        setIsCookieReady(true);
      }
    };

    injectCookieBeforeLoad();
  }, [baseUrl]);

  // 안드로이드 하드웨어 뒤로가기: 웹 뒤로가기 우선
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

  // WebView 로드 완료 시 토큰 주입
  const handleWebViewLoad = useCallback(async () => {
    // 이미 주입했으면 스킵
    if (isTokenInjectedRef.current) {
      console.log("⏭️ 토큰 이미 주입됨, 스킵");
      return;
    }

    const accessToken = await TokenStorage.getAccessToken();

    if (accessToken) {
      // WebView에 토큰 전달
      const message = JSON.stringify({
        type: "INJECT_TOKENS",
        payload: {
          accessToken,
        },
      });

      ref.current?.postMessage(message);
      isTokenInjectedRef.current = true; // 플래그 설정
      console.log("✅ WebView에 토큰 주입 완료");
    }
  }, []);

  // WebView에서 Native로 메시지 수신
  const handleMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      console.log("📨 Native에서 메시지 수신:", event.nativeEvent.data);

      try {
        const data = JSON.parse(event.nativeEvent.data);
        console.log("📦 파싱된 데이터:", data);

        switch (data.type) {
          case "REQUEST_TOKENS": {
            // WebView에서 토큰 요청 시 재전송 (플래그 무시)
            console.log("📨 WebView에서 토큰 요청");
            const token = await TokenStorage.getAccessToken();
            if (token) {
              const message = JSON.stringify({
                type: "INJECT_TOKENS",
                payload: { accessToken: token },
              });
              ref.current?.postMessage(message);
              console.log("✅ 토큰 재전송 완료");
            }
            break;
          }

          case "LOGOUT":
            // WebView에서 로그아웃 요청
            console.log("🚪 WebView에서 로그아웃 요청");
            await TokenStorage.clearAllTokens();
            console.log("✅ 토큰 삭제 완료");
            // 로그인 페이지로 리다이렉트
            router.replace("/auth/login");
            break;

          case "TOKEN_UPDATED": {
            // WebView에서 토큰 갱신됨 (옵션)
            const { accessToken: updatedToken } = data.payload;
            if (updatedToken) TokenStorage.setAccessToken(updatedToken);
            console.log("🔄 WebView에서 토큰 업데이트됨");
            break;
          }
          case "DEBUG_LOG": {
            // 웹에서 보낸 디버그 로그
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
    },
    [handleWebViewLoad]
  );

  const allowedHosts = [
    new URL(baseUrl).host, // 우리 프론트 호스트
    "service.iamport.kr", // 포트원 결제 중간 도메인
  ];

  const onShouldStart = useCallback(
    (req: any) => {
      const url = req.url;

      // 0) about:blank는 무시 (결제 모듈 등에서 사용)
      if (url === "about:blank") {
        return true;
      }

      // 1) 자체 앱 스킴인 경우 → expo-router로 직접 라우팅
      if (url.startsWith(APP_SCHEME)) {
        const path = url.replace(APP_SCHEME, "/");
        console.log("🔗 앱 딥링크 감지, 라우팅:", path);
        router.push(path as Href);
        return false;
      }

      // 2) http/https가 아니면 (tel:, mailto: 등) → 외부로
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

      // 3) 허용된 호스트라면 WebView 안에서 열기
      if (allowedHosts.includes(host)) {
        return true;
      }

      // 4) 그 외는 외부 브라우저로
      Linking.openURL(url);
      return false;
    },
    [baseUrl]
  );

  // 쿠키 설정 완료 전에는 WebView 렌더링하지 않음
  if (!isCookieReady) {
    return null;
  }

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
