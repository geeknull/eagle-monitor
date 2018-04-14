const Koa = require('koa');
const app = new Koa();
const port = 3009;

const sourceMapMiddleware = require('./middleware/sourceMap.js');

app.use(sourceMapMiddleware);

app.listen(port, () => {
  console.log(`eagle-server in port ${port}`);
});
