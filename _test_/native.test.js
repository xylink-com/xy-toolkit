const Native = require("../src/native").default;
const Functions = require("../src/native/native").default;

describe("Generate class instance", () => {
  it("should native class correct", () => {
    Native.setTitle("hello");
  });
  it("All registered functions should be function", () => {
    Functions.common.forEach((func) => {
      const funcName = typeof func === "string" ? func : func.functionName;
      expect(typeof Native[funcName]).toEqual("function");
    });
  });
});
