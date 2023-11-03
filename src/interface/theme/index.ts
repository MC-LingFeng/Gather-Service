
import express from 'express';
import connection from '@/utils/connection/index';

const router = express.Router();

const sql = 'SELECT * FROM default_theme';

router.route('/theme')
  .get((req, res) => {
    connection(sql).then((rows) => {
      res.json({ code: 200, data: rows?.[0] ?? null, message: '成功！' });
    })
      .catch((err) => {
        console.log(err);
        res.json({ code: 100, data: null, message: '失败！' });
      });
  })
  .post((req, res) => {
    const { value, id } = req.body;
    const updateTheme = `UPDATE default_theme SET value='${value}', name='${value}' WHERE id=${id}`;
    connection(updateTheme).then(() => {
      res.json({ code: 200, data: null, message: '成功！' });
    })
      .catch((err) => {
        console.log(err, 'setTheme');
        res.json({ code: 100, data: null, message: '失败！' });
      });
  });

export default router;
