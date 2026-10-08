---
title: Lucky+Nginx实现公网域名访问家庭NAS
category: 零碎随笔
published: 2026-03-15
image: ./cover.png
tags: ["内网穿透", "家庭网络搭建"]
---
这个标题对于我来说属实是说来话长了，在一开始我家虽然又公网的IPv4地址，但是家里的主路由一直上不去，所以无法将内网的服务转发到公网的端口上。但是元旦开始家里的网络质量一直很不好，所以拉掉电闸重新启动了一次主路由，却意外发现可以正常使用`192.168.1.1`进入主路由的管理界面。在这样的情况下，我先开始用端口转发成功能够访问家里的NAS设备，后来升级主路由固件重启后发现IPv4是变动的，我就用飞牛自带的DDNS解析到域名`lylebox.dpdns.org`这个域名+端口的方式进行访问，但是这样就比较的麻烦，而且不好记忆，所以在之前建站的基础上，我准备使用NAS作为`Nginx`的服务器，将飞牛等服务绑在域名上用`Nginx`进行转发，这样就很好的解决了访问NAS需要端口的问题，也不会443端口只能使用一个网站，下面就是我的搭建步骤：

## 部署Lucky和Nginx的Docker容器

可以参考我的compose文件

```dockerfile
version: '3.8'
services:
  # Lucky 官方镜像
  lucky:
    image: gdy666/lucky:latest  # Lucky 官方仓库镜像
    container_name: lucky
    restart: always
    ports:
      - "16601:16601"  # Lucky 面板端口
    volumes:
      - ./lucky-certs:/var/lib/lucky/certs  # 证书持久化目录
    environment:
      - TZ=Asia/Shanghai
      - PUID=0  # root 权限解决证书写入问题
      - PGID=0
    networks:
      - ln-net

  # Nginx 官方镜像
  nginx:
    image: nginx:alpine  # Nginx 官方轻量版镜像
    container_name: nginx-proxy
    restart: always
    ports:
      - "8080:80"   # 标准 HTTP 端口
      - "8443:443" # 标准 HTTPS 端口
    volumes:
      - ./nginx-conf:/etc/nginx/conf.d  # Nginx 配置目录
      - ./lucky-certs:/etc/nginx/certs:ro  # 只读挂载 Lucky 证书
      - ./nginx-logs:/var/log/nginx  # 日志目录
    environment:
      - TZ=Asia/Shanghai
    depends_on:
      - lucky  # 确保 Lucky 先启动
    networks:
      - ln-net

# 自定义桥接网络，容器互通
networks:
  ln-net:
    driver: bridge
```

构建后确保compose可以完全正常运行。

## Lucky的相关配置

**访问`IP:16601`**

**默认账号密码为：`666`**

进入后台，按照提示重设安全路径和账户密码

之后重新进入后点击左侧的SSL/TLS证书页面，添加证书，填入自己的域名和token，需要更改的地方更改如下：

![image-20260103183054505](https://pic.ivoinkwell.xyz/file/blog/specks/lucky-nginx-nas-public-access/image-20260103183054505.webp)

最后添加证书映射：

![image-20260103183212721](https://pic.ivoinkwell.xyz/file/blog/specks/lucky-nginx-nas-public-access/image-20260103183212721.webp)

格式如下：`/var/lib/lucky/certs/[your.domain.com`

## Nginx相关配置

**配置文件位置在`nginx-conf`文件夹内，可创建多个，名字任意**

这是我的配置，将其中的`[Domain]`和`[IP Address]`换成你自己的

```bash
# 防止子域名访问主域名
server {
     listen 443 ssl default_server;
     listen 80 default_server;
     server_name _; # 匹配所有未定义的主机名
     # 443端口需配置证书（复用主域名证书即可）
     ssl_certificate /etc/nginx/certs/[Domain]/[Domain].crt;
     ssl_certificate_key /etc/nginx/certs/[Domain]/[Domain].key;
     # 直接拒绝请求，可选444（关闭连接）或404
     return 444; 
}
 
server {
    listen 80;
    server_name [Domain];
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name [Domain];
    
    # SSL 证书路径
    ssl_certificate /etc/nginx/certs/[Domain]/[Domain].crt;
    ssl_certificate_key /etc/nginx/certs/[Domain]/[Domain].key;
    
    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    location / {
        proxy_pass [IP Address];
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket 支持（如果 fnOS 需要）
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 缓存和超时设置
        proxy_buffering off;
        proxy_connect_timeout 90s;
        proxy_send_timeout 90s;
        proxy_read_timeout 90s;
    }
}
```

## NAS配置（手机端访问）

下载并导入证书：

![image-20260103182917908](https://pic.ivoinkwell.xyz/file/blog/specks/lucky-nginx-nas-public-access/image-20260103182917908.webp)
