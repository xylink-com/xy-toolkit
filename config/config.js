export default {
  exportStatic: {},
  outputPath: "/docs",
  nodeModulesTransform: {
    type: "none",
    exclude: [],
  },
  metas: [
    {
      name: "keywords",
      content: "xylink，tools，hook，toolkit，xylink-lodash，ak47",
    },
    {
      name: "description",
      content: "小鱼易连通用工具函数库",
    },
  ],
  mode: "site",
  title: "Toolkit",
  base: "/toolkit",
  publicPath: "/toolkit/",
  favicon: "https://cdn.xylink.com/wechatMP/images/login.ico",
  logo: "/toolkit/logo.png",
  dynamicImport: {},
  manifest: {},
  // links: [{ rel: "manifest", href: "/asset-manifest.json" }],
  // 主题色配置
  // 详见：https://github.com/umijs/dumi/blob/master/packages/theme-default/src/style/variables.less
  theme: {
    "@c-primary": "#3876ff",
  },
  locales: [
    ["en-US", "English"],
    ["zh-CN", "中文"],
  ],
  links: [{ rel: "stylesheet", href: "/toolkit/style.css" }],
  hash: true,
  resolve: {
    includes: ["guide", "src"],
  },
  navs: {
    "zh-CN": [
      null,
      { title: "GitHub", path: "https://github.com/xylink-com/toolkit" },
    ],
    "en-US": [
      null,
      { title: "GitHub", path: "https://github.com/xylink-com/toolkit/blob/master/README.en-US.md" },
    ],
  },
};
