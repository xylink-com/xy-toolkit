# Fetch 基于 Fetch网络请求工具

类 Axios API 的网络请求工具，基于 Fetch 编写，已引入 fetch polyfill。

## 何时使用

使用场景：[web]

- 更可控的网络请求
- 更舒适的 API
- 更轻量的工具体积

## 代码案例

```ts
import { fetch } from "toolkit";

const fetch = new Fetch({
  responseType: "text",
  timeout: 1000000,
});

const res = await fetch.get("/user", {
    baseURL: baseUrl,
    timeout: 60000,
    responseType: "json",
});
console.log("==>", res);
```

更多代码案例请参考：[Fetch 测试文件](../../../_test_/fetch/fetch.test.ts)

## 兼容性

- Chrome
- Firefox
- Safari 6.1+
- Internet Explorer 10+

Note: modern browsers such as Chrome, Firefox, Microsoft Edge, and Safari contain native implementations of window.fetch.

## 参考链接

- [Introduction to fetch API](https://developers.google.com/web/updates/2015/03/introduction-to-fetch#:~:text=fetch()%20allows%20you%20to,the%20complex%20API%20of%20XMLHttpRequest.)
- [Fetch API - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- [使用 Fetch - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

## TODO

- [x] 支持 Promise API
- [x] 拦截请求和响应
- [x] 转换请求数据和响应数据
- [x] 取消请求
- [ ] 自动转换 JSON 数据
- [ ] 客户端支持防御 XSRF
