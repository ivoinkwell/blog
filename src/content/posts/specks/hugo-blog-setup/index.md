---
title: Hugo博客搭建笔记
category: 零碎随笔
published: 2026-03-18
image: ./cover.jpg
tags: ["博客搭建", "随笔"]
---
## 概述

之前我博客为了图省事一直使用的是`Publii`进行搭建的，但是后来出现了很严重的性能以及备份的问题。`Publii`的逻辑是需要在本地生成完整的静态博客内容，随后使用`git`进行提交，但是这样就存在两个非常重要的问题，备份与同步——我们一般都是一个台式机和一个笔记本的组合，两台机器想要同步之前更改的内容就必须要有同步，虽然我在家使用`NAS+Syncthing`的方案可以解决同步的问题，但是外网终归以来家中主路由的稳定性，之前同步就会经常性的在外面掉线，同步一些其他资料其实没有什么问题，但是博客的小文件多，需要很强的稳定性，所以我决定换一个博客框架吗，在搭建社团博客的时候使用`Hexo`发现`Node.js`安装的十分繁琐，使用简单的单文件的`Hugo`对于我这种不喜欢残留的人来说或许才是最好的方案。在使用`Hugo`之后发现了不少很喜欢的地方，也踩了不少的坑，我也会一一说明。

## 博客搭建预览与主题安装

### 搭建

