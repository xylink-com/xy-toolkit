const EventEmitter = require("../src/eventEmitter").default;

describe("On and off listener", () => {
  it("event will be emit with listening", async () => {
    EventEmitter.on("app-launch", (data) => {
      console.log(
        "==>",
        "some data will show when event emitted." + JSON.stringify(data)
      );
    });
    EventEmitter.emit("app-launch", { path: "absolute" });
    EventEmitter.emit("app-launch", { path: "relative" });
  });

  it("event will not emit when i remove the listener before it been trigger.", async () => {
    const handler = (data) => {
      console.log("==>app close", { data });
    };
    EventEmitter.on("app-close", handler);
    EventEmitter.off("app-close", handler);
    EventEmitter.emit("ap-close", { close: true });
  });

  it("event should emit in async function", async () => {
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
  });

  it("max listener size should work", () => {
    EventEmitter.setMaxListeners(2);
    EventEmitter.on("app-max", () => {
      console.log("==>", 1);
    });
    EventEmitter.on("app-max", () => {
      console.log("==>", 2);
    });
    EventEmitter.on("app-max", () => {
      console.log("==>", 3);
    });
  });

  it("once listener should be removed after triggered.", () => {
    EventEmitter.once("app-fs", () => {
      console.log("==> app-fs");
    });
    EventEmitter.emit("app-fs");
    EventEmitter.emit("app-fs");
  });

  it("remove all listeners, then all listeners belong to that kind will be removed.", () => {
    EventEmitter.on("app-quit", () => console.log("==>app-quit", 1));
    EventEmitter.on("app-quit", () => console.log("==>app-quit", 2));
    EventEmitter.removeAllListeners("app-quit");
    EventEmitter.emit("app-quit");
  });

  it("remove all listeners, just like clear.", () => {
    console.log("==>", { listeners: EventEmitter.getListeners("app-quit") });
    console.log("==>", { listeners: EventEmitter.allListeners("app-quit") });
    console.log("==>", { listeners: EventEmitter.size() });
    console.log("==>", { listeners: EventEmitter.listenerCount("app-quit") });
    EventEmitter.removeAllListeners();
    console.log("==>", { listeners: EventEmitter.getListeners("app-quit") });
    console.log("==>", { listeners: EventEmitter.listenerCount("app-quit") });
    EventEmitter.emit("app-quit");
    EventEmitter.emit("app-exit");
  });

  it("Event listener should work", () => {
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
  });
});
