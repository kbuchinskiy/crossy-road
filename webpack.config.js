var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin-advanced");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: ["./js/index.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
    publicPath: ""
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src")
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: "./images/**/**",
        flatten: true
      },
      {
        from: "index.html"
      }
    ])
  ]
};