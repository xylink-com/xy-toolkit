module.exports = (name) => {
  const toolName = name.slice(0, 1).toLowerCase() + name.slice(1);
  return {
    fileName: `${toolName}.test.js`,
    content: `import ${name} from "../../src/${toolName}";

describe("Some test module for your tool.", () => {
  it("Something should run as your expect.", () => {});
});\n`,
  };
};
