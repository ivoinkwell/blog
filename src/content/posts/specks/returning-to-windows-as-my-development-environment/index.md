---
title: 重新将Windows作为我的开发环境
category: 零碎随笔
published: 2026-11-14
image: ./cover.jpg
tags: ["开发笔记", "随笔"]
---

在 VSCode 完全偏离一个编辑器应有的准则之后，我重新回到了 VScodium，回去之后才发现，其实也并非只能使用 WSL2。

## 使用 WSL2 作为开发环境的容器

之前一段时间，我一直是使用 WSL2 作为我开发环境的隔离。其实主要原因还是觉得 Node.js 安装很多包之后会导致我整个 Windows 环境全是垃圾，毕竟我现在为了保存我的数据，也开始使用 C D 的分盘方法来保存数据了。

还有一个一直离不开的原因，就是 C 语言的编译，我写代码需要使用 Git 去做版本的控制，所以 DevC++ 这样集成 MinGW64 的编辑器我就没有办法去安装和使用。还有一个更简单的方法，就是使用微软给你预置好的 IDE —— Microsoft Visual Studio。

但是对我稍微了解一点的人应该都知道，我不是一个喜欢预置的人，除非你能做到和 OPPO 的系统一样，一切预置都能不减弱性能，否则我还是会更喜欢自己掌握。

所以，我又重新走了一遍之前很早之前的环境配置方法，才发现我已经能够跑通之前的想法了。

## Node.js 环境

其实我一直觉得 `npm` 是一个非常讨厌的东西，但是后面我发现，`pnpm` 才是最难搞的包管理器。

我的习惯是软件和系统全部在 C 盘，只有重要的数据文件会放在 D 盘存放起来，所以我只需要将全局包和缓存移动到开发目录就可以了，所以我只需要这样：

```bash
npm config set cache "D:\Develop\nodejs\cache"
```

```bash
npm config set prefix "D:\Develop\nodejs\global"
```

然后就可以开始安装 `pnpm` 包管理器

```bash
npm install -g pnpm
```

安装完之后可以去看一下自己的 `global` 目录是否存在这样的一个文件

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment.webp)

现在我们需要将全局包加入到系统的环境变量当中

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-1.webp)

这个时候我们可以查看一下 `pnpm` 的安装位置

```bash
where pnpm
```

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-2.webp)

然后我们需要去更改一下缓存以及全局包等东西的位置

```bash
# 1. 核心：设置全局 Store 目录（最占空间，硬链接的源头）
pnpm config set store-dir "D:\pnpm-store"

# 2. 设置全局安装的包目录
pnpm config set global-dir "D:\pnpm-global"

# 3. 设置全局可执行文件 (bin) 目录
pnpm config set global-bin-dir "D:\pnpm-bin"

# 4. 设置缓存和状态目录
pnpm config set cache-dir "D:\pnpm-cache"
pnpm config set state-dir "D:\pnpm-state"
```

## C / C++ 与 VScodium

写 C 语言的程序其实最难的就是在代码界面，其实我一直没有找到过一个界面显示非常好的编辑器，直到我开始使用 Clangd。

首先需要安装 Clangd 插件

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-3.webp)

然后需要安装 Clangd 软件，首先要去 GitHub **[下载](https://github.com/clangd/clangd/releases/latest)**

下载后解压

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-4.webp)

然后将其 `/bin` 目录加入系统环境变量

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-5.webp)

Clangd 插件不再报错，已经可以找到前端高亮的渲染组建了，但是并未连接到后面的编译器 `MinGW64` ，根据 DeepSeek Harness 的检查，最后给了这样的一个方法 —— 编写 `.clangd` 文件确定编译器位置。

首先需要[下载编译器](https://github.com/niXman/mingw-builds-binaries/releases)

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-6.webp)

然后解压，将 `/bin` 目录加入系统环境变量

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-7.webp)

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-8.webp)

然后编写 `.clangd` 文件

```ini
CompileFlags:
  Compiler: [gcc.exe文件的路径，写到gcc.exe]
```

然后界面显示就可以一切正常了

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-9.webp)

## VSCodium 代码运行

我非常喜欢 JetBrains 的 IDE 里面的一个功能，就是右键运行程序代码，正好默认的 VSCodium 是没有相关运行代码的能力的，所以我就去找了一个非常好用的插件 —— `Quick Code Runner`

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-10.webp)

相较于 `Code Runner`，这个插件最好的一点就是在运行 C 语言程序的时候，不会出现中文的乱码错误

## SpringBoot

最近想试试技能大赛需要的东西，所以准备写一个 `SpringBoot + Vue + Redis + MySQL` 的一个系统，主要是学习，这个系统肯定不能用，但是我想说的是开发前的环境配置

JDK 25 肯定是用的 OpenJDK，但是 `SpringBoot` 想要运行还是需要一个项目的开发和理解工具 —— `Maven`

配置 `Maven` 很有意思，就是都知道下载完成之后需要将其加入到系统环境变量当中

![](https://pic.ivoinkwell.xyz/file/blog/specks/returning-to-windows-as-my-development-environment/returning-to-windows-as-my-development-environment-11.webp)

但是这样，当这个项目运行的时候，所有的仓库环境还是会下载到你的 C 盘当中去，所以你需要在 `C:\Users\[你的用户名]\.m2` 目录当中写一个 `settings.xml` 文件来转移 `repository` 目录的位置

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0
          http://maven.apache.org/xsd/settings-1.2.0.xsd">
    
    <!-- 添加下面这行，指定新的本地仓库路径 -->
    <localRepository>D:/Develop/maven/repository</localRepository>
    
    <!-- 其他配置... -->
</settings>
```

剩下就是几个基础的插件，写 Vue 一定要装 Vue 插件，写 Java 要装 Java 插件，但是创建 Spring 项目最好还是要安装一下 VMware 开发的 `Spring Boot Extension Pack`，这样初始化项目也会方便很多。