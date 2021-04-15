/**
 * browser tools lib
 *
 * @author jinghui-Luo
 *
 * Created at     : 2020-09-18 16:21:56
 * Last modified  : 2020-09-24 19:48:00
 */

import { IBroswerVersion, IPlatform } from "./type";

const agent = navigator.userAgent;

export const getPlatform = (ua = agent): IPlatform => {
  const lowerUa = ua.toLocaleLowerCase();
  const isMac =
    navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
    /macintosh|mac os x/i.test(ua);
  const isLinux = navigator.platform.toUpperCase().indexOf("LINUX") >= 0;
  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isAndroid = /(?:Android)/.test(ua);
  const isFireFox = /(?:Firefox)/.test(ua);
  const isChrome = /(?:Chrome|CriOS)/.test(ua) && !(ua.indexOf("Edg") > -1);
  const isEdge = ua.indexOf("Edg") > -1;
  const isSafari = ua.indexOf("Safari") > -1 && !(ua.indexOf("Chrome") > -1);
  const isiPad = /iPad/i.test(ua);
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua));
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  const isPc = !isPhone && !isAndroid && !isSymbian && !isiPad;
  const isBaidu =
    ua.indexOf("Baidu") > -1 ||
    ua.indexOf("BIDUBrowser") > -1 ||
    ua.indexOf("baiduboxapp") > -1;
  const isFirefox = !!lowerUa.match(/firefox/) || ua.indexOf("Firefox") > -1;
  const isQQ =
    !!lowerUa.match(/tencenttraveler/) ||
    !!lowerUa.match(/qqbrowse/) ||
    ua.indexOf("QQ/") > -1 ||
    ua.indexOf("MicroMessenger") > -1;
  const isOpera = ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1;
  const isZhazha =
    ua.indexOf("QihooBrowser") > -1 ||
    ua.indexOf("QHBrowser") > -1 ||
    ua.indexOf("360SE") > -1 ||
    ua.indexOf("360EE") > -1 ||
    ua.indexOf("LBBROWSER") > -1 ||
    ua.indexOf("UC") > -1 ||
    ua.indexOf("UBrowser") > -1 ||
    ua.indexOf("UCWEB") > -1 ||
    ua.indexOf("Quark") > -1 ||
    ua.indexOf("MiuiBrowser") > -1 ||
    ua.indexOf("AliApp(TB") > -1 ||
    ua.indexOf("Weibo") > -1 ||
    ua.indexOf("IqiyiApp") > -1 ||
    ua.indexOf("HuaweiBrowser") > -1 ||
    ua.indexOf("HUAWEI") > -1 ||
    ua.indexOf("MetaSr") > -1 ||
    ua.indexOf("Sogou") > -1 ||
    ua.indexOf("SE") > -1 ||
    ua.indexOf("Maxthon") > -1 ||
    ua.indexOf("The world") > -1 ||
    ua.indexOf("MetaSr") > -1 ||
    ua.indexOf("2345Explorer") > -1 ||
    ua.indexOf("TencentTraveler") > -1 ||
    ua.indexOf("Mb2345Browser") > -1;

  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
    isiPad,
    isMac,
    isChrome,
    isLinux,
    isFirefox,
    isBaidu,
    isQQ,
    isOpera,
    isZhazha,
    isEdge,
    isSafari,
  };
};

export const getChromeVersion = (): IBroswerVersion => {
  let pieces: any = navigator.userAgent.match(
    /Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)/
  );
  if (pieces == null || pieces.length < 4) {
    return undefined;
  }

  pieces = pieces.map((piece) => parseInt(piece, 10));

  return {
    major: pieces[1],
    minor: pieces[2],
    build: pieces[3],
  };
};

export const getEdgeVersion = (): IBroswerVersion => {
  let pieces: any = navigator.userAgent.match(
    /Ed(?:g)\/([0-9]+)\.([0-9]+)\.([0-9]+)/
  );
  if (pieces == null || pieces.length < 4) {
    return undefined;
  }

  pieces = pieces.map((piece) => parseInt(piece, 10));
  return {
    major: pieces[1],
    minor: pieces[2],
    build: pieces[3],
  };
};

export const getSafariVersion = (): IBroswerVersion => {
  let pieces: any = navigator.userAgent.match(
    /Version\/([0-9]+)\.([0-9]+)\.([0-9]+)/
  );

  if (pieces == null || pieces.length < 3) {
    return undefined;
  }

  pieces = pieces.map((piece) => parseInt(piece, 10));

  return {
    major: pieces[1],
    minor: pieces[2],
    build: pieces[3],
  };
};
