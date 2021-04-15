<!-- ---
order: 2
nav:
  title: 文档3
  order: 2
--- -->

# Store

store is a browser storage tool function, which is encapsulated by the Localstorage that comes with the browser.

## 例子

```ts
import { store } from "@xylink/toolkit";

const result = store.get("key");
```

## API

### 方法

#### 1. get(key)

Get the value in localstorage by key.

```ts
store.get(key: string): any;
```

#### 2. set(key, value)

Set the value of localstorage. This value will be serialized and saved as a string.

```ts
store.set(key: string, value: any): void;
```

#### 3. remove(key)

Remove the value of localstorage.

```ts
store.remove(key: string): void;
```

#### 4. clear()

Used to clear all localstorage data.

```ts
store.clear(): void;
```

#### 5. clear()

Provide an array to clean up localstorage data in batches.

```ts
store.removeList(array: string[]): void;
```
