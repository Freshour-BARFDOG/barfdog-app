import CommonWebView from "@/components/domain/webview/CommonWebView";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <CommonWebView
        baseUrl={process.env.EXPO_PUBLIC_WEB_BASE_URL!}
        initialPath="/mypage"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.gray[0],
  },
}));
