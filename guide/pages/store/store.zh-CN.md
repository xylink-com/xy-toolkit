<!-- ---
order: 2
nav:
  title: 文档3
  order: 2
--- -->

# Store

store 是一个 浏览器存储工具函数，是通过浏览器自带的 Localstorage 进行封装的。

## 例子

```ts
import { store } from "@xylink/toolkit";

const result = store.get("key");
```

## API

### 方法

#### 1. get(key)

通过key获取localstorage里面的值。

```ts
store.get(key: string): any;
```

#### 2. set(key, value)

用来设置 localstorage 的值，此 value 会经过序列化为字符串保存。

```ts
store.set(key: string, value: any): void;
```

#### 3. remove(key)

移除 localstorage 的值。

```ts
store.remove(key: string): void;
```

#### 4. clear()

用来清除所有 localstorage 的数据。

```ts
store.clear(): void;
```

#### 5. clear()

提供一个数组，批量清理 localstorage 的数据。

```ts
store.removeList(array: string[]): void;
```
