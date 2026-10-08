---
title: Windows Share
category: 系统基础笔记
published: 2026-04-07
image: ./cover.png
---
## 概述

之前一直是使用别人写的php文件进行文件互传，这么大费周章的启动服务，放入源码，其实远远不如Windows自带的SMB共享服务来的快，但是之前一直都没有成功过，所以借着上课的时间简单研究了一下，或许是Windows的NTFS权限和Share的权限有些许的冲突吧。

## 配置共享

### 界面

![image-20260409111015349](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-share/image-20260409111015349.webp)

### 配置

在上面的分享板块，也就是截图的`Network File and Folder Sharing`里面，可以添加可访问的人员：

![image-20260409111230588](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-share/image-20260409111230588.webp)

在高级权限中，也就是截图中的`Advanced Sharing`里面，即可设置共享路径

![image-20260409113028135](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-share/image-20260409113028135.webp)

在密码保护，也就是截图中`Password Protection`里面

![{F9A1B348-8EA2-4192-A161-5AB1E04C31E4}](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-share/{F9A1B348-8EA2-4192-A161-5AB1E04C31E4}.webp)

## 权限问题

之前我没有做过测试，但是问题出在权限上的概率是很大的，我一直在怀疑，之前我设置访问权限的时候系统没有自动将`Everyone`用户加入NTFS的权限里面去，但是在Windows Server上面配置却一直没有任何问题，而且Windows Share也是建立在SMB服务的基础上，或许普通家庭用电脑的权限管理模型相比于服务器可能会弱一些吧……
