---
title: Telegram + Cloudflare Pages：搭建博客图床与网盘
category: 零碎随笔
published: 2026-08-11
image: ./cover.png
tags: ["随笔", "服务搭建"]
---
其实我最开始的目的只有一个，就是找到一个下载不限速，存储不限制容量的一个项目，用处其实不是图床，而是做博客以及文档站的网盘，但是后面发现文件下载速度能跑满家里的百兆带宽，用作图床应该能加快图片加载速度，目前已经把博客和文档站的所有图片全部迁移至图床里面。

## 想法与发现

最近发现使用 `Cloudflare Pages` 部署自己的博客访问速度会比部署在 `GitHub Pages` 上哉使用 Cloudflare 做 CDN 加速要快一些，所以就思考能不能有这样一个项目是部署在 `Cloudflare Pages` 上面，连接一个存储并且可以直接提供下载的项目，如果页面能是 Openlist 样式的就更好。但后来看到一个图床项目，除了名字有 ImageHub 之外似乎已经能完全满足我的要求，并且存储也能达到一个完全免费的水平，所以我就开始使用了这个项目，可能唯一的不足就是 Cloudflare 对 Pages 的每天的10万次访问限制，但是对于我这种个人博客也是足够使用了。

::github{repo="MarSeventh/CloudFlare-ImgBed"}

## 部署与搭建

### Fork 源仓库

打开项目地址，首先我们要将这个项目 Fork 一份到我们自己的仓库当中，根据图片中的提示进行操作

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service.webp)

### 部署到自己的 Cloudflare Pages

我选择最容易部署的一个方式，你也可以根据其官方文档教程选择自己合适的部署方式，例如：**[Cloudlfare Works](https://cfbed.sanyue.de/deployment/worker.html)** 或者使用 **[Docker](https://cfbed.sanyue.de/deployment/docker.html)**

打开自己的 Cloudflare Dashboard，根据图中步骤打开 Pages 部署页面，创建一个应用程序

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-1.webp)

创建一个 Pages

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-2.webp)

这里我们选择使用刚刚 Fork 的仓库，Cloudflare 需要绑定我们的 GitHub 账号

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-3.webp)

选择刚刚 Fork 下来的项目，点击开始设置

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-4.webp)

输入构建命令以及环境变量

> - `构建命令`：`npm install`
> - `构建输出目录`：`frontend-dist`
> - `环境变量`：
> - `AUTH_CODE`：`页面一打开输入的访问码`
> - `BASIC_USER`：`管理员用户名`
> - `BASIC_PASS`：`管理员密码`

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-5.webp)

点击保存并部署之后等待部署完成，这个时候要去创建一个KV空间

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-6.webp)

自行给这个 KV 空间命名即可，回到刚刚创建的 Pages ，将 KV 空间绑定上去

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-7.webp)

按照图片中的格式，下方选择刚刚新建的 KV 空间

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-8.webp)

绑定完成后选择重试部署

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-9.webp)

部署完成后点击 Pages 给我们分配的域名，墙内无法打开，需要自己部署自定义域名，在自定义域绑定即可，打开网页

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-10.webp)

### 配置

输入刚刚配置的 `AUTH_CPDE` 进入，在图片的设置

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-11.webp)

输入刚刚设置的账号与密码

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-12.webp)

选择系统设置

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-13.webp)

找到上传设置

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-14.webp)

添加上传渠道，在一开始部署的时候是什么都没有的，根据图片点击添加

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-15.webp)

选择 Telegram 之后我们需要看看需要哪些参数

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-16.webp)

渠道名称也就是这个配置的名字，可以随便填写，我们需要获取两个值，`Bot Token` 和 `Chat ID`

#### 创建 Telegram Bot 获取 Bot Token

打开自己的 Telegram ，网页版，手机版，电脑版随意，搜索并找到 BotFather

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-17.webp)

