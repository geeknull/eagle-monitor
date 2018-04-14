import getXpath from './util/xpath.js';

export default {
  init: (cb) => {
    cb();
    document.addEventListener('click', (e) => {
      let xpath = getXpath(e.target);
      console.log('xpath: ', xpath);
    }, false);
  }
}
