---
title: Windows进程与服务
category: 系统基础笔记
published: 2026-03-24
image: ./cover.png
---
## 概述

在整理之前我想先讲讲我对于进程与服务的认识。

尽管教材上面是用Windows来引入的进程与服务，但是对于我来说，却是Linux带我学习并且了解的这个概念。在疫情在家学习的那几个月，我开始接触Linux操作系统，后来到了初三毕业及之后我开始使用窗口管理器——i3wm，也是这个时候我才开始使用纯英文操作系统，开始了解`service`和`process`这两个概念。

## 进程

进程这个概念其实很好理解，简单说，就是`正在运行的exe程序`。当然这么理解可以，考试这么些肯定不能对。

### 查看

**图形界面查看**

任务栏右键 - 任务管理器

![image-20260324213745459](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324213745459.webp)

菜单选择详细信息

![image-20260324213808757](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324213808757.webp)

**命令行终端查看**

如果说一定要的话也不是不可以，就是麻烦

```shell
tasklist
```

![image-20260324214137155](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324214137155.webp)

缺点就是没有图标，需要一定的经验才能找到想要的进程。

### 杀死

**图形界面**

其实两个地方都行。当然，第一种绝对不会错，**如果依照死规范就选第二种**

![image-20260324214354669](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324214354669.webp)

![image-20260324214406548](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324214406548.webp)

**命令行终端**

杀死相同的东西

```shell
taskkill /f /im cmd.exe
```

- `/f`：`force`，强制
- `/im`：俗称映像名称，`image`

## 服务

进程完了，这个就好理解了。设想在Linux环境下，全是黑屏，想要打开一个app，需要在终端敲命令，Windows虽然预装有`桌面环境`这么个东西，但是还是离不开终端的，所以我们假设想要开机就启动`explorer.exe`，手动方法肯定如下

**打开终端，输入explorer命令运行**

![image-20260324215219832](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324215219832.webp)

所以这么个操作想让操作系统自己完成，就需要让系统知道，那么就可以写一个服务的方式去做到。不过Linux是一个`service`文件，Windows是存在**注册表**中的。不过似乎不用自己写服务，Linux是可以自己写的。

**图形界面**

Win+R - `services.msc`

![image-20260324215500012](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324215500012.webp)

右键即可管理

![image-20260324215521670](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-processes-and-services/image-20260324215521670.webp)

**命令行终端**

启动服务

```shell
net start [某个服务名字]
```

停止进程

```shell
net stop [某个服务名字]
```