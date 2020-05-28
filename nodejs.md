### NODEJS 管理和配置淘宝镜像
```
    // 淘宝镜像
    https://npm.taobao.org/mirrors?spm=a2c6h.14029880.0.0.735975d7qm8JYv
    // nvm nodejs版本管理
    https://github.com/coreybutler/nvm-windows
    // nvm 修改镜像
    // 在安装目录中C:\Users\Administrator\AppData\Roaming\nvm找到里面的settings.txt,添加
    node_mirror: https://npm.taobao.org/mirrors/node/
    npm_mirror: https://npm.taobao.org/mirrors/npm/
    // nvm 使用
    nvm arch ：显示node是运行在32位还是64位。
    nvm install <version> [arch] ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
    nvm list [available] ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
    nvm on ：开启node.js版本管理。
    nvm off ：关闭node.js版本管理。
    nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
    nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
    nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
    nvm uninstall <version> ：卸载指定版本node。
    nvm use [version] [arch] ：使用制定版本node。可指定32/64位。
    nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
    nvm version ：显示nvm版本。version可简化为v。
```

#### npm

```

npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
```

#### yarn
```
yarn config set registry https://registry.npm.taobao.org -g
yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set  electron_builder_binaries_mirror http://npm.taobao.org/mirrors/electron-builder-binaries/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g
yarn config set sqlite3_binary_host_mirror https://foxgis.oss-cn-shanghai.aliyuncs.com/ -g
yarn config set profiler_binary_host_mirror https://npm.taobao.org/mirrors/node-inspector/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
```