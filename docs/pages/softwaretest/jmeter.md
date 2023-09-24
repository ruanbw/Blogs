# Jmeter

Jmeter 是由 Apache 公司开发的一个纯 Java 的开源项目，即可以用于做接口测试也可以用于做性能测试。
Jmeter 具备高移植性，可以实现跨平台运行。
Jmeter 可以实现分布式负载。
Jmeter 采用多线程，允许通过多个线程并发取样或通过独立的线程对不同的功能同时取样。
Jmeter 具有较高扩展性。
Jmeter 官网https://jmeter.apache.org/download_jmeter.cgi

1、安装 Jmeter 前必须安装 JDK，必须 1.8 以上的版本。进入 Java 官网下载 Java8 的版本进行安装。Java 官网https://www.oracle.com/java/technologies/downloads/#java8-windows 安装 java 的过程请自行查阅相关操作指引。

2、安装 Jmeter，进入 Jmeter 官网下载 Jmeter 的安装包，下载完成后解压到指定目录即可。Jmeter 官网https://jmeter.apache.org/download_jmeter.cgi

3、启动 Jmeter，进入 Jmeter 的 bin 目录，双击 jmeter.bat 文件即可启动 Jmeter。

## 设置 Jmeter 语言为中文环境

1、临时设置 Jmeter 语言为中文环境

Jmeter 菜单栏选择 OptionsàChoose LanguageàChinese (Simplified)

这种方法，重启软件后又变为英文环境了。

2、永久设置 Jmeter 语言为中文环境

进入 apache-jmeter-5.2.1\bin 目录，找到“jmeter.properties”文件，在文件的第 37 行后添加“language=zh_CN”， 保存之后再打开 jmeter 就永久变为中文环境了
