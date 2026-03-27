# 서비스 도메인 (barfdog-app)

> 전체 가이드 원본: `guide/service_summary.md`

**바프독 앱**: WebView 하이브리드 모바일 앱. barfdog-web을 WebView로 로드하고, 인증/결제만 네이티브.

## 화면 구성

- **WebView 탭**: 홈(`/`), 스토어(`/store`), 식이분석(`/diet-analysis`), 건강노트(`/health-note`), 마이페이지(`/mypage`)
- **네이티브**: 로그인(소셜 SDK), 결제(포트원 SDK), 푸시 알림 설정

## 핵심 도메인

- **Auth (네이티브)**: 소셜 로그인 (카카오,네이버,애플). JWT AsyncStorage 저장.
- **Checkout (네이티브)**: 일반/구독 결제. 포트원 SDK. 결과 처리.
- **나머지**: WebView (barfdog-web)에 위임.

## 핵심 플로우

- 앱 시작: SessionProvider 토큰 검증 → 유효면 WebView, 무효면 로그인 화면.
- 소셜 로그인: 네이티브 SDK → OAuth 토큰 → 백엔드 JWT 발급 → AsyncStorage 저장.
- WebView 결제: `barfdogapp://` 스킴 → 네이티브 결제 → 결과 API → 결과 화면.

## 프로젝트 관계

- **barfdog-web**: WebView에서 로드되는 웹 페이지. 코드 변경 시 앱 업데이트 불필요.
- **barfdog-admin**: 상품/콘텐츠 관리 (직접 관계 없음).
