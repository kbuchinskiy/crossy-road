var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin-advanced");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: ["./js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
    publicPath: ""
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["es2015", "es2016"] }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./assets/**/**",
        flatten: true
      },
      {
        from: "index.html"
      }
    ])
  ]
};
