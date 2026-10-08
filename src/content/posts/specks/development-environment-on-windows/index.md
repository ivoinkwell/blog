---
title: Windows 开发环境
category: 零碎随笔
published: 2026-05-25
image: ./cover.jpg
tags: ["开发设备", "随笔"]
---
之前写过一篇文章，是关于Windows上面搭建Web服务的，也就是这篇：

::post{slug="specks/windows-laptops-deploy-web-services"}

在给同学搭建的时候出现了这样一个问题，就是他在 Window 上面使用AI写的 `Next.js` 项目迁移到 Linux 服务器上面之后根本没有办法正常的编译运行，但是我对于 `Next.js` 这个框架没有任何的了解，我最后的办法是结合 AI 用我比较熟悉的 `Vue.js` 进行了简单的重写，最后能够在 Linux上面完美的运行。

这个时候我就有了一个问题一，也就是之前在 `bilibili` 上面看高天的视频，包括我自己写代码都是使用Linux，只不过我是使用 `Zed` 的 `SSH` 连接自己家里的 PVE 设备进行程序的编写，而高天则是使用 `WSL2 + VSCode` 这个组合，我就一直在考虑如果现在我手上只能有一台机器，但是这个机器必须是Windows系统，也必须使用 Linux 进行代码编写，是不是一定会绕不开 `WSL2`。

## Linux 开发环境的好处

Linux 上面是最好用于开发的，这个观点我一直是非常赞同的。就已这个前端现在必备的东西 —— `Node.js` 框架。

我在 Windows 上面想要用 `22` 和 `24` 两个版本，我要下载两个版本的安装包并且安装，但是 Linux 上面只需要一个 `nvm` 就能解决。切换版本直接使用命令：

```bash
nvm use [版本号]
```

直接就能解决，所以 Windows 上面做开发就会显得比较繁琐了……

<a class="btn-regular no-styling" style="display:inline-flex;align-items:center;justify-content:center;width:fit-content;padding:0.5rem 1.5rem;border-radius:0.5rem;font-size:0.875rem;line-height:1.25rem;color:var(--btn-content);text-decoration:none;font-weight:500;" href="https://github.com/nvm-sh/nvm">
nvm项目地址
</a>

## 宿主机是 Windows 前提下我对于虚拟 Linux 的选择

之前提到过我在 `bilibili` 上面看到的一个博主，他使用的就是 `WSL2` 的 Ubuntu，他是写 Python 的，当时在讲解 `lazy import` 这个知识点的，如果有兴趣可以自己去找找他，他视频里面使用的 `WSL2` 我一直是无法直接适应的，这个寄宿不像  PVE 的 LXC 容器那么简单，也看到很多执行 `rm -rf /*` 之后 Windows 都死了的案例，于是我还是选择了一个性能最不好的方案 —— 虚拟机。

虚拟机我选择的还是 `VMware` ，没啥特殊原因，主要是最近 CTF 的比赛题目在上面，不过如果以后写代码要再开一个机器这个便捷度估计也不低，但是有 `git` 代码还是比较好同步的，虚拟机的死活也不用十分重视，除非一直不提交。

还是有必要展示一下我使用 `Zed + PVE Develop 虚拟机` 搭建开发环境的效果，我感觉还是很舒服，性能也很好

![](https://pic.ivoinkwell.xyz/file/blog/specks/development-environment-on-windows/development-environment-on-windows.webp)
