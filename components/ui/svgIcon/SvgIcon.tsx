import { COLORS } from "@/constants/colors";
import React from "react";
import { SvgProps } from "react-native-svg";

export interface IconProps extends SvgProps {
  src: React.ComponentType<SvgProps>;
  size?: number;
  color?: keyof typeof COLORS;
  width?: number;
  height?: number;
}

const SvgIcon: React.FC<IconProps> = ({
  src: IconComponent,
  size = 24,
  color = "gray900",
  width,
  height,
  ...rest
}) => {
  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      color={COLORS[color]}
      {...rest}
    />
  );
};

export default SvgIcon;
