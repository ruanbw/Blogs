# Nest JS

Nest（NestJS）是一个框架，用于构建高效，可扩展的Node.js服务器端应用程序。它使用渐进式JavaScript，使用TypeScript构建并完全支持TypeScript（但仍使开发人员能够使用纯JavaScript编码），并结合了OOP（面向对象编程），FP（函数式编程）和FRP（函数式响应式编程）的元素。

官方文档 https://nestjs.com/

中文文档 https://nest.coding-time.cn/

## Nest CLI

### 全局安装

```sh
npm install -g @nestjs/cli
```

### Nest CLI 有哪些功能

使用一下命令查看 Nest CLI 支持的功能

```sh
nest --help
```

### 创建项目

```sh
nest new project_name
```

- `nest`: Nest CLI 的全局命令
- `new`: Nest CLI 的全局命令中的新建项目
- `project_name`: 要创建的项目名

## 5 中 HTTP 数据传输方式

- text/plain;

- application/json;

- application/form-data;

- application/x-www-form-urlencoded;

- multipart/form-data;

## IOC 容器

## AOP 架构

## 如何调试 Nest

### 1、使用 `console.log` 进行调试

```javascript
import os from "os"
const homedir = os.homedir()
console.log(homedir)
```

缺点是只能看到某个变量值，不能看到代码的整个执行路线

### 2、使用 node 的调试模式运行

```sh
node --inspect-brk index.js
```

`--inspect` 是调试模式，而 `--inspect-brk` 还会在首行断住

它会起一个 ws 服务，然后我们用调试客户端连上它，比如`Chrome DevTools`。浏览器搜索栏中输入 [chrome://inspect/]() 就可以看到调试目标

### 3、使用 Nest CLI 自带的 Debug 功能

```sh
nest start --debug
```

## 使用多种 Provider 灵活注入对象

Provider 一般是用 @Injectable 修饰的 class

```javascript
import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
    getHello(){
        return "Hello world !"
    }
}
```

在 Module 的 providers 里声明

```javascript
import { Module } from "@nestjs/common"
import { AppService } from "./AppService"

@Module({
    imports:[],
    providers:[AppService]
})
export class AppService {}
```

## Nest 中的装饰器

`@Global`

`@Module`

`@Inject`

`@Get`

`@Post`

`@Put`

`@Delete`

`@Update`

`@Controller`

`@`

