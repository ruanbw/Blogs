# Nginx

## 安装

```docker
docker run --name nginx -v /etc/nginx/nginx.conf D:/docker_container_data/nginx -p 80:80 -d nginx:1.22.0
```
- `--name` 指定运行的容器名为nginx
- `-v` 挂载 nginx.conf 配置文件到宿主机方便配置
- `-p` 指定端口映射
- `-d` 后台运行

## 配置文件

| 配置块      | 功能描述                                               |
| ----------- | ------------------------------------------------------ |
| 全局块      | 与 nginx 运行相关的全局配置                            |
| events 块   | 与网络连接有关的设置                                   |
| http 块     | 代理、缓存、日志、虚拟主机等的配置                     |
| server 块   | 虚拟主机的参数设置（一个 http 块可包含多个 server 块） |
| location 块 | 定义请求路由及页面处理方式                             |

### 配置文件示例

::: details 点击展开示例

```nginx
# 全局段配置
# ------------------------------

# 指定运行nginx的用户或用户组，默认为nobody。
#user administrator administrators;

# 设置工作进程数，通常设置为等于CPU核心数。
#worker_processes 2;

# 指定nginx进程的PID文件存放位置。
#pid /nginx/pid/nginx.pid;

# 指定错误日志的存放路径和日志级别。
error_log log/error.log debug;

# events段配置信息
# ------------------------------
events {
    # 设置网络连接序列化，用于防止多个进程同时接受到新连接的情况，这种情况称为"惊群"。
    accept_mutex on;

    # 设置一个进程是否可以同时接受多个新连接。
    multi_accept on;

    # 设置工作进程的最大连接数。
    worker_connections  1024;
}

# http配置段，用于配置HTTP服务器的参数。
# ------------------------------
http {
    # 包含文件扩展名与MIME类型的映射。
    include       mime.types;

    # 设置默认的MIME类型。
    default_type  application/octet-stream;

    # 定义日志格式。
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for';

    # 指定访问日志的存放路径和使用的格式。
    access_log log/access.log myFormat;

    # 允许使用sendfile方式传输文件。
    sendfile on;

    # 限制每次调用sendfile传输的数据量。
    sendfile_max_chunk 100k;

    # 设置连接的保持时间。
    keepalive_timeout 65;

    # 定义一个上游服务器组。
    upstream mysvr {
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #此服务器为备份服务器。
    }

    # 定义错误页面的重定向地址。
    error_page 404 https://www.baidu.com;

    # 定义一个虚拟主机。
    server {
        # 设置单个连接上的最大请求次数。
        keepalive_requests 120;

        # 设置监听的端口和地址。
        listen       4545;
        server_name  127.0.0.1;

        # 定义location块，用于匹配特定的请求URI。
        location  ~*^.+$ {
           # 设置请求的根目录。
           #root path;

           # 设置默认页面。
           #index vv.txt;

           # 将请求转发到上游服务器组。
           proxy_pass  http://mysvr;

           # 定义访问控制规则。
           deny 127.0.0.1;
           allow 172.18.5.54;
        }
    }
}
```

:::

## location 路径映射详解

### 格式:

```txt
location [ = | ~ | ~* | !~ | !~* | ^~ | @ ] uri {...}
```

### 解释:

- `=`：精确匹配。如果匹配成功，立即停止搜索并处理此请求。
- `~`：执行正则匹配，区分大小写。
- `~*`：执行正则匹配，不区分大小写。
- `!~`：正则匹配，区分大小写不匹配。
- `!~*`：正则匹配，不区分大小写不匹配。
- `^~`：前缀匹配。如果匹配成功，不再匹配其他 location，且不查询正则表达式。
- `@`：指定命名的 location，主要用于内部重定向请求，如 error_page 和 try_files。
- `uri`：待匹配的请求字符串。可以是普通字符串或包含正则表达式。

## 优先级及示例

优先级顺序：无特定标识 < ^~ < = < 正则匹配 (~, ~_, !~, !~_)

### 示例：

::: details 点击展开示例

```nginx
location = / {
    # 精确匹配 /，主机名后面不能带任何字符串
    # http://abc.com [匹配成功]
    # http://abc.com/index [匹配失败]
}

location ^~ /img/ {
    # 以 /img/ 开头的请求，都会匹配上
    # http://abc.com/img/a.jpg [匹配成功]
    # http://abc.com/img/b.mp4 [匹配成功]
}

location ~* /Example/ {
    # 忽略 uri 部分的大小写
    # http://abc.com/test/Example/ [匹配成功]
    # http://abc.com/example/ [匹配成功]
}

location /documents {
    # 如果有正则表达式可以匹配，则优先匹配正则表达式
    # http://abc.com/documentsabc [匹配成功]
}

location / {
    # http://abc.com/abc [匹配成功]
}

location = / {
    # 精确匹配 / ，并停止搜索其他 location。
    return 200 "hello, nginx1";
}

location / {
    # 匹配任何以 / 开头的地址，并停止搜索其他 location。
    return 200 "hello, nginx2";
}

location ^~ /images/ {
    # 匹配任何以 /images/ 开头的地址，并停止搜索其他 location。
    return 200 "hello, nginx3";
}

location ~* \.(gif|jpg|jpeg)$ {
    # 匹配任何以 gif、jpg 或 jpeg 结尾的地址，并停止搜索其他 location。
    return 200 "hello, nginx4";
}

location /images/ {
    # 匹配任何以 /images/ 开头的地址，并停止搜索其他 location。
    return 200 "hello, nginx5";
}

location = /images/ {
    # 精确匹配 /images/，并停止搜索其他 location。
    return 200 "hello, nginx6";
}
```

:::

## 反向代理

反向代理是 Nginx 的核心功能之一，允许 Nginx 将来自客户端的请求转发到后端服务器，并将后端服务器的响应返回给客户端，使客户端感觉就像是直接与 Nginx 通信一样。

### 基本配置

要配置 Nginx 作为反向代理，您需要使用 location 块中的 proxy_pass 指令：

- `proxy_pass`：定义后端服务器的地址。
- `proxy_set_header`：修改从客户端传递到代理服务器的请求头。
- `proxy_hide_header`：隐藏从代理服务器返回的响应头。
- `proxy_redirect`：修改从代理服务器返回的响应头中的 Location 和 Refresh 头字段。

### 示例配置

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

在此配置中，所有发送到 example.com 的请求都会被代理到 localhost:8080。

### 注意事项

- 当使用 `proxy_pass` 指令时，确保后端服务器是可用的，否则 Nginx 将返回错误。
- 使用 `proxy_set_header` 确保后端服务器接收到正确的请求头。
- 如果后端服务器和 Nginx 在不同的机器上，确保网络连接是稳定的。

反向代理不仅可以提高网站的性能和可靠性，还可以用于负载均衡、缓存静态内容、维护和安全等多种用途。

......

https://juejin.cn/post/7267003603095879714#heading-3
