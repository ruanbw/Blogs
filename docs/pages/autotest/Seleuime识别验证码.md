# Seleuime识别验证码

使用Selenium进行自动化测试时，遇到表单需要输入验证码时的解决方法

## 软件版本
python版本为3.11.0、pip版本为23.0.1

1. selenium==3.141.0
2. pytesseract==0.3.10
3. Pillow==9.5.0
4. tesseract-ocr-w64-setup-v5.3.0.20221214
5. tesseract-ocr[下载地址](https://digi.bib.uni-mannheim.de/tesseract/)与[官方网站](https://tesseract-ocr.github.io/)

::: tip 提示
1. Tesseract-OCR安装好后需要添加系统环境变量,在系统环境变量Path中添加变量名TESSDATA_PREFIX值为tesseract-ocr安装位置
2. 进入到python的安装目录下的\Lib\site-packages\pytesseract文件夹中，找到pytesseract.py文件，修改其中tesseract_cmd = tesseract改为tesseract_cmd = tesseract-ocr安装位置。 
:::

## 测试网站
http://nnxy.iflysse.com/Login_nnxy.aspx

## 测试目的
处理登陆时的验证码图片，自动识别图片中的验证码并填入输入框中，实现自动化登陆

## 完整代码
```python
'''
博思学习平台
'''
from PIL import Image
from selenium import webdriver
import pytesseract as ts
import time
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

# 全屏
driver.maximize_window()

# 科大讯飞教育，南宁学院二级平台
driver.get("http://nnxy.iflysse.com/Login_nnxy.aspx")

# 切换账号密码登录
driver.find_element(By.XPATH, "/html/body/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]").click()

# 获取账号输入框
driver.find_element(By.ID, "lo-account").send_keys("20200219108")

# 获取密码输入框
driver.find_element(By.ID, "lo-psw").send_keys("rbw20010203")

# 识别图片验证码
def getCode():
    # 获取验证码
    global code1
    img = driver.find_element(By.ID, "imgCode")
    # 获得验证码img标签的位置
    x = img.location["x"] + 8
    y = img.location["y"] + 8
    # 获得验证码img标签的宽高
    y1 = img.size["height"]
    x1 = img.size["width"]
    # 计算验证码img标签的面积
    right = (x + x1) - 8
    left = (y + y1) - 8
    # 截图整个网页保存为图片
    driver.save_screenshot("1.png")
    # 加载整个网页的截图定位到验证码标签并截取图片
    image = Image.open("1.png")
    image2 = image.crop((x, y, right, left))
    # 保存截取的验证码图片
    image2.save("2.png")
    # ocr图片转文字获取验证码图片中的内容
    code = ts.image_to_string("2.png")

    if "=" in code:
        var = code.split("=")[0]
        code = eval(var)

    print(f"验证码:", code)
    return code


# 获取验证码输入框，写入识别出来的验证码
driver.find_element(By.ID, "lo-code").send_keys(getCode())

# 登录按钮
driver.find_element(By.ID, "login").click()

time.sleep(1)
# 点击学习任务
driver.find_element(By.XPATH, "/html/body/div[1]/div[1]/div[1]/div/div[1]/div[2]/div/div[2]/ul/li[2]/a/div/img").click()
# 点击《全部》导航栏
driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/div/div[2]/div/div[1]/button[1]/span").click()
time.sleep(1)
# 点击去完成第四次作业(如果《第四次作业》显示的不是第一个则会定位错误)
driver.find_element(By.XPATH,
                    "/html/body/div/div[1]/div[1]/div/div[2]/div/div[3]/div[3]/table/tbody/tr[1]/td[6]/div/button").click()
time.sleep(1)
# 点击上传我的作业
driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/div/div[1]/div[2]/div[2]/div[3]/div[2]/div/button").click()
# 勾选本人承诺
driver.find_element(By.XPATH,
                    "/html/body/div[1]/div[1]/div[1]/div/div[1]/div[2]/div[2]/div[3]/div[4]/div/div[2]/div/div["
                    "2]/label/span[1]/span").click()
# 上传视频文件
driver.find_element(By.NAME, "file").send_keys('E:\Desktop\阮炳文.mp4')
time.sleep(1)
# 点击提交
driver.find_element(By.XPATH,
                    "/html/body/div[1]/div[1]/div[1]/div/div[1]/div[2]/div[2]/div[3]/div[4]/div/div[2]/div/div["
                    "2]/button[2]").click()


```