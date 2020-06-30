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

```
	注：如果sdk manager 闪退则需要查看android-sdk-windows\tools\lib\find_java.bat中java路劲是否正确，或者查看android-sdk-windows\tools\android.bat中java路径是否正确
```

#### 调试android环境，可使用<code>cordova run android</code>来调试

#### 如果想打包则可以使用<code>cordova build android</code>来apk包，生成apk包路径在<code>platforms → android → app → build → outputs → apk → debug</code>

#### APK签名: APK都必须经过数字签名后才能安装到设备上，签名需要对应的证书（keystore）
```
	// 生成签名文件(keytool，jarsigner命令是java自带的如果没有配置环境变量则需要进入jdk->bin文件夹)
	keytool -genkey -v -keystore D:\mytest.keystore -alias mytest -keyalg RSA -validity 20000
	
	/**
	* -keystore D:/mytest.keystore表示生成的证书及其存放路径，如果直接写文件名则默认生成在用户当前目录下；
　　* -alias mytest 表示证书的别名是mytest,不写这一项的话证书名字默认是mykey；
　　* -keyalg RSA 表示采用的RSA算法；
　　* -validity 20000表示证书的有效期是20000天。
	*
	*
	* 根据指令输入密钥库口令，是不可见的。依次输入下面的问题。最后到【否】那里时输入y
	* 再输入密钥口令（可以与密钥库口令相同），如果相同，直接回车，记住这两个口令，后面签名会使用到。
	* 这时便会生成一个文件mytest.keystore，就是我们需要的签名文件。
	*/
```

* 手动加签
```
	// 首先执行命令
	cordova build android --release
	// 就会生成一个app-release-unsigned.apk。把数字签名放到生成的未签名的apk所在的目录下，输入以下命令：
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mytest.keystore app-release-unsigned.apk mytest
	// 这时的apk就会是一个已经签名的apk了，修改一下名字即可直接放到设备上安装。
```

* 自动加签
```
	// 在项目根目录创建build.json
	{
　　	”android”: {
	　　　　”release”: {
	　　　　　　”keystore”: “mytest.keystore”, // 签名位置
	　　　　　　”alias”: “mytest”,			   // 别名
 	　　　　　　”storePassword”: “testing”,	   // 密码
	　　　　　　”password”: “testing2”		   // 密码
	　　　　}　　
	　　}
　　}
	// 创建完后直接编译apk包则可以自动加签
	cordova build –release
	// 注意：cordova build后面没有android
```


##### 如果编译android出现一下错误,解决方案
```
Failed to install the following Android SDK packages as some licences have not been accepted.
     platforms;android-28 Android SDK Platform 28
  To build this project, accept the SDK license agreements and install the missing components using the Android Studio SDK Manager.
  Alternatively, to transfer the license agreements from one workstation to another, see http://d.android.com/r/studio-ui/export-licenses.html
```

1. 进入<code>android-sdk-widnow/tools/bin</code>
2. 执行命令<code>./sdkmanager --update</code>，执行过程需要多次确认
3. 这时可以尝试是否能够正常构建项目，有可能遇到下面提示的问题（或是其中的一个提示）
```
	Warning: License for package Android SDK Build-Tools 27.0.3 not accepted.
	Warning: License for package Android SDK Platform 28 not accepted.

	// 应该是本地下载的版本和配置的没有对应上，只需要通过 sdkmanager 下载项目配置的版本即可。
    // 例如（具体请了解 sdkmanager 命令的使用）：
	// 同时安装多个包
	sdkmanager "platform-tools" "build-tools;28.0.3" "platforms;android-28"
```


