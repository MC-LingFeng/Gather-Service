import express from 'express';
import _ from 'lodash';
import connection from '../../../utils/connection/index.js'
import { decrypt, encryption, bufferToString, stringToBuffer } from '../../../utils/ase/index.js'


const router = express.Router();

router.use('/register', (req, res, next) => {
  const sql = 'SELECT username FROM user';
  const body = req.body;
  connection(sql).then((rows) => {
    const nameList = [];

      rows.forEach(row => {
        nameList.push(row.username)
      })
      if (nameList.includes(body.username)){
        res.json({ code: 201, message: '名字重复!', data: body.username });
      } else {
        next();
      }
  })
  .catch((err) => {
    console.log(err);
    res.json({ code: 100, message: 'error!', data: null });
  })
})

router.post('/register', async (req, res) => {
  const body = req.body;
  const encryptionList = encryption(body.password);
  const stringEncrypt = bufferToString(encryptionList)
  
  const sql = `INSERT INTO user (username, password_encrypted, password_tag, password_key, password_vector, password_algorithm)
  VALUES ('${body.username}', '${stringEncrypt[0]}', '${stringEncrypt[1]}', '${stringEncrypt[2]}', '${stringEncrypt[3]}', '${stringEncrypt[4]}')`

  connection(sql)
  .then(() => {
    res.json({ code: 200, message: 'success', data: null });
  })
  .catch((err) => {
    console.log(err);
    res.json({ code: 100, message: 'error!', data: null });
  })
})

export default router;