---
title: Obsidian配置及插件
category: 零碎随笔
published: 2026-08-30
image: ./cover.jpg
tags: ["随笔", "博客搭建"]
---

Obsidian 现在已经成为我写博客，写文档，甚至是日常笔记的工具，之前一直不是非常喜欢 Obsidian 将一个文件夹作为一个仓库的管理方式，但是现在使用下来，我觉得对于我来说，这完全是一个不输 Typora 的，扩展性极强的 Markdown 文本编辑工具。

## Obsidian 设置

Obsidian 的设置很多地方设置好了还是非常好用的：

### 自动更新

很多人不喜欢软件动不动就自己下载，自己更新，喜欢稳定的就可以将其关闭

![obsidian-configuration-and-plugins](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins.webp)
   
### 图片粘贴

如果有喜欢我这样格式的也可以直接照抄我的，也可以自己去设置自己喜欢的图片存放位置

![obsidian-configuration-and-plugins-1](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-1.webp)

所以我的文章目录就是这样的

![obsidian-configuration-and-plugins-2](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-2.webp)

### 关闭一些不必要的插件

可能和我的个人洁癖有点关系，就像是我日常使用不到很多官方插件我喜欢关闭掉，这样也能还我一个干净，无干扰的写作界面

sync 这个插件主要的作用就是 Obsidian 的官方同步和界面右下脚的同步圆环，我觉得的放在我的界面中会影响我的专注程度，所以我选择将其关闭

![obsidian-configuration-and-plugins-3](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-3.webp)

### 字体

可能使用中文系统的看不出来，但是使用英文系统应该都知道 Windows 系统的文字回退是个抽象的东西，尤其是 Electron 框架的 App 出来中文那效果，动不动就是日文，所以想要一个好的显示效果可以指定一个比较舒服的字体，就像微软雅黑

![obsidian-configuration-and-plugins-4](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-4.webp)

### 窗口与界面

最近 Obsidian 有一个更新，将设置更换为了独立窗口标题，特别的丑，所以我选择回到原来的窗口界面

![obsidian-configuration-and-plugins-5](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-5.webp)

## Obsidian 插件

Obsidian 的插件能够帮助我们更快的达到自己想要达成的目的，类似于一个批量自动化的过程，所以我日常使用当中可能只有一个插件是比较适合我自己的，但是有一些插件确实能够方便使用的，但是不太适合我的场景，我也会将其写出来。

**当然，这里有一个前提，就是如果你是中国人，你需要 “会飞”**

### Paste image rename

这个插件是我在看二叉树树的视频的时候学到的，这个插件算是一个解决了我粘贴图片所带来的问题，毕竟截图什么的图片名字会千奇百怪，你根本没有办法知道哪个图片是哪个文章的，之前使用插件之前一直就是勉强将就，也就一直是是使用文件夹的方式去区分，使用这个插件之后不能说不用文件夹区分图片，但是看我的文章目录会更清楚，上传图床也会更方便，我用的插件设置就是这个插件默认的，我觉得很舒服，我其实并不是非常喜欢随机时间，随机日期这些混合在图片名字当中

![obsidian-configuration-and-plugins-6](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-6.webp)

### CF ImageBed

这个是我之前部署完图床之后心血来潮随便翻的时候找到的，这个插件确实是很方便，但是对于我来说非常的不适用，就是返回链接，我想要的不是直接将图片的图床链接粘在笔记上，因为我写博客的文件夹和博客的 Git 仓库从来不在一个地方，博客我放在 WSL 里面，而我的 Obsidian 的笔记仓库是一个和 NAS 连接的同步文件夹，所以这也注定笔记纯本地的这样一个形式，毕竟如果我哪天想在一个完全没有网络的地方写笔记和看笔记，直接裂图也不是一个非常舒服的解决方案。

想要能说出这个插件不适合我，我肯定是要研究一些这些设置的，所以我分享一下如果我使用，会使用什么设置

::github{repo="fantasy-ke/obsidian-cf-imgbed"}

#### 图片备份

我觉得是否上传图床都不影响这个，毕竟很多博客都是截图或者什么的，万一时间一过，可能你想去截图都没有什么机会了

![obsidian-configuration-and-plugins-7](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-7.webp)

#### 文件命名与上传路径

这个就看个人的习惯，我还是喜欢按照分类，文章名字等去细分，所以就使用的是这些占位符

![obsidian-configuration-and-plugins-8](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-8.webp)

#### 上传的优缺点

我喜欢上传使用压缩以及更改为 `.webp` 格式文件，毕竟别人就是将我的图片拖下来他们很难能够去分享使用，这个格式目前还只是适用在网页上较多，但是这个插件只能上传源文件格式。

## 设置文件位置

他插件安装都不是全局的，而是跟着仓库走的，位于仓库的 `.obsidian` 文件下，如果想要在 GitHub 同步，还是要在 `.gitignore` 文件中添加一下 `.obsidian` 目录，但是我是用来和 NAS 同步，我反而觉得很好，毕竟我很容易就要重装系统，我之前所说的设置，插件都不需要重新安装，会非常方便，但是飞牛同步上会默认不同步 `.` 开头的文件，所以这里的排除需要勾选上，但是我使用 Syncthing 同步就不需要去管，默认就完成同步了。

![obsidian-configuration-and-plugins-9](https://pic.ivoinkwell.xyz/file/blog/specks/obsidian-configuration-and-plugins/obsidian-configuration-and-plugins-9.webp)