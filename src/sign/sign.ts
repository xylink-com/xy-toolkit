/**
 * sdk计算签名
 *
 * @author phoebe
 *
 * Created at     : 2021-01-22 15:18:31
 * Last modified  : 2021-01-22 17:44:00
 */

import CryptoJS from "crypto-js";

interface ISign {
  method: "GET" | "POST" | "DELETE" | "PUT";
  url: string; // 请求url,包含query参数
  token: string; // sdk token
  body: string; // 请求体
}

const getSign = (props: ISign): string => {
  let { method, url, token, body = "" } = props;

  const matchUrl = url.split("?")[0].match(/v\d+(\S*)/);

  const newUrl = matchUrl ? matchUrl[1].substr(1) : url;

  const urlPath = newUrl.split("?")[0];

  const paramsStr = paramsSort(url.split("?")[1]);

  const signature = computeSignature({
    method: method.toUpperCase(),
    url: urlPath,
    paramsStr,
    sdkToken: token,
    body: serialize(body),
  });

  return signature;
};

const serialize = function (value: any) {
  if (!value) return;

  let val = "";
  const type = Object.prototype.toString.call(value);
  if (type === "[object Object]" || type === "[object Array]") {
    val = JSON.stringify(value);
  } else {
    val = value;
  }

  return val;
};

// 参数根据字典进行排序
function paramsSort(params: string) {
  if (!params) {
    return "";
  }

  let newParams = "";
  let paramsKeys: any[] = params.split("&").sort();

  paramsKeys = paramsKeys
    .map((key) => {
      if (key.indexOf("signature") < 0) {
        return key;
      }
      return false;
    })
    .filter(Boolean);

  for (const i in paramsKeys) {
    newParams = newParams + `&${paramsKeys[i]}`;
  }

  return newParams.substr(1);
}

// 字符串转字节
function stringToByte(str: string) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0);
      bytes.push(((c >> 12) & 0x3f) | 0x80);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0);
      bytes.push((c & 0x3f) | 0x80);
    } else {
      bytes.push(c & 0xff);
    }
  }
  return bytes;
}

// 字节转字符串
function byteToString(arr) {
  if (typeof arr === "string") {
    return arr;
  }
  var str = "",
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

//  计算websocket签名
function computeSignature(data) {
  // console.log("computeSignature::::", data);
  const { method = "GET", url, paramsStr, sdkToken, body = "" } = data;
  const bodyTemp = stringToByte(body);
  if (bodyTemp.length > 100) {
    bodyTemp.length = 100;
  }

  const bodyTempStr = byteToString(bodyTemp);
  const bodyHash = CryptoJS.SHA256(bodyTempStr);
  const bodyHashString = bodyHash.toString(CryptoJS.enc.Base64);
  const stringToSign = `${method}\n${url}\n${paramsStr}\n${bodyHashString}`;
  // console.log("stringToSign::", stringToSign);

  const sign = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(stringToSign, sdkToken)
  );
  const signature = encodeURIComponent(sign);

  return signature;
}

export default getSign;
