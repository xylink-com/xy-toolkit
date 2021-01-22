const getSign = require("../src/sign").default;

const obj = {
  method: "POST",
  url: "https://xx.yyyy.com/api/v1/preSignature?h=www.baidu.com",
  token: "1234567890",
  body: {
    title: "hello world",
  },
};

const sign = "QlPwJkMt5tC1iexHw%2Fv6UlfRrhHmXcg90hZsIEIr9j0%3D";

test(`${obj.url} 的最终签名是 ${sign} `, () => {
  expect(getSign(obj)).toBe(sign);
});
