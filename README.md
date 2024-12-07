使用vue3 + ts + pinia 开发的uniapp框架下的vue3版本

## 网路请求框架
## 文件上传
## 数据持久化模版

# 使用的是 pinia 和 pinia-plugin-unistorage 框架
## 注意使用以用户user信息存储为例子进行说明，使用前需要 npm i pinia --save 和  npm i pinia-plugin-unistorage --save 安装包管理
## 主要代码及实现原理如下：
## ![](README_files/3.png)
 ##  在main.js 入口类文件中进行绑定
 ##  进行挂载数据如下
 ##  ![](README_files/2.png)
 ##  进行数据存储方法如下：
```javascript
// 样例参考如下
userStore.setUserInfo({
	name:'eee',
	phone:'10086'
}) // 存储个人信息
userStore.setToken('258825811') // 存储token 校验值
userStore.setisLogin(true) // 存储是否登录
// 登录之后 必须要进行这个conf 文件的配置，注意这这个地方
```
![](README_files/1.png)
## 获取数据持久化的如下：
 ![](README_files/4.png)
