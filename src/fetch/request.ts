import { FetchOptions, Method } from "./index.type";
import { mergeOptions } from "./index.util";
import config from "./index.config";

const { postLikeMethods } = config;

interface requestOptions extends FetchOptions {
  controller: AbortController;
}

class FetchRequest {
  public origin: Request;
  public options: requestOptions;
  public url: string;
  public method: Method;

  constructor(fetchOptions: FetchOptions, controller: AbortController) {
    const { url, ...restOptions } = fetchOptions;
    const { method, data } = restOptions;
    this.method = method;
    this.url = url;
    this.options = { ...fetchOptions, controller };
    const mergedOptions = mergeOptions(restOptions, {
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (!postLikeMethods.includes(this.method)) delete mergedOptions.body;
    this.origin = new Request(url, mergedOptions);
  }
}

export default FetchRequest;
