import { CHECKOUT_ROUTES } from "@/constants/checkout";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function SubscriptionCheckoutFailed() {
  const { subscribeId } = useLocalSearchParams<{ subscribeId: string }>();

  const webViewUrl = `${process.env.EXPO_PUBLIC_WEB_BASE_URL}${CHECKOUT_ROUTES.SUBSCRIPTION.failed(Number(subscribeId))}`;

  return (
    <SafeAreaView className="flex-1">
      <WebView
        source={{ uri: webViewUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        onNavigationStateChange={(navState) => {
          console.log("[WebView Failed] Navigation:", navState.url);
        }}
      />
    </SafeAreaView>
  );
}