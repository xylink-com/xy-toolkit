import EventEmitter from "../../src/eventEmitter";

const eventEmitter = new EventEmitter();

describe("On and off listener", () => {
  it("event will be emit with listening", async () => {
    eventEmitter.on("app-launch", (data) => {
      console.log(
        "==>",
        "some data will show when event emitted." + JSON.stringify(data)
      );
    });
    eventEmitter.emit("app-launch", { path: "absolute" });
    eventEmitter.emit("app-launch", { path: "relative" });
  });

  it("event will not emit when i remove the listener before it been trigger.", async () => {
    const handler = (data) => {
      console.log("==>app close", { data });
    };
    eventEmitter.on("app-close", handler);
    eventEmitter.off("app-close", handler);
    eventEmitter.emit("ap-close", { close: true });
  });

  it("event should emit in async function", async () => {
    const handler = (data) => {
      console.log("==>app min", { data });
    };
    eventEmitter.on("app-min", handler);
    const offListener = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          eventEmitter.off("app-min", handler);
          resolve(true);
        }, 3000);
      });
    };
    offListener().then(() => {
      eventEmitter.emit("app-min", { min: true });
    });
    eventEmitter.emit("app-min", { min: false });
    console.log("==> max listeners size: ", eventEmitter.getMaxListeners());
  });

  it("max listener size should work", () => {
    eventEmitter.setMaxListeners(2);
    eventEmitter.on("app-max", () => {
      console.log("==>", 1);
    });
    eventEmitter.on("app-max", () => {
      console.log("==>", 2);
    });
    eventEmitter.on("app-max", () => {
      console.log("==>", 3);
    });
  });

  it("once listener should be removed after triggered.", () => {
    eventEmitter.once("app-fs", () => {
      console.log("==> app-fs");
    });
    eventEmitter.emit("app-fs");
    eventEmitter.emit("app-fs");
  });

  it("remove all listeners, then all listeners belong to that kind will be removed.", () => {
    eventEmitter.on("app-quit", () => console.log("==>app-quit", 1));
    eventEmitter.on("app-quit", () => console.log("==>app-quit", 2));
    eventEmitter.removeAllListeners("app-quit");
    eventEmitter.emit("app-quit");
  });

  it("remove all listeners, just like clear.", () => {
    console.log("==>", { listeners: eventEmitter.getListeners("app-quit") });
    console.log("==>", { listeners: eventEmitter.allListeners("app-quit") });
    console.log("==>", { listeners: eventEmitter.size() });
    console.log("==>", { listeners: eventEmitter.listenerCount("app-quit") });
    eventEmitter.removeAllListeners();
    console.log("==>", { listeners: eventEmitter.getListeners("app-quit") });
    console.log("==>", { listeners: eventEmitter.listenerCount("app-quit") });
    eventEmitter.emit("app-quit");
    eventEmitter.emit("app-exit");
  });

  it("Event listener should work", () => {
    eventEmitter.on("newListener", (data) => {
      console.log("==>newListener", JSON.stringify(data));
    });
    eventEmitter.on("removeListener", (data) => {
      console.log("==>removeListener", data);
    });
    const handler = () => console.log("==>app-exit", 2);
    eventEmitter.on("app-quit", () => console.log("==>app-quit", 1));
    eventEmitter.on("app-exit", handler);
    console.log("==>", eventEmitter.getListeners("app-exit"));
    eventEmitter.off("app-exit", handler);
    console.log("==>", eventEmitter.getListeners("app-exit"));
  });
});
