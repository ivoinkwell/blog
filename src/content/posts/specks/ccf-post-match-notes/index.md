---
title: CCF 赛后笔记
category: 零碎随笔
published: 2026-10-18
image: ./cover.png
tags: ["参赛笔记", "随笔"]
description: ""
---

之前参加的 CTF 比赛和这个比赛相比，我觉得是两个感觉，之前 CTF 就是数学考试，你会就是会，不会你靠以往的知识也是无济于事。但是现在参加 CCF 之后，我发现，我之前学过玩过有印象的东西能够快速的帮我解决与排查问题，但是我还是改不掉我自己的一个毛病，容易着急而漏掉很多必要的事情，就像提交这样的事情，到写这篇博客为止，我还不知道我完成的 Linux 相关部分是否算分，是否能够有幸进入决赛。

## 比赛内容

这个比赛的初赛分为三个部分，第一部分是网络部分，使用 `eve` 这样的平台进行操作，第二分是 Linux 的服务搭建，其中也学到了不少我从来没装过，用过的服务，第三部分是 AI 模型部署与 Agent 搭建，其中有我非常熟悉的一个东西，就是桌面环境 **`KDE Plasma`**。但是也正是在我最熟悉的地方，我才知道我缺少学习了什么东西。

## Linux 服务搭建与部署

比赛之后，我发现我学到了很多我在自己安装，开发，自定义 Linux 当中完全使用不到的服务，但是这些服务的配置文件在离线后都变的十分有趣了

### `dnf` 包管理器

用过红帽系列系统的人应该对这个包管理器是不陌生的，Fedora Workstation 是我接触 Linux 之后接触的第四个发行版，应该也是用作自己桌面环境最长的一个发行版，毕竟连 Linus 本人都用的系统，就算是不好用也一定有一点我使用不到的优点。

使用这个发行版必不可少就是要接触这个发行版率先搭载的一个包管理器 —— **`dnf`**。`Fedora 是 RHEL 系列的试验田` 这几乎都已经是 Linux 圈的一个共识了，自 `2015年5月` 的 `Fedora 22` 发布，`dnf` 已经成为 Fedora 发行版的默认包管理器，但是到了 `2021年6月` 才正式成为 Rocky Linux 的默认包管理器，所以这个包管理器根本都不会有人能够很正式的学习，我也是通过自己安装才学到的一点皮毛，这次一个断网环境的比赛才让我更深入的了解了这个包管理器。

**在一个断网环境下，你觉得如果我给你准备一个带所有依赖的 `.rpm` 软件，你会怎么安装？**

应该有很多人会和我一样：

```bash
cd /软件包目录
rpm -i *.rpm

# 或者强制安装
rpm -ivh *.rpm
```

但是如果让你安装 KDE Plasma 完整桌面呢？那么多依赖必须报错的啊，还能有什么怀疑吗？所以真正应该使用的包管理器是 `dnf`

但是 `dnf` 这东西很神气，就是不管安装什么，前提必须跑一遍 `update`，就算是本地 `.rpm` 包也是一样联网安装，所以学到了一个新的参数 **`--disablerepo '*'`**。

```bash
cd /软件包目录
dnf --disablerepo='*' install *.rpm
```

一定要看清楚位置，要不然还是报错
### Bind - DNS

**`dns-nameserver`** 相信只要是玩 HomeLab 接触 Linux 的玩家绝对不陌生，毕竟只要是需要配置静态 IP 绝对逃不开的就是这个东西，但是我们一直更换的也都是公共的 DNS 服务器，很少是需要自己去搭建的，所以 Bind 这个软件包应该可以说是根本没有下载和配置过的。

这个东西需要三个配置文件，主配置文件用于配置解析域名与 IP 的区域文件，一般是两个区域文件，分别用于 `域名 -> IP` 和 `IP -> 域名`的双向解析。

主配置文件位于 **`/etc/named.conf`**

```Bash
options {
    listen-on port 53 { any; }; # 提供服务，需要接收 any 的请求
    directory "/var/named";
    allow-query { any; }; # 提供服务，需要接收 any 的请求
    recursion yes;
};

zone "example.com" IN {
    type master;
    file "example.com.zone";
    allow-update { none; };
};

zone "100.168.192.in-addr.arpa" IN { # 100.168.192 是 192.168.100 的反写
    type master;
    file "192.168.100.rev";
};
```

然后是配置正向解析，因为没有网，但是我又不想完完全全的自己手打，那么肯定是要查一下怎么偷懒的，那就刚好查到了两个区域配置文件的模板位置

> - **正向区域配置模板：** **`/var/named/named.localhost`**
> - **反向区域配置模板：** **`/var/named/named.loopback`**

