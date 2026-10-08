---
title: 在VPS上使用3x-ui搭建自己的节点
category: 零碎随笔
published: 2026-09-13
image: ./cover.jpg
tags: ["科学上网", "服务搭建"]
---

网上的教程很多东西都很零散，所以我在我搜集资料搭建后写了这个博客把目前知道的一些配置给写出来

## 面板部署

安装只需要一行命令

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

但是会在安装时候问你是否需要使用域名的方式进行，如果选择域名，一定要关闭 Cloudflare 的小黄云

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui.webp)

安装完之后会给你一串信息

```text
═══════════════════════════════════════════

     Panel Installation Complete!

═══════════════════════════════════════════

Username:    

Password:    

Port:        

WebBasePath: 

Database:    

Access URL:  

API Token:   

═══════════════════════════════════════════
```

其中通过 **`Access URL`** 即可访问你的面板。通过你的用户名和密码进行登录即可。

## 创建节点

在创建节点的时候我遇到了很多的坑，目前成功搭建出来了三条可以正常使用的节点，分别是 `vless-raw`，`vless-websocket` 和 `Hy2`。

### `vless-raw`

首先先打开面板的首页

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-1.webp)

左侧找到 `Inboard` 菜单

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-2.webp)

打开入站面板

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-3.webp)

点击上面的 `Add Inboard` 按钮

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-4.webp)

按照图片内容进行更改

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-5.webp)

第二个菜单保持默认即可

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-6.webp)

第三个也保持默认


![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-7.webp)

安全菜单选择 `Reality`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-8.webp)

下面需要选择伪装目标，点击下方的 `Find Targets`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-9.webp)

他会选择对于你当前访问速度最快的国际官网地址，但是还是建议使用 `www.microsoft.com:443` 这样普通人也能经常访问的伪装目标

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-10.webp)

点击 `use` 后是这样的界面

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-11.webp)

如果使用 iOS 的 Shadowsocks，下面的地方一定要写 `1.0.0`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-12.webp)

点击重新生成证书

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-13.webp)

最后创建节点

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-14.webp)

### `vless-websockets`

点击新建入站规则，红框内填写，其他保持默认即可

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-15.webp)

第二个菜单保持默认

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-16.webp)

第三个菜单，传输选择 `WebSocket`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-17.webp)

`path` 自定义即可

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-18.webp)

安全选择 `TLS`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-19.webp)

如果使用 iOS 的 Shadowsocks 要将最小版本选择 `1.0`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-20.webp)

按图片内容去除 `h2`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-21.webp)

点击生成证书

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-22.webp)

最后点击创建

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-23.webp)

### `Hy2`

新建入站规则，将协议改成 `Hy2`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-24.webp)

我这里配置端口跳跃，所以打开 `QUIC Params`，不使用端口跳跃保持默认即可

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-25.webp)

设置跳跃端口，打开 udp 设置

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-26.webp)

设置跳跃端口，自定义或者默认都可

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-27.webp)

如果使用 Shadowsocks 最小版本要设置为 `1.0`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-28.webp)

点击生成证书

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-29.webp)

点击创建

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-30.webp)

## 创建客户端

点击左侧 `客户端`  菜单

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-31.webp)

进入客户端面板

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-32.webp)

点击 `Add Clients` 创建一个客户端

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-33.webp)

添加刚刚创建的节点

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-34.webp)

如果选择 `vless-raw` 记得更改这里

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-35.webp)

最后可以获得客户端二维码以及订阅链接

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-36.webp)

## 添加代理出口节点

首先需要创建一个出站规则

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-37.webp)

填写 `IP`，`端口`，`用户名`，`密码`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-38.webp)

还需要写一个 `Tag`

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-39.webp)

最后还需要一个路由规则

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-40.webp)

选择节点与出口 IP 即可

![](https://pic.ivoinkwell.xyz/file/blog/specks/setting-up-your-own-node-on-a-vps-using-3x-ui/setting-up-your-own-node-on-a-vps-using-3x-ui-41.webp)

