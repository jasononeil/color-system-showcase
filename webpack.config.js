const WebpackConfigMaker = require("cultureamp-front-end-scripts/webpack-config-maker");

const configMaker = new WebpackConfigMaker();
configMaker.usePresets([
  require("cultureamp-front-end-scripts/config/webpack/presets/babel.js"),
  require("cultureamp-front-end-scripts/config/webpack/presets/react-dev-tools.js")
]);
configMaker.setOutputLibrary("amd");

const config = configMaker.generateWebpackConfig();
config.externals = [
  "css!https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600"
];
module.exports = config;
