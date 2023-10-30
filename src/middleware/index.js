// export { default as useArrToObj }from './useArrToObj'
import express from 'express';
import bodyParse from 'body-parser'
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

  useRouter();
}

export { useArrToObj }

export default useMiddleware
