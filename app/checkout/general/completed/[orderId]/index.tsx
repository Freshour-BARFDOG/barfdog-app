import CommonWebView from "@/components/domain/webview/CommonWebView";
import { CHECKOUT_ROUTES } from "@/constants/checkout";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GeneralCheckoutCompleted() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  return (
    <SafeAreaView style={styles.screen}>
      <CommonWebView
        baseUrl={process.env.EXPO_PUBLIC_WEB_BASE_URL!}
        initialPath={CHECKOUT_ROUTES.GENERAL.completed(Number(orderId))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
