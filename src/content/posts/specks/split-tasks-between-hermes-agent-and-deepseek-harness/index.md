---
title: 我的 AI 分工调整：Hermes Agent 只做秘书了
category: 零碎随笔
published: 2026-11-08
image: ./cover.jpg
tags: ["随笔", "软件"]
description: ""
---

看过我之前文章的人应该都知道，我之前也和我朋友一样，部署了一个 Hermes Agent，但是和我朋友的用法不一样，我想直接把 Hermes Agent 当作一个直接帮我完成交付任务的一个 Agent，但是实际上 Hermes 只是更适合记住你的习惯，帮你规划，做你的私人助理，而不是一个得力的手下干将。

## 为什么选择 DeepSeek Harness？

熟悉一些我个人习惯的人可能会更清楚我这个选择的原因，其实就是有点极端的精神洁癖，我不太喜欢一个我完全不知道原理的东西在我的电脑上面乱做一些我不知道的事情，所以像是 WorkBuddy 这样对小白天生友好的办公神器就被排除在我的选择的名单之外。

我用的 Agent 还是非常多的，现在这样规划：

1. 我会优先把我的想法或者一些东西和 Hermes Agent 分享，分享之后 Hermes Agent 就能大概看出我关注或者忽略的地方或者出现了些什么问题
2. Hermes Agent 有成熟方案后，或者我想完成一些比如学校的一些课程作业的时候我就会使用 DeepSeek Harness 进行规划以及完成它们
3. 我在写代码的时候使用 WSL，所以我直接在 Linux 子系统当中安装了一个 OpenCode 来专注于我的编码问题

根据这样的规划，我肯定是买一个 Token Plan 然后把 API 接入使用会更划算一些，所以综合上述的整理，能适合我个人使用，可以购买 Token Plan 接入，并且可以和 WorkBuddy 完成相同工作的也就只有 DeepSeek Harness 了。

## DeepSeek Harness 出来这么久，为什么现在才用？

其实上面的答案已经可以回答了 —— 精神洁癖。

我其实一直认为，包括 WorkBuddy，DeepSeek Harness 这一系列的软件或多或少要在电脑里面留点垃圾或者对我的电脑做出什么改动，但是如果我的 Agent 部署在 PVE 的 LXC 容器里面，就像 Hermes Agent 一样，我就只需要发布任务，他给我结果，剩下的所有改动都是虚拟机承担。但是我后面发现，Hermes Agent 并不适合做这样需要交付的一个工作，他给出的结果是完全不经过大脑思考的那种感觉，就是什么都做了，但是每一件都完成得很抽象的感觉，所以我就开始思考与改变我对于用 AI 这些工具的一个规划。

为了弥补 Hermes Agent 的短板，我在电脑上安装了 DeepSeek Harness，开始使用之后我发现似乎和我的想象确实是有很多的不同。就像是最简单的笔记归类，我在比赛上面记笔记一向就是课程上到什么地方就写到什么地方，能在不同笔记前面加上 `00`，`01` 这些标记都已经算是非常不错了，但是现在使用了 DeepSeek Harness 之后，在整理上，移动文件等操作之前完全不会在我不知情的情况下胡作非为，这很大程度上改善了我对于本地 AI Agent 的一个观点。

## 有几个关于 DeepSeek Harness 的特点

DeepSeek Harness 真的有在做好一个工具，而不是一个成熟的商业体系……

### 工作模式

一共有4个工作模式：

![](https://pic.ivoinkwell.xyz/file/blog/specks/split-tasks-between-hermes-agent-and-deepseek-harness/split-tasks-between-hermes-agent-and-deepseek-harness.webp)

- **标准模式：** 这个模式也是比较常用的一个模式，日常使用即可
- **PTC模式：** 这个是一个批量执行统一规划的模式，在批量任务上会更节省 token 的消耗
- **最小模式：** 可以简单理解为就是一个 Pi Agent
- **创造模式：** 之前有一个朋友和我提过 AI 驱动的工作台，或许可以使用这个模式去试试

### Office Skill 集成

你能看出，这已经不是一个极客的玩具，而是权限完全交给你的生产力工具

![](https://pic.ivoinkwell.xyz/file/blog/specks/split-tasks-between-hermes-agent-and-deepseek-harness/split-tasks-between-hermes-agent-and-deepseek-harness-1.webp)

对于之前来说，DeepSeek Harness 都不能算是一个产品，而更像是一个自己拆装的玩具，但是自从最近桌面版本发布以来，Office 等生产力功能在逐渐的加上，我觉得对于我这样有洁癖但是不想自己手动配置的人来说应该是一个非常舒服的用法。
