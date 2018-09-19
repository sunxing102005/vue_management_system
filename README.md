## 简介
&emsp;&emsp;这是一个小型的后台管理系统，分为前端项目vue-element-system，后端 vue-express-backstage
### vue-element-system
&emsp;&emsp;使用技术栈 vue 2.0，ElementUI，vuex,vue-router,axios,es6等。
实现了vue前端的权限管理，分为admin和editor两个账号。每个类型角色看到的左侧菜单栏不相同首页面也不同。权限的参考文档来自这里 [手摸手，带你用vue撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)。
这位博主的手摸手系列可以详细看看，讲的很清楚。
### vue-express-backstage
这是上一个系统的后台，使用express+mysql数据库。实现了身份验证（jsonwebtoken），事务管理，文件上传下载（multer）等功能。
## 在线演示
Preview [项目预览](http://stan.s1.natapp.cc)。
## build setup 
``` bash
## download porject 
git clone 
## start vue-element-system
cd vue-element-system 
npm install
npm run dev
## start vue-express-backstage
cd vue-express-backstage
npm install
npm run start

```
