# RabbitMQ

消息队列：也就是MQ(Message Queue)，是基础数据结构中“先进先出”的一种数据结构。一般用来解决应用解耦，异步消息，流量削锋等问题，实现高性能，高可用，可伸缩和最终一致性架构。

指把要传输的数据（消息）放在队列中，用队列机制来实现消息传递——生产者产生消息并把消息放入队列，然后由消费者去处理。消费者可以到指定队列拉取消息，或者订阅相应的队列，由MQ服务端给其推送消息。

常见的消息队列有:

- kafka
- RocketMQ

## 生产者和消费者

概念：

1、把数据放到消息队列叫做 生产者

2、从消息队列里边取数据叫做 消费者

## 为什么要使用消息队列

`解耦`：一个业务需要多个模块共同实现，或者一条消息有多个系统需要对应处理，只需要主业务完成以后，发送一条MQ，其余模块消费MQ消息，即可实现业务，降低模块之间的耦合。

`异步`：主业务执行结束后从属业务通过MQ，异步执行，减低业务的响应时间，提高用户体验。

`削峰`：高并发情况下，业务异步处理，提供高峰期业务处理能力，避免系统瘫痪。

## 缺点及问题

1、系统可用性降低。依赖服务也多，服务越容易挂掉。需要考虑MQ瘫痪的情况。

2、系统复杂性提高。需要考虑消息丢失、消息重复消费、消息传递的顺序性。

3、业务一致性。主业务和从属业务一致性的处理。

## 安装 RabbitMQ

使用 docker 安装

```sh
docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

- 15672 端口为前端管理页面,默认登陆用户名密码为 `guest`
- 5672 端口为程序连接默认端口

### 配置

启动成功后进入管理页面 http://localhost:15672 登录后，点击菜单上的 `admin` 跳转到用户管理页面，点击左下角的 `add user` 添加一个新用户。

点击表格中添加成功的新用户名称进入权限管理页面，为新用户设置权限及 `Virtual Host`

## SpringBoot 集成 RabbitMQ

实现邮件发送 demo

### 添加依赖

```xml
<!--    消息队列模块    -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
<!--    邮件发送模块    -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

### 配置连接信息

```yml
# application.yml
spring:
  mail:
    host: smtp.qq.com
    username: 1813967922@qq.com
    # 你的授权码，不是密码
    password: 你的授权码
  rabbitmq:
    # 默认连接端口为5672
    addresses: localhost
    username: admin
    password: admin
    virtual-host: /
```

### 配置 RabbitMQ

::: code-group

```java [RabbitConfiguration.java]
@Configuration
public class RabbitConfiguration {
    @Bean("mailQueue")
    public Queue queue(){
        return QueueBuilder
                .durable("mail")
                .build();
    }
}
```

```java [MailQueueListener.java]
/**
 * 消费者
 * 用于处理邮件发送的消息队列监听器
 * 监听到mail队列有新信息则会触发sendMailMessage方法
 */
@Component
@RabbitListener(queues = "mail")
public class MailQueueListener {

    @Resource
    JavaMailSender sender;

    @Value("${spring.mail.username}")
    String username;

    /**
     * 处理邮件发送
     * @param data 邮件信息
     */
    @RabbitHandler
    public void sendMailMessage(Map<String, Object> data) {
        String email = data.get("email").toString();
        Integer code = (Integer) data.get("code");
        SimpleMailMessage message = switch (data.get("type").toString()) {
            case "register" ->
                    createMessage("欢迎注册我们的网站",
                            "您的邮件注册验证码为: " + code + "，有效时间3分钟，为了保障您的账户安全，请勿向他人泄露验证码信息。",
                            email);
            case "reset" ->
                    createMessage("您的密码重置邮件",
                            "你好，您正在执行重置密码操作，验证码: " + code + "，有效时间3分钟，如非本人操作，请无视。",
                            email);
            default -> null;
        };
        if(message == null) return;
        sender.send(message);
    }

    /**
     * 快速封装简单邮件消息实体
     * @param title 标题
     * @param content 内容
     * @param email 收件人
     * @return 邮件实体
     */
    private SimpleMailMessage createMessage(String title, String content, String email){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject(title);
        message.setText(content);
        message.setTo(email);
        message.setFrom(username);
        return message;
    }
}
```

:::

### 测试

```java
@RestController
@RequestMapping("/test")
class Test {

    @Resource
    AmqpTemplate rabbitTemplate;

    @GetMapping("/ask-code")
    public String sendEmail(){

        Random random = new Random();
        int code = random.nextInt(899999) + 100000;

        Map<String, Object> data = Map.of("type","register","email", "1813967922@qq.com", "code", code);
        // 往消息队列里塞东西，生产者
        rabbitTemplate.convertAndSend("email", data);

        return "发送成功";

    }
}
```

接收到邮件则成功
