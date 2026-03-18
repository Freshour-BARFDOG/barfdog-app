import CommonWebView from "@/components/domain/webview/CommonWebView";
import { CHECKOUT_ROUTES } from "@/constants/checkout";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GeneralCheckoutFailed() {
  return (
    <SafeAreaView style={styles.screen}>
      <CommonWebView
        baseUrl={process.env.EXPO_PUBLIC_WEB_BASE_URL!}
        initialPath={CHECKOUT_ROUTES.GENERAL.failed}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
