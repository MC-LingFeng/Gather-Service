import express from 'express';
import { getMessage, getMessageArticle, getMessageTragic } from './utils';
import { chatForImg, chatForMsg, chatForMsg4 } from '@/OpenAI';
import { Readable } from 'stream';
import expressWs from 'express-ws';
const router = express.Router();

const getMSG = (ws, value) => {
  const createMessage = getMessageArticle(value);
  const values = chatForMsg4(createMessage as any);
  values.then(async(data) => {
    console.log('start v4 stream');
    // 最后，全部完成
    const decoder = new TextDecoder('utf-8');
    const stream = data.toReadableStream();
    const reader = stream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('end v4 stream');
        ws.send('end');
        break;
      }
      const chunk = decoder.decode(value);
      const parsedLine = JSON.parse(chunk);
      const { choices } = parsedLine;
      if (choices && choices?.length > 0) {
        const { delta } = choices[0];
        const { content } = delta;
        if (content) {
          ws.send(`${content}`);
        }
      }
    }
  });
};
router.ws('/setmessage/ws', (ws, res) => {
  console.log('connect success');
  // console.log(ws);
  ws.send('success');
  ws.on('start', function(e) {
    ws.send('start');
  });
  ws.on('message', function(msg) {
    const value = JSON.parse(msg.toString());
    // console.log(value);
    if (value.start === 'pase') {
      getMSG(ws, value);
    }
    // ws.send(`收到客户端的消息为：${msg}，再返回去`);
  });

  // // 使用定时器不停的向客户端推动消息
  // let timer = setInterval(() => {
  //   ws.send(`服务端定时推送消息: 1`);
  // }, 1000);

  ws.on('close', function(e) {
    ws.send('close');
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
