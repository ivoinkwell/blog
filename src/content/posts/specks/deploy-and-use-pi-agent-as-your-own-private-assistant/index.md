---
title: 部署并将Pi Agent作为自己的私人助手
category: 零碎随笔
published: 2026-08-30
image: ./cover.jpg
tags: ["随笔", "服务搭建"]
---

之前部署过玩过很多的 AI Agent，就像 OpenClaw，Hermes Agent，不是说他们不好用，就像 **[我的朋友](https://zeyun.org/posts/hermes_global/)** 他也是一个 Hermes Agent 的使用者。但是对于我来说，不管是 OpenClaw 还是 Hermes Agent 我觉得都偏离我对他们的定义 —— 一个比网页版 AI 更高效辅助我生活，学习的 AI Agent。最近看了 **[技术爬爬虾](https://b23.tv/vUd4fYf)** 和 **[第四种黑猩猩](https://b23.tv/mAn5nBa)** 的视频，给了我很多的启发，所以我就在思考，有没有可能 Pi Agent 就是我一直想找的 OpenClaw 和 Hermes 这类 Agent 的最佳选择。

## 效果展示

我将 Pi Agent 安装在了我 PVE 的一个LXC 容器当中，具体配置是这样的

![](https://pic.ivoinkwell.xyz/file/blog/specks/deploy-and-use-pi-agent-as-your-own-private-assistant/deploy-and-use-pi-agent-as-your-own-private-assistant.webp)

我安装了 Pi 的本体以及第四种黑猩猩写的 `pi-web` ，部署完之后的界面是这样的

![](https://pic.ivoinkwell.xyz/file/blog/specks/deploy-and-use-pi-agent-as-your-own-private-assistant/deploy-and-use-pi-agent-as-your-own-private-assistant-1.webp)

## 部署方式

上面的截图中也已经看到，我已经尝试完全交给 AI 去做了一个脚本，我不知道是不是我使用的模型太烂，但是的确经过了很多的更改最终才完全能理解且做出来的东西符合我的意图，我用的模型是 `mimo-v2.5`。

::github{repo="ivoinkwell/pi-installer"}

做这个东西目的不是因为 `pi-web` 这些东西不好安装，因为这个项目安装后涉及到很多的访问安全性问题，所以我和 Pi Agent 做了很多的调整，最后出来就是直接可以部署的快速脚本，使用方法可以去看 README 文档。

## 参数详解

我使用的场景是个人自己使用，一般是在家内网使用，但是既然是网页，那也要方便自己在外面也能够使用，所以我使用的是 Cloudflare Tunnel。

#### 域名

会要求配置域名是因为需要指定域名才能够访问，确保这个访问的安全性，这个域名不需要优先配置好，而是你需要使用什么域名进行访问，如果只是内网使用留空即可，外网将无法进行访问。

#### 密码

我建议这个一定要设置，如果说内网访问不方便，不想要密码，其实是可以直接开启一个内网端口直接访问，在脚本中会有提示，不填写则不会开启

### 用户名

直接使用的默认用户名 `Pi`

以上配置都是根据这个仓库的 README 文件，写 service 文件实现的。

::github{repo="agegr/pi-web"}

## 插件和skills

我目前还没有到非常需要使用这个的时候，比如完成作业什么的，但是写博客做一些新闻等内容的饿检索，所有文件转换到 Markdown 并且 AI 自动转换格式我是一直用的，所以我讲讲我的插件和 skills

### skills

我安装的就是爬爬虾讲过的这个，`markdown-converter`，去 skillhub 复制提示词

```text
请根据 https://skillhub.cn/install/skillhub.md，安装 @zcwl/markdown-converter。
```

安装完成后去 Web 页面再搜索安装一次就安装成功了

![](https://pic.ivoinkwell.xyz/file/blog/specks/deploy-and-use-pi-agent-as-your-own-private-assistant/deploy-and-use-pi-agent-as-your-own-private-assistant-2.webp)

### 插件

我用的最多的插件就是 `web-access`，可能效果没有别人一直使用的 `brave-search` 好用，但是最主要还是免配置，以及对我来说够用的效果

![](https://pic.ivoinkwell.xyz/file/blog/specks/deploy-and-use-pi-agent-as-your-own-private-assistant/deploy-and-use-pi-agent-as-your-own-private-assistant-3.webp)

安装也很简单，将下面的复制并如图粘贴即可开始安装

```text
npm:pi-web-access
```

![](https://pic.ivoinkwell.xyz/file/blog/specks/deploy-and-use-pi-agent-as-your-own-private-assistant/deploy-and-use-pi-agent-as-your-own-private-assistant-4.webp)

更多的插件可以去 **[官方应用商店](https://pi.dev/packages)** 去寻找自己喜欢的。