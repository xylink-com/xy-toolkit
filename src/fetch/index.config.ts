import { FetchOptions } from "./index.type";

// Default options that works for all request.
const initDefaultOptions: FetchOptions = {
  timeout: 10 * 1000,
  responseType: "json",
};

const config = {
  initDefaultOptions,
  postLikeMethods: ["post", "put", "patch"],
};

export default config;
