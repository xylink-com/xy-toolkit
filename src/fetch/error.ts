import { FetchErrorType, FetchOptions, FetchRequest } from "./index.type";

class FetchError extends Error {
  public code: string;
  public message: string;
  public type: FetchErrorType;
  public request: FetchRequest;
  public config: FetchOptions;
  public err: any;

  constructor(type, request, err) {
    super();
    this.type = type;
    this.request = request;
    this.config = request?.options;
    this.err = err;
    switch (type) {
      case "FETCH_ERROR":
        this.code = "0001";
        this.message = `Something went wrong with fetch request:
          1.Check your network connection or request options.
          2.Request maybe abort cause by timeout, try increase timeout option.`;
        break;
      case "DATA_ERROR":
        break;
      default:
        break;
    }
  }
}

export default FetchError;
