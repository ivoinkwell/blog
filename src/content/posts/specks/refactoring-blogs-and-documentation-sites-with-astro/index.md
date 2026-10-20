---
title: 使用Astro重构博客和文档站
category: 零碎随笔
published: 2026-08-22
image: ./cover.jpg
tags: ["博客搭建", "随笔"]
---

之前一直使用 Hugo 做博客框架，文档站就使用比较简单的 VitePress 作为框架，但是这两个框架在我这里体验都不是非常地好，相应速度上面都多多少少差点意思，最后在 AI 的推荐之下尝试了一个全新的框架 —— Astro。

## 博客

博客在我这里的定位更多是按照时间线记录自己探索与实践文章的地方，所以重点是时间以及个人介绍，所以我看上了这个主题 —— **[Fuwari](https://fuwari.vercel.app/)**

### 主题安装

打开主题的 GitHub 项目

::github{repo="saicaca/fuwari"}

根据项目的 REDME 文档进行主题的安装，我选择使用 pnpm 包管理器进行安装，所以需要先安装 pnpm 这个包管理器

```bash
npm install -g pnpm
```

复制 README 文档当中的主题安装命令进行安装

```bash
pnpm create fuwari@latest
```

根据提示输入项目文件夹即可，要求输入自己博客的名称，subtitle等默认即可，自己输入也不会在配置文件当中体现。

### 主题预览与配置文件修改

主题预览，进入项目文件夹，输入命令进行预览

```bash
pnpm dev
```

配置文件位置如下图所示

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro.webp)

文章位置则是在上方 post 文件夹内，文章需要写专门的 Frontmatter，格式如下

```markdown
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: jp      # Set only if the post's language differs from the site's language in `config.ts`
---
```

这个博客有一个缺点，就是没有友链的模板，不能直接使用，我自己添加了一个自己的模板，在这里也将模板写出来

```astro title="/src/pages/friends.astro"
---
import { getEntry, render } from "astro:content";
import Markdown from "@components/misc/Markdown.astro";
import MainGridLayout from "../layouts/MainGridLayout.astro";

const friendsPost = await getEntry("spec", "friends");

if (!friendsPost) {
	throw new Error("Friends page content not found");
}

const { Content } = await render(friendsPost);
---
<!-- 页面标题在 src/content/spec/friends.md 里，导航入口在 src/config.ts -->
<MainGridLayout title="友链" description="友链">
	<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
		<div class="card-base z-10 px-9 py-6 relative w-full">
			<Markdown class="mt-2">
				<Content />
			</Markdown>
		</div>
	</div>
</MainGridLayout>
```

```markdown title="/src/content/spec/friends.md"
# 友链

  

欢迎与我交换友链！请先添加本站，再通过邮件或 Telegram 联系我，并附上你的站点信息：

  

- 站点名称

- 站点地址

- 头像地址

- 一句话简介

  

确认后我会尽快把好友添加到下面的列表里～

  

<div id="friends-links" class="not-prose" role="list" aria-label="友链列表"></div>

  

<style>

/* 友链网格布局 */

#friends-links {

  margin: 20px 0;

  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));

  gap: 16px;

}

  

/* 友链卡片图标样式 */

.friend-card .friend-icon {

  width: 52px;

  height: 52px;

  border-radius: 12px;

  flex-shrink: 0;

  position: relative;

  background: var(--btn-card-bg);

  border: 2px solid var(--btn-card-border);

  overflow: hidden;

  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  transform-origin: center center;

}

  

.friend-card:hover .friend-icon {

  transform: scale(1.1);

  border-color: oklch(0.7 0.15 var(--hue));

  box-shadow: 0 4px 14px oklch(0.6 0.15 var(--hue) / 0.3);

}

  

.friend-card .friend-icon .icon-placeholder {

  position: absolute;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.25rem;

  font-weight: 700;

  color: white;

  background: linear-gradient(135deg, oklch(0.65 0.15 var(--hue)), oklch(0.55 0.18 var(--hue)));

}

  

.friend-card .friend-icon .icon-img {

  position: absolute;

  top: 50%;

  left: 50%;

  transform: translate(-50%, -50%);

  max-width: 80%;

  max-height: 80%;

}

</style>

  

<script>

(function () {

  // 友链数据：添加或修改友链只需编辑下面的数组

  // 字段说明：name(站点名称) / desc(一句话简介) / url(站点地址) / logo(图标地址)

  const friendLinks = [

  { name: "InkNoteWell", desc: "我的文档知识库，更新中……", url: "https://docs.ivoinkwell.xyz", logo: "https://docs.ivoinkwell.xyz/apple-touch-icon-167x167.webp" },

  { name: "Inkwell Drive", desc: "我的网盘，博客以及文档站文章中出现的附件均可以在网盘中下载", url: "https://drive.ivoinkwell.xyz", logo: "https://ivoinkwell.xyz/favicon/favicon.ico" },

  { name: "Quick Reference", desc: "一个好用的编程知识点速查网站", url: "https://wangchujiang.com/reference/", logo: "https://wangchujiang.com/reference/icons/touch-icon-iphone-retina.webp" },

  { name: "云泽の小屋", desc: "最好的朋友，他的博客是世界上最详细网络安全实践笔记！", url: "https://zeyun.org", logo: "https://zeyun.org/media/website/Happy_Mac.webp" },

  { name: "猪老师在线", desc: "最有能力的老师，网络安全没人比他讲的更好！", url: "https://www.pigteacher.com", logo: "https://www.pigteacher.com/wp-content/uploads/2025/01/cropped-1-180x180.jpg" },

  { name: "云泽の小屋-网站推荐", desc: "优秀网站的收藏夹", url: "https://zeyun.org/good_web.html", logo: "https://zeyun.org/media/website/Happy_Mac.webp" },
  ];

  

  const container = document.getElementById("friends-links");

  if (!container) return;

  

  friendLinks.forEach((item) => {

    const initial = [...item.name.trim()][0] || "?";

    const card = document.createElement("a");

    card.className =

      "friend-card no-styling card-base group flex items-start gap-4 p-4 hover:bg-[var(--btn-card-bg-hover)] active:bg-[var(--btn-card-bg-active)] active:scale-95";

    card.href = item.url;

    card.target = "_blank";

    card.rel = "noopener noreferrer";

    card.setAttribute("role", "listitem");

    card.setAttribute("aria-label", `访问 ${item.name} - ${item.desc}`);

  

    card.innerHTML = `

      <span class="friend-icon">

        <span class="icon-placeholder">${initial}</span>

        <img class="icon-img" src="${item.logo}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'" />

      </span>

      <span class="flex-1 min-w-0">

        <span class="flex items-center gap-1.5 font-bold text-lg text-90">

          <span class="truncate">${item.name}</span>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" class="text-30 opacity-0 group-hover:opacity-100 transition flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>

        </span>

        <span class="block text-sm text-75 mt-1 line-clamp-2">${item.desc}</span>

      </span>

    `;

  

    container.appendChild(card);

  });

})();

</script>
```

