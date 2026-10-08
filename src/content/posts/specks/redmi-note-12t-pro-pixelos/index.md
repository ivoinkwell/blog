---
title: Redmi Note 12T Pro刷PixelOS
category: 零碎随笔
published: 2026-03-15
image: ./cover.jpg
tags: ["刷机", "随笔"]
---
**准备工具：**

> - [miflash_unlock_en](https://miuirom.xiaomi.com/rom/u1106245679/7.6.727.43/miflash_unlock_en_7.6.727.43.zip)
> - [MiFlash](https://cdn.alsgp0.fds.api.mi-img.com/micomm/MiFlash2020-3-14-0.rar)
> - [PiexlOS刷机包](https://share.fnnas.net/s/867ec7a8a4344ca78a)

## 解锁Bootloader

需要使用**miflash_unlock**工具，手机需降级回MIUI14，解锁设备方法：“进入开发者选项 - 设备解锁状态 - 绑定账号”后即可继续。**注：如果解锁工具连接手机后没反应，下载MiFlash打开后点击弹出的安装驱动后再试**

1. 进入Fastboot模式 - 关机后按住**音量减**和**电源**按键
2. 进入工具，手机连接电脑进行解锁
3. 等待重启后进入系统

## 刷入PixelOS

用上述方式重新进入Fastboot模式，需要下载PixelOS刷机包并解压缩。

手机连接电脑，选择刚刚解压缩的刷机包，选项如图所示（**注：我这里并未连接设备，所以未显示设备连接**）：

![image-20251208225923390](https://pic.ivoinkwell.xyz/file/blog/specks/redmi-note-12t-pro-pixelos/image-20251208225923390.webp)

点击刷机后静待开机即可。

## 效果预览

![20251208-230945](https://pic.ivoinkwell.xyz/file/blog/specks/redmi-note-12t-pro-pixelos/20251208-230945.webp)
