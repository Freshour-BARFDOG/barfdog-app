import { createHeaderOptions } from "@/components/layout/header/headerOptions";
import { colors } from "@/constants/colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.gray[900],
        contentStyle: {
          backgroundColor: colors.gray[0],
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={createHeaderOptions({
          title: "로그인",
        })}
      />
    </Stack>
  );
}
