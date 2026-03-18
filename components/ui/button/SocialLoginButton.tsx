import {
  OAUTH_PROVIDER_CONFIG,
  OAUTH_PROVIDERS,
  type SnsProvider,
} from "@/config/oauth";
import { Platform, Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface SocialLoginButtonProps {
  provider: SnsProvider;
  onPress: () => void;
  disabled?: boolean;
}

export default function SocialLoginButton({
  provider,
  onPress,
  disabled = false,
}: SocialLoginButtonProps) {
  const config = OAUTH_PROVIDER_CONFIG[provider];

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.button,
          { backgroundColor: config.backgroundColor },
          disabled && styles.disabled,
        ]}
      >
        <Text style={[styles.text, { color: config.fontColor }]}>
          {config.label}
        </Text>
      </View>
    </Pressable>
  );
}

export function SocialLoginButtons({
  onPress,
  disabled = false,
}: {
  onPress: (provider: SnsProvider) => void;
  disabled?: boolean;
}) {
  return (
    <View style={styles.container}>
      {OAUTH_PROVIDERS.filter(
        (provider) => provider !== "apple" || Platform.OS === "ios",
      ).map((provider) => (
        <SocialLoginButton
          key={provider}
          provider={provider}
          onPress={() => onPress(provider)}
          disabled={disabled}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: "100%",
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.4,
  },
  disabled: {
    opacity: 0.5,
  },
});
