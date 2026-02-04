import CommonWebView from "@/components/domain/webview/CommonWebView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DietAnalysisScreen() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#fff" }}>
      <CommonWebView
        baseUrl={process.env.EXPO_PUBLIC_WEB_BASE_URL!}
        initialPath="/diet-analysis"
      />
    </SafeAreaView>
  );
}
