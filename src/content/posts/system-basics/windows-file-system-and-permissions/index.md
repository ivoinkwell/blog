---
title: Windows文件系统与权限
category: 系统基础笔记
published: 2026-03-21
image: ./cover.png
---
不知道有多少人喜欢在电脑里面收藏一些自己珍藏宝贝， 尤其是文件比较大的宝贝，很多人觉得放在电脑里不太方便，可能会放进U盘里，这个时候可能就会发现，拷贝速度甚至都能比家里千兆网下载速度还慢，不过我经常遇到的是Ventoy制作Linux镜像启动盘的时候。这里就牵涉到了文件系统的作用。

## 文件系统

常用的无非也就三个，也不用记，找个磁盘右键格式化就能看到

![image-20260321150738426](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-file-system-and-permissions/image-20260321150738426.webp)

我这里不知道是不是专业工作站版本的原因，`FAT32`没有显示出来。

### 差别与性能

道理很简单，Windows 自家系统默认使用的文件系统，性能自然不会弱，所以 NTFS 在 Windows 生态下综合性能是最强的。

如果跳出 Windows 环境，和 Linux 的 ZFS、Btrfs、苹果的 APFS，甚至微软自家仍在推广的 ReFS 相比，综合性能表现最好的还是 Linux 搭配 ZFS 或 XFS。

但在 Windows 市场占绝对主导的现实下，日常通用场景里 NTFS 依然是综合表现更优的选择。

FAT32 在大容量分区下无法将簇大小固定为 4K，小文件空间浪费严重，空间利用率和性能都远不如 NTFS。而兼顾 Windows 与 Mac 兼容性的  exFAT（也常被称作 FAT64），支持更大单文件和分区，还能手动指定簇大小，空间利用率与传输性能都比 FAT32 出色很多。

## 权限

随便找一个文件或文件夹

**属性 - 安全**

![image-20260321153434736](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-file-system-and-permissions/image-20260321153434736.webp)

这个便是权限管理页面，现在人手一台电脑，一般正常使用系统用不到，但是在服务器部署上面经常会有，一般是不同的服务在不同的用户，给同的文件权限。