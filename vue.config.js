// vue.config.js
const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/styles/variables.sass")],
    });
}

module.exports = {
  devServer: {
    host: "localhost",
  },
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type => addStyleResource(config.module.rule("sass").oneOf(type)));
  },

  lintOnSave: false,
};
