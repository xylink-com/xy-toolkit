module.exports = (name) => {
  const toolName = name.slice(0, 1).toLowerCase() + name.slice(1);
  return {
    fileName: `${toolName}.test.ts`,
    content: `import ${name} from "../../src";

describe("Some test module for your tool.", () => {
  it("Something should run as your expect.", () => {});
});\n`,
  };
};
