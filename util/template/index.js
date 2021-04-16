const colors = require("colors");
const path = require("path");
const fs = require("fs");
// const templates = require("./fileTemplate");
const toolName = process.argv[2];
const camelCaseToolName =
  toolName.slice(0, 1).toLowerCase() + toolName.slice(1);

console.info("Recommend tool name to be camel case.".yellow);

if (!toolName) {
  console.error("Tool name must not empty.".red);
  process.exit(1);
}

console.info(`Create tool with name: ${toolName}.`.yellow);

const rootPath = path.resolve(__dirname, `../../`);
const toolPath = path.resolve(__dirname, `../../src/${camelCaseToolName}`);

// 创建src/toolName 目录：存放工具源码
if (fs.existsSync(toolPath)) {
  console.info(
    `Tool with name ${toolName} already exists, choose another name.`.red
  );
  process.exit(1);
} else {
  fs.mkdirSync(toolPath);
}

function checkTemplateValid(template, path) {
  let isValid = true;
  if (!template.fileName) {
    console.error(`File name of template cannot be empty.`.red);
    isValid = false;
  }
  if (!isValid) {
    console.error(`From path: ${path}`.red);
    process.exit(1);
  }
}

// 创建源码模板文件
const toolTemplateFilePath = path.resolve(
  __dirname,
  "./fileTemplate/tool.template.js"
);
const toolTemplateFile = require(toolTemplateFilePath);
const toolTemplates = toolTemplateFile(toolName);
console.info(`Create source template with name ${toolName} ...`);
toolTemplates.forEach((template) => {
  checkTemplateValid(template, toolTemplateFilePath);
  const { fileName, content = "" } = template;
  fs.writeFileSync(`${toolPath}/${fileName}`, content);
});

// src/index.ts：自动在全局项目中注册导出工具类
console.info(`Register tool to export of repo ...`);
const indexFileName = "index.ts";
const registerContent = `export * from "./${camelCaseToolName}";\n`;
fs.writeFileSync(
  path.resolve(rootPath, `src/${indexFileName}`),
  registerContent,
  {
    flag: "a",
  }
);

// test/ToolName/ToolName.test.js：工具类的测试代码
console.info(`Create test template with name ${toolName} ...`);
const testDirPath = path.resolve(rootPath, `_test_/${camelCaseToolName}`);
const testTemplateFile = require("./fileTemplate/test.template");
const testTemplate = testTemplateFile(toolName);
if (fs.existsSync(testDirPath)) {
  console.error(
    `Test dir already exists with name ${fileName.toLowerCase()}.`.red
  );
} else {
  fs.mkdirSync(testDirPath);
  checkTemplateValid(testTemplate);
  const { fileName, content = "" } = testTemplate;
  fs.writeFileSync(path.resolve(testDirPath, fileName), content);
}

// guide/pages/ToolName/toolName.lang.md：文档的默认格式
console.info(`Create doc templates with name ${toolName} ...`);
const docPath = path.resolve(rootPath, `guide/pages/${camelCaseToolName}`);
if (fs.existsSync(docPath)) {
  console.info(`Docs dir already exists with name ${camelCaseToolName}`);
} else {
  fs.mkdirSync(docPath);
}
const docTemplateFile = require("./fileTemplate/doc.template");
const docTemplates = docTemplateFile(toolName);
docTemplates.forEach((template) => {
  checkTemplateValid(template);
  const { fileName, content = "" } = template;
  fs.writeFileSync(path.resolve(docPath, fileName), content);
});

// README.md和 guide/README.lang.md：在 文档中注册您的工具类并添加说明文档跳转链接
console.info(
  `Register tool to README with name ${toolName}.Update Readme status if any stage changed.`
);
const readme = ["README.md", "README.en-US.md", "README.zh-CN.md"];
const readmeRegisterContent = `| ${toolName} |  | 未开始 |  |\n`;

readme.forEach((file) => {
  const readmePath = [
    path.resolve(rootPath, file),
    path.resolve(rootPath, `guide/${file}`),
  ];
  readmePath.forEach((path) => {
    if (fs.existsSync(path)) {
      fs.writeFileSync(path, readmeRegisterContent, {
        flag: "a",
      });
    } else {
      // console.error(`Readme file not exist, path: ${path}`);
    }
  });
});
