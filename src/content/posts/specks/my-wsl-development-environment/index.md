---
title: 我的 WSL 开发环境
category: 零碎随笔
published: 2026-07-31
image: ./cover.png
tags: ["随笔", "开发笔记"]
---
说起来我自己都不太相信，我有一天会用上WSL，可能有各种各样方面的力量推动……

## Windows 版本

最近一段时间，我从一些特殊版本的 Windows 上回到了正常的商业版本上，虽然不是出厂时候的家庭版，而是专业版，但是像 **`远程控制 (RDP) `** 这样的功能可以回来是否是真正意义上的正版其实已经无所谓了。但是我还是得说，不知道是错觉还是就是事实，专业版的续航是要比 LTSC 这些版本要好一些，主要是在盒盖待机上面。

## WSL 安装

输入命令

```bash
wsl --install --no-distribution
```

这样就不会默认安装 Ubuntu 这个发行版，我喜欢使用 Debian ，去微软商店下载一个 Debian 即可

![](https://pic.ivoinkwell.xyz/file/blog/specks/my-wsl-development-environment/my-wsl-development-environment.webp)

在开始菜单中打开，即可进行用户账户和密码的配置，密码要记住，后面 `sudo` 全部都靠这个密码提权。

## VSCode 连接

VSCode 连接需要下载插件。所以需要在 Linux 上面安装下载所需的工具 —— `curl` 和 `wget`。

```bash
sudo apt install curl wget
```

在本机 VSCode 中安装 `WSL` 插件

![](https://pic.ivoinkwell.xyz/file/blog/specks/my-wsl-development-environment/my-wsl-development-environment-1.webp)

同时按下 `Ctrl + Shift + P`，如图进行选择

![](https://pic.ivoinkwell.xyz/file/blog/specks/my-wsl-development-environment/my-wsl-development-environment-2.webp)

选择后会自动与 WSL 的 Debian 相连接

## 开发环境的搭建

AI 在现在这个时代确实是开发上不可缺少的辅助，但是好用的 agent 都是 CLI 的形式存在，他们虽然都能使用 npm 进行安装，但是我没有办法忍受 Windows 在安装完 Node.js 之后再用 npm 往磁盘写很多的细碎小文件，这个时候一个原生能使用的 Linux 虚拟机就是一个最好的选择。

对于我来说，AI 的作用也就是一个辅助，但是如果每一次与 AI 沟通还需要自己去找文件，再去问我会觉得很麻烦，一个本地的 Agent 会是一个更好的选择，所以我选择了一个能接入几乎所有模型的 Agent —— OpenCode ，相较于 Zed 自带的 Agent ，我觉得会更好用一些。在 **[技术爬爬虾的BliBili视频中](https://www.bilibili.com/video/BV1BVrXBUEbR/?spm_id_from=333.1387.list.card_archive.click)** 也有一个非常好用的插件，但是因为我只使用一个 DeepSeek 的模型就没有必要去使用了。
### 安装 OpenCode

打开 **[OpenCode 官网](https://opencode.ai/zh)** 直接复制那个 `curl` 的命令粘贴即可自动安装完成

```bash
curl -fsSL https://opencode.ai/install | bash
```

### 在 VSCode 当中安装插件

打开一个连接 WSL 的工作区，并且找到这个插件

![](https://pic.ivoinkwell.xyz/file/blog/specks/my-wsl-development-environment/my-wsl-development-environment-3.webp)

安装后便会出现在 WSL 的扩展中，这个时候我们就可以在 VSCode 中使用 OpenCode 了

![](https://pic.ivoinkwell.xyz/file/blog/specks/my-wsl-development-environment/my-wsl-development-environment-4.webp)

## 使用 WSL 的一些想法

其实我在很久之前非常讨厌的就是嵌套，我要是做开发直接使用 Linux 的发行版就好，在 Windows 里面用 WSL 开发纯有病的一个行为，但是现在我接触与使用的软件越来越多，而很多软件他没有给 Linux 的发行版做适配，就算是做适配的软件厂商，它的适配不仅烂，而且资源占用还比 Windows 的高很多，国内的 Linux 适配就更差了，甚至有的软件你更新都不敢轻易的更新，保不准就有依赖问题出现。

虽然说兼容性上面差，OpenCode 这样的平台优先给 Linux 和 MacOS 做开发，但是很多小工具还是会优先供给 Windows ，就像我手上一个 Windows 所有版本 ESD 的快速下载器，虽然说 MacOS 可能只有在虚拟机里面安装 Windows 的时候不需要，但是想要某一个版本的时候应该还是很有用的……