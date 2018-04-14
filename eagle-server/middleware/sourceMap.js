const fs = require('fs');
const path = require('path');
let sourceMap = require('source-map');

let sourcemapFilePath = path.join(__dirname, '../../website/client/react-app/dist/main.bundle.js.map');

let sourcesPathMap = {};
function fixPath(filepath) {
  return filepath.replace(/\.[\.\/]+/g, "");
}

module.exports = async (ctx, next) => {
  if (ctx.path === '/sourcemap') {
    let sourceMapContent = fs.readFileSync(sourcemapFilePath, 'utf-8');
    let fileObj = JSON.parse(sourceMapContent);
    let sources = fileObj.sources;

    sources.map(item => {
      sourcesPathMap[fixPath(item)] = item;
    });

    let findPos = {
      line: 554,
      column: 17,
    };

    let findPos_ = {
      line: 10185,
      column: 489,
    };

    let consumer = await new sourceMap.SourceMapConsumer(sourceMapContent);
    let result = consumer.originalPositionFor(findPos);

    console.log(result, 'xxx');

    // source line column name

    let originSource = sourcesPathMap[result.source];

    let sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)];
    let sourcesContentArr = sourcesContent.split('\n');
    let sourcesContentMap = {};

    sourcesContentArr.forEach((item, index) => {
      sourcesContentMap[index] = item;
    });

    result.sourcesContentMap = sourcesContentMap;

    ctx.body = result;
  }

  return next();
};