打开聊天界面输入 `/` 选择 `/newbot` 选项，根据提示输入你的机器人名字以及以 `bot` 结尾的专属 ID

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-18.webp)

随后即可获取自己这个机器人的 Bot Token

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-19.webp)

#### 创建频道并且将机器人设置为管理员

找到新建频道选项

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-20.webp)

新建一个频道，频道类型都可以，个人做图床或者网盘分享使用，私密频道优先。创建频道之后搜索并将机器人设置为管理员

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-21.webp)

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-22.webp)

搜索一个机器人，用于获取我们这个频道的 Chat ID，搜索这个用户名 `@VersaToolsBot`，或者直接点击 **[这个链接](https://t.me/VersaToolsBot)**

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-23.webp)

在频道发送一条消息并且转发给这个机器人，即可获得 Chat ID

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-24.webp)

将两个值填入网页中即可完成所有配置

## 上传与测试

打开网页并且随便上传一张图片或者文件

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-25.webp)

频道中即可看见相对应的上传记录

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-26.webp)

## 作为网盘的相关思路

你说如果作为图床，是否为每篇文章新建目录留存图片其实意义不是很大，因为图床的意义仅仅只是当 GitHub 这些平台限制的单文件大小太小的一个解决办法，如果说这个图床能够比放在博客根目录中的图片加载速度一样其实并不会，我的博客目前已经从 GitHub Pages 转移到 Cloudflare Pages 上，所以一定是在 Cloudflare 的全球 CDN 节点上了，但是图片的加速相比放在博客根目录中的加载速度提升或许有，但是也很有限，可能就是图床能够提供压缩的一个服务，全部压缩成`.webp` 格式，也能一定程度上减轻加载的瞬时压力。

但是作为博客的附件网盘我觉得还是比较适合的，但是这些附件不要非常的大，要不然有可能会触发 Bot 的请求限制，因为大于 20MB 的文件会被切片保存，也就是如果我上传 1G 的文件很有可能能切 40 多片，下载的话就是请求 40 次之后在下载者的电脑上重新组装回去，如果多个人同时下载就有可能触发这样的一个限制。但是相较于使用网盘分享已经能好出不少了。下面我分享一下我的相关使用方法。

### 目录设置

就像上图中我截图的这些附件就是我文档站当中的一篇文章，如果附件不分文章放好，后面分享贴直链的时候寻找会非常的麻烦，但是后台文件管理不能创建文件夹以及目录，所以只有在上传前确定好自己的目录，就像下图确定好位置是 `/文档站资源/网络安全与数据安全参赛笔记/6.15-数据安全刷题笔记/`

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-27.webp)

后台管理以及复制的时候才能是这个目录

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-28.webp)

### 挂到 OpenList

这个也是我偶然间发现的，我用 OpenList 本来是用来使用它的视频接口和百度网盘搭建自己的飞牛影视库的

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-29.webp)

后面偶然发现了这个

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-30.webp)

于是我就创建了一个新的网盘 Pages 挂到上面去，然后用 Cloudflare Tunnel 穿出来，除了网页在我家，实际的下载链接其实还是图床，配置里网页代理打开就要从部署 OpenList 的主机上面走了。

![](https://pic.ivoinkwell.xyz/file/blog/specks/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service/telegram-and-cloudflare-pages-building-a-blog-image-hosting-and-cloud-storage-service-31.webp)

挂出来之后就是这样的效果，下载链接依旧是我的图床不会占用家里的带宽，网盘我已经挂在我的首页的链接中，文章内贴出来的也是里面下载文件的直链。

## 图床的作用

有了图床可能最大的作用就是分享 Markdown 文件的时候不需要将图片一起打包，可以防止他人误删以及漏打包的情况，我也会把我现在这篇博客的源 Markdown 文件放在网盘当中提供下载查看。

**[源文件](https://dl.ivoinkwell.xyz/file/博客资源/零碎随笔/Telegram-Cloudflare_Pages-搭建博客图床与网盘/index.md)**