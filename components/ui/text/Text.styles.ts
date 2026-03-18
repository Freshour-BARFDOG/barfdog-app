import { StyleSheet } from "react-native-unistyles";

export const textStyles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      type: {
        display1: theme.typography.display1,
        display2: theme.typography.display2,
        title1: theme.typography.title1,
        title2: theme.typography.title2,
        title3: theme.typography.title3,
        title4: theme.typography.title4,
        headline1: theme.typography.headline1,
        headline2: theme.typography.headline2,
        headline3: theme.typography.headline3,
        headline4: theme.typography.headline4,
        label1: theme.typography.label1,
        label2: theme.typography.label2,
        label3: theme.typography.label3,
        label4: theme.typography.label4,
        body1: theme.typography.body1,
        body2: theme.typography.body2,
        body3: theme.typography.body3,
        caption: theme.typography.caption,
        caption2: theme.typography.caption2,
      },
      color: {
        red: { color: theme.colors.red.main },
        redPastel: { color: theme.colors.red.pastel },
        gray900: { color: theme.colors.gray[900] },
        gray800: { color: theme.colors.gray[800] },
        gray700: { color: theme.colors.gray[700] },
        gray600: { color: theme.colors.gray[600] },
        gray500: { color: theme.colors.gray[500] },
        gray400: { color: theme.colors.gray[400] },
        gray300: { color: theme.colors.gray[300] },
        gray200: { color: theme.colors.gray[200] },
        gray100: { color: theme.colors.gray[100] },
        gray50: { color: theme.colors.gray[50] },
        gray0: { color: theme.colors.gray[0] },
        blue600: { color: theme.colors.blue[600] },
        blue500: { color: theme.colors.blue[500] },
        blue400: { color: theme.colors.blue[400] },
        green500: { color: theme.colors.green[500] },
        green400: { color: theme.colors.green[400] },
        yellow500: { color: theme.colors.yellow[500] },
        yellow400: { color: theme.colors.yellow[400] },
        kakaoFont: { color: theme.colors.kakao.font },
        naverFont: { color: theme.colors.naver.font },
      },
      align: {
        left: { textAlign: "left" },
        center: { textAlign: "center" },
        right: { textAlign: "right" },
      },
      underline: {
        true: { textDecorationLine: "underline" },
        false: {},
      },
      lineThrough: {
        true: { textDecorationLine: "line-through" },
        false: {},
      },
    },
  },
}));

// 타입 export
export type TextType = keyof typeof import("@/styles/theme").typography;
export type TextColor =
  | "red"
  | "redPastel"
  | "gray900"
  | "gray800"
  | "gray700"
  | "gray600"
  | "gray500"
  | "gray400"
  | "gray300"
  | "gray200"
  | "gray100"
  | "gray50"
  | "gray0"
  | "blue600"
  | "blue500"
  | "blue400"
  | "green500"
  | "green400"
  | "yellow500"
  | "yellow400"
  | "kakaoFont"
  | "naverFont";
export type TextAlign = "left" | "center" | "right";
