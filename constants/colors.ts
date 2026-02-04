export const colors = {
  red: {
    dark: "#A90910",
    main: "#BE1A21",
    pastel: "#E5696E",
    light: "#F1A3A6",
    pastelPink: "#FBD7D8",
    lightPink: "#FFEEEE",
    pinkWhite: "#FFFAFA",
  },
  blue: {
    600: "#006BEE",
    500: "#0274FF",
    400: "#3992FF",
    300: "#78B5FF",
    200: "#A4CDFF",
    100: "#CFE5FF",
    50: "#ECF5FF",
  },
  yellow: {
    600: "#FFC200",
    500: "#FFCD2D",
    400: "#FFDD70",
    300: "#FFE592",
    200: "#FFF0BF",
    100: "#FFF4DE",
    50: "#FFFAF0",
  },
  green: {
    600: "#06AE62",
    500: "#24BB77",
    400: "#5CCC9A",
    300: "#95DEBD",
    200: "#C5EDDB",
    100: "#E6F7EF",
    50: "#F2FBF7",
  },
  gray: {
    900: "#2B2B2B",
    800: "#454545",
    700: "#626262",
    600: "#7C7C7C",
    500: "#959595",
    400: "#B3B3B3",
    300: "#CCCCCC",
    200: "#EEEEEE",
    100: "#F1F2F4",
    50: "#F8F9FB",
    0: "#FFFFFF",
  },
  dimmed: {
    gray80: "rgba(43, 43, 43, 0.8)",
    gray60: "rgba(43, 43, 43, 0.6)",
    gray30: "rgba(43, 43, 43, 0.3)",
    red50: "rgba(190, 26, 33, 0.5)",
    red30: "rgba(190, 26, 33, 0.3)",
    red15: "rgba(190, 26, 33, 0.15)",
  },
  kakao: {
    background: "#FDDC3F",
    font: "rgba(0, 0, 0, 0.85)",
  },
  naver: {
    background: "#00C73C",
    font: "#FFFFFF",
  },
} as const;

export const COLORS = {
  // Red
  redDark: colors.red.dark,
  redMain: colors.red.main,
  redPastel: colors.red.pastel,
  redLight: colors.red.light,
  redPastelPink: colors.red.pastelPink,
  redLightPink: colors.red.lightPink,
  redPinkWhite: colors.red.pinkWhite,

  // Blue
  blue600: colors.blue[600],
  blue500: colors.blue[500],
  blue400: colors.blue[400],
  blue300: colors.blue[300],
  blue200: colors.blue[200],
  blue100: colors.blue[100],
  blue50: colors.blue[50],

  // Yellow
  yellow600: colors.yellow[600],
  yellow500: colors.yellow[500],
  yellow400: colors.yellow[400],
  yellow300: colors.yellow[300],
  yellow200: colors.yellow[200],
  yellow100: colors.yellow[100],
  yellow50: colors.yellow[50],

  // Green
  green600: colors.green[600],
  green500: colors.green[500],
  green400: colors.green[400],
  green300: colors.green[300],
  green200: colors.green[200],
  green100: colors.green[100],
  green50: colors.green[50],

  // Gray
  gray900: colors.gray[900],
  gray800: colors.gray[800],
  gray700: colors.gray[700],
  gray600: colors.gray[600],
  gray500: colors.gray[500],
  gray400: colors.gray[400],
  gray300: colors.gray[300],
  gray200: colors.gray[200],
  gray100: colors.gray[100],
  gray50: colors.gray[50],
  gray0: colors.gray[0],

  // Dimmed
  dimmedGray80: colors.dimmed.gray80,
  dimmedGray60: colors.dimmed.gray60,
  dimmedGray30: colors.dimmed.gray30,
  dimmedRed50: colors.dimmed.red50,
  dimmedRed30: colors.dimmed.red30,
  dimmedRed15: colors.dimmed.red15,

  // Social
  kakaoBackground: colors.kakao.background,
  kakaoFont: colors.kakao.font,
  naverBackground: colors.naver.background,
  naverFont: colors.naver.font,
} as const;
