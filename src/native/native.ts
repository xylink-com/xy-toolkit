// Register native function here, then native functions will mount on Native object.

export default {
  // Common function works both on android and ios,which will register on both devices.
  common: [
    {
      functionName: "setTitle", // Function name should be sole.
      params: ["title"], // Function params.
      // customAndroidCallback: function() {}
      // customIosCallback: function() {}
      // customErrorHandler: function() {}
    },
    {
      functionName: "setCloseCallback",
      params: ["funcName", "backName"],
    },
    "webViewGoBack",
    "close",
    {
      functionName: "redirect",
      params: ["url", "title", "isAbsolutePath"],
    },
    {
      functionName: "forward",
      params: ["url", "title", "isAbsolute"],
    },
    {
      functionName: "setAction",
      params: ["actionName", "isHighlight", "callback", "type"],
    },
    {
      functionName: "weblog",
      params: ["name", "message"],
    },
    {
      functionName: "scanQRCode",
      params: ["func"],
    },
    {
      functionName: "shareToWeChat",
      params: ["params"],
    },
    {
      functionName: "setCacheData",
      params: ["key", "val"],
    },
    {
      functionName: "getCacheData",
      params: ["key"],
      async: true,
      customErrorHandler: function () {
        return "resolve(store.get(key));";
      },
    },
    {
      functionName: "callPhone",
      params: ["phone"],
    },
    {
      functionName: "makeCall",
      params: ["id", "mute", "camera", "noPwd"],
    },
    {
      functionName: "downloadFile",
      params: ["url"],
    },
    {
      functionName: "noticeNative",
      params: ["jsonStr"],
    },
    {
      functionName: "showOrHideToobar",
      params: ["trueOrFalse"],
    },
    {
      functionName: "getUserProfile",
      async: true,
    },
    {
      functionName: "getMonitorList",
      async: true,
    },
    {
      functionName: "optionMonitorItem",
      params: ["key", "val"],
    },
    {
      functionName: "closeMonitorPage",
      params: ["key", "val"],
    },
    {
      functionName: "faceCheck",
      params: ["certifyId", "funName"],
      async: true,
    },
  ],
  // Android function specially.
  android: [],
  // Ios function specially.
  ios: [],
};
