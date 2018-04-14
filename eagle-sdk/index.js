import perf from './perf.js';
import resources from './resources.js';
import errorCatch from './errorCatch.js';
import xhrHook from './xhr.js';
import behavior from './behavior.js';

perf.init((perfData) => {
  // console.log('perf', perfData);
});

resources.init((list) => {
  // console.log('resources', list.length === 1 ? list[0] : list);
});

errorCatch.init((err) => {
  console.log('errorCatch', err);
});

xhrHook.init((xhrInfo) => {
  console.log(xhrInfo);
});

behavior.init(() => {
  console.log('behavior init');
});
