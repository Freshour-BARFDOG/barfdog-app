import { StyleSheet } from "react-native";
import { colors, typography } from "@/styles/theme";

// Typography 스타일 정의
const typographyStyles = {
  display1: typography.display1,
  display2: typography.display2,
  title1: typography.title1,
  title2: typography.title2,
  title3: typography.title3,
  title4: typography.title4,
  headline1: typography.headline1,
  headline2: typography.headline2,
  headline3: typography.headline3,
  headline4: typography.headline4,
  label1: typography.label1,
  label2: typography.label2,
  label3: typography.label3,
  label4: typography.label4,
  body1: typography.body1,
  body2: typography.body2,
  body3: typography.body3,
  caption: typography.caption,
  caption2: typography.caption2,
} as const;

// Color 스타일 정의
const colorStyles = {
  red: { color: colors.red.main },
  redPastel: { color: colors.red.pastel },
  gray900: { color: colors.gray[900] },
  gray800: { color: colors.gray[800] },
  gray700: { color: colors.gray[700] },
  gray600: { color: colors.gray[600] },
  gray500: { color: colors.gray[500] },
  gray400: { color: colors.gray[400] },
  gray300: { color: colors.gray[300] },
  gray200: { color: colors.gray[200] },
  gray100: { color: colors.gray[100] },
  gray50: { color: colors.gray[50] },
  gray0: { color: colors.gray[0] },
  blue500: { color: colors.blue[500] },
  green500: { color: colors.green[500] },
  yellow500: { color: colors.yellow[500] },
  blue400: { color: colors.blue[400] },
  green400: { color: colors.green[400] },
  yellow400: { color: colors.yellow[400] },
  blue600: { color: colors.blue[600] },
  kakaoFont: { color: colors.kakao.font },
  naverFont: { color: colors.naver.font },
} as const;

// Align 스타일 정의
const alignStyles = {
  left: { textAlign: "left" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
} as const;

// Decoration 스타일 정의
const decorationStyles = {
  underline: { textDecorationLine: "underline" },
  lineThrough: { textDecorationLine: "line-through" },
} as const;

export const textStyles = StyleSheet.create({
  ...typographyStyles,
  ...colorStyles,
  ...alignStyles,
  ...decorationStyles,
});

// 타입 export
export type TextType = keyof typeof typographyStyles;
export type TextColor = keyof typeof colorStyles;
export type TextAlign = keyof typeof alignStyles;