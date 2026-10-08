---
title: Windows 笔记本部署 Web 服务
category: 零碎随笔
published: 2026-05-21
image: ./cover.jpg
tags: ["服务搭建", "随笔"]
---
看到这个标题估计很多人第一个想法一定是“这个人脑子被驴踢了吧？”。但是现实中确实是这个样子的，他们手上只有一台笔记本，但是想给对象看一个小网页，部署 `VPN Server` 确实是没有直接使用 `Frp Client`划算了，所以我也是在昨天成功做成了这样一件事。

## 部署准备

这一次部署没有使用 `WSL2` 确实浪费性能，但是对于一个小白来说确实使用 `VMware` 会方便很多，让他们自己操作Linux关闭与启动服务，写配置文件不可以的话也就只有一个方法 —— `面板部署`。

**所以，需要准备以下的东西：**

> - `Vmware` 软件，版本随意
> - 面板支持系统的系统镜像，这里选择 `Ubuntu 26.04` 社区庞大，便于维护

## 安装虚拟机

根据软件提示安装虚拟机即可

**[安装Ubuntu可以参考我的文档站](https://docs.ivoink.qzz.io/linux-system/01-linux-installation-and-remote-login.html)**

## 部署面板

我觉得小皮面板相对来说方便入手，所以，给安装的是这个

**[面板部署命令](https://www.xp.cn/download)**

命令粘贴进虚拟机即可开始安装，安装过程会安装很多的依赖，需要一些时间，耐心等待就行

## 创建 Node.js 网站

他给对象的网站是使用 `Node.js` 的 `Next.js` 写的，但是后面 Linux 上部署出现编译问题，我用 `Vue` 重写了，但是依旧需要 `Node.js` 进行部署


> [!TIP]+ 创建提示
>临时部署没有域名的不要任何外网 IP 或者域名，直接下一步，不会使用 Nginx 或者 Apache 的域名代理，直接使用 `frp` 转发服务端口即可

## 创建 `frp` 连接

这里推荐 **[Passnet](https://dashboard.passnat.com/dashboard)** ，感觉性价比还行，创建配置文件后将配置文件粘贴进小皮面板应用中心的 **`Frp客户端`** 软件中即可

我是远程他的，所以我在我的电脑上已经可以访问他的 `frp` IP + 端口

![](https://pic.ivoinkwell.xyz/file/blog/specks/windows-laptops-deploy-web-services/windows-laptops-deploy-web-services-1.webp)
