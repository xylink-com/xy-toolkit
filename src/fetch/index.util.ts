export function mergeOptions(customOptions, defaultOptions) {
  return Object.assign({}, customOptions, defaultOptions);
}

function CallableInstance(property) {
  const func = this.constructor.prototype[property];
  const apply = function () {
    return func.apply(apply, arguments);
  };
  Object.setPrototypeOf(apply, this.constructor.prototype);
  Object.getOwnPropertyNames(func).forEach(function (p) {
    Object.defineProperty(apply, p, Object.getOwnPropertyDescriptor(func, p));
  });
  return apply;
}

CallableInstance.prototype = Object.create(Function.prototype);

export const CallableClassInstance = CallableInstance;

export function handleResErr(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

