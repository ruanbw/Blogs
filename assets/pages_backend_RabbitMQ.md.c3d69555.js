import{_ as s,o as a,c as n,X as l}from"./chunks/framework.6e839c56.js";const B=JSON.parse('{"title":"RabbitMQ","description":"","frontmatter":{},"headers":[],"relativePath":"pages/backend/RabbitMQ.md","filePath":"pages/backend/RabbitMQ.md","lastUpdated":1694348019000}'),p={name:"pages/backend/RabbitMQ.md"},o=l(`<h1 id="rabbitmq" tabindex="-1">RabbitMQ <a class="header-anchor" href="#rabbitmq" aria-label="Permalink to &quot;RabbitMQ&quot;">​</a></h1><p>消息队列：也就是MQ(Message Queue)，是基础数据结构中“先进先出”的一种数据结构。一般用来解决应用解耦，异步消息，流量削锋等问题，实现高性能，高可用，可伸缩和最终一致性架构。</p><p>指把要传输的数据（消息）放在队列中，用队列机制来实现消息传递——生产者产生消息并把消息放入队列，然后由消费者去处理。消费者可以到指定队列拉取消息，或者订阅相应的队列，由MQ服务端给其推送消息。</p><p>常见的消息队列有:</p><ul><li>kafka</li><li>RocketMQ</li></ul><h2 id="生产者和消费者" tabindex="-1">生产者和消费者 <a class="header-anchor" href="#生产者和消费者" aria-label="Permalink to &quot;生产者和消费者&quot;">​</a></h2><p>概念：</p><p>1、把数据放到消息队列叫做 生产者</p><p>2、从消息队列里边取数据叫做 消费者</p><h2 id="为什么要使用消息队列" tabindex="-1">为什么要使用消息队列 <a class="header-anchor" href="#为什么要使用消息队列" aria-label="Permalink to &quot;为什么要使用消息队列&quot;">​</a></h2><p><code>解耦</code>：一个业务需要多个模块共同实现，或者一条消息有多个系统需要对应处理，只需要主业务完成以后，发送一条MQ，其余模块消费MQ消息，即可实现业务，降低模块之间的耦合。</p><p><code>异步</code>：主业务执行结束后从属业务通过MQ，异步执行，减低业务的响应时间，提高用户体验。</p><p><code>削峰</code>：高并发情况下，业务异步处理，提供高峰期业务处理能力，避免系统瘫痪。</p><h2 id="缺点及问题" tabindex="-1">缺点及问题 <a class="header-anchor" href="#缺点及问题" aria-label="Permalink to &quot;缺点及问题&quot;">​</a></h2><p>1、系统可用性降低。依赖服务也多，服务越容易挂掉。需要考虑MQ瘫痪的情况。</p><p>2、系统复杂性提高。需要考虑消息丢失、消息重复消费、消息传递的顺序性。</p><p>3、业务一致性。主业务和从属业务一致性的处理。</p><h2 id="安装-rabbitmq" tabindex="-1">安装 RabbitMQ <a class="header-anchor" href="#安装-rabbitmq" aria-label="Permalink to &quot;安装 RabbitMQ&quot;">​</a></h2><p>使用 docker 安装</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">run</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--hostname</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">my-rabbit</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">rabbitmq</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">5672</span><span style="color:#C3E88D;">:5672</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">15672</span><span style="color:#C3E88D;">:15672</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">rabbitmq:3-management</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>15672 端口为前端管理页面,默认登陆用户名密码为 <code>guest</code></li><li>5672 端口为程序连接默认端口</li></ul><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h3><p>启动成功后进入管理页面 <a href="http://localhost:15672" target="_blank" rel="noreferrer">http://localhost:15672</a> 登录后，点击菜单上的 <code>admin</code> 跳转到用户管理页面，点击左下角的 <code>add user</code> 添加一个新用户。</p><p>点击表格中添加成功的新用户名称进入权限管理页面，为新用户设置权限及 <code>Virtual Host</code></p><h2 id="springboot-集成-rabbitmq" tabindex="-1">SpringBoot 集成 RabbitMQ <a class="header-anchor" href="#springboot-集成-rabbitmq" aria-label="Permalink to &quot;SpringBoot 集成 RabbitMQ&quot;">​</a></h2><p>实现邮件发送 demo</p><h3 id="添加依赖" tabindex="-1">添加依赖 <a class="header-anchor" href="#添加依赖" aria-label="Permalink to &quot;添加依赖&quot;">​</a></h3><div class="language-xml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--    消息队列模块    --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">spring-boot-starter-amqp</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!--    邮件发送模块    --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">spring-boot-starter-mail</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="配置连接信息" tabindex="-1">配置连接信息 <a class="header-anchor" href="#配置连接信息" aria-label="Permalink to &quot;配置连接信息&quot;">​</a></h3><div class="language-yml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># application.yml</span></span>
<span class="line"><span style="color:#F07178;">spring</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">mail</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">host</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">smtp.qq.com</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">username</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">1813967922@qq.com</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 你的授权码，不是密码</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">password</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">你的授权码</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">rabbitmq</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 默认连接端口为5672</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">addresses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">localhost</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">username</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">admin</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">password</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">admin</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">virtual-host</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="配置-rabbitmq" tabindex="-1">配置 RabbitMQ <a class="header-anchor" href="#配置-rabbitmq" aria-label="Permalink to &quot;配置 RabbitMQ&quot;">​</a></h3><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-MTvQZ" id="tab-HI0OzSY" checked="checked"><label for="tab-HI0OzSY">RabbitConfiguration.java</label><input type="radio" name="group-MTvQZ" id="tab-Jll6-q4"><label for="tab-Jll6-q4">MailQueueListener.java</label></div><div class="blocks"><div class="language-java active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Configuration</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">RabbitConfiguration</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Bean</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mailQueue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">public</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">Queue</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">queue</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">QueueBuilder</span></span>
<span class="line"><span style="color:#BABED8;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">durable</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mail</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#BABED8;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-java line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 消费者</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 用于处理邮件发送的消息队列监听器</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 监听到mail队列有新信息则会触发sendMailMessage方法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Component</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RabbitListener</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">queues</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mail</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">MailQueueListener</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Resource</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">JavaMailSender</span><span style="color:#BABED8;"> sender</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Value</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${spring.mail.username}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">String</span><span style="color:#BABED8;"> username</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    /**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 处理邮件发送</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * </span><span style="color:#F78C6C;font-style:italic;">@param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">data</span><span style="color:#676E95;font-style:italic;"> 邮件信息</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RabbitHandler</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">public</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">void</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">sendMailMessage</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">Map</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">String</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">Object</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#C792EA;">String</span><span style="color:#BABED8;"> email </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">email</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">toString</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#C792EA;">Integer</span><span style="color:#BABED8;"> code </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">Integer</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">code</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#C792EA;">SimpleMailMessage</span><span style="color:#BABED8;"> message </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">switch</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">toString</span><span style="color:#89DDFF;">())</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">register</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">-&gt;</span></span>
<span class="line"><span style="color:#BABED8;">                    </span><span style="color:#82AAFF;">createMessage</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">欢迎注册我们的网站</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">                            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">您的邮件注册验证码为: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> code </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">，有效时间3分钟，为了保障您的账户安全，请勿向他人泄露验证码信息。</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">                            email</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">reset</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">-&gt;</span></span>
<span class="line"><span style="color:#BABED8;">                    </span><span style="color:#82AAFF;">createMessage</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">您的密码重置邮件</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">                            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">你好，您正在执行重置密码操作，验证码: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> code </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">，有效时间3分钟，如非本人操作，请无视。</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">                            email</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">-&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">message </span><span style="color:#89DDFF;">==</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">null)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">        sender</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">message</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    /**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * 快速封装简单邮件消息实体</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * </span><span style="color:#F78C6C;font-style:italic;">@param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">title</span><span style="color:#676E95;font-style:italic;"> 标题</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * </span><span style="color:#F78C6C;font-style:italic;">@param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">content</span><span style="color:#676E95;font-style:italic;"> 内容</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * </span><span style="color:#F78C6C;font-style:italic;">@param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">email</span><span style="color:#676E95;font-style:italic;"> 收件人</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * </span><span style="color:#F78C6C;font-style:italic;">@return</span><span style="color:#676E95;font-style:italic;"> 邮件实体</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">SimpleMailMessage</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">createMessage</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">String</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">title</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">String</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">content</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">String</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">email</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#C792EA;">SimpleMailMessage</span><span style="color:#BABED8;"> message </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">SimpleMailMessage</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#BABED8;">        message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setSubject</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">title</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">        message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setText</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">content</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">        message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setTo</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">email</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">        message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setFrom</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;">username</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#BABED8;"> message</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div></div></div><h3 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h3><div class="language-java line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RestController</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RequestMapping</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Test</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Resource</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">AmqpTemplate</span><span style="color:#BABED8;"> rabbitTemplate</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">GetMapping</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/ask-code</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#C792EA;">public</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">String</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">sendEmail</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#C792EA;">Random</span><span style="color:#BABED8;"> random </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Random</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#C792EA;">int</span><span style="color:#BABED8;"> code </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> random</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">nextInt</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">899999</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">100000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#C792EA;">Map</span><span style="color:#89DDFF;">&lt;</span><span style="color:#C792EA;">String</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">Object</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> Map</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">of</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">register</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">email</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">1813967922@qq.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">code</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> code</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 往消息队列里塞东西，生产者</span></span>
<span class="line"><span style="color:#BABED8;">        rabbitTemplate</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">convertAndSend</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">email</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> data</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">发送成功</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>接收到邮件则成功</p>`,35),e=[o];function t(r,c,D,y,i,F){return a(),n("div",null,e)}const E=s(p,[["render",t]]);export{B as __pageData,E as default};