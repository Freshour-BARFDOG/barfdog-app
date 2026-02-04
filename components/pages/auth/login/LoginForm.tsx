import { useLogin } from "@/api/auth/queries/useLogin";
import Button from "@/components/ui/button/Button";
import InputField from "@/components/ui/input/InputField";
import Text from "@/components/ui/text/Text";
import {
  defaultLoginValues,
  loginSchema,
  LoginValues,
} from "@/utils/validation/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoginForm() {
  const { mutate: login } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues(null),
  });

  const onSubmit = (data: LoginValues) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          console.log("🎉 로그인 성공, 홈으로 이동");
          // 토큰 저장 후 약간의 지연을 두고 이동 (안정성)
          setTimeout(() => {
            router.replace("/");
          }, 100);
        },
        onError: (error) => {
          console.error("❌ 로그인 실패:", error);
          // TODO: 에러 메시지 표시 (Toast 또는 Alert)
        },
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0} // 헤더 높이에 맞춰 미세 조정
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          keyboardShouldPersistTaps="handled"
          // iOS RN 0.72+ 에서 자동 인셋 조정
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="flex-1 gap-20 items-center justify-center">
            <View className="gap-4 items-center justify-center">
              <Text type="title1">👋 안녕하세요 보호자님!</Text>
              <Text type="body3" color="gray500">
                다양한 맞춤 서비스를 위해 로그인해주세요.
              </Text>
            </View>

            <View className="gap-16 mb-16">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    placeholder="이메일을 입력해주세요"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    placeholder="비밀번호를 입력해주세요"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    masking
                    secureTextEntry
                    returnKeyType="done"
                    onSubmit={() => handleSubmit(onSubmit)()}
                  />
                )}
              />
            </View>
            <View>
              <Button size="lg" onPress={handleSubmit(onSubmit)} fullWidth>
                로그인
              </Button>
              <View></View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
