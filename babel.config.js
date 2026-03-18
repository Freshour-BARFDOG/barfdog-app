module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-unistyles/plugin", { root: __dirname }],
      "react-native-reanimated/plugin", // ⚠️ 이 플러그인은 마지막에 위치해야 함
    ],
  };
};
