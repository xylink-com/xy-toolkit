# 项目名称：toolkit

 ## 项目介绍：
 
 > 小鱼易连通用工具函数库

此项目是小鱼易连工具库项目，是从业务项目中抽离封装的工具组合，提供给 pc 端 web 业务安装使用。

## 技术结构

- 文档： dumi
- 打包：rollup
- 开发语言：typescript
- 测试：jest
## 环境要求

node: 10.15.0+

## 前提条件

1. 获取项目

```bash
git clone https://github.com/xylink-com/toolkit.git
```

2. 安装依赖

如果需要使用内部npm资源，建议通过nrm切换镜像到xylink上，否则，请使用taobao/npm镜像。

```bash
cd toolkit # 项目根目录
nrm use xylink #  切换到 xylink 镜像源
yarn # 使用 yarn 安装依赖
npm install # 或者使用 npm 安装依赖
```

3. 启用 IDE 打开项目

```bash
open -a vscode . # 使用 mac 系统打开项目
vs . # 在 ~/.zshrc 中添加 alias vs='open -a vscode'
```
## 开发调试

请移步 wiki 文档：[组件/工具函数库平台开发文档](http://wiki.xylink.com:8090/pages/viewpage.action?pageId=90966578#toolkit-%E5%B7%A5%E5%85%B7%E5%BA%93)

## 目录结构

```txt
toolkit
├── LICENSE
├── README.en-US.md
├── README.md
├── _test_  // 测试目录
├── config
├── docs  // 生成静态文档
├── guide  // 文档原件
├── lib
├── package.json
├── public
├── rollup.config.js
├── src
├── tsconfig.json
└── yarn.lock
```
## 文档

[工具库使用文档](https://xylink-com.github.io/toolkit/zh-CN/pages/document)
##  git 分支

git 分支管理如下：

| 分支    | 描述                 |
| ------- | -------------------- |
| master  | 版本发布的主分支     |
| dev     | 开发分支             |
| feat-** | feature 功能开发分支 |
| fix-**  | bugfix 分支          |


## 版本记录

请查看：[CHANGELOG](./CHANGELOG.md)

## 浏览器兼容性

- 主流浏览器: Chrome, firefox, safari, edge
- ie11

## Q&A

## 协议

[MIT](LICENSE).
## 工具列表

| 模块              | 描述                                                    | 状态   | 备注             |
| ----------------- | ------------------------------------------------------- | ------ | ---------------- |
| Broswer           | 浏览器版本、型号、检测                                  | ✅      |                  |
| Fullscreen(event) | 元素全屏显示，支持多元素切换和事件回调                  | ✅      |                  |
| Store             | 基于 LocalStorage 的本地存储库                          | ✅      |                  |
| Moment            | 类 Moment 库                                            | ✅      |                  |
| GetTime(format)   | 获取时间，支持提供时间格式                              | ✅      |                  |
| UrlParse          | 获取 url 参数得工具，目前支持获取单个参数和获取全部参数 | ✅      |                  |
| MergeDeep         | 数据深度合并                                            | ✅      |                  |
| CloneDeep         | 引用数据深度拷贝                                        | ✅      |                  |
| NativeJs          | 客户端 H5 和 Native 交互方法库                          | ✅      | 支持 ios/android |
| Timeout/Interval  | 基于 requestanimation 的定时器                          | ✅      |                  |
| Emmit             | 事件订阅发布                                            | ✅      |                  |
| Axios             | axios 封装库                                            | 未开始 |                  |
| Httpclient        | httpClient 发送请求模块                                 | 未开始 |                  |
| 节流/防抖         | 节流防抖函数                                            | 未开始 |                  |
| Websocket         | 封装 WebSocket 模块                                     | 未开始 |                  |
| Logger            | 本地日志模块                                            | 未开始 |                  |
| DB                | 本地数据库                                              | 未开始 |                  |
