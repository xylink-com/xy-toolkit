const urlParam = require("../src/urlParam").default;

const url = '?h=www.baidu.com&a=2?b=3&c=4';

const h = "www.baidu.com";
const a = "2";
const b = "3";
const c = "4";
const all = {
  h: "www.baidu.com",
  a: '2',
  b: '3',
  c: '4'
};

test(`${url} : 参数 h = ${h}`, () => {
  expect(urlParam.getUrlParam('h', url)).toBe(h);
});

test(`${url} : 参数 a = ${a}`, () => {
  expect(urlParam.getUrlParam('a', url)).toBe(a);
});

test(`${url} : 参数 b = ${b}`, () => {
  expect(urlParam.getUrlParam('b', url)).toBe(b);
});

test(`${url} : 参数 c = ${c}`, () => {
  expect(urlParam.getUrlParam('c', url)).toBe(c);
});

test(`${url} 的全部参数为 : \n${JSON.stringify(all,null,' ')}`, () => {
  expect(JSON.stringify(urlParam.getAllUrlParams(url))).toBe(JSON.stringify(all));
});
