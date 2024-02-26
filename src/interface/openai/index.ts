import express from 'express';
import { getMessage, getMessageArticle, getMessageTragic } from './utils';
import { chatForImg, chatForMsg, chatForMsg4 } from '@/OpenAI';
import { Readable } from 'stream';
import expressWs from 'express-ws';
const router = express.Router();
const routerws = expressWs(router);
console.log(routerws);

routerws.app.ws('/setmessage/ws', (req, res) => {
  console.log('connect success');
  console.log(req);
  req.on('open', function(e) {
    req.send('start');
  });
  // 使用 ws 的 send 方法向连接另一端的客户端发送数据
  req.send('data:connect to express server with WebSocket success\n\n');

  // 使用 on 方法监听事件
  //   message 事件表示从另一段（服务端）传入的数据
  req.on('message', function(msg) {
    console.log(`receive message ${msg}`);
    req.send('default response');
  });

  // 设置定时发送消息
  let timer = setInterval(() => {
    req.send(`interval message ${new Date()}`);
  }, 2000);

  // close 事件表示客户端断开连接时执行的回调函数
  req.on('close', function(e) {
    console.log('close connection');
    clearInterval(timer);
    timer = undefined;
  });
});

// router.use('/setmessage/v4', (req, res, next) => {
//   res.setHeader('Content-type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   const createMessage = getMessageArticle(req.body);
//   const values = chatForMsg4(createMessage as any);
//   values.then(async(data) => {
//     // next();
//     // 最后，全部完成
//     const decoder = new TextDecoder('utf-8');
//     const stream = data.toReadableStream();
//     const reader = stream.getReader();

//     while (true) {
//       const { done, value } = await reader.read();
//       console.log('read', done);

//       if (done) {
//         break;
//       }
//       const chunk = decoder.decode(value);
//       const parsedLine = JSON.parse(chunk);
//       const { choices } = parsedLine;
//       console.log('v4 parsedLine \n');

//       if (choices && choices?.length > 0) {
//         const { delta } = choices[0];
//         const { content } = delta;
//         if (content) {
//           console.log('v4 content \n');
//           res.write(`data:${content}\n\n`);
//         }
//       }
//     }
//   })
//     .catch((err) => {
//       console.log(err, 'Error');
//       res.json({ code: 100, message: 'error', data: [] });
//     }).finally(() => {
//       console.log('v4 end');
//       res.end();
//     });
//   res.write('data:start\n\n');
// });

// router.get('/setmessage/v4', (req, res) => {
//   res.setHeader('Content-type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   // const createMessage = getMessageArticle(req.body);

//   // const values = chatForMsg4(createMessage as any);

//   // values.then(async(data) => {
//   //   // 最后，全部完成
//   //   const decoder = new TextDecoder('utf-8');
//   //   const stream = data.toReadableStream();
//   //   const reader = stream.getReader();

//   //   while (true) {
//   //     const { done, value } = await reader.read();
//   //     console.log('read', done);

//   //     if (done) {
//   //       break;
//   //     }
//   //     const chunk = decoder.decode(value);
//   //     const parsedLine = JSON.parse(chunk);
//   //     const { choices } = parsedLine;
//   //     console.log('v4 parsedLine \n');

//   //     if (choices && choices?.length > 0) {
//   //       const { delta } = choices[0];
//   //       const { content } = delta;
//   //       if (content) {
//   //         console.log('v4 content \n');
//   //         res.write(`data:${content}\n\n`);
//   //       }
//   //     }
//   //   }
//   // })
//   //   .catch((err) => {
//   //     console.log(err, 'Error');
//   //     res.json({ code: 100, message: 'error', data: [] });
//   //   }).finally(() => {
//   //     console.log('v4 end');
//   //     res.end();
//   //   });
// });

// router.post('/setmessage/tragic', (req, res) => {
//   const createMessage = getMessageTragic(req.body);
//   const values = chatForMsg(createMessage as any);

//   values.then((data) => {
//     res.json({ code: 200, message: 'success', data: data?.choices?.map((item) => ({ ...item, message: {
//       role: item.message.role,
//       content: item.message.content?.replace(/\n/g, '<br/>') ?? ''
//     }})) ?? [] });
//   }).catch((err) => {
//     console.log(err, 'Error');
//     res.json({ code: 100, message: 'error', data: [] });
//   });
// });
// router.post('/setmessage/imgs', (req, res) => {
//   // const createMessage = getMessageTragic(req.body);
//   const values = chatForImg(req.body.imgMsg as string);

//   values.then((data) => {
//     console.log(data);

//     res.json({ code: 200, message: 'success', data });
//   }).catch((err) => {
//     console.log(err, 'Error');
//     res.json({ code: 100, message: 'error', data: [] });
//   });
// });

export default router;
