const { createProxyMiddleware } = require('http-proxy-middleware');
// For Development Purposes.
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};