import { COLORS } from "@/constants/colors";
import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  SharedValue,
} from "react-native-reanimated";

interface DotSpinnerProps {
  fullscreen?: boolean;
  style?: ViewStyle;
}

const DOT_SIZE = 10;
const DOT_COLORS = [
  COLORS.redLight, // #F1A3A6
  COLORS.redMain, // #BE1A21
  COLORS.redPastelPink, // #FBD7D8
  COLORS.redLight, // #F1A3A6
  COLORS.redMain, // #BE1A21
];

const Dot = ({ index, progress }: { index: number; progress: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    let translateX = 0;
    let scale = 1;

    const p = progress.value;

    switch (index) {
      case 0: // dot1
        if (p < 0.3) {
          translateX = 26;
          scale = interpolate(p, [0, 0.3], [1, 0]);
        } else if (p < 0.66) {
          translateX = interpolate(p, [0.3, 0.66], [26, 0]);
          scale = 0;
        } else {
          translateX = 0;
          scale = 0;
        }
        break;
      case 1: // dot2
        if (p < 0.33) {
          translateX = interpolate(p, [0, 0.33], [13, 26]);
          scale = 1;
        } else if (p < 0.66) {
          translateX = 26;
          scale = interpolate(p, [0.33, 0.66], [1, 0]);
        } else {
          translateX = 26;
          scale = 0;
        }
        break;
      case 2: // dot3
        if (p < 0.33) {
          translateX = interpolate(p, [0, 0.33], [0, 13]);
          scale = 1;
        } else if (p < 0.66) {
          translateX = interpolate(p, [0.33, 0.66], [13, 26]);
          scale = 1;
        } else {
          translateX = 26;
          scale = interpolate(p, [0.66, 1], [1, 0]);
        }
        break;
      case 3: // dot4
        if (p < 0.03) {
          translateX = 0;
          scale = 0;
        } else if (p < 0.33) {
          translateX = 0;
          scale = interpolate(p, [0.03, 0.33], [0, 1]);
        } else if (p < 0.66) {
          translateX = interpolate(p, [0.33, 0.66], [0, 13]);
          scale = 1;
        } else {
          translateX = interpolate(p, [0.66, 1], [13, 26]);
          scale = 1;
        }
        break;
      case 4: // dot5
        if (p < 0.36) {
          translateX = 0;
          scale = 0;
        } else if (p < 0.66) {
          translateX = 0;
          scale = interpolate(p, [0.36, 0.66], [0, 1]);
        } else {
          translateX = interpolate(p, [0.66, 1], [0, 13]);
          scale = 1;
        }
        break;
    }

    return {
      transform: [{ translateX }, { scale }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: DOT_COLORS[index] },
        animatedStyle,
      ]}
    />
  );
};

export default function DotSpinner({ fullscreen, style }: DotSpinnerProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.bezier(0.42, 0, 0.58, 1), // ease-in-out
      }),
      -1
    );
  }, [progress]);

  return (
    <View style={[styles.container, fullscreen && styles.fullscreen, style]}>
      <View style={styles.dotContainer}>
        {[0, 1, 2, 3, 4].map((index) => (
          <Dot key={index} index={index} progress={progress} />
        ))}
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
  dotContainer: {
    position: "relative",
    width: 44,
    height: DOT_SIZE,
  },
  dot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    left: 0,
  },
});
