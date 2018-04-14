let formatError = (errObj) => {
  let col = errObj.column || errObj.columnNumber; // Safari Firefox
  let row = errObj.line || errObj.lineNumber; // Safari Firefox
  let message = errObj.message;
  let name = errObj.name;

  let {stack} = errObj;
  if (stack) {
    let matchUrl = stack.match(/https?:\/\/[^\n]+/);
    let urlFirstStack = matchUrl ? matchUrl[0] : '';
    let regUrlCheck = /https?:\/\/(\S)*\.js/;

    let resourceUrl = '';
    if (regUrlCheck.test(urlFirstStack)) {
      resourceUrl = urlFirstStack.match(regUrlCheck)[0];
    }

    let stackCol = null;
    let stackRow = null;
    let posStack = urlFirstStack.match(/:(\d+):(\d+)/);
    if (posStack && posStack.length >= 3) {
      [, stackCol, stackRow] = posStack;
    }

    // TODO formatStack
    return {
      content: stack,
      col: Number(col || stackCol),
      row: Number(row || stackRow),
      message, name, resourceUrl
    };
  }

  return {
    row, col, message, name
  }
};

let errorCatch = {
  init: (cb) => {
    let _originOnerror = window.onerror;
    window.onerror = (...arg) => {
      let [errorMessage, scriptURI, lineNumber, columnNumber, errorObj] = arg;
      // console.log(arg, 'cuowu');
      let errorInfo = formatError(errorObj);
      errorInfo._errorMessage = errorMessage;
      errorInfo._scriptURI = scriptURI;
      errorInfo._lineNumber = lineNumber;
      errorInfo._columnNumber = columnNumber;
      errorInfo.type = 'onerror';
      cb(errorInfo);
      _originOnerror && _originOnerror.apply(window, arg);
    };

    let _originOnunhandledrejection = window.onunhandledrejection;
    window.onunhandledrejection = (...arg) => {
      let e = arg[0];
      let reason = e.reason;
      cb({
        type: e.type || 'unhandledrejection',
        reason
      });
      _originOnunhandledrejection && _originOnunhandledrejection.apply(window, arg);
    };
  },
};

export default errorCatch;
