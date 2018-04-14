const log = require('debug')('sleep'); log.enabled = true;
const log_root = require('debug')('root'); log_root.enabled = true;
const leftPad = require('left-pad');

const sleep = t => new Promise((r) => setTimeout(r, t));

const random = (start, end) => () => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return parseInt(start + Math.random() * (end-start));
};

let resourceMap = {
  'qrcode_for_gh_1280.jpg': 1200,
  'jquery-3.3.1.js': 100,
  'bootstrap.css': random(0, 100),
  'lodash-4.17.5.js': 1,
  '/api/user': random(200),
  '/api/list': 1000,
};
let rootPath = ['/', '/index.html'];

module.exports = async (ctx, next) => {
  let _path = ctx.path;

  // if (ctx.path.includes('abc')) {
  //   ctx.redirect('http://127.0.0.1:3003');
  // }

  if (rootPath.includes(_path)) {
    await sleep(random(30)());
    return next();
  }

  for (let key in resourceMap) {
    if (_path.includes(key)) {
      let delay = resourceMap[key];
      delay = typeof delay === 'function' ? delay() : delay;
      await sleep(delay);
      log(leftPad(key, 20, '·'), delay);
      return next();
    }
  }

  return next();
};
