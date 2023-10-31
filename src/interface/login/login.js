import express from 'express';
import connect from '../../../utils/connection/index.js';
import { stringToBuffer, decrypt } from '../../../utils/ase/index.js';

const router = express.Router();

router.use('/login', (req, res, next) => {
  const value = req.body
  console.log(value, req.url);
  const sql = `SELECT * FROM user WHERE username='${value.username}'`;
  connect(sql).then((data) => {

    if (data.length > 0) {
      const stringList = [
        data[0].password_encrypted,
        data[0].password_tag,
        data[0].password_key,
        data[0].password_vector,
        data[0].password_algorithm,
      ];
      const buffer = stringToBuffer(stringList);
      const password = decrypt(buffer);

      if (password === value.password) {
        next()
      } else {
        res.json({ code: 100, message: '密码错误!', data: null })
      }
    } else {
      res.json({ code: 100, message: '用户名或密码错误!', data: null })
    }
  })
  .catch((err) => {
    console.log(err);
  })
})

router.use('/login', (req, res, next) => {
  const username = req.body.username
  req.session[`${username}`] = { username, isLogin: true, url: req.headers.referer  };
  req.sessionID = username
  next();
})

router.post('/login', (req, res) => {
  
  res.json({ code: 200, message: 'success', data: null });
})

export default router;