---
title: Cloudflare 边缘函数反向代理搭建笔记
category: 零碎随笔
published: 2026-10-02
image: ./cover.png
tags: ["服务搭建", "随笔"]
---

最近看二叉树树的视频，又看到了 Cloudflare 的边缘函数，之前听说过 Workers 做代理，但是一直都是处于一个知道但是没有动过手的状态，看了视频之后对于 Workers 有了一些认识，所以也开始准备尝试搭建一些自己的边缘函数

## 使用场景

对于我来说，GitHub Clone 仓库不是什么重要的东西，但是有一个地方非常重要 —— 图床。我知道使用 GitHub 仓库作为图床有风险，所以我的这个图床就是用来存一些需要公开笔记的图片，这样也方便发给别人，当然这些图片我也就不用存放在本地浪费 NAS 和笔记本硬盘的资源

搭建 Workers 代理最大的好处就是便于访问 GitHub 这样别人看笔记图片加载速度就能快很多

```text
https://raw.githubusercontent.com/ivoinkwell/share-img/main/使用 Hexo 框架搭建个人博客/使用-Hexo-框架搭建个人博客-安装-Hexo-框架-1.png
```

上面的是 GitHub 仓库原始的图片链接，现在把代理全部关掉然后在浏览器打开这个图片

```text
https://ghrawproxy.inkwellapi.cc.cd/ivoinkwell/share-img/main/使用 Hexo 框架搭建个人博客/使用-Hexo-框架搭建个人博客-安装-Hexo-框架-1.png
```

换成这个呢？

## 反向代理

现在回到一个小白的身份，因为你写文档不能保证他们阅读环境统一，你要是想要偷懒，你就要有能够偷懒的准备，所以我们需要去做这样一个反向代理，确保能够正常访问 GitHub

```javascript
export default {
  async fetch(request) {
    // 这里改成你要代理的网站
    const TARGET = 'https://example.com'

    const url = new URL(request.url)
    const newUrl = TARGET + url.pathname + url.search

    return fetch(newUrl, request)
  }
};
```

这个就是一个基础的模板，这个时候我们就已经可以去做一个 GitHub 的代理了

```javascript
export default {
  async fetch(request) {
    // 这里改成你要代理的网站
    const TARGET = 'https://github.com'

    const url = new URL(request.url)
    const newUrl = TARGET + url.pathname + url.search

    return fetch(newUrl, request)
  }
};
```

图床我使用 `raw.githubusercontent.com`，但是图片如果还是频繁的请求仓库依然会导致仓库封锁，所以我们最好加上一些缓存

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // 直接透传到 raw.githubusercontent.com，路径原样保留
    const target = new URL(
      'https://raw.githubusercontent.com' + url.pathname + url.search
    );

    const headers = new Headers();
    headers.set('User-Agent', request.headers.get('User-Agent') || 'Mozilla/5.0');
    headers.set('Accept', request.headers.get('Accept') || 'image/*,*/*;q=0.8');

    const range = request.headers.get('Range');
    if (range) headers.set('Range', range);

    const res = await fetch(target.toString(), {
      method: request.method,
      headers,
      cf: {
        cacheEverything: true,
        cacheTtl: 604800, // 7 天
      },
    });

    const newHeaders = new Headers(res.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Cache-Control', 'public, max-age=604800');
    newHeaders.delete('set-cookie');

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  },
};
```

