import React from "react";
import { Pressable, PressableProps, Text, View, ViewStyle } from "react-native";
import { buttonStyles } from "./Button.styles";

type IconPosition = "left" | "right";

interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: "solid" | "outline" | "text";
  intent?: "primary" | "secondary" | "assistive";
  size?: "sm" | "md" | "lg" | "inputButton";
  disabled?: boolean;
  fullWidth?: boolean;
  shadow?: boolean;
  children: React.ReactNode;
  fill?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  style?: ViewStyle;
}

export default function Button({
  variant = "solid",
  intent = "primary",
  size = "md",
  disabled = false,
  fullWidth = true,
  shadow = false,
  children,
  fill = true,
  icon,
  iconPosition = "left",
  style,
  ...rest
}: ButtonProps) {
  buttonStyles.useVariants({
    variant,
    intent,
    size,
    fullWidth,
    shadow,
    fill,
    disabled,
  });

  return (
    <Pressable disabled={disabled} {...rest}>
      <View style={[buttonStyles.button, style]}>
        <View style={buttonStyles.content}>
          {icon && iconPosition === "left" && icon}
          <Text style={buttonStyles.text}>{children}</Text>
          {icon && iconPosition === "right" && icon}
        </View>
      </View>
    </Pressable>
  );
}