按照路径复制进去之后更改即可获得这样的一个页面

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro-1.webp)

## 文档站

文档站我主要用于记录一个系列的文章，所以保持 VitePress 的简洁样式我就觉得很好，所以选择了 **`Starlight + Starlight Nova 主题`**。

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro-2.webp)
其实可以猜猜为什么截图是浅色模式，倒不是因为主题不支持，而是深色模式有的地方显示确实对比度太高而有点瞎眼

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro-3.webp)

这个就是深色模式的代码展示，对比度看着确实不是非常舒服，但是我坚持使用这个主题只有一个原因，就是因为简洁的外观，所以使用了这个主题。

### 创建文档站

点击下方文字跳转到官方说明页面

**[点击打开说明页面](https://starlight.astro.build/zh-cn/getting-started/)**

根据说明使用包管理器进行安装，我依然选择使用 pnpm 包管理器进行安装

```bash
pnpm create astro --template starlight
```

### 项目预览

和博客相同，进入项目后输入一下命令即可，构建速度会比博客快很多

```bash
pnpm dev
```

### 主题安装

首先选择自己喜欢的主题，可以 **[在官方主题选择页面](https://starlight.astro.build/zh-cn/resources/themes/)** 进行选择

我选择的是 **[Starlight Nova](https://starlight-theme-nova.pages.dev/)** 这个主题，进入官方安装页面进行安装

```bash
pnpm add starlight-theme-nova
```

随后对配置文件进行编辑

```javascript title="/astro.config.mjs" ins={19}
// @ts-check

import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

import starlightThemeNova from 'starlight-theme-nova'

  

// https://astro.build/config

export default defineConfig({

    integrations: [

        starlight({

            plugins: [starlightThemeNova(/* options */), ],

            title: 'InkNoteWell',

            description: 'Notes with Ink',
```

安装完成之后即可显示出上方展示页面

### banner 图相关

这个地方的图片我不知道怎么称呼，我就称呼为 banner 了，也就是下面这个地方

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro-4.webp)

这个地方有一个坑，就是只能显示正方形图片，不相信你可以用新的标签页打开看

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro-5.webp)

这个就是一个正方形，所以如果使用异性图片要会自己 PS ，使用网页版也可以解决，也就是 **[Photopea](https://www.photopea.com/#)** ，将图片补全成为一个正方形导出即可，但是 **补全的地方背景要进行删除** 。

### Frontmatter

这个相比博客可以简单一些，例如这样

```markdown
---
title: '我的第一篇文章'
---
```

这样的话直接将一级标题作为文章标题去写文章最后将其加上 Frontmatter 也会更省事一点。

## 加载速度优化

用 Astro 重构我的本质意图还是为了加载与渲染的性能，所以做一些图片的 CDN 配置是很有必要的，所以我做了图床的 CDN 策略，没有图床也可以根据我的配置去改变一些博客域名的配置

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro-6.webp)

我选择在边缘缓存一年，像是博客的静态图片可以选择这样的策略，也不会影响文字的正常变更

![](https://pic.ivoinkwell.xyz/file/blog/specks/refactoring-blogs-and-documentation-sites-with-astro/refactoring-blogs-and-documentation-sites-with-astro-7.webp)

至此，加载速度应该已经是免费版本 Cloudflare 托管的极限了。