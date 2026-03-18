import { StyleSheet } from "react-native-unistyles";

export const buttonStyles = StyleSheet.create((theme) => ({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    variants: {
      variant: {
        solid: {},
        outline: { borderWidth: 1 },
        text: { backgroundColor: "transparent" },
      },
      intent: {
        primary: {},
        secondary: {},
        assistive: {},
      },
      size: {
        sm: { paddingHorizontal: 16, height: 36 },
        md: { paddingHorizontal: 24, height: 44 },
        lg: { paddingHorizontal: 28, height: 48 },
        inputButton: { paddingHorizontal: 30, height: 48 },
      },
      fullWidth: {
        true: { width: "100%" },
        false: {},
      },
      shadow: {
        true: theme.shadows.light,
        false: {},
      },
      fill: {
        true: {},
        false: {},
      },
      disabled: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      // ===== SOLID =====
      {
        variant: "solid",
        intent: "primary",
        disabled: false,
        styles: { backgroundColor: theme.colors.red.main },
      },
      {
        variant: "solid",
        intent: "secondary",
        disabled: false,
        styles: { backgroundColor: theme.colors.gray[800] },
      },
      {
        variant: "solid",
        intent: "assistive",
        disabled: false,
        styles: { backgroundColor: theme.colors.gray[800] },
      },

      // ===== OUTLINE (fill=true) =====
      {
        variant: "outline",
        intent: "primary",
        fill: true,
        disabled: false,
        styles: {
          backgroundColor: theme.colors.gray[0],
          borderColor: theme.colors.red.main,
        },
      },
      {
        variant: "outline",
        intent: "secondary",
        fill: true,
        disabled: false,
        styles: {
          backgroundColor: theme.colors.gray[0],
          borderColor: theme.colors.gray[300],
        },
      },
      {
        variant: "outline",
        intent: "assistive",
        fill: true,
        disabled: false,
        styles: {
          backgroundColor: theme.colors.gray[0],
          borderColor: theme.colors.gray[300],
        },
      },

      // ===== OUTLINE (fill=false) =====
      {
        variant: "outline",
        intent: "primary",
        fill: false,
        disabled: false,
        styles: {
          backgroundColor: "transparent",
          borderColor: theme.colors.red.main,
        },
      },
      {
        variant: "outline",
        intent: "secondary",
        fill: false,
        disabled: false,
        styles: {
          backgroundColor: "transparent",
          borderColor: theme.colors.gray[300],
        },
      },
      {
        variant: "outline",
        intent: "assistive",
        fill: false,
        disabled: false,
        styles: {
          backgroundColor: "transparent",
          borderColor: theme.colors.gray[300],
        },
      },

      // ===== DISABLED =====
      {
        variant: "solid",
        disabled: true,
        styles: { backgroundColor: theme.colors.gray[100] },
      },
      {
        variant: "outline",
        fill: true,
        disabled: true,
        styles: {
          backgroundColor: theme.colors.gray[0],
          borderColor: theme.colors.gray[300],
        },
      },
      {
        variant: "outline",
        fill: false,
        disabled: true,
        styles: {
          backgroundColor: "transparent",
          borderColor: theme.colors.gray[300],
        },
      },
    ],
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  text: {
    variants: {
      size: {
        sm: theme.typography.headline4,
        md: theme.typography.headline3,
        lg: theme.typography.headline3,
        inputButton: theme.typography.headline3,
      },
      variant: {
        solid: {},
        outline: {},
        text: {},
      },
      intent: {
        primary: {},
        secondary: {},
        assistive: {},
      },
      disabled: {
        true: { color: theme.colors.gray[300] },
        false: {},
      },
    },
    compoundVariants: [
      // SOLID - 모두 흰색
      {
        variant: "solid",
        disabled: false,
        styles: { color: theme.colors.gray[0] },
      },

      // OUTLINE
      {
        variant: "outline",
        intent: "primary",
        disabled: false,
        styles: { color: theme.colors.red.main },
      },
      {
        variant: "outline",
        intent: "secondary",
        disabled: false,
        styles: { color: theme.colors.red.main },
      },
      {
        variant: "outline",
        intent: "assistive",
        disabled: false,
        styles: { color: theme.colors.gray[900] },
      },

      // TEXT
      {
        variant: "text",
        intent: "primary",
        disabled: false,
        styles: { color: theme.colors.red.main },
      },
      {
        variant: "text",
        intent: "secondary",
        disabled: false,
        styles: { color: theme.colors.gray[600] },
      },
      {
        variant: "text",
        intent: "assistive",
        disabled: false,
        styles: { color: theme.colors.gray[0] },
      },
    ],
  },
}));
