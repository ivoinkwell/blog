---
title: V2rayN TUN 模式被 OPPO Connect 影响
category: 零碎随笔
published: 2026-09-17
image: ./cover.png
tags: ["系统", "随笔"]
---

说个好玩的事情，从9月1日到现在，将近 3 个星期时间，我的电脑长期挂着 V2rayN 的 TUN 模式，平均一个星期左右时间，这个系统开 TUN 必须断网，最近使用 EasyRC 安装了一个我非常满意的系统，在不想重装的驱使下，我找到了这个问题的根因 —— OPPO Connect。

## 原因查找

我之前就发现，电脑正常能用 TUN 的时候是只有一张 `singbox_tun` 网卡，但是在安装 OPPO Connect 一周左右，他会出现一张从来没有见过的虚拟网卡：`vgate0`。

我开始怀疑是我们参加 CTF ，进入老师家内网的工具 —— OpenVPN，会不会是这个工具创建的网卡，但是看了一下控制面板上面，我发现 OpenVPN 的虚拟网卡已经创建并且明确标注出来

![v2rayn-tun-and-oppo-connect.webp](https://pic.ivoinkwell.xyz/file/blog/specks/v2rayn-tun-and-oppo-connect/v2rayn-tun-and-oppo-connect.webp)

我一共安装的软件当中，能够需要操作系统网卡的只有四个，V2rayN不是，OpenVPN不是，VMware不是，也就只剩下我之前发现和 Clash Verge 产生冲突的 OPPO Connect。

## 使用代理软件的 Windows 版本选择

之前在断网的时候怀疑过 Windows LTSC 版本的问题，现在没有进行复测，不能确保 Windows LTSC 卸载 OPPO Connect 一定可以解决问题，毕竟开 TUN 在 LTSC 版本上响应速度是没有普通商业或者消费者版本上快的，也有可能和电源调度有关。

所以在我看来，精简过后的普通版本 Windows 是比 LTSC 版本更适合代理软件的。