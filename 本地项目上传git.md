### 本地文件上传git

```
    必须现在本地安装git
```

#### 1、如果本地没有创建sshkey则先创建一个sshkey
```
    1）打开git bash here
    2）cd ~/.ssh 
    3）ssh-keygen -t rsa -C "xxx@qq.com"
    4）在github找到settings->ssh adn GPG keys，新建一个ssh key
    5）在c:/user/用户名/.ssh找到id_rsa.pub打开复制里面的内容到刚刚新建的ssh key里面
```

#### 2、初始化git：
```
    git init
```
#### 3、添加仓库：
```    
    git remote add origin https://github.com/XXXXXX.git(仓库地址)
```

#### 4、拉取仓库内容：
```    
    git pull origin master
```

#### 5、添加文件到本地git：
```    
    // 添加全部
    git add . 
    // 一个个添加
    git add filename
```

#### 6、提交到本地git：
```
    git commit -m "提交备注"
```

#### 7、推送到远程git：
```
    git push -u origin master
    // 如果推送失败可添加-f参数强制提交，但是这样会把git上面的文件全部删除再提交
```