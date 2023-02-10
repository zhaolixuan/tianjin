module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 7"],
      overrideBrowserslist: ["> 0.15% in CN", "Android >= 4.0", "iOS >= 7"],
    },
    "postcss-pxtorem": {
      rootValue: 37.5,
      selectorBlackList: [".no-rem-"],
      propList: ["*"],
      exclude: /node_modules/i,
      minPixelValue: 2,
    },
  },
};
