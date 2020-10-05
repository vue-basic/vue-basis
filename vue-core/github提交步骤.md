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
