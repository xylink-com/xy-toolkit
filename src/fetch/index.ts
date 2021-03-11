// import polyfill of fetch api for ie;
// see https://github.com/github/fetch;
import "whatwg-fetch";
import { FetchOptions } from "./index.type";
import { mergeOptions, handleResErr } from "./index.util";
import config from "./index.config";

const fetcher = window.fetch;
const { initDefaultOptions } = config;

// @ts-ignore
class Fetch {
  private baseURL: string;
  private timeout: number;
  private headers: Object;
  private FetchOptions;
  public defaults: FetchOptions;

  // from custom options first, then default options.
  constructor(fetchOptions: FetchOptions) {
    this.defaults = initDefaultOptions;
    const mergedOptions: FetchOptions = mergeOptions(
      fetchOptions,
      this.defaults
    );
    const { baseURL } = mergedOptions;
    this.baseURL = baseURL;
  }

  // from specify options first, then custom options.
  public request(fetchOptions: FetchOptions = {}) {
    const { url, ...restOptions } = fetchOptions;
    return new Promise((resolve, reject) => {
      fetcher(url)
        .then((res) => {
          return handleResErr(res);
        })
        .then((resWithoutErr) => {
          resolve(
            restOptions.dataTransfer
              ? dataTransfer(resWithoutErr)
              : resWithoutErr
          );
        })
        .catch((err) => reject(err));
    });
  }
  public get(url, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url: "get" }));
  }
  public delete(url, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url: "delete" }));
  }
  public head(url, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url: "head" }));
  }
  public options(url, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url: "options" }));
  }

  public post(url, data, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url: "post", data }));
  }
  public put(url, data, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url: "get", data }));
  }

  public patch(url, data, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url: "get", data }));
  }
}

function createFetchInstance(fetchOptions: FetchOptions = {}): Fetch {
  return new Fetch(fetchOptions);
}

const fetch: Fetch = createFetchInstance({});

export default fetch;
