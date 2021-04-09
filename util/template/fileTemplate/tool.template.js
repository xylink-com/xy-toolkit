module.exports = (name) => {
  const toolName = name.slice(0, 1).toLowerCase() + name.slice(1);
  return [
    {
      fileName: "index.ts",
      content: ``,
    },
    {
      fileName: `${toolName}.ts`,
      content: ``,
    },
    {
      fileName: `${toolName}.type.ts`,
      content: ``,
    },
    {
      fileName: `${toolName}.config.ts`,
      content: ``,
    },
    {
      fileName: `${toolName}.util.ts`,
      content: ``,
    },
  ];
};
