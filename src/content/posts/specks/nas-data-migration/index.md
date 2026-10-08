---
title: NAS数据迁移笔记
category: 零碎随笔
published: 2026-04-04
image: ./cover.png
tags: ["NAS", "家庭网络搭建"]
---
## 简述

### 迁移原因

最近也是获得了一个1TB的3.5寸硬盘，但是之前的NAS是笔记本，导致没有很好的办法安装与使用，所以我就将目光放在唯一一个可以放下的地方，我婆婆的那台2005年左右的AMD旧电脑上。

### 迁移方法

这一次因为是数据迁移，在迁移的时候需要保证旧设备可用的同时，逐步向新设备转移数据，和用户何时更换使用的NAS。

## 计划拟定

{{< timeline >}} {{< timelineItem icon="server" header="1. 重装系统" subheader="fnos" >}} 给AMD台式机重装 fnos 系统 {{< /timelineItem >}} {{< timelineItem icon="hard-drive" header="2. 扩容存储" subheader="140G + 新增 1T 硬盘" >}} 在原有 140G 磁盘基础上接入 1T 硬盘 {{< /timelineItem >}} {{< timelineItem icon="user" header="3. 迁移个人账户数据" subheader="迁移至 1T 硬盘" >}} 将本人账户数据转移至新 1T 硬盘 {{< /timelineItem >}} {{< timelineItem icon="users" header="4. 迁移其他用户数据" subheader="迁移至原 NAS 机械硬盘" >}} 将其他用户数据转移至原 NAS 机械硬盘 {{< /timelineItem >}} {{< timelineItem icon="refresh" header="5. 重新挂载至新 NAS" subheader="硬盘迁移与挂载" >}} 迁移机械硬盘并重新挂载至新 NAS {{< /timelineItem >}} {{< /timeline >}}

## 计划实施

### 重装系统

配置是这个样子：

![Screenshot_2026-03-29-21-59-13-170_com.trim.app](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/Screenshot_2026-03-29-21-59-13-170_com.trim.app.webp)

装完系统之后发现了一个非常严重的问题——**内存不够**：

![Screenshot_2026-03-29-21-59-26-557_com.trim.app](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/Screenshot_2026-03-29-21-59-26-557_com.trim.app.webp)

所以我决定买了一根内存条：

![IMG_20260404_080903](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/IMG_20260404_080903.webp)

所以现在这样就比较舒服了：

![Screenshot_2026-04-03-18-37-06-733_com.trim.app](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/Screenshot_2026-04-03-18-37-06-733_com.trim.app.webp)

![Screenshot_2026-04-04-08-16-55-137_com.trim.app](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/Screenshot_2026-04-04-08-16-55-137_com.trim.app.webp)

### 增加硬盘

旧机器上只有 **4Pin IDE 供电接口**，无法直接给 SATA 硬盘的 **15Pin 供电**使用，因此在网上购买了一根 **4Pin IDE 转 SATA 一拖二供电转接线**。

### 转移数据

说到这里就不得不提我的数据迁移，前一天晚上七点开始迁移数据，一共300G左右使用飞牛自己的备份软件进行备份，第二天早上为了节约时间，快速去配置Syncthing，我四点钟爬起来一看，3点的时候停止备份显示部分备份成功。

**后面早上我使用一种方法终于是备份成功了：**

![Image_1775086121773_294](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/Image_1775086121773_294.webp)

![Screenshot_2026-04-02-14-20-26-348_com.trim.app](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/Screenshot_2026-04-02-14-20-26-348_com.trim.app.webp)

我分成了两个部分，将本地影视文件夹作为单独的部分进行备份，终于是备份成功了。

### 迁移其他用户数据至原NAS的500G机械硬盘中

这个直接复制，也没有多少难度了……

### 迁移硬盘至新NAS

我之前说过，我的旧NAS是我的笔记本，所以这个机械硬盘是2.5寸的，所以想要装在台式机上还是需要点东西的，比如这个：

![Screenshot_2026-04-04-08-30-12-811_com.xunmeng.pinduoduo](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/Screenshot_2026-04-04-08-30-12-811_com.xunmeng.pinduoduo.webp)

最后装好之后是这样的：

![f89668ad-8284-433f-ab57-5f1467a19192](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/f89668ad-8284-433f-ab57-5f1467a19192.webp)

![c8201cd7-f72b-4c9f-94ae-fc4b85d71806](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/c8201cd7-f72b-4c9f-94ae-fc4b85d71806.webp)

## 耗电

似乎电费确实会比专业NAS更多，尽管我已经给CPU的电压压到再往下就已经无法开机的程度，最高功率大概105W左右，平常待机正常60W，如果使用SMB会增加到70W左右。

![1D4A7B4BB07FF020788BDD590DC6FEE0](https://pic.ivoinkwell.xyz/file/blog/specks/nas-data-migration/1D4A7B4BB07FF020788BDD590DC6FEE0.webp)

> [!TIP]
>
> 相比于笔记本会少UPS，如果经常供电不够或者需要更高的稳定性一定要去增加一个防止出现硬盘坏掉的问题。

**偷偷讲一个小故事：猪老师的服务器之前就是因为类似这样的问题硬盘炸掉了……**