所以就可以直接复制了

正向配置模板复制一下

```bash
cp /var/named/named.localhost /var/named/example.com.zone
```

但是需要更改一下 SOA 记录和添加一下 NS 记录

```Bash
$TTL 1D
@       IN SOA  linux1.example.com. admin.example.com. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
@       IN  NS      ns.netdj.net.
linux1  IN  A       192.168.100.101
linux2  IN  A       192.168.100.102
```

反向配置模板也是一样的

```bash
cp /var/named/named.loopback /var/named/192.168.100.rev
```

同样需要更改一下 SOA 记录和添加一下 NS 记录

```Bash
$TTL 1D
@       IN SOA  linux1.example.com. admin.example.com. (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
@       IN  NS      ns.netdj.net.
101     IN  PTR     linux1.example.com.
102     IN  PTR     linux2.example.com.
```

最后是测试，学会了使用 `dig` 工具

```bash
dig @localhost linux2.example.com
```

### Ansible

这个服务是让我学到最多的，就是我一直使用的 SSH，之前我使用我的 Windows 机器连接我在 PVE 的 LXC 容器搭建的开发机就是使用的 SSH ，但是后来 SSH 一直每一次都要输入密码，我后面就掌握了 SSH Key 的设置与配置。

首先两台机器都是 root 账号，这就到了我最熟悉一个配置的更改 —— `PermitRootLogin`，配置文件在 `/etc/ssh/sshd_config`。

然后是生成 SSH 的 Key：

```Bash
ssh-keygen -t [密钥算法] -C [注释] -N [密码]
```

这些参数我当时根本就没有使用过，都是直接 `ssh-keygen` 就这样稀里糊涂的生成完，然后两边公钥复制下来就结束了，可是两台机器之间没有传输文件的怎么办呢？

这就是一个新的命令了：

```bash
ssh-copy-id [机器域名或者IP]
```

当时使用 DNS 的配置就十分关键了，还有一个地方是我不在环境都没办法发现的，两台机器应该都执行一遍，然后填上对方的域名，但是 Ansible 的配置文件需要连接控制端与被控制端，配置文件位置：`/etc/ansible/hosts`

```Bash
[control]
linux1.example.com # 域名或者IP地址

[managed]
linux2.example.com # 域名或者IP地址
```

最后启动之后应该是不会报错的，但是如果在 Linux 1 上不执行 **`ssh-copy-id linux1.example.com`** 就会出现红色连接错误的警告，十分有意思了。

### Docker

Docker 其实都已经算是我玩烂的一个东西了，但是到了上手的时候还是碰到了一个我根本没有记忆，但是需要命令完成的事情 —— **进入容器终端**

所以这个命令我也记下了

```Bash
docker exec -it [容器名称] bash
```

对了，还有拉起镜像时候有两个参数总是忘记或者写错

> - **`--name nginx`**
> - **`--restart always`**

忘了，还有一个地方也十分的神奇，就是自启动方式，原本一直都是使用这个命令，使用服务唤醒

```bash
systemctl enable --now docker.service
```

题目里整了一个套接字出来，但是问了 AI ，AI 说这个是只有在有端口请求的时候 Docker 容器才启动，会节省内存，回头我也可以试试

```bash
systemctl enable --now docker.socket
```

## AI 大模型部署

这东西的我还写了一个飞书笔记，毕竟这玩意不是我的板块。

但是我写完也才发现我对于 Linux 的桌面环境其实也没有那么的熟悉，之前我在我的文档站写过一个关于 `Debian 13 + i3-wm` 的一个个人开发环境搭建的 [文章](https://docs.ivoinkwell.xyz/build-linux-development-enviroment/)，但是之前使用的是在线安装的 LightDM 作为登录管理器，安装后直接重启就解决了，但是在安装 SDDM 的时候却出现了问题，这个中间少一个设置默认 DM 的命令

```Bash
systemctl set-default graphical.target
```

## 比赛与 RHEL

这次比赛算是我和 RHEL 的初次真正的对决，尽管用过将近一个月时间的 Fedora Workstation 44 ，我也依然不会是这个系统的对手，毕竟作为一个企业上常用的系统，其命令所会包含的参数量一定是 Debian 和 Arch 这类发行版所无法企及的高度，也是我使用的门槛，作为一个开发环境，我们需要了解的是 Python 的 `venv`，是 Node.js 的 `nvm`，是比 `npm` 更好用的 `pnpm`，是他们的用处以及用法，但是从来没有真正的和你所用的系统过过招，我想这次比赛之后我能好好的去学一下 RHEL ，应该是一个最好的机会。