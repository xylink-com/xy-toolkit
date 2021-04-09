import { FetchOptions, FetchTransformer } from "./index.type";

// const contentTypeEnum = {
//   arraybuffer,
//   blob,
//   document,
//   json,
//   text,
//   stream,
// };

class FetchResponse {
  public data;
  public status;
  public statusText;
  public headers;
  public ok;
  public request;
  public config;
  public origin;
  public originData;

  constructor(computedOptions: FetchOptions, response, data) {
    this.status = response?.status;
    this.statusText = response?.statusText;
    this.headers = response?.headers;
    this.ok = response?.ok;
    // if transformResponse exists, transform response.
    const { transformResponse } = computedOptions;

    let computedData = data;
    if (transformResponse) {
      if (!Array.isArray(transformResponse)) {
        // Single pipeline
        computedData = transformResponse(computedData);
      } else {
        // Multiple pipeline
        transformResponse.forEach((tr: FetchTransformer) => {
          computedData = tr(computedData);
        });
      }
    }
    this.data = computedData;
  }
}

export default FetchResponse;
