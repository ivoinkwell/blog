---
title: 软路由与iStoreOS
category: 零碎随笔
published: 2026-04-12
image: ./cover.png
tags: ["软路由", "家庭网络搭建"]
---
## 迁移原因

### 前提

之前文章也写过，在家里使用晶晨S905L的电视盒子刷过OpenWrt系统，就是这篇文章：

::post{slug="specks/amlogic-s905l-openwrt"}

### 问题反馈

但是现在出现了很多的问题，比如之前频繁出现的突然网页卡住，重启之后前几分钟管理网页正常可以访问与显示，但是后面就再也无法访问了，这些问题一直没有很好的解决方案，所以我索性就再NAS上新建虚拟机去安装iStoreOS。

## iStoreOS

### 下载镜像

<a class="btn-regular no-styling" style="display:inline-flex;align-items:center;justify-content:center;width:fit-content;padding:0.5rem 1.5rem;border-radius:0.5rem;font-size:0.875rem;line-height:1.25rem;color:var(--btn-content);text-decoration:none;font-weight:500;" href="https://fw.koolcenter.com/iStoreOS/x86_64/">
点击前往下载
</a>

### 安装

现在飞牛的系统对于`img.gz`格式的镜像文件，所以直接选择下载好的镜像文件即可，不知道配置的可以参考这个配置：

![image-20260412134244319](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412134244319.webp)

剩下的一直`下一步`即可完成安装，开机时间可能会有点长，稍微等待一下，看到这个界面就成功了：

![image-20260412134438699](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412134438699.webp)

### 配置

#### 安装后修改

单击`Enter`进入终端：

![image-20260412135427702](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412135427702.webp)

输入`quickstart`：

![image-20260412135459212](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412135459212.webp)

这里可以选择基础的配置，我需要我的软路由的IP在`192.168。1.254`这样方便我访问，所以我选择`Change LAN IP`

![image-20260412135614709](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412135614709.webp)

输入自己需要的IP即可，最后输入IP就可以进入后台：

![image-20260412135707221](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412135707221.webp)

#### 后台配置

在一开始进入后台，没有密码，直接按`Enter`进入后自己配置密码，进入网络引导配置联网：

![image-20260412135931992](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412135931992.webp)

我是旁路由，选择`bypass router`，中文就是配置旁路由，我选择手动配置，配置如下：

![image-20260412140048687](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412140048687.webp)

#### 软件配置

`System(系统)` - `Software(软件)`

![image-20260412141338870](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412141338870.webp)

我安装了三个，分别是`SmartDNS`，`ADBlock`和`V2raya`

![image-20260412141449667](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412141449667.webp)

##### **SmartDNS**

![image-20260412141612823](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412141612823.webp)

##### **Adblock**

![image-20260412141650519](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412141650519.webp)

![image-20260412141702483](https://pic.ivoinkwell.xyz/file/blog/specks/soft-router-istoreos/image-20260412141702483.webp)

##### **V2raya**

这里需要下载两个文件：

---

<a class="btn-regular no-styling" style="display:inline-flex;align-items:center;justify-content:center;width:fit-content;padding:0.5rem 1.5rem;border-radius:0.5rem;font-size:0.875rem;line-height:1.25rem;color:var(--btn-content);text-decoration:none;font-weight:500;" href="https://gh-proxy.org/https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geoip.dat">
点击下载geoip.dat
</a>

---

<a class="btn-regular no-styling" style="display:inline-flex;align-items:center;justify-content:center;width:fit-content;padding:0.5rem 1.5rem;border-radius:0.5rem;font-size:0.875rem;line-height:1.25rem;color:var(--btn-content);text-decoration:none;font-weight:500;" href="https://gh-proxy.org/https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geosite.dat">
点击下载geosite.dat
</a>

---

:::tip[GitHub源地址]
> **geoip.dat：**
> https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geoip.dat
> 
> **geosite.dat**
> https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geosite.dat  
:::

导入：

放进`/usr/share/xray`文件夹内。

## 安装踩坑

熟悉我的应该也能猜到，我这个毛病是改不了了，就是喜欢手动精简，我之前手贱卸载了这个系统的很多组建，虽然不知道是什么组建引起的问题，所以劝阻一下有和我有相同冲动的朋友，只要关闭LinkEase服务就行，Docker，DDNS-GO这些能不动就别动了。
