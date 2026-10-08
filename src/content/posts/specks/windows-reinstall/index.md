---
title: Windows系统重装
category: 零碎随笔
published: 2026-03-15
image: ./cover.jpg
---
借着我朋友重装系统的机会，讲述一下我重装系统的过程。

## 准备

> - 1个16G的空U盘（**或者**是里面数据备份好的U盘）
> - 一个[WePE工具箱的软件程序](https://www.wepe.com.cn/download.html)
> - [Windows原版系统镜像](https://winnew.cn/)
> - [下载工具（可选）](https://www.neatdownloadmanager.com/file/NeatDM_setup.exe)
> - 电脑的驱动程序及其所需要的软件
> - 备份好电脑中所有需要的数据

准备好这些之后就可以主备开始安装系统了

## 启动盘

**将PE写进U盘**

打开WePE软件，点击红框中的选项：

![image-20250906214520032](https://pic.ivoinkwell.xyz/file/blog/specks/windows-reinstall/image-20250906214520032.webp)

在待写入U盘的地方选择准备好的空U盘（**或**刚刚已经备份好数据的U盘），这个过程会将U盘的数据全部清除，注意**备份**：

![image-20250906214606058](https://pic.ivoinkwell.xyz/file/blog/specks/windows-reinstall/image-20250906214606058.webp)

**这个时候，资源管理器上会出现一个空的微PE工具箱，打开并将系统镜和电脑驱动程序放入PE：**

![image-20250906221636954](https://pic.ivoinkwell.xyz/file/blog/specks/windows-reinstall/image-20250906221636954.webp)

## 进入PE，安装系统

**使用DiskGenius快速格式化系统硬盘（几个分区以及分区大小看个人喜好）：**

MBR：

![image-20250906222030355](https://pic.ivoinkwell.xyz/file/blog/specks/windows-reinstall/image-20250906222030355.webp)

GPT（不管保留ESP分区显不显示，都按照这个方法）：

![image-20250906222155432](https://pic.ivoinkwell.xyz/file/blog/specks/windows-reinstall/image-20250906222155432.webp)

**使用WinNTSetup安装镜像（按照提示选择就可以）：**

![image-20250906222509009](https://pic.ivoinkwell.xyz/file/blog/specks/windows-reinstall/image-20250906222509009.webp)

## 最后

重启之后正常进入Windows系统，我使用的一直是LTSC版本，如果家庭版和专业版在安装网卡驱动的地方不能使用本地账户先进入再打驱动的话直接选择所有驱动所在的文件夹即可直接打上所有驱动，所以驱动也尽量放在PE盘中。
