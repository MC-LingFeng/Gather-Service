import express from 'express';
import connect from '@/utils/connection/index';
import { stringToBuffer, decrypt } from '@/utils/ase/index';

const router = express.Router();

router.use('/login', (req, res, next) => {
  const value = req.body;

  const sql = `SELECT * FROM user WHERE username='${value.username}'`;
  connect(sql).then((data) => {
    if (data.length > 0) {
      const stringList = [
        data[0].password_encrypted,
        data[0].password_tag,
        data[0].password_key,
        data[0].password_vector,
        data[0].password_algorithm
      ];
      const buffer = stringToBuffer(stringList);
      const password = decrypt(buffer);

      if (password === value.password) {
        const username = value.username;
        if (req.session) {
          req.session[`${username}`] = {
            username,
            id: `${username}${data[0].password_encrypted}`,
            isLogin: true,
            accessToken: `${username}${data[0].password_encrypted}`,
            url: req.headers.referer
          };
          res.header('Access-Token', `${username}${data[0].password_encrypted}`);
          next();
        }
      } else {
        res.json({ code: 101, message: '密码错误!', data: null });
      }
    } else {
      res.json({ code: 102, message: '用户名或密码错误!', data: null });
    }
  })
    .catch((err) => {
      console.log(err);
    });
});

router.use('/login', (req, res, next) => {
  next();
});

router.post('/login', (req, res) => {
  res.json({ code: 200, message: 'success', data: { username: req.body.username }});
});

export default router;
