---
title: Windows账户与用户组
category: 系统基础笔记
published: 2026-03-21
image: ./cover.png
---
这个东西对于真正使用Windows的用户来说，可以说是必须掌握的，但是现在操作系统已经不像以前是一个工具，更多的转向娱乐与外观。现在系统的过渡动画，毛玻璃效果已经渐渐让我们遗忘其最初的作用。

## 账户

我会分为图形界面与命令界面的方式来写，Windows服务器有图形化界面的还是居多的。

### 命令行

**查看所有用户**

```shell
net user
```

**新建账户**

```shell
net user [username] [密码] /add
```

**删除用户**

```shell
net user [username] /del
```

**查看当前登录用户**

```shell
whoami
```

### 图形界面

**桌面此电脑右键**

![image-20260321144210497](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-accounts-and-groups/image-20260321144210497.webp)

**选择管理，弹出窗口**

![image-20260321144246464](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-accounts-and-groups/image-20260321144246464.webp)

**展开本地用户和组，点击用户**

![image-20260321144324796](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-accounts-and-groups/image-20260321144324796.webp)

**这里即可添加与删除用户**

## 用户组

用户组的用途相较于用户可能难以理解其存在的必要，我就用我家NAS进行举例。现在我有一个文件夹，我现在想要共享给家里面的家人看到，其他的人看不见，我不能今天爸爸注册可查看权限上加上爸爸，明天妈妈注册再加上妈妈。一个文件夹这样还算少的，如果10个，20个，你手动添加得累死，所以从其中找共同点——都是家人，那我专门建立一个用户组为家人，赋予其可以查看哪些文件夹的权限，再将爸爸，妈妈等人加入用户组，也就都可以看到。（ps：就算是权限继承性吧，其实本身也无关紧要）

### 命令行

**查看所有用户**组

```shell
net localgroup
```

**新建账户**

```shell
net localgroup [localgroup name] /add
```

**删除用户**

```shell
net user [localgroup name] /del
```

**添加用户进组**

```shell
net localgroup [localgroup name] [username] /add
```

**将用户从用户组移除**

```shell
net localgroup [localgroup name] [username] /del
```

### 图形化界面

**根据上面步骤进入管理，在本地用户和组的菜单中找到组文件夹**

![image-20260321145255009](https://pic.ivoinkwell.xyz/file/blog/system-basics/windows-accounts-and-groups/image-20260321145255009.webp)

**即可进行添加删除等操作**

