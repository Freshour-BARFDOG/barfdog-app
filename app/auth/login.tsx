import LoginForm from "@/components/pages/auth/login/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  return (
    <SafeAreaView className="flex-1">
      <LoginForm />
    </SafeAreaView>
  );
}
