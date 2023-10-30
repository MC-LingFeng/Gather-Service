
import express from 'express'
import {select} from '../../../utils/connection/mysql.js';

const router = express.Router();

const sql = 'SELECT * FROM default_theme';



router.route('/theme')
      .get((req, res,c) => {
        const valuse =  select(sql, function (err, rows) {
          if (!err) {
            res.json({ code: 200, data: rows?.[0] ?? null, message: '成功！'})
          } else {
            res.json({ code: 100, data:  null, message: '失败！'})
          }
       });
      })
      .post((req, res) => {
        const { value, id } = req.body
        const updateTheme = `UPDATE default_theme SET value='${value}', name='${value}' WHERE id=${id}`;
        const valuse =  select(updateTheme, function (err, rows) {
          if (!err) {
            res.json({ code: 200, data:  null, message: '成功！'})
          } else {
            res.json({ code: 100, data:  null, message: '失败！'})
          }
       });
      })

export default router