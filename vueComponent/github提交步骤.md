## 1.git init
```
在代码所在的文件夹里打开gitbash,
输入命令git init,
文件夹里会多一个git文件（这个是隐藏文件，查看需要勾选查看隐藏文件）
```

## 2.第一次上传的话，有这几步

### 1.git commit -m "first commit"

### 2.git remote add origin https://github.com/vue-basic/vue--.git

### 3.git push -u origin master

## 3.之后上传的话,有这几步

### 1.git add -A
### 2.git commit -m
### 3.git push -u origin master

## 4.如果报错
```
$ git push -u origin master
error: src refspec master does not match any
error: failed to push some refs to 'https://github.com/vue-basic/vue-basis.git'

这是因为你的本地没有readme.md文档,使用以下代码合并：
git pull --rebase origin master

```

## 5.要是rebase出错，解决办法如下：
执行git stash暂时保存修改，rebase后，执行git stash pop

## 6. Everything up-to-date

```
在github上git clone一个项目，在里面创建一个目录，然后git push的时候，出现报错"Everything up-to-date"

原因：
1）没有git add .
2）没有git commit -m "提交信息"
如果上面两个步骤都成功执行，还出现这个错误是因为创建的目录下是空的，目录下必须有文件才能git push上传成功。

在github上创建文件的时候，在新文件名后加/符号就是文件夹，但是这种方式只支持英文名目录，中文名目录不支持。
```

## git的六大步
* 1.创建本地库
    (1) git init  --- .git 本地库就有了


* 2.创建远程库
    (2) github New repository

* 3.让本地库和远程库建立连接
    (3) git remote add origin 地址  --- 在本地记录远程的地址

* 4.本地修改提交远程
    git add -A
    git commit -m "first commit"
    git push -u origin master  --- 推到那个地址的master分支
    git push

* 5.远程修改拉取到本地
    git pull origin master
    git pull

* 公司来新员工 远程已经有代码 直接本地克隆
    git clone 仓库地址
