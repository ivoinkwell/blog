---
title: Debian配置静态IP解决DNS无法解析问题
category: 零碎随笔
published: 2026-03-15
image: ./cover.png
tags: ["服务搭建", "家庭网络搭建"]
---
## 配置静态IP

如果说是用于服务器，一定还是`/etc/network/interfaces`这个配置文件好使。

**配置文件如下：**

```bash
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto enp3s5
iface enp3s5 inet static
    address 192.168.1.5/24
    gateway 192.168.1.1
    dns-nameservers 223.5.5.5 223.6.6.6
```

**注：这里的`auto`也是要修改的，不要忘记**

## 问题出现

**这个时候出现了这样的一个问题：**

![Image_1766068041105](https://pic.ivoinkwell.xyz/file/blog/specks/debian-static-ip-dns-fix/Image_1766068041105.webp)

DNS服务器应该是没有任何问题的才对，为此我还特地检查了`dns-nameservers`的拼写，但是很遗憾不是的。

## 问题检查

如果是`DNS域名解析`的问题，那么应该不能`ping`通域名，只能`ping`通`IP`的，所以需要做一下测试。

结果却是非常完美，`www.baidu.com`和`www.bing.com`均出现了上图的问题，但是`223.5.5.5`和`192.168.1.1`都是没有问题的。

## 问题解决

#### `/etc/reslov.conf`

这个文件后来确定是以前用于控制`DNS`的配置文件，但是Debian保留了下来，最后有一位大神用一条命令成功解决问题：

```bash
echo "nameserver 223.5.5.5" >> /etc/reslov.conf
```
