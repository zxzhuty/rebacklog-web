module.exports = {
  devServer: {
    proxy: {
      "/dologin": {
        target: "https://localhost:4000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/dologin": "/connect/token"
        }
      },
      "/api": {
        target: "https://localhost:5000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    },
    port: 5001,
    https: false
  }
};
