const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devServer: {
    host: '172.16.123.1',
    port: 5004,
    public: 'echo.waret.net',
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/oidc-client/dist/oidc-client.min.js', to: 'js' }
      ])
    ]
  }
}
