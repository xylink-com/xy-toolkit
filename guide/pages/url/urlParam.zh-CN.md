<!-- ---
order: 3
nav:
  title: 文档3
  order: 3
--- -->

# urlParam

urlParam 是一个获取 url 参数得工具，目前支持获取单个参数和获取全部参数

## 例子

```ts
import { urlParam } from "@xylink/toolkit";

const paramA = urlParam.getUrlParam("a");
```

## API

### 方法

#### 1. getUrlParam(name,search)
获取 url search 中参数为 name 的值；其中search为选填，默认是window.location.search

```ts
urlParam.getUrlParam(name: string, search?: string):string | undefined
```

#### 2. getAllUrlParams(search)

获取 url search 中的全部参数，返回一个对象；其中search为选填，默认是window.location.search

```ts
urlParam.getUrlParam(search?: string)
```
