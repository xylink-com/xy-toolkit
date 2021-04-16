import {
  getChromeVersion,
  getEdgeVersion,
  getPlatform,
  getSafariVersion,
} from "./browser/browser";

import fscreen from "./screen/screen";
import store from "./store/store";
import urlParam from "./url/urlParam";
import cloneDeep from "./clone/cloneDeep";

export {
  getChromeVersion,
  getEdgeVersion,
  getPlatform,
  getSafariVersion,
  fscreen,
  store,
  urlParam,
  cloneDeep,
};

export * from "./eventEmitter";
export * from "./hashMap";
