import {onload} from './util.js';

// 过滤无效数据
function filterTime(a, b) {
  return (a > 0 && b > 0 && (a - b) >= 0) ? (a - b) : undefined;
}

let resolvePerformanceTiming = (timing) => {
  let o = {
    initiatorType: timing.initiatorType,
    name: timing.name,
    duration: parseInt(timing.duration),
    redirect: filterTime(timing.redirectEnd, timing.redirectStart), // 重定向
    dns: filterTime(timing.domainLookupEnd, timing.domainLookupStart), // DNS解析
    connect: filterTime(timing.connectEnd, timing.connectStart), // TCP建连
    network: filterTime(timing.connectEnd, timing.startTime), // 网络总耗时

    send: filterTime(timing.responseStart, timing.requestStart), // 发送开始到接受第一个返回
    receive: filterTime(timing.responseEnd, timing.responseStart), // 接收总时间
    request: filterTime(timing.responseEnd, timing.requestStart), // 总时间

    ttfb: filterTime(timing.responseStart, timing.requestStart), // 首字节时间
  };

  return o;
};

let resolveEntries = (entries) => entries.map(item => resolvePerformanceTiming(item));

let resources = {
  init: (cb) => {
    let performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
    if (!performance || !performance.getEntries) {
      return void 0;
    }

    if (window.PerformanceObserver) {
      let observer = new window.PerformanceObserver((list) => {
        try {
          let entries = list.getEntries();
          cb(resolveEntries(entries));
        } catch (e) {
          console.error(e);
        }
      });
      observer.observe({
        entryTypes: ['resource']
      })
    } else {
      onload(() => {
        let entries = performance.getEntriesByType('resource');
        cb(resolveEntries(entries));
      });
    }
  },
};

export default resources;
