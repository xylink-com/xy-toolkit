export interface FetchTransformer {
  (data: any, headers?: any): any;
}

export interface FetchAdapter {
  (config: FetchOptions): FetchPromise<any>;
}

export interface FetchBasicCredentials {
  username: string;
  password: string;
}

export interface FetchProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

// http methods
// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export type Method =
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch";

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export interface FetchOptions {
  // `url` 是用于请求的服务器 URL
  url?: string;
  // `method` 是创建请求时使用的方法
  method?: Method;
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL?: string;
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  transformRequest?: FetchTransformer | FetchTransformer[];
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse?: FetchTransformer | FetchTransformer[];
  headers?: any; // `headers` 是即将被发送的自定义请求头
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params?: any;
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  // paramsSerializer?: (params: any) => string;
  data?: any;
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求超过 `timeout` 的时间，请求将被中断
  timeout?: number;
  // withCredentials?: boolean;
  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应
  adapter?: FetchAdapter;
  auth?: FetchBasicCredentials;
  // It's not natively supported in fetch as the API is a purely network-layer API with no dependencies on being in a web browser.
  // see: https://github.com/whatwg/fetch/issues/16
  // data type will depend on responseType and response headers of content-type.
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: FetchProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  // Follow are native options of fetch, see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch or https://javascript.info/fetch-api
  mode?: "cors" | "no-cors" | "same-origin";
  credentials?: "omit" | "same-origin" | "include";
  redirect?: "follow" | "error" | "manual";
  referrer?: string;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "same-origin"
    | "origin"
    | "strict-origin"
    | "origin-when-cross-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  integrity?: string;
  keepalive?: boolean;
  cache?: "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
  signal?: AbortController;
}

export type FetchErrorType = "FETCH_ERROR" | "DATA_ERROR" | "TIMEOUT_ERROR";

export interface CancelStatic {
  new (message?: string): Cancel;
}

export interface Cancel {
  message: string;
}

export interface Canceler {
  (message?: string): void;
}

export interface CancelTokenStatic {
  new (executor: (cancel: Canceler) => void): CancelToken;
  source(): CancelTokenSource;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

export interface FetchInterceptorManager<V> {
  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any
  ): number;
  eject(id: number): void;
}

// export interface FetchStatic extends FetchInstance {
//   create(config?: FetchOptions): FetchInstance;
//   Cancel: CancelStatic;
//   CancelToken: CancelTokenStatic;
//   isCancel(value: any): boolean;
//   all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
//   spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
// }

export interface FetchRequest {}
