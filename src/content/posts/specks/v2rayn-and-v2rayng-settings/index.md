---
title: V2rayN 和 V2rayNG 设置
category: 零碎随笔
published: 2026-09-20
image: ./cover.png
tags: ["软件", "随笔"]
---

近期看了一个有关于 `V2rayNG` 的一个优化视频，视频里面推荐更改了路由设置以及 DNS 设置，我发现不仅使 X 的访问成功率更高，而且在学校这种弱网环境下使用更流畅了，但是电脑上似乎雨点差强人意。

## V2rayNG 的设置

### 路由

首先是路由，V2rayNG 的路由和 V2rayN 的默认设置使一样的，都使用的是 `Asls` ，查看官方对于这个东西的描述是：**`只针对域名进行分流`**，也就是说如果域名更新不及时，或者 APP 直接使用 IP 的方式连接自己的官方服务器都会让分流直接失效，全部都直接走代理进行访问，所以为了更好的进行分流，可以使用 `IPIfNonMatch` ，这个模式官方对其进行的解释是：**`优先对域名进行分流，当域名里面没有此项记录的时候，会查询DNS并且重新使用IP匹配服务端IP，最后决定是否使用代理`** 

如果开启 `IPIfNonMatch` 一定要开启 `routeOnly` 这个选项。使用 Nginx 搭建过服务的都知道，Nginx 会对固定端口进行监听，当监听到某个域名访问的时候才会进行转发。对于企业而言，负载均衡更多的就是使用 Nginx ，如果你在做 DNS 解析 IP 的时候直接进行访问很有可能就会触发 Nginx 的拦截，所以开启 `routeOnly` 可以只在分流的时候使用 IP ，这个 IP 不会影响最终的请求，也就是你使用域名访问，在进行 IP 匹配过后不会使用对应服务的 IP 地址进行访问。

### DNS 设置

DNS 的设置就是开启 `fakedns` 这个东西。

`fakedns` 的主要目的是建立一个虚拟的 DNS 地址池，不仅可以防止 DNS 泄露，也可以加快 DNS 寻址的时间，但是有一个非常不好的一点就是返回的 IP 都是虚假的 IP 地址，这个和 V2raN 上的 `fakeip` 是一个道理。

![v2rayn-and-v2rayng-settings.webp](https://pic.ivoinkwell.xyz/file/blog/specks/v2rayn-and-v2rayng-settings/v2rayn-and-v2rayng-settings.webp)

## V2rayN 保持默认设置

开启 TUN ，相当于创建一张全新的虚拟网卡，接管全部的 Windows 流量，不开启 `fakeip` 也是我使用 V2rayN 的原因。

Clash Verge 可以看我之前的文章，一直都是我主力使用的代理工具，之前使用系统代理访问发现无法接管 Git 这些软件的流量，为了全局流量开启了 TUN 模式。后面我 `ping` 网站的时候发现这样的事情，返回的 IP 全部都是 `198.18.x.x` 这样的假 IP 地址，关掉默认的 `fakeip` 之后出现了和系统代理一样的DNS泄露问题。

最近自建节点，为了方便订阅导入，我就直接使用了 V2rayN ，开了 TUN 之后 `ping` 完发现返回的是真实的 IP 地址，所以我就没有对这些设置项做任何的更改。