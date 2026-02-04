import { colors } from "@/constants/colors";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

interface HeaderConfig {
  title?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showCartButton?: boolean;
  showMypageButton?: boolean;
  showCloseButton?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  backgroundColor?: string;
  headerTitleColor?: string;
  headerLeft?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  headerShown?: boolean;
}

export function createHeaderOptions(
  config: HeaderConfig = {}
): NativeStackNavigationOptions {
  const {
    title,
    showBackButton = false,
    showHomeButton = false,
    showCartButton = false,
    showMypageButton = false,
    showCloseButton = false,
    onBack,
    onClose,
    backgroundColor = colors.gray[0],
    headerTitleColor = colors.gray[900],
    headerLeft,
    headerRight,
    headerShown = true,
  } = config;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  // headerLeft 커스텀 또는 기본 버튼들
  const defaultHeaderLeft = () => {
    const hasAnyLeftButton = showBackButton || showHomeButton;
    if (!hasAnyLeftButton) return null;

    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {showBackButton && (
          <Pressable onPress={handleBack} style={{ padding: 4, marginLeft: 8 }}>
            <Ionicons name="chevron-back" size={24} color={headerTitleColor} />
          </Pressable>
        )}
        {showHomeButton && (
          <Pressable
            onPress={() => router.push("/")}
            style={{ padding: 4, marginLeft: showBackButton ? 0 : 8 }}
          >
            <Foundation name="home" size={24} color={headerTitleColor} />
          </Pressable>
        )}
      </View>
    );
  };

  // headerRight 커스텀 또는 기본 버튼들
  const defaultHeaderRight = () => {
    const hasAnyRightButton =
      showCartButton || showMypageButton || showCloseButton;
    if (!hasAnyRightButton) return null;

    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        {showCartButton && (
          <Pressable onPress={() => router.push("/")} style={{ padding: 4 }}>
            <Ionicons name="cart-outline" size={24} color={headerTitleColor} />
          </Pressable>
        )}
        {showMypageButton && (
          <Pressable onPress={() => router.push("/my")} style={{ padding: 4 }}>
            <Ionicons
              name="person-outline"
              size={24}
              color={headerTitleColor}
            />
          </Pressable>
        )}
        {showCloseButton && (
          <Pressable
            onPress={handleClose}
            style={{ padding: 4, marginRight: 8 }}
          >
            <Ionicons name="close" size={28} color={headerTitleColor} />
          </Pressable>
        )}
      </View>
    );
  };

  return {
    title,
    headerShown,
    headerStyle: {
      backgroundColor,
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: "600",
      color: headerTitleColor,
    },
    headerTitleAlign: "center",
    headerLeft: headerLeft || defaultHeaderLeft,
    headerRight: headerRight || defaultHeaderRight,
    headerBackVisible: false, // 기본 뒤로가기 버튼 숨김 (커스텀 사용)
  };
}
