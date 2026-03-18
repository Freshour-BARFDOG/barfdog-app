import { StyleSheet } from "react-native-unistyles";

export const inputFieldStyles = StyleSheet.create((theme) => ({
  // Container
  container: {
    flexDirection: "column" as const,
    gap: 8,
  },
  containerFullWidth: {
    width: "100%",
  },

  // Wrapper
  wrapper: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
  },
  wrapperFullWidth: {
    width: "100%",
  },

  // Field Base
  fieldBase: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    height: 48,
  },
  fieldFlex: {
    flex: 1,
  },

  // Field Variants - Box
  fieldBox: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.gray[0],
  },
  fieldBoxDisabled: {
    backgroundColor: theme.colors.gray[200],
  },
  fieldBoxError: {
    borderColor: theme.colors.red.main,
  },

  // Field Variants - Line
  fieldLine: {
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[500],
    backgroundColor: "transparent",
  },
  fieldLineDisabled: {
    borderBottomColor: theme.colors.gray[400],
  },
  fieldLineError: {
    borderBottomColor: theme.colors.red.main,
  },

  // Label Container
  labelContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
  },

  // Icon Container
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  // Suffix Buttons Container
  suffixContainer: {
    flexDirection: "row" as const,
    gap: 12,
  },

  // Icon Button
  iconButton: {
    width: 24,
    height: 24,
  },

  // Text Input
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500" as const,
    lineHeight: 20,
    letterSpacing: -0.4,
    color: theme.colors.gray[900],
    paddingVertical: 0,
  },

  // Unit Text Container
  unitContainer: {
    marginLeft: 8,
  },

  // Confirm Button
  confirmButton: {
    paddingHorizontal: 32,
    height: 48,
    borderRadius: 8,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.gray[0],
  },
  confirmButtonDisabled: {
    backgroundColor: theme.colors.gray[100],
    borderColor: theme.colors.gray[300],
  },
}));
