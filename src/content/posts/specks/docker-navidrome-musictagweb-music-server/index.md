---
title: Docker部署Navidrome+MusicTagWeb搭建私人音乐库
category: 零碎随笔
published: 2026-03-15
image: ./cover.png
tags: ["服务搭建", "家庭网络搭建"]
---
如果你是一个使用旧电脑，性能比较差的设备跑NAS，但是又想体验很多功能，那么轻量的Navidrome一定是一个不错的选择，但是安装后却发现音乐播放与之前自己充vip的听歌体验并不相同，虽然喜欢极简的播放器，但是把歌词和封面省略着实是不应该了。但是如果自己去一个一个下载，不说资源好不好找，就光是这个动作就已经非常浪费时间了，所以MusicTagWeb的自动刮削也是必不可少的。

## 为什么不用NAS软件商店中的Navidrome？

对于我来说确实不是非常好控制路径，所以选择我Docker更放心一些。正好将两个容器放在一个compose里面部署也简洁省事

## 如何搭建和部署

**下面是我的compose文件：**

```dockerfile
version: "3"
services:
  # Navidrome 音乐服务器
  navidrome:
    image: deluan/navidrome:latest
    container_name: navidrome
    ports:
      - "4533:4533"
    environment:
      - ND_LOGLEVEL=info
      - ND_MUSICFOLDER=/music
      - ND_DATAFOLDER=/data
      - ND_ENABLEDOWNLOADS=true
    volumes:
      - /vol1/1001/06_Music:/music  # 你的音乐目录，和NAS路径对应
      - ./navidrome:/data  # Navidrome 数据持久化
    restart: always
    networks:
      - music-network

  # MusicTagWeb 音乐标签编辑器
  musictagweb:
    image: xhongc/music_tag_web:latest
    container_name: musictagweb
    ports:
      - "8002:8002"  # 前端访问端口，可自行修改
    volumes:
      - /vol1/1001/06_Music:/app/media  # 挂载和Navidrome相同的音乐目录，直接编辑标签
      - ./musictagweb/data:/app/data  # 挂载数据存储目录
    restart: unless-stopped
    networks:
      - music-network

# 自定义网桥，两个容器互通
networks:
  music-network:
    driver: bridge
```

## 这样部署为什么会适合老旧设备？

在MusicTagWeb上面，启动模式是`unless-stopped`，也就是可以随时手动停止，等到需要添加歌曲的时候再手动打开容器搜刮歌词和图片即可。
