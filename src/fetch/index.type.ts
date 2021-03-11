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
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

export interface FetchOptions {
  url?: string;
  method?: Method;
  baseURL?: string;
  dataTransfer?: (res: any) => any;
  transformRequest?: FetchTransformer | FetchTransformer[];
  transformResponse?: FetchTransformer | FetchTransformer[];
  headers?: any;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: FetchAdapter;
  auth?: FetchBasicCredentials;
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
}

export interface FetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: FetchOptions;
  request?: any;
}

export interface FetchError<T = any> extends Error {
  config: FetchOptions;
  code?: string;
  request?: any;
  response?: FetchResponse<T>;
  isFetchError: boolean;
  toJSON: () => object;
}

export interface FetchPromise<T = any> extends Promise<FetchResponse<T>> {}

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

export interface FetchInstance {
  (config: FetchOptions): FetchPromise;
  (url: string, config?: FetchOptions): FetchPromise;
  defaults: FetchOptions;
  interceptors: {
    request: FetchInterceptorManager<FetchOptions>;
    response: FetchInterceptorManager<FetchResponse>;
  };
  getUri(config?: FetchOptions): string;
  request<T = any, R = FetchResponse<T>>(config: FetchOptions): Promise<R>;
  get<T = any, R = FetchResponse<T>>(
    url: string,
    config?: FetchOptions
  ): Promise<R>;
  delete<T = any, R = FetchResponse<T>>(
    url: string,
    config?: FetchOptions
  ): Promise<R>;
  head<T = any, R = FetchResponse<T>>(
    url: string,
    config?: FetchOptions
  ): Promise<R>;
  options<T = any, R = FetchResponse<T>>(
    url: string,
    config?: FetchOptions
  ): Promise<R>;
  post<T = any, R = FetchResponse<T>>(
    url: string,
    data?: any,
    config?: FetchOptions
  ): Promise<R>;
  put<T = any, R = FetchResponse<T>>(
    url: string,
    data?: any,
    config?: FetchOptions
  ): Promise<R>;
  patch<T = any, R = FetchResponse<T>>(
    url: string,
    data?: any,
    config?: FetchOptions
  ): Promise<R>;
}

export interface FetchStatic extends FetchInstance {
  create(config?: FetchOptions): FetchInstance;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel(value: any): boolean;
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}
