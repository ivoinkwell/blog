---
title: AI Coder项目开发使用笔记
category: 项目开发
published: 2026-04-07
---
## 概述

::github{repo="ivoinkwell/forum-anon"}

这个就是我和Qwen Code一起开发的项目，中间使用的编辑器是Zed，我个人最喜欢的一个编辑器，对于AI的集成功能是相当的不错，我下面准备写一下如何以最低成本换来比较好的个人+AI的开发体验。

我觉得一下图片已经足够证明我有这个资格去写这么一篇文章：

![edit_predictions](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407094016414.webp)

## Zed中的AI使用指南

在Zed中有这样的几种AI形式：

- **Agent** - 代码编写AI，类似于Trae的模式。Tokens消耗很大。
- **Inline Assistant** - 单行更改AI，比如`ctrl+enter`输入多加一条30分一下的判断条件，自动增加。
- **Edit Predictions** - 行内补全，智能预测。对我个人而言，尤其在HTML的代码中十分有效果。

### Agent

![image-20260407094816417](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407094816417.webp)

右侧的面板就是了，在这里比如对他说帮我构建一个Vue项目，他就能自动执行命令，创建文件，查看报错等等，在排错上有一定的效果。

我们可以配置免费的智谱`glm-4.7-flash`模型进行使用，这样，简单场景基本可以免费解决

![image-20260407124548877](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407124548877.webp)

但是相比OpenCode和Qwen Code这些专业的AI Coder还是有很大的差距的。

**但是，我们可以自己安装：**

点击加号，选择`Add More Agents`

![image-20260407110427463](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407110427463.webp)

打开页面即可进行安装

![image-20260407110637483](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407110637483.webp)

#### ACP相关配置

**环境**

这个环境是`本地环境`，比如我SSH连接我的开发机，我的开发机上面就需要用官网的方式去安装`OpenCode`和`Qwen Code`才可以使用插件进行连接使用。

**Qwen Code**

这个插件是我使用下来，还是需要进行一些配置的，如果不进行一些配置，可能会导致SSH连接的服务器上经常断联，按照官网上手动配置的写法写进官方的里面就行。

```text
"agent_servers": {
    "qwen-code": {
      "type": "custom",
      "command": "qwen",
      "args": ["--acp"],
      "env": {},
    },
  },
```

### Inline Assistant

一个行内的AI工具，对于我来说不太常用，但是用起来就算是API调用，消耗的tokens也是最少的。所以普通的轻量模型就行，但是经过尝试我没有办法使用智谱的任何模型运行成功

![image-20260407124237964](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407124237964.webp)

这个是DeepSeek购买API的效果，消耗token极低，对于我来说，一个月5块钱左右基本就能拿下。

![image-20260407124118354](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407124118354.webp)

### Edit Predictions

行内补全我尝试过很多，比如OpenAI API的格式调用任何模型，都没有成功过，所以自己调用免费模型应该是不行了，也就是这里的配置

![image-20260407124758438](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407124758438.webp)

**也不是完全没有方法：**

Zed自己家的Zeta模型不仅速度快，一个月一共有2000次机会，只有你按下`Tab`按键确认才算一次，还是比较划算的。而且预测还不错

![image-20260407125313806](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407125313806.webp)

![image-20260407125324142](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407125324142.webp)

## 免费AI模型使用测试

刚刚买了MiniMax29块的一个包月Coding Plan接入了自己的OpenClaw，所以在一定程度上Inline Assistant可以暂时调用，但是以后还是需要免费的模型，所以硅基流动变成了现在的首选

![image-20260407142459527](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/image-20260407142459527.webp)

### Inline Assistant

在这个里面我们尝试调用硅基流动的免费模型，似乎只有DeepSeek支持是最全的，包括FIM补全

![{52196BEF-7BD0-4882-A2B0-FB9290EEEFFE}](https://pic.ivoinkwell.xyz/file/blog/projects/ai-coder-development/{52196BEF-7BD0-4882-A2B0-FB9290EEEFFE}.webp)

## 总结

在经过深入研究之后，我算是有了正确免费使用AI的一些个人见解：

> - **行内补全：** Zed自带模型Zeta每月免费额度
> - **行内更改：** 带FIM补全功能模型。目前国内似乎只有DeepSeek……
> - **Agent提问：** 我的方案是本地写小的类似博客的东西，大的项目全部在开发机上，所以开发机上安装Qwen

**ps：希望你不要像我一样多花40多的API钱！**
