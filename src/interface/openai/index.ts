import express from 'express';
import { getMessage, getMessageTragic } from './utils';
import { chatForImg, chatForMsg } from '@/OpenAI';

const router = express.Router();

router.post('/setmessage', (req, res) => {
  const createMessage = getMessage(req.body);
  const values = chatForMsg(createMessage as any);

  values.then((data) => {
    res.json({ code: 200, message: 'success', data: data?.choices?.map((item) => ({ ...item, message: {
      role: item.message.role,
      content: item.message.content?.replace(/\n/g, '<br/>') ?? ''
    }})) ?? [] });
  }).catch((err) => {
    console.log(err, 'Error');
    res.json({ code: 100, message: 'error', data: [] });
  });
});

router.post('/setmessage/tragic', (req, res) => {
  const createMessage = getMessageTragic(req.body);
  const values = chatForMsg(createMessage as any);

  values.then((data) => {
    res.json({ code: 200, message: 'success', data: data?.choices?.map((item) => ({ ...item, message: {
      role: item.message.role,
      content: item.message.content?.replace(/\n/g, '<br/>') ?? ''
    }})) ?? [] });
  }).catch((err) => {
    console.log(err, 'Error');
    res.json({ code: 100, message: 'error', data: [] });
  });
});
router.post('/setmessage/imgs', (req, res) => {
  // const createMessage = getMessageTragic(req.body);
  const values = chatForImg(req.body.imgMsg as string);

  values.then((data) => {
    console.log(data);

    res.json({ code: 200, message: 'success', data });
  }).catch((err) => {
    console.log(err, 'Error');
    res.json({ code: 100, message: 'error', data: [] });
  });
});

export default router;
