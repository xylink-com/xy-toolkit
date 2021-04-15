// note: Readme 风格参考自 antd。
module.exports = (name) => {
  const toolName = name.slice(0, 1).toLowerCase() + name.slice(1);
  return [
    {
      fileName: `${toolName}.zh-CN.md`,
      content: `# ${name}

一些描述...

## 何时使用

## 代码演示

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

## API

## TODO
`,
    },
  ];
};
