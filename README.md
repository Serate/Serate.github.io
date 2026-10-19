# serate.github.io

[Serate](https://github.com/Serate) 的个人主页与技术博客，部署在 GitHub Pages。

- **技术栈**：Astro 7（静态输出）+ 原生 CSS + 少量原生 JS，无前端框架
- **内容**：作品集（作品集首页）+ Markdown 博客（内容集合 + RSS + 标签归档）
- **部署**：GitHub Actions 自动构建并发布到 `https://serate.github.io`

## 本地开发

```bash
npm install
npm run dev        # http://localhost:4321
```

常用命令：

```bash
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
npm run check      # 类型检查
```

## 目录结构

```text
src/
├── components/     # Header / Footer / Icon / ProjectCard / PostList / PointCloud ...
├── content/
│   └── blog/       # 博客 Markdown 文章
├── content.config.ts  # 内容集合 schema
├── data/site.ts    # 站点信息、项目、能力分组等集中维护的内容
├── layouts/        # BaseLayout
├── pages/          # 路由：/ /blog/ /blog/[id]/ /tags/ /tags/[tag]/ /404 /rss.xml
└── styles/
    ├── fonts.css   # 自动生成：自托管字体的 @font-face
    └── global.css  # 设计令牌与全站样式
```

## 写一篇新文章

在 `src/content/blog/` 下新建 `.md` 文件，加上 frontmatter 即可：

```markdown
---
title: '标题'
description: '一句话摘要，会用于列表页、RSS 和 SEO'
pubDate: 2026-10-19
tags: ['空间智能', '3D 渲染']
draft: false
---

正文。
```

- `draft: true` 的文章不会出现在任何列表、RSS 和标签页中
- `pubDate` / `updatedDate` 支持 YAML 日期格式
- 标签会自动汇总到 `/tags/` 归档页

## 维护站点信息

个人资料、项目列表、能力分组集中在 `src/data/site.ts`，改这一个文件即可更新首页的全部内容。

## 资源生成脚本

两个一次性资源生成脚本，产物都已提交进仓库，正常构建不需要执行：

```bash
npm run fonts   # 重新下载并自托管拉丁字体到 public/fonts/
npm run og      # 重新生成 public/og-image.png（社交分享图）
```

字体只取拉丁子集，中文字形走系统字体栈（PingFang SC / 微软雅黑 / Noto Sans CJK），
不下载 CJK 字体包 —— 整站零外部字体请求，国内外访问速度一致。

## 部署

推送到 `main` 分支即触发 `.github/workflows/deploy.yml`：安装依赖 → 构建 →
上传产物 → 发布到 GitHub Pages。

首次启用需要在仓库 **Settings → Pages → Build and deployment** 中把 Source 选为
**GitHub Actions**。

## License

MIT
