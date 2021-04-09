// import polyfill of fetch api for ie;
// see https://github.com/github/fetch; https://github.com/matthew-andrews/isomorphic-fetch
import "whatwg-fetch";
import {
  FetchOptions,
  FetchBasicCredentials,
  FetchTransformer,
} from "./index.type";
import { mergeOptions } from "./index.util";
import config from "./index.config";
import FetchRequest from "./request";
import FetchResponse from "./response";
import FetchError from "./error";

const { initDefaultOptions, postLikeMethods } = config;
class Fetch {
  public defaults: FetchOptions;

  // from custom options first, then default options.
  constructor(fetchOptions: FetchOptions = {}) {
    const mergedOptions: FetchOptions = mergeOptions(
      initDefaultOptions,
      fetchOptions
    );
    this.defaults = mergedOptions;
  }

  private _computeFetchUrl(options: FetchOptions) {
    const { url = "", baseURL = "", params = {} } = options;
    let computedUrl = ["http", "https"].includes(url) ? url : baseURL + url;
    if (JSON.stringify(params) !== "{}") {
      Object.keys(params).forEach((param) => {
        const value = params[param];
        if (computedUrl.indexOf("?") !== -1)
          computedUrl += `&${param}=${value}`;
        else computedUrl += `?${param}=${value}`;
      });
    }
    return computedUrl;
  }

  private _computeFetchData(options: FetchOptions) {
    const { data = {}, transformRequest, method, headers } = options;
    let computedData = data;

    // if transformRequest exists, transform request.
    if (transformRequest && postLikeMethods.includes(method)) {
      if (!Array.isArray(transformRequest)) {
        // Single pipeline
        computedData = transformRequest(computedData, headers);
      } else {
        // Multiple pipeline
        transformRequest.forEach((tr: FetchTransformer) => {
          computedData = tr(computedData, headers);
        });
      }
    }
    return computedData;
  }

  private _computeFetchHeaders(options: FetchOptions) {
    const { headers = {}, auth = {} } = options;
    const computedHeaders = headers;
    const { username, password } = auth as FetchBasicCredentials;

    if (username && password) {
      computedHeaders["Authorization"] = `Basic ${Buffer.from(
        username + ":" + password
      ).toString("base64")}`;
    }
    return computedHeaders;
  }

  private _getComputedOptions(fetchOptions: FetchOptions) {
    const optionsMergedDefaults = mergeOptions(this.defaults, fetchOptions);
    const computedUrl = this._computeFetchUrl(optionsMergedDefaults);
    const computedData = this._computeFetchData(optionsMergedDefaults);

    // if auth exists, add Authorization to header
    const computedHeaders = this._computeFetchHeaders(optionsMergedDefaults);
    return mergeOptions(optionsMergedDefaults, {
      url: computedUrl,
      data: computedData,
      headers: computedHeaders,
    });
  }

  private async _computedTypedData(options: FetchOptions, response) {
    const { responseType } = options;
    switch (responseType) {
      case "arraybuffer":
        break;
      case "blob":
        break;
      case "document":
        break;
      case "json":
        return response.json();
        break;
      case "text":
        return response.text();
        break;
      case "stream":
        break;

      default:
        return response.text();
        break;
    }
    await response.json();
  }

  // from specify options first, then custom options.
  public async request(
    fetchOptions: FetchOptions = {}
  ): Promise<FetchResponse | FetchError> {
    // merge options from request custom and computed default options.
    const computedOptions = this._getComputedOptions(fetchOptions);
    const {
      timeout,
      url,
      transformResponse,
      adapter,
      responseType,
      ...restOptions
    } = computedOptions;

    let response: Response | null = null;
    let req: FetchRequest | null = null;
    if (adapter && typeof adapter === "function") {
      response = adapter(computedOptions);
    } else {
      // if request time exceeds timeout option, abort the request.
      const controller = new AbortController();
      // init request object
      req = new FetchRequest(computedOptions, controller);
      const timeoutTimer: any = setTimeout(() => {
        controller.abort();
      }, timeout);

      try {
        response = await fetch(req.origin);
      } catch (err) {
        // process fetch error
        const error = new FetchError("FETCH_ERROR", req, err);
        console.error(error.message);
        return error;
      } finally {
        clearTimeout(timeoutTimer);
      }
    }

    // process response data
    let originData;
    try {
      originData = await this._computedTypedData(computedOptions, response);
    } catch (error) {
      // data error
      originData = {};
    } finally {
    }

    const fetchResponse = new FetchResponse(
      computedOptions,
      response,
      originData
    );

    fetchResponse["request"] = req;
    fetchResponse["config"] = req.options;
    fetchResponse["origin"] = response;
    fetchResponse["originData"] = originData;
    return fetchResponse;
  }

  public get(
    url,
    fetchOptions: FetchOptions = {}
  ): Promise<FetchResponse | FetchError> {
    return this.request(mergeOptions(fetchOptions, { url, method: "get" }));
  }

  public delete(
    url,
    fetchOptions: FetchOptions = {}
  ): Promise<FetchResponse | FetchError> {
    return this.request(mergeOptions(fetchOptions, { url, method: "delete" }));
  }

  public head(
    url,
    fetchOptions: FetchOptions = {}
  ): Promise<FetchResponse | FetchError> {
    return this.request(mergeOptions(fetchOptions, { url, method: "head" }));
  }

  public options(
    url,
    fetchOptions: FetchOptions = {}
  ): Promise<FetchResponse | FetchError> {
    return this.request(mergeOptions(fetchOptions, { url, method: "options" }));
  }

  public post(url, fetchOptions: FetchOptions = {}) {
    return this.request(mergeOptions(fetchOptions, { url, method: "post" }));
  }

  public put(
    url,
    fetchOptions: FetchOptions = {}
  ): Promise<FetchResponse | FetchError> {
    return this.request(mergeOptions(fetchOptions, { url, method: "put" }));
  }

  public patch(
    url,
    fetchOptions: FetchOptions = {}
  ): Promise<FetchResponse | FetchError> {
    return this.request(mergeOptions(fetchOptions, { url, method: "patch" }));
  }
}

export default Fetch;
