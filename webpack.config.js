const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports = {
  /** "mode"
   * the environment - development, production, none. tells webpack 
   * to use its built-in optimizations accordingly. default is production 
   */
  mode: process.env.NODE_ENV,
  /** "entry"
   * the entry point 
   */
  entry: "./client/index.jsx",
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
  ],
  output: {
    /** "path"
     * the folder path of the output file 
     */
    path: path.resolve(__dirname, "build"),
    /** "filename"
     * the name of the output file 
     */
    filename: "bundle.js"
  },
  /** "target"
   * setting "node" as target app (server side), and setting it as "web" is 
   * for browser (client side). Default is "web"
   */
  //target: "web",
  devServer: {
    /** "port" 
     * port of dev server
    */
    port: "8080",
    /** "static" 
     * This property tells Webpack what static file it should serve
    */
    static: {
      directory: path.resolve(__dirname, 'build')
    },
    /** "open" 
     * opens the browser after server is successfully started
    */
    open: true,
    /** "hot"
     * enabling and disabling HMR. takes "true", "false" and "only". 
     * "only" is used if enable Hot Module Replacement without page 
     * refresh as a fallback in case of build failures
     */
    hot: true,
    /** "liveReload"
     * disable live reload on the browser. "hot" must be set to false for this to work
    */
    liveReload: true,
    historyApiFallback: true, // fall back to entry path every time it loads for react router
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  resolve: {
    /** "extensions" 
     * If multiple files share the same name but have different extensions, webpack will 
     * resolve the one with the extension listed first in the array and skip the rest. 
     * This is what enables users to leave off the extension when importing
     */
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test: /.(css|scss)$/,
        /* /\.s[ac]ss$/i */
        exclude: /(node_modules)/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
}