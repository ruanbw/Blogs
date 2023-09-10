# Flutter

## 安装 Flutter

1、下载 Flutter SDK

[flutter_windows_3.13.2-stable](https://storage、flutter-io、cn/flutter_infra_release/releases/stable/windows/flutter_windows_3、13、2-stable、zip)

下载完成解压到合适的目录中

2、 配置环境变量

先在系统环境变量中添加 `FLUTTER_HOME` 值为 `Flutter SDK` 的安装路径

然后在系统环境变量的 `Path` 中添加 `%FLUTTER_HOME%\bin`

3、 运行 flutter doctor 检查环境

这时会提示少了 Android Studio、Android SDK、Java、Android licenses、Visual Studio、Chrome 等环境

如果你不需要开发桌面应用，可以忽略 Visual Studio

4、 安装 Android Studio

Android Studio Giraffe | 2022.3.1 Patch 1

下载地址：https://redirector.gvt1.com/edgedl/android/studio/install/2022.3.1.19/android-studio-2022.3.1.19-windows.exe

5、 安装 Flutter 插件

打开 `Android Studio` 在新建项目页面点击 `Plugins` -> 搜索 Flutter -> 安装 Flutter 插件

6、 安装 Android SDK

打开 `Android Studio` 新建一个Flutter项目后点击页面上的菜单栏 `Tools` -> `SDK Manager` -> 在弹出的页面中点击 `SDK Tools` -> 选中 Android SDK Build-Tools 34 -> 选中Android SDK Platform-Tools -> 点击 OK 等待安装完成即可

7、 运行 flutter doctor --android-licenses 接受 Android SDK 许可证

```sh
flutter doctor --android-licenses
```

8、 配置 Android SDK 环境变量

9、 安装 JDK 17

这里安装的是 JDK 17，Flutter 官方推荐的是 JDK 11 以上，自行选择即可

下载地址：https://www.oracle.com/java/technologies/javase-downloads

JDK 安装完成后，配置环境变量，这里自行百度，只要能运行 `java --version` 就行


