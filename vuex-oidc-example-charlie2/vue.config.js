module.exports = {
  devServer: {
    host: '172.16.123.1',
    public: 'charlie.waret.net',
    disableHostCheck: true,
    port: 5002
  },
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      excludeChunks: ['silent-renew-oidc']
    },
    silentrenewoidc: {
      entry: 'src/silent-renew-oidc.js',
      template: 'public/silent-renew-oidc.html',
      filename: 'silent-renew-oidc.html',
      excludeChunks: ['app']
    }
  }
}
