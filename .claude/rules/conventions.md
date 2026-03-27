---
paths: ["app/**", "api/**", "components/**", "hooks/**", "store/**", "types/**", "utils/**", "styles/**"]
---

# 코드 컨벤션 (barfdog-app)

> 전체 가이드 원본: `guide/project_convention.md`, `guide/module_convention.md`

## 하이브리드 아키텍처

- 대부분 탭 화면은 **CommonWebView**로 barfdog-web을 로드.
- **네이티브 구현**: Auth (소셜 SDK), Checkout (포트원 SDK)만.
- WebView ↔ Native 통신: postMessage 프로토콜.

### WebView 프로토콜

| 방향 | 타입 | 용도 |
|---|---|---|
| Native→Web | `INJECT_TOKENS` | 토큰 주입 |
| Web→Native | `REQUEST_TOKENS` | 401 시 토큰 갱신 요청 |
| Web→Native | `LOGOUT` | 네이티브 로그아웃 |
| Web→Native | `DEBUG_LOG` | 웹 로그 출력 |

### 토큰 동기화 흐름

앱 시작 → SessionProvider 토큰 검증 → WebView 로드 → INJECT_TOKENS.
WebView 401 → REQUEST_TOKENS → 네이티브 갱신 → TOKEN_REFRESHED → 쿠키 재설정 + INJECT_TOKENS.

### URL 라우팅

- 같은 호스트: WebView 내 탐색. `barfdogapp://` 스킴: Expo Router 전환.
- `service.iamport.kr`: 결제 허용. 그 외 외부: 시스템 브라우저.

## 아키텍처 규칙

- **의존성 방향**: Screen → Component → Hook → API/Store. 역방향 금지.
- **API → Store 직접 참조 금지**. Store → API 직접 참조 금지. Hook에서 조합.

## 상태 관리

- **Server State** (TanStack Query): API 응답 데이터. SSOT. Zustand에 복제 금지.
- **Client State** (Zustand): 토스트, UI 상태만.
- **Form State** (React Hook Form): 폼 입력/검증.
- **Auth State** (SessionProvider Context): 로그인 여부, 토큰.
- 파생 상태 별도 저장 안 함. 단일 컴포넌트 전용은 `useState`.

## 컴포넌트 분류

| 분류 | 위치 | 원칙 |
|---|---|---|
| UI | `components/ui/{name}/` | 비즈니스 로직 없음. Props + Unistyles variants. |
| Domain | `components/domain/{domain}/` | 도메인 종속. CommonWebView, SessionProvider 등. |
| Layout | `components/layout/` | CustomTabBar (Reanimated). |
| Pages | `components/pages/{page}/` | 특정 화면 전용. |

## Screen 패턴

- WebView 탭: `SafeAreaView` + `CommonWebView` 조합.
- 네이티브 화면: 비즈니스 로직은 `components/pages/`로 분리.

```tsx
// WebView 탭 화면 패턴
export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <CommonWebView baseUrl={process.env.EXPO_PUBLIC_WEB_BASE_URL!} initialPath="/" />
    </SafeAreaView>
  );
}
```

## API 레이어

| 모듈 | 위치 | 네이밍 |
|---|---|---|
| API 함수 | `api/{domain}/{domain}.ts` | `getUserInfo`, `cancelOrder` |
| Query Hook | `api/{domain}/queries/` | `useGet{Resource}` |
| Mutation Hook | `api/{domain}/mutations/` | `use{Action}{Resource}` |

- Query: queryKey `[BASE, ACTION, ...params]`. 커스텀 옵션에서 queryKey/queryFn 제외.
- Mutation: 성공 시 `invalidateQueries` + 토스트. 실패 시 에러 토스트.
- 소셜 로그인 Mutation: `mutationFn` 내에서 네이티브 SDK 호출 + API 호출 조합.

## Zustand Store

- `create<Interface>()` 패턴. Server State 저장 금지.
- 큐 패턴 (토스트): `queue` + `currentItem` + `processNext`.
- 위치: `store/use{Name}Store.ts`

## 스타일링 (Unistyles v3)

- `StyleSheet.create((theme) => ({...}))` 패턴으로 테마 참조.
- 복잡한 컴포넌트: `.styles.ts` 파일 분리.
- `variants` + `compoundVariants`로 동적 스타일 (CVA 대체).
- 크로스 플랫폼 그림자: iOS `shadowX` + Android `elevation`.

## Axios 인스턴스

| 인스턴스 | 용도 | 타임아웃 |
|---|---|---|
| `apiClient` (= `axiosInstance`) | 인증 API | 10초 |
| `publicAxios` | 공개 API (로그인, 토큰 갱신) | 10초 |

## TypeScript

- `any` 금지. `as` 최소화. Props: `interface`. API 응답: `type`.
- WebView 메시지: discriminated union 타입 정의.

## 에러 처리

- 401: 인터셉터 자동 갱신. WebView 401: REQUEST_TOKENS 프로토콜.
- API 에러: Mutation `onError` 토스트 (한글).
- 네트워크 에러: 토스트 + 재시도 안내.

## 네이밍

- 컴포넌트: PascalCase. 훅: `use` 접두사. 스타일: `.styles.ts`.
- 스크린: kebab-case (Expo Router 규칙). 디렉토리: camelCase.

## 플랫폼별 처리

- Android 뒤로가기: WebView 히스토리 우선 소진 후 네이티브 뒤로가기.
- 키보드 이벤트: iOS `keyboardWillShow` / Android `keyboardDidShow`.
