import SubscriptionCheckout from "@/components/pages/checkout/subscription/SubscriptionCheckout";
import { StyleSheet } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionCheckoutPage() {
  return (
    <SafeAreaView style={styles.screen}>
      <SubscriptionCheckout />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
