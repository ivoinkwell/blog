---
title: 迁移至PVE
category: 零碎随笔
published: 2026-04-19
image: ./cover.jpg
tags: ["随笔", "家庭网络搭建"]
---
## 相关原因

之前的文章说过我在电视盒子刷的OpenWRT彻底罢工不能用了之后，将软路由的功能迁移到飞牛NAS的虚拟机上，可以参考我的这篇文章：

::post{slug="specks/soft-router-istoreos"}

但是现在因为ESXi用户管理的问题和NAS主机因为降压频繁导致CPU温度过高报警的相关原因，我现在不得不限制NAS的CPU频率，这个情况下也就不适合再把OpenVPN Server和iStoreOS放在这个NAS上了，后面我看上了我现在正在使用的虚拟化平台——ESXi，但是这个平台我一开始使用起来发现用户管理上不能做到用户权限相同，只是虚拟机相互隔离，但是因为这个软件的使用便捷性比较高，家庭成员安装自己的虚拟机都很方便就一直没有动，但是在迁移飞牛的虚拟机的时候，飞牛KVM导出的`.ova`文件ESXi根本导入不了，但是OpenVPN Server上面用户太多，我根本没有办法去迁移数据，没有办法，将虚拟化平台换成了PVE。

## 踩坑与实用功能

### 导入踩坑

导入文件就是一个坑，因为导入`.ova`文件的入口默认是隐藏的，你需要去开启这个带红框的地方

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve.webp)

然后才能看见这个

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve-1.webp)

在导入虚拟机的时候确实踩了一个大坑，本来以为导入就可以直接无脑下一步，所有配置默认就是很好的，但是我忘记了一个点——CPU Types

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve-3.webp)

这个是导入的默认类型`x86-64-v2-AES`，但是实际上自己在创建虚拟机的时候都会改成`host`。否则根本开不了机，也就是改成这样

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve-4.webp)

### 实用功能

可以给用户分资源池的方式让用户管理单独资源池的方式达到不同用户虚拟机分开，但是对自己的虚拟机有创建删除与完全控制权

**创建用户**

用户的验证模块如果不需要用户登录SSH，直接使用PVE自己的验证器即可

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve-5.webp)

**创建资源池**

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve-6.webp)

**给用户分配资源池完整控制权**

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve-7.webp)

**登录用户**

用户可以正常创建与管理自己资源池内虚拟机

![](https://pic.ivoinkwell.xyz/file/blog/specks/migrate-to-pve/migrate-to-pve-8.webp)
