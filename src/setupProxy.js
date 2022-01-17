const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
    changeOrigin: true,
    router: {
        '/api': 'https://demo-apptrix.myjetbrains.com'
    }
    })
  );
}