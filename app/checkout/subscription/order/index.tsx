import SubscriptionCheckout from "@/components/pages/checkout/subscription/SubscriptionCheckout";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionCheckoutPage() {
  return (
    <SafeAreaView className="flex-1">
      <SubscriptionCheckout />
    </SafeAreaView>
  );
}
