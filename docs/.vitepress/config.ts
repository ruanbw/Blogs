import { DefaultTheme, defineConfig } from "vitepress";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

export default defineConfig({
  title: "软软 Blog",
  description: "Just playing around.",
  // base: "/Blogs/",
  // srcDir:"/docs",
  markdown: {
    lineNumbers: true,
  },
  // 最后更新
  lastUpdated: true,
  // 忽略死链
  ignoreDeadLinks: true,
  themeConfig: {
    siteTitle: "软软 Blog",
    logo: "./logo.svg",
    outlineTitle: "本页目录",
    outline: "deep",
    // 搜索
    search: {
      provider: "local",
    },
    // 带有图标的社交帐户链接
    socialLinks: [{ icon: "github", link: "https://github.com/1813967922" }],
    // 导航栏
    nav: [{ text: "首页", link: "/index" }],

    // 编辑链接
    editLink: {
      pattern: "https://github.com/1813967922/Blogs/tree/master/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },
    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present 软软",
    },
    lastUpdatedText: "最近更新时间",
  },
  vite: {
    plugins: [
      AutoSidebar({
        // 从index.md文件中读取标题
        titleFromFile: true,
        // 忽略的文件夹
        ignoreList: ["img"],
        // 忽略文件夹中的index.md文件,因为只从index.md文件中读取标题
        ignoreIndexItem: true,
        collapsed: true,
        beforeCreateSideBarItems: (data: string[]) => {
          return data;
        },
        sideBarResolved: (data: DefaultTheme.SidebarItem[]) => {
          return data;
        },
        sideBarItemsResolved: (data: DefaultTheme.SidebarItem[]) => {
          if (data[0].items) {
            const result: DefaultTheme.SidebarItem[] = [];
            data.forEach((item) => {
              if (item.text === "介绍") {
                item.collapsed = true;
                result.unshift(item);
              } else {
                result.push(item);
              }
            });
            return result;
          } else {
            return data;
          }
        },
      }),
    ],
  },
});
