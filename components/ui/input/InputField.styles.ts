import { StyleSheet } from "react-native";
import { colors } from "@/styles/theme";

export const inputFieldStyles = StyleSheet.create({
  // Container
  container: {
    flexDirection: "column",
    gap: 8,
  },
  containerFullWidth: {
    width: "100%",
  },

  // Wrapper
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wrapperFullWidth: {
    width: "100%",
  },

  // Field Base
  fieldBase: {
    flexDirection: "row",
    alignItems: "center",
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
    borderColor: colors.gray[300],
    backgroundColor: colors.gray[0],
  },
  fieldBoxDisabled: {
    backgroundColor: colors.gray[200],
  },
  fieldBoxError: {
    borderColor: colors.red.main,
  },

  // Field Variants - Line
  fieldLine: {
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[500],
    backgroundColor: "transparent",
  },
  fieldLineDisabled: {
    borderBottomColor: colors.gray[400],
  },
  fieldLineError: {
    borderBottomColor: colors.red.main,
  },

  // Label Container
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
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
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: -0.4,
    color: colors.gray[900],
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray[300],
    backgroundColor: colors.gray[0],
  },
  confirmButtonDisabled: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
  },
});