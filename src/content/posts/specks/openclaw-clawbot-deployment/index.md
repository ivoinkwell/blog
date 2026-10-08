---
title: openclaw(clawbot)部署笔记
category: 零碎随笔
published: 2026-03-15
image: ./cover.png
tags: ["服务搭建", "随笔"]
---
## 简述

在开始进行部署之前，一定要准备好环境。首先就是Linux，如果是使用Linux系统一定要选择systemd的，要不然部署上会出现网关不可达等一系列问题。在部署的时候出现了很多的问题，重复了很多次，没做截图，所以以下内容只能用文字的形式进行表述。

## 系统硬件限制

由于是JavaScript的东西，所以对于内存要求有一定的限制，尽管空载时是0.6G，但是在启动的时候依然还是需要2G的内存去支撑运行。

## 基础组件安装

Clawdbot依赖于Node.js运行，也需要npm包管理器，所以这两个组件需要安装，但是版本要`>=22`。

我是用的是Debian 13进行安装，因为官方的仓库源是默认的版本是20，所以我们需要去添加Node.js官方的软件源去安装。

```bash
# 1. 更新系统并安装依赖
sudo apt update
sudo apt install -y curl gnupg ca-certificates

# 2. 下载并添加 NodeSource 仓库密钥
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -

# 3. 安装 Node.js 22
sudo apt install -y nodejs

# 4. 验证安装
node --version
npm --version
```

**更换npm软件源**

更换淘宝源

```bash
npm config set registry https://registry.npmmirror.com/
```

## openclaw

### 安装

终端中输入

```bash
npm i -g openclaw
```

### 首次配置

终端输入：

```bash
openclaw onboard
```

#### tips: 如果只是部署体验，API可以使用ZAI的flash模型，全部是免费的，但是效果会差强人意
