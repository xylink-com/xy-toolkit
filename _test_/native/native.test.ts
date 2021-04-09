import Native, {native} from "../../src/native";
import Functions from "../../src/native/native";

describe("Generate class instance", () => {
  it("should native class correct", () => {
    expect(native instanceof Native).toBeTruthy();
  });
  it("All registered functions should be function", () => {
    Functions.common.forEach((func) => {
      const funcName = typeof func === "string" ? func : func.functionName;
      expect(typeof native[funcName]).toEqual("function");
    });
  });
});
