---
title: Debian13安装
category: Linux探索日志
published: 2026-03-15
image: ./cover.jpg
---
# 安装

安装Debian13的时候给了我不少的惊喜，尤其是网络安装上面，给用户的选择更多，安装的速度也明显更快，选择完镜像源之后可以明显发现下载速度提升，相比Debian12选择完之后只有main源是镜像源有很大的改善，但是security源还是Debian官方的。

### 磁盘分区

![PixPin_2025-07-21_17-55-56](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/PixPin_2025-07-21_17-55-56.webp)

这里比Debian12多出了更多的选项，小于10GB硬盘的有单独的模式，这个就非常考虑老旧的硬件。

### 软件源

![PixPin_2025-08-10_10-02-08](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/PixPin_2025-08-10_10-02-08.webp)

相较于之前的软件源，这次多了neusoft和nyist两个新的软件源，分别是南阳理工大学和东软公司。但是镜像源的第一梯队还是清华（tsinghua）和中科大（ustc）比较稳定。我更推荐[USTC](https://mirrors.ustc.edu.cn/help/debian.html)的,里面注释掉了很多不稳定的，比如新的backports，也许只是适合服务器，但是对于我这种不喜欢更新的人来说还是非常好的，毕竟你也不知道更新之后会多什么新功能，哪里有什么问题，所以之前用什么，现在就用什么就很好了。

### 桌面环境

![PixPin_2025-08-10_10-03-38](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/PixPin_2025-08-10_10-03-38.webp)

新增了一个定制的选项放在最下面，也就是**`Choose a Denian Blend for installation`**选项，这个定制选项对于正常使用的帮助不大，可以适当了解一下：

![image-20250810132648949](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/image-20250810132648949.webp)

### 剩余时间计算

这次的剩余时间计算相对来说准确了不少，已经能够正常显示，不会动不动就出现1天甚至5，6个小时的情况出现，这个是我正常选择完xfce桌面之后的安装情况截图：

![PixPin_2025-08-10_10-04-20](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/PixPin_2025-08-10_10-04-20.webp)

### 进入系统

Debian12再安装完成之后通常要手动点击重启之后才会进入系统，所以比较麻烦，但是Debian13现在安装完成之后可以正常自动重启进入系统，不需要再像之前一样盯着

![0810](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/0810.webp)

## 体验

### 终端

Debian13的终端相较于之前有了很大的改善：

**界面与Fedora越来越相似，变得简洁，美观。**

![PixPin_2025-08-10_10-21-41](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/PixPin_2025-08-10_10-21-41.webp)

**安装界面进度条也不再是由`#`组成的长条，而是常见的白色矩形进度条。**

![PixPin_2025-08-10_10-21-58](https://pic.ivoinkwell.xyz/file/blog/linux-exploration/debian13-installation/PixPin_2025-08-10_10-21-58.webp)

## 结语

> 经过我简短的使用Debian13这个系统，我认为 **Debian 13 Trixie 对新人用户的友好度已经达到了一个相当高的水平**。对于初次接触 Linux 桌面环境感到迷茫，或者难以决定哪个桌面更适合自己习惯的朋友，**Debian 提供的 Live 镜像是一个绝佳的切入点**：无需安装，直接启动体验，零成本试错。
>
> **尤其关键的是其软件管理生态的“纯粹性”。** Ubuntu 24.04 固然优秀，但其默认推广的 Snap 软件包格式（尤其是在基础组件上），对于一个连 `apt`或 `dnf`这类基本包管理器概念都尚未厘清的新手而言，**无异于增加了额外的复杂性维度**。学习使用传统包管理器本身就有一个曲线，此时再引入 Snap（及其后台服务、自动更新、存储隔离等机制），很可能 **雪上加霜，徒增认知负担和潜在困惑**。
>
> **因此，在“简洁”、“直观”和“避免不必要的干扰”这几个对新用户至关重要的维度上，Debian 13 反而展现出了超越 Ubuntu 的优势**。它提供了一套更为统一、直接的软件安装管理体验（主要基于强大的 APT 和广大的 deb 软件库），默认状态下的桌面环境也足够清晰易用。如果你想迈出 Linux  探索的第一步，寻求一个扎实、清爽、干扰少的起点，Debian 13 绝对是一个更优的选择。
