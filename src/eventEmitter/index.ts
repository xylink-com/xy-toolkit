import config from "./index.config";

const { maxListeners } = config;

type handlerType = any;

interface emitterType {
  handler: handlerType;
  once: boolean;
}

interface listenerType {
  emitters: Set<emitterType>;
}

class EventEmitter {
  private listeners: Map<string, listenerType>;
  private maxListeners: number;

  constructor() {
    this.listeners = new Map();
    this.maxListeners = maxListeners;
  }

  getMaxListeners() {
    return this.maxListeners;
  }

  setMaxListeners(size: number) {
    const newSize = Number(size);
    if (newSize > 0 && newSize !== this.maxListeners) {
      this.maxListeners = newSize;
      return true;
    }
    return false;
  }

  on(evt: string, listener: handlerType, once: boolean = false) {
    if (!this.listeners.has(evt)) {
      this.listeners.set(evt, {
        emitters: new Set(),
      } as listenerType);
    }
    if (!this.listeners.get(evt).emitters.has(listener)) {
      this.listeners.get(evt).emitters.add({
        handler: listener,
        once,
      });
      // Register new listener, if "newListener" has been registered, newListener hook will be triggered.
      if (this.listeners.has("newListener"))
        this.emit("newListener", { evt, listener, once });
      // Throw warning if size exceed max listeners size.
      if (this.listeners.get(evt).emitters.size > this.maxListeners)
        console.warn(
          `EventEmitter::warning: listeners exceed max listeners size. Reduce listeners or increase max listeners size by setMaxListeners`
        );
      return true;
    }
    return false;
  }

  private _findEmitterByHandler(evt: string, handler: handlerType) {
    let findEmitter;
    this.listeners.get(evt).emitters.forEach((emitter: emitterType) => {
      if (emitter.handler === handler) findEmitter = emitter;
    });
    return findEmitter;
  }

  off(evt: string, listener: handlerType) {
    // If listener exists, it will be removed.
    const emitter = this._findEmitterByHandler(evt, listener);
    if (
      this.listeners.has(evt) &&
      this.listeners.get(evt).emitters.has(emitter)
    ) {
      this.listeners.get(evt).emitters.delete(emitter);
      console.log("==>", { listener });
      // Remove listener, if "removeListener" has been register, removeListener will be triggered.
      if (this.listeners.has("removeListener"))
        this.emit("removeListener", { evt, listener });
      return true;
    }
    return false;
  }

  once(evt: string, listener: handlerType) {
    // Emit listener once, then it will be removed.
    return this.on(evt, listener, true);
  }

  emit(evt: string, ...params) {
    // All listeners belong to event will be triggered.
    if (this.listeners.has(evt) && this.listeners.get(evt).emitters.size > 0) {
      const emitters = this.listeners.get(evt).emitters;
      emitters.forEach((emitter: emitterType) => {
        emitter.handler(...params);
        if (emitter.once) {
          this.off(evt, emitter);
        }
      });
      return true;
    }
    return false;
  }

  addListener(evt: string, listener: handlerType, once: boolean = false) {
    this.on(evt, listener);
  }

  removeListener(evt: string, listener: handlerType) {
    this.off(evt, listener);
  }

  removeAllListeners(evt?: string) {
    if (evt && this.listeners.has(evt)) {
      this.listeners.get(evt).emitters.clear();
    } else if ([undefined, null].includes(evt)) this.clear();
  }

  getListeners(evt: string) {
    if (evt && this.listeners.has(evt)) {
      return this.listeners.get(evt).emitters;
    }
    return false;
  }

  listenerCount(evt: string) {
    const rst = this.getListeners(evt);
    return rst ? rst.size : 0;
  }

  size() {
    return this.listeners.size;
  }

  allListeners() {
    return this.listeners;
  }

  clear() {
    this.listeners.clear();
  }
}

export default new EventEmitter();
