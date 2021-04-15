module.exports = (name) => {
  const toolName = name.slice(0, 1).toLowerCase() + name.slice(1);
  return [
    {
      fileName: "index.ts",
      content: `export { default as ${name} } from "./${toolName}.ts";\n`,
    },
    {
      fileName: `${toolName}.ts`,
      content: `import config from "./${toolName}.config.ts";

class ${name} {
  constructor() {
    
  }
}

export default ${name};`,
    },
    {
      fileName: `${toolName}.type.ts`,
      content: `/**       类型与接口       **/\n`,
    },
    {
      fileName: `${toolName}.config.ts`,
      content: `/**       常量与配置       **/

export default {}\n`,
    },
    {
      fileName: `${toolName}.util.ts`,
      content: `/** 工具类逻辑相关的非通用的工具函数 **/\n`,
    },
  ];
};
