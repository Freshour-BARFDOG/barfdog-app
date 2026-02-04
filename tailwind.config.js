/** @type {import('tailwindcss').Config} */

const range = (n) => Array.from({ length: n + 1 }, (_, i) => i);

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      colors: {
        red: {
          dark: "#A90910",
          main: "#BE1A21",
          pastel: "#E5696E",
          light: "#F1A3A6",
          "pastel-pink": "#FBD7D8",
          "light-pink": "#FFEEEE",
          "pink-white": "#FFFAFA",
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
          "gray-80": "rgba(43, 43, 43, 0.8)",
          "gray-60": "rgba(43, 43, 43, 0.6)",
          "gray-30": "rgba(43, 43, 43, 0.3)",
          "red-50": "rgba(190, 26, 33, 0.5)",
          "red-30": "rgba(190, 26, 33, 0.3)",
          "red-15": "rgba(190, 26, 33, 0.15)",
        },
        kakao: {
          background: "#FDDC3F",
          font: "rgba(0, 0, 0, 0.85)",
        },
        naver: {
          background: "#00C73C",
          font: "#FFFFFF",
        },
      },
      fontSize: {
        // Display
        "display-1": [
          "40px",
          { lineHeight: "160%", letterSpacing: "-0.6px", fontWeight: "700" },
        ],
        "display-2": [
          "32px",
          { lineHeight: "150%", letterSpacing: "-0.6px", fontWeight: "700" },
        ],
        // Title
        "title-1": [
          "28px",
          { lineHeight: "150%", letterSpacing: "-0.6px", fontWeight: "700" },
        ],
        "title-2": [
          "24px",
          { lineHeight: "150%", letterSpacing: "-0.6px", fontWeight: "700" },
        ],
        "title-3": [
          "22px",
          { lineHeight: "150%", letterSpacing: "-0.6px", fontWeight: "700" },
        ],
        "title-4": [
          "20px",
          { lineHeight: "150%", letterSpacing: "-0.6px", fontWeight: "700" },
        ],
        // Headline
        "headline-1": [
          "18px",
          { lineHeight: "150%", letterSpacing: "-0.4px", fontWeight: "700" },
        ],
        "headline-2": [
          "16px",
          { lineHeight: "148%", letterSpacing: "-0.4px", fontWeight: "700" },
        ],
        "headline-3": [
          "16px",
          { lineHeight: "148%", letterSpacing: "-0.4px", fontWeight: "600" },
        ],
        "headline-4": [
          "14px",
          { lineHeight: "140%", letterSpacing: "-0.4px", fontWeight: "600" },
        ],
        // Label
        "label-1": [
          "18px",
          { lineHeight: "150%", letterSpacing: "-0.4px", fontWeight: "500" },
        ],
        "label-2": [
          "16px",
          { lineHeight: "148%", letterSpacing: "-0.4px", fontWeight: "500" },
        ],
        "label-3": [
          "14px",
          { lineHeight: "140%", letterSpacing: "-0.4px", fontWeight: "700" },
        ],
        "label-4": [
          "14px",
          { lineHeight: "140%", letterSpacing: "-0.4px", fontWeight: "500" },
        ],
        // Body
        "body-1": [
          "18px",
          { lineHeight: "150%", letterSpacing: "-0.4px", fontWeight: "400" },
        ],
        "body-2": [
          "16px",
          { lineHeight: "148%", letterSpacing: "-0.4px", fontWeight: "400" },
        ],
        "body-3": [
          "14px",
          { lineHeight: "140%", letterSpacing: "-0.4px", fontWeight: "400" },
        ],
        caption: [
          "12px",
          { lineHeight: "140%", letterSpacing: "-0.4px", fontWeight: "400" },
        ],
        "caption-2": [
          "12px",
          { lineHeight: "140%", letterSpacing: "-0.4px", fontWeight: "500" },
        ],
      },
      boxShadow: {
        light:
          "-1px -1px 1px 0px rgba(255, 255, 255, 0.08) inset, 0px 0px 1px 0px rgba(0, 0, 0, 0.12), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
        normal:
          "-1px -1px 2px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
        strong:
          "-1px -1px 2px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 8px 0px rgba(0, 0, 0, 0.08), 0px 10px 20px 0px rgba(0, 0, 0, 0.10)",
      },
      spacing: Object.fromEntries(
        range(200).map((v) => [v, `${v}px`]), // 0~200까지 px 스케일
      ),
      borderRadius: Object.fromEntries(
        range(20).map((v) => [v, `${v}px`]), // 0~20까지 px 스케일
      ),
    },
  },
  plugins: [],
};
