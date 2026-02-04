import Text from "@/components/ui/text/Text";
import React, { forwardRef, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { inputFieldStyles } from "./InputField.styles";

// ============================================================
// TYPES
// ============================================================

type LabelColor = "gray600" | "gray700" | "gray800" | "gray900";
type LabelType = "label4" | "headline4";

interface InputFieldProps extends Omit<TextInputProps, "onChange" | "onBlur"> {
  /** 스타일/상태 */
  disabled?: boolean;
  error?: string;
  success?: string;
  variant?: "box" | "line";
  fullWidth?: boolean;

  /** UI 옵션 */
  masking?: boolean;
  maskingButton?: boolean;
  confirmButton?: boolean;
  confirmButtonText?: string;
  confirmButtonDisabled?: boolean;
  clearButton?: boolean;
  searchButton?: boolean;
  unit?: string;

  /** 라벨 */
  label?: string;
  labelColor?: LabelColor;
  labelType?: LabelType;
  isRequired?: boolean;

  /** 이벤트 */
  onChange?: (text: string) => void;
  onBlur?: () => void;
  onReset?: () => void;
  onSubmit?: () => void;

  /** 아이콘 */
  searchIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  visibilityIcon?: React.ReactNode;
  visibilityOffIcon?: React.ReactNode;

  /** 기타 */
  className?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

// ============================================================
// INPUT LABEL COMPONENT
// ============================================================

interface InputLabelProps {
  label: string;
  labelType: LabelType;
  labelColor: LabelColor;
  isRequired?: boolean;
}

const InputLabel = ({
  label,
  labelType,
  labelColor,
  isRequired,
}: InputLabelProps) => {
  return (
    <View style={inputFieldStyles.labelContainer}>
      <Text type={labelType} color={labelColor}>
        {label}
      </Text>
      {isRequired && (
        <Text type={labelType} color="red">
          *
        </Text>
      )}
    </View>
  );
};

// ============================================================
// INPUT STATUS MESSAGE COMPONENT
// ============================================================

interface InputStatusMessageProps {
  type: "error" | "success";
  message: string;
}

const InputStatusMessage = ({ type, message }: InputStatusMessageProps) => {
  return (
    <Text type="body3" color={type === "error" ? "red" : "blue500"}>
      {message}
    </Text>
  );
};

// ============================================================
// ICON BUTTON COMPONENT
// ============================================================

interface IconButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const IconButton = ({ onPress, children, disabled }: IconButtonProps) => {
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={inputFieldStyles.iconButton}
    >
      <Animated.View style={{ opacity }}>{children}</Animated.View>
    </Pressable>
  );
};

// ============================================================
// INPUT FIELD COMPONENT
// ============================================================

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      disabled = false,
      error,
      success,
      onChange,
      onBlur,
      variant = "box",
      fullWidth = true,

      masking = false,
      maskingButton = false,
      confirmButton = false,
      confirmButtonText = "입력",
      confirmButtonDisabled = false,
      clearButton = false,
      searchButton = false,
      onReset,
      onSubmit,

      className,
      label,
      isRequired,
      labelType = "label4",
      labelColor = "gray600",
      unit,

      searchIcon,
      clearIcon,
      visibilityIcon,
      visibilityOffIcon,

      secureTextEntry,
      containerStyle,
      inputStyle,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<TextInput | null>(null);
    const [isMasked, setIsMasked] = useState<boolean>(masking);

    const handlePressInput = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.focus();
      } else {
        innerRef.current?.focus();
      }
    };

    const handleToggleMasking = () => {
      setIsMasked((prev) => !prev);
    };

    const handleReset = () => {
      if (onReset) {
        onReset();
      }
    };

    const handleSubmit = () => {
      if (onSubmit) {
        onSubmit();
      }
    };

    // 스타일 조합
    const getFieldStyle = () => {
      return [
        inputFieldStyles.fieldBase,
        variant === "box" && inputFieldStyles.fieldBox,
        variant === "box" && disabled && inputFieldStyles.fieldBoxDisabled,
        variant === "box" && error && inputFieldStyles.fieldBoxError,
        variant === "line" && inputFieldStyles.fieldLine,
        variant === "line" && disabled && inputFieldStyles.fieldLineDisabled,
        variant === "line" && error && inputFieldStyles.fieldLineError,
        confirmButton && inputFieldStyles.fieldFlex,
      ];
    };

    return (
      <View
        style={[
          inputFieldStyles.container,
          fullWidth && inputFieldStyles.containerFullWidth,
          containerStyle,
        ]}
      >
        {/* Label */}
        {label && (
          <InputLabel
            label={label}
            labelType={labelType}
            labelColor={labelColor}
            isRequired={isRequired}
          />
        )}

        <View
          style={[
            inputFieldStyles.wrapper,
            fullWidth && inputFieldStyles.wrapperFullWidth,
          ]}
        >
          <Pressable onPress={handlePressInput} style={getFieldStyle()}>
            {/* Search Icon */}
            {searchButton && searchIcon && (
              <View style={inputFieldStyles.iconContainer}>{searchIcon}</View>
            )}

            {/* Input */}
            <TextInput
              {...props}
              ref={ref || innerRef}
              editable={!disabled}
              secureTextEntry={isMasked || secureTextEntry}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onSubmit}
              placeholderTextColor="#CCCCCC"
              style={[inputFieldStyles.textInput, inputStyle]}
            />

            {/* Unit */}
            {unit && (
              <Text
                type="headline3"
                color="gray900"
                style={inputFieldStyles.unitContainer}
              >
                {unit}
              </Text>
            )}

            {/* Suffix Buttons */}
            <View style={inputFieldStyles.suffixContainer}>
              {/* Masking Toggle */}
              {masking &&
                maskingButton &&
                visibilityIcon &&
                visibilityOffIcon && (
                  <IconButton onPress={handleToggleMasking}>
                    {isMasked ? visibilityOffIcon : visibilityIcon}
                  </IconButton>
                )}

              {/* Clear Button */}
              {clearButton && clearIcon && (
                <IconButton onPress={handleReset}>{clearIcon}</IconButton>
              )}
            </View>
          </Pressable>

          {/* Confirm Button */}
          {confirmButton && (
            <Pressable
              onPress={handleSubmit}
              disabled={confirmButtonDisabled}
              style={[
                inputFieldStyles.confirmButton,
                confirmButtonDisabled && inputFieldStyles.confirmButtonDisabled,
              ]}
            >
              <Text
                type="headline3"
                color={confirmButtonDisabled ? "gray300" : "red"}
              >
                {confirmButtonText}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Status Messages */}
        {error && <InputStatusMessage type="error" message={error} />}
        {success && <InputStatusMessage type="success" message={success} />}
      </View>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
