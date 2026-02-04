import { isTokenValid } from "@/utils/auth/jwtValidation";
import { TokenStorage } from "@/utils/auth/tokenStorage";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * 전역 인증 가드 컴포넌트
 * - 앱 접근 시 토큰 유효성 검증
 * - 로그인 안됨: /auth/login으로 리다이렉트
 * - 로그인됨: 요청한 페이지로 이동
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  // 라우트 변경될 때마다 인증 체크
  useEffect(() => {
    console.log("🔍 라우트 변경 감지:", segments);
    checkAuth();
  }, [segments]);

  const checkAuth = async () => {
    try {
      const accessToken = await TokenStorage.getAccessToken();

      console.log("🔐 토큰 체크:", {
        hasToken: !!accessToken,
        isValid: accessToken ? isTokenValid(accessToken) : false,
      });

      // 토큰이 없거나 만료되었으면 로그인 필요
      if (!isTokenValid(accessToken ?? undefined)) {
        await TokenStorage.clearAllTokens();
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("인증 체크 실패:", error);
      setIsAuthenticated(false);
    }
  };

  // 인증 상태에 따른 리다이렉트
  useEffect(() => {
    if (isAuthenticated === null) return; // 아직 체크 중

    const inAuthGroup = segments[0] === "auth";

    console.log("📍 인증 상태:", {
      isAuthenticated,
      inAuthGroup,
      currentPath: segments.join("/"),
    });

    if (!isAuthenticated && !inAuthGroup) {
      // 로그인 안됨 + auth 페이지가 아님 → 로그인 페이지로
      console.log("➡️ 로그인 페이지로 리다이렉트");
      router.replace("/auth/login");
    } else if (isAuthenticated && inAuthGroup) {
      // 로그인됨 + auth 페이지에 있음 → 홈으로
      console.log("➡️ 홈으로 리다이렉트");
      router.replace("/(tabs)");
    } else {
      console.log("✅ 현재 위치 유지");
    }
  }, [isAuthenticated, segments]);

  // 인증 확인 중 (null = 체크 전)
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
