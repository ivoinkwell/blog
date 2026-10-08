---
title: PixelOS 作为主力系统使用
category: 零碎随笔
published: 2026-05-08
image: ./cover.jpg
tags: ["系统", "刷机", "随笔"]
---
最近的一段时间，习惯了将 Clash Meta 挂在后台使用，所以也开始想去体验体验原生的 Google Pixel 系统。

## 奇想起因

词语这里确实没有用错，确实是一个奇想，在我的 REDMI 的手机上是可以打开 Google Play 的服务框架的，但是因为 HyperOS 对 Google FCM 的服务存后台的长连接在限制，完全无法在手机正常锁屏的时候收到 Telegram 上面的消息，所以就想到了还可以解 BL 的旧手机，尝试刷入了基于 Andriod 14 的 Pixel OS。

## FCM 推送

FCM，全称 `Firebase Cloud Message` 。是的，和苹果的推送机制是一样的，所有 APP 在后台可以都是死的，但是FCM 需要后台有一个进程去连接服务器，虽然说功耗不大，但是在 HyperOS 上和小米自己的 MiPush 服务功能一致，也会导致耗电加重。

但是在 PixelOS 上面就不会，毕竟不带小米的那么多累赘组件，比如超级小爱……

![](https://pic.ivoinkwell.xyz/file/blog/specks/pixelos-in-daily-life/pixelos-in-daily-life.webp)

Telegram 我更喜欢使用第三方客户端，但是就是第三方客户端我都没有在 HyperOS 的手机的锁屏上推送过一个通知

## 速度

我和两个朋友出去吃饭，我们的手机型号分别是 Redmi Note 12T Pro，OPPO Find X8 Pro 和 OPPO Reno 的一个很老的手机。CPU 分别是天玑 8200，天玑9400和一个我也忘了啥CPU……

去吃饭是扫码下单的，Reno 的那个因为是广电的卡就不参与，当时我和天玑 9400 的 OPPO Find X8 Pro几乎同时打开支付宝，我却先扫上二维码打开支付宝小程序，当时没有视频，但是确实不敢想象天玑 8200 的原生安卓机器可以碾压 9400 的 ColorOS

## Bug

原生安卓的优化在如今的确是一个非常值得注意的问题，就比如QQ在挂载后台时间长了之后容易出现界面卡死，我已经在一天内遇到多次这样的情况出现，应该不算是个例了

<iframe width="100%" height="100%" src="https://pic.ivoinkwell.xyz/file/blog/specks/pixelos-in-daily-life/pixelos-in-daily-life.mp4" title="" frameborder="0" allowfullscreen></iframe>

## 续航

这个算是我觉得比较惊讶的地方，作为一个备用机的手机，电池已经从原本的 5080mAh 容量降到4400mAh，这样的一个电池容量使用 HyperOS 基本上可以一天三充了。但是 PixelOS 上面确实可以一天一充，我当然不敢不充电，所以我是在早上充电到 100% ，中午还剩 50% ，从 50% 充到了 100% ，晚上回家还有 60% 的剩余，我全天都是挂着 VPN 和开着热点的情况下，我觉得这个续航成绩可谓是非常的理想了，和我新手机电池区间在 40% - 80% 的表现几乎是一致的。
