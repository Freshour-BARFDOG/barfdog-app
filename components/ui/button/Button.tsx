import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Pressable, PressableProps, Text, View, ViewStyle } from "react-native";

type IconPosition = "left" | "right";

// ============================================================
// BUTTON STYLES (CVA)
// ============================================================

const buttonVariants = cva("flex-row justify-center items-center rounded-lg", {
  variants: {
    variant: {
      solid: "",
      outline: "border",
      text: "bg-transparent",
    },
    intent: {
      primary: "",
      secondary: "",
      assistive: "",
    },
    size: {
      sm: "px-16 h-36",        // padding: 6px 16px, height: 36px
      md: "px-24 h-44",        // padding: 10px 24px, height: 44px
      lg: "px-28 h-48",        // padding: 12px 28px, height: 48px
      inputButton: "px-30 h-48", // padding: 12px 30px, height: 48px
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
    shadow: {
      true: "shadow-light",
      false: "",
    },
    fill: {
      true: "",
      false: "",
    },
    disabled: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    // ===== SOLID =====
    {
      variant: "solid",
      intent: "primary",
      disabled: false,
      class: "bg-red-main",
    },
    {
      variant: "solid",
      intent: "secondary",
      disabled: false,
      class: "bg-gray-800",
    },
    {
      variant: "solid",
      intent: "assistive",
      disabled: false,
      class: "bg-gray-800",
    },

    // ===== OUTLINE (fill=true) =====
    {
      variant: "outline",
      intent: "primary",
      fill: true,
      disabled: false,
      class: "bg-gray-0 border-red-main",
    },
    {
      variant: "outline",
      intent: "secondary",
      fill: true,
      disabled: false,
      class: "bg-gray-0 border-gray-300",
    },
    {
      variant: "outline",
      intent: "assistive",
      fill: true,
      disabled: false,
      class: "bg-gray-0 border-gray-300",
    },

    // ===== OUTLINE (fill=false) =====
    {
      variant: "outline",
      intent: "primary",
      fill: false,
      disabled: false,
      class: "bg-transparent border-red-main",
    },
    {
      variant: "outline",
      intent: "secondary",
      fill: false,
      disabled: false,
      class: "bg-transparent border-gray-300",
    },
    {
      variant: "outline",
      intent: "assistive",
      fill: false,
      disabled: false,
      class: "bg-transparent border-gray-300",
    },

    // ===== DISABLED =====
    {
      variant: "solid",
      disabled: true,
      class: "bg-gray-100",
    },
    {
      variant: "outline",
      fill: true,
      disabled: true,
      class: "bg-gray-0 border-gray-300",
    },
    {
      variant: "outline",
      fill: false,
      disabled: true,
      class: "bg-transparent border-gray-300",
    },
  ],
  defaultVariants: {
    variant: "solid",
    intent: "primary",
    size: "md",
    fullWidth: false,
    shadow: false,
    fill: true,
    disabled: false,
  },
});

// ============================================================
// TEXT STYLES (CVA)
// ============================================================

const textVariants = cva("", {
  variants: {
    size: {
      sm: "text-headline-4",
      md: "text-headline-3",
      lg: "text-headline-3",
      inputButton: "text-headline-3",
    },
    variant: {
      solid: "",
      outline: "",
      text: "",
    },
    intent: {
      primary: "",
      secondary: "",
      assistive: "",
    },
    disabled: {
      true: "text-gray-300",
      false: "",
    },
  },
  compoundVariants: [
    // SOLID - 모두 흰색
    {
      variant: "solid",
      disabled: false,
      class: "text-gray-0",
    },

    // OUTLINE
    {
      variant: "outline",
      intent: "primary",
      disabled: false,
      class: "text-red",
    },
    {
      variant: "outline",
      intent: "secondary",
      disabled: false,
      class: "text-red",
    },
    {
      variant: "outline",
      intent: "assistive",
      disabled: false,
      class: "text-gray-900",
    },

    // TEXT
    {
      variant: "text",
      intent: "primary",
      disabled: false,
      class: "text-red",
    },
    {
      variant: "text",
      intent: "secondary",
      disabled: false,
      class: "text-gray-600",
    },
    {
      variant: "text",
      intent: "assistive",
      disabled: false,
      class: "text-gray-0",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "solid",
    intent: "primary",
    disabled: false,
  },
});

// ============================================================
// COMPONENT
// ============================================================

interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  intent?: VariantProps<typeof buttonVariants>["intent"];
  size?: VariantProps<typeof buttonVariants>["size"];
  disabled?: boolean;
  fullWidth?: boolean;
  shadow?: boolean;
  children: React.ReactNode;
  fill?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  className?: string;
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
  className = "",
  style,
  ...rest
}: ButtonProps) {
  // CVA로 생성된 className과 추가 className 병합
  const buttonClassName = `${buttonVariants({
    variant,
    intent,
    size,
    fullWidth,
    shadow,
    fill,
    disabled,
  })} ${className}`.trim();

  return (
    <Pressable disabled={disabled} {...rest}>
      <View className={buttonClassName} style={style}>
        <View className="flex-1 flex-row justify-center items-center gap-6">
          {icon && iconPosition === "left" && icon}
          <Text
            className={textVariants({
              size,
              variant,
              intent,
              disabled,
            })}
          >
            {children}
          </Text>
          {icon && iconPosition === "right" && icon}
        </View>
      </View>
    </Pressable>
  );
}
