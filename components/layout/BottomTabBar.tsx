import { colors } from "@/styles/theme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Text from "../ui/text/Text";

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="bg-gray-0 border-t border-gray-100 h-90 pb-8 pt-8 flex-row">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarItem
            key={route.key}
            label={label as string}
            isFocused={isFocused}
            onPress={onPress}
            icon={options.tabBarIcon}
          />
        );
      })}
    </View>
  );
}

interface TabBarItemProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  icon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode;
}

function TabBarItem({ label, isFocused, onPress, icon }: TabBarItemProps) {
  // 스케일 애니메이션 - 좌우로 늘어나는 효과
  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);
  const opacity = useSharedValue(isFocused ? 1 : 0.5);
  // 누를 때 전체 스케일 효과
  const pressScale = useSharedValue(1);

  useEffect(() => {
    // 포커스될 때: 좌우로 늘어났다가 원래대로 (탄성 효과)
    if (isFocused) {
      scaleX.value = withSpring(1.05, {
        damping: 50,
        stiffness: 600,
      });
      scaleY.value = withSpring(0.95, {
        damping: 50,
        stiffness: 600,
      });
      setTimeout(() => {
        scaleX.value = withSpring(1, {
          damping: 50,
          stiffness: 600,
        });
        scaleY.value = withSpring(1, {
          damping: 50,
          stiffness: 600,
        });
      }, 150);
      opacity.value = withTiming(isFocused ? 1 : 0.5, {
        duration: 200,
      });
    }
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scaleX: scaleX.value },
      { scaleY: scaleY.value },
      { scale: pressScale.value },
    ],
    opacity: opacity.value,
  }));

  const color = isFocused ? colors.red.main : colors.gray[400];

  const handlePressIn = () => {
    pressScale.value = withSpring(0.9, {
      damping: 50,
      stiffness: 600,
    });
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, {
      damping: 50,
      stiffness: 600,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="items-center justify-center flex-1"
    >
      {({ pressed }) => (
        <Animated.View
          style={animatedStyle}
          className={`items-center gap-4 rounded-20 py-8 w-64 ${
            pressed ? "bg-gray-50" : "bg-transparent"
          }`}
        >
          {icon && icon({ focused: isFocused, color, size: 24 })}
          <Text
            type="caption2"
            color={isFocused ? "red" : "gray400"}
            align="center"
          >
            {label}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
}
