const ts = require("typescript");

// note: Readme 风格参考自 antd。
module.exports = (name) => {
  const toolName = name.slice(0, 1).toLowerCase() + name.slice(1);
  return [
    {
      fileName: `${toolName}.zh-CN.md`,
      content: `# ${name}

一些描述...

## 何时使用

## 代码案例

\`\`\`ts

\`\`\`

更多代码案例请参考：[${name} 测试文件](../../../_test_/${toolName}/${toolName}.test.ts)

## API

## TODO
`,
    },
    {
      fileName: `${toolName}.en-US.md`,
      content: `# ${name}

Some description about your tool...

## When To Use

## Examples

\`\`\`ts

\`\`\`

More examples found：[${name} test file](../../../_test_/${toolName}/${toolName}.test.ts)

## API

## TODO
`,
    },
  ];
};
