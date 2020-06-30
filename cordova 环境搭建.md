### cordova 环境配置

#### 安装 cordova
```
	// 全局安装cordova, 安装完成之后使用cordova -v 查看是否已经安装完成
	npm install -g cordova
``` 

#### 创建 cordova 程序
```
	// 使用'cordova create 文件夹名称'来创建cordova程序
	cordova create foldername
	
	// 生成完目录结构
	foldername
		|
		| -- hooks	
		|
		| -- platforms		// 使用平台
		|
		| -- plugins		// 插件目录
		| 
		| -- www			// 项目前端文件
		|
		| -- config.xml     // 项目配置文件
		|
		| -- package.json   // 项目依赖管理
```

#### 添加平台，添加完会在platforms目录中体现
```
	// 添加android
	cordova platform add android --save
	// 添加ios
	cordova platform add ios --save
	// 添加浏览器
	cordova platform add browser --save
```

#### 执行编译或预览
```
	// 查看已经安装平台
	cordova platform
	// 运行相应平台的代码
	cordova run < platform >
	// 在浏览器中使用，默认8000端口
	cordova run browser
```

#### android 环境配置（如果使用的是android studio则可跳过sdk环境配置）

* 先下载[SDK Manager](https://www.androiddevtools.cn/)  ,下载exe则傻瓜式下一步即可，如果下载的是[android-sdk_r24.4.1-windows.zip](https://dl.google.com/android/android-sdk_r24.4.1-windows.zip?utm_source=androiddevtools&utm_medium=website)则需要解压到选定目录，然后设置环境变量

* 右键 点击——【我的电脑】——【属性】——【高级系统设置】——【环境变量】

* 新建变量：变量名：ANDROID_SDK_HOME，变量值：你解压的sdk目录

* 在path里面添加：;%ANDROID_SDK_HOME%\platform-tools;%ANDROID_SDK_HOME%\tools 

* 测试是否配置成功：adb --version

##### 如果sdk manager 闪退则需要查看android-sdk-windows\tools\lib\find_java.bat中java路劲是否正确，或者查看android-sdk-windows\tools\android.bat中java路径是否正确

#### 调试android环境，可使用<code>cordova run android</code>来调试

#### 如果想打包则可以使用<code>cordova build android</code>来apk包，生成apk包路径在<code>platforms → android → app → build → outputs → apk → debug</code>






