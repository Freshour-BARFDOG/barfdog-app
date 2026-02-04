import CommonWebView from "@/components/domain/webview/CommonWebView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-0">
      <CommonWebView
        baseUrl={process.env.EXPO_PUBLIC_WEB_BASE_URL!}
        initialPath="/store"
      />
    </SafeAreaView>
  );
}
