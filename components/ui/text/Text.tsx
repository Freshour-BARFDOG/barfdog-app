import React from "react";
import { Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native";
import { textStyles, TextType, TextColor, TextAlign } from "./Text.styles";

type Props = Omit<RNTextProps, "style"> & {
  type?: TextType;
  color?: TextColor;
  align?: TextAlign;
  underline?: boolean;
  lineThrough?: boolean;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
};

export default function Text({
  type = "body2",
  color = "gray900",
  align = "left",
  underline = false,
  lineThrough = false,
  style,
  children,
  ...rest
}: Props) {
  return (
    <RNText
      style={[
        textStyles[type],
        textStyles[color],
        textStyles[align],
        underline && textStyles.underline,
        lineThrough && textStyles.lineThrough,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
