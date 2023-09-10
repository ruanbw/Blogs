# Github Actions 自动化部署 Vitepress

使用 Github Actions 自动化部署 Vitepress 项目，实现提交代码自动部署静态页面

## 什么是 Github Actions ?

itHub Actions 是 GitHub 提供的一项持续集成和部署服务。它允许您在代码仓库中自动化执行各种任务，如构建、测试、部署和其他自定义工作流程。

使用 GitHub Actions，您可以创建一个包含多个步骤的工作流程，每个步骤都可以在不同的操作系统和环境中运行。每个步骤可以使用预定义的操作（例如构建工具、测试框架、部署工具等）或自定义脚本来完成特定的任务。

GitHub Actions 可以与 GitHub 的事件触发器（例如推送、拉取请求、问题创建等）结合使用，使您的工作流程可以在特定的事件发生时自动触发执行。

使用 GitHub Actions 的好处包括：

- 自动化构建、测试和部署工作流程，减少人工操作和减轻开发人员的负担。
- 可以在多个操作系统和环境中运行，以确保您的代码在不同平台上的兼容性。
- 与 GitHub 无缝集成，可以直接在 GitHub 上查看工作流程的执行结果和日志。
- 支持自定义脚本和第三方工具，以满足您特定的需求。

通过编写 `.github/workflows` 目录下的 YAML 文件，您可以定义和配置 GitHub Actions 的工作流程，并将其与您的 GitHub 仓库进行绑定。

总之，GitHub Actions 提供了一种强大而灵活的方式来自动化和管理软件开发过程中的各种任务和工作流程。

## 什么是 VitePress ?

Vitepress 是一个基于 Vue.js 的静态网站生成器。它专注于为文档编写提供简洁、快速和易用的工具和环境。

Vitepress 基于 Vite 构建工具，利用了其快速的开发服务器和热重载功能，使您可以在开发文档时获得实时的预览和快速的反馈。

Vitepress 的主要特点包括：

1. **Markdown 驱动**：使用 Markdown 编写文档，可以使用 Markdown 的语法和标记来快速编写内容。

2. **Vue 组件支持**：可以在 Markdown 中使用 Vue 组件，将其嵌入到文档中，以实现更复杂的交互和功能。

3. **快速的开发服务器**：Vitepress 使用 Vite 的开发服务器，支持热重载和快速构建，可以在本地实时预览和调试文档。

4. **自定义主题**：Vitepress 提供了一个灵活的主题系统，您可以根据需要自定义和扩展主题的外观和样式。

5. **自动化部署**：Vitepress 可以轻松地在 GitHub Pages、Netlify、Vercel 等平台上进行部署，使您的文档可以方便地在线访问。

Vitepress 的目标是提供一种简单、快速和灵活的方式来编写和发布文档。它适用于各种类型的文档，包括技术文档、API 文档、用户手册等。

总之，Vitepress 是一个现代化的静态网站生成器，为文档编写提供了一种简单、快速和易用的方式，使您可以专注于编写内容而不用担心复杂的配置和构建过程,旨在构建快速、以内容为中心的网站。简而言之，VitePress 获取用 Markdown 编写的源内容，为其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

VitePress 常常被用来制作一门技术、框架、库的使用文档

例如：

[VitePress 官网](https://vitepress.dev/)

[Vue3 官网](https://cn.vuejs.org/) 一个前端的渐进式框架

[Vite 官网](https://cn.vitejs.dev/) 一个前端工程的构建管理工具

......

以上这些官方网站都是用的VitePress进行制作

## 准备工作

### 检查 ssh 秘钥

- 这里以 Win11 为例，检查你的 ssh 秘钥是否存在系统中的 C:\Users\你的用户名\\.ssh 文件夹下 ，不存在则自行百度

- 如果存在，你会看到 id_rsa 和 id_rsa.pub 两个文件 id_rsa 是私钥 id_rsa.pub 是公钥

### 新建一个 Github 仓库

- 这里以 2023 年 7 月 20 日 为标准，Github 可能会改版，页面样式或者选择肯不在我说的地方了

- 准备两个分支 master 和 gh-page

- 配置部署秘钥：仓库右上角的 Settings 中左侧的 Deploy keys 菜单中创建。Title 随便填，Key 填入 id_rsa.pub 文件中的内容，勾选上 Allow write access 选项，然后点击 Add key 即可。

- 配置Action秘钥：在仓库右上角的 Settings 中左侧的 Secrets and variables 菜单下的 Actions 选项中点击右上角的 New repository secret 绿色按钮创建，Name 随便填我这里写（VITEPRESS_BLOGS_TOKEN）后面会用到，Key 填入 id_rsa 文件中的内容，然后点击 Add secret 即可。

- 配置 Github Pages：在仓库右上角的 Settings 中左侧的 Pages 菜单中，选择 Source 项的值为 Deploy from a branch （意思是从分支中部署），选择下面 Branch 一项的第一个下拉框为 gh-page，第二个下拉框为根目录，点击保存即可。

### 按照官网的开始开始初始化一个 VitePress 项目[点这里](https://vitepress.dev/guide/getting-started#installation)

这里跳过...

## 编写 deploy.yml

在项目根目录创建一个 .github\workflows\deploy.yml 文件
```yml
name: Deploy
# 监听推送分支master，监听到的话会执行下面jobs任务
on:
  push:
    branches:
      - master
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v2
        with:
          version: 6.32.9
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - run: pnpm install && pnpm docs:build
      # 部署到 GitHub Pages
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.VITEPRESS_BLOGS_TOKEN }}
          publish_dir: docs/.vitepress/dist
          publish_branch: gh-pages
```

::: info 提示
secrets.VITEPRESS_BLOGS_TOKEN 来自创建仓库右上角的 Settings 中左侧的 Secrets and variables 菜单下的 Actions 选项中创建
:::

## 测试

提交代码到仓库的 master 分支中，等待部署完成并查看部署页面

::: info 提示
- 如果你要部署到 https://你的github账号.github.io/当前仓库名 这个地址时需要修改 vitepress 项目中的 docs/.vitepress/config.ts 文件中的 base 字段为你的仓库名
- 部署到 https://你的github账号.github.io/ 则不需要
:::

## 使用自定义域名

如果你不想使用 Github 提供给你的域名 https://你的github账号.github.io/ 时

- 准备一个域名
- 在域名购买平台添加域名解析

这里以阿里云为例

1、在域名解析控制台中选择你的域名并点击域名解析设置并添加一条记录

2、记录类型选择 CNAME 、记录值可写可不写，这里我写 blog （具体可百度顶级域名和二级域名的区别）

3、记录值写 Github 提供给你的域名 https://你的github账号.github.io/

- 在仓库中配置

1、打开仓库的 Pages 管理页面

2、把你的域名填到 Custom domain 中保存即可带等待一会就可以通过你的域名访问了，因为我 上面记录值写了 blog 我需要通过 blog.域名 进行访问