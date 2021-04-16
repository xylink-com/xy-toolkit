export type IBrowserBaseVerson = {
  major: number;
  minor: number;
  build: number;
};

export type IBroswerVersion = undefined | IBrowserBaseVerson;

export interface IPlatform {
  isTablet: boolean;
  isPhone: boolean;
  isAndroid: boolean;
  isPc: boolean;
  isiPad: boolean;
  isMac: boolean;
  isChrome: boolean;
  isLinux: boolean;
  isFirefox: boolean;
  isBaidu: boolean;
  isQQ: boolean;
  isOpera: boolean;
  isZhazha: boolean;
  isEdge: boolean;
  isSafari: boolean;
}
