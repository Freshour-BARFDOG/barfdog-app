import { useLogout } from "@/api/auth/queries/useLogout";
import Button from "@/components/ui/button/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        console.log("🚪 로그아웃 성공");
        router.replace("/auth/login");
      },
      onError: (error) => {
        console.error("❌ 로그아웃 실패:", error);
      },
    });
  };

  return (
    <SafeAreaView>
      <Button onPress={handleLogout}>로그아웃</Button>
    </SafeAreaView>
  );
}
