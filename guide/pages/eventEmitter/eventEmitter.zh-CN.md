# EventEmitter 事件管理器

EventEmitter 是使用 Map 和 Set 实现的简易版的事件管理器，API 与 node.js EventEmitter 风格基本一致。

[NodeJs EventEmitter docs](https://nodejs.org/api/events.html#events_class_eventemitter)

## 何时使用

- 事件管理：事件发布、订阅。
- 需要对外提供事件处理的场景。
## 代码演示

```ts
import {EventEmitter} from "toolkit";

const handler = (data) => {
  console.log("==>app min", { data });
};
EventEmitter.on("app-min", handler);
const offListener = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      EventEmitter.off("app-min", handler);
      resolve(true);
    }, 3000);
  });
};
offListener().then(() => {
  EventEmitter.emit("app-min", { min: true });
});
EventEmitter.emit("app-min", { min: false });
console.log("==> max listeners size: ", EventEmitter.getMaxListeners());
```

## Event 事件

| 事件           | 参数                                                      | 描述                                                        |
| -------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| newListener    | evt: string, listener: handlerType, once: boolean = false | 注册 newListener 监听事件后，当新的事件监听器注册后将会触发 |
| removeListener | evt: string, listener: handlerType                        | 注册 removeListener 监听事件后，当移除事件监听器后将会触发  |

使用示例：

```ts
EventEmitter.on("newListener", (data) => {
  console.log("==>newListener", JSON.stringify(data));
});
EventEmitter.on("removeListener", (data) => {
  console.log("==>removeListener", data);
});
const handler = () => console.log("==>app-exit", 2);
EventEmitter.on("app-quit", () => console.log("==>app-quit", 1));
EventEmitter.on("app-exit", handler);
console.log("==>", EventEmitter.getListeners("app-exit"));
EventEmitter.off("app-exit", handler);
console.log("==>", EventEmitter.getListeners("app-exit"));
```

## API

| API                 | 参数                                                      | 返回值      | 描述                                                                    |
| ------------------- | --------------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| on\|addListener     | evt: string, listener: handlerType, once: boolean = false | true\|false | 添加一个监听器（订阅者）                                                |
| off\|removeListener | evt: string, listener: handlerType                        | true\|false | 移除一个监听器（订阅者）                                                |
| once                | evt: string, listener: handlerType                        | true\|false | 添加一个单次响应监听器（订阅者）                                        |
| emit                | evt: string, ...params                                    | true\|false | 触发事件并且传递参数                                                    |
| getMaxListeners     |                                                           | number      | 获取事件最多挂载的监听器（订阅者）数量，默认是 10 个。                  |
| setMaxListeners     | size: number                                              | true\|false | 获取事件最多挂载的监听器（订阅者）数量，默认是 10 个。                  |
| removeAllListeners  | evt?: string                                              |             | 传递 evt 则移除该事件所有的监听器，不传递或传入 null 将会移除所有监听器 |
| getListeners        | evt: string                                               | set\|false  | 获取事件的所有监听器                                                    |
| allListeners        |                                                           |             | 获取已经注册的所有监听器                                                |
| listenerCount       | evt: string                                               | number      | 获取事件上注册的监听器的数量                                            |
| size                |                                                           | number      | 获取已经注册的事件的数量                                                |
| clear               |                                                           |             | 清空所有监听器                                                          |

## TODO

- [ ] 添加 event 封装，并返回自定义 event
- [ ] 添加 error 事件管理
- [ ] 使用链表管理监听器
- [ ] 完善 API
