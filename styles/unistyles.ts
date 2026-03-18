import { StyleSheet } from "react-native-unistyles";
import { colors, typography, shadows } from "./theme";

const lightTheme = {
  colors,
  typography,
  shadows,
} as const;

type AppThemes = {
  light: typeof lightTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
  },
  settings: {
    initialTheme: "light",
  },
});
