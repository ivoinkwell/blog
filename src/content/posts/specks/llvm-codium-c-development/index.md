---
title: LLVM+VS Codium搭建C语言开发环境
category: 零碎随笔
published: 2026-03-15
image: ./cover.jpg
tags: ["软件", "开发笔记"]
---
## 经历

在很长一段时间，我使用的都是MiniGW的gcc作为编译器，使用Vs Code作为编辑器，安装插件C/C++之后对程序进行编译运行。但是时间长了我发现很多问题并不能像CLion那个样子标红以及语句的补全，而且体积也不小。CLion现在虽然现在非商业授权可以免费使用，但是体积我没有办法接受。Dev C++我实在不喜欢单文件的编辑模式。为了不继续使用大型的IDE，VS和CLion。我开始在GitHub上面寻找VS Code的替代品，希望能找到一个轻量一点的。

### VS Codium

偶然间，发现了VS   Codium，这是一个开源版本的VS Code，插件源都是开源的。虽然少了很多VS Code上面好多闭源的功能，但是换得了更小的体积和更自由的定制方案。

[![image-20250811181424324](https://pic.ivoinkwell.xyz/file/blog/specks/llvm-codium-c-development/image-20250811181424324.webp)](https://bgithub.xyz/VSCodium/vscodium/releases)

我最不喜欢的就是VS Code那每次启动都需要更新，所以我更愿意选择***[updates disable](https://bgithub.xyz/VSCodium/vscodium/releases/download/1.103.05312/VSCodium-x64-updates-disabled-1.103.05312.msi)***的版本

**插件源**

插件源`open-vsx.org`不是不能使用，而是很多的插件下载几乎就是龟速，所以有没有一种可能就是我能使用VS Code的插件源网址去下载呢？

于是我找到了这篇知乎文章：

***[设置vscodium采用微软官方扩展源](https://zhuanlan.zhihu.com/p/276000982)***

我这里只放上需要替换的部分(搜索替换即可)：

```json
"extensionsGallery": {
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "itemUrl": "https://marketplace.visualstudio.com/items"
}
```

### LLVM

因为CLion的安装文件太大，当时没忍住好奇打开目录看了看，看到了这个奇怪的名字，于是查了一下，发现还不简单。包含一个编译器clang和一个前端clangd，clangd是可以配合插件clangd一起使用可以实现CLion那样的报错显示效果。

**Windows直接安装使用LLVM**

在Github上面有LLVM的官方仓库，里面是有Windows版本的，但是会出现缺少C标准库的问题，尝试按照网上方法将gcc的目录复制进LLVM目录里面，但是依旧没有办法解决问题，所以直接使用***[llvm-mingw](https://bgithub.xyz/mstorsjo/llvm-mingw/releases)***中的内容，直接就可以使用clang编译执行和clangd的前端显示。

**添加路径**

解压出来里面的内容可能较多，但是和LLVM一样，直接添加bin文件的路径即可。

### VS Codium插件安装以及配置

这里需要两个插件，分别是`Code Runner`和`Clangd`

#### 配置

**Code Runner**

Code Runner编译C和C++的时候主要会出现两个问题在Windows上面，一个是默认使用gcc，另一个是编码格式会出问题，以至于终端的IO（输入输出）操作出现问题，所以要在`settings.json`文件中编写一下的配置，默认使用C使用clang编译运行，C++使用clang++运行，默认输出字符类型是utf-8:

```json
  "code-runner.executorMap": {
    "c": "cd $dir && clang $fileName -fexec-charset=UTF-8 -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "cpp": "cd $dir && clang++ $fileName -fexec-charset=UTF-8 -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "makefile": "cd $dir && make -s TARGET=$fileNameWithoutExt && ./$fileNameWithoutExt"
  },
  // 开发时推荐设置
  "code-runner.saveFileBeforeRun": true,  // 防止忘记保存
  "code-runner.runInTerminal": true,       // 支持交互
  "code-runner.clearPreviousOutput": false,// 终端模式下不影响
  
  // 调试输出时可选的临时设置
  // "code-runner.runInTerminal": false,  // 禁用终端
  // "code-runner.clearPreviousOutput": true  // 每次运行清理输出
```

### 调试

可以使用以下程序对其进行调试：

```c
#include <stdio.h>

int main(void){
    printf("Hello World!\n");
    printf("你好世界！\n");
    return 0;
}
```

```cpp
#include <iostream>
using namespace std;

int main(void){
    cout << "Hello World" << endl;
    cout << "你好世界！" << endl;
    return 0;
}
```

**运行结果：终端输出`Hello World！`和`你好世界！`**
