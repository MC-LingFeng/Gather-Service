import express from 'express';
import utils from '@/utils/index';
import connect from '@/utils/connection/index';

const router = express.Router();

router.use('/authority/user', (req, res, next) => {
  const token = req.headers.token;
  const isHave = utils.isHave(token);
  if (isHave) {
    res.json({ code: 0, data: null, message: '请登录！' });
  }
  next();
});
const user_get_sql = `SELECT username, user_id, phone, mail,gender,grade FROM user`;
router.get('/authority/user', (req, res) => {
  connect(user_get_sql).then((rows) => {
    res.json({ code: 200, data: rows, message: '成功！' });
  }).catch((err) => {
    console.log(err);
    res.json({ code: 100, data: null, message: '查询失败！' });
  });
});

export default router;
