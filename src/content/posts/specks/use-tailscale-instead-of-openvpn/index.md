---
title: 使用 Tailscale 替代 OpenVPN
category: 零碎随笔
published: 2026-08-13
image: ./cover.png
tags: ["家庭网络搭建", "随笔"]
---
OpenVPN 除了配置非常麻烦，还有一个更难的条件 —— IPv4，毕竟不是所有的地方都有 IPv6，尤其是企业等地方，所以我就想有没有一个可以代替 VPN 但是不使用组网的方式，毕竟每一个设备加入一个虚拟网段不仅麻烦，而且对于虚拟机的性能要求会高很多。

## Tailscale 安装与部署

我将这个选择和 OpenVPN Server 一样作为一个服务器一样部署，但我尝试在 PVE 的 LXC 容器中部署出现了很多问题，所以我选择的是 KVM 容器 + Debian 12 的这个方案进行的安装。

安装步骤很简单，按照 **[官网](https://tailscale.com/download/linux)** 上下载方法安装

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

## Tailscale Subnet —— 子网路由

首先要开启 IPv4 转发

```bash
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf
sysctl -p
```

开启子网路由，我的网段是 `192.168.1.0/24`，替换成自己家里的即可

```bash
tailscale up --advertise-routes=192.168.1.0/24
```

随后在后台管理勾选这个网段

![](https://pic.ivoinkwell.xyz/file/blog/specks/use-tailscale-instead-of-openvpn/use-tailscale-instead-of-openvpn.webp)

随后连接上就可以正常访问内网设备

## 网段隔离

网段隔离是一个必要的网络防护方案，但是很折腾，也存在着很多的折腾的地方，网段相互访问还要建立 VPN ，常见的就是WireGuard，这个方案我同学在他们家的PVE上是这样使用的，但是对于我来说折腾，所以我就没有进行搭建。