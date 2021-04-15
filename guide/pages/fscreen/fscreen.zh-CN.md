<!-- ---
order: 2
nav:
  title: 文档3
  order: 2
--- -->

# FullScreen

fullscreen 将页面元素全屏显示，支持多个元素全屏切换，支持回调事件响应。

## 例子

```ts
import { fscreen } from "@xylink/toolkit";

fscreen.request(ele: HTMLElement);
```

## API

### 方法

#### 1. request(ele)

将 ele 元素全屏显示

```ts
fscreen.request(ele: HTMLElement): any;
```

#### 2. exit(key, value)

退出全屏

```ts
fscreen.exit(ele: HTMLElement): void;
```

#### 3. clearAll()

清理所有监听事件

```ts
fscreen.clearAll(): void;
```

#### 4. init(ele, cb)

监听全屏状态 change 事件，支持多个元素同时监听

```ts
fscreen.init(ele, (e) => {});
```
