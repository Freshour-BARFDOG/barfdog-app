import { StyleSheet } from "react-native";

export const loginFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    rowGap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    rowGap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    rowGap: 12,
    marginBottom: 16,
  },
  accountLinkWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  socialLoginWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
