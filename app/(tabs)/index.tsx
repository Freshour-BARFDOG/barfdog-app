import CommonWebView from "@/components/domain/webview/CommonWebView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  // AuthGuard에서 인증을 처리하므로 여기서는 단순히 WebView만 표시
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonWebView
        baseUrl={process.env.EXPO_PUBLIC_WEB_BASE_URL!}
        initialPath="/"
      />
    </SafeAreaView>
  );
}
