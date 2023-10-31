// export { default as useArrToObj }from './useArrToObj'
import express from 'express';
import bodyParse from 'body-parser'
import session from 'express-session'

import app from '../../app.js';
import useArrToObj from './useArrToObj.js';
import useRouter from './useRouter.js';

const useMiddleware = () => {
  const dirname = app.get('path')
  app.use(useArrToObj);
  app.use(express.static(dirname + '/public'));
  // 使用中间件
  app.use(bodyParse.json()) // 支持 json 格式
  // 使用第三方插件 qs 来处理
  app.use(bodyParse.urlencoded({extended : true}))

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
  });
  
  app.use(session({
    // 给cookie中存储的sessionid加密的， 可以随意指定一个字符串
    secret: 'default_user',
    // 设置浏览器端cookie中的sessionId设置名字， 默认connect.sid
    name: 'sessionId',
    resave: false,
    // 在浏览器和服务器连接的第一时间，分配session  给浏览器指定一个cookie
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1, //1小时
    },
    rolling: true, //用户最后一次请求开始计算，重新刷新session的有效期，类似淘宝中午不吃饭一直刷，1小时不过期
  }))

  useRouter();
}

export { useArrToObj }

export default useMiddleware
