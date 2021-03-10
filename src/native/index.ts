import { getPlatform } from "../browser";
import functions from "./native";

class Native {
  private isAndroid;
  private isIos;

  constructor() {
    const platform = getPlatform();
    this.isAndroid = platform.isAndroid;
    this.isIos = platform.isPhone;

    // 动态创建函数
    functions.common.forEach((func) => {
      let functionName;
      if (typeof func === "string") {
        functionName = func;
      } else {
        functionName = func.functionName;
      }

      const {
        params,
        customAndroidCallback,
        customIosCallback,
        async,
        customErrorHandler,
      } = func as any;

      const isNoParams =
        !params || !Array.isArray(params) || params.length === 0;
      const paramsStr = isNoParams
        ? ""
        : params.reduce(
            (pre, cur, i) =>
              i === params.length - 1 ? pre + cur : pre + cur + ",",
            ""
          );

      // sync function template
      const funcTemplate = () => {
        if (async) {
          return (
            "return new Promise((resolve, reject) => {" +
            "try {" +
            "if (this.isAndroid) {" +
            (typeof customAndroidCallback === "function"
              ? customAndroidCallback()
              : "const data = xylink['" +
                functionName +
                "'](" +
                paramsStr +
                ");" +
                "resolve(data);") +
            "}" +
            "else if(this.isIos) {" +
            (typeof customIosCallback === "function"
              ? customIosCallback()
              : "window.webkit.messageHandlers." +
                functionName +
                ".postMessage([" +
                (paramsStr
                  ? paramsStr + ",'" + functionName
                  : "'" + functionName) +
                "']);" +
                "window['" +
                functionName +
                "'] = data => resolve(data);") +
            "}" +
            "else {" +
            "console.warn('Native::unknown browser.');" +
            "}" +
            "} catch (error) {" +
            "console.warn('Native::" +
            functionName +
            ":', error);" +
            (typeof customErrorHandler === "function"
              ? customErrorHandler()
              : "") +
            "}" +
            "});"
          );
        } else {
          return (
            "try {" +
            "if (this.isAndroid) {" +
            (typeof customAndroidCallback === "function"
              ? customAndroidCallback()
              : "xylink['" + functionName + "'](" + paramsStr + ");" + "}") +
            "else if(this.isIos) {" +
            (typeof customIosCallback === "function"
              ? customIosCallback()
              : "window.webkit.messageHandlers." +
                functionName +
                ".postMessage([" +
                paramsStr +
                "]);" +
                "}") +
            "else {" +
            "console.warn('Native::unknown browser.');" +
            "}" +
            "} catch (error) {" +
            "console.warn('Native::" +
            functionName +
            ":', error);" +
            (typeof customErrorHandler === "function"
              ? customErrorHandler()
              : "") +
            "}"
          );
        }
      };

      this[functionName] = new Function(paramsStr, funcTemplate());

      // TODO devices special handler
    });

    // Special native functions register here.
  }
}

export default new Native();
