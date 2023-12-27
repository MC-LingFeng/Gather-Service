import express from 'express';
import { getMessage } from './utils';
import { chatForMsg } from '@/OpenAI';

const router = express.Router();

router.post('/setmessage', (req, res) => {
  const createMessage = getMessage(req.body);
  const values = chatForMsg(createMessage as any);

  values.then((data) => {
    res.json({ code: 200, message: 'success', data: { username: data }});
  }).catch((err) => {
    console.log(err, 'Error');
  });
});

export default router;
