const WebpackConfigMaker = require("cultureamp-front-end-scripts/webpack-config-maker");

const configMaker = new WebpackConfigMaker();
configMaker.usePresets([
  require("cultureamp-front-end-scripts/config/webpack/presets/babel.js"),
  require("cultureamp-front-end-scripts/config/webpack/presets/react-dev-tools.js")
]);
configMaker.setOutputLibrary("amd");
module.exports = configMaker.generateWebpackConfig();
