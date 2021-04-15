<!-- ---
order: 2
nav:
  title: 文档3
  order: 2
--- -->

# FullScreen

fullscreen displays page elements in full screen, supports full screen switching of multiple elements, and supports callback event response.

## Example

```ts
import { fscreen } from "@xylink/toolkit";

fscreen.request(ele: HTMLElement);
```

## API

### Methods

#### 1. request(ele)

Display the ele element in full screen

```ts
fscreen.request(ele: HTMLElement): any;
```

#### 2. exit(key, value)

Exit Full Screen

```ts
fscreen.exit(ele: HTMLElement): void;
```

#### 3. clearAll()

Clean up all monitoring events

```ts
fscreen.clearAll(): void;
```

#### 4. init(ele, cb)

Monitor full-screen status change events, support simultaneous monitoring of multiple elements

```ts
fscreen.init(ele, (e) => {});
```
