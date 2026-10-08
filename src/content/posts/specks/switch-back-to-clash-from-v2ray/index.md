---
title: 从V2ray换回Clash
category: 零碎随笔
published: 2026-04-29
image: ./cover.png
tags: ["网络", "科学上网", "随笔"]
---
粗浅估计一下，从我自己部署软路由到现在似乎已经有5个多月了，其实部署的目的也很简单，就是单纯不喜欢自己手机，电脑上面挂着这个一个东西，可能这样的耗电量对于电脑手机上来说已经是无关痛痒的存在，但是对于之前对于系统洁癖很严重的时候还是十分恶心的一件事情。

## 更换原因

目前来说，节点的价格还是比较贵的，尤其是全部平台的情况下，很多的机场对于全平台软件的支持其实很一般，所以只有使用更新比较频繁的内核才可以，而会一直这样跟进的只有一个——**`Clash`**

之前一直不喜欢电脑和手机上常驻这样的一个进程，所以选择了软路由的方式去上网，但是经过自己折腾和配置，始终没有成功用上`OpenClash`，所以最后选择的是`V2rayA`，但是协议也就只能支持`VLESS`，`VMESS`以及`SS`等常见的老协议，像是很多便宜的机场为了不被抓到会使用很多新的协议，`V2rayA`的兼容性也就捉襟见肘了。所以为了能够尽量的降低自己的成本我还是准备选择本地软件

## 客户端选择

Clash有很多的版本，但是为了能够使用正常最新的协议，就要用一直更新内核版本的软件，下面是不同客户端我个人使用的

> - **`Android`**：Clash Meta For Android
> - **`Windows`**：Clash Verge

---

### Clash Verge

这个软件依赖`Microsoft Edge Webview2 Runtime`，所以现在是有两个版本，如果有和我一样，一定要下载**内置Webview2版**

<a class="btn-regular no-styling" style="display:inline-flex;align-items:center;justify-content:center;width:fit-content;padding:0.5rem 1.5rem;border-radius:0.5rem;font-size:0.875rem;line-height:1.25rem;color:var(--btn-content);text-decoration:none;font-weight:500;" href="https://github.com/clash-verge-rev/clash-verge-rev/releases/latest">
点击前往下载
</a>

---
### Clash Verge 配置

先导入自己的机场节点

选择TUN模式

![](https://pic.ivoinkwell.xyz/file/blog/specks/switch-back-to-clash-from-v2ray/switch-back-to-clash-from-v2ray.webp)

Stack建议选择Mixed，如果下方显示的IP已经改变就不需要更改

![](https://pic.ivoinkwell.xyz/file/blog/specks/switch-back-to-clash-from-v2ray/switch-back-to-clash-from-v2ray-1.webp)

![](https://pic.ivoinkwell.xyz/file/blog/specks/switch-back-to-clash-from-v2ray/switch-back-to-clash-from-v2ray-2.webp)

我目前已经将这个长时间挂在后台了，所以自启动也可以选择

![](https://pic.ivoinkwell.xyz/file/blog/specks/switch-back-to-clash-from-v2ray/switch-back-to-clash-from-v2ray-3.webp)

节省内存模式，Webview自动退出不占用资源

![](https://pic.ivoinkwell.xyz/file/blog/specks/switch-back-to-clash-from-v2ray/switch-back-to-clash-from-v2ray-4.webp)

---

### Clash Meta For Android

这是一个内核较新的Android客户端

<a class="btn-regular no-styling" style="display:inline-flex;align-items:center;justify-content:center;width:fit-content;padding:0.5rem 1.5rem;border-radius:0.5rem;font-size:0.875rem;line-height:1.25rem;color:var(--btn-content);text-decoration:none;font-weight:500;" href="https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest">
点击前往下载
</a>

如果需要保持更新可以下载F-Droid应用商店，再里面实时获取更新

---

### Clash Meta For Android 配置

导入并且直接使用就可以，没什么需要多余配置的

访问谷歌，正常访问

```text
https://www.google.com
```

跳转

```text
https://www.google.com.hk
```

解决方案，访问这个后正常

```text
https://www.google.com/ncr
```

设置长时间挂在后台可以这样

![](https://pic.ivoinkwell.xyz/file/blog/specks/switch-back-to-clash-from-v2ray/switch-back-to-clash-from-v2ray-5.webp)

## 协议

|         协议         |    核心协议    |        加密方式        |   性能/抗丢包    |     流量伪装      |
| :----------------: | :--------: | :----------------: | :---------: | :-----------: |
|  **Shadowsocks**   |    TCP     |     **强（内置）**      |      高      |   弱（需混淆插件）    |
|     **VMESS**      |    TCP     |     **强（内置）**      |      中      |       中       |
|     **VLESS**      |    TCP     |    **弱（依赖TLS）**    |      高      | **强（配合XTLS）** |
|     **Trojan**     |    TCP     | **强（TLS 1.2/1.3）** |      高      | **极强（HTTPS）** |
|      **TUIC**      |    UDP     |   **强（TLS 1.3）**   | **很高（低延迟）** |       中       |
| **Hysteria (Hy2)** | UDP (QUIC) |   **强（TLS 1.3）**   | **极高（抗丢包）** |       中       |
