---
title: 晶晨S905L刷OpenWrt
category: 零碎随笔
published: 2026-03-15
image: ./cover.png
tags: ["软路由", "家庭网络搭建"]
---
在Linux里面有一句古话说的十分的好，那就是“科技以换壳为本”。之前安装打印机驱动也是如此，所以我们首先要找到能够支持晶晨S905L的镜像文件。

## 镜像

**项目源地址如下，点击图片即可跳转：**

[![image-20260119220740295](https://pic.ivoinkwell.xyz/file/blog/specks/amlogic-s905l-openwrt/image-20260119220740295.webp)](https://github.com/ophub/amlogic-s9xxx-openwrt)

在release页面中找到自己要的OpenWrt系统和对应的芯片型号，下载压缩包并解压。我个人更喜欢纯净的**OpenWrt_openwrt_main_save**这个版本，但是**OpenWrt_immortalwrt_master_save**这个版本会更易用一些。

## 安装

以下步骤在安装的时候没有做详细图片的留存，所以只能做详尽文字描述。

**[准备工具](https://lylebox.dpdns.org:8443/s/c6b2b5fd40d94f43bb)：**

> - USB Buring Tool（链接中下载）
> - 安卓刷机包（链接中下载）
> - OpenWrt固件（链接中已有，也可以在GitHub下载）
> - U盘（>16G）
> - abdcmd（链接中名字，用于进行U盘启动）
> - balenaEtcher

**步骤：**

1. 确保盒子中使用的系统是安卓系统，如若不是请自行搜索如何使用`USB Buring Tool`工具进行刷机。
2. 使用`balenaEtcher`将系统镜像写入U盘中。
3. 打开机顶盒，进入安卓系统，在路由器后台管理界面获取机顶盒的IP地址。
4. 解压adbcmd压缩包，运行bat脚本，输入机顶盒的IP地址，在安卓系统关机的一瞬间插入写好的U盘。
5. 其默认的IP地址是192.168.1.1，如果和家庭网络设备有冲突的情况下，可以用网线将盒子连接到电脑，电脑输入IP进入后台管理界面。
6. 进入安装界面：System - Amlogic Service - Install OpenWrt![image-20260124161455622](https://pic.ivoinkwell.xyz/file/blog/specks/amlogic-s905l-openwrt/image-20260124161455622.webp)
7. 如何去选择这个model还是需要去看看Armbian里面的dtb文件的序号，没有上面具体型号，但是CPU是晶晨的S905L的可以参考我的，选择116。![IMG_20260118_194035](https://pic.ivoinkwell.xyz/file/blog/specks/amlogic-s905l-openwrt/IMG_20260118_194035.webp)
8. 等待其提醒安装完成后，不要拔掉U盘，重启，等能进系统之后再拔掉U盘。
