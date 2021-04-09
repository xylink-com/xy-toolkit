module.exports = (name) => {
  const toolName = name.slice(0, 1).toLowerCase() + name.slice(1);
  return [
    {
      fileName: `${toolName}.zh-CN.md`,
      content: ``,
    },
    {
      fileName: `${toolName}.en-US.md`,
      content: ``,
    },
  ];
};
