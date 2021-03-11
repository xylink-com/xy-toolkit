export default {
  sysListers: ["newListener", "removeListener"], // preserved listener hooks
  maxListeners: 10, // Max listeners size that event has, if exceed max size, a warning will be throw out.
};
