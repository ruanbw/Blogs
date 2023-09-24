import{_ as s,o as e,c as a,X as p}from"./chunks/framework.6e839c56.js";const f=JSON.parse('{"title":"ffmpeg","description":"","frontmatter":{},"headers":[],"relativePath":"pages/web/ffmpeg.md","filePath":"pages/web/ffmpeg.md","lastUpdated":1695536770000}'),o={name:"pages/web/ffmpeg.md"},n=p('<h1 id="ffmpeg" tabindex="-1">ffmpeg <a class="header-anchor" href="#ffmpeg" aria-label="Permalink to &quot;ffmpeg&quot;">​</a></h1><p>FFmpeg 是一个开源的跨平台多媒体处理工具，可以用于处理音频、视频和多媒体流。它提供了一组强大的命令行工具和库，可以进行视频转码、视频剪辑、音频提取、音视频合并、流媒体传输等操作。 FFmpeg 的主要功能和特性：</p><ul><li><code>格式转换</code>：FFmpeg 可以将一个媒体文件从一种格式转换为另一种格式，支持几乎所有常见的音频和视频格式，包括 MP4、AVI、MKV、MOV、FLV、MP3、AAC 等。</li><li><code>视频处理</code>：FFmpeg 可以进行视频编码、解码、裁剪、旋转、缩放、调整帧率、添加水印等操作。你可以使用它来调整视频的分辨率、剪辑和拼接视频片段，以及对视频进行各种效果处理。</li><li><code>音频处理</code>：FFmpeg 可以进行音频编码、解码、剪辑、混音、音量调节等操作。你可以用它来提取音频轨道、剪辑和拼接音频片段，以及对音频进行降噪、均衡器等处理。</li><li><code>流媒体传输</code>：FFmpeg 支持将音视频流实时传输到网络上，可以用于实时流媒体服务、直播和视频会议等应用场景。</li><li><code>视频处理效率高</code>：FFmpeg 是一个高效的工具，针对处理大型视频文件和高分辨率视频进行了优化，可以在保持良好质量的同时提供较快的处理速度。</li><li><code>跨平台支持</code>：FFmpeg 可以在多个操作系统上运行，包括 Windows、MacOS、Linux 等，同时支持多种硬件加速技术，如 NVIDIA CUDA 和 Intel Quick Sync Video。</li></ul><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>FFmpeg 中文网 <a href="https://ffmpeg.p2hp.com/" target="_blank" rel="noreferrer">https://ffmpeg.p2hp.com/</a></p><p>安装包 <a href="https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-6.0-essentials_build.zip" target="_blank" rel="noreferrer">https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-6.0-essentials_build.zip</a></p><p>解压到指定路径，添加到环境变量 path 中即可（比如我的:<code>E:\\environment\\ffmpeg-6.0\\bin</code>）</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ffmpeg</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-version</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看版本、没有出现错误即可安装完成</p><h2 id="示例-demo" tabindex="-1">示例 Demo <a class="header-anchor" href="#示例-demo" aria-label="Permalink to &quot;示例 Demo&quot;">​</a></h2><h3 id="mp4-转换为-gif" tabindex="-1">MP4 转换为 gif <a class="header-anchor" href="#mp4-转换为-gif" aria-label="Permalink to &quot;MP4 转换为 gif&quot;">​</a></h3><p><code>-i</code> 表示输入</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ffmpeg</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">qq.mp4</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">test.gif</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="添加视频水印" tabindex="-1">添加视频水印 <a class="header-anchor" href="#添加视频水印" aria-label="Permalink to &quot;添加视频水印&quot;">​</a></h3><p><code>-vf</code> 就是 video filter</p><p><code>drawtext</code> 添加文字</p><p><code>fontsize</code> 大小</p><p><code>xy</code> 垂直水平方向</p><p><code>fontcolor</code> 颜色</p><p><code>text</code> 水印文案</p><p><code>全部小写!!!</code></p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ffmpeg</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">qq.mp4</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-vf</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">drawtext=text=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">:fontsize=</span><span style="color:#F78C6C;">30</span><span style="color:#C3E88D;">:fontcolor=white:x=</span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">:y=</span><span style="color:#F78C6C;">10</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">qq1.mp4</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="去掉水印" tabindex="-1">去掉水印 <a class="header-anchor" href="#去掉水印" aria-label="Permalink to &quot;去掉水印&quot;">​</a></h3><p><code>w h</code> 宽高 <code>xy</code> 垂直水平坐标 <code>delogo</code> 使用的过滤参数删除水印</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ffmpeg</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#BABED8;">  </span><span style="color:#C3E88D;">qq1.mp4</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-vf</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">delogo=w=</span><span style="color:#F78C6C;">120</span><span style="color:#C3E88D;">:h=</span><span style="color:#F78C6C;">30</span><span style="color:#C3E88D;">:x=</span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">:y=</span><span style="color:#F78C6C;">10</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">test.mp4</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="视频裁剪-控制大小" tabindex="-1">视频裁剪 + 控制大小 <a class="header-anchor" href="#视频裁剪-控制大小" aria-label="Permalink to &quot;视频裁剪 + 控制大小&quot;">​</a></h3><p><code>-ss</code> 起始时间 <code>-to</code> 结束事件</p><p><code>ss</code> 写在 <code>-i</code> 的前面可能会导致精度问题，因为视频还没解析就跳转到了相关位置，但是解析速度快</p><p><code>ss</code> 写在 <code>-i</code> 后面精度没问题，但是解析速度会变慢</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ffmpeg</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-ss</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">10</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-to</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">20</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">qq.mp4</span><span style="color:#BABED8;">  </span><span style="color:#C3E88D;">qq2.mp4</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="提取视频的音频" tabindex="-1">提取视频的音频 <a class="header-anchor" href="#提取视频的音频" aria-label="Permalink to &quot;提取视频的音频&quot;">​</a></h3><p>更改输出的格式即可</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ffmpeg</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">qq.mp4</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">qq3.mp3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>',33),l=[n];function t(c,r,i,d,m,h){return e(),a("div",null,l)}const u=s(o,[["render",t]]);export{f as __pageData,u as default};
