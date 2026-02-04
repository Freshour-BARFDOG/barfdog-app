import SpinnerInIcon from "@/assets/icons/spinner/spinner-in.svg";
import SpinnerOutIcon from "@/assets/icons/spinner/spinner-out.svg";
import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import SvgIcon from "../svgIcon/SvgIcon";

interface SpinnerProps {
  fullscreen?: boolean;
  size?: "md" | "sm";
  style?: ViewStyle;
}

const SPINNER_SIZES = {
  md: { outer: 64, inner: 24 },
  sm: { outer: 56, inner: 16 },
} as const;

export default function Spinner({
  fullscreen,
  size = "md",
  style,
}: SpinnerProps) {
  const rotation = useSharedValue(0);
  const { outer, inner } = SPINNER_SIZES[size];

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 800,
        easing: Easing.linear,
      }),
      -1
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, fullscreen && styles.fullscreen, style]}>
      <View
        style={[styles.spinner, { width: outer, height: outer }]}
        accessibilityRole="progressbar"
        accessibilityLabel="로딩 중"
      >
        <Animated.View style={[styles.spinnerOuter, animatedStyle]}>
          <SvgIcon src={SpinnerOutIcon} size={outer} />
        </Animated.View>
        <View style={styles.spinnerInner}>
          <SvgIcon src={SpinnerInIcon} size={inner} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreen: {
    flex: 1,
  },
  spinner: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerOuter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  spinnerInner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});
