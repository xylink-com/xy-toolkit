type handlerType = any;

interface emitterType {
  handler: handlerType;
  once: boolean;
}

interface listenerType {
  emitters: Set<emitterType>;
}

export { handlerType, emitterType, listenerType };
