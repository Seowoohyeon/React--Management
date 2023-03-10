// react-scripts의 버전이 2 이상인 경우 http-proxy-middleware를 설치해 setupProxy.js라는 파일을 통해 proxy 설정을 해줘야함

const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:5000" }));
};