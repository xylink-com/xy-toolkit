import config from "./eventEmitter.config";
import { handlerType, emitterType, listenerType } from "./eventEmitter.type";

const { maxListeners } = config;

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
      return this;
    }
    return false;
  }

  on(evt: string, handler: handlerType, once: boolean = false) {
    if (!this.listeners.has(evt)) {
      this.listeners.set(evt, {
        emitters: new Set(),
      } as listenerType);
    }
    if (!this.listeners.get(evt).emitters.has(handler)) {
      // Register new listener, if "newListener" has been registered, newListener hook will be triggered.
      if (this.listeners.has("newListener"))
        this.emit("newListener", { evt, handler, once });

      this.listeners.get(evt).emitters.add({
        handler,
        once,
      });
      // Throw warning if size exceed max listeners size.
      if (this.listeners.get(evt).emitters.size > this.maxListeners)
        console.warn(
          `EventEmitter::warning: listeners exceed max listeners size. Reduce listeners or increase max listeners size by setMaxListeners`
        );
      return this;
    }
    return false;
  }

  private _findEmitterByHandler(evt: string, handler: handlerType) {
    let findEmitter;
    this.listeners.get(evt).emitters.forEach((emitter: emitterType) => {
      if (emitter.handler === handler) {
        findEmitter = emitter;
        return;
      }
    });
    return findEmitter;
  }

  off(evt: string, handler: handlerType) {
    // If listener exists, it will be removed.
    const emitter = this._findEmitterByHandler(evt, handler);
    if (
      emitter &&
      this.listeners.has(evt) &&
      this.listeners.get(evt).emitters.has(emitter)
    ) {
      if (this.listeners.has("removeListener"))
        // Remove listener, if "removeListener" has been register, removeListener will be triggered.
        this.emit("removeListener", { evt, handler });

      const listener = this.listeners.get(evt);
      listener.emitters.delete(emitter);
      if (listener.emitters.size === 0) {
        this.listeners.delete(evt);
      }
      return this;
    }
    return false;
  }

  once(evt: string, handler: handlerType) {
    // Emit listener once, then it will be removed.
    return this.on(evt, handler, true);
  }

  emit(evt: string, ...params) {
    // All listeners belong to event will be triggered.
    if (this.listeners.has(evt) && this.listeners.get(evt).emitters.size > 0) {
      const emitters = this.listeners.get(evt).emitters;
      emitters.forEach((emitter: emitterType) => {
        emitter.handler(...params);
        if (emitter.once) {
          // Emitter tag with once will be remove.
          this.off(evt, emitter.handler);
        }
      });
      return this;
    }
    return false;
  }

  addListener(evt: string, handler: handlerType, once: boolean = false) {
    this.on(evt, handler);
  }

  removeListener(evt: string, handler: handlerType) {
    this.off(evt, handler);
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

const eventEmitter: EventEmitter = new EventEmitter();
export { eventEmitter };
export default EventEmitter;
