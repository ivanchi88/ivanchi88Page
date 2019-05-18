const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./",
  "target": "node", 
  output: {
    path: __dirname + "/build"
    },
  plugins: [
    new CopyPlugin([
      { from: "./static", to: "static/",  context: "./", toType: 'dir', }
    ]),
  ],
};