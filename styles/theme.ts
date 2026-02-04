import { TextStyle } from 'react-native';

// Colors
export const colors = {
  red: {
    dark: '#A90910',
    main: '#BE1A21',
    pastel: '#E5696E',
    light: '#F1A3A6',
    pastelPink: '#FBD7D8',
    lightPink: '#FFEEEE',
    pinkWhite: '#FFFAFA',
  },
  blue: {
    600: '#006BEE',
    500: '#0274FF',
    400: '#3992FF',
    300: '#78B5FF',
    200: '#A4CDFF',
    100: '#CFE5FF',
    50: '#ECF5FF',
  },
  yellow: {
    600: '#FFC200',
    500: '#FFCD2D',
    400: '#FFDD70',
    300: '#FFE592',
    200: '#FFF0BF',
    100: '#FFF4DE',
    50: '#FFFAF0',
  },
  green: {
    600: '#06AE62',
    500: '#24BB77',
    400: '#5CCC9A',
    300: '#95DEBD',
    200: '#C5EDDB',
    100: '#E6F7EF',
    50: '#F2FBF7',
  },
  gray: {
    900: '#2B2B2B',
    800: '#454545',
    700: '#626262',
    600: '#7C7C7C',
    500: '#959595',
    400: '#B3B3B3',
    300: '#CCCCCC',
    200: '#EEEEEE',
    100: '#F1F2F4',
    50: '#F8F9FB',
    0: '#FFFFFF',
  },
  dimmed: {
    gray80: 'rgba(43, 43, 43, 0.8)',
    gray60: 'rgba(43, 43, 43, 0.6)',
    gray30: 'rgba(43, 43, 43, 0.3)',
    red50: 'rgba(190, 26, 33, 0.5)',
    red30: 'rgba(190, 26, 33, 0.3)',
    red15: 'rgba(190, 26, 33, 0.15)',
  },
  kakao: {
    background: '#FDDC3F',
    font: 'rgba(0, 0, 0, 0.85)',
  },
  naver: {
    background: '#00C73C',
    font: '#FFFFFF',
  },
} as const;

// Typography
export const typography = {
  // Display
  display1: {
    fontSize: 40,
    lineHeight: 40 * 1.6,
    letterSpacing: -0.6,
    fontWeight: '700',
  } as TextStyle,
  display2: {
    fontSize: 32,
    lineHeight: 32 * 1.5,
    letterSpacing: -0.6,
    fontWeight: '700',
  } as TextStyle,
  // Title
  title1: {
    fontSize: 28,
    lineHeight: 28 * 1.5,
    letterSpacing: -0.6,
    fontWeight: '700',
  } as TextStyle,
  title2: {
    fontSize: 24,
    lineHeight: 24 * 1.5,
    letterSpacing: -0.6,
    fontWeight: '700',
  } as TextStyle,
  title3: {
    fontSize: 22,
    lineHeight: 22 * 1.5,
    letterSpacing: -0.6,
    fontWeight: '700',
  } as TextStyle,
  title4: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    letterSpacing: -0.6,
    fontWeight: '700',
  } as TextStyle,
  // Headline
  headline1: {
    fontSize: 18,
    lineHeight: 18 * 1.5,
    letterSpacing: -0.4,
    fontWeight: '700',
  } as TextStyle,
  headline2: {
    fontSize: 16,
    lineHeight: 16 * 1.48,
    letterSpacing: -0.4,
    fontWeight: '700',
  } as TextStyle,
  headline3: {
    fontSize: 16,
    lineHeight: 16 * 1.48,
    letterSpacing: -0.4,
    fontWeight: '600',
  } as TextStyle,
  headline4: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: -0.4,
    fontWeight: '600',
  } as TextStyle,
  // Label
  label1: {
    fontSize: 18,
    lineHeight: 18 * 1.5,
    letterSpacing: -0.4,
    fontWeight: '500',
  } as TextStyle,
  label2: {
    fontSize: 16,
    lineHeight: 16 * 1.48,
    letterSpacing: -0.4,
    fontWeight: '500',
  } as TextStyle,
  label3: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: -0.4,
    fontWeight: '700',
  } as TextStyle,
  label4: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: -0.4,
    fontWeight: '500',
  } as TextStyle,
  // Body
  body1: {
    fontSize: 18,
    lineHeight: 18 * 1.5,
    letterSpacing: -0.4,
    fontWeight: '400',
  } as TextStyle,
  body2: {
    fontSize: 16,
    lineHeight: 16 * 1.48,
    letterSpacing: -0.4,
    fontWeight: '400',
  } as TextStyle,
  body3: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: -0.4,
    fontWeight: '400',
  } as TextStyle,
  // Caption
  caption: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    letterSpacing: -0.4,
    fontWeight: '400',
  } as TextStyle,
  caption2: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    letterSpacing: -0.4,
    fontWeight: '500',
  } as TextStyle,
} as const;

// Shadows (React Native shadow properties)
export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2, // Android
  },
  normal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4, // Android
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8, // Android
  },
} as const;

// Theme object combining all design tokens
export const theme = {
  colors,
  typography,
  shadows,
} as const;

// Type exports for TypeScript
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Shadows = typeof shadows;
export type Theme = typeof theme;