**准备文件：**

 - [Hugo二进制文件](https://github.com/gohugoio/hugo/releases)

#### 搭建新网站

解压出`hugo.exe`文件

![image-20260318174814358](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318174814358.webp)

打开命令行窗口

![image-20260318174925151](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318174925151.webp)

输入

```shell
hugo new site [你网站的名字]
```

即可看见网站的目录

![image-20260318175107061](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318175107061.webp)

![image-20260318175133830](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318175133830.webp)

#### 安装主题

我用的是[`Blowfish`主题](https://blowfish.page/)，如果你是用其他主题安装是一样的方法，但是配置文件是不一样的，需要去官方的GitHub项目说明中查看。

**下载主题**

打开 **[Hugo官方主题商店](https://themes.gohugo.io/)** 选择自己喜欢的主题，去到官方GitHub项目页面下载即可。[`Blowfish`主题点我下载](https://github.com/nunocoracao/blowfish)即可。

**如此方法下载：**

![image-20260318175915991](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318175915991.webp)

下载后解压，重命名为`blowfish`并放置在博客的`themes`目录下

![image-20260318180052330](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318180052330.webp)

进入`blowfish`目录将`exampleSite`目录拷贝至博客根目录即可

![image-20260318180219708](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318180219708.webp)

![image-20260318180231588](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318180231588.webp)

#### 预览

将`hugo.exe`二进制文件拷贝至博客根目录，打开`cmd`窗口

![image-20260318180418109](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318180418109.webp)

输入

```shell
hugo server
```

即可在

```text
localhost:1313
```

查看。

## 优点与踩坑

### 优点

对于我来说，这算是找到了一开始搭建博客的初衷，很多地方能够直接自己自定义。还有一个是性能方面，没办法，这个必须要有对比才能体现，我也不想证明什么。

**主页**

我的主页上面我做了**友链**这么个东西，这个是几乎很多博客不会做的，是的，这个就是我和AI一起搓出来的，不过最后明暗主题切换我确实不会，也只好交给AI去做了。

**这便是我的`_index.zh-cn.md`文件，做个参考吧**

```markdown
---
title: "欢迎来到 Blowfish! :tada:"
description: "此页面是使用 Hugo 的 Blowfish 主题搭建的"
---

<!-- <div id="typing-text" style="background-color: transparent; min-height: 1.5em; font-size: 18px; font-weight: bold; text-align: left;"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  const message = "致我们：\n愿我们都能在各自感兴趣的事情上找到更好的自己！\n\n尘.";
  const element = document.getElementById("typing-text");
  let index = 0;

  // 光标
  const cursor = document.createElement('span');
  cursor.classList.add('typing-cursor');
  cursor.textContent = '|';
  element.appendChild(cursor);

  // 光标样式
  const style = document.createElement('style');
  style.textContent = `
    .typing-cursor {
      opacity: 1;
      animation: blink 1s infinite;
      margin-left: 2px;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function typeWriter() {
    if (index < message.length) {
      const currentChar = message.charAt(index);

      if (currentChar === '\n') {
        const br = document.createElement('br');
        element.insertBefore(br, cursor);
      } else {
        const char = document.createTextNode(currentChar);
        element.insertBefore(char, cursor);
      }

      index++;
      setTimeout(typeWriter, 150);
    } else {
      // 结束后隐藏光标
      cursor.style.animation = 'none';
      cursor.style.opacity = '0';
    }
  }

  setTimeout(typeWriter, 500);
});
</script> -->

<div id="friends-links" style="margin: 20px 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  // 友链数据（自己替换 logo 地址）
  const links = [
    { name: "云泽の小屋", desc: "最好的朋友，他的博客是世界上最详细网络安全实践笔记！", url: "https://zeyun.dpdns.org", logo: "https://zeyun.dpdns.org/media/website/Happy_Mac.png" },
    { name: "猪老师在线", desc: "最有趣的老师，网络安全没人比他讲的更好！", url: "https://www.pigteacher.com", logo: "https://www.pigteacher.com/wp-content/uploads/2025/01/cropped-1-128x128.jpg" },
    // { name: "设计工坊", desc: "美学与创意聚集地", url: "#", logo: "https://via.placeholder.com/32" },
    // { name: "旅行日记", desc: "走遍山川湖海", url: "#", logo: "https://via.placeholder.com/32" },
    // { name: "阅读空间", desc: "文字与思想的旅途", url: "#", logo: "https://via.placeholder.com/32" },
    // { name: "摄影集", desc: "定格每一刻温柔", url: "#", logo: "https://via.placeholder.com/32" }
  ];

  const container = document.getElementById("friends-links");

  // 样式：完全保留你原来的！只加了最外层布局
  const style = document.createElement('style');
  style.textContent = `
    /* 浅色模式 */
    .friend-card {
      padding: 20px;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      transition: 0.2s ease;
      text-decoration: none;
      color: #111827;
      /* 关键：图片 + 文字 横向排列 */
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .friend-card:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    /* 深色模式 */
    html.dark .friend-card,
    .dark .friend-card {
      background: rgba(30, 30, 32, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: #f3f4f6;
    }
    html.dark .friend-card:hover,
    .dark .friend-card:hover {
      background: rgba(40, 40, 42, 0.75);
    }

    /* logo 样式 */
    .card-logo {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0;
    }

    /* 文字容器 */
    .card-text {
      flex: 1;
    }

    .friend-name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
      color: inherit;
    }
    .friend-desc {
      font-size: 13px;
      line-height: 1.4;
      opacity: 0.85;
      color: inherit;
    }
  `;
  document.head.appendChild(style);

  // 生成卡片（只加logo，其余完全不变）
  links.forEach(item => {
    const card = document.createElement('a');
    card.className = "friend-card";
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
      <!-- logo 在最左侧，文字整体在右侧 -->
      <img src="${item.logo}" class="card-logo">
      <div class="card-text">
        <div class="friend-name">${item.name}</div>
        <div class="friend-desc">${item.desc}</div>
      </div>
    `;
    container.appendChild(card);
  });

  // 监听主题切换
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.friend-card').forEach(c => c.style.color = '');
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});
</script>
```

**文章**

这个功能我可能不太能够用的上，就是`Google`的`Firebase`后端用于统计查看人数的，不过阅读者是国内网络根本不会统计，还有就是我对于数字计量阅读热度很讨厌，所以可以看个人需求进行更改。

### 踩坑

我觉得这应该是我才过路径这些东西里最大的一个坑。

**GitHub**

![image-20260318183515431](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318183515431.webp)

这个是`GitHub`上面我的零碎随笔目录

**本地**

![image-20260318183559770](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318183559770.webp)

这个则是我本地的。

**也就是说，上传GitHub之后所有的大写字母全部是小写，所以文章引用图片路径全部要是小写**

![image-20260318183707130](https://pic.ivoinkwell.xyz/file/blog/specks/hugo-blog-setup/image-20260318183707130.webp)

## 总结

总体算是比较成功的博客迁移，这也让我再一次学到英文路径只有小写的道理，在之前其实`GitHub`根本不支持中文路径的，现在相比之前会好很多了